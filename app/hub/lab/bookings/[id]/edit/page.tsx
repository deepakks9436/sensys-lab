import Link from "next/link";
import {
  notFound,
} from "next/navigation";

import { createClient } from "../../../../../../lib/supabase/server";

import { updateInstrumentBooking } from "../../../actions";

export default async function EditBookingPage({
  params,
  searchParams,
}: {
  params: Promise<{
    id: string;
  }>;

  searchParams: Promise<{
    error?: string;
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
      .select("role")
      .eq("id", user.id)
      .single();

  if (!profile) {
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
        user_id,
        booking_date,
        start_time,
        end_time,
        purpose,
        notes,
        status,
        instruments (
          id,
          name
        )
        `
      )
      .eq("id", id)
      .maybeSingle();

  if (!booking) {
    notFound();
  }

  if (
    booking.user_id !==
      user.id &&
    !canManage
  ) {
    notFound();
  }

  if (
    ![
      "Pending",
      "Confirmed",
    ].includes(
      booking.status
    )
  ) {
    notFound();
  }

  const instrument =
    Array.isArray(
      booking.instruments
    )
      ? booking.instruments[0]
      : booking.instruments;

  const action =
    updateInstrumentBooking.bind(
      null,
      id
    );

  const inputClass =
    "mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#385E9D]";

  const labelClass =
    "text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]";

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[760px]">
        <Link
          href={`/hub/lab/bookings/${id}`}
          className="text-xs font-semibold text-[#385E9D]"
        >
          ← Booking
        </Link>

        <div className="mt-7">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
            Instrument Booking
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-[-0.04em]">
            Modify Booking.
          </h1>

          <p className="mt-3 text-sm text-[#706963]">
            {instrument?.name ||
              "Instrument"}
          </p>
        </div>

        <form
          action={action}
          className="mt-10 border border-[#DDD6CF] bg-white"
        >
          {query.error && (
            <div className="border-b border-[#E7E1DB] bg-[#FBE7E5] px-6 py-4 text-xs leading-6 text-[#A23B35]">
              {
                query.error
              }
            </div>
          )}

          <div className="grid gap-6 p-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className={labelClass}>
                Booking Date *
              </label>

              <input
                name="booking_date"
                type="date"
                required
                defaultValue={
                  booking.booking_date
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Start Time *
              </label>

              <input
                name="start_time"
                type="time"
                required
                defaultValue={String(
                  booking.start_time
                ).slice(0, 5)}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                End Time *
              </label>

              <input
                name="end_time"
                type="time"
                required
                defaultValue={String(
                  booking.end_time
                ).slice(0, 5)}
                className={inputClass}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>
                Purpose
              </label>

              <textarea
                name="purpose"
                rows={4}
                defaultValue={
                  booking.purpose ??
                  ""
                }
                className={inputClass}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>
                Notes
              </label>

              <textarea
                name="notes"
                rows={3}
                defaultValue={
                  booking.notes ?? ""
                }
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-[#E7E1DB] bg-[#FAF9F7] px-6 py-5">
            <Link
              href={`/hub/lab/bookings/${id}`}
              className="rounded-full border border-[#D8D0C7] bg-white px-5 py-3 text-xs font-semibold"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-full bg-[#385E9D] px-6 py-3 text-xs font-semibold text-white"
            >
              Save Changes →
            </button>
          </div>
        </form>

        <div className="mt-6 border-l-[3px] border-[#F2A900] bg-[#FFF9EA] px-5 py-4">
          <p className="text-xs leading-6 text-[#645D57]">
            SenSys Hub will recheck the
            instrument schedule before
            saving. If another booking
            overlaps with your revised
            time, the modification will be
            rejected.
          </p>
        </div>
      </div>
    </main>
  );
}