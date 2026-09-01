"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const stories = [
  {
    number: "01",
    title: "Pesticide Detection",
    subtitle: "Portable sensing from residue screening to field decision",
    description:
      "A multi-generation research programme spanning microfluidic colourimetry, dual-mode optical sensing, wearable electrochemical detection, chemiluminescence, embedded electronics, and intelligent analysis.",
    tags: [
      "Food Safety",
      "Microfluidics",
      "Optical Sensing",
      "Electrochemistry",
      "Wearables",
    ],
    category: "Food Safety · Field Diagnostics",
    href: "/research/pesticide-detection",
    colour: "var(--um-blue)",
    images: [
      {
        src: "/research/pesticide-detection/pestisafe-2.jpg",
        alt: "PestiSafe dual-mode portable pesticide detection platform",
        label: "Dual-Mode Optical Platform",
      },
      {
        src: "/research/pesticide-detection/pestisafe-1.png",
        alt: "PestiSafe microfluidic pesticide detection platform",
        label: "Microfluidic Colourimetry",
      },
      {
        src: "/research/pesticide-detection/pestisafe-3.png",
        alt: "PestiSafe lab-on-glove pesticide sensing platform",
        label: "Lab-on-Glove",
      },
    ],
  },

  {
    number: "02",
    title: "Graphene Technologies",
    subtitle: "From engineered carbon materials to integrated devices",
    description:
      "An extensive research portfolio exploring laser-induced graphene, reduced graphene oxide, doped graphene, nanocarbon hybrids, flexible electronics, biosensors, microfluidics, and energy technologies.",
    tags: [
      "Laser-Induced Graphene",
      "Flexible Electronics",
      "Biosensors",
      "Microfluidics",
      "Energy Systems",
    ],
    category: "Advanced Materials · Integrated Devices",
    href: "/research/graphene",
    colour: "var(--um-sky)",
    images: [
      {
        src: "/research/graphene/graphene-portfolio.jpg",
        alt: "Graphene technology research portfolio",
        label: "Graphene Device Portfolio",
      },
      {
        src: "/research/graphene/myoglobin-bioresistor.jpg",
        alt: "Graphene BioResistor for myoglobin detection",
        label: "Graphene BioResistor",
      },
      {
        src: "/research/graphene/ctni-microfluidic-sensor.jpg",
        alt: "Microfluidic graphene cardiac biomarker sensor",
        label: "Microfluidic Biosensor",
      },
    ],
  },

  {
    number: "03",
    title: "Water Quality Technologies",
    subtitle: "Connected sensing for decentralized environmental analysis",
    description:
      "Research integrating functional electrodes, ion-selective sensing, heavy-metal detection, embedded electronics, IoT connectivity, temperature compensation, and machine learning into portable water-quality platforms.",
    tags: [
      "Heavy Metals",
      "Ion-Selective Sensors",
      "IoT",
      "Machine Learning",
      "Environmental Monitoring",
    ],
    category: "Environment · Connected Sensing",
    href: "/research/water-quality",
    colour: "var(--um-blue)",
    images: [
      {
        src: "/research/water-quality/ion-selective-array.png",
        alt: "Portable ion-selective water-quality sensing platform",
        label: "Ion-Selective Array",
      },
      {
        src: "/research/water-quality/heavy-metal-sensing.jpg",
        alt: "Multiplexed heavy-metal sensing platform",
        label: "Heavy-Metal Sensing",
      },
      {
        src: "/research/water-quality/ai-water-quality-index.gif",
        alt: "AI-enabled Water Quality Index monitoring platform",
        label: "AI-Enabled Water Quality",
      },
    ],
  },

  {
    number: "04",
    title: "Pathogen & AMR Diagnostics",
    subtitle:
      "Rapid bacteria detection and antimicrobial susceptibility testing",
    description:
      "A research programme combining microfluidic culture, electrochemical sensing, localized thermal management, antibiotic susceptibility testing, portable instrumentation, and connected interfaces.",
    tags: [
      "Pathogen Detection",
      "AMR",
      "AST",
      "Microfluidics",
      "Point-of-Care",
    ],
    category: "Healthcare · Intelligent Diagnostics",
    href: "/research/amr",
    colour: "var(--um-sky)",
    images: [
      {
        src: "/research/AMR/Bacteria-on-chip.png",
        alt: "Portable Bacteria-on-Chip antimicrobial resistance platform",
        label: "Bacteria-on-Chip",
      },
      {
        src: "/research/AMR/Electromicrofluidic-Device.png",
        alt: "Electromicrofluidic antibiotic susceptibility testing device",
        label: "Rapid AST",
      },
      {
        src: "/research/AMR/Microfluidic-electrochemical-device.jpg",
        alt: "Microfluidic electrochemical bacterial detection device",
        label: "Bacterial Detection",
      },
    ],
  },
];

