import Link from "next/link";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const platforms = [
  {
    number: "01",
    name: "PestiSafe 1.0",
    title: "Microfluidic Colourimetric Detection",
    category: "Colourimetry · Microfluidics · IoT",
    image: "/research/pesticide-detection/pestisafe-1.png",
    video: "https://youtu.be/HuAiM6dAkao",
    description:
      "A handheld organophosphorus-pesticide screening system combining chemical colour development, passive microfluidic mixing, optoelectronic detection, embedded electronics, and connected reporting.",
    features: [
      "Modified molybdenum-blue reaction for organophosphorus pesticide detection.",
      "PDMS chip integrating split-and-recombine and spiral micromixers.",
      "LED-photodiode optical readout with transimpedance amplification.",
      "OLED display, Android interface, and ThingSpeak connectivity.",
      "Evaluated for malathion, chlorpyrifos, dimethoate, and an organophosphorus mixture.",
    ],
    metrics: [
      "OP mixture LoD: 0.07 ppm",
      "Cucumber validation",
      "IoT enabled",
    ],
    publication: "https://ieeexplore.ieee.org/document/10768934",
  },
  {
    number: "02",
    name: "PestiSafe 2.0",
    title: "Dual-Mode Optical Detection & Pesticide Discrimination",
    category: "Colourimetry · Fluorescence · Chemometrics",
    image: "/research/pesticide-detection/pestisafe-2.jpg",
    video: "https://youtu.be/jDNuqfgy-qs",
    description:
      "A portable dual-mode platform combining colourimetric and fluorescence measurements to generate complementary analytical responses for internal cross-verification and pesticide discrimination.",
    features: [
      "Independent fluorescence and colourimetric measurement channels.",
      "Integrated signal conditioning, amplification, and automated optical readout.",
      "BLE-enabled mobile interface for calibration and reporting.",
      "Chemometric analysis using PCA and k-NN for pesticide discrimination.",
      "Validated using food and water matrices including rice, cucumber, and tap water.",
    ],
    metrics: [
      "Imidacloprid LoD: 2–3 µg/L",
      "Malathion LoD: 30–40 µg/L",
      "Recovery: 92–107%",
    ],
    publication: "https://doi.org/10.1016/j.microc.2026.118355",
  },
  {
    number: "03",
    name: "PestiSafe 3.0",
    title: "Machine-Embroidered Lab-on-Glove Biosensor",
    category: "Electrochemistry · Wearables · Textile Electronics",
    image: "/research/pesticide-detection/pestisafe-3.png",
    video: "https://youtu.be/DDIR4CQRPBY",
    description:
      "A wearable electrochemical sensing platform fabricated through computerized embroidery for direct swipe-and-scan pesticide-residue screening from agricultural surfaces.",
    features: [
      "Silver-coated polyamide textile electrodes integrated onto a glove.",
      "AChE inhibition-based electrochemical detection of monocrotophos.",
      "Machine-learning-assisted and statistical stitch-parameter optimization.",
      "Mechanical evaluation under bending and twisting.",
      "Reusability and long-term storage-stability evaluation.",
    ],
    metrics: [
      "LoD: 1.55 µg/L",
      "Range: 5–100 µg/L",
      "90-day stability",
    ],
    publication: "https://doi.org/10.1039/D6LC00452K",
  },
  {
    number: "04",
    name: "Chemiluminescence PoST",
    title: "Microfluidic Point-of-Source Chemiluminometer",
    category: "Chemiluminescence · µPAD · Imaging",
    image: "/research/pesticide-detection/chemiluminescence-post.jpg",
    video: "https://youtu.be/Jz8HaVunTlo",
    description:
      "A standalone chemiluminescence platform combining disposable paper-based test strips, controlled reagent handling, incubation, imaging, and onsite signal analysis.",
    features: [
      "Luminol–H₂O₂–Co²⁺ chemiluminescence assay for malathion detection.",
      "Plug-and-play paper-based analytical test strips.",
      "Microfluidic reagent delivery and onboard incubation.",
      "Raspberry Pi camera and touchscreen-based acquisition.",
      "Validated using apple, citrus, and tomato samples.",
    ],
    metrics: [
      "LoD: 0.016 ppm",
      "Range: 0.1–10 ppm",
      "Disposable µPAD",
    ],
    publication: "https://doi.org/10.1016/j.microc.2025.114381",
  },
];

