import Image from "next/image";
import Link from "next/link";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Reveal from "../../../components/Reveal";

/* ============================================================
   TECHNOLOGY PORTFOLIO
============================================================ */

const technologies = [
  {
    number: "01",
    title: "Multiplexed Heavy-Metal Sensing",
    subtitle: "Cd²⁺ · Pb²⁺ · Cu²⁺ · Hg²⁺",
    category: "Electrochemistry · AI · IoT",
    image: "/research/water-quality/heavy-metal-sensing.jpg",
    description:
      "A multiplexed electrochemical sensing platform based on gold-nanoparticle-modified carbon-thread electrodes for simultaneous analysis of toxic heavy-metal ions.",
    features: [
      "Carbon-thread sensing architecture modified with gold nanoparticles.",
      "Detection of Cd²⁺, Pb²⁺, Cu²⁺, and Hg²⁺.",
      "Multiplexed electrochemical measurement strategy.",
      "CNN-assisted interpretation for intelligent classification.",
      "IoT-enabled architecture for connected water-quality monitoring.",
    ],
    metrics: [
      "4 heavy metals",
      "Multiplexed analysis",
      "CNN assisted",
    ],
    publication: "https://doi.org/10.1038/s41545-025-00441-x",
  },
  {
    number: "02",
    title: "Temperature-Compensated Ion-Selective Array",
    subtitle: "Nitrate · Ammonium · Chloride",
    category: "Potentiometry · IoT · Multi-Parameter Sensing",
    image: "/research/water-quality/ion-selective-array.png",
    description:
      "A portable ion-selective array designed for rapid measurement of multiple water-quality ions while accounting for temperature-dependent sensor response.",
    features: [
      "Simultaneous measurement of nitrate, ammonium, and chloride.",
      "Temperature compensation for improved field reliability.",
      "Portable multi-channel ion-selective measurement system.",
      "Approximately 30-second analytical response.",
      "Wi-Fi connectivity and Android-based user interface.",
    ],
    metrics: [
      "3-ion array",
      "~30 s response",
      "Temperature compensated",
    ],
    publication: "https://doi.org/10.1109/TIM.2026.3677997",
  },
  {
    number: "03",
    title: "Flexible Laser-Induced Graphene Fluoride Sensor",
    subtitle: "Fluoride Detection",
    category: "LIG · Functional Polymer · Flexible Sensor",
    image: "/research/water-quality/fluoride-lig-sensor.jpg",
    description:
      "A flexible fluoride-sensing platform using laser-induced graphene functionalized with poly(3-aminophenylboronic acid) for selective electrochemical ion detection.",
    features: [
      "Laser-induced graphene electrode architecture.",
      "Poly(3-aminophenylboronic acid) functionalization.",
      "Flexible and low-cost sensing format.",
      "Selective fluoride-ion analysis.",
      "Demonstrated using real water samples.",
    ],
    metrics: [
      "Flexible platform",
      "Selective F⁻ sensing",
      "Real-water validation",
    ],
    publication: "https://doi.org/10.1109/JSEN.2023.3285664",
  },
  {
    number: "04",
    title: "PANI-Functionalized Carbon-Cloth pH Sensor",
    subtitle: "pH 2–12",
    category: "Flexible Electrochemistry · pH Monitoring",
    image: "/research/water-quality/ph-carbon-cloth-sensor.gif",
    description:
      "A flexible carbon-cloth electrode functionalized with polyaniline for broad-range potentiometric pH measurement in portable water-quality applications.",
    features: [
      "Flexible carbon-cloth sensing substrate.",
      "Polyaniline-based pH-responsive interface.",
      "Wide operating range from approximately pH 2 to 12.",
      "Compatible with low-cost portable readout systems.",
      "Suitable for distributed water-monitoring workflows.",
    ],
    metrics: [
      "pH 2–12",
      "Flexible electrode",
      "Portable readout",
    ],
    publication: "https://doi.org/10.1109/TNB.2022.3188605",
  },
  {
    number: "05",
    title: "MWCNT Carbon-Thread Ammonia Sensor",
    subtitle: "Ammonia Monitoring",
    category: "Nanocarbon · Electrochemical Sensing",
    image: "/research/water-quality/ammonia-sensor.gif",
    description:
      "A carbon-thread-based electrochemical platform enhanced with multi-walled carbon nanotubes for portable ammonia analysis in water-quality monitoring.",
    features: [
      "Carbon-thread electrode architecture.",
      "MWCNT-based surface enhancement.",
      "Electrochemical ammonia detection.",
      "Compact and low-cost sensing format.",
      "Designed toward field-deployable environmental monitoring.",
    ],
    metrics: [
      "MWCNT enhanced",
      "Carbon thread",
      "Field oriented",
    ],
    publication: "https://doi.org/10.1016/j.envres.2022.115192",
  },
  {
    number: "06",
    title: "AI-Enabled Water Quality Index Platform",
    subtitle: "Multi-Parameter Water Assessment",
    category: "IoT · Machine Learning · Decision Support",
    image: "/research/water-quality/ai-water-quality-index.gif",
    description:
      "An IoT-connected monitoring system combining conventional water-quality parameters with machine-learning-assisted interpretation and Water Quality Index estimation.",
    features: [
      "Measures pH, dissolved oxygen, electrical conductivity, TDS, turbidity, and temperature.",
      "Multi-parameter acquisition through embedded electronics.",
      "IoT-enabled remote monitoring.",
      "Machine-learning-supported interpretation.",
      "Water Quality Index estimation for simplified decision support.",
    ],
    metrics: [
      "Multi-parameter",
      "IoT connected",
      "ML + WQI",
    ],
    publication: "https://doi.org/10.1109/ICST59744.2023.10460817",
  },
];

