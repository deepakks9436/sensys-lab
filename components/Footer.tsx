import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#DDD5CC] bg-[#F7F3EC] px-8 py-16 text-[#4F2C1D] md:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr]">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F2A900]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#F2A900]" />
              </div>

              <div>
                <p className="text-lg font-semibold">SenSys Lab</p>

                <p className="mt-1 text-[9px] uppercase tracking-[0.28em] text-[#837A72]">
                  University of Manitoba
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-md text-sm leading-7 text-[#706963]">
              Intelligent sensing systems integrating microsystems,
              microfluidics, advanced materials, biointegrated technologies,
              portable instrumentation, and data intelligence for healthcare,
              agriculture, food safety, and environmental applications.
            </p>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#385E9D]">
              Intelligent Sensing Systems
            </p>
          </div>

          {/* EXPLORE */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#385E9D]">
              Explore
            </p>

            <div className="mt-5 space-y-3 text-sm">
              <Link
                href="/research"
                className="block transition hover:text-[#385E9D]"
              >
                Research
              </Link>

              <Link
                href="/people"
                className="block transition hover:text-[#385E9D]"
              >
                People
              </Link>

              <Link
                href="/facilities"
                className="block transition hover:text-[#385E9D]"
              >
                Facilities
              </Link>

              <Link
                href="/news"
                className="block transition hover:text-[#385E9D]"
              >
                News & Impact
              </Link>

              <Link
                href="/join"
                className="block transition hover:text-[#385E9D]"
              >
                Join SenSys
              </Link>
            </div>
          </div>

          {/* OUTPUTS */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#385E9D]">
              Outputs
            </p>

            <div className="mt-5 space-y-3 text-sm">
              <Link
                href="/publications"
                className="block transition hover:text-[#385E9D]"
              >
                Publications
              </Link>

              <Link
                href="/patents"
                className="block transition hover:text-[#385E9D]"
              >
                Patents
              </Link>

              <Link
                href="/books"
                className="block transition hover:text-[#385E9D]"
              >
                Books
              </Link>
            </div>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-[#385E9D]">
              Foundations
            </p>

            <div className="mt-5 space-y-3 text-sm">
              <Link
                href="/research/graphene"
                className="block transition hover:text-[#385E9D]"
              >
                Graphene
              </Link>

              <Link
                href="/research/pesticide-detection"
                className="block transition hover:text-[#385E9D]"
              >
                Pesticide Detection
              </Link>

              <Link
                href="/research/water-quality"
                className="block transition hover:text-[#385E9D]"
              >
                Water Quality
              </Link>

              <Link
                href="/research/amr"
                className="block transition hover:text-[#385E9D]"
              >
                Pathogen & AMR
              </Link>
            </div>
          </div>

          {/* CONNECT */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#385E9D]">
              Connect
            </p>

            <div className="mt-5 space-y-3 text-sm">
              <a
                href="mailto:sanketgoel@gmail.com"
                className="block break-all transition hover:text-[#385E9D]"
              >
                sanketgoel@gmail.com
              </a>

              <a
                href="https://scholar.google.com/citations?hl=en&user=xgH6FBkAAAAJ&view_op=list_works&sortby=pubdate"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition hover:text-[#385E9D]"
              >
                Google Scholar ↗
              </a>

              <a
                href="https://www.linkedin.com/in/sanketgoel/"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition hover:text-[#385E9D]"
              >
                LinkedIn ↗
              </a>
            </div>

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#385E9D]">
                Location
              </p>

              <p className="mt-4 text-sm leading-7 text-[#706963]">
                University of Manitoba
                <br />
                Winnipeg, Manitoba
                <br />
                Canada
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-14 flex flex-col gap-4 border-t border-[#DDD5CC] pt-6 text-xs text-[#837A72] md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 SenSys Lab. University of Manitoba.
          </p>

          <div className="flex flex-wrap gap-5">
            <a
              href="https://www.canada.ca/en/impact-plus-chairs.html"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-[#385E9D]"
            >
              Eddie Goldenberg Research Chairs of Canada ↗
            </a>

            <a
              href="https://umanitoba.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-[#385E9D]"
            >
              University of Manitoba ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}