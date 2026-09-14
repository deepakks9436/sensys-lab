import Link from "next/link";
import {
  notFound,
  redirect,
} from "next/navigation";

import { createClient } from "../../../../../../lib/supabase/server";
import { updateChemical } from "../../actions";

export default async function EditChemicalPage({
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
      .select("*")
      .eq("id", id)
      .single();

  if (!chemical) {
    notFound();
  }

  const action =
    updateChemical.bind(null, id);

  const inputClass =
    "mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#385E9D]";

  const labelClass =
    "text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]";

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[1000px]">
        <Link
          href="/hub/inventory/chemicals"
          className="text-xs font-semibold text-[#385E9D]"
        >
          ← Chemical Inventory
        </Link>

        <p className="mt-7 text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
          Inventory Management
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-[-0.035em]">
          Edit {chemical.name}.
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
                Chemical Name *
              </label>

              <input
                name="name"
                required
                defaultValue={
                  chemical.name ?? ""
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Formula
              </label>

              <input
                name="formula"
                defaultValue={
                  chemical.formula ?? ""
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                CAS Number
              </label>

              <input
                name="cas_number"
                defaultValue={
                  chemical.cas_number ??
                  ""
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Grade
              </label>

              <input
                name="grade"
                defaultValue={
                  chemical.grade ?? ""
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
                  chemical.supplier ?? ""
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
                  chemical.catalog_number ??
                  ""
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
                  chemical.quantity ?? 0
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
                  chemical.unit ?? "unit"
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
                  chemical.minimum_stock ??
                  0
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
                  chemical.location ?? ""
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Storage Condition
              </label>

              <input
                name="storage_condition"
                defaultValue={
                  chemical.storage_condition ??
                  ""
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
                  chemical.project ?? ""
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Received Date
              </label>

              <input
                name="received_date"
                type="date"
                defaultValue={
                  chemical.received_date ??
                  ""
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Opened Date
              </label>

              <input
                name="opened_date"
                type="date"
                defaultValue={
                  chemical.opened_date ??
                  ""
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Expiry Date
              </label>

              <input
                name="expiry_date"
                type="date"
                defaultValue={
                  chemical.expiry_date ??
                  ""
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Hazard
              </label>

              <input
                name="hazard"
                defaultValue={
                  chemical.hazard ?? ""
                }
                className={inputClass}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>
                SDS Link
              </label>

              <input
                name="sds_url"
                type="url"
                defaultValue={
                  chemical.sds_url ?? ""
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
                  chemical.notes ?? ""
                }
                className={inputClass}
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
              Save Changes →
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}