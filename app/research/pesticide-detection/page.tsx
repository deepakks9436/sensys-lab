import Image from "next/image";
import Link from "next/link";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Reveal from "../../../components/Reveal";

/* ============================================================
   TYPES
============================================================ */

type Platform = {
  number: string;
  name: string;
  title: string;
  category: string;
  image: string;
  video: string;
  description: string;
  features: string[];
  metrics: string[];
  publication: string;
};

/* ============================================================
   PLATFORM DATA
============================================================ */

const platforms: Platform[] = [
  {
    number: "01",
    name: "PestiSafe 1.0",
    title: "Microfluidic Colourimetric Detection",
    category: "Colourimetry · Microfluidics · IoT",
    image: "/research/pesticide-detection/pestisafe-1.png",
    video: "https://youtu.be/HuAiM6dAkao",
    description:
      "A handheld organophosphorus-pesticide screening system combining chemical colour development, passive microfluidic mixing, optoelectronic detection, embedded electronics, and connected reporting.",
    features: [
      "Modified molybdenum-blue reaction for organophosphorus pesticide detection.",
      "PDMS chip integrating split-and-recombine and spiral micromixers.",
      "LED-photodiode optical readout with transimpedance amplification.",
      "OLED display, Android interface, and ThingSpeak connectivity.",
      "Evaluated for malathion, chlorpyrifos, dimethoate, and an organophosphorus mixture.",
    ],
    metrics: [
      "OP mixture LoD · 0.07 ppm",
      "Cucumber validation",
      "IoT enabled",
    ],
    publication: "https://ieeexplore.ieee.org/document/10768934",
  },
  {
    number: "02",
    name: "PestiSafe 2.0",
    title: "Dual-Mode Optical Detection & Pesticide Discrimination",
    category: "Optical Sensing · Fluorescence · Chemometrics",
    image: "/research/pesticide-detection/pestisafe-2.jpg",
    video: "https://youtu.be/jDNuqfgy-qs",
    description:
      "A portable dual-mode platform combining complementary optical measurements to generate internally cross-verified analytical responses together with chemometric pesticide discrimination.",
    features: [
      "Independent complementary optical measurement channels.",
      "Integrated signal conditioning, amplification, and automated optical readout.",
      "BLE-enabled mobile interface for calibration and reporting.",
      "Chemometric analysis using PCA and k-NN for pesticide discrimination.",
      "Validated using food and water matrices including rice, cucumber, and tap water.",
    ],
    metrics: [
      "Imidacloprid LoD · 2–3 µg/L",
      "Malathion LoD · 30–40 µg/L",
      "Recovery · 92–107%",
    ],
    publication: "https://doi.org/10.1016/j.microc.2026.118355",
  },
  {
    number: "03",
    name: "PestiSafe 3.0",
    title: "Machine-Embroidered Lab-on-Glove Biosensor",
    category: "Electrochemistry · Wearables · Textile Electronics",
    image: "/research/pesticide-detection/pestisafe-3.png",
    video: "https://youtu.be/DDIR4CQRPBY",
    description:
      "A wearable electrochemical sensing platform fabricated through computerized embroidery for direct swipe-and-scan pesticide-residue screening from agricultural surfaces.",
    features: [
      "Silver-coated polyamide textile electrodes integrated onto a glove.",
      "AChE inhibition-based electrochemical detection of monocrotophos.",
      "Machine-learning-assisted and statistical stitch-parameter optimization.",
      "Mechanical evaluation under bending and twisting.",
      "Reusability and long-term storage-stability evaluation.",
    ],
    metrics: [
      "LoD · 1.55 µg/L",
      "Range · 5–100 µg/L",
      "90-day stability",
    ],
    publication: "https://doi.org/10.1039/D6LC00452K",
  },
  {
    number: "04",
    name: "Chemiluminescence PoST",
    title: "Microfluidic Point-of-Source Chemiluminometer",
    category: "Chemiluminescence · µPAD · Imaging",
    image: "/research/pesticide-detection/chemiluminescence-post.jpg",
    video: "https://youtu.be/Jz8HaVunTlo",
    description:
      "A standalone chemiluminescence platform combining disposable paper-based test strips, controlled reagent handling, incubation, imaging, and onsite signal analysis.",
    features: [
      "Luminol–H₂O₂–Co²⁺ chemiluminescence assay for malathion detection.",
      "Plug-and-play paper-based analytical test strips.",
      "Microfluidic reagent delivery and onboard incubation.",
      "Raspberry Pi camera and touchscreen-based acquisition.",
      "Validated using apple, citrus, and tomato samples.",
    ],
    metrics: [
      "LoD · 0.016 ppm",
      "Range · 0.1–10 ppm",
      "Disposable µPAD",
    ],
    publication: "https://doi.org/10.1016/j.microc.2025.114381",
  },
];