const comparison = [
  {
    platform: "PestiSafe 1.0",
    principle: "Modified molybdenum-blue colourimetry",
    targets: "Malathion, chlorpyrifos, dimethoate, OP mixture",
    lod: "2.35 ppm, 0.20 ppm, 0.63 ppm, 0.07 ppm",
    samples: "Cucumber",
    capability: "Low-cost IoT-enabled organophosphorus screening",
  },
  {
    platform: "PestiSafe 2.0",
    principle: "Colourimetry + fluorescence",
    targets: "Malathion, imidacloprid; six-pesticide chemometric study",
    lod: "Malathion: 30–40 µg/L; Imidacloprid: 2–3 µg/L",
    samples: "Unhulled rice, cucumber, tap water",
    capability: "Dual-signal cross-validation and pesticide discrimination",
  },
  {
    platform: "PestiSafe 3.0",
    principle: "AChE-inhibition electrochemistry",
    targets: "Monocrotophos; interference studies including malathion",
    lod: "1.55 µg/L",
    samples: "Potato, tomato, tap water",
    capability: "Wearable swipe-and-scan sensing",
  },
  {
    platform: "Chemiluminescence PoST",
    principle: "Luminol–H₂O₂–Co²⁺ chemiluminescence quenching",
    targets: "Malathion",
    lod: "0.016 ppm",
    samples: "Apple, citrus, tomato",
    capability: "Standalone imaging-based point-of-source testing",
  },
];

const publications = [
  {
    year: "2025",
    title:
      "A Portable Hand-held Microfluidic Colorimetric Device for the Detection of Organophosphorus Pesticides",
    authors: "K. S. Deepak, S. K. Dubey, S. Goel and A. Javed",
    journal: "IEEE Sensors Journal",
    doi: "10.1109/JSEN.2024.3499873",
    href: "https://ieeexplore.ieee.org/document/10768934",
  },
  {
    year: "2026",
    title:
      "An Automated Portable Dual-Mode Optical Device for On-Site Detection and Chemometrics-Enhanced Discrimination of Pesticides",
    authors:
      "K. S. Deepak, P. Ramya Priya, Aniket Balapure, Arshad Javed, Sanket Goel and Satish Kumar Dubey",
    journal: "Microchemical Journal",
    doi: "10.1016/j.microc.2026.118355",
    href: "https://doi.org/10.1016/j.microc.2026.118355",
  },
  {
    year: "2026",
    title:
      "Machine-Embroidered Textile Electrodes: Parametric Engineering for Lab-on-Glove Electrochemical Pesticide Detection",
    authors: "K. S. Deepak, Arshad Javed, Satish Kumar Dubey and Sanket Goel",
    journal: "Lab on a Chip",
    doi: "10.1039/D6LC00452K",
    href: "https://doi.org/10.1039/D6LC00452K",
  },
  {
    year: "2025",
    title:
      "Chemiluminescence Coupled Microfluidic Point of Source Testing Device for Onsite Detection of Harmful Pesticides in Fruits",
    authors: "Reshma P.A., Pavar Sai Kumar, Rajnish Kaur Calay and Sanket Goel",
    journal: "Microchemical Journal",
    doi: "10.1016/j.microc.2025.114381",
    href: "https://doi.org/10.1016/j.microc.2025.114381",
  },
];

