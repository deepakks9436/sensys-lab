import Link from "next/link";

import {
  notFound,
} from "next/navigation";

import {
  createClient,
} from "../../../../lib/supabase/server";

import ProjectGantt from "../../../../components/hub/ProjectGantt";

/* ============================================================
   HELPERS
============================================================ */

function normalizeStatus(
  status: string
) {
  if (
    status === "On Track"
  ) {
    return "In Progress";
  }

  if (
    status === "At Risk"
  ) {
    return "Delayed";
  }

  if (
    status ===
    "Not Started"
  ) {
    return "Planned";
  }

  return status;
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
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  ).format(date);
}

function differenceDays(
  dateString: string
) {
  const date =
    new Date(
      `${dateString}T00:00:00`
    );

  const today =
    new Date();

  today.setHours(
    0,
    0,
    0,
    0
  );

  return Math.floor(
    (
      today.getTime() -
      date.getTime()
    ) /
      86400000
  );
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
    ) === "Completed"
      ? "Completed"
      : "Planned";
  }

  if (
    milestones.every(
      (
        milestone
      ) =>
        normalizeStatus(
          milestone.status
        ) ===
        "Completed"
    )
  ) {
    return "Completed";
  }

  const today =
    new Date()
      .toISOString()
      .slice(0, 10);

  if (
    milestones.some(
      (
        milestone
      ) =>
        normalizeStatus(
          milestone.status
        ) ===
          "Delayed" ||
        Boolean(
          milestone.planned_end &&
            milestone.planned_end <
              today &&
            normalizeStatus(
              milestone.status
            ) !==
              "Completed" &&
            normalizeStatus(
              milestone.status
            ) !==
              "On Hold"
        )
    )
  ) {
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

/* ============================================================
   PAGE
============================================================ */

export default async function StudentPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } =
    await params;

  const supabase =
    await createClient();

  const {
    data: { user },
  } =
    await supabase.auth.getUser();

  if (!user) {
    notFound();
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

  const {
    data: student,
  } =
    await supabase
      .from("students")
      .select("*")
      .eq(
        "id",
        id
      )
      .maybeSingle();

  if (!student) {
    notFound();
  }

  const isOwner =
    isStudent &&
    student.user_id ===
      user.id;

  const canSubmitWeekly =
    canManage ||
    isOwner;

  /* ========================================================
     LOAD RESEARCH DATA
  ======================================================== */

  const [
    projectResult,
    milestoneResult,
    outputResult,
    weeklyResult,
    actionResult,
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

      supabase
        .from(
          "action_items"
        )
        .select("*")
        .eq(
          "student_id",
          id
        )
        .neq(
          "status",
          "Completed"
        )
        .order(
          "due_date",
          {
            ascending: true,
          }
        ),
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

  const actions =
    actionResult.data ??
    [];

  /* ========================================================
     PROJECT HEALTH
  ======================================================== */

  const projectHealth =
    projects.map(
      (
        project
      ) => {
        const children =
          milestones.filter(
            (
              milestone
            ) =>
              milestone.workstream_id ===
              project.id
          );

        return {
          id:
            project.id,

          status:
            deriveProjectStatus(
              project,
              children
            ),
        };
      }
    );

  const activeProjects =
    projectHealth.filter(
      (
        project
      ) =>
        project.status ===
        "In Progress"
    ).length;

  const delayedProjects =
    projectHealth.filter(
      (
        project
      ) =>
        project.status ===
        "Delayed"
    ).length;

  const completedProjects =
    projectHealth.filter(
      (
        project
      ) =>
        project.status ===
        "Completed"
    ).length;

  /* ========================================================
     OUTPUT SUMMARY
  ======================================================== */

  const totalOutputs =
    outputs.reduce(
      (
        total,
        output
      ) =>
        total +
        Number(
          output.achieved_count ??
            0
        ),
      0
    );

  const outputTypes = [
    "Journal Paper",
    "Patent",
    "Conference Paper",
    "Prototype",
    "Technology Transfer",
  ];

  const outputMatrix =
    projects.map(
      (
        project
      ) => {
        const projectOutputs =
          outputs.filter(
            (
              output
            ) =>
              output.workstream_id ===
              project.id
          );

        const values =
          Object.fromEntries(
            outputTypes.map(
              (
                type
              ) => {
                const relevant =
                  projectOutputs.filter(
                    (
                      output
                    ) =>
                      output.output_type ===
                      type
                  );

                return [
                  type,
                  {
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
                  },
                ];
              }
            )
          );

        return {
          project,
          values,
        };
      }
    );

  /* ========================================================
     ATTENTION
  ======================================================== */

  const today =
    new Date()
      .toISOString()
      .slice(0, 10);

  const overdueMilestones =
    milestones.filter(
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
          normalizeStatus(
            milestone.status
          )
        )
    );

  const latestWeekly =
    weeklyUpdates[0] ??
    null;

  const daysSinceUpdate =
    latestWeekly?.week_start
      ? differenceDays(
          latestWeekly.week_start
        )
      : null;

  const staleUpdate =
    daysSinceUpdate ===
      null ||
    daysSinceUpdate >
      14;

  /* ========================================================
     ACTIVE RESEARCH
  ======================================================== */

  const activeResearch =
    projects
      .map(
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

          const current =
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

          return {
            project,
            current,
            status:
              deriveProjectStatus(
                project,
                projectMilestones
              ),
          };
        }
      )
      .filter(
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
     CLIENT DATA
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

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[1400px]">
        {/* ================================================= */}
        {/* TOP NAV */}
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
                  className="rounded-full border border-[#D8D0C7] bg-white px-4 py-2 text-xs font-semibold"
                >
                  Edit Researcher
                </Link>

                <Link
                  href={`/hub/students/${id}/portfolio`}
                  className="rounded-full border border-[#385E9D] bg-white px-4 py-2 text-xs font-semibold text-[#385E9D]"
                >
                  Projects & Outputs
                </Link>

                <Link
                  href={`/hub/students/${id}/milestones/new`}
                  className="rounded-full bg-[#385E9D] px-4 py-2 text-xs font-semibold text-white"
                >
                  + Milestone
                </Link>
              </>
            )}

            {canSubmitWeekly && (
              <Link
                href={`/hub/students/${id}/weekly/new`}
                className="rounded-full bg-[#203650] px-4 py-2 text-xs font-semibold text-white"
              >
                + Weekly Update
              </Link>
            )}
          </div>
        </div>

        {/* ================================================= */}
        {/* PROFILE HERO */}
        {/* ================================================= */}

        <section className="mt-6 overflow-hidden border border-[#DDD6CF] bg-white">
          <div className="grid lg:grid-cols-[1.35fr_0.65fr]">
            <div className="p-7 md:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#E8EFF8] px-3 py-1 text-[9px] font-bold text-[#385E9D]">
                  {
                    student.programme
                  }
                </span>

                <span className="text-xs text-[#928980]">
                  {student.intake ||
                    "Intake not set"}
                </span>
              </div>

              <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em] md:text-5xl">
                {
                  student.full_name
                }
              </h1>

              <p className="mt-3 text-base font-semibold text-[#385E9D]">
                {student.research_area ||
                  "Research area not assigned"}
              </p>

              <p className="mt-2 max-w-3xl text-sm leading-7 text-[#706963]">
                {student.project_title ||
                  "Research topic not yet defined"}
              </p>
            </div>

            <div className="bg-[#203650] p-7 text-white md:p-8">
              <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#F2A900]">
                Currently Active
              </p>

              {activeResearch.length >
              0 ? (
                <div className="mt-4 space-y-5">
                  {activeResearch
                    .slice(
                      0,
                      3
                    )
                    .map(
                      (
                        item
                      ) => (
                        <div
                          key={
                            item.project.id
                          }
                        >
                          <p className="text-sm font-bold">
                            {
                              item.project.title
                            }
                          </p>

                          <p className="mt-1 text-xs text-white/65">
                            {item.current.length >
                            0
                              ? item.current
                                  .map(
                                    (
                                      milestone
                                    ) =>
                                      milestone.title
                                  )
                                  .join(
                                    " · "
                                  )
                              : item.project.current_focus ||
                                item.status}
                          </p>
                        </div>
                      )
                    )}
                </div>
              ) : (
                <p className="mt-4 text-sm text-white/60">
                  No project currently
                  marked active.
                </p>
              )}

              <div className="mt-7 border-t border-white/15 pt-5">
                <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-white/40">
                  Expected Completion
                </p>

                <p className="mt-2 text-lg font-bold">
                  {formatDate(
                    student.expected_completion_date
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* KPI */}
        {/* ================================================= */}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {[
            {
              label:
                "Projects",

              value:
                projects.length,

              note:
                "Total research projects",
            },

            {
              label:
                "Active",

              value:
                activeProjects,

              note:
                "Currently in progress",
            },

            {
              label:
                "Completed",

              value:
                completedProjects,

              note:
                "Finished projects",
            },

            {
              label:
                "Needs Attention",

              value:
                delayedProjects +
                overdueMilestones.length,

              note:
                "Delayed / overdue",

              warning:
                true,
            },

            {
              label:
                "Outputs",

              value:
                totalOutputs,

              note:
                "Achieved research outputs",
            },
          ].map(
            (
              metric
            ) => (
              <div
                key={
                  metric.label
                }
                className="border border-[#DDD6CF] bg-white p-5"
              >
                <p
                  className={`text-[8px] font-bold uppercase tracking-[0.15em] ${
                    metric.warning
                      ? "text-[#A23B35]"
                      : "text-[#928980]"
                  }`}
                >
                  {
                    metric.label
                  }
                </p>

                <p className="mt-3 text-3xl font-bold">
                  {
                    metric.value
                  }
                </p>

                <p className="mt-2 text-[9px] text-[#837A72]">
                  {
                    metric.note
                  }
                </p>
              </div>
            )
          )}
        </section>

        {/* ================================================= */}
        {/* PROJECT EXPLORER */}
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
                Select a project card or
                Gantt bar to inspect its
                milestones, current work
                and research outputs.
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
        {/* OUTPUT MATRIX */}
        {/* ================================================= */}

        <section className="mt-8 border border-[#DDD6CF] bg-white">
          <div className="border-b border-[#E7E1DB] px-6 py-5">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
              Research Productivity
            </p>

            <h2 className="mt-1 text-xl font-bold">
              Project Output Map
            </h2>

            <p className="mt-2 text-[10px] text-[#837A72]">
              See which projects are
              generating papers,
              patents, conferences and
              prototypes.
            </p>
          </div>

          {projects.length ===
          0 ? (
            <div className="px-6 py-10 text-sm text-[#837A72]">
              No projects available.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] border-collapse">
                <thead>
                  <tr className="border-b border-[#E7E1DB] bg-[#FAF9F7]">
                    <th className="px-6 py-4 text-left text-[8px] font-bold uppercase tracking-[0.14em] text-[#928980]">
                      Project
                    </th>

                    {outputTypes.map(
                      (
                        type
                      ) => (
                        <th
                          key={
                            type
                          }
                          className="px-4 py-4 text-center text-[8px] font-bold uppercase tracking-[0.12em] text-[#928980]"
                        >
                          {type ===
                          "Journal Paper"
                            ? "Papers"
                            : type ===
                                "Conference Paper"
                              ? "Conf."
                              : type ===
                                  "Technology Transfer"
                                ? "Transfer"
                                : type}
                        </th>
                      )
                    )}
                  </tr>
                </thead>

                <tbody>
                  {outputMatrix.map(
                    (
                      row
                    ) => (
                      <tr
                        key={
                          row.project.id
                        }
                        className="border-b border-[#EEE9E4] last:border-b-0"
                      >
                        <td className="px-6 py-4">
                          <p className="text-xs font-semibold">
                            {
                              row.project.title
                            }
                          </p>
                        </td>

                        {outputTypes.map(
                          (
                            type
                          ) => {
                            const value =
                              row.values[
                                type
                              ];

                            if (
                              value.target ===
                                0 &&
                              value.achieved ===
                                0
                            ) {
                              return (
                                <td
                                  key={
                                    type
                                  }
                                  className="px-4 py-4 text-center text-xs text-[#C1BAB3]"
                                >
                                  —
                                </td>
                              );
                            }

                            return (
                              <td
                                key={
                                  type
                                }
                                className="px-4 py-4 text-center"
                              >
                                <div className="flex justify-center gap-1">
                                  {Array.from(
                                    {
                                      length:
                                        Math.max(
                                          value.target,
                                          value.achieved
                                        ),
                                    },
                                    (
                                      _,
                                      index
                                    ) => (
                                      <span
                                        key={
                                          index
                                        }
                                        className={`h-2.5 w-2.5 rounded-full ${
                                          index <
                                          value.achieved
                                            ? "bg-[#385E9D]"
                                            : "border border-[#C9C4BE] bg-white"
                                        }`}
                                      />
                                    )
                                  )}
                                </div>

                                <p className="mt-1 text-[8px] text-[#928980]">
                                  {
                                    value.achieved
                                  }
                                  /
                                  {
                                    value.target
                                  }
                                </p>
                              </td>
                            );
                          }
                        )}
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* ================================================= */}
        {/* ATTENTION + LATEST UPDATE */}
        {/* ================================================= */}

        <div className="mt-8 grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          {/* ATTENTION */}

          <section className="border border-[#DDD6CF] bg-white">
            <div className="border-b border-[#E7E1DB] px-6 py-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A23B35]">
                Follow-up
              </p>

              <h2 className="mt-1 text-xl font-bold">
                Needs Attention
              </h2>
            </div>

            {overdueMilestones.length ===
              0 &&
            !staleUpdate &&
            actions.length ===
              0 ? (
              <div className="px-6 py-10">
                <p className="text-sm font-semibold text-[#2D6A45]">
                  All clear.
                </p>

                <p className="mt-1 text-xs text-[#837A72]">
                  No overdue research
                  items at the moment.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-[#EEE9E4]">
                {staleUpdate && (
                  <div className="px-6 py-5">
                    <div className="flex gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFF4D9] text-sm font-bold text-[#8A6200]">
                        !
                      </span>

                      <div>
                        <p className="text-sm font-semibold">
                          Weekly update
                          overdue
                        </p>

                        <p className="mt-1 text-[10px] leading-5 text-[#837A72]">
                          {daysSinceUpdate ===
                          null
                            ? "No weekly update has been submitted."
                            : `Last update was ${daysSinceUpdate} days ago.`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {overdueMilestones
                  .slice(
                    0,
                    5
                  )
                  .map(
                    (
                      milestone
                    ) => {
                      const project =
                        projects.find(
                          (
                            item
                          ) =>
                            item.id ===
                            milestone.workstream_id
                        );

                      const overdueDays =
                        milestone.planned_end
                          ? differenceDays(
                              milestone.planned_end
                            )
                          : 0;

                      return (
                        <div
                          key={
                            milestone.id
                          }
                          className="px-6 py-5"
                        >
                          <div className="flex gap-3">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FBE7E5] text-sm font-bold text-[#A23B35]">
                              !
                            </span>

                            <div>
                              <p className="text-sm font-semibold">
                                {
                                  milestone.title
                                }
                              </p>

                              <p className="mt-1 text-[10px] text-[#837A72]">
                                {project
                                  ? `${project.title} · `
                                  : ""}
                                {overdueDays}
                                {" days overdue"}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}

                {actions
                  .slice(
                    0,
                    5
                  )
                  .map(
                    (
                      action
                    ) => (
                      <div
                        key={
                          action.id
                        }
                        className="px-6 py-5"
                      >
                        <div className="flex gap-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8EFF8] text-xs font-bold text-[#385E9D]">
                            →
                          </span>

                          <div>
                            <p className="text-sm font-semibold">
                              {
                                action.title
                              }
                            </p>

                            <p className="mt-1 text-[10px] text-[#837A72]">
                              {action.due_date
                                ? `Due ${formatDate(
                                    action.due_date
                                  )}`
                                : "No due date"}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  )}
              </div>
            )}
          </section>

          {/* WEEKLY */}

          <section className="border border-[#DDD6CF] bg-white">
            <div className="flex items-center justify-between gap-4 border-b border-[#E7E1DB] px-6 py-5">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
                  Weekly Progress
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Latest Research Update
                </h2>
              </div>

              {canSubmitWeekly && (
                <Link
                  href={`/hub/students/${id}/weekly/new`}
                  className="text-xs font-semibold text-[#385E9D]"
                >
                  + Update
                </Link>
              )}
            </div>

            {!latestWeekly ? (
              <div className="px-6 py-10 text-sm text-[#837A72]">
                No weekly update
                submitted yet.
              </div>
            ) : (
              <article className="p-6">
                <p className="text-sm font-bold">
                  Week of{" "}
                  {
                    latestWeekly.week_start
                  }
                </p>

                {latestWeekly.completed_this_week && (
                  <div className="mt-5">
                    <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#928980]">
                      Completed
                    </p>

                    <p className="mt-2 whitespace-pre-line text-xs leading-6 text-[#645D57]">
                      {
                        latestWeekly.completed_this_week
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
                  <div className="mt-5 border-l-[3px] border-[#F2A900] bg-[#FFF9EA] px-4 py-3">
                    <p className="text-[8px] font-bold uppercase text-[#8A6200]">
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
                  <div className="mt-4 border-l-[3px] border-[#385E9D] bg-[#F1F5FA] px-4 py-3">
                    <p className="text-[8px] font-bold uppercase text-[#385E9D]">
                      Support Needed
                    </p>

                    <p className="mt-1 whitespace-pre-line text-xs leading-6">
                      {
                        latestWeekly.support_needed
                      }
                    </p>
                  </div>
                )}

                {weeklyUpdates.length >
                  1 && (
                  <details className="mt-5 border-t border-[#EEE9E4] pt-4">
                    <summary className="cursor-pointer text-[10px] font-semibold text-[#385E9D]">
                      Previous updates
                    </summary>

                    <div className="mt-4 space-y-4">
                      {weeklyUpdates
                        .slice(
                          1
                        )
                        .map(
                          (
                            update
                          ) => (
                            <div
                              key={
                                update.id
                              }
                              className="border border-[#EEE9E4] bg-[#FAF9F7] p-4"
                            >
                              <p className="text-[10px] font-semibold">
                                Week of{" "}
                                {
                                  update.week_start
                                }
                              </p>

                              {update.completed_this_week && (
                                <p className="mt-2 line-clamp-3 text-[10px] leading-5 text-[#706963]">
                                  {
                                    update.completed_this_week
                                  }
                                </p>
                              )}
                            </div>
                          )
                        )}
                    </div>
                  </details>
                )}
              </article>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}