"use client";

import {
  useMemo,
  useState,
} from "react";

type Project = {
  id: string;
  title: string;

  planned_start:
    | string
    | null;

  planned_end:
    | string
    | null;

  actual_start:
    | string
    | null;

  actual_end:
    | string
    | null;

  status: string;

  current_focus:
    | string
    | null;

  description:
    | string
    | null;
};

type Milestone = {
  id: string;
  title: string;

  project_id:
    | string
    | null;

  planned_start:
    | string
    | null;

  planned_end:
    | string
    | null;

  actual_start:
    | string
    | null;

  actual_end:
    | string
    | null;

  status: string;

  notes:
    | string
    | null;

  evidence_url:
    | string
    | null;
};

type Output = {
  id: string;

  project_id:
    | string
    | null;

  output_type: string;

  title:
    | string
    | null;

  target_count: number;
  achieved_count: number;

  status: string;

  target_date:
    | string
    | null;

  reference_url:
    | string
    | null;
};

type Props = {
  projects: Project[];
  milestones: Milestone[];
  outputs: Output[];

  manageUrl?: string;
};

/* ============================================================
   STATUS
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

function parseDate(
  value:
    | string
    | null
) {
  if (!value) {
    return null;
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
    return null;
  }

  return date;
}

function todayString() {
  return new Date()
    .toISOString()
    .slice(0, 10);
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
    parseDate(value);

  if (!date) {
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

function daysBetween(
  end: Date,
  start: Date
) {
  return Math.floor(
    (
      end.getTime() -
      start.getTime()
    ) /
      86400000
  );
}

/* ============================================================
   PROJECT HEALTH

   On Hold remains an explicit project-level override.

   Otherwise project health is inferred from milestones.
============================================================ */

function deriveProjectStatus(
  project: Project,
  milestones: Milestone[]
) {
  if (
    normalizeStatus(
      project.status
    ) === "On Hold"
  ) {
    return "On Hold";
  }

  if (
    milestones.length === 0
  ) {
    return normalizeStatus(
      project.status
    ) === "Completed"
      ? "Completed"
      : "Planned";
  }

  const today =
    todayString();

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

  const hasDelayed =
    milestones.some(
      (
        milestone
      ) => {
        const status =
          normalizeStatus(
            milestone.status
          );

        if (
          status ===
          "Delayed"
        ) {
          return true;
        }

        return Boolean(
          milestone.planned_end &&
            milestone.planned_end <
              today &&
            status !==
              "Completed" &&
            status !==
              "On Hold"
        );
      }
    );

  if (hasDelayed) {
    return "Delayed";
  }

  const hasActive =
    milestones.some(
      (
        milestone
      ) =>
        normalizeStatus(
          milestone.status
        ) ===
        "In Progress"
    );

  if (hasActive) {
    return "In Progress";
  }

  return "Planned";
}

function statusColour(
  status: string
) {
  const value =
    normalizeStatus(
      status
    );

  if (
    value ===
    "Completed"
  ) {
    return "#2D6A45";
  }

  if (
    value ===
    "In Progress"
  ) {
    return "#385E9D";
  }

  if (
    value ===
    "Delayed"
  ) {
    return "#A23B35";
  }

  if (
    value ===
    "On Hold"
  ) {
    return "#837A72";
  }

  return "#C9C4BE";
}

function statusClasses(
  status: string
) {
  const value =
    normalizeStatus(
      status
    );

  if (
    value ===
    "Completed"
  ) {
    return "bg-[#E8F4EC] text-[#2D6A45]";
  }

  if (
    value ===
    "In Progress"
  ) {
    return "bg-[#E8EFF8] text-[#385E9D]";
  }

  if (
    value ===
    "Delayed"
  ) {
    return "bg-[#FBE7E5] text-[#A23B35]";
  }

  if (
    value ===
    "On Hold"
  ) {
    return "bg-[#EEEAE5] text-[#706963]";
  }

  return "bg-[#F4F1EE] text-[#837A72]";
}

function statusSymbol(
  status: string
) {
  const value =
    normalizeStatus(
      status
    );

  if (
    value ===
    "Completed"
  ) {
    return "✓";
  }

  if (
    value ===
    "In Progress"
  ) {
    return "●";
  }

  if (
    value ===
    "Delayed"
  ) {
    return "!";
  }

  if (
    value ===
    "On Hold"
  ) {
    return "‖";
  }

  return "○";
}