/* ============================================================
   COMPARISON
============================================================ */

const comparison = [
  {
    platform: "PestiSafe 1.0",
    principle: "Modified molybdenum-blue colourimetry",
    targets: "Malathion, chlorpyrifos, dimethoate, OP mixture",
    lod: "2.35 / 0.20 / 0.63 / 0.07 ppm",
    samples: "Cucumber",
    capability: "Connected low-cost OP screening",
  },
  {
    platform: "PestiSafe 2.0",
    principle: "Complementary optical sensing",
    targets: "Malathion, imidacloprid + chemometric pesticide study",
    lod: "Malathion 30–40 µg/L · Imidacloprid 2–3 µg/L",
    samples: "Rice, cucumber, tap water",
    capability: "Cross-verification + pesticide discrimination",
  },
  {
    platform: "PestiSafe 3.0",
    principle: "AChE-inhibition electrochemistry",
    targets: "Monocrotophos + interference studies",
    lod: "1.55 µg/L",
    samples: "Potato, tomato, tap water",
    capability: "Wearable swipe-and-scan sensing",
  },
  {
    platform: "Chemiluminescence PoST",
    principle: "Chemiluminescence quenching",
    targets: "Malathion",
    lod: "0.016 ppm",
    samples: "Apple, citrus, tomato",
    capability: "Standalone point-of-source imaging",
  },
];

/* ============================================================
   SELECTED PUBLICATIONS
============================================================ */

const selectedPublications = [
  {
    year: "2025",
    title:
      "A Portable Hand-held Microfluidic Colorimetric Device for the Detection of Organophosphorus Pesticides",
    authors: "K. S. Deepak, S. K. Dubey, S. Goel and A. Javed",
    journal: "IEEE Sensors Journal",
    doi: "10.1109/JSEN.2024.3499873",
    href: "https://ieeexplore.ieee.org/document/10768934",
  },
  {
    year: "2026",
    title:
      "An Automated Portable Dual-Mode Optical Device for On-Site Detection and Chemometrics-Enhanced Discrimination of Pesticides",
    authors:
      "K. S. Deepak, P. Ramya Priya, Aniket Balapure, Arshad Javed, Sanket Goel and Satish Kumar Dubey",
    journal: "Microchemical Journal",
    doi: "10.1016/j.microc.2026.118355",
    href: "https://doi.org/10.1016/j.microc.2026.118355",
  },
  {
    year: "2026",
    title:
      "Machine-Embroidered Textile Electrodes: Parametric Engineering for Lab-on-Glove Electrochemical Pesticide Detection",
    authors: "K. S. Deepak, Arshad Javed, Satish Kumar Dubey and Sanket Goel",
    journal: "Lab on a Chip",
    doi: "10.1039/D6LC00452K",
    href: "https://doi.org/10.1039/D6LC00452K",
  },
  {
    year: "2025",
    title:
      "Chemiluminescence Coupled Microfluidic Point of Source Testing Device for Onsite Detection of Harmful Pesticides in Fruits",
    authors:
      "Reshma P.A., Pavar Sai Kumar, Rajnish Kaur Calay and Sanket Goel",
    journal: "Microchemical Journal",
    doi: "10.1016/j.microc.2025.114381",
    href: "https://doi.org/10.1016/j.microc.2025.114381",
  },
];

/* ============================================================
   TECHNOLOGY STACK
============================================================ */

