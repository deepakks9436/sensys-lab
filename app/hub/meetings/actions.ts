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
   AUTH
============================================================ */

async function requireResearchManager() {
  const supabase =
    await createClient();

  const {
    data: {
      user,
    },
  } =
    await supabase.auth.getUser();

  if (!user) {
    redirect(
      "/login"
    );
  }

  const {
    data: profile,
  } =
    await supabase
      .from(
        "profiles"
      )
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
      "You do not have permission to manage meetings."
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
      value ??
        ""
    ).trim();

  return (
    text ||
    null
  );
}

function optionalTime(
  value:
    | FormDataEntryValue
    | null
) {
  const text =
    String(
      value ??
        ""
    ).trim();

  return (
    text ||
    null
  );
}

const allowedStatuses =
  [
    "Draft",
    "Published",
    "Closed",
    "Cancelled",
  ];

function safeStatus(
  value:
    | FormDataEntryValue
    | null
) {
  const status =
    String(
      value ??
        "Draft"
    );

  return allowedStatuses.includes(
    status
  )
    ? status
    : "Draft";
}

/* ============================================================
   NOTIFICATION
============================================================ */

async function notifyMeetingStudents(
  supabase: any,

  studentIds:
    string[],

  meeting: {
    id: string;
    title: string;
    meeting_date: string;

    start_time:
      | string
      | null;

    location:
      | string
      | null;
  },

  notificationType:
    | "meeting_published"
    | "meeting_updated"
) {
  const uniqueStudentIds =
    [
      ...new Set(
        studentIds
      ),
    ];

  for (
    const studentId of
    uniqueStudentIds
  ) {
    const timeText =
      meeting.start_time
        ? ` at ${String(
            meeting.start_time
          ).slice(
            0,
            5
          )}`
        : "";

    const locationText =
      meeting.location
        ? ` · ${meeting.location}`
        : "";

    await notifyStudent(
      supabase,
      studentId,
      {
        type:
          notificationType,

        title:
          notificationType ===
          "meeting_published"
            ? "Research meeting scheduled"
            : "Research meeting updated",

        message:
          `${meeting.title} — ${meeting.meeting_date}${timeText}${locationText}.`,

        entityType:
          "meeting",

        entityId:
          meeting.id,

        actionUrl:
          `/hub/meetings/${meeting.id}`,

        priority:
          "Normal",
      }
    );
  }
}

/* ============================================================
   CREATE MEETING
============================================================ */

export async function addMeeting(
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
      ) ??
        ""
    ).trim();

  const meetingDate =
    String(
      formData.get(
        "meeting_date"
      ) ??
        ""
    ).trim();

  if (
    !title ||
    !meetingDate
  ) {
    redirect(
      "/hub/meetings/new?error=Meeting%20title%20and%20date%20are%20required."
    );
  }

  const studentIds =
    formData
      .getAll(
        "student_ids"
      )
      .map(
        (
          value
        ) =>
          String(
            value
          )
      )
      .filter(
        Boolean
      );

  const meetingType =
    String(
      formData.get(
        "meeting_type"
      ) ??
        "Weekly Meeting"
    );

  const startTime =
    optionalTime(
      formData.get(
        "start_time"
      )
    );

  const endTime =
    optionalTime(
      formData.get(
        "end_time"
      )
    );

  const location =
    optionalText(
      formData.get(
        "location"
      )
    );

  const status =
    safeStatus(
      formData.get(
        "status"
      )
    );

  const {
    data: meeting,
    error,
  } =
    await supabase
      .from(
        "meetings"
      )
      .insert({
        title,

        meeting_type:
          meetingType,

        meeting_date:
          meetingDate,

        start_time:
          startTime,

        end_time:
          endTime,

        location,

        agenda:
          optionalText(
            formData.get(
              "agenda"
            )
          ),

        minutes:
          optionalText(
            formData.get(
              "minutes"
            )
          ),

        decisions:
          optionalText(
            formData.get(
              "decisions"
            )
          ),

        status,

        created_by:
          user.id,

        updated_by:
          user.id,
      })
      .select(
        `
        id,
        title,
        meeting_date,
        start_time,
        location,
        status
        `
      )
      .single();

  if (
    error ||
    !meeting
  ) {
    redirect(
      `/hub/meetings/new?error=${encodeURIComponent(
        error?.message ??
          "Unable to create meeting."
      )}`
    );
  }

  if (
    studentIds.length >
    0
  ) {
    const rows =
      studentIds.map(
        (
          studentId
        ) => ({
          meeting_id:
            meeting.id,

          student_id:
            studentId,
        })
      );

    const {
      error:
        linkError,
    } =
      await supabase
        .from(
          "meeting_students"
        )
        .insert(
          rows
        );

    if (
      linkError
    ) {
      throw new Error(
        linkError.message
      );
    }
  }

  /*
   * Draft meetings remain internal.
   * Once Published, researchers can
   * be informed.
   */
  if (
    status ===
    "Published"
  ) {
    await notifyMeetingStudents(
      supabase,
      studentIds,
      meeting,
      "meeting_published"
    );
  }

  revalidatePath(
    "/hub/meetings"
  );

  revalidatePath(
    "/hub"
  );

  redirect(
    `/hub/meetings/${meeting.id}`
  );
}

