import Link from "next/link";

import {
  notFound,
} from "next/navigation";

import {
  createClient,
} from "../../../../lib/supabase/server";

/* ============================================================
   UI HELPERS
============================================================ */

function formatTime(
  value:
    | string
    | null
) {
  if (!value) {
    return null;
  }

  return String(
    value
  ).slice(
    0,
    5
  );
}

function formatDate(
  value:
    | string
    | null
) {
  if (!value) {
    return "Not set";
  }

  const date =
    new Date(
      `${value}T00:00:00`
    );

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return value;
  }

  return new Intl.DateTimeFormat(
    "en-CA",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  ).format(date);
}

function meetingDisplayStatus(
  status: string,
  meetingDate: string
) {
  const today =
    new Date()
      .toISOString()
      .slice(
        0,
        10
      );

  if (
    status ===
    "Cancelled"
  ) {
    return "Cancelled";
  }

  if (
    status ===
    "Closed"
  ) {
    return "Completed";
  }

  if (
    status ===
    "Draft"
  ) {
    return "Preparing";
  }

  if (
    status ===
    "Published"
  ) {
    return meetingDate >=
      today
      ? "Scheduled"
      : "Shared";
  }

  return status;
}

function statusClasses(
  status: string
) {
  if (
    status ===
    "Completed"
  ) {
    return "bg-[#E8F4EC] text-[#2D6A45]";
  }

  if (
    status ===
    "Scheduled"
  ) {
    return "bg-[#E8EFF8] text-[#385E9D]";
  }

  if (
    status ===
    "Cancelled"
  ) {
    return "bg-[#FBE7E5] text-[#A23B35]";
  }

  if (
    status ===
    "Shared"
  ) {
    return "bg-[#EEF2F8] text-[#385E9D]";
  }

  return "bg-[#FFF4D9] text-[#8A6200]";
}

function actionStatusClasses(
  status: string
) {
  if (
    status ===
    "Completed"
  ) {
    return "bg-[#E8F4EC] text-[#2D6A45]";
  }

  if (
    status ===
    "Overdue"
  ) {
    return "bg-[#FBE7E5] text-[#A23B35]";
  }

  if (
    status ===
    "In Progress"
  ) {
    return "bg-[#FFF4D9] text-[#8A6200]";
  }

  return "bg-[#EEF2F8] text-[#385E9D]";
}

function priorityClasses(
  priority: string
) {
  if (
    priority ===
    "Critical"
  ) {
    return "bg-[#FBE7E5] text-[#A23B35]";
  }

  if (
    priority ===
    "High"
  ) {
    return "bg-[#FFF0E3] text-[#A15B16]";
  }

  if (
    priority ===
    "Medium"
  ) {
    return "bg-[#FFF4D9] text-[#8A6200]";
  }

  return "bg-[#EEF2F8] text-[#385E9D]";
}

/* ============================================================
   PAGE
============================================================ */

