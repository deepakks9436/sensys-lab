import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "../../lib/supabase/server";
import {
  getHubUser,
  roleLabel,
} from "../../lib/hub/auth";

export default async function HubDashboardPage() {
  const context =
    await getHubUser();

  const role =
    context.profile.role;

  /* ========================================================
     STUDENT LANDING
  ======================================================== */

  if (role === "student") {
    if (context.studentId) {
      redirect(
        `/hub/students/${context.studentId}`
      );
    }

    return (
      <main className="px-5 py-10 md:px-8 xl:px-10">
        <div className="mx-auto max-w-[1100px]">
          <div className="border border-[#DDD6CF] bg-white p-8">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A23B35]">
              Account Setup
            </p>

            <h1 className="mt-3 text-3xl font-bold">
              Research profile not linked.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#706963]">
              Your SenSys Hub login is active,
              but it has not yet been connected
              to a graduate researcher profile.
              Please contact the SenSys Hub
              administrator.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const supabase =
    await createClient();

  /* ========================================================
     LIVE DASHBOARD DATA
  ======================================================== */

  let studentCount = 0;
  let atRiskCount = 0;
  let overdueActionCount = 0;
  let lowInventoryCount = 0;

  if (
    role === "admin" ||
    role ===
      "research_manager"
  ) {
    const {
      count:
        totalStudents,
    } = await supabase
      .from("students")
      .select("id", {
        count: "exact",
        head: true,
      });

    studentCount =
      totalStudents ?? 0;

    const {
      count:
        problemStudents,
    } = await supabase
      .from("students")
      .select("id", {
        count: "exact",
        head: true,
      })
      .in("status", [
        "At Risk",
        "Delayed",
      ]);

    atRiskCount =
      problemStudents ?? 0;
  }

  const {
    count:
      overdueActions,
  } = await supabase
    .from("action_items")
    .select("id", {
      count: "exact",
      head: true,
    })
    .eq(
      "status",
      "Overdue"
    );

  overdueActionCount =
    overdueActions ?? 0;

  if (
    role === "admin" ||
    role === "lab_manager"
  ) {
    const {
      count:
        lowChemicals,
    } = await supabase
      .from("chemicals")
      .select("id", {
        count: "exact",
        head: true,
      })
      .in("status", [
        "Low Stock",
        "Reorder",
        "Out of Stock",
      ]);

    const {
      count:
        lowConsumables,
    } = await supabase
      .from("consumables")
      .select("id", {
        count: "exact",
        head: true,
      })
      .in("status", [
        "Low Stock",
        "Reorder",
        "Out of Stock",
      ]);

    lowInventoryCount =
      (lowChemicals ?? 0) +
      (lowConsumables ?? 0);
  }

  /* ========================================================
     RECENT / PRIORITY STUDENTS
  ======================================================== */

  const { data: priorityStudents } =
    role === "admin" ||
    role ===
      "research_manager"
      ? await supabase
          .from("students")
          .select(
            "id, full_name, programme, status, overall_progress, expected_progress, current_stage"
          )
          .order(
            "updated_at",
            {
              ascending:
                false,
            }
          )
          .limit(5)
      : { data: [] };

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[1320px]">
        {/* ============================================== */}
        {/* HEADER */}
        {/* ============================================== */}

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
              SenSys Hub
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-[-0.04em] md:text-5xl">
              Research Operations.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#706963]">
              Welcome,{" "}
              {
                context.profile
                  .fullName
              }
              . Your workspace is
              configured for{" "}
              {roleLabel(
                role
              ).toLowerCase()}{" "}
              access.
            </p>
          </div>

          {(role ===
            "admin" ||
            role ===
              "research_manager") && (
            <Link
              href="/hub/students/new"
              className="inline-flex self-start rounded-full bg-[#385E9D] px-5 py-3 text-xs font-semibold text-white md:self-auto"
            >
              + Add Researcher
            </Link>
          )}
        </div>

        {/* ============================================== */}
        {/* KPI CARDS */}
        {/* ============================================== */}

        <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {(role ===
            "admin" ||
            role ===
              "research_manager") && (
            <>
              <Link
                href="/hub/students"
                className="border border-[#DDD6CF] bg-white p-6 transition hover:border-[#385E9D]"
              >
                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#928980]">
                  Researchers
                </p>

                <p className="mt-4 text-4xl font-bold">
                  {
                    studentCount
                  }
                </p>

                <p className="mt-2 text-xs text-[#706963]">
                  Active graduate
                  research records
                </p>
              </Link>

              <Link
                href="/hub/students"
                className="border border-[#DDD6CF] bg-white p-6 transition hover:border-[#F2A900]"
              >
                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#8A6200]">
                  Needs Attention
                </p>

                <p className="mt-4 text-4xl font-bold">
                  {
                    atRiskCount
                  }
                </p>

                <p className="mt-2 text-xs text-[#706963]">
                  At-risk or delayed
                  researchers
                </p>
              </Link>
            </>
          )}

          <Link
            href="/hub/actions"
            className="border border-[#DDD6CF] bg-white p-6 transition hover:border-[#A23B35]"
          >
            <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#A23B35]">
              Overdue Actions
            </p>

            <p className="mt-4 text-4xl font-bold">
              {
                overdueActionCount
              }
            </p>

            <p className="mt-2 text-xs text-[#706963]">
              Follow-up items
              requiring attention
            </p>
          </Link>

          {(role ===
            "admin" ||
            role ===
              "lab_manager") && (
            <Link
              href="/hub/inventory"
              className="border border-[#DDD6CF] bg-white p-6 transition hover:border-[#385E9D]"
            >
              <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
                Inventory Alerts
              </p>

              <p className="mt-4 text-4xl font-bold">
                {
                  lowInventoryCount
                }
              </p>

              <p className="mt-2 text-xs text-[#706963]">
                Low-stock or
                reorder items
              </p>
            </Link>
          )}
        </div>

        {/* ============================================== */}
        {/* RESEARCH OVERSIGHT */}
        {/* ============================================== */}

        {(role ===
          "admin" ||
          role ===
            "research_manager") && (
          <section className="mt-8 border border-[#DDD6CF] bg-white">
            <div className="flex items-center justify-between border-b border-[#E7E1DB] px-6 py-5">
              <div>
                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
                  Research Oversight
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Graduate Researchers
                </h2>
              </div>

              <Link
                href="/hub/students"
                className="text-xs font-semibold text-[#385E9D]"
              >
                View all →
              </Link>
            </div>

            {!priorityStudents ||
            priorityStudents.length ===
              0 ? (
              <div className="px-6 py-10 text-sm text-[#837A72]">
                No researchers have
                been added yet.
              </div>
            ) : (
              <div className="divide-y divide-[#EEE9E4]">
                {priorityStudents.map(
                  (student) => {
                    const actual =
                      Number(
                        student.overall_progress ??
                          0
                      );

                    const expected =
                      Number(
                        student.expected_progress ??
                          0
                      );

                    return (
                      <Link
                        key={
                          student.id
                        }
                        href={`/hub/students/${student.id}`}
                        className="grid gap-4 px-6 py-5 transition hover:bg-[#FAF9F7] md:grid-cols-[1.4fr_0.7fr_0.7fr]"
                      >
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-sm font-semibold">
                              {
                                student.full_name
                              }
                            </p>

                            <span className="rounded-full bg-[#EEF2F8] px-2.5 py-1 text-[8px] font-bold text-[#385E9D]">
                              {
                                student.programme
                              }
                            </span>
                          </div>

                          <p className="mt-2 text-xs text-[#837A72]">
                            {student.current_stage ||
                              "Stage not specified"}
                          </p>
                        </div>

                        <div>
                          <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
                            Progress
                          </p>

                          <p className="mt-2 text-sm font-semibold">
                            {actual}% /{" "}
                            {
                              expected
                            }
                            %
                          </p>
                        </div>

                        <div>
                          <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
                            Status
                          </p>

                          <p
                            className={`mt-2 text-sm font-semibold ${
                              student.status ===
                              "Delayed"
                                ? "text-[#A23B35]"
                                : student.status ===
                                    "At Risk"
                                  ? "text-[#8A6200]"
                                  : "text-[#2D6A45]"
                            }`}
                          >
                            {
                              student.status
                            }
                          </p>
                        </div>
                      </Link>
                    );
                  }
                )}
              </div>
            )}
          </section>
        )}

        {/* ============================================== */}
        {/* NEXT BUILD INFO */}
        {/* ============================================== */}

        <section className="mt-8 bg-[#203650] p-7 text-white">
          <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#F2A900]">
            SenSys Hub
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            Connected research operations.
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65">
            Research progress,
            weekly follow-up,
            action management,
            laboratory resources
            and inventory will
            operate through one
            role-aware workspace.
          </p>
        </section>
      </div>
    </main>
  );
}