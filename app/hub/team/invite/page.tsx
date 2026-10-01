import Link from "next/link";

import {
  requireAdmin,
} from "../../../../lib/hub/auth";

import {
  createAdminClient,
} from "../../../../lib/supabase/admin";

import {
  inviteTeamMember,
} from "../actions";

export default async function InviteTeamMemberPage({
  searchParams,
}: {
  searchParams: Promise<{
    studentId?: string;
    error?: string;
  }>;
}) {
  await requireAdmin();

  const query =
    await searchParams;

  const admin =
    createAdminClient();

  let student:
    | {
        id: string;
        full_name:
          | string
          | null;
        programme:
          | string
          | null;
        research_area:
          | string
          | null;
        user_id:
          | string
          | null;
      }
    | null = null;

  if (query.studentId) {
    const {
      data,
    } = await admin
      .from("students")
      .select(
        "id, full_name, programme, research_area, user_id"
      )
      .eq(
        "id",
        query.studentId
      )
      .maybeSingle();

    student =
      data ?? null;
  }

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[760px]">
        <Link
          href="/hub/team"
          className="text-xs font-semibold text-[#385E9D]"
        >
          ← Team Access
        </Link>

        <div className="mt-8">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
            Administration
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-[-0.04em] md:text-5xl">
            Invite Team Member.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#706963]">
            Enter the minimum information needed for Hub access. The person
            receives an invitation email, creates their own password, and
            completes their profile after signing in.
          </p>
        </div>

        {query.error && (
          <div className="mt-7 border-l-[3px] border-[#A23B35] bg-[#FBE7E5] px-5 py-4 text-xs text-[#A23B35]">
            {query.error}
          </div>
        )}

        <form
          action={
            inviteTeamMember
          }
          className="mt-8 overflow-hidden border border-[#DDD6CF] bg-white"
        >
          {student && (
            <input
              type="hidden"
              name="student_id"
              value={
                student.id
              }
            />
          )}

          <div className="border-b border-[#E7E1DB] bg-[#FAF9F7] px-6 py-5">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#385E9D]">
              Invitation
            </p>

            <h2 className="mt-1 text-xl font-bold">
              Basic access information
            </h2>
          </div>

          <div className="grid gap-6 p-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]">
                Full Name *
              </label>

              <input
                name="full_name"
                required
                defaultValue={
                  student?.full_name ??
                  ""
                }
                className="mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none focus:border-[#385E9D]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]">
                Email *
              </label>

              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="name@umanitoba.ca"
                className="mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none focus:border-[#385E9D]"
              />

              <p className="mt-2 text-[10px] leading-5 text-[#928980]">
                This becomes the person's SenSys Hub login email.
              </p>
            </div>

            <div>
              <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]">
                Hub Role *
              </label>

              <select
                name="role"
                defaultValue={
                  student
                    ? "student"
                    : "student"
                }
                disabled={
                  Boolean(
                    student
                  )
                }
                className="mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none focus:border-[#385E9D] disabled:bg-[#F3F0EC]"
              >
                <option value="student">
                  Student
                </option>

                {!student && (
                  <>
                    <option value="member">
                      Member
                    </option>

                    <option value="research_manager">
                      Research Manager
                    </option>

                    <option value="lab_manager">
                      Lab Manager
                    </option>

                    <option value="admin">
                      Administrator
                    </option>
                  </>
                )}
              </select>

              {student && (
                <input
                  type="hidden"
                  name="role"
                  value="student"
                />
              )}
            </div>

            <div>
              <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]">
                Programme
              </label>

              <select
                name="programme"
                defaultValue={
                  student?.programme ??
                  "PhD"
                }
                className="mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none focus:border-[#385E9D]"
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
          </div>

          {student && (
            <div className="mx-6 mb-6 border-l-[3px] border-[#385E9D] bg-[#F1F5FA] px-5 py-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#385E9D]">
                Existing Research Profile
              </p>

              <p className="mt-2 text-xs leading-6 text-[#645D57]">
                This invitation will link the Hub login to the existing
                researcher record for {student.full_name}.
              </p>
            </div>
          )}

          <div className="flex flex-wrap justify-end gap-3 border-t border-[#E7E1DB] bg-[#FAF9F7] px-6 py-5">
            <Link
              href="/hub/team"
              className="rounded-full border border-[#D8D0C7] bg-white px-5 py-3 text-xs font-semibold"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-full bg-[#385E9D] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#27456F]"
            >
              Send Invitation →
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
