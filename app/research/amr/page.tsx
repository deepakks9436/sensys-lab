import Image from "next/image";
import Link from "next/link";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Reveal from "../../../components/Reveal";

/* ============================================================
   PLATFORM EVOLUTION
============================================================ */

const programmes = [
  {
    number: "01",
    year: "2023",
    title: "Real-Time Microfluidic Bacterial Detection",
    subtitle: "Culture · Electrochemistry · Microfluidics",
    image: "/research/AMR/Microfluidic-electrochemical-device.jpg",
    description:
      "A miniaturized electrochemical microfluidic platform developed for simultaneous culturing and real-time monitoring of Escherichia coli growth.",
    features: [
      "Screen-printed three-electrode system integrated with a PDMS microfluidic reservoir.",
      "Graphitized mesoporous carbon-modified working electrode for bacterial detection.",
      "Integrated thermal management for incubator-free bacterial culturing.",
      "Continuous electrochemical monitoring of bacterial growth using cyclic voltammetry.",
      "Demonstrated in a real food matrix using mango juice.",
    ],
    metrics: [
      "LoD · 0.35 CFU/mL",
      "LoQ · 1.05 CFU/mL",
      "36 h real-time monitoring",
    ],
    publication:
      "https://www.sciencedirect.com/science/article/pii/S000326702201162X",
  },
  {
    number: "02",
    year: "2023",
    title: "Rapid Electromicrofluidic Antibiotic Susceptibility Testing",
    subtitle: "AST · LIG Heater · Electrochemical Monitoring",
    image: "/research/AMR/Electromicrofluidic-Device.png",
    description:
      "The bacterial-detection platform was extended toward rapid phenotypic antimicrobial susceptibility testing by combining electrochemistry, microfluidics, and localized laser-induced graphene heating.",
    features: [
      "Miniaturized microfluidic reservoirs integrated with screen-printed electrodes.",
      "Laser-induced graphene heater maintained bacterial culture near physiological incubation temperature.",
      "Simultaneous screening of multiple antibiotics against E. coli.",
      "Electrochemical monitoring of antibiotic-induced changes in bacterial growth.",
      "Validated using tap water and synthetic urine samples.",
    ],
    metrics: [
      "AST · within 6 h",
      "4 antibiotics screened",
      "Water + synthetic urine",
    ],
    publication: "https://doi.org/10.3390/s23239314",
  },
  {
    number: "03",
    year: "2023",
    title: "Reproducible Lab-on-Chip Protocol",
    subtitle: "Fabrication · LIG Heating · Bacterial Culture",
    image: "/research/AMR/protocol-lab-on-chip-platform.jpg",
    description:
      "A detailed experimental protocol established the complete fabrication and operating workflow for simultaneous bacterial culture and electrochemical detection on a lab-on-chip platform.",
    features: [
      "Step-by-step screen-printed electrode fabrication.",
      "Fabrication and optimization of a laser-induced graphene heater.",
      "PDMS microfluidic-device fabrication and integration.",
      "Portable electrochemical measurement using cyclic voltammetry and chronoamperometry.",
      "Metabolic activity monitored using microfluidic bioelectrochemical principles.",
    ],
    metrics: [
      "Integrated fabrication protocol",
      "LIG heating · ~37 °C",
      "Portable electrochemistry",
    ],
    publication: "https://doi.org/10.1016/j.xpro.2023.102327",
  },
  {
    number: "04",
    year: "2026",
    title: "Bacteria-on-Chip",
    subtitle: "Multiplexed · Portable · Smartphone-Integrated",
    image: "/research/AMR/Bacteria-on-chip.png",
    description:
      "A fully portable bacteria-on-chip platform combining pathogen-selective electrochemical sensing, on-chip incubation, multiplexed AST, embedded potentiostat electronics, and a smartphone-enabled user interface.",
    features: [
      "Four three-electrode systems integrated on a single ITO-based sensing chip.",
      "Gold nanoparticle-enhanced immunosensor functionalized with anti-E. coli monoclonal antibodies.",
      "Microfluidic reservoirs integrated with an on-chip heating module.",
      "Swappable sensing cartridge interfacing with a multichannel portable potentiostat.",
      "BLE-enabled graphical user interface for control and real-time electrochemical visualization.",
    ],
    metrics: [
      "E. coli detection · 30 min",
      "AST · 5 h",
      "4 antibiotics simultaneously",
    ],
    publication: "https://doi.org/10.1039/D6SD00063K",
  },
];

