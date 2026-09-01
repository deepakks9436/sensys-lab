import Image from "next/image";
import Link from "next/link";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Reveal from "../../../components/Reveal";
import AnimatedCounter from "../../../components/AnimatedCounter";

const researchAreas = [
  {
    title: "Microsystems & Microfluidics",
    description:
      "Lab-on-chip systems, microfluidic platforms, integrated microsystems, microreactors, and miniaturized analytical technologies.",
  },
  {
    title: "Intelligent Diagnostics",
    description:
      "Point-of-care sensing systems integrating electrochemical, optical, electrochemiluminescent, and intelligent data-processing approaches.",
  },
  {
    title: "Advanced & Graphenic Materials",
    description:
      "Laser-induced graphene, reduced graphene oxide, flexible electrodes, nanocomposites, and functional materials for sensing and energy applications.",
  },
  {
    title: "Biointegrated Systems",
    description:
      "Wearable, flexible, implantable and body-integrated technologies for biosensing, physiological monitoring, and energy harvesting.",
  },
  {
    title: "Environmental Intelligence",
    description:
      "Portable sensing platforms for water quality, soil health, environmental contaminants, agricultural monitoring, and food safety.",
  },
  {
    title: "Energy Microsystems",
    description:
      "Miniaturized fuel cells, enzymatic and microbial biofuel cells, supercapacitors, and hybrid energy systems.",
  },
];

const career = [
  {
    period: "2026 —",
    title: "Eddie Goldenberg Research Chair of Canada",
    institution: "University of Manitoba · Canada",
  },
  {
    period: "2023 — 2026",
    title: "Head, Center for Research Excellence in Semiconductor Technology",
    institution: "BITS Pilani · India",
  },
  {
    period: "2022 — 2025",
    title: "Dean, Research & Innovation",
    institution: "BITS Pilani · India",
  },
  {
    period: "2015 — 2026",
    title: "Faculty, Electrical & Electronics Engineering",
    institution: "BITS Pilani, Hyderabad Campus · India",
  },
  {
    period: "2011 — 2015",
    title: "Head (R&D) & Associate Professor",
    institution: "UPES · India",
  },
  {
    period: "2008 — 2011",
    title: "Principal Investigator",
    institution:
      "A*STAR Genome Institute of Singapore & Institute of Microelectronics · Singapore",
  },
  {
    period: "2006 — 2008",
    title: "Postdoctoral Fellow",
    institution: "Stanford Genome Technology Center · USA",
  },
  {
    period: "2001 — 2006",
    title: "Ph.D. · Electrical & Computer Engineering",
    institution: "University of Alberta · Canada",
  },
];

const education = [
  {
    degree: "Ph.D.",
    field: "Electrical & Computer Engineering",
    institution: "University of Alberta, Canada",
    note: "Opto-biochips for Microcytometry · Microfluidics & Photonics",
  },
  {
    degree: "MBA",
    field: "Executive Management",
    institution: "Amity University, India",
    note: "2010–2012",
  },
  {
    degree: "M.Sc.",
    field: "Physics",
    institution: "Indian Institute of Technology Delhi, India",
    note: "1998–2000",
  },
  {
    degree: "B.Sc. (Hons.)",
    field: "Physics",
    institution: "Ramjas College, University of Delhi, India",
    note: "1995–1998",
  },
];

const honours = [
  "National Award for Teachers 2025 · Higher Education Category",
  "Technologist of the Year · IEEE India Council · 2025",
  "Technology Start-up Award · IEEE India Council · 2024",
  "Rasayan Vibhushan · Electrochemical Society of India · 2024",
  "Distinguished Lecturer · IEEE Sensors Council · 2024–2026",
  "Fellow · Institution of Electronics and Telecommunication Engineers",
  "JSPS Visiting Fellowship · Japan · 2021",
  "Dr. C. R. Mitra Best Faculty Award · 2021",
  "Fulbright-Nehru International Education Administrators Fellow · 2015",
  "DST/SERB Young Scientist Fast Track Award · 2013",
];

const translation = [
  {
    title: "Data Analytics & Coding",
    organisation: "Vital Probes Inc.",
    year: "2025",
  },
  {
    title: "Cardiac Biomarker Detection System",
    organisation: "TruEnergy Inc., USA",
    year: "2025",
  },
  {
    title: "Hematite-based Supercapacitors",
    organisation: "TruEnergy Inc., USA",
    year: "2025",
  },
  {
    title: "Flexible ECG Electrodes",
    organisation: "Vital Probes Inc.",
    year: "2024",
  },
  {
    title: "Natural Polymer-based Graphene",
    organisation: "Tata Steel",
    year: "2023",
  },
];

