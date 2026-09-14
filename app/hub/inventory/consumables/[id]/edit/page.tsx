import Link from "next/link";
import {
  notFound,
  redirect,
} from "next/navigation";

import { createClient } from "../../../../../../lib/supabase/server";
import { updateConsumable } from "../../actions";

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
  const { id } = await params;
  const query = await searchParams;

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

  const { data: item } =
    await supabase
      .from("consumables")
      .select("*")
      .eq("id", id)
      .single();

  if (!item) {
    notFound();
  }

  const action =
    updateConsumable.bind(null, id);

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
          Edit {item.name}.
        </h1>

        <form
          action={action}
          className="mt-10 border border-[#DDD6CF] bg-white"
        >
          {query.error && (
            <div className="border-b border-[#E7E1DB] bg-[#FBE7E5] px-6 py-4 text-xs text-[#A23B35]">
              {query.error}
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
                defaultValue={item.name ?? ""}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Category
              </label>

              <input
                name="category"
                defaultValue={
                  item.category ?? ""
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Supplier
              </label>

              <input
                name="supplier"
                defaultValue={
                  item.supplier ?? ""
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Catalog Number
              </label>

              <input
                name="catalog_number"
                defaultValue={
                  item.catalog_number ?? ""
                }
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
                defaultValue={
                  item.quantity ?? 0
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Unit
              </label>

              <input
                name="unit"
                defaultValue={
                  item.unit ?? "unit"
                }
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
                defaultValue={
                  item.minimum_stock ?? 0
                }
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
                defaultValue={
                  item.reorder_quantity ?? 0
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Storage Location
              </label>

              <input
                name="location"
                defaultValue={
                  item.location ?? ""
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Project
              </label>

              <input
                name="project"
                defaultValue={
                  item.project ?? ""
                }
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
                defaultValue={
                  item.last_purchased ?? ""
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
                rows={4}
                defaultValue={
                  item.notes ?? ""
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