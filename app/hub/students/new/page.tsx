import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "../../../../lib/supabase/server";
import { addStudent } from "../actions";

export default async function NewStudentPage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
  }>;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } =
    await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

  if (
    !profile ||
    !["admin", "manager"].includes(
      profile.role
    )
  ) {
    redirect("/hub/students");
  }

  const query = await searchParams;

  const inputClass =
    "mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#385E9D]";

  const labelClass =
    "text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]";

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[1000px]">
        {/* ================================================ */}
        {/* BACK */}
        {/* ================================================ */}

        <Link
          href="/hub/students"
          className="text-xs font-semibold text-[#385E9D]"
        >
          ← Graduate Researchers
        </Link>

        {/* ================================================ */}
        {/* PAGE HEADER */}
        {/* ================================================ */}

        <div className="mt-7">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
            Research Management
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-[-0.035em] md:text-5xl">
            Add Student.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#706963]">
            Create a graduate researcher profile.
            Milestones, progress and weekly
            follow-up can be added after the
            researcher is created.
          </p>
        </div>

        {/* ================================================ */}
        {/* FORM */}
        {/* ================================================ */}

        <form
          action={addStudent}
          className="mt-10 border border-[#DDD6CF] bg-white"
        >
          {query.error && (
            <div className="border-b border-[#E7E1DB] bg-[#FBE7E5] px-6 py-4 text-xs text-[#A23B35]">
              {query.error}
            </div>
          )}

          {/* ============================================== */}
          {/* BASIC INFORMATION */}
          {/* ============================================== */}

          <div className="border-b border-[#E7E1DB] px-6 py-5">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#385E9D]">
              Researcher Information
            </p>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-2">
            <div>
              <label className={labelClass}>
                Full Name *
              </label>

              <input
                name="full_name"
                required
                placeholder="Researcher name"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Programme *
              </label>

              <select
                name="programme"
                required
                defaultValue="PhD"
                className={inputClass}
              >
                <option value="PhD">
                  PhD
                </option>

                <option value="MSc">
                  MSc
                </option>

                <option value="Postdoc">
                  Postdoc
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>

            <div>
              <label className={labelClass}>
                Intake
              </label>

              <input
                name="intake"
                placeholder="January 2027"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Research Area
              </label>

              <input
                name="research_area"
                placeholder="Intelligent Diagnostics"
                className={inputClass}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>
                Project / Research Title
              </label>

              <input
                name="project_title"
                placeholder="Working research title"
                className={inputClass}
              />
            </div>
          </div>

          {/* ============================================== */}
          {/* TIMELINE */}
          {/* ============================================== */}

          <div className="border-y border-[#E7E1DB] bg-[#FAF9F7] px-6 py-5">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#385E9D]">
              Programme Timeline
            </p>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-2">
            <div>
              <label className={labelClass}>
                Start Date
              </label>

              <input
                name="start_date"
                type="date"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Expected Completion
              </label>

              <input
                name="expected_completion_date"
                type="date"
                className={inputClass}
              />
            </div>
          </div>

          {/* ============================================== */}
          {/* SUPERVISION */}
          {/* ============================================== */}

          <div className="border-y border-[#E7E1DB] bg-[#FAF9F7] px-6 py-5">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#385E9D]">
              Supervision & Research Management
            </p>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-2">
            <div>
              <label className={labelClass}>
                Supervisor
              </label>

              <input
                name="supervisor"
                placeholder="Primary supervisor"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Co-Supervisor
              </label>

              <input
                name="co_supervisor"
                placeholder="Co-supervisor"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Research Manager / Lead
              </label>

              <input
                name="project_lead"
                placeholder="Internal research lead"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Current Stage
              </label>

              <input
                name="current_stage"
                placeholder="Literature Review"
                className={inputClass}
              />
            </div>
          </div>

          {/* ============================================== */}
          {/* PROGRESS PLANNING */}
          {/* ============================================== */}

          <div className="border-y border-[#E7E1DB] bg-[#FAF9F7] px-6 py-5">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#385E9D]">
              Progress Planning
            </p>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-2">
            <div>
              <label className={labelClass}>
                Expected Progress %
              </label>

              <input
                name="expected_progress"
                type="number"
                min="0"
                max="100"
                step="any"
                defaultValue="0"
                className={inputClass}
              />

              <p className="mt-2 text-[10px] leading-5 text-[#928980]">
                Planned programme progress at the
                current point in time. Actual
                progress is calculated automatically
                from milestone weights and completion.
              </p>
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>
                Current Priority
              </label>

              <textarea
                name="current_priority"
                rows={4}
                placeholder="Immediate research priority, key experiment, literature task or development objective..."
                className={inputClass}
              />
            </div>
          </div>

          {/* ============================================== */}
          {/* NOTES */}
          {/* ============================================== */}

          <div className="border-y border-[#E7E1DB] bg-[#FAF9F7] px-6 py-5">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#385E9D]">
              Internal Notes
            </p>
          </div>

          <div className="p-6">
            <label className={labelClass}>
              Notes
            </label>

            <textarea
              name="notes"
              rows={5}
              placeholder="Internal research-management notes..."
              className={inputClass}
            />
          </div>

          {/* ============================================== */}
          {/* INFO */}
          {/* ============================================== */}

          <div className="mx-6 mb-6 border-l-[3px] border-[#385E9D] bg-[#F1F5FA] px-5 py-4">
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#385E9D]">
              Milestone Management
            </p>

            <p className="mt-2 text-xs leading-6 text-[#645D57]">
              The next major milestone is determined
              automatically from the research plan.
              You no longer need to enter a separate
              next-milestone name or date here.
            </p>
          </div>

          {/* ============================================== */}
          {/* ACTIONS */}
          {/* ============================================== */}

          <div className="flex flex-wrap justify-end gap-3 border-t border-[#E7E1DB] bg-[#FAF9F7] px-6 py-5">
            <Link
              href="/hub/students"
              className="rounded-full border border-[#D8D0C7] bg-white px-5 py-3 text-xs font-semibold transition hover:border-[#385E9D]"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-full bg-[#385E9D] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#27456F]"
            >
              Create Student →
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}