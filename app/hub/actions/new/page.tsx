import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "../../../../lib/supabase/server";

import { addActionItem } from "../actions";

export default async function NewActionPage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
    student?: string;
    meeting?: string;
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
      .select(
        "role, is_active"
      )
      .eq("id", user.id)
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
    redirect(
      "/hub/actions"
    );
  }

  /* ========================================================
     STUDENTS
  ======================================================== */

  const {
    data: students,
  } =
    await supabase
      .from("students")
      .select(
        "id, full_name, programme"
      )
      .order(
        "full_name"
      );

  /* ========================================================
     MEETING CONTEXT
  ======================================================== */

  let meeting:
    | {
        id: string;
        title: string;
        meeting_date: string;
        meeting_type: string;
      }
    | null = null;

  let meetingStudentIds:
    string[] = [];

  if (query.meeting) {
    const {
      data: meetingData,
    } =
      await supabase
        .from("meetings")
        .select(
          "id, title, meeting_date, meeting_type"
        )
        .eq(
          "id",
          query.meeting
        )
        .maybeSingle();

    meeting =
      meetingData;

    /*
     * If creating an action from a
     * meeting, use the researchers
     * linked to that meeting as the
     * most relevant choices.
     */
    const {
      data: linkedStudents,
    } =
      await supabase
        .from(
          "meeting_students"
        )
        .select(
          "student_id"
        )
        .eq(
          "meeting_id",
          query.meeting
        );

    meetingStudentIds =
      (
        linkedStudents ??
        []
      ).map(
        (link) =>
          link.student_id
      );
  }

  const sortedStudents =
    [...(students ?? [])]
      .sort(
        (a, b) => {
          const aLinked =
            meetingStudentIds.includes(
              a.id
            );

          const bLinked =
            meetingStudentIds.includes(
              b.id
            );

          if (
            aLinked &&
            !bLinked
          ) {
            return -1;
          }

          if (
            !aLinked &&
            bLinked
          ) {
            return 1;
          }

          return a.full_name.localeCompare(
            b.full_name
          );
        }
      );

  const inputClass =
    "mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#385E9D]";

  const labelClass =
    "text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]";

  const cancelHref =
    meeting
      ? `/hub/meetings/${meeting.id}`
      : "/hub/actions";

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[900px]">
        <Link
          href={
            cancelHref
          }
          className="text-xs font-semibold text-[#385E9D]"
        >
          ←{" "}
          {meeting
            ? "Meeting"
            : "Action Items"}
        </Link>

        <div className="mt-7">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
            Follow-up
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-[-0.04em]">
            New Action.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#706963]">
            {meeting
              ? "Create a follow-up item directly from this meeting and assign it to the relevant researcher."
              : "Create a research follow-up item and connect it to a graduate researcher where appropriate."}
          </p>
        </div>

        {/* ============================================== */}
        {/* MEETING CONTEXT */}
        {/* ============================================== */}

        {meeting && (
          <div className="mt-7 border-l-[3px] border-[#F2A900] bg-[#FFF9EA] px-5 py-4">
            <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#8A6200]">
              Created From Meeting
            </p>

            <p className="mt-2 text-sm font-semibold">
              {
                meeting.title
              }
            </p>

            <p className="mt-1 text-[10px] text-[#837A72]">
              {
                meeting.meeting_type
              }
              {" · "}
              {
                meeting.meeting_date
              }
            </p>
          </div>
        )}

        <form
          action={
            addActionItem
          }
          className="mt-8 border border-[#DDD6CF] bg-white"
        >
          {/* ============================================ */}
          {/* HIDDEN MEETING LINK */}
          {/* ============================================ */}

          {meeting && (
            <input
              type="hidden"
              name="meeting_id"
              value={
                meeting.id
              }
            />
          )}

          {query.error && (
            <div className="border-b border-[#E7E1DB] bg-[#FBE7E5] px-6 py-4 text-xs text-[#A23B35]">
              {
                query.error
              }
            </div>
          )}

          <div className="grid gap-6 p-6 md:grid-cols-2">
            {/* ========================================== */}
            {/* TITLE */}
            {/* ========================================== */}

            <div className="md:col-span-2">
              <label
                className={
                  labelClass
                }
              >
                Action Title *
              </label>

              <input
                name="title"
                required
                placeholder="Complete validation experiment"
                className={
                  inputClass
                }
              />
            </div>

            {/* ========================================== */}
            {/* DESCRIPTION */}
            {/* ========================================== */}

            <div className="md:col-span-2">
              <label
                className={
                  labelClass
                }
              >
                Description
              </label>

              <textarea
                name="description"
                rows={4}
                placeholder="Describe the required follow-up..."
                className={
                  inputClass
                }
              />
            </div>

            {/* ========================================== */}
            {/* RESEARCHER */}
            {/* ========================================== */}

            <div>
              <label
                className={
                  labelClass
                }
              >
                Researcher
              </label>

              <select
                name="student_id"
                defaultValue={
                  query.student ??
                  ""
                }
                className={
                  inputClass
                }
              >
                <option value="">
                  General / not linked
                </option>

                {sortedStudents.map(
                  (
                    student
                  ) => {
                    const linked =
                      meetingStudentIds.includes(
                        student.id
                      );

                    return (
                      <option
                        key={
                          student.id
                        }
                        value={
                          student.id
                        }
                      >
                        {
                          student.full_name
                        }{" "}
                        —{" "}
                        {
                          student.programme
                        }
                        {linked
                          ? " · Meeting participant"
                          : ""}
                      </option>
                    );
                  }
                )}
              </select>

              {meeting &&
                meetingStudentIds.length >
                  0 && (
                  <p className="mt-2 text-[9px] leading-5 text-[#928980]">
                    Researchers
                    linked to this
                    meeting appear
                    first.
                  </p>
                )}
            </div>

            {/* ========================================== */}
            {/* OWNER */}
            {/* ========================================== */}

            <div>
              <label
                className={
                  labelClass
                }
              >
                Owner Name
              </label>

              <input
                name="owner_name"
                placeholder="Responsible person"
                className={
                  inputClass
                }
              />
            </div>

            {/* ========================================== */}
            {/* SOURCE */}
            {/* ========================================== */}

            <div>
              <label
                className={
                  labelClass
                }
              >
                Source
              </label>

              {meeting ? (
                <>
                  <input
                    type="hidden"
                    name="source"
                    value="Weekly Meeting"
                  />

                  <div className="mt-2 border border-[#D8D0C7] bg-[#F7F5F2] px-4 py-3 text-sm">
                    Weekly Meeting
                  </div>

                  <p className="mt-2 text-[9px] text-[#928980]">
                    Automatically
                    linked to the
                    meeting.
                  </p>
                </>
              ) : (
                <select
                  name="source"
                  defaultValue="Research Follow-up"
                  className={
                    inputClass
                  }
                >
                  <option>
                    Research Follow-up
                  </option>

                  <option>
                    Weekly Meeting
                  </option>

                  <option>
                    Supervisor Review
                  </option>

                  <option>
                    Project Review
                  </option>

                  <option>
                    Other
                  </option>
                </select>
              )}
            </div>

            {/* ========================================== */}
            {/* DUE DATE */}
            {/* ========================================== */}

            <div>
              <label
                className={
                  labelClass
                }
              >
                Due Date
              </label>

              <input
                name="due_date"
                type="date"
                className={
                  inputClass
                }
              />
            </div>

            {/* ========================================== */}
            {/* PRIORITY */}
            {/* ========================================== */}

            <div>
              <label
                className={
                  labelClass
                }
              >
                Priority
              </label>

              <select
                name="priority"
                defaultValue="Medium"
                className={
                  inputClass
                }
              >
                <option>
                  Low
                </option>

                <option>
                  Medium
                </option>

                <option>
                  High
                </option>

                <option>
                  Critical
                </option>
              </select>
            </div>

            {/* ========================================== */}
            {/* STATUS */}
            {/* ========================================== */}

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
                defaultValue="Open"
                className={
                  inputClass
                }
              >
                <option>
                  Open
                </option>

                <option>
                  In Progress
                </option>

                <option>
                  Completed
                </option>
              </select>
            </div>
          </div>

          {/* ============================================ */}
          {/* ACTION BUTTONS */}
          {/* ============================================ */}

          <div className="flex justify-end gap-3 border-t border-[#E7E1DB] bg-[#FAF9F7] px-6 py-5">
            <Link
              href={
                cancelHref
              }
              className="rounded-full border border-[#D8D0C7] bg-white px-5 py-3 text-xs font-semibold"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-full bg-[#385E9D] px-6 py-3 text-xs font-semibold text-white"
            >
              Create Action →
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}