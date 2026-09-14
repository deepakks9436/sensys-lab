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

/* ============================================================
   TYPES
============================================================ */

type HubRole =
  | "admin"
  | "research_manager"
  | "lab_manager"
  | "student"
  | "member";

const milestoneStatuses = [
  "Planned",
  "In Progress",
  "Delayed",
  "Completed",
  "On Hold",
] as const;

type MilestoneStatus =
  (typeof milestoneStatuses)[number];

/* ============================================================
   AUTH
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
      .eq(
        "id",
        user.id
      )
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
      "You do not have permission to modify student research records."
    );
  }

  return actor;
}

async function requireStudentAccess(
  studentId: string
) {
  const actor =
    await getActor();

  if (
    actor.role !==
    "student"
  ) {
    throw new Error(
      "This operation is available only to student accounts."
    );
  }

  const {
    data: student,
  } =
    await actor.supabase
      .from("students")
      .select(
        "id, user_id"
      )
      .eq(
        "id",
        studentId
      )
      .maybeSingle();

  if (
    !student ||
    student.user_id !==
      actor.user.id
  ) {
    throw new Error(
      "You do not have access to this student record."
    );
  }

  return actor;
}

/* ============================================================
   GENERAL HELPERS
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

function numberValue(
  value:
    | FormDataEntryValue
    | null,
  fallback = 0
) {
  const parsed =
    Number(value);

  return Number.isNaN(
    parsed
  )
    ? fallback
    : parsed;
}

function todayDate() {
  return new Date()
    .toISOString()
    .slice(0, 10);
}

function isMilestoneStatus(
  value: string
): value is MilestoneStatus {
  return (
    milestoneStatuses as readonly string[]
  ).includes(value);
}

function legacyCompletionFromStatus(
  status: MilestoneStatus
) {
  /*
   * Kept only because the existing
   * database currently contains a
   * completion column.
   *
   * SenSys Hub no longer asks users
   * to enter arbitrary percentages.
   */
  if (
    status ===
    "Completed"
  ) {
    return 100;
  }

  if (
    status ===
      "In Progress" ||
    status ===
      "Delayed"
  ) {
    return 50;
  }

  return 0;
}

async function getNextMilestoneSortOrder(
  supabase: any,
  studentId: string
) {
  const {
    data,
  } =
    await supabase
      .from(
        "student_milestones"
      )
      .select(
        "sort_order"
      )
      .eq(
        "student_id",
        studentId
      )
      .order(
        "sort_order",
        {
          ascending: false,
        }
      )
      .limit(1)
      .maybeSingle();

  return (
    Number(
      data?.sort_order ??
        0
    ) + 1
  );
}

function getAutomaticExecutionDates(
  status: MilestoneStatus,
  existing?: {
    status?: string | null;
    actual_start?:
      | string
      | null;
    actual_end?:
      | string
      | null;
  } | null
) {
  const today =
    todayDate();

  let actualStart =
    existing?.actual_start ??
    null;

  let actualEnd =
    existing?.actual_end ??
    null;

  /*
   * First transition into active work.
   */
  if (
    (
      status ===
        "In Progress" ||
      status ===
        "Delayed"
    ) &&
    !actualStart
  ) {
    actualStart =
      today;
  }

  /*
   * Completion automatically records
   * the final date.
   */
  if (
    status ===
    "Completed"
  ) {
    if (
      !actualStart
    ) {
      actualStart =
        today;
    }

    if (
      !actualEnd
    ) {
      actualEnd =
        today;
    }
  }

  /*
   * Reopening a completed milestone
   * clears completion date but keeps
   * original actual-start date.
   */
  if (
    existing?.status ===
      "Completed" &&
    status !==
      "Completed"
  ) {
    actualEnd =
      null;
  }

  return {
    actualStart,
    actualEnd,
  };
}

function revalidateStudent(
  studentId: string
) {
  revalidatePath(
    "/hub"
  );

  revalidatePath(
    "/hub/students"
  );

  revalidatePath(
    `/hub/students/${studentId}`
  );
}