/* ============================================================
   WORKFLOW
============================================================ */

const workflow = [
  {
    number: "01",
    title: "Sample",
    text: "Water is collected from the target source or introduced directly to a field-deployable sensing platform.",
  },
  {
    number: "02",
    title: "Selective Sensing",
    text: "Ion-selective, electrochemical, resistive, or multi-parameter sensors generate analyte-specific responses.",
  },
  {
    number: "03",
    title: "Signal Conditioning",
    text: "Analog front-end electronics stabilize, amplify, filter, and convert raw sensor responses.",
  },
  {
    number: "04",
    title: "Embedded Processing",
    text: "Microcontrollers or portable instruments digitize and process sensor data in real time.",
  },
  {
    number: "05",
    title: "AI / ML",
    text: "Data-driven methods support compensation, classification, prediction, and multi-analyte interpretation.",
  },
  {
    number: "06",
    title: "Connected Output",
    text: "Results are delivered through mobile devices, Wi-Fi, IoT platforms, or field decision-support interfaces.",
  },
];

/* ============================================================
   TARGET SPACE
============================================================ */

const targets = [
  {
    group: "Toxic Metals",
    examples: "Cd²⁺ · Pb²⁺ · Cu²⁺ · Hg²⁺",
  },
  {
    group: "Nutrient & Ionic Species",
    examples: "NO₃⁻ · NH₄⁺ · Cl⁻ · F⁻",
  },
  {
    group: "Chemical Indicators",
    examples: "pH · Ammonia",
  },
  {
    group: "Physical Parameters",
    examples: "EC · TDS · Turbidity · Temperature",
  },
  {
    group: "Integrated Indicators",
    examples: "DO · Multi-Parameter WQI",
  },
];

/* ============================================================
   INTELLIGENCE LAYER
============================================================ */

const intelligence = [
  {
    number: "01",
    title: "Temperature Compensation",
    text: "Correct environmentally induced shifts in sensor response for improved field reliability.",
  },
  {
    number: "02",
    title: "Multiplexed Analysis",
    text: "Interpret multiple contaminants or water-quality parameters within a common platform.",
  },
  {
    number: "03",
    title: "Machine Learning",
    text: "Support classification, prediction, pattern recognition, and complex response interpretation.",
  },
  {
    number: "04",
    title: "IoT Connectivity",
    text: "Enable distributed monitoring, remote access, and longitudinal environmental data collection.",
  },
];

/* ============================================================
   APPLICATIONS
============================================================ */

const applications = [
  {
    title: "Drinking Water",
    text: "Rapid decentralized screening of ions, toxic contaminants, and general water-quality indicators.",
  },
  {
    title: "Environmental Monitoring",
    text: "Distributed sensing for lakes, rivers, reservoirs, and other environmental water sources.",
  },
  {
    title: "Agriculture",
    text: "Water-quality assessment for irrigation, nutrient management, and precision-agriculture workflows.",
  },
  {
    title: "Industrial Water",
    text: "Portable monitoring for process water, discharge streams, and quality-control applications.",
  },
];

