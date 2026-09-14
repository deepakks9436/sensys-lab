import Link from "next/link";

import { createClient } from "../../../lib/supabase/server";

function statusClasses(
  status: string
) {
  if (status === "On Track") {
    return "bg-[#E8F4EC] text-[#2D6A45]";
  }

  if (status === "At Risk") {
    return "bg-[#FFF4D9] text-[#8A6200]";
  }

  if (status === "Delayed") {
    return "bg-[#FBE7E5] text-[#A23B35]";
  }

  if (status === "Completed") {
    return "bg-[#E8EFF8] text-[#385E9D]";
  }

  return "bg-[#EEEAE5] text-[#706963]";
}

export default async function StudentsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single()
    : { data: null };

  const canManage =
    !!profile &&
    ["admin", "manager"].includes(
      profile.role
    );

  const {
    data: students,
    error,
  } = await supabase
    .from("students")
    .select("*")
    .order("full_name", {
      ascending: true,
    });

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#385E9D]">
              People · Research Progress
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-[-0.035em] md:text-5xl">
              Graduate Researchers.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#706963]">
              Live research planning,
              milestone progress, weekly
              follow-up and student status
              across SenSys.
            </p>
          </div>

          {canManage && (
            <Link
              href="/hub/students/new"
              className="w-fit rounded-full bg-[#385E9D] px-5 py-3 text-xs font-semibold text-white"
            >
              + Add Student
            </Link>
          )}
        </div>

        {error && (
          <div className="mt-8 border-l-[3px] border-[#A23B35] bg-[#FBE7E5] px-5 py-4 text-sm text-[#A23B35]">
            Unable to load students:{" "}
            {error.message}
          </div>
        )}

        {!error &&
          (!students ||
            students.length === 0) && (
            <section className="mt-10 border border-dashed border-[#CFC5BC] bg-white px-6 py-14 text-center">
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
                Student Progress
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                No student records yet.
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#706963]">
                Add incoming SenSys
                researchers and define their
                research plans directly through
                the Hub.
              </p>

              {canManage && (
                <Link
                  href="/hub/students/new"
                  className="mt-6 inline-flex rounded-full bg-[#385E9D] px-5 py-3 text-xs font-semibold text-white"
                >
                  Add first student →
                </Link>
              )}
            </section>
          )}

        {students &&
          students.length > 0 && (
            <div className="mt-10 overflow-hidden border border-[#DDD6CF] bg-white">
              <div className="hidden grid-cols-[1.3fr_0.45fr_0.95fr_0.55fr_0.55fr_0.95fr_0.55fr] border-b border-[#DDD6CF] bg-[#F5F3EF] px-6 py-4 text-[8px] font-bold uppercase tracking-[0.15em] text-[#837A72] lg:grid">
                <span>Researcher</span>
                <span>Program</span>
                <span>Research Area</span>
                <span>Actual</span>
                <span>Expected</span>
                <span>Next Milestone</span>
                <span>Status</span>
              </div>

              <div className="divide-y divide-[#EEE9E4]">
                {students.map(
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
                        key={student.id}
                        href={`/hub/students/${student.id}`}
                        className="grid gap-4 px-6 py-5 transition hover:bg-[#FBFAF8] lg:grid-cols-[1.3fr_0.45fr_0.95fr_0.55fr_0.55fr_0.95fr_0.55fr] lg:items-center"
                      >
                        <div>
                          <p className="text-sm font-semibold">
                            {
                              student.full_name
                            }
                          </p>

                          <p className="mt-1 text-[10px] text-[#928980]">
                            {student.intake ||
                              "Intake not set"}
                          </p>
                        </div>

                        <p className="text-xs font-semibold">
                          {
                            student.programme
                          }
                        </p>

                        <p className="text-xs text-[#706963]">
                          {student.research_area ||
                            "—"}
                        </p>

                        <p className="text-sm font-bold">
                          {actual}%
                        </p>

                        <p className="text-sm">
                          {expected}%
                        </p>

                        <div>
                          <p className="text-xs">
                            {student.next_milestone ||
                              "—"}
                          </p>

                          <p className="mt-1 text-[9px] text-[#928980]">
                            {student.next_milestone_date ||
                              ""}
                          </p>
                        </div>

                        <span
                          className={`w-fit rounded-full px-3 py-1 text-[9px] font-bold ${statusClasses(
                            student.status
                          )}`}
                        >
                          {student.status}
                        </span>
                      </Link>
                    );
                  }
                )}
              </div>
            </div>
          )}
      </div>
    </main>
  );
}