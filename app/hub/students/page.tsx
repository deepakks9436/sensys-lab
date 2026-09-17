import Link from "next/link";

import { createClient } from "../../../lib/supabase/server";

function attentionClasses(
  status: string
) {
  if (status === "Needs Attention") {
    return "bg-[#FBE7E5] text-[#A23B35]";
  }

  if (status === "Needs Update") {
    return "bg-[#FFF4D9] text-[#8A6200]";
  }

  if (status === "Blocker") {
    return "bg-[#FFF0E3] text-[#A15B16]";
  }

  return "bg-[#E8F4EC] text-[#2D6A45]";
}

function formatRelativeDate(
  value: string | null
) {
  if (!value) {
    return "No check-in";
  }

  const today =
    new Date();

  const date =
    new Date(
      `${value}T00:00:00`
    );

  const days =
    Math.floor(
      (today.getTime() -
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

export default async function StudentsPage() {
  const supabase =
    await createClient();

  const {
    data: { user },
  } =
    await supabase.auth.getUser();

  const {
    data: profile,
  } =
    user
      ? await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single()
      : { data: null };

  const canManage =
    !!profile &&
    [
      "admin",
      "research_manager",
    ].includes(
      profile.role
    );

  const {
    data: students,
    error,
  } =
    await supabase
      .from("students")
      .select(
        `
        id,
        full_name,
        programme,
        research_area,
        intake,
        status
        `
      )
      .order("full_name", {
        ascending: true,
      });

  const studentIds =
    (students ?? []).map(
      (student) =>
        student.id
    );

  let projects: any[] = [];
  let milestones: any[] = [];
  let updates: any[] = [];

  if (
    studentIds.length >
    0
  ) {
    const [
      projectResult,
      milestoneResult,
      updateResult,
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
            status
            `
          )
          .in(
            "student_id",
            studentIds
          ),

        supabase
          .from(
            "student_milestones"
          )
          .select(
            `
            id,
            student_id,
            title,
            status,
            planned_end
            `
          )
          .in(
            "student_id",
            studentIds
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
          .in(
            "student_id",
            studentIds
          )
          .order(
            "week_start",
            {
              ascending:
                false,
            }
          ),
      ]);

    projects =
      projectResult.data ??
      [];

    milestones =
      milestoneResult.data ??
      [];

    updates =
      updateResult.data ??
      [];
  }

  const today =
    new Date()
      .toISOString()
      .slice(0, 10);

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#385E9D]">
              People · Research
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-[-0.035em] md:text-5xl">
              Graduate Researchers.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#706963]">
              Objective research status
              based on active projects,
              milestones, recent check-ins
              and items requiring attention.
            </p>
          </div>

          {canManage && (
            <Link
              href="/hub/students/new"
              className="w-fit rounded-full bg-[#385E9D] px-5 py-3 text-xs font-semibold text-white"
            >
              + Add Researcher
            </Link>
          )}
        </div>

        {error && (
          <div className="mt-8 border-l-[3px] border-[#A23B35] bg-[#FBE7E5] px-5 py-4 text-sm text-[#A23B35]">
            Unable to load
            researchers:{" "}
            {error.message}
          </div>
        )}

        {!error &&
          (!students ||
            students.length ===
              0) && (
            <section className="mt-10 border border-dashed border-[#CFC5BC] bg-white px-6 py-14 text-center">
              <h2 className="text-2xl font-bold">
                No researcher records
                yet.
              </h2>

              {canManage && (
                <Link
                  href="/hub/students/new"
                  className="mt-6 inline-flex rounded-full bg-[#385E9D] px-5 py-3 text-xs font-semibold text-white"
                >
                  Add first researcher
                  →
                </Link>
              )}
            </section>
          )}

        {students &&
          students.length >
            0 && (
            <div className="mt-10 overflow-hidden border border-[#DDD6CF] bg-white">
              <div className="hidden grid-cols-[1.2fr_0.45fr_0.8fr_0.55fr_0.85fr_1.05fr_0.75fr_0.65fr] border-b border-[#DDD6CF] bg-[#F5F3EF] px-6 py-4 text-[8px] font-bold uppercase tracking-[0.15em] text-[#837A72] lg:grid">
                <span>
                  Researcher
                </span>

                <span>
                  Program
                </span>

                <span>
                  Research Area
                </span>

                <span>
                  Projects
                </span>

                <span>
                  Milestones
                </span>

                <span>
                  Next Milestone
                </span>

                <span>
                  Check-in
                </span>

                <span>
                  Attention
                </span>
              </div>

              <div className="divide-y divide-[#EEE9E4]">
                {students.map(
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

                    const activeProjects =
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
                      );

                    const studentMilestones =
                      milestones.filter(
                        (
                          milestone
                        ) =>
                          milestone.student_id ===
                          student.id
                      );

                    const completedMilestones =
                      studentMilestones.filter(
                        (
                          milestone
                        ) =>
                          milestone.status ===
                          "Completed"
                      ).length;

                    const activeMilestones =
                      studentMilestones.filter(
                        (
                          milestone
                        ) =>
                          [
                            "In Progress",
                            "Delayed",
                            "On Track",
                            "At Risk",
                          ].includes(
                            milestone.status
                          )
                      ).length;

                    const overdueMilestones =
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
                            milestone.status
                          )
                      );

                    const nextMilestone =
                      studentMilestones
                        .filter(
                          (
                            milestone
                          ) =>
                            milestone.status !==
                              "Completed" &&
                            milestone.status !==
                              "On Hold"
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

                    const latestUpdate =
                      updates.find(
                        (
                          update
                        ) =>
                          update.student_id ===
                          student.id
                      ) ??
                      null;

                    const updateAge =
                      latestUpdate
                        ? Math.floor(
                            (new Date().getTime() -
                              new Date(
                                `${latestUpdate.week_start}T00:00:00`
                              ).getTime()) /
                              86400000
                          )
                        : null;

                    let attention =
                      "On Track";

                    if (
                      overdueMilestones.length >
                      0
                    ) {
                      attention =
                        "Needs Attention";
                    } else if (
                      latestUpdate
                        ?.blockers
                        ?.trim()
                    ) {
                      attention =
                        "Blocker";
                    } else if (
                      updateAge ===
                        null ||
                      updateAge >
                        14
                    ) {
                      attention =
                        "Needs Update";
                    }

                    return (
                      <Link
                        key={
                          student.id
                        }
                        href={`/hub/students/${student.id}`}
                        className="grid gap-4 px-6 py-5 transition hover:bg-[#FBFAF8] lg:grid-cols-[1.2fr_0.45fr_0.8fr_0.55fr_0.85fr_1.05fr_0.75fr_0.65fr] lg:items-center"
                      >
                        <div>
                          <p className="text-sm font-semibold">
                            {
                              student.full_name
                            }
                          </p>

                          <p className="mt-1 text-[10px] text-[#928980]">
                            {student.intake ||
                              "Intake not set"}
                          </p>
                        </div>

                        <p className="text-xs font-semibold">
                          {
                            student.programme
                          }
                        </p>

                        <p className="text-xs text-[#706963]">
                          {student.research_area ||
                            "—"}
                        </p>

                        <div>
                          <p className="text-sm font-bold">
                            {
                              activeProjects.length
                            }
                          </p>

                          <p className="mt-1 text-[9px] text-[#928980]">
                            active
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold">
                            {
                              completedMilestones
                            }{" "}
                            done
                          </p>

                          <p className="mt-1 text-[9px] text-[#928980]">
                            {
                              activeMilestones
                            }{" "}
                            active
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold">
                            {nextMilestone?.title ||
                              "—"}
                          </p>

                          <p className="mt-1 text-[9px] text-[#928980]">
                            {nextMilestone?.planned_end ||
                              ""}
                          </p>
                        </div>

                        <p className="text-[10px] text-[#706963]">
                          {formatRelativeDate(
                            latestUpdate?.week_start ??
                              null
                          )}
                        </p>

                        <span
                          className={`w-fit rounded-full px-3 py-1 text-[8px] font-bold ${attentionClasses(
                            attention
                          )}`}
                        >
                          {
                            attention
                          }
                        </span>
                      </Link>
                    );
                  }
                )}
              </div>
            </div>
          )}
      </div>
    </main>
  );
}