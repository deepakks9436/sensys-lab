import Link from "next/link";
import {
  notFound,
} from "next/navigation";

import { createClient } from "../../../../../../lib/supabase/server";
import { createInstrumentBooking } from "../../../actions";

export default async function BookInstrumentPage({
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
    data: instrument,
  } =
    await supabase
      .from("instruments")
      .select(
        "id, name, status, training_required"
      )
      .eq("id", id)
      .maybeSingle();

  if (!instrument) {
    notFound();
  }

  const action =
    createInstrumentBooking.bind(
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
          href={`/hub/lab/instruments/${id}`}
          className="text-xs font-semibold text-[#385E9D]"
        >
          ← {instrument.name}
        </Link>

        <div className="mt-7">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
            Instrument Booking
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-[-0.04em]">
            Book Instrument.
          </h1>

          <p className="mt-3 text-sm text-[#706963]">
            {
              instrument.name
            }
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
                placeholder="Briefly describe the experiment or activity..."
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
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-[#E7E1DB] bg-[#FAF9F7] px-6 py-5">
            <Link
              href={`/hub/lab/instruments/${id}`}
              className="rounded-full border border-[#D8D0C7] bg-white px-5 py-3 text-xs font-semibold"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-full bg-[#385E9D] px-6 py-3 text-xs font-semibold text-white"
            >
              Confirm Booking →
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}