"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/* ============================================================
   DYNAMIC RESEARCH THEMES
============================================================ */

const heroThemes = [
  {
    number: "01",
    label: "One Health",
    kicker: "Human · Environmental · Societal Health",
    description:
      "Connecting human health, environmental quality, food systems, and intelligent sensing through integrated cyber-physical technologies.",
    image: "/research/AMR/Bacteria-on-chip.png",
    imageTitle: "Bacteria-on-Chip",
    imageCategory: "Intelligent Diagnostics",
    href: "/research/amr",
  },
  {
    number: "02",
    label: "Diagnostics",
    kicker: "Point-of-Care · Connected · Intelligent",
    description:
      "Moving sensing, diagnostics, and decision-making closer to the point of need through portable and connected analytical systems.",
    image: "/research/pesticide-detection/pestisafe-2.jpg",
    imageTitle: "Portable Diagnostic Systems",
    imageCategory: "Intelligent Diagnostics",
    href: "/research/pesticide-detection",
  },
  {
    number: "03",
    label: "Environment",
    kicker: "Water · Soil · Environmental Intelligence",
    description:
      "Transforming distributed measurements into actionable intelligence for safer water, healthier environments, and resilient communities.",
    image: "/research/water-quality/ion-selective-array.png",
    imageTitle: "Connected Water Intelligence",
    imageCategory: "Environmental Sensing",
    href: "/research/water-quality",
  },
  {
    number: "04",
    label: "Food & Agriculture",
    kicker: "Food Safety · Agriculture · Field Sensing",
    description:
      "Developing field-ready technologies for pesticide monitoring, food safety, precision agriculture, and sustainable production systems.",
    image: "/research/pesticide-detection/pestisafe-3.png",
    imageTitle: "Field-Ready Sensing",
    imageCategory: "Agri & Food Intelligence",
    href: "/research/pesticide-detection",
  },
  {
    number: "05",
    label: "Prosperity",
    kicker: "Translation · Innovation · Deployment",
    description:
      "Turning sensing science into scalable technologies that strengthen communities, industries, and future innovation ecosystems.",
    image: "/research/graphene/ctni-microfluidic-sensor.jpg",
    imageTitle: "Translational Microsystems",
    imageCategory: "Technology Translation",
    href: "/research/graphene",
  },
];

const headlineWords = [
  "Sensing.",
  "Engineering.",
  "Reimagining.",
];

/* ============================================================
   COMPONENT
============================================================ */