const technologyStack = [
  {
    number: "01",
    title: "Sample Handling",
    text: "Passive microfluidics, disposable paper strips, surface sampling, and wearable swipe-based collection.",
  },
  {
    number: "02",
    title: "Recognition Chemistry",
    text: "Colorimetric reactions, enzyme inhibition, fluorescence modulation, and chemiluminescence mechanisms.",
  },
  {
    number: "03",
    title: "Signal Transduction",
    text: "Optical absorption, fluorescence, chemiluminescence imaging, and electrochemical measurements.",
  },
  {
    number: "04",
    title: "Instrumentation",
    text: "LED–photodiode systems, embedded electronics, portable potentiostats, cameras, and touchscreen interfaces.",
  },
  {
    number: "05",
    title: "Intelligence",
    text: "Calibration analytics, chemometrics, PCA, k-NN classification, connected data acquisition, and decision support.",
  },
  {
    number: "06",
    title: "Field Validation",
    text: "Food, produce, water, real-sample recovery studies, interference analysis, mechanical testing, and stability evaluation.",
  },
];

/* ============================================================
   APPLICATIONS
============================================================ */

const applications = [
  {
    title: "Food Safety",
    text: "Rapid residue screening before food reaches consumers or processing chains.",
  },
  {
    title: "Farm-Level Screening",
    text: "Portable tools for agricultural produce and field-oriented testing.",
  },
  {
    title: "Water Monitoring",
    text: "Screening pesticide contamination in water and environmental samples.",
  },
  {
    title: "Supply-Chain Quality",
    text: "Fast analytical checks for procurement, storage, processing, and quality assurance.",
  },
];

/* ============================================================
   EXPLORE NEXT
============================================================ */

const exploreNext = [
  {
    title: "Water Quality",
    description:
      "Connected electrochemical and ion-selective systems for environmental monitoring.",
    image: "/research/water-quality/ion-selective-array.png",
    href: "/research/water-quality",
  },
  {
    title: "Pathogen & AMR",
    description:
      "Microfluidic and electrochemical platforms for bacteria and antimicrobial-resistance analysis.",
    image: "/research/AMR/Bacteria-on-chip.png",
    href: "/research/amr",
  },
  {
    title: "Graphene Technologies",
    description:
      "Laser-induced graphene, flexible electronics, biosensing, and energy microsystems.",
    image: "/research/graphene/graphene-hero.jpg",
    href: "/research/graphene",
  },
];

/* ============================================================
   PAGE
============================================================ */

