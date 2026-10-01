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

  const inputClass =
    "mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#385E9D]";

  const labelClass =
    "text-[9px] font-bold uppercase tracking-[0.16em] text-[#706963]";

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[820px]">
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
            Manage your personal profile information. Hub role and account
            access remain controlled by SenSys administrators.
          </p>
        </div>

        <section className="mt-8 overflow-hidden border border-[#DDD6CF] bg-white">
          {query.error && (
            <div className="border-b border-[#E7E1DB] bg-[#FBE7E5] px-6 py-4 text-xs text-[#A23B35]">
              {query.error}
            </div>
          )}

          {query.message && (
            <div className="border-b border-[#E7E1DB] bg-[#E8F4EC] px-6 py-4 text-xs text-[#2D6A45]">
              {query.message}
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
            <div className="grid gap-6 p-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="full_name"
                  className={
                    labelClass
                  }
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
                  className={
                    inputClass
                  }
                />
              </div>

              <div>
                <p className={labelClass}>
                  Email
                </p>

                <div className="mt-2 border border-[#E7E1DB] bg-[#FAF9F7] p-4 text-sm font-semibold">
                  {
                    context.profile
                      .email
                  }
                </div>
              </div>

              <div>
                <p className={labelClass}>
                  Role
                </p>

                <div className="mt-2 border border-[#E7E1DB] bg-[#FAF9F7] p-4 text-sm font-semibold">
                  {roleLabel(
                    context.profile
                      .role
                  )}
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  Phone
                </label>

                <input
                  name="phone"
                  defaultValue={
                    context.profile
                      .phone
                  }
                  className={
                    inputClass
                  }
                />
              </div>

              <div>
                <label className={labelClass}>
                  ORCID
                </label>

                <input
                  name="orcid"
                  defaultValue={
                    context.profile
                      .orcid
                  }
                  className={
                    inputClass
                  }
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>
                  Short Bio
                </label>

                <textarea
                  name="short_bio"
                  rows={4}
                  defaultValue={
                    context.profile
                      .shortBio
                  }
                  className={
                    inputClass
                  }
                />
              </div>

              <div>
                <label className={labelClass}>
                  Google Scholar
                </label>

                <input
                  name="google_scholar_url"
                  type="url"
                  defaultValue={
                    context.profile
                      .googleScholarUrl
                  }
                  className={
                    inputClass
                  }
                />
              </div>

              <div>
                <label className={labelClass}>
                  LinkedIn
                </label>

                <input
                  name="linkedin_url"
                  type="url"
                  defaultValue={
                    context.profile
                      .linkedinUrl
                  }
                  className={
                    inputClass
                  }
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-[#E7E1DB] bg-[#FAF9F7] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[10px] leading-5 text-[#928980]">
                Email and role are managed through Team Access.
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
