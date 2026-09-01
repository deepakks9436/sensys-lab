import Image from "next/image";
import Link from "next/link";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";

/* ============================================================
   FUTURE SENSYS RESEARCH THRUSTS
============================================================ */

const sensysAreas = [
  {
    number: "01",
    id: "intelligent-microsystems",
    title: "Intelligent Microsystems",
    tagline: "Microdevices · Microfluidics · Integrated sensing",
    description:
      "Engineering miniaturized platforms that combine microfluidics, sensing interfaces, functional materials, electronics, embedded intelligence, and advanced fabrication into complete sensing systems.",
    image: "/research/thrusts/intelligent-microsystems.png",
    imageLabel: "Integrated microfluidic sensing platform",
    topics: [
      "Microfluidics",
      "Lab-on-Chip",
      "MEMS",
      "Sensor Functionalization",
      "Advanced Fabrication",
      "Portable Instrumentation",
      "Embedded Systems",
      "Intelligent Devices",
    ],
  },
  {
    number: "02",
    id: "biointegrated-systems",
    title: "Biointegrated Systems",
    tagline: "Wearables · Implantables · Human-integrated technologies",
    description:
      "Developing sensing, monitoring, and energy technologies that interface naturally with the human body through flexible, textile, wearable, implantable, and biocompatible systems.",
    image: "/research/thrusts/biointegrated-systems.png",
    imageLabel: "Human-centred connected diagnostic architecture",
    topics: [
      "Wearable Sensors",
      "Implantable Devices",
      "Textile Electronics",
      "Flexible Electronics",
      "Biomedical Signals",
      "Bioenergy",
      "Biocompatible Materials",
      "Continuous Monitoring",
    ],
  },
  {
    number: "03",
    id: "intelligent-diagnostics",
    title: "Intelligent Diagnostics",
    tagline: "Point-of-care · Biosensors · Connected diagnostics",
    description:
      "Creating integrated diagnostic platforms that combine electrochemical and optical sensing, microfluidics, embedded instrumentation, wireless connectivity, and intelligent data analysis.",
    image: "/research/thrusts/intelligent-diagnostics.jpg",
    imageLabel: "Portable biosensing and intelligent diagnostic workflow",
    topics: [
      "Point-of-Care Diagnostics",
      "Electrochemical Biosensors",
      "Optical Detection",
      "Rapid Pathogen Detection",
      "Antimicrobial Resistance",
      "Portable Instrumentation",
      "AI-Enabled Analysis",
      "Connected Diagnostics",
    ],
  },
  {
    number: "04",
    id: "agri-environment",
    title: "Agri & Environmental Intelligence",
    tagline: "Food · Water · Soil · Field sensing",
    description:
      "Building field-ready sensing systems for food safety, pesticide monitoring, soil analysis, water quality, precision agriculture, and environmental decision-making.",
    image: "/research/thrusts/agri-environmental-intelligence.jpg",
    imageLabel: "Portable intelligent pesticide-analysis platform",
    topics: [
      "Pesticide Detection",
      "Water Quality",
      "Soil-on-Chip",
      "Soil Nutrients",
      "Food Safety",
      "Precision Agriculture",
      "Environmental Monitoring",
      "4D-Printed Architectures",
    ],
  },
];

/* ============================================================
   ESTABLISHED RESEARCH FOUNDATIONS
============================================================ */

