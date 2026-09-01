import Image from "next/image";
import Link from "next/link";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Reveal from "../../../components/Reveal";

const researchAreas = [
  {
    title: "Portable Sensing Systems",
    description:
      "Field-deployable analytical platforms integrating sensing, embedded hardware, signal conditioning, and portable user interfaces.",
  },
  {
    title: "Microfluidic Diagnostics",
    description:
      "Miniaturized fluidic platforms for pesticide monitoring, biochemical analysis, nucleic-acid workflows, and point-of-care applications.",
  },
  {
    title: "Multimodal Detection",
    description:
      "Combining optical, fluorescence, chemiluminescence, colorimetric, and electrochemical signals for robust analytical measurements.",
  },
  {
    title: "Wearable Sensing",
    description:
      "Textile and embroidered electrode systems for flexible, wearable, swipe-based, and body-compatible sensing applications.",
  },
  {
    title: "Food & Environmental Intelligence",
    description:
      "Portable sensing technologies for pesticide residues, soil nutrients, environmental monitoring, and food-quality assessment.",
  },
  {
    title: "Technology Translation",
    description:
      "Prototype development, validation, field-oriented engineering, proposal development, and translation of sensing concepts toward deployable systems.",
  },
];

const education = [
  {
    period: "2023 — 2026",
    degree: "Ph.D.",
    institution: "BITS Pilani, Hyderabad Campus",
    detail:
      "Thesis: Portable Smart Optical and Electrochemical Sensing Platforms for High-Precision Pesticide Monitoring",
  },
  {
    period: "2019 — 2021",
    degree: "M.Tech. · Chemical Engineering",
    institution: "National Institute of Technology Durgapur",
    detail: "CGPA: 8.92",
  },
  {
    period: "2015 — 2019",
    degree: "B.Tech. · Chemical Engineering",
    institution: "National Institute of Technology Arunachal Pradesh",
    detail: "CGPA: 7.75",
  },
];

const experience = [
  {
    period: "2026 —",
    role: "Postdoctoral Researcher",
    organisation: "SenSys Lab · University of Manitoba",
  },
  {
    period: "2025 — 2026",
    role: "Senior Research Fellow",
    organisation:
      "MEMS, Microfluidics & Nanoelectronics research programme",
  },
  {
    period: "2023 —",
    role: "Co-Founder",
    organisation: "Sensome Innovations Pvt. Ltd.",
  },
  {
    period: "2023 — 2024",
    role: "Junior Research Fellow",
    organisation:
      "MEMS, Microfluidics & Nanoelectronics research programme",
  },
];

const selectedPublications = [
  {
    year: "2026",
    title:
      "An automated portable dual-mode optical device for on-site detection and chemometrics-enhanced discrimination of pesticides",
    journal: "Microchemical Journal",
  },
  {
    year: "2026",
    title:
      "Machine-Embroidered Textile Electrodes: Parametric Engineering for Lab-on-Glove Electrochemical Pesticide Detection",
    journal: "Lab on a Chip",
  },
  {
    year: "2025",
    title:
      "Capillary Soil Nutrient Profiling Device: Pre-processing Free Approach for Rapid Soil Nutrient Assessment",
    journal: "IEEE Transactions on NanoBioscience",
  },
  {
    year: "2025",
    title:
      "A Portable Handheld Microfluidic Colorimetric Device for the Detection of Organophosphorus Pesticides",
    journal: "IEEE Sensors Journal",
  },
  {
    year: "2024",
    title:
      "Development of a Microfluidic Device for the Dual Detection and Quantification of Ammonia and Urea from Blood Serum",
    journal: "Sensors and Actuators A: Physical",
  },
  {
    year: "2024",
    title:
      "Nucleic Acid Purification through Nanoarchitectonics: Magnetic Bead Integration with Microfluidic Chip Technology",
    journal: "Journal of Micromechanics and Microengineering",
  },
];

