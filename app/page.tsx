import Image from "next/image";
import Link from "next/link";

import Navbar from "../components/Navbar";
import DynamicHero from "../components/DynamicHero";
import FeaturedResearch from "../components/FeaturedResearch";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import AnimatedCounter from "../components/AnimatedCounter";

import { publications } from "../data/publications";
import { featuredNews } from "../data/news";

/* ============================================================
   SENSYS RESEARCH THRUSTS
============================================================ */

const researchThrusts = [
  {
    number: "01",
    title: "Intelligent Microsystems",
    subtitle: "Microdevices · Microfluidics · Integrated sensing",
    description:
      "Miniaturized systems combining sensing interfaces, microfluidics, functional materials, embedded electronics, portable instrumentation, and intelligent control.",
    image: "/research/thrusts/intelligent-microsystems.png",
    href: "/research#intelligent-microsystems",
    tags: [
      "Microfluidics",
      "Lab-on-Chip",
      "MEMS",
      "Embedded Systems",
    ],
  },
  {
    number: "02",
    title: "Biointegrated Systems",
    subtitle: "Wearables · Implantables · Flexible technologies",
    description:
      "Human-integrated sensing and energy technologies based on flexible, textile, wearable, implantable, and biocompatible architectures.",
    image: "/research/thrusts/biointegrated-systems.png",
    href: "/research#biointegrated-systems",
    tags: [
      "Wearables",
      "Implantables",
      "Textile Electronics",
      "Bioenergy",
    ],
  },
  {
    number: "03",
    title: "Intelligent Diagnostics",
    subtitle: "Point-of-care · Biosensors · Connected diagnostics",
    description:
      "Integrated diagnostic systems combining electrochemical and optical sensing, microfluidics, portable instrumentation, connectivity, and intelligent analysis.",
    image: "/research/thrusts/intelligent-diagnostics.jpg",
    href: "/research#intelligent-diagnostics",
    tags: [
      "Point-of-Care",
      "Biosensors",
      "AMR",
      "AI-Enabled Analysis",
    ],
  },
  {
    number: "04",
    title: "Agri & Environmental Intelligence",
    subtitle: "Food · Water · Soil · Field sensing",
    description:
      "Field-ready sensing technologies for food safety, pesticide residues, water quality, soil analysis, precision agriculture, and environmental decision-making.",
    image: "/research/thrusts/agri-environmental-intelligence.jpg",
    href: "/research#agri-environment",
    tags: [
      "Pesticides",
      "Water Quality",
      "Soil-on-Chip",
      "Precision Agriculture",
    ],
  },
];

/* ============================================================
   DEVICE / PLATFORM MOSAIC
============================================================ */

const deviceMosaic = [
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
  },
  {
    title: "Graphene Microsystems",
    category: "Advanced Materials",
    image: "/research/graphene/ctni-microfluidic-sensor.jpg",
    href: "/research/graphene",
  },
  {
    title: "Water Quality Array",
    category: "Environmental Intelligence",
    image: "/research/water-quality/ion-selective-array.png",
    href: "/research/water-quality",
  },
  {
    title: "Lab-on-Glove",
    category: "Biointegrated Systems",
    image: "/research/pesticide-detection/pestisafe-3.png",
    href: "/research/pesticide-detection",
  },
];

/* ============================================================
   SELECTED PUBLICATIONS
============================================================ */

const selectedPublications = [
  {
    category: "Food Safety",
    journal: "Microchemical Journal · 2026",
    title:
      "An Automated Portable Dual-Mode Optical Device for On-Site Detection and Chemometrics-Enhanced Discrimination of Pesticides",
    href: "https://doi.org/10.1016/j.microc.2026.118355",
    image: "/research/pesticide-detection/pestisafe-2.jpg",
  },
  {
    category: "Environmental Sensing",
    journal:
      "IEEE Transactions on Instrumentation and Measurement · 2026",
    title:
      "Temperature-Compensated, IoT-Enabled Portable Ion-Selective Array Device for Multi-Parameter Measurements in Water Samples",
    href: "https://doi.org/10.1109/TIM.2026.3677997",
    image: "/research/water-quality/ion-selective-array.png",
  },
  {
    category: "Wearable Bioenergy",
    journal: "IEEE Journal on Flexible Electronics · 2026",
    title:
      "Embroidery-Integrated Silver Thread Biofuel Cells for Implantable Glucose Energy Harvesting from a Living Rat",
    href: "https://doi.org/10.1109/JFLEX.2026.3656478",
    image: "/research/graphene/glucose-biofuel-cell.gif",
  },
];

