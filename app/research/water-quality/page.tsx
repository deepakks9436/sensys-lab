import Link from "next/link";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const technologies = [
  {
    number: "01",
    title: "Multiplexed Heavy-Metal Sensing",
    subtitle: "Cd²⁺ · Pb²⁺ · Cu²⁺ · Hg²⁺",
    category: "Electrochemistry · AI · IoT",
    image: "/research/water-quality/heavy-metal-sensing.jpg",
    description:
      "A multiplexed electrochemical sensing platform based on gold-nanoparticle-modified carbon-thread electrodes for simultaneous analysis of toxic heavy-metal ions.",
    features: [
      "Carbon-thread sensing architecture modified with gold nanoparticles.",
      "Detection of Cd²⁺, Pb²⁺, Cu²⁺, and Hg²⁺.",
      "Multiplexed electrochemical measurement strategy.",
      "CNN-assisted interpretation for intelligent classification.",
      "IoT-enabled architecture for connected water-quality monitoring.",
    ],
    publication: "https://doi.org/10.1038/s41545-025-00441-x",
  },
  {
    number: "02",
    title: "Temperature-Compensated Ion-Selective Array",
    subtitle: "Nitrate · Ammonium · Chloride",
    category: "Potentiometry · IoT · Multi-Parameter Sensing",
    image: "/research/water-quality/ion-selective-array.png",
    description:
      "A portable ion-selective array designed for rapid measurement of multiple water-quality ions while accounting for temperature-dependent sensor response.",
    features: [
      "Simultaneous measurement of nitrate, ammonium, and chloride.",
      "Temperature compensation for improved field reliability.",
      "Portable multi-channel ion-selective measurement system.",
      "Approximately 30-second analytical response.",
      "Wi-Fi connectivity and Android-based user interface.",
    ],
    publication: "https://doi.org/10.1109/TIM.2026.3677997",
  },
  {
    number: "03",
    title: "Flexible Laser-Induced Graphene Fluoride Sensor",
    subtitle: "Fluoride Detection",
    category: "LIG · Functional Polymer · Flexible Sensor",
    image: "/research/water-quality/fluoride-lig-sensor.jpg",
    description:
      "A flexible fluoride-sensing platform using laser-induced graphene functionalized with poly(3-aminophenylboronic acid) for selective electrochemical ion detection.",
    features: [
      "Laser-induced graphene electrode architecture.",
      "Poly(3-aminophenylboronic acid) functionalization.",
      "Flexible and low-cost sensing format.",
      "Selective fluoride-ion analysis.",
      "Demonstrated using real water samples.",
    ],
    publication: "https://doi.org/10.1109/JSEN.2023.3285664",
  },
  {
    number: "04",
    title: "PANI-Functionalized Carbon-Cloth pH Sensor",
    subtitle: "pH 2–12",
    category: "Flexible Electrochemistry · pH Monitoring",
    image: "/research/water-quality/ph-carbon-cloth-sensor.gif",
    description:
      "A flexible carbon-cloth electrode functionalized with polyaniline for broad-range potentiometric pH measurement in portable water-quality applications.",
    features: [
      "Flexible carbon-cloth sensing substrate.",
      "Polyaniline-based pH-responsive interface.",
      "Wide operating range from approximately pH 2 to 12.",
      "Compatible with low-cost portable readout systems.",
      "Suitable for distributed water-monitoring workflows.",
    ],
    publication: "https://doi.org/10.1109/TNB.2022.3188605",
  },
  {
    number: "05",
    title: "MWCNT Carbon-Thread Ammonia Sensor",
    subtitle: "Ammonia Monitoring",
    category: "Nanocarbon · Electrochemical Sensing",
    image: "/research/water-quality/ammonia-sensor.gif",
    description:
      "A carbon-thread-based electrochemical platform enhanced with multi-walled carbon nanotubes for portable ammonia analysis in water-quality monitoring.",
    features: [
      "Carbon-thread electrode architecture.",
      "MWCNT-based surface enhancement.",
      "Electrochemical ammonia detection.",
      "Compact and low-cost sensing format.",
      "Designed toward field-deployable environmental monitoring.",
    ],
    publication: "https://doi.org/10.1016/j.envres.2022.115192",
  },
  {
    number: "06",
    title: "AI-Enabled Water Quality Index Platform",
    subtitle: "Multi-Parameter Water Assessment",
    category: "IoT · Machine Learning · Decision Support",
    image: "/research/water-quality/ai-water-quality-index.gif",
    description:
      "An IoT-connected monitoring system combining conventional water-quality parameters with machine-learning-assisted interpretation and Water Quality Index estimation.",
    features: [
      "Measures pH, dissolved oxygen, electrical conductivity, TDS, turbidity, and temperature.",
      "Multi-parameter acquisition through embedded electronics.",
      "IoT-enabled remote monitoring.",
      "Machine-learning-supported interpretation.",
      "Water Quality Index estimation for simplified decision support.",
    ],
    publication: "https://doi.org/10.1109/ICST59744.2023.10460817",
  },
];

