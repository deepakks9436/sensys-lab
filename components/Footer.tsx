import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#385E9D] px-8 py-16 text-white md:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr]">
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#F2A900]">
                <span className="absolute h-5 w-5 rounded-full border border-white/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#F2A900]" />
              </div>

              <div>
                <p className="text-lg font-semibold text-white">
                  SenSys Lab
                </p>

                <p className="mt-1 text-[9px] uppercase tracking-[0.28em] text-white/65">
                  University of Manitoba
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/75">
              Intelligent sensing systems integrating microsystems,
              microfluidics, advanced materials, biointegrated technologies,
              portable instrumentation, and data intelligence for healthcare,
              agriculture, food safety, and environmental applications.
            </p>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#F2A900]">
              Intelligent Sensing Systems
            </p>
          </div>

          {/* EXPLORE */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F2A900]">
              Explore
            </p>

            <div className="mt-5 space-y-3 text-sm">
              <Link
                href="/research"
                className="block text-white/85 transition hover:translate-x-1 hover:text-white"
              >
                Research
              </Link>

              <Link
                href="/people"
                className="block text-white/85 transition hover:translate-x-1 hover:text-white"
              >
                People
              </Link>

              <Link
                href="/facilities"
                className="block text-white/85 transition hover:translate-x-1 hover:text-white"
              >
                Facilities
              </Link>

              <Link
                href="/news"
                className="block text-white/85 transition hover:translate-x-1 hover:text-white"
              >
                News & Impact
              </Link>

              <Link
                href="/join"
                className="block text-white/85 transition hover:translate-x-1 hover:text-white"
              >
                Join SenSys
              </Link>
            </div>
          </div>

          {/* OUTPUTS */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F2A900]">
              Outputs
            </p>

            <div className="mt-5 space-y-3 text-sm">
              <Link
                href="/publications"
                className="block text-white/85 transition hover:translate-x-1 hover:text-white"
              >
                Publications
              </Link>

              <Link
                href="/patents"
                className="block text-white/85 transition hover:translate-x-1 hover:text-white"
              >
                Patents
              </Link>

              <Link
                href="/books"
                className="block text-white/85 transition hover:translate-x-1 hover:text-white"
              >
                Books
              </Link>
            </div>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-[#F2A900]">
              Foundations
            </p>

            <div className="mt-5 space-y-3 text-sm">
              <Link
                href="/research/graphene"
                className="block text-white/85 transition hover:translate-x-1 hover:text-white"
              >
                Graphene
              </Link>

              <Link
                href="/research/pesticide-detection"
                className="block text-white/85 transition hover:translate-x-1 hover:text-white"
              >
                Pesticide Detection
              </Link>

              <Link
                href="/research/water-quality"
                className="block text-white/85 transition hover:translate-x-1 hover:text-white"
              >
                Water Quality
              </Link>

              <Link
                href="/research/amr"
                className="block text-white/85 transition hover:translate-x-1 hover:text-white"
              >
                Pathogen & AMR
              </Link>
            </div>
          </div>

          {/* CONNECT */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F2A900]">
              Connect
            </p>

            <div className="mt-5 space-y-3 text-sm">
              <a
                href="mailto:sanketgoel@gmail.com"
                className="block break-all text-white/85 transition hover:text-white"
              >
                sanketgoel@gmail.com
              </a>

              <a
                href="https://scholar.google.com/citations?hl=en&user=xgH6FBkAAAAJ&view_op=list_works&sortby=pubdate"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/85 transition hover:translate-x-1 hover:text-white"
              >
                Google Scholar ↗
              </a>

              <a
                href="https://www.linkedin.com/in/sanketgoel/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/85 transition hover:translate-x-1 hover:text-white"
              >
                LinkedIn ↗
              </a>
            </div>

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F2A900]">
                Location
              </p>

              <p className="mt-4 text-sm leading-7 text-white/75">
                University of Manitoba
                <br />
                Winnipeg, Manitoba
                <br />
                Canada
              </p>
            </div>
          </div>
        </div>

        {/* BLUE / GOLD ACCENT */}
        <div className="mt-14 h-[2px] w-full bg-gradient-to-r from-[#F2A900] via-[#00A3E0] to-transparent" />

        {/* BOTTOM */}
        <div className="mt-6 flex flex-col gap-4 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© 2026 SenSys Lab. University of Manitoba.</p>

          <div className="flex flex-wrap gap-5">
            <a
              href="https://www.canada.ca/en/impact-plus-chairs.html"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              Eddie Goldenberg Research Chairs of Canada ↗
            </a>

            <a
              href="https://umanitoba.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              University of Manitoba ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}