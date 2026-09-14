import Link from "next/link";
import {
  notFound,
  redirect,
} from "next/navigation";

import { createClient } from "../../../../../../lib/supabase/server";
import { adjustChemicalStock } from "../../actions";

export default async function StockPage({
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
      "/hub/inventory/chemicals"
    );
  }

  const { data: chemical } =
    await supabase
      .from("chemicals")
      .select(
        "id, name, quantity, unit, minimum_stock, location, status"
      )
      .eq("id", id)
      .single();

  if (!chemical) {
    notFound();
  }

  const action =
    adjustChemicalStock.bind(null, id);

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[760px]">
        <Link
          href="/hub/inventory/chemicals"
          className="text-xs font-semibold text-[#385E9D]"
        >
          ← Chemical Inventory
        </Link>

        <p className="mt-7 text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
          Stock Management
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-[-0.035em]">
          {chemical.name}
        </h1>

        <section className="mt-8 bg-[#203650] p-6 text-white">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#F2A900]">
            Current Stock
          </p>

          <p className="mt-3 text-4xl font-bold">
            {Number(chemical.quantity)}{" "}
            {chemical.unit}
          </p>

          <p className="mt-3 text-xs text-white/65">
            Minimum stock:{" "}
            {Number(
              chemical.minimum_stock
            )}{" "}
            {chemical.unit}
          </p>

          <p className="mt-1 text-xs text-white/65">
            {chemical.location || ""}
          </p>
        </section>

        <form
          action={action}
          className="mt-6 border border-[#DDD6CF] bg-white"
        >
          {query.error && (
            <div className="border-b border-[#E7E1DB] bg-[#FBE7E5] px-6 py-4 text-xs text-[#A23B35]">
              {query.error}
            </div>
          )}

          <div className="space-y-6 p-6">
            <div>
              <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]">
                Operation
              </label>

              <select
                name="operation"
                required
                className="mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm"
              >
                <option value="receive">
                  Receive stock
                </option>

                <option value="use">
                  Record usage
                </option>

                <option value="set">
                  Set exact stock
                </option>
              </select>
            </div>

            <div>
              <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]">
                Amount
              </label>

              <input
                name="amount"
                type="number"
                step="any"
                min="0"
                required
                className="mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-[#E7E1DB] bg-[#FAF9F7] px-6 py-5">
            <Link
              href="/hub/inventory/chemicals"
              className="rounded-full border border-[#D8D0C7] bg-white px-5 py-3 text-xs font-semibold"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-full bg-[#385E9D] px-6 py-3 text-xs font-semibold text-white"
            >
              Update Stock →
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}