"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const researchAreas = [
  {
    number: "01",
    title: "Intelligent Microsystems",
    short: "Microdevices · Microfluidics · Integrated sensing",
    description:
      "Engineering microscale platforms that integrate sensing, fluidics, electronics, and intelligent instrumentation into compact and deployable systems.",
    tags: [
      "Microfluidics",
      "Lab-on-Chip",
      "MEMS",
      "Integrated Sensors",
      "Portable Systems",
    ],
    image: "/research/AMR/Electromicrofluidic-Device.png",
    imageAlt: "Integrated electromicrofluidic sensing device",
    href: "/research#intelligent-microsystems",
  },
  {
    number: "02",
    title: "Biointegrated Systems",
    short: "Wearables · Implantables · Flexible electronics",
    description:
      "Developing sensing and energy technologies that interface naturally with the human body through flexible, textile, wearable, and implantable platforms.",
    tags: [
      "Wearable Sensors",
      "Textile Electronics",
      "Bioenergy",
      "Flexible Devices",
      "Implantables",
    ],
    image: "/research/pesticide-detection/pestisafe-3.png",
    imageAlt: "Wearable textile sensing platform",
    href: "/research#biointegrated-systems",
  },
  {
    number: "03",
    title: "Intelligent Diagnostics",
    short: "Point-of-care · Biosensors · Connected diagnostics",
    description:
      "Creating portable diagnostic systems that combine electrochemical and optical sensing, microfluidics, signal processing, and intelligent decision-making.",
    tags: [
      "Point-of-Care",
      "Biosensors",
      "Optical Sensing",
      "Electrochemistry",
      "AI Diagnostics",
    ],
    image: "/research/AMR/Bacteria-on-chip.png",
    imageAlt: "Bacteria-on-chip diagnostic platform",
    href: "/research#intelligent-diagnostics",
  },
  {
    number: "04",
    title: "Agri & Environmental Intelligence",
    short: "Food · Water · Soil · Environmental monitoring",
    description:
      "Building field-deployable technologies for monitoring food safety, pesticides, soil nutrients, water quality, and environmental conditions.",
    tags: [
      "Pesticide Detection",
      "Water Quality",
      "Soil Sensing",
      "Food Safety",
      "Precision Agriculture",
    ],
    image: "/research/water-quality/ion-selective-array.png",
    imageAlt: "Portable ion-selective water-quality sensing array",
    href: "/research#agri-environment",
  },
];

export default function ResearchExplorer() {
  const [active, setActive] = useState(0);

  const selected = researchAreas[active];

  return (
    <section className="bg-[var(--surface-soft)] px-8 py-24 text-[var(--foreground)] md:px-16 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="grid gap-10 md:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
              Explore Our Research
            </p>
          </div>

          <div>
            <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
              From sensing principles
              <br />
              to intelligent systems.
            </h2>

            <p className="mt-7 max-w-2xl text-base leading-8 text-[var(--foreground-soft)]">
              SenSys connects device engineering, materials, sensing,
              electronics, microfluidics, and data intelligence across four
              interconnected research directions.
            </p>
          </div>
        </div>

        {/* INTERACTIVE EXPLORER */}
        <div className="mt-20 overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-sm">
          <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
            {/* LEFT NAVIGATION */}
            <div className="bg-[var(--surface)]">
              {researchAreas.map((area, index) => {
                const isSelected = active === index;

                return (
                  <button
                    key={area.title}
                    type="button"
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onClick={() => setActive(index)}
                    className={`group flex w-full items-center gap-5 border-b border-[var(--border)] px-7 py-7 text-left transition-all duration-300 last:border-b-0 md:px-9 ${
                      isSelected
                        ? "bg-[var(--um-blue)] text-white"
                        : "bg-[var(--surface)] hover:bg-[var(--surface-muted)]"
                    }`}
                  >
                    <span
                      className={`text-xs font-semibold tracking-[0.25em] ${
                        isSelected
                          ? "text-[var(--um-gold)]"
                          : "text-[var(--um-blue)]"
                      }`}
                    >
                      {area.number}
                    </span>

                    <div className="min-w-0 flex-1">
                      <h3
                        className={`text-lg font-semibold tracking-tight md:text-xl ${
                          isSelected
                            ? "text-white"
                            : "text-[var(--foreground)]"
                        }`}
                      >
                        {area.title}
                      </h3>

                      <p
                        className={`mt-2 hidden text-xs leading-6 md:block ${
                          isSelected
                            ? "text-white/70"
                            : "text-[var(--foreground-muted)]"
                        }`}
                      >
                        {area.short}
                      </p>
                    </div>

                    <span
                      className={`text-xl transition-transform duration-300 ${
                        isSelected
                          ? "translate-x-1 text-[var(--um-gold)]"
                          : "text-[var(--foreground-muted)] group-hover:translate-x-1 group-hover:text-[var(--um-blue)]"
                      }`}
                    >
                      →
                    </span>
                  </button>
                );
              })}
            </div>

            {/* RIGHT CONTENT */}
            <div className="relative min-h-[610px] overflow-hidden bg-[var(--surface)]">
              {/* IMAGE */}
              <div className="relative h-[330px] overflow-hidden bg-[var(--surface-muted)] md:h-[390px]">
                <Image
                  key={selected.image}
                  src={selected.image}
                  alt={selected.imageAlt}
                  fill
                  className="object-contain p-7 transition-transform duration-700 hover:scale-[1.035] md:p-10"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />

                {/* BLUE GRADIENT OVERLAY */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#385E9D]/20 to-transparent" />

                {/* NUMBER */}
                <div className="absolute left-6 top-6 flex items-center gap-3 rounded-full bg-[var(--surface)]/90 px-4 py-2 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-[var(--um-gold)]" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--um-blue)]">
                    Research {selected.number}
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-8 md:p-10 lg:p-12">
                <h3 className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.035em] md:text-4xl">
                  {selected.title}
                </h3>

                <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
                  {selected.description}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {selected.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3.5 py-2 text-xs text-[var(--foreground-soft)] transition hover:border-[var(--um-blue)] hover:text-[var(--um-blue)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-9">
                  <Link
                    href={selected.href}
                    className="group inline-flex items-center gap-3 text-sm font-semibold text-[var(--um-blue)]"
                  >
                    Explore {selected.title}

                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>

              {/* DECORATIVE BLUE EDGE */}
              <div className="absolute right-0 top-0 h-full w-[3px] bg-[var(--um-blue)]" />
            </div>
          </div>
        </div>

        {/* SMALL RESEARCH VISUAL STRIP */}
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          {researchAreas.map((area, index) => {
            const isSelected = active === index;

            return (
              <button
                key={area.title}
                type="button"
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                className={`group relative aspect-[16/9] overflow-hidden border transition ${
                  isSelected
                    ? "border-[var(--um-blue)]"
                    : "border-[var(--border)]"
                }`}
                aria-label={`View ${area.title}`}
              >
                <Image
                  src={area.image}
                  alt=""
                  fill
                  className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />

                <div
                  className={`absolute inset-x-0 bottom-0 px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.18em] transition ${
                    isSelected
                      ? "bg-[var(--um-blue)] text-white"
                      : "bg-[var(--surface)]/90 text-[var(--foreground)] backdrop-blur"
                  }`}
                >
                  {area.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}