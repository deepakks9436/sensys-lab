import Link from "next/link";

import {
  redirect,
} from "next/navigation";

import {
  createClient,
} from "../../../lib/supabase/server";

import {
  getHubUser,
} from "../../../lib/hub/auth";

export default async function ResearchPortfolioPage() {
  const context =
    await getHubUser();

  if (
    ![
      "admin",
      "research_manager",
    ].includes(
      context.profile.role
    )
  ) {
    redirect("/hub");
  }

  const supabase =
    await createClient();

  const [
    projectsResult,
    milestonesResult,
    outputsResult,
  ] =
    await Promise.all([
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
          planned_end,
          students (
            id,
            full_name,
            programme,
            research_area
          )
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
    ]);

  const projects =
    projectsResult.data ??
    [];

  const milestones =
    milestonesResult.data ??
    [];

  const outputs =
    outputsResult.data ??
    [];

  const today =
    new Date()
      .toISOString()
      .slice(0, 10);

  const activeProjects =
    projects.filter(
      (project) =>
        ![
          "Completed",
          "On Hold",
        ].includes(
          project.status
        )
    );

  const completedProjects =
    projects.filter(
      (project) =>
        project.status ===
        "Completed"
    );

  const delayedMilestones =
    milestones.filter(
      (milestone) =>
        milestone.planned_end &&
        milestone.planned_end <
          today &&
        ![
          "Completed",
          "On Hold",
        ].includes(
          milestone.status
        )
    );

  const milestoneStatusCounts =
    [
      "Planned",
      "In Progress",
      "Delayed",
      "Completed",
      "On Hold",
    ].map(
      (status) => ({
        status,
        count:
          milestones.filter(
            (milestone) =>
              milestone.status ===
              status
          ).length,
      })
    );

  const maxMilestoneCount =
    Math.max(
      1,
      ...milestoneStatusCounts.map(
        (item) =>
          item.count
      )
    );

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[1320px]">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#385E9D]">
            Lab Research Portfolio
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em] md:text-5xl">
            Research.
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#706963]">
            A lab-wide view of active
            projects, milestone status and
            research outputs across SenSys.
          </p>
        </div>

        <section className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="border border-[#DDD6CF] bg-white p-6">
            <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#385E9D]">
              Active Projects
            </p>

            <p className="mt-3 text-4xl font-bold">
              {
                activeProjects.length
              }
            </p>
          </div>

          <div className="border border-[#DDD6CF] bg-white p-6">
            <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#2D6A45]">
              Completed Projects
            </p>

            <p className="mt-3 text-4xl font-bold">
              {
                completedProjects.length
              }
            </p>
          </div>

          <div className="border border-[#DDD6CF] bg-white p-6">
            <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#A23B35]">
              Overdue Milestones
            </p>

            <p className="mt-3 text-4xl font-bold">
              {
                delayedMilestones.length
              }
            </p>
          </div>

          <div className="border border-[#DDD6CF] bg-white p-6">
            <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#A15B16]">
              Research Outputs
            </p>

            <p className="mt-3 text-4xl font-bold">
              {
                outputs.length
              }
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-8 xl:grid-cols-[0.75fr_1.25fr]">
          <section className="border border-[#DDD6CF] bg-white p-6">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#385E9D]">
              Milestone Status
            </p>

            <div className="mt-6 space-y-5">
              {milestoneStatusCounts.map(
                (item) => (
                  <div
                    key={
                      item.status
                    }
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span>
                        {
                          item.status
                        }
                      </span>

                      <span className="font-bold">
                        {
                          item.count
                        }
                      </span>
                    </div>

                    <div className="mt-2 h-2 overflow-hidden bg-[#EEE9E4]">
                      <div
                        className="h-full bg-[#385E9D]"
                        style={{
                          width: `${Math.max(
                            4,
                            (item.count /
                              maxMilestoneCount) *
                              100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </section>

          <section className="border border-[#DDD6CF] bg-white">
            <div className="border-b border-[#E7E1DB] px-6 py-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#385E9D]">
                Active Portfolio
              </p>

              <h2 className="mt-1 text-xl font-bold">
                Current Projects
              </h2>
            </div>

            <div className="divide-y divide-[#EEE9E4]">
              {activeProjects.map(
                (project) => {
                  const student =
                    Array.isArray(
                      project.students
                    )
                      ? project.students[0]
                      : project.students;

                  const projectMilestones =
                    milestones.filter(
                      (milestone) =>
                        milestone.workstream_id ===
                        project.id
                    );

                  const completed =
                    projectMilestones.filter(
                      (milestone) =>
                        milestone.status ===
                        "Completed"
                    ).length;

                  const projectOutputs =
                    outputs.filter(
                      (output) =>
                        output.workstream_id ===
                        project.id
                    ).length;

                  return (
                    <Link
                      key={
                        project.id
                      }
                      href={`/hub/students/${project.student_id}`}
                      className="grid gap-4 px-6 py-5 transition hover:bg-[#FAF9F7] md:grid-cols-[1.4fr_0.8fr_0.65fr]"
                    >
                      <div>
                        <p className="text-sm font-semibold">
                          {
                            project.title
                          }
                        </p>

                        <p className="mt-1 text-[10px] text-[#928980]">
                          {student?.full_name ||
                            "Researcher"}
                        </p>

                        {project.current_focus && (
                          <p className="mt-2 text-[10px] leading-5 text-[#706963]">
                            {
                              project.current_focus
                            }
                          </p>
                        )}
                      </div>

                      <div>
                        <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#928980]">
                          Milestones
                        </p>

                        <p className="mt-2 text-xs">
                          {
                            completed
                          }{" "}
                          completed ·{" "}
                          {
                            projectMilestones.length -
                            completed
                          }{" "}
                          remaining
                        </p>
                      </div>

                      <div>
                        <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#928980]">
                          Outputs
                        </p>

                        <p className="mt-2 text-xl font-bold">
                          {
                            projectOutputs
                          }
                        </p>
                      </div>
                    </Link>
                  );
                }
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}