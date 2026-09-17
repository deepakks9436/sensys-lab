import Link from "next/link";

import {
  createClient,
} from "../../../lib/supabase/server";

import {
  getHubUser,
} from "../../../lib/hub/auth";

/* ============================================================
   HELPERS
============================================================ */

function isAttentionStatus(
  status:
    | string
    | null
    | undefined
) {
  return [
    "Low Stock",
    "Reorder",
    "Out of Stock",
    "Expired",
  ].includes(
    status ?? ""
  );
}

function statusClasses(
  status:
    | string
    | null
    | undefined
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
      "Out of Stock" ||
    status ===
      "Expired"
  ) {
    return "bg-[#FBE7E5] text-[#A23B35]";
  }

  return "bg-[#EEEAE5] text-[#706963]";
}

/* ============================================================
   PAGE
============================================================ */

export default async function InventoryDashboard() {
  const context =
    await getHubUser();

  const role =
    context.profile.role;

  const canManageInventory =
    role === "admin" ||
    role ===
      "lab_manager";

  const canContributeConsumables =
    [
      "admin",
      "lab_manager",
      "student",
      "member",
    ].includes(role);

  const supabase =
    await createClient();

  /* ========================================================
     LOAD LIVE INVENTORY
  ======================================================== */

  const [
    chemicalsResult,
    consumablesResult,
    instrumentsResult,
  ] =
    await Promise.all([
      supabase
        .from(
          "chemicals"
        )
        .select(
          `
          id,
          name,
          quantity,
          unit,
          location,
          status,
          expiry_date,
          updated_at
          `
        )
        .neq(
          "status",
          "Archived"
        )
        .order(
          "name",
          {
            ascending: true,
          }
        ),

      supabase
        .from(
          "consumables"
        )
        .select(
          `
          id,
          name,
          quantity,
          unit,
          location,
          status,
          minimum_stock,
          updated_at
          `
        )
        .neq(
          "status",
          "Archived"
        )
        .order(
          "name",
          {
            ascending: true,
          }
        ),

      supabase
        .from(
          "instruments"
        )
        .select(
          `
          id,
          name,
          location,
          status
          `
        )
        .order(
          "name",
          {
            ascending: true,
          }
        ),
    ]);

  const chemicals =
    chemicalsResult.data ??
    [];

  const consumables =
    consumablesResult.data ??
    [];

  const instruments =
    instrumentsResult.data ??
    [];

  /* ========================================================
     SUMMARY
  ======================================================== */

  const chemicalAttention =
    chemicals.filter(
      (
        item
      ) =>
        isAttentionStatus(
          item.status
        )
    );

  const consumableAttention =
    consumables.filter(
      (
        item
      ) =>
        isAttentionStatus(
          item.status
        )
    );

  const attentionCount =
    chemicalAttention.length +
    consumableAttention.length;

  const expiredChemicals =
    chemicals.filter(
      (
        item
      ) =>
        item.status ===
        "Expired"
    );

  const availableInstruments =
    instruments.filter(
      (
        item
      ) =>
        item.status ===
        "Available"
    );

  const unavailableInstruments =
    instruments.filter(
      (
        item
      ) =>
        item.status !==
        "Available"
    );

  /* ========================================================
     STOCK ATTENTION
  ======================================================== */

  const attentionItems =
    [
      ...chemicalAttention.map(
        (
          item
        ) => ({
          id:
            `chemical-${item.id}`,

          name:
            item.name,

          type:
            "Chemical",

          quantity:
            item.quantity,

          unit:
            item.unit,

          location:
            item.location,

          status:
            item.status,

          href:
            "/hub/inventory/chemicals",
        })
      ),

      ...consumableAttention.map(
        (
          item
        ) => ({
          id:
            `consumable-${item.id}`,

          name:
            item.name,

          type:
            "Consumable",

          quantity:
            item.quantity,

          unit:
            item.unit,

          location:
            item.location,

          status:
            item.status,

          href:
            `/hub/inventory/consumables/${item.id}/stock`,
        })
      ),
    ].slice(
      0,
      8
    );

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[1320px]">
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#F2A900]" />

              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#385E9D]">
                Lab Operations
              </p>
            </div>

            <h1 className="mt-4 text-4xl font-bold tracking-[-0.035em] md:text-5xl">
              Inventory.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#706963] md:text-base">
              Live laboratory
              inventory, stock
              attention and instrument
              status across SenSys.
            </p>
          </div>

          {canContributeConsumables && (
            <Link
              href="/hub/inventory/consumables/new"
              className="w-fit rounded-full bg-[#385E9D] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#27456F]"
            >
              + Add Consumable
            </Link>
          )}
        </div>

        {/* ================================================= */}
        {/* KPI CARDS */}
        {/* ================================================= */}

        <section className="mt-10 grid overflow-hidden border border-[#DDD6CF] bg-white sm:grid-cols-2 xl:grid-cols-4">
          <Link
            href="/hub/inventory/chemicals"
            className="border-b border-[#DDD6CF] p-6 transition hover:bg-[#FAF9F7] sm:border-r xl:border-b-0"
          >
            <p className="text-3xl font-bold">
              {
                chemicals.length
              }
            </p>

            <p className="mt-2 text-xs text-[#837A72]">
              Chemicals
            </p>
          </Link>

          <Link
            href="/hub/inventory/consumables"
            className="border-b border-[#DDD6CF] p-6 transition hover:bg-[#FAF9F7] xl:border-b-0 xl:border-r"
          >
            <p className="text-3xl font-bold">
              {
                consumables.length
              }
            </p>

            <p className="mt-2 text-xs text-[#837A72]">
              Consumables
            </p>
          </Link>

          <Link
            href="/hub/lab"
            className="border-b border-[#DDD6CF] p-6 transition hover:bg-[#FAF9F7] sm:border-r xl:border-b-0"
          >
            <p className="text-3xl font-bold">
              {
                instruments.length
              }
            </p>

            <p className="mt-2 text-xs text-[#837A72]">
              Instruments
            </p>
          </Link>

          <div className="p-6">
            <p className="text-3xl font-bold text-[#B57C00]">
              {
                attentionCount
              }
            </p>

            <p className="mt-2 text-xs text-[#837A72]">
              Items Needing Attention
            </p>
          </div>
        </section>

        {/* ================================================= */}
        {/* MODULE CARDS */}
        {/* ================================================= */}

        <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <Link
            href="/hub/inventory/chemicals"
            className="group border border-[#DDD6CF] bg-white p-6 transition hover:-translate-y-1 hover:border-[#385E9D] hover:shadow-sm"
          >
            <div className="flex items-start justify-between">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
                Inventory
              </p>

              <span className="text-2xl font-bold text-[#D1C8BF]">
                {
                  chemicals.length
                }
              </span>
            </div>

            <h2 className="mt-8 text-xl font-bold">
              Chemicals
            </h2>

            <p className="mt-2 text-xs leading-6 text-[#837A72]">
              Stock, storage,
              expiry and chemical
              safety records.
            </p>

            <p className="mt-6 text-xs font-semibold text-[#385E9D]">
              Open chemicals →
            </p>
          </Link>

          <Link
            href="/hub/inventory/consumables"
            className="group border border-[#DDD6CF] bg-white p-6 transition hover:-translate-y-1 hover:border-[#385E9D] hover:shadow-sm"
          >
            <div className="flex items-start justify-between">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
                Inventory
              </p>

              <span className="text-2xl font-bold text-[#D1C8BF]">
                {
                  consumables.length
                }
              </span>
            </div>

            <h2 className="mt-8 text-xl font-bold">
              Consumables
            </h2>

            <p className="mt-2 text-xs leading-6 text-[#837A72]">
              Shared quantity,
              storage location and
              notes for day-to-day
              laboratory supplies.
            </p>

            <p className="mt-6 text-xs font-semibold text-[#385E9D]">
              Open consumables →
            </p>
          </Link>

          <Link
            href="/hub/lab"
            className="group border border-[#DDD6CF] bg-white p-6 transition hover:-translate-y-1 hover:border-[#385E9D] hover:shadow-sm"
          >
            <div className="flex items-start justify-between">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
                Laboratory
              </p>

              <span className="text-2xl font-bold text-[#D1C8BF]">
                {
                  instruments.length
                }
              </span>
            </div>

            <h2 className="mt-8 text-xl font-bold">
              Instruments
            </h2>

            <p className="mt-2 text-xs leading-6 text-[#837A72]">
              Availability,
              bookings, authorization
              and current instrument
              status.
            </p>

            <p className="mt-6 text-xs font-semibold text-[#385E9D]">
              Open lab →
            </p>
          </Link>
        </section>

        {/* ================================================= */}
        {/* STOCK ATTENTION + LAB STATUS */}
        {/* ================================================= */}

        <div className="mt-8 grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          {/* STOCK ATTENTION */}

          <section className="border border-[#DDD6CF] bg-white">
            <div className="flex items-center justify-between border-b border-[#E7E1DB] px-6 py-5">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A07100]">
                  Stock Monitoring
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Needs Attention
                </h2>
              </div>

              <Link
                href="/hub/inventory/consumables"
                className="text-xs font-semibold text-[#385E9D]"
              >
                View consumables →
              </Link>
            </div>

            {attentionItems.length ===
            0 ? (
              <div className="px-6 py-10">
                <p className="text-sm font-semibold text-[#2D6A45]">
                  No stock alerts.
                </p>

                <p className="mt-2 text-xs leading-6 text-[#837A72]">
                  Current chemical and
                  consumable records do
                  not require stock
                  attention.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-[#EEE9E4]">
                {attentionItems.map(
                  (
                    item
                  ) => (
                    <Link
                      key={
                        item.id
                      }
                      href={
                        item.href
                      }
                      className="grid gap-4 px-6 py-4 transition hover:bg-[#FAF9F7] md:grid-cols-[1.3fr_0.55fr_0.7fr]"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold">
                            {
                              item.name
                            }
                          </p>

                          <span className="rounded-full bg-[#F5F3EF] px-2 py-0.5 text-[7px] font-bold uppercase tracking-[0.1em] text-[#837A72]">
                            {
                              item.type
                            }
                          </span>
                        </div>

                        <p className="mt-1 text-[9px] text-[#928980]">
                          {item.location ||
                            "Location not set"}
                        </p>
                      </div>

                      <div>
                        <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#928980]">
                          Quantity
                        </p>

                        <p className="mt-1 text-xs font-semibold">
                          {item.quantity ??
                            "—"}{" "}
                          {
                            item.unit
                          }
                        </p>
                      </div>

                      <div>
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-[8px] font-bold ${statusClasses(
                            item.status
                          )}`}
                        >
                          {
                            item.status
                          }
                        </span>
                      </div>
                    </Link>
                  )
                )}
              </div>
            )}
          </section>

          {/* LAB STATUS */}

          <section className="bg-[#203650] p-6 text-white">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#F2A900]">
              Laboratory
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              Instrument Status
            </h2>

            <div className="mt-7 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-sm text-white/70">
                  Total Instruments
                </span>

                <span className="text-xl font-bold">
                  {
                    instruments.length
                  }
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-sm text-white/70">
                  Available
                </span>

                <span className="text-xl font-bold">
                  {
                    availableInstruments.length
                  }
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-sm text-white/70">
                  Unavailable /
                  Attention
                </span>

                <span className="text-xl font-bold">
                  {
                    unavailableInstruments.length
                  }
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-sm text-white/70">
                  Expired Chemicals
                </span>

                <span className="text-xl font-bold">
                  {
                    expiredChemicals.length
                  }
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                href="/hub/lab"
                className="inline-flex rounded-full bg-white px-5 py-2.5 text-xs font-semibold !text-[#203650]"
              >
                Open Lab →
              </Link>

              <Link
                href="/hub/lab/schedule"
                className="inline-flex rounded-full border border-white/25 px-5 py-2.5 text-xs font-semibold text-white"
              >
                Schedule →
              </Link>
            </div>
          </section>
        </div>

        {/* ================================================= */}
        {/* COLLABORATIVE INVENTORY */}
        {/* ================================================= */}

        <section className="mt-8 border border-[#DDD6CF] bg-white">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            <div className="p-6 md:p-7">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
                Shared Inventory
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Keep stock current
                together.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#706963]">
                Lab members can help
                maintain current
                consumable quantity,
                storage location and
                notes so inventory does
                not depend on one
                administrator.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href="/hub/inventory/consumables"
                  className="rounded-full bg-[#385E9D] px-5 py-2.5 text-xs font-semibold text-white"
                >
                  View Consumables →
                </Link>

                {canContributeConsumables && (
                  <Link
                    href="/hub/inventory/consumables/new"
                    className="rounded-full border border-[#D8D0C7] px-5 py-2.5 text-xs font-semibold"
                  >
                    Add Consumable
                  </Link>
                )}
              </div>
            </div>

            <div className="border-t border-[#E7E1DB] bg-[#FAF9F7] p-6 lg:border-l lg:border-t-0">
              <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#928980]">
                Permissions
              </p>

              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-xs font-semibold">
                    Students & Members
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-[#837A72]">
                    Update quantity,
                    location and notes;
                    add basic consumable
                    records.
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold">
                    Lab Manager &
                    Administrator
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-[#837A72]">
                    Control low-stock
                    thresholds, supplier
                    information and
                    archive records.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}