/* ============================================================
   STUDENT CREATION
============================================================ */

export async function addStudent(
  formData: FormData
) {
  const {
    supabase,
    user,
  } =
    await requireResearchManager();

  const fullName =
    String(
      formData.get(
        "full_name"
      ) ?? ""
    ).trim();

  if (!fullName) {
    redirect(
      "/hub/students/new?error=Student%20name%20is%20required."
    );
  }

  const {
    data,
    error,
  } =
    await supabase
      .from("students")
      .insert({
        full_name:
          fullName,

        programme:
          String(
            formData.get(
              "programme"
            ) ?? "Other"
          ),

        intake:
          optionalText(
            formData.get(
              "intake"
            )
          ),

        start_date:
          optionalDate(
            formData.get(
              "start_date"
            )
          ),

        expected_completion_date:
          optionalDate(
            formData.get(
              "expected_completion_date"
            )
          ),

        research_area:
          optionalText(
            formData.get(
              "research_area"
            )
          ),

        project_title:
          optionalText(
            formData.get(
              "project_title"
            )
          ),

        supervisor:
          optionalText(
            formData.get(
              "supervisor"
            )
          ),

        co_supervisor:
          optionalText(
            formData.get(
              "co_supervisor"
            )
          ),

        project_lead:
          optionalText(
            formData.get(
              "project_lead"
            )
          ),

        current_stage:
          optionalText(
            formData.get(
              "current_stage"
            )
          ),

        current_priority:
          optionalText(
            formData.get(
              "current_priority"
            )
          ),

        /*
         * Legacy analytics fields remain
         * in the table but are no longer
         * central to the Hub UI.
         */
        overall_progress:
          0,

        expected_progress:
          numberValue(
            formData.get(
              "expected_progress"
            )
          ),

        status:
          "On Track",

        notes:
          optionalText(
            formData.get(
              "notes"
            )
          ),

        created_by:
          user.id,

        updated_by:
          user.id,
      })
      .select(
        "id"
      )
      .single();

  if (
    error ||
    !data
  ) {
    redirect(
      `/hub/students/new?error=${encodeURIComponent(
        error?.message ??
          "Unable to create student."
      )}`
    );
  }

  revalidatePath(
    "/hub"
  );

  revalidatePath(
    "/hub/students"
  );

  redirect(
    `/hub/students/${data.id}`
  );
}

/* ============================================================
   UPDATE STUDENT
============================================================ */

