import Link from "next/link";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const sensysAreas = [
  {
    number: "01",
    id: "intelligent-microsystems",
    title: "Intelligent Microsystems",
    tagline: "Microdevices · Microfluidics · Integrated sensing",
    description:
      "Engineering miniaturized platforms that combine microfluidics, sensing interfaces, functional materials, electronics, embedded intelligence, and advanced fabrication into complete sensing systems.",
    topics: [
      "Microfluidics",
      "Lab-on-Chip",
      "MEMS",
      "Sensor Functionalization",
      "Advanced Fabrication",
      "Portable Instrumentation",
      "Embedded Systems",
      "Intelligent Devices",
    ],
  },
  {
    number: "02",
    id: "biointegrated-systems",
    title: "Biointegrated Systems",
    tagline: "Wearables · Implantables · Flexible technologies",
    description:
      "Developing sensing, monitoring, and energy technologies that interface naturally with the human body through flexible, textile, wearable, implantable, and biocompatible systems.",
    topics: [
      "Wearable Sensors",
      "Implantable Devices",
      "Textile Electronics",
      "Flexible Electronics",
      "Biomedical Signals",
      "Bioenergy",
      "Biocompatible Materials",
      "Continuous Monitoring",
    ],
  },
  {
    number: "03",
    id: "intelligent-diagnostics",
    title: "Intelligent Diagnostics",
    tagline: "Point-of-care · Biosensors · Connected diagnostics",
    description:
      "Creating integrated diagnostic platforms that combine electrochemical and optical sensing, microfluidics, embedded instrumentation, wireless connectivity, and intelligent data analysis.",
    topics: [
      "Point-of-Care Diagnostics",
      "Electrochemical Biosensors",
      "Optical Detection",
      "Rapid Pathogen Detection",
      "Antimicrobial Resistance",
      "Portable Instrumentation",
      "AI-Enabled Analysis",
      "Connected Diagnostics",
    ],
  },
  {
    number: "04",
    id: "agri-environment",
    title: "Agri & Environmental Intelligence",
    tagline: "Food · Water · Soil · Field sensing",
    description:
      "Building field-ready sensing systems for food safety, pesticide monitoring, soil analysis, water quality, precision agriculture, and environmental decision-making.",
    topics: [
      "Pesticide Detection",
      "Water Quality",
      "Soil-on-Chip",
      "Soil Nutrients",
      "Food Safety",
      "Precision Agriculture",
      "Environmental Monitoring",
      "4D-Printed Architectures",
    ],
  },
];

const foundations = [
  {
    number: "01",
    title: "Graphene & Functional Carbon",
    description:
      "Laser-induced graphene, reduced graphene oxide, doped graphene, nanocarbon hybrids, flexible electrodes, bioresistors, microfluidic integration, and energy devices.",
    tags: [
      "Laser-Induced Graphene",
      "rGO",
      "Nanocarbon",
      "Flexible Devices",
    ],
    href: "/research/graphene",
  },
  {
    number: "02",
    title: "Pesticide Detection",
    description:
      "Portable colourimetric, fluorescence, chemiluminescence, electrochemical, wearable, and microfluidic technologies for rapid pesticide-residue screening.",
    tags: [
      "Food Safety",
      "Optical Sensing",
      "Electrochemistry",
      "Wearables",
    ],
    href: "/research/pesticide-detection",
  },
  {
    number: "03",
    title: "Water Quality Technologies",
    description:
      "Multi-analyte sensing platforms combining ion-selective interfaces, heavy-metal detection, flexible sensors, IoT connectivity, and machine-learning-assisted environmental interpretation.",
    tags: [
      "Water Quality",
      "Heavy Metals",
      "Ion Sensors",
      "IoT",
    ],
    href: "/research/water-quality",
  },
  {
    number: "04",
    title: "Pathogen & AMR Diagnostics",
    description:
      "Microfluidic culture, electrochemical bacterial detection, rapid antimicrobial susceptibility testing, thermal management, portable instrumentation, and connected point-of-care systems.",
    tags: [
      "Pathogen Detection",
      "AMR",
      "AST",
      "Point-of-Care",
    ],
    href: "/research/amr",
  },
  {
    number: "05",
    title: "Electrochemical & Biochemical Sensing",
    description:
      "Electrochemical interfaces, biosensors, functionalized electrodes, potentiometric systems, enzymatic sensing, and portable analytical platforms.",
    tags: [
      "Electrochemistry",
      "Biosensors",
      "Functional Electrodes",
      "Point-of-Care",
    ],
    href: "#intelligent-diagnostics",
  },
  {
    number: "06",
    title: "Optical Detection",
    description:
      "Portable optical platforms based on fluorescence, colourimetry, chemiluminescence, electrochemiluminescence, optoelectronics, and multimodal detection.",
    tags: [
      "Fluorescence",
      "Colourimetry",
      "Chemiluminescence",
      "ECL",
    ],
    href: "/research/pesticide-detection",
  },
  {
    number: "07",
    title: "Microfluidics & Lab-on-Chip",
    description:
      "Microscale fluid handling, assay integration, bacterial culture, micromixers, droplet systems, thermal management, and sample-to-answer architectures.",
    tags: [
      "Microfluidics",
      "Lab-on-Chip",
      "Sample Handling",
      "Integrated Assays",
    ],
    href: "#intelligent-microsystems",
  },
  {
    number: "08",
    title: "AI-Enabled Sensing",
    description:
      "Machine learning, chemometrics, deep learning, signal processing, classification, compensation, and intelligent interpretation integrated with sensing hardware.",
    tags: [
      "Machine Learning",
      "Chemometrics",
      "Signal Processing",
      "Data Analytics",
    ],
    href: "#intelligent-diagnostics",
  },
];

