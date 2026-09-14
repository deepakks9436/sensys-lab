import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "../../lib/supabase/server";
import { login } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
    message?: string;
  }>;
}) {
  const query =
    await searchParams;

  const supabase =
    await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/hub");
  }

  return (
    <main className="min-h-screen bg-[#F6F4F1] px-5 py-12 text-[#201B17]">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-[1200px] items-center justify-center">
        <div className="w-full max-w-[430px]">
          {/* BRAND */}

          <div className="mb-8 flex items-center justify-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#385E9D] bg-white">
              <div className="h-3 w-3 rounded-full bg-[#F2A900]" />
            </div>

            <div>
              <p className="text-xl font-medium tracking-[-0.03em]">
                SenSys Hub
              </p>

              <p className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.24em] text-[#928980]">
                Internal Research Workspace
              </p>
            </div>
          </div>

          <section className="border border-[#DDD6CF] bg-white">
            <div className="border-b border-[#E7E1DB] px-7 py-7">
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
                Secure Access
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-[-0.035em]">
                Sign in.
              </h1>

              <p className="mt-3 text-sm leading-6 text-[#706963]">
                Access the SenSys Lab
                internal research workspace.
              </p>
            </div>

            <form
              action={login}
              className="p-7"
            >
              {query.error && (
                <div className="mb-5 border-l-[3px] border-[#A23B35] bg-[#FBE7E5] px-4 py-3 text-xs leading-5 text-[#A23B35]">
                  {query.error}
                </div>
              )}

              {query.message && (
                <div className="mb-5 border-l-[3px] border-[#2D6A45] bg-[#E8F4EC] px-4 py-3 text-xs leading-5 text-[#2D6A45]">
                  {query.message}
                </div>
              )}

              <div>
                <label className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#706963]">
                  Email Address
                </label>

                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@umanitoba.ca"
                  className="mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#385E9D]"
                />
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <label className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#706963]">
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-[10px] font-semibold text-[#385E9D] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <input
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#385E9D]"
                />
              </div>

              <button
                type="submit"
                className="mt-7 w-full rounded-full bg-[#385E9D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#27456F]"
              >
                Sign in →
              </button>
            </form>

            <div className="border-t border-[#E7E1DB] bg-[#FAF9F7] px-7 py-5">
              <p className="text-center text-[10px] leading-5 text-[#928980]">
                SenSys Hub is restricted to
                authorized SenSys Lab members.
                There is no public registration.
              </p>
            </div>
          </section>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-xs font-semibold text-[#385E9D]"
            >
              ← Public SenSys Lab website
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}