/* ============================================================
   UPDATE MEETING
============================================================ */

export async function updateMeeting(
  meetingId: string,
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
      ) ??
        ""
    ).trim();

  if (!title) {
    throw new Error(
      "Meeting title is required."
    );
  }

  const studentIds =
    formData
      .getAll(
        "student_ids"
      )
      .map(
        (
          value
        ) =>
          String(
            value
          )
      )
      .filter(
        Boolean
      );

  const {
    data:
      existingMeeting,
  } =
    await supabase
      .from(
        "meetings"
      )
      .select(
        `
        title,
        meeting_date,
        start_time,
        end_time,
        location,
        agenda,
        minutes,
        decisions,
        status
        `
      )
      .eq(
        "id",
        meetingId
      )
      .single();

  const {
    data:
      existingLinks,
  } =
    await supabase
      .from(
        "meeting_students"
      )
      .select(
        "student_id"
      )
      .eq(
        "meeting_id",
        meetingId
      );

  const previousStudentIds =
    (
      existingLinks ??
      []
    ).map(
      (
        row
      ) =>
        row.student_id
    );

  const meetingDate =
    String(
      formData.get(
        "meeting_date"
      ) ??
        ""
    ).trim();

  if (
    !meetingDate
  ) {
    throw new Error(
      "Meeting date is required."
    );
  }

  const startTime =
    optionalTime(
      formData.get(
        "start_time"
      )
    );

  const endTime =
    optionalTime(
      formData.get(
        "end_time"
      )
    );

  const location =
    optionalText(
      formData.get(
        "location"
      )
    );

  const agenda =
    optionalText(
      formData.get(
        "agenda"
      )
    );

  const minutes =
    optionalText(
      formData.get(
        "minutes"
      )
    );

  const decisions =
    optionalText(
      formData.get(
        "decisions"
      )
    );

  const status =
    safeStatus(
      formData.get(
        "status"
      )
    );

  const meetingType =
    String(
      formData.get(
        "meeting_type"
      ) ??
        "Weekly Meeting"
    );

  /* ========================================================
     UPDATE CORE MEETING
  ======================================================== */

  const {
    error,
  } =
    await supabase
      .from(
        "meetings"
      )
      .update({
        title,

        meeting_type:
          meetingType,

        meeting_date:
          meetingDate,

        start_time:
          startTime,

        end_time:
          endTime,

        location,

        agenda,

        minutes,

        decisions,

        status,

        updated_by:
          user.id,
      })
      .eq(
        "id",
        meetingId
      );

  if (error) {
    throw new Error(
      error.message
    );
  }

  /* ========================================================
     UPDATE LINKED RESEARCHERS
  ======================================================== */

  const {
    error:
      removeError,
  } =
    await supabase
      .from(
        "meeting_students"
      )
      .delete()
      .eq(
        "meeting_id",
        meetingId
      );

  if (
    removeError
  ) {
    throw new Error(
      removeError.message
    );
  }

  if (
    studentIds.length >
    0
  ) {
    const rows =
      studentIds.map(
        (
          studentId
        ) => ({
          meeting_id:
            meetingId,

          student_id:
            studentId,
        })
      );

    const {
      error:
        linkError,
    } =
      await supabase
        .from(
          "meeting_students"
        )
        .insert(
          rows
        );

    if (
      linkError
    ) {
      throw new Error(
        linkError.message
      );
    }
  }

  /* ========================================================
     SMART NOTIFICATIONS

     Important fix:
     do not notify researchers merely
     because somebody clicked Save.
  ======================================================== */

  const wasPublished =
    existingMeeting?.status ===
    "Published";

  const isPublished =
    status ===
    "Published";

  const justPublished =
    !wasPublished &&
    isPublished;

  const relevantChanged =
    existingMeeting?.title !==
      title ||
    existingMeeting?.meeting_date !==
      meetingDate ||
    existingMeeting?.start_time !==
      startTime ||
    existingMeeting?.end_time !==
      endTime ||
    existingMeeting?.location !==
      location ||
    existingMeeting?.agenda !==
      agenda ||
    existingMeeting?.minutes !==
      minutes ||
    existingMeeting?.decisions !==
      decisions;

  const linkedStudentsChanged =
    [
      ...studentIds,
    ]
      .sort()
      .join(
        "|"
      ) !==
    [
      ...previousStudentIds,
    ]
      .sort()
      .join(
        "|"
      );

  /*
   * Notify only if:
   *
   * 1. meeting has just become
   *    visible to researchers;
   * 2. published meeting details
   *    materially changed;
   * 3. linked researcher list changed.
   */

  if (
    isPublished &&
    (
      justPublished ||
      relevantChanged ||
      linkedStudentsChanged
    )
  ) {
    await notifyMeetingStudents(
      supabase,
      studentIds,
      {
        id:
          meetingId,

        title,

        meeting_date:
          meetingDate,

        start_time:
          startTime,

        location,
      },

      justPublished
        ? "meeting_published"
        : "meeting_updated"
    );
  }

  revalidatePath(
    "/hub/meetings"
  );

  revalidatePath(
    `/hub/meetings/${meetingId}`
  );

  revalidatePath(
    "/hub"
  );

  redirect(
    `/hub/meetings/${meetingId}`
  );
}