import { purchaseRequests } from "../../../../data/inventory";

function statusClasses(status: string) {
  if (status === "Delivered") {
    return "bg-[#E8F4EC] text-[#2D6A45]";
  }

  if (status === "Ordered") {
    return "bg-[#E8EFF8] text-[#385E9D]";
  }

  if (status === "Approved") {
    return "bg-[#FFF4D9] text-[#8A6200]";
  }

  return "bg-[#F1EFEC] text-[#706963]";
}

export default function PurchasesPage() {
  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[1320px]">
        <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#385E9D]">
          Inventory · Procurement
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-[-0.035em] md:text-5xl">
          Purchase Requests.
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#706963]">
          Track requests from initial submission through approval,
          ordering and delivery.
        </p>

        <div className="mt-10 overflow-hidden border border-[#DDD6CF] bg-white">
          <div className="hidden grid-cols-[0.55fr_1.35fr_0.9fr_0.7fr_0.8fr_0.65fr] border-b border-[#DDD6CF] bg-[#F5F3EF] px-6 py-4 text-[8px] font-bold uppercase tracking-[0.15em] text-[#837A72] md:grid">
            <span>ID</span>
            <span>Item</span>
            <span>Requester</span>
            <span>Quantity</span>
            <span>Cost</span>
            <span>Status</span>
          </div>

          <div className="divide-y divide-[#EEE9E4]">
            {purchaseRequests.map((request) => (
              <div
                key={request.id}
                className="grid gap-4 px-6 py-5 md:grid-cols-[0.55fr_1.35fr_0.9fr_0.7fr_0.8fr_0.65fr] md:items-center"
              >
                <p className="text-xs font-bold text-[#385E9D]">
                  {request.id}
                </p>

                <div>
                  <p className="text-sm font-semibold">
                    {request.item}
                  </p>

                  <p className="mt-1 text-[10px] text-[#928980]">
                    {request.category} · {request.supplier}
                  </p>
                </div>

                <p className="text-xs text-[#706963]">
                  {request.requester}
                </p>

                <p className="text-xs">
                  {request.quantity}
                </p>

                <p className="text-xs font-semibold">
                  {request.estimatedCost}
                </p>

                <span
                  className={`w-fit rounded-full px-3 py-1 text-[9px] font-bold ${statusClasses(
                    request.status
                  )}`}
                >
                  {request.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}