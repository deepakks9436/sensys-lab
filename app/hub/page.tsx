import Link from "next/link";
import { redirect } from "next/navigation";

import {
  createClient,
} from "../../lib/supabase/server";

import {
  getHubUser,
} from "../../lib/hub/auth";

/* ============================================================
   HELPERS
============================================================ */

function firstName(
  fullName: string
) {
  const name =
    fullName
      ?.trim()
      .split(/\s+/)[0];

  return name || "there";
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

  const difference =
    Math.floor(
      (now.getTime() -
        date.getTime()) /
        86400000
    );

  if (difference <= 0) {
    return "Today";
  }

  if (difference === 1) {
    return "Yesterday";
  }

  return `${difference} days ago`;
}

function normalizeMilestoneStatus(
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

/* ============================================================
   PAGE
============================================================ */

export default async function HubDashboardPage() {
  const context =
    await getHubUser();

  const role =
    context.profile.role;

  const greetingName =
    firstName(
      context.profile.fullName
    );

  /* ========================================================
     STUDENT LANDING
  ======================================================== */

  if (
    role === "student"
  ) {
    if (
      context.studentId
    ) {
      redirect(
        `/hub/students/${context.studentId}`
      );
    }

    return (
      <main className="px-5 py-10 md:px-8 xl:px-10">
        <div className="mx-auto max-w-[1100px]">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
            SenSys Hub
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-[-0.04em]">
            Hello, {greetingName}.
          </h1>

          <section className="mt-8 border border-[#DDD6CF] bg-white p-8">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A23B35]">
              Account Setup
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              Research profile not linked.
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#706963]">
              Your SenSys Hub account is
              active, but it has not yet been
              linked to a graduate researcher
              profile. Please contact the Hub
              administrator.
            </p>

            <Link
              href="/hub/profile"
              className="mt-6 inline-flex rounded-full border border-[#385E9D] px-5 py-2.5 text-xs font-semibold text-[#385E9D]"
            >
              Review My Profile →
            </Link>
          </section>
        </div>
      </main>
    );
  }

  const supabase =
    await createClient();

  const today =
    new Date()
      .toISOString()
      .slice(0, 10);

  const isResearchLeadership =
    role === "admin" ||
    role ===
      "research_manager";

  const isLabLeadership =
    role === "admin" ||
    role ===
      "lab_manager";

  /* ========================================================
     LOAD RESEARCH DATA
  ======================================================== */

  let students:
    any[] = [];

  let projects:
    any[] = [];

  let milestones:
    any[] = [];

  let outputs:
    any[] = [];

  let updates:
    any[] = [];

  if (
    isResearchLeadership
  ) {
    const [
      studentResult,
      projectResult,
      milestoneResult,
      outputResult,
      updateResult,
    ] =
      await Promise.all([
        supabase
          .from(
            "students"
          )
          .select(
            `
            id,
            full_name,
            programme,
            research_area,
            status
            `
          )
          .order(
            "full_name",
            {
              ascending:
                true,
            }
          ),

        supabase
          .from(
            "research_workstreams"
          )
          .select(
            `
            id,
            student_id,
            title,
            status,
            current_focus,
            planned_start,
            planned_end
            `
          ),

        supabase
          .from(
            "student_milestones"
          )
          .select(
            `
            id,
            student_id,
            workstream_id,
            title,
            status,
            planned_end
            `
          ),

        supabase
          .from(
            "research_outputs"
          )
          .select(
            `
            id,
            student_id,
            workstream_id,
            output_type,
            title,
            status
            `
          ),

        supabase
          .from(
            "weekly_updates"
          )
          .select(
            `
            id,
            student_id,
            week_start,
            blockers
            `
          )
          .order(
            "week_start",
            {
              ascending:
                false,
            }
          ),
      ]);

    students =
      studentResult.data ??
      [];

    projects =
      projectResult.data ??
      [];

    milestones =
      milestoneResult.data ??
      [];

    outputs =
      outputResult.data ??
      [];

    updates =
      updateResult.data ??
      [];
  }

  /* ========================================================
     LOAD LAB / INVENTORY DATA
  ======================================================== */

  let chemicals:
    any[] = [];

  let consumables:
    any[] = [];

  let instruments:
    any[] = [];

  if (
    isLabLeadership ||
    role === "member"
  ) {
    const [
      chemicalResult,
      consumableResult,
      instrumentResult,
    ] =
      await Promise.all([
        supabase
          .from(
            "chemicals"
          )
          .select(
            `
            id,
            name,
            status
            `
          ),

        supabase
          .from(
            "consumables"
          )
          .select(
            `
            id,
            name,
            status
            `
          ),

        supabase
          .from(
            "instruments"
          )
          .select(
            `
            id,
            name,
            status
            `
          ),
      ]);

    chemicals =
      chemicalResult.data ??
      [];

    consumables =
      consumableResult.data ??
      [];

    instruments =
      instrumentResult.data ??
      [];
  }

  /* ========================================================
     RESEARCH SUMMARY
  ======================================================== */

  const activeProjects =
    projects.filter(
      (
        project
      ) =>
        ![
          "Completed",
          "On Hold",
        ].includes(
          project.status
        )
    );

  const completedProjects =
    projects.filter(
      (
        project
      ) =>
        project.status ===
        "Completed"
    );

  const normalizedMilestones =
    milestones.map(
      (
        milestone
      ) => ({
        ...milestone,

        normalizedStatus:
          normalizeMilestoneStatus(
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

  const activeMilestones =
    normalizedMilestones.filter(
      (
        milestone
      ) =>
        milestone.normalizedStatus ===
          "In Progress" ||
        milestone.normalizedStatus ===
          "Delayed"
    );

  const overdueMilestones =
    normalizedMilestones.filter(
      (
        milestone
      ) =>
        milestone.planned_end &&
        milestone.planned_end <
          today &&
        ![
          "Completed",
          "On Hold",
        ].includes(
          milestone.normalizedStatus
        )
    );

  /* ========================================================
     CHECK-IN SUMMARY
  ======================================================== */

  const latestUpdateByStudent =
    new Map<
      string,
      any
    >();

  for (
    const update of
    updates
  ) {
    if (
      !latestUpdateByStudent.has(
        update.student_id
      )
    ) {
      latestUpdateByStudent.set(
        update.student_id,
        update
      );
    }
  }

  let freshCheckIns =
    0;

  let staleCheckIns =
    0;

  let blockerCount =
    0;

  for (
    const student of
    students
  ) {
    const update =
      latestUpdateByStudent.get(
        student.id
      );

    if (!update) {
      staleCheckIns +=
        1;

      continue;
    }

    const updateDate =
      new Date(
        `${update.week_start}T00:00:00`
      );

    const age =
      Math.floor(
        (new Date().getTime() -
          updateDate.getTime()) /
          86400000
      );

    if (
      age <= 14
    ) {
      freshCheckIns +=
        1;
    } else {
      staleCheckIns +=
        1;
    }

    if (
      update.blockers
        ?.trim()
    ) {
      blockerCount +=
        1;
    }
  }

  /* ========================================================
     INVENTORY SUMMARY
  ======================================================== */

  const lowStockItems =
    [
      ...chemicals,
      ...consumables,
    ].filter(
      (
        item
      ) =>
        [
          "Low Stock",
          "Reorder",
          "Out of Stock",
        ].includes(
          item.status
        )
    );

  const availableInstruments =
    instruments.filter(
      (
        instrument
      ) =>
        instrument.status ===
        "Available"
    );

  const unavailableInstruments =
    instruments.filter(
      (
        instrument
      ) =>
        instrument.status !==
        "Available"
    );

  /* ========================================================
     RESEARCHERS REQUIRING ATTENTION
  ======================================================== */

  const researcherOverview =
    students
      .map(
        (
          student
        ) => {
          const studentProjects =
            projects.filter(
              (
                project
              ) =>
                project.student_id ===
                student.id
            );

          const studentMilestones =
            normalizedMilestones.filter(
              (
                milestone
              ) =>
                milestone.student_id ===
                student.id
            );

          const overdue =
            studentMilestones.filter(
              (
                milestone
              ) =>
                milestone.planned_end &&
                milestone.planned_end <
                  today &&
                ![
                  "Completed",
                  "On Hold",
                ].includes(
                  milestone.normalizedStatus
                )
            );

          const latestUpdate =
            latestUpdateByStudent.get(
              student.id
            ) ??
            null;

          const hasBlocker =
            Boolean(
              latestUpdate
                ?.blockers
                ?.trim()
            );

          const checkInAge =
            latestUpdate
              ? Math.floor(
                  (new Date().getTime() -
                    new Date(
                      `${latestUpdate.week_start}T00:00:00`
                    ).getTime()) /
                    86400000
                )
              : null;

          const needsUpdate =
            checkInAge ===
              null ||
            checkInAge >
              14;

          let attention =
            "On Track";

          let attentionScore =
            0;

          if (
            overdue.length >
            0
          ) {
            attention =
              "Milestone Overdue";

            attentionScore +=
              3;
          }

          if (
            hasBlocker
          ) {
            attention =
              "Blocker";

            attentionScore +=
              2;
          }

          if (
            needsUpdate
          ) {
            if (
              attention ===
              "On Track"
            ) {
              attention =
                "Check-in Needed";
            }

            attentionScore +=
              1;
          }

          return {
            student,
            activeProjects:
              studentProjects.filter(
                (
                  project
                ) =>
                  ![
                    "Completed",
                    "On Hold",
                  ].includes(
                    project.status
                  )
              ).length,

            overdue:
              overdue.length,

            latestUpdate,

            attention,

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

  /* ========================================================
     MILESTONE CHART DATA
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
          "In Progress",
        count:
          normalizedMilestones.filter(
            (
              milestone
            ) =>
              milestone.normalizedStatus ===
              "In Progress"
          ).length,
      },
      {
        label:
          "Delayed",
        count:
          normalizedMilestones.filter(
            (
              milestone
            ) =>
              milestone.normalizedStatus ===
              "Delayed"
          ).length,
      },
      {
        label:
          "Planned",
        count:
          normalizedMilestones.filter(
            (
              milestone
            ) =>
              milestone.normalizedStatus ===
              "Planned"
          ).length,
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
     OUTPUT TYPES
  ======================================================== */

  const outputTypes =
    Array.from(
      new Set(
        outputs
          .map(
            (
              output
            ) =>
              output.output_type
          )
          .filter(Boolean)
      )
    );

  /* ========================================================
     PAGE
  ======================================================== */

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[1320px]">
        {/* ================================================= */}
        {/* GREETING */}
        {/* ================================================= */}

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
              SenSys Hub
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-[-0.04em] md:text-5xl">
              Hello, {greetingName}.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#706963]">
              {isResearchLeadership
                ? "Here’s what’s happening across SenSys research and laboratory operations."
                : role ===
                    "lab_manager"
                  ? "Here’s the current laboratory and inventory status."
                  : "Welcome to the SenSys internal workspace."}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/hub/profile"
              className="rounded-full border border-[#D8D0C7] bg-white px-5 py-2.5 text-xs font-semibold text-[#385E9D] transition hover:border-[#385E9D]"
            >
              My Profile
            </Link>

            {isResearchLeadership && (
              <Link
                href="/hub/students/new"
                className="rounded-full bg-[#385E9D] px-5 py-2.5 text-xs font-semibold text-white"
              >
                + Add Researcher
              </Link>
            )}
          </div>
        </div>

        {/* ================================================= */}
        {/* RESEARCH LEADERSHIP DASHBOARD */}
        {/* ================================================= */}

        {isResearchLeadership && (
          <>
            {/* KPI CARDS */}

            <section className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Link
                href="/hub/students"
                className="group border border-[#DDD6CF] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#385E9D] hover:shadow-sm"
              >
                <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#385E9D]">
                  Researchers
                </p>

                <p className="mt-4 text-4xl font-bold">
                  {
                    students.length
                  }
                </p>

                <p className="mt-2 text-xs text-[#706963]">
                  Graduate researchers
                  in SenSys
                </p>

                <p className="mt-5 text-[10px] font-semibold text-[#385E9D]">
                  View people →
                </p>
              </Link>

              <Link
                href="/hub/research"
                className="group border border-[#DDD6CF] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#385E9D] hover:shadow-sm"
              >
                <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#385E9D]">
                  Active Projects
                </p>

                <p className="mt-4 text-4xl font-bold">
                  {
                    activeProjects.length
                  }
                </p>

                <p className="mt-2 text-xs text-[#706963]">
                  {
                    completedProjects.length
                  }{" "}
                  projects completed
                </p>

                <p className="mt-5 text-[10px] font-semibold text-[#385E9D]">
                  Research portfolio →
                </p>
              </Link>

              <Link
                href="/hub/research"
                className="group border border-[#DDD6CF] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#A23B35] hover:shadow-sm"
              >
                <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#A23B35]">
                  Milestones Needing Attention
                </p>

                <p className="mt-4 text-4xl font-bold">
                  {
                    overdueMilestones.length
                  }
                </p>

                <p className="mt-2 text-xs text-[#706963]">
                  Overdue research
                  milestones
                </p>

                <p className="mt-5 text-[10px] font-semibold text-[#A23B35]">
                  Review milestones →
                </p>
              </Link>

              <div className="border border-[#DDD6CF] bg-white p-6">
                <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#A15B16]">
                  Research Outputs
                </p>

                <p className="mt-4 text-4xl font-bold">
                  {
                    outputs.length
                  }
                </p>

                <p className="mt-2 text-xs text-[#706963]">
                  Papers, patents,
                  conferences and
                  prototypes
                </p>

                <p className="mt-5 text-[10px] text-[#928980]">
                  {
                    outputTypes.length
                  }{" "}
                  output categories
                </p>
              </div>
            </section>

            {/* RESEARCH VISUAL SUMMARY */}

            <section className="mt-8 grid gap-8 xl:grid-cols-[0.8fr_1.2fr]">
              {/* MILESTONE CHART */}

              <div className="border border-[#DDD6CF] bg-white p-6">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#385E9D]">
                    Research Activity
                  </p>

                  <h2 className="mt-1 text-xl font-bold">
                    Milestone Status
                  </h2>

                  <p className="mt-2 text-[10px] leading-5 text-[#837A72]">
                    Objective counts from
                    current researcher
                    milestones.
                  </p>
                </div>

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
                            className="h-full rounded-full bg-[#385E9D] transition-all"
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

                <div className="mt-7 grid grid-cols-2 gap-3 border-t border-[#EEE9E4] pt-5">
                  <div>
                    <p className="text-2xl font-bold text-[#2D6A45]">
                      {
                        completedMilestones.length
                      }
                    </p>

                    <p className="mt-1 text-[9px] text-[#928980]">
                      Completed
                    </p>
                  </div>

                  <div>
                    <p className="text-2xl font-bold text-[#385E9D]">
                      {
                        activeMilestones.length
                      }
                    </p>

                    <p className="mt-1 text-[9px] text-[#928980]">
                      Currently active
                    </p>
                  </div>
                </div>
              </div>

              {/* CHECK-IN HEALTH */}

              <div className="border border-[#DDD6CF] bg-white">
                <div className="border-b border-[#E7E1DB] px-6 py-5">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#385E9D]">
                    Research Check-ins
                  </p>

                  <h2 className="mt-1 text-xl font-bold">
                    Researcher Readiness
                  </h2>

                  <p className="mt-2 text-[10px] leading-5 text-[#837A72]">
                    Recent check-ins,
                    blockers and overdue
                    milestones are shown
                    without subjective
                    progress scoring.
                  </p>
                </div>

                <div className="grid grid-cols-3 border-b border-[#EEE9E4]">
                  <div className="p-5">
                    <p className="text-3xl font-bold text-[#2D6A45]">
                      {
                        freshCheckIns
                      }
                    </p>

                    <p className="mt-1 text-[9px] text-[#837A72]">
                      Recent check-ins
                    </p>
                  </div>

                  <div className="border-l border-[#EEE9E4] p-5">
                    <p className="text-3xl font-bold text-[#8A6200]">
                      {
                        staleCheckIns
                      }
                    </p>

                    <p className="mt-1 text-[9px] text-[#837A72]">
                      Need update
                    </p>
                  </div>

                  <div className="border-l border-[#EEE9E4] p-5">
                    <p className="text-3xl font-bold text-[#A23B35]">
                      {
                        blockerCount
                      }
                    </p>

                    <p className="mt-1 text-[9px] text-[#837A72]">
                      Blockers reported
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-[#EEE9E4]">
                  {researcherOverview
                    .slice(0, 5)
                    .map(
                      (
                        item
                      ) => (
                        <Link
                          key={
                            item.student.id
                          }
                          href={`/hub/students/${item.student.id}`}
                          className="grid gap-3 px-6 py-4 transition hover:bg-[#FAF9F7] md:grid-cols-[1.25fr_0.55fr_0.65fr]"
                        >
                          <div>
                            <p className="text-sm font-semibold">
                              {
                                item.student.full_name
                              }
                            </p>

                            <p className="mt-1 text-[9px] text-[#928980]">
                              {
                                item.student.programme
                              }
                              {item.student.research_area
                                ? ` · ${item.student.research_area}`
                                : ""}
                            </p>
                          </div>

                          <div>
                            <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#928980]">
                              Check-in
                            </p>

                            <p className="mt-1 text-[10px]">
                              {relativeDate(
                                item.latestUpdate
                                  ?.week_start
                              )}
                            </p>
                          </div>

                          <div>
                            <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#928980]">
                              Attention
                            </p>

                            <p
                              className={`mt-1 text-[10px] font-semibold ${
                                item.attention ===
                                "On Track"
                                  ? "text-[#2D6A45]"
                                  : item.attention ===
                                      "Check-in Needed"
                                    ? "text-[#8A6200]"
                                    : "text-[#A23B35]"
                              }`}
                            >
                              {
                                item.attention
                              }
                            </p>
                          </div>
                        </Link>
                      )
                    )}
                </div>

                <div className="border-t border-[#EEE9E4] bg-[#FAF9F7] px-6 py-4">
                  <Link
                    href="/hub/students"
                    className="text-xs font-semibold text-[#385E9D]"
                  >
                    View all researchers →
                  </Link>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ================================================= */}
        {/* LAB DASHBOARD */}
        {/* ================================================= */}

        {(isLabLeadership ||
          role === "member") && (
          <section className="mt-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#385E9D]">
                  Laboratory Operations
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Lab Snapshot
                </h2>
              </div>

              <Link
                href="/hub/lab"
                className="text-xs font-semibold text-[#385E9D]"
              >
                Open Lab →
              </Link>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Link
                href="/hub/inventory"
                className="border border-[#DDD6CF] bg-white p-5 transition hover:border-[#385E9D]"
              >
                <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#A15B16]">
                  Inventory Attention
                </p>

                <p className="mt-3 text-3xl font-bold">
                  {
                    lowStockItems.length
                  }
                </p>

                <p className="mt-2 text-[10px] text-[#837A72]">
                  Low or out-of-stock
                  items
                </p>
              </Link>

              <Link
                href="/hub/lab"
                className="border border-[#DDD6CF] bg-white p-5 transition hover:border-[#385E9D]"
              >
                <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#2D6A45]">
                  Instruments Available
                </p>

                <p className="mt-3 text-3xl font-bold">
                  {
                    availableInstruments.length
                  }
                </p>

                <p className="mt-2 text-[10px] text-[#837A72]">
                  Currently available
                </p>
              </Link>

              <Link
                href="/hub/lab"
                className="border border-[#DDD6CF] bg-white p-5 transition hover:border-[#A23B35]"
              >
                <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#A23B35]">
                  Instruments Unavailable
                </p>

                <p className="mt-3 text-3xl font-bold">
                  {
                    unavailableInstruments.length
                  }
                </p>

                <p className="mt-2 text-[10px] text-[#837A72]">
                  Check status before use
                </p>
              </Link>

              <Link
                href="/hub/lab/schedule"
                className="border border-[#DDD6CF] bg-white p-5 transition hover:border-[#385E9D]"
              >
                <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#385E9D]">
                  Instrument Schedule
                </p>

                <p className="mt-3 text-xl font-bold">
                  Live
                </p>

                <p className="mt-2 text-[10px] text-[#837A72]">
                  View availability and
                  bookings
                </p>
              </Link>
            </div>
          </section>
        )}

        {/* ================================================= */}
        {/* QUICK ACCESS */}
        {/* ================================================= */}

        <section className="mt-8 bg-[#203650] p-7 text-white">
          <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#F2A900]">
            Quick Access
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            Connected research operations.
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65">
            Research projects,
            researcher check-ins,
            reviews, instruments and
            inventory are managed through
            one role-aware workspace.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {isResearchLeadership && (
              <>
                <Link
                  href="/hub/research"
                  className="rounded-full bg-white px-5 py-2.5 text-xs font-semibold !text-[#203650]"
                >
                  Research Portfolio →
                </Link>

                <Link
                  href="/hub/meetings"
                  className="rounded-full border border-white/25 px-5 py-2.5 text-xs font-semibold text-white"
                >
                  Research Reviews →
                </Link>
              </>
            )}

            <Link
              href="/hub/lab"
              className="rounded-full border border-white/25 px-5 py-2.5 text-xs font-semibold text-white"
            >
              Lab & Instruments →
            </Link>

            <Link
              href="/hub/inventory"
              className="rounded-full border border-white/25 px-5 py-2.5 text-xs font-semibold text-white"
            >
              Inventory →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}