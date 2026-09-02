import Image from "next/image";
import Link from "next/link";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";

const incomingPhD = [
  "Swarna Deb",
  "Fortune Ogbonna",
  "Arunabh Bezbaruah",
  "Nitish Reddy",
  "Savan Siddharth Ithagani",
];

const incomingMSc = [
  "Ayomide Adeyemi",
  "Pritam Bol",
  "Edna Atisu",
  "Arman Kashyap",
  "Aditya Varshney",
  "Ajay Singh",
  "Sivatharshan Sivashanmugamoorthy",
];

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

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default function PeoplePage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />

      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <section className="relative overflow-hidden border-b border-[var(--border)] px-5 py-12 md:px-16 md:py-16">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[360px] w-[360px] rounded-full bg-[var(--um-blue)]/10 blur-[110px]" />

        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-[2px] w-9 bg-[var(--um-gold)]" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--um-blue)] md:text-xs">
                People
              </p>
            </div>

            <h1 className="mt-6 text-5xl font-semibold leading-[0.92] tracking-[-0.055em] sm:text-6xl md:text-8xl">
              Team{" "}
              <span className="text-[var(--um-blue)]">
                SenSys.
              </span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* PRINCIPAL INVESTIGATOR */}
      {/* ===================================================== */}

      <section className="bg-[var(--surface-soft)] px-5 py-16 md:px-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--um-blue)]">
              Principal Investigator
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-8 grid overflow-hidden border border-[var(--border)] bg-[var(--surface)] lg:grid-cols-[0.78fr_1.22fr]">
              <Link
                href="/people/sanket-goel"
                className="group relative min-h-[360px] overflow-hidden bg-[var(--surface-muted)] md:min-h-[480px]"
              >
                <Image
                  src="/people/sanket-goel.webp"
                  alt="Prof. Sanket Goel"
                  fill
                  className="object-contain p-5 transition-transform duration-700 group-hover:scale-[1.02]"
                />

                <div className="absolute bottom-0 left-0 h-[5px] w-full bg-gradient-to-r from-[var(--um-blue)] via-[var(--um-sky)] to-[var(--um-gold)]" />
              </Link>

              <div className="flex flex-col justify-center p-6 md:p-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--um-blue)] md:text-xs">
                  Eddie Goldenberg Research Chair of Canada
                </p>

                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  Prof. Sanket Goel
                </h2>

                <p className="mt-4 text-base font-medium">
                  Founder & Principal Investigator, SenSys Lab
                </p>

                <p className="mt-1 text-sm text-[var(--foreground-soft)]">
                  University of Manitoba
                </p>

                <p className="mt-6 max-w-2xl text-sm leading-7 text-[var(--foreground-soft)] md:text-base md:leading-8">
                  Leading research across cyber-physical sensory systems,
                  microsystems, microfluidics, intelligent diagnostics,
                  biointegrated technologies, environmental sensing,
                  advanced materials, and technology translation.
                </p>

                <Link
                  href="/people/sanket-goel"
                  className="mt-7 w-fit text-sm font-semibold text-[var(--um-blue)]"
                >
                  Full profile →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* POSTDOCS */}
      {/* ===================================================== */}

      <section className="px-5 py-16 md:px-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-5 md:grid-cols-[0.62fr_1.38fr] md:items-end">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--um-blue)]">
                Postdoctoral Researchers
              </p>

              <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
                Advancing SenSys research.
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {[
              {
                name: "K. S. Deepak",
                href: "/people/ks-deepak",
                image: "/people/ks-deepak.jpg",
                text:
                  "Portable sensing, microfluidics, electrochemical and optical systems, environmental monitoring, and translational device development.",
              },
              {
                name: "Parvathy Nair",
                href: "/people/parvathy-nair",
                image: "/people/parvathy-nair.jpg",
                text:
                  "Intelligent sensing, microsystems, diagnostic technologies, and emerging interdisciplinary SenSys research programmes.",
              },
            ].map((person, index) => (
              <Reveal
                key={person.name}
                delay={index * 80}
              >
                <Link
                  href={person.href}
                  className="group grid h-full overflow-hidden border border-[var(--border)] bg-[var(--surface)] transition hover:-translate-y-1 hover:border-[var(--um-blue)] hover:shadow-[var(--shadow-soft)] sm:grid-cols-[0.9fr_1.1fr]"
                >
                  <div className="relative min-h-[290px] bg-[var(--surface-muted)]">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-contain p-5 transition duration-700 group-hover:scale-[1.025]"
                    />
                  </div>

                  <div className="flex flex-col justify-center p-6">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--um-blue)]">
                      Postdoctoral Researcher
                    </p>

                    <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
                      {person.name}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)]">
                      {person.text}
                    </p>

                    <p className="mt-6 text-sm font-semibold text-[var(--um-blue)]">
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
      {/* INCOMING */}
      {/* ===================================================== */}

      <section
        id="incoming"
        className="bg-[var(--surface-soft)] px-5 py-16 md:px-16 md:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-[0.62fr_1.38fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--um-blue)]">
                  Incoming Researchers
                </p>

                <p className="mt-3 text-sm text-[var(--foreground-muted)]">
                  January 2027
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  The next generation of
                  <br />
                  Team SenSys.
                </h2>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--foreground-soft)] md:text-base">
                  Five PhD and seven MSc researchers are expected to join
                  the laboratory in January 2027.
                </p>
              </div>
            </div>
          </Reveal>

          {/* PHD */}

          <div className="mt-12 border-b border-[var(--border)] pb-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--um-gold)]">
              PhD · 05
            </p>

            <h3 className="mt-2 text-2xl font-semibold">
              Incoming PhD Researchers
            </h3>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {incomingPhD.map((name, index) => (
              <Reveal
                key={name}
                delay={index * 45}
              >
                <article className="group relative h-full overflow-hidden border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:-translate-y-1 hover:border-[var(--um-blue)] hover:shadow-[var(--shadow-soft)]">
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-[var(--um-blue)]" />

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface-soft)] text-sm font-semibold text-[var(--um-blue)]">
                    {getInitials(name)}
                  </div>

                  <h4 className="mt-6 text-lg font-semibold leading-snug">
                    {name}
                  </h4>

                  <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--um-blue)]">
                    Incoming PhD Researcher
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          {/* MSC */}

          <div className="mt-14 border-b border-[var(--border)] pb-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--um-sky)]">
              MSc · 07
            </p>

            <h3 className="mt-2 text-2xl font-semibold">
              Incoming MSc Researchers
            </h3>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {incomingMSc.map((name, index) => (
              <Reveal
                key={name}
                delay={index * 40}
              >
                <article className="group relative h-full overflow-hidden border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:-translate-y-1 hover:border-[var(--um-sky)] hover:shadow-[var(--shadow-soft)]">
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-[var(--um-sky)]" />

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface-soft)] text-sm font-semibold text-[var(--um-blue)]">
                    {getInitials(name)}
                  </div>

                  <h4 className="mt-6 text-lg font-semibold leading-snug">
                    {name}
                  </h4>

                  <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--um-blue)]">
                    Incoming MSc Researcher
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

      <section className="bg-[var(--section-blue)] px-5 py-16 text-white md:px-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-[0.62fr_1.38fr]">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--um-gold)]">
                How We Work
              </p>

              <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                Research built around connection.
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {workingPrinciples.map((item) => (
              <div
                key={item.number}
                className="bg-[var(--section-blue)] p-6"
              >
                <p className="text-xs font-semibold text-[var(--um-gold)]">
                  {item.number}
                </p>

                <h3 className="mt-6 text-2xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/70">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* ROLES */}
      {/* ===================================================== */}

      <section className="px-5 py-16 md:px-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--um-blue)]">
              Research Roles
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Different stages.
              <br />
              One ecosystem.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {researchRoles.map((item, index) => (
              <article
                key={item.title}
                className="sensys-card p-5"
              >
                <span className="text-xs font-semibold text-[var(--um-gold)]">
                  0{index + 1}
                </span>

                <h3 className="mt-6 text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WORK WITH US */}

      <section className="bg-[var(--um-gold)] px-5 py-16 text-[#2A1710] md:px-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#4F2C1D]/70">
                  Work With Us
                </p>

                <h2 className="mt-4 text-5xl font-semibold tracking-[-0.05em] md:text-7xl">
                  Help build what comes next.
                </h2>
              </div>

              <div>
                <p className="text-base leading-8 text-[#4F2C1D]/85 md:text-lg">
                  We welcome expressions of interest from researchers working
                  across intelligent sensory systems and translational
                  technology development.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/join"
                    className="rounded-full bg-[#2A1710] px-6 py-3.5 text-sm font-semibold text-white"
                  >
                    View opportunities →
                  </Link>

                  <a
                    href="mailto:sanketgoel@gmail.com?subject=Interest%20in%20Joining%20SenSys%20Lab"
                    className="rounded-full border border-[#2A1710] px-6 py-3.5 text-sm font-semibold"
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