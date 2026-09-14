import Link from "next/link";

import { createClient } from "../../../lib/supabase/server";

import {
  updateActionItem,
  updateOwnActionStatus,
} from "./actions";

function priorityClasses(
  priority: string
) {
  if (
    priority === "Critical"
  ) {
    return "bg-[#FBE7E5] text-[#A23B35]";
  }

  if (
    priority === "High"
  ) {
    return "bg-[#FFF0E3] text-[#A15B16]";
  }

  if (
    priority === "Medium"
  ) {
    return "bg-[#FFF4D9] text-[#8A6200]";
  }

  return "bg-[#EEF2F8] text-[#385E9D]";
}

function statusClasses(
  status: string
) {
  if (
    status === "Completed"
  ) {
    return "bg-[#E8F4EC] text-[#2D6A45]";
  }

  if (
    status === "Overdue"
  ) {
    return "bg-[#FBE7E5] text-[#A23B35]";
  }

  if (
    status === "In Progress"
  ) {
    return "bg-[#FFF4D9] text-[#8A6200]";
  }

  return "bg-[#EEF2F8] text-[#385E9D]";
}

export default async function ActionsPage() {
  const supabase =
    await createClient();

  const {
    data: { user },
  } =
    await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } =
    await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

  if (!profile) {
    return null;
  }

  const canManage =
    [
      "admin",
      "research_manager",
    ].includes(
      profile.role
    );

  const isStudent =
    profile.role ===
    "student";

  /*
   * RLS automatically limits students
   * to actions attached to their own
   * research record.
   */
  const { data: actions } =
    await supabase
      .from("action_items")
      .select(
        `
        *,
        students (
          id,
          full_name,
          programme
        )
        `
      )
      .neq(
        "status",
        "Cancelled"
      )
      .order(
        "due_date",
        {
          ascending:
            true,
          nullsFirst:
            false,
        }
      );

  const today =
    new Date()
      .toISOString()
      .slice(0, 10);

  const preparedActions =
    (actions ?? []).map(
      (action) => {
        let displayStatus =
          action.status;

        if (
          action.due_date &&
          action.due_date <
            today &&
          ![
            "Completed",
            "Cancelled",
          ].includes(
            action.status
          )
        ) {
          displayStatus =
            "Overdue";
        }

        return {
          ...action,
          displayStatus,
        };
      }
    );

  const openCount =
    preparedActions.filter(
      (action) =>
        ![
          "Completed",
          "Cancelled",
        ].includes(
          action.status
        )
    ).length;

  const overdueCount =
    preparedActions.filter(
      (action) =>
        action.displayStatus ===
        "Overdue"
    ).length;

  const completedCount =
    preparedActions.filter(
      (action) =>
        action.status ===
        "Completed"
    ).length;

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[1320px]">
        {/* HEADER */}

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
              Follow-up
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-[-0.04em] md:text-5xl">
              {isStudent
                ? "My Actions."
                : "Action Items."}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#706963]">
              {isStudent
                ? "Track research tasks and follow-up items assigned to your research record."
                : "Track research follow-up, responsibilities and completion across SenSys."}
            </p>
          </div>

          {canManage && (
            <Link
              href="/hub/actions/new"
              className="inline-flex self-start rounded-full bg-[#385E9D] px-5 py-3 text-xs font-semibold text-white md:self-auto"
            >
              + New Action
            </Link>
          )}
        </div>

        {/* KPI */}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="border border-[#DDD6CF] bg-white p-5">
            <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#928980]">
              Open
            </p>

            <p className="mt-3 text-3xl font-bold">
              {openCount}
            </p>
          </div>

          <div className="border border-[#DDD6CF] bg-white p-5">
            <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#A23B35]">
              Overdue
            </p>

            <p className="mt-3 text-3xl font-bold">
              {overdueCount}
            </p>
          </div>

          <div className="border border-[#DDD6CF] bg-white p-5">
            <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#2D6A45]">
              Completed
            </p>

            <p className="mt-3 text-3xl font-bold">
              {completedCount}
            </p>
          </div>
        </div>

        {/* ACTION LIST */}

        <section className="mt-8 border border-[#DDD6CF] bg-white">
          <div className="border-b border-[#E7E1DB] px-6 py-5">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
              Follow-up Register
            </p>

            <h2 className="mt-1 text-xl font-bold">
              {isStudent
                ? "My Assigned Actions"
                : "Open & Recent Actions"}
            </h2>
          </div>

          {preparedActions.length ===
          0 ? (
            <div className="px-6 py-12 text-sm text-[#837A72]">
              No action items yet.
            </div>
          ) : (
            <div className="divide-y divide-[#EEE9E4]">
              {preparedActions.map(
                (action) => {
                  const student =
                    Array.isArray(
                      action.students
                    )
                      ? action.students[0]
                      : action.students;

                  const managerAction =
                    updateActionItem.bind(
                      null,
                      action.id
                    );

                  const studentAction =
                    updateOwnActionStatus.bind(
                      null,
                      action.id
                    );

                  return (
                    <article
                      key={
                        action.id
                      }
                      className="grid gap-5 px-6 py-5 lg:grid-cols-[1.4fr_0.75fr_0.75fr]"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-semibold">
                            {
                              action.title
                            }
                          </h3>

                          <span
                            className={`rounded-full px-2.5 py-1 text-[8px] font-bold ${priorityClasses(
                              action.priority
                            )}`}
                          >
                            {
                              action.priority
                            }
                          </span>

                          <span
                            className={`rounded-full px-2.5 py-1 text-[8px] font-bold ${statusClasses(
                              action.displayStatus
                            )}`}
                          >
                            {
                              action.displayStatus
                            }
                          </span>
                        </div>

                        {action.description && (
                          <p className="mt-3 max-w-2xl whitespace-pre-line text-xs leading-6 text-[#706963]">
                            {
                              action.description
                            }
                          </p>
                        )}

                        <p className="mt-3 text-[10px] text-[#928980]">
                          {action.source ||
                            "Research Follow-up"}
                        </p>
                      </div>

                      <div>
                        <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
                          Assigned
                        </p>

                        <p className="mt-2 text-xs font-semibold">
                          {action.owner_name ||
                            student?.full_name ||
                            "Unassigned"}
                        </p>

                        {student &&
                          canManage && (
                            <Link
                              href={`/hub/students/${student.id}`}
                              className="mt-2 inline-flex text-[10px] font-semibold text-[#385E9D]"
                            >
                              {
                                student.full_name
                              }{" "}
                              →
                            </Link>
                          )}

                        <p className="mt-5 text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
                          Due
                        </p>

                        <p className="mt-2 text-xs">
                          {action.due_date ||
                            "No due date"}
                        </p>
                      </div>

                      <div>
                        {canManage ? (
                          <form
                            action={
                              managerAction
                            }
                            className="space-y-3"
                          >
                            <div>
                              <label className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#928980]">
                                Status
                              </label>

                              <select
                                name="status"
                                defaultValue={
                                  action.status
                                }
                                className="mt-2 w-full border border-[#D8D0C7] bg-white px-3 py-2 text-xs"
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
                                <option>
                                  Overdue
                                </option>
                                <option>
                                  Cancelled
                                </option>
                              </select>
                            </div>

                            <div>
                              <label className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#928980]">
                                Priority
                              </label>

                              <select
                                name="priority"
                                defaultValue={
                                  action.priority
                                }
                                className="mt-2 w-full border border-[#D8D0C7] bg-white px-3 py-2 text-xs"
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

                            <div>
                              <label className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#928980]">
                                Due Date
                              </label>

                              <input
                                name="due_date"
                                type="date"
                                defaultValue={
                                  action.due_date ??
                                  ""
                                }
                                className="mt-2 w-full border border-[#D8D0C7] px-3 py-2 text-xs"
                              />
                            </div>

                            <button
                              type="submit"
                              className="text-[10px] font-semibold text-[#385E9D]"
                            >
                              Save →
                            </button>
                          </form>
                        ) : isStudent ? (
                          <form
                            action={
                              studentAction
                            }
                          >
                            <label className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#928980]">
                              My Status
                            </label>

                            <select
                              name="status"
                              defaultValue={
                                action.status ===
                                "Completed"
                                  ? "Completed"
                                  : action.status ===
                                      "In Progress"
                                    ? "In Progress"
                                    : "Open"
                              }
                              className="mt-2 w-full border border-[#D8D0C7] bg-white px-3 py-2 text-xs"
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

                            <button
                              type="submit"
                              className="mt-3 text-[10px] font-semibold text-[#385E9D]"
                            >
                              Update Status →
                            </button>
                          </form>
                        ) : null}
                      </div>
                    </article>
                  );
                }
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}