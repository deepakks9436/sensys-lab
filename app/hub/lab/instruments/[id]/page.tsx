import Link from "next/link";
import { notFound } from "next/navigation";

import { createClient } from "../../../../../lib/supabase/server";

function statusClasses(
  status: string
) {
  if (status === "Available") {
    return "bg-[#E8F4EC] text-[#2D6A45]";
  }

  if (
    status === "Maintenance" ||
    status === "Calibration"
  ) {
    return "bg-[#FFF4D9] text-[#8A6200]";
  }

  if (
    status === "Out of Service"
  ) {
    return "bg-[#FBE7E5] text-[#A23B35]";
  }

  if (status === "In Use") {
    return "bg-[#EEF2F8] text-[#385E9D]";
  }

  return "bg-[#EEEAE5] text-[#706963]";
}

export default async function InstrumentPage({
  params,
  searchParams,
}: {
  params: Promise<{
    id: string;
  }>;

  searchParams: Promise<{
    booked?: string;
  }>;
}) {
  const { id } = await params;

  const query =
    await searchParams;

  const supabase =
    await createClient();

  const {
    data: { user },
  } =
    await supabase.auth.getUser();

  if (!user) {
    notFound();
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
    !profile.is_active
  ) {
    notFound();
  }

  const canManage =
    [
      "admin",
      "lab_manager",
    ].includes(
      profile.role
    );

  const {
    data: instrument,
  } =
    await supabase
      .from("instruments")
      .select("*")
      .eq("id", id)
      .maybeSingle();

  if (!instrument) {
    notFound();
  }

  const {
    data: authorization,
  } =
    await supabase
      .from(
        "instrument_authorizations"
      )
      .select(
        `
        status,
        training_date,
        expiry_date,
        trained_by
        `
      )
      .eq(
        "instrument_id",
        id
      )
      .eq(
        "user_id",
        user.id
      )
      .maybeSingle();

  const today = new Date()
    .toISOString()
    .slice(0, 10);

  const realAuthorizationValid =
    authorization?.status ===
      "Authorized" &&
    (!authorization.expiry_date ||
      authorization.expiry_date >=
        today);

  const authorized =
    !instrument.training_required ||
    canManage ||
    realAuthorizationValid;

 const canBook =
  instrument.booking_required &&
  instrument.status ===
    "Available" &&
  authorized;

  const {
    data: bookings,
  } =
    await supabase
      .from(
        "instrument_bookings"
      )
      .select(
        `
        id,
        booking_date,
        start_time,
        end_time,
        status,
        purpose
        `
      )
      .eq(
        "instrument_id",
        id
      )
      .gte(
        "booking_date",
        today
      )
      .in(
        "status",
        [
          "Pending",
          "Confirmed",
        ]
      )
      .order("booking_date")
      .limit(10);

  const {
    data: trainingRecords,
  } = canManage
    ? await supabase
        .from(
          "instrument_authorizations"
        )
        .select(
          "id, status"
        )
        .eq(
          "instrument_id",
          id
        )
    : {
        data: null,
      };

  const authorizedUsers =
    (
      trainingRecords ?? []
    ).filter(
      (record) =>
        record.status ===
        "Authorized"
    ).length;

  const calibrationDue =
    instrument.next_calibration_date &&
    instrument.next_calibration_date <=
      today;

  const maintenanceDue =
    instrument.next_maintenance_date &&
    instrument.next_maintenance_date <=
      today;

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[1200px]">
        {/* TOP */}

        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/hub/lab"
            className="text-xs font-semibold text-[#385E9D]"
          >
            ← Lab & Instruments
          </Link>

          <div className="flex flex-wrap gap-2">
            {canManage && (
              <>
                <Link
                  href={`/hub/lab/instruments/${id}/training`}
                  className="rounded-full border border-[#385E9D] bg-white px-5 py-2.5 text-xs font-semibold text-[#385E9D]"
                >
                  Manage Training
                </Link>

                <Link
                  href={`/hub/lab/instruments/${id}/edit`}
                  className="rounded-full border border-[#D8D0C7] bg-white px-5 py-2.5 text-xs font-semibold"
                >
                  Edit Instrument
                </Link>
              </>
            )}

            {canBook && (
              <Link
                href={`/hub/lab/instruments/${id}/book`}
                className="rounded-full bg-[#385E9D] px-5 py-2.5 text-xs font-semibold text-white"
              >
                Book Instrument
              </Link>
            )}
          </div>
        </div>

        {query.booked === "1" && (
          <div className="mt-6 border-l-[3px] border-[#2D6A45] bg-[#E8F4EC] px-5 py-4 text-xs text-[#2D6A45]">
            Instrument booking confirmed.
          </div>
        )}

        {/* HEADER */}

        <section className="mt-6 border border-[#DDD6CF] bg-white p-7">
          <div className="flex flex-col justify-between gap-8 lg:flex-row">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-[9px] font-bold ${statusClasses(
                    instrument.status
                  )}`}
                >
                  {instrument.status}
                </span>

                <span className="text-xs text-[#928980]">
                  {instrument.category ||
                    "Instrument"}
                </span>
              </div>

              <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em] md:text-5xl">
                {instrument.name}
              </h1>

              <p className="mt-3 text-sm text-[#706963]">
                {instrument.manufacturer ||
                  "Manufacturer not specified"}

                {instrument.model
                  ? ` · ${instrument.model}`
                  : ""}
              </p>

              {instrument.serial_number && (
                <p className="mt-2 text-[10px] text-[#928980]">
                  Serial No.{" "}
                  {
                    instrument.serial_number
                  }
                </p>
              )}

              {instrument.description && (
                <p className="mt-5 max-w-2xl text-sm leading-7 text-[#645D57]">
                  {
                    instrument.description
                  }
                </p>
              )}
            </div>

            <div className="min-w-[260px] border-t border-[#EEE9E4] pt-6 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
              <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#928980]">
                Location
              </p>

              <p className="mt-2 text-sm font-semibold">
                {instrument.location ||
                  "Not specified"}
              </p>

              <p className="mt-5 text-[8px] font-bold uppercase tracking-[0.18em] text-[#928980]">
                Responsible Person
              </p>

              <p className="mt-2 text-sm">
                {instrument.responsible_person ||
                  "Not assigned"}
              </p>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.65fr]">
          <div className="space-y-8">
            {/* TRAINING */}

            <section className="border border-[#DDD6CF] bg-white">
              <div className="flex items-center justify-between border-b border-[#E7E1DB] px-6 py-5">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
                    Access
                  </p>

                  <h2 className="mt-1 text-xl font-bold">
                    Training & Booking
                  </h2>
                </div>

                {canManage && (
                  <Link
                    href={`/hub/lab/instruments/${id}/training`}
                    className="text-[10px] font-semibold text-[#385E9D]"
                  >
                    Manage →
                  </Link>
                )}
              </div>

              <div className="grid gap-5 p-6 sm:grid-cols-2">
                <div>
                  <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
                    Training Requirement
                  </p>

                  <p className="mt-2 text-sm font-semibold">
                    {instrument.training_required
                      ? "Training required"
                      : "Training not required"}
                  </p>
                </div>

                <div>
                  <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
                    {canManage
                      ? "Access"
                      : "My Authorization"}
                  </p>

                  {canManage ? (
                    <>
                      <p className="mt-2 text-sm font-semibold text-[#385E9D]">
                        Management Access
                      </p>

                      <p className="mt-1 text-[10px] text-[#928980]">
                        Training restriction
                        may be overridden for
                        laboratory management.
                      </p>
                    </>
                  ) : (
                    <>
                      <p
                        className={`mt-2 text-sm font-semibold ${
                          authorized
                            ? "text-[#2D6A45]"
                            : "text-[#A23B35]"
                        }`}
                      >
                        {authorized
                          ? "Authorized"
                          : "Training required"}
                      </p>

                      {authorization?.training_date && (
                        <p className="mt-1 text-[10px] text-[#928980]">
                          Trained{" "}
                          {
                            authorization.training_date
                          }
                        </p>
                      )}

                      {authorization?.expiry_date && (
                        <p className="mt-1 text-[10px] text-[#928980]">
                          Valid until{" "}
                          {
                            authorization.expiry_date
                          }
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>

              {!authorized && (
                <div className="mx-6 mb-6 border-l-[3px] border-[#F2A900] bg-[#FFF9EA] px-4 py-3">
                  <p className="text-xs leading-6 text-[#645D57]">
                    Training and authorization
                    are required before this
                    instrument can be booked.
                  </p>
                </div>
              )}

              {canManage && (
                <div className="mx-6 mb-6 border border-[#E7E1DB] bg-[#FAF9F7] px-4 py-4">
                  <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
                    Authorized Users
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {authorizedUsers}
                  </p>
                </div>
              )}
            </section>

            {/* DOCUMENTS */}

            <section className="border border-[#DDD6CF] bg-white">
              <div className="border-b border-[#E7E1DB] px-6 py-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
                  Documentation
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  SOP & Manual
                </h2>
              </div>

              <div className="flex flex-wrap gap-3 p-6">
                {instrument.sop_url ? (
                  <a
                    href={
                      instrument.sop_url
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-[#385E9D] px-4 py-2 text-xs font-semibold text-[#385E9D]"
                  >
                    Open SOP ↗
                  </a>
                ) : (
                  <span className="text-xs text-[#928980]">
                    No SOP linked.
                  </span>
                )}

                {instrument.manual_url && (
                  <a
                    href={
                      instrument.manual_url
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-[#D8D0C7] px-4 py-2 text-xs font-semibold"
                  >
                    Instrument Manual ↗
                  </a>
                )}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            {/* SERVICE */}

            <section className="border border-[#DDD6CF] bg-white">
              <div className="border-b border-[#E7E1DB] px-6 py-5">
                <h2 className="text-lg font-bold">
                  Service Schedule
                </h2>
              </div>

              <div className="space-y-5 p-6">
                <div>
                  <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
                    Next Calibration
                  </p>

                  <p
                    className={`mt-2 text-sm ${
                      calibrationDue
                        ? "font-semibold text-[#A23B35]"
                        : ""
                    }`}
                  >
                    {instrument.next_calibration_date ||
                      "Not scheduled"}
                  </p>

                  {calibrationDue && (
                    <p className="mt-1 text-[9px] font-semibold text-[#A23B35]">
                      Calibration due
                    </p>
                  )}
                </div>

                <div>
                  <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
                    Next Maintenance
                  </p>

                  <p
                    className={`mt-2 text-sm ${
                      maintenanceDue
                        ? "font-semibold text-[#A23B35]"
                        : ""
                    }`}
                  >
                    {instrument.next_maintenance_date ||
                      "Not scheduled"}
                  </p>

                  {maintenanceDue && (
                    <p className="mt-1 text-[9px] font-semibold text-[#A23B35]">
                      Maintenance due
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* BOOKINGS */}

            <section className="border border-[#DDD6CF] bg-white">
              <div className="border-b border-[#E7E1DB] px-6 py-5">
                <h2 className="text-lg font-bold">
                  {canManage
                    ? "Upcoming Bookings"
                    : "My Bookings"}
                </h2>
              </div>

              {!bookings ||
              bookings.length === 0 ? (
                <div className="px-6 py-6 text-xs text-[#837A72]">
                  No upcoming bookings.
                </div>
              ) : (
                <div className="divide-y divide-[#EEE9E4]">
                  {bookings.map(
                    (booking) => (
                      <div
                        key={booking.id}
                        className="px-6 py-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold">
                            {
                              booking.booking_date
                            }
                          </p>

                          <span className="rounded-full bg-[#EEF2F8] px-2.5 py-1 text-[8px] font-bold text-[#385E9D]">
                            {
                              booking.status
                            }
                          </span>
                        </div>

                        <p className="mt-1 text-[10px] text-[#928980]">
                          {String(
                            booking.start_time
                          ).slice(0, 5)}
                          {" – "}
                          {String(
                            booking.end_time
                          ).slice(0, 5)}
                        </p>

                        {booking.purpose && (
                          <p className="mt-2 text-xs leading-5 text-[#645D57]">
                            {
                              booking.purpose
                            }
                          </p>
                        )}
                      </div>
                    )
                  )}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}