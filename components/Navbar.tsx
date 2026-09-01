"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import ThemeToggle from "./ThemeToggle";
import SiteSearch from "./SiteSearch";

/* ============================================================
   RESEARCH THRUSTS
============================================================ */

const researchThrusts = [
  {
    title: "Intelligent Microsystems",
    href: "/research#intelligent-microsystems",
  },
  {
    title: "Biointegrated Systems",
    href: "/research#biointegrated-systems",
  },
  {
    title: "Intelligent Diagnostics",
    href: "/research#intelligent-diagnostics",
  },
  {
    title: "Agri & Environmental Intelligence",
    href: "/research#agri-environment",
  },
];

/* ============================================================
   RESEARCH FOUNDATIONS
============================================================ */

const researchFoundations = [
  {
    title: "Graphene Technologies",
    href: "/research/graphene",
  },
  {
    title: "Pesticide Detection",
    href: "/research/pesticide-detection",
  },
  {
    title: "Water Quality Technologies",
    href: "/research/water-quality",
  },
  {
    title: "Pathogen & AMR Diagnostics",
    href: "/research/amr",
  },
];

/* ============================================================
   OUTPUTS
============================================================ */

const outputs = [
  {
    title: "Publications",
    href: "/publications",
  },
  {
    title: "Patents",
    href: "/patents",
  },
  {
    title: "Books",
    href: "/books",
  },
];

/* ============================================================
   NAVBAR
============================================================ */

