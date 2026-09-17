import Link from "next/link";
import {
  redirect,
} from "next/navigation";

import {
  getHubUser,
} from "../../../../../lib/hub/auth";

import {
  addConsumable,
} from "../actions";

export default async function NewConsumablePage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
  }>;
}) {
  const context =
    await getHubUser();

  const role =
    context.profile.role;

  const canContribute =
    [
      "admin",
      "lab_manager",
      "student",
      "member",
    ].includes(role);

  const canManageMaster =
    role === "admin" ||
    role ===
      "lab_manager";

  if (
    !canContribute
  ) {
    redirect(
      "/hub/inventory/consumables"
    );
  }

  const params =
    await searchParams;

  const inputClass =
    "mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#385E9D]";

  const labelClass =
    "text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]";

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[900px]">
        <Link
          href="/hub/inventory/consumables"
          className="text-xs font-semibold text-[#385E9D]"
        >
          ← Consumables
        </Link>

        <p className="mt-7 text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
          Shared Inventory
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-[-0.035em]">
          Add Consumable.
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-7 text-[#706963]">
          Add a laboratory
          consumable so its current
          quantity and storage
          location can be maintained
          by the lab.
        </p>

        <form
          action={
            addConsumable
          }
          className="mt-8 border border-[#DDD6CF] bg-white"
        >
          {params.error && (
            <div className="border-b border-[#E7E1DB] bg-[#FBE7E5] px-6 py-4 text-xs text-[#A23B35]">
              {
                params.error
              }
            </div>
          )}

          <div className="grid gap-6 p-6 md:grid-cols-2">
            {/* NAME */}

            <div>
              <label className={labelClass}>
                Item Name *
              </label>

              <input
                name="name"
                required
                placeholder="e.g. Pipette Tips 200 µL"
                className={inputClass}
              />
            </div>

            {/* QUANTITY */}

            <div>
              <label className={labelClass}>
                Current Quantity
              </label>

              <input
                name="quantity"
                type="number"
                min="0"
                step="any"
                defaultValue="0"
                className={inputClass}
              />
            </div>

            {/* UNIT */}

            <div>
              <label className={labelClass}>
                Unit
              </label>

              <input
                name="unit"
                defaultValue="unit"
                placeholder="boxes, packs, sheets, vials..."
                className={inputClass}
              />
            </div>

            {/* LOCATION */}

            <div>
              <label className={labelClass}>
                Storage Location
              </label>

              <input
                name="location"
                placeholder="J204 · Cabinet A · Shelf 2"
                className={inputClass}
              />
            </div>

            {/* MANAGER MASTER FIELDS */}

            {canManageMaster && (
              <>
                <div>
                  <label className={labelClass}>
                    Category
                  </label>

                  <input
                    name="category"
                    placeholder="PPE, Liquid Handling, Substrates..."
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Minimum Stock
                  </label>

                  <input
                    name="minimum_stock"
                    type="number"
                    min="0"
                    step="any"
                    defaultValue="0"
                    className={inputClass}
                  />

                  <p className="mt-2 text-[9px] leading-4 text-[#928980]">
                    The item is
                    automatically flagged
                    when stock reaches this
                    quantity.
                  </p>
                </div>

                <div>
                  <label className={labelClass}>
                    Supplier
                  </label>

                  <input
                    name="supplier"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Catalog Number
                  </label>

                  <input
                    name="catalog_number"
                    className={inputClass}
                  />
                </div>
              </>
            )}

            {/* NOTES */}

            <div className="md:col-span-2">
              <label className={labelClass}>
                Notes
              </label>

              <textarea
                name="notes"
                rows={4}
                placeholder="Any useful information about this item..."
                className={inputClass}
              />
            </div>
          </div>

          {!canManageMaster && (
            <div className="border-t border-[#E7E1DB] bg-[#EEF2F8] px-6 py-4">
              <p className="text-[10px] leading-5 text-[#5F6770]">
                The Lab Manager can
                later add a category,
                supplier, catalogue
                information and low-stock
                threshold if required.
              </p>
            </div>
          )}

          <div className="flex justify-end gap-3 border-t border-[#E7E1DB] bg-[#FAF9F7] px-6 py-5">
            <Link
              href="/hub/inventory/consumables"
              className="rounded-full border border-[#D8D0C7] bg-white px-5 py-3 text-xs font-semibold"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-full bg-[#385E9D] px-6 py-3 text-xs font-semibold text-white"
            >
              Add Consumable →
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}