/* ============================================================
   WORKFLOW
============================================================ */

const workflow = [
  {
    number: "01",
    title: "Sample",
    text: "Clinical, environmental, food, urine, or other bacterial samples enter the diagnostic workflow.",
  },
  {
    number: "02",
    title: "Pathogen Detection",
    text: "Electrochemical or biorecognition interfaces identify bacterial presence and concentration.",
  },
  {
    number: "03",
    title: "On-Chip Culture",
    text: "Integrated heaters and microfluidics provide controlled conditions for bacterial growth.",
  },
  {
    number: "04",
    title: "Antibiotic Exposure",
    text: "Parallel chambers expose bacterial samples to selected antimicrobial agents.",
  },
  {
    number: "05",
    title: "AST",
    text: "Changes in bacterial growth and electrochemical behaviour identify susceptibility or resistance.",
  },
  {
    number: "06",
    title: "Decision Support",
    text: "Portable electronics and connected interfaces translate measurements into actionable results.",
  },
];

/* ============================================================
   CAPABILITIES
============================================================ */

const capabilities = [
  {
    number: "01",
    title: "Microfluidic Culture",
    text: "Miniaturized reservoirs and chambers for controlled bacterial growth and sample handling.",
  },
  {
    number: "02",
    title: "Electrochemical Detection",
    text: "CV, DPV, EIS, chronoamperometry, and electrochemical monitoring of bacterial activity.",
  },
  {
    number: "03",
    title: "Rapid AST",
    text: "Phenotypic assessment of bacterial response to multiple antibiotics in parallel.",
  },
  {
    number: "04",
    title: "Thermal Management",
    text: "LIG and printed microheaters for localized bacterial incubation and closed-loop temperature control.",
  },
  {
    number: "05",
    title: "Biorecognition",
    text: "Nanomaterial-enhanced antibody-functionalized interfaces for pathogen-selective detection.",
  },
  {
    number: "06",
    title: "Portable Instrumentation",
    text: "Embedded multichannel potentiostat electronics integrated into compact diagnostic hardware.",
  },
  {
    number: "07",
    title: "Connected Diagnostics",
    text: "Bluetooth, smartphone applications, GUI interfaces, and real-time electrochemical visualization.",
  },
  {
    number: "08",
    title: "Point-of-Care Translation",
    text: "Integrated sensing, culture, AST, electronics, packaging, and user interfaces within portable systems.",
  },
];

/* ============================================================
   APPLICATIONS
============================================================ */

const applications = [
  {
    title: "Clinical Diagnostics",
    text: "Rapid bacterial identification and phenotypic susceptibility testing closer to the patient.",
  },
  {
    title: "Urinary Tract Infection",
    text: "Portable workflows for pathogen detection and antimicrobial susceptibility analysis in urine-related samples.",
  },
  {
    title: "Food Safety",
    text: "Detection and monitoring of bacterial contamination in food and beverage matrices.",
  },
  {
    title: "Environmental Monitoring",
    text: "Decentralized bacterial assessment in water and other environmental samples.",
  },
];

/* ============================================================
   SELECTED PUBLICATIONS
============================================================ */

