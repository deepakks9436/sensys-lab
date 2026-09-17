import Link from "next/link";

import {
  notFound,
  redirect,
} from "next/navigation";

import {
  createClient,
} from "../../../../../../lib/supabase/server";

import {
  getHubUser,
} from "../../../../../../lib/hub/auth";

import {
  updateConsumable,
} from "../../actions";

export default async function EditConsumablePage({
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
  const {
    id,
  } =
    await params;

  const query =
    await searchParams;

  const context =
    await getHubUser();

  const canManage =
    context.profile.role ===
      "admin" ||
    context.profile.role ===
      "lab_manager";

  if (
    !canManage
  ) {
    redirect(
      "/hub/inventory/consumables"
    );
  }

  const supabase =
    await createClient();

  const {
    data: item,
  } =
    await supabase
      .from(
        "consumables"
      )
      .select("*")
      .eq(
        "id",
        id
      )
      .maybeSingle();

  if (!item) {
    notFound();
  }

  const action =
    updateConsumable.bind(
      null,
      id
    );

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
          Inventory Master Data
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-[-0.035em]">
          Edit {item.name}.
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#706963]">
          Manage the item name,
          category, supplier and
          low-stock threshold.
          Day-to-day quantity,
          location and notes can also
          be maintained by lab
          members.
        </p>

        <form
          action={
            action
          }
          className="mt-8 border border-[#DDD6CF] bg-white"
        >
          {query.error && (
            <div className="border-b border-[#E7E1DB] bg-[#FBE7E5] px-6 py-4 text-xs text-[#A23B35]">
              {
                query.error
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
                defaultValue={
                  item.name ??
                  ""
                }
                className={inputClass}
              />
            </div>

            {/* CATEGORY */}

            <div>
              <label className={labelClass}>
                Category
              </label>

              <input
                name="category"
                defaultValue={
                  item.category ??
                  ""
                }
                placeholder="PPE, Liquid Handling..."
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
                defaultValue={
                  item.quantity ??
                  0
                }
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
                defaultValue={
                  item.unit ??
                  "unit"
                }
                placeholder="boxes, packs, sheets..."
                className={inputClass}
              />
            </div>

            {/* MINIMUM */}

            <div>
              <label className={labelClass}>
                Low-Stock Threshold
              </label>

              <input
                name="minimum_stock"
                type="number"
                min="0"
                step="any"
                defaultValue={
                  item.minimum_stock ??
                  0
                }
                className={inputClass}
              />

              <p className="mt-2 text-[9px] leading-4 text-[#928980]">
                The item is flagged
                automatically when
                quantity reaches this
                value.
              </p>
            </div>

            {/* LOCATION */}

            <div>
              <label className={labelClass}>
                Storage Location
              </label>

              <input
                name="location"
                defaultValue={
                  item.location ??
                  ""
                }
                className={inputClass}
              />
            </div>

            {/* SUPPLIER */}

            <div>
              <label className={labelClass}>
                Supplier
              </label>

              <input
                name="supplier"
                defaultValue={
                  item.supplier ??
                  ""
                }
                className={inputClass}
              />
            </div>

            {/* CATALOG */}

            <div>
              <label className={labelClass}>
                Catalog Number
              </label>

              <input
                name="catalog_number"
                defaultValue={
                  item.catalog_number ??
                  ""
                }
                className={inputClass}
              />
            </div>

            {/* NOTES */}

            <div className="md:col-span-2">
              <label className={labelClass}>
                Notes
              </label>

              <textarea
                name="notes"
                rows={4}
                defaultValue={
                  item.notes ??
                  ""
                }
                className={inputClass}
              />
            </div>
          </div>

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
              Save Changes →
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}