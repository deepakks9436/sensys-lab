import Navbar from "../../components/Navbar";

const publications = [
  {
    year: "2026",
    category: "Food Safety · Optical Sensing",
    title:
      "An Automated Portable Dual-Mode Optical Device for On-Site Detection and Chemometrics-Enhanced Discrimination of Pesticides",
    authors:
      "K. S. Deepak, P. Ramya Priya, Aniket Balapure, Arshad Javed, Satish Kumar Dubey, and Sanket Goel",
    journal: "Microchemical Journal",
    description:
      "A portable dual-mode optical platform integrating field-deployable pesticide detection with chemometric discrimination.",
    doi: "https://doi.org/10.1016/j.microc.2026.118355",
    tags: ["Pesticides", "Optical Sensing", "Chemometrics"],
  },
  {
    year: "2026",
    category: "Environmental Sensing · IoT",
    title:
      "Temperature-Compensated, IoT-Enabled Portable Ion-Selective Array Device for Multi-Parameter Measurements in Water Samples",
    authors:
      "S. Amrutha Lahari, P. T. Sai Sri Charan, R. N. Ponnalagu, and Sanket Goel",
    journal: "IEEE Transactions on Instrumentation and Measurement",
    description:
      "An IoT-enabled portable ion-selective sensing array for temperature-compensated multiparameter water-quality analysis.",
    doi: "https://doi.org/10.1109/TIM.2026.3677997",
    tags: ["Water Quality", "IoT", "Ion-Selective Sensors"],
  },
  {
    year: "2026",
    category: "Wearable Systems · Bioenergy",
    title:
      "Embroidery-Integrated Silver Thread Biofuel Cells for Implantable Glucose Energy Harvesting from a Living Rat",
    authors:
      "S. Vanmathi, Aparajita Ghosh, Onkar Prakash Kulkarni, Sameer Sonkusale, and Sanket Goel",
    journal: "IEEE Journal on Flexible Electronics",
    description:
      "An embroidery-integrated biofuel-cell architecture using conductive silver threads for glucose-based bioenergy harvesting.",
    doi: "https://doi.org/10.1109/JFLEX.2026.3656478",
    tags: ["Biofuel Cells", "Embroidery", "Implantable Devices"],
  },
  {
    year: "2026",
    category: "Point-of-Care · Laser-Induced Graphene",
    title:
      "Flexible Nanocarbon Hybrid Laser-Induced Graphene Electrodes for Electrochemical Point-of-Care Enzymatic Urea Detection",
    authors:
      "Sanjeet Kumar, Khairunnisa Amreen, Satish Kumar Dubey, and Sanket Goel",
    journal: "Sensors and Actuators A: Physical",
    description:
      "Flexible nanocarbon hybrid laser-induced graphene electrodes developed for point-of-care enzymatic urea sensing.",
    doi: "https://doi.org/10.1016/j.sna.2026.117532",
    tags: ["LIG", "Electrochemical Sensing", "Point-of-Care"],
  },
  {
    year: "2025",
    category: "Agriculture · Soil Intelligence",
    title:
      "Capillary Soil Nutrient Profiling Device: Pre-processing Free Approach for Rapid Soil Nutrient Assessment",
    authors:
      "Abhishesh Pal, K. S. Deepak, Prasanta Kalita, Satish Kumar Dubey, and Sanket Goel",
    journal: "IEEE Transactions on NanoBioscience",
    description:
      "A capillary-driven platform designed for rapid soil nutrient profiling without conventional sample pre-processing.",
    doi: "https://doi.org/10.1109/TNB.2025.3610506",
    tags: ["Soil Sensing", "Microfluidics", "Agriculture"],
  },
  {
    year: "2026",
    category: "Energy Materials · Laser-Induced Graphene",
    title:
      "Phosphorus-Doped Tunable 3D Porous Laser-Induced Graphene Electrodes for Scalable, High-Performance Electrochemical Supercapacitor",
    authors:
      "Palavai Sowmya Sree, Himanshi Awasthi, and Sanket Goel",
    journal: "Surfaces and Interfaces",
    description:
      "Tunable phosphorus-doped porous laser-induced graphene electrodes engineered for scalable electrochemical energy storage.",
    doi: "https://doi.org/10.1016/j.surfin.2026.109455",
    tags: ["LIG", "Supercapacitors", "Energy Materials"],
  },
];