const publications = [
  {
    number: "01",
    year: "2023",
    journal: "Analytica Chimica Acta",
    title:
      "Microfluidic electrochemical device for real-time culturing and interference-free detection of Escherichia coli",
    authors:
      "Sonal Fande, Khairunnisa Amreen, D. Sriram and Sanket Goel",
    doi: "10.1016/j.aca.2022.340591",
    href: "https://www.sciencedirect.com/science/article/pii/S000326702201162X",
  },
  {
    number: "02",
    year: "2023",
    journal: "Sensors",
    title:
      "Electromicrofluidic Device for Interference-Free Rapid Antibiotic Susceptibility Testing of Escherichia coli from Real Samples",
    authors:
      "Sonal Fande, Khairunnisa Amreen, D. Sriram, Valentin Mateev and Sanket Goel",
    doi: "10.3390/s23239314",
    href: "https://doi.org/10.3390/s23239314",
  },
  {
    number: "03",
    year: "2023",
    journal: "STAR Protocols",
    title:
      "A protocol to execute a lab-on-chip platform for simultaneous culture and electrochemical detection of bacteria",
    authors:
      "Sonal Fande, Sangam Srikanth, Jayapiriya U S, Khairunnisa Amreen, Satish Kumar Dubey, Arshad Javed and Sanket Goel",
    doi: "10.1016/j.xpro.2023.102327",
    href: "https://doi.org/10.1016/j.xpro.2023.102327",
  },
  {
    number: "04",
    year: "2025",
    journal: "Microchemical Journal",
    title:
      "Antimicrobial resistance detection: Rapid transition to point-of-care platforms",
    authors:
      "Amir Ibrahim Madaje, Sonal Fande, D. Sriram and Sanket Goel",
    doi: "10.1016/j.microc.2025.115471",
    href: "https://doi.org/10.1016/j.microc.2025.115471",
  },
  {
    number: "05",
    year: "2026",
    journal: "Sensors & Diagnostics",
    title:
      "Bacteria-on-chip: a multiplexed point-of-care electrochemical platform for rapid detection of Escherichia coli and antimicrobial susceptibility testing",
    authors: "Sonal Fande, Areon Banerjee and Sanket Goel",
    doi: "10.1039/D6SD00063K",
    href: "https://doi.org/10.1039/D6SD00063K",
  },
];

/* ============================================================
   EXPLORE NEXT
============================================================ */

