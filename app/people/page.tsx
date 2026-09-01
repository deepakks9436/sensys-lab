import Image from "next/image";
import Link from "next/link";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";

/* ============================================================
   INCOMING PHD — JANUARY 2027
============================================================ */

const incomingPhD = [
  "Swarna Deb",
  "Fortune Ogbonna",
  "Arunabh Bezbaruah",
  "Nitish Reddy",
  "Savan Siddharth Ithagani",
];

/* ============================================================
   INCOMING MSC — JANUARY 2027
============================================================ */

const incomingMSc = [
  "Ayomide Adeyemi",
  "Pritam Bol",
  "Edna Atisu",
  "Arman Kashyap",
  "Aditya Varshney",
  "Ajay Singh",
  "Sivatharshan Sivashanmugamoorthy",
];

/* ============================================================
   HOW WE WORK
============================================================ */

const workingPrinciples = [
  {
    number: "01",
    title: "Interdisciplinary",
    text:
      "Connecting materials, microfluidics, electronics, sensing, software, biology, and application science.",
  },
  {
    number: "02",
    title: "Translational",
    text:
      "Moving from scientific concepts toward integrated technologies, validation, and meaningful deployment.",
  },
  {
    number: "03",
    title: "Collaborative",
    text:
      "Working across disciplines, institutions, industries, and application communities.",
  },
  {
    number: "04",
    title: "Impact-Driven",
    text:
      "Developing technologies relevant to health, environment, food systems, agriculture, and prosperity.",
  },
];

/* ============================================================
   RESEARCH ROLES
============================================================ */

const researchRoles = [
  {
    title: "Undergraduate",
    text:
      "Project-based research across sensing, fabrication, microfluidics, electronics, and data analysis.",
  },
  {
    title: "MSc",
    text:
      "Research-intensive graduate training focused on emerging sensing technologies and application-driven engineering.",
  },
  {
    title: "PhD",
    text:
      "Independent interdisciplinary research addressing fundamental and translational challenges.",
  },
  {
    title: "Postdoctoral",
    text:
      "Advanced research leadership across major SenSys programmes and collaborative projects.",
  },
  {
    title: "Technical & Project",
    text:
      "Infrastructure, instrumentation, laboratory operations, project coordination, and technology-development support.",
  },
];

/* ============================================================
   INITIALS
============================================================ */

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

/* ============================================================
   PAGE
============================================================ */