/* ============================================================
   SELECTED PUBLICATIONS
============================================================ */

const publications = [
  {
    number: "01",
    title:
      "Intelligent multiplexed heavy-metal sensing using electrochemical interfaces and data-driven analysis",
    journal: "npj Clean Water",
    year: "2025",
    href: "https://doi.org/10.1038/s41545-025-00441-x",
    doi: "10.1038/s41545-025-00441-x",
  },
  {
    number: "02",
    title:
      "Temperature-Compensated, IoT-Enabled Portable Ion-Selective Array Device for Multi-Parameter Measurements in Water Samples",
    journal: "IEEE Transactions on Instrumentation and Measurement",
    year: "2026",
    href: "https://doi.org/10.1109/TIM.2026.3677997",
    doi: "10.1109/TIM.2026.3677997",
  },
  {
    number: "03",
    title:
      "Flexible Laser-Induced Graphene-Based Electrochemical Sensor for Selective Fluoride Detection",
    journal: "IEEE Sensors Journal",
    year: "2023",
    href: "https://doi.org/10.1109/JSEN.2023.3285664",
    doi: "10.1109/JSEN.2023.3285664",
  },
  {
    number: "04",
    title:
      "Flexible electrochemical sensing platform for water-quality monitoring",
    journal: "IEEE Transactions on NanoBioscience",
    year: "2022",
    href: "https://doi.org/10.1109/TNB.2022.3188605",
    doi: "10.1109/TNB.2022.3188605",
  },
  {
    number: "05",
    title:
      "Carbon-thread and nanocarbon-enabled sensing for environmental water monitoring",
    journal: "Environmental Research",
    year: "2022",
    href: "https://doi.org/10.1016/j.envres.2022.115192",
    doi: "10.1016/j.envres.2022.115192",
  },
  {
    number: "06",
    title:
      "IoT and machine-learning-assisted multi-parameter water-quality monitoring",
    journal: "International Conference on Smart Technologies",
    year: "2023",
    href: "https://doi.org/10.1109/ICST59744.2023.10460817",
    doi: "10.1109/ICST59744.2023.10460817",
  },
];

/* ============================================================
   EXPLORE NEXT
============================================================ */

const exploreNext = [
  {
    title: "Pesticide Detection",
    description:
      "Portable optical, electrochemical, wearable, and microfluidic technologies for residue screening.",
    image: "/research/pesticide-detection/pestisafe-2.jpg",
    href: "/research/pesticide-detection",
  },
  {
    title: "Pathogen & AMR",
    description:
      "Microfluidic and electrochemical systems for bacteria detection and antimicrobial-resistance analysis.",
    image: "/research/AMR/Bacteria-on-chip.png",
    href: "/research/amr",
  },
  {
    title: "Graphene Technologies",
    description:
      "Laser-induced graphene, flexible electronics, sensing, and energy microsystems.",
    image: "/research/graphene/graphene-hero.jpg",
    href: "/research/graphene",
  },
];

/* ============================================================
   PAGE
============================================================ */

