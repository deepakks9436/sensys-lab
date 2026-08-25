"use client";

import Link from "next/link";
import { useState } from "react";

const researchAreas = [
  {
    number: "01",
    title: "Intelligent Microsystems",
    short: "Microdevices · Microfluidics · Integrated sensing",
    description:
      "Engineering microscale platforms that integrate sensing, fluidics, electronics, and intelligent instrumentation into compact systems.",
    tags: [
      "Microfluidics",
      "Lab-on-Chip",
      "MEMS",
      "Integrated Sensors",
      "Portable Systems",
    ],
    accent: "#F2A900",
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
    accent: "#00A3E0",
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
      "AI-Enabled Diagnostics",
    ],
    accent: "#385E9D",
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
    accent: "#F2A900",
    href: "/research#agri-environment",
  },
];

export default function ResearchExplorer() {
  const [active, setActive] = useState(0);

  const selected = researchAreas[active];

  return (
    <section className="bg-[#f5f2ea] px-8 py-24 text-black md:px-16 md:py-32">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="grid gap-10 md:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#4F2C1D]">
              Explore Our Research
            </p>
          </div>

          <div>
            <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
              From sensing principles
              <br />
              to intelligent systems.
            </h2>

            <p className="mt-7 max-w-2xl text-base leading-8 text-neutral-600">
              SenSys connects device engineering, materials, sensing,
              electronics, and data intelligence across four interconnected
              research directions.
            </p>
          </div>
        </div>

        {/* EXPLORER */}
        <div className="mt-20 grid overflow-hidden border border-neutral-300 lg:grid-cols-[0.8fr_1.2fr]">

          {/* LEFT NAVIGATION */}
          <div className="bg-[#0b0b0b]">
            {researchAreas.map((area, index) => (
              <button
                key={area.title}
                type="button"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                className={`group flex w-full items-center gap-6 border-b border-white/10 px-7 py-8 text-left transition last:border-b-0 md:px-10 ${
                  active === index
                    ? "bg-[#151515]"
                    : "bg-[#0b0b0b] hover:bg-[#111111]"
                }`}
              >
                <span
                  className="text-xs font-medium tracking-[0.25em]"
                  style={{
                    color:
                      active === index ? area.accent : "rgb(115 115 115)",
                  }}
                >
                  {area.number}
                </span>

                <div className="min-w-0 flex-1">
                  <h3
                    className={`text-xl font-semibold tracking-tight transition md:text-2xl ${
                      active === index ? "text-white" : "text-neutral-400"
                    }`}
                  >
                    {area.title}
                  </h3>

                  <p className="mt-2 hidden text-sm text-neutral-600 md:block">
                    {area.short}
                  </p>
                </div>

                <span
                  className={`text-xl transition ${
                    active === index
                      ? "translate-x-1 text-[#F2A900]"
                      : "text-neutral-700"
                  }`}
                >
                  →
                </span>
              </button>
            ))}
          </div>

          {/* ACTIVE PANEL */}
          <div className="relative min-h-[520px] overflow-hidden bg-white p-8 md:p-12 lg:p-16">

            {/* VISUAL CIRCLE */}
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-[320px] w-[320px] rounded-full opacity-[0.07]"
              style={{
                backgroundColor: selected.accent,
              }}
            />

            <div className="relative flex h-full flex-col justify-between">
              <div>
                <div className="flex items-center gap-4">
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: selected.accent,
                    }}
                  />

                  <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                    Research Area {selected.number}
                  </p>
                </div>

                <h3 className="mt-10 max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.035em] md:text-5xl">
                  {selected.title}
                </h3>

                <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-600">
                  {selected.description}
                </p>

                <div className="mt-10 flex flex-wrap gap-2">
                  {selected.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-neutral-300 px-4 py-2 text-xs text-neutral-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-14">
                <Link
                  href={selected.href}
                  className="inline-flex items-center gap-3 border-b border-black pb-1 text-sm font-medium transition hover:text-[#385E9D]"
                >
                  Explore {selected.title}
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}