const selectedPublications = [
  {
    year: "2026",
    title:
      "Temperature-Compensated, IoT-Enabled Portable Ion-Selective Array Device for Multi-Parameter Measurements in Water Samples",
    journal: "IEEE Transactions on Instrumentation and Measurement",
  },
  {
    year: "2026",
    title:
      "Graphene Bio-Resistor: A Resistive Sensing Approach for the Detection of Myoglobin",
    journal: "IEEE Sensors Letters",
  },
  {
    year: "2026",
    title:
      "Embroidery-Integrated Silver Thread Biofuel Cells for Implantable Glucose Energy Harvesting From a Living Rat",
    journal: "IEEE Journal on Flexible Electronics",
  },
  {
    year: "2025",
    title:
      "Antimicrobial resistance detection: Rapid transition to point-of-care platforms",
    journal: "Microchemical Journal",
  },
  {
    year: "2025",
    title:
      "IoT integrated and deep learning assisted electrochemical sensor for multiplexed heavy metal sensing in water samples",
    journal: "npj Clean Water",
  },
  {
    year: "2022",
    title:
      "Lab-On-Chip Integrated Platform with Screen Printed Electrodes and Laser Induced Graphene Heater for Simultaneous Culture and Electrochemical Detection of Bacteria",
    journal: "iScience",
  },
];

const books = [
  "Micro Electromechanical Systems (MEMS): Practical Lab Manual · Wiley · 2025",
  "3D Printed Smart Sensors and Energy Harvesting Devices · IoP Publishing · 2024",
  "Droplet and Digital Microfluidics: Ideation to Implementation · Elsevier · 2024",
  "Miniaturized Electrochemical Devices · Taylor & Francis · 2023",
  "Microelectronics and Signal Processing · Taylor & Francis · 2021",
];

