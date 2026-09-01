import Image from "next/image";
import Link from "next/link";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";
import AnimatedCounter from "../../components/AnimatedCounter";

/* ============================================================
   TEAM
============================================================ */

const team = [
  {
    name: "Prof. Sanket Goel",
    role: "Founder & Principal Investigator",
    secondary: "Eddie Goldenberg Research Chair of Canada",
    image: "/people/sanket-goel.webp",
    href: "/people/sanket-goel",
    description:
      "Leading interdisciplinary research across intelligent sensing, microsystems, microfluidics, advanced materials, diagnostics, biointegrated devices, environmental monitoring, and technology translation.",
    tags: [
      "Microsystems",
      "Microfluidics",
      "Biosensors",
      "Advanced Materials",
      "Intelligent Instrumentation",
    ],
  },
  {
    name: "K. S. Deepak",
    role: "Postdoctoral Researcher",
    secondary: "SenSys Lab · University of Manitoba",
    image: "/people/ks-deepak.jpg",
    href: "/people/ks-deepak",
    description:
      "Developing miniaturized sensing platforms spanning microfluidics, portable optical and electrochemical systems, wearable devices, food safety, environmental monitoring, and translational sensing technologies.",
    tags: [
      "Microfluidics",
      "Pesticide Detection",
      "Wearable Sensors",
      "Optical Sensing",
      "Electrochemical Sensing",
    ],
  },
  {
    name: "Parvathy Nair",
    role: "Postdoctoral Researcher",
    secondary: "SenSys Lab · University of Manitoba",
    image: "/people/parvathy-nair.jpg",
    href: "/people/parvathy-nair",
    description:
      "Working on electrochemical biosensors, multiplexed biomarker detection, integrated microfluidics, portable instrumentation, flexible electrodes, and point-of-care analytical systems.",
    tags: [
      "Electrochemical Biosensors",
      "Microfluidics",
      "Biomarker Detection",
      "Portable Instrumentation",
      "Flexible Sensors",
    ],
  },
];

/* ============================================================
   HOW WE WORK
============================================================ */

const waysOfWorking = [
  {
    number: "01",
    title: "Across disciplines",
    text: "Materials, microfluidics, sensing, electronics, embedded systems, data science, and applications are treated as parts of one engineering problem.",
  },
  {
    number: "02",
    title: "Across scales",
    text: "Research can move from functional interfaces and microscale devices to complete portable or connected sensing systems.",
  },
  {
    number: "03",
    title: "Across applications",
    text: "Healthcare, food safety, environmental monitoring, agriculture, and diagnostics provide real-world contexts for technology development.",
  },
  {
    number: "04",
    title: "Toward translation",
    text: "Projects are designed with validation, usability, scalability, deployment, and technology translation in mind.",
  },
];

/* ============================================================
   RESEARCH ROLES
============================================================ */

const researchRoles = [
  {
    title: "Undergraduate Researchers",
    stage: "Explore",
    text: "Hands-on exposure to fabrication, testing, prototyping, electronics, and experimental research.",
  },
  {
    title: "M.Sc. Researchers",
    stage: "Develop",
    text: "Focused technology development across sensing, microfluidics, materials, instrumentation, and applications.",
  },
  {
    title: "Ph.D. Researchers",
    stage: "Lead",
    text: "Deep interdisciplinary research connecting fundamental engineering with integrated systems and validation.",
  },
  {
    title: "Postdoctoral Fellows",
    stage: "Integrate",
    text: "System-level research, mentoring, project leadership, translation, and development of new research directions.",
  },
  {
    title: "Technical & Project Team",
    stage: "Enable",
    text: "Laboratory operations, prototyping, equipment integration, procurement, project coordination, and research support.",
  },
];

/* ============================================================
   PAGE
============================================================ */