export default function PesticideDetectionPage() {
  return (
    <main className="min-h-screen bg-white text-[#4F2C1D]">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#4F2C1D] px-8 py-24 text-white md:px-16 md:py-32">
        <div className="absolute inset-0">
          <img
            src="/research/pesticide-detection/pesticide-hero.jpg"
            alt=""
            className="h-full w-full object-cover opacity-30"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#2A1710] via-[#4F2C1D]/95 to-[#4F2C1D]/55" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#F2A900]">
            Research Foundation · Food Safety & Agriculture
          </p>

          <h1 className="mt-6 max-w-6xl text-6xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-8xl">
            Pesticide Detection
            <br />
            Technologies.
          </h1>

          <p className="mt-10 max-w-3xl text-xl leading-9 text-white/80">
            Portable optical, electrochemical, microfluidic, and wearable
            sensing systems developed for rapid pesticide-residue screening
            across food, water, agricultural produce, and field-relevant
            samples.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {[
              "Colourimetry",
              "Fluorescence",
              "Chemiluminescence",
              "Electrochemistry",
              "Microfluidics",
              "Wearables",
              "Chemometrics",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs text-white/85"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#platforms"
              className="rounded-full bg-[#F2A900] px-7 py-3.5 text-sm font-semibold text-[#2A1710]"
            >
              Explore platforms →
            </a>

            <a
              href="#comparison"
              className="rounded-full border border-white/35 px-7 py-3.5 text-sm font-semibold text-white"
            >
              Compare technologies
            </a>
          </div>
        </div>
      </section>

      {/* PROVENANCE */}
      <section className="bg-[#FFF9EC] px-8 py-7 md:px-16">
        <div className="mx-auto max-w-7xl border-l-2 border-[#F2A900] pl-5">
          <p className="max-w-5xl text-sm leading-7 text-[#706963]">
            The technologies presented here reflect prior research led by Prof.
            Sanket Goel and collaborators and are showcased as part of the
            scientific and translational foundation informing future SenSys
            research at the University of Manitoba.
          </p>
        </div>
      </section>

      {/* PLATFORMS */}
      <section
        id="platforms"
        className="scroll-mt-28 bg-[#F7F3EC] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
            Technology Portfolio
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Four complementary pesticide-sensing platforms.
          </h2>

          <div className="mt-16 space-y-8">
            {platforms.map((platform, index) => (
              <article
                key={platform.name}
                className="grid overflow-hidden border border-[#DDD5CC] bg-white lg:grid-cols-2"
              >
                <div
                  className={`relative min-h-[430px] overflow-hidden bg-[#EFEAE4] ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <img
                    src={platform.image}
                    alt={platform.title}
                    className="absolute inset-0 h-full w-full object-contain p-5"
                  />

                  <a
                    href={platform.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Watch ${platform.name} demonstration`}
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[#2A1710]/35 via-transparent to-transparent"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white bg-[#4F2C1D]/75 pl-1 text-xl text-white transition hover:scale-105 hover:bg-[#385E9D]">
                      ▶
                    </span>
                  </a>

                  <span className="absolute bottom-5 left-5 rounded-full bg-[#4F2C1D]/90 px-4 py-2 text-xs font-medium text-white">
                    Watch demonstration
                  </span>
                </div>

                <div
                  className={`flex flex-col justify-center p-8 md:p-10 lg:p-12 ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#385E9D]">
                    Platform {platform.number} · {platform.name}
                  </p>

                  <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                    {platform.title}
                  </h3>

                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#8A8179]">
                    {platform.category}
                  </p>

                  <p className="mt-6 text-base leading-8 text-[#706963]">
                    {platform.description}
                  </p>

                  <ul className="mt-7 space-y-3">
                    {platform.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex gap-3 text-sm leading-7 text-[#5F5953]"
                      >
                        <span className="mt-[10px] h-2 w-2 flex-none rounded-full bg-[#385E9D]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {platform.metrics.map((metric) => (
                      <span
                        key={metric}
                        className="rounded-full border border-[#D8D0C7] bg-[#FBF8F4] px-4 py-2 text-xs font-medium text-[#4F2C1D]"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <a
                      href={platform.publication}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-[#385E9D] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4F2C1D]"
                    >
                      Read publication →
                    </a>

                    <a
                      href={platform.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-[#CFC5BC] px-6 py-3 text-sm font-semibold text-[#4F2C1D] transition hover:border-[#385E9D] hover:text-[#385E9D]"
                    >
                      Watch video →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section
        id="comparison"
        className="scroll-mt-28 bg-white px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
            Technology Comparison
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Different sensing mechanisms for different field requirements.
          </h2>

          <div className="mt-12 overflow-x-auto border border-[#DDD5CC]">
            <table className="min-w-[1050px] w-full border-collapse text-left text-sm">
              <thead className="bg-[#4F2C1D] text-white">
                <tr>
                  {[
                    "Platform",
                    "Detection Principle",
                    "Primary Targets",
                    "Reported LoD",
                    "Real Samples",
                    "Distinguishing Capability",
                  ].map((heading) => (
                    <th key={heading} className="px-5 py-4 font-semibold">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {comparison.map((item, index) => (
                  <tr
                    key={item.platform}
                    className={index % 2 === 0 ? "bg-white" : "bg-[#FBF8F4]"}
                  >
                    <td className="border-b border-[#E6DFD7] px-5 py-5 font-semibold text-[#385E9D]">
                      {item.platform}
                    </td>

                    <td className="border-b border-[#E6DFD7] px-5 py-5 leading-6">
                      {item.principle}
                    </td>

                    <td className="border-b border-[#E6DFD7] px-5 py-5 leading-6">
                      {item.targets}
                    </td>

                    <td className="border-b border-[#E6DFD7] px-5 py-5 leading-6">
                      {item.lod}
                    </td>

                    <td className="border-b border-[#E6DFD7] px-5 py-5 leading-6">
                      {item.samples}
                    </td>

                    <td className="border-b border-[#E6DFD7] px-5 py-5 leading-6">
                      {item.capability}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PUBLICATIONS */}
      <section className="bg-[#F7F3EC] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
            Selected Publications
          </p>

          <div className="mt-12 divide-y divide-[#DDD5CC] border-y border-[#DDD5CC]">
            {publications.map((paper, index) => (
              <article
                key={paper.title}
                className="grid gap-7 py-9 md:grid-cols-[0.12fr_1fr_auto] md:items-center"
              >
                <span className="text-sm font-semibold text-[#F2A900]">
                  0{index + 1}
                </span>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#385E9D]">
                    {paper.journal} · {paper.year}
                  </p>

                  <h3 className="mt-3 max-w-4xl text-xl font-semibold leading-8">
                    {paper.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#706963]">
                    {paper.authors}
                  </p>

                  <p className="mt-1 text-xs text-[#8A8179]">
                    DOI: {paper.doi}
                  </p>
                </div>

                <a
                  href={paper.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit rounded-full border border-[#385E9D] px-5 py-2.5 text-xs font-semibold text-[#385E9D] transition hover:bg-[#385E9D] hover:text-white"
                >
                  View paper →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FUTURE AT SENSYS */}
      <section className="bg-[#F2A900] px-8 py-24 text-[#2A1710] md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#4F2C1D]/70">
                Pesticide Sensing at SenSys
              </p>

              <h2 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] md:text-7xl">
                From residue screening to intelligent food-safety systems.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-8 text-[#4F2C1D]/85">
                At SenSys, this foundation will inform next-generation
                pesticide and food-safety technologies involving multiplexed
                microfluidics, intelligent optical and electrochemical sensing,
                portable instrumentation, field validation, and connected
                decision-support systems.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/research"
                  className="rounded-full bg-[#4F2C1D] px-7 py-3.5 text-sm font-semibold text-white"
                >
                  SenSys Research →
                </Link>

                <Link
                  href="/join"
                  className="rounded-full border border-[#4F2C1D] px-7 py-3.5 text-sm font-semibold"
                >
                  Join SenSys →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}