const researchFoundations = [
  {
    number: "01",
    title: "Graphene Technologies",
    category: "Advanced Materials",
    description:
      "A materials-to-device portfolio spanning laser-induced graphene, reduced graphene oxide, functional composites, flexible electronics, biosensors, microfluidics, heaters, bioenergy, and energy storage.",
    image: "/research/graphene/graphene-hero.jpg",
    href: "/research/graphene",
    tags: [
      "Laser-Induced Graphene",
      "Flexible Electronics",
      "Microfluidics",
      "Energy",
    ],
  },
  {
    number: "02",
    title: "Pesticide Detection",
    category: "Food Safety & Agriculture",
    description:
      "Portable pesticide-sensing technologies spanning microfluidic colourimetry, multimodal optical detection, chemiluminescence, wearable electrochemistry, and intelligent data interpretation.",
    image: "/research/pesticide-detection/pestisafe-2.jpg",
    href: "/research/pesticide-detection",
    tags: [
      "Food Safety",
      "Optical Sensing",
      "Electrochemistry",
      "Wearables",
    ],
  },
  {
    number: "03",
    title: "Water Quality Technologies",
    category: "Environmental Intelligence",
    description:
      "Portable and connected systems for toxic metals, ion-selective sensing, fluoride, ammonia, pH, multi-parameter monitoring, IoT connectivity, and machine-learning-assisted interpretation.",
    image: "/research/water-quality/ion-selective-array.png",
    href: "/research/water-quality",
    tags: [
      "Heavy Metals",
      "Ion Sensors",
      "Flexible Sensors",
      "IoT + AI",
    ],
  },
  {
    number: "04",
    title: "Pathogen & AMR Diagnostics",
    category: "Intelligent Diagnostics",
    description:
      "Integrated microfluidic and electrochemical technologies for bacterial detection, controlled culture, antimicrobial susceptibility testing, thermal management, and portable point-of-care diagnostics.",
    image: "/research/AMR/Bacteria-on-chip.png",
    href: "/research/amr",
    tags: [
      "Pathogen Detection",
      "AMR",
      "Rapid AST",
      "Point-of-Care",
    ],
  },
];

/* ============================================================
   RESEARCH ECOSYSTEM
============================================================ */

const ecosystem = [
  {
    number: "01",
    title: "Materials",
    description:
      "Functional materials, nanostructures, polymers, carbon materials, flexible substrates, and biointerfaces.",
  },
  {
    number: "02",
    title: "Devices",
    description:
      "Electrochemical, optical, biochemical, physical, wearable, and microfabricated sensing interfaces.",
  },
  {
    number: "03",
    title: "Microfluidics",
    description:
      "Sample handling, mixing, reaction control, incubation, culture, fluid transport, and lab-on-chip integration.",
  },
  {
    number: "04",
    title: "Instrumentation",
    description:
      "Signal conditioning, portable readout, embedded electronics, thermal management, connectivity, and control.",
  },
  {
    number: "05",
    title: "Intelligence",
    description:
      "Signal processing, machine learning, chemometrics, classification, compensation, and data-driven interpretation.",
  },
  {
    number: "06",
    title: "Translation",
    description:
      "Real-sample validation, field deployment, manufacturability, scale-up, usability, and application-driven design.",
  },
];

/* ============================================================
   CONNECTIONS
============================================================ */

const connections = [
  {
    title: "Microsystems × Diagnostics",
    text: "Microfluidics and embedded sensing enable compact sample-to-answer diagnostic systems.",
    image: "/research/thrusts/intelligent-microsystems.png",
  },
  {
    title: "Materials × Biointegration",
    text: "Flexible and functional materials enable wearable, textile, implantable, and conformable sensing architectures.",
    image: "/research/thrusts/biointegrated-systems.png",
  },
  {
    title: "Sensing × Intelligence",
    text: "AI, signal processing, and chemometrics transform raw sensor outputs into actionable information.",
    image: "/research/thrusts/intelligent-diagnostics.jpg",
  },
  {
    title: "Environment × Microsystems",
    text: "Miniaturized platforms bring chemical and biological analysis closer to farms, water systems, food chains, and field environments.",
    image: "/research/thrusts/agri-environmental-intelligence.jpg",
  },
];

