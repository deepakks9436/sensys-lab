import Link from "next/link";

import {
  createClient,
} from "../../../../lib/supabase/server";

import {
  getHubUser,
} from "../../../../lib/hub/auth";

import {
  archiveConsumable,
} from "./actions";

/* ============================================================
   HELPERS
============================================================ */

function statusClasses(
  status: string
) {
  if (
    status ===
    "In Stock"
  ) {
    return "bg-[#E8F4EC] text-[#2D6A45]";
  }

  if (
    status ===
      "Low Stock" ||
    status ===
      "Reorder"
  ) {
    return "bg-[#FFF4D9] text-[#8A6200]";
  }

  if (
    status ===
    "Out of Stock"
  ) {
    return "bg-[#FBE7E5] text-[#A23B35]";
  }

  return "bg-[#EEEAE5] text-[#706963]";
}

function formatDate(
  value:
    | string
    | null
    | undefined
) {
  if (!value) {
    return "—";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "en-CA",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  ).format(date);
}

/* ============================================================
   PAGE
============================================================ */

export default async function ConsumablesPage() {
  const context =
    await getHubUser();

  const role =
    context.profile.role;

  const canManageMaster =
    role === "admin" ||
    role === "lab_manager";

  const canContribute =
    [
      "admin",
      "lab_manager",
      "student",
      "member",
    ].includes(role);

  const supabase =
    await createClient();

  const {
    data:
      consumables,
    error,
  } =
    await supabase
      .from(
        "consumables"
      )
      .select("*")
      .neq(
        "status",
        "Archived"
      )
      .order(
        "name",
        {
          ascending: true,
        }
      );

  const items =
    consumables ??
    [];

  const lowStock =
    items.filter(
      (
        item
      ) =>
        item.status ===
          "Low Stock" ||
        item.status ===
          "Reorder"
    ).length;

  const outOfStock =
    items.filter(
      (
        item
      ) =>
        item.status ===
        "Out of Stock"
    ).length;

  const inStock =
    items.filter(
      (
        item
      ) =>
        item.status ===
        "In Stock"
    ).length;

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[1320px]">
        {/* HEADER */}

        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#385E9D]">
              Inventory ·
              Consumables
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-[-0.035em] md:text-5xl">
              Consumables.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#706963]">
              Shared tracking of
              laboratory supplies,
              quantity, storage
              location and stock
              attention.
            </p>
          </div>

          {canContribute && (
            <Link
              href="/hub/inventory/consumables/new"
              className="w-fit rounded-full bg-[#385E9D] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#27456F]"
            >
              + Add Consumable
            </Link>
          )}
        </div>

        {/* SUMMARY */}

        {!error &&
          items.length >
            0 && (
            <section className="mt-8 grid overflow-hidden border border-[#DDD6CF] bg-white sm:grid-cols-2 xl:grid-cols-4">
              <div className="border-b border-[#DDD6CF] p-5 sm:border-r xl:border-b-0">
                <p className="text-3xl font-bold">
                  {
                    items.length
                  }
                </p>

                <p className="mt-2 text-[10px] text-[#837A72]">
                  Consumables
                </p>
              </div>

              <div className="border-b border-[#DDD6CF] p-5 xl:border-b-0 xl:border-r">
                <p className="text-3xl font-bold text-[#2D6A45]">
                  {
                    inStock
                  }
                </p>

                <p className="mt-2 text-[10px] text-[#837A72]">
                  In stock
                </p>
              </div>

              <div className="border-b border-[#DDD6CF] p-5 sm:border-r xl:border-b-0">
                <p className="text-3xl font-bold text-[#8A6200]">
                  {
                    lowStock
                  }
                </p>

                <p className="mt-2 text-[10px] text-[#837A72]">
                  Low stock
                </p>
              </div>

              <div className="p-5">
                <p className="text-3xl font-bold text-[#A23B35]">
                  {
                    outOfStock
                  }
                </p>

                <p className="mt-2 text-[10px] text-[#837A72]">
                  Out of stock
                </p>
              </div>
            </section>
          )}

        {/* ERROR */}

        {error && (
          <div className="mt-8 border-l-[3px] border-[#A23B35] bg-[#FBE7E5] px-5 py-4 text-sm text-[#8F302B]">
            Unable to load
            consumables:{" "}
            {
              error.message
            }
          </div>
        )}

        {/* EMPTY */}

        {!error &&
          items.length ===
            0 && (
            <section className="mt-10 border border-dashed border-[#CFC5BC] bg-white px-6 py-14 text-center">
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
                Consumable
                Inventory
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                No consumables
                added yet.
              </h2>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#706963]">
                Lab members can help
                keep the current
                quantity, location and
                notes up to date.
              </p>

              {canContribute && (
                <Link
                  href="/hub/inventory/consumables/new"
                  className="mt-6 inline-flex rounded-full bg-[#385E9D] px-5 py-3 text-xs font-semibold text-white"
                >
                  Add first
                  consumable →
                </Link>
              )}
            </section>
          )}

        {/* TABLE */}

        {items.length >
          0 && (
          <div className="mt-8 overflow-hidden border border-[#DDD6CF] bg-white">
            <div className="hidden grid-cols-[1.3fr_0.8fr_0.75fr_0.9fr_0.7fr_0.75fr_1fr] border-b border-[#DDD6CF] bg-[#F5F3EF] px-6 py-4 text-[8px] font-bold uppercase tracking-[0.15em] text-[#837A72] lg:grid">
              <span>
                Item
              </span>

              <span>
                Category
              </span>

              <span>
                Quantity
              </span>

              <span>
                Location
              </span>

              <span>
                Status
              </span>

              <span>
                Updated
              </span>

              <span>
                Manage
              </span>
            </div>

            <div className="divide-y divide-[#EEE9E4]">
              {items.map(
                (
                  item
                ) => (
                  <div
                    key={
                      item.id
                    }
                    className="grid gap-4 px-6 py-5 lg:grid-cols-[1.3fr_0.8fr_0.75fr_0.9fr_0.7fr_0.75fr_1fr] lg:items-center"
                  >
                    {/* ITEM */}

                    <div>
                      <p className="text-sm font-semibold">
                        {
                          item.name
                        }
                      </p>

                      {item.notes && (
                        <p className="mt-1 line-clamp-1 text-[9px] text-[#928980]">
                          {
                            item.notes
                          }
                        </p>
                      )}
                    </div>

                    {/* CATEGORY */}

                    <p className="text-xs text-[#706963]">
                      {item.category ||
                        "—"}
                    </p>

                    {/* QUANTITY */}

                    <div>
                      <p className="text-sm font-semibold">
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
                        <p className="mt-1 text-[9px] text-[#928980]">
                          Minimum{" "}
                          {Number(
                            item.minimum_stock
                          )}
                        </p>
                      )}
                    </div>

                    {/* LOCATION */}

                    <p className="text-xs leading-5 text-[#706963]">
                      {item.location ||
                        "—"}
                    </p>

                    {/* STATUS */}

                    <span
                      className={`w-fit rounded-full px-3 py-1 text-[8px] font-bold ${statusClasses(
                        item.status
                      )}`}
                    >
                      {
                        item.status
                      }
                    </span>

                    {/* UPDATED */}

                    <p className="text-[9px] leading-5 text-[#928980]">
                      {formatDate(
                        item.updated_at
                      )}
                    </p>

                    {/* ACTIONS */}

                    <div className="flex flex-wrap gap-2">
                      {canContribute && (
                        <Link
                          href={`/hub/inventory/consumables/${item.id}/stock`}
                          className="rounded-full border border-[#385E9D] px-3 py-1.5 text-[9px] font-semibold text-[#385E9D] transition hover:bg-[#EEF2F8]"
                        >
                          Update
                        </Link>
                      )}

                      {canManageMaster && (
                        <>
                          <Link
                            href={`/hub/inventory/consumables/${item.id}/edit`}
                            className="rounded-full border border-[#D8D0C7] px-3 py-1.5 text-[9px] font-semibold transition hover:border-[#385E9D] hover:text-[#385E9D]"
                          >
                            Edit Details
                          </Link>

                          <form
                            action={archiveConsumable.bind(
                              null,
                              item.id
                            )}
                          >
                            <button
                              type="submit"
                              className="rounded-full border border-[#E4C5C1] px-3 py-1.5 text-[9px] font-semibold text-[#A23B35] transition hover:bg-[#FBE7E5]"
                            >
                              Archive
                            </button>
                          </form>
                        </>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* EXPLANATION */}

        {canContribute &&
          !canManageMaster && (
            <div className="mt-5 border-l-[3px] border-[#385E9D] bg-[#EEF2F8] px-5 py-4">
              <p className="text-xs font-semibold text-[#385E9D]">
                Shared lab
                inventory
              </p>

              <p className="mt-1 text-[10px] leading-5 text-[#706963]">
                You can update the
                quantity, storage
                location and notes as
                supplies are used.
                Stock thresholds and
                master information are
                managed by the Lab
                Manager.
              </p>
            </div>
          )}
      </div>
    </main>
  );
}