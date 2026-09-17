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
  adjustConsumableStock,
} from "../../actions";

export default async function ConsumableStockPage({
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

  const canContribute =
    [
      "admin",
      "lab_manager",
      "student",
      "member",
    ].includes(
      context.profile.role
    );

  if (
    !canContribute
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
      .select(
        `
        id,
        name,
        quantity,
        unit,
        minimum_stock,
        location,
        status,
        notes
        `
      )
      .eq(
        "id",
        id
      )
      .neq(
        "status",
        "Archived"
      )
      .maybeSingle();

  if (!item) {
    notFound();
  }

  const action =
    adjustConsumableStock.bind(
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
          href="/hub/inventory/consumables"
          className="text-xs font-semibold text-[#385E9D]"
        >
          ← Consumables
        </Link>

        <p className="mt-7 text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
          Inventory Update
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-[-0.035em]">
          {item.name}
        </h1>

        <p className="mt-3 text-sm leading-7 text-[#706963]">
          Keep the current quantity,
          location and notes up to
          date. No transaction log is
          required.
        </p>

        {/* CURRENT STATUS */}

        <section className="mt-8 bg-[#203650] p-6 text-white">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#F2A900]">
                Current Stock
              </p>

              <p className="mt-3 text-4xl font-bold">
                {Number(
                  item.quantity
                )}{" "}
                {
                  item.unit
                }
              </p>

              {Number(
                item.minimum_stock ??
                  0
              ) >
                0 && (
                <p className="mt-3 text-xs text-white/65">
                  Low-stock threshold:{" "}
                  {Number(
                    item.minimum_stock
                  )}{" "}
                  {
                    item.unit
                  }
                </p>
              )}
            </div>

            <span
              className={`rounded-full px-3 py-1.5 text-[9px] font-bold ${
                item.status ===
                "Out of Stock"
                  ? "bg-[#FBE7E5] text-[#A23B35]"
                  : item.status ===
                      "Low Stock"
                    ? "bg-[#FFF4D9] text-[#8A6200]"
                    : "bg-[#E8F4EC] text-[#2D6A45]"
              }`}
            >
              {
                item.status
              }
            </span>
          </div>

          {item.location && (
            <p className="mt-4 text-xs text-white/65">
              {
                item.location
              }
            </p>
          )}
        </section>

        {/* UPDATE FORM */}

        <form
          action={
            action
          }
          className="mt-6 border border-[#DDD6CF] bg-white"
        >
          {query.error && (
            <div className="border-b border-[#E7E1DB] bg-[#FBE7E5] px-6 py-4 text-xs text-[#A23B35]">
              {
                query.error
              }
            </div>
          )}

          <div className="space-y-6 p-6">
            {/* QUANTITY */}

            <div>
              <label className={labelClass}>
                Current Quantity *
              </label>

              <div className="relative mt-2">
                <input
                  name="quantity"
                  type="number"
                  min="0"
                  step="any"
                  required
                  defaultValue={
                    item.quantity ??
                    0
                  }
                  className="w-full border border-[#D8D0C7] bg-white px-4 py-3 pr-24 text-sm outline-none transition focus:border-[#385E9D]"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#928980]">
                  {
                    item.unit
                  }
                </span>
              </div>

              <p className="mt-2 text-[9px] leading-4 text-[#928980]">
                Enter the quantity
                currently available in
                the lab.
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
                placeholder="J204 · Cabinet A · Shelf 2"
                className={inputClass}
              />
            </div>

            {/* NOTES */}

            <div>
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
                placeholder="Any information other lab members should know..."
                className={inputClass}
              />
            </div>
          </div>

          <div className="border-t border-[#E7E1DB] bg-[#FAF9F7] px-6 py-4">
            <p className="text-[9px] leading-5 text-[#928980]">
              SenSys Hub will
              automatically determine
              whether the item is in
              stock, low stock or out
              of stock.
            </p>
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
              Save Update →
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}