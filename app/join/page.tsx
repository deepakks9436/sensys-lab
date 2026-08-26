import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const opportunities = [
  {
    number: "01",
    title: "PhD Researchers",
    text: "Doctoral research across microsystems, sensing, microfluidics, biosensors, wearables, intelligent instrumentation, and application-driven technologies.",
  },
  {
    number: "02",
    title: "Postdoctoral Researchers",
    text: "Advanced interdisciplinary research opportunities spanning device development, materials, integrated sensing, electronics, and translational systems.",
  },
  {
    number: "03",
    title: "Master's Researchers",
    text: "Research-intensive graduate opportunities contributing to sensing systems, instrumentation, microfluidics, materials, and application validation.",
  },
  {
    number: "04",
    title: "Visiting & Collaborative Researchers",
    text: "Opportunities for academic, clinical, industrial, and interdisciplinary collaboration across shared sensing and technology challenges.",
  },
];

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-white text-[#4F2C1D]">
      <Navbar />

      {/* HERO */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#005EA8]">
            Join SenSys
          </p>

          <h1 className="mt-6 max-w-6xl text-6xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-8xl">
            Build the future
            <br />
            of sensing with us.
          </h1>

          <p className="mt-10 max-w-3xl text-xl leading-9 text-[#706963]">
            We are building an interdisciplinary research environment at the
            University of Manitoba for researchers interested in intelligent
            sensing, microsystems, microfluidics, materials, electronics,
            diagnostics, and real-world applications.
          </p>
        </div>
      </section>

      {/* OPPORTUNITIES */}
      <section className="bg-[#F2A900] px-8 py-24 text-[#2A1710] md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#4F2C1D]/70">
            Opportunities
          </p>

          <div className="mt-14 grid gap-px overflow-hidden border border-[#2A1710]/20 bg-[#2A1710]/20 md:grid-cols-2">
            {opportunities.map((item) => (
              <article key={item.number} className="bg-[#F2A900] p-10">
                <span className="text-xs font-semibold tracking-[0.25em] text-[#005EA8]">
                  {item.number}
                </span>

                <h2 className="mt-10 text-3xl font-semibold">
                  {item.title}
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#4F2C1D]/80">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE LOOK FOR */}
      <section className="bg-[#F7F3EC] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#005EA8]">
                What We Look For
              </p>
            </div>

            <div>
              <h2 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                Researchers who think across boundaries.
              </h2>

              <p className="mt-8 max-w-3xl text-lg leading-8 text-[#706963]">
                We value curiosity, technical depth, interdisciplinary
                thinking, experimental rigor, collaboration, and the ability
                to connect fundamental research with meaningful applications.
              </p>

              <div className="mt-10 flex flex-wrap gap-2">
                {[
                  "Microsystems",
                  "Microfluidics",
                  "Biosensors",
                  "Electrochemistry",
                  "Optical Sensing",
                  "Wearable Devices",
                  "Advanced Materials",
                  "Embedded Systems",
                  "Artificial Intelligence",
                  "Environmental Sensing",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#d6cec5] bg-white px-4 py-2 text-xs text-[#645d57]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT NOTE */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl border-t border-[#ddd5cc] pt-12">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#005EA8]">
            Applications
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Interested in joining SenSys?
          </h2>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-[#706963]">
            Detailed application instructions, eligibility requirements, and
            contact information will be added as recruitment opportunities are
            announced.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}