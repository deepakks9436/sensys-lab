import Link from "next/link";



import {

  requireAdmin,

  roleLabel,

  type HubRole,

} from "../../../lib/hub/auth";



import {

  createAdminClient,

} from "../../../lib/supabase/admin";



import {

  updateTeamAccess,

} from "./actions";



const roles: HubRole[] = [

  "admin",

  "research_manager",

  "lab_manager",

  "student",

  "member",

];



function statusPill(

  confirmed: boolean,

  active: boolean

) {

  if (!active) {

    return {

      label:

        "Disabled",

      className:

        "bg-[#FBE7E5] text-[#A23B35]",

    };

  }



  if (!confirmed) {

    return {

      label:

        "Invited",

      className:

        "bg-[#FFF4D9] text-[#8A6200]",

    };

  }



  return {

    label:

      "Active",

    className:

      "bg-[#E8F4EC] text-[#2D6A45]",

  };

}



export default async function TeamAccessPage({

  searchParams,

}: {

  searchParams: Promise<{

    q?: string;

    role?: string;

    error?: string;

    message?: string;

  }>;

}) {

  await requireAdmin();



  const query =

    await searchParams;



  const admin =

    createAdminClient();



  const [

    profilesResult,

    studentsResult,

    usersResult,

  ] = await Promise.all([

    admin

      .from("profiles")

      .select(

        `

        id,

        full_name,

        email,

        role,

        is_active,

        onboarding_complete,

        invited_at

        `

      )

      .order(

        "full_name",

        {

          ascending:

            true,

        }

      ),



    admin

      .from("students")

      .select(

        `

        id,

        user_id,

        full_name,

        programme,

        research_area,

        status

        `

      )

      .order(

        "full_name",

        {

          ascending:

            true,

        }

      ),



    admin.auth.admin

      .listUsers({

        page: 1,

        perPage: 1000,

      }),

  ]);



  const profiles =

    profilesResult.data ??

    [];



  const students =

    studentsResult.data ??

    [];



  const authUsers =

    usersResult.data?.users ??

    [];



  const authById =

    new Map(

      authUsers.map(

        (user) => [

          user.id,

          user,

        ]

      )

    );



  const studentByUserId =

    new Map(

      students

        .filter(

          (student) =>

            Boolean(

              student.user_id

            )

        )

        .map(

          (student) => [

            student.user_id as string,

            student,

          ]

        )

    );



  const search =

    (

      query.q ??

      ""

    )

      .trim()

      .toLowerCase();



  const roleFilter =

    query.role ??

    "all";



  const visibleProfiles =

    profiles.filter(

      (profile) => {

        const matchesSearch =

          !search ||

          (

            profile.full_name ??

            ""

          )

            .toLowerCase()

            .includes(

              search

            ) ||

          (

            profile.email ??

            ""

          )

            .toLowerCase()

            .includes(

              search

            );



        const matchesRole =

          roleFilter === "all" ||

          profile.role ===

            roleFilter;



        return (

          matchesSearch &&

          matchesRole

        );

      }

    );



  const unlinkedStudents =

    students.filter(

      (student) =>

        !student.user_id

    );



  return (

    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">

      <div className="mx-auto max-w-[1200px]">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">

              Administration

            </p>



            <h1 className="mt-3 text-4xl font-bold tracking-[-0.04em] md:text-5xl">

              Team Access.

            </h1>



            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#706963]">

              Invite SenSys members, see account status, link graduate

              researcher records, and manage Hub roles and access.

            </p>

          </div>



          <Link

            href="/hub/team/invite"

            className="inline-flex w-fit items-center justify-center rounded-full bg-[#385E9D] px-6 py-3 text-xs font-semibold !text-white transition hover:bg-[#27456F]"

          >

            <span className="text-white">+ Invite Team Member</span>

          </Link>

        </div>



        {query.error && (

          <div className="mt-7 border-l-[3px] border-[#A23B35] bg-[#FBE7E5] px-5 py-4 text-xs text-[#A23B35]">

            {query.error}

          </div>

        )}



        {query.message && (

          <div className="mt-7 border-l-[3px] border-[#2D6A45] bg-[#E8F4EC] px-5 py-4 text-xs text-[#2D6A45]">

            {query.message}

          </div>

        )}



        <section className="mt-8 border border-[#DDD6CF] bg-white">

          <div className="border-b border-[#E7E1DB] bg-[#FAF9F7] p-5">

            <form

              method="get"

              className="grid gap-3 sm:grid-cols-[1fr_220px_auto]"

            >

              <input

                type="search"

                name="q"

                defaultValue={

                  query.q ??

                  ""

                }

                placeholder="Search name or email"

                className="border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none focus:border-[#385E9D]"

              />



              <select

                name="role"

                defaultValue={

                  roleFilter

                }

                className="border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none focus:border-[#385E9D]"

              >

                <option value="all">

                  All roles

                </option>



                {roles.map(

                  (role) => (

                    <option

                      key={role}

                      value={role}

                    >

                      {roleLabel(

                        role

                      )}

                    </option>

                  )

                )}

              </select>



              <button

                type="submit"

                className="rounded-full border border-[#385E9D] px-5 py-3 text-xs font-semibold text-[#385E9D]"

              >

                Filter

              </button>

            </form>

          </div>



          <div className="divide-y divide-[#EEE9E4]">

            {visibleProfiles.length ===

            0 ? (

              <div className="p-8 text-sm text-[#837A72]">

                No Hub accounts match the current filter.

              </div>

            ) : (

              visibleProfiles.map(

                (profile) => {

                  const authUser =

                    authById.get(

                      profile.id

                    );



                  const researcher =

                    studentByUserId.get(

                      profile.id

                    );



                  const status =

                    statusPill(

                      Boolean(

                        authUser?.email_confirmed_at

                      ),

                      Boolean(

                        profile.is_active

                      )

                    );



                  const action =

                    updateTeamAccess.bind(

                      null,

                      profile.id

                    );



                  return (

                    <div

                      key={

                        profile.id

                      }

                      className="grid gap-5 p-6 lg:grid-cols-[1fr_1fr_360px] lg:items-start"

                    >

                      <div>

                        <div className="flex flex-wrap items-center gap-2">

                          <h2 className="text-base font-semibold">

                            {profile.full_name ||

                              profile.email}

                          </h2>



                          <span

                            className={`rounded-full px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.12em] ${status.className}`}

                          >

                            {

                              status.label

                            }

                          </span>

                        </div>



                        <p className="mt-2 break-all text-xs text-[#706963]">

                          {

                            profile.email

                          }

                        </p>



                        <p className="mt-3 text-[10px] leading-5 text-[#928980]">

                          {profile.onboarding_complete

                            ? "Onboarding complete"

                            : "Onboarding pending"}

                        </p>

                      </div>



                      <div className="grid gap-3 text-xs">

                        <div>

                          <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#928980]">

                            Research Profile

                          </p>



                          <p className="mt-1 font-semibold">

                            {researcher

                              ? `${researcher.programme ?? "Researcher"} · Linked`

                              : "Not linked"}

                          </p>



                          {researcher?.research_area && (

                            <p className="mt-1 text-[#706963]">

                              {

                                researcher.research_area

                              }

                            </p>

                          )}

                        </div>



                        <div>

                          <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#928980]">

                            Last Sign-in

                          </p>



                          <p className="mt-1 text-[#706963]">

                            {authUser?.last_sign_in_at

                              ? new Intl.DateTimeFormat(

                                  "en-CA",

                                  {

                                    dateStyle:

                                      "medium",

                                  }

                                ).format(

                                  new Date(

                                    authUser.last_sign_in_at

                                  )

                                )

                              : "Not yet"}

                          </p>

                        </div>

                      </div>



                      <form

                        action={

                          action

                        }

                        className="border border-[#E7E1DB] bg-[#FAF9F7] p-4"

                      >

                        <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#385E9D]">

                          Access

                        </p>



                        <select

                          name="role"

                          defaultValue={

                            profile.role

                          }

                          className="mt-3 w-full border border-[#D8D0C7] bg-white px-3 py-2.5 text-xs outline-none focus:border-[#385E9D]"

                        >

                          {roles.map(

                            (role) => (

                              <option

                                key={

                                  role

                                }

                                value={

                                  role

                                }

                              >

                                {roleLabel(

                                  role

                                )}

                              </option>

                            )

                          )}

                        </select>



                        <label className="mt-4 flex items-center gap-3 text-xs">

                          <input

                            type="checkbox"

                            name="is_active"

                            defaultChecked={

                              profile.is_active

                            }

                            className="h-4 w-4 accent-[#385E9D]"

                          />



                          Active Hub access

                        </label>



                        <button

                          type="submit"

                          className="mt-4 w-full rounded-full bg-[#203650] px-4 py-2.5 text-xs font-semibold !text-white transition hover:bg-[#15283D]"

                        >

                          Save Access

                        </button>

                      </form>

                    </div>

                  );

                }

              )

            )}

          </div>

        </section>



        <section className="mt-8 border border-[#DDD6CF] bg-white">

          <div className="border-b border-[#E7E1DB] bg-[#FAF9F7] px-6 py-5">

            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#385E9D]">

              Research Profiles Without Hub Access

            </p>



            <h2 className="mt-1 text-xl font-bold">

              Ready to invite

            </h2>

          </div>



          {unlinkedStudents.length ===

          0 ? (

            <div className="p-6 text-sm text-[#837A72]">

              Every research profile is currently linked to a Hub account.

            </div>

          ) : (

            <div className="divide-y divide-[#EEE9E4]">

              {unlinkedStudents.map(

                (student) => (

                  <div

                    key={

                      student.id

                    }

                    className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"

                  >

                    <div>

                      <p className="text-sm font-semibold">

                        {

                          student.full_name

                        }

                      </p>



                      <p className="mt-1 text-xs text-[#706963]">

                        {student.programme ??

                          "Researcher"}

                        {student.research_area

                          ? ` · ${student.research_area}`

                          : ""}

                      </p>

                    </div>



                    <Link

                      href={`/hub/team/invite?studentId=${student.id}`}

                      className="inline-flex w-fit items-center justify-center rounded-full border border-[#385E9D] bg-white px-5 py-2.5 text-xs font-semibold text-[#385E9D] transition hover:bg-[#EEF2F8]"

                    >

                      Invite to Hub →

                    </Link>

                  </div>

                )

              )}

            </div>

          )}

        </section>

      </div>

    </main>

  );

}