export async function updateStudent(
  studentId: string,
  formData: FormData
) {
  const {
    supabase,
    user,
  } =
    await requireResearchManager();

  const fullName =
    String(
      formData.get(
        "full_name"
      ) ?? ""
    ).trim();

  if (!fullName) {
    redirect(
      `/hub/students/${studentId}/edit?error=${encodeURIComponent(
        "Student name is required."
      )}`
    );
  }

  const expectedCompletionDate =
    optionalDate(
      formData.get(
        "expected_completion_date"
      )
    );

  const currentStage =
    optionalText(
      formData.get(
        "current_stage"
      )
    );

  const currentPriority =
    optionalText(
      formData.get(
        "current_priority"
      )
    );

  const projectTitle =
    optionalText(
      formData.get(
        "project_title"
      )
    );

  const {
    data: existing,
  } =
    await supabase
      .from("students")
      .select(
        `
        expected_completion_date,
        current_stage,
        current_priority,
        project_title
        `
      )
      .eq(
        "id",
        studentId
      )
      .maybeSingle();

  const {
    error,
  } =
    await supabase
      .from("students")
      .update({
        full_name:
          fullName,

        programme:
          String(
            formData.get(
              "programme"
            ) ?? "Other"
          ),

        intake:
          optionalText(
            formData.get(
              "intake"
            )
          ),

        start_date:
          optionalDate(
            formData.get(
              "start_date"
            )
          ),

        expected_completion_date:
          expectedCompletionDate,

        research_area:
          optionalText(
            formData.get(
              "research_area"
            )
          ),

        project_title:
          projectTitle,

        supervisor:
          optionalText(
            formData.get(
              "supervisor"
            )
          ),

        co_supervisor:
          optionalText(
            formData.get(
              "co_supervisor"
            )
          ),

        project_lead:
          optionalText(
            formData.get(
              "project_lead"
            )
          ),

        current_stage:
          currentStage,

        current_priority:
          currentPriority,

        /*
         * Preserve compatibility with the
         * existing edit form if this field
         * is still present.
         */
        expected_progress:
          numberValue(
            formData.get(
              "expected_progress"
            )
          ),

        notes:
          optionalText(
            formData.get(
              "notes"
            )
          ),

        updated_by:
          user.id,
      })
      .eq(
        "id",
        studentId
      );

  if (error) {
    redirect(
      `/hub/students/${studentId}/edit?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  const importantChanged =
    existing?.expected_completion_date !==
      expectedCompletionDate ||
    existing?.current_stage !==
      currentStage ||
    existing?.current_priority !==
      currentPriority ||
    existing?.project_title !==
      projectTitle;

  if (
    importantChanged
  ) {
    await notifyStudent(
      supabase,
      studentId,
      {
        type:
          "research_plan_updated",

        title:
          "Research plan updated",

        message:
          "Your research project details, current stage or timeline have been updated.",

        entityType:
          "student",

        entityId:
          studentId,

        actionUrl:
          `/hub/students/${studentId}`,

        priority:
          "Normal",
      }
    );
  }

  revalidateStudent(
    studentId
  );

  redirect(
    `/hub/students/${studentId}`
  );
}

/* ============================================================
   ADD MILESTONE
============================================================ */

export async function addMilestone(
  studentId: string,
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
      `/hub/students/${studentId}/milestones/new?error=${encodeURIComponent(
        "Milestone title is required."
      )}`
    );
  }

  const rawStatus =
    String(
      formData.get(
        "status"
      ) ?? "Planned"
    );

  if (
    !isMilestoneStatus(
      rawStatus
    )
  ) {
    redirect(
      `/hub/students/${studentId}/milestones/new?error=${encodeURIComponent(
        "Invalid milestone status."
      )}`
    );
  }

  const status =
    rawStatus;

  const plannedStart =
    optionalDate(
      formData.get(
        "planned_start"
      )
    );

  const plannedEnd =
    optionalDate(
      formData.get(
        "planned_end"
      )
    );

  if (
    plannedStart &&
    plannedEnd &&
    plannedEnd <
      plannedStart
  ) {
    redirect(
      `/hub/students/${studentId}/milestones/new?error=${encodeURIComponent(
        "Target date cannot be earlier than the planned start date."
      )}`
    );
  }

  const {
    actualStart,
    actualEnd,
  } =
    getAutomaticExecutionDates(
      status
    );

  const sortOrder =
    await getNextMilestoneSortOrder(
      supabase,
      studentId
    );

  const {
    data: milestone,
    error,
  } =
    await supabase
      .from(
        "student_milestones"
      )
      .insert({
        student_id:
          studentId,

        workstream_id:
          optionalText(
            formData.get(
              "workstream_id"
            )
          ),

        title,

        /*
         * Legacy fields remain in the
         * schema but are intentionally
         * hidden from users.
         */
        category:
          null,

        description:
          null,

        planned_start:
          plannedStart,

        planned_end:
          plannedEnd,

        actual_start:
          actualStart,

        actual_end:
          actualEnd,

        weight:
          0,

        completion:
          legacyCompletionFromStatus(
            status
          ),

        status,

        dependency:
          null,

        evidence_url:
          optionalText(
            formData.get(
              "evidence_url"
            )
          ),

        notes:
          optionalText(
            formData.get(
              "notes"
            )
          ),

        /*
         * Automatically maintained.
         * No Sort Order field is shown
         * to users anymore.
         */
        sort_order:
          sortOrder,

        created_by:
          user.id,

        updated_by:
          user.id,
      })
      .select(
        `
        id,
        title,
        status,
        planned_end
        `
      )
      .single();

  if (
    error ||
    !milestone
  ) {
    redirect(
      `/hub/students/${studentId}/milestones/new?error=${encodeURIComponent(
        error?.message ??
          "Unable to create milestone."
      )}`
    );
  }

  await notifyStudent(
    supabase,
    studentId,
    {
      type:
        "milestone_added",

      title:
        "New research milestone",

      message:
        milestone.planned_end
          ? `${milestone.title} has been added to your research pathway. Target: ${milestone.planned_end}.`
          : `${milestone.title} has been added to your research pathway.`,

      entityType:
        "student_milestone",

      entityId:
        milestone.id,

      actionUrl:
        `/hub/students/${studentId}`,

      priority:
        status ===
        "Delayed"
          ? "High"
          : "Normal",
    }
  );

  revalidateStudent(
    studentId
  );

  redirect(
    `/hub/students/${studentId}`
  );
}

/* ============================================================
   UPDATE MILESTONE
============================================================ */

export async function updateMilestone(
  studentId: string,
  milestoneId: string,
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
      `/hub/students/${studentId}/milestones/${milestoneId}/edit?error=${encodeURIComponent(
        "Milestone title is required."
      )}`
    );
  }

  const rawStatus =
    String(
      formData.get(
        "status"
      ) ?? "Planned"
    );

  if (
    !isMilestoneStatus(
      rawStatus
    )
  ) {
    redirect(
      `/hub/students/${studentId}/milestones/${milestoneId}/edit?error=${encodeURIComponent(
        "Invalid milestone status."
      )}`
    );
  }

  const status =
    rawStatus;

  const plannedStart =
    optionalDate(
      formData.get(
        "planned_start"
      )
    );

  const plannedEnd =
    optionalDate(
      formData.get(
        "planned_end"
      )
    );

  if (
    plannedStart &&
    plannedEnd &&
    plannedEnd <
      plannedStart
  ) {
    redirect(
      `/hub/students/${studentId}/milestones/${milestoneId}/edit?error=${encodeURIComponent(
        "Target date cannot be earlier than the planned start date."
      )}`
    );
  }

  const workstreamId =
    optionalText(
      formData.get(
        "workstream_id"
      )
    );

  const {
    data: existing,
  } =
    await supabase
      .from(
        "student_milestones"
      )
      .select(
        `
        title,
        status,
        planned_start,
        planned_end,
        actual_start,
        actual_end,
        workstream_id,
        sort_order
        `
      )
      .eq(
        "id",
        milestoneId
      )
      .eq(
        "student_id",
        studentId
      )
      .maybeSingle();

  if (!existing) {
    throw new Error(
      "Milestone not found."
    );
  }

  const {
    actualStart,
    actualEnd,
  } =
    getAutomaticExecutionDates(
      status,
      existing
    );

  const {
    error,
  } =
    await supabase
      .from(
        "student_milestones"
      )
      .update({
        title,

        workstream_id:
          workstreamId,

        planned_start:
          plannedStart,

        planned_end:
          plannedEnd,

        actual_start:
          actualStart,

        actual_end:
          actualEnd,

        status,

        completion:
          legacyCompletionFromStatus(
            status
          ),

        /*
         * The following fields are no
         * longer part of the user-facing
         * milestone model.
         */
        weight:
          0,

        category:
          null,

        description:
          null,

        dependency:
          null,

        evidence_url:
          optionalText(
            formData.get(
              "evidence_url"
            )
          ),

        notes:
          optionalText(
            formData.get(
              "notes"
            )
          ),

        /*
         * Preserve internal order.
         */
        sort_order:
          existing.sort_order ??
          0,

        updated_by:
          user.id,
      })
      .eq(
        "id",
        milestoneId
      )
      .eq(
        "student_id",
        studentId
      );

  if (error) {
    redirect(
      `/hub/students/${studentId}/milestones/${milestoneId}/edit?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  const importantChanged =
    existing.title !==
      title ||
    existing.status !==
      status ||
    existing.planned_start !==
      plannedStart ||
    existing.planned_end !==
      plannedEnd ||
    existing.workstream_id !==
      workstreamId;

  if (
    importantChanged
  ) {
    await notifyStudent(
      supabase,
      studentId,
      {
        type:
          "milestone_updated",

        title:
          "Research milestone updated",

        message:
          plannedEnd
            ? `${title} is now ${status}. Target: ${plannedEnd}.`
            : `${title} is now ${status}.`,

        entityType:
          "student_milestone",

        entityId:
          milestoneId,

        actionUrl:
          `/hub/students/${studentId}`,

        priority:
          status ===
          "Delayed"
            ? "High"
            : "Normal",
      }
    );
  }

  revalidateStudent(
    studentId
  );

  redirect(
    `/hub/students/${studentId}`
  );
}

/* ============================================================
   MANAGER QUICK STATUS UPDATE
   ------------------------------------------------------------
   Kept temporarily for compatibility with the existing
   researcher dashboard.

   Completion % is ignored as a research metric.
============================================================ */

export async function updateMilestoneProgress(
  studentId: string,
  milestoneId: string,
  formData: FormData
) {
  const {
    supabase,
    user,
  } =
    await requireResearchManager();

  let rawStatus =
    String(
      formData.get(
        "status"
      ) ?? "Planned"
    );

  /*
   * Compatibility with old dropdowns
   * while the dashboard is being
   * redesigned.
   */
  if (
    rawStatus ===
      "Not Started" ||
    rawStatus ===
      "On Track"
  ) {
    rawStatus =
      rawStatus ===
      "On Track"
        ? "In Progress"
        : "Planned";
  }

  if (
    rawStatus ===
    "At Risk"
  ) {
    rawStatus =
      "Delayed";
  }

  if (
    !isMilestoneStatus(
      rawStatus
    )
  ) {
    throw new Error(
      "Invalid milestone status."
    );
  }

  const status =
    rawStatus;

  const {
    data: existing,
  } =
    await supabase
      .from(
        "student_milestones"
      )
      .select(
        `
        title,
        status,
        actual_start,
        actual_end,
        planned_end
        `
      )
      .eq(
        "id",
        milestoneId
      )
      .eq(
        "student_id",
        studentId
      )
      .maybeSingle();

  if (!existing) {
    throw new Error(
      "Milestone not found."
    );
  }

  const {
    actualStart,
    actualEnd,
  } =
    getAutomaticExecutionDates(
      status,
      existing
    );

  const {
    error,
  } =
    await supabase
      .from(
        "student_milestones"
      )
      .update({
        status,

        actual_start:
          actualStart,

        actual_end:
          actualEnd,

        completion:
          legacyCompletionFromStatus(
            status
          ),

        updated_by:
          user.id,
      })
      .eq(
        "id",
        milestoneId
      )
      .eq(
        "student_id",
        studentId
      );

  if (error) {
    throw new Error(
      error.message
    );
  }

  if (
    existing.status !==
    status
  ) {
    await notifyStudent(
      supabase,
      studentId,
      {
        type:
          "milestone_status_updated",

        title:
          "Milestone status updated",

        message:
          existing.planned_end
            ? `${existing.title} is now ${status}. Target: ${existing.planned_end}.`
            : `${existing.title} is now ${status}.`,

        entityType:
          "student_milestone",

        entityId:
          milestoneId,

        actionUrl:
          `/hub/students/${studentId}`,

        priority:
          status ===
          "Delayed"
            ? "High"
            : "Normal",
      }
    );
  }

  revalidateStudent(
    studentId
  );
}

/* ============================================================
   STUDENT MILESTONE EXECUTION UPDATE

   Kept for compatibility with the current student dashboard.
   We will simplify this UI next.
============================================================ */

export async function updateOwnMilestoneExecution(
  studentId: string,
  milestoneId: string,
  formData: FormData
) {
  const actor =
    await requireStudentAccess(
      studentId
    );

  const completion =
    Math.min(
      100,
      Math.max(
        0,
        numberValue(
          formData.get(
            "completion"
          )
        )
      )
    );

  const actualStart =
    optionalDate(
      formData.get(
        "actual_start"
      )
    );

  const actualEnd =
    optionalDate(
      formData.get(
        "actual_end"
      )
    );

  const evidenceUrl =
    optionalText(
      formData.get(
        "evidence_url"
      )
    );

  const notes =
    optionalText(
      formData.get(
        "notes"
      )
    );

  const {
    error,
  } =
    await actor.supabase.rpc(
      "update_own_milestone_execution",
      {
        p_milestone_id:
          milestoneId,

        p_completion:
          completion,

        p_actual_start:
          actualStart,

        p_actual_end:
          actualEnd,

        p_evidence_url:
          evidenceUrl,

        p_notes:
          notes,
      }
    );

  if (error) {
    throw new Error(
      error.message
    );
  }

  revalidateStudent(
    studentId
  );
}

/* ============================================================
   WEEKLY UPDATE
============================================================ */

export async function addWeeklyUpdate(
  studentId: string,
  formData: FormData
) {
  const actor =
    await getActor();

  /*
   * Students can submit only their
   * own weekly update.
   */
  if (
    actor.role ===
    "student"
  ) {
    const {
      data: student,
    } =
      await actor.supabase
        .from("students")
        .select(
          "user_id"
        )
        .eq(
          "id",
          studentId
        )
        .maybeSingle();

    if (
      !student ||
      student.user_id !==
        actor.user.id
    ) {
      throw new Error(
        "You do not have permission to submit this weekly update."
      );
    }
  } else if (
    ![
      "admin",
      "research_manager",
    ].includes(
      actor.role
    )
  ) {
    throw new Error(
      "You do not have permission to submit this weekly update."
    );
  }

  const weekStart =
    String(
      formData.get(
        "week_start"
      ) ?? ""
    ).trim();

  if (!weekStart) {
    redirect(
      `/hub/students/${studentId}/weekly/new?error=${encodeURIComponent(
        "Week start date is required."
      )}`
    );
  }

  const {
    error,
  } =
    await actor.supabase
      .from(
        "weekly_updates"
      )
      .insert({
        student_id:
          studentId,

        week_start:
          weekStart,

        completed_this_week:
          optionalText(
            formData.get(
              "completed_this_week"
            )
          ),

        planned_next_week:
          optionalText(
            formData.get(
              "planned_next_week"
            )
          ),

        blockers:
          optionalText(
            formData.get(
              "blockers"
            )
          ),

        support_needed:
          optionalText(
            formData.get(
              "support_needed"
            )
          ),

        progress_note:
          optionalText(
            formData.get(
              "progress_note"
            )
          ),

        confidence:
          optionalText(
            formData.get(
              "confidence"
            )
          ),

        submitted_by:
          actor.user.id,
      });

  if (error) {
    redirect(
      `/hub/students/${studentId}/weekly/new?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  revalidateStudent(
    studentId
  );

  redirect(
    `/hub/students/${studentId}`
  );
}

/* ============================================================
   APPLY PhD PATHWAY TEMPLATE
============================================================ */

export async function applyPhDTemplate(
  studentId: string
) {
  const {
    supabase,
    user,
  } =
    await requireResearchManager();

  const {
    count,
  } =
    await supabase
      .from(
        "student_milestones"
      )
      .select(
        "id",
        {
          count:
            "exact",

          head:
            true,
        }
      )
      .eq(
        "student_id",
        studentId
      );

  if (
    (count ?? 0) >
    0
  ) {
    throw new Error(
      "This researcher already has milestones. The pathway template was not applied."
    );
  }

  const milestones = [
    {
      title:
        "Literature Review & Research Gap",
      sort_order: 1,
    },

    {
      title:
        "Problem Definition & Research Objectives",
      sort_order: 2,
    },

    {
      title:
        "Methodology & Experimental Plan",
      sort_order: 3,
    },

    {
      title:
        "Platform / System Development",
      sort_order: 4,
    },

    {
      title:
        "Optimization & Characterization",
      sort_order: 5,
    },

    {
      title:
        "Validation & Application",
      sort_order: 6,
    },

    {
      title:
        "Research Outputs & Publications",
      sort_order: 7,
    },

    {
      title:
        "Thesis & Defence",
      sort_order: 8,
    },
  ];

  const rows =
    milestones.map(
      (
        milestone
      ) => ({
        student_id:
          studentId,

        title:
          milestone.title,

        status:
          "Planned",

        /*
         * Legacy schema compatibility.
         */
        weight:
          0,

        completion:
          0,

        sort_order:
          milestone.sort_order,

        created_by:
          user.id,

        updated_by:
          user.id,
      })
    );

  const {
    error,
  } =
    await supabase
      .from(
        "student_milestones"
      )
      .insert(rows);

  if (error) {
    throw new Error(
      error.message
    );
  }

  await notifyStudent(
    supabase,
    studentId,
    {
      type:
        "research_plan_created",

      title:
        "PhD research pathway created",

      message:
        "Your PhD research pathway has been created in SenSys Hub.",

      entityType:
        "student",

      entityId:
        studentId,

      actionUrl:
        `/hub/students/${studentId}`,

      priority:
        "Normal",
    }
  );

  revalidateStudent(
    studentId
  );
}

/* ============================================================
   APPLY MSc PATHWAY TEMPLATE
============================================================ */

export async function applyMScTemplate(
  studentId: string
) {
  const {
    supabase,
    user,
  } =
    await requireResearchManager();

  const {
    count,
  } =
    await supabase
      .from(
        "student_milestones"
      )
      .select(
        "id",
        {
          count:
            "exact",

          head:
            true,
        }
      )
      .eq(
        "student_id",
        studentId
      );

  if (
    (count ?? 0) >
    0
  ) {
    throw new Error(
      "This researcher already has milestones. The pathway template was not applied."
    );
  }

  const milestones = [
    {
      title:
        "Literature Review & Research Gap",
      sort_order: 1,
    },

    {
      title:
        "Problem Definition & Objectives",
      sort_order: 2,
    },

    {
      title:
        "Methodology & Experimental Plan",
      sort_order: 3,
    },

    {
      title:
        "Experimental / System Development",
      sort_order: 4,
    },

    {
      title:
        "Validation & Results",
      sort_order: 5,
    },

    {
      title:
        "Research Output / Manuscript",
      sort_order: 6,
    },

    {
      title:
        "Thesis & Final Defence",
      sort_order: 7,
    },
  ];

  const rows =
    milestones.map(
      (
        milestone
      ) => ({
        student_id:
          studentId,

        title:
          milestone.title,

        status:
          "Planned",

        weight:
          0,

        completion:
          0,

        sort_order:
          milestone.sort_order,

        created_by:
          user.id,

        updated_by:
          user.id,
      })
    );

  const {
    error,
  } =
    await supabase
      .from(
        "student_milestones"
      )
      .insert(rows);

  if (error) {
    throw new Error(
      error.message
    );
  }

  await notifyStudent(
    supabase,
    studentId,
    {
      type:
        "research_plan_created",

      title:
        "MSc research pathway created",

      message:
        "Your MSc research pathway has been created in SenSys Hub.",

      entityType:
        "student",

      entityId:
        studentId,

      actionUrl:
        `/hub/students/${studentId}`,

      priority:
        "Normal",
    }
  );

  revalidateStudent(
    studentId
  );
}