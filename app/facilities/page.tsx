import Navbar from "../../components/Navbar";

const capabilities = [
  {
    number: "01",
    title: "Microfabrication & Advanced Manufacturing",
    text: "Capabilities being developed around microfluidic prototyping, laser processing, direct-write fabrication, additive manufacturing, printed electronics, and functional device fabrication.",
  },
  {
    number: "02",
    title: "Electrochemical & Bioanalytical Characterization",
    text: "Instrumentation for electrochemical sensing, impedance analysis, multichannel measurements, biochemical characterization, and validation of portable diagnostic platforms.",
  },
  {
    number: "03",
    title: "Optical & Imaging Systems",
    text: "Optical sensing, fluorescence and luminescence analysis, hyperspectral imaging, high-speed visualization, and multimodal analytical measurements.",
  },
  {
    number: "04",
    title: "Flexible & Wearable Device Engineering",
    text: "Development and characterization of textile electronics, flexible sensors, printed conductors, wearable interfaces, and mechanically compliant sensing platforms.",
  },
  {
    number: "05",
    title: "Microfluidics & Point-of-Care Systems",
    text: "Lab-on-chip architectures, droplet and capillary systems, portable diagnostics, fluid handling, thermal integration, and sample-to-answer sensing platforms.",
  },
  {
    number: "06",
    title: "Environmental & Application Validation",
    text: "Controlled testing and validation of sensing technologies for food, water, soil, agriculture, healthcare, and other field-deployable applications.",
  },
];

export default function FacilitiesPage() {
  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <Navbar />

      {/* HERO */}
      <section className="px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#ffb71b]">
            Facilities
          </p>

          <h1 className="mt-6 max-w-6xl text-6xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-8xl">
            Infrastructure for
            <br />
            translating ideas into systems.
          </h1>

          <div className="mt-12 grid gap-10 md:grid-cols-[1fr_0.8fr]">
            <p className="max-w-3xl text-xl leading-9 text-neutral-300">
              SenSys is establishing an integrated research environment at the
              University of Manitoba for sensing, microfluidics, advanced
              manufacturing, characterization, electronics, and translational
              technology development.
            </p>

            <p className="max-w-xl text-base leading-8 text-neutral-500">
              Infrastructure is being developed to support the complete pathway
              from materials and microdevices to intelligent, field-deployable
              sensing systems.
            </p>
          </div>
        </div>
      </section>

      {/* STATUS NOTICE */}
      <section className="border-y border-neutral-800 bg-[#0b0b0b] px-8 py-10 md:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#ffb71b]">
              Infrastructure Development
            </p>

            <p className="mt-3 max-w-4xl text-base leading-7 text-neutral-400">
              SenSys is currently establishing its next-generation research
              infrastructure at the University of Manitoba. Detailed equipment
              information will be added as systems are commissioned and become
              operational.
            </p>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="bg-[#f3f1eb] px-8 py-24 text-black md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 md:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-neutral-500">
                Emerging Capabilities
              </p>
            </div>

            <div>
              <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-6xl">
                An integrated platform for fabrication, sensing, and validation.
              </h2>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-600">
                The laboratory infrastructure is being organized around
                complementary capability areas rather than isolated instruments,
                enabling researchers to move efficiently from concept to
                prototype and application testing.
              </p>
            </div>
          </div>

          <div className="mt-20 grid gap-px overflow-hidden border border-neutral-300 bg-neutral-300 md:grid-cols-2">
            {capabilities.map((item) => (
              <div
                key={item.number}
                className="bg-[#f3f1eb] p-8 transition hover:bg-white md:p-12"
              >
                <span className="text-xs tracking-[0.3em] text-[#b57a00]">
                  {item.number}
                </span>

                <h3 className="mt-14 text-3xl font-semibold tracking-tight">
                  {item.title}
                </h3>

                <p className="mt-5 max-w-xl text-base leading-7 text-neutral-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTITUTIONAL ENVIRONMENT */}
      <section className="bg-[#0b0b0b] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#ffb71b]">
                University Environment
              </p>
            </div>

            <div>
              <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-6xl">
                Embedded within the University of Manitoba research ecosystem.
              </h2>

              <p className="mt-8 max-w-3xl text-lg leading-8 text-neutral-400">
                SenSys will operate within the broader University of Manitoba
                research environment, enabling access to institutional
                infrastructure, interdisciplinary collaboration, and shared
                research resources across the university.
              </p>

              <a
                href="https://umanitoba.ca/facilities/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block border-b border-neutral-500 pb-1 text-sm font-medium text-white transition hover:border-[#ffb71b] hover:text-[#ffb71b]"
              >
                Explore University of Manitoba facilities →
              </a>
            </div>
          </div>

          {/* UM SCALE */}
          <div className="mt-16 grid border-y border-neutral-800 md:grid-cols-3">
            <div className="py-10 md:border-r md:border-neutral-800">
              <p className="text-5xl font-semibold tracking-tight">100+</p>
              <p className="mt-3 text-sm text-neutral-500">
                University buildings
              </p>
            </div>

            <div className="py-10 md:border-r md:border-neutral-800 md:pl-10">
              <p className="text-5xl font-semibold tracking-tight">6.41M</p>
              <p className="mt-3 text-sm text-neutral-500">
                Square feet of facilities
              </p>
            </div>

            <div className="py-10 md:pl-10">
              <p className="text-5xl font-semibold tracking-tight">676</p>
              <p className="mt-3 text-sm text-neutral-500">
                Acres of university land
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COLLABORATION */}
      <section className="bg-[#ffb71b] px-8 py-20 text-black md:px-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-black/60">
                Collaboration
              </p>
            </div>

            <div>
              <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-6xl">
                Built to support interdisciplinary research.
              </h2>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-black/70">
                The SenSys infrastructure strategy is designed to support
                collaborative research spanning engineering, healthcare,
                agriculture, environmental science, materials, and data-driven
                sensing technologies.
              </p>

              <a
                href="/join"
                className="mt-8 inline-block border-b border-black pb-1 text-sm font-medium"
              >
                Work with SenSys →
              </a>
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