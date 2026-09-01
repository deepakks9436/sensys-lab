import Image from "next/image";
import Link from "next/link";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Reveal from "../../../components/Reveal";

const researchAreas = [
  {
    title: "Electrochemical Biosensors",
    description:
      "Development and characterization of electrochemical interfaces for sensitive biochemical and biomarker detection.",
  },
  {
    title: "Multiplexed Diagnostics",
    description:
      "Portable analytical systems capable of simultaneously processing and detecting multiple biomarkers.",
  },
  {
    title: "Flexible & Printed Electrodes",
    description:
      "Thin-film, screen-printed, laser-patterned, flexible, and 3D-printed electrode architectures.",
  },
  {
    title: "Microfluidic Integration",
    description:
      "Microfluidic reservoirs, channels, miniaturized devices, and integrated electrochemical sensing workflows.",
  },
  {
    title: "Portable Instrumentation",
    description:
      "Potentiostat-based analytical systems, readout circuitry, user interfaces, wireless monitoring, and IoT-enabled sensing.",
  },
  {
    title: "Biomedical Microsystems",
    description:
      "Point-of-care systems for cardiac, renal, metabolic, and other clinically relevant biomarkers.",
  },
];

const education = [
  {
    period: "2023 — 2026",
    degree: "Ph.D.",
    institution: "BITS Pilani, Hyderabad Campus",
    detail: "MEMS, Microfluidics & Nanoelectronics",
  },
  {
    period: "2020 — 2022",
    degree: "M.Tech. · Micro & Nano Electronics",
    institution: "College of Engineering Trivandrum",
    detail:
      "CGPA: 9.69 · First position in KTU Trivandrum Cluster",
  },
  {
    period: "2016 — 2020",
    degree: "B.Tech. · Electronics & Communication Engineering",
    institution: "Government Engineering College Barton Hill",
    detail: "CGPA: 9.81 · Third rank in KTU",
  },
];

const experience = [
  {
    period: "2026 —",
    role: "Postdoctoral Researcher",
    organisation: "SenSys Lab · University of Manitoba",
  },
  {
    period: "2023 — 2026",
    role: "Ph.D. Researcher",
    organisation:
      "MEMS, Microfluidics & Nanoelectronics research programme",
  },
  {
    period: "2024 — 2026",
    role: "Co-Director",
    organisation: "Pyrome Innovations",
  },
  {
    period: "2022 — 2023",
    role: "Assistant Professor",
    organisation: "Government Engineering College Kozhikode",
  },
  {
    period: "2021 — 2022",
    role: "Intern",
    organisation: "Bosch",
  },
];

const publications = [
  {
    year: "2026",
    title:
      "Dual-interface IoT-enabled portable electrochemical platform for multiplexed detection of renal biomarkers",
    journal: "Electrochimica Acta",
  },
  {
    year: "2026",
    title:
      "Real-time Dual Sensing of cTnI and Myoglobin via Printable Graphitized Electrodes",
    journal: "IEEE Transactions on NanoBioscience",
  },
  {
    year: "2025",
    title:
      "Integrated and Turnkey Custom-Built Multiplexed Portable Platform for On-Site Electrochemical Detection",
    journal: "Lab on a Chip",
  },
  {
    year: "2025",
    title:
      "Physical vapor deposition of gold electrodes on flexible and inflexible substrates for electrochemical applications",
    journal: "Chemical Engineering Journal",
  },
  {
    year: "2024",
    title:
      "Gold/Cerium(IV) Oxide-Modified Flexible Electrodes for Enzymatic Detection of Triglyceride",
    journal: "IEEE Sensors Letters",
  },
  {
    year: "2024",
    title:
      "Microfluidic Reservoir Integrated with Optimized Screen-Printed Electrode for Simultaneous Detection of Ascorbic Acid and L-Cysteine",
    journal: "Journal of Micromechanics and Microengineering",
  },
  {
    year: "2024",
    title:
      "3D Printed Interdigitated Electrodes for Cardiac Biomarker Detection",
    journal: "IEEE Transactions on NanoBioscience",
  },
];

const innovations = [
  "A Mobile-Accessible Multiplexed Electrochemical Processing System",
  "Device and Method of Multi-Technique Electrochemical Detection with an Integrated Multimode User Interface",
  "Miniaturized 3D-Printed Interdigitated Two-Electrode System for Biomarker Detection",
  "A Hybrid Nanomaterial Ink",
  "A Continuous-Flow Flexible Photocatalytic Fuel Cell",
  "Immunosensor for Electrochemical Detection of Cardiac Troponin I",
  "System for Detecting a Cardiac Biomarker",
  "Software for Portable Potentiostat to Perform Voltammetric Analysis",
  "µBIOPOT analytical platform",
];