const patents = [
  "Triple-Zone Independent Thermal Management System for Rapid and Stable On-Chip Polymerase Chain Reaction",
  "A Point of Care Device for Dual-Mode Ratiometric Colorimetric Sensing",
  "A Process of Fabrication of Textile-Based Sensors for Electrochemical and Physical Sensing",
  "Rapid and Quantitative Detection of TKX-50",
  "Fluorometric Device for Detection and Quantification of Cysteine from a Liquid Sample",
  "Dual-Mode Optical Detection Device for Pesticides",
  "Microfluidic Device for Dual Detection and Quantification of Ammonia and Urea in Blood Serum",
  "A Microfluidic Colorimetric Device and a Method of Manufacturing the Same",
];

const awards = [
  "ANRF International Travel Support · 2025",
  "BITS Pilani International Travel Award · 2025",
  "Best Paper Award · International Conference on Greener Technologies in Mechanical Engineering · 2025",
  "Best Paper Award · Network for Asian Open Research–BASF · 2023",
  "DST–NIDHI PRAYAS Grant · Prototype development · INR 9.5 lakh",
];

export default function KSDeepakPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />

      {/* ====================================================== */}
      {/* HERO */}
      {/* ====================================================== */}

      <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--background)] px-8 py-16 md:px-16 md:py-24">
        <div className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-[var(--um-sky)]/7 blur-3xl" />
        <div className="absolute left-1/3 top-24 h-64 w-64 rounded-full bg-[var(--um-blue)]/5 blur-3xl" />

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
                  src="/people/ks-deepak.jpg"
                  alt="K. S. Deepak"
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
                K. S.
                <br />
                Deepak
              </h1>

              <p className="mt-7 text-lg font-semibold text-[var(--um-blue)]">
                SenSys Lab · University of Manitoba
              </p>

              <p className="mt-8 max-w-2xl text-lg leading-9 text-[var(--foreground-soft)]">
                Researcher developing portable and intelligent sensing
                technologies for food safety, environmental monitoring, and
                point-of-care applications, with emphasis on microfluidics,
                multimodal sensing, wearable systems, and field-deployable
                instrumentation.
              </p>

              {/* VERIFIED PROFILE LINKS */}

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://scholar.google.com/citations?hl=en&user=LzxK0qkAAAAJ&view_op=list_works&sortby=pubdate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[var(--um-blue)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--um-blue-dark)]"
                >
                  Google Scholar ↗
                </a>

                <a
                  href="https://www.linkedin.com/in/ks-d/"
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

              {/* RESEARCH TAGS */}

              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  "Microfluidics",
                  "Portable Diagnostics",
                  "Pesticide Detection",
                  "Wearable Sensors",
                  "Optical Sensing",
                  "Electrochemical Sensing",
                  "Embedded Systems",
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
              Portable sensing from chemistry to complete device.
            </h2>

            <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
              Research spans analytical chemistry, device fabrication,
              microfluidic integration, electronics, data processing, and
              field-oriented validation to create complete sensing systems.
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
                  Research, translation,
                  <br />
                  and systems development.
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
              Engineering foundations across sensing and chemical systems.
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
                  Research across sensing modalities.
                </h2>
              </div>

              <div className="flex flex-wrap gap-5">
                <a
                  href="https://scholar.google.com/citations?hl=en&user=LzxK0qkAAAAJ&view_op=list_works&sortby=pubdate"
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
            {selectedPublications.map((publication) => (
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
      {/* PATENTS */}
      {/* ====================================================== */}

      <section className="bg-[var(--section-blue)] px-8 py-24 text-white md:px-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-gold)]">
              Innovation
            </p>

            <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Patented sensing and device concepts.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-px bg-white/15 md:grid-cols-2">
            {patents.map((patent, index) => (
              <Reveal
                key={patent}
                delay={index * 40}
              >
                <div className="flex h-full gap-4 bg-[var(--section-blue)] p-6">
                  <span className="text-xs font-semibold text-[var(--um-gold)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="text-sm leading-7 text-white/85">
                    {patent}
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
                  Awards & Grants
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
                  Recognition and research translation.
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
                  href="https://scholar.google.com/citations?hl=en&user=LzxK0qkAAAAJ&view_op=list_works&sortby=pubdate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[var(--um-blue)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--um-blue-dark)]"
                >
                  Google Scholar ↗
                </a>

                <a
                  href="https://www.linkedin.com/in/ks-d/"
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