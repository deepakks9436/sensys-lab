"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const heroSlides = [
  {
    area: "Intelligent Diagnostics",
    title: "Bacteria-on-Chip",
    subtitle: "Microfluidic systems for rapid pathogen and AMR diagnostics",
    image: "/research/AMR/Bacteria-on-chip.png",
    href: "/research/amr",
    accent: "bg-[var(--um-blue)]",
  },
  {
    area: "Agri & Environmental Intelligence",
    title: "Portable Pesticide Detection",
    subtitle: "Field-deployable multimodal sensing for food safety",
    image: "/research/pesticide-detection/pestisafe-2.jpg",
    href: "/research/pesticide-detection",
    accent: "bg-[var(--um-sky)]",
  },
  {
    area: "Biointegrated Systems",
    title: "Wearable Sensing",
    subtitle: "Textile-integrated electrochemical sensing platforms",
    image: "/research/pesticide-detection/pestisafe-3.png",
    href: "/research/pesticide-detection",
    accent: "bg-[var(--um-gold)]",
  },
  {
    area: "Environmental Intelligence",
    title: "Water Quality Technologies",
    subtitle: "Portable multiparameter ion-selective sensing systems",
    image: "/research/water-quality/ion-selective-array.png",
    href: "/research/water-quality",
    accent: "bg-[var(--um-blue)]",
  },
  {
    area: "Intelligent Microsystems",
    title: "Electromicrofluidic Platforms",
    subtitle: "Integrated sensing, fluidics, electronics, and instrumentation",
    image: "/research/AMR/Electromicrofluidic-Device.png",
    href: "/research/amr",
    accent: "bg-[var(--um-sky)]",
  },
  {
    area: "Advanced Functional Materials",
    title: "Graphene Microsystems",
    subtitle: "Laser-induced graphene for sensing and integrated devices",
    image: "/research/graphene/lig-microheater.jpg",
    href: "/research/graphene",
    accent: "bg-[var(--um-gold)]",
  },
];

const applicationAreas = [
  "Healthcare",
  "Food Safety",
  "Agriculture",
  "Environmental Monitoring",
  "Wearable Systems",
  "Intelligent Diagnostics",
];

