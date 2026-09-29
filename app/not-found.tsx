import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F8F6F2]">
      <section className="flex min-h-[78vh] items-center px-8 py-24 md:px-16">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
                SenSys Lab
              </p>

              <div className="mt-6 flex items-end gap-5">
                <span className="text-[110px] font-semibold leading-none tracking-[-0.08em] text-[#F2A900] md:text-[170px]">
                  404
                </span>

                <div className="mb-4 h-14 w-14 rounded-full border border-[#385E9D]/30 p-2">
                  <div className="flex h-full w-full items-center justify-center rounded-full border border-[#385E9D]/50">
                    <div className="h-3 w-3 rounded-full bg-[#F2A900]" />
                  </div>
                </div>
              </div>

              <h1 className="mt-7 max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#4F2C1D] md:text-6xl">
                This signal couldn't be found.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-[#6D655E]">
                The page may have moved, the address may be incorrect,
                or the resource may no longer be available.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="rounded-full bg-[#385E9D] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#2F507F]"
                >
                  Return home →
                </Link>

                <Link
                  href="/research"
                  className="rounded-full border border-[#D5CDC5] bg-white px-7 py-3.5 text-sm font-semibold text-[#4F2C1D] transition hover:border-[#385E9D] hover:text-[#385E9D]"
                >
                  Explore research
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden border border-[#DDD6CF] bg-white p-8 md:p-12">
              <div className="absolute right-[-50px] top-[-50px] h-40 w-40 rounded-full border border-[#385E9D]/10" />

              <div className="absolute right-[-15px] top-[-15px] h-24 w-24 rounded-full border border-[#385E9D]/15" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#F2A900]">
                Navigate SenSys
              </p>

              <div className="mt-8 divide-y divide-[#EEE8E1]">
                {[
                  [
                    "Research",
                    "/research",
                    "Intelligent sensory systems, diagnostics and environmental sensing",
                  ],

                  [
                    "People",
                    "/people",
                    "Meet the researchers building SenSys",
                  ],

                  [
                    "Facilities",
                    "/facilities",
                    "Explore fabrication, sensing and characterization capabilities",
                  ],

                  [
                    "Publications",
                    "/publications",
                    "Research outputs and scientific contributions",
                  ],

                  [
                    "Join SenSys",
                    "/join",
                    "Research, postdoctoral and internship opportunities",
                  ],
                ].map(
                  ([
                    label,
                    href,
                    description,
                  ]) => (
                    <Link
                      key={href}
                      href={href}
                      className="group block py-5"
                    >
                      <div className="flex items-start justify-between gap-5">
                        <div>
                          <p className="font-semibold text-[#4F2C1D] transition group-hover:text-[#385E9D]">
                            {label}
                          </p>

                          <p className="mt-1 max-w-lg text-xs leading-6 text-[#867D75]">
                            {description}
                          </p>
                        </div>

                        <span className="text-[#385E9D] transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}