export default function SanketGoelPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />

      {/* ====================================================== */}
      {/* HERO */}
      {/* ====================================================== */}

      <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--background)] px-8 py-16 md:px-16 md:py-24">
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[var(--um-blue)]/8 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[var(--um-sky)]/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/people"
            className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--um-blue)]"
          >
            ← People
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <Reveal direction="left">
              <div className="relative aspect-[4/5] overflow-hidden border border-[var(--border)] bg-[var(--surface-soft)]">
                <Image
                  src="/people/sanket-goel.webp"
                  alt="Prof. Sanket Goel"
                  fill
                  priority
                  className="object-contain object-center"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />

                <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#14243a]/20 to-transparent" />
              </div>
            </Reveal>

            <Reveal direction="right">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--um-blue)]">
                Founder & Principal Investigator
              </p>

              <h1 className="mt-5 text-6xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-8xl">
                Sanket
                <br />
                Goel
              </h1>

              <p className="mt-7 text-lg font-semibold text-[var(--um-blue)] md:text-xl">
                Eddie Goldenberg Research Chair of Canada
              </p>

              <p className="mt-2 text-sm text-[var(--foreground-muted)]">
                University of Manitoba · Winnipeg, Canada
              </p>

              <p className="mt-8 max-w-2xl text-lg leading-9 text-[var(--foreground-soft)]">
                Prof. Sanket Goel is an interdisciplinary researcher working at
                the interface of microsystems, microfluidics, sensing,
                bioelectronics, advanced materials, intelligent
                instrumentation, environmental technologies, and translational
                engineering.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://scholar.google.com/citations?hl=en&user=xgH6FBkAAAAJ&view_op=list_works&sortby=pubdate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[var(--um-blue)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--um-blue-dark)]"
                >
                  Google Scholar ↗
                </a>

                <a
                  href="https://www.linkedin.com/in/sanketgoel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold transition hover:border-[var(--um-blue)] hover:text-[var(--um-blue)]"
                >
                  LinkedIn ↗
                </a>

                <a
                  href="mailto:sanketgoel@gmail.com"
                  className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold transition hover:border-[var(--um-blue)] hover:text-[var(--um-blue)]"
                >
                  Email
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* NUMBERS */}
      {/* ====================================================== */}

      <section className="bg-[var(--section-blue)] px-8 py-16 text-white md:px-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 md:grid-cols-4">
          {[
            { value: 319, label: "Publication Records" },
            { value: 98, label: "Patents" },
            { value: 44, label: "Sponsored Research Grants" },
            { value: 5, label: "Technologies Transferred / Licensed" },
          ].map((item, index) => (
            <Reveal key={item.label} delay={index * 80}>
              <AnimatedCounter
                value={item.value}
                minimumDigits={item.value === 5 ? 2 : 1}
                className="text-4xl font-semibold text-[var(--um-gold)] md:text-5xl"
              />

              <p className="mt-3 max-w-[160px] text-xs leading-5 text-white/75">
                {item.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ====================================================== */}
      {/* RESEARCH */}
      {/* ====================================================== */}

      <section className="bg-[var(--background)] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
              Research
            </p>

            <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Engineering complete sensing ecosystems.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] md:grid-cols-2 lg:grid-cols-3">
            {researchAreas.map((area, index) => (
              <Reveal key={area.title} delay={index * 60}>
                <div className="h-full bg-[var(--surface)] p-7 md:p-8">
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
      {/* CAREER */}
      {/* ====================================================== */}

      <section className="bg-[var(--surface-soft)] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Career
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
                  Research across continents.
                </h2>
              </div>

              <div className="border-t border-[var(--border)]">
                {career.map((item) => (
                  <div
                    key={`${item.period}-${item.title}`}
                    className="grid gap-3 border-b border-[var(--border)] py-6 md:grid-cols-[150px_1fr]"
                  >
                    <p className="text-xs font-semibold text-[var(--um-blue)]">
                      {item.period}
                    </p>

                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="mt-1 text-sm text-[var(--foreground-muted)]">
                        {item.institution}
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
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {education.map((item, index) => (
              <Reveal key={item.degree} delay={index * 70}>
                <div className="h-full border border-[var(--border)] bg-[var(--surface)] p-7">
                  <p className="text-3xl font-semibold text-[var(--um-gold)]">
                    {item.degree}
                  </p>

                  <p className="mt-4 font-semibold">{item.field}</p>

                  <p className="mt-2 text-sm text-[var(--foreground-soft)]">
                    {item.institution}
                  </p>

                  <p className="mt-3 text-xs leading-6 text-[var(--foreground-muted)]">
                    {item.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* TECHNOLOGY TRANSLATION */}
      {/* ====================================================== */}

      <section className="bg-[var(--surface-soft)] px-8 py-24 md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
              Technology Translation
            </p>

            <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Research designed to move beyond the laboratory.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {translation.map((item, index) => (
              <Reveal key={item.title} delay={index * 60}>
                <div className="h-full border border-[var(--border)] bg-[var(--surface)] p-6">
                  <p className="text-xs font-semibold text-[var(--um-gold)]">
                    {item.year}
                  </p>

                  <h3 className="mt-4 font-semibold leading-6">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-xs leading-5 text-[var(--foreground-muted)]">
                    {item.organisation}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* SELECTED PUBLICATIONS */}
      {/* ====================================================== */}

      <section className="bg-[var(--background)] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Selected Publications
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  Selected recent work.
                </h2>
              </div>

              <Link
                href="/publications"
                className="text-sm font-semibold text-[var(--um-blue)]"
              >
                Browse publication archive →
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 border-t border-[var(--border)]">
            {selectedPublications.map((publication) => (
              <div
                key={publication.title}
                className="grid gap-4 border-b border-[var(--border)] py-6 md:grid-cols-[90px_1fr_240px]"
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
      {/* HONOURS */}
      {/* ====================================================== */}

      <section className="bg-[var(--section-blue)] px-8 py-24 text-white md:px-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-gold)]">
              Awards & Distinctions
            </p>

            <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Recognition across research, innovation, and academic leadership.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden bg-white/15 md:grid-cols-2">
            {honours.map((honour, index) => (
              <Reveal key={honour} delay={index * 40}>
                <div className="h-full bg-[var(--section-blue)] p-6">
                  <div className="flex gap-4">
                    <span className="text-xs font-semibold text-[var(--um-gold)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="text-sm leading-7 text-white/85">
                      {honour}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* BOOKS */}
      {/* ====================================================== */}

      <section className="bg-[var(--background)] px-8 py-24 md:px-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[0.6fr_1.4fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Books
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
                  Research to reference.
                </h2>

                <Link
                  href="/books"
                  className="mt-7 inline-block text-sm font-semibold text-[var(--um-blue)]"
                >
                  Explore books →
                </Link>
              </div>

              <div className="border-t border-[var(--border)]">
                {books.map((book, index) => (
                  <div
                    key={book}
                    className="flex gap-5 border-b border-[var(--border)] py-5"
                  >
                    <span className="text-xs font-semibold text-[var(--um-gold)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="text-sm leading-7 text-[var(--foreground-soft)]">
                      {book}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================================================== */}
      {/* CTA */}
      {/* ====================================================== */}

      <section className="bg-[var(--surface-soft)] px-8 py-20 md:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--um-blue)]">
              SenSys Lab
            </p>

            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
              Explore the team and research programme.
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/people"
              className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold transition hover:border-[var(--um-blue)] hover:text-[var(--um-blue)]"
            >
              People →
            </Link>

            <Link
              href="/research"
              className="rounded-full bg-[var(--um-blue)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--um-blue-dark)]"
            >
              Research →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}