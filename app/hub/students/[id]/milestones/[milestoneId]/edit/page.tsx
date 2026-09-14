import Link from "next/link";

import {
  notFound,
  redirect,
} from "next/navigation";

import { createClient } from "../../../../../../../lib/supabase/server";

import { updateMilestone } from "../../../../actions";

export default async function EditMilestonePage({
  params,
  searchParams,
}: {
  params: Promise<{
    id: string;
    milestoneId: string;
  }>;

  searchParams: Promise<{
    error?: string;
  }>;
}) {
  const {
    id,
    milestoneId,
  } = await params;

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
    redirect(
      `/hub/students/${id}`
    );
  }

  const {
    data: student,
  } =
    await supabase
      .from("students")
      .select(
        "full_name"
      )
      .eq(
        "id",
        id
      )
      .maybeSingle();

  if (!student) {
    notFound();
  }

  const {
    data: milestone,
  } =
    await supabase
      .from(
        "student_milestones"
      )
      .select("*")
      .eq(
        "id",
        milestoneId
      )
      .eq(
        "student_id",
        id
      )
      .maybeSingle();

  if (!milestone) {
    notFound();
  }

  const {
    data: workstreams,
  } =
    await supabase
      .from(
        "research_workstreams"
      )
      .select(
        "id, title"
      )
      .eq(
        "student_id",
        id
      )
      .order(
        "sort_order",
        {
          ascending: true,
        }
      )
      .order(
        "created_at",
        {
          ascending: true,
        }
      );

  const action =
    updateMilestone.bind(
      null,
      id,
      milestoneId
    );

  const inputClass =
    "mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#385E9D]";

  const labelClass =
    "text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]";

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[900px]">
        <Link
          href={`/hub/students/${id}`}
          className="text-xs font-semibold text-[#385E9D]"
        >
          ← {student.full_name}
        </Link>

        <div className="mt-7">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
            Research Pathway
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-[-0.035em]">
            Edit Milestone.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#706963]">
            Keep the milestone focused
            on its research outcome,
            timeline and current status.
          </p>
        </div>

        {/* STATUS SUMMARY */}

        <div className="mt-7 border-l-[3px] border-[#F2A900] bg-[#FFF9EA] px-5 py-4">
          <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#8A6200]">
            Current Milestone
          </p>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold">
              {milestone.title}
            </p>

            <span className="rounded-full bg-white px-3 py-1 text-[9px] font-bold text-[#645D57]">
              {milestone.status}
            </span>
          </div>
        </div>

        <form
          action={action}
          className="mt-6 border border-[#DDD6CF] bg-white"
        >
          {query.error && (
            <div className="border-b border-[#E7E1DB] bg-[#FBE7E5] px-6 py-4 text-xs text-[#A23B35]">
              {query.error}
            </div>
          )}

          {/* MILESTONE */}

          <div className="border-b border-[#E7E1DB] px-6 py-5">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#385E9D]">
              Milestone
            </p>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label
                className={
                  labelClass
                }
              >
                Milestone *
              </label>

              <input
                name="title"
                required
                defaultValue={
                  milestone.title ??
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
                Research Workstream
              </label>

              <select
                name="workstream_id"
                defaultValue={
                  milestone.workstream_id ??
                  ""
                }
                className={
                  inputClass
                }
              >
                <option value="">
                  No workstream selected
                </option>

                {(workstreams ?? []).map(
                  (
                    workstream
                  ) => (
                    <option
                      key={
                        workstream.id
                      }
                      value={
                        workstream.id
                      }
                    >
                      {
                        workstream.title
                      }
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {/* TIMELINE */}

          <div className="border-y border-[#E7E1DB] bg-[#FAF9F7] px-6 py-5">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#385E9D]">
              Timeline & Status
            </p>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-2">
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
                  milestone.planned_start ??
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
                  milestone.planned_end ??
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
                Status
              </label>

              <select
                name="status"
                defaultValue={
                  [
                    "Planned",
                    "In Progress",
                    "Delayed",
                    "Completed",
                    "On Hold",
                  ].includes(
                    milestone.status
                  )
                    ? milestone.status
                    : "Planned"
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

              <p className="mt-3 text-[10px] leading-5 text-[#928980]">
                Actual start and
                completion dates are
                recorded automatically
                from status changes.
              </p>
            </div>
          </div>

          {/* CONTEXT */}

          <div className="border-y border-[#E7E1DB] bg-[#FAF9F7] px-6 py-5">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#385E9D]">
              Research Context
            </p>
          </div>

          <div className="grid gap-6 p-6">
            <div>
              <label
                className={
                  labelClass
                }
              >
                Notes
              </label>

              <textarea
                name="notes"
                rows={5}
                defaultValue={
                  milestone.notes ??
                  milestone.description ??
                  ""
                }
                placeholder="Objective, progress context, important observations or manager comments..."
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
                Evidence / Document
              </label>

              <input
                name="evidence_url"
                type="url"
                defaultValue={
                  milestone.evidence_url ??
                  ""
                }
                placeholder="SharePoint, OneDrive, manuscript or report URL"
                className={
                  inputClass
                }
              />
            </div>

            {(milestone.actual_start ||
              milestone.actual_end) && (
              <div className="border border-[#E7E1DB] bg-[#FAF9F7] p-4">
                <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#928980]">
                  Recorded Execution
                </p>

                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-[9px] text-[#928980]">
                      Actual Start
                    </p>

                    <p className="mt-1 text-xs font-semibold">
                      {milestone.actual_start ||
                        "Not recorded"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] text-[#928980]">
                      Actual Completion
                    </p>

                    <p className="mt-1 text-xs font-semibold">
                      {milestone.actual_end ||
                        "Not completed"}
                    </p>
                  </div>
                </div>
              </div>
            )}
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
              className="rounded-full bg-[#385E9D] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#27456F]"
            >
              Save Milestone →
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}