const workflow = [
  {
    number: "01",
    title: "Sample",
    text: "Water is collected from the target source or introduced directly to a field-deployable sensing platform.",
  },
  {
    number: "02",
    title: "Selective Sensing",
    text: "Ion-selective, electrochemical, resistive, or multi-parameter sensors generate analyte-specific responses.",
  },
  {
    number: "03",
    title: "Signal Conditioning",
    text: "Analog front-end electronics stabilize, amplify, filter, and convert the raw sensor responses.",
  },
  {
    number: "04",
    title: "Embedded Processing",
    text: "Microcontrollers or portable instruments digitize and process the sensor data in real time.",
  },
  {
    number: "05",
    title: "AI / ML",
    text: "Data-driven methods support compensation, classification, prediction, or multi-analyte interpretation.",
  },
  {
    number: "06",
    title: "Connected Output",
    text: "Results are delivered through mobile devices, Wi-Fi, IoT platforms, or field decision-support interfaces.",
  },
];

const targets = [
  {
    group: "Toxic Metals",
    examples: "Cd²⁺ · Pb²⁺ · Cu²⁺ · Hg²⁺",
  },
  {
    group: "Nutrient & Ionic Species",
    examples: "NO₃⁻ · NH₄⁺ · Cl⁻ · F⁻",
  },
  {
    group: "Chemical Indicators",
    examples: "pH · Ammonia",
  },
  {
    group: "Physical / Bulk Parameters",
    examples: "EC · TDS · Turbidity · Temperature",
  },
  {
    group: "Water Quality Indicators",
    examples: "DO · Multi-Parameter WQI",
  },
];

const publications = [
  {
    number: "01",
    title:
      "Intelligent multiplexed heavy-metal sensing using electrochemical interfaces and data-driven analysis",
    journal: "npj Clean Water",
    year: "2025",
    href: "https://doi.org/10.1038/s41545-025-00441-x",
    doi: "10.1038/s41545-025-00441-x",
  },
  {
    number: "02",
    title:
      "Temperature-Compensated, IoT-Enabled Portable Ion-Selective Array Device for Multi-Parameter Measurements in Water Samples",
    journal: "IEEE Transactions on Instrumentation and Measurement",
    year: "2026",
    href: "https://doi.org/10.1109/TIM.2026.3677997",
    doi: "10.1109/TIM.2026.3677997",
  },
  {
    number: "03",
    title:
      "Flexible Laser-Induced Graphene-Based Electrochemical Sensor for Selective Fluoride Detection",
    journal: "IEEE Sensors Journal",
    year: "2023",
    href: "https://doi.org/10.1109/JSEN.2023.3285664",
    doi: "10.1109/JSEN.2023.3285664",
  },
  {
    number: "04",
    title:
      "Flexible electrochemical sensing platform for water-quality monitoring",
    journal: "IEEE Transactions on NanoBioscience",
    year: "2022",
    href: "https://doi.org/10.1109/TNB.2022.3188605",
    doi: "10.1109/TNB.2022.3188605",
  },
  {
    number: "05",
    title:
      "Carbon-thread and nanocarbon-enabled sensing for environmental water monitoring",
    journal: "Environmental Research",
    year: "2022",
    href: "https://doi.org/10.1016/j.envres.2022.115192",
    doi: "10.1016/j.envres.2022.115192",
  },
  {
    number: "06",
    title:
      "IoT and machine-learning-assisted multi-parameter water-quality monitoring",
    journal: "International Conference on Smart Technologies",
    year: "2023",
    href: "https://doi.org/10.1109/ICST59744.2023.10460817",
    doi: "10.1109/ICST59744.2023.10460817",
  },
];

