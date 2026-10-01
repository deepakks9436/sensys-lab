import {
  redirect,
} from "next/navigation";

import {
  createClient,
} from "../../lib/supabase/server";

import {
  completeOnboarding,
} from "./actions";

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
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
    redirect("/login");
  }

  const {
    data: profile,
  } = await supabase
    .from("profiles")
    .select(
      `
      full_name,
      email,
      role,
      is_active,
      onboarding_complete,
      phone,
      short_bio,
      orcid,
      google_scholar_url,
      linkedin_url
      `
    )
    .eq(
      "id",
      user.id
    )
    .maybeSingle();

  if (
    !profile ||
    !profile.is_active
  ) {
    redirect(
      "/login?error=Your%20SenSys%20Hub%20account%20is%20not%20active."
    );
  }

  if (
    profile.onboarding_complete
  ) {
    redirect("/hub");
  }

  const {
    data: student,
  } =
    profile.role ===
    "student"
      ? await supabase
          .from("students")
          .select(
            "programme, research_area, current_priority"
          )
          .eq(
            "user_id",
            user.id
          )
          .maybeSingle()
      : {
          data:
            null,
        };

  return (
    <main className="min-h-screen bg-[#F6F4F1] px-5 py-10 text-[#201B17]">
      <div className="mx-auto max-w-[820px]">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#385E9D] bg-white">
            <div className="h-3 w-3 rounded-full bg-[#F2A900]" />
          </div>

          <div>
            <p className="text-xl font-medium tracking-[-0.03em]">
              SenSys Hub
            </p>

            <p className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.24em] text-[#928980]">
              First-time Setup
            </p>
          </div>
        </div>

        <div className="mt-9">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
            Welcome to SenSys
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-[-0.04em] md:text-5xl">
            Complete your profile.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#706963]">
            Your Hub account is ready. Add the personal and research details
            you want displayed inside the internal workspace. Administrative
            access and formal programme fields remain managed by SenSys
            administrators.
          </p>
        </div>

        {query.error && (
          <div className="mt-7 border-l-[3px] border-[#A23B35] bg-[#FBE7E5] px-5 py-4 text-xs text-[#A23B35]">
            {query.error}
          </div>
        )}

        <form
          action={
            completeOnboarding
          }
          className="mt-8 overflow-hidden border border-[#DDD6CF] bg-white"
        >
          <div className="border-b border-[#E7E1DB] bg-[#FAF9F7] px-6 py-5">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#385E9D]">
              Your Details
            </p>

            <h2 className="mt-1 text-xl font-bold">
              Profile information
            </h2>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]">
                Full Name *
              </label>

              <input
                name="full_name"
                required
                defaultValue={
                  profile.full_name ??
                  ""
                }
                className="mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none focus:border-[#385E9D]"
              />
            </div>

            <div>
              <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]">
                Email
              </label>

              <input
                value={
                  profile.email ??
                  user.email ??
                  ""
                }
                disabled
                className="mt-2 w-full border border-[#D8D0C7] bg-[#F3F0EC] px-4 py-3 text-sm"
              />
            </div>

            <div>
              <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]">
                Phone
              </label>

              <input
                name="phone"
                defaultValue={
                  profile.phone ??
                  ""
                }
                className="mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none focus:border-[#385E9D]"
              />
            </div>

            {profile.role ===
              "student" && (
              <>
                <div>
                  <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]">
                    Programme
                  </label>

                  <input
                    value={
                      student?.programme ??
                      ""
                    }
                    disabled
                    className="mt-2 w-full border border-[#D8D0C7] bg-[#F3F0EC] px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]">
                    Research Area
                  </label>

                  <input
                    name="research_area"
                    defaultValue={
                      student?.research_area ??
                      ""
                    }
                    placeholder="e.g. Intelligent Diagnostics"
                    className="mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none focus:border-[#385E9D]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]">
                    Current Research Priority
                  </label>

                  <textarea
                    name="current_priority"
                    rows={3}
                    defaultValue={
                      student?.current_priority ??
                      ""
                    }
                    className="mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none focus:border-[#385E9D]"
                  />
                </div>
              </>
            )}

            <div className="md:col-span-2">
              <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]">
                Short Bio
              </label>

              <textarea
                name="short_bio"
                rows={4}
                defaultValue={
                  profile.short_bio ??
                  ""
                }
                placeholder="A short internal research bio..."
                className="mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none focus:border-[#385E9D]"
              />
            </div>

            <div>
              <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]">
                ORCID
              </label>

              <input
                name="orcid"
                defaultValue={
                  profile.orcid ??
                  ""
                }
                placeholder="0000-0000-0000-0000"
                className="mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none focus:border-[#385E9D]"
              />
            </div>

            <div>
              <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]">
                LinkedIn
              </label>

              <input
                name="linkedin_url"
                type="url"
                defaultValue={
                  profile.linkedin_url ??
                  ""
                }
                placeholder="https://linkedin.com/in/..."
                className="mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none focus:border-[#385E9D]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]">
                Google Scholar
              </label>

              <input
                name="google_scholar_url"
                type="url"
                defaultValue={
                  profile.google_scholar_url ??
                  ""
                }
                placeholder="https://scholar.google.com/..."
                className="mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none focus:border-[#385E9D]"
              />
            </div>
          </div>

          <div className="flex justify-end border-t border-[#E7E1DB] bg-[#FAF9F7] px-6 py-5">
            <button
              type="submit"
              className="rounded-full bg-[#385E9D] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#27456F]"
            >
              Enter SenSys Hub →
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