/* ============================================================
   OUTPUT LABELS
============================================================ */

function outputShortName(
  type: string
) {
  if (
    type ===
    "Journal Paper"
  ) {
    return "Paper";
  }

  if (
    type ===
    "Conference Paper"
  ) {
    return "Conf.";
  }

  if (
    type ===
    "Technology Transfer"
  ) {
    return "Transfer";
  }

  return type;
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function ProjectGantt({
  projects,
  milestones,
  outputs,
  manageUrl,
}: Props) {
  const [
    selectedProjectId,
    setSelectedProjectId,
  ] =
    useState<
      string | null
    >(null);

  const [
    projectFilter,
    setProjectFilter,
  ] =
    useState<
      | "All"
      | "Active"
      | "Delayed"
      | "Completed"
    >("All");

  const [
    timeView,
    setTimeView,
  ] =
    useState<
      | "6M"
      | "1Y"
      | "Full"
    >("Full");

  const [
    expandedProjects,
    setExpandedProjects,
  ] =
    useState<
      Set<string>
    >(
      new Set(
        projects
          .filter(
            (
              project
            ) => {
              const childMilestones =
                milestones.filter(
                  (
                    milestone
                  ) =>
                    milestone.project_id ===
                    project.id
                );

              return (
                deriveProjectStatus(
                  project,
                  childMilestones
                ) ===
                "In Progress"
              );
            }
          )
          .map(
            (
              project
            ) =>
              project.id
          )
      )
    );

  /* ========================================================
     ENRICH PROJECTS
  ======================================================== */

  const enrichedProjects =
    useMemo(
      () =>
        projects.map(
          (
            project
          ) => {
            const projectMilestones =
              milestones.filter(
                (
                  milestone
                ) =>
                  milestone.project_id ===
                  project.id
              );

            const projectOutputs =
              outputs.filter(
                (
                  output
                ) =>
                  output.project_id ===
                  project.id
              );

            const status =
              deriveProjectStatus(
                project,
                projectMilestones
              );

            const completed =
              projectMilestones.filter(
                (
                  milestone
                ) =>
                  normalizeStatus(
                    milestone.status
                  ) ===
                  "Completed"
              ).length;

            const active =
              projectMilestones.filter(
                (
                  milestone
                ) =>
                  normalizeStatus(
                    milestone.status
                  ) ===
                    "In Progress" ||
                  normalizeStatus(
                    milestone.status
                  ) ===
                    "Delayed"
              );

            const planned =
              projectMilestones
                .filter(
                  (
                    milestone
                  ) =>
                    normalizeStatus(
                      milestone.status
                    ) ===
                    "Planned"
                )
                .sort(
                  (
                    a,
                    b
                  ) =>
                    String(
                      a.planned_end ??
                        "9999"
                    ).localeCompare(
                      String(
                        b.planned_end ??
                          "9999"
                      )
                    )
                );

            return {
              ...project,

              derived_status:
                status,

              milestones:
                projectMilestones,

              outputs:
                projectOutputs,

              completed,

              active,

              next:
                planned[0] ??
                null,
            };
          }
        ),
      [
        projects,
        milestones,
        outputs,
      ]
    );

  const visibleProjects =
    enrichedProjects.filter(
      (
        project
      ) => {
        if (
          projectFilter ===
          "All"
        ) {
          return true;
        }

        if (
          projectFilter ===
          "Active"
        ) {
          return (
            project.derived_status ===
            "In Progress"
          );
        }

        return (
          project.derived_status ===
          projectFilter
        );
      }
    );

  const selectedProject =
    enrichedProjects.find(
      (
        project
      ) =>
        project.id ===
        selectedProjectId
    ) ?? null;

  /* ========================================================
     TIMELINE
  ======================================================== */

  const timeline =
    useMemo(
      () => {
        const today =
          new Date();

        let start: Date;
        let end: Date;

        if (
          timeView === "6M"
        ) {
          start =
            new Date(
              today.getFullYear(),
              today.getMonth() -
                1,
              1
            );

          end =
            new Date(
              today.getFullYear(),
              today.getMonth() +
                5,
              0
            );
        } else if (
          timeView === "1Y"
        ) {
          start =
            new Date(
              today.getFullYear(),
              today.getMonth() -
                2,
              1
            );

          end =
            new Date(
              today.getFullYear(),
              today.getMonth() +
                10,
              0
            );
        } else {
          const dates = [
            ...projects.flatMap(
              (
                project
              ) => [
                parseDate(
                  project.planned_start
                ),

                parseDate(
                  project.planned_end
                ),
              ]
            ),

            ...milestones.flatMap(
              (
                milestone
              ) => [
                parseDate(
                  milestone.planned_start
                ),

                parseDate(
                  milestone.planned_end
                ),
              ]
            ),
          ].filter(
            (
              value
            ): value is Date =>
              Boolean(value)
          );

          start =
            dates.length
              ? new Date(
                  Math.min(
                    ...dates.map(
                      (
                        date
                      ) =>
                        date.getTime()
                    )
                  )
                )
              : new Date(
                  today.getFullYear(),
                  today.getMonth() -
                    2,
                  1
                );

          end =
            dates.length
              ? new Date(
                  Math.max(
                    ...dates.map(
                      (
                        date
                      ) =>
                        date.getTime()
                    )
                  )
                )
              : new Date(
                  today.getFullYear(),
                  today.getMonth() +
                    10,
                  1
                );

          if (
            today < start
          ) {
            start =
              new Date(
                today.getFullYear(),
                today.getMonth(),
                1
              );
          }

          if (
            today > end
          ) {
            end =
              new Date(
                today.getFullYear(),
                today.getMonth() +
                  3,
                1
              );
          }

          start =
            new Date(
              start.getFullYear(),
              start.getMonth(),
              1
            );

          end =
            new Date(
              end.getFullYear(),
              end.getMonth() +
                1,
              0
            );
        }

        const totalDays =
          Math.max(
            1,
            daysBetween(
              end,
              start
            )
          );

        const months: {
          label: string;
          left: number;
        }[] = [];

        const cursor =
          new Date(
            start.getFullYear(),
            start.getMonth(),
            1
          );

        while (
          cursor <= end
        ) {
          months.push({
            label:
              new Intl.DateTimeFormat(
                "en",
                {
                  month:
                    "short",

                  year:
                    "2-digit",
                }
              ).format(
                cursor
              ),

            left:
              Math.max(
                0,
                Math.min(
                  100,
                  (
                    daysBetween(
                      cursor,
                      start
                    ) /
                    totalDays
                  ) *
                    100
                )
              ),
          });

          cursor.setMonth(
            cursor.getMonth() +
              1
          );
        }

        return {
          start,
          end,
          totalDays,
          months,

          todayPosition:
            Math.max(
              0,
              Math.min(
                100,
                (
                  daysBetween(
                    today,
                    start
                  ) /
                  totalDays
                ) *
                  100
              )
            ),
        };
      },
      [
        projects,
        milestones,
        timeView,
      ]
    );

  function barStyle(
    startValue:
      | string
      | null,

    endValue:
      | string
      | null
  ) {
    const start =
      parseDate(
        startValue
      );

    const end =
      parseDate(
        endValue
      );

    if (
      !start &&
      !end
    ) {
      return null;
    }

    const resolvedStart =
      start ?? end!;

    const resolvedEnd =
      end ?? start!;

    if (
      resolvedEnd <
        timeline.start ||
      resolvedStart >
        timeline.end
    ) {
      return null;
    }

    const left =
      Math.max(
        0,
        Math.min(
          100,
          (
            daysBetween(
              resolvedStart,
              timeline.start
            ) /
            timeline.totalDays
          ) *
            100
        )
      );

    const right =
      Math.max(
        0,
        Math.min(
          100,
          (
            daysBetween(
              resolvedEnd,
              timeline.start
            ) /
            timeline.totalDays
          ) *
            100
        )
      );

    return {
      left:
        Math.min(
          left,
          right
        ),

      width:
        Math.max(
          1.5,
          Math.abs(
            right -
              left
          )
        ),
    };
  }

  function toggleProject(
    projectId: string
  ) {
    setExpandedProjects(
      (
        current
      ) => {
        const next =
          new Set(
            current
          );

        if (
          next.has(
            projectId
          )
        ) {
          next.delete(
            projectId
          );
        } else {
          next.add(
            projectId
          );
        }

        return next;
      }
    );
  }

  function expandAll() {
    setExpandedProjects(
      new Set(
        visibleProjects.map(
          (
            project
          ) =>
            project.id
        )
      )
    );
  }

  function collapseAll() {
    setExpandedProjects(
      new Set()
    );
  }

  /* ========================================================
     PROJECT CARDS
  ======================================================== */

  return (
    <>
      <div className="border-b border-[#E7E1DB]">
        <div className="grid gap-px bg-[#EEE9E4] lg:grid-cols-2 xl:grid-cols-3">
          {enrichedProjects.map(
            (
              project
            ) => {
              const total =
                project.milestones.length;

              return (
                <button
                  type="button"
                  key={
                    project.id
                  }
                  onClick={() =>
                    setSelectedProjectId(
                      project.id
                    )
                  }
                  className="group bg-white p-6 text-left transition hover:-translate-y-[2px] hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
                        Research Project
                      </p>

                      <h3 className="mt-2 text-lg font-bold tracking-[-0.02em]">
                        {
                          project.title
                        }
                      </h3>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[8px] font-bold ${statusClasses(
                        project.derived_status
                      )}`}
                    >
                      {
                        project.derived_status
                      }
                    </span>
                  </div>

                  {project.active.length >
                    0 && (
                    <div className="mt-5 border-l-[3px] border-[#F2A900] bg-[#FFF9EA] px-4 py-3">
                      <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#8A6200]">
                        Current Milestone
                      </p>

                      <p className="mt-1 text-xs font-semibold leading-5 text-[#4C4641]">
                        {
                          project.active[0]
                            .title
                        }
                      </p>
                    </div>
                  )}

                  {project.active.length ===
                    0 &&
                    project.next && (
                      <div className="mt-5 border-l-[3px] border-[#385E9D] bg-[#F1F5FA] px-4 py-3">
                        <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#385E9D]">
                          Next Milestone
                        </p>

                        <p className="mt-1 text-xs font-semibold">
                          {
                            project.next
                              .title
                          }
                        </p>
                      </div>
                    )}

                  <div className="mt-5">
                    <div className="flex items-center justify-between">
                      <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#928980]">
                        Milestones
                      </p>

                      <p className="text-xs font-bold">
                        {
                          project.completed
                        }
                        {" / "}
                        {total}
                      </p>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.milestones.map(
                        (
                          milestone
                        ) => (
                          <span
                            key={
                              milestone.id
                            }
                            title={`${milestone.title}: ${normalizeStatus(
                              milestone.status
                            )}`}
                            className="h-3 w-3 rounded-full"
                            style={{
                              background:
                                normalizeStatus(
                                  milestone.status
                                ) ===
                                "Planned"
                                  ? "white"
                                  : statusColour(
                                      milestone.status
                                    ),

                              border:
                                normalizeStatus(
                                  milestone.status
                                ) ===
                                "Planned"
                                  ? "1px solid #C9C4BE"
                                  : undefined,
                            }}
                          />
                        )
                      )}
                    </div>
                  </div>

                  <div className="mt-5 border-t border-[#EEE9E4] pt-4">
                    <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#928980]">
                      Outputs
                    </p>

                    {project.outputs.length >
                    0 ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.outputs
                          .slice(
                            0,
                            4
                          )
                          .map(
                            (
                              output
                            ) => (
                              <span
                                key={
                                  output.id
                                }
                                className="rounded-full bg-[#F1F5FA] px-2.5 py-1 text-[8px] font-semibold text-[#385E9D]"
                              >
                                {outputShortName(
                                  output.output_type
                                )}
                                {" "}
                                {
                                  output.achieved_count
                                }
                                /
                                {
                                  output.target_count
                                }
                              </span>
                            )
                          )}
                      </div>
                    ) : (
                      <p className="mt-2 text-[9px] text-[#928980]">
                        No outputs linked
                        yet.
                      </p>
                    )}
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-[#EEE9E4] pt-4">
                    <p className="text-[9px] text-[#837A72]">
                      Target{" "}
                      {formatDate(
                        project.planned_end
                      )}
                    </p>

                    <span className="text-[10px] font-semibold text-[#385E9D] opacity-60 transition group-hover:opacity-100">
                      View Project →
                    </span>
                  </div>
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* ================================================== */}
      {/* GANTT CONTROLS */}
      {/* ================================================== */}

      <div className="flex flex-col justify-between gap-4 border-b border-[#E7E1DB] bg-[#FAF9F7] px-6 py-4 lg:flex-row lg:items-center">
        <div className="flex flex-wrap gap-2">
          {[
            "All",
            "Active",
            "Delayed",
            "Completed",
          ].map(
            (
              filter
            ) => (
              <button
                type="button"
                key={filter}
                onClick={() =>
                  setProjectFilter(
                    filter as
                      | "All"
                      | "Active"
                      | "Delayed"
                      | "Completed"
                  )
                }
                className={`rounded-full px-3 py-1.5 text-[9px] font-semibold transition ${
                  projectFilter ===
                  filter
                    ? "bg-[#203650] text-white"
                    : "border border-[#D8D0C7] bg-white text-[#645D57]"
                }`}
              >
                {filter}
              </button>
            )
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[8px] font-bold uppercase tracking-[0.13em] text-[#928980]">
            Timeline
          </span>

          {[
            {
              key:
                "6M",
              label:
                "6 Months",
            },

            {
              key:
                "1Y",
              label:
                "1 Year",
            },

            {
              key:
                "Full",
              label:
                "Full PhD",
            },
          ].map(
            (
              option
            ) => (
              <button
                type="button"
                key={
                  option.key
                }
                onClick={() =>
                  setTimeView(
                    option.key as
                      | "6M"
                      | "1Y"
                      | "Full"
                  )
                }
                className={`rounded-full px-3 py-1.5 text-[9px] font-semibold ${
                  timeView ===
                  option.key
                    ? "bg-[#385E9D] text-white"
                    : "border border-[#D8D0C7] bg-white"
                }`}
              >
                {
                  option.label
                }
              </button>
            )
          )}

          <span className="mx-2 hidden h-5 w-px bg-[#D8D0C7] sm:block" />

          <button
            type="button"
            onClick={
              expandAll
            }
            className="text-[9px] font-semibold text-[#385E9D]"
          >
            Expand all
          </button>

          <button
            type="button"
            onClick={
              collapseAll
            }
            className="text-[9px] font-semibold text-[#837A72]"
          >
            Collapse
          </button>
        </div>
      </div>

      {/* ================================================== */}
      {/* GANTT */}
      {/* ================================================== */}

      <div className="overflow-x-auto">
        <div className="min-w-[1050px]">
          <div className="grid grid-cols-[320px_1fr] border-b border-[#E7E1DB]">
            <div className="px-6 py-4 text-[8px] font-bold uppercase tracking-[0.16em] text-[#928980]">
              Project / Milestone
            </div>

            <div className="relative h-12">
              {timeline.months.map(
                (
                  month
                ) => (
                  <span
                    key={`${month.label}-${month.left}`}
                    className="absolute top-4 -translate-x-1/2 whitespace-nowrap text-[8px] font-semibold text-[#928980]"
                    style={{
                      left: `${month.left}%`,
                    }}
                  >
                    {
                      month.label
                    }
                  </span>
                )
              )}

              <div
                className="absolute inset-y-0 z-20 w-px bg-[#F2A900]"
                style={{
                  left: `${timeline.todayPosition}%`,
                }}
              >
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#F2A900] px-1.5 py-0.5 text-[7px] font-bold text-[#203650]">
                  TODAY
                </span>
              </div>
            </div>
          </div>

          {visibleProjects.length ===
          0 ? (
            <div className="px-6 py-12 text-sm text-[#837A72]">
              No projects match this
              view.
            </div>
          ) : (
            visibleProjects.map(
              (
                project
              ) => {
                const expanded =
                  expandedProjects.has(
                    project.id
                  );

                const range =
                  barStyle(
                    project.planned_start,
                    project.planned_end
                  );

                return (
                  <div
                    key={
                      project.id
                    }
                  >
                    {/* PROJECT ROW */}

                    <div className="grid min-h-[74px] grid-cols-[320px_1fr] border-b border-[#E7E1DB] bg-[#FAF9F7]">
                      <div className="flex items-center gap-3 px-6 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            toggleProject(
                              project.id
                            )
                          }
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#D8D0C7] bg-white text-xs font-bold text-[#385E9D]"
                        >
                          {expanded
                            ? "−"
                            : "+"}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedProjectId(
                              project.id
                            )
                          }
                          className="min-w-0 flex-1 text-left"
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="h-2.5 w-2.5 shrink-0 rounded-full"
                              style={{
                                background:
                                  statusColour(
                                    project.derived_status
                                  ),
                              }}
                            />

                            <p className="truncate text-xs font-bold">
                              {
                                project.title
                              }
                            </p>
                          </div>

                          <p className="mt-1 pl-[18px] text-[9px] text-[#837A72]">
                            {
                              project.completed
                            }
                            {" / "}
                            {
                              project.milestones
                                .length
                            }{" "}
                            milestones
                          </p>
                        </button>
                      </div>

                      <div className="relative">
                        {timeline.months.map(
                          (
                            month
                          ) => (
                            <div
                              key={`${project.id}-${month.left}`}
                              className="absolute inset-y-0 border-l border-[#EEEAE5]"
                              style={{
                                left: `${month.left}%`,
                              }}
                            />
                          )
                        )}

                        <div
                          className="absolute inset-y-0 z-20 w-px bg-[#F2A900]/75"
                          style={{
                            left: `${timeline.todayPosition}%`,
                          }}
                        />

                        {range ? (
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedProjectId(
                                project.id
                              )
                            }
                            title={`${project.title} · ${project.derived_status}`}
                            className={`absolute top-1/2 z-10 h-7 -translate-y-1/2 rounded-sm shadow-sm transition hover:brightness-95 ${
                              project.derived_status ===
                              "Delayed"
                                ? "ring-2 ring-[#A23B35]/20"
                                : ""
                            }`}
                            style={{
                              left: `${range.left}%`,
                              width: `${range.width}%`,
                              background:
                                statusColour(
                                  project.derived_status
                                ),
                            }}
                          >
                            <span className="sr-only">
                              Open{" "}
                              {
                                project.title
                              }
                            </span>
                          </button>
                        ) : (
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[8px] text-[#AAA19A]">
                            Dates not set
                          </span>
                        )}
                      </div>
                    </div>

                    {/* MILESTONE ROWS */}

                    {expanded &&
                      project.milestones.map(
                        (
                          milestone
                        ) => {
                          const milestoneRange =
                            barStyle(
                              milestone.planned_start,
                              milestone.planned_end
                            );

                          const status =
                            normalizeStatus(
                              milestone.status
                            );

                          return (
                            <div
                              key={
                                milestone.id
                              }
                              className="grid min-h-[56px] grid-cols-[320px_1fr] border-b border-[#F0ECE8] bg-white"
                            >
                              <div className="flex items-center gap-3 px-12 py-3">
                                <span
                                  className="h-2 w-2 shrink-0 rounded-full"
                                  style={{
                                    background:
                                      status ===
                                      "Planned"
                                        ? "white"
                                        : statusColour(
                                            status
                                          ),

                                    border:
                                      status ===
                                      "Planned"
                                        ? "1px solid #C9C4BE"
                                        : undefined,
                                  }}
                                />

                                <div className="min-w-0">
                                  <p className="truncate text-[11px] font-medium">
                                    {
                                      milestone.title
                                    }
                                  </p>

                                  <p className="mt-0.5 text-[8px] text-[#928980]">
                                    {status}
                                    {milestone.planned_end
                                      ? ` · ${milestone.planned_end}`
                                      : ""}
                                  </p>
                                </div>
                              </div>

                              <div className="relative">
                                {timeline.months.map(
                                  (
                                    month
                                  ) => (
                                    <div
                                      key={`${milestone.id}-${month.left}`}
                                      className="absolute inset-y-0 border-l border-[#F4F1EE]"
                                      style={{
                                        left: `${month.left}%`,
                                      }}
                                    />
                                  )
                                )}

                                <div
                                  className="absolute inset-y-0 z-20 w-px bg-[#F2A900]/55"
                                  style={{
                                    left: `${timeline.todayPosition}%`,
                                  }}
                                />

                                {milestoneRange ? (
                                  <div
                                    title={`${milestone.title} · ${status}`}
                                    className={`absolute top-1/2 h-3.5 -translate-y-1/2 rounded-sm ${
                                      status ===
                                      "Completed"
                                        ? "opacity-65"
                                        : ""
                                    }`}
                                    style={{
                                      left: `${milestoneRange.left}%`,
                                      width: `${milestoneRange.width}%`,
                                      background:
                                        statusColour(
                                          status
                                        ),
                                    }}
                                  />
                                ) : (
                                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[8px] text-[#AAA19A]">
                                    Dates not set
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        }
                      )}
                  </div>
                );
              }
            )
          )}
        </div>
      </div>

      {/* ================================================== */}
      {/* PROJECT DRAWER */}
      {/* ================================================== */}

      {selectedProject && (
        <>
          <button
            type="button"
            aria-label="Close project details"
            onClick={() =>
              setSelectedProjectId(
                null
              )
            }
            className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[1px]"
          />

          <aside className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-[520px] overflow-y-auto border-l border-[#D8D0C7] bg-[#FAF9F7] shadow-2xl">
            {/* HEADER */}

            <div className="sticky top-0 z-10 border-b border-[#E7E1DB] bg-white px-6 py-5">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#385E9D]">
                    Research Project
                  </p>

                  <h3 className="mt-2 text-2xl font-bold tracking-[-0.03em]">
                    {
                      selectedProject.title
                    }
                  </h3>

                  <span
                    className={`mt-3 inline-flex rounded-full px-3 py-1 text-[8px] font-bold ${statusClasses(
                      selectedProject.derived_status
                    )}`}
                  >
                    {
                      selectedProject.derived_status
                    }
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedProjectId(
                      null
                    )
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D8D0C7] bg-white text-lg"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="space-y-7 p-6">
              {/* DATES */}

              <div className="grid grid-cols-2 gap-3">
                <div className="border border-[#DDD6CF] bg-white p-4">
                  <p className="text-[8px] font-bold uppercase text-[#928980]">
                    Start
                  </p>

                  <p className="mt-2 text-xs font-semibold">
                    {formatDate(
                      selectedProject.planned_start
                    )}
                  </p>
                </div>

                <div className="border border-[#DDD6CF] bg-white p-4">
                  <p className="text-[8px] font-bold uppercase text-[#928980]">
                    Target
                  </p>

                  <p className="mt-2 text-xs font-semibold">
                    {formatDate(
                      selectedProject.planned_end
                    )}
                  </p>
                </div>
              </div>

              {/* CURRENT */}

              <div className="bg-[#203650] p-5 text-white">
                <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#F2A900]">
                  Current Milestone
                </p>

                {selectedProject.active.length >
                0 ? (
                  <>
                    <p className="mt-2 text-lg font-bold">
                      {
                        selectedProject.active[0]
                          .title
                      }
                    </p>

                    <p className="mt-2 text-[10px] text-white/60">
                      Target{" "}
                      {formatDate(
                        selectedProject.active[0]
                          .planned_end
                      )}
                    </p>
                  </>
                ) : (
                  <p className="mt-2 text-sm text-white/65">
                    No active milestone.
                  </p>
                )}

                {selectedProject.next && (
                  <div className="mt-5 border-t border-white/15 pt-4">
                    <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-white/45">
                      Next
                    </p>

                    <p className="mt-1 text-xs font-semibold">
                      {
                        selectedProject.next
                          .title
                      }
                    </p>
                  </div>
                )}
              </div>

              {/* CURRENT FOCUS */}

              {selectedProject.current_focus && (
                <div className="border-l-[3px] border-[#F2A900] bg-[#FFF9EA] px-4 py-4">
                  <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#8A6200]">
                    Current Focus
                  </p>

                  <p className="mt-2 text-xs leading-6 text-[#645D57]">
                    {
                      selectedProject.current_focus
                    }
                  </p>
                </div>
              )}

              {/* MILESTONE JOURNEY */}

              <div>
                <div className="flex items-center justify-between">
                  <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#928980]">
                    Project Journey
                  </p>

                  <p className="text-[9px] font-semibold text-[#645D57]">
                    {
                      selectedProject.completed
                    }
                    {" / "}
                    {
                      selectedProject.milestones
                        .length
                    }
                  </p>
                </div>

                <div className="mt-4">
                  {selectedProject.milestones.length ===
                  0 ? (
                    <p className="text-xs text-[#837A72]">
                      No milestones
                      defined yet.
                    </p>
                  ) : (
                    selectedProject.milestones.map(
                      (
                        milestone,
                        index
                      ) => {
                        const status =
                          normalizeStatus(
                            milestone.status
                          );

                        return (
                          <div
                            key={
                              milestone.id
                            }
                            className="grid grid-cols-[30px_1fr] gap-3"
                          >
                            <div className="flex flex-col items-center">
                              <span
                                className="flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-bold text-white"
                                style={{
                                  background:
                                    statusColour(
                                      status
                                    ),
                                }}
                              >
                                {statusSymbol(
                                  status
                                )}
                              </span>

                              {index <
                                selectedProject
                                  .milestones
                                  .length -
                                  1 && (
                                <div className="min-h-8 w-px flex-1 bg-[#D8D0C7]" />
                              )}
                            </div>

                            <div className="pb-5">
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <p className="text-xs font-semibold">
                                    {
                                      milestone.title
                                    }
                                  </p>

                                  <p className="mt-1 text-[8px] text-[#928980]">
                                    {status}

                                    {milestone.planned_end
                                      ? ` · Target ${formatDate(
                                          milestone.planned_end
                                        )}`
                                      : ""}
                                  </p>
                                </div>

                                {milestone.evidence_url && (
                                  <a
                                    href={
                                      milestone.evidence_url
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                    className="shrink-0 text-[8px] font-semibold text-[#385E9D]"
                                  >
                                    Evidence ↗
                                  </a>
                                )}
                              </div>

                              {milestone.notes && (
                                <p className="mt-2 text-[10px] leading-5 text-[#706963]">
                                  {
                                    milestone.notes
                                  }
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      }
                    )
                  )}
                </div>
              </div>

              {/* OUTPUTS */}

              <div>
                <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#928980]">
                  Research Outputs
                </p>

                {selectedProject.outputs.length >
                0 ? (
                  <div className="mt-3 space-y-2">
                    {selectedProject.outputs.map(
                      (
                        output
                      ) => (
                        <div
                          key={
                            output.id
                          }
                          className="border border-[#DDD6CF] bg-white p-4"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-xs font-semibold">
                                {output.title ||
                                  output.output_type}
                              </p>

                              <p className="mt-1 text-[8px] uppercase tracking-[0.12em] text-[#928980]">
                                {
                                  output.output_type
                                }
                              </p>
                            </div>

                            <p className="text-sm font-bold">
                              {
                                output.achieved_count
                              }
                              <span className="font-normal text-[#928980]">
                                {" "}
                                /{" "}
                                {
                                  output.target_count
                                }
                              </span>
                            </p>
                          </div>

                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-[8px] font-semibold text-[#837A72]">
                              {
                                output.status
                              }
                            </span>

                            {output.reference_url && (
                              <a
                                href={
                                  output.reference_url
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="text-[8px] font-semibold text-[#385E9D]"
                              >
                                Open ↗
                              </a>
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p className="mt-2 text-xs text-[#837A72]">
                    No research outputs
                    linked to this project.
                  </p>
                )}
              </div>

              {/* NOTES */}

              {selectedProject.description && (
                <div>
                  <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#928980]">
                    Project Notes
                  </p>

                  <p className="mt-2 whitespace-pre-line text-xs leading-6 text-[#645D57]">
                    {
                      selectedProject.description
                    }
                  </p>
                </div>
              )}

              {/* MANAGE */}

              {manageUrl && (
                <a
                  href={
                    manageUrl
                  }
                  className="flex w-full items-center justify-center rounded-full bg-[#385E9D] px-5 py-3 text-xs font-semibold text-white"
                >
                  Manage Project →
                </a>
              )}
            </div>
          </aside>
        </>
      )}
    </>
  );
}