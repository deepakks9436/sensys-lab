import Link from "next/link";
import {
  notFound,
  redirect,
} from "next/navigation";

import { createClient } from "../../../../../lib/supabase/server";
import { updateStudent } from "../../actions";

export default async function EditStudentPage({
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
  const { id } = await params;
  const query = await searchParams;

  const supabase =
    await createClient();

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
    redirect(
      `/hub/students/${id}`
    );
  }

  const { data: student } =
    await supabase
      .from("students")
      .select("*")
      .eq("id", id)
      .single();

  if (!student) {
    notFound();
  }

  const action =
    updateStudent.bind(null, id);

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
          href={`/hub/students/${id}`}
          className="text-xs font-semibold text-[#385E9D]"
        >
          ← {student.full_name}
        </Link>

        {/* ================================================ */}
        {/* HEADER */}
        {/* ================================================ */}

        <div className="mt-7">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
            Research Management
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-[-0.035em] md:text-5xl">
            Edit Student.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#706963]">
            Update programme information,
            research context, supervision,
            expected progress and current
            research priorities.
          </p>
        </div>

        {/* ================================================ */}
        {/* FORM */}
        {/* ================================================ */}

        <form
          action={action}
          className="mt-10 border border-[#DDD6CF] bg-white"
        >
          {query.error && (
            <div className="border-b border-[#E7E1DB] bg-[#FBE7E5] px-6 py-4 text-xs text-[#A23B35]">
              {query.error}
            </div>
          )}

          {/* ============================================== */}
          {/* RESEARCHER INFORMATION */}
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
                defaultValue={
                  student.full_name
                }
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
                defaultValue={
                  student.programme
                }
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
                defaultValue={
                  student.intake ?? ""
                }
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
                defaultValue={
                  student.research_area ??
                  ""
                }
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
                defaultValue={
                  student.project_title ??
                  ""
                }
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
                defaultValue={
                  student.start_date ??
                  ""
                }
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
                defaultValue={
                  student.expected_completion_date ??
                  ""
                }
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
                defaultValue={
                  student.supervisor ??
                  ""
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Co-Supervisor
              </label>

              <input
                name="co_supervisor"
                defaultValue={
                  student.co_supervisor ??
                  ""
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Research Manager / Lead
              </label>

              <input
                name="project_lead"
                defaultValue={
                  student.project_lead ??
                  ""
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Current Stage
              </label>

              <input
                name="current_stage"
                defaultValue={
                  student.current_stage ??
                  ""
                }
                placeholder="Literature Review"
                className={inputClass}
              />
            </div>
          </div>

          {/* ============================================== */}
          {/* PROGRESS */}
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
                defaultValue={
                  student.expected_progress ??
                  0
                }
                className={inputClass}
              />

              <p className="mt-2 text-[10px] leading-5 text-[#928980]">
                This represents where the
                researcher should currently be
                according to the planned programme.
              </p>
            </div>

            <div>
              <p className={labelClass}>
                Actual Progress
              </p>

              <div className="mt-2 border border-[#D8D0C7] bg-[#F7F5F2] px-4 py-3">
                <p className="text-lg font-bold text-[#385E9D]">
                  {Number(
                    student.overall_progress ??
                      0
                  )}
                  %
                </p>

                <p className="mt-1 text-[10px] leading-5 text-[#928980]">
                  Calculated automatically from
                  milestone weights and milestone
                  completion.
                </p>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>
                Current Priority
              </label>

              <textarea
                name="current_priority"
                rows={4}
                defaultValue={
                  student.current_priority ??
                  ""
                }
                placeholder="Immediate research priority..."
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
              defaultValue={
                student.notes ?? ""
              }
              className={inputClass}
            />
          </div>

          {/* ============================================== */}
          {/* AUTOMATIC MILESTONE INFO */}
          {/* ============================================== */}

          <div className="mx-6 mb-6 border-l-[3px] border-[#385E9D] bg-[#F1F5FA] px-5 py-4">
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#385E9D]">
              Automatic Next Milestone
            </p>

            <p className="mt-2 text-xs leading-6 text-[#645D57]">
              The next major milestone is now
              calculated automatically from the
              student's unfinished milestone plan.
              Change milestone titles, dates and
              order from the milestone editor
              rather than maintaining a separate
              next-milestone field here.
            </p>
          </div>

          {/* ============================================== */}
          {/* ACTIONS */}
          {/* ============================================== */}

          <div className="flex flex-wrap justify-end gap-3 border-t border-[#E7E1DB] bg-[#FAF9F7] px-6 py-5">
            <Link
              href={`/hub/students/${id}`}
              className="rounded-full border border-[#D8D0C7] bg-white px-5 py-3 text-xs font-semibold transition hover:border-[#385E9D]"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-full bg-[#385E9D] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#27456F]"
            >
              Save Changes →
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}