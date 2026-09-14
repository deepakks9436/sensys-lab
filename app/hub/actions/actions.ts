"use server";

import {
  revalidatePath,
} from "next/cache";

import {
  redirect,
} from "next/navigation";

import {
  createClient,
} from "../../../lib/supabase/server";

import {
  notifyStudent,
} from "../../../lib/hub/notifications";

type HubRole =
  | "admin"
  | "research_manager"
  | "lab_manager"
  | "student"
  | "member";

/* ============================================================
   AUTH / ROLE
============================================================ */

async function getActor() {
  const supabase =
    await createClient();

  const {
    data: { user },
  } =
    await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const {
    data: profile,
  } =
    await supabase
      .from("profiles")
      .select(
        "role, is_active"
      )
      .eq("id", user.id)
      .single();

  if (
    !profile ||
    !profile.is_active
  ) {
    throw new Error(
      "Your SenSys Hub account is not active."
    );
  }

  return {
    supabase,
    user,
    role:
      profile.role as HubRole,
  };
}

async function requireResearchManager() {
  const actor =
    await getActor();

  if (
    ![
      "admin",
      "research_manager",
    ].includes(
      actor.role
    )
  ) {
    throw new Error(
      "You do not have permission to manage action items."
    );
  }

  return actor;
}

/* ============================================================
   HELPERS
============================================================ */

function optionalText(
  value:
    | FormDataEntryValue
    | null
) {
  const text =
    String(
      value ?? ""
    ).trim();

  return text || null;
}

function optionalDate(
  value:
    | FormDataEntryValue
    | null
) {
  const text =
    String(
      value ?? ""
    ).trim();

  return text || null;
}

function priorityToNotification(
  priority: string
):
  | "Low"
  | "Normal"
  | "High"
  | "Critical" {
  if (
    priority ===
    "Critical"
  ) {
    return "Critical";
  }

  if (
    priority ===
    "High"
  ) {
    return "High";
  }

  if (
    priority ===
    "Low"
  ) {
    return "Low";
  }

  return "Normal";
}

/* ============================================================
   CREATE ACTION
============================================================ */

export async function addActionItem(
  formData: FormData
) {
  const {
    supabase,
    user,
  } =
    await requireResearchManager();

  const title =
    String(
      formData.get(
        "title"
      ) ?? ""
    ).trim();

  if (!title) {
    redirect(
      "/hub/actions/new?error=Action%20title%20is%20required."
    );
  }

  const studentId =
    optionalText(
      formData.get(
        "student_id"
      )
    );

  const meetingId =
    optionalText(
      formData.get(
        "meeting_id"
      )
    );

  const status =
    String(
      formData.get(
        "status"
      ) ?? "Open"
    );

  const priority =
    String(
      formData.get(
        "priority"
      ) ?? "Medium"
    );

  const dueDate =
    optionalDate(
      formData.get(
        "due_date"
      )
    );

  const source =
    meetingId
      ? "Weekly Meeting"
      : optionalText(
          formData.get(
            "source"
          )
        ) ??
        "Research Follow-up";

  const {
    data:
      createdAction,
    error,
  } =
    await supabase
      .from(
        "action_items"
      )
      .insert({
        student_id:
          studentId,

        meeting_id:
          meetingId,

        title,

        description:
          optionalText(
            formData.get(
              "description"
            )
          ),

        owner_name:
          optionalText(
            formData.get(
              "owner_name"
            )
          ),

        source,

        due_date:
          dueDate,

        priority,

        status,

        created_by:
          user.id,

        updated_by:
          user.id,
      })
      .select(
        `
        id,
        student_id,
        meeting_id,
        title,
        due_date,
        priority,
        status
        `
      )
      .single();

  if (
    error ||
    !createdAction
  ) {
    redirect(
      `/hub/actions/new?error=${encodeURIComponent(
        error?.message ??
          "Unable to create action item."
      )}`
    );
  }

  /* ========================================================
     NOTIFY STUDENT
  ======================================================== */

  if (
    createdAction.student_id
  ) {
    const dueText =
      createdAction.due_date
        ? ` Due ${createdAction.due_date}.`
        : "";

    await notifyStudent(
      supabase,
      createdAction.student_id,
      {
        type:
          "action_assigned",

        title:
          "New action assigned",

        message:
          `${createdAction.title}.${dueText}`,

        entityType:
          "action_item",

        entityId:
          createdAction.id,

        actionUrl:
          "/hub/actions",

        priority:
          priorityToNotification(
            createdAction.priority
          ),
      }
    );
  }

  revalidatePath(
    "/hub/actions"
  );

  revalidatePath(
    "/hub"
  );

  if (
    createdAction.student_id
  ) {
    revalidatePath(
      `/hub/students/${createdAction.student_id}`
    );
  }

  if (
    createdAction.meeting_id
  ) {
    revalidatePath(
      "/hub/meetings"
    );

    revalidatePath(
      `/hub/meetings/${createdAction.meeting_id}`
    );

    redirect(
      `/hub/meetings/${createdAction.meeting_id}`
    );
  }

  if (
    createdAction.student_id
  ) {
    redirect(
      `/hub/students/${createdAction.student_id}`
    );
  }

  redirect(
    "/hub/actions"
  );
}

