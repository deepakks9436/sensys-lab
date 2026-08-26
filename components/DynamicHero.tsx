"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const applicationAreas = [
  "Healthcare",
  "Food Safety",
  "Agriculture",
  "Environmental Monitoring",
  "Wearable Systems",
  "Intelligent Diagnostics",
];

export default function DynamicHero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % applicationAreas.length);
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white px-8 pb-20 pt-20 text-[#4F2C1D] md:px-16 md:pb-28 md:pt-28">
      {/* SOFT BACKGROUND ELEMENTS */}
      <div className="pointer-events-none absolute right-[-180px] top-[-120px] h-[520px] w-[520px] rounded-full bg-[#005EA8]/5 blur-[120px]" />

      <div className="pointer-events-none absolute bottom-[-220px] left-[18%] h-[420px] w-[420px] rounded-full bg-[#F2A900]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* EYEBROW */}
        <div className="flex items-center gap-4">
          <div className="h-px w-10 bg-[#F2A900]" />

          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#4F2C1D]">
            Intelligent Sensing Systems
          </p>
        </div>

        {/* MAIN TITLE */}
        <h1 className="mt-10 max-w-6xl text-6xl font-semibold leading-[0.9] tracking-[-0.055em] text-[#4F2C1D] md:text-8xl lg:text-[108px]">
          Sensing the world.
          <br />
          Engineering what
          <br />
          comes next.
        </h1>

        {/* ROTATING APPLICATION */}
        <div className="mt-12 flex flex-col gap-3 border-l-2 border-[#F2A900] pl-6 md:flex-row md:items-center md:gap-4">
          <span className="text-sm uppercase tracking-[0.22em] text-[#7a726a]">
            Engineering intelligent sensing for
          </span>

          <div className="relative h-9 min-w-[310px] overflow-hidden">
            <p
              key={applicationAreas[activeIndex]}
              className="animate-[fadeSlide_0.5s_ease-out] text-2xl font-semibold tracking-tight text-[#005EA8]"
            >
              {applicationAreas[activeIndex]}
            </p>
          </div>
        </div>

        {/* INTRO */}
        <div className="mt-14 grid gap-10 border-t border-[#e6dfd7] pt-10 md:grid-cols-[1.15fr_0.85fr]">
          <p className="max-w-3xl text-xl leading-9 text-[#4F2C1D] md:text-2xl">
            We develop intelligent sensing systems by integrating microsystems,
            microfluidics, advanced materials, electronics, and artificial
            intelligence for healthcare, agriculture, food safety, and
            environmental monitoring.
          </p>

          <div>
            <p className="max-w-xl text-base leading-8 text-[#706963]">
              From fundamental sensing principles to deployable technologies,
              SenSys connects physical systems with intelligent
              decision-making.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/research"
                className="rounded-full bg-[#F2A900] px-7 py-3.5 text-sm font-semibold text-[#2A1710] transition hover:bg-[#005EA8] hover:text-white"
              >
                Explore our research →
              </Link>

              <Link
                href="/people"
                className="rounded-full border border-[#cfc5bc] px-7 py-3.5 text-sm font-medium text-[#4F2C1D] transition hover:border-[#005EA8] hover:text-[#005EA8]"
              >
                Meet the team
              </Link>
            </div>
          </div>
        </div>

        {/* LOCATION */}
        <div className="mt-20 flex flex-col gap-4 border-t border-[#e6dfd7] pt-6 text-xs uppercase tracking-[0.25em] text-[#8a8179] md:flex-row md:items-center md:justify-between">
          <p>University of Manitoba</p>
          <p>Winnipeg · Canada</p>
        </div>
      </div>
    </section>
  );
}