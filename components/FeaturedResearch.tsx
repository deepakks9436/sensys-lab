"use client";

import Link from "next/link";
import { useState } from "react";

const stories = [
  {
    number: "01",
    title: "Pesticide Detection",
    subtitle: "Portable sensing from residue screening to field decision",
    description:
      "A multi-generation technology programme led through Prof. Sanket Goel's prior research, spanning microfluidic colourimetry, dual-mode optical sensing, wearable electrochemical detection, chemiluminescence, embedded electronics, and intelligent data analysis.",
    tags: [
      "Food Safety",
      "Microfluidics",
      "Optical Sensing",
      "Electrochemistry",
      "Wearables",
    ],
    category: "Food Safety · Field Diagnostics",
    href: "/research/pesticide-detection",

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
      "An extensive body of prior research led by Prof. Sanket Goel has explored laser-induced graphene, reduced graphene oxide, doped graphene, nanocarbon hybrids, flexible electronics, biosensors, microfluidics, and energy technologies.",
    tags: [
      "Laser-Induced Graphene",
      "Flexible Electronics",
      "Biosensors",
      "Microfluidics",
      "Energy Systems",
    ],
    category: "Advanced Materials · Integrated Devices",
    href: "/research/graphene",

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
      "Prior research has integrated functional electrodes, ion-selective sensing, heavy-metal detection, embedded electronics, IoT connectivity, temperature compensation, and machine learning into portable water-quality platforms.",
    tags: [
      "Heavy Metals",
      "Ion-Selective Sensors",
      "IoT",
      "Machine Learning",
      "Environmental Monitoring",
    ],
    category: "Environment · Connected Sensing",
    href: "/research/water-quality",

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
    subtitle: "Rapid bacteria detection and antimicrobial susceptibility testing",
    description:
      "A research programme combining microfluidic culture, electrochemical sensing, localized thermal management, antibiotic susceptibility testing, portable instrumentation, and connected interfaces for rapid point-of-care antimicrobial-resistance assessment.",
    tags: [
      "Pathogen Detection",
      "AMR",
      "AST",
      "Microfluidics",
      "Point-of-Care",
    ],
    category: "Healthcare · Intelligent Diagnostics",
    href: "/research/amr",

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

  const story = stories[active];

  const previous = () =>
    setActive((current) =>
      current === 0 ? stories.length - 1 : current - 1
    );

  const next = () =>
    setActive((current) =>
      current === stories.length - 1 ? 0 : current + 1
    );

  return (
    <section className="bg-white px-8 py-24 text-[#4F2C1D] md:px-16 md:py-32">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="grid gap-10 md:grid-cols-[0.68fr_1.32fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
              Research Foundations
            </p>
          </div>

          <div>
            <h2 className="max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
              A research legacy informing what SenSys builds next.
            </h2>

            <p className="mt-7 max-w-3xl text-base leading-8 text-[#706963]">
              SenSys builds on an extensive body of interdisciplinary research
              led by Prof. Sanket Goel and collaborators across sensing,
              microfluidics, advanced materials, intelligent instrumentation,
              environmental monitoring, and translational diagnostics.
            </p>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#837A72]">
              The representative technologies below were developed through
              Prof. Goel&apos;s prior research programmes and provide
              scientific, engineering, and translational foundations for
              research now being advanced at SenSys.
            </p>
          </div>
        </div>

        {/* MAIN FEATURE PANEL */}
        <div className="mt-16 overflow-hidden border border-[#DED6CE] bg-white">
          <div className="grid lg:grid-cols-[1.02fr_0.98fr]">

            {/* LEFT — DEVICE COLLAGE */}
            <div className="relative min-h-[620px] overflow-hidden bg-[#F7F3EC] p-6 md:p-8">

              {/* subtle background */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(242,169,0,0.14),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(56,94,157,0.10),transparent_32%)]" />

              {/* number */}
              <div className="relative z-10 flex items-center gap-3">
                <span className="text-sm font-semibold text-[#385E9D]">
                  {story.number}
                </span>

                <span className="text-sm text-[#928980]">
                  / 04
                </span>
              </div>

              {/* IMAGES */}
              <div className="relative z-10 mt-8 grid h-[475px] grid-cols-[1.38fr_0.82fr] gap-4">

                {/* LARGE MAIN IMAGE */}
                <div className="relative overflow-hidden border border-[#DED6CE] bg-white">
                  <img
                    key={`${story.number}-main`}
                    src={story.images[0].src}
                    alt={story.images[0].alt}
                    className="h-full w-full object-contain p-4 transition duration-500"
                  />

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2A1710]/85 to-transparent px-5 pb-4 pt-12">
                    <p className="text-xs font-medium text-white">
                      {story.images[0].label}
                    </p>
                  </div>
                </div>

                {/* TWO SMALL IMAGES */}
                <div className="grid grid-rows-2 gap-4">
                  <div className="relative overflow-hidden border border-[#DED6CE] bg-white">
                    <img
                      key={`${story.number}-second`}
                      src={story.images[1].src}
                      alt={story.images[1].alt}
                      className="h-full w-full object-contain p-3 transition duration-500"
                    />

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2A1710]/80 to-transparent px-4 pb-3 pt-8">
                      <p className="text-[10px] font-medium leading-4 text-white">
                        {story.images[1].label}
                      </p>
                    </div>
                  </div>

                  <div className="relative overflow-hidden border border-[#DED6CE] bg-white">
                    <img
                      key={`${story.number}-third`}
                      src={story.images[2].src}
                      alt={story.images[2].alt}
                      className="h-full w-full object-contain p-3 transition duration-500"
                    />

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2A1710]/80 to-transparent px-4 pb-3 pt-8">
                      <p className="text-[10px] font-medium leading-4 text-white">
                        {story.images[2].label}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CATEGORY */}
              <div className="relative z-10 mt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#385E9D]">
                  {story.category}
                </p>
              </div>
            </div>

            {/* RIGHT — CONTENT */}
            <div className="flex min-h-[620px] flex-col justify-between p-8 md:p-12 lg:p-14">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#385E9D]">
                  Selected Research Foundation {story.number}
                </p>

                <h3 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
                  {story.title}
                </h3>

                <p className="mt-5 max-w-xl text-lg font-medium leading-8">
                  {story.subtitle}
                </p>

                <p className="mt-7 max-w-xl text-base leading-8 text-[#706963]">
                  {story.description}
                </p>

                <div className="mt-9 flex flex-wrap gap-2">
                  {story.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#DDD5CC] px-4 py-2 text-xs text-[#645D57]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-12">
                <Link
                  href={story.href}
                  className="inline-flex items-center gap-3 border-b border-[#4F2C1D] pb-1 text-sm font-medium transition hover:border-[#385E9D] hover:text-[#385E9D]"
                >
                  Explore this research foundation
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* SELECTORS */}
          <div className="flex flex-col border-t border-[#DED6CE] md:flex-row md:items-center md:justify-between">

            <div className="grid flex-1 grid-cols-2 md:grid-cols-4">
              {stories.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`border-b border-[#DED6CE] px-5 py-5 text-left transition md:border-b-0 md:border-r ${
                    active === index
                      ? "bg-[#4F2C1D] text-white"
                      : "bg-white text-[#706963] hover:bg-[#FBF8F4]"
                  }`}
                >
                  <span
                    className={`text-[10px] tracking-[0.25em] ${
                      active === index
                        ? "text-[#F2A900]"
                        : "text-[#385E9D]"
                    }`}
                  >
                    {item.number}
                  </span>

                  <p className="mt-2 text-xs font-medium leading-5">
                    {item.title}
                  </p>
                </button>
              ))}
            </div>

            {/* NAV ARROWS */}
            <div className="flex">
              <button
                type="button"
                onClick={previous}
                aria-label="Previous research foundation"
                className="flex h-16 w-16 items-center justify-center border-l border-[#DED6CE] text-xl transition hover:bg-[#F2A900]"
              >
                ←
              </button>

              <button
                type="button"
                onClick={next}
                aria-label="Next research foundation"
                className="flex h-16 w-16 items-center justify-center border-l border-[#DED6CE] text-xl transition hover:bg-[#F2A900]"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* PROVENANCE */}
        <div className="mt-7 border-l-2 border-[#F2A900] pl-5">
          <p className="max-w-4xl text-xs leading-6 text-[#837A72]">
            Research foundations presented in this section reflect work led by
            Prof. Sanket Goel and collaborators prior to the establishment of
            SenSys at the University of Manitoba. They are presented to
            illustrate the scientific expertise and translational experience
            underpinning the SenSys research programme.
          </p>
        </div>
      </div>
    </section>
  );
}