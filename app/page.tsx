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
   RESEARCH THRUSTS
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
   DEVICE MOSAIC
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
   CURRENT PEOPLE
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

      {/* HERO */}

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
                  SenSys Lab Research
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
              <Reveal
                key={area.number}
                delay={index * 90}
              >
                <Link
                  href={area.href}
                  className="group flex h-full flex-col overflow-hidden border border-[var(--border)] bg-[var(--surface)] transition duration-300 hover:-translate-y-1 hover:border-[var(--um-blue)] hover:shadow-[var(--shadow-medium)]"
                >
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
                </div>
              </Link>
            </Reveal>

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

            <div className="grid gap-3 sm:grid-cols-3 lg:col-span-5">
              {deviceMosaic.slice(2).map((item, index) => (
                <Reveal
                  key={item.title}
                  delay={220 + index * 70}
                >
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
        </div>
      </section>

      {/* RESEARCH FOUNDATIONS */}

      <FeaturedResearch />

      {/* ===================================================== */}
      {/* TRACK RECORD */}
      {/* ===================================================== */}

      <section className="relative overflow-hidden bg-[var(--section-blue)] px-8 py-24 text-white md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
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
              </div>
            </div>
          </Reveal>

          <div className="mt-16 grid overflow-hidden border border-white/15 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-8">
              <AnimatedCounter
                value={publicationCount}
                className="text-5xl font-semibold text-[#F2A900]"
              />

              <p className="mt-3 text-sm text-white/75">
                Publication Records
              </p>
            </div>

            <div className="border-white/15 p-8 lg:border-l">
              <AnimatedCounter
                value={98}
                className="text-5xl font-semibold text-[#F2A900]"
              />

              <p className="mt-3 text-sm text-white/75">
                Patents
              </p>
            </div>

            <div className="border-white/15 p-8 lg:border-l">
              <AnimatedCounter
                value={44}
                className="text-5xl font-semibold text-[#F2A900]"
              />

              <p className="mt-3 text-sm text-white/75">
                Sponsored Research Grants
              </p>
            </div>

            <div className="border-white/15 p-8 lg:border-l">
              <AnimatedCounter
                value={5}
                minimumDigits={2}
                className="text-5xl font-semibold text-[#F2A900]"
              />

              <p className="mt-3 text-sm text-white/75">
                Technologies Transferred / Licensed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* LATEST NEWS */}
      {/* ===================================================== */}

      {featuredNews && (
        <section className="bg-[var(--surface-soft)] px-8 py-24 md:px-16 md:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                Latest from SenSys Lab
              </p>

              <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                Research, recognition,
                <br />
                and new beginnings.
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-14 grid overflow-hidden border border-[var(--border)] bg-[var(--surface)] lg:grid-cols-[1.05fr_0.95fr]">
                {featuredNews.image && (
                  <div className="relative min-h-[430px]">
                    <Image
                      src={featuredNews.image}
                      alt={featuredNews.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-col justify-center p-8 md:p-12">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--um-blue)]">
                    {featuredNews.category} · {featuredNews.date}
                  </p>

                  <h3 className="mt-5 text-3xl font-semibold leading-tight md:text-4xl">
                    {featuredNews.title}
                  </h3>

                  <p className="mt-6 text-base leading-8 text-[var(--foreground-soft)]">
                    {featuredNews.summary}
                  </p>

                  <Link
                    href="/news"
                    className="mt-8 text-sm font-semibold text-[var(--um-blue)]"
                  >
                    All News & Impact →
                  </Link>
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
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
              Selected Publications
            </p>

            <h2 className="mt-5 max-w-4xl text-4xl font-semibold md:text-6xl">
              Research you can see.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {selectedPublications.map((paper, index) => (
              <Reveal
                key={paper.title}
                delay={index * 100}
              >
                <article className="h-full overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
                  <div className="relative aspect-[4/3] bg-[var(--surface-soft)]">
                    <Image
                      src={paper.image}
                      alt={paper.category}
                      fill
                      className="object-contain p-5"
                    />
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
                      className="mt-6 inline-flex text-sm font-semibold text-[var(--um-blue)]"
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
      {/* PEOPLE */}
      {/* ===================================================== */}

      <section className="bg-[var(--surface-soft)] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  People
                </p>

                <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                  Researchers building the
                  <br />
                  future of sensing.
                </h2>
              </div>

              <Link
                href="/people"
                className="text-sm font-semibold text-[var(--um-blue)]"
              >
                Meet Team SenSys →
              </Link>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {people.map((person, index) => (
              <Reveal
                key={person.name}
                delay={index * 100}
              >
                <Link
                  href={person.href}
                  className="group block h-full overflow-hidden border border-[var(--border)] bg-[var(--surface)] transition hover:-translate-y-1 hover:border-[var(--um-blue)] hover:shadow-[var(--shadow-soft)]"
                >
                  <div className="relative aspect-[4/3] bg-[var(--surface-muted)]">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-contain p-4 transition duration-700 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--um-blue)]">
                      {person.eyebrow}
                    </p>

                    <h3 className="mt-3 text-2xl font-semibold">
                      {person.name}
                    </h3>

                    <p className="mt-2 text-sm text-[var(--foreground-soft)]">
                      {person.role}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* INCOMING COHORT */}

          <Reveal delay={160}>
            <Link
              href="/people#incoming"
              className="group mt-8 grid overflow-hidden border border-[var(--border)] bg-[var(--surface)] transition hover:border-[var(--um-blue)] hover:shadow-[var(--shadow-soft)] md:grid-cols-[0.38fr_0.62fr]"
            >
              <div className="bg-[var(--um-gold)] p-8 text-[#2A1710] md:p-10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em]">
                  January 2027
                </p>

                <p className="mt-5 text-6xl font-semibold tracking-[-0.06em]">
                  12
                </p>

                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em]">
                  Incoming Graduate Researchers
                </p>

                <p className="mt-6 text-sm">
                  5 PhD · 7 MSc
                </p>
              </div>

              <div className="flex flex-col justify-center p-8 md:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--um-blue)]">
                  Growing SenSys Lab
                </p>

                <h3 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-4xl">
                  A new graduate cohort joins in January 2027.
                </h3>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--foreground-soft)]">
                  Incoming MSc and PhD researchers will expand the lab across
                  microsystems, diagnostics, biointegrated technologies,
                  environmental intelligence, and translational engineering.
                </p>

                <p className="mt-7 text-sm font-semibold text-[var(--um-blue)]">
                  Meet the incoming cohort →
                </p>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* JOIN */}

      <section className="bg-[var(--section-blue)] px-8 py-24 text-white md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-gold)]">
                  Join SenSys Lab
                </p>

                <h2 className="mt-5 max-w-5xl text-5xl font-semibold md:text-7xl">
                  Build what comes next.
                </h2>
              </div>

              <div>
                <p className="text-lg leading-8 text-white/80">
                  We welcome expressions of interest from undergraduate,
                  graduate, postdoctoral, and technical researchers interested
                  in building intelligent sensing technologies with real-world
                  impact.
                </p>

                <Link
                  href="/join"
                  className="mt-8 inline-flex rounded-full bg-[var(--um-gold)] px-7 py-3.5 text-sm font-semibold text-[#2A1710]"
                >
                  View opportunities →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}