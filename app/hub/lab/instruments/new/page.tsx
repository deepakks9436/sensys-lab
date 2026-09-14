import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "../../../../../lib/supabase/server";
import { addInstrument } from "../../actions";

export default async function NewInstrumentPage({
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
    !profile.is_active ||
    ![
      "admin",
      "lab_manager",
    ].includes(
      profile.role
    )
  ) {
    redirect("/hub/lab");
  }

  const inputClass =
    "mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#385E9D]";

  const labelClass =
    "text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]";

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[1000px]">
        <Link
          href="/hub/lab"
          className="text-xs font-semibold text-[#385E9D]"
        >
          ← Lab & Instruments
        </Link>

        <div className="mt-7">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
            Laboratory Operations
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-[-0.04em]">
            Add Instrument.
          </h1>
        </div>

        <form
          action={addInstrument}
          className="mt-10 border border-[#DDD6CF] bg-white"
        >
          {query.error && (
            <div className="border-b border-[#E7E1DB] bg-[#FBE7E5] px-6 py-4 text-xs text-[#A23B35]">
              {
                query.error
              }
            </div>
          )}

          <div className="grid gap-6 p-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className={labelClass}>
                Instrument Name *
              </label>

              <input
                name="name"
                required
                placeholder="BioLogic VMP-300"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Category
              </label>

              <input
                name="category"
                placeholder="Electrochemistry"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Location
              </label>

              <input
                name="location"
                placeholder="SenSys Lab · Room..."
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Manufacturer
              </label>

              <input
                name="manufacturer"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Model
              </label>

              <input
                name="model"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Serial Number
              </label>

              <input
                name="serial_number"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Responsible Person
              </label>

              <input
                name="responsible_person"
                placeholder="Instrument manager"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Status
              </label>

              <select
                name="status"
                defaultValue="Available"
                className={inputClass}
              >
                <option>
                  Available
                </option>

                <option>
                  In Use
                </option>

                <option>
                  Maintenance
                </option>

                <option>
                  Calibration
                </option>

                <option>
                  Out of Service
                </option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>
                Description
              </label>

              <textarea
                name="description"
                rows={4}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                SOP Link
              </label>

              <input
                name="sop_url"
                type="url"
                placeholder="https://..."
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Manual Link
              </label>

              <input
                name="manual_url"
                type="url"
                placeholder="https://..."
                className={inputClass}
              />
            </div>

            <div className="md:col-span-2 grid gap-4 sm:grid-cols-2">
              <label className="flex items-center gap-3 border border-[#DDD6CF] p-4 text-sm">
                <input
                  name="booking_required"
                  type="checkbox"
                  defaultChecked
                />

                Booking required
              </label>

              <label className="flex items-center gap-3 border border-[#DDD6CF] p-4 text-sm">
                <input
                  name="training_required"
                  type="checkbox"
                  defaultChecked
                />

                Training required
              </label>
            </div>

            <div>
              <label className={labelClass}>
                Last Calibration
              </label>

              <input
                name="last_calibration_date"
                type="date"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Next Calibration
              </label>

              <input
                name="next_calibration_date"
                type="date"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Last Maintenance
              </label>

              <input
                name="last_maintenance_date"
                type="date"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Next Maintenance
              </label>

              <input
                name="next_maintenance_date"
                type="date"
                className={inputClass}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>
                Internal Notes
              </label>

              <textarea
                name="notes"
                rows={4}
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-[#E7E1DB] bg-[#FAF9F7] px-6 py-5">
            <Link
              href="/hub/lab"
              className="rounded-full border border-[#D8D0C7] bg-white px-5 py-3 text-xs font-semibold"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-full bg-[#385E9D] px-6 py-3 text-xs font-semibold text-white"
            >
              Add Instrument →
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}