/* ============================================================
   PEOPLE
============================================================ */

const people = [
  {
    name: "Prof. Sanket Goel",
    role: "Founder & Principal Investigator",
    eyebrow: "Eddie Goldenberg Research Chair of Canada",
    image: "/people/sanket-goel.webp",
    href: "/people/sanket-goel",
  },
  {
    name: "K. S. Deepak",
    role: "Postdoctoral Researcher",
    eyebrow: "SenSys Lab",
    image: "/people/ks-deepak.jpg",
    href: "/people/ks-deepak",
  },
  {
    name: "Parvathy Nair",
    role: "Postdoctoral Researcher",
    eyebrow: "SenSys Lab",
    image: "/people/parvathy-nair.jpg",
    href: "/people/parvathy-nair",
  },
];

/* ============================================================
   PAGE
============================================================ */

export default function Home() {
  const publicationCount = publications.length;

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />

      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <DynamicHero />

      {/* ===================================================== */}
      {/* FOUR RESEARCH THRUSTS */}
      {/* ===================================================== */}

      <section className="bg-[var(--surface-soft)] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 md:grid-cols-[0.62fr_1.38fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  SenSys Research
                </p>
              </div>

              <div>
                <h2 className="max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                  Four research thrusts.
                  <br />
                  One connected ecosystem.
                </h2>

                <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
                  SenSys connects materials, microfluidics, sensing,
                  electronics, embedded intelligence, and application-driven
                  engineering across four interdisciplinary research
                  directions.
                </p>

                <Link
                  href="/research"
                  className="mt-7 inline-flex text-sm font-semibold text-[var(--um-blue)] transition hover:text-[var(--um-sky)]"
                >
                  Explore our research vision →
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {researchThrusts.map((area, index) => (
              <Reveal key={area.number} delay={index * 90}>
                <Link
                  href={area.href}
                  className="group flex h-full flex-col overflow-hidden border border-[var(--border)] bg-[var(--surface)] transition duration-300 hover:-translate-y-1 hover:border-[var(--um-blue)] hover:shadow-[var(--shadow-medium)]"
                >
                  {/* IMAGE */}

                  <div className="relative aspect-[16/10] overflow-hidden bg-white">
                    <Image
                      src={area.image}
                      alt={area.title}
                      fill
                      className="object-contain p-5 transition duration-700 group-hover:scale-[1.035]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />

                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#17263D]/55 via-[#17263D]/10 to-transparent" />

                    <span className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-[#17263D]/85 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                      Research Thrust {area.number}
                    </span>
                  </div>

                  {/* CONTENT */}

                  <div className="flex flex-1 flex-col p-7 md:p-8">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--um-blue)]">
                      {area.subtitle}
                    </p>

                    <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.035em]">
                      {area.title}
                    </h3>

                    <p className="mt-5 flex-1 text-sm leading-7 text-[var(--foreground-soft)]">
                      {area.description}
                    </p>

                    <div className="mt-7 flex flex-wrap gap-2">
                      {area.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1.5 text-[10px] text-[var(--foreground-muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-[var(--border)] pt-5">
                      <span className="text-xs font-semibold text-[var(--um-blue)]">
                        Explore thrust
                      </span>

                      <span className="text-lg text-[var(--um-blue)] transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* PLATFORMS IN ACTION */}
      {/* ===================================================== */}

      <section className="bg-[var(--background)] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-10 md:grid-cols-[0.62fr_1.38fr]">
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
                  analytical instrumentation, the goal is to connect sensing
                  science with practical deployment.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-3 lg:grid-cols-12 lg:grid-rows-2">
            {/* LARGE FEATURE */}

            <Reveal
              className="lg:col-span-7 lg:row-span-2"
              delay={80}
            >
              <Link
                href={deviceMosaic[0].href}
                className="group relative block min-h-[470px] overflow-hidden border border-[var(--border)] bg-[var(--surface-soft)] lg:h-full"
              >
                <Image
                  src={deviceMosaic[0].image}
                  alt={deviceMosaic[0].title}
                  fill
                  className="object-contain p-8 transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#17263D]/90 via-[#17263D]/5 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#F2A900]">
                    {deviceMosaic[0].category}
                  </p>

                  <h3 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
                    {deviceMosaic[0].title}
                  </h3>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-white/75">
                    {deviceMosaic[0].description}
                  </p>

                  <p className="mt-4 text-xs font-semibold text-white">
                    Explore platform →
                  </p>
                </div>
              </Link>
            </Reveal>

            {/* PESTISAFE */}

            <Reveal
              className="lg:col-span-5"
              delay={160}
              direction="right"
            >
              <Link
                href={deviceMosaic[1].href}
                className="group relative block min-h-[285px] overflow-hidden border border-[var(--border)] bg-[var(--surface-soft)]"
              >
                <Image
                  src={deviceMosaic[1].image}
                  alt={deviceMosaic[1].title}
                  fill
                  className="object-contain p-5 transition-transform duration-700 group-hover:scale-[1.05]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#385E9D]/90 via-transparent to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#F2A900]">
                    {deviceMosaic[1].category}
                  </p>

                  <h3 className="mt-2 text-2xl font-semibold text-white">
                    {deviceMosaic[1].title}
                  </h3>
                </div>
              </Link>
            </Reveal>

            {/* SMALL PLATFORMS */}

            <div className="grid gap-3 sm:grid-cols-3 lg:col-span-5">
              {deviceMosaic.slice(2).map((item, index) => (
                <Reveal key={item.title} delay={220 + index * 70}>
                  <Link
                    href={item.href}
                    className="group relative block min-h-[225px] overflow-hidden border border-[var(--border)] bg-[var(--surface-soft)]"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.06]"
                      sizes="(max-width: 1024px) 50vw, 20vw"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#17263D]/90 via-transparent to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#F2A900]">
                        {item.category}
                      </p>

                      <h3 className="mt-2 text-sm font-semibold leading-5 text-white">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={320}>
            <div className="mt-10 flex justify-center">
              <Link
                href="/research"
                className="rounded-full border border-[var(--um-blue)] px-7 py-3.5 text-sm font-semibold text-[var(--um-blue)] transition hover:bg-[var(--um-blue)] hover:text-white"
              >
                Explore all research →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* RESEARCH FOUNDATIONS */}
      {/* ===================================================== */}

      <FeaturedResearch />

      {/* ===================================================== */}
      {/* TRACK RECORD */}
      {/* ===================================================== */}

      <section className="relative overflow-hidden bg-[var(--section-blue)] px-8 py-24 text-white md:px-16 md:py-28">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#00A3E0]/20 blur-[120px]" />

        <div className="pointer-events-none absolute -bottom-44 left-[-100px] h-[380px] w-[380px] rounded-full bg-[#F2A900]/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 md:grid-cols-[0.68fr_1.32fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#F2A900]">
                  Research Track Record
                </p>
              </div>

              <div>
                <h2 className="max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                  Experience translating research into technologies.
                </h2>

                <p className="mt-7 max-w-3xl text-base leading-8 text-white/75">
                  A broad interdisciplinary portfolio spanning microsystems,
                  microfluidics, advanced materials, sensing, diagnostics,
                  intelligent instrumentation, and technology translation.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-16 grid overflow-hidden border border-white/15 md:grid-cols-2 lg:grid-cols-4">
            <Reveal delay={0}>
              <div className="h-full border-b border-white/15 p-8 md:border-r lg:border-b-0">
                <AnimatedCounter
                  value={publicationCount}
                  className="text-5xl font-semibold tracking-tight text-[#F2A900] md:text-6xl"
                />

                <p className="mt-3 text-sm leading-6 text-white/75">
                  Publication Records
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="h-full border-b border-white/15 p-8 lg:border-b-0 lg:border-r">
                <AnimatedCounter
                  value={98}
                  className="text-5xl font-semibold tracking-tight text-[#F2A900] md:text-6xl"
                />

                <p className="mt-3 text-sm leading-6 text-white/75">
                  Patents
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="h-full border-b border-white/15 p-8 md:border-r lg:border-b-0">
                <AnimatedCounter
                  value={44}
                  className="text-5xl font-semibold tracking-tight text-[#F2A900] md:text-6xl"
                />

                <p className="mt-3 text-sm leading-6 text-white/75">
                  Sponsored Research Grants
                </p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="h-full p-8">
                <AnimatedCounter
                  value={5}
                  minimumDigits={2}
                  className="text-5xl font-semibold tracking-tight text-[#F2A900] md:text-6xl"
                />

                <p className="mt-3 text-sm leading-6 text-white/75">
                  Technologies Transferred / Licensed
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={250}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/publications"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#385E9D] transition hover:bg-[#F2A900] hover:text-[#2A1710]"
              >
                Publications →
              </Link>

              <Link
                href="/patents"
                className="rounded-full border border-white/35 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-[#385E9D]"
              >
                Patents →
              </Link>

              <Link
                href="/books"
                className="rounded-full border border-white/35 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-[#385E9D]"
              >
                Books →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* LATEST NEWS */}
      {/* ===================================================== */}

      {featuredNews && (
        <section className="bg-[var(--surface-soft)] px-8 py-24 md:px-16 md:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="grid gap-10 md:grid-cols-[0.62fr_1.38fr]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                    Latest from SenSys
                  </p>
                </div>

                <div>
                  <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                    Research, recognition,
                    <br />
                    and new beginnings.
                  </h2>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-14 grid overflow-hidden border border-[var(--border)] bg-[var(--surface)] lg:grid-cols-[1.05fr_0.95fr]">
                {featuredNews.image && (
                  <div className="group relative min-h-[430px] overflow-hidden bg-[var(--surface-muted)]">
                    <Image
                      src={featuredNews.image}
                      alt={featuredNews.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                      sizes="(max-width: 1024px) 100vw, 55vw"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#385E9D]/25 via-transparent to-transparent" />

                    <div className="absolute bottom-0 left-0 h-[5px] w-full bg-gradient-to-r from-[#385E9D] via-[#00A3E0] to-[#F2A900]" />
                  </div>
                )}

                <div className="flex flex-col justify-center p-8 md:p-12">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--um-blue)]">
                      {featuredNews.category}
                    </p>

                    <span className="text-xs text-[var(--foreground-muted)]">
                      ·
                    </span>

                    <p className="text-xs text-[var(--foreground-muted)]">
                      {featuredNews.date}
                    </p>
                  </div>

                  <h3 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.035em] md:text-4xl">
                    {featuredNews.title}
                  </h3>

                  <p className="mt-6 text-base leading-8 text-[var(--foreground-soft)]">
                    {featuredNews.summary}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <a
                      href={featuredNews.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex w-fit items-center gap-3 rounded-full bg-[var(--um-blue)] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--um-blue-dark)]"
                    >
                      Read story
                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </a>

                    <Link
                      href="/news"
                      className="inline-flex w-fit items-center rounded-full border border-[var(--border-strong)] px-6 py-3.5 text-sm font-semibold transition hover:border-[var(--um-blue)] hover:text-[var(--um-blue)]"
                    >
                      All News & Impact →
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ===================================================== */}
      {/* SELECTED PUBLICATIONS */}
      {/* ===================================================== */}

      <section className="bg-[var(--background)] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Selected Publications
                </p>

                <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                  Research you can see.
                </h2>

                <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
                  Selected publications illustrating sensing, microfluidics,
                  environmental monitoring, portable instrumentation, and
                  biointegrated technologies.
                </p>
              </div>

              <Link
                href="/publications"
                className="w-fit rounded-full border border-[var(--um-blue)] px-6 py-3 text-sm font-semibold text-[var(--um-blue)] transition hover:bg-[var(--um-blue)] hover:text-white"
              >
                View all publications →
              </Link>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {selectedPublications.map((paper, index) => (
              <Reveal key={paper.title} delay={index * 120}>
                <article className="group h-full overflow-hidden border border-[var(--border)] bg-[var(--surface)] transition duration-300 hover:-translate-y-1 hover:border-[var(--um-blue)] hover:shadow-[var(--shadow-soft)]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-soft)]">
                    <Image
                      src={paper.image}
                      alt={paper.category}
                      fill
                      className="object-contain p-5 transition-transform duration-700 group-hover:scale-[1.05]"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#17263D]/90 via-[#17263D]/25 to-transparent px-5 pb-4 pt-14">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#F2A900]">
                        {paper.category}
                      </p>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--foreground-muted)]">
                      {paper.journal}
                    </p>

                    <h3 className="mt-4 text-xl font-semibold leading-7">
                      {paper.title}
                    </h3>

                    <a
                      href={paper.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex text-sm font-semibold text-[var(--um-blue)] transition hover:text-[var(--um-sky)]"
                    >
                      Read publication →
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* PRINCIPAL INVESTIGATOR */}
      {/* ===================================================== */}

      <section className="bg-[var(--surface-soft)] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
              Principal Investigator
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-12 grid overflow-hidden border border-[var(--border)] bg-[var(--surface)] lg:grid-cols-[0.9fr_1.1fr]">
              <Link
                href="/people/sanket-goel"
                className="group relative min-h-[600px] overflow-hidden bg-[var(--surface-muted)]"
              >
                <Image
                  src="/people/sanket-goel.webp"
                  alt="Prof. Sanket Goel"
                  fill
                  className="object-contain object-center transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />

                <div className="absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r from-[#385E9D] via-[#00A3E0] to-[#F2A900]" />
              </Link>

              <div className="flex flex-col justify-between p-8 md:p-12">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--um-blue)]">
                    Eddie Goldenberg Research Chair of Canada
                  </p>

                  <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                    Prof. Sanket Goel
                  </h2>

                  <p className="mt-3 text-sm font-medium">
                    Founder & Principal Investigator, SenSys Lab
                  </p>

                  <p className="mt-1 text-sm text-[var(--foreground-soft)]">
                    University of Manitoba
                  </p>

                  <p className="mt-8 max-w-2xl text-base leading-8 text-[var(--foreground-soft)]">
                    Prof. Sanket Goel leads an interdisciplinary programme
                    spanning microsystems, microfluidics, biosensors, wearable
                    and implantable technologies, advanced materials,
                    intelligent instrumentation, environmental sensing, and
                    translational engineering.
                  </p>
                </div>

                <div className="mt-10 flex flex-wrap gap-6 text-sm">
                  <Link
                    href="/people/sanket-goel"
                    className="font-medium text-[var(--um-blue)] transition hover:text-[var(--um-sky)]"
                  >
                    Full Profile →
                  </Link>

                  <a
                    href="https://scholar.google.com/citations?hl=en&user=xgH6FBkAAAAJ&view_op=list_works&sortby=pubdate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[var(--um-blue)] transition hover:text-[var(--um-sky)]"
                  >
                    Google Scholar →
                  </a>

                  <a
                    href="https://www.linkedin.com/in/sanketgoel/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[var(--um-blue)] transition hover:text-[var(--um-sky)]"
                  >
                    LinkedIn →
                  </a>

                  <a
                    href="https://www.canada.ca/en/impact-plus-chairs.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[var(--um-blue)] transition hover:text-[var(--um-sky)]"
                  >
                    Research Chair Programme →
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* PEOPLE */}
      {/* ===================================================== */}

      <section className="bg-[var(--background)] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  People
                </p>

                <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                  Researchers building the future of sensing.
                </h2>
              </div>

              <Link
                href="/people"
                className="w-fit text-sm font-semibold text-[var(--um-blue)] transition hover:text-[var(--um-sky)]"
              >
                Meet the team →
              </Link>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {people.map((person, index) => (
              <Reveal key={person.name} delay={index * 120}>
                <Link
                  href={person.href}
                  className="group block h-full overflow-hidden border border-[var(--border)] bg-[var(--surface)] transition duration-300 hover:-translate-y-1 hover:border-[var(--um-blue)] hover:shadow-[var(--shadow-soft)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-soft)]">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />

                    <div className="absolute inset-x-0 bottom-0 h-[3px] bg-[var(--um-blue)] transition-all duration-300 group-hover:h-[6px]" />
                  </div>

                  <div className="p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--um-blue)]">
                      {person.eyebrow}
                    </p>

                    <h3 className="mt-3 text-2xl font-semibold">
                      {person.name}
                    </h3>

                    <p className="mt-2 text-sm text-[var(--foreground-soft)]">
                      {person.role}
                    </p>

                    <p className="mt-5 text-xs font-semibold text-[var(--um-blue)]">
                      View profile →
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* JOIN */}
      {/* ===================================================== */}

      <section className="relative overflow-hidden bg-[var(--section-blue)] px-8 py-24 text-white md:px-16 md:py-28">
        <div className="pointer-events-none absolute right-[-80px] top-[-100px] h-[360px] w-[360px] rounded-full bg-[#00A3E0]/25 blur-[100px]" />

        <div className="pointer-events-none absolute bottom-[-200px] left-[20%] h-[400px] w-[400px] rounded-full bg-[#F2A900]/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#F2A900]">
                  Join SenSys
                </p>

                <h2 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-7xl">
                  Build the future of sensing with us.
                </h2>
              </div>

              <div>
                <p className="max-w-xl text-lg leading-8 text-white/80">
                  We welcome expressions of interest from undergraduate
                  researchers, M.Sc. and Ph.D. students, postdoctoral
                  researchers, and professionals interested in research
                  operations and technology development.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/join"
                    className="rounded-full bg-[#F2A900] px-7 py-3.5 text-sm font-semibold text-[#2A1710] transition hover:bg-white"
                  >
                    View opportunities →
                  </Link>

                  <a
                    href="mailto:sanketgoel@gmail.com?subject=Interest%20in%20Joining%20SenSys%20Lab"
                    className="rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-[#385E9D]"
                  >
                    Email Prof. Sanket Goel →
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}