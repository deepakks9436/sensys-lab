import Link from "next/link";

import {
  createClient,
} from "../../../lib/supabase/server";

/* ============================================================
   TYPES
============================================================ */

type StudentRecord = {
  id: string;
  user_id: string | null;
  full_name: string;
  programme: string | null;
  research_area: string | null;
};

type MeetingStudentLink = {
  student_id: string;
  students:
    | StudentRecord
    | StudentRecord[]
    | null;
};

/* ============================================================
   HELPERS
============================================================ */

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
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  ).format(date);
}

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

function differenceDays(
  later:
    string,
  earlier:
    string
) {
  const laterDate =
    new Date(
      `${later}T00:00:00`
    );

  const earlierDate =
    new Date(
      `${earlier}T00:00:00`
    );

  return Math.floor(
    (
      laterDate.getTime() -
      earlierDate.getTime()
    ) /
      86400000
  );
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
    status === "Cancelled"
  ) {
    return "Cancelled";
  }

  if (
    status === "Closed"
  ) {
    return "Completed";
  }

  if (
    status === "Draft"
  ) {
    return "Preparing";
  }

  if (
    status === "Published"
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

function getStudent(
  relation:
    | StudentRecord
    | StudentRecord[]
    | null
) {
  if (
    Array.isArray(
      relation
    )
  ) {
    return (
      relation[0] ??
      null
    );
  }

  return relation;
}

/* ============================================================
   PAGE
============================================================ */

export default async function MeetingsPage() {
  const supabase =
    await createClient();

  const {
    data: {
      user,
    },
  } =
    await supabase.auth.getUser();

  if (!user) {
    return null;
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
    return null;
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
     MEETINGS
  ======================================================== */

  const {
    data: meetings,
  } =
    await supabase
      .from(
        "meetings"
      )
      .select(
        `
        id,
        title,
        meeting_type,
        meeting_date,
        start_time,
        end_time,
        location,
        status,
        agenda,
        decisions,
        meeting_students (
          student_id,
          students (
            id,
            user_id,
            full_name,
            programme,
            research_area
          )
        )
        `
      )
      .order(
        "meeting_date",
        {
          ascending:
            false,
        }
      );

  const meetingList =
    meetings ??
    [];

  const today =
    new Date()
      .toISOString()
      .slice(
        0,
        10
      );

  /* ========================================================
     NEXT MEETING
  ======================================================== */

  const nextMeeting =
    [...meetingList]
      .filter(
        (
          meeting
        ) =>
          meeting.meeting_date >=
            today &&
          ![
            "Cancelled",
            "Closed",
          ].includes(
            meeting.status
          )
      )
      .sort(
        (
          a,
          b
        ) => {
          const dateCompare =
            a.meeting_date.localeCompare(
              b.meeting_date
            );

          if (
            dateCompare !==
            0
          ) {
            return dateCompare;
          }

          return String(
            a.start_time ??
              ""
          ).localeCompare(
            String(
              b.start_time ??
                ""
            )
          );
        }
      )[0] ??
    null;

  /* ========================================================
     NEXT MEETING RESEARCHERS
  ======================================================== */

  const nextMeetingLinks =
    (
      nextMeeting
        ?.meeting_students ??
      []
    ) as MeetingStudentLink[];

  const allNextResearchers =
    nextMeetingLinks
      .map(
        (
          link
        ) =>
          getStudent(
            link.students
          )
      )
      .filter(
        (
          student
        ): student is StudentRecord =>
          Boolean(
            student
          )
      );

  /*
   * Managers may see all linked
   * researchers.
   *
   * Students see only themselves.
   */
  const preparationResearchers =
    isStudent
      ? allNextResearchers.filter(
          (
            researcher
          ) =>
            researcher.user_id ===
            user.id
        )
      : allNextResearchers;

  const preparationStudentIds =
    preparationResearchers.map(
      (
        researcher
      ) =>
        researcher.id
    );

  /* ========================================================
     LATEST CHECK-INS BEFORE NEXT MEETING
  ======================================================== */

  let checkIns: any[] =
    [];

  if (
    nextMeeting &&
    preparationStudentIds.length >
      0
  ) {
    const {
      data,
    } =
      await supabase
        .from(
          "weekly_updates"
        )
        .select(
          `
          id,
          student_id,
          week_start,
          completed_this_week,
          progress_note,
          planned_next_week,
          blockers,
          support_needed
          `
        )
        .in(
          "student_id",
          preparationStudentIds
        )
        .lte(
          "week_start",
          nextMeeting.meeting_date
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
     OVERDUE MILESTONES
  ======================================================== */

  let milestoneRows: any[] =
    [];

  if (
    preparationStudentIds.length >
    0
  ) {
    const {
      data,
    } =
      await supabase
        .from(
          "student_milestones"
        )
        .select(
          `
          id,
          student_id,
          title,
          planned_end,
          status,
          workstream_id
          `
        )
        .in(
          "student_id",
          preparationStudentIds
        )
        .not(
          "planned_end",
          "is",
          null
        );

    milestoneRows =
      data ??
      [];
  }

  const overdueByStudent =
    new Map<
      string,
      any[]
    >();

  for (
    const milestone of
    milestoneRows
  ) {
    const status =
      milestone.status ===
      "On Track"
        ? "In Progress"
        : milestone.status ===
            "At Risk"
          ? "Delayed"
          : milestone.status ===
              "Not Started"
            ? "Planned"
            : milestone.status;

    const overdue =
      milestone.planned_end &&
      milestone.planned_end <
        today &&
      ![
        "Completed",
        "On Hold",
      ].includes(
        status
      );

    if (!overdue) {
      continue;
    }

    const existing =
      overdueByStudent.get(
        milestone.student_id
      ) ??
      [];

    existing.push(
      milestone
    );

    overdueByStudent.set(
      milestone.student_id,
      existing
    );
  }

  /* ========================================================
     OPEN ACTIONS FOR PREPARATION
  ======================================================== */

  let preparationActions:
    any[] =
    [];

  if (
    preparationStudentIds.length >
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
          student_id,
          title,
          status,
          priority,
          due_date
          `
        )
        .in(
          "student_id",
          preparationStudentIds
        )
        .neq(
          "status",
          "Completed"
        )
        .neq(
          "status",
          "Cancelled"
        );

    preparationActions =
      data ??
      [];
  }

  const openActionsByStudent =
    new Map<
      string,
      any[]
    >();

  for (
    const action of
    preparationActions
  ) {
    const existing =
      openActionsByStudent.get(
        action.student_id
      ) ??
      [];

    existing.push(
      action
    );

    openActionsByStudent.set(
      action.student_id,
      existing
    );
  }

  /* ========================================================
     BUILD PREPARATION RECORDS
  ======================================================== */

  const preparation =
    preparationResearchers.map(
      (
        researcher
      ) => {
        const checkIn =
          latestCheckInByStudent.get(
            researcher.id
          ) ??
          null;

        /*
         * A check-in should be reasonably
         * recent relative to the meeting.
         *
         * Seven days is ideal for a weekly
         * research review. We allow 14 days
         * before marking it stale.
         */
        const ageAtMeeting =
          checkIn &&
          nextMeeting
            ? differenceDays(
                nextMeeting.meeting_date,
                checkIn.week_start
              )
            : null;

        const checkInReady =
          Boolean(
            checkIn
          ) &&
          ageAtMeeting !==
            null &&
          ageAtMeeting >=
            0 &&
          ageAtMeeting <=
            14;

        const blockers =
          checkIn?.blockers?.trim()
            ? checkIn.blockers
            : null;

        const supportNeeded =
          checkIn?.support_needed?.trim()
            ? checkIn.support_needed
            : null;

        const overdueMilestones =
          overdueByStudent.get(
            researcher.id
          ) ??
          [];

        const openActions =
          openActionsByStudent.get(
            researcher.id
          ) ??
          [];

        const overdueActions =
          openActions.filter(
            (
              action
            ) =>
              action.due_date &&
              action.due_date <
                today
          );

        let attentionScore =
          0;

        if (
          !checkInReady
        ) {
          attentionScore +=
            4;
        }

        if (blockers) {
          attentionScore +=
            3;
        }

        if (
          supportNeeded
        ) {
          attentionScore +=
            2;
        }

        attentionScore +=
          overdueMilestones.length *
          2;

        attentionScore +=
          overdueActions.length *
          2;

        return {
          researcher,
          checkIn,
          checkInReady,
          ageAtMeeting,
          blockers,
          supportNeeded,
          overdueMilestones,
          openActions,
          overdueActions,
          attentionScore,
        };
      }
    )
    .sort(
      (
        a,
        b
      ) =>
        b.attentionScore -
        a.attentionScore
    );

  const checkInsReady =
    preparation.filter(
      (
        item
      ) =>
        item.checkInReady
    ).length;

  const missingCheckIns =
    preparation.filter(
      (
        item
      ) =>
        !item.checkInReady
    ).length;

  const blockerCount =
    preparation.filter(
      (
        item
      ) =>
        Boolean(
          item.blockers
        )
    ).length;

  const researchersWithOverdueMilestones =
    preparation.filter(
      (
        item
      ) =>
        item.overdueMilestones
          .length >
        0
    ).length;

  const preparationOpenActions =
    preparation.reduce(
      (
        total,
        item
      ) =>
        total +
        item.openActions.length,
      0
    );

  /* ========================================================
     GENERAL MEETING SUMMARY
  ======================================================== */

  const {
    data:
      allOpenActions,
  } =
    await supabase
      .from(
        "action_items"
      )
      .select(
        "id"
      )
      .neq(
        "status",
        "Completed"
      )
      .neq(
        "status",
        "Cancelled"
      );

  const decisionRecords =
    meetingList.filter(
      (
        meeting
      ) =>
        Boolean(
          meeting.decisions?.trim()
        )
    ).length;

  const completedMeetings =
    meetingList.filter(
      (
        meeting
      ) =>
        meeting.status ===
        "Closed"
    ).length;

  const upcomingMeetings =
    meetingList
      .filter(
        (
          meeting
        ) =>
          meeting.meeting_date >=
            today &&
          ![
            "Cancelled",
            "Closed",
          ].includes(
            meeting.status
          )
      )
      .sort(
        (
          a,
          b
        ) =>
          a.meeting_date.localeCompare(
            b.meeting_date
          )
      );

  const pastMeetings =
    meetingList.filter(
      (
        meeting
      ) =>
        !upcomingMeetings.some(
          (
            upcoming
          ) =>
            upcoming.id ===
            meeting.id
        )
    );

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[1320px]">
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
              Research Coordination
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-[-0.04em] md:text-5xl">
              {isStudent
                ? "My Research Reviews."
                : "Research Reviews & Meetings."}
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#706963]">
              {isStudent
                ? "Prepare for your next research discussion and review decisions and follow-up."
                : "Prepare discussions from researcher check-ins, identify issues early and convert meetings into decisions and actions."}
            </p>
          </div>

          {canManage && (
            <Link
              href="/hub/meetings/new"
              className="inline-flex self-start rounded-full bg-[#385E9D] px-5 py-3 text-xs font-semibold text-white md:self-auto"
            >
              + New Meeting
            </Link>
          )}
        </div>

        {/* ================================================= */}
        {/* TOP SUMMARY */}
        {/* ================================================= */}

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="border border-[#DDD6CF] bg-white p-5">
            <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#385E9D]">
              Next Meeting
            </p>

            {nextMeeting ? (
              <>
                <p className="mt-3 text-lg font-bold">
                  {formatDate(
                    nextMeeting.meeting_date
                  )}
                </p>

                <p className="mt-1 text-[10px] text-[#837A72]">
                  {formatTime(
                    nextMeeting.start_time
                  ) ||
                    "Time not set"}
                </p>
              </>
            ) : (
              <>
                <p className="mt-3 text-3xl font-bold">
                  —
                </p>

                <p className="mt-2 text-[10px] text-[#837A72]">
                  Nothing scheduled
                </p>
              </>
            )}
          </div>

          <div className="border border-[#DDD6CF] bg-white p-5">
            <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#A15B16]">
              Open Follow-ups
            </p>

            <p className="mt-3 text-3xl font-bold">
              {
                allOpenActions
                  ?.length ??
                0
              }
            </p>

            <p className="mt-2 text-[10px] text-[#837A72]">
              Actions requiring
              completion
            </p>
          </div>

          <div className="border border-[#DDD6CF] bg-white p-5">
            <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#2D6A45]">
              Decision Records
            </p>

            <p className="mt-3 text-3xl font-bold">
              {
                decisionRecords
              }
            </p>

            <p className="mt-2 text-[10px] text-[#837A72]">
              Meetings with recorded
              outcomes
            </p>
          </div>
        </section>

        {/* ================================================= */}
        {/* NEXT MEETING */}
        {/* ================================================= */}

        {nextMeeting && (
          <section className="mt-8 overflow-hidden border border-[#DDD6CF] bg-white">
            <div className="grid lg:grid-cols-[1.3fr_0.7fr]">
              <div className="p-7">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#E8EFF8] px-3 py-1 text-[8px] font-bold text-[#385E9D]">
                    NEXT RESEARCH REVIEW
                  </span>

                  <span className="text-[10px] text-[#928980]">
                    {
                      nextMeeting.meeting_type
                    }
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-bold tracking-[-0.03em]">
                  {
                    nextMeeting.title
                  }
                </h2>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#706963]">
                  <span>
                    {formatDate(
                      nextMeeting.meeting_date
                    )}
                  </span>

                  {nextMeeting.start_time && (
                    <span>
                      {formatTime(
                        nextMeeting.start_time
                      )}

                      {nextMeeting.end_time
                        ? ` – ${formatTime(
                            nextMeeting.end_time
                          )}`
                        : ""}
                    </span>
                  )}

                  <span>
                    {nextMeeting.location ||
                      "Location not specified"}
                  </span>
                </div>

                {nextMeeting.agenda && (
                  <div className="mt-5 border-l-[3px] border-[#F2A900] bg-[#FFF9EA] px-4 py-3">
                    <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#8A6200]">
                      Planned Discussion
                    </p>

                    <p className="mt-2 line-clamp-3 whitespace-pre-line text-xs leading-6 text-[#645D57]">
                      {
                        nextMeeting.agenda
                      }
                    </p>
                  </div>
                )}

                <Link
                  href={`/hub/meetings/${nextMeeting.id}`}
                  className="mt-5 inline-flex rounded-full bg-[#385E9D] px-5 py-2.5 text-xs font-semibold text-white"
                >
                  {canManage
                    ? "Open Meeting Workspace →"
                    : "View My Meeting →"}
                </Link>
              </div>

              {/* PREPARATION SNAPSHOT */}

              <div className="bg-[#203650] p-7 text-white">
                <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#F2A900]">
                  Preparation Status
                </p>

                <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5">
                  <div>
                    <p className="text-3xl font-bold">
                      {
                        checkInsReady
                      }
                    </p>

                    <p className="mt-1 text-[8px] text-white/50">
                      Check-ins ready
                    </p>
                  </div>

                  <div>
                    <p className="text-3xl font-bold">
                      {
                        missingCheckIns
                      }
                    </p>

                    <p className="mt-1 text-[8px] text-white/50">
                      Missing / stale
                    </p>
                  </div>

                  <div>
                    <p className="text-3xl font-bold">
                      {
                        blockerCount
                      }
                    </p>

                    <p className="mt-1 text-[8px] text-white/50">
                      Blockers
                    </p>
                  </div>

                  <div>
                    <p className="text-3xl font-bold">
                      {
                        researchersWithOverdueMilestones
                      }
                    </p>

                    <p className="mt-1 text-[8px] text-white/50">
                      Milestone issues
                    </p>
                  </div>
                </div>

                {preparationOpenActions >
                  0 && (
                  <div className="mt-6 border-t border-white/15 pt-4">
                    <p className="text-[10px] font-semibold text-[#F2A900]">
                      {
                        preparationOpenActions
                      }{" "}
                      open follow-up
                      {preparationOpenActions ===
                      1
                        ? ""
                        : "s"}{" "}
                      across these
                      researchers
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ================================================= */}
        {/* MEETING PREPARATION */}
        {/* ================================================= */}

        {nextMeeting &&
          preparation.length >
            0 && (
          <section className="mt-8 border border-[#DDD6CF] bg-white">
            <div className="flex flex-col justify-between gap-4 border-b border-[#E7E1DB] px-6 py-5 md:flex-row md:items-end">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
                  Meeting Preparation
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  {isStudent
                    ? "My Preparation"
                    : "Researcher Readiness"}
                </h2>

                <p className="mt-2 max-w-2xl text-[10px] leading-5 text-[#837A72]">
                  {isStudent
                    ? "Review your latest check-in, blockers and pending research items before the discussion."
                    : "Researchers needing attention are shown first so the meeting can focus on issues requiring decisions."}
                </p>
              </div>

              {canManage && (
                <div className="flex flex-wrap gap-2 text-[8px] font-semibold">
                  <span className="rounded-full bg-[#E8F4EC] px-3 py-1.5 text-[#2D6A45]">
                    ✓{" "}
                    {
                      checkInsReady
                    }{" "}
                    ready
                  </span>

                  {missingCheckIns >
                    0 && (
                    <span className="rounded-full bg-[#FFF4D9] px-3 py-1.5 text-[#8A6200]">
                      !{" "}
                      {
                        missingCheckIns
                      }{" "}
                      missing
                    </span>
                  )}

                  {blockerCount >
                    0 && (
                    <span className="rounded-full bg-[#FBE7E5] px-3 py-1.5 text-[#A23B35]">
                      !{" "}
                      {
                        blockerCount
                      }{" "}
                      blockers
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="divide-y divide-[#EEE9E4]">
              {preparation.map(
                (
                  item
                ) => (
                  <article
                    key={
                      item.researcher.id
                    }
                    className={`p-6 ${
                      item.attentionScore >
                      0
                        ? "bg-[#FFFDFC]"
                        : "bg-white"
                    }`}
                  >
                    {/* RESEARCHER HEADER */}

                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-bold">
                            {
                              item.researcher.full_name
                            }
                          </p>

                          {item.checkInReady ? (
                            <span className="rounded-full bg-[#E8F4EC] px-2.5 py-1 text-[7px] font-bold text-[#2D6A45]">
                              ✓ CHECK-IN READY
                            </span>
                          ) : (
                            <span className="rounded-full bg-[#FFF4D9] px-2.5 py-1 text-[7px] font-bold text-[#8A6200]">
                              ! CHECK-IN MISSING
                            </span>
                          )}

                          {item.blockers && (
                            <span className="rounded-full bg-[#FBE7E5] px-2.5 py-1 text-[7px] font-bold text-[#A23B35]">
                              BLOCKER
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-[9px] text-[#928980]">
                          {
                            item.researcher.programme
                          }

                          {item.researcher.research_area
                            ? ` · ${item.researcher.research_area}`
                            : ""}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {item.checkIn && (
                          <span className="text-[9px] text-[#928980]">
                            Last check-in:{" "}
                            {
                              item.checkIn.week_start
                            }
                          </span>
                        )}

                        {canManage && (
                          <Link
                            href={`/hub/students/${item.researcher.id}`}
                            className="text-[10px] font-semibold text-[#385E9D]"
                          >
                            Research Dashboard →
                          </Link>
                        )}

                        {isStudent && (
                          <Link
                            href={`/hub/students/${item.researcher.id}/weekly/new`}
                            className="text-[10px] font-semibold text-[#385E9D]"
                          >
                            {item.checkInReady
                              ? "Update Check-in →"
                              : "Submit Check-in →"}
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* PREPARATION GRID */}

                    <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      {/* LATEST PROGRESS */}

                      <div className="border border-[#E7E1DB] bg-white p-4">
                        <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#385E9D]">
                          Latest Progress
                        </p>

                        {item.checkInReady &&
                        item.checkIn ? (
                          <p className="mt-2 line-clamp-4 whitespace-pre-line text-[10px] leading-5 text-[#645D57]">
                            {item.checkIn
                              .progress_note ||
                              item.checkIn
                                .completed_this_week ||
                              "Check-in submitted."}
                          </p>
                        ) : (
                          <p className="mt-2 text-[10px] leading-5 text-[#8A6200]">
                            A recent
                            research
                            check-in has
                            not been
                            submitted.
                          </p>
                        )}
                      </div>

                      {/* BLOCKERS */}

                      <div
                        className={`border p-4 ${
                          item.blockers
                            ? "border-[#E9C7C4] bg-[#FDF2F1]"
                            : "border-[#E7E1DB] bg-white"
                        }`}
                      >
                        <p
                          className={`text-[8px] font-bold uppercase tracking-[0.14em] ${
                            item.blockers
                              ? "text-[#A23B35]"
                              : "text-[#928980]"
                          }`}
                        >
                          Blockers
                        </p>

                        {item.blockers ? (
                          <p className="mt-2 line-clamp-4 whitespace-pre-line text-[10px] leading-5 text-[#645D57]">
                            {
                              item.blockers
                            }
                          </p>
                        ) : (
                          <p className="mt-2 text-[10px] text-[#928980]">
                            None reported
                          </p>
                        )}
                      </div>

                      {/* MILESTONES */}

                      <div
                        className={`border p-4 ${
                          item
                            .overdueMilestones
                            .length >
                          0
                            ? "border-[#E9C7C4] bg-[#FDF2F1]"
                            : "border-[#E7E1DB] bg-white"
                        }`}
                      >
                        <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#928980]">
                          Milestones
                        </p>

                        {item
                          .overdueMilestones
                          .length >
                        0 ? (
                          <>
                            <p className="mt-2 text-2xl font-bold text-[#A23B35]">
                              {
                                item
                                  .overdueMilestones
                                  .length
                              }
                            </p>

                            <p className="mt-1 text-[9px] text-[#A23B35]">
                              overdue
                            </p>

                            <p className="mt-2 line-clamp-2 text-[9px] leading-4 text-[#706963]">
                              {
                                item
                                  .overdueMilestones[0]
                                  .title
                              }
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="mt-2 text-xl font-bold text-[#2D6A45]">
                              ✓
                            </p>

                            <p className="mt-1 text-[9px] text-[#837A72]">
                              No overdue
                              milestones
                            </p>
                          </>
                        )}
                      </div>

                      {/* ACTIONS */}

                      <div
                        className={`border p-4 ${
                          item
                            .overdueActions
                            .length >
                          0
                            ? "border-[#E9C7C4] bg-[#FDF2F1]"
                            : "border-[#E7E1DB] bg-white"
                        }`}
                      >
                        <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#928980]">
                          Follow-ups
                        </p>

                        <p className="mt-2 text-2xl font-bold">
                          {
                            item
                              .openActions
                              .length
                          }
                        </p>

                        <p className="mt-1 text-[9px] text-[#837A72]">
                          open actions
                        </p>

                        {item
                          .overdueActions
                          .length >
                          0 && (
                          <p className="mt-2 text-[9px] font-semibold text-[#A23B35]">
                            {
                              item
                                .overdueActions
                                .length
                            }{" "}
                            overdue
                          </p>
                        )}
                      </div>
                    </div>

                    {/* SUPPORT REQUEST */}

                    {item.supportNeeded && (
                      <div className="mt-4 border-l-[3px] border-[#F2A900] bg-[#FFF9EA] px-4 py-3">
                        <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#8A6200]">
                          Support Needed
                        </p>

                        <p className="mt-1 whitespace-pre-line text-[10px] leading-5 text-[#645D57]">
                          {
                            item.supportNeeded
                          }
                        </p>
                      </div>
                    )}
                  </article>
                )
              )}
            </div>
          </section>
        )}

        {/* ================================================= */}
        {/* NO PREPARATION */}
        {/* ================================================= */}

        {nextMeeting &&
          preparation.length ===
            0 && (
          <section className="mt-8 border border-[#DDD6CF] bg-white px-6 py-10">
            <p className="text-sm font-semibold">
              No researchers available
              for preparation.
            </p>

            <p className="mt-2 text-xs leading-6 text-[#837A72]">
              Link researchers to the
              meeting to create a
              pre-meeting research
              brief.
            </p>
          </section>
        )}

        {/* ================================================= */}
        {/* UPCOMING MEETINGS */}
        {/* ================================================= */}

        {upcomingMeetings.length >
          0 && (
          <section className="mt-8 border border-[#DDD6CF] bg-white">
            <div className="border-b border-[#E7E1DB] px-6 py-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
                Schedule
              </p>

              <h2 className="mt-1 text-xl font-bold">
                Upcoming Reviews
              </h2>
            </div>

            <div className="divide-y divide-[#EEE9E4]">
              {upcomingMeetings.map(
                (
                  meeting
                ) => {
                  const displayStatus =
                    meetingDisplayStatus(
                      meeting.status,
                      meeting.meeting_date
                    );

                  return (
                    <Link
                      key={
                        meeting.id
                      }
                      href={`/hub/meetings/${meeting.id}`}
                      className="grid gap-4 px-6 py-5 transition hover:bg-[#FAF9F7] md:grid-cols-[1.4fr_0.8fr_0.65fr]"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold">
                            {
                              meeting.title
                            }
                          </p>

                          <span
                            className={`rounded-full px-2.5 py-1 text-[8px] font-bold ${statusClasses(
                              displayStatus
                            )}`}
                          >
                            {
                              displayStatus
                            }
                          </span>
                        </div>

                        <p className="mt-2 text-[10px] text-[#928980]">
                          {
                            meeting.meeting_type
                          }
                          {" · "}
                          {
                            meeting
                              .meeting_students
                              ?.length ??
                            0
                          }{" "}
                          researcher
                          {(meeting
                            .meeting_students
                            ?.length ??
                            0) ===
                          1
                            ? ""
                            : "s"}
                        </p>
                      </div>

                      <div>
                        <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
                          When
                        </p>

                        <p className="mt-2 text-xs">
                          {formatDate(
                            meeting.meeting_date
                          )}
                        </p>

                        {meeting.start_time && (
                          <p className="mt-1 text-[10px] text-[#928980]">
                            {formatTime(
                              meeting.start_time
                            )}
                          </p>
                        )}
                      </div>

                      <div>
                        <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
                          Location
                        </p>

                        <p className="mt-2 text-xs">
                          {meeting.location ||
                            "Not specified"}
                        </p>
                      </div>
                    </Link>
                  );
                }
              )}
            </div>
          </section>
        )}

        {/* ================================================= */}
        {/* HISTORY */}
        {/* ================================================= */}

        <section className="mt-8 border border-[#DDD6CF] bg-white">
          <div className="flex items-end justify-between gap-4 border-b border-[#E7E1DB] px-6 py-5">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
                Review History
              </p>

              <h2 className="mt-1 text-xl font-bold">
                Previous Meetings
              </h2>
            </div>

            <p className="text-[9px] text-[#928980]">
              {
                completedMeetings
              }{" "}
              completed
            </p>
          </div>

          {pastMeetings.length ===
          0 ? (
            <div className="px-6 py-12 text-sm text-[#837A72]">
              No previous meetings
              available.
            </div>
          ) : (
            <div className="divide-y divide-[#EEE9E4]">
              {pastMeetings.map(
                (
                  meeting
                ) => {
                  const displayStatus =
                    meetingDisplayStatus(
                      meeting.status,
                      meeting.meeting_date
                    );

                  return (
                    <Link
                      key={
                        meeting.id
                      }
                      href={`/hub/meetings/${meeting.id}`}
                      className="grid gap-4 px-6 py-5 transition hover:bg-[#FAF9F7] md:grid-cols-[1.4fr_0.8fr_0.65fr]"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold">
                            {
                              meeting.title
                            }
                          </p>

                          <span
                            className={`rounded-full px-2.5 py-1 text-[8px] font-bold ${statusClasses(
                              displayStatus
                            )}`}
                          >
                            {
                              displayStatus
                            }
                          </span>
                        </div>

                        <p className="mt-2 text-[10px] text-[#928980]">
                          {
                            meeting.meeting_type
                          }

                          {meeting.decisions
                            ? " · Decisions recorded"
                            : ""}
                        </p>
                      </div>

                      <div>
                        <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
                          Date
                        </p>

                        <p className="mt-2 text-xs">
                          {formatDate(
                            meeting.meeting_date
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
                          Researchers
                        </p>

                        <p className="mt-2 text-xs">
                          {
                            meeting
                              .meeting_students
                              ?.length ??
                            0
                          }
                        </p>
                      </div>
                    </Link>
                  );
                }
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}