const exploreNext = [
  {
    title: "Pesticide Detection",
    description:
      "Portable optical, electrochemical, wearable, and microfluidic systems for residue screening.",
    image: "/research/pesticide-detection/pestisafe-2.jpg",
    href: "/research/pesticide-detection",
  },
  {
    title: "Water Quality",
    description:
      "Connected electrochemical and ion-selective technologies for environmental water analysis.",
    image: "/research/water-quality/ion-selective-array.png",
    href: "/research/water-quality",
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

export default function AMRPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />

      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <section className="relative overflow-hidden bg-[#17263D] px-8 py-24 text-white md:px-16 md:py-32">
        <Image
          src="/research/AMR/Antimicrobial-resistance-detection.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-25"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#101C2E] via-[#17263D]/95 to-[#385E9D]/45" />

        <div className="absolute -right-40 -top-32 h-[520px] w-[520px] rounded-full bg-[#00A3E0]/15 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#F2A900]">
              Research Foundation · Intelligent Diagnostics
            </p>

            <h1 className="mt-6 max-w-6xl text-6xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-8xl">
              Pathogen & AMR
              <br />
              Diagnostics.
            </h1>

            <p className="mt-10 max-w-3xl text-lg leading-9 text-white/80 md:text-xl">
              Microfluidic, electrochemical, and connected diagnostic systems
              for rapid bacterial detection, antimicrobial susceptibility
              testing, and point-of-care antimicrobial-resistance assessment.
            </p>

            <div className="mt-9 flex flex-wrap gap-2">
              {[
                "Pathogen Detection",
                "AMR",
                "AST",
                "Microfluidics",
                "Electrochemistry",
                "On-Chip Incubation",
                "Point-of-Care",
                "Connected Diagnostics",
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
                href="#bacteria-on-chip"
                className="rounded-full border border-white/35 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-[#385E9D]"
              >
                Bacteria-on-Chip →
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
              ["Bacteria-on-Chip", "#bacteria-on-chip"],
              ["Workflow", "#workflow"],
              ["Capabilities", "#capabilities"],
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
                  Diagnostic Challenge
                </p>
              </div>

              <div>
                <h2 className="max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                  Faster diagnostics can support better antimicrobial
                  decisions.
                </h2>

                <p className="mt-8 max-w-3xl text-lg leading-9 text-[var(--foreground-soft)]">
                  Conventional phenotypic antimicrobial susceptibility testing
                  is reliable but generally depends on bacterial culture and
                  extended turnaround times. Molecular methods can be faster
                  but may require specialized infrastructure and trained
                  personnel.
                </p>

                <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--foreground-muted)]">
                  Microfluidic systems offer a route toward integrating
                  bacterial detection, controlled culture, antimicrobial
                  exposure, electrochemical monitoring, and interpretation into
                  compact sample-to-answer workflows.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] md:grid-cols-4">
            {[
              ["30 min", "Pathogen Detection"],
              ["5 h", "Integrated AST"],
              ["04", "Parallel Antibiotics"],
              ["POC", "Portable Architecture"],
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

          <Reveal delay={220}>
            <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="relative aspect-[4/3] overflow-hidden border border-[var(--border)] bg-[var(--surface-soft)]">
                <Image
                  src="/research/AMR/Antimicrobial-resistance-detection.jpg"
                  alt="Antimicrobial resistance diagnostic landscape"
                  fill
                  className="object-contain p-6"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--um-blue)]">
                  System Goal
                </p>

                <h3 className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
                  Bring culture, sensing, AST, and interpretation into one
                  device.
                </h3>

                <p className="mt-6 text-base leading-8 text-[var(--foreground-soft)]">
                  The technology evolution progressively combines more of the
                  diagnostic chain within the same engineered architecture,
                  reducing dependence on separate laboratory instruments and
                  workflows.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* PLATFORM EVOLUTION */}
      {/* ===================================================== */}

      <section
        id="platforms"
        className="scroll-mt-40 bg-[var(--surface-soft)] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
              Technology Evolution
            </p>

            <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              From bacterial growth monitoring to multiplexed point-of-care
              AST.
            </h2>

            <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
              The programme progresses through bacterial culture and detection,
              rapid antibiotic susceptibility testing, standardized
              lab-on-chip engineering, and ultimately a portable multiplexed
              diagnostic system.
            </p>
          </Reveal>

          {/* EVOLUTION STRIP */}

          <div className="mt-14 grid gap-3 lg:grid-cols-4">
            {[
              ["01", "Detection", "Real-time bacterial monitoring"],
              ["02", "Rapid AST", "Antibiotic response on-chip"],
              ["03", "Protocol", "Reproducible system engineering"],
              ["04", "Bacteria-on-Chip", "Integrated point-of-care platform"],
            ].map(([number, title, text], index) => (
              <Reveal key={number} delay={index * 70}>
                <div className="relative h-full border border-[var(--border)] bg-[var(--surface)] p-6">
                  <span className="text-xs font-semibold text-[var(--um-gold)]">
                    {number}
                  </span>

                  <h3 className="mt-4 text-lg font-semibold">
                    {title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[var(--foreground-soft)]">
                    {text}
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

          {/* FULL PLATFORM CARDS */}

          <div className="mt-16 space-y-8">
            {programmes.map((programme, index) => (
              <Reveal key={programme.number} delay={index * 70}>
                <article
                  className="grid overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-soft)] lg:grid-cols-2"
                >
                  <div
                    className={`relative min-h-[460px] overflow-hidden bg-[var(--surface-muted)] ${
                      index % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={programme.image}
                      alt={programme.title}
                      fill
                      className="object-contain p-6 transition duration-700 hover:scale-[1.025]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />

                    <div className="absolute left-5 top-5 rounded-full bg-[var(--section-blue)] px-4 py-2 text-xs font-semibold text-white">
                      {programme.year}
                    </div>

                    <span className="absolute right-5 top-5 text-6xl font-semibold text-[var(--um-blue)]/12">
                      {programme.number}
                    </span>
                  </div>

                  <div
                    className={`flex flex-col justify-center p-8 md:p-10 lg:p-12 ${
                      index % 2 === 1 ? "lg:order-1" : ""
                    }`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--um-blue)]">
                      Platform {programme.number}
                    </p>

                    <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                      {programme.title}
                    </h3>

                    <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--um-gold)]">
                      {programme.subtitle}
                    </p>

                    <p className="mt-6 text-base leading-8 text-[var(--foreground-soft)]">
                      {programme.description}
                    </p>

                    <ul className="mt-7 space-y-3">
                      {programme.features.map((feature) => (
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
                      {programme.metrics.map((metric) => (
                        <span
                          key={metric}
                          className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-2 text-xs font-medium"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>

                    <a
                      href={programme.publication}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 w-fit rounded-full bg-[var(--um-blue)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--um-blue-dark)]"
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
      {/* BACTERIA-ON-CHIP */}
      {/* ===================================================== */}

      <section
        id="bacteria-on-chip"
        className="scroll-mt-40 bg-[var(--background)] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Integrated Platform
                </p>

                <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                  Bacteria-on-Chip integrates the diagnostic chain.
                </h2>

                <p className="mt-7 text-base leading-8 text-[var(--foreground-soft)]">
                  The portable system integrates pathogen-selective
                  immunosensing, multiplexed electrochemistry, microfluidic
                  reservoirs, thermal incubation, multichannel potentiostat
                  electronics, a swappable sensing cartridge, and a connected
                  graphical user interface.
                </p>

                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  {[
                    ["30 min", "Pathogen detection"],
                    ["5 h", "Antibiotic susceptibility testing"],
                    ["4", "Antibiotics tested simultaneously"],
                    ["BLE", "Connected user interface"],
                  ].map(([value, label]) => (
                    <div
                      key={label}
                      className="border border-[var(--border)] bg-[var(--surface)] p-6"
                    >
                      <p className="text-3xl font-semibold text-[var(--um-blue)]">
                        {value}
                      </p>

                      <p className="mt-2 text-sm text-[var(--foreground-soft)]">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                <a
                  href="https://doi.org/10.1039/D6SD00063K"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex rounded-full bg-[var(--um-blue)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--um-blue-dark)]"
                >
                  Read Bacteria-on-Chip paper →
                </a>
              </div>

              <div className="relative min-h-[560px] overflow-hidden border border-[var(--border)] bg-[var(--surface-soft)]">
                <Image
                  src="/research/AMR/Bacteria-on-chip.png"
                  alt="Portable Bacteria-on-Chip point-of-care diagnostic platform"
                  fill
                  className="object-contain p-6"
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* WORKFLOW */}
      {/* ===================================================== */}

      <section
        id="workflow"
        className="scroll-mt-40 bg-[var(--surface-soft)] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
              Diagnostic Workflow
            </p>

            <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Sample to susceptibility result.
            </h2>

            <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
              The workflow connects bacterial detection with controlled
              incubation, antibiotic exposure, electrochemical monitoring, and
              portable interpretation.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
            {workflow.map((step, index) => (
              <Reveal key={step.number} delay={index * 60}>
                <div className="relative h-full border border-[var(--border)] bg-[var(--surface)] p-6">
                  <span className="text-xs font-semibold text-[var(--um-gold)]">
                    {step.number}
                  </span>

                  <h3 className="mt-8 text-lg font-semibold">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-xs leading-6 text-[var(--foreground-soft)]">
                    {step.text}
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

          <Reveal delay={300}>
            <div className="mt-14 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="relative min-h-[500px] overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
                <Image
                  src="/research/AMR/protocol-lab-on-chip-platform.jpg"
                  alt="Lab-on-chip bacterial detection protocol"
                  fill
                  className="object-contain p-6"
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--um-blue)]">
                  Platform Engineering
                </p>

                <h3 className="mt-5 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
                  Diagnostics built as integrated engineered systems.
                </h3>

                <p className="mt-7 text-base leading-8 text-[var(--foreground-soft)]">
                  The underlying platform combines electrode fabrication,
                  nanomaterial modification, laser-induced graphene heating,
                  microfluidic fabrication, bacterial culture, and
                  electrochemical measurement.
                </p>

                <p className="mt-5 text-base leading-8 text-[var(--foreground-muted)]">
                  This modular architecture allows individual components to
                  evolve while preserving a common lab-on-chip framework for
                  pathogen detection and antimicrobial susceptibility testing.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* CAPABILITIES */}
      {/* ===================================================== */}

      <section
        id="capabilities"
        className="scroll-mt-40 bg-[var(--section-blue)] px-8 py-24 text-white md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-gold)]">
                  Research Capabilities
                </p>
              </div>

              <div>
                <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  An end-to-end AMR diagnostic technology stack.
                </h2>

                <p className="mt-7 max-w-3xl text-base leading-8 text-white/75">
                  Individual technologies are designed to work together as part
                  of an integrated diagnostic system rather than as isolated
                  sensing components.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden bg-white/15 md:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((item, index) => (
              <Reveal key={item.title} delay={index * 50}>
                <div className="h-full bg-[var(--section-blue)] p-7">
                  <p className="text-xs font-semibold text-[var(--um-gold)]">
                    {item.number}
                  </p>

                  <h3 className="mt-5 text-lg font-semibold">
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
      {/* APPLICATIONS */}
      {/* ===================================================== */}

      <section
        id="applications"
        className="scroll-mt-40 bg-[var(--background)] px-8 py-24 md:px-16 md:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
              Applications
            </p>

            <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Rapid bacterial diagnostics across multiple settings.
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
                  See the platform in operation.
                </h2>

                <p className="mt-7 text-base leading-8 text-white/70">
                  The demonstration highlights the integration of microfluidics,
                  bacterial culture, electrochemical detection, thermal
                  management, and portable instrumentation.
                </p>

                <a
                  href="https://www.youtube.com/watch?v=lIjwN9cSS4s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex rounded-full bg-[#F2A900] px-6 py-3 text-sm font-semibold text-[#2A1710] transition hover:bg-white"
                >
                  Watch on YouTube →
                </a>
              </div>

              <div className="aspect-video overflow-hidden border border-white/15 bg-black">
                <iframe
                  src="https://www.youtube.com/embed/lIjwN9cSS4s"
                  title="AMR and bacteria-on-chip research demonstration"
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
        className="scroll-mt-40 bg-[var(--surface-soft)] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Selected Publications
                </p>

                <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  Research underpinning the AMR diagnostic programme.
                </h2>
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
                  Intelligent Diagnostics at SenSys
                </p>

                <h2 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] md:text-7xl">
                  Toward rapid sample-to-answer AMR diagnostics.
                </h2>
              </div>

              <div>
                <p className="text-lg leading-8 text-[#4F2C1D]/85">
                  This technology foundation supports next-generation pathogen
                  and antimicrobial-resistance platforms integrating
                  microfluidic sample handling, multiplexed biosensing,
                  controlled incubation, rapid AST, portable instrumentation,
                  connected interfaces, and intelligent data interpretation.
                </p>

                <p className="mt-5 text-base leading-7 text-[#4F2C1D]/80">
                  The longer-term direction is to move from individual sensing
                  functions toward integrated point-of-care systems capable of
                  supporting timely and evidence-based antimicrobial decisions.
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