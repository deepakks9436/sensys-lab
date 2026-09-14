import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "../../../../../lib/supabase/server";
import { addConsumable } from "../actions";

export default async function NewConsumablePage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
  }>;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } =
    await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

  if (
    !profile ||
    !["admin", "manager"].includes(
      profile.role
    )
  ) {
    redirect(
      "/hub/inventory/consumables"
    );
  }

  const params = await searchParams;

  const inputClass =
    "mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#385E9D]";

  const labelClass =
    "text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]";

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[1000px]">
        <Link
          href="/hub/inventory/consumables"
          className="text-xs font-semibold text-[#385E9D]"
        >
          ← Consumables
        </Link>

        <p className="mt-7 text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
          Inventory Management
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-[-0.035em]">
          Add Consumable.
        </h1>

        <form
          action={addConsumable}
          className="mt-10 border border-[#DDD6CF] bg-white"
        >
          {params.error && (
            <div className="border-b border-[#E7E1DB] bg-[#FBE7E5] px-6 py-4 text-xs text-[#A23B35]">
              {params.error}
            </div>
          )}

          <div className="grid gap-6 p-6 md:grid-cols-2">
            <div>
              <label className={labelClass}>
                Item Name *
              </label>

              <input
                name="name"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Category
              </label>

              <input
                name="category"
                placeholder="PPE, Liquid Handling..."
                className={inputClass}
              />
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

            <div>
              <label className={labelClass}>
                Current Quantity
              </label>

              <input
                name="quantity"
                type="number"
                step="any"
                defaultValue="0"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Unit
              </label>

              <input
                name="unit"
                defaultValue="unit"
                placeholder="boxes, packs, sheets..."
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
                step="any"
                defaultValue="0"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Reorder Quantity
              </label>

              <input
                name="reorder_quantity"
                type="number"
                step="any"
                defaultValue="0"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Storage Location
              </label>

              <input
                name="location"
                placeholder="Wet Lab · Shelf C"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Project
              </label>

              <input
                name="project"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Last Purchased
              </label>

              <input
                name="last_purchased"
                type="date"
                className={inputClass}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>
                Notes
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
              href="/hub/inventory/consumables"
              className="rounded-full border border-[#D8D0C7] bg-white px-5 py-3 text-xs font-semibold"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-full bg-[#385E9D] px-6 py-3 text-xs font-semibold text-white"
            >
              Save Consumable →
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}