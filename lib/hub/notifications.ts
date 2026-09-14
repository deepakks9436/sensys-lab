type SupabaseLike = {
  from: (table: string) => any;

  rpc: (
    functionName: string,
    params?: Record<
      string,
      unknown
    >
  ) => Promise<{
    data: unknown;

    error: {
      message: string;
    } | null;
  }>;
};

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

  const { error } =
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
         * Because the database delivery trigger
         * is temporarily disabled, emails will
         * remain safely queued as Pending.
         */
        p_send_email:
          options.sendEmail ??
          true,
      }
    );

  /*
   * A notification failure must never undo
   * the underlying research/lab operation.
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
  } = await supabase
    .from("students")
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
   * Researcher may exist in the register
   * before their Hub account is linked.
   */
  if (!student?.user_id) {
    return;
  }

  await notifyHubUser(
    supabase,
    student.user_id,
    options
  );
}