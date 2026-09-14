"use server";

import {
  revalidatePath,
} from "next/cache";

import {
  redirect,
} from "next/navigation";

import {
  createClient,
} from "../../../../../lib/supabase/server";

import {
  notifyStudent,
} from "../../../../../lib/hub/notifications";

/* ============================================================
   TYPES
============================================================ */

const workstreamStatuses = [
  "Planned",
  "In Progress",
  "Delayed",
  "Completed",
  "On Hold",
] as const;

const outputStatuses = [
  "Planned",
  "In Progress",
  "Submitted",
  "Completed",
  "On Hold",
] as const;

type WorkstreamStatus =
  (typeof workstreamStatuses)[number];

type OutputStatus =
  (typeof outputStatuses)[number];

/* ============================================================
   AUTH
============================================================ */

async function requireResearchManager() {
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
    !profile.is_active ||
    ![
      "admin",
      "research_manager",
    ].includes(
      profile.role
    )
  ) {
    throw new Error(
      "You do not have permission to manage the research portfolio."
    );
  }

  return {
    supabase,
    user,
  };
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

function integerValue(
  value:
    | FormDataEntryValue
    | null,
  fallback = 0
) {
  const parsed =
    Number.parseInt(
      String(
        value ?? ""
      ),
      10
    );

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

function isWorkstreamStatus(
  value: string
): value is WorkstreamStatus {
  return (
    workstreamStatuses as readonly string[]
  ).includes(value);
}

function isOutputStatus(
  value: string
): value is OutputStatus {
  return (
    outputStatuses as readonly string[]
  ).includes(value);
}

function revalidatePortfolio(
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

  revalidatePath(
    `/hub/students/${studentId}/portfolio`
  );
}

/* ============================================================
   INTERNAL SORT ORDER
============================================================ */

async function nextWorkstreamOrder(
  supabase: any,
  studentId: string
) {
  const {
    data,
  } =
    await supabase
      .from(
        "research_workstreams"
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

async function nextOutputOrder(
  supabase: any,
  studentId: string
) {
  const {
    data,
  } =
    await supabase
      .from(
        "research_outputs"
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

/* ============================================================
   AUTOMATIC WORKSTREAM DATES
============================================================ */

function automaticWorkstreamDates(
  status: WorkstreamStatus,
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

/* ============================================================
   ADD WORKSTREAM
============================================================ */

export async function addWorkstream(
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
      `/hub/students/${studentId}/portfolio?error=${encodeURIComponent(
        "Workstream name is required."
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
    !isWorkstreamStatus(
      rawStatus
    )
  ) {
    redirect(
      `/hub/students/${studentId}/portfolio?error=${encodeURIComponent(
        "Invalid workstream status."
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
      `/hub/students/${studentId}/portfolio?error=${encodeURIComponent(
        "Target date cannot be earlier than the planned start date."
      )}`
    );
  }

  const {
    actualStart,
    actualEnd,
  } =
    automaticWorkstreamDates(
      status
    );

  const sortOrder =
    await nextWorkstreamOrder(
      supabase,
      studentId
    );

  const {
    data: workstream,
    error,
  } =
    await supabase
      .from(
        "research_workstreams"
      )
      .insert({
        student_id:
          studentId,

        title,

        category:
          optionalText(
            formData.get(
              "category"
            )
          ),

        /*
         * We use description as the
         * single Notes field.
         */
        description:
          optionalText(
            formData.get(
              "notes"
            )
          ),

        planned_start:
          plannedStart,

        planned_end:
          plannedEnd,

        actual_start:
          actualStart,

        actual_end:
          actualEnd,

        status,

        current_focus:
          optionalText(
            formData.get(
              "current_focus"
            )
          ),

        /*
         * Legacy DB column retained.
         * No longer user-facing.
         */
        priority:
          "Medium",

        sort_order:
          sortOrder,

        created_by:
          user.id,

        updated_by:
          user.id,
      })
      .select(
        "id, title"
      )
      .single();

  if (
    error ||
    !workstream
  ) {
    redirect(
      `/hub/students/${studentId}/portfolio?error=${encodeURIComponent(
        error?.message ??
          "Unable to create workstream."
      )}`
    );
  }

  await notifyStudent(
    supabase,
    studentId,
    {
      type:
        "workstream_added",

      title:
        "Research workstream added",

      message:
        `${workstream.title} has been added to your research portfolio.`,

      entityType:
        "research_workstream",

      entityId:
        workstream.id,

      actionUrl:
        `/hub/students/${studentId}`,

      priority:
        "Normal",
    }
  );

  revalidatePortfolio(
    studentId
  );

  redirect(
    `/hub/students/${studentId}/portfolio?success=workstream-added`
  );
}

/* ============================================================
   UPDATE WORKSTREAM
============================================================ */

export async function updateWorkstream(
  studentId: string,
  workstreamId: string,
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
    throw new Error(
      "Workstream name is required."
    );
  }

  const rawStatus =
    String(
      formData.get(
        "status"
      ) ?? "Planned"
    );

  if (
    !isWorkstreamStatus(
      rawStatus
    )
  ) {
    throw new Error(
      "Invalid workstream status."
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
    throw new Error(
      "Target date cannot be earlier than the planned start date."
    );
  }

  const {
    data: existing,
  } =
    await supabase
      .from(
        "research_workstreams"
      )
      .select(
        `
        title,
        category,
        status,
        planned_start,
        planned_end,
        actual_start,
        actual_end,
        current_focus,
        description,
        sort_order
        `
      )
      .eq(
        "id",
        workstreamId
      )
      .eq(
        "student_id",
        studentId
      )
      .maybeSingle();

  if (!existing) {
    throw new Error(
      "Workstream not found."
    );
  }

  const {
    actualStart,
    actualEnd,
  } =
    automaticWorkstreamDates(
      status,
      existing
    );

  const currentFocus =
    optionalText(
      formData.get(
        "current_focus"
      )
    );

  const notes =
    optionalText(
      formData.get(
        "notes"
      )
    );

  const category =
    optionalText(
      formData.get(
        "category"
      )
    );

  const {
    error,
  } =
    await supabase
      .from(
        "research_workstreams"
      )
      .update({
        title,

        category,

        description:
          notes,

        planned_start:
          plannedStart,

        planned_end:
          plannedEnd,

        actual_start:
          actualStart,

        actual_end:
          actualEnd,

        status,

        current_focus:
          currentFocus,

        priority:
          "Medium",

        sort_order:
          existing.sort_order ??
          0,

        updated_by:
          user.id,
      })
      .eq(
        "id",
        workstreamId
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

  const importantChanged =
    existing.title !==
      title ||
    existing.status !==
      status ||
    existing.planned_start !==
      plannedStart ||
    existing.planned_end !==
      plannedEnd ||
    existing.current_focus !==
      currentFocus;

  if (
    importantChanged
  ) {
    await notifyStudent(
      supabase,
      studentId,
      {
        type:
          "workstream_updated",

        title:
          "Research workstream updated",

        message:
          plannedEnd
            ? `${title} is now ${status}. Target: ${plannedEnd}.`
            : `${title} is now ${status}.`,

        entityType:
          "research_workstream",

        entityId:
          workstreamId,

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

  revalidatePortfolio(
    studentId
  );
}

/* ============================================================
   DELETE WORKSTREAM
============================================================ */

export async function deleteWorkstream(
  studentId: string,
  workstreamId: string
) {
  const {
    supabase,
  } =
    await requireResearchManager();

  const {
    data: existing,
  } =
    await supabase
      .from(
        "research_workstreams"
      )
      .select(
        "title"
      )
      .eq(
        "id",
        workstreamId
      )
      .eq(
        "student_id",
        studentId
      )
      .maybeSingle();

  const {
    error,
  } =
    await supabase
      .from(
        "research_workstreams"
      )
      .delete()
      .eq(
        "id",
        workstreamId
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

  if (existing) {
    await notifyStudent(
      supabase,
      studentId,
      {
        type:
          "workstream_removed",

        title:
          "Research workstream removed",

        message:
          `${existing.title} has been removed from your research portfolio.`,

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

  revalidatePortfolio(
    studentId
  );
}

/* ============================================================
   ADD OUTPUT
============================================================ */

export async function addResearchOutput(
  studentId: string,
  formData: FormData
) {
  const {
    supabase,
    user,
  } =
    await requireResearchManager();

  const outputType =
    String(
      formData.get(
        "output_type"
      ) ?? ""
    ).trim();

  if (!outputType) {
    redirect(
      `/hub/students/${studentId}/portfolio?error=${encodeURIComponent(
        "Output type is required."
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
    !isOutputStatus(
      rawStatus
    )
  ) {
    redirect(
      `/hub/students/${studentId}/portfolio?error=${encodeURIComponent(
        "Invalid output status."
      )}`
    );
  }

  const status =
    rawStatus;

  const targetCount =
    Math.max(
      0,
      integerValue(
        formData.get(
          "target_count"
        ),
        1
      )
    );

  const achievedCount =
    Math.max(
      0,
      integerValue(
        formData.get(
          "achieved_count"
        ),
        0
      )
    );

  const sortOrder =
    await nextOutputOrder(
      supabase,
      studentId
    );

  const completed =
    status ===
      "Completed" ||
    (
      targetCount >
        0 &&
      achievedCount >=
        targetCount
    );

  const {
    data: output,
    error,
  } =
    await supabase
      .from(
        "research_outputs"
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

        output_type:
          outputType,

        title:
          optionalText(
            formData.get(
              "title"
            )
          ),

        target_count:
          targetCount,

        achieved_count:
          achievedCount,

        status:
          completed
            ? "Completed"
            : status,

        target_date:
          optionalDate(
            formData.get(
              "target_date"
            )
          ),

        achieved_date:
          completed
            ? todayDate()
            : null,

        reference_url:
          optionalText(
            formData.get(
              "reference_url"
            )
          ),

        notes:
          optionalText(
            formData.get(
              "notes"
            )
          ),

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
        output_type
        `
      )
      .single();

  if (
    error ||
    !output
  ) {
    redirect(
      `/hub/students/${studentId}/portfolio?error=${encodeURIComponent(
        error?.message ??
          "Unable to add research output."
      )}`
    );
  }

  await notifyStudent(
    supabase,
    studentId,
    {
      type:
        "research_output_added",

      title:
        "Research output added",

      message:
        `${output.title || output.output_type} has been added to your research output plan.`,

      entityType:
        "research_output",

      entityId:
        output.id,

      actionUrl:
        `/hub/students/${studentId}`,

      priority:
        "Normal",
    }
  );

  revalidatePortfolio(
    studentId
  );

  redirect(
    `/hub/students/${studentId}/portfolio?success=output-added`
  );
}

/* ============================================================
   UPDATE OUTPUT
============================================================ */

export async function updateResearchOutput(
  studentId: string,
  outputId: string,
  formData: FormData
) {
  const {
    supabase,
    user,
  } =
    await requireResearchManager();

  const outputType =
    String(
      formData.get(
        "output_type"
      ) ?? ""
    ).trim();

  if (!outputType) {
    throw new Error(
      "Output type is required."
    );
  }

  const rawStatus =
    String(
      formData.get(
        "status"
      ) ?? "Planned"
    );

  if (
    !isOutputStatus(
      rawStatus
    )
  ) {
    throw new Error(
      "Invalid output status."
    );
  }

  const targetCount =
    Math.max(
      0,
      integerValue(
        formData.get(
          "target_count"
        ),
        1
      )
    );

  const achievedCount =
    Math.max(
      0,
      integerValue(
        formData.get(
          "achieved_count"
        ),
        0
      )
    );

  const {
    data: existing,
  } =
    await supabase
      .from(
        "research_outputs"
      )
      .select(
        `
        title,
        output_type,
        target_count,
        achieved_count,
        status,
        target_date,
        achieved_date,
        sort_order
        `
      )
      .eq(
        "id",
        outputId
      )
      .eq(
        "student_id",
        studentId
      )
      .maybeSingle();

  if (!existing) {
    throw new Error(
      "Research output not found."
    );
  }

  const title =
    optionalText(
      formData.get(
        "title"
      )
    );

  const targetDate =
    optionalDate(
      formData.get(
        "target_date"
      )
    );

  const completed =
    rawStatus ===
      "Completed" ||
    (
      targetCount >
        0 &&
      achievedCount >=
        targetCount
    );

  const status:
    OutputStatus =
    completed
      ? "Completed"
      : rawStatus;

  let achievedDate =
    existing.achieved_date;

  if (
    completed &&
    !achievedDate
  ) {
    achievedDate =
      todayDate();
  }

  if (
    existing.status ===
      "Completed" &&
    status !==
      "Completed"
  ) {
    achievedDate =
      null;
  }

  const {
    error,
  } =
    await supabase
      .from(
        "research_outputs"
      )
      .update({
        workstream_id:
          optionalText(
            formData.get(
              "workstream_id"
            )
          ),

        output_type:
          outputType,

        title,

        target_count:
          targetCount,

        achieved_count:
          achievedCount,

        status,

        target_date:
          targetDate,

        achieved_date:
          achievedDate,

        reference_url:
          optionalText(
            formData.get(
              "reference_url"
            )
          ),

        notes:
          optionalText(
            formData.get(
              "notes"
            )
          ),

        sort_order:
          existing.sort_order ??
          0,

        updated_by:
          user.id,
      })
      .eq(
        "id",
        outputId
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

  const importantChanged =
    existing.title !==
      title ||
    existing.output_type !==
      outputType ||
    Number(
      existing.target_count ??
        0
    ) !==
      targetCount ||
    Number(
      existing.achieved_count ??
        0
    ) !==
      achievedCount ||
    existing.status !==
      status ||
    existing.target_date !==
      targetDate;

  if (
    importantChanged
  ) {
    await notifyStudent(
      supabase,
      studentId,
      {
        type:
          "research_output_updated",

        title:
          "Research output updated",

        message:
          `${title || outputType}: ${achievedCount}/${targetCount} achieved · ${status}.`,

        entityType:
          "research_output",

        entityId:
          outputId,

        actionUrl:
          `/hub/students/${studentId}`,

        priority:
          "Normal",
      }
    );
  }

  revalidatePortfolio(
    studentId
  );
}

/* ============================================================
   DELETE OUTPUT
============================================================ */

export async function deleteResearchOutput(
  studentId: string,
  outputId: string
) {
  const {
    supabase,
  } =
    await requireResearchManager();

  const {
    data: existing,
  } =
    await supabase
      .from(
        "research_outputs"
      )
      .select(
        "title, output_type"
      )
      .eq(
        "id",
        outputId
      )
      .eq(
        "student_id",
        studentId
      )
      .maybeSingle();

  const {
    error,
  } =
    await supabase
      .from(
        "research_outputs"
      )
      .delete()
      .eq(
        "id",
        outputId
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

  if (existing) {
    await notifyStudent(
      supabase,
      studentId,
      {
        type:
          "research_output_removed",

        title:
          "Research output removed",

        message:
          `${existing.title || existing.output_type} has been removed from your research output plan.`,

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

  revalidatePortfolio(
    studentId
  );
}