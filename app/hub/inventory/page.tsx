import Link from "next/link";

import {
  chemicals,
  components,
  consumables,
  purchaseRequests,
} from "../../../data/inventory";

function warningStatus(status: string) {
  return (
    status === "Low Stock" ||
    status === "Reorder" ||
    status === "Expired" ||
    status === "Out of Stock"
  );
}

export default function InventoryDashboard() {
  const allItems = [
    ...chemicals,
    ...consumables,
    ...components,
  ];

  const lowStock = allItems.filter((item) =>
    ["Low Stock", "Reorder", "Out of Stock"].includes(item.status)
  );

  const expired = chemicals.filter(
    (item) => item.status === "Expired"
  );

  const pendingPurchases = purchaseRequests.filter(
    (item) => item.status !== "Delivered"
  );

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[1320px]">
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
            Track chemicals, consumables, components, stock
            status, storage locations and procurement activity.
          </p>
        </div>

        <section className="mt-10 grid overflow-hidden border border-[#DDD6CF] bg-white sm:grid-cols-2 xl:grid-cols-5">
          <div className="border-b border-[#DDD6CF] p-6 sm:border-r xl:border-b-0">
            <p className="text-3xl font-bold">
              {chemicals.length}
            </p>

            <p className="mt-2 text-xs text-[#837A72]">
              Chemicals
            </p>
          </div>

          <div className="border-b border-[#DDD6CF] p-6 xl:border-b-0 xl:border-r">
            <p className="text-3xl font-bold">
              {consumables.length}
            </p>

            <p className="mt-2 text-xs text-[#837A72]">
              Consumables
            </p>
          </div>

          <div className="border-b border-[#DDD6CF] p-6 sm:border-r xl:border-b-0">
            <p className="text-3xl font-bold">
              {components.length}
            </p>

            <p className="mt-2 text-xs text-[#837A72]">
              Components
            </p>
          </div>

          <div className="border-b border-[#DDD6CF] p-6 xl:border-b-0 xl:border-r">
            <p className="text-3xl font-bold text-[#B57C00]">
              {lowStock.length}
            </p>

            <p className="mt-2 text-xs text-[#837A72]">
              Reorder attention
            </p>
          </div>

          <div className="p-6">
            <p className="text-3xl font-bold text-[#A23B35]">
              {expired.length}
            </p>

            <p className="mt-2 text-xs text-[#837A72]">
              Expired
            </p>
          </div>
        </section>

        <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Chemicals",
              text: "Stock, storage, expiry, hazards and SDS.",
              href: "/hub/inventory/chemicals",
              count: chemicals.length,
            },
            {
              title: "Consumables",
              text: "Pipette tips, PPE, substrates and lab supplies.",
              href: "/hub/inventory/consumables",
              count: consumables.length,
            },
            {
              title: "Components",
              text: "Electronics, sensors, pumps and technical parts.",
              href: "/hub/inventory/components",
              count: components.length,
            },
            {
              title: "Purchases",
              text: "Requests, approvals, orders and deliveries.",
              href: "/hub/inventory/purchases",
              count: pendingPurchases.length,
            },
          ].map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group border border-[#DDD6CF] bg-white p-6 transition hover:-translate-y-1 hover:border-[#385E9D] hover:shadow-sm"
            >
              <div className="flex items-start justify-between">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
                  Inventory
                </p>

                <span className="text-2xl font-bold text-[#D1C8BF]">
                  {card.count}
                </span>
              </div>

              <h2 className="mt-8 text-xl font-bold">
                {card.title}
              </h2>

              <p className="mt-2 text-xs leading-6 text-[#837A72]">
                {card.text}
              </p>

              <p className="mt-6 text-xs font-semibold text-[#385E9D]">
                Open module →
              </p>
            </Link>
          ))}
        </section>

        <div className="mt-8 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="border border-[#DDD6CF] bg-white">
            <div className="border-b border-[#E7E1DB] px-6 py-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A07100]">
                Stock Monitoring
              </p>

              <h2 className="mt-1 text-xl font-bold">
                Needs Reordering
              </h2>
            </div>

            <div className="divide-y divide-[#EEE9E4]">
              {allItems
                .filter((item) => warningStatus(item.status))
                .slice(0, 8)
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-5 px-6 py-4"
                  >
                    <div>
                      <p className="text-sm font-semibold">
                        {item.name}
                      </p>

                      <p className="mt-1 text-[10px] text-[#928980]">
                        {item.location}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-[9px] font-bold ${
                        item.status === "Expired"
                          ? "bg-[#FBE7E5] text-[#A23B35]"
                          : "bg-[#FFF4D9] text-[#8A6200]"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
            </div>
          </section>

          <section className="bg-[#203650] p-6 text-white">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#F2A900]">
              Procurement
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              Purchase Pipeline
            </h2>

            <div className="mt-7 space-y-5">
              {["Requested", "Approved", "Ordered", "Delivered"].map(
                (status) => {
                  const count = purchaseRequests.filter(
                    (item) => item.status === status
                  ).length;

                  return (
                    <div
                      key={status}
                      className="flex items-center justify-between border-b border-white/10 pb-4"
                    >
                      <span className="text-sm text-white/70">
                        {status}
                      </span>

                      <span className="text-xl font-bold">
                        {count}
                      </span>
                    </div>
                  );
                }
              )}
            </div>

            <Link
              href="/hub/inventory/purchases"
              className="mt-6 inline-flex rounded-full bg-white px-5 py-2.5 text-xs font-semibold !text-[#203650]"
            >
              View purchase requests →
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}