/* ============================================================
   PAGE
============================================================ */

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />

      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <section className="relative overflow-hidden bg-[var(--background)] px-8 py-24 md:px-16 md:py-32">
        <div className="pointer-events-none absolute -right-40 -top-20 h-[520px] w-[520px] rounded-full bg-[var(--um-blue)]/8 blur-[120px]" />

        <div className="pointer-events-none absolute bottom-[-200px] left-[15%] h-[420px] w-[420px] rounded-full bg-[var(--um-sky)]/5 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
              Research
            </p>

            <h1 className="mt-6 max-w-6xl text-6xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-8xl">
              From sensing principles
              <br />
              to intelligent systems.
            </h1>

            <div className="mt-12 grid gap-10 border-t border-[var(--border)] pt-10 md:grid-cols-[1.1fr_0.9fr]">
              <p className="max-w-3xl text-xl leading-9">
                SenSys develops sensing technologies by connecting
                microsystems, functional materials, microfluidics,
                electronics, intelligent analytics, and application-driven
                engineering.
              </p>

              <p className="max-w-2xl text-base leading-8 text-[var(--foreground-soft)]">
                The objective is not simply to create new sensors, but to
                engineer integrated systems that can measure, interpret, and
                respond to complex biological, environmental, and physical
                information.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#thrusts"
                className="rounded-full bg-[var(--um-gold)] px-7 py-3.5 text-sm font-semibold text-[#2A1710] transition hover:bg-[var(--um-blue)] hover:text-white"
              >
                Explore research thrusts →
              </a>

              <a
                href="#foundations"
                className="rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-7 py-3.5 text-sm font-semibold transition hover:border-[var(--um-blue)] hover:text-[var(--um-blue)]"
              >
                Research foundations →
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
              ["Research Thrusts", "#thrusts"],
              ["Ecosystem", "#ecosystem"],
              ["Foundations", "#foundations"],
              ["Connections", "#connections"],
              ["Research Pathway", "#pathway"],
              ["Join", "#join-research"],
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
      {/* FOUR RESEARCH THRUSTS */}
      {/* ===================================================== */}

      <section
        id="thrusts"
        className="scroll-mt-40 bg-[var(--surface-soft)] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 md:grid-cols-[0.65fr_1.35fr]">
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
                  Each thrust addresses a distinct scientific and engineering
                  challenge while drawing from common strengths in materials,
                  microfluidics, sensing, instrumentation, connectivity, and
                  intelligent analysis.
                </p>
              </div>
            </div>
          </Reveal>

          {/* IMAGE-LED THRUSTS */}

          <div className="mt-20 space-y-8">
            {sensysAreas.map((area, index) => (
              <Reveal
                key={area.id}
                delay={index * 70}
              >
                <article
                  id={area.id}
                  className="scroll-mt-40 overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-soft)]"
                >
                  <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                    {/* IMAGE */}

                    <div
                      className={`relative min-h-[440px] overflow-hidden bg-white ${
                        index % 2 === 1 ? "lg:order-2" : ""
                      }`}
                    >
                      <Image
                        src={area.image}
                        alt={area.imageLabel}
                        fill
                        className="object-contain p-5 transition duration-700 hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 52vw"
                      />

                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#17263D]/35 to-transparent" />

                      <span className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-[#17263D]/85 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                        {area.imageLabel}
                      </span>

                      <span className="absolute right-5 top-5 text-7xl font-semibold text-[#385E9D]/12">
                        {area.number}
                      </span>
                    </div>

                    {/* TEXT */}

                    <div
                      className={`flex flex-col justify-center p-8 md:p-10 lg:p-12 ${
                        index % 2 === 1 ? "lg:order-1" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between gap-6">
                        <span className="text-sm font-semibold tracking-[0.25em] text-[var(--um-gold)]">
                          {area.number}
                        </span>

                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--um-blue)]">
                          SenSys Research Thrust
                        </span>
                      </div>

                      <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.23em] text-[var(--um-blue)]">
                        {area.tagline}
                      </p>

                      <h3 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
                        {area.title}
                      </h3>

                      <p className="mt-7 max-w-xl text-base leading-8 text-[var(--foreground-soft)]">
                        {area.description}
                      </p>

                      <div className="mt-8 flex flex-wrap gap-2">
                        {area.topics.map((topic) => (
                          <span
                            key={topic}
                            className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3.5 py-2 text-[11px] text-[var(--foreground-soft)]"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* RESEARCH ECOSYSTEM */}
      {/* ===================================================== */}

      <section
        id="ecosystem"
        className="scroll-mt-40 bg-[var(--section-blue)] px-8 py-24 text-white md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-gold)]">
                  Research Ecosystem
                </p>
              </div>

              <div>
                <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  Connect the complete technology stack.
                </h2>

                <p className="mt-7 max-w-3xl text-base leading-8 text-white/75">
                  SenSys research spans the pathway from functional materials
                  and sensing interfaces to integrated hardware, intelligent
                  interpretation, and application-level translation.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden bg-white/15 md:grid-cols-2 lg:grid-cols-3">
            {ecosystem.map((item, index) => (
              <Reveal
                key={item.title}
                delay={index * 60}
              >
                <div className="h-full bg-[var(--section-blue)] p-7">
                  <p className="text-xs font-semibold text-[var(--um-gold)]">
                    {item.number}
                  </p>

                  <h3 className="mt-5 text-xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/70">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={350}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3 text-sm text-white/70">
              <span>Materials</span>
              <span className="text-[var(--um-gold)]">→</span>
              <span>Sensing</span>
              <span className="text-[var(--um-gold)]">→</span>
              <span>Microfluidics</span>
              <span className="text-[var(--um-gold)]">→</span>
              <span>Instrumentation</span>
              <span className="text-[var(--um-gold)]">→</span>
              <span>Intelligence</span>
              <span className="text-[var(--um-gold)]">→</span>
              <span>Translation</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* ESTABLISHED FOUNDATIONS */}
      {/* ===================================================== */}

      <section
        id="foundations"
        className="scroll-mt-40 bg-[var(--background)] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 md:grid-cols-[0.65fr_1.35fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Research Foundations
                </p>
              </div>

              <div>
                <h2 className="max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                  Established technologies shaping what comes next.
                </h2>

                <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
                  These programmes demonstrate how materials, sensing,
                  microfluidics, instrumentation, intelligent analysis, and
                  real-world validation can be integrated into complete
                  systems.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {researchFoundations.map((item, index) => (
              <Reveal
                key={item.number}
                delay={index * 80}
              >
                <Link
                  href={item.href}
                  className="group flex h-full flex-col overflow-hidden border border-[var(--border)] bg-[var(--surface)] transition duration-300 hover:-translate-y-1 hover:border-[var(--um-blue)] hover:shadow-[var(--shadow-medium)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface-soft)]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-6 transition duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#17263D]/45 to-transparent" />

                    <div className="absolute left-5 top-5 rounded-full bg-[#17263D]/85 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                      {item.category}
                    </div>

                    <div className="absolute bottom-5 right-5 text-6xl font-semibold text-white/35">
                      {item.number}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-7 md:p-8">
                    <h3 className="text-3xl font-semibold tracking-[-0.03em]">
                      {item.title}
                    </h3>

                    <p className="mt-5 flex-1 text-sm leading-7 text-[var(--foreground-soft)]">
                      {item.description}
                    </p>

                    <div className="mt-7 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1.5 text-[10px] text-[var(--foreground-muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-[var(--border)] pt-5">
                      <span className="text-sm font-semibold text-[var(--um-blue)]">
                        Explore research
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
      {/* HOW THE AREAS CONNECT */}
      {/* ===================================================== */}

      <section
        id="connections"
        className="scroll-mt-40 bg-[var(--surface-soft)] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
              Connected Research
            </p>

            <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              The strongest systems emerge between disciplines.
            </h2>

            <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
              SenSys research areas are intentionally interconnected. A
              microfluidic platform may rely simultaneously on functional
              materials, embedded electronics, data science, flexible
              fabrication, and application-specific validation.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {connections.map((item, index) => (
              <Reveal
                key={item.title}
                delay={index * 80}
              >
                <div className="group grid h-full overflow-hidden border border-[var(--border)] bg-[var(--surface)] transition hover:-translate-y-1 hover:border-[var(--um-blue)] hover:shadow-[var(--shadow-soft)] sm:grid-cols-[0.42fr_0.58fr]">
                  <div className="relative min-h-[220px] overflow-hidden bg-white">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-4 transition duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, 25vw"
                    />
                  </div>

                  <div className="p-7">
                    <div className="flex items-start justify-between gap-6">
                      <span className="text-xs font-semibold text-[var(--um-gold)]">
                        0{index + 1}
                      </span>

                      <span className="text-xl text-[var(--um-blue)]">
                        ×
                      </span>
                    </div>

                    <h3 className="mt-7 text-2xl font-semibold tracking-[-0.02em]">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)]">
                      {item.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* RESEARCH PATHWAY */}
      {/* ===================================================== */}

      <section
        id="pathway"
        className="scroll-mt-40 bg-[var(--background)] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Research Pathway
                </p>
              </div>

              <div>
                <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  From a scientific question to a deployable system.
                </h2>

                <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
                  Projects can begin at different points in the pipeline, but
                  the longer-term objective is to connect fundamental
                  engineering with experimentally validated technologies and
                  practical deployment.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
            {[
              {
                number: "01",
                title: "Question",
                text: "Define the biological, physical, environmental, or analytical challenge.",
              },
              {
                number: "02",
                title: "Interface",
                text: "Engineer materials and recognition interfaces for selective sensing.",
              },
              {
                number: "03",
                title: "Device",
                text: "Build the sensor, microfluidic architecture, or integrated microsystem.",
              },
              {
                number: "04",
                title: "System",
                text: "Integrate electronics, fluid handling, control, and portable instrumentation.",
              },
              {
                number: "05",
                title: "Intelligence",
                text: "Transform raw measurements into reliable and interpretable information.",
              },
              {
                number: "06",
                title: "Deployment",
                text: "Validate, translate, scale, and test the technology in its intended environment.",
              },
            ].map((step, index) => (
              <Reveal
                key={step.number}
                delay={index * 60}
              >
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

                  {index < 5 && (
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
      {/* RESEARCH VISION */}
      {/* ===================================================== */}

      <section className="relative overflow-hidden bg-[#17263D] px-8 py-24 text-white md:px-16 md:py-32">
        <div className="pointer-events-none absolute -right-40 top-0 h-[460px] w-[460px] rounded-full bg-[#385E9D]/25 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#F2A900]">
                  Research Vision
                </p>

                <h2 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] md:text-7xl">
                  Sense more.
                  <br />
                  Integrate deeper.
                  <br />
                  Deploy smarter.
                </h2>
              </div>

              <div>
                <p className="max-w-xl text-lg leading-8 text-white/75">
                  The long-term direction is toward sensing platforms that are
                  increasingly autonomous, multimodal, connected, wearable,
                  implantable, environmentally aware, and capable of operating
                  outside centralized laboratories.
                </p>

                <Link
                  href="/publications"
                  className="mt-8 inline-flex rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white hover:text-[#385E9D]"
                >
                  Explore publications →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* JOIN */}
      {/* ===================================================== */}

      <section
        id="join-research"
        className="scroll-mt-40 bg-[var(--um-gold)] px-8 py-24 text-[#2A1710] md:px-16 md:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#4F2C1D]/70">
                  Join SenSys
                </p>

                <h2 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] md:text-7xl">
                  Build the next generation of sensing systems.
                </h2>
              </div>

              <div>
                <p className="text-lg leading-8 text-[#4F2C1D]/85">
                  SenSys brings together researchers working across materials,
                  microfluidics, electronics, biosensing, data science,
                  diagnostics, environmental monitoring, and technology
                  translation.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/join"
                    className="rounded-full bg-[#2A1710] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#385E9D]"
                  >
                    Explore opportunities →
                  </Link>

                  <Link
                    href="/people"
                    className="rounded-full border border-[#2A1710] px-7 py-3.5 text-sm font-semibold transition hover:bg-[#2A1710] hover:text-white"
                  >
                    Meet the team →
                  </Link>
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