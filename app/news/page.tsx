import Image from "next/image";
import Link from "next/link";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";

import {
  featuredNews,
  sortedNewsItems,
} from "../../data/news";

/* ============================================================
   IMPACT AREAS
============================================================ */

const impactAreas = [
  {
    number: "01",
    title: "Research Leadership",
    text:
      "Building interdisciplinary research programmes across intelligent sensing, microsystems, diagnostics, biointegrated systems, and environmental technologies.",
  },
  {
    number: "02",
    title: "Technology Translation",
    text:
      "Connecting research with deployable technologies, intellectual property, industrial collaboration, licensing, and practical implementation.",
  },
  {
    number: "03",
    title: "Recognition",
    text:
      "Recognition for contributions across technology, teaching, research, innovation, and engineering leadership.",
  },
  {
    number: "04",
    title: "Societal Impact",
    text:
      "Developing technologies relevant to healthcare, agriculture, environmental monitoring, food safety, diagnostics, and resilient communities.",
  },
];

/* ============================================================
   RESEARCH CONTEXT
============================================================ */

const researchContext = [
  {
    title: "Intelligent Microsystems",
    image: "/research/thrusts/intelligent-microsystems.png",
    href: "/research#intelligent-microsystems",
    text:
      "Integrated microfluidics, sensing, electronics, and microscale system engineering.",
  },
  {
    title: "Intelligent Diagnostics",
    image: "/research/thrusts/intelligent-diagnostics.jpg",
    href: "/research#intelligent-diagnostics",
    text:
      "Portable biosensing, point-of-care diagnostics, connected analysis, and intelligent instrumentation.",
  },
  {
    title: "Agri & Environmental Intelligence",
    image: "/research/thrusts/agri-environmental-intelligence.jpg",
    href: "/research#agri-environment",
    text:
      "Field-ready sensing for food safety, pesticides, water, soil, and environmental decision-making.",
  },
];

/* ============================================================
   PAGE
============================================================ */

