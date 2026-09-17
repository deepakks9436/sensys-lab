import Link from "next/link";

import {
  notFound,
  redirect,
} from "next/navigation";

import {
  createClient,
} from "../../../../lib/supabase/server";

import {
  getHubUser,
} from "../../../../lib/hub/auth";

import ProjectGantt from "../../../../components/hub/ProjectGantt";

/* ============================================================
   HELPERS
============================================================ */

function normalizeStatus(
  status: string
) {
  if (
    status ===
    "Not Started"
  ) {
    return "Planned";
  }

  if (
    status ===
    "On Track"
  ) {
    return "In Progress";
  }

  if (
    status ===
    "At Risk"
  ) {
    return "Delayed";
  }

  return status;
}

function firstName(
  fullName: string
) {
  return (
    fullName
      ?.trim()
      .split(/\s+/)[0] ||
    "there"
  );
}

function formatDate(
  value:
    | string
    | null
    | undefined
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

function formatTime(
  value:
    | string
    | null
    | undefined
) {
  if (!value) {
    return null;
  }

  return String(
    value
  ).slice(0, 5);
}

function relativeDate(
  value:
    | string
    | null
    | undefined
) {
  if (!value) {
    return "No check-in";
  }

  const date =
    new Date(
      `${value}T00:00:00`
    );

  const now =
    new Date();

  const days =
    Math.floor(
      (now.getTime() -
        date.getTime()) /
        86400000
    );

  if (days <= 0) {
    return "Today";
  }

  if (days === 1) {
    return "Yesterday";
  }

  return `${days} days ago`;
}

function deriveProjectStatus(
  project: any,
  milestones: any[]
) {
  if (
    normalizeStatus(
      project.status
    ) === "On Hold"
  ) {
    return "On Hold";
  }

  if (
    milestones.length ===
    0
  ) {
    return normalizeStatus(
      project.status
    );
  }

  const allCompleted =
    milestones.every(
      (
        milestone
      ) =>
        normalizeStatus(
          milestone.status
        ) ===
        "Completed"
    );

  if (allCompleted) {
    return "Completed";
  }

  const today =
    new Date()
      .toISOString()
      .slice(0, 10);

  const delayed =
    milestones.some(
      (
        milestone
      ) => {
        const status =
          normalizeStatus(
            milestone.status
          );

        return (
          status ===
            "Delayed" ||
          Boolean(
            milestone.planned_end &&
              milestone.planned_end <
                today &&
              ![
                "Completed",
                "On Hold",
              ].includes(
                status
              )
          )
        );
      }
    );

  if (delayed) {
    return "Delayed";
  }

  if (
    milestones.some(
      (
        milestone
      ) =>
        normalizeStatus(
          milestone.status
        ) ===
        "In Progress"
    )
  ) {
    return "In Progress";
  }

  return "Planned";
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
    "In Progress"
  ) {
    return "bg-[#E8EFF8] text-[#385E9D]";
  }

  if (
    status ===
    "Delayed"
  ) {
    return "bg-[#FBE7E5] text-[#A23B35]";
  }

  if (
    status ===
    "On Hold"
  ) {
    return "bg-[#EEEAE5] text-[#706963]";
  }

  return "bg-[#FFF4D9] text-[#8A6200]";
}

/* ============================================================
   PAGE
============================================================ */