export default function PublicationsPage() {
  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <Navbar />

      {/* HERO */}
      <section className="px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#ffb71b]">
            Publications
          </p>

          <h1 className="mt-6 max-w-6xl text-6xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-8xl">
            Research that advances
            <br />
            sensing and systems.
          </h1>

          <div className="mt-12 grid gap-10 md:grid-cols-[1fr_0.8fr]">
            <p className="max-w-3xl text-xl leading-9 text-neutral-300">
              Selected research spanning intelligent sensing, microfluidics,
              wearable technologies, environmental monitoring, advanced
              materials, point-of-care diagnostics, and energy systems.
            </p>

            <p className="max-w-xl text-base leading-8 text-neutral-500">
              Our work connects fundamental device engineering with portable,
              application-driven systems designed for deployment beyond the
              laboratory.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED PUBLICATIONS */}
      <section className="bg-[#f3f1eb] px-8 py-24 text-black md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">

          {/* SECTION HEADER */}
          <div className="flex flex-col gap-8 border-b border-neutral-300 pb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-neutral-500">
                Selected Work
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
                Recent Publications
              </h2>
            </div>

            <a
              href="https://www.bits-pilani.ac.in/hyderabad/publications/?faculty=sanket-goel"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit border-b border-black pb-1 text-sm font-medium"
            >
              View complete publication list →
            </a>
          </div>

          {/* CATEGORY LABELS */}
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              "Intelligent Sensing",
              "Microfluidics",
              "Wearables",
              "Environment",
              "Point-of-Care",
              "Energy",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-neutral-300 px-4 py-2 text-xs text-neutral-600"
              >
                {item}
              </span>
            ))}
          </div>

          {/* PUBLICATION LIST */}
          <div className="mt-12 divide-y divide-neutral-300 border-t border-neutral-300">
            {publications.map((publication, index) => (
              <article
                key={publication.title}
                className="group grid gap-8 py-12 lg:grid-cols-[90px_1fr_180px]"
              >
                {/* NUMBER / YEAR */}
                <div>
                  <p className="text-xs font-medium tracking-[0.2em] text-[#b57a00]">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <p className="mt-4 text-sm text-neutral-500">
                    {publication.year}
                  </p>
                </div>

                {/* PUBLICATION DETAILS */}
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#b57a00]">
                    {publication.category}
                  </p>

                  <h3 className="mt-4 max-w-4xl text-2xl font-semibold leading-tight tracking-[-0.02em] md:text-3xl">
                    {publication.title}
                  </h3>

                  <p className="mt-5 max-w-4xl text-sm leading-7 text-neutral-500">
                    {publication.authors}
                  </p>

                  <p className="mt-2 text-sm font-medium text-neutral-700">
                    {publication.journal} · {publication.year}
                  </p>

                  <p className="mt-5 max-w-3xl text-base leading-7 text-neutral-600">
                    {publication.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {publication.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-neutral-300 px-3 py-1 text-xs text-neutral-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* DOI */}
                <div className="flex items-start lg:justify-end">
                  <a
                    href={publication.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-black pb-1 text-sm font-medium transition hover:text-[#b57a00]"
                  >
                    View publication →
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* COMPLETE LIST */}
          <div className="mt-16 flex flex-col gap-6 border-t border-neutral-300 pt-10 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xl font-semibold">
                Explore the complete research portfolio
              </p>

              <p className="mt-2 text-sm text-neutral-500">
                Journal articles, conference papers, reviews, and other
                scholarly outputs.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://scholar.google.com/citations?hl=en&user=xgH6FBkAAAAJ&view_op=list_works&sortby=pubdate"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-[#b57a00]"
              >
                Google Scholar
              </a>

              <a
                href="https://www.bits-pilani.ac.in/hyderabad/publications/?faculty=sanket-goel"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-neutral-400 px-6 py-3 text-sm font-medium transition hover:border-black"
              >
                Complete publication list
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* RESEARCH THEMES */}
      <section className="bg-[#0b0b0b] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#ffb71b]">
                Research Portfolio
              </p>
            </div>

            <div>
              <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-6xl">
                From materials and devices to deployable systems.
              </h2>

              <p className="mt-8 max-w-3xl text-lg leading-8 text-neutral-400">
                SenSys research spans the complete technology pathway, from
                functional materials and microfabrication to sensing,
                instrumentation, data intelligence, and application-specific
                validation.
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden border border-neutral-800 bg-neutral-800 md:grid-cols-2 lg:grid-cols-4">
            {[
              "Biosensors & Diagnostics",
              "Microfluidics & Microsystems",
              "Flexible & Wearable Systems",
              "Energy & Environmental Sensing",
            ].map((theme, index) => (
              <div
                key={theme}
                className="bg-[#0b0b0b] p-8 transition hover:bg-[#111111]"
              >
                <p className="text-xs tracking-[0.25em] text-[#ffb71b]">
                  0{index + 1}
                </p>

                <h3 className="mt-12 text-2xl font-semibold tracking-tight">
                  {theme}
                </h3>
              </div>
            ))}
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