export default function NewsPage() {
  const secondaryNews = sortedNewsItems.filter(
    (item) => item.id !== featuredNews?.id
  );

  const visualNews = secondaryNews.filter((item) => item.image);
  const textNews = secondaryNews.filter((item) => !item.image);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />

      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <section className="relative overflow-hidden bg-[var(--background)] px-8 py-24 md:px-16 md:py-32">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[var(--um-blue)]/10 blur-[120px]" />

        <div className="pointer-events-none absolute bottom-[-180px] left-[15%] h-[380px] w-[380px] rounded-full bg-[var(--um-sky)]/8 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <div className="flex items-center gap-4">
              <div className="h-[2px] w-10 bg-[var(--um-gold)]" />

              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                News & Impact
              </p>
            </div>

            <h1 className="mt-8 max-w-6xl text-6xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-8xl">
              Research.
              <br />

              <span className="text-[var(--um-blue)]">
                Recognition.
              </span>

              <br />
              Impact.
            </h1>

            <div className="mt-12 grid gap-10 border-t border-[var(--border)] pt-10 md:grid-cols-[1.05fr_0.95fr]">
              <p className="max-w-3xl text-xl leading-9">
                Stories tracing research from scientific ideas and technology
                development to recognition, collaboration, and real-world
                impact.
              </p>

              <p className="max-w-2xl text-base leading-8 text-[var(--foreground-soft)]">
                Follow developments connected to SenSys, research leadership,
                technology translation, awards, public engagement, and the
                wider research programme.
              </p>
            </div>

            <div className="mt-10 flex gap-2">
              <span className="h-1.5 w-12 rounded-full bg-[var(--um-blue)]" />
              <span className="h-1.5 w-8 rounded-full bg-[var(--um-sky)]" />
              <span className="h-1.5 w-6 rounded-full bg-[var(--um-gold)]" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* LEAD STORY */}
      {/* ===================================================== */}

      {featuredNews && (
        <section className="bg-[var(--surface-soft)] px-8 py-24 md:px-16 md:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                    Lead Story
                  </p>

                  <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                    A new chapter.
                  </h2>
                </div>

                {featuredNews.source && (
                  <p className="text-xs text-[var(--foreground-muted)]">
                    Source · {featuredNews.source}
                  </p>
                )}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <article className="mt-12 overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-soft)]">
                <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                  {featuredNews.image && (
                    <div className="group relative min-h-[430px] overflow-hidden bg-[var(--surface-muted)] lg:min-h-[620px]">
                      <Image
                        src={featuredNews.image}
                        alt={featuredNews.title}
                        fill
                        priority
                        className="object-cover transition duration-700 group-hover:scale-[1.025]"
                        sizes="(max-width: 1024px) 100vw, 55vw"
                      />

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#17263D]/35 via-transparent to-transparent" />

                      <div className="absolute bottom-0 left-0 h-[6px] w-full bg-gradient-to-r from-[#385E9D] via-[#00A3E0] to-[#F2A900]" />
                    </div>
                  )}

                  <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--um-blue)]">
                        {featuredNews.category}
                      </span>

                      <span className="text-[var(--foreground-muted)]">
                        ·
                      </span>

                      <span className="text-xs text-[var(--foreground-muted)]">
                        {featuredNews.date}
                      </span>
                    </div>

                    <h3 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
                      {featuredNews.title}
                    </h3>

                    <p className="mt-7 text-base leading-8 text-[var(--foreground-soft)]">
                      {featuredNews.summary}
                    </p>

                    <div className="mt-9">
                      <a
                        href={featuredNews.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 rounded-full bg-[var(--um-blue)] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--um-blue-dark)]"
                      >
                        Read full story

                        <span className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </section>
      )}

      {/* ===================================================== */}
      {/* MANITOBA RESEARCH CONTEXT */}
      {/* ===================================================== */}

      <section className="bg-[var(--background)] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 md:grid-cols-[0.62fr_1.38fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Research Leadership
                </p>
              </div>

              <div>
                <h2 className="max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                  A major new chapter for research at Manitoba.
                </h2>

                <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
                  The University of Manitoba&apos;s five Eddie Goldenberg
                  Research Chairs are part of the Canada Global Impact+
                  Research Initiative and support ambitious programmes in
                  strategically important areas of research.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                value: "$79M",
                title: "Total UM Investment",
                text:
                  "Combined investment supporting the new research ecosystem.",
                colour: "text-[var(--um-gold)]",
              },
              {
                value: "05",
                title: "Research Chairs",
                text:
                  "Five Eddie Goldenberg Research Chairs joining the University of Manitoba.",
                colour: "text-[var(--um-blue)]",
              },
              {
                value: "$1M",
                title: "Annual Chair Support",
                text:
                  "Per Chair per year for the initial eight-year term.",
                colour: "text-[var(--um-sky)]",
              },
              {
                value: "$4M",
                title: "CFI Infrastructure",
                text:
                  "Infrastructure funding allocated to each Chair.",
                colour: "text-[var(--um-blue)]",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <div className="h-full bg-[var(--surface)] p-7">
                  <p
                    className={`text-4xl font-semibold ${item.colour}`}
                  >
                    {item.value}
                  </p>

                  <p className="mt-4 text-sm font-semibold">
                    {item.title}
                  </p>

                  <p className="mt-3 text-xs leading-6 text-[var(--foreground-soft)]">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* LATEST STORIES */}
      {/* ===================================================== */}

      <section className="bg-[var(--surface-soft)] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 md:grid-cols-[0.62fr_1.38fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Latest Stories
                </p>
              </div>

              <div>
                <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  Research, recognition,
                  <br />
                  and translation.
                </h2>

                <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
                  Selected developments from research, awards, technology
                  translation, and public engagement.
                </p>
              </div>
            </div>
          </Reveal>

          {/* STORIES WITH IMAGES */}

          {visualNews.length > 0 && (
            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              {visualNews.map((item, index) => (
                <Reveal
                  key={item.id}
                  delay={index * 80}
                >
                  <article className="group h-full overflow-hidden border border-[var(--border)] bg-[var(--surface)] transition duration-300 hover:-translate-y-1 hover:border-[var(--um-blue)] hover:shadow-[var(--shadow-medium)]">
                    <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface-muted)]">
                      <Image
                        src={item.image!}
                        alt={item.title}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-[1.035]"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />

                      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#17263D]/55 to-transparent" />

                      <div className="absolute bottom-5 left-5 rounded-full bg-[#17263D]/85 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                        {item.category}
                      </div>
                    </div>

                    <div className="p-7 md:p-8">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs text-[var(--foreground-muted)]">
                          {item.date}
                        </span>

                        {item.source && (
                          <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--foreground-muted)]">
                            {item.source}
                          </span>
                        )}
                      </div>

                      <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.025em] md:text-3xl">
                        {item.title}
                      </h3>

                      <p className="mt-5 text-sm leading-7 text-[var(--foreground-soft)]">
                        {item.summary}
                      </p>

                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-7 inline-flex text-sm font-semibold text-[var(--um-blue)] transition hover:text-[var(--um-sky)]"
                      >
                        Read story →
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}

          {/* EDITORIAL TEXT STORIES */}

          {textNews.length > 0 && (
            <div className={`${visualNews.length > 0 ? "mt-8" : "mt-14"} border-y border-[var(--border)]`}>
              {textNews.map((item, index) => (
                <Reveal
                  key={item.id}
                  delay={index * 60}
                >
                  <article className="group border-b border-[var(--border)] py-9 last:border-b-0 md:py-11">
                    <div className="grid gap-7 md:grid-cols-[0.14fr_0.22fr_1fr_0.14fr] md:items-start">
                      <div>
                        <span className="text-xs font-semibold text-[var(--um-gold)]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--um-blue)]">
                          {item.category}
                        </p>

                        <p className="mt-2 text-xs text-[var(--foreground-muted)]">
                          {item.date}
                        </p>
                      </div>

                      <div>
                        <h3 className="max-w-3xl text-2xl font-semibold leading-tight tracking-[-0.025em] transition group-hover:text-[var(--um-blue)] md:text-3xl">
                          {item.title}
                        </h3>

                        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--foreground-soft)]">
                          {item.summary}
                        </p>

                        {item.source && (
                          <p className="mt-4 text-[10px] uppercase tracking-[0.15em] text-[var(--foreground-muted)]">
                            Source · {item.source}
                          </p>
                        )}
                      </div>

                      <div className="md:text-right">
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Read ${item.title}`}
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-strong)] text-[var(--um-blue)] transition group-hover:border-[var(--um-blue)] group-hover:bg-[var(--um-blue)] group-hover:text-white"
                        >
                          ↗
                        </a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}

          {secondaryNews.length === 0 && (
            <div className="mt-14 border border-[var(--border)] bg-[var(--surface)] p-8">
              <p className="text-sm text-[var(--foreground-soft)]">
                More research news and impact stories will appear here as they
                are added.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ===================================================== */}
      {/* RESEARCH BEHIND THE HEADLINES */}
      {/* ===================================================== */}

      <section className="bg-[var(--background)] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Research Behind the Headlines
                </p>

                <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  Explore the science behind the stories.
                </h2>
              </div>

              <Link
                href="/research"
                className="w-fit text-sm font-semibold text-[var(--um-blue)] transition hover:text-[var(--um-sky)]"
              >
                All research →
              </Link>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {researchContext.map((item, index) => (
              <Reveal key={item.title} delay={index * 90}>
                <Link
                  href={item.href}
                  className="group block h-full overflow-hidden border border-[var(--border)] bg-[var(--surface)] transition duration-300 hover:-translate-y-1 hover:border-[var(--um-blue)] hover:shadow-[var(--shadow-soft)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-white">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-5 transition duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />

                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#17263D]/35 to-transparent" />
                  </div>

                  <div className="p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--um-blue)]">
                      SenSys Research
                    </p>

                    <h3 className="mt-3 text-2xl font-semibold">
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
      {/* IMPACT */}
      {/* ===================================================== */}

      <section className="bg-[var(--section-blue)] px-8 py-24 text-white md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-gold)]">
                  Impact
                </p>
              </div>

              <div>
                <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  Beyond publications.
                </h2>

                <p className="mt-7 max-w-3xl text-base leading-8 text-white/75">
                  Research impact can extend from scientific discovery and
                  device engineering to intellectual property, collaboration,
                  recognition, translation, and real-world deployment.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden bg-white/15 md:grid-cols-2 lg:grid-cols-4">
            {impactAreas.map((item, index) => (
              <Reveal
                key={item.number}
                delay={index * 80}
              >
                <div className="h-full bg-[var(--section-blue)] p-7">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[var(--um-gold)]">
                      {item.number}
                    </span>

                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        index % 2 === 0
                          ? "bg-[var(--um-sky)]"
                          : "bg-[var(--um-gold)]"
                      }`}
                    />
                  </div>

                  <h3 className="mt-8 text-xl font-semibold">
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
      {/* EXPLORE FURTHER */}
      {/* ===================================================== */}

      <section className="bg-[var(--um-gold)] px-8 py-24 text-[#2A1710] md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#4F2C1D]/70">
                  Explore Further
                </p>
              </div>

              <div>
                <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  Follow the research behind the impact.
                </h2>

                <div className="mt-10 grid gap-3 sm:grid-cols-3">
                  <Link
                    href="/publications"
                    className="group border border-[#2A1710]/25 bg-white/10 p-6 transition hover:bg-[#2A1710] hover:text-white"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] opacity-70">
                      Outputs
                    </p>

                    <h3 className="mt-3 text-xl font-semibold">
                      Publications
                    </h3>

                    <p className="mt-5 text-sm opacity-70">
                      Explore the publication archive.
                    </p>

                    <span className="mt-7 inline-block transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>

                  <Link
                    href="/patents"
                    className="group border border-[#2A1710]/25 bg-white/10 p-6 transition hover:bg-[#2A1710] hover:text-white"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] opacity-70">
                      Innovation
                    </p>

                    <h3 className="mt-3 text-xl font-semibold">
                      Patents
                    </h3>

                    <p className="mt-5 text-sm opacity-70">
                      Explore intellectual property.
                    </p>

                    <span className="mt-7 inline-block transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>

                  <Link
                    href="/research"
                    className="group border border-[#2A1710]/25 bg-white/10 p-6 transition hover:bg-[#2A1710] hover:text-white"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] opacity-70">
                      Research
                    </p>

                    <h3 className="mt-3 text-xl font-semibold">
                      Research Areas
                    </h3>

                    <p className="mt-5 text-sm opacity-70">
                      Explore SenSys research.
                    </p>

                    <span className="mt-7 inline-block transition-transform group-hover:translate-x-1">
                      →
                    </span>
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