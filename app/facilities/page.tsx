import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const capabilities = [
  {
    number: "01",
    title: "Microfabrication & Advanced Manufacturing",
    description:
      "Emerging capabilities for rapid prototyping, microsystems fabrication, microfluidics, direct-write printing, laser processing, and advanced manufacturing.",
  },
  {
    number: "02",
    title: "Electrochemical & Bioanalytical Characterization",
    description:
      "Electrochemical instrumentation and analytical workflows supporting biosensing, materials characterization, energy devices, and point-of-care technologies.",
  },
  {
    number: "03",
    title: "Optical & Imaging Systems",
    description:
      "Optical sensing, fluorescence, imaging, spectroscopy, and advanced characterization systems supporting multimodal device development.",
  },
  {
    number: "04",
    title: "Flexible & Wearable Device Engineering",
    description:
      "Fabrication and testing capabilities for textile electronics, flexible devices, wearable sensors, and mechanically compliant systems.",
  },
  {
    number: "05",
    title: "Microfluidics & Point-of-Care Systems",
    description:
      "Platforms for fluid handling, pumping, thermal control, microreactors, lab-on-chip systems, and integrated portable diagnostics.",
  },
  {
    number: "06",
    title: "Environmental & Application Validation",
    description:
      "Infrastructure supporting testing in water, soil, food, agriculture, environmental, and other real-world application settings.",
  },
];

export default function FacilitiesPage() {
  return (
    <main className="min-h-screen bg-white text-[#4F2C1D]">
      <Navbar />

      {/* HERO */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#005EA8]">
            Facilities
          </p>

          <h1 className="mt-6 max-w-6xl text-6xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-8xl">
            Infrastructure for translating
            <br />
            ideas into systems.
          </h1>

          <p className="mt-10 max-w-3xl text-xl leading-9 text-[#706963]">
            SenSys is establishing an integrated research environment at the
            University of Manitoba supporting sensing, microsystems,
            microfluidics, advanced fabrication, characterization, and
            translational device development.
          </p>
        </div>
      </section>

      {/* STATUS */}
      <section className="bg-[#F7F3EC] px-8 py-16 md:px-16">
        <div className="mx-auto max-w-7xl border-l-4 border-[#F2A900] bg-white p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#005EA8]">
            Infrastructure Development
          </p>

          <p className="mt-4 max-w-4xl text-lg leading-8 text-[#706963]">
            SenSys is currently establishing its next-generation research
            infrastructure at the University of Manitoba. Detailed equipment
            information will be added as systems are commissioned and become
            operational.
          </p>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#005EA8]">
            Emerging Capabilities
          </p>

          <div className="mt-14 divide-y divide-[#ddd5cc] border-y border-[#ddd5cc]">
            {capabilities.map((item) => (
              <article
                key={item.number}
                className="grid gap-8 py-10 md:grid-cols-[0.2fr_0.8fr_1fr]"
              >
                <span className="text-sm font-semibold text-[#F2A900]">
                  {item.number}
                </span>

                <h2 className="text-2xl font-semibold tracking-tight">
                  {item.title}
                </h2>

                <p className="text-sm leading-7 text-[#706963]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* UNIVERSITY ENVIRONMENT */}
      <section className="bg-[#F7F3EC] px-8 py-24 md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#005EA8]">
            University Environment
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Embedded within a large research and infrastructure ecosystem.
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <div className="border-t border-[#d8d0c7] pt-6">
              <p className="text-4xl font-semibold text-[#F2A900]">100+</p>
              <p className="mt-2 text-sm text-[#706963]">
                University buildings
              </p>
            </div>

            <div className="border-t border-[#d8d0c7] pt-6">
              <p className="text-4xl font-semibold text-[#F2A900]">6.41M</p>
              <p className="mt-2 text-sm text-[#706963]">
                Square feet of facilities
              </p>
            </div>

            <div className="border-t border-[#d8d0c7] pt-6">
              <p className="text-4xl font-semibold text-[#F2A900]">676</p>
              <p className="mt-2 text-sm text-[#706963]">
                Acres of university land
              </p>
            </div>
          </div>

          <a
            href="https://umanitoba.ca/facilities/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block text-sm font-medium text-[#005EA8]"
          >
            Explore University of Manitoba facilities →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}