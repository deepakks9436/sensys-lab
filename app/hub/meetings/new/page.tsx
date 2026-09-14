import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "../../../../lib/supabase/server";

import { addMeeting } from "../actions";

export default async function NewMeetingPage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
  }>;
}) {
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

  const { data: profile } =
    await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

  if (
    !profile ||
    ![
      "admin",
      "research_manager",
    ].includes(
      profile.role
    )
  ) {
    redirect("/hub/meetings");
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

  const inputClass =
    "mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#385E9D]";

  const labelClass =
    "text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]";

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[1000px]">
        <Link
          href="/hub/meetings"
          className="text-xs font-semibold text-[#385E9D]"
        >
          ← Meetings
        </Link>

        <div className="mt-7">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
            Research Coordination
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-[-0.04em]">
            New Meeting.
          </h1>
        </div>

        <form
          action={addMeeting}
          className="mt-10 border border-[#DDD6CF] bg-white"
        >
          {query.error && (
            <div className="border-b border-[#E7E1DB] bg-[#FBE7E5] px-6 py-4 text-xs text-[#A23B35]">
              {query.error}
            </div>
          )}

          <div className="grid gap-6 p-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className={labelClass}>
                Meeting Title *
              </label>

              <input
                name="title"
                required
                placeholder="Weekly Research Review"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Meeting Type
              </label>

              <select
                name="meeting_type"
                defaultValue="Weekly Meeting"
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

            <div>
              <label className={labelClass}>
                Date *
              </label>

              <input
                name="meeting_date"
                type="date"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Start Time
              </label>

              <input
                name="start_time"
                type="time"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                End Time
              </label>

              <input
                name="end_time"
                type="time"
                className={inputClass}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>
                Location / Meeting Link
              </label>

              <input
                name="location"
                placeholder="SenSys Lab / Teams / Room..."
                className={inputClass}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>
                Linked Researchers
              </label>

              <div className="mt-3 grid gap-2 border border-[#DDD6CF] p-4 sm:grid-cols-2">
                {(students ?? []).map(
                  (student) => (
                    <label
                      key={
                        student.id
                      }
                      className="flex items-center gap-3 text-xs"
                    >
                      <input
                        type="checkbox"
                        name="student_ids"
                        value={
                          student.id
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

            <div className="md:col-span-2">
              <label className={labelClass}>
                Agenda
              </label>

              <textarea
                name="agenda"
                rows={5}
                placeholder="Topics to be discussed..."
                className={inputClass}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>
                Minutes
              </label>

              <textarea
                name="minutes"
                rows={6}
                placeholder="Discussion summary..."
                className={inputClass}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>
                Decisions
              </label>

              <textarea
                name="decisions"
                rows={4}
                placeholder="Key decisions and conclusions..."
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Status
              </label>

              <select
                name="status"
                defaultValue="Draft"
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
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-[#E7E1DB] bg-[#FAF9F7] px-6 py-5">
            <Link
              href="/hub/meetings"
              className="rounded-full border border-[#D8D0C7] bg-white px-5 py-3 text-xs font-semibold"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-full bg-[#385E9D] px-6 py-3 text-xs font-semibold text-white"
            >
              Create Meeting →
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}