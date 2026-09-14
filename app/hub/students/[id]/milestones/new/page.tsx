import Link from "next/link";

import {
  notFound,
  redirect,
} from "next/navigation";

import { createClient } from "../../../../../../lib/supabase/server";

import { addMilestone } from "../../../actions";

export default async function NewMilestonePage({
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
        "full_name, programme"
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
    data: workstreams,
  } =
    await supabase
      .from(
        "research_workstreams"
      )
      .select(
        "id, title, status"
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
    addMilestone.bind(
      null,
      id
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

        {/* HEADER */}

        <div className="mt-7">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
            Research Pathway
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-[-0.035em]">
            Add Milestone.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#706963]">
            Define one clear research
            milestone, its timeline and
            current status. Detailed
            progress can be recorded later
            through weekly updates and
            research evidence.
          </p>
        </div>

        {/* INFO */}

        <div className="mt-7 grid gap-px bg-[#DDD6CF] sm:grid-cols-3">
          <div className="bg-white p-4">
            <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
              1 · What?
            </p>

            <p className="mt-2 text-xs font-semibold">
              Define the outcome.
            </p>
          </div>

          <div className="bg-white p-4">
            <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
              2 · When?
            </p>

            <p className="mt-2 text-xs font-semibold">
              Set the planned timeline.
            </p>
          </div>

          <div className="bg-white p-4">
            <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
              3 · Where are we?
            </p>

            <p className="mt-2 text-xs font-semibold">
              Choose the current status.
            </p>
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

          {/* =============================== */}
          {/* MILESTONE */}
          {/* =============================== */}

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
                placeholder="e.g. Complete real-sample validation"
                className={
                  inputClass
                }
              />

              <p className="mt-2 text-[10px] leading-5 text-[#928980]">
                Use a clear outcome
                rather than a general
                activity.
              </p>
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
                defaultValue=""
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

              {(workstreams ??
                []).length ===
                0 && (
                <p className="mt-2 text-[10px] leading-5 text-[#928980]">
                  No workstreams have
                  been created yet.
                  You can still add the
                  milestone now.
                </p>
              )}
            </div>
          </div>

          {/* =============================== */}
          {/* TIMELINE */}
          {/* =============================== */}

          <div className="border-y border-[#E7E1DB] bg-[#FAF9F7] px-6 py-5">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#385E9D]">
              Timeline
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

              <div className="mt-3 flex flex-wrap gap-3 text-[9px] text-[#837A72]">
                <span>
                  ○ Planned
                </span>

                <span className="text-[#385E9D]">
                  ● In Progress
                </span>

                <span className="text-[#A23B35]">
                  ● Delayed
                </span>

                <span className="text-[#2D6A45]">
                  ✓ Completed
                </span>

                <span>
                  ‖ On Hold
                </span>
              </div>
            </div>
          </div>

          {/* =============================== */}
          {/* CONTEXT */}
          {/* =============================== */}

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
                rows={4}
                placeholder="Brief objective, important context or expected outcome..."
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
                placeholder="SharePoint, OneDrive, manuscript or report link"
                className={
                  inputClass
                }
              />

              <p className="mt-2 text-[10px] leading-5 text-[#928980]">
                Optional. This can be
                added later when the
                milestone produces a
                report, manuscript,
                dataset or other
                evidence.
              </p>
            </div>
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
              Add Milestone →
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}