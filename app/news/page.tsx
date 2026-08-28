import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const featuredNews = {
  date: "August 27, 2026",
  category: "University of Manitoba",
  title: "$79 million investment brings global researchers to Manitoba",
  summary:
    "The University of Manitoba is welcoming five Eddie Goldenberg Research Chairs of Canada through a major federal investment. Prof. Sanket Goel joins UM as Eddie Goldenberg Research Chair in Translating Cyber Physical Sensory Systems to Reimagine Health and Prosperity.",
  detail:
    "His new research program will advance next-generation miniaturized bioengineering platforms for precision medicine and agriculture, while contributing to Canada's digital manufacturing capacity.",
  image: "/news/um-impact-plus-chairs.webp",
  href:
    "https://umtoday.ca/stories/79-million-dollar-investment-brings-global-researchers-manitoba",
};

const newsItems = [
  {
    date: "May 20, 2026",
    category: "Research in the Media",
    title:
      "AI-assisted fabrication could accelerate lab-on-chip development",
    summary:
      "Machine-learning models were used to predict and optimize laser-fabricated microchannel geometries, reducing trial-and-error in the development of miniaturized diagnostic devices.",
    href:
      "https://www.deccanchronicle.com/southern-states/telangana/bits-uses-ai-to-improve-medical-testing-chip-production-1957882",
  },
  {
    date: "2025",
    category: "Award & Recognition",
    title: "IEEE India Council Technologist of the Year 2025",
    summary:
      "Prof. Sanket Goel was recognized with the IEEE India Council Technologist of the Year Award 2025 for his contributions to technology development and engineering innovation.",
    href:
      "https://ieeeindiacouncil.org/wp-content/uploads/sites/149/2025/12/IC_Awardees_2025.pdf",
  },
  {
    date: "September 2025",
    category: "Award & Recognition",
    title: "National Award for Teachers 2025",
    summary:
      "Prof. Sanket Goel was among the higher-education faculty members recognized nationally for excellence in teaching, research, innovation, and institution-building.",
    href:
      "https://www.bits-pilani.ac.in/hyderabad/faculty-news/",
  },
  {
    date: "2025",
    category: "Technology Translation",
    title:
      "Portable multiplexed electrochemical platform moves diagnostics closer to the field",
    summary:
      "A compact, low-cost electrochemical platform was demonstrated for rapid measurement across healthcare, water, soil, and other sensing applications using flexible electrodes and wireless readout.",
    href:
      "https://www.deccanchronicle.com/southern-states/telangana/bits-team-builds-affordable-testing-device-1910420",
  },
  {
    date: "2025",
    category: "Healthcare Technology",
    title:
      "Wearable platform advances non-invasive monitoring of diabetes complications",
    summary:
      "A smartwatch-style wearable platform was reported for continuous analysis of multiple biomarkers using sweat, supporting painless and lower-cost approaches to diabetes-related monitoring.",
    href:
      "https://www.deccanchronicle.com/southern-states/telangana/bits-smartwatch-based-wearable-offers-painless-diabetes-complication-tracking-1894088",
  },
  {
    date: "January 12, 2025",
    category: "Point-of-Care Diagnostics",
    title:
      "Affordable smartphone-connected platform demonstrated for diabetes testing",
    summary:
      "A handheld platform integrating sensing, machine learning, and smartphone connectivity was reported for monitoring glucose, lactate, and other clinically relevant biomarkers.",
    href:
      "https://www.deccanchronicle.com/southern-states/telangana/hyderabad-researchers-develop-affordable-diabetes-testing-device-1853802",
  },
];