export default async function MeetingPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const {
    id,
  } =
    await params;

  const supabase =
    await createClient();

  const {
    data: {
      user,
    },
  } =
    await supabase.auth.getUser();

  if (!user) {
    notFound();
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
    !profile.is_active
  ) {
    notFound();
  }

  const canManage =
    [
      "admin",
      "research_manager",
    ].includes(
      profile.role
    );

  const isStudent =
    profile.role ===
    "student";

  /* ========================================================
     MEETING
  ======================================================== */

  const {
    data: meeting,
  } =
    await supabase
      .from(
        "meetings"
      )
      .select("*")
      .eq(
        "id",
        id
      )
      .maybeSingle();

  if (!meeting) {
    notFound();
  }

  /* ========================================================
     LINKED RESEARCHERS
  ======================================================== */

  const {
    data: links,
  } =
    await supabase
      .from(
        "meeting_students"
      )
      .select(
        `
        student_id,
        students (
          id,
          user_id,
          full_name,
          programme,
          research_area,
          status
        )
        `
      )
      .eq(
        "meeting_id",
        id
      );

  const researchers =
    (
      links ??
      []
    )
      .map(
        (
          link
        ) => {
          const student =
            Array.isArray(
              link.students
            )
              ? link.students[0]
              : link.students;

          return student
            ? {
                ...student,
                meeting_student_id:
                  link.student_id,
              }
            : null;
        }
      )
      .filter(
        Boolean
      ) as any[];

  /* ========================================================
     PRIVACY FOR CHECK-INS

     Managers:
     all linked researchers.

     Students:
     their own record only.
  ======================================================== */

  const visibleResearchers =
    isStudent
      ? researchers.filter(
          (
            researcher
          ) =>
            researcher.user_id ===
            user.id
        )
      : researchers;

  const visibleStudentIds =
    visibleResearchers.map(
      (
        researcher
      ) =>
        researcher.id
    );

  /* ========================================================
     RESEARCH CHECK-INS
  ======================================================== */

  let checkIns: any[] =
    [];

  if (
    visibleStudentIds.length >
    0
  ) {
    const {
      data,
    } =
      await supabase
        .from(
          "weekly_updates"
        )
        .select("*")
        .in(
          "student_id",
          visibleStudentIds
        )
        .lte(
          "week_start",
          meeting.meeting_date
        )
        .order(
          "week_start",
          {
            ascending:
              false,
          }
        );

    checkIns =
      data ??
      [];
  }

  /*
   * Since results are descending,
   * the first entry encountered for
   * each student is their latest
   * check-in before this meeting.
   */

  const latestCheckInByStudent =
    new Map<
      string,
      any
    >();

  for (
    const update of
    checkIns
  ) {
    if (
      !latestCheckInByStudent.has(
        update.student_id
      )
    ) {
      latestCheckInByStudent.set(
        update.student_id,
        update
      );
    }
  }

  /* ========================================================
     LINKED ACTIONS
  ======================================================== */

  const {
    data: actions,
  } =
    await supabase
      .from(
        "action_items"
      )
      .select(
        `
        id,
        title,
        description,
        status,
        priority,
        due_date,
        owner_name,
        student_id,
        students (
          id,
          full_name,
          programme
        )
        `
      )
      .eq(
        "meeting_id",
        id
      )
      .neq(
        "status",
        "Cancelled"
      )
      .order(
        "created_at",
        {
          ascending:
            true,
        }
      );

  const today =
    new Date()
      .toISOString()
      .slice(
        0,
        10
      );

  const preparedActions =
    (
      actions ??
      []
    ).map(
      (
        action
      ) => {
        let displayStatus =
          action.status;

        if (
          action.due_date &&
          action.due_date <
            today &&
          ![
            "Completed",
            "Cancelled",
          ].includes(
            action.status
          )
        ) {
          displayStatus =
            "Overdue";
        }

        return {
          ...action,
          displayStatus,
        };
      }
    );

  /* ========================================================
     REVIEW CONTINUITY

     For every researcher visible to the current user,
     find their most recent earlier research review and
     surface any unresolved actions from that review.

     Nothing is duplicated in the database.
     These remain the original action items.
  ======================================================== */

  let previousMeetingLinks: any[] =
    [];

  if (
    visibleStudentIds.length >
    0
  ) {
    const {
      data,
    } =
      await supabase
        .from(
          "meeting_students"
        )
        .select(
          `
          student_id,
          meeting_id,
          meetings (
            id,
            title,
            meeting_date,
            status
          )
          `
        )
        .in(
          "student_id",
          visibleStudentIds
        );

    previousMeetingLinks =
      data ??
      [];
  }

  const previousMeetingByStudent =
    new Map<
      string,
      any
    >();

  for (
    const link of
    previousMeetingLinks
  ) {
    const linkedMeeting =
      Array.isArray(
        link.meetings
      )
        ? link.meetings[0]
        : link.meetings;

    if (
      !linkedMeeting ||
      linkedMeeting.id === id ||
      !linkedMeeting.meeting_date ||
      linkedMeeting.meeting_date >=
        meeting.meeting_date ||
      linkedMeeting.status ===
        "Cancelled"
    ) {
      continue;
    }

    const existing =
      previousMeetingByStudent.get(
        link.student_id
      );

    if (
      !existing ||
      linkedMeeting.meeting_date >
        existing.meeting_date
    ) {
      previousMeetingByStudent.set(
        link.student_id,
        linkedMeeting
      );
    }
  }

  const previousMeetingIds =
    [
      ...new Set(
        Array.from(
          previousMeetingByStudent.values()
        ).map(
          (
            previousMeeting
          ) =>
            previousMeeting.id
        )
      ),
    ];

  const previousMeetingMeta =
    new Map<
      string,
      any
    >();

  for (
    const previousMeeting of
    previousMeetingByStudent.values()
  ) {
    previousMeetingMeta.set(
      previousMeeting.id,
      previousMeeting
    );
  }

  let carriedForwardRaw: any[] =
    [];

  if (
    previousMeetingIds.length >
      0 &&
    visibleStudentIds.length >
      0
  ) {
    const {
      data,
    } =
      await supabase
        .from(
          "action_items"
        )
        .select(
          `
          id,
          title,
          description,
          status,
          priority,
          due_date,
          owner_name,
          student_id,
          meeting_id,
          students (
            id,
            full_name,
            programme
          )
          `
        )
        .in(
          "meeting_id",
          previousMeetingIds
        )
        .in(
          "student_id",
          visibleStudentIds
        )
        .order(
          "due_date",
          {
            ascending:
              true,
            nullsFirst:
              false,
          }
        );

    carriedForwardRaw =
      data ??
      [];
  }

  const carriedForwardActions =
    carriedForwardRaw
      .filter(
        (
          action
        ) => {
          if (
            [
              "Completed",
              "Cancelled",
            ].includes(
              action.status
            )
          ) {
            return false;
          }

          const expectedMeeting =
            previousMeetingByStudent.get(
              action.student_id
            );

          return (
            expectedMeeting?.id ===
            action.meeting_id
          );
        }
      )
      .map(
        (
          action
        ) => {
          let displayStatus =
            action.status;

          if (
            action.due_date &&
            action.due_date <
              today
          ) {
            displayStatus =
              "Overdue";
          }

          return {
            ...action,
            displayStatus,
            sourceMeeting:
              previousMeetingMeta.get(
                action.meeting_id
              ) ??
              null,
          };
        }
      );

  const carriedForwardOverdueActions =
    carriedForwardActions.filter(
      (
        action
      ) =>
        action.displayStatus ===
        "Overdue"
    );

  const openActions =
    preparedActions.filter(
      (
        action
      ) =>
        action.displayStatus !==
        "Completed"
    );

  const overdueActions =
    preparedActions.filter(
      (
        action
      ) =>
        action.displayStatus ===
        "Overdue"
    );

  const totalOpenActions =
    openActions.length +
    carriedForwardActions.length;

  const totalOverdueActions =
    overdueActions.length +
    carriedForwardOverdueActions.length;

  const startTime =
    formatTime(
      meeting.start_time
    );

  const endTime =
    formatTime(
      meeting.end_time
    );

  const displayStatus =
    meetingDisplayStatus(
      meeting.status,
      meeting.meeting_date
    );

  const researchersWithCheckIn =
    visibleResearchers.filter(
      (
        researcher
      ) =>
        latestCheckInByStudent.has(
          researcher.id
        )
    ).length;

  const completedActions =
    preparedActions.filter(
      (
        action
      ) =>
        action.displayStatus ===
        "Completed"
    );

  const reviewHealth =
    meeting.status ===
    "Closed"
      ? "Closed"
      : totalOverdueActions > 0
        ? "Attention Needed"
        : totalOpenActions > 0
          ? "On Track"
          : "Clear";

  const reviewHealthClasses =
    reviewHealth ===
    "Attention Needed"
      ? "bg-[#FBE7E5] text-[#A23B35]"
      : reviewHealth ===
          "Closed"
        ? "bg-[#EEF2F8] text-[#385E9D]"
        : reviewHealth ===
            "On Track"
          ? "bg-[#FFF4D9] text-[#8A6200]"
          : "bg-[#E8F4EC] text-[#2D6A45]";

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[1280px]">
        {/* ================================================= */}
        {/* TOP BAR */}
        {/* ================================================= */}

        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/hub/meetings"
            className="text-xs font-semibold text-[#385E9D]"
          >
            ← Research Reviews
          </Link>

          {canManage && (
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/hub/meetings/${id}/edit`}
                className="rounded-full border border-[#D8D0C7] bg-white px-5 py-2.5 text-xs font-semibold"
              >
                Edit Meeting
              </Link>

              <Link
                href={`/hub/actions/new?meeting=${id}`}
                className="rounded-full bg-[#385E9D] px-5 py-2.5 text-xs font-semibold text-white"
              >
                + Action
              </Link>
            </div>
          )}
        </div>

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <section className="mt-6 overflow-hidden border border-[#DDD6CF] bg-white">
          <div className="grid lg:grid-cols-[1.35fr_0.65fr]">
            <div className="p-7">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-[8px] font-bold ${statusClasses(
                    displayStatus
                  )}`}
                >
                  {displayStatus}
                </span>

                <span className="text-[10px] text-[#928980]">
                  {
                    meeting.meeting_type
                  }
                </span>
              </div>

              <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em] md:text-5xl">
                {
                  meeting.title
                }
              </h1>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#706963]">
                <span>
                  {formatDate(
                    meeting.meeting_date
                  )}
                </span>

                {startTime && (
                  <span>
                    {
                      startTime
                    }

                    {endTime
                      ? ` – ${endTime}`
                      : ""}
                  </span>
                )}

                <span>
                  {meeting.location ||
                    "Location not specified"}
                </span>

                {meeting.next_review_date && (
                  <span className="font-semibold text-[#385E9D]">
                    Next review:{" "}
                    {formatDate(
                      meeting.next_review_date
                    )}
                  </span>
                )}
              </div>
            </div>

            <div className="bg-[#203650] p-7 text-white">
              <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#F2A900]">
                Meeting Snapshot
              </p>

              <div className="mt-5 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-2xl font-bold">
                    {
                      researchers.length
                    }
                  </p>

                  <p className="mt-1 text-[8px] text-white/50">
                    Researchers
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold">
                    {
                      researchersWithCheckIn
                    }
                  </p>

                  <p className="mt-1 text-[8px] text-white/50">
                    Check-ins
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold">
                    {
                      openActions.length
                    }
                  </p>

                  <p className="mt-1 text-[8px] text-white/50">
                    Open actions
                  </p>
                </div>
              </div>

              {overdueActions.length >
                0 && (
                <div className="mt-6 border-t border-white/15 pt-4">
                  <p className="text-[10px] font-semibold text-[#F2A900]">
                    {
                      overdueActions.length
                    }{" "}
                    overdue follow-up
                    {overdueActions.length ===
                    1
                      ? ""
                      : "s"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* RESEARCH REVIEW SUMMARY */}
        {/* ================================================= */}

        <section className="mt-8 overflow-hidden border border-[#DDD6CF] bg-white">
          <div className="flex flex-col justify-between gap-4 border-b border-[#E7E1DB] px-6 py-5 md:flex-row md:items-center">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
                Review Status
              </p>

              <h2 className="mt-1 text-xl font-bold">
                Research Review Summary
              </h2>
            </div>

            <span
              className={`w-fit rounded-full px-3 py-1.5 text-[9px] font-bold ${reviewHealthClasses}`}
            >
              {reviewHealth}
            </span>
          </div>

          <div className="grid divide-y divide-[#EEE9E4] sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-4">
            <div className="p-6">
              <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#928980]">
                Open Actions
              </p>

              <p className="mt-3 text-3xl font-bold text-[#203650]">
                {totalOpenActions}
              </p>

              <p className="mt-2 text-[10px] leading-5 text-[#837A72]">
                Current and carried-forward follow-up still requiring completion.
              </p>
            </div>

            <div className="p-6">
              <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#928980]">
                Overdue
              </p>

              <p
                className={`mt-3 text-3xl font-bold ${
                  totalOverdueActions >
                  0
                    ? "text-[#A23B35]"
                    : "text-[#2D6A45]"
                }`}
              >
                {totalOverdueActions}
              </p>

              <p className="mt-2 text-[10px] leading-5 text-[#837A72]">
                Actions beyond their agreed due date.
              </p>
            </div>

            <div className="p-6">
              <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#928980]">
                Completed
              </p>

              <p className="mt-3 text-3xl font-bold text-[#2D6A45]">
                {completedActions.length}
              </p>

              <p className="mt-2 text-[10px] leading-5 text-[#837A72]">
                Follow-up items completed from this review.
              </p>
            </div>

            <div className="p-6">
              <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#928980]">
                Next Review
              </p>

              <p className="mt-3 text-lg font-bold text-[#385E9D]">
                {meeting.next_review_date
                  ? formatDate(
                      meeting.next_review_date
                    )
                  : "Not scheduled"}
              </p>

              <p className="mt-2 text-[10px] leading-5 text-[#837A72]">
                Planned date for the next formal research review.
              </p>

              {canManage && (
                <Link
                  href={`/hub/meetings/${id}/edit`}
                  className="mt-3 inline-block text-[10px] font-semibold text-[#385E9D]"
                >
                  {meeting.next_review_date
                    ? "Change date →"
                    : "Schedule review →"}
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* CARRIED FORWARD */}
        {/* ================================================= */}

        {carriedForwardActions.length >
          0 && (
          <section className="mt-8 overflow-hidden border border-[#DDD6CF] bg-white">
            <div className="flex flex-col justify-between gap-3 border-b border-[#E7E1DB] px-6 py-5 md:flex-row md:items-center">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A15B16]">
                  Review Continuity
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Carried Forward from Previous Review
                </h2>

                <p className="mt-2 max-w-2xl text-[10px] leading-5 text-[#837A72]">
                  Unresolved actions from each researcher&apos;s most recent earlier review remain visible here until they are completed.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-[#FFF4D9] px-3 py-1.5 text-[9px] font-bold text-[#8A6200]">
                  {carriedForwardActions.length} carried forward
                </span>

                {carriedForwardOverdueActions.length >
                  0 && (
                  <span className="rounded-full bg-[#FBE7E5] px-3 py-1.5 text-[9px] font-bold text-[#A23B35]">
                    {carriedForwardOverdueActions.length} overdue
                  </span>
                )}
              </div>
            </div>

            <div className="grid gap-px bg-[#EEE9E4] xl:grid-cols-2">
              {carriedForwardActions.map(
                (
                  action
                ) => {
                  const student =
                    Array.isArray(
                      action.students
                    )
                      ? action.students[0]
                      : action.students;

                  return (
                    <article
                      key={
                        action.id
                      }
                      className="bg-white p-6"
                    >
                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[8px] font-bold ${priorityClasses(
                            action.priority
                          )}`}
                        >
                          {action.priority}
                        </span>

                        <span
                          className={`rounded-full px-2.5 py-1 text-[8px] font-bold ${actionStatusClasses(
                            action.displayStatus
                          )}`}
                        >
                          {action.displayStatus}
                        </span>

                        <span className="rounded-full bg-[#EEF2F8] px-2.5 py-1 text-[8px] font-bold text-[#385E9D]">
                          CARRIED FORWARD
                        </span>
                      </div>

                      <p className="mt-3 text-sm font-semibold">
                        {action.title}
                      </p>

                      {action.description && (
                        <p className="mt-2 whitespace-pre-line text-xs leading-6 text-[#706963]">
                          {action.description}
                        </p>
                      )}

                      <div className="mt-4 grid gap-2 border-t border-[#EEE9E4] pt-3 text-[9px] leading-5 text-[#928980] sm:grid-cols-2">
                        <div>
                          <p>
                            Researcher:{" "}
                            {action.owner_name ||
                              student?.full_name ||
                              "Unassigned"}
                          </p>

                          <p>
                            Due:{" "}
                            {action.due_date
                              ? formatDate(
                                  action.due_date
                                )
                              : "No due date"}
                          </p>
                        </div>

                        <div>
                          <p>
                            From:{" "}
                            {action.sourceMeeting?.title ||
                              "Previous review"}
                          </p>

                          <p>
                            Review date:{" "}
                            {action.sourceMeeting?.meeting_date
                              ? formatDate(
                                  action.sourceMeeting.meeting_date
                                )
                              : "Not available"}
                          </p>
                        </div>
                      </div>

                      {action.sourceMeeting?.id && (
                        <Link
                          href={`/hub/meetings/${action.sourceMeeting.id}`}
                          className="mt-4 inline-block text-[10px] font-semibold text-[#385E9D]"
                        >
                          Open previous review →
                        </Link>
                      )}
                    </article>
                  );
                }
              )}
            </div>
          </section>
        )}

        {/* ================================================= */}
        {/* PRE-MEETING BRIEF */}
        {/* ================================================= */}

        <section className="mt-8 border border-[#DDD6CF] bg-white">
          <div className="flex flex-col justify-between gap-3 border-b border-[#E7E1DB] px-6 py-5 md:flex-row md:items-end">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
                Pre-Meeting Brief
              </p>

              <h2 className="mt-1 text-xl font-bold">
                Research Check-ins
              </h2>

              <p className="mt-2 text-[10px] leading-5 text-[#837A72]">
                Progress submitted
                before the discussion,
                so meeting time can be
                focused on decisions
                and support.
              </p>
            </div>

            {isStudent &&
              visibleResearchers[0] && (
              <Link
                href={`/hub/students/${visibleResearchers[0].id}/weekly/new`}
                className="text-xs font-semibold text-[#385E9D]"
              >
                Submit Check-in →
              </Link>
            )}
          </div>

          {visibleResearchers.length ===
          0 ? (
            <div className="px-6 py-10 text-sm text-[#837A72]">
              No researcher check-ins
              available.
            </div>
          ) : (
            <div className="grid gap-px bg-[#EEE9E4] xl:grid-cols-2">
              {visibleResearchers.map(
                (
                  researcher
                ) => {
                  const update =
                    latestCheckInByStudent.get(
                      researcher.id
                    );

                  return (
                    <article
                      key={
                        researcher.id
                      }
                      className="bg-white p-6"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-bold">
                            {
                              researcher.full_name
                            }
                          </p>

                          <p className="mt-1 text-[9px] text-[#928980]">
                            {
                              researcher.programme
                            }

                            {researcher.research_area
                              ? ` · ${researcher.research_area}`
                              : ""}
                          </p>
                        </div>

                        {update ? (
                          <span className="rounded-full bg-[#E8F4EC] px-2.5 py-1 text-[8px] font-bold text-[#2D6A45]">
                            CHECK-IN READY
                          </span>
                        ) : (
                          <span className="rounded-full bg-[#FFF4D9] px-2.5 py-1 text-[8px] font-bold text-[#8A6200]">
                            NO CHECK-IN
                          </span>
                        )}
                      </div>

                      {!update ? (
                        <div className="mt-5 border-l-[3px] border-[#F2A900] bg-[#FFF9EA] px-4 py-3">
                          <p className="text-xs text-[#706963]">
                            No research
                            check-in was
                            available before
                            this meeting.
                          </p>
                        </div>
                      ) : (
                        <div className="mt-5 space-y-5">
                          <div className="flex items-center justify-between border-b border-[#EEE9E4] pb-3">
                            <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#928980]">
                              Check-in
                            </p>

                            <p className="text-[9px] text-[#928980]">
                              Week of{" "}
                              {
                                update.week_start
                              }
                            </p>
                          </div>

                          {update.completed_this_week && (
                            <div>
                              <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#2D6A45]">
                                Completed
                              </p>

                              <p className="mt-2 whitespace-pre-line text-xs leading-6 text-[#645D57]">
                                {
                                  update.completed_this_week
                                }
                              </p>
                            </div>
                          )}

                          {update.progress_note && (
                            <div>
                              <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#385E9D]">
                                Working On Now
                              </p>

                              <p className="mt-2 whitespace-pre-line text-xs leading-6 text-[#645D57]">
                                {
                                  update.progress_note
                                }
                              </p>
                            </div>
                          )}

                          {update.planned_next_week && (
                            <div>
                              <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#928980]">
                                Next
                              </p>

                              <p className="mt-2 whitespace-pre-line text-xs leading-6 text-[#645D57]">
                                {
                                  update.planned_next_week
                                }
                              </p>
                            </div>
                          )}

                          {update.blockers && (
                            <div className="border-l-[3px] border-[#A23B35] bg-[#FBE7E5] px-4 py-3">
                              <p className="text-[8px] font-bold uppercase text-[#A23B35]">
                                Blocker
                              </p>

                              <p className="mt-1 whitespace-pre-line text-xs leading-6">
                                {
                                  update.blockers
                                }
                              </p>
                            </div>
                          )}

                          {update.support_needed && (
                            <div className="border-l-[3px] border-[#F2A900] bg-[#FFF9EA] px-4 py-3">
                              <p className="text-[8px] font-bold uppercase text-[#8A6200]">
                                Support Needed
                              </p>

                              <p className="mt-1 whitespace-pre-line text-xs leading-6">
                                {
                                  update.support_needed
                                }
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </article>
                  );
                }
              )}
            </div>
          )}
        </section>

        {/* ================================================= */}
        {/* MEETING RECORD */}
        {/* ================================================= */}

        <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_0.55fr]">
          <div className="space-y-8">
            {/* AGENDA */}

            <section className="border border-[#DDD6CF] bg-white">
              <div className="border-b border-[#E7E1DB] px-6 py-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
                  Agenda
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Discussion Plan
                </h2>
              </div>

              <div className="px-6 py-6">
                {meeting.agenda ? (
                  <p className="whitespace-pre-line text-sm leading-7 text-[#645D57]">
                    {
                      meeting.agenda
                    }
                  </p>
                ) : (
                  <p className="text-sm text-[#837A72]">
                    No agenda recorded.
                  </p>
                )}
              </div>
            </section>

            {/* DISCUSSION */}

            <section className="border border-[#DDD6CF] bg-white">
              <div className="border-b border-[#E7E1DB] px-6 py-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
                  Meeting Record
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Discussion
                </h2>
              </div>

              <div className="px-6 py-6">
                {meeting.minutes ? (
                  <p className="whitespace-pre-line text-sm leading-7 text-[#645D57]">
                    {
                      meeting.minutes
                    }
                  </p>
                ) : (
                  <p className="text-sm text-[#837A72]">
                    Discussion notes
                    have not been
                    recorded yet.
                  </p>
                )}
              </div>
            </section>

            {/* DECISIONS */}

            <section className="border border-[#DDD6CF] bg-white">
              <div className="border-b border-[#E7E1DB] px-6 py-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A15B16]">
                  Decisions
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Agreed Outcomes
                </h2>
              </div>

              <div className="px-6 py-6">
                {meeting.decisions ? (
                  <div className="border-l-[3px] border-[#F2A900] pl-5">
                    <p className="whitespace-pre-line text-sm leading-7 text-[#645D57]">
                      {
                        meeting.decisions
                      }
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-[#837A72]">
                    No decisions recorded.
                  </p>
                )}
              </div>
            </section>
          </div>

          {/* ================================================= */}
          {/* FOLLOW-UP COLUMN */}
          {/* ================================================= */}

          <div className="space-y-8">
            {/* ACTIONS */}

            <section className="border border-[#DDD6CF] bg-white">
              <div className="flex items-center justify-between border-b border-[#E7E1DB] px-6 py-5">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#A23B35]">
                    Follow-up
                  </p>

                  <h2 className="mt-1 text-lg font-bold">
                    Actions
                  </h2>
                </div>

                {canManage && (
                  <Link
                    href={`/hub/actions/new?meeting=${id}`}
                    className="text-[10px] font-semibold text-[#385E9D]"
                  >
                    + Action
                  </Link>
                )}
              </div>

              {preparedActions.length ===
              0 ? (
                <div className="px-6 py-7">
                  <p className="text-xs leading-6 text-[#837A72]">
                    No follow-up actions
                    have been created
                    from this meeting.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-[#EEE9E4]">
                  {preparedActions.map(
                    (
                      action
                    ) => {
                      const student =
                        Array.isArray(
                          action.students
                        )
                          ? action.students[0]
                          : action.students;

                      return (
                        <div
                          key={
                            action.id
                          }
                          className="px-6 py-5"
                        >
                          <div className="flex flex-wrap gap-2">
                            <span
                              className={`rounded-full px-2.5 py-1 text-[8px] font-bold ${priorityClasses(
                                action.priority
                              )}`}
                            >
                              {
                                action.priority
                              }
                            </span>

                            <span
                              className={`rounded-full px-2.5 py-1 text-[8px] font-bold ${actionStatusClasses(
                                action.displayStatus
                              )}`}
                            >
                              {
                                action.displayStatus
                              }
                            </span>
                          </div>

                          <p className="mt-3 text-sm font-semibold">
                            {
                              action.title
                            }
                          </p>

                          {action.description && (
                            <p className="mt-2 whitespace-pre-line text-xs leading-6 text-[#706963]">
                              {
                                action.description
                              }
                            </p>
                          )}

                          <div className="mt-4 border-t border-[#EEE9E4] pt-3 text-[9px] leading-5 text-[#928980]">
                            <p>
                              Owner:{" "}
                              {action.owner_name ||
                                student?.full_name ||
                                "Unassigned"}
                            </p>

                            <p>
                              Due:{" "}
                              {action.due_date
                                ? formatDate(
                                    action.due_date
                                  )
                                : "No due date"}
                            </p>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </section>

            {/* RESEARCHERS */}

            <section className="border border-[#DDD6CF] bg-white">
              <div className="border-b border-[#E7E1DB] px-6 py-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#385E9D]">
                  Participants
                </p>

                <h2 className="mt-1 text-lg font-bold">
                  Researchers
                </h2>
              </div>

              {researchers.length ===
              0 ? (
                <div className="px-6 py-6 text-xs text-[#837A72]">
                  No researchers linked.
                </div>
              ) : (
                <div className="divide-y divide-[#EEE9E4]">
                  {researchers.map(
                    (
                      researcher
                    ) => (
                      <div
                        key={
                          researcher.id
                        }
                        className="flex items-start justify-between gap-4 px-6 py-4"
                      >
                        <div>
                          <p className="text-sm font-semibold">
                            {
                              researcher.full_name
                            }
                          </p>

                          <p className="mt-1 text-[10px] text-[#928980]">
                            {
                              researcher.programme
                            }

                            {researcher.research_area
                              ? ` · ${researcher.research_area}`
                              : ""}
                          </p>
                        </div>

                        {canManage && (
                          <Link
                            href={`/hub/students/${researcher.id}`}
                            className="shrink-0 text-[10px] font-semibold text-[#385E9D]"
                          >
                            Research →
                          </Link>
                        )}
                      </div>
                    )
                  )}
                </div>
              )}
            </section>

            {/* WORKFLOW EXPLAINER */}

            <section className="bg-[#203650] p-6 text-white">
              <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#F2A900]">
                SenSys Research Review
              </p>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-xs font-semibold">
                    1. Research Check-in
                  </p>

                  <p className="mt-1 text-[9px] leading-5 text-white/55">
                    Researcher reports
                    progress and blockers.
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold">
                    2. Meeting
                  </p>

                  <p className="mt-1 text-[9px] leading-5 text-white/55">
                    Discuss issues and
                    make decisions.
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold">
                    3. Actions
                  </p>

                  <p className="mt-1 text-[9px] leading-5 text-white/55">
                    Convert decisions
                    into accountable
                    follow-up.
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold">
                    4. Next Review
                  </p>

                  <p className="mt-1 text-[9px] leading-5 text-white/55">
                    Revisit progress,
                    unresolved actions and
                    new research priorities.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}