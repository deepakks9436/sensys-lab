import Link from "next/link";

import {
  notFound,
  redirect,
} from "next/navigation";

import {
  createClient,
} from "../../../../../../lib/supabase/server";

import {
  addWeeklyUpdate,
} from "../../../actions";

export default async function NewWeeklyUpdatePage({
  params,
  searchParams,
}: {
  params: Promise<{
    id: string;
  }>;

  searchParams: Promise<{
    error?: string;
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
    redirect("/login");
  }

  /* ========================================================
     USER
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
      .maybeSingle();

  if (
    !profile ||
    !profile.is_active
  ) {
    redirect("/hub");
  }

  /* ========================================================
     STUDENT
  ======================================================== */

  const {
    data: student,
  } =
    await supabase
      .from("students")
      .select(
        `
        id,
        user_id,
        full_name,
        programme
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

  const canManage =
    [
      "admin",
      "research_manager",
    ].includes(
      profile.role
    );

  const isOwner =
    profile.role ===
      "student" &&
    student.user_id ===
      user.id;

  /*
   * A research manager can enter a
   * check-in on behalf of a student.
   *
   * A student can enter only their
   * own check-in.
   */
  if (
    !canManage &&
    !isOwner
  ) {
    redirect(
      `/hub/students/${id}`
    );
  }

  /* ========================================================
     ACTIVE PROJECTS

     Used only for visual context.
     No schema change is required.
  ======================================================== */

  const {
    data: projects,
  } =
    await supabase
      .from(
        "research_workstreams"
      )
      .select(
        `
        id,
        title,
        status,
        current_focus
        `
      )
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
      );

  const activeProjects =
    (
      projects ??
      []
    ).filter(
      (
        project
      ) =>
        [
          "In Progress",
          "On Track",
          "Delayed",
          "At Risk",
        ].includes(
          project.status
        )
    );

  /* ========================================================
     DEFAULT WEEK DATE

     Monday of current week
  ======================================================== */

  const now =
    new Date();

  const day =
    now.getDay();

  const difference =
    day === 0
      ? -6
      : 1 - day;

  const monday =
    new Date(now);

  monday.setDate(
    now.getDate() +
      difference
  );

  const defaultWeek =
    monday
      .toISOString()
      .slice(
        0,
        10
      );

  const action =
    addWeeklyUpdate.bind(
      null,
      id
    );

  const inputClass =
    "mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#385E9D]";

  const labelClass =
    "text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]";

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[920px]">
        <Link
          href={`/hub/students/${id}`}
          className="text-xs font-semibold text-[#385E9D]"
        >
          ← {student.full_name}
        </Link>

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="mt-7">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
            Research Follow-up
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-[-0.035em]">
            Research Check-in.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#706963]">
            Record what changed since
            the previous check-in,
            what you are working on
            now, and anything that
            requires discussion or
            support.
          </p>
        </div>

        {/* ================================================= */}
        {/* ACTIVE PROJECT CONTEXT */}
        {/* ================================================= */}

        {activeProjects.length >
          0 && (
          <section className="mt-7 border border-[#DDD6CF] bg-white">
            <div className="border-b border-[#E7E1DB] px-5 py-4">
              <p className="text-[8px] font-bold uppercase tracking-[0.17em] text-[#928980]">
                Currently Active
              </p>
            </div>

            <div className="grid gap-px bg-[#EEE9E4] md:grid-cols-2">
              {activeProjects.map(
                (
                  project
                ) => (
                  <div
                    key={
                      project.id
                    }
                    className="bg-white p-5"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          [
                            "Delayed",
                            "At Risk",
                          ].includes(
                            project.status
                          )
                            ? "bg-[#A23B35]"
                            : "bg-[#385E9D]"
                        }`}
                      />

                      <p className="text-xs font-bold">
                        {
                          project.title
                        }
                      </p>
                    </div>

                    {project.current_focus && (
                      <p className="mt-2 pl-[18px] text-[10px] leading-5 text-[#837A72]">
                        {
                          project.current_focus
                        }
                      </p>
                    )}
                  </div>
                )
              )}
            </div>
          </section>
        )}

        {/* ================================================= */}
        {/* FORM */}
        {/* ================================================= */}

        <form
          action={action}
          className="mt-6 border border-[#DDD6CF] bg-white"
        >
          {query.error && (
            <div className="border-b border-[#E7E1DB] bg-[#FBE7E5] px-6 py-4 text-xs text-[#A23B35]">
              {query.error}
            </div>
          )}

          {/* DATE */}

          <div className="border-b border-[#E7E1DB] px-6 py-5">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#385E9D]">
              Check-in Period
            </p>
          </div>

          <div className="p-6">
            <div className="max-w-[320px]">
              <label
                className={
                  labelClass
                }
              >
                Week Starting *
              </label>

              <input
                name="week_start"
                type="date"
                required
                defaultValue={
                  defaultWeek
                }
                className={
                  inputClass
                }
              />
            </div>
          </div>

          {/* PROGRESS */}

          <div className="border-y border-[#E7E1DB] bg-[#FAF9F7] px-6 py-5">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#385E9D]">
              Research Progress
            </p>
          </div>

          <div className="grid gap-6 p-6">
            <div>
              <label
                className={
                  labelClass
                }
              >
                What did you complete?
              </label>

              <textarea
                name="completed_this_week"
                rows={4}
                placeholder="Key experiments, analysis, fabrication, writing, validation or other work completed..."
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
                What are you working on now?
              </label>

              <textarea
                name="progress_note"
                rows={3}
                placeholder="Current experiments, manuscript work, analysis or project activity..."
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
                What will you do next?
              </label>

              <textarea
                name="planned_next_week"
                rows={4}
                placeholder="Important objectives before the next check-in..."
                className={
                  inputClass
                }
              />
            </div>
          </div>

          {/* SUPPORT */}

          <div className="border-y border-[#E7E1DB] bg-[#FAF9F7] px-6 py-5">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#385E9D]">
              Blockers & Support
            </p>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-2">
            <div>
              <label
                className={
                  labelClass
                }
              >
                Blockers
              </label>

              <textarea
                name="blockers"
                rows={4}
                placeholder="What is slowing or preventing progress?"
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
                Support Needed
              </label>

              <textarea
                name="support_needed"
                rows={4}
                placeholder="Decision, equipment, material, technical input or supervisor support required..."
                className={
                  inputClass
                }
              />
            </div>

            {/*
              Existing database field retained.
              We keep the UI simple.
            */}

            <input
              type="hidden"
              name="confidence"
              value=""
            />
          </div>

          {/* ACTIONS */}

          <div className="flex flex-wrap justify-end gap-3 border-t border-[#E7E1DB] bg-[#FAF9F7] px-6 py-5">
            <Link
              href={`/hub/students/${id}`}
              className="rounded-full border border-[#D8D0C7] bg-white px-5 py-3 text-xs font-semibold"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-full bg-[#385E9D] px-6 py-3 text-xs font-semibold text-white"
            >
              Submit Check-in →
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}