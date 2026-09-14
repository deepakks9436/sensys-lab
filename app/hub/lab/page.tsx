import Link from "next/link";

import { createClient } from "../../../lib/supabase/server";

function statusClasses(status: string) {
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
    status === "Out of Service" ||
    status === "In Use"
  ) {
    return "bg-[#FBE7E5] text-[#A23B35]";
  }

  return "bg-[#EEF2F8] text-[#385E9D]";
}

export default async function LabPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, is_active")
    .eq("id", user.id)
    .single();

  if (!profile || !profile.is_active) {
    return null;
  }

  const canManage = [
    "admin",
    "lab_manager",
  ].includes(profile.role);

  const isStudent =
    profile.role === "student";

  /* ========================================================
     INSTRUMENTS
  ======================================================== */

  const { data: instruments } = await supabase
    .from("instruments")
    .select("*")
    .order("name");

  const instrumentList =
    instruments ?? [];

  const availableCount =
    instrumentList.filter(
      (instrument) =>
        instrument.status === "Available"
    ).length;

  /*
   * Everything except Available and Archived
   * is operationally unavailable.
   */
  const unavailableCount =
    instrumentList.filter(
      (instrument) =>
        instrument.status !== "Available" &&
        instrument.status !== "Archived"
    ).length;

  const today = new Date()
    .toISOString()
    .slice(0, 10);

  const calibrationDue =
    instrumentList.filter(
      (instrument) =>
        instrument.next_calibration_date &&
        instrument.next_calibration_date <= today &&
        instrument.status !== "Archived"
    ).length;

  /* ========================================================
     BOOKINGS
  ======================================================== */

  const { data: bookings } = await supabase
    .from("instrument_bookings")
    .select(
      `
      id,
      user_id,
      booking_date,
      start_time,
      end_time,
      status,
      purpose,
      instrument_id,
      instruments (
        id,
        name
      )
      `
    )
    .gte("booking_date", today)
    .in("status", [
      "Pending",
      "Confirmed",
    ])
    .order("booking_date", {
      ascending: true,
    })
    .order("start_time", {
      ascending: true,
    })
    .limit(10);

  const bookingList =
    bookings ?? [];

  /* ========================================================
     PAGE
  ======================================================== */

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[1320px]">
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
              Laboratory Operations
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-[-0.04em] md:text-5xl">
              Lab & Instruments.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#706963]">
              Instrument availability,
              live booking, training,
              calibration and laboratory
              operational information.
            </p>
          </div>

          {canManage && (
            <Link
              href="/hub/lab/instruments/new"
              className="inline-flex self-start rounded-full bg-[#385E9D] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#27456F] md:self-auto"
            >
              + Add Instrument
            </Link>
          )}
        </div>

        {/* ================================================= */}
        {/* KPI CARDS */}
        {/* ================================================= */}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="border border-[#DDD6CF] bg-white p-5">
            <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#928980]">
              Instruments
            </p>

            <p className="mt-3 text-3xl font-bold">
              {instrumentList.length}
            </p>
          </div>

          <div className="border border-[#DDD6CF] bg-white p-5">
            <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#2D6A45]">
              Available
            </p>

            <p className="mt-3 text-3xl font-bold">
              {availableCount}
            </p>
          </div>

          <div className="border border-[#DDD6CF] bg-white p-5">
            <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#A23B35]">
              Unavailable
            </p>

            <p className="mt-3 text-3xl font-bold">
              {unavailableCount}
            </p>
          </div>

          <div className="border border-[#DDD6CF] bg-white p-5">
            <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#8A6200]">
              Calibration Due
            </p>

            <p className="mt-3 text-3xl font-bold">
              {calibrationDue}
            </p>
          </div>
        </div>

        {/* ================================================= */}
        {/* LIVE SCHEDULE */}
        {/* ================================================= */}

        <section className="mt-8 bg-[#203650] px-6 py-6 md:px-7">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#F2A900]">
                Live Instrument Schedule
              </p>

              <h2 className="mt-2 text-xl font-bold text-white">
                See availability before booking.
              </h2>

              <p className="mt-2 max-w-2xl text-xs leading-6 text-white/70">
                View confirmed instrument
                bookings, booked users,
                time slots and available
                periods across the lab.
              </p>
            </div>

            <Link
              href="/hub/lab/schedule"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-6 py-3 text-xs font-semibold transition hover:bg-[#F2A900]"
              style={{
                color: "#203650",
              }}
            >
              <span
                style={{
                  color: "#203650",
                }}
              >
                Open Live Schedule →
              </span>
            </Link>
          </div>
        </section>

        {/* ================================================= */}
        {/* INSTRUMENT REGISTER */}
        {/* ================================================= */}

        <section className="mt-8 border border-[#DDD6CF] bg-white">
          <div className="flex flex-col justify-between gap-4 border-b border-[#E7E1DB] px-6 py-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
                Instrument Register
              </p>

              <h2 className="mt-1 text-xl font-bold">
                Laboratory Equipment
              </h2>
            </div>

            <Link
              href="/hub/lab/schedule"
              className="text-xs font-semibold text-[#385E9D]"
            >
              View schedule →
            </Link>
          </div>

          {instrumentList.length === 0 ? (
            <div className="px-6 py-12 text-sm text-[#837A72]">
              No instruments have been
              added yet.
            </div>
          ) : (
            <div className="divide-y divide-[#EEE9E4]">
              {instrumentList.map(
                (instrument) => (
                  <Link
                    key={instrument.id}
                    href={`/hub/lab/instruments/${instrument.id}`}
                    className="grid gap-5 px-6 py-5 transition hover:bg-[#FAF9F7] md:grid-cols-[1.3fr_0.75fr_0.65fr]"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold">
                          {instrument.name}
                        </p>

                        <span
                          className={`rounded-full px-2.5 py-1 text-[8px] font-bold ${statusClasses(
                            instrument.status
                          )}`}
                        >
                          {instrument.status}
                        </span>
                      </div>

                      <p className="mt-2 text-[10px] text-[#928980]">
                        {instrument.category ||
                          "Instrument"}

                        {instrument.manufacturer
                          ? ` · ${instrument.manufacturer}`
                          : ""}

                        {instrument.model
                          ? ` ${instrument.model}`
                          : ""}
                      </p>
                    </div>

                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
                        Location
                      </p>

                      <p className="mt-2 text-xs">
                        {instrument.location ||
                          "Not specified"}
                      </p>
                    </div>

                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
                        Access
                      </p>

                      <p className="mt-2 text-xs">
                        {instrument.training_required
                          ? "Training required"
                          : "No training required"}
                      </p>

                      <p className="mt-1 text-[9px] text-[#928980]">
                        {instrument.booking_required
                          ? "Booking required"
                          : "Booking not required"}
                      </p>
                    </div>
                  </Link>
                )
              )}
            </div>
          )}
        </section>

        {/* ================================================= */}
        {/* UPCOMING BOOKINGS */}
        {/* ================================================= */}

        <section className="mt-8 border border-[#DDD6CF] bg-white">
          <div className="flex flex-col justify-between gap-4 border-b border-[#E7E1DB] px-6 py-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
                Schedule
              </p>

              <h2 className="mt-1 text-xl font-bold">
                {canManage
                  ? "Upcoming Bookings"
                  : "My Upcoming Bookings"}
              </h2>
            </div>

            <Link
              href={
                canManage
                  ? "/hub/lab/schedule"
                  : "/hub/lab/schedule?view=mine"
              }
              className="text-xs font-semibold text-[#385E9D]"
            >
              {canManage
                ? "Full schedule →"
                : "My schedule →"}
            </Link>
          </div>

          {bookingList.length === 0 ? (
            <div className="px-6 py-10">
              <p className="text-sm text-[#837A72]">
                No upcoming bookings.
              </p>

              {!canManage && (
                <Link
                  href="/hub/lab/schedule"
                  className="mt-3 inline-flex text-xs font-semibold text-[#385E9D]"
                >
                  Check instrument
                  availability →
                </Link>
              )}
            </div>
          ) : (
            <div className="divide-y divide-[#EEE9E4]">
              {bookingList.map(
                (booking) => {
                  const instrument =
                    Array.isArray(
                      booking.instruments
                    )
                      ? booking.instruments[0]
                      : booking.instruments;

                  const isOwn =
                    booking.user_id === user.id;

                  const canOpen =
                    isOwn || canManage;

                  const row = (
                    <div className="grid gap-4 px-6 py-5 sm:grid-cols-[1.1fr_0.8fr_0.55fr] sm:items-center">
                      <div>
                        <p className="text-sm font-semibold">
                          {instrument?.name ||
                            "Instrument"}
                        </p>

                        {booking.purpose && (
                          <p className="mt-1 text-[10px] text-[#928980]">
                            {booking.purpose}
                          </p>
                        )}
                      </div>

                      <div>
                        <p className="text-xs text-[#706963]">
                          {booking.booking_date}
                          {" · "}
                          {String(
                            booking.start_time
                          ).slice(0, 5)}
                          {" – "}
                          {String(
                            booking.end_time
                          ).slice(0, 5)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-3 sm:justify-end">
                        <span className="rounded-full bg-[#EEF2F8] px-2.5 py-1 text-[8px] font-bold text-[#385E9D]">
                          {booking.status}
                        </span>

                        {canOpen && (
                          <span className="text-[9px] font-semibold text-[#385E9D]">
                            Manage →
                          </span>
                        )}
                      </div>
                    </div>
                  );

                  if (canOpen) {
                    return (
                      <Link
                        key={booking.id}
                        href={`/hub/lab/bookings/${booking.id}`}
                        className="block transition hover:bg-[#FAF9F7]"
                      >
                        {row}
                      </Link>
                    );
                  }

                  return (
                    <div key={booking.id}>
                      {row}
                    </div>
                  );
                }
              )}
            </div>
          )}
        </section>

        {/* ================================================= */}
        {/* STUDENT GUIDANCE */}
        {/* ================================================= */}

        {isStudent && (
          <div className="mt-8 border-l-[3px] border-[#F2A900] bg-[#FFF9EA] px-5 py-4">
            <p className="text-xs leading-6 text-[#645D57]">
              Use the Live Schedule
              before booking an
              instrument. Confirmed
              reservations block
              overlapping requests
              automatically.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}