export default function DynamicHero() {
  const [activeThemeIndex, setActiveThemeIndex] = useState(0);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  /* ========================================================
     RESEARCH TOPIC ROTATION
     Same timing in light + dark mode
  ======================================================== */

  useEffect(() => {
    if (paused) return;

    const interval = window.setInterval(() => {
      setActiveThemeIndex((current) =>
        current === heroThemes.length - 1
          ? 0
          : current + 1
      );
    }, 3000);

    return () => window.clearInterval(interval);
  }, [paused]);

  /* ========================================================
     SENSING → ENGINEERING → REIMAGINING
     Same timing in both themes
  ======================================================== */

  useEffect(() => {
    if (paused) return;

    const interval = window.setInterval(() => {
      setHighlightIndex((current) =>
        current === headlineWords.length - 1
          ? 0
          : current + 1
      );
    }, 1500);

    return () => window.clearInterval(interval);
  }, [paused]);

  const activeTheme = heroThemes[activeThemeIndex];

  return (
    <section
      className="relative min-h-[700px] overflow-hidden border-b border-[var(--border)] md:min-h-[750px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ===================================================== */}
      {/* CAMPUS BACKGROUND */}
      {/* ===================================================== */}

      <Image
        src="/home/um-campus-wide.jpg"
        alt="University of Manitoba campus"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* ===================================================== */}
      {/* UNIVERSAL OVERLAY
          Uses CSS variables instead of Tailwind dark: variants
      ===================================================== */}

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, var(--background) 0%, color-mix(in srgb, var(--background) 95%, transparent) 35%, color-mix(in srgb, var(--background) 74%, transparent) 61%, color-mix(in srgb, var(--section-blue) 30%, transparent) 100%)",
        }}
      />

      {/* BLUE ATMOSPHERE */}

      <div
        className="pointer-events-none absolute -right-40 top-0 h-[580px] w-[580px] rounded-full blur-[140px]"
        style={{
          background:
            "color-mix(in srgb, var(--um-blue) 18%, transparent)",
        }}
      />

      {/* GOLD ATMOSPHERE */}

      <div
        className="pointer-events-none absolute -bottom-48 left-[20%] h-[400px] w-[400px] rounded-full blur-[125px]"
        style={{
          background:
            "color-mix(in srgb, var(--um-gold) 10%, transparent)",
        }}
      />

      {/* ===================================================== */}
      {/* MAIN CONTENT */}
      {/* ===================================================== */}

      <div className="relative z-10 mx-auto grid min-h-[700px] max-w-7xl gap-14 px-8 py-12 md:min-h-[750px] md:px-16 md:py-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        {/* =================================================== */}
        {/* LEFT */}
        {/* =================================================== */}

        <div className="relative z-20">
          {/* EYEBROW */}

          <div className="flex items-center gap-4">
            <span className="h-[2px] w-10 bg-[var(--um-gold)]" />

            <p
              className="text-xs font-semibold uppercase tracking-[0.34em]"
              style={{ color: "var(--um-blue)" }}
            >
              Intelligent Sensory Systems
            </p>
          </div>

          {/* ================================================= */}
          {/* DYNAMIC HEADLINE */}
          {/* ================================================= */}

          <h1 className="mt-8 flex max-w-4xl flex-col gap-[0.15em] text-6xl font-semibold leading-[0.88] tracking-[-0.065em] sm:text-7xl md:text-[80px] lg:text-[86px] xl:text-[92px]">
            {headlineWords.map((word, index) => {
              const active = index === highlightIndex;
              const isReimagining = index === 2;

              return (
                <span
                  key={word}
                  className={`relative w-fit transition-all duration-500 ${
                    active
                      ? "translate-x-[6px]"
                      : "translate-x-0"
                  }`}
                  style={{
                    /*
                     * Important:
                     * inactive words explicitly use foreground.
                     * They therefore stay visible in BOTH themes.
                     */
                    color: active
                      ? "var(--um-blue)"
                      : "var(--foreground)",
                    opacity: active ? 1 : 0.82,
                  }}
                >
                  {word}

                  {/* ACTIVE UNDERLINE */}

                  <span
                    className="absolute -bottom-2 left-0 h-[3px] rounded-full transition-all duration-500"
                    style={{
                      width: active
                        ? isReimagining
                          ? "100%"
                          : "46%"
                        : "0%",
                      background: isReimagining
                        ? "var(--um-gold)"
                        : "var(--um-blue)",
                      opacity: active ? 1 : 0,
                    }}
                  />
                </span>
              );
            })}
          </h1>

          {/* ================================================= */}
          {/* DYNAMIC REIMAGINING TARGET */}
          {/* ================================================= */}

          <div className="mt-10 min-h-[142px] max-w-3xl">
            <div
              key={`${activeTheme.number}-${activeTheme.label}`}
              className="animate-fade-slide"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="text-xs font-semibold tracking-[0.2em]"
                  style={{ color: "var(--um-gold)" }}
                >
                  {activeTheme.number}
                </span>

                <span className="h-px w-8 bg-[var(--border-strong)]" />

                <p
                  className="text-[10px] font-semibold uppercase tracking-[0.23em]"
                  style={{
                    color: "var(--foreground-muted)",
                  }}
                >
                  {activeTheme.kicker}
                </p>
              </div>

              <h2
                className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl md:text-5xl"
                style={{ color: "var(--foreground)" }}
              >
                {activeTheme.label}
              </h2>

              <p
                className="mt-4 max-w-2xl text-sm leading-7 md:text-base md:leading-8"
                style={{
                  color: "var(--foreground-soft)",
                }}
              >
                {activeTheme.description}
              </p>
            </div>
          </div>

          {/* ================================================= */}
          {/* CORE MESSAGE */}
          {/* ================================================= */}

          <p
            className="mt-4 max-w-2xl border-l-2 border-[var(--um-gold)] pl-5 text-sm leading-7 md:text-base md:leading-8"
            style={{
              color: "var(--foreground-soft)",
            }}
          >
            SenSys Lab integrates microsystems, microfluidics,
            biointegrated technologies, advanced materials,
            intelligent diagnostics, electronics, and data-driven
            sensing into connected cyber-physical sensory systems.
          </p>

          {/* ================================================= */}
          {/* ACTIONS */}
          {/* ================================================= */}

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/research"
              className="rounded-full bg-[var(--um-blue)] px-7 py-3.5 text-sm font-semibold text-white transition duration-300 hover:bg-[var(--um-blue-dark)]"
            >
              Explore research →
            </Link>

            <Link
              href="/people"
              className="rounded-full border border-[var(--border-strong)] px-7 py-3.5 text-sm font-semibold backdrop-blur-md transition duration-300 hover:border-[var(--um-blue)] hover:text-[var(--um-blue)]"
              style={{
                background:
                  "color-mix(in srgb, var(--surface) 80%, transparent)",
                color: "var(--foreground)",
              }}
            >
              Meet Team SenSys →
            </Link>
          </div>

          {/* ================================================= */}
          {/* THEME SELECTOR */}
          {/* ================================================= */}

          <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-3">
            {heroThemes.map((theme, index) => {
              const active =
                index === activeThemeIndex;

              return (
                <button
                  key={theme.label}
                  type="button"
                  onClick={() =>
                    setActiveThemeIndex(index)
                  }
                  aria-label={`Show ${theme.label}`}
                  aria-pressed={active}
                  className="group flex items-center gap-2"
                >
                  <span
                    className="h-1.5 rounded-full transition-all duration-500"
                    style={{
                      width: active ? "40px" : "12px",
                      background: active
                        ? "var(--um-gold)"
                        : "color-mix(in srgb, var(--um-blue) 35%, transparent)",
                    }}
                  />

                  <span
                    className="hidden text-[9px] font-semibold uppercase tracking-[0.13em] transition xl:inline"
                    style={{
                      color: active
                        ? "var(--foreground)"
                        : "var(--foreground-muted)",
                    }}
                  >
                    {theme.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =================================================== */}
        {/* RIGHT DYNAMIC VISUAL */}
        {/* =================================================== */}

        <div className="relative hidden min-h-[545px] lg:block">
          {/* DECORATIVE NUMBER */}

          <div
            key={`number-${activeTheme.number}`}
            className="animate-fade-in pointer-events-none absolute -right-2 top-0 text-[145px] font-semibold leading-none tracking-[-0.08em]"
            style={{
              color:
                "color-mix(in srgb, var(--foreground) 12%, transparent)",
            }}
          >
            {activeTheme.number}
          </div>

          {/* ================================================= */}
          {/* MAIN IMAGE */}
          {/* ================================================= */}

          <Link
            href={activeTheme.href}
            className="group absolute left-3 right-0 top-1/2 block -translate-y-1/2"
          >
            <div
              className="relative h-[455px] overflow-hidden shadow-[0_28px_80px_rgba(24,28,46,0.20)]"
              style={{
                background:
                  "color-mix(in srgb, var(--surface) 94%, white 6%)",
              }}
            >
              <Image
                key={activeTheme.image}
                src={activeTheme.image}
                alt={activeTheme.imageTitle}
                fill
                className="animate-fade-in object-contain p-8 transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="45vw"
              />

              {/* SCIENTIFIC GRID */}

              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(56,94,157,0.065)_1px,transparent_1px),linear-gradient(90deg,rgba(56,94,157,0.065)_1px,transparent_1px)] bg-[size:44px_44px]" />

              {/* CAPTION GRADIENT */}

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[44%] bg-gradient-to-t from-[#17263D]/92 via-[#17263D]/32 to-transparent" />

              {/* ================================================= */}
              {/* CAPTION */}
              {/* ================================================= */}

              <div
                key={`caption-${activeTheme.imageTitle}`}
                className="animate-fade-slide absolute inset-x-0 bottom-0 p-7"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#F2A900]">
                  {activeTheme.imageCategory}
                </p>

                <div className="mt-2 flex items-end justify-between gap-6">
                  <h3 className="max-w-sm text-2xl font-semibold leading-tight text-white">
                    {activeTheme.imageTitle}
                  </h3>

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/35 text-white transition duration-300 group-hover:border-[#F2A900] group-hover:bg-[#F2A900] group-hover:text-[#2A1710]">
                    →
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* ================================================= */}
          {/* SCIENTIFIC ORBIT DETAIL */}
          {/* ================================================= */}

          <div className="pointer-events-none absolute left-[-24px] top-[72px] h-20 w-20 rounded-full border border-[var(--um-blue)]/35" />

          <div className="pointer-events-none absolute left-[-9px] top-[87px] h-12 w-12 rounded-full border border-[var(--um-blue)]/45" />

          <div className="pointer-events-none absolute left-[7px] top-[103px] h-4 w-4 rounded-full bg-[var(--um-gold)] shadow-[0_0_0_8px_rgba(242,169,0,0.08)]" />
        </div>
      </div>

      {/* ===================================================== */}
      {/* BOTTOM ACCENT */}
      {/* ===================================================== */}

      <div className="absolute bottom-0 left-0 h-[4px] w-full bg-gradient-to-r from-[var(--um-gold)] via-[var(--um-blue)] to-[var(--um-sky)]" />
    </section>
  );
}