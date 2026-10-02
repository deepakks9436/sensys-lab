"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Reveal from "./Reveal";

type Platform = {
  title: string;
  category: string;
  image: string;
  href: string;
  description: string;
};

const platforms: Platform[] = [
  {
    title: "Bacteria-on-Chip",
    category: "Intelligent Diagnostics",
    image: "/research/AMR/Bacteria-on-chip.png",
    href: "/research/amr",
    description:
      "Portable pathogen detection and multiplexed antimicrobial susceptibility testing.",
  },
  {
    title: "PestiSafe",
    category: "Food Safety",
    image: "/research/pesticide-detection/pestisafe-2.jpg",
    href: "/research/pesticide-detection",
    description:
      "Portable and field-ready pesticide sensing across optical and electrochemical platforms.",
  },
  {
    title: "Graphene Microsystems",
    category: "Advanced Materials",
    image: "/research/graphene/ctni-microfluidic-sensor.jpg",
    href: "/research/graphene",
    description:
      "Graphene-enabled microsystems spanning sensing, flexible devices, and translational platforms.",
  },
  {
    title: "Water Quality Array",
    category: "Environmental Intelligence",
    image: "/research/water-quality/ion-selective-array.png",
    href: "/research/water-quality",
    description:
      "Connected multi-parameter sensing for portable water-quality monitoring.",
  },
  {
    title: "Lab-on-Glove",
    category: "Biointegrated Systems",
    image: "/research/pesticide-detection/pestisafe-3.png",
    href: "/research/pesticide-detection",
    description:
      "Wearable textile sensing designed for direct, field-ready sample interrogation.",
  },
];

const ROTATION_MS = 4000;

export default function PlatformsInAction() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % platforms.length);
    }, ROTATION_MS);

    return () => window.clearInterval(interval);
  }, [paused]);

  const orderedPlatforms = useMemo(() => {
    const active = platforms[activeIndex];
    const rest = platforms.filter((_, index) => index !== activeIndex);
    return [active, ...rest];
  }, [activeIndex]);

  const featured = orderedPlatforms[0];
  const secondary = orderedPlatforms.slice(1);

  return (
    <section
      className="bg-[var(--background)] px-5 py-20 md:px-16 md:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="grid gap-8 md:grid-cols-[0.62fr_1.38fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                Platforms in Action
              </p>
            </div>

            <div>
              <h2 className="max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                Devices engineered
                <br />
                beyond the benchtop.
              </h2>

              <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
                From microfluidic chips and wearable systems to portable
                analytical instrumentation, SenSys connects sensing science
                with practical deployment.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <Reveal className="h-full" delay={80}>
            <Link
              key={featured.title}
              href={featured.href}
              className="group relative block min-h-[500px] overflow-hidden border border-[var(--border)] bg-[var(--surface-soft)] lg:min-h-[624px]"
            >
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-contain p-7 transition-transform duration-700 group-hover:scale-[1.035] md:p-10"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={activeIndex === 0}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#17263D]/90 via-[#17263D]/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#F2A900]">
                  {featured.category}
                </p>

                <h3 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
                  {featured.title}
                </h3>

                <p className="mt-4 max-w-xl text-sm leading-7 text-white/80">
                  {featured.description}
                </p>
              </div>
            </Link>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {secondary.map((item, index) => (
              <Reveal
                key={item.title}
                className="h-full"
                delay={150 + index * 70}
                direction={index % 2 === 0 ? "right" : "up"}
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex(
                      platforms.findIndex((platform) => platform.title === item.title)
                    )
                  }
                  className="group relative block min-h-[290px] w-full overflow-hidden border border-[var(--border)] bg-[var(--surface-soft)] text-left lg:min-h-[304px]"
                  aria-label={`Feature ${item.title}`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-5 transition-transform duration-700 group-hover:scale-[1.045] md:p-6"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#17263D]/92 via-[#17263D]/8 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#F2A900]">
                      {item.category}
                    </p>

                    <h3 className="mt-2 text-xl font-semibold leading-tight text-white md:text-2xl">
                      {item.title}
                    </h3>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {platforms.map((platform, index) => (
            <button
              key={platform.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${platform.title}`}
              aria-pressed={activeIndex === index}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-8 bg-[var(--um-blue)]"
                  : "w-2 bg-[var(--border-strong)] hover:bg-[var(--um-sky)]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
