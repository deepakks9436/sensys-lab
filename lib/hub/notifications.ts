import type {
  SupabaseClient,
} from "@supabase/supabase-js";

type SupabaseLike =
  Pick<
    SupabaseClient,
    "from" | "rpc"
  >;

type NotificationOptions = {
  type: string;

  title: string;

  message: string;

  entityType?:
    | string
    | null;

  entityId?:
    | string
    | null;

  actionUrl?:
    | string
    | null;

  priority?:
    | "Low"
    | "Normal"
    | "High"
    | "Critical";

  sendEmail?: boolean;
};

type PreferenceColumn =
  | "email_research_reviews"
  | "email_actions"
  | "email_research_updates"
  | "email_instruments"
  | "email_inventory"
  | "email_chemical_expiry"
  | "email_purchases";

type NotificationPreferences = {
  email_research_reviews: boolean;
  email_actions: boolean;
  email_research_updates: boolean;
  email_instruments: boolean;
  email_inventory: boolean;
  email_chemical_expiry: boolean;
  email_purchases: boolean;
};

/* ============================================================
   MAP NOTIFICATION TYPE → EMAIL PREFERENCE
============================================================ */

function preferenceColumnForType(
  notificationType: string
): PreferenceColumn | null {
  const type =
    notificationType
      .trim()
      .toLowerCase();

  /* --------------------------------------------------------
     CHEMICAL EXPIRY
  -------------------------------------------------------- */

  if (
    type.includes("chemical") &&
    (
      type.includes("expiry") ||
      type.includes("expire")
    )
  ) {
    return "email_chemical_expiry";
  }

  /* --------------------------------------------------------
     PURCHASES
  -------------------------------------------------------- */

  if (
    type.includes("purchase")
  ) {
    return "email_purchases";
  }

  /* --------------------------------------------------------
     INVENTORY
  -------------------------------------------------------- */

  if (
    type.includes("inventory") ||
    type.includes("stock") ||
    type.includes("reorder") ||
    type.includes("consumable")
  ) {
    return "email_inventory";
  }

  /* --------------------------------------------------------
     LAB / INSTRUMENTS
  -------------------------------------------------------- */

  if (
    type.includes("instrument") ||
    type.includes("booking") ||
    type.includes("training") ||
    type.includes("calibration") ||
    type.includes("maintenance")
  ) {
    return "email_instruments";
  }

  /* --------------------------------------------------------
     ACTIONS
  -------------------------------------------------------- */

  if (
    type.includes("action")
  ) {
    return "email_actions";
  }

  /* --------------------------------------------------------
     RESEARCH REVIEWS
  -------------------------------------------------------- */

  if (
    type.includes("meeting") ||
    type.includes("review")
  ) {
    return "email_research_reviews";
  }

  /* --------------------------------------------------------
     RESEARCH UPDATES
  -------------------------------------------------------- */

  if (
    type.includes("milestone") ||
    type.includes("research_plan") ||
    type.includes("check_in") ||
    type.includes("checkin") ||
    type.includes("weekly")
  ) {
    return "email_research_updates";
  }

  /*
   * Unknown / future notification types
   * are not mapped to a user preference yet.
   */
  return null;
}

/* ============================================================
   SHOULD THIS USER RECEIVE EMAIL?
============================================================ */

async function shouldSendHubEmail(
  supabase: SupabaseLike,
  userId: string,
  notificationType: string
) {
  const column =
    preferenceColumnForType(
      notificationType
    );

  /*
   * New or unrecognised notification types
   * default to email enabled.
   */
  if (!column) {
    return true;
  }

  const {
    data,
    error,
  } = await supabase
    .from(
      "notification_preferences"
    )
    .select(
      `
      email_research_reviews,
      email_actions,
      email_research_updates,
      email_instruments,
      email_inventory,
      email_chemical_expiry,
      email_purchases
      `
    )
    .eq(
      "user_id",
      userId
    )
    .maybeSingle();

  if (error) {
    console.error(
      "Unable to read SenSys email preference:",
      error.message
    );

    /*
     * Preference lookup failure should not
     * break the operation which generated
     * the notification.
     */
    return true;
  }

  /*
   * No preference row means the user has
   * not customised settings yet.
   *
   * All email categories therefore remain ON.
   */
  if (!data) {
    return true;
  }

  const preferences =
    data as NotificationPreferences;

  return (
    preferences[column] !==
    false
  );
}

/* ============================================================
   HUB USER NOTIFICATION
============================================================ */

export async function notifyHubUser(
  supabase: SupabaseLike,
  userId:
    | string
    | null
    | undefined,
  options: NotificationOptions
) {
  if (!userId) {
    return;
  }

  /*
   * Explicit sendEmail: false always wins.
   *
   * Otherwise the user's preference is checked.
   */
  let sendEmail =
    options.sendEmail ??
    true;

  if (sendEmail) {
    sendEmail =
      await shouldSendHubEmail(
        supabase,
        userId,
        options.type
      );
  }

  const {
    error,
  } =
    await supabase.rpc(
      "notify_hub_user_from_staff",
      {
        p_user_id:
          userId,

        p_notification_type:
          options.type,

        p_title:
          options.title,

        p_message:
          options.message,

        p_entity_type:
          options.entityType ??
          null,

        p_entity_id:
          options.entityId ??
          null,

        p_action_url:
          options.actionUrl ??
          null,

        p_priority:
          options.priority ??
          "Normal",

        /*
         * In-app notification creation still
         * happens regardless of the email
         * preference.
         *
         * This flag only controls whether an
         * email is queued.
         */
        p_send_email:
          sendEmail,
      }
    );

  /*
   * Notification delivery must never undo
   * the research/lab operation which caused it.
   */
  if (error) {
    console.error(
      "SenSys notification error:",
      error.message
    );
  }
}

/* ============================================================
   STUDENT NOTIFICATION
============================================================ */

export async function notifyStudent(
  supabase: SupabaseLike,
  studentId: string,
  options: NotificationOptions
) {
  const {
    data: student,
    error,
  } =
    await supabase
      .from(
        "students"
      )
      .select(
        "user_id, full_name"
      )
      .eq(
        "id",
        studentId
      )
      .maybeSingle();

  if (error) {
    console.error(
      "Unable to resolve student notification:",
      error.message
    );

    return;
  }

  /*
   * A researcher can exist in the SenSys
   * research register before their Hub
   * login account has been created.
   */
  if (
    !student?.user_id
  ) {
    return;
  }

  await notifyHubUser(
    supabase,
    student.user_id,
    options
  );
}