import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";

import {
  featuredNews,
  sortedNewsItems,
} from "../../data/news";

export const metadata: Metadata = {
  title: {
    absolute: "News & Impact | SenSys Lab | University of Manitoba",
  },
  description:
    "Follow SenSys Lab news, research leadership, technology translation, awards, collaborations, recognition, public engagement, and societal impact connected to intelligent sensing research at the University of Manitoba.",
  alternates: {
    canonical: "https://sensys.ca/news",
  },
  openGraph: {
    title: "News & Impact | SenSys Lab | University of Manitoba",
    description:
      "Research, recognition, translation, collaboration, and impact from SenSys Lab and its wider research programme.",
    url: "https://sensys.ca/news",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "SenSys Lab News and Impact",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "News & Impact | SenSys Lab",
    description:
      "Research, recognition, technology translation, collaboration, and impact from SenSys Lab.",
    images: ["/opengraph-image.png"],
  },
};

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

export default function NewsPage() {
  const secondaryNews = sortedNewsItems.filter(
    (item) => item.id !== featuredNews?.id
  );

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--background)] px-5 py-16 md:px-16 md:py-24">
        <div className="pointer-events-none absolute -right-32 -top-36 h-[440px] w-[440px] rounded-full bg-[var(--um-blue)]/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-52 left-[18%] h-[360px] w-[360px] rounded-full bg-[var(--um-sky)]/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-[2px] w-10 bg-[var(--um-gold)]" />
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                News & Impact
              </p>
            </div>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
              <h1 className="text-6xl font-semibold leading-[0.88] tracking-[-0.055em] md:text-8xl">
                <span className="block">Research.</span>
                <span className="mt-1 block text-[var(--um-blue)]">
                  Recognition.
                </span>
                <span className="mt-1 block">Impact.</span>
              </h1>

              <div className="border-t border-[var(--border)] pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                <p className="max-w-xl text-lg leading-8">
                  Stories tracing research from scientific ideas and technology
                  development to recognition, collaboration, and real-world
                  impact.
                </p>

                <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--foreground-soft)]">
                  Follow developments connected to SenSys, research leadership,
                  technology translation, awards, public engagement, and the
                  wider research programme.
                </p>

                <div className="mt-7 flex gap-2">
                  <span className="h-1.5 w-12 rounded-full bg-[var(--um-blue)]" />
                  <span className="h-1.5 w-8 rounded-full bg-[var(--um-sky)]" />
                  <span className="h-1.5 w-6 rounded-full bg-[var(--um-gold)]" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LEAD STORY */}
      {featuredNews && (
        <section className="bg-[var(--surface-soft)] px-5 py-16 md:px-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--um-blue)]">
                    Lead Story
                  </p>
                  <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
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

            <Reveal delay={80}>
              <article className="mt-10 overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-soft)]">
                <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                  {featuredNews.image && (
                    <div className="group relative min-h-[360px] overflow-hidden bg-[var(--surface-muted)] md:min-h-[460px] lg:min-h-[540px]">
                      <Image
                        src={featuredNews.image}
                        alt={featuredNews.title}
                        fill
                        priority
                        className="object-cover transition duration-700 group-hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 52vw"
                      />

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#17263D]/25 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 h-[5px] w-full bg-gradient-to-r from-[#385E9D] via-[#00A3E0] to-[#F2A900]" />
                    </div>
                  )}

                  <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--um-blue)]">
                        {featuredNews.category}
                      </span>
                      <span className="text-[var(--foreground-muted)]">·</span>
                      <span className="text-xs text-[var(--foreground-muted)]">
                        {featuredNews.date}
                      </span>
                    </div>

                    <h3 className="mt-6 text-3xl font-semibold leading-tight tracking-[-0.035em] md:text-5xl">
                      {featuredNews.title}
                    </h3>

                    <p className="mt-6 text-base leading-8 text-[var(--foreground-soft)]">
                      {featuredNews.summary}
                    </p>

                    <a
                      href={featuredNews.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-[var(--um-blue)] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--um-blue-dark)]"
                    >
                      <span style={{ color: "#FFFFFF" }}>Read full story</span>
                      <span style={{ color: "#FFFFFF" }}>→</span>
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </section>
      )}

      {/* LATEST STORIES */}
      <section className="bg-[var(--background)] px-5 py-16 md:px-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-8 md:grid-cols-[0.62fr_1.38fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--um-blue)]">
                  Latest Stories
                </p>
              </div>

              <div>
                <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  Research, recognition,
                  <br />
                  and translation.
                </h2>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 border-y border-[var(--border)]">
            {secondaryNews.map((item, index) => (
              <Reveal key={item.id} delay={Math.min(index * 55, 220)}>
                <article className="group border-b border-[var(--border)] py-8 last:border-b-0 md:py-10">
                  <div className="grid gap-5 md:grid-cols-[0.12fr_0.23fr_1fr_0.12fr] md:items-start">
                    <span className="text-xs font-semibold text-[var(--um-gold)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--um-blue)]">
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
        </div>
      </section>

      {/* RESEARCH BEHIND THE HEADLINES */}
      <section className="bg-[var(--surface-soft)] px-5 py-16 md:px-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--um-blue)]">
                  Research Behind the Headlines
                </p>

                <h2 className="mt-4 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
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

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {researchContext.map((item, index) => (
              <Reveal key={item.title} delay={index * 80}>
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

      {/* IMPACT */}
      <section className="bg-[var(--section-blue)] px-5 py-16 text-white md:px-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[0.62fr_1.38fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--um-gold)]">
                  Impact
                </p>
              </div>

              <div>
                <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  Beyond publications.
                </h2>

                <p className="mt-6 max-w-3xl text-base leading-8 text-white/75">
                  Research impact can extend from scientific discovery and
                  device engineering to intellectual property, collaboration,
                  recognition, translation, and real-world deployment.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden bg-white/15 md:grid-cols-2 lg:grid-cols-4">
            {impactAreas.map((item, index) => (
              <Reveal key={item.number} delay={index * 70}>
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

                  <h3 className="mt-8 text-xl font-semibold text-white">
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

      {/* EXPLORE FURTHER */}
      <section className="bg-[var(--um-gold)] px-5 py-16 text-[#2A1710] md:px-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#4F2C1D]/70">
                  Explore Further
                </p>
              </div>

              <div>
                <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  Follow the research behind the impact.
                </h2>

                <div className="mt-9 grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      eyebrow: "Outputs",
                      title: "Publications",
                      text: "Explore the publication archive.",
                      href: "/publications",
                    },
                    {
                      eyebrow: "Innovation",
                      title: "Patents",
                      text: "Explore intellectual property.",
                      href: "/patents",
                    },
                    {
                      eyebrow: "Research",
                      title: "Research Areas",
                      text: "Explore SenSys research.",
                      href: "/research",
                    },
                  ].map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="group border border-[#2A1710]/25 bg-white/10 p-6 text-[#2A1710] transition hover:bg-[#2A1710] hover:text-white"
                    >
                      <p className="text-xs uppercase tracking-[0.2em] opacity-70">
                        {item.eyebrow}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold">
                        {item.title}
                      </h3>
                      <p className="mt-5 text-sm opacity-75">{item.text}</p>
                      <span className="mt-7 inline-block transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  ))}
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