export default async function StudentResearchPage({
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

  const context =
    await getHubUser();

  const role =
    context.profile.role;

  const canManage =
    [
      "admin",
      "research_manager",
    ].includes(
      role
    );

  const isOwnProfile =
    role === "student" &&
    context.studentId ===
      id;

  /*
   * Students must never use this page
   * to inspect another researcher's
   * research record.
   */
  if (
    role === "student" &&
    !isOwnProfile
  ) {
    redirect(
      context.studentId
        ? `/hub/students/${context.studentId}`
        : "/hub"
    );
  }

  const supabase =
    await createClient();

  /* ========================================================
     RESEARCHER
  ======================================================== */

  const {
    data: student,
  } =
    await supabase
      .from(
        "students"
      )
      .select("*")
      .eq(
        "id",
        id
      )
      .maybeSingle();

  if (!student) {
    notFound();
  }

  const greetingName =
    firstName(
      student.full_name ||
        context.profile.fullName
    );

  /* ========================================================
     CORE RESEARCH DATA
  ======================================================== */

  const [
    projectResult,
    milestoneResult,
    outputResult,
    weeklyResult,
  ] =
    await Promise.all([
      supabase
        .from(
          "research_workstreams"
        )
        .select("*")
        .eq(
          "student_id",
          id
        )
        .order(
          "planned_start",
          {
            ascending: true,
            nullsFirst:
              false,
          }
        )
        .order(
          "sort_order",
          {
            ascending: true,
          }
        ),

      supabase
        .from(
          "student_milestones"
        )
        .select("*")
        .eq(
          "student_id",
          id
        )
        .order(
          "planned_end",
          {
            ascending: true,
            nullsFirst:
              false,
          }
        )
        .order(
          "sort_order",
          {
            ascending: true,
          }
        ),

      supabase
        .from(
          "research_outputs"
        )
        .select("*")
        .eq(
          "student_id",
          id
        )
        .order(
          "sort_order",
          {
            ascending: true,
          }
        ),

      supabase
        .from(
          "weekly_updates"
        )
        .select("*")
        .eq(
          "student_id",
          id
        )
        .order(
          "week_start",
          {
            ascending: false,
          }
        )
        .limit(5),
    ]);

  const projects =
    projectResult.data ??
    [];

  const milestones =
    milestoneResult.data ??
    [];

  const outputs =
    outputResult.data ??
    [];

  const weeklyUpdates =
    weeklyResult.data ??
    [];

  /* ========================================================
     NEXT RESEARCH REVIEW
  ======================================================== */

  const {
    data: meetingLinks,
  } =
    await supabase
      .from(
        "meeting_students"
      )
      .select(
        `
        meeting_id,
        meetings (
          id,
          title,
          meeting_type,
          meeting_date,
          start_time,
          location,
          status
        )
        `
      )
      .eq(
        "student_id",
        id
      );

  const today =
    new Date()
      .toISOString()
      .slice(0, 10);

  const studentMeetings =
    (
      meetingLinks ??
      []
    )
      .map(
        (
          link
        ) =>
          Array.isArray(
            link.meetings
          )
            ? link.meetings[0]
            : link.meetings
      )
      .filter(Boolean) as any[];

  const nextMeeting =
    studentMeetings
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
      )[0] ??
    null;

  /* ========================================================
     NEXT INSTRUMENT BOOKING
  ======================================================== */

  let nextBooking:
    any =
    null;

  if (
    student.user_id
  ) {
    const {
      data: bookings,
    } =
      await supabase
        .from(
          "instrument_bookings"
        )
        .select(
          `
          id,
          instrument_id,
          booking_date,
          start_time,
          end_time,
          status,
          instruments (
            id,
            name,
            location
          )
          `
        )
        .eq(
          "booked_by",
          student.user_id
        )
        .gte(
          "booking_date",
          today
        )
        .neq(
          "status",
          "Cancelled"
        )
        .order(
          "booking_date",
          {
            ascending: true,
          }
        )
        .order(
          "start_time",
          {
            ascending: true,
          }
        )
        .limit(1);

    nextBooking =
      bookings?.[0] ??
      null;
  }

  /* ========================================================
     INVENTORY ATTENTION
  ======================================================== */

  const {
    data: lowConsumables,
  } =
    await supabase
      .from(
        "consumables"
      )
      .select(
        `
        id,
        name,
        quantity,
        unit,
        minimum_stock,
        location,
        status
        `
      )
      .in(
        "status",
        [
          "Low Stock",
          "Reorder",
          "Out of Stock",
        ]
      )
      .neq(
        "status",
        "Archived"
      )
      .order(
        "name",
        {
          ascending: true,
        }
      )
      .limit(5);

  const inventoryAttention =
    lowConsumables ??
    [];

  /* ========================================================
     PROJECT STATUS
  ======================================================== */

  const projectOverview =
    projects.map(
      (
        project
      ) => {
        const projectMilestones =
          milestones.filter(
            (
              milestone
            ) =>
              milestone.workstream_id ===
              project.id
          );

        const projectOutputs =
          outputs.filter(
            (
              output
            ) =>
              output.workstream_id ===
              project.id
          );

        const status =
          deriveProjectStatus(
            project,
            projectMilestones
          );

        const active =
          projectMilestones.filter(
            (
              milestone
            ) =>
              [
                "In Progress",
                "Delayed",
              ].includes(
                normalizeStatus(
                  milestone.status
                )
              )
          );

        const next =
          projectMilestones
            .filter(
              (
                milestone
              ) =>
                ![
                  "Completed",
                  "On Hold",
                ].includes(
                  normalizeStatus(
                    milestone.status
                  )
                )
            )
            .sort(
              (
                a,
                b
              ) =>
                String(
                  a.planned_end ??
                    "9999-12-31"
                ).localeCompare(
                  String(
                    b.planned_end ??
                      "9999-12-31"
                  )
                )
            )[0] ??
          null;

        return {
          project,
          status,
          milestones:
            projectMilestones,
          outputs:
            projectOutputs,
          active,
          next,
        };
      }
    );

  const activeProjects =
    projectOverview.filter(
      (
        item
      ) =>
        [
          "In Progress",
          "Delayed",
        ].includes(
          item.status
        )
    );

  /* ========================================================
     MILESTONE SUMMARY
  ======================================================== */

  const normalizedMilestones =
    milestones.map(
      (
        milestone
      ) => ({
        ...milestone,

        normalizedStatus:
          normalizeStatus(
            milestone.status
          ),
      })
    );

  const completedMilestones =
    normalizedMilestones.filter(
      (
        milestone
      ) =>
        milestone.normalizedStatus ===
        "Completed"
    );

  const inProgressMilestones =
    normalizedMilestones.filter(
      (
        milestone
      ) =>
        milestone.normalizedStatus ===
        "In Progress"
    );

  const delayedMilestones =
    normalizedMilestones.filter(
      (
        milestone
      ) =>
        milestone.normalizedStatus ===
          "Delayed" ||
        Boolean(
          milestone.planned_end &&
            milestone.planned_end <
              today &&
            ![
              "Completed",
              "On Hold",
            ].includes(
              milestone.normalizedStatus
            )
        )
    );

  const plannedMilestones =
    normalizedMilestones.filter(
      (
        milestone
      ) =>
        milestone.normalizedStatus ===
        "Planned"
    );

  const currentMilestone =
    delayedMilestones[0] ??
    inProgressMilestones[0] ??
    plannedMilestones[0] ??
    null;

  /* ========================================================
     CHECK-IN
  ======================================================== */

  const latestWeekly =
    weeklyUpdates[0] ??
    null;

  const checkInAge =
    latestWeekly
      ? Math.floor(
          (new Date().getTime() -
            new Date(
              `${latestWeekly.week_start}T00:00:00`
            ).getTime()) /
            86400000
        )
      : null;

  const checkInStatus =
    checkInAge === null
      ? "Not Submitted"
      : checkInAge <=
          14
        ? "Current"
        : "Update Needed";

  /* ========================================================
     OUTPUT SUMMARY
  ======================================================== */

  const outputTypeLabels = [
    "Journal Paper",
    "Patent",
    "Conference Paper",
    "Prototype",
    "Technology Transfer",
  ];

  const outputSummary =
    outputTypeLabels.map(
      (
        type
      ) => {
        const relevant =
          outputs.filter(
            (
              output
            ) =>
              output.output_type ===
              type
          );

        return {
          type,

          target:
            relevant.reduce(
              (
                sum,
                output
              ) =>
                sum +
                Number(
                  output.target_count ??
                    0
                ),
              0
            ),

          achieved:
            relevant.reduce(
              (
                sum,
                output
              ) =>
                sum +
                Number(
                  output.achieved_count ??
                    0
                ),
              0
            ),
        };
      }
    );

  /* ========================================================
     GANTT DATA
  ======================================================== */

  const ganttProjects =
    projects.map(
      (
        project
      ) => ({
        id:
          project.id,

        title:
          project.title,

        planned_start:
          project.planned_start,

        planned_end:
          project.planned_end,

        actual_start:
          project.actual_start,

        actual_end:
          project.actual_end,

        status:
          project.status,

        current_focus:
          project.current_focus,

        description:
          project.description,
      })
    );

  const ganttMilestones =
    milestones.map(
      (
        milestone
      ) => ({
        id:
          milestone.id,

        title:
          milestone.title,

        project_id:
          milestone.workstream_id,

        planned_start:
          milestone.planned_start,

        planned_end:
          milestone.planned_end,

        actual_start:
          milestone.actual_start,

        actual_end:
          milestone.actual_end,

        status:
          milestone.status,

        notes:
          milestone.notes,

        evidence_url:
          milestone.evidence_url,
      })
    );

  const ganttOutputs =
    outputs.map(
      (
        output
      ) => ({
        id:
          output.id,

        project_id:
          output.workstream_id,

        output_type:
          output.output_type,

        title:
          output.title,

        target_count:
          Number(
            output.target_count ??
              0
          ),

        achieved_count:
          Number(
            output.achieved_count ??
              0
          ),

        status:
          output.status,

        target_date:
          output.target_date,

        reference_url:
          output.reference_url,
      })
    );

  /* ========================================================
     MILESTONE BAR
  ======================================================== */

  const milestoneChart =
    [
      {
        label:
          "Completed",
        count:
          completedMilestones.length,
      },
      {
        label:
          "Active",
        count:
          inProgressMilestones.length,
      },
      {
        label:
          "Delayed",
        count:
          delayedMilestones.length,
      },
      {
        label:
          "Planned",
        count:
          plannedMilestones.length,
      },
    ];

  const maxMilestoneValue =
    Math.max(
      1,
      ...milestoneChart.map(
        (
          item
        ) =>
          item.count
      )
    );

  /* ========================================================
     PAGE
  ======================================================== */

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[1400px]">
        {/* ================================================= */}
        {/* TOP BAR */}
        {/* ================================================= */}

        <div className="flex flex-wrap items-center justify-between gap-4">
          {canManage ? (
            <Link
              href="/hub/students"
              className="text-xs font-semibold text-[#385E9D]"
            >
              ← Graduate Researchers
            </Link>
          ) : (
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
              My Research
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            {canManage && (
              <>
                <Link
                  href={`/hub/students/${id}/edit`}
                  className="rounded-full border border-[#D8D0C7] bg-white px-4 py-2.5 text-xs font-semibold"
                >
                  Edit Researcher
                </Link>

                <Link
                  href={`/hub/students/${id}/portfolio`}
                  className="rounded-full border border-[#385E9D] bg-white px-4 py-2.5 text-xs font-semibold text-[#385E9D]"
                >
                  Projects & Outputs
                </Link>

                <Link
                  href={`/hub/students/${id}/milestones/new`}
                  className="rounded-full bg-[#385E9D] px-4 py-2.5 text-xs font-semibold text-white"
                >
                  + Milestone
                </Link>
              </>
            )}

            {(isOwnProfile ||
              canManage) && (
              <Link
                href={`/hub/students/${id}/weekly/new`}
                className="rounded-full bg-[#203650] px-4 py-2.5 text-xs font-semibold text-white"
              >
                Research Check-in
              </Link>
            )}
          </div>
        </div>

        {/* ================================================= */}
        {/* GREETING / HERO */}
        {/* ================================================= */}

        <section className="mt-6 overflow-hidden border border-[#DDD6CF] bg-white">
          <div className="grid lg:grid-cols-[1.35fr_0.65fr]">
            <div className="p-7 md:p-8">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
                {canManage
                  ? "Researcher Dashboard"
                  : "My Research Dashboard"}
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-[-0.04em] md:text-5xl">
                {isOwnProfile
                  ? `Hello, ${greetingName}.`
                  : student.full_name}
              </h1>

              <p className="mt-3 text-base font-semibold text-[#385E9D]">
                {student.research_area ||
                  "Research area not assigned"}
              </p>

              <p className="mt-2 max-w-3xl text-sm leading-7 text-[#706963]">
                {isOwnProfile
                  ? "Here’s your current research focus, upcoming milestones and lab activity."
                  : student.project_title ||
                    "Research topic not yet defined."}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#EEF2F8] px-3 py-1.5 text-[9px] font-bold text-[#385E9D]">
                  {student.programme ||
                    "Programme"}
                </span>

                {student.intake && (
                  <span className="rounded-full bg-[#F5F3EF] px-3 py-1.5 text-[9px] font-semibold text-[#706963]">
                    Intake{" "}
                    {
                      student.intake
                    }
                  </span>
                )}
              </div>
            </div>

            {/* CURRENT FOCUS */}

            <div className="bg-[#203650] p-7 text-white md:p-8">
              <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#F2A900]">
                Current Focus
              </p>

              {currentMilestone ? (
                <>
                  <p className="mt-4 text-xl font-bold leading-7">
                    {
                      currentMilestone.title
                    }
                  </p>

                  <p className="mt-2 text-[10px] text-white/55">
                    {normalizeStatus(
                      currentMilestone.status
                    )}
                    {currentMilestone.planned_end
                      ? ` · Target ${formatDate(
                          currentMilestone.planned_end
                        )}`
                      : ""}
                  </p>
                </>
              ) : (
                <p className="mt-4 text-sm text-white/60">
                  No current milestone
                  assigned.
                </p>
              )}

              {activeProjects.length >
                0 && (
                <div className="mt-6 border-t border-white/15 pt-4">
                  <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-white/45">
                    Active Projects
                  </p>

                  <p className="mt-2 text-3xl font-bold">
                    {
                      activeProjects.length
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* SNAPSHOT */}
        {/* ================================================= */}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="border border-[#DDD6CF] bg-white p-5">
            <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#385E9D]">
              Active Projects
            </p>

            <p className="mt-3 text-3xl font-bold">
              {
                activeProjects.length
              }
            </p>

            <p className="mt-2 text-[9px] text-[#837A72]">
              Current research projects
            </p>
          </div>

          <div className="border border-[#DDD6CF] bg-white p-5">
            <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#385E9D]">
              Active Milestones
            </p>

            <p className="mt-3 text-3xl font-bold">
              {
                inProgressMilestones.length
              }
            </p>

            <p className="mt-2 text-[9px] text-[#837A72]">
              Currently in progress
            </p>
          </div>

          <div className="border border-[#DDD6CF] bg-white p-5">
            <p
              className={`text-[8px] font-bold uppercase tracking-[0.15em] ${
                delayedMilestones.length >
                0
                  ? "text-[#A23B35]"
                  : "text-[#2D6A45]"
              }`}
            >
              Delayed Milestones
            </p>

            <p className="mt-3 text-3xl font-bold">
              {
                delayedMilestones.length
              }
            </p>

            <p className="mt-2 text-[9px] text-[#837A72]">
              Requiring attention
            </p>
          </div>

          <div className="border border-[#DDD6CF] bg-white p-5">
            <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#8A6200]">
              Check-in
            </p>

            <p
              className={`mt-3 text-lg font-bold ${
                checkInStatus ===
                "Current"
                  ? "text-[#2D6A45]"
                  : "text-[#8A6200]"
              }`}
            >
              {
                checkInStatus
              }
            </p>

            <p className="mt-2 text-[9px] text-[#837A72]">
              {relativeDate(
                latestWeekly?.week_start
              )}
            </p>
          </div>
        </section>

        {/* ================================================= */}
        {/* PROJECTS + GANTT */}
        {/* ================================================= */}

        <section className="mt-8 border border-[#DDD6CF] bg-white">
          <div className="flex flex-col justify-between gap-4 border-b border-[#E7E1DB] px-6 py-5 md:flex-row md:items-end">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
                Research Portfolio
              </p>

              <h2 className="mt-1 text-xl font-bold">
                Projects & Timeline
              </h2>

              <p className="mt-2 text-[10px] leading-5 text-[#837A72]">
                Explore projects,
                milestones and research
                outputs on the interactive
                timeline.
              </p>
            </div>

            {canManage && (
              <Link
                href={`/hub/students/${id}/portfolio`}
                className="text-xs font-semibold text-[#385E9D]"
              >
                Manage Projects →
              </Link>
            )}
          </div>

          {projects.length ===
          0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-sm font-semibold">
                No research projects
                created yet.
              </p>

              {canManage && (
                <Link
                  href={`/hub/students/${id}/portfolio`}
                  className="mt-4 inline-flex rounded-full bg-[#385E9D] px-5 py-2.5 text-xs font-semibold text-white"
                >
                  Create First Project
                </Link>
              )}
            </div>
          ) : (
            <ProjectGantt
              projects={
                ganttProjects
              }
              milestones={
                ganttMilestones
              }
              outputs={
                ganttOutputs
              }
              manageUrl={
                canManage
                  ? `/hub/students/${id}/portfolio`
                  : undefined
              }
            />
          )}
        </section>

        {/* ================================================= */}
        {/* RESEARCH STATUS + OUTPUTS */}
        {/* ================================================= */}

        <div className="mt-8 grid gap-8 xl:grid-cols-[0.75fr_1.25fr]">
          {/* MILESTONES */}

          <section className="border border-[#DDD6CF] bg-white p-6">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#385E9D]">
              Research Progress
            </p>

            <h2 className="mt-1 text-xl font-bold">
              Milestone Status
            </h2>

            <div className="mt-7 space-y-5">
              {milestoneChart.map(
                (
                  item
                ) => (
                  <div
                    key={
                      item.label
                    }
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold">
                        {
                          item.label
                        }
                      </p>

                      <p className="text-xs font-bold">
                        {
                          item.count
                        }
                      </p>
                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#EEE9E4]">
                      <div
                        className="h-full rounded-full bg-[#385E9D]"
                        style={{
                          width: `${
                            item.count ===
                            0
                              ? 0
                              : Math.max(
                                  8,
                                  (item.count /
                                    maxMilestoneValue) *
                                    100
                                )
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="mt-7 border-t border-[#EEE9E4] pt-5">
              <p className="text-[10px] leading-5 text-[#837A72]">
                Status is based on
                milestone dates and actual
                research activity rather than
                an arbitrary completion
                percentage.
              </p>
            </div>
          </section>

          {/* OUTPUTS */}

          <section className="border border-[#DDD6CF] bg-white">
            <div className="border-b border-[#E7E1DB] px-6 py-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#385E9D]">
                Research Outputs
              </p>

              <h2 className="mt-1 text-xl font-bold">
                Output Overview
              </h2>
            </div>

            <div className="grid gap-px bg-[#EEE9E4] sm:grid-cols-2 xl:grid-cols-3">
              {outputSummary.map(
                (
                  output
                ) => (
                  <div
                    key={
                      output.type
                    }
                    className="bg-white p-5"
                  >
                    <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#928980]">
                      {
                        output.type
                      }
                    </p>

                    <p className="mt-3 text-3xl font-bold">
                      {
                        output.achieved
                      }
                    </p>

                    <p className="mt-1 text-[9px] text-[#837A72]">
                      {output.target >
                      0
                        ? `Target ${output.target}`
                        : "No target specified"}
                    </p>
                  </div>
                )
              )}
            </div>

            {outputs.length ===
              0 && (
              <div className="px-6 py-8 text-xs text-[#837A72]">
                No research outputs
                recorded yet.
              </div>
            )}
          </section>
        </div>

        {/* ================================================= */}
        {/* THIS WEEK / NEXT REVIEW */}
        {/* ================================================= */}

        <div className="mt-8 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          {/* CHECK-IN */}

          <section className="border border-[#DDD6CF] bg-white">
            <div className="flex items-center justify-between border-b border-[#E7E1DB] px-6 py-5">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#385E9D]">
                  Research Check-in
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Latest Update
                </h2>
              </div>

              {(isOwnProfile ||
                canManage) && (
                <Link
                  href={`/hub/students/${id}/weekly/new`}
                  className="text-xs font-semibold text-[#385E9D]"
                >
                  Update →
                </Link>
              )}
            </div>

            {!latestWeekly ? (
              <div className="px-6 py-10">
                <p className="text-sm font-semibold">
                  No research check-in
                  submitted yet.
                </p>

                {isOwnProfile && (
                  <Link
                    href={`/hub/students/${id}/weekly/new`}
                    className="mt-4 inline-flex rounded-full bg-[#385E9D] px-5 py-2.5 text-xs font-semibold text-white"
                  >
                    Submit Check-in
                  </Link>
                )}
              </div>
            ) : (
              <div className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-semibold">
                    Week of{" "}
                    {
                      latestWeekly.week_start
                    }
                  </p>

                  <span
                    className={`rounded-full px-3 py-1 text-[8px] font-bold ${
                      checkInStatus ===
                      "Current"
                        ? "bg-[#E8F4EC] text-[#2D6A45]"
                        : "bg-[#FFF4D9] text-[#8A6200]"
                    }`}
                  >
                    {
                      checkInStatus
                    }
                  </span>
                </div>

                {latestWeekly.completed_this_week && (
                  <div className="mt-5">
                    <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#2D6A45]">
                      Completed
                    </p>

                    <p className="mt-2 whitespace-pre-line text-xs leading-6 text-[#645D57]">
                      {
                        latestWeekly.completed_this_week
                      }
                    </p>
                  </div>
                )}

                {latestWeekly.progress_note && (
                  <div className="mt-5">
                    <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#385E9D]">
                      Working On Now
                    </p>

                    <p className="mt-2 whitespace-pre-line text-xs leading-6 text-[#645D57]">
                      {
                        latestWeekly.progress_note
                      }
                    </p>
                  </div>
                )}

                {latestWeekly.planned_next_week && (
                  <div className="mt-5">
                    <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#928980]">
                      Next
                    </p>

                    <p className="mt-2 whitespace-pre-line text-xs leading-6 text-[#645D57]">
                      {
                        latestWeekly.planned_next_week
                      }
                    </p>
                  </div>
                )}

                {latestWeekly.blockers && (
                  <div className="mt-5 border-l-[3px] border-[#A23B35] bg-[#FBE7E5] px-4 py-3">
                    <p className="text-[8px] font-bold uppercase text-[#A23B35]">
                      Blocker
                    </p>

                    <p className="mt-1 whitespace-pre-line text-xs leading-6">
                      {
                        latestWeekly.blockers
                      }
                    </p>
                  </div>
                )}

                {latestWeekly.support_needed && (
                  <div className="mt-4 border-l-[3px] border-[#F2A900] bg-[#FFF9EA] px-4 py-3">
                    <p className="text-[8px] font-bold uppercase text-[#8A6200]">
                      Support Needed
                    </p>

                    <p className="mt-1 whitespace-pre-line text-xs leading-6">
                      {
                        latestWeekly.support_needed
                      }
                    </p>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* NEXT REVIEW */}

          <section className="overflow-hidden border border-[#DDD6CF] bg-white">
            <div className="border-b border-[#E7E1DB] px-6 py-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#385E9D]">
                Research Review
              </p>

              <h2 className="mt-1 text-xl font-bold">
                Next Discussion
              </h2>
            </div>

            {nextMeeting ? (
              <div className="p-6">
                <span className="rounded-full bg-[#E8EFF8] px-3 py-1 text-[8px] font-bold text-[#385E9D]">
                  {
                    nextMeeting.meeting_type
                  }
                </span>

                <h3 className="mt-4 text-lg font-bold">
                  {
                    nextMeeting.title
                  }
                </h3>

                <p className="mt-3 text-sm">
                  {formatDate(
                    nextMeeting.meeting_date
                  )}
                </p>

                {nextMeeting.start_time && (
                  <p className="mt-1 text-xs text-[#837A72]">
                    {formatTime(
                      nextMeeting.start_time
                    )}
                  </p>
                )}

                {nextMeeting.location && (
                  <p className="mt-3 text-xs text-[#837A72]">
                    {
                      nextMeeting.location
                    }
                  </p>
                )}

                <Link
                  href={`/hub/meetings/${nextMeeting.id}`}
                  className="mt-5 inline-flex rounded-full bg-[#385E9D] px-5 py-2.5 text-xs font-semibold text-white"
                >
                  Open Review →
                </Link>
              </div>
            ) : (
              <div className="px-6 py-10">
                <p className="text-sm font-semibold">
                  No upcoming research
                  review.
                </p>

                <p className="mt-2 text-xs leading-6 text-[#837A72]">
                  Scheduled research
                  discussions will appear
                  here.
                </p>
              </div>
            )}
          </section>
        </div>

        {/* ================================================= */}
        {/* LAB + INVENTORY */}
        {/* ================================================= */}

        <div className="mt-8 grid gap-8 xl:grid-cols-2">
          {/* BOOKING */}

          <section className="border border-[#DDD6CF] bg-white">
            <div className="flex items-center justify-between border-b border-[#E7E1DB] px-6 py-5">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#385E9D]">
                  Laboratory
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  My Next Booking
                </h2>
              </div>

              <Link
                href="/hub/lab/schedule"
                className="text-xs font-semibold text-[#385E9D]"
              >
                Schedule →
              </Link>
            </div>

            {!nextBooking ? (
              <div className="px-6 py-10">
                <p className="text-sm font-semibold">
                  No upcoming instrument
                  booking.
                </p>

                <Link
                  href="/hub/lab"
                  className="mt-4 inline-flex text-xs font-semibold text-[#385E9D]"
                >
                  View instruments →
                </Link>
              </div>
            ) : (
              <div className="p-6">
                <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#928980]">
                  Instrument
                </p>

                <p className="mt-2 text-lg font-bold">
                  {Array.isArray(
                    nextBooking.instruments
                  )
                    ? nextBooking
                        .instruments[0]
                        ?.name
                    : nextBooking
                        .instruments
                        ?.name}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[8px] font-bold uppercase text-[#928980]">
                      Date
                    </p>

                    <p className="mt-1 text-xs font-semibold">
                      {formatDate(
                        nextBooking.booking_date
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-[8px] font-bold uppercase text-[#928980]">
                      Time
                    </p>

                    <p className="mt-1 text-xs font-semibold">
                      {formatTime(
                        nextBooking.start_time
                      )}
                      {nextBooking.end_time
                        ? ` – ${formatTime(
                            nextBooking.end_time
                          )}`
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* INVENTORY */}

          <section className="border border-[#DDD6CF] bg-white">
            <div className="flex items-center justify-between border-b border-[#E7E1DB] px-6 py-5">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#A15B16]">
                  Inventory
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Stock Attention
                </h2>
              </div>

              <Link
                href="/hub/inventory/consumables"
                className="text-xs font-semibold text-[#385E9D]"
              >
                Inventory →
              </Link>
            </div>

            {inventoryAttention.length ===
            0 ? (
              <div className="px-6 py-10">
                <p className="text-sm font-semibold text-[#2D6A45]">
                  No consumable stock
                  alerts.
                </p>

                <p className="mt-2 text-xs text-[#837A72]">
                  Current consumables are
                  above their minimum
                  thresholds.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-[#EEE9E4]">
                {inventoryAttention.map(
                  (
                    item
                  ) => (
                    <Link
                      key={
                        item.id
                      }
                      href="/hub/inventory/consumables"
                      className="flex items-center justify-between gap-4 px-6 py-4 transition hover:bg-[#FAF9F7]"
                    >
                      <div>
                        <p className="text-sm font-semibold">
                          {
                            item.name
                          }
                        </p>

                        <p className="mt-1 text-[9px] text-[#928980]">
                          {Number(
                            item.quantity
                          )}{" "}
                          {
                            item.unit
                          }
                          {item.location
                            ? ` · ${item.location}`
                            : ""}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-[8px] font-bold ${
                          item.status ===
                          "Out of Stock"
                            ? "bg-[#FBE7E5] text-[#A23B35]"
                            : "bg-[#FFF4D9] text-[#8A6200]"
                        }`}
                      >
                        {
                          item.status
                        }
                      </span>
                    </Link>
                  )
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}