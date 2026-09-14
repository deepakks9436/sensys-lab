import Link from "next/link";

import { requestPasswordReset } from "./actions";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
    sent?: string;
  }>;
}) {
  const query =
    await searchParams;

  const sent =
    query.sent === "1";

  return (
    <main className="min-h-screen bg-[#F6F4F1] px-5 py-12 text-[#201B17]">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-[1200px] items-center justify-center">
        <div className="w-full max-w-[430px]">
          <div className="mb-8 flex items-center justify-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#385E9D] bg-white">
              <div className="h-3 w-3 rounded-full bg-[#F2A900]" />
            </div>

            <div>
              <p className="text-xl font-medium tracking-[-0.03em]">
                SenSys Hub
              </p>

              <p className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.24em] text-[#928980]">
                Account Recovery
              </p>
            </div>
          </div>

          <section className="border border-[#DDD6CF] bg-white">
            <div className="border-b border-[#E7E1DB] px-7 py-7">
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
                Password Recovery
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-[-0.035em]">
                Forgot your password?
              </h1>

              <p className="mt-3 text-sm leading-6 text-[#706963]">
                Enter the email associated
                with your SenSys Hub account.
              </p>
            </div>

            {sent ? (
              <div className="p-7">
                <div className="border-l-[3px] border-[#2D6A45] bg-[#E8F4EC] px-5 py-4">
                  <p className="text-sm font-semibold text-[#2D6A45]">
                    Check your email.
                  </p>

                  <p className="mt-2 text-xs leading-6 text-[#645D57]">
                    If an account exists for
                    that email address, a
                    password-reset message has
                    been sent.
                  </p>
                </div>

                <Link
                  href="/login"
                  className="mt-6 inline-flex text-xs font-semibold text-[#385E9D]"
                >
                  ← Return to sign in
                </Link>
              </div>
            ) : (
              <form
                action={
                  requestPasswordReset
                }
                className="p-7"
              >
                {query.error && (
                  <div className="mb-5 border-l-[3px] border-[#A23B35] bg-[#FBE7E5] px-4 py-3 text-xs text-[#A23B35]">
                    {query.error}
                  </div>
                )}

                <label className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#706963]">
                  Email Address
                </label>

                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@umanitoba.ca"
                  className="mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none focus:border-[#385E9D]"
                />

                <button
                  type="submit"
                  className="mt-7 w-full rounded-full bg-[#385E9D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#27456F]"
                >
                  Send reset link →
                </button>

                <Link
                  href="/login"
                  className="mt-5 block text-center text-xs font-semibold text-[#385E9D]"
                >
                  ← Back to sign in
                </Link>
              </form>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}