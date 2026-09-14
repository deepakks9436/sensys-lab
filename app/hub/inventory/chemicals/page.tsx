import Link from "next/link";

import { createClient } from "../../../../lib/supabase/server";
import { archiveChemical } from "./actions";

function statusClasses(status: string) {
  if (status === "In Stock") {
    return "bg-[#E8F4EC] text-[#2D6A45]";
  }

  if (
    status === "Low Stock" ||
    status === "Reorder"
  ) {
    return "bg-[#FFF4D9] text-[#8A6200]";
  }

  if (
    status === "Expired" ||
    status === "Out of Stock"
  ) {
    return "bg-[#FBE7E5] text-[#A23B35]";
  }

  return "bg-[#EEEAE5] text-[#706963]";
}

export default async function ChemicalsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single()
    : { data: null };

  const canManage =
    profile &&
    ["admin", "manager"].includes(
      profile.role
    );

  const { data: chemicals, error } =
    await supabase
      .from("chemicals")
      .select("*")
      .neq("status", "Archived")
      .order("name", {
        ascending: true,
      });

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[1320px]">
        {/* HEADER */}

        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#385E9D]">
              Inventory · Chemicals
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-[-0.035em] md:text-5xl">
              Chemical Inventory.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#706963]">
              Live inventory of chemicals,
              reagents, stock levels, storage,
              expiry and safety information.
            </p>
          </div>

          {canManage && (
            <Link
              href="/hub/inventory/chemicals/new"
              className="w-fit rounded-full bg-[#385E9D] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#27456F]"
            >
              + Add Chemical
            </Link>
          )}
        </div>

        {/* EMPTY / ERROR */}

        {error && (
          <div className="mt-8 border-l-[3px] border-[#A23B35] bg-[#FBE7E5] px-5 py-4 text-sm text-[#8F302B]">
            Unable to load chemical inventory:
            {" "}
            {error.message}
          </div>
        )}

        {!error &&
          (!chemicals ||
            chemicals.length === 0) && (
            <section className="mt-10 border border-dashed border-[#CFC5BC] bg-white px-6 py-14 text-center">
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
                Chemical Inventory
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                No chemicals added yet.
              </h2>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#706963]">
                The Supabase chemical
                inventory is currently empty.
                Add your first SenSys chemical
                record here rather than editing
                the source code.
              </p>

              {canManage && (
                <Link
                  href="/hub/inventory/chemicals/new"
                  className="mt-6 inline-flex rounded-full bg-[#385E9D] px-5 py-3 text-xs font-semibold text-white"
                >
                  Add first chemical →
                </Link>
              )}
            </section>
          )}

        {/* TABLE */}

        {chemicals &&
          chemicals.length > 0 && (
            <div className="mt-10 overflow-hidden border border-[#DDD6CF] bg-white">
              <div className="hidden grid-cols-[1.35fr_0.6fr_0.75fr_0.8fr_0.85fr_0.65fr_0.85fr] border-b border-[#DDD6CF] bg-[#F5F3EF] px-6 py-4 text-[8px] font-bold uppercase tracking-[0.15em] text-[#837A72] lg:grid">
                <span>Chemical</span>
                <span>Stock</span>
                <span>Supplier</span>
                <span>Expiry</span>
                <span>Location</span>
                <span>Status</span>

                {canManage && (
                  <span>Manage</span>
                )}
              </div>

              <div className="divide-y divide-[#EEE9E4]">
                {chemicals.map(
                  (chemical) => (
                    <div
                      key={chemical.id}
                      className={`grid gap-4 px-6 py-5 lg:items-center ${
                        canManage
                          ? "lg:grid-cols-[1.35fr_0.6fr_0.75fr_0.8fr_0.85fr_0.65fr_0.85fr]"
                          : "lg:grid-cols-[1.35fr_0.6fr_0.75fr_0.8fr_0.85fr_0.65fr]"
                      }`}
                    >
                      <div>
                        <p className="text-sm font-semibold">
                          {chemical.name}
                        </p>

                        <p className="mt-1 text-[10px] text-[#928980]">
                          {chemical.formula ||
                            "No formula"}
                          {chemical.cas_number
                            ? ` · CAS ${chemical.cas_number}`
                            : ""}
                        </p>

                        {chemical.hazard && (
                          <p className="mt-1 text-[9px] font-medium text-[#A07100]">
                            {chemical.hazard}
                          </p>
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-semibold">
                          {Number(
                            chemical.quantity
                          )}{" "}
                          {chemical.unit}
                        </p>

                        <p className="mt-1 text-[9px] text-[#928980]">
                          Min.{" "}
                          {Number(
                            chemical.minimum_stock
                          )}{" "}
                          {chemical.unit}
                        </p>
                      </div>

                      <p className="text-xs text-[#706963]">
                        {chemical.supplier ||
                          "—"}
                      </p>

                      <p className="text-xs text-[#706963]">
                        {chemical.expiry_date ||
                          "—"}
                      </p>

                      <p className="text-xs leading-5 text-[#706963]">
                        {chemical.location ||
                          "—"}
                      </p>

                      <span
                        className={`w-fit rounded-full px-3 py-1 text-[9px] font-bold ${statusClasses(
                          chemical.status
                        )}`}
                      >
                        {chemical.status}
                      </span>

                      {canManage && (
                        <div className="flex flex-wrap gap-2">
                          <Link
                            href={`/hub/inventory/chemicals/${chemical.id}/edit`}
                            className="rounded-full border border-[#D8D0C7] px-3 py-1.5 text-[9px] font-semibold transition hover:border-[#385E9D] hover:text-[#385E9D]"
                          >
                            Edit
                          </Link>

                          <Link
                            href={`/hub/inventory/chemicals/${chemical.id}/stock`}
                            className="rounded-full border border-[#D8D0C7] px-3 py-1.5 text-[9px] font-semibold transition hover:border-[#385E9D] hover:text-[#385E9D]"
                          >
                            Stock
                          </Link>

                          <form
                            action={archiveChemical.bind(
                              null,
                              chemical.id
                            )}
                          >
                            <button
                              type="submit"
                              className="rounded-full border border-[#E4C5C1] px-3 py-1.5 text-[9px] font-semibold text-[#A23B35] transition hover:bg-[#FBE7E5]"
                            >
                              Archive
                            </button>
                          </form>
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          )}
      </div>
    </main>
  );
}