const impactAreas = [
  {
    number: "01",
    title: "Research Leadership",
    text:
      "Advancing interdisciplinary research programmes across intelligent sensing, microsystems, bioengineering, diagnostics, and environmental technologies.",
  },
  {
    number: "02",
    title: "Technology Translation",
    text:
      "Connecting laboratory research with deployable devices, intellectual property, industrial collaboration, licensing, and real-world implementation.",
  },
  {
    number: "03",
    title: "Recognition",
    text:
      "National and international recognition for contributions to technology, teaching, research, innovation, and engineering leadership.",
  },
  {
    number: "04",
    title: "Societal Impact",
    text:
      "Developing technologies aimed at improving healthcare access, agriculture, environmental monitoring, food safety, and resilient manufacturing.",
  },
];

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-white text-[#4F2C1D]">
      <Navbar />

      {/* HERO */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
            News & Impact
          </p>

          <h1 className="mt-6 max-w-6xl text-6xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-8xl">
            Research.
            <br />
            Recognition.
            <br />
            Impact.
          </h1>

          <p className="mt-10 max-w-3xl text-xl leading-9 text-[#706963]">
            News, recognitions, research milestones, technology translation,
            and public impact connected to the research foundations informing
            SenSys.
          </p>
        </div>
      </section>

      {/* FEATURED UM STORY */}
      <section className="bg-[#F7F3EC] px-8 py-20 md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
            Featured
          </p>

          <article className="mt-8 overflow-hidden border border-[#DDD5CC] bg-white">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              {/* IMAGE */}
              <div className="relative min-h-[420px] bg-[#EEE8E1] lg:min-h-[610px]">
                <img
                  src={featuredNews.image}
                  alt="Five Eddie Goldenberg Research Chairs of Canada at the University of Manitoba"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#385E9D]">
                    {featuredNews.category}
                  </span>

                  <span className="text-xs text-[#8A8179]">
                    {featuredNews.date}
                  </span>
                </div>

                <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
                  {featuredNews.title}
                </h2>

                <p className="mt-7 text-base leading-8 text-[#706963]">
                  {featuredNews.summary}
                </p>

                <div className="mt-7 border-l-2 border-[#F2A900] pl-5">
                  <p className="text-sm font-semibold leading-7 text-[#4F2C1D]">
                    Prof. Sanket Goel
                  </p>

                  <p className="mt-1 text-sm leading-7 text-[#706963]">
                    Eddie Goldenberg Research Chair in Translating Cyber
                    Physical Sensory Systems to Reimagine Health and
                    Prosperity
                  </p>
                </div>

                <p className="mt-7 text-sm leading-7 text-[#706963]">
                  {featuredNews.detail}
                </p>

                <a
                  href={featuredNews.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-9 w-fit rounded-full bg-[#385E9D] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#4F2C1D]"
                >
                  Read UM Today story →
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* UM INVESTMENT CONTEXT */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
                Research Leadership
              </p>
            </div>

            <div>
              <h2 className="max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                A major new chapter for research at Manitoba.
              </h2>

              <p className="mt-7 max-w-3xl text-base leading-8 text-[#706963]">
                The University of Manitoba&apos;s five new Eddie Goldenberg
                Research Chairs are part of the Canada Global Impact+
                Research Initiative, designed to attract internationally
                leading researchers in areas of strategic importance.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden border border-[#DDD5CC] bg-[#DDD5CC] md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-[#FBF8F4] p-7">
              <p className="text-4xl font-semibold text-[#F2A900]">
                $79M
              </p>
              <p className="mt-4 text-sm font-semibold">
                Total UM Investment
              </p>
              <p className="mt-3 text-xs leading-6 text-[#706963]">
                Combined investment supporting the new research ecosystem.
              </p>
            </div>

            <div className="bg-[#FBF8F4] p-7">
              <p className="text-4xl font-semibold text-[#385E9D]">
                05
              </p>
              <p className="mt-4 text-sm font-semibold">
                Research Chairs
              </p>
              <p className="mt-3 text-xs leading-6 text-[#706963]">
                Five Eddie Goldenberg Research Chairs joining UM.
              </p>
            </div>

            <div className="bg-[#FBF8F4] p-7">
              <p className="text-4xl font-semibold text-[#385E9D]">
                $1M
              </p>
              <p className="mt-4 text-sm font-semibold">
                Annual Chair Support
              </p>
              <p className="mt-3 text-xs leading-6 text-[#706963]">
                Per Chair per year for the initial eight-year term.
              </p>
            </div>

            <div className="bg-[#FBF8F4] p-7">
              <p className="text-4xl font-semibold text-[#385E9D]">
                $4M
              </p>
              <p className="mt-4 text-sm font-semibold">
                CFI Infrastructure
              </p>
              <p className="mt-3 text-xs leading-6 text-[#706963]">
                Infrastructure funding allocated to each Chair.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LATEST NEWS */}
      <section className="bg-[#F7F3EC] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
                Latest Stories
              </p>
            </div>

            <div>
              <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                Research, recognition, and translation.
              </h2>
            </div>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {newsItems.map((item, index) => (
              <article
                key={item.title}
                className="flex min-h-[360px] flex-col justify-between border border-[#DDD5CC] bg-white p-8 transition hover:border-[#385E9D]"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs font-semibold text-[#F2A900]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-xs text-[#837A72]">
                      {item.date}
                    </span>
                  </div>

                  <p className="mt-7 text-xs font-semibold uppercase tracking-[0.22em] text-[#385E9D]">
                    {item.category}
                  </p>

                  <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
                    {item.title}
                  </h3>

                  <p className="mt-6 text-sm leading-7 text-[#706963]">
                    {item.summary}
                  </p>
                </div>

                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 text-sm font-semibold text-[#385E9D]"
                >
                  Read more →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
            Impact
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Beyond publications.
          </h2>

          <p className="mt-7 max-w-3xl text-base leading-8 text-[#706963]">
            Research impact extends from scientific discovery to device
            engineering, validation, intellectual property, recognition,
            translation, and real-world deployment.
          </p>

          <div className="mt-14 grid gap-px overflow-hidden border border-[#DDD5CC] bg-[#DDD5CC] md:grid-cols-2 lg:grid-cols-4">
            {impactAreas.map((item) => (
              <div key={item.number} className="bg-[#FBF8F4] p-7">
                <span className="text-xs font-semibold text-[#F2A900]">
                  {item.number}
                </span>

                <h3 className="mt-8 text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#706963]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE OUTPUTS */}
      <section className="bg-[#4F2C1D] px-8 py-24 text-white md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#F2A900]">
                Explore Further
              </p>
            </div>

            <div>
              <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                Explore the research behind the stories.
              </h2>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                <a
                  href="/publications"
                  className="border border-white/15 p-6 transition hover:border-[#F2A900]"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-[#F2A900]">
                    Outputs
                  </p>

                  <h3 className="mt-3 text-xl font-semibold">
                    Publications
                  </h3>

                  <p className="mt-5 text-sm text-white/65">
                    Explore publication archive →
                  </p>
                </a>

                <a
                  href="/patents"
                  className="border border-white/15 p-6 transition hover:border-[#F2A900]"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-[#F2A900]">
                    Innovation
                  </p>

                  <h3 className="mt-3 text-xl font-semibold">
                    Patents
                  </h3>

                  <p className="mt-5 text-sm text-white/65">
                    Explore intellectual property →
                  </p>
                </a>

                <a
                  href="/research"
                  className="border border-white/15 p-6 transition hover:border-[#F2A900]"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-[#F2A900]">
                    Research
                  </p>

                  <h3 className="mt-3 text-xl font-semibold">
                    Research Areas
                  </h3>

                  <p className="mt-5 text-sm text-white/65">
                    Explore research →
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}