const programmes = [
  {
    number: "01",
    title: "Graphene Technologies",
    category: "Advanced Materials",
    description:
      "A materials-to-device research programme involving laser-induced graphene, reduced graphene oxide, functional composites, biosensors, flexible electronics, microfluidics, and energy technologies.",
    href: "/research/graphene",
  },
  {
    number: "02",
    title: "Pesticide Detection",
    category: "Food Safety",
    description:
      "A multi-generation sensing programme spanning microfluidic colourimetry, dual-mode optical sensing, wearable electrochemical detection, and chemiluminescence.",
    href: "/research/pesticide-detection",
  },
  {
    number: "03",
    title: "Water Quality Technologies",
    category: "Environmental Intelligence",
    description:
      "Portable systems for heavy-metal analysis, ion-selective sensing, fluoride and ammonia detection, water-quality indices, IoT connectivity, and machine-learning-assisted interpretation.",
    href: "/research/water-quality",
  },
  {
    number: "04",
    title: "Pathogen & AMR Diagnostics",
    category: "Intelligent Diagnostics",
    description:
      "Integrated microfluidic and electrochemical platforms for bacterial culture, pathogen detection, antibiotic susceptibility testing, and portable point-of-care AMR assessment.",
    href: "/research/amr",
  },
];

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-white text-[#4F2C1D]">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-white px-8 py-24 md:px-16 md:py-32">
        <div className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-[#385E9D]/5 blur-[110px]" />

        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
            Research
          </p>

          <h1 className="mt-6 max-w-6xl text-6xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-8xl">
            From sensing principles
            <br />
            to intelligent systems.
          </h1>

          <div className="mt-12 grid gap-10 border-t border-[#E6DFD7] pt-10 md:grid-cols-[1.1fr_0.9fr]">
            <p className="max-w-3xl text-xl leading-9">
              SenSys develops intelligent sensing technologies by integrating
              microsystems, microfluidics, advanced materials, electronics,
              data analytics, and artificial intelligence.
            </p>

            <p className="max-w-2xl text-base leading-8 text-[#706963]">
              Our research spans healthcare, diagnostics, biointegrated
              systems, food safety, agriculture, and environmental monitoring.
            </p>
          </div>
        </div>
      </section>

      {/* FOUR RESEARCH DIRECTIONS */}
      <section className="bg-[#F7F3EC] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-[0.68fr_1.32fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
                SenSys Research
              </p>
            </div>

            <div>
              <h2 className="max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                Four research directions.
                <br />
                One connected ecosystem.
              </h2>

              <p className="mt-7 max-w-3xl text-base leading-8 text-[#706963]">
                SenSys connects sensing, materials, devices, microfluidics,
                instrumentation, and analytics into integrated pathways from
                fundamental engineering to deployable systems.
              </p>
            </div>
          </div>

          <div className="mt-20 divide-y divide-[#DDD5CC] border-y border-[#DDD5CC]">
            {sensysAreas.map((area) => (
              <section
                key={area.id}
                id={area.id}
                className="scroll-mt-28 py-12 md:py-16"
              >
                <div className="grid gap-8 lg:grid-cols-[0.14fr_0.46fr_1fr]">
                  <div>
                    <span className="text-sm font-semibold tracking-[0.25em] text-[#F2A900]">
                      {area.number}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#385E9D]">
                      {area.tagline}
                    </p>

                    <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
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
                          className="rounded-full border border-[#D8D0C7] bg-white px-4 py-2 text-xs text-[#645D57]"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDATIONS */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-[0.68fr_1.32fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
                Research Foundations
              </p>
            </div>

            <div>
              <h2 className="max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                Established expertise informing the SenSys programme.
              </h2>

              <p className="mt-7 max-w-3xl text-base leading-8 text-[#706963]">
                SenSys builds on a substantial prior body of research led by
                Prof. Sanket Goel and collaborators across sensing,
                microfluidics, advanced materials, instrumentation, food
                safety, environmental monitoring, and point-of-care
                diagnostics.
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden border border-[#DDD5CC] bg-[#DDD5CC] md:grid-cols-2">
            {foundations.map((item) => (
              <Link
                key={item.number}
                href={item.href}
                className="group bg-[#FBF8F4] p-8 transition hover:bg-white md:p-10"
              >
                <div className="flex items-start justify-between gap-8">
                  <span className="text-xs font-semibold tracking-[0.25em] text-[#F2A900]">
                    {item.number}
                  </span>

                  <span className="text-xl text-[#A59B92] transition group-hover:translate-x-1 group-hover:text-[#385E9D]">
                    →
                  </span>
                </div>

                <h3 className="mt-10 text-2xl font-semibold tracking-tight md:text-3xl">
                  {item.title}
                </h3>

                <p className="mt-5 max-w-xl text-sm leading-7 text-[#706963]">
                  {item.description}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#D8D0C7] bg-white px-3 py-1.5 text-[11px] text-[#645D57]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 border-l-2 border-[#F2A900] pl-5">
            <p className="max-w-4xl text-xs leading-6 text-[#837A72]">
              These research foundations reflect expertise and technologies
              developed by Prof. Sanket Goel and collaborators prior to the
              establishment of SenSys at the University of Manitoba.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED PROGRAMMES */}
      <section className="bg-[#F7F3EC] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-[0.68fr_1.32fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
                Demonstrated Programmes
              </p>
            </div>

            <div>
              <h2 className="max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                Four technology programmes demonstrating the research approach.
              </h2>

              <p className="mt-7 max-w-3xl text-base leading-8 text-[#706963]">
                These programmes illustrate how SenSys research foundations
                connect materials, sensing, microfluidics, instrumentation,
                analytics, validation, and translation.
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {programmes.map((item) => (
              <Link
                key={item.number}
                href={item.href}
                className="group flex min-h-[360px] flex-col justify-between border border-[#DDD5CC] bg-white p-8 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-[0.25em] text-[#F2A900]">
                      {item.number}
                    </span>

                    <span className="text-xs uppercase tracking-[0.2em] text-[#385E9D]">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="mt-14 text-3xl font-semibold leading-tight tracking-tight">
                    {item.title}
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-[#706963]">
                    {item.description}
                  </p>
                </div>

                <div className="mt-10 flex items-center justify-between border-t border-[#E7E0D8] pt-5">
                  <span className="text-sm font-medium transition group-hover:text-[#385E9D]">
                    Explore programme
                  </span>

                  <span className="transition group-hover:translate-x-1 group-hover:text-[#385E9D]">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* RESEARCH APPROACH */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
            Research Approach
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
            Connect the complete technology pathway.
          </h2>

          <div className="mt-14 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
            {[
              {
                number: "01",
                title: "Materials",
                text: "Functional materials, interfaces, substrates, and surface chemistry.",
              },
              {
                number: "02",
                title: "Sensing",
                text: "Electrochemical, optical, biochemical, and physical transduction.",
              },
              {
                number: "03",
                title: "Microfluidics",
                text: "Sample handling, reaction control, culture, mixing, and assay integration.",
              },
              {
                number: "04",
                title: "Instrumentation",
                text: "Embedded electronics, signal conditioning, portable readout, and thermal control.",
              },
              {
                number: "05",
                title: "Intelligence",
                text: "Signal processing, AI, machine learning, and connected analysis.",
              },
              {
                number: "06",
                title: "Translation",
                text: "Validation, deployment, scaling, and real-world implementation.",
              },
            ].map((step, index) => (
              <div
                key={step.number}
                className="relative border border-[#DDD5CC] bg-[#FBF8F4] p-6"
              >
                <span className="text-xs font-semibold text-[#F2A900]">
                  {step.number}
                </span>

                <h3 className="mt-8 text-lg font-semibold">{step.title}</h3>

                <p className="mt-3 text-xs leading-6 text-[#706963]">
                  {step.text}
                </p>

                {index < 5 && (
                  <span className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-xl text-[#385E9D] lg:block">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FUTURE */}
      <section className="bg-[#4F2C1D] px-8 py-24 text-white md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#F2A900]">
                What Comes Next
              </p>

              <h2 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] md:text-7xl">
                Build sensing systems that move from the lab to the world.
              </h2>
            </div>

            <div>
              <p className="max-w-xl text-lg leading-8 text-white/70">
                SenSys will extend these foundations toward increasingly
                integrated, intelligent, autonomous, wearable, implantable,
                and field-ready sensing technologies.
              </p>

              <Link
                href="/join"
                className="mt-8 inline-flex rounded-full bg-[#F2A900] px-7 py-3.5 text-sm font-semibold text-[#2A1710] transition hover:bg-white"
              >
                Join SenSys →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}