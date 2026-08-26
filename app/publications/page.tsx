import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const publications = [
  {
    year: "2026",
    area: "Food Safety",
    journal: "Microchemical Journal",
    title:
      "An Automated Portable Dual-Mode Optical Device for On-Site Detection and Chemometrics-Enhanced Discrimination of Pesticides",
    authors: "Deepak et al.",
    doi: "https://doi.org/10.1016/j.microc.2026.118355",
  },
  {
    year: "2026",
    area: "Water Quality",
    journal: "IEEE Transactions on Instrumentation and Measurement",
    title:
      "Temperature-Compensated, IoT-Enabled Portable Ion-Selective Array Device for Multi-Parameter Measurements in Water Samples",
    authors: "S. Amrutha Lahari et al.",
    doi: "https://doi.org/10.1109/TIM.2026.3677997",
  },
  {
    year: "2026",
    area: "Wearable Bioenergy",
    journal: "IEEE Journal on Flexible Electronics",
    title:
      "Embroidery-Integrated Silver Thread Biofuel Cells for Implantable Glucose Energy Harvesting from a Living Rat",
    authors: "Vanmathi et al.",
    doi: "https://doi.org/10.1109/JFLEX.2026.3656478",
  },
  {
    year: "2026",
    area: "Laser-Induced Graphene",
    journal: "Sensors and Actuators A: Physical",
    title:
      "Flexible Nanocarbon Hybrid Laser-Induced Graphene Electrodes for Electrochemical Point-of-Care Enzymatic Urea Detection",
    authors: "Sanjeet Kumar et al.",
    doi: "https://doi.org/10.1016/j.sna.2026.117532",
  },
  {
    year: "2025",
    area: "Soil Sensing",
    journal: "IEEE Transactions on NanoBioscience",
    title:
      "Capillary Soil Nutrient Profiling Device: Pre-processing Free Approach for Rapid Soil Nutrient Assessment",
    authors: "Abhishesh Pal, Deepak et al.",
    doi: "https://doi.org/10.1109/TNB.2025.3610506",
  },
  {
    year: "2026",
    area: "Energy",
    journal: "Surfaces and Interfaces",
    title:
      "Phosphorus-Doped Tunable 3D Porous Laser-Induced Graphene Electrodes for Scalable, High-Performance Electrochemical Supercapacitor",
    authors: "Palavai Sowmya Sree et al.",
    doi: "https://doi.org/10.1016/j.surfin.2026.109455",
  },
];

export default function PublicationsPage() {
  return (
    <main className="min-h-screen bg-white text-[#4F2C1D]">
      <Navbar />

      {/* HERO */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#005EA8]">
            Publications
          </p>

          <h1 className="mt-6 max-w-6xl text-6xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-8xl">
            Research that advances
            <br />
            sensing and systems.
          </h1>
        </div>
      </section>

      {/* PUBLICATION LIST */}
      <section className="bg-[#F7F3EC] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#005EA8]">
                Selected Work
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                Recent Publications
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-[#706963]">
              Representative work spanning sensing, portable diagnostics,
              flexible systems, environmental monitoring, and advanced
              materials.
            </p>
          </div>

          <div className="mt-16 divide-y divide-[#dcd4cc] border-y border-[#dcd4cc]">
            {publications.map((publication, index) => (
              <article
                key={publication.title}
                className="grid gap-8 py-10 lg:grid-cols-[0.15fr_0.85fr]"
              >
                <div>
                  <span className="text-sm font-semibold text-[#F2A900]">
                    0{index + 1}
                  </span>
                </div>

                <div>
                  <div className="flex flex-wrap gap-3">
                    <span className="rounded-full border border-[#d3cbc3] bg-white px-3 py-1.5 text-xs text-[#005EA8]">
                      {publication.area}
                    </span>

                    <span className="rounded-full border border-[#d3cbc3] bg-white px-3 py-1.5 text-xs text-[#706963]">
                      {publication.year}
                    </span>
                  </div>

                  <h3 className="mt-5 max-w-4xl text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
                    {publication.title}
                  </h3>

                  <p className="mt-4 text-sm text-[#706963]">
                    {publication.authors} · {publication.journal}
                  </p>

                  <a
                    href={publication.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-block text-sm font-medium text-[#005EA8]"
                  >
                    View publication →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#005EA8]">
            Research Portfolio
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Publications across interconnected technology domains.
          </h2>

          <div className="mt-14 grid gap-px overflow-hidden border border-[#ddd5cc] bg-[#ddd5cc] md:grid-cols-2 lg:grid-cols-4">
            {[
              "Microsystems & Microfluidics",
              "Biosensors & Diagnostics",
              "Flexible & Wearable Systems",
              "Environmental & Agri Sensing",
            ].map((item) => (
              <div key={item} className="bg-[#FBF8F4] p-8">
                <p className="text-lg font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}