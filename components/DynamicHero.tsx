"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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

export default function DynamicHero() {
  const [activeThemeIndex, setActiveThemeIndex] = useState(0);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  /* RESEARCH TOPIC */

  useEffect(() => {
    if (paused) return;

    const interval = window.setInterval(() => {
      setActiveThemeIndex((current) =>
        current === heroThemes.length - 1
          ? 0
          : current + 1
      );
    }, 2800);

    return () => window.clearInterval(interval);
  }, [paused]);

  /* HEADLINE HIGHLIGHT */

  useEffect(() => {
    if (paused) return;

    const interval = window.setInterval(() => {
      setHighlightIndex((current) =>
        current === headlineWords.length - 1
          ? 0
          : current + 1
      );
    }, 1450);

    return () => window.clearInterval(interval);
  }, [paused]);

  const activeTheme = heroThemes[activeThemeIndex];

  const Headline = ({
    mobile = false,
  }: {
    mobile?: boolean;
  }) => (
    <h1
      className={
        mobile
          ? "mt-7 flex flex-col gap-1 text-[48px] font-semibold leading-[0.91] tracking-[-0.06em] sm:text-[58px]"
          : "mt-8 flex max-w-4xl flex-col gap-[0.15em] text-6xl font-semibold leading-[0.88] tracking-[-0.065em] md:text-[80px] lg:text-[86px] xl:text-[92px]"
      }
    >
      {headlineWords.map((word, index) => {
        const active = index === highlightIndex;
        const isReimagining = index === 2;

        return (
          <span
            key={word}
            className={`relative w-fit transition-all duration-500 ${
              active && !mobile
                ? "translate-x-[6px]"
                : ""
            }`}
            style={{
              color: active
                ? "var(--um-blue)"
                : "var(--foreground)",
              opacity: active ? 1 : 0.88,
            }}
          >
            {word}

            <span
              className="absolute -bottom-1 left-0 h-[3px] rounded-full transition-all duration-500"
              style={{
                width: active
                  ? isReimagining
                    ? "100%"
                    : "44%"
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
  );

  return (
    <section
      className="relative overflow-hidden border-b border-[var(--border)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* BACKGROUND */}

      <Image
        src="/home/um-campus-wide.jpg"
        alt="University of Manitoba campus"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, var(--background) 0%, color-mix(in srgb, var(--background) 95%, transparent) 35%, color-mix(in srgb, var(--background) 74%, transparent) 61%, color-mix(in srgb, var(--section-blue) 30%, transparent) 100%)",
        }}
      />

      <div
        className="pointer-events-none absolute -right-40 top-0 h-[580px] w-[580px] rounded-full blur-[140px]"
        style={{
          background:
            "color-mix(in srgb, var(--um-blue) 18%, transparent)",
        }}
      />

      {/* ===================================================== */}
      {/* MOBILE HERO */}
      {/* ===================================================== */}

      <div className="relative z-10 px-5 py-10 lg:hidden">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[var(--um-gold)]" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.27em] text-[var(--um-blue)]">
              Intelligent Sensory Systems
            </p>
          </div>

          <Headline mobile />

          {/* DYNAMIC IDEA */}

          <div
            key={`mobile-${activeTheme.number}`}
            className="animate-fade-slide mt-8"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold text-[var(--um-gold)]">
                {activeTheme.number}
              </span>

              <span className="h-px w-6 bg-[var(--border-strong)]" />

              <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[var(--foreground-muted)]">
                {activeTheme.kicker}
              </p>
            </div>

            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">
              {activeTheme.label}
            </h2>

            <p className="mt-3 text-sm leading-6 text-[var(--foreground-soft)]">
              {activeTheme.description}
            </p>
          </div>

          {/* MOBILE IMAGE */}

          <Link
            href={activeTheme.href}
            className="group mt-7 block overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-soft)]"
          >
            <div className="relative h-[220px] bg-[var(--surface)]">
              <Image
                key={`mobile-image-${activeTheme.image}`}
                src={activeTheme.image}
                alt={activeTheme.imageTitle}
                fill
                className="animate-fade-in object-contain p-4"
                sizes="100vw"
              />

              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#17263D]/90 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#F2A900]">
                  {activeTheme.imageCategory}
                </p>

                <p className="mt-1 text-base font-semibold text-white">
                  {activeTheme.imageTitle}
                </p>
              </div>
            </div>
          </Link>

          {/* SELECTOR */}

          <div className="mt-6 flex gap-2">
            {heroThemes.map((theme, index) => (
              <button
                key={theme.label}
                type="button"
                onClick={() => setActiveThemeIndex(index)}
                aria-label={`Show ${theme.label}`}
                className="h-2 rounded-full transition-all duration-500"
                style={{
                  width:
                    index === activeThemeIndex
                      ? "38px"
                      : "9px",
                  background:
                    index === activeThemeIndex
                      ? "var(--um-gold)"
                      : "color-mix(in srgb, var(--um-blue) 35%, transparent)",
                }}
              />
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/research"
              className="rounded-full bg-[var(--um-blue)] px-5 py-3 text-xs font-semibold text-white"
            >
              Explore research →
            </Link>

            <Link
              href="/people"
              className="rounded-full border border-[var(--border-strong)] bg-[var(--surface)]/80 px-5 py-3 text-xs font-semibold"
            >
              Meet the team →
            </Link>
          </div>
        </div>
      </div>

      {/* ===================================================== */}
      {/* DESKTOP HERO */}
      {/* ===================================================== */}

      <div className="relative z-10 mx-auto hidden min-h-[730px] max-w-7xl grid-cols-[1.02fr_0.98fr] items-center gap-14 px-16 py-14 lg:grid">
        {/* LEFT */}

        <div className="relative z-20">
          <div className="flex items-center gap-4">
            <span className="h-[2px] w-10 bg-[var(--um-gold)]" />

            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--um-blue)]">
              Intelligent Sensory Systems
            </p>
          </div>

          <Headline />

          <div className="mt-10 min-h-[142px] max-w-3xl">
            <div
              key={`${activeTheme.number}-${activeTheme.label}`}
              className="animate-fade-slide"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold tracking-[0.2em] text-[var(--um-gold)]">
                  {activeTheme.number}
                </span>

                <span className="h-px w-8 bg-[var(--border-strong)]" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.23em] text-[var(--foreground-muted)]">
                  {activeTheme.kicker}
                </p>
              </div>

              <h2 className="mt-3 text-5xl font-semibold tracking-[-0.045em]">
                {activeTheme.label}
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--foreground-soft)]">
                {activeTheme.description}
              </p>
            </div>
          </div>

          <p className="mt-4 max-w-2xl border-l-2 border-[var(--um-gold)] pl-5 text-base leading-8 text-[var(--foreground-soft)]">
            SenSys Lab integrates microsystems, microfluidics,
            biointegrated technologies, advanced materials,
            intelligent diagnostics, electronics, and data-driven
            sensing into connected cyber-physical sensory systems.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/research"
              className="rounded-full bg-[var(--um-blue)] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--um-blue-dark)]"
            >
              Explore research →
            </Link>

            <Link
              href="/people"
              className="rounded-full border border-[var(--border-strong)] bg-[var(--surface)]/80 px-7 py-3.5 text-sm font-semibold"
            >
              Meet Team SenSys →
            </Link>
          </div>

          <div className="mt-9 flex gap-4">
            {heroThemes.map((theme, index) => (
              <button
                key={theme.label}
                type="button"
                onClick={() => setActiveThemeIndex(index)}
                className="group flex items-center gap-2"
              >
                <span
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width:
                      index === activeThemeIndex
                        ? "40px"
                        : "12px",
                    background:
                      index === activeThemeIndex
                        ? "var(--um-gold)"
                        : "color-mix(in srgb, var(--um-blue) 35%, transparent)",
                  }}
                />

                <span className="hidden text-[9px] font-semibold uppercase tracking-[0.13em] text-[var(--foreground-muted)] xl:inline">
                  {theme.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT */}

        <div className="relative min-h-[555px]">
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

          <Link
            href={activeTheme.href}
            className="group absolute left-0 right-0 top-1/2 block -translate-y-1/2"
          >
            <div className="relative h-[475px] overflow-hidden bg-[var(--surface)] shadow-[0_28px_80px_rgba(24,28,46,0.20)]">
              <Image
                key={activeTheme.image}
                src={activeTheme.image}
                alt={activeTheme.imageTitle}
                fill
                className="animate-fade-in object-contain p-8 transition-transform duration-700 group-hover:scale-[1.035]"
                sizes="45vw"
              />

              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(56,94,157,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(56,94,157,0.06)_1px,transparent_1px)] bg-[size:44px_44px]" />

              <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-[#17263D]/94 via-[#17263D]/32 to-transparent" />

              <div
                key={activeTheme.imageTitle}
                className="animate-fade-slide absolute inset-x-0 bottom-0 p-7"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#F2A900]">
                  {activeTheme.imageCategory}
                </p>

                <div className="mt-2 flex items-end justify-between">
                  <h3 className="text-2xl font-semibold text-white">
                    {activeTheme.imageTitle}
                  </h3>

                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 text-white transition group-hover:bg-[#F2A900] group-hover:text-[#2A1710]">
                    →
                  </span>
                </div>
              </div>
            </div>
          </Link>

          <div className="pointer-events-none absolute left-[-20px] top-[70px] h-20 w-20 rounded-full border border-[var(--um-blue)]/35" />
          <div className="pointer-events-none absolute left-[-5px] top-[85px] h-12 w-12 rounded-full border border-[var(--um-blue)]/45" />
          <div className="pointer-events-none absolute left-[11px] top-[101px] h-4 w-4 rounded-full bg-[var(--um-gold)]" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-[4px] w-full bg-gradient-to-r from-[var(--um-gold)] via-[var(--um-blue)] to-[var(--um-sky)]" />
    </section>
  );
}