export default function PeoplePage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />

      {/* ====================================================== */}
      {/* HERO */}
      {/* ====================================================== */}

      <section className="relative overflow-hidden bg-[var(--background)] px-8 py-24 md:px-16 md:py-32">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[var(--um-blue)]/8 blur-[120px]" />

        <div className="pointer-events-none absolute left-[22%] top-20 h-64 w-64 rounded-full bg-[var(--um-sky)]/5 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
              People
            </p>

            <h1 className="mt-6 max-w-5xl text-6xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-8xl">
              People behind
              <br />
              SenSys.
            </h1>

            <div className="mt-12 grid gap-10 border-t border-[var(--border)] pt-10 md:grid-cols-[1.05fr_0.95fr]">
              <p className="max-w-3xl text-xl leading-9">
                A growing interdisciplinary team engineering sensing systems
                from materials and microscale devices to intelligent,
                deployable technologies.
              </p>

              <p className="max-w-2xl text-base leading-8 text-[var(--foreground-soft)]">
                SenSys brings together researchers working across
                microfluidics, biosensing, electronics, advanced materials,
                diagnostics, environmental sensing, data analytics, and
                technology translation.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================================================== */}
      {/* PRINCIPAL INVESTIGATOR */}
      {/* ====================================================== */}

      <section className="bg-[var(--surface-soft)] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Principal Investigator
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  Research leadership.
                </h2>
              </div>

              <Link
                href="/people/sanket-goel"
                className="text-sm font-semibold text-[var(--um-blue)] transition hover:text-[var(--um-sky)]"
              >
                Full profile →
              </Link>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <Link
              href="/people/sanket-goel"
              className="group mt-12 grid overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1 hover:border-[var(--um-blue)] hover:shadow-[var(--shadow-medium)] lg:grid-cols-[0.88fr_1.12fr]"
            >
              {/* IMAGE */}

              <div className="relative min-h-[520px] overflow-hidden bg-[var(--surface-muted)] lg:min-h-[650px]">
                <Image
                  src="/people/sanket-goel.webp"
                  alt="Prof. Sanket Goel"
                  fill
                  priority
                  className="object-contain object-center transition duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 44vw"
                />

                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#17263D]/30 to-transparent" />

                <div className="absolute bottom-0 left-0 h-[6px] w-full bg-gradient-to-r from-[#385E9D] via-[#00A3E0] to-[#F2A900]" />
              </div>

              {/* CONTENT */}

              <div className="flex flex-col justify-between p-8 md:p-12">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--um-blue)]">
                    Eddie Goldenberg Research Chair of Canada
                  </p>

                  <h3 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                    Prof. Sanket Goel
                  </h3>

                  <p className="mt-3 font-semibold">
                    Founder & Principal Investigator, SenSys Lab
                  </p>

                  <p className="mt-1 text-sm text-[var(--foreground-muted)]">
                    University of Manitoba
                  </p>

                  <p className="mt-8 max-w-2xl text-base leading-8 text-[var(--foreground-soft)]">
                    Prof. Goel&apos;s research spans microfluidics, MEMS,
                    electrochemical and optical sensing, laser-induced graphene,
                    wearable and flexible devices, biofuel cells, point-of-care
                    diagnostics, environmental sensing, and intelligent
                    cyber-physical systems.
                  </p>

                  {/* METRICS */}

                  <div className="mt-9 grid grid-cols-2 gap-px overflow-hidden border-y border-[var(--border)] bg-[var(--border)] md:grid-cols-4">
                    <div className="bg-[var(--surface)] px-1 py-7">
                      <AnimatedCounter
                        value={319}
                        className="text-3xl font-semibold text-[var(--um-gold)]"
                      />

                      <p className="mt-2 text-xs leading-5 text-[var(--foreground-muted)]">
                        Publication Records
                      </p>
                    </div>

                    <div className="bg-[var(--surface)] px-5 py-7">
                      <AnimatedCounter
                        value={98}
                        className="text-3xl font-semibold text-[var(--um-gold)]"
                      />

                      <p className="mt-2 text-xs leading-5 text-[var(--foreground-muted)]">
                        Patents
                      </p>
                    </div>

                    <div className="bg-[var(--surface)] px-5 py-7">
                      <AnimatedCounter
                        value={44}
                        className="text-3xl font-semibold text-[var(--um-gold)]"
                      />

                      <p className="mt-2 text-xs leading-5 text-[var(--foreground-muted)]">
                        Sponsored Grants
                      </p>
                    </div>

                    <div className="bg-[var(--surface)] px-5 py-7">
                      <AnimatedCounter
                        value={144}
                        className="text-3xl font-semibold text-[var(--um-gold)]"
                      />

                      <p className="mt-2 text-xs leading-5 text-[var(--foreground-muted)]">
                        Invited Talks
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {[
                      "Microsystems",
                      "Microfluidics",
                      "Biosensors",
                      "Laser-Induced Graphene",
                      "Point-of-Care Diagnostics",
                      "Wearable Systems",
                      "Environmental Sensing",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3.5 py-2 text-xs text-[var(--foreground-soft)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-10 inline-flex items-center gap-3 text-sm font-semibold text-[var(--um-blue)]">
                  Explore full profile

                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ====================================================== */}
      {/* CURRENT TEAM */}
      {/* ====================================================== */}

      <section className="bg-[var(--background)] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Current Team
                </p>
              </div>

              <div>
                <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                  Researchers connecting devices,
                  <br />
                  systems, and applications.
                </h2>

                <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
                  The current postdoctoral team works across sensing chemistry,
                  microfluidic integration, portable instrumentation,
                  electrochemical and optical systems, wearable technologies,
                  and application-driven validation.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-16 space-y-8">
            {team.slice(1).map((person, index) => (
              <Reveal
                key={person.name}
                delay={index * 100}
              >
                <Link
                  href={person.href}
                  className="group grid overflow-hidden border border-[var(--border)] bg-[var(--surface)] transition duration-300 hover:-translate-y-1 hover:border-[var(--um-blue)] hover:shadow-[var(--shadow-medium)] lg:grid-cols-[0.82fr_1.18fr]"
                >
                  {/* IMAGE */}

                  <div
                    className={`relative min-h-[440px] overflow-hidden bg-[var(--surface-soft)] ${
                      index % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-contain object-center p-5 transition duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 42vw"
                    />

                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#17263D]/25 to-transparent" />

                    <div className="absolute left-5 top-5 rounded-full bg-[var(--um-blue)] px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-white">
                      Postdoctoral Researcher
                    </div>
                  </div>

                  {/* CONTENT */}

                  <div
                    className={`flex flex-col justify-center p-8 md:p-10 lg:p-12 ${
                      index % 2 === 1 ? "lg:order-1" : ""
                    }`}
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--um-blue)]">
                      {person.secondary}
                    </p>

                    <h3 className="mt-4 text-4xl font-semibold tracking-[-0.035em]">
                      {person.name}
                    </h3>

                    <p className="mt-3 text-sm font-semibold text-[var(--foreground)]">
                      {person.role}
                    </p>

                    <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--foreground-soft)]">
                      {person.description}
                    </p>

                    <div className="mt-7 flex flex-wrap gap-2">
                      {person.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3.5 py-2 text-xs text-[var(--foreground-soft)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-9 flex items-center gap-2 text-sm font-semibold text-[var(--um-blue)]">
                      View full profile

                      <span className="transition-transform group-hover:translate-x-1">
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

      {/* ====================================================== */}
      {/* HOW WE WORK */}
      {/* ====================================================== */}

      <section className="bg-[var(--section-blue)] px-8 py-24 text-white md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-gold)]">
                  How We Work
                </p>
              </div>

              <div>
                <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  Research happens between disciplines.
                </h2>

                <p className="mt-7 max-w-3xl text-base leading-8 text-white/75">
                  SenSys is organized around integrated research problems
                  rather than isolated technologies. Projects often connect
                  multiple scientific and engineering competencies within the
                  same system.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden bg-white/15 md:grid-cols-2 lg:grid-cols-4">
            {waysOfWorking.map((item, index) => (
              <Reveal
                key={item.number}
                delay={index * 80}
              >
                <div className="h-full bg-[var(--section-blue)] p-7">
                  <p className="text-xs font-semibold text-[var(--um-gold)]">
                    {item.number}
                  </p>

                  <h3 className="mt-6 text-xl font-semibold">
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

      {/* ====================================================== */}
      {/* RESEARCH ROLES */}
      {/* ====================================================== */}

      <section className="bg-[var(--surface-soft)] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Research Roles
                </p>
              </div>

              <div>
                <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  Different stages.
                  <br />
                  Shared research mission.
                </h2>

                <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
                  The team is designed to grow across multiple research and
                  technical roles, with increasing responsibility in
                  experimentation, system development, leadership, mentoring,
                  and translation.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {researchRoles.map((item, index) => (
              <Reveal
                key={item.title}
                delay={index * 70}
              >
                <div className="group h-full border border-[var(--border)] bg-[var(--surface)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--um-blue)] hover:shadow-[var(--shadow-soft)]">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold text-[var(--um-gold)]">
                      0{index + 1}
                    </span>

                    <span className="rounded-full border border-[var(--border)] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--um-blue)]">
                      {item.stage}
                    </span>
                  </div>

                  <h3 className="mt-8 text-xl font-semibold leading-7">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-xs leading-6 text-[var(--foreground-soft)]">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={350}>
            <div className="mt-10 flex justify-center">
              <Link
                href="/join"
                className="rounded-full border border-[var(--um-blue)] px-7 py-3.5 text-sm font-semibold text-[var(--um-blue)] transition hover:bg-[var(--um-blue)] hover:text-white"
              >
                Explore research opportunities →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================================================== */}
      {/* GROWING TEAM */}
      {/* ====================================================== */}

      <section className="bg-[var(--background)] px-8 py-24 md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Growing SenSys
                </p>

                <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                  Building a research community around integrated sensing.
                </h2>

                <p className="mt-7 max-w-2xl text-base leading-8 text-[var(--foreground-soft)]">
                  As the laboratory grows, SenSys will bring together graduate
                  researchers, postdoctoral fellows, undergraduate researchers,
                  technical specialists, and project-management personnel
                  across its major research thrusts.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/join"
                    className="rounded-full bg-[var(--um-gold)] px-7 py-3.5 text-sm font-semibold text-[#2A1710] transition hover:bg-[var(--um-blue)] hover:text-white"
                  >
                    Explore opportunities →
                  </Link>

                  <Link
                    href="/research"
                    className="rounded-full border border-[var(--border-strong)] px-7 py-3.5 text-sm font-semibold transition hover:border-[var(--um-blue)] hover:text-[var(--um-blue)]"
                  >
                    Explore research →
                  </Link>
                </div>
              </div>

              {/* TEAM COMPOSITION VISUAL */}

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    title: "Graduate Research",
                    text: "M.Sc. and Ph.D. researchers developing new sensing technologies.",
                  },
                  {
                    title: "Postdoctoral Research",
                    text: "System integration, research leadership, mentoring, and translation.",
                  },
                  {
                    title: "Undergraduate Research",
                    text: "Hands-on exposure to prototyping, fabrication, testing, and experimentation.",
                  },
                  {
                    title: "Research Operations",
                    text: "Technical support, laboratory operations, coordination, and project management.",
                  },
                ].map((item, index) => (
                  <Reveal
                    key={item.title}
                    delay={index * 70}
                  >
                    <div className="h-full border border-[var(--border)] bg-[var(--surface)] p-6">
                      <span className="text-xs font-semibold text-[var(--um-gold)]">
                        0{index + 1}
                      </span>

                      <h3 className="mt-6 text-lg font-semibold">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-xs leading-6 text-[var(--foreground-soft)]">
                        {item.text}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================================================== */}
      {/* FINAL CTA */}
      {/* ====================================================== */}

      <section className="relative overflow-hidden bg-[var(--section-blue)] px-8 py-24 text-white md:px-16 md:py-28">
        <div className="pointer-events-none absolute -right-24 -top-32 h-[380px] w-[380px] rounded-full bg-[#00A3E0]/20 blur-[110px]" />

        <div className="pointer-events-none absolute bottom-[-180px] left-[15%] h-[380px] w-[380px] rounded-full bg-[#F2A900]/10 blur-[110px]" />

        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-gold)]">
                  Work With Us
                </p>

                <h2 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.97] tracking-[-0.04em] md:text-7xl">
                  Build the next generation of sensing systems.
                </h2>
              </div>

              <div>
                <p className="max-w-xl text-lg leading-8 text-white/75">
                  SenSys welcomes expressions of interest from researchers and
                  professionals who want to work across disciplinary
                  boundaries and build technologies with real-world impact.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/join"
                    className="rounded-full bg-[var(--um-gold)] px-7 py-3.5 text-sm font-semibold text-[#2A1710] transition hover:bg-white"
                  >
                    Join SenSys →
                  </Link>

                  <a
                    href="mailto:sanketgoel@gmail.com?subject=Interest%20in%20Joining%20SenSys%20Lab"
                    className="rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-[#385E9D]"
                  >
                    Contact Prof. Goel →
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