export default function WaterQualityPage() {
  return (
    <main className="min-h-screen bg-white text-[#4F2C1D]">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#4F2C1D] px-8 py-24 text-white md:px-16 md:py-32">
        <div className="absolute inset-0">
          <img
            src="/research/water-quality/water-quality-hero.jpeg"
            alt=""
            className="h-full w-full object-cover opacity-30"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#2A1710] via-[#4F2C1D]/95 to-[#4F2C1D]/55" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#F2A900]">
            Research Foundation · Environmental Intelligence
          </p>

          <h1 className="mt-6 max-w-6xl text-6xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-8xl">
            Water Quality
            <br />
            Technologies.
          </h1>

          <p className="mt-10 max-w-3xl text-xl leading-9 text-white/80">
            Portable, flexible, multiplexed, and connected sensing systems for
            chemical ions, toxic metals, environmental parameters, and
            intelligent water-quality assessment.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {[
              "Heavy Metals",
              "Ion-Selective Sensors",
              "Laser-Induced Graphene",
              "Flexible Sensors",
              "IoT",
              "Machine Learning",
              "Water Quality Index",
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
              href="#technologies"
              className="rounded-full bg-[#F2A900] px-7 py-3.5 text-sm font-semibold text-[#2A1710]"
            >
              Explore technologies →
            </a>

            <a
              href="#workflow"
              className="rounded-full border border-white/35 px-7 py-3.5 text-sm font-semibold text-white"
            >
              View sensing workflow
            </a>
          </div>
        </div>
      </section>

      {/* PROVENANCE */}
      <section className="bg-[#FFF9EC] px-8 py-7 md:px-16">
        <div className="mx-auto max-w-7xl border-l-2 border-[#F2A900] pl-5">
          <p className="max-w-5xl text-sm leading-7 text-[#706963]">
            The technologies presented on this page reflect prior research led
            by Prof. Sanket Goel and collaborators and are shown as part of the
            scientific and translational foundation informing future SenSys
            research at the University of Manitoba.
          </p>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
                Research Overview
              </p>

              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                From individual ions to intelligent water assessment.
              </h2>

              <p className="mt-7 max-w-3xl text-base leading-8 text-[#706963]">
                The water-quality programme combines electrochemical and
                ion-selective sensing, functional nanomaterials, flexible
                substrates, embedded instrumentation, IoT connectivity, and
                machine learning.
              </p>

              <p className="mt-5 max-w-3xl text-base leading-8 text-[#706963]">
                Rather than relying on a single sensing approach, different
                interfaces are engineered for different classes of
                contaminants and water-quality indicators, then integrated
                with portable acquisition and data interpretation.
              </p>
            </div>

            <div className="border border-[#DDD5CC] bg-[#F7F3EC] p-5">
              <img
                src="/research/water-quality/ion-selective-array.png"
                alt="Portable ion-selective water-quality sensing platform"
                className="aspect-[4/3] w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TARGETS */}
      <section className="bg-[#F7F3EC] px-8 py-20 md:px-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
            Measurement Space
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
            Multiple classes of water-quality information.
          </h2>

          <div className="mt-12 grid gap-px overflow-hidden border border-[#DDD5CC] bg-[#DDD5CC] md:grid-cols-5">
            {targets.map((item) => (
              <div key={item.group} className="bg-white p-6">
                <h3 className="text-sm font-semibold text-[#4F2C1D]">
                  {item.group}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#385E9D]">
                  {item.examples}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGIES */}
      <section
        id="technologies"
        className="scroll-mt-28 bg-white px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
            Technology Portfolio
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Six approaches to decentralized water analysis.
          </h2>

          <p className="mt-7 max-w-3xl text-base leading-8 text-[#706963]">
            The portfolio ranges from selective electrochemical interfaces to
            multi-parameter intelligent monitoring systems, demonstrating how
            materials, instrumentation, connectivity, and analytics can be
            combined according to the target application.
          </p>

          <div className="mt-16 space-y-8">
            {technologies.map((item, index) => (
              <article
                key={item.title}
                className="grid overflow-hidden border border-[#DDD5CC] bg-[#FBF8F4] lg:grid-cols-2"
              >
                <div
                  className={`relative min-h-[430px] bg-white ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-contain p-6"
                  />
                </div>

                <div
                  className={`flex flex-col justify-center p-8 md:p-10 lg:p-12 ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#385E9D]">
                    Technology {item.number}
                  </p>

                  <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#8A8179]">
                    {item.subtitle}
                  </p>

                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#F2A900]">
                    {item.category}
                  </p>

                  <p className="mt-6 text-base leading-8 text-[#706963]">
                    {item.description}
                  </p>

                  <ul className="mt-7 space-y-3">
                    {item.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex gap-3 text-sm leading-7 text-[#5F5953]"
                      >
                        <span className="mt-[10px] h-2 w-2 flex-none rounded-full bg-[#385E9D]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={item.publication}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 w-fit rounded-full bg-[#385E9D] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4F2C1D]"
                  >
                    View publication →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section
        id="workflow"
        className="scroll-mt-28 bg-[#F7F3EC] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
            Integrated Workflow
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Sense. Process. Interpret. Connect.
          </h2>

          <p className="mt-7 max-w-3xl text-base leading-8 text-[#706963]">
            A common systems philosophy connects the individual technologies:
            translate chemistry into an electrical signal, condition that
            signal, process it locally, apply intelligent analysis where
            useful, and deliver the result through a connected interface.
          </p>

          <div className="mt-14 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
            {workflow.map((item, index) => (
              <div
                key={item.number}
                className="relative border border-[#DDD5CC] bg-white p-6"
              >
                <span className="text-xs font-semibold text-[#F2A900]">
                  {item.number}
                </span>

                <h3 className="mt-8 text-lg font-semibold">
                  {item.title}
                </h3>

                <p className="mt-3 text-xs leading-6 text-[#706963]">
                  {item.text}
                </p>

                {index < workflow.length - 1 && (
                  <span className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-xl text-[#385E9D] lg:block">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENVIRONMENTAL INTELLIGENCE */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="flex min-h-[520px] items-center justify-center border border-[#DDD5CC] bg-[#F7F3EC] p-6">
              <img
                src="/research/water-quality/ai-water-quality-index.gif"
                alt="AI-enabled intelligent water-quality monitoring platform"
                className="max-h-[480px] w-full object-contain"
              />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
                Beyond Measurement
              </p>

              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                From sensor readings to environmental intelligence.
              </h2>

              <p className="mt-7 text-base leading-8 text-[#706963]">
                Connected water-quality platforms can combine multiple sensor
                streams with compensation algorithms, machine learning, and
                Water Quality Index calculations to move beyond isolated
                measurements toward actionable environmental information.
              </p>

              <div className="mt-9 grid gap-4 sm:grid-cols-2">
                {[
                  [
                    "Temperature Compensation",
                    "Correct environmentally induced shifts in sensor response.",
                  ],
                  [
                    "Multiplexed Analysis",
                    "Interpret multiple contaminants or quality parameters together.",
                  ],
                  [
                    "Machine Learning",
                    "Support classification, prediction, and complex response interpretation.",
                  ],
                  [
                    "IoT Connectivity",
                    "Enable distributed monitoring and remote access to water-quality data.",
                  ],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    className="border border-[#DDD5CC] bg-[#FBF8F4] p-5"
                  >
                    <h3 className="text-sm font-semibold">{title}</h3>

                    <p className="mt-2 text-xs leading-6 text-[#706963]">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section className="bg-[#4F2C1D] px-8 py-24 text-white md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#F2A900]">
                Research Demonstration
              </p>

              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                See the water-quality platform in action.
              </h2>

              <p className="mt-7 max-w-xl text-base leading-8 text-white/70">
                The demonstration highlights the integration of sensing,
                portable instrumentation, embedded electronics, user
                interaction, and connected environmental monitoring.
              </p>

              <a
                href="https://www.youtube.com/watch?v=guJOyU2vZK4"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex rounded-full bg-[#F2A900] px-6 py-3 text-sm font-semibold text-[#2A1710]"
              >
                Watch on YouTube →
              </a>
            </div>

            <div className="aspect-video overflow-hidden border border-white/15 bg-black">
              <iframe
                src="https://www.youtube.com/embed/guJOyU2vZK4"
                title="Water quality sensing research demonstration"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* PUBLICATIONS */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
                Selected Publications
              </p>

              <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                Research underpinning the water-quality portfolio.
              </h2>
            </div>

            <Link
              href="/publications"
              className="w-fit text-sm font-semibold text-[#385E9D]"
            >
              View all publications →
            </Link>
          </div>

          <div className="mt-14 divide-y divide-[#DDD5CC] border-y border-[#DDD5CC]">
            {publications.map((paper) => (
              <article
                key={paper.number}
                className="grid gap-7 py-9 md:grid-cols-[0.12fr_1fr_auto] md:items-center"
              >
                <div>
                  <span className="text-sm font-semibold text-[#F2A900]">
                    {paper.number}
                  </span>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#385E9D]">
                    {paper.journal} · {paper.year}
                  </p>

                  <h3 className="mt-3 max-w-4xl text-xl font-semibold leading-8">
                    {paper.title}
                  </h3>

                  <p className="mt-2 text-xs text-[#8A8179]">
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
                Water Intelligence at SenSys
              </p>

              <h2 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] md:text-7xl">
                Toward integrated multi-analyte water-quality systems.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-8 text-[#4F2C1D]/85">
                At SenSys, this foundation will support new water-quality
                platforms combining multi-analyte sensing, microfluidics,
                advanced materials, portable instrumentation, intelligent data
                analytics, and field-deployable architectures.
              </p>

              <p className="mt-5 text-base leading-7 text-[#4F2C1D]/80">
                Future work will also connect water sensing with the broader
                Soil-on-Chip, precision-agriculture, environmental-monitoring,
                and 4D-printed systems being developed within the SenSys
                research programme.
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