export default function PeoplePage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />

      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <section className="relative overflow-hidden bg-[var(--background)] px-8 py-24 md:px-16 md:py-32">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[var(--um-blue)]/10 blur-[120px]" />

        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-[2px] w-10 bg-[var(--um-gold)]" />

              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                People
              </p>
            </div>

            <div className="mt-8 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <h1 className="max-w-5xl text-6xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-8xl">
                Team
                <br />
                <span className="text-[var(--um-blue)]">
                  SenSys.
                </span>
              </h1>

              <p className="max-w-2xl text-xl leading-9 text-[var(--foreground-soft)]">
                An interdisciplinary team developing intelligent sensory
                systems across health, environment, food, agriculture,
                microsystems, and technology translation.
              </p>
            </div>
          </Reveal>
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

          <Reveal delay={100}>
            <div className="mt-12 grid overflow-hidden border border-[var(--border)] bg-[var(--surface)] lg:grid-cols-[0.86fr_1.14fr]">
              <Link
                href="/people/sanket-goel"
                className="group relative min-h-[570px] overflow-hidden bg-[var(--surface-muted)]"
              >
                <Image
                  src="/people/sanket-goel.webp"
                  alt="Prof. Sanket Goel"
                  fill
                  className="object-contain p-5 transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 44vw"
                />

                <div className="absolute bottom-0 left-0 h-[6px] w-full bg-gradient-to-r from-[var(--um-blue)] via-[var(--um-sky)] to-[var(--um-gold)]" />
              </Link>

              <div className="flex flex-col justify-center p-8 md:p-12">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--um-blue)]">
                  Eddie Goldenberg Research Chair of Canada
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  Prof. Sanket Goel
                </h2>

                <p className="mt-4 text-base font-medium">
                  Founder & Principal Investigator, SenSys Lab
                </p>

                <p className="mt-1 text-sm text-[var(--foreground-soft)]">
                  University of Manitoba
                </p>

                <p className="mt-8 max-w-2xl text-base leading-8 text-[var(--foreground-soft)]">
                  Leading an interdisciplinary research programme spanning
                  microsystems, microfluidics, intelligent diagnostics,
                  biointegrated systems, advanced materials, environmental
                  sensing, cyber-physical sensory systems, and technology
                  translation.
                </p>

                <Link
                  href="/people/sanket-goel"
                  className="mt-9 w-fit text-sm font-semibold text-[var(--um-blue)]"
                >
                  Full profile →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* CURRENT TEAM */}
      {/* ===================================================== */}

      <section className="bg-[var(--background)] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 md:grid-cols-[0.62fr_1.38fr]">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                Current Team
              </p>

              <h2 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                Researchers building the foundations of SenSys Lab.
              </h2>
            </div>
          </Reveal>

          {/* DEEPAK */}

          <Reveal delay={100}>
            <div className="mt-16 grid overflow-hidden border border-[var(--border)] bg-[var(--surface)] lg:grid-cols-[0.48fr_0.52fr]">
              <Link
                href="/people/ks-deepak"
                className="group relative min-h-[460px] bg-[var(--surface-muted)]"
              >
                <Image
                  src="/people/ks-deepak.jpg"
                  alt="K. S. Deepak"
                  fill
                  className="object-contain p-6 transition duration-700 group-hover:scale-[1.025]"
                />
              </Link>

              <div className="flex flex-col justify-center p-8 md:p-12">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--um-blue)]">
                  Postdoctoral Researcher
                </p>

                <h3 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
                  K. S. Deepak
                </h3>

                <p className="mt-6 max-w-xl text-base leading-8 text-[var(--foreground-soft)]">
                  Research spanning portable sensing, microfluidics,
                  electrochemical and optical systems, environmental
                  monitoring, and translational device development.
                </p>

                <Link
                  href="/people/ks-deepak"
                  className="mt-8 text-sm font-semibold text-[var(--um-blue)]"
                >
                  View profile →
                </Link>
              </div>
            </div>
          </Reveal>

          {/* PARVATHY */}

          <Reveal delay={160}>
            <div className="mt-6 grid overflow-hidden border border-[var(--border)] bg-[var(--surface)] lg:grid-cols-[0.52fr_0.48fr]">
              <div className="order-2 flex flex-col justify-center p-8 md:p-12 lg:order-1">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--um-blue)]">
                  Postdoctoral Researcher
                </p>

                <h3 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
                  Parvathy Nair
                </h3>

                <p className="mt-6 max-w-xl text-base leading-8 text-[var(--foreground-soft)]">
                  Contributing to interdisciplinary research across intelligent
                  sensing, microsystems, diagnostic technologies, and emerging
                  SenSys research programmes.
                </p>

                <Link
                  href="/people/parvathy-nair"
                  className="mt-8 text-sm font-semibold text-[var(--um-blue)]"
                >
                  View profile →
                </Link>
              </div>

              <Link
                href="/people/parvathy-nair"
                className="group relative order-1 min-h-[460px] bg-[var(--surface-muted)] lg:order-2"
              >
                <Image
                  src="/people/parvathy-nair.jpg"
                  alt="Parvathy Nair"
                  fill
                  className="object-contain p-6 transition duration-700 group-hover:scale-[1.025]"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* INCOMING GRADUATE RESEARCHERS */}
      {/* ===================================================== */}

      <section
        id="incoming"
        className="bg-[var(--surface-soft)] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Incoming Researchers
                </p>

                <p className="mt-4 text-sm text-[var(--foreground-muted)]">
                  January 2027
                </p>
              </div>

              <div>
                <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  The next generation of
                  <br />
                  Team SenSys.
                </h2>

                <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
                  Twelve graduate researchers are expected to join SenSys Lab
                  in January 2027: five PhD researchers and seven MSc
                  researchers.
                </p>
              </div>
            </div>
          </Reveal>

          {/* ================================================= */}
          {/* PHD */}
          {/* ================================================= */}

          <Reveal delay={100}>
            <div className="mt-16 border-b border-[var(--border)] pb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--um-gold)]">
                PhD · 05
              </p>

              <h3 className="mt-3 text-3xl font-semibold">
                Incoming PhD Researchers
              </h3>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {incomingPhD.map((name, index) => (
              <Reveal
                key={name}
                delay={index * 60}
              >
                <article className="group h-full border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:-translate-y-1 hover:border-[var(--um-blue)] hover:shadow-[var(--shadow-soft)]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-soft)] text-lg font-semibold text-[var(--um-blue)]">
                    {getInitials(name)}
                  </div>

                  <h4 className="mt-8 text-xl font-semibold leading-tight">
                    {name}
                  </h4>

                  <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.19em] text-[var(--um-blue)]">
                    Incoming PhD Researcher
                  </p>

                  <p className="mt-5 text-xs text-[var(--foreground-muted)]">
                    January 2027
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          {/* ================================================= */}
          {/* MSC */}
          {/* ================================================= */}

          <Reveal delay={120}>
            <div className="mt-20 border-b border-[var(--border)] pb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--um-sky)]">
                MSc · 07
              </p>

              <h3 className="mt-3 text-3xl font-semibold">
                Incoming MSc Researchers
              </h3>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {incomingMSc.map((name, index) => (
              <Reveal
                key={name}
                delay={index * 55}
              >
                <article className="group h-full border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:-translate-y-1 hover:border-[var(--um-blue)] hover:shadow-[var(--shadow-soft)]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-soft)] text-lg font-semibold text-[var(--um-blue)]">
                    {getInitials(name)}
                  </div>

                  <h4 className="mt-8 text-xl font-semibold leading-tight">
                    {name}
                  </h4>

                  <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.19em] text-[var(--um-blue)]">
                    Incoming MSc Researcher
                  </p>

                  <p className="mt-5 text-xs text-[var(--foreground-muted)]">
                    January 2027
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* HOW WE WORK */}
      {/* ===================================================== */}

      <section className="bg-[var(--section-blue)] px-8 py-24 text-white md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr]">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-gold)]">
                How We Work
              </p>

              <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                Research built around connection.
              </h2>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden bg-white/15 md:grid-cols-2 lg:grid-cols-4">
            {workingPrinciples.map((item, index) => (
              <Reveal
                key={item.number}
                delay={index * 70}
              >
                <div className="h-full bg-[var(--section-blue)] p-7">
                  <p className="text-xs font-semibold text-[var(--um-gold)]">
                    {item.number}
                  </p>

                  <h3 className="mt-8 text-2xl font-semibold">
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
      {/* RESEARCH ROLES */}
      {/* ===================================================== */}

      <section className="bg-[var(--background)] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
              Research Roles
            </p>

            <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Different stages.
              <br />
              One research ecosystem.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {researchRoles.map((item, index) => (
              <Reveal
                key={item.title}
                delay={index * 60}
              >
                <article className="h-full border border-[var(--border)] bg-[var(--surface)] p-6">
                  <span className="text-xs font-semibold text-[var(--um-gold)]">
                    0{index + 1}
                  </span>

                  <h3 className="mt-8 text-xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)]">
                    {item.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* GROWING SENSYS */}
      {/* ===================================================== */}

      <section className="bg-[var(--surface-soft)] px-8 py-24 md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Growing SenSys
                </p>

                <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                  Building a multidisciplinary research community in Manitoba.
                </h2>
              </div>

              <p className="max-w-xl text-base leading-8 text-[var(--foreground-soft)]">
                SenSys Lab is being built as a collaborative environment for
                graduate researchers, postdoctoral researchers, undergraduate
                students, technical specialists, and research partners.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* WORK WITH US */}
      {/* ===================================================== */}

      <section className="bg-[var(--um-gold)] px-8 py-24 text-[#2A1710] md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#4F2C1D]/70">
                  Work With Us
                </p>

                <h2 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-7xl">
                  Help build what comes next.
                </h2>
              </div>

              <div>
                <p className="max-w-xl text-lg leading-8 text-[#4F2C1D]/85">
                  We welcome expressions of interest from researchers who want
                  to work across intelligent sensory systems, microsystems,
                  diagnostics, biointegration, environment, and technology
                  translation.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/join"
                    className="rounded-full bg-[#2A1710] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#385E9D]"
                  >
                    View opportunities →
                  </Link>

                  <a
                    href="mailto:sanketgoel@gmail.com?subject=Interest%20in%20Joining%20SenSys%20Lab"
                    className="rounded-full border border-[#2A1710] px-7 py-3.5 text-sm font-semibold transition hover:bg-[#2A1710] hover:text-white"
                  >
                    Contact SenSys Lab →
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