export default function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  const [mobileResearchOpen, setMobileResearchOpen] =
    useState(false);

  const [mobileOutputsOpen, setMobileOutputsOpen] =
    useState(false);

  const [researchOpen, setResearchOpen] =
    useState(false);

  const [outputsOpen, setOutputsOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  /* ========================================================
     SCROLL STATE
  ======================================================== */

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", onScroll);
  }, []);

  /* ========================================================
     CLOSE MENUS ON ROUTE CHANGE
  ======================================================== */

  useEffect(() => {
    setMobileOpen(false);
    setMobileResearchOpen(false);
    setMobileOutputsOpen(false);
    setResearchOpen(false);
    setOutputsOpen(false);
  }, [pathname]);

  /* ========================================================
     MOBILE BODY LOCK
  ======================================================== */

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [mobileOpen]);

  /* ========================================================
     ACTIVE NAV
  ======================================================== */

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  /* ========================================================
     SEARCH
  ======================================================== */

  const openSearch = () => {
    setResearchOpen(false);
    setOutputsOpen(false);
    setMobileOpen(false);

    window.dispatchEvent(
      new CustomEvent("sensys:open-search")
    );
  };

  return (
    <>
      <SiteSearch />

      <header
        className={`dark-nav-surface sticky top-0 z-50 border-t-[3px] border-[var(--um-gold)] transition-all duration-300 ${
          scrolled
            ? "border-b border-[var(--border)] bg-[var(--surface)]/95 shadow-sm backdrop-blur-xl"
            : "border-b border-[var(--border)] bg-[var(--surface)]"
        }`}
      >
        <nav
          className="mx-auto flex h-[82px] max-w-7xl items-center justify-between px-5 md:px-8"
          aria-label="Main navigation"
        >
          {/* ================================================= */}
          {/* BRAND */}
          {/* ================================================= */}

          <div className="flex min-w-0 items-center gap-3">
            {/* SENSYS LAB */}

            <Link
              href="/"
              className="group flex shrink-0 items-center gap-3"
              aria-label="SenSys Lab home"
            >
              <div className="relative hidden h-10 w-10 items-center justify-center rounded-full border border-[var(--um-blue)] transition group-hover:border-[var(--um-gold)] sm:flex">
                <span className="absolute h-5 w-5 rounded-full border border-[var(--um-blue)]/35" />

                <span className="h-2.5 w-2.5 rounded-full bg-[var(--um-gold)]" />
              </div>

              <div className="leading-none">
                <p className="whitespace-nowrap text-[17px] font-semibold tracking-tight text-[var(--foreground)]">
                  SenSys Lab
                </p>
              </div>
            </Link>

            {/* DIVIDER */}

            <div className="hidden h-8 w-px bg-[var(--border-strong)] md:block" />

            {/* UNIVERSITY OF MANITOBA */}

            <a
              href="https://umanitoba.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="um-logo-panel hidden items-center rounded-md px-3 py-2 transition hover:shadow-md md:flex"
              aria-label="University of Manitoba"
            >
              <Image
                src="/brand/umanitoba.svg"
                alt="University of Manitoba"
                width={154}
                height={38}
                className="h-[30px] w-auto object-contain"
                priority
                unoptimized
              />
            </a>
          </div>

          {/* ================================================= */}
          {/* DESKTOP NAV */}
          {/* ================================================= */}

          <div className="hidden items-center gap-5 lg:flex xl:gap-6">
            {/* ================================================= */}
            {/* RESEARCH */}
            {/* ================================================= */}

            <div
              className="relative"
              onMouseEnter={() =>
                setResearchOpen(true)
              }
              onMouseLeave={() =>
                setResearchOpen(false)
              }
            >
              <button
                type="button"
                aria-expanded={researchOpen}
                aria-haspopup="true"
                onClick={() => {
                  setResearchOpen(
                    (current) => !current
                  );

                  setOutputsOpen(false);
                }}
                className={`flex items-center gap-2 border-b pb-1 text-sm font-medium transition ${
                  pathname.startsWith("/research")
                    ? "border-[var(--um-blue)] text-[var(--um-blue)]"
                    : "border-transparent text-[var(--foreground)] hover:border-[var(--um-blue)] hover:text-[var(--um-blue)]"
                }`}
              >
                Research

                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform ${
                    researchOpen
                      ? "rotate-180"
                      : ""
                  }`}
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {researchOpen && (
                <div className="absolute left-1/2 top-full w-[660px] -translate-x-1/2 pt-5">
                  <div className="grid grid-cols-2 overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-2xl">
                    {/* THRUSTS */}

                    <div className="p-7">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--um-blue)]">
                        SenSys Lab Research
                      </p>

                      <div className="mt-5 space-y-1">
                        {researchThrusts.map(
                          (item, index) => (
                            <Link
                              key={item.title}
                              href={item.href}
                              className="group flex items-start gap-4 border-b border-[var(--border)] py-4 last:border-b-0"
                            >
                              <span className="pt-[2px] text-[10px] font-semibold text-[var(--um-gold)]">
                                0{index + 1}
                              </span>

                              <p className="text-sm font-semibold text-[var(--foreground)] transition group-hover:text-[var(--um-blue)]">
                                {item.title}
                              </p>
                            </Link>
                          )
                        )}
                      </div>

                      <Link
                        href="/research"
                        className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[var(--um-blue)] transition hover:gap-3"
                      >
                        View all research
                        <span>→</span>
                      </Link>
                    </div>

                    {/* FOUNDATIONS */}

                    <div className="border-l border-[var(--border)] bg-[var(--surface-soft)] p-7">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--um-blue)]">
                        Research Foundations
                      </p>

                      <p className="mt-3 text-xs leading-6 text-[var(--foreground-muted)]">
                        Explore established technology
                        programmes across sensing,
                        microfluidics, diagnostics, and
                        advanced materials.
                      </p>

                      <div className="mt-5 space-y-2">
                        {researchFoundations.map(
                          (item) => (
                            <Link
                              key={item.title}
                              href={item.href}
                              className="group flex items-center justify-between border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] transition hover:border-[var(--um-blue)] hover:text-[var(--um-blue)]"
                            >
                              <span>
                                {item.title}
                              </span>

                              <span className="transition-transform group-hover:translate-x-1">
                                →
                              </span>
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ================================================= */}
            {/* PEOPLE */}
            {/* ================================================= */}

            <Link
              href="/people"
              className={`border-b pb-1 text-sm font-medium transition ${
                isActive("/people")
                  ? "border-[var(--um-blue)] text-[var(--um-blue)]"
                  : "border-transparent text-[var(--foreground)] hover:border-[var(--um-blue)] hover:text-[var(--um-blue)]"
              }`}
            >
              People
            </Link>

            {/* ================================================= */}
            {/* OUTPUTS */}
            {/* ================================================= */}

            <div
              className="relative"
              onMouseEnter={() =>
                setOutputsOpen(true)
              }
              onMouseLeave={() =>
                setOutputsOpen(false)
              }
            >
              <button
                type="button"
                aria-expanded={outputsOpen}
                aria-haspopup="true"
                onClick={() => {
                  setOutputsOpen(
                    (current) => !current
                  );

                  setResearchOpen(false);
                }}
                className={`flex items-center gap-2 border-b pb-1 text-sm font-medium transition ${
                  pathname.startsWith(
                    "/publications"
                  ) ||
                  pathname.startsWith(
                    "/patents"
                  ) ||
                  pathname.startsWith(
                    "/books"
                  )
                    ? "border-[var(--um-blue)] text-[var(--um-blue)]"
                    : "border-transparent text-[var(--foreground)] hover:border-[var(--um-blue)] hover:text-[var(--um-blue)]"
                }`}
              >
                Outputs

                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform ${
                    outputsOpen
                      ? "rotate-180"
                      : ""
                  }`}
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {outputsOpen && (
                <div className="absolute left-1/2 top-full w-56 -translate-x-1/2 pt-5">
                  <div className="border border-[var(--border)] bg-[var(--surface)] p-2 shadow-xl">
                    {outputs.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="group flex items-center justify-between px-4 py-3 text-sm text-[var(--foreground)] transition hover:bg-[var(--surface-soft)] hover:text-[var(--um-blue)]"
                      >
                        {item.title}

                        <span className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ================================================= */}
            {/* FACILITIES */}
            {/* ================================================= */}

            <Link
              href="/facilities"
              className={`border-b pb-1 text-sm font-medium transition ${
                isActive("/facilities")
                  ? "border-[var(--um-blue)] text-[var(--um-blue)]"
                  : "border-transparent text-[var(--foreground)] hover:border-[var(--um-blue)] hover:text-[var(--um-blue)]"
              }`}
            >
              Facilities
            </Link>

            {/* ================================================= */}
            {/* NEWS */}
            {/* ================================================= */}

            <Link
              href="/news"
              className={`border-b pb-1 text-sm font-medium transition ${
                isActive("/news")
                  ? "border-[var(--um-blue)] text-[var(--um-blue)]"
                  : "border-transparent text-[var(--foreground)] hover:border-[var(--um-blue)] hover:text-[var(--um-blue)]"
              }`}
            >
              News
            </Link>

            {/* ================================================= */}
            {/* SEARCH */}
            {/* ================================================= */}

            <button
              type="button"
              onClick={openSearch}
              aria-label="Search SenSys Lab"
              className="group flex h-10 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 text-[var(--foreground-muted)] transition hover:border-[var(--um-blue)] hover:text-[var(--um-blue)]"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                />

                <path d="m21 21-4.3-4.3" />
              </svg>

              <span className="hidden text-xs font-medium xl:inline">
                Search
              </span>

              <span className="hidden rounded border border-[var(--border)] px-1.5 py-0.5 text-[9px] font-semibold text-[var(--foreground-muted)] xl:inline">
                Ctrl K
              </span>
            </button>

            {/* ================================================= */}
            {/* JOIN */}
            {/* ================================================= */}

            <Link
              href="/join"
              className="rounded-full bg-[var(--um-blue)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--um-blue-dark)]"
            >
              Join
            </Link>

            {/* ================================================= */}
            {/* THEME */}
            {/* ================================================= */}

            <ThemeToggle />
          </div>

          {/* ================================================= */}
          {/* MOBILE CONTROLS */}
          {/* ================================================= */}

          <div className="flex items-center gap-2 lg:hidden">
            {/* SEARCH */}

            <button
              type="button"
              onClick={openSearch}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition hover:border-[var(--um-blue)] hover:text-[var(--um-blue)]"
              aria-label="Search SenSys Lab"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                />

                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>

            <ThemeToggle />

            <button
              type="button"
              onClick={() =>
                setMobileOpen(
                  (current) => !current
                )
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition hover:border-[var(--um-blue)] hover:text-[var(--um-blue)]"
              aria-label={
                mobileOpen
                  ? "Close navigation"
                  : "Open navigation"
              }
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* ================================================= */}
        {/* MOBILE MENU */}
        {/* ================================================= */}

        {mobileOpen && (
          <div className="fixed inset-x-0 bottom-0 top-[85px] z-40 overflow-y-auto border-t border-[var(--border)] bg-[var(--surface)] px-6 py-6 lg:hidden">
            <div className="mx-auto max-w-7xl">
              {/* ================================================= */}
              {/* UNIVERSITY BRAND */}
              {/* ================================================= */}

              <div className="mb-6 flex items-center justify-between gap-4 border-b border-[var(--border)] pb-6">
                <div>
                  <p className="text-lg font-semibold">
                    SenSys Lab
                  </p>

                  <p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-[var(--foreground-muted)]">
                    University of Manitoba
                  </p>
                </div>

                <a
                  href="https://umanitoba.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="um-logo-panel flex items-center rounded-md px-2.5 py-2"
                  aria-label="University of Manitoba"
                >
                  <Image
                    src="/brand/umanitoba.svg"
                    alt="University of Manitoba"
                    width={132}
                    height={34}
                    className="h-[27px] w-auto object-contain"
                    unoptimized
                  />
                </a>
              </div>

              {/* ================================================= */}
              {/* SEARCH */}
              {/* ================================================= */}

              <button
                type="button"
                onClick={openSearch}
                className="mb-4 flex w-full items-center gap-3 border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-4 text-left text-sm text-[var(--foreground-muted)] transition hover:border-[var(--um-blue)]"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[var(--um-blue)]"
                  aria-hidden="true"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="8"
                  />

                  <path d="m21 21-4.3-4.3" />
                </svg>

                Search SenSys Lab
              </button>

              {/* ================================================= */}
              {/* RESEARCH */}
              {/* ================================================= */}

              <button
                type="button"
                onClick={() =>
                  setMobileResearchOpen(
                    (current) => !current
                  )
                }
                className="flex w-full items-center justify-between border-b border-[var(--border)] py-4 text-left text-sm font-semibold text-[var(--foreground)]"
              >
                Research

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`text-[var(--um-blue)] transition-transform ${
                    mobileResearchOpen
                      ? "rotate-180"
                      : ""
                  }`}
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {mobileResearchOpen && (
                <div className="border-b border-[var(--border)] py-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--um-blue)]">
                    SenSys Lab Research
                  </p>

                  <div className="mt-3 space-y-1">
                    {researchThrusts.map(
                      (item, index) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="flex gap-3 py-2.5 text-sm text-[var(--foreground)]"
                        >
                          <span className="text-xs font-semibold text-[var(--um-gold)]">
                            0{index + 1}
                          </span>

                          {item.title}
                        </Link>
                      )
                    )}
                  </div>

                  <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--um-blue)]">
                    Research Foundations
                  </p>

                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {researchFoundations.map(
                      (item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 text-xs text-[var(--foreground)]"
                        >
                          {item.title}
                        </Link>
                      )
                    )}
                  </div>

                  <Link
                    href="/research"
                    className="mt-4 inline-block text-sm font-semibold text-[var(--um-blue)]"
                  >
                    View all research →
                  </Link>
                </div>
              )}

              {/* ================================================= */}
              {/* PEOPLE */}
              {/* ================================================= */}

              <Link
                href="/people"
                className="block border-b border-[var(--border)] py-4 text-sm font-medium text-[var(--foreground)]"
              >
                People
              </Link>

              {/* ================================================= */}
              {/* OUTPUTS */}
              {/* ================================================= */}

              <button
                type="button"
                onClick={() =>
                  setMobileOutputsOpen(
                    (current) => !current
                  )
                }
                className="flex w-full items-center justify-between border-b border-[var(--border)] py-4 text-left text-sm font-semibold text-[var(--foreground)]"
              >
                Outputs

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`text-[var(--um-blue)] transition-transform ${
                    mobileOutputsOpen
                      ? "rotate-180"
                      : ""
                  }`}
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {mobileOutputsOpen && (
                <div className="grid grid-cols-3 gap-2 border-b border-[var(--border)] py-5">
                  {outputs.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-3 text-center text-xs text-[var(--foreground)]"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}

              {/* ================================================= */}
              {/* FACILITIES */}
              {/* ================================================= */}

              <Link
                href="/facilities"
                className="block border-b border-[var(--border)] py-4 text-sm font-medium text-[var(--foreground)]"
              >
                Facilities
              </Link>

              {/* ================================================= */}
              {/* NEWS */}
              {/* ================================================= */}

              <Link
                href="/news"
                className="block border-b border-[var(--border)] py-4 text-sm font-medium text-[var(--foreground)]"
              >
                News & Impact
              </Link>

              {/* ================================================= */}
              {/* JOIN */}
              {/* ================================================= */}

              <Link
                href="/join"
                className="mt-6 block rounded-full bg-[var(--um-blue)] px-6 py-4 text-center text-sm font-semibold text-white transition hover:bg-[var(--um-blue-dark)]"
              >
                Join SenSys Lab
              </Link>

              <p className="mt-8 text-center text-[10px] uppercase tracking-[0.22em] text-[var(--foreground-muted)]">
                SenSys Lab · University of Manitoba · Winnipeg, Canada
              </p>
            </div>
          </div>
        )}
      </header>
    </>
  );
}