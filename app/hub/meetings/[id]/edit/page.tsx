import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { createClient } from "../../../../../lib/supabase/server";
import { updateMeeting } from "../../actions";

export default async function EditMeetingPage({
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
      .select("role, is_active")
      .eq("id", user.id)
      .single();

  if (
    !profile ||
    !profile.is_active ||
    ![
      "admin",
      "research_manager",
    ].includes(profile.role)
  ) {
    redirect(
      `/hub/meetings/${id}`
    );
  }

  const { data: meeting } =
    await supabase
      .from("meetings")
      .select("*")
      .eq("id", id)
      .maybeSingle();

  if (!meeting) {
    notFound();
  }

  const {
    data: students,
  } =
    await supabase
      .from("students")
      .select(
        "id, full_name, programme"
      )
      .order("full_name");

  const {
    data: linkedStudents,
  } =
    await supabase
      .from("meeting_students")
      .select("student_id")
      .eq("meeting_id", id);

  const selectedStudentIds =
    new Set(
      (linkedStudents ?? []).map(
        (link) => link.student_id
      )
    );

  const action =
    updateMeeting.bind(
      null,
      id
    );

  const inputClass =
    "mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#385E9D]";

  const labelClass =
    "text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]";

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[1000px]">
        <Link
          href={`/hub/meetings/${id}`}
          className="text-xs font-semibold text-[#385E9D]"
        >
          ← {meeting.title}
        </Link>

        <div className="mt-7">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
            Research Coordination
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-[-0.04em]">
            Edit Meeting.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#706963]">
            Update the meeting details,
            linked researchers, agenda,
            minutes, decisions and
            publication status.
          </p>
        </div>

        <form
          action={action}
          className="mt-10 border border-[#DDD6CF] bg-white"
        >
          {query.error && (
            <div className="border-b border-[#E7E1DB] bg-[#FBE7E5] px-6 py-4 text-xs text-[#A23B35]">
              {query.error}
            </div>
          )}

          <div className="grid gap-6 p-6 md:grid-cols-2">
            {/* TITLE */}

            <div className="md:col-span-2">
              <label className={labelClass}>
                Meeting Title *
              </label>

              <input
                name="title"
                required
                defaultValue={
                  meeting.title
                }
                className={inputClass}
              />
            </div>

            {/* TYPE */}

            <div>
              <label className={labelClass}>
                Meeting Type
              </label>

              <select
                name="meeting_type"
                defaultValue={
                  meeting.meeting_type
                }
                className={inputClass}
              >
                <option>
                  Weekly Meeting
                </option>

                <option>
                  Student Review
                </option>

                <option>
                  Project Review
                </option>

                <option>
                  Lab Meeting
                </option>

                <option>
                  Supervisor Meeting
                </option>

                <option>
                  Other
                </option>
              </select>
            </div>

            {/* DATE */}

            <div>
              <label className={labelClass}>
                Date *
              </label>

              <input
                name="meeting_date"
                type="date"
                required
                defaultValue={
                  meeting.meeting_date
                }
                className={inputClass}
              />
            </div>

            {/* START */}

            <div>
              <label className={labelClass}>
                Start Time
              </label>

              <input
                name="start_time"
                type="time"
                defaultValue={
                  meeting.start_time
                    ? String(
                        meeting.start_time
                      ).slice(0, 5)
                    : ""
                }
                className={inputClass}
              />
            </div>

            {/* END */}

            <div>
              <label className={labelClass}>
                End Time
              </label>

              <input
                name="end_time"
                type="time"
                defaultValue={
                  meeting.end_time
                    ? String(
                        meeting.end_time
                      ).slice(0, 5)
                    : ""
                }
                className={inputClass}
              />
            </div>

            {/* LOCATION */}

            <div className="md:col-span-2">
              <label className={labelClass}>
                Location / Meeting Link
              </label>

              <input
                name="location"
                defaultValue={
                  meeting.location ?? ""
                }
                className={inputClass}
              />
            </div>

            {/* LINKED RESEARCHERS */}

            <div className="md:col-span-2">
              <label className={labelClass}>
                Linked Researchers
              </label>

              <div className="mt-3 grid gap-2 border border-[#DDD6CF] p-4 sm:grid-cols-2">
                {(students ?? []).map(
                  (student) => (
                    <label
                      key={student.id}
                      className="flex items-center gap-3 text-xs"
                    >
                      <input
                        type="checkbox"
                        name="student_ids"
                        value={student.id}
                        defaultChecked={
                          selectedStudentIds.has(
                            student.id
                          )
                        }
                      />

                      <span>
                        {
                          student.full_name
                        }{" "}
                        <span className="text-[#928980]">
                          (
                          {
                            student.programme
                          }
                          )
                        </span>
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* AGENDA */}

            <div className="md:col-span-2">
              <label className={labelClass}>
                Agenda
              </label>

              <textarea
                name="agenda"
                rows={5}
                defaultValue={
                  meeting.agenda ?? ""
                }
                className={inputClass}
              />
            </div>

            {/* MINUTES */}

            <div className="md:col-span-2">
              <label className={labelClass}>
                Minutes
              </label>

              <textarea
                name="minutes"
                rows={7}
                defaultValue={
                  meeting.minutes ?? ""
                }
                className={inputClass}
              />
            </div>

            {/* DECISIONS */}

            <div className="md:col-span-2">
              <label className={labelClass}>
                Decisions
              </label>

              <textarea
                name="decisions"
                rows={5}
                defaultValue={
                  meeting.decisions ??
                  ""
                }
                className={inputClass}
              />
            </div>

            {/* STATUS */}

            <div>
              <label className={labelClass}>
                Status
              </label>

              <select
                name="status"
                defaultValue={
                  meeting.status
                }
                className={inputClass}
              >
                <option>
                  Draft
                </option>

                <option>
                  Published
                </option>

                <option>
                  Closed
                </option>

                <option>
                  Cancelled
                </option>
              </select>

              <p className="mt-2 text-[10px] leading-5 text-[#928980]">
                Students only see
                meetings linked to them
                when the meeting is
                Published or Closed.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-3 border-t border-[#E7E1DB] bg-[#FAF9F7] px-6 py-5">
            <Link
              href={`/hub/meetings/${id}`}
              className="rounded-full border border-[#D8D0C7] bg-white px-5 py-3 text-xs font-semibold"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-full bg-[#385E9D] px-6 py-3 text-xs font-semibold text-white"
            >
              Save Changes →
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}