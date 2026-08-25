import Navbar from "../../components/Navbar";

const newsItems = [
  {
    type: "Award",
    date: "2025",
    title: "Prof. Sanket Goel receives the National Award for Teachers 2025",
    text: "Prof. Sanket Goel was recognized in the Higher Education category for his contributions to teaching, research, innovation, and technology development.",
    tag: "Recognition",
  },
  {
    type: "Award",
    date: "2025",
    title: "IEEE India Council Technologist of the Year 2025",
    text: "Prof. Goel received the IEEE India Council Technologist of the Year recognition for contributions to technology development and translational research.",
    tag: "IEEE",
  },
  {
    type: "Publication",
    date: "2026",
    title: "Portable dual-mode optical platform advances pesticide sensing",
    text: "A new Microchemical Journal study reports an automated portable optical device for on-site pesticide detection with chemometrics-enabled discrimination.",
    tag: "Food Safety",
    link: "https://doi.org/10.1016/j.microc.2026.118355",
  },
  {
    type: "Publication",
    date: "2026",
    title: "IoT-enabled platform enables multiparameter water-quality monitoring",
    text: "A temperature-compensated portable ion-selective array was developed for real-time multiparameter measurements in water samples.",
    tag: "Environment",
    link: "https://doi.org/10.1109/TIM.2026.3677997",
  },
  {
    type: "Publication",
    date: "2026",
    title: "Embroidery-integrated biofuel cells demonstrated for bioenergy harvesting",
    text: "New work in IEEE Journal on Flexible Electronics demonstrates silver-thread biofuel cells integrated through embroidery for glucose-based energy harvesting.",
    tag: "Wearable Bioenergy",
    link: "https://doi.org/10.1109/JFLEX.2026.3656478",
  },
  {
    type: "Publication",
    date: "2026",
    title: "Flexible laser-induced graphene electrodes advance point-of-care sensing",
    text: "Nanocarbon-hybrid laser-induced graphene electrodes were developed for flexible electrochemical urea detection in point-of-care applications.",
    tag: "Point-of-Care",
    link: "https://doi.org/10.1016/j.sna.2026.117532",
  },
];

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <Navbar />

      {/* HERO */}
      <section className="px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#ffb71b]">
            News
          </p>

          <h1 className="mt-6 max-w-6xl text-6xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-8xl">
            Ideas, people,
            <br />
            progress.
          </h1>

          <p className="mt-10 max-w-3xl text-xl leading-9 text-neutral-300">
            Research highlights, publications, awards, collaborations,
            technology development, and updates from SenSys.
          </p>
        </div>
      </section>

      {/* NEWS */}
      <section className="bg-[#f3f1eb] px-8 py-24 text-black md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-8 border-b border-neutral-300 pb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-neutral-500">
                Latest
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
                From SenSys
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                "All",
                "Publications",
                "Awards",
                "People",
                "Projects",
                "Media",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-neutral-300 px-4 py-2 text-xs text-neutral-600"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* NEWS GRID */}
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {newsItems.map((item, index) => (
              <article
                key={item.title}
                className="group border-t border-neutral-300 pt-6"
              >
                {/* VISUAL BLOCK */}
                <div className="flex aspect-[4/3] items-center justify-center bg-[#0b0b0b]">
                  <div className="px-8 text-center">
                    <p className="text-xs uppercase tracking-[0.3em] text-[#ffb71b]">
                      {item.tag}
                    </p>

                    <p className="mt-5 text-5xl font-semibold text-white/10">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                  </div>
                </div>

                {/* META */}
                <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-neutral-500">
                  <span>{item.type}</span>
                  <span>{item.date}</span>
                </div>

                {/* TITLE */}
                <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight">
                  {item.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="mt-4 text-sm leading-6 text-neutral-600">
                  {item.text}
                </p>

                {/* LINK */}
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block border-b border-black pb-1 text-sm font-medium transition hover:text-[#b57a00]"
                  >
                    Read more →
                  </a>
                ) : (
                  <span className="mt-6 inline-block text-sm font-medium text-neutral-400">
                    SenSys Highlight
                  </span>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT STRIP */}
      <section className="bg-[#ffb71b] px-8 py-20 text-black md:px-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-black/60">
                Research Impact
              </p>
            </div>

            <div>
              <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-6xl">
                From scientific discovery to real-world impact.
              </h2>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-black/70">
                SenSys advances technologies across healthcare, food safety,
                environmental monitoring, intelligent instrumentation,
                wearable systems, and emerging sensing applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#070707] px-8 py-12 md:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-neutral-800 pt-8 text-xs text-neutral-600 md:flex-row md:items-center md:justify-between">
          <p>© 2026 SenSys Lab. University of Manitoba.</p>

          <a href="/" className="transition hover:text-white">
            Back to home →
          </a>
        </div>
      </footer>
    </main>
  );
}