export default function FeaturedResearch() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const story = stories[active];

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setActive((current) => (current + 1) % stories.length);
    }, 6500);

    return () => clearInterval(interval);
  }, [paused]);

  const previous = () => {
    setActive((current) =>
      current === 0 ? stories.length - 1 : current - 1
    );
  };

  const next = () => {
    setActive((current) =>
      current === stories.length - 1 ? 0 : current + 1
    );
  };

  return (
    <section className="bg-[var(--background)] px-8 py-24 text-[var(--foreground)] md:px-16 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="grid gap-10 md:grid-cols-[0.62fr_1.38fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
              Research Foundations
            </p>
          </div>

          <div>
            <h2 className="max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
              Research foundations
              <br />
              shaping what comes next.
            </h2>

            <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
              Explore selected sensing technologies spanning diagnostics,
              microfluidics, advanced materials, intelligent instrumentation,
              food safety, and environmental monitoring.
            </p>
          </div>
        </div>

        {/* MAIN FEATURE */}
        <div
          className="mt-16 overflow-hidden border border-[var(--border)] bg-[var(--surface)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            {/* LEFT — VISUAL */}
            <div className="relative min-h-[660px] overflow-hidden bg-[var(--surface-soft)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(0,163,224,0.14),transparent_32%),radial-gradient(circle_at_82%_80%,rgba(56,94,157,0.18),transparent_35%)]" />

              {/* TOP META */}
              <div className="relative z-10 flex items-center justify-between px-7 pt-7 md:px-9 md:pt-9">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-[var(--um-blue)]">
                    {story.number}
                  </span>

                  <span className="text-sm text-[var(--foreground-muted)]">
                    / 04
                  </span>
                </div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--um-blue)]">
                  {story.category}
                </p>
              </div>

              {/* COLLAGE */}
              <div className="relative z-10 mt-7 grid h-[510px] grid-cols-[1.32fr_0.82fr] gap-3 px-7 md:gap-4 md:px-9">
                {/* MAIN */}
                <div className="group relative overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
                  <Image
                    key={`${story.number}-main`}
                    src={story.images[0].src}
                    alt={story.images[0].alt}
                    fill
                    className="object-contain p-5 transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 65vw, 42vw"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#263a5d]/85 via-transparent to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-sm font-semibold text-white">
                      {story.images[0].label}
                    </p>
                  </div>
                </div>

                {/* SMALL */}
                <div className="grid grid-rows-2 gap-3 md:gap-4">
                  {story.images.slice(1).map((image, index) => (
                    <div
                      key={image.src}
                      className="group relative overflow-hidden border border-[var(--border)] bg-[var(--surface)]"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.06]"
                        sizes="(max-width: 1024px) 35vw, 22vw"
                      />

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#263a5d]/80 via-transparent to-transparent" />

                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <p className="text-[11px] font-medium leading-5 text-white">
                          {image.label}
                        </p>
                      </div>

                      <span
                        className={`absolute right-3 top-3 h-2.5 w-2.5 rounded-full ${
                          index === 0
                            ? "bg-[var(--um-sky)]"
                            : "bg-[var(--um-gold)]"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* COLOUR STRIPE */}
              <div
                className="absolute bottom-0 left-0 h-[5px] w-full"
                style={{
                  background: `linear-gradient(90deg, ${story.colour}, var(--um-sky), var(--um-gold))`,
                }}
              />
            </div>

            {/* RIGHT — CONTENT */}
            <div className="flex min-h-[660px] flex-col justify-between bg-[var(--surface)] p-8 md:p-12 lg:p-14">
              <div>
                <div className="flex items-center gap-3">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: story.colour }}
                  />

                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--um-blue)]">
                    Selected Foundation {story.number}
                  </p>
                </div>

                <h3 className="mt-8 text-4xl font-semibold leading-tight tracking-[-0.045em] md:text-5xl">
                  {story.title}
                </h3>

                <p className="mt-5 max-w-xl text-xl font-medium leading-8 text-[var(--foreground)]">
                  {story.subtitle}
                </p>

                <p className="mt-7 max-w-xl text-base leading-8 text-[var(--foreground-soft)]">
                  {story.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {story.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-2 text-xs text-[var(--foreground-soft)] transition hover:border-[var(--um-blue)] hover:text-[var(--um-blue)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-12">
                <Link
                  href={story.href}
                  className="group inline-flex items-center gap-3 rounded-full bg-[var(--um-blue)] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--um-blue-dark)]"
                >
                  Explore this research foundation

                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* SELECTOR NAV */}
          <div className="border-t border-[var(--border)]">
            <div className="grid md:grid-cols-[1fr_auto]">
              <div className="grid grid-cols-2 md:grid-cols-4">
                {stories.map((item, index) => {
                  const isActive = active === index;

                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => {
                        setActive(index);
                        setPaused(true);
                      }}
                      className={`group border-b border-r border-[var(--border)] px-5 py-5 text-left transition md:border-b-0 ${
                        isActive
                          ? "bg-[var(--um-blue)] text-white"
                          : "bg-[var(--surface)] text-[var(--foreground-soft)] hover:bg-[var(--surface-soft)]"
                      }`}
                    >
                      <span
                        className={`text-[10px] tracking-[0.25em] ${
                          isActive
                            ? "text-[var(--um-gold)]"
                            : "text-[var(--um-blue)]"
                        }`}
                      >
                        {item.number}
                      </span>

                      <p className="mt-2 text-xs font-semibold leading-5">
                        {item.title}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* ARROWS */}
              <div className="flex">
                <button
                  type="button"
                  onClick={previous}
                  aria-label="Previous research foundation"
                  className="flex h-full min-h-16 w-16 items-center justify-center border-l border-[var(--border)] text-xl text-[var(--foreground)] transition hover:bg-[var(--um-sky)] hover:text-white"
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={next}
                  aria-label="Next research foundation"
                  className="flex h-full min-h-16 w-16 items-center justify-center border-l border-[var(--border)] text-xl text-[var(--foreground)] transition hover:bg-[var(--um-blue)] hover:text-white"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}