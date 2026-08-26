import Link from "next/link";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const researchAreas = [
  {
    number: "01",
    id: "intelligent-microsystems",
    title: "Intelligent Microsystems",
    description:
      "Microscale technologies integrating sensing, microfluidics, advanced fabrication, electronics, and intelligent instrumentation into compact systems.",
    topics: [
      "Microfluidics",
      "Lab-on-Chip",
      "MEMS",
      "Portable Instrumentation",
      "Advanced Fabrication",
      "Integrated Sensors",
    ],
  },
  {
    number: "02",
    id: "biointegrated-systems",
    title: "Biointegrated Systems",
    description:
      "Flexible, wearable, textile, and implantable technologies engineered to interface with biological systems for sensing, monitoring, and energy applications.",
    topics: [
      "Wearable Sensors",
      "Textile Electronics",
      "Biomedical Signals",
      "Flexible Devices",
      "Implantables",
      "Bioenergy",
    ],
  },
  {
    number: "03",
    id: "intelligent-diagnostics",
    title: "Intelligent Diagnostics",
    description:
      "Portable diagnostic technologies combining electrochemical and optical sensing, microfluidics, embedded electronics, connectivity, and intelligent data analysis.",
    topics: [
      "Point-of-Care Diagnostics",
      "Electrochemical Biosensors",
      "Optical Sensing",
      "Portable Potentiostats",
      "Rapid AMR Diagnostics",
      "AI-Enabled Analysis",
    ],
  },
  {
    number: "04",
    id: "agri-environment",
    title: "Agri & Environmental Intelligence",
    description:
      "Field-deployable sensing technologies for food safety, pesticide detection, water quality, soil analysis, agriculture, and environmental monitoring.",
    topics: [
      "Pesticide Detection",
      "Water Quality",
      "Soil Nutrients",
      "Food Safety",
      "Precision Agriculture",
      "Environmental Monitoring",
    ],
  },
];

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-white text-[#4F2C1D]">
      <Navbar />

      {/* HERO */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#005EA8]">
            Research
          </p>

          <h1 className="mt-6 max-w-6xl text-6xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-8xl">
            From sensing principles
            <br />
            to intelligent systems.
          </h1>

          <p className="mt-10 max-w-3xl text-xl leading-9 text-[#706963]">
            SenSys develops integrated sensing technologies by combining
            microsystems, microfluidics, advanced materials, electronics, and
            artificial intelligence across healthcare, agriculture, food
            safety, and environmental monitoring.
          </p>
        </div>
      </section>

      {/* RESEARCH AREAS */}
      <section className="bg-[#F7F3EC] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#005EA8]">
                Research Areas
              </p>
            </div>

            <div>
              <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                Four interconnected directions.
              </h2>
            </div>
          </div>

          <div className="mt-20 divide-y divide-[#ddd5cc] border-y border-[#ddd5cc]">
            {researchAreas.map((area) => (
              <section
                key={area.id}
                id={area.id}
                className="grid gap-8 py-12 lg:grid-cols-[0.2fr_0.8fr_1fr]"
              >
                <div>
                  <span className="text-sm font-semibold tracking-[0.25em] text-[#F2A900]">
                    {area.number}
                  </span>
                </div>

                <div>
                  <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">
                    {area.title}
                  </h3>
                </div>

                <div>
                  <p className="max-w-2xl text-base leading-8 text-[#706963]">
                    {area.description}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {area.topics.map((topic) => (
                      <span
                        key={topic}
                        className="rounded-full border border-[#d8d0c7] bg-white px-4 py-2 text-xs text-[#645d57]"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* RESEARCH FOUNDATIONS */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#005EA8]">
            Research Foundations
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
            Established technologies informing the next generation of SenSys
            research.
          </h2>

          <div className="mt-16 grid gap-px overflow-hidden border border-[#ddd5cc] bg-[#ddd5cc] md:grid-cols-2">
            {[
              {
                title: "PestiSafe",
                text: "Portable pesticide sensing through optical, electrochemical, microfluidic, wearable, and intelligent analytical technologies.",
              },
              {
                title: "Laser-Induced Graphene Platforms",
                text: "Functional carbon architectures spanning electrochemical sensing, flexible electronics, microfluidics, energy, and advanced materials.",
              },
              {
                title: "Portable Electrochemical Instrumentation",
                text: "Compact potentiostats, embedded electronics, wireless interfaces, and connected point-of-care systems.",
              },
              {
                title: "Water Quality Technologies",
                text: "Multiparameter sensing, ion-selective platforms, heavy-metal detection, IoT connectivity, and intelligent environmental analysis.",
              },
            ].map((item) => (
              <article key={item.title} className="bg-[#FBF8F4] p-10">
                <h3 className="text-2xl font-semibold">{item.title}</h3>

                <p className="mt-4 text-sm leading-7 text-[#706963]">
                  {item.text}
                </p>

                <Link
                  href="/"
                  className="mt-8 inline-block text-sm font-medium text-[#005EA8]"
                >
                  Featured on homepage →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F2A900] px-8 py-20 text-[#2A1710] md:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Interested in working across disciplines?
          </h2>

          <Link
            href="/join"
            className="w-fit rounded-full bg-[#4F2C1D] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#005EA8]"
          >
            Join SenSys →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}