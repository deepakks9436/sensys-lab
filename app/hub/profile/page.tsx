import Link from "next/link";

import {
  getHubUser,
  roleLabel,
} from "../../../lib/hub/auth";

import {
  updateProfile,
} from "./actions";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
    message?: string;
  }>;
}) {
  const context =
    await getHubUser();

  const query =
    await searchParams;

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[760px]">
        <Link
          href="/hub"
          className="text-xs font-semibold text-[#385E9D]"
        >
          ← Back to Dashboard
        </Link>

        <div className="mt-8">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
            Account
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-[-0.04em] md:text-5xl">
            My Profile.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#706963]">
            Manage how your name appears
            across SenSys Hub. Your name is
            used in greetings, account
            details, research activity and
            laboratory updates.
          </p>
        </div>

        <section className="mt-8 overflow-hidden border border-[#DDD6CF] bg-white">
          {query.error && (
            <div className="border-b border-[#E7E1DB] bg-[#FBE7E5] px-6 py-4 text-xs text-[#A23B35]">
              {
                query.error
              }
            </div>
          )}

          {query.message && (
            <div className="border-b border-[#E7E1DB] bg-[#E8F4EC] px-6 py-4 text-xs text-[#2D6A45]">
              {
                query.message
              }
            </div>
          )}

          <div className="border-b border-[#E7E1DB] bg-[#FAF9F7] px-6 py-5">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#385E9D]">
              Profile Details
            </p>

            <h2 className="mt-1 text-xl font-bold">
              Personal information
            </h2>
          </div>

          <form
            action={
              updateProfile
            }
          >
            <div className="p-6">
              <div>
                <label
                  htmlFor="full_name"
                  className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#706963]"
                >
                  Full Name
                </label>

                <input
                  id="full_name"
                  name="full_name"
                  required
                  defaultValue={
                    context.profile
                      .fullName
                  }
                  placeholder="Enter your full name"
                  className="mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#385E9D]"
                />

                <p className="mt-2 text-[10px] leading-5 text-[#928980]">
                  Example: Swarna Deb.
                  The first name will be used
                  for dashboard greetings.
                </p>
              </div>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div className="border border-[#E7E1DB] bg-[#FAF9F7] p-4">
                  <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
                    Email
                  </p>

                  <p className="mt-2 break-all text-sm font-semibold">
                    {
                      context.profile
                        .email
                    }
                  </p>

                  <p className="mt-2 text-[9px] leading-4 text-[#928980]">
                    Login email is managed
                    through your SenSys Hub
                    account.
                  </p>
                </div>

                <div className="border border-[#E7E1DB] bg-[#FAF9F7] p-4">
                  <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
                    Role
                  </p>

                  <p className="mt-2 text-sm font-semibold">
                    {roleLabel(
                      context.profile
                        .role
                    )}
                  </p>

                  <p className="mt-2 text-[9px] leading-4 text-[#928980]">
                    Role permissions are
                    managed by SenSys Hub
                    administrators.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-[#E7E1DB] bg-[#FAF9F7] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[10px] leading-5 text-[#928980]">
                Changes will appear across
                SenSys Hub after saving.
              </p>

              <button
                type="submit"
                className="rounded-full bg-[#385E9D] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#27456F]"
              >
                Save Profile
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}