export default function PesticideDetectionPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />

      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <section className="relative overflow-hidden bg-[#17263D] px-8 py-24 text-white md:px-16 md:py-32">
        <Image
          src="/research/pesticide-detection/pesticide-hero.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-35"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#101C2E] via-[#17263D]/95 to-[#385E9D]/50" />

        <div className="absolute -right-40 -top-32 h-[520px] w-[520px] rounded-full bg-[#00A3E0]/15 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#F2A900]">
              Research Foundation · Food Safety & Agriculture
            </p>

            <h1 className="mt-6 max-w-6xl text-6xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-8xl">
              Pesticide Detection
              <br />
              Technologies.
            </h1>

            <p className="mt-10 max-w-3xl text-lg leading-9 text-white/80 md:text-xl">
              Portable optical, electrochemical, microfluidic, and wearable
              sensing systems for rapid pesticide-residue screening across
              food, water, agricultural produce, and field-relevant samples.
            </p>

            <div className="mt-9 flex flex-wrap gap-2">
              {[
                "Colourimetry",
                "Fluorescence",
                "Chemiluminescence",
                "Electrochemistry",
                "Microfluidics",
                "Wearables",
                "Chemometrics",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs text-white/85 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#platforms"
                className="rounded-full bg-[#F2A900] px-7 py-3.5 text-sm font-semibold text-[#2A1710] transition hover:bg-white"
              >
                Explore platforms →
              </a>

              <a
                href="#publications"
                className="rounded-full border border-white/35 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-[#385E9D]"
              >
                Publications →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* STICKY NAVIGATION */}
      {/* ===================================================== */}

      <nav className="sticky top-[72px] z-30 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl overflow-x-auto px-8 md:px-16">
          <div className="flex min-w-max items-center gap-8 py-4">
            {[
              ["Overview", "#overview"],
              ["Platforms", "#platforms"],
              ["Technology", "#technology"],
              ["Compare", "#comparison"],
              ["Applications", "#applications"],
              ["Publications", "#publications"],
              ["Explore Next", "#explore-next"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-xs font-semibold text-[var(--foreground-muted)] transition hover:text-[var(--um-blue)]"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ===================================================== */}
      {/* OVERVIEW */}
      {/* ===================================================== */}

      <section
        id="overview"
        className="scroll-mt-40 bg-[var(--background)] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Overview
                </p>
              </div>

              <div>
                <h2 className="max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                  Moving pesticide analysis from centralized laboratories to
                  the point of need.
                </h2>

                <p className="mt-8 max-w-3xl text-lg leading-9 text-[var(--foreground-soft)]">
                  The platform portfolio explores different routes to rapid
                  pesticide screening: microfluidic colour development,
                  complementary optical detection, electrochemical
                  enzyme-inhibition sensing, chemiluminescence imaging, and
                  wearable textile electronics.
                </p>

                <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--foreground-muted)]">
                  Across the platforms, the recurring engineering challenge is
                  the same: integrate sample handling, sensing chemistry,
                  transduction, electronics, data processing, and real-sample
                  validation into compact systems suitable for practical use.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] md:grid-cols-4">
            {[
              ["04", "Integrated Platforms"],
              ["04", "Detection Modalities"],
              ["Food + Water", "Real-Matrix Validation"],
              ["Portable", "System-Level Design"],
            ].map(([value, label], index) => (
              <Reveal key={label} delay={index * 70}>
                <div className="h-full bg-[var(--surface)] p-7">
                  <p className="text-3xl font-semibold text-[var(--um-gold)]">
                    {value}
                  </p>

                  <p className="mt-3 text-xs leading-5 text-[var(--foreground-muted)]">
                    {label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* EVOLUTION */}
      {/* ===================================================== */}

      <section className="bg-[var(--surface-soft)] px-8 py-20 md:px-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
              Platform Evolution
            </p>

            <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
              From connected microfluidics to wearable sensing.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-3 lg:grid-cols-4">
            {[
              {
                number: "01",
                name: "PestiSafe 1.0",
                text: "Connected microfluidic colourimetry",
              },
              {
                number: "02",
                name: "PestiSafe 2.0",
                text: "Multimodal optical sensing + chemometrics",
              },
              {
                number: "03",
                name: "PestiSafe 3.0",
                text: "Wearable electrochemical lab-on-glove",
              },
              {
                number: "04",
                name: "PoST",
                text: "Standalone chemiluminescence imaging",
              },
            ].map((item, index) => (
              <Reveal key={item.name} delay={index * 70}>
                <div className="relative h-full border border-[var(--border)] bg-[var(--surface)] p-6">
                  <p className="text-xs font-semibold text-[var(--um-gold)]">
                    {item.number}
                  </p>

                  <h3 className="mt-4 text-lg font-semibold">
                    {item.name}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[var(--foreground-soft)]">
                    {item.text}
                  </p>

                  {index < 3 && (
                    <span className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-xl text-[var(--um-blue)] lg:block">
                      →
                    </span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* PLATFORMS */}
      {/* ===================================================== */}

      <section
        id="platforms"
        className="scroll-mt-40 bg-[var(--background)] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
              Technology Portfolio
            </p>

            <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Four complementary approaches to field-oriented pesticide
              sensing.
            </h2>
          </Reveal>

          <div className="mt-16 space-y-8">
            {platforms.map((platform, index) => (
              <Reveal key={platform.name} delay={index * 70}>
                <article className="grid overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-soft)] lg:grid-cols-2">
                  <div
                    className={`relative min-h-[430px] overflow-hidden bg-[var(--surface-muted)] ${
                      index % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={platform.image}
                      alt={platform.title}
                      fill
                      className="object-contain p-6 transition duration-700 hover:scale-[1.025]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#17263D]/45 via-transparent to-transparent" />

                    <a
                      href={platform.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Watch ${platform.name} demonstration`}
                      className="group absolute inset-0 flex items-center justify-center"
                    >
                      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/70 bg-[#17263D]/75 pl-1 text-xl text-white backdrop-blur-sm transition group-hover:scale-110 group-hover:bg-[#385E9D]">
                        ▶
                      </span>
                    </a>

                    <span className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-[#17263D]/80 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm">
                      Watch demonstration
                    </span>

                    <span className="absolute right-5 top-5 text-6xl font-semibold text-white/25">
                      {platform.number}
                    </span>
                  </div>

                  <div
                    className={`flex flex-col justify-center p-8 md:p-10 lg:p-12 ${
                      index % 2 === 1 ? "lg:order-1" : ""
                    }`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--um-blue)]">
                      {platform.name}
                    </p>

                    <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                      {platform.title}
                    </h3>

                    <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--foreground-muted)]">
                      {platform.category}
                    </p>

                    <p className="mt-6 text-base leading-8 text-[var(--foreground-soft)]">
                      {platform.description}
                    </p>

                    <ul className="mt-7 space-y-3">
                      {platform.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex gap-3 text-sm leading-7 text-[var(--foreground-soft)]"
                        >
                          <span className="mt-[10px] h-2 w-2 flex-none rounded-full bg-[var(--um-blue)]" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 flex flex-wrap gap-2">
                      {platform.metrics.map((metric) => (
                        <span
                          key={metric}
                          className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-2 text-xs font-medium text-[var(--foreground)]"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4">
                      <a
                        href={platform.publication}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-[var(--um-blue)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--um-blue-dark)]"
                      >
                        Read publication →
                      </a>

                      <a
                        href={platform.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-[var(--border-strong)] px-6 py-3 text-sm font-semibold transition hover:border-[var(--um-blue)] hover:text-[var(--um-blue)]"
                      >
                        Watch video →
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* TECHNOLOGY STACK */}
      {/* ===================================================== */}

      <section
        id="technology"
        className="scroll-mt-40 bg-[var(--section-blue)] px-8 py-24 text-white md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-gold)]">
                  Technology Stack
                </p>
              </div>

              <div>
                <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  More than a sensor.
                  <br />
                  A complete analytical system.
                </h2>

                <p className="mt-7 max-w-3xl text-base leading-8 text-white/75">
                  The common engineering framework links sample interaction,
                  chemistry, transduction, embedded instrumentation, data
                  analytics, and application-level validation.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden bg-white/15 md:grid-cols-2 lg:grid-cols-3">
            {technologyStack.map((item, index) => (
              <Reveal key={item.title} delay={index * 60}>
                <div className="h-full bg-[var(--section-blue)] p-7">
                  <p className="text-xs font-semibold text-[var(--um-gold)]">
                    {item.number}
                  </p>

                  <h3 className="mt-5 text-xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/70">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* COMPARISON */}
      {/* ===================================================== */}

      <section
        id="comparison"
        className="scroll-mt-40 bg-[var(--background)] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
              Technology Comparison
            </p>

            <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Different sensing mechanisms for different deployment needs.
            </h2>

            <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
              Rather than forcing one analytical method onto every use case,
              each platform emphasizes a different balance of portability,
              selectivity, sample interaction, instrumentation, and field
              workflow.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-12 overflow-x-auto border border-[var(--border)]">
              <table className="w-full min-w-[1100px] border-collapse text-left text-sm">
                <thead className="bg-[var(--section-blue)] text-white">
                  <tr>
                    {[
                      "Platform",
                      "Detection Principle",
                      "Primary Targets",
                      "Reported LoD",
                      "Real Samples",
                      "Distinguishing Capability",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="px-5 py-4 font-semibold"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {comparison.map((item) => (
                    <tr
                      key={item.platform}
                      className="border-b border-[var(--border)] bg-[var(--surface)] transition hover:bg-[var(--surface-soft)]"
                    >
                      <td className="px-5 py-5 font-semibold text-[var(--um-blue)]">
                        {item.platform}
                      </td>

                      <td className="px-5 py-5 leading-6 text-[var(--foreground-soft)]">
                        {item.principle}
                      </td>

                      <td className="px-5 py-5 leading-6 text-[var(--foreground-soft)]">
                        {item.targets}
                      </td>

                      <td className="px-5 py-5 leading-6 text-[var(--foreground-soft)]">
                        {item.lod}
                      </td>

                      <td className="px-5 py-5 leading-6 text-[var(--foreground-soft)]">
                        {item.samples}
                      </td>

                      <td className="px-5 py-5 leading-6 text-[var(--foreground-soft)]">
                        {item.capability}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* APPLICATIONS */}
      {/* ===================================================== */}

      <section
        id="applications"
        className="scroll-mt-40 bg-[var(--surface-soft)] px-8 py-24 md:px-16 md:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
              Applications
            </p>

            <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Designed around real decisions, not only analytical signals.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {applications.map((application, index) => (
              <Reveal key={application.title} delay={index * 80}>
                <div className="h-full border border-[var(--border)] bg-[var(--surface)] p-7 transition hover:-translate-y-1 hover:border-[var(--um-blue)] hover:shadow-[var(--shadow-soft)]">
                  <p className="text-xs font-semibold text-[var(--um-gold)]">
                    0{index + 1}
                  </p>

                  <h3 className="mt-5 text-xl font-semibold">
                    {application.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)]">
                    {application.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* SELECTED PUBLICATIONS */}
      {/* ===================================================== */}

      <section
        id="publications"
        className="scroll-mt-40 bg-[var(--background)] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Selected Publications
                </p>

                <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  Publications behind the platforms.
                </h2>

                <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
                  Selected papers directly associated with the pesticide
                  sensing platforms presented above.
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

          <div className="mt-12 divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {selectedPublications.map((paper, index) => (
              <Reveal
                key={paper.title}
                delay={index * 60}
              >
                <article className="grid gap-7 py-9 md:grid-cols-[70px_1fr_auto] md:items-center">
                  <span className="text-sm font-semibold text-[var(--um-gold)]">
                    0{index + 1}
                  </span>

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--um-blue)]">
                      {paper.journal} · {paper.year}
                    </p>

                    <h3 className="mt-3 max-w-4xl text-xl font-semibold leading-8">
                      {paper.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-[var(--foreground-soft)]">
                      {paper.authors}
                    </p>

                    <p className="mt-1 text-xs text-[var(--foreground-muted)]">
                      DOI · {paper.doi}
                    </p>
                  </div>

                  <a
                    href={paper.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit rounded-full border border-[var(--border-strong)] px-5 py-2.5 text-xs font-semibold text-[var(--um-blue)] transition hover:border-[var(--um-blue)] hover:bg-[var(--um-blue)] hover:text-white"
                  >
                    View paper →
                  </a>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={250}>
            <div className="mt-10 flex justify-center">
              <Link
                href="/publications"
                className="rounded-full bg-[var(--um-blue)] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--um-blue-dark)]"
              >
                View all publications →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* FUTURE DIRECTION */}
      {/* ===================================================== */}

      <section className="bg-[var(--um-gold)] px-8 py-24 text-[#2A1710] md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#4F2C1D]/70">
                  Pesticide Sensing at SenSys
                </p>

                <h2 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] md:text-7xl">
                  From residue screening to intelligent food-safety systems.
                </h2>
              </div>

              <div>
                <p className="text-lg leading-8 text-[#4F2C1D]/85">
                  This technology foundation informs next-generation work in
                  multiplexed microfluidics, intelligent optical and
                  electrochemical sensing, portable instrumentation,
                  field-validation workflows, and connected decision-support
                  systems.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/research"
                    className="rounded-full bg-[#2A1710] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#385E9D]"
                  >
                    SenSys Research →
                  </Link>

                  <Link
                    href="/join"
                    className="rounded-full border border-[#2A1710] px-7 py-3.5 text-sm font-semibold transition hover:bg-[#2A1710] hover:text-white"
                  >
                    Join SenSys →
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* EXPLORE NEXT */}
      {/* ===================================================== */}

      <section
        id="explore-next"
        className="scroll-mt-40 bg-[var(--background)] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Explore Next
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  Connected research foundations.
                </h2>
              </div>

              <Link
                href="/research"
                className="text-sm font-semibold text-[var(--um-blue)] transition hover:text-[var(--um-sky)]"
              >
                All research →
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {exploreNext.map((item, index) => (
              <Reveal key={item.title} delay={index * 90}>
                <Link
                  href={item.href}
                  className="group block h-full overflow-hidden border border-[var(--border)] bg-[var(--surface)] transition hover:-translate-y-1 hover:border-[var(--um-blue)] hover:shadow-[var(--shadow-medium)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface-soft)]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-5 transition duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />

                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#17263D]/35 to-transparent" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)]">
                      {item.description}
                    </p>

                    <p className="mt-6 text-xs font-semibold text-[var(--um-blue)]">
                      Explore research →
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}