import Link from "next/link";
import {
  notFound,
  redirect,
} from "next/navigation";

import { createClient } from "../../../../../../lib/supabase/server";

import {
  removeInstrumentAuthorization,
  saveInstrumentAuthorization,
  updateAuthorizationStatus,
} from "../../../actions";

function statusClasses(
  status: string
) {
  if (
    status === "Authorized"
  ) {
    return "bg-[#E8F4EC] text-[#2D6A45]";
  }

  if (
    status === "Suspended" ||
    status === "Expired"
  ) {
    return "bg-[#FBE7E5] text-[#A23B35]";
  }

  return "bg-[#FFF4D9] text-[#8A6200]";
}

export default async function TrainingManagementPage({
  params,
  searchParams,
}: {
  params: Promise<{
    id: string;
  }>;

  searchParams: Promise<{
    error?: string;
    saved?: string;
  }>;
}) {
  const { id } =
    await params;

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

  const { data: profile } =
    await supabase
      .from("profiles")
      .select(
        "role, is_active"
      )
      .eq("id", user.id)
      .single();

  if (
    !profile ||
    !profile.is_active ||
    ![
      "admin",
      "lab_manager",
    ].includes(
      profile.role
    )
  ) {
    redirect(
      `/hub/lab/instruments/${id}`
    );
  }

  const { data: instrument } =
    await supabase
      .from("instruments")
      .select(
        "id, name, training_required"
      )
      .eq("id", id)
      .maybeSingle();

  if (!instrument) {
    notFound();
  }

  const { data: profiles } =
    await supabase
      .from("profiles")
      .select(
        "id, full_name, email, role, is_active"
      )
      .eq("is_active", true)
      .order("full_name");

  const {
    data: authorizations,
  } =
    await supabase
      .from(
        "instrument_authorizations"
      )
      .select(
        `
        id,
        user_id,
        status,
        trained_by,
        training_date,
        expiry_date,
        notes,
        created_at
        `
      )
      .eq(
        "instrument_id",
        id
      )
      .order(
        "created_at",
        {
          ascending:
            false,
        }
      );

  const profileMap =
    new Map(
      (profiles ?? []).map(
        (item) => [
          item.id,
          item,
        ]
      )
    );

  const saveAction =
    saveInstrumentAuthorization.bind(
      null,
      id
    );

  const inputClass =
    "mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#385E9D]";

  const labelClass =
    "text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]";

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[1200px]">
        <Link
          href={`/hub/lab/instruments/${id}`}
          className="text-xs font-semibold text-[#385E9D]"
        >
          ← {instrument.name}
        </Link>

        <div className="mt-7">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
            Instrument Access
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-[-0.04em]">
            Training & Authorization.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#706963]">
            Record instrument training
            and control which SenSys Hub
            users are authorized to use{" "}
            {instrument.name}.
          </p>
        </div>

        {query.saved === "1" && (
          <div className="mt-7 border-l-[3px] border-[#2D6A45] bg-[#E8F4EC] px-5 py-4 text-xs text-[#2D6A45]">
            Authorization record saved.
          </div>
        )}

        {query.error && (
          <div className="mt-7 border-l-[3px] border-[#A23B35] bg-[#FBE7E5] px-5 py-4 text-xs text-[#A23B35]">
            {query.error}
          </div>
        )}

        <div className="mt-8 grid gap-8 xl:grid-cols-[0.72fr_1.28fr]">
          {/* ADD / UPDATE */}

          <section className="border border-[#DDD6CF] bg-white">
            <div className="border-b border-[#E7E1DB] px-6 py-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
                Access Control
              </p>

              <h2 className="mt-1 text-xl font-bold">
                Authorize User
              </h2>
            </div>

            <form
              action={saveAction}
              className="p-6"
            >
              <div>
                <label className={labelClass}>
                  Hub User *
                </label>

                <select
                  name="user_id"
                  required
                  defaultValue=""
                  className={inputClass}
                >
                  <option
                    value=""
                    disabled
                  >
                    Select user
                  </option>

                  {(profiles ?? []).map(
                    (item) => (
                      <option
                        key={item.id}
                        value={item.id}
                      >
                        {item.full_name ||
                          item.email}
                        {" — "}
                        {item.role}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="mt-5">
                <label className={labelClass}>
                  Authorization Status
                </label>

                <select
                  name="status"
                  defaultValue="Authorized"
                  className={inputClass}
                >
                  <option>
                    Pending
                  </option>

                  <option>
                    Authorized
                  </option>

                  <option>
                    Expired
                  </option>

                  <option>
                    Suspended
                  </option>
                </select>
              </div>

              <div className="mt-5">
                <label className={labelClass}>
                  Trained By
                </label>

                <input
                  name="trained_by"
                  placeholder="Trainer / instrument manager"
                  className={inputClass}
                />
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    Training Date
                  </label>

                  <input
                    name="training_date"
                    type="date"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Expiry Date
                  </label>

                  <input
                    name="expiry_date"
                    type="date"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className={labelClass}>
                  Notes
                </label>

                <textarea
                  name="notes"
                  rows={4}
                  placeholder="Training scope, restrictions, competency notes..."
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-full bg-[#385E9D] px-5 py-3 text-xs font-semibold text-white"
              >
                Save Authorization →
              </button>
            </form>
          </section>

          {/* EXISTING */}

          <section className="border border-[#DDD6CF] bg-white">
            <div className="border-b border-[#E7E1DB] px-6 py-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
                Training Register
              </p>

              <h2 className="mt-1 text-xl font-bold">
                Authorized Users
              </h2>
            </div>

            {!authorizations ||
            authorizations.length ===
              0 ? (
              <div className="px-6 py-12 text-sm text-[#837A72]">
                No training or authorization
                records have been added.
              </div>
            ) : (
              <div className="divide-y divide-[#EEE9E4]">
                {authorizations.map(
                  (authorization) => {
                    const person =
                      profileMap.get(
                        authorization.user_id
                      );

                    const updateAction =
                      updateAuthorizationStatus.bind(
                        null,
                        authorization.id,
                        id
                      );

                    const removeAction =
                      removeInstrumentAuthorization.bind(
                        null,
                        authorization.id,
                        id
                      );

                    return (
                      <div
                        key={
                          authorization.id
                        }
                        className="px-6 py-5"
                      >
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-sm font-semibold">
                                {person?.full_name ||
                                  person?.email ||
                                  "Hub User"}
                              </p>

                              <span
                                className={`rounded-full px-2.5 py-1 text-[8px] font-bold ${statusClasses(
                                  authorization.status
                                )}`}
                              >
                                {
                                  authorization.status
                                }
                              </span>
                            </div>

                            <p className="mt-1 text-[10px] text-[#928980]">
                              {person?.email ??
                                ""}
                            </p>

                            <div className="mt-4 grid gap-x-8 gap-y-3 text-xs sm:grid-cols-2">
                              <div>
                                <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
                                  Training Date
                                </p>

                                <p className="mt-1">
                                  {authorization.training_date ||
                                    "Not recorded"}
                                </p>
                              </div>

                              <div>
                                <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
                                  Expiry
                                </p>

                                <p className="mt-1">
                                  {authorization.expiry_date ||
                                    "No expiry"}
                                </p>
                              </div>

                              <div>
                                <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
                                  Trained By
                                </p>

                                <p className="mt-1">
                                  {authorization.trained_by ||
                                    "Not recorded"}
                                </p>
                              </div>
                            </div>

                            {authorization.notes && (
                              <p className="mt-4 whitespace-pre-line text-xs leading-6 text-[#706963]">
                                {
                                  authorization.notes
                                }
                              </p>
                            )}
                          </div>

                          <div className="min-w-[180px]">
                            <form
                              action={
                                updateAction
                              }
                            >
                              <select
                                name="status"
                                defaultValue={
                                  authorization.status
                                }
                                className="w-full border border-[#D8D0C7] bg-white px-3 py-2 text-xs"
                              >
                                <option>
                                  Pending
                                </option>

                                <option>
                                  Authorized
                                </option>

                                <option>
                                  Expired
                                </option>

                                <option>
                                  Suspended
                                </option>
                              </select>

                              <button
                                type="submit"
                                className="mt-2 w-full rounded-full border border-[#385E9D] px-4 py-2 text-[10px] font-semibold text-[#385E9D]"
                              >
                                Update Status
                              </button>
                            </form>

                            <form
                              action={
                                removeAction
                              }
                            >
                              <button
                                type="submit"
                                className="mt-2 w-full px-4 py-2 text-[10px] font-semibold text-[#A23B35]"
                              >
                                Remove Record
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}