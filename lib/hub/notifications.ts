import type {
  SupabaseClient,
} from "@supabase/supabase-js";

/*
 * Use the official Supabase client method
 * signatures instead of manually redefining
 * .from() and .rpc().
 *
 * This is important because Supabase .rpc()
 * returns a PostgREST builder / thenable,
 * not a literal Promise type.
 */
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
         * Keep this TRUE.
         *
         * If the external email delivery
         * trigger is disabled, messages may
         * remain queued while in-app
         * notifications continue to work.
         */
        p_send_email:
          options.sendEmail ??
          true,
      }
    );

  /*
   * Notification delivery must never
   * undo the research or laboratory
   * operation that triggered it.
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
   * A researcher may exist in the
   * research register before their
   * SenSys Hub account has been
   * created or linked.
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