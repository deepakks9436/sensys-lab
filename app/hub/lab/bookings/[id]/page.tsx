import Link from "next/link";
import {
  notFound,
} from "next/navigation";

import { createClient } from "../../../../../lib/supabase/server";

import { cancelInstrumentBooking } from "../../actions";

export default async function BookingDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{
    id: string;
  }>;

  searchParams: Promise<{
    created?: string;
    updated?: string;
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
    notFound();
  }

  const {
    data: profile,
  } =
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
    data: booking,
  } =
    await supabase
      .from(
        "instrument_bookings"
      )
      .select(
        `
        id,
        instrument_id,
        user_id,
        booking_date,
        start_time,
        end_time,
        purpose,
        status,
        notes,
        created_at,
        instruments (
          id,
          name,
          location,
          responsible_person
        )
        `
      )
      .eq("id", id)
      .maybeSingle();

  if (!booking) {
    notFound();
  }

  const isOwner =
    booking.user_id ===
    user.id;

  if (
    !isOwner &&
    !canManage
  ) {
    notFound();
  }

  const instrument =
    Array.isArray(
      booking.instruments
    )
      ? booking.instruments[0]
      : booking.instruments;

  const {
    data: bookingUser,
  } =
    await supabase
      .from("profiles")
      .select(
        "full_name, email"
      )
      .eq(
        "id",
        booking.user_id
      )
      .maybeSingle();

  const canModify =
    booking.status ===
      "Confirmed" ||
    booking.status ===
      "Pending";

  const cancelAction =
    cancelInstrumentBooking.bind(
      null,
      id
    );

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[900px]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/hub/lab/schedule"
            className="text-xs font-semibold text-[#385E9D]"
          >
            ← Instrument Schedule
          </Link>

          {canModify && (
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/hub/lab/bookings/${id}/edit`}
                className="rounded-full border border-[#385E9D] bg-white px-5 py-2.5 text-xs font-semibold text-[#385E9D]"
              >
                Modify Booking
              </Link>

              <form
                action={cancelAction}
              >
                <button
                  type="submit"
                  className="rounded-full border border-[#A23B35] bg-white px-5 py-2.5 text-xs font-semibold text-[#A23B35]"
                >
                  Cancel Booking
                </button>
              </form>
            </div>
          )}
        </div>

        {query.created ===
          "1" && (
          <div className="mt-6 border-l-[3px] border-[#2D6A45] bg-[#E8F4EC] px-5 py-4 text-xs text-[#2D6A45]">
            Booking confirmed successfully.
          </div>
        )}

        {query.updated ===
          "1" && (
          <div className="mt-6 border-l-[3px] border-[#2D6A45] bg-[#E8F4EC] px-5 py-4 text-xs text-[#2D6A45]">
            Booking updated successfully.
          </div>
        )}

        <section className="mt-6 border border-[#DDD6CF] bg-white p-7">
          <div className="flex flex-col justify-between gap-7 md:flex-row">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-[#E8F4EC] px-3 py-1 text-[9px] font-bold text-[#2D6A45]">
                  {
                    booking.status
                  }
                </span>

                {isOwner && (
                  <span className="rounded-full bg-[#EEF2F8] px-3 py-1 text-[9px] font-bold text-[#385E9D]">
                    My Booking
                  </span>
                )}
              </div>

              <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em]">
                {instrument?.name ||
                  "Instrument Booking"}
              </h1>

              <p className="mt-3 text-sm text-[#706963]">
                {
                  booking.booking_date
                }
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

            <div className="min-w-[220px] border-t border-[#EEE9E4] pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
              <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
                Booked By
              </p>

              <p className="mt-2 text-sm font-semibold">
                {bookingUser?.full_name ||
                  bookingUser?.email ||
                  "SenSys User"}
              </p>

              {bookingUser?.email && (
                <p className="mt-1 text-[10px] text-[#928980]">
                  {
                    bookingUser.email
                  }
                </p>
              )}
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <section className="border border-[#DDD6CF] bg-white">
            <div className="border-b border-[#E7E1DB] px-6 py-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
                Booking
              </p>

              <h2 className="mt-1 text-xl font-bold">
                Usage Details
              </h2>
            </div>

            <div className="space-y-5 p-6">
              <div>
                <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
                  Purpose
                </p>

                <p className="mt-2 whitespace-pre-line text-sm leading-6">
                  {booking.purpose ||
                    "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
                  Notes
                </p>

                <p className="mt-2 whitespace-pre-line text-sm leading-6">
                  {booking.notes ||
                    "No notes"}
                </p>
              </div>
            </div>
          </section>

          <section className="border border-[#DDD6CF] bg-white">
            <div className="border-b border-[#E7E1DB] px-6 py-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
                Instrument
              </p>

              <h2 className="mt-1 text-xl font-bold">
                Location & Support
              </h2>
            </div>

            <div className="space-y-5 p-6">
              <div>
                <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
                  Location
                </p>

                <p className="mt-2 text-sm">
                  {instrument?.location ||
                    "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
                  Responsible Person
                </p>

                <p className="mt-2 text-sm">
                  {instrument?.responsible_person ||
                    "Not assigned"}
                </p>
              </div>

              {instrument && (
                <Link
                  href={`/hub/lab/instruments/${instrument.id}`}
                  className="inline-flex text-xs font-semibold text-[#385E9D]"
                >
                  View instrument →
                </Link>
              )}
            </div>
          </section>
        </div>

        {canManage &&
          !isOwner && (
            <div className="mt-8 border-l-[3px] border-[#385E9D] bg-[#EEF2F8] px-5 py-4">
              <p className="text-xs leading-6 text-[#645D57]">
                You are viewing this booking
                with laboratory management
                privileges. Admin and Lab
                Manager accounts may modify
                or cancel another user's
                booking.
              </p>
            </div>
          )}
      </div>
    </main>
  );
}