export default function DynamicHero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeArea, setActiveArea] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const slideInterval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4800);

    return () => clearInterval(slideInterval);
  }, [paused]);

  useEffect(() => {
    const areaInterval = setInterval(() => {
      setActiveArea((current) => (current + 1) % applicationAreas.length);
    }, 2600);

    return () => clearInterval(areaInterval);
  }, []);

  const selected = heroSlides[activeSlide];

  return (
    <section className="relative overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      {/* BACKGROUND COLOUR FIELDS */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-[var(--um-blue)]/10 blur-[130px]" />

      <div className="pointer-events-none absolute -left-40 bottom-[-180px] h-[500px] w-[500px] rounded-full bg-[var(--um-sky)]/10 blur-[130px]" />

      <div className="pointer-events-none absolute left-[35%] top-[45%] h-[320px] w-[320px] rounded-full bg-[var(--um-gold)]/8 blur-[110px]" />

      <div className="relative mx-auto max-w-[1600px]">
        <div className="grid min-h-[760px] lg:grid-cols-[0.98fr_1.02fr]">
          {/* LEFT CONTENT */}
          <div className="flex items-center px-8 py-20 md:px-16 md:py-24 lg:py-28 xl:pl-24">
            <div className="max-w-3xl">
              {/* EYEBROW */}
              <div className="flex items-center gap-4">
                <div className="h-[2px] w-10 bg-[var(--um-gold)]" />

                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--um-blue)]">
                  Intelligent Sensing Systems
                </p>
              </div>

              {/* TITLE */}
              <h1 className="mt-9 text-6xl font-semibold leading-[0.89] tracking-[-0.06em] md:text-7xl xl:text-[94px]">
                Sensing
                <br />
                the world.
                <br />

                <span className="text-[var(--um-blue)]">
                  Engineering
                </span>
                <br />

                <span className="relative inline-block">
                  what comes next.
                  <span className="absolute -bottom-2 left-0 h-[4px] w-24 bg-[var(--um-gold)]" />
                </span>
              </h1>

              {/* ROTATING APPLICATION */}
              <div className="mt-12">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--foreground-muted)]">
                  Engineering intelligent sensing for
                </p>

                <div className="mt-3 h-10 overflow-hidden">
                  <p
                    key={applicationAreas[activeArea]}
                    className="animate-fade-slide text-2xl font-semibold tracking-tight text-[var(--um-sky)] md:text-3xl"
                  >
                    {applicationAreas[activeArea]}
                  </p>
                </div>
              </div>

              {/* SHORT INTRO */}
              <p className="mt-9 max-w-2xl text-lg leading-8 text-[var(--foreground-soft)] md:text-xl">
                SenSys integrates microsystems, microfluidics, advanced
                materials, electronics, bioengineering, and artificial
                intelligence to create sensing technologies that move from the
                laboratory into the real world.
              </p>

              {/* CTA */}
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/research"
                  className="group inline-flex items-center gap-3 rounded-full bg-[var(--um-blue)] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--um-blue-dark)]"
                >
                  Explore our research

                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <Link
                  href="/people"
                  className="group inline-flex items-center gap-3 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-7 py-3.5 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--um-blue)] hover:text-[var(--um-blue)]"
                >
                  Meet the team

                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>

              {/* MINI COLOUR SIGNATURE */}
              <div className="mt-12 flex items-center gap-2">
                <span className="h-1.5 w-12 rounded-full bg-[var(--um-blue)]" />
                <span className="h-1.5 w-8 rounded-full bg-[var(--um-sky)]" />
                <span className="h-1.5 w-6 rounded-full bg-[var(--um-gold)]" />
                <span className="h-1.5 w-4 rounded-full bg-[#4F2C1D]" />
              </div>
            </div>
          </div>

          {/* RIGHT — DYNAMIC DEVICE VISUAL */}
          <div
            className="relative min-h-[620px] overflow-hidden bg-[var(--surface-soft)] lg:min-h-[760px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* IMAGE */}
            <div className="absolute inset-0">
              <Image
                key={selected.image}
                src={selected.image}
                alt={selected.title}
                fill
                priority={activeSlide === 0}
                className="animate-scale-in object-contain p-10 transition-transform duration-[1800ms] md:p-16 lg:p-20"
                sizes="(max-width: 1024px) 100vw, 52vw"
              />
            </div>

            {/* VISUAL OVERLAYS */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#385E9D]/16 via-transparent to-[#00A3E0]/12" />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#1f3150]/90 via-[#385E9D]/45 to-transparent" />

            {/* DECORATIVE GRID */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                backgroundSize: "42px 42px",
              }}
            />

            {/* TOP LABEL */}
            <div className="absolute left-6 top-6 md:left-10 md:top-10">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/25 bg-[#385E9D]/90 px-4 py-2.5 text-white backdrop-blur-md">
                <span
                  className={`h-2 w-2 rounded-full ${selected.accent}`}
                />

                <span className="text-[10px] font-semibold uppercase tracking-[0.22em]">
                  {selected.area}
                </span>
              </div>
            </div>

            {/* IMAGE CAPTION */}
            <div className="absolute inset-x-0 bottom-0 p-7 text-white md:p-10 lg:p-12">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#F2A900]">
                Research Platform
              </p>

              <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-[-0.035em] md:text-4xl">
                {selected.title}
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-white/75 md:text-base">
                {selected.subtitle}
              </p>

              <Link
                href={selected.href}
                className="group mt-6 inline-flex items-center gap-3 text-sm font-semibold text-white"
              >
                Explore platform

                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>

            {/* SLIDE CONTROLS */}
            <div className="absolute right-6 top-6 flex gap-2 md:right-10 md:top-10">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  onClick={() => {
                    setActiveSlide(index);
                    setPaused(true);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeSlide === index
                      ? "w-8 bg-[#F2A900]"
                      : "w-2.5 bg-[#385E9D]/35 hover:bg-[#385E9D]"
                  }`}
                  aria-label={`Show ${slide.title}`}
                  aria-current={activeSlide === index ? "true" : undefined}
                />
              ))}
            </div>

            {/* PROVENANCE */}
            <div className="absolute bottom-3 right-4 hidden text-right text-[9px] leading-4 text-white/45 xl:block">
              Selected platforms reflect prior research led by
              <br />
              Prof. Sanket Goel and collaborators.
            </div>
          </div>
        </div>

        {/* BOTTOM INFO STRIP */}
        <div className="grid border-y border-[var(--border)] bg-[var(--surface)] md:grid-cols-3">
          <div className="flex items-center gap-4 px-8 py-5 md:px-10">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--um-blue)]" />

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.23em] text-[var(--foreground-muted)]">
                Institution
              </p>

              <p className="mt-1 text-sm font-medium">
                University of Manitoba
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t border-[var(--border)] px-8 py-5 md:border-l md:border-t-0 md:px-10">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--um-sky)]" />

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.23em] text-[var(--foreground-muted)]">
                Location
              </p>

              <p className="mt-1 text-sm font-medium">
                Winnipeg · Canada
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t border-[var(--border)] px-8 py-5 md:border-l md:border-t-0 md:px-10">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--um-gold)]" />

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.23em] text-[var(--foreground-muted)]">
                Focus
              </p>

              <p className="mt-1 text-sm font-medium">
                Intelligent Sensing Systems
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}