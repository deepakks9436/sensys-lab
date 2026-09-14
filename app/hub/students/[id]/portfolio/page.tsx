import Link from "next/link";

import {
  notFound,
} from "next/navigation";

import {
  createClient,
} from "../../../../../lib/supabase/server";

import {
  addResearchOutput,
  addWorkstream,
  deleteResearchOutput,
  deleteWorkstream,
  updateResearchOutput,
  updateWorkstream,
} from "./actions";

/* ============================================================
   STATUS HELPERS
============================================================ */

function normalizeProjectStatus(
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
    status === "Not Started"
  ) {
    return "Planned";
  }

  return [
    "Planned",
    "In Progress",
    "Delayed",
    "Completed",
    "On Hold",
  ].includes(status)
    ? status
    : "Planned";
}

function normalizeOutputStatus(
  status: string
) {
  if (
    [
      "Accepted",
      "Published",
      "Granted",
    ].includes(status)
  ) {
    return "Completed";
  }

  if (
    [
      "Under Review",
      "Filed",
    ].includes(status)
  ) {
    return "Submitted";
  }

  return [
    "Planned",
    "In Progress",
    "Submitted",
    "Completed",
    "On Hold",
  ].includes(status)
    ? status
    : "Planned";
}

function statusClasses(
  status: string
) {
  const normalized =
    status ===
    "On Track"
      ? "In Progress"
      : status ===
        "At Risk"
        ? "Delayed"
        : status;

  if (
    [
      "Completed",
      "Published",
      "Accepted",
      "Granted",
    ].includes(
      normalized
    )
  ) {
    return "bg-[#E8F4EC] text-[#2D6A45]";
  }

  if (
    [
      "In Progress",
      "Submitted",
      "Under Review",
      "Filed",
    ].includes(
      normalized
    )
  ) {
    return "bg-[#E8EFF8] text-[#385E9D]";
  }

  if (
    normalized ===
    "Delayed"
  ) {
    return "bg-[#FBE7E5] text-[#A23B35]";
  }

  if (
    normalized ===
    "On Hold"
  ) {
    return "bg-[#EEEAE5] text-[#706963]";
  }

  return "bg-[#F4F1EE] text-[#837A72]";
}

function statusSymbol(
  status: string
) {
  const normalized =
    normalizeProjectStatus(
      status
    );

  if (
    normalized ===
    "Completed"
  ) {
    return "✓";
  }

  if (
    normalized ===
    "In Progress"
  ) {
    return "●";
  }

  if (
    normalized ===
    "Delayed"
  ) {
    return "!";
  }

  if (
    normalized ===
    "On Hold"
  ) {
    return "‖";
  }

  return "○";
}

/* ============================================================
   DATE HELPERS
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
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  ).format(date);
}

/* ============================================================
   PAGE
============================================================ */