export default function WaterQualityPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />

      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <section className="relative overflow-hidden bg-[#17263D] px-8 py-24 text-white md:px-16 md:py-32">
        <Image
          src="/research/water-quality/water-quality-hero.jpeg"
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
              Research Foundation · Environmental Intelligence
            </p>

            <h1 className="mt-6 max-w-6xl text-6xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-8xl">
              Water Quality
              <br />
              Technologies.
            </h1>

            <p className="mt-10 max-w-3xl text-lg leading-9 text-white/80 md:text-xl">
              Portable, flexible, multiplexed, and connected sensing systems
              for chemical ions, toxic metals, environmental parameters, and
              intelligent water-quality assessment.
            </p>

            <div className="mt-9 flex flex-wrap gap-2">
              {[
                "Heavy Metals",
                "Ion-Selective Sensors",
                "Laser-Induced Graphene",
                "Flexible Sensors",
                "IoT",
                "Machine Learning",
                "Water Quality Index",
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
                href="#technologies"
                className="rounded-full bg-[#F2A900] px-7 py-3.5 text-sm font-semibold text-[#2A1710] transition hover:bg-white"
              >
                Explore technologies →
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
      {/* STICKY IN-PAGE NAV */}
      {/* ===================================================== */}

      <nav className="sticky top-[72px] z-30 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl overflow-x-auto px-8 md:px-16">
          <div className="flex min-w-max items-center gap-8 py-4">
            {[
              ["Overview", "#overview"],
              ["Technologies", "#technologies"],
              ["Workflow", "#workflow"],
              ["Intelligence", "#intelligence"],
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
                  From individual ions to intelligent water assessment.
                </h2>

                <p className="mt-8 max-w-3xl text-lg leading-9 text-[var(--foreground-soft)]">
                  The water-quality portfolio combines electrochemical and
                  ion-selective sensing, functional nanomaterials, flexible
                  substrates, embedded instrumentation, IoT connectivity, and
                  machine-learning-assisted interpretation.
                </p>

                <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--foreground-muted)]">
                  Different sensor interfaces address different classes of
                  contaminants and water-quality indicators, while common
                  instrumentation and data architectures enable portable and
                  connected analysis.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] md:grid-cols-4">
            {[
              ["06", "Technology Platforms"],
              ["15+", "Measured Parameters"],
              ["Flexible + Portable", "Device Architectures"],
              ["IoT + AI", "Connected Intelligence"],
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

          <Reveal delay={200}>
            <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="relative aspect-[4/3] overflow-hidden border border-[var(--border)] bg-[var(--surface-soft)]">
                <Image
                  src="/research/water-quality/ion-selective-array.png"
                  alt="Portable ion-selective water-quality sensing platform"
                  fill
                  className="object-contain p-6"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--um-blue)]">
                  Measurement Space
                </p>

                <h3 className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
                  Multiple classes of water-quality information.
                </h3>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {targets.map((target) => (
                    <div
                      key={target.group}
                      className="border border-[var(--border)] bg-[var(--surface)] p-5"
                    >
                      <h4 className="text-sm font-semibold">
                        {target.group}
                      </h4>

                      <p className="mt-3 text-sm leading-6 text-[var(--um-blue)]">
                        {target.examples}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* TECHNOLOGIES */}
      {/* ===================================================== */}

      <section
        id="technologies"
        className="scroll-mt-40 bg-[var(--surface-soft)] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
              Technology Portfolio
            </p>

            <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Six approaches to decentralized water analysis.
            </h2>

            <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
              The portfolio ranges from selective electrochemical interfaces to
              multi-parameter intelligent monitoring systems, combining
              materials, instrumentation, connectivity, and analytics according
              to the target application.
            </p>
          </Reveal>

          <div className="mt-16 space-y-8">
            {technologies.map((item, index) => (
              <Reveal key={item.title} delay={index * 60}>
                <article className="grid overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-soft)] lg:grid-cols-2">
                  <div
                    className={`relative min-h-[430px] overflow-hidden bg-[var(--surface-muted)] ${
                      index % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-6 transition duration-700 hover:scale-[1.025]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />

                    <span className="absolute right-5 top-5 text-6xl font-semibold text-[var(--um-blue)]/12">
                      {item.number}
                    </span>
                  </div>

                  <div
                    className={`flex flex-col justify-center p-8 md:p-10 lg:p-12 ${
                      index % 2 === 1 ? "lg:order-1" : ""
                    }`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--um-blue)]">
                      Technology {item.number}
                    </p>

                    <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--foreground-muted)]">
                      {item.subtitle}
                    </p>

                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--um-gold)]">
                      {item.category}
                    </p>

                    <p className="mt-6 text-base leading-8 text-[var(--foreground-soft)]">
                      {item.description}
                    </p>

                    <ul className="mt-7 space-y-3">
                      {item.features.map((feature) => (
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
                      {item.metrics.map((metric) => (
                        <span
                          key={metric}
                          className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-2 text-xs font-medium"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>

                    <a
                      href={item.publication}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 w-fit rounded-full bg-[var(--um-blue)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--um-blue-dark)]"
                    >
                      View publication →
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* WORKFLOW */}
      {/* ===================================================== */}

      <section
        id="workflow"
        className="scroll-mt-40 bg-[var(--background)] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
              Integrated Workflow
            </p>

            <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Sense. Process. Interpret. Connect.
            </h2>

            <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
              A common systems philosophy links the individual technologies:
              translate chemistry into measurable signals, condition and
              process those signals locally, apply intelligent analysis where
              useful, and deliver actionable results through connected
              interfaces.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
            {workflow.map((item, index) => (
              <Reveal key={item.number} delay={index * 60}>
                <div className="relative h-full border border-[var(--border)] bg-[var(--surface)] p-6">
                  <span className="text-xs font-semibold text-[var(--um-gold)]">
                    {item.number}
                  </span>

                  <h3 className="mt-8 text-lg font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-xs leading-6 text-[var(--foreground-soft)]">
                    {item.text}
                  </p>

                  {index < workflow.length - 1 && (
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
      {/* INTELLIGENCE */}
      {/* ===================================================== */}

      <section
        id="intelligence"
        className="scroll-mt-40 bg-[var(--section-blue)] px-8 py-24 text-white md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-gold)]">
                  Beyond Measurement
                </p>
              </div>

              <div>
                <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  From sensor readings to environmental intelligence.
                </h2>

                <p className="mt-7 max-w-3xl text-base leading-8 text-white/75">
                  Connected water-quality systems combine multiple sensing
                  channels with compensation algorithms, machine learning, and
                  Water Quality Index calculations to move beyond isolated
                  measurements toward actionable environmental information.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <Reveal direction="left">
              <div className="relative min-h-[500px] overflow-hidden border border-white/15 bg-white/5">
                <Image
                  src="/research/water-quality/ai-water-quality-index.gif"
                  alt="AI-enabled intelligent water-quality monitoring platform"
                  fill
                  className="object-contain p-6"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {intelligence.map((item, index) => (
                <Reveal key={item.title} delay={index * 70}>
                  <div className="h-full border border-white/15 bg-white/5 p-6">
                    <p className="text-xs font-semibold text-[var(--um-gold)]">
                      {item.number}
                    </p>

                    <h3 className="mt-5 text-lg font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-white/70">
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
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
              Water sensing across environmental and operational contexts.
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
      {/* VIDEO */}
      {/* ===================================================== */}

      <section className="bg-[#17263D] px-8 py-24 text-white md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#F2A900]">
                  Research Demonstration
                </p>

                <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                  See the water-quality platform in action.
                </h2>

                <p className="mt-7 max-w-xl text-base leading-8 text-white/70">
                  The demonstration highlights the integration of sensing,
                  portable instrumentation, embedded electronics, user
                  interaction, and connected environmental monitoring.
                </p>

                <a
                  href="https://www.youtube.com/watch?v=guJOyU2vZK4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex rounded-full bg-[#F2A900] px-6 py-3 text-sm font-semibold text-[#2A1710] transition hover:bg-white"
                >
                  Watch on YouTube →
                </a>
              </div>

              <div className="aspect-video overflow-hidden border border-white/15 bg-black">
                <iframe
                  src="https://www.youtube.com/embed/guJOyU2vZK4"
                  title="Water quality sensing research demonstration"
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </Reveal>
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
                  Research underpinning the water-quality portfolio.
                </h2>

                <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
                  Selected papers directly associated with the sensing
                  technologies and analytical systems presented above.
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

          <div className="mt-14 divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {publications.map((paper, index) => (
              <Reveal key={paper.number} delay={index * 60}>
                <article className="grid gap-7 py-9 md:grid-cols-[70px_1fr_auto] md:items-center">
                  <span className="text-sm font-semibold text-[var(--um-gold)]">
                    {paper.number}
                  </span>

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--um-blue)]">
                      {paper.journal} · {paper.year}
                    </p>

                    <h3 className="mt-3 max-w-4xl text-xl font-semibold leading-8">
                      {paper.title}
                    </h3>

                    <p className="mt-2 text-xs text-[var(--foreground-muted)]">
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

          <Reveal delay={300}>
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
                  Water Intelligence at SenSys
                </p>

                <h2 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] md:text-7xl">
                  Toward integrated multi-analyte water-quality systems.
                </h2>
              </div>

              <div>
                <p className="text-lg leading-8 text-[#4F2C1D]/85">
                  This technology foundation supports future water-quality
                  platforms integrating multi-analyte sensing, microfluidics,
                  advanced materials, portable instrumentation, intelligent
                  analytics, and field-deployable architectures.
                </p>

                <p className="mt-5 text-base leading-7 text-[#4F2C1D]/80">
                  Water sensing can also connect with Soil-on-Chip,
                  precision-agriculture, environmental-monitoring, and
                  advanced manufacturing directions across the broader SenSys
                  research programme.
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