const awards = [
  "Best Poster Award · IEEE EMBS BNM Conference · Hong Kong",
  "Best Poster Award · Indian Semiconductors & Packaging Ecosystem Conference",
  "Runner-up · IEEE APSCON Startup Challenge",
  "Top 10 Finalist · Silicon Labs Edge Intelligence Challenge 2026",
  "Runner-up Poster Award · Academia-Industry Synergy in Semiconductor Advancements",
  "First position · M.Tech. Micro and Nano Electronics · KTU Trivandrum Cluster",
  "Third rank · B.Tech. Electronics and Communication Engineering · KTU",
];

export default function ParvathyNairPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />

      {/* ====================================================== */}
      {/* HERO */}
      {/* ====================================================== */}

      <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--background)] px-8 py-16 md:px-16 md:py-24">
        <div className="absolute right-10 top-10 h-96 w-96 rounded-full bg-[var(--um-blue)]/8 blur-3xl" />
        <div className="absolute bottom-0 left-[35%] h-64 w-64 rounded-full bg-[var(--um-sky)]/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/people"
            className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--um-blue)] transition hover:text-[var(--um-sky)]"
          >
            ← People
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
            <Reveal direction="left">
              <div className="relative aspect-[4/5] overflow-hidden border border-[var(--border)] bg-[var(--surface-soft)]">
                <Image
                  src="/people/parvathy-nair.jpg"
                  alt="Parvathy Nair"
                  fill
                  priority
                  className="object-contain object-center p-5"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />

                <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#263F67]/15 to-transparent" />
              </div>
            </Reveal>

            <Reveal direction="right">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--um-blue)]">
                Postdoctoral Researcher
              </p>

              <h1 className="mt-5 text-6xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-8xl">
                Parvathy
                <br />
                Nair
              </h1>

              <p className="mt-7 text-lg font-semibold text-[var(--um-blue)]">
                SenSys Lab · University of Manitoba
              </p>

              <p className="mt-8 max-w-2xl text-lg leading-9 text-[var(--foreground-soft)]">
                Researcher working on electrochemical biosensing,
                microfabricated and printed electrode systems, integrated
                microfluidics, multiplexed biomarker analysis, portable
                potentiostat platforms, and point-of-care instrumentation.
              </p>

              {/* VERIFIED PROFILE LINKS */}

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://scholar.google.com/citations?hl=en&user=LtYm2xoAAAAJ&view_op=list_works&sortby=pubdate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[var(--um-blue)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--um-blue-dark)]"
                >
                  Google Scholar ↗
                </a>

                <a
                  href="https://www.linkedin.com/in/parvathy-nair-0b2814257/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold transition hover:border-[var(--um-blue)] hover:text-[var(--um-blue)]"
                >
                  LinkedIn ↗
                </a>

                <Link
                  href="/publications"
                  className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold transition hover:border-[var(--um-blue)] hover:text-[var(--um-blue)]"
                >
                  Publications
                </Link>
              </div>

              {/* TAGS */}

              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  "Electrochemical Biosensors",
                  "Microfluidics",
                  "Flexible Electronics",
                  "Printed Electrodes",
                  "Portable Potentiostats",
                  "Biomarker Detection",
                  "Point-of-Care Systems",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-xs text-[var(--foreground-soft)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* RESEARCH */}
      {/* ====================================================== */}

      <section className="bg-[var(--background)] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
              Research Focus
            </p>

            <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Integrating electrodes, electronics, and diagnostics.
            </h2>

            <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
              Research connects electrode engineering and electrochemical
              measurement with microfluidics, electronics, portable
              instrumentation, and multiplexed analytical systems.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {researchAreas.map((area, index) => (
              <Reveal key={area.title} delay={index * 60}>
                <div className="h-full border border-[var(--border)] bg-[var(--surface)] p-7 transition hover:-translate-y-1 hover:border-[var(--um-blue)] hover:shadow-[var(--shadow-soft)]">
                  <span className="text-xs font-semibold text-[var(--um-gold)]">
                    0{index + 1}
                  </span>

                  <h3 className="mt-5 text-xl font-semibold">
                    {area.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)]">
                    {area.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* EXPERIENCE */}
      {/* ====================================================== */}

      <section className="bg-[var(--surface-soft)] px-8 py-24 md:px-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Experience
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
                  Devices, instrumentation,
                  <br />
                  and translation.
                </h2>
              </div>

              <div className="border-t border-[var(--border)]">
                {experience.map((item) => (
                  <div
                    key={`${item.period}-${item.role}`}
                    className="grid gap-3 border-b border-[var(--border)] py-6 md:grid-cols-[120px_1fr]"
                  >
                    <p className="text-xs font-semibold text-[var(--um-blue)]">
                      {item.period}
                    </p>

                    <div>
                      <p className="font-semibold">
                        {item.role}
                      </p>

                      <p className="mt-1 text-sm text-[var(--foreground-muted)]">
                        {item.organisation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================================================== */}
      {/* EDUCATION */}
      {/* ====================================================== */}

      <section className="bg-[var(--background)] px-8 py-24 md:px-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
              Education
            </p>

            <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
              Electronics, micro-nano engineering, and sensing.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {education.map((item, index) => (
              <Reveal key={item.degree} delay={index * 80}>
                <div className="h-full border border-[var(--border)] bg-[var(--surface)] p-7">
                  <p className="text-xs font-semibold text-[var(--um-gold)]">
                    {item.period}
                  </p>

                  <h3 className="mt-4 text-xl font-semibold">
                    {item.degree}
                  </h3>

                  <p className="mt-3 text-sm text-[var(--foreground-soft)]">
                    {item.institution}
                  </p>

                  <p className="mt-4 text-xs leading-6 text-[var(--foreground-muted)]">
                    {item.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* PUBLICATIONS */}
      {/* ====================================================== */}

      <section className="bg-[var(--surface-soft)] px-8 py-24 md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Selected Publications
                </p>

                <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  Multiplexed and portable electrochemical systems.
                </h2>
              </div>

              <div className="flex flex-wrap gap-5">
                <a
                  href="https://scholar.google.com/citations?hl=en&user=LtYm2xoAAAAJ&view_op=list_works&sortby=pubdate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-[var(--um-blue)] transition hover:text-[var(--um-sky)]"
                >
                  Google Scholar ↗
                </a>

                <Link
                  href="/publications"
                  className="text-sm font-semibold text-[var(--um-blue)] transition hover:text-[var(--um-sky)]"
                >
                  Publication archive →
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 border-t border-[var(--border)]">
            {publications.map((publication) => (
              <div
                key={publication.title}
                className="grid gap-4 border-b border-[var(--border)] py-6 md:grid-cols-[80px_1fr_220px]"
              >
                <p className="text-xs font-semibold text-[var(--um-gold)]">
                  {publication.year}
                </p>

                <p className="font-semibold leading-7">
                  {publication.title}
                </p>

                <p className="text-sm text-[var(--foreground-muted)]">
                  {publication.journal}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* INNOVATION */}
      {/* ====================================================== */}

      <section className="bg-[var(--section-blue)] px-8 py-24 text-white md:px-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-gold)]">
              Intellectual Property & Systems
            </p>

            <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Translating sensing into integrated platforms.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-px bg-white/15 md:grid-cols-2">
            {innovations.map((item, index) => (
              <Reveal
                key={item}
                delay={index * 40}
              >
                <div className="flex h-full gap-4 bg-[var(--section-blue)] p-6">
                  <span className="text-xs font-semibold text-[var(--um-gold)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="text-sm leading-7 text-white/85">
                    {item}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* AWARDS */}
      {/* ====================================================== */}

      <section className="bg-[var(--background)] px-8 py-24 md:px-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Awards & Achievements
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
                  Academic and innovation recognition.
                </h2>
              </div>

              <div className="border-t border-[var(--border)]">
                {awards.map((award, index) => (
                  <div
                    key={award}
                    className="flex gap-5 border-b border-[var(--border)] py-5"
                  >
                    <span className="text-xs font-semibold text-[var(--um-gold)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="text-sm leading-7 text-[var(--foreground-soft)]">
                      {award}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================================================== */}
      {/* PROFILE LINKS */}
      {/* ====================================================== */}

      <section className="bg-[var(--surface-soft)] px-8 py-20 md:px-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--um-blue)]">
                  Research Profile
                </p>

                <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
                  Explore research outputs and professional profile.
                </h2>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://scholar.google.com/citations?hl=en&user=LtYm2xoAAAAJ&view_op=list_works&sortby=pubdate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[var(--um-blue)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--um-blue-dark)]"
                >
                  Google Scholar ↗
                </a>

                <a
                  href="https://www.linkedin.com/in/parvathy-nair-0b2814257/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold transition hover:border-[var(--um-blue)] hover:text-[var(--um-blue)]"
                >
                  LinkedIn ↗
                </a>

                <Link
                  href="/people"
                  className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold transition hover:border-[var(--um-blue)] hover:text-[var(--um-blue)]"
                >
                  Team →
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