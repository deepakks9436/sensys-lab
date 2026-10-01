import Link from "next/link";
import {
  redirect,
} from "next/navigation";

import {
  createClient,
} from "../../lib/supabase/server";

import {
  updatePassword,
} from "./actions";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
    mode?: string;
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
    redirect(
      "/login?error=Your%20password%20setup%20session%20is%20not%20active.%20Please%20request%20a%20new%20link."
    );
  }

  const isChangeMode =
    query.mode ===
    "change";

  const isInviteMode =
    query.mode ===
    "invite";

  return (
    <main className="min-h-screen bg-[#F6F4F1] px-5 py-12 text-[#201B17]">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-[1200px] items-center justify-center">
        <div className="w-full max-w-[460px]">
          <div className="mb-8 flex items-center justify-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#385E9D] bg-white">
              <div className="h-3 w-3 rounded-full bg-[#F2A900]" />
            </div>

            <div>
              <p className="text-xl font-medium tracking-[-0.03em]">
                SenSys Hub
              </p>

              <p className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.24em] text-[#928980]">
                {isInviteMode
                  ? "Account Activation"
                  : "Account Security"}
              </p>
            </div>
          </div>

          <section className="border border-[#DDD6CF] bg-white">
            <div className="border-b border-[#E7E1DB] px-7 py-7">
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
                Password
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-[-0.035em]">
                {isInviteMode
                  ? "Create your password."
                  : isChangeMode
                    ? "Change password."
                    : "Set a new password."}
              </h1>

              <p className="mt-3 text-sm leading-6 text-[#706963]">
                Signed in as{" "}
                <span className="font-semibold">
                  {user.email}
                </span>
                .
              </p>

              {isInviteMode && (
                <p className="mt-3 text-xs leading-6 text-[#706963]">
                  Welcome to SenSys Hub. Create a password, then complete your
                  profile before entering the workspace.
                </p>
              )}
            </div>

            <form
              action={
                updatePassword
              }
              className="p-7"
            >
              <input
                type="hidden"
                name="mode"
                value={
                  query.mode ??
                  ""
                }
              />

              {query.error && (
                <div className="mb-5 border-l-[3px] border-[#A23B35] bg-[#FBE7E5] px-4 py-3 text-xs leading-5 text-[#A23B35]">
                  {query.error}
                </div>
              )}

              <div>
                <label className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#706963]">
                  New Password
                </label>

                <input
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none focus:border-[#385E9D]"
                />
              </div>

              <div className="mt-5">
                <label className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#706963]">
                  Confirm New Password
                </label>

                <input
                  name="confirm_password"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none focus:border-[#385E9D]"
                />
              </div>

              <button
                type="submit"
                className="mt-7 w-full rounded-full bg-[#385E9D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#27456F]"
              >
                {isInviteMode
                  ? "Create password →"
                  : "Update password →"}
              </button>

              {!isInviteMode && (
                <Link
                  href="/hub"
                  className="mt-5 block text-center text-xs font-semibold text-[#385E9D]"
                >
                  Cancel
                </Link>
              )}
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
