import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--section-blue)] px-8 py-16 text-white md:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.72fr_0.72fr_0.9fr]">
          {/* ================================================= */}
          {/* BRAND */}
          {/* ================================================= */}

          <div>
            <div className="flex flex-wrap items-center gap-5">
              <div>
                <p className="text-2xl font-semibold tracking-tight">
                  SenSys Lab
                </p>

                <p className="mt-2 text-xs uppercase tracking-[0.24em] text-white/55">
                  Intelligent Sensory Systems
                </p>
              </div>

              <div className="hidden h-11 w-px bg-white/20 sm:block" />

              {/* UNIVERSITY LOGO */}

              <a
                href="https://umanitoba.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white px-4 py-3"
                aria-label="University of Manitoba"
              >
                <Image
                  src="/brand/umanitoba.svg"
                  alt="University of Manitoba"
                  width={170}
                  height={44}
                  className="h-[36px] w-auto object-contain"
                  unoptimized
                />
              </a>
            </div>

            <p className="mt-7 max-w-md text-sm leading-7 text-white/70">
              Developing intelligent cyber-physical sensory systems across
              microsystems, diagnostics, biointegrated technologies,
              environmental intelligence, and translational engineering.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/20 px-4 py-2 text-xs text-white/75">
                Reimagining
              </span>

              <span className="rounded-full border border-white/20 px-4 py-2 text-xs text-white/75">
                One Health
              </span>

              <span className="rounded-full border border-white/20 px-4 py-2 text-xs text-white/75">
                Technology Translation
              </span>
            </div>
          </div>

          {/* ================================================= */}
          {/* EXPLORE */}
          {/* ================================================= */}

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--um-gold)]">
              Explore
            </p>

            <div className="mt-5 space-y-3 text-sm text-white/75">
              <Link
                href="/research"
                className="block transition hover:text-white"
              >
                Research
              </Link>

              <Link
                href="/people"
                className="block transition hover:text-white"
              >
                People
              </Link>

              <Link
                href="/facilities"
                className="block transition hover:text-white"
              >
                Facilities
              </Link>

              <Link
                href="/news"
                className="block transition hover:text-white"
              >
                News & Impact
              </Link>

              <Link
                href="/join"
                className="block transition hover:text-white"
              >
                Join SenSys Lab
              </Link>
            </div>
          </div>

          {/* ================================================= */}
          {/* OUTPUTS */}
          {/* ================================================= */}

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--um-gold)]">
              Outputs
            </p>

            <div className="mt-5 space-y-3 text-sm text-white/75">
              <Link
                href="/publications"
                className="block transition hover:text-white"
              >
                Publications
              </Link>

              <Link
                href="/patents"
                className="block transition hover:text-white"
              >
                Patents
              </Link>

              <Link
                href="/books"
                className="block transition hover:text-white"
              >
                Books
              </Link>
            </div>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--um-gold)]">
              Foundations
            </p>

            <div className="mt-5 space-y-3 text-sm text-white/75">
              <Link
                href="/research/graphene"
                className="block transition hover:text-white"
              >
                Graphene
              </Link>

              <Link
                href="/research/pesticide-detection"
                className="block transition hover:text-white"
              >
                Pesticide Detection
              </Link>

              <Link
                href="/research/water-quality"
                className="block transition hover:text-white"
              >
                Water Quality
              </Link>

              <Link
                href="/research/amr"
                className="block transition hover:text-white"
              >
                Pathogen & AMR
              </Link>
            </div>
          </div>

          {/* ================================================= */}
          {/* CONNECT */}
          {/* ================================================= */}

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--um-gold)]">
              Connect
            </p>

            <div className="mt-5 space-y-3 text-sm text-white/75">
              <a
                href="mailto:sanketgoel@gmail.com"
                className="block break-all transition hover:text-white"
              >
                sanketgoel@gmail.com
              </a>

              <a
                href="https://scholar.google.com/citations?hl=en&user=xgH6FBkAAAAJ&view_op=list_works&sortby=pubdate"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition hover:text-white"
              >
                Google Scholar ↗
              </a>

              <a
                href="https://www.linkedin.com/in/sanketgoel/"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition hover:text-white"
              >
                LinkedIn ↗
              </a>
            </div>

            <div className="mt-8 border-t border-white/15 pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
                Based at
              </p>

              <p className="mt-3 text-sm leading-7 text-white/75">
                University of Manitoba
                <br />
                Winnipeg, Manitoba
                <br />
                Canada
              </p>
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* BOTTOM */}
        {/* ================================================= */}

        <div className="mt-14 flex flex-col gap-5 border-t border-white/15 pt-7 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 SenSys Lab · University of Manitoba
          </p>

          <div className="flex flex-wrap gap-5">
            <a
              href="https://www.canada.ca/en/impact-plus-chairs.html"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              Canada Global Impact+ Research Chairs ↗
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