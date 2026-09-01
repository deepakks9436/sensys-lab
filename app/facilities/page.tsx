import Image from "next/image";
import Link from "next/link";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";

/* ============================================================
   CORE CAPABILITIES
============================================================ */

const capabilities = [
  {
    number: "01",
    title: "Microfabrication & Advanced Manufacturing",
    description:
      "An integrated fabrication environment for rapid prototyping, microdevices, microfluidics, direct-write manufacturing, laser processing, printed electronics, and unconventional device architectures.",
    topics: [
      "Microfabrication",
      "3D Printing",
      "Direct-Write Printing",
      "Laser Processing",
      "Printed Electronics",
      "Rapid Prototyping",
    ],
  },
  {
    number: "02",
    title: "Electrochemical & Bioanalytical Characterization",
    description:
      "Electrochemical and analytical workflows supporting biosensors, functional materials, energy devices, electrochemical interfaces, and point-of-care technologies.",
    topics: [
      "Electrochemistry",
      "EIS",
      "Biosensing",
      "Functional Interfaces",
      "Energy Devices",
      "Analytical Testing",
    ],
  },
  {
    number: "03",
    title: "Optical & Imaging Systems",
    description:
      "Optical sensing, fluorescence, microscopy, imaging, spectroscopy, and multimodal characterization for device development and analytical measurement.",
    topics: [
      "Optical Sensing",
      "Fluorescence",
      "Microscopy",
      "Imaging",
      "Spectroscopy",
      "Multimodal Analysis",
    ],
  },
  {
    number: "04",
    title: "Flexible & Wearable Device Engineering",
    description:
      "Fabrication and testing approaches for textile electronics, flexible devices, wearable sensors, compliant systems, and biointegrated technologies.",
    topics: [
      "Wearables",
      "Textile Electronics",
      "Flexible Devices",
      "Biointegration",
      "Mechanical Testing",
      "Functional Materials",
    ],
  },
  {
    number: "05",
    title: "Microfluidics & Point-of-Care Systems",
    description:
      "Capabilities connecting fluid handling, pumping, thermal control, microreactors, lab-on-chip systems, sensing interfaces, and portable diagnostic instrumentation.",
    topics: [
      "Microfluidics",
      "Lab-on-Chip",
      "Fluid Control",
      "Thermal Management",
      "Microreactors",
      "Portable Diagnostics",
    ],
  },
  {
    number: "06",
    title: "Environmental & Application Validation",
    description:
      "Infrastructure supporting technology evaluation across water, soil, food, agriculture, environmental monitoring, and other application-driven research settings.",
    topics: [
      "Water",
      "Soil",
      "Food Safety",
      "Agriculture",
      "Environmental Monitoring",
      "Real-Sample Validation",
    ],
  },
];

/* ============================================================
   INFRASTRUCTURE PIPELINE
============================================================ */

const pipeline = [
  {
    number: "01",
    title: "Design",
    text:
      "Translate a research question into device architecture, fluidic design, sensing strategy, and system requirements.",
  },
  {
    number: "02",
    title: "Fabricate",
    text:
      "Prototype devices using additive, subtractive, direct-write, laser, printed, and flexible manufacturing approaches.",
  },
  {
    number: "03",
    title: "Functionalize",
    text:
      "Integrate nanomaterials, recognition chemistries, electrodes, optical interfaces, and biofunctional surfaces.",
  },
  {
    number: "04",
    title: "Characterize",
    text:
      "Evaluate electrical, electrochemical, optical, mechanical, morphological, and analytical performance.",
  },
  {
    number: "05",
    title: "Integrate",
    text:
      "Combine sensing with microfluidics, electronics, control, thermal management, software, and portable instrumentation.",
  },
  {
    number: "06",
    title: "Validate",
    text:
      "Test complete systems using application-relevant samples, environments, workflows, and deployment scenarios.",
  },
];

/* ============================================================
   RESEARCH ENABLED
============================================================ */

const enabledResearch = [
  {
    title: "Intelligent Microsystems",
    image: "/research/thrusts/intelligent-microsystems.png",
    href: "/research#intelligent-microsystems",
    text:
      "Fabrication, microfluidics, electronics, sensing interfaces, and system integration for miniaturized intelligent devices.",
  },
  {
    title: "Biointegrated Systems",
    image: "/research/thrusts/biointegrated-systems.png",
    href: "/research#biointegrated-systems",
    text:
      "Flexible fabrication, textile technologies, biointerfaces, characterization, and wearable or implantable system development.",
  },
  {
    title: "Intelligent Diagnostics",
    image: "/research/thrusts/intelligent-diagnostics.jpg",
    href: "/research#intelligent-diagnostics",
    text:
      "Bioanalytical characterization, microfluidics, portable instrumentation, optical and electrochemical sensing, and connected diagnostics.",
  },
  {
    title: "Agri & Environmental Intelligence",
    image: "/research/thrusts/agri-environmental-intelligence.jpg",
    href: "/research#agri-environment",
    text:
      "Field-oriented technologies for water, food, soil, pesticide, agriculture, and environmental sensing applications.",
  },
];