export default async function ResearchPortfolioPage({
  params,
  searchParams,
}: {
  params: Promise<{
    id: string;
  }>;

  searchParams: Promise<{
    error?: string;
    success?: string;
  }>;
}) {
  const { id } =
    await params;

  const query =
    await searchParams;

  const supabase =
    await createClient();

  const {
    data: { user },
  } =
    await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  /* ========================================================
     ACCESS
  ======================================================== */

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
    notFound();
  }

  /* ========================================================
     RESEARCHER
  ======================================================== */

  const {
    data: student,
  } =
    await supabase
      .from("students")
      .select(
        `
        id,
        full_name,
        programme,
        research_area,
        project_title
        `
      )
      .eq(
        "id",
        id
      )
      .maybeSingle();

  if (!student) {
    notFound();
  }

  /* ========================================================
     PROJECTS + OUTPUTS

     IMPORTANT:
     UI = "Project"
     Database table remains research_workstreams
     Output relation remains workstream_id
  ======================================================== */

  const [
    projectResult,
    outputResult,
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
    ]);

  const projects =
    projectResult.data ??
    [];

  const outputs =
    outputResult.data ??
    [];

  /* ========================================================
     SUMMARY
  ======================================================== */

  const activeProjects =
    projects.filter(
      (
        project
      ) =>
        normalizeProjectStatus(
          project.status
        ) ===
        "In Progress"
    ).length;

  const completedProjects =
    projects.filter(
      (
        project
      ) =>
        normalizeProjectStatus(
          project.status
        ) ===
        "Completed"
    ).length;

  const delayedProjects =
    projects.filter(
      (
        project
      ) =>
        normalizeProjectStatus(
          project.status
        ) ===
        "Delayed"
    ).length;

  const totalTargetOutputs =
    outputs.reduce(
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
    );

  const totalAchievedOutputs =
    outputs.reduce(
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
    );

  const inputClass =
    "mt-2 w-full border border-[#D8D0C7] bg-white px-3 py-2.5 text-xs outline-none transition focus:border-[#385E9D]";

  const labelClass =
    "text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]";

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[1320px]">
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <Link
              href={`/hub/students/${id}`}
              className="text-xs font-semibold text-[#385E9D]"
            >
              ← {student.full_name}
            </Link>

            <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
              Research Management
            </p>

            <h1 className="mt-2 text-4xl font-bold tracking-[-0.04em] md:text-5xl">
              Projects & Outputs.
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-[#706963]">
              Manage the researcher&apos;s
              major projects, milestones
              and research outputs.
            </p>
          </div>

          <Link
            href={`/hub/students/${id}`}
            className="inline-flex self-start rounded-full bg-[#203650] px-5 py-3 text-xs font-semibold text-white md:self-auto"
          >
            Research Dashboard →
          </Link>
        </div>

        {/* ================================================= */}
        {/* FEEDBACK */}
        {/* ================================================= */}

        {query.error && (
          <div className="mt-6 border-l-[3px] border-[#A23B35] bg-[#FBE7E5] px-5 py-4 text-xs text-[#82322D]">
            {query.error}
          </div>
        )}

        {query.success && (
          <div className="mt-6 border-l-[3px] border-[#2D6A45] bg-[#E8F4EC] px-5 py-4 text-xs text-[#2D6A45]">
            Research portfolio
            updated successfully.
          </div>
        )}

        {/* ================================================= */}
        {/* SNAPSHOT */}
        {/* ================================================= */}

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="border border-[#DDD6CF] bg-white p-5">
            <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
              Projects
            </p>

            <p className="mt-3 text-3xl font-bold">
              {projects.length}
            </p>

            <p className="mt-2 text-[10px] text-[#837A72]">
              Major research projects
            </p>
          </div>

          <div className="border border-[#DDD6CF] bg-white p-5">
            <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#385E9D]">
              Active
            </p>

            <p className="mt-3 text-3xl font-bold">
              {activeProjects}
            </p>

            <p className="mt-2 text-[10px] text-[#837A72]">
              Currently in progress
            </p>
          </div>

          <div className="border border-[#DDD6CF] bg-white p-5">
            <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#2D6A45]">
              Completed
            </p>

            <p className="mt-3 text-3xl font-bold">
              {completedProjects}
            </p>

            {delayedProjects >
              0 && (
              <p className="mt-2 text-[10px] font-semibold text-[#A23B35]">
                {delayedProjects}{" "}
                delayed
              </p>
            )}
          </div>

          <div className="border border-[#DDD6CF] bg-white p-5">
            <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#F2A900]">
              Outputs
            </p>

            <p className="mt-3 text-3xl font-bold">
              {totalAchievedOutputs}

              <span className="text-base font-normal text-[#928980]">
                {" "}
                /{" "}
                {totalTargetOutputs}
              </span>
            </p>

            <p className="mt-2 text-[10px] text-[#837A72]">
              Achieved vs target
            </p>
          </div>
        </section>

        {/* ================================================= */}
        {/* ADD PROJECT */}
        {/* ================================================= */}

        <section className="mt-8 border border-[#DDD6CF] bg-white">
          <div className="border-b border-[#E7E1DB] px-6 py-5">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
              Project
            </p>

            <h2 className="mt-1 text-xl font-bold">
              Add Research Project
            </h2>

            <p className="mt-2 max-w-3xl text-xs leading-6 text-[#837A72]">
              A project is a major
              research effort such as
              PestiSafe 1.0,
              PestiSafe 2.0 or another
              research development.
            </p>
          </div>

          <form
            action={addWorkstream.bind(
              null,
              id
            )}
            className="grid gap-5 p-6 md:grid-cols-2"
          >
            <div className="md:col-span-2">
              <label
                className={
                  labelClass
                }
              >
                Project Name *
              </label>

              <input
                name="title"
                required
                placeholder="e.g. PestiSafe 3.0"
                className={
                  inputClass
                }
              />
            </div>

            <div>
              <label
                className={
                  labelClass
                }
              >
                Planned Start
              </label>

              <input
                name="planned_start"
                type="date"
                className={
                  inputClass
                }
              />
            </div>

            <div>
              <label
                className={
                  labelClass
                }
              >
                Target Date
              </label>

              <input
                name="planned_end"
                type="date"
                className={
                  inputClass
                }
              />
            </div>

            <div>
              <label
                className={
                  labelClass
                }
              >
                Status
              </label>

              <select
                name="status"
                defaultValue="Planned"
                className={
                  inputClass
                }
              >
                <option>
                  Planned
                </option>

                <option>
                  In Progress
                </option>

                <option>
                  Delayed
                </option>

                <option>
                  Completed
                </option>

                <option>
                  On Hold
                </option>
              </select>
            </div>

            <div>
              <label
                className={
                  labelClass
                }
              >
                Current Focus
              </label>

              <input
                name="current_focus"
                placeholder="What is currently being worked on?"
                className={
                  inputClass
                }
              />
            </div>

            <div className="md:col-span-2">
              <label
                className={
                  labelClass
                }
              >
                Notes
              </label>

              <textarea
                name="notes"
                rows={3}
                placeholder="Brief objective, context or important information..."
                className={
                  inputClass
                }
              />
            </div>

            {/*
              The action still accepts
              category internally, but
              the field is intentionally
              removed from the UI.
            */}

            <input
              type="hidden"
              name="category"
              value=""
            />

            <div className="md:col-span-2">
              <button
                type="submit"
                className="rounded-full bg-[#385E9D] px-5 py-2.5 text-xs font-semibold text-white"
              >
                + Add Project
              </button>
            </div>
          </form>
        </section>

        {/* ================================================= */}
        {/* PROJECT CARDS */}
        {/* ================================================= */}

        <section className="mt-8">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
            Research Portfolio
          </p>

          <h2 className="mt-1 text-2xl font-bold">
            Research Projects
          </h2>

          {projects.length ===
          0 ? (
            <div className="mt-5 border border-[#DDD6CF] bg-white px-6 py-10">
              <p className="text-sm text-[#837A72]">
                No research projects
                yet.
              </p>
            </div>
          ) : (
            <div className="mt-5 grid gap-5 xl:grid-cols-2">
              {projects.map(
                (
                  project
                ) => {
                  const normalizedStatus =
                    normalizeProjectStatus(
                      project.status
                    );

                  const updateAction =
                    updateWorkstream.bind(
                      null,
                      id,
                      project.id
                    );

                  const deleteAction =
                    deleteWorkstream.bind(
                      null,
                      id,
                      project.id
                    );

                  const linkedOutputs =
                    outputs.filter(
                      (
                        output
                      ) =>
                        output.workstream_id ===
                        project.id
                    );

                  return (
                    <article
                      key={
                        project.id
                      }
                      className="border border-[#DDD6CF] bg-white"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex gap-3">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#203650] text-sm font-bold text-white">
                              {statusSymbol(
                                normalizedStatus
                              )}
                            </span>

                            <div>
                              <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#928980]">
                                Research Project
                              </p>

                              <h3 className="mt-1 text-lg font-bold">
                                {
                                  project.title
                                }
                              </h3>
                            </div>
                          </div>

                          <span
                            className={`shrink-0 rounded-full px-2.5 py-1 text-[8px] font-bold ${statusClasses(
                              normalizedStatus
                            )}`}
                          >
                            {
                              normalizedStatus
                            }
                          </span>
                        </div>

                        {project.current_focus && (
                          <div className="mt-5 border-l-[3px] border-[#F2A900] bg-[#FFF9EA] px-4 py-3">
                            <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#8A6200]">
                              Current Focus
                            </p>

                            <p className="mt-1 text-xs leading-5 text-[#645D57]">
                              {
                                project.current_focus
                              }
                            </p>
                          </div>
                        )}

                        <div className="mt-5 grid gap-4 border-t border-[#EEE9E4] pt-4 sm:grid-cols-2">
                          <div>
                            <p className="text-[8px] font-bold uppercase text-[#928980]">
                              Planned
                            </p>

                            <p className="mt-1 text-xs">
                              {formatDate(
                                project.planned_start
                              )}

                              {" → "}

                              {formatDate(
                                project.planned_end
                              )}
                            </p>
                          </div>

                          <div>
                            <p className="text-[8px] font-bold uppercase text-[#928980]">
                              Actual
                            </p>

                            <p className="mt-1 text-xs">
                              {project.actual_start
                                ? formatDate(
                                    project.actual_start
                                  )
                                : "Not started"}

                              {project.actual_end
                                ? ` → ${formatDate(
                                    project.actual_end
                                  )}`
                                : ""}
                            </p>
                          </div>
                        </div>

                        <div className="mt-5 border-t border-[#EEE9E4] pt-4">
                          <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#928980]">
                            Research Outputs
                          </p>

                          {linkedOutputs.length >
                          0 ? (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {linkedOutputs.map(
                                (
                                  output
                                ) => (
                                  <span
                                    key={
                                      output.id
                                    }
                                    className="rounded-full bg-[#F1F5FA] px-3 py-1 text-[8px] font-semibold text-[#385E9D]"
                                  >
                                    {
                                      output.output_type
                                    }{" "}
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

                        {project.description && (
                          <p className="mt-4 text-xs leading-6 text-[#706963]">
                            {
                              project.description
                            }
                          </p>
                        )}
                      </div>

                      {/* EDIT */}

                      <details className="border-t border-[#E7E1DB]">
                        <summary className="cursor-pointer px-6 py-4 text-[10px] font-semibold text-[#385E9D]">
                          Edit project
                        </summary>

                        <form
                          action={
                            updateAction
                          }
                          className="grid gap-5 border-t border-[#EEE9E4] bg-[#FAF9F7] p-6 md:grid-cols-2"
                        >
                          <div className="md:col-span-2">
                            <label
                              className={
                                labelClass
                              }
                            >
                              Project Name
                            </label>

                            <input
                              name="title"
                              required
                              defaultValue={
                                project.title
                              }
                              className={
                                inputClass
                              }
                            />
                          </div>

                          <div>
                            <label
                              className={
                                labelClass
                              }
                            >
                              Planned Start
                            </label>

                            <input
                              name="planned_start"
                              type="date"
                              defaultValue={
                                project.planned_start ??
                                ""
                              }
                              className={
                                inputClass
                              }
                            />
                          </div>

                          <div>
                            <label
                              className={
                                labelClass
                              }
                            >
                              Target Date
                            </label>

                            <input
                              name="planned_end"
                              type="date"
                              defaultValue={
                                project.planned_end ??
                                ""
                              }
                              className={
                                inputClass
                              }
                            />
                          </div>

                          <div>
                            <label
                              className={
                                labelClass
                              }
                            >
                              Status
                            </label>

                            <select
                              name="status"
                              defaultValue={
                                normalizedStatus
                              }
                              className={
                                inputClass
                              }
                            >
                              <option>
                                Planned
                              </option>

                              <option>
                                In Progress
                              </option>

                              <option>
                                Delayed
                              </option>

                              <option>
                                Completed
                              </option>

                              <option>
                                On Hold
                              </option>
                            </select>
                          </div>

                          <div>
                            <label
                              className={
                                labelClass
                              }
                            >
                              Current Focus
                            </label>

                            <input
                              name="current_focus"
                              defaultValue={
                                project.current_focus ??
                                ""
                              }
                              className={
                                inputClass
                              }
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label
                              className={
                                labelClass
                              }
                            >
                              Notes
                            </label>

                            <textarea
                              name="notes"
                              rows={3}
                              defaultValue={
                                project.description ??
                                ""
                              }
                              className={
                                inputClass
                              }
                            />
                          </div>

                          <input
                            type="hidden"
                            name="category"
                            value=""
                          />

                          <div className="md:col-span-2">
                            <button
                              type="submit"
                              className="rounded-full bg-[#385E9D] px-5 py-2.5 text-[10px] font-semibold text-white"
                            >
                              Save Changes
                            </button>
                          </div>
                        </form>

                        <div className="border-t border-[#EEE9E4] bg-[#FAF9F7] px-6 py-4">
                          <form
                            action={
                              deleteAction
                            }
                          >
                            <button
                              type="submit"
                              className="text-[10px] font-semibold text-[#A23B35]"
                            >
                              Delete Project
                            </button>
                          </form>
                        </div>
                      </details>
                    </article>
                  );
                }
              )}
            </div>
          )}
        </section>

        {/* ================================================= */}
        {/* ADD OUTPUT */}
        {/* ================================================= */}

        <section className="mt-10 border border-[#DDD6CF] bg-white">
          <div className="border-b border-[#E7E1DB] px-6 py-5">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
              Research Output
            </p>

            <h2 className="mt-1 text-xl font-bold">
              Add Output
            </h2>

            <p className="mt-2 text-xs leading-6 text-[#837A72]">
              Link each output to the
              project that generated
              it.
            </p>
          </div>

          <form
            action={addResearchOutput.bind(
              null,
              id
            )}
            className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-4"
          >
            <div>
              <label
                className={
                  labelClass
                }
              >
                Output Type *
              </label>

              <select
                name="output_type"
                defaultValue="Journal Paper"
                className={
                  inputClass
                }
              >
                <option>
                  Journal Paper
                </option>

                <option>
                  Conference Paper
                </option>

                <option>
                  Patent
                </option>

                <option>
                  Prototype
                </option>

                <option>
                  Technology Transfer
                </option>

                <option>
                  Thesis
                </option>

                <option>
                  Dataset
                </option>

                <option>
                  Software
                </option>

                <option>
                  Other
                </option>
              </select>
            </div>

            <div className="xl:col-span-2">
              <label
                className={
                  labelClass
                }
              >
                Title
              </label>

              <input
                name="title"
                placeholder="e.g. PestiSafe 2.0 journal paper"
                className={
                  inputClass
                }
              />
            </div>

            <div>
              <label
                className={
                  labelClass
                }
              >
                Project
              </label>

              {/*
                IMPORTANT:
                Field stays workstream_id
                because that is the real
                database relationship.
              */}

              <select
                name="workstream_id"
                defaultValue=""
                className={
                  inputClass
                }
              >
                <option value="">
                  No project
                </option>

                {projects.map(
                  (
                    project
                  ) => (
                    <option
                      key={
                        project.id
                      }
                      value={
                        project.id
                      }
                    >
                      {
                        project.title
                      }
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label
                className={
                  labelClass
                }
              >
                Target
              </label>

              <input
                name="target_count"
                type="number"
                min="0"
                defaultValue="1"
                className={
                  inputClass
                }
              />
            </div>

            <div>
              <label
                className={
                  labelClass
                }
              >
                Achieved
              </label>

              <input
                name="achieved_count"
                type="number"
                min="0"
                defaultValue="0"
                className={
                  inputClass
                }
              />
            </div>

            <div>
              <label
                className={
                  labelClass
                }
              >
                Status
              </label>

              <select
                name="status"
                defaultValue="Planned"
                className={
                  inputClass
                }
              >
                <option>
                  Planned
                </option>

                <option>
                  In Progress
                </option>

                <option>
                  Submitted
                </option>

                <option>
                  Completed
                </option>

                <option>
                  On Hold
                </option>
              </select>
            </div>

            <div>
              <label
                className={
                  labelClass
                }
              >
                Target Date
              </label>

              <input
                name="target_date"
                type="date"
                className={
                  inputClass
                }
              />
            </div>

            <div className="md:col-span-2">
              <label
                className={
                  labelClass
                }
              >
                Link
              </label>

              <input
                name="reference_url"
                type="url"
                placeholder="DOI, manuscript, patent, SharePoint or other URL"
                className={
                  inputClass
                }
              />
            </div>

            <div className="md:col-span-2 xl:col-span-4">
              <label
                className={
                  labelClass
                }
              >
                Notes
              </label>

              <textarea
                name="notes"
                rows={3}
                className={
                  inputClass
                }
              />
            </div>

            <div className="md:col-span-2 xl:col-span-4">
              <button
                type="submit"
                className="rounded-full bg-[#385E9D] px-5 py-2.5 text-xs font-semibold text-white"
              >
                + Add Output
              </button>
            </div>
          </form>
        </section>

        {/* ================================================= */}
        {/* OUTPUT PIPELINE */}
        {/* ================================================= */}

        <section className="mt-8 pb-12">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
            Output Pipeline
          </p>

          <h2 className="mt-1 text-2xl font-bold">
            Targets & Achievements
          </h2>

          {outputs.length ===
          0 ? (
            <div className="mt-5 border border-[#DDD6CF] bg-white px-6 py-10 text-sm text-[#837A72]">
              No research outputs
              have been added yet.
            </div>
          ) : (
            <div className="mt-5 space-y-4">
              {outputs.map(
                (
                  output
                ) => {
                  const normalizedStatus =
                    normalizeOutputStatus(
                      output.status
                    );

                  const target =
                    Number(
                      output.target_count ??
                      0
                    );

                  const achieved =
                    Number(
                      output.achieved_count ??
                      0
                    );

                  const project =
                    projects.find(
                      (
                        item
                      ) =>
                        item.id ===
                        output.workstream_id
                    );

                  const updateAction =
                    updateResearchOutput.bind(
                      null,
                      id,
                      output.id
                    );

                  const deleteAction =
                    deleteResearchOutput.bind(
                      null,
                      id,
                      output.id
                    );

                  return (
                    <article
                      key={
                        output.id
                      }
                      className="border border-[#DDD6CF] bg-white"
                    >
                      <div className="grid gap-5 p-6 md:grid-cols-[1.2fr_0.7fr_0.7fr] md:items-center">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-sm font-bold">
                              {output.title ||
                                output.output_type}
                            </p>

                            <span
                              className={`rounded-full px-2.5 py-1 text-[8px] font-bold ${statusClasses(
                                normalizedStatus
                              )}`}
                            >
                              {
                                normalizedStatus
                              }
                            </span>
                          </div>

                          <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-[#928980]">
                            {
                              output.output_type
                            }
                          </p>

                          {project && (
                            <p className="mt-2 text-[10px] font-semibold text-[#385E9D]">
                              Project:{" "}
                              {
                                project.title
                              }
                            </p>
                          )}
                        </div>

                        <div>
                          <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#928980]">
                            Achievement
                          </p>

                          <div className="mt-2 flex items-end gap-2">
                            <p className="text-2xl font-bold">
                              {
                                achieved
                              }
                            </p>

                            <p className="pb-1 text-xs text-[#928980]">
                              /{" "}
                              {
                                target
                              }{" "}
                              target
                            </p>
                          </div>

                          {target >
                            0 && (
                            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#EEEAE5]">
                              <div
                                className="h-full bg-[#385E9D]"
                                style={{
                                  width: `${Math.min(
                                    100,
                                    (
                                      achieved /
                                      target
                                    ) *
                                      100
                                  )}%`,
                                }}
                              />
                            </div>
                          )}
                        </div>

                        <div>
                          <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#928980]">
                            Target Date
                          </p>

                          <p className="mt-2 text-xs font-semibold">
                            {formatDate(
                              output.target_date
                            )}
                          </p>

                          {output.reference_url && (
                            <a
                              href={
                                output.reference_url
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="mt-3 inline-flex text-[10px] font-semibold text-[#385E9D]"
                            >
                              Open link ↗
                            </a>
                          )}
                        </div>
                      </div>

                      {/* EDIT OUTPUT */}

                      <details className="border-t border-[#E7E1DB]">
                        <summary className="cursor-pointer px-6 py-4 text-[10px] font-semibold text-[#385E9D]">
                          Edit output
                        </summary>

                        <form
                          action={
                            updateAction
                          }
                          className="grid gap-5 border-t border-[#EEE9E4] bg-[#FAF9F7] p-6 md:grid-cols-2 xl:grid-cols-4"
                        >
                          <div>
                            <label
                              className={
                                labelClass
                              }
                            >
                              Output Type
                            </label>

                            <select
                              name="output_type"
                              defaultValue={
                                output.output_type
                              }
                              className={
                                inputClass
                              }
                            >
                              <option>
                                Journal Paper
                              </option>

                              <option>
                                Conference Paper
                              </option>

                              <option>
                                Patent
                              </option>

                              <option>
                                Prototype
                              </option>

                              <option>
                                Technology Transfer
                              </option>

                              <option>
                                Thesis
                              </option>

                              <option>
                                Dataset
                              </option>

                              <option>
                                Software
                              </option>

                              <option>
                                Other
                              </option>
                            </select>
                          </div>

                          <div className="xl:col-span-2">
                            <label
                              className={
                                labelClass
                              }
                            >
                              Title
                            </label>

                            <input
                              name="title"
                              defaultValue={
                                output.title ??
                                ""
                              }
                              className={
                                inputClass
                              }
                            />
                          </div>

                          <div>
                            <label
                              className={
                                labelClass
                              }
                            >
                              Project
                            </label>

                            <select
                              name="workstream_id"
                              defaultValue={
                                output.workstream_id ??
                                ""
                              }
                              className={
                                inputClass
                              }
                            >
                              <option value="">
                                No project
                              </option>

                              {projects.map(
                                (
                                  item
                                ) => (
                                  <option
                                    key={
                                      item.id
                                    }
                                    value={
                                      item.id
                                    }
                                  >
                                    {
                                      item.title
                                    }
                                  </option>
                                )
                              )}
                            </select>
                          </div>

                          <div>
                            <label
                              className={
                                labelClass
                              }
                            >
                              Target
                            </label>

                            <input
                              name="target_count"
                              type="number"
                              min="0"
                              defaultValue={
                                target
                              }
                              className={
                                inputClass
                              }
                            />
                          </div>

                          <div>
                            <label
                              className={
                                labelClass
                              }
                            >
                              Achieved
                            </label>

                            <input
                              name="achieved_count"
                              type="number"
                              min="0"
                              defaultValue={
                                achieved
                              }
                              className={
                                inputClass
                              }
                            />
                          </div>

                          <div>
                            <label
                              className={
                                labelClass
                              }
                            >
                              Status
                            </label>

                            <select
                              name="status"
                              defaultValue={
                                normalizedStatus
                              }
                              className={
                                inputClass
                              }
                            >
                              <option>
                                Planned
                              </option>

                              <option>
                                In Progress
                              </option>

                              <option>
                                Submitted
                              </option>

                              <option>
                                Completed
                              </option>

                              <option>
                                On Hold
                              </option>
                            </select>
                          </div>

                          <div>
                            <label
                              className={
                                labelClass
                              }
                            >
                              Target Date
                            </label>

                            <input
                              name="target_date"
                              type="date"
                              defaultValue={
                                output.target_date ??
                                ""
                              }
                              className={
                                inputClass
                              }
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label
                              className={
                                labelClass
                              }
                            >
                              Link
                            </label>

                            <input
                              name="reference_url"
                              type="url"
                              defaultValue={
                                output.reference_url ??
                                ""
                              }
                              className={
                                inputClass
                              }
                            />
                          </div>

                          <div className="md:col-span-2 xl:col-span-4">
                            <label
                              className={
                                labelClass
                              }
                            >
                              Notes
                            </label>

                            <textarea
                              name="notes"
                              rows={3}
                              defaultValue={
                                output.notes ??
                                ""
                              }
                              className={
                                inputClass
                              }
                            />
                          </div>

                          <div className="md:col-span-2 xl:col-span-4">
                            <button
                              type="submit"
                              className="rounded-full bg-[#385E9D] px-5 py-2.5 text-[10px] font-semibold text-white"
                            >
                              Save Changes
                            </button>
                          </div>
                        </form>

                        <div className="border-t border-[#EEE9E4] bg-[#FAF9F7] px-6 py-4">
                          <form
                            action={
                              deleteAction
                            }
                          >
                            <button
                              type="submit"
                              className="text-[10px] font-semibold text-[#A23B35]"
                            >
                              Delete Output
                            </button>
                          </form>
                        </div>
                      </details>
                    </article>
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