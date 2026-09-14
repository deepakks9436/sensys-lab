import { components } from "../../../../data/inventory";

function statusClasses(status: string) {
  if (status === "In Stock") {
    return "bg-[#E8F4EC] text-[#2D6A45]";
  }

  return "bg-[#FFF4D9] text-[#8A6200]";
}

export default function ComponentsPage() {
  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[1320px]">
        <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#385E9D]">
          Inventory · Components
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-[-0.035em] md:text-5xl">
          Components & Parts.
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#706963]">
          Electronics, sensors, pumps, embedded-system parts and
          reusable technical components.
        </p>

        <div className="mt-10 overflow-hidden border border-[#DDD6CF] bg-white">
          <div className="hidden grid-cols-[1.3fr_0.85fr_0.7fr_0.65fr_1fr_0.65fr] border-b border-[#DDD6CF] bg-[#F5F3EF] px-6 py-4 text-[8px] font-bold uppercase tracking-[0.15em] text-[#837A72] md:grid">
            <span>Component</span>
            <span>Category</span>
            <span>Model</span>
            <span>Quantity</span>
            <span>Location</span>
            <span>Status</span>
          </div>

          <div className="divide-y divide-[#EEE9E4]">
            {components.map((item) => (
              <div
                key={item.id}
                className="grid gap-4 px-6 py-5 md:grid-cols-[1.3fr_0.85fr_0.7fr_0.65fr_1fr_0.65fr] md:items-center"
              >
                <div>
                  <p className="text-sm font-semibold">
                    {item.name}
                  </p>

                  <p className="mt-1 text-[10px] text-[#928980]">
                    {item.manufacturer}
                  </p>
                </div>

                <p className="text-xs text-[#706963]">
                  {item.category}
                </p>

                <p className="text-xs">
                  {item.model}
                </p>

                <p className="text-sm font-semibold">
                  {item.quantity}
                </p>

                <p className="text-xs text-[#706963]">
                  {item.location}
                </p>

                <span
                  className={`w-fit rounded-full px-3 py-1 text-[9px] font-bold ${statusClasses(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}