/* ============================================================
   MANAGER UPDATE
============================================================ */

export async function updateActionItem(
  actionId: string,
  formData: FormData
) {
  const {
    supabase,
    user,
  } =
    await requireResearchManager();

  const status =
    String(
      formData.get(
        "status"
      ) ?? "Open"
    );

  const priority =
    String(
      formData.get(
        "priority"
      ) ?? "Medium"
    );

  const dueDate =
    optionalDate(
      formData.get(
        "due_date"
      )
    );

  const {
    data: existing,
  } =
    await supabase
      .from(
        "action_items"
      )
      .select(
        `
        student_id,
        meeting_id,
        title,
        status,
        priority,
        due_date
        `
      )
      .eq(
        "id",
        actionId
      )
      .single();

  const {
    error,
  } =
    await supabase
      .from(
        "action_items"
      )
      .update({
        status,

        priority,

        due_date:
          dueDate,

        updated_by:
          user.id,
      })
      .eq(
        "id",
        actionId
      );

  if (error) {
    throw new Error(
      error.message
    );
  }

  /* ========================================================
     NOTIFY ONLY WHEN SOMETHING MATERIAL CHANGED
  ======================================================== */

  if (
    existing?.student_id &&
    (
      existing.status !==
        status ||
      existing.priority !==
        priority ||
      existing.due_date !==
        dueDate
    )
  ) {
    const dueText =
      dueDate
        ? ` Due ${dueDate}.`
        : "";

    await notifyStudent(
      supabase,
      existing.student_id,
      {
        type:
          "action_updated",

        title:
          "Action item updated",

        message:
          `${existing.title}: status ${status}, priority ${priority}.${dueText}`,

        entityType:
          "action_item",

        entityId:
          actionId,

        actionUrl:
          "/hub/actions",

        priority:
          priorityToNotification(
            priority
          ),
      }
    );
  }

  revalidatePath(
    "/hub/actions"
  );

  revalidatePath(
    "/hub"
  );

  if (
    existing?.student_id
  ) {
    revalidatePath(
      `/hub/students/${existing.student_id}`
    );
  }

  if (
    existing?.meeting_id
  ) {
    revalidatePath(
      "/hub/meetings"
    );

    revalidatePath(
      `/hub/meetings/${existing.meeting_id}`
    );
  }
}

/* ============================================================
   STUDENT STATUS UPDATE
============================================================ */

export async function updateOwnActionStatus(
  actionId: string,
  formData: FormData
) {
  const actor =
    await getActor();

  if (
    actor.role !==
    "student"
  ) {
    throw new Error(
      "This action is available only to student accounts."
    );
  }

  const status =
    String(
      formData.get(
        "status"
      ) ?? "Open"
    );

  const allowedStatuses = [
    "Open",
    "In Progress",
    "Completed",
  ];

  if (
    !allowedStatuses.includes(
      status
    )
  ) {
    throw new Error(
      "Invalid action status."
    );
  }

  const {
    data: existing,
  } =
    await actor.supabase
      .from(
        "action_items"
      )
      .select(
        "student_id, meeting_id"
      )
      .eq(
        "id",
        actionId
      )
      .maybeSingle();

  const {
    error,
  } =
    await actor.supabase.rpc(
      "update_own_action_status",
      {
        p_action_id:
          actionId,

        p_status:
          status,
      }
    );

  if (error) {
    throw new Error(
      error.message
    );
  }

  revalidatePath(
    "/hub/actions"
  );

  revalidatePath(
    "/hub"
  );

  if (
    existing?.student_id
  ) {
    revalidatePath(
      `/hub/students/${existing.student_id}`
    );
  }

  if (
    existing?.meeting_id
  ) {
    revalidatePath(
      `/hub/meetings/${existing.meeting_id}`
    );
  }
}