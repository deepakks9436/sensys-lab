import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const newsItems = [
  {
    type: "Award",
    year: "2025",
    title: "National Award for Teachers 2025",
    text: "Recognition for excellence and contribution to higher education.",
  },
  {
    type: "Award",
    year: "2025",
    title: "IEEE India Council Technologist of the Year 2025",
    text: "Recognition of technology development and translational research contributions.",
  },
  {
    type: "Publication",
    year: "2026",
    title:
      "Portable dual-mode optical platform for pesticide detection and chemometric discrimination",
    link: "https://doi.org/10.1016/j.microc.2026.118355",
  },
  {
    type: "Publication",
    year: "2026",
    title:
      "Temperature-compensated IoT-enabled ion-selective array for water-quality monitoring",
    link: "https://doi.org/10.1109/TIM.2026.3677997",
  },
  {
    type: "Publication",
    year: "2026",
    title:
      "Embroidery-integrated silver-thread biofuel cells for implantable glucose energy harvesting",
    link: "https://doi.org/10.1109/JFLEX.2026.3656478",
  },
  {
    type: "Publication",
    year: "2026",
    title:
      "Flexible nanocarbon hybrid laser-induced graphene electrodes for point-of-care urea detection",
    link: "https://doi.org/10.1016/j.sna.2026.117532",
  },
];

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-white text-[#4F2C1D]">
      <Navbar />

      {/* HERO */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#005EA8]">
            News
          </p>

          <h1 className="mt-6 max-w-5xl text-6xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-8xl">
            Ideas, people,
            <br />
            progress.
          </h1>
        </div>
      </section>

      {/* NEWS */}
      <section className="bg-[#F7F3EC] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#005EA8]">
                Latest
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                From SenSys
              </h2>
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {newsItems.map((item, index) => (
              <article
                key={item.title}
                className="flex min-h-[330px] flex-col justify-between border border-[#ddd5cc] bg-white p-7"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.25em] text-[#005EA8]">
                      {item.type}
                    </span>

                    <span className="text-xs text-[#8b837b]">{item.year}</span>
                  </div>

                  <p className="mt-14 text-xs font-semibold text-[#F2A900]">
                    0{index + 1}
                  </p>

                  <h3 className="mt-4 text-2xl font-semibold leading-tight">
                    {item.title}
                  </h3>

                  {item.text && (
                    <p className="mt-4 text-sm leading-7 text-[#706963]">
                      {item.text}
                    </p>
                  )}
                </div>

                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 text-sm font-medium text-[#005EA8]"
                  >
                    Read more →
                  </a>
                ) : (
                  <p className="mt-8 text-xs uppercase tracking-[0.2em] text-[#8b837b]">
                    SenSys Highlight
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT BAND */}
      <section className="bg-[#F2A900] px-8 py-20 text-[#2A1710] md:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#4F2C1D]/70">
            Research Impact
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Research progress through publications, technology, collaboration,
            and recognition.
          </h2>
        </div>
      </section>

      <Footer />
    </main>
  );
}