/* ============================================================
   PAGE
============================================================ */

export default function FacilitiesPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />

      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <section className="relative overflow-hidden bg-[var(--background)] px-8 py-24 md:px-16 md:py-32">
        <div className="pointer-events-none absolute -right-40 -top-32 h-[520px] w-[520px] rounded-full bg-[var(--um-blue)]/8 blur-[120px]" />

        <div className="pointer-events-none absolute bottom-[-180px] left-[18%] h-[380px] w-[380px] rounded-full bg-[var(--um-sky)]/6 blur-[110px]" />

        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
              Facilities
            </p>

            <h1 className="mt-6 max-w-6xl text-6xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-8xl">
              Infrastructure for turning
              <br />
              ideas into systems.
            </h1>

            <div className="mt-12 grid gap-10 border-t border-[var(--border)] pt-10 md:grid-cols-[1.05fr_0.95fr]">
              <p className="max-w-3xl text-xl leading-9">
                SenSys is establishing an integrated research environment at
                the University of Manitoba for sensing, microsystems,
                microfluidics, advanced fabrication, characterization, and
                translational technology development.
              </p>

              <p className="max-w-2xl text-base leading-8 text-[var(--foreground-soft)]">
                The infrastructure is being designed around complete research
                workflows — connecting device fabrication with
                characterization, instrumentation, system integration, and
                application-level validation.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* INFRASTRUCTURE VISION */}
      {/* ===================================================== */}

      <section className="bg-[var(--section-blue)] px-8 py-24 text-white md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-gold)]">
                  Infrastructure Vision
                </p>
              </div>

              <div>
                <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  Build around workflows,
                  <br />
                  not isolated instruments.
                </h2>

                <p className="mt-7 max-w-3xl text-base leading-8 text-white/75">
                  SenSys infrastructure is being developed to support the
                  progression from materials and fabrication to sensing,
                  integration, characterization, intelligent analysis, and
                  real-world evaluation.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-16 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 border-y border-white/15 py-8 text-sm text-white/75">
              <span>Design</span>
              <span className="text-[var(--um-gold)]">→</span>

              <span>Fabricate</span>
              <span className="text-[var(--um-gold)]">→</span>

              <span>Functionalize</span>
              <span className="text-[var(--um-gold)]">→</span>

              <span>Characterize</span>
              <span className="text-[var(--um-gold)]">→</span>

              <span>Integrate</span>
              <span className="text-[var(--um-gold)]">→</span>

              <span>Validate</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* EMERGING CAPABILITIES */}
      {/* ===================================================== */}

      <section className="bg-[var(--background)] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Emerging Capabilities
                </p>
              </div>

              <div>
                <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  An integrated environment for device-to-system research.
                </h2>

                <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
                  The laboratory environment is being organized around six
                  complementary capability areas that support the major SenSys
                  research thrusts.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {capabilities.map((item, index) => (
              <Reveal key={item.number} delay={index * 70}>
                <article className="group h-full border border-[var(--border)] bg-[var(--surface)] p-8 transition duration-300 hover:-translate-y-1 hover:border-[var(--um-blue)] hover:shadow-[var(--shadow-soft)] md:p-9">
                  <div className="flex items-start justify-between gap-6">
                    <span className="text-sm font-semibold tracking-[0.2em] text-[var(--um-gold)]">
                      {item.number}
                    </span>

                    <span className="h-2.5 w-2.5 rounded-full bg-[var(--um-blue)] transition group-hover:bg-[var(--um-sky)]" />
                  </div>

                  <h3 className="mt-8 max-w-xl text-2xl font-semibold leading-tight tracking-[-0.025em] md:text-3xl">
                    {item.title}
                  </h3>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--foreground-soft)]">
                    {item.description}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {item.topics.map((topic) => (
                      <span
                        key={topic}
                        className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1.5 text-[10px] text-[var(--foreground-muted)]"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* COMPLETE RESEARCH WORKFLOW */}
      {/* ===================================================== */}

      <section className="bg-[var(--surface-soft)] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Research Workflow
                </p>
              </div>

              <div>
                <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  From concept to validated technology.
                </h2>

                <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
                  The value of the infrastructure lies in how individual
                  capabilities connect across a complete experimental and
                  engineering pathway.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
            {pipeline.map((step, index) => (
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

                  {index < pipeline.length - 1 && (
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
      {/* WHAT THE INFRASTRUCTURE ENABLES */}
      {/* ===================================================== */}

      <section className="bg-[var(--background)] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Research Enabled
                </p>

                <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  Infrastructure connected directly to the research mission.
                </h2>

                <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
                  The facility strategy is being shaped around the four SenSys
                  research thrusts rather than around a stand-alone inventory
                  of equipment.
                </p>
              </div>

              <Link
                href="/research"
                className="w-fit text-sm font-semibold text-[var(--um-blue)] transition hover:text-[var(--um-sky)]"
              >
                Explore research →
              </Link>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {enabledResearch.map((item, index) => (
              <Reveal key={item.title} delay={index * 80}>
                <Link
                  href={item.href}
                  className="group grid h-full overflow-hidden border border-[var(--border)] bg-[var(--surface)] transition duration-300 hover:-translate-y-1 hover:border-[var(--um-blue)] hover:shadow-[var(--shadow-medium)] sm:grid-cols-[0.46fr_0.54fr]"
                >
                  <div className="relative min-h-[270px] overflow-hidden bg-white">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-4 transition duration-700 group-hover:scale-[1.035]"
                      sizes="(max-width: 640px) 100vw, 25vw"
                    />
                  </div>

                  <div className="flex flex-col justify-center p-7">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--um-blue)]">
                      Research Thrust
                    </p>

                    <h3 className="mt-3 text-2xl font-semibold leading-tight">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)]">
                      {item.text}
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

      {/* ===================================================== */}
      {/* UNIVERSITY ENVIRONMENT */}
      {/* ===================================================== */}

      <section className="bg-[var(--surface-soft)] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  University Environment
                </p>
              </div>

              <div>
                <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  Embedded within a large research and innovation ecosystem.
                </h2>

                <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
                  SenSys is based within the University of Manitoba, providing
                  a broader institutional environment for interdisciplinary
                  research, collaboration, infrastructure, training, and
                  technology development.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] md:grid-cols-3">
            <Reveal delay={0}>
              <div className="h-full bg-[var(--surface)] p-8">
                <p className="text-5xl font-semibold tracking-tight text-[var(--um-gold)]">
                  100+
                </p>

                <p className="mt-4 text-sm font-semibold">
                  Buildings
                </p>

                <p className="mt-3 text-xs leading-6 text-[var(--foreground-soft)]">
                  Across the University of Manitoba facilities environment.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="h-full bg-[var(--surface)] p-8">
                <p className="text-5xl font-semibold tracking-tight text-[var(--um-blue)]">
                  6.41M
                </p>

                <p className="mt-4 text-sm font-semibold">
                  Square Feet
                </p>

                <p className="mt-3 text-xs leading-6 text-[var(--foreground-soft)]">
                  University facilities and infrastructure space.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="h-full bg-[var(--surface)] p-8">
                <p className="text-5xl font-semibold tracking-tight text-[var(--um-sky)]">
                  676
                </p>

                <p className="mt-4 text-sm font-semibold">
                  Acres
                </p>

                <p className="mt-3 text-xs leading-6 text-[var(--foreground-soft)]">
                  Land represented within the UM Facilities profile.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={250}>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="https://umanitoba.ca/facilities/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[var(--um-blue)] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--um-blue-dark)]"
              >
                University of Manitoba Facilities ↗
              </a>

              <a
                href="https://umanitoba.ca/facilities/smartpark"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[var(--border-strong)] px-7 py-3.5 text-sm font-semibold transition hover:border-[var(--um-blue)] hover:text-[var(--um-blue)]"
              >
                Smartpark Research & Technology Park ↗
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* TRANSLATION */}
      {/* ===================================================== */}

      <section className="bg-[var(--um-gold)] px-8 py-24 text-[#2A1710] md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#4F2C1D]/70">
                  Infrastructure for Translation
                </p>

                <h2 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] md:text-7xl">
                  Fabricate.
                  <br />
                  Integrate.
                  <br />
                  Validate.
                </h2>
              </div>

              <div>
                <p className="max-w-xl text-lg leading-8 text-[#4F2C1D]/85">
                  The aim is to create an environment in which researchers can
                  move efficiently from a sensing concept to a functional,
                  characterized, integrated, and application-tested system.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/research"
                    className="rounded-full bg-[#2A1710] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#385E9D]"
                  >
                    Explore research →
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

      <Footer />
    </main>
  );
}