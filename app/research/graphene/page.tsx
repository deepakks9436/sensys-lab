import Link from "next/link";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const scholar = (title: string) =>
  `https://scholar.google.com/scholar?q=${encodeURIComponent(`"${title}"`)}`;

const materials = [
  {
    image: "/research/graphene/papertronic-lig.gif",
    tag: "Paper Graphenisation",
    title: "Papertronic Laser-Induced Graphene",
    description:
      "Polyimide-resin-coated paper is converted into conductive laser-induced graphene using a blue-diode laser, enabling rapid and low-cost paper-based electronic structures.",
    meta: "Graphenized Papertronic Devices",
    paper: scholar(
      "Graphenized Papertronic Devices using Blue Laser ablated Polyimide Resin Paper"
    ),
  },
  {
    image: "/research/graphene/transferable-lig.gif",
    tag: "Transfer Technology",
    title: "Transferable Laser-Induced Graphene",
    description:
      "A lamination-assisted transfer route places laser-induced graphene onto flexible layers for microfluidic sensors, electrochemical devices, and fuel-cell architectures.",
    meta: "Transferred LIG platform",
    paper: scholar(
      "Leveraging 3-D Printer With 2.8-W Blue Laser Diode to Form Laser-Induced Graphene for Microfluidic Fuel Cell and Electrochemical Sensor"
    ),
  },
  {
    image: "/research/graphene/lig-photoresist-glass.jpg",
    tag: "Ultra-Thin Electrodes",
    title: "LIG on Photoresist-Coated Glass",
    description:
      "Ultra-thin graphene electrodes are formed over negative photoresist on glass for electronic and electrochemical applications.",
    meta: "Ultra-thin LIG electrodes",
    paper: scholar(
      "Fabrication of ultra-thin laser induced graphene electrodes over negative photoresist on glass for various electronic applications"
    ),
  },
  {
    image: "/research/graphene/boron-doped-lig.gif",
    tag: "Doped Graphene",
    title: "Boron-Doped Laser-Induced Graphene",
    description:
      "Boron incorporation modifies graphene surface activity and electrochemical behaviour for sensing and flexible energy-storage applications.",
    meta: "IEEE Sensors Letters · 2024",
    paper: "https://doi.org/10.1109/LSENS.2024.3375286",
  },
  {
    image: "/research/graphene/biopolymer-rgo.png",
    tag: "Green Materials",
    title: "Biopolymer-Assisted Reduced Graphene Oxide",
    description:
      "Natural shellac enables rapid formation of conductive reduced graphene oxide on paper and textile substrates for flexible, biomedical, and energy applications.",
    meta: "Materials Advances · 2024",
    paper: "https://doi.org/10.1039/D4MA00151F",
  },
  {
    image: "/research/graphene/metal-graphene-composite.jpg",
    tag: "Hybrid Interfaces",
    title: "Metal–3D Graphene Composites",
    description:
      "In-situ metal–graphene composite formation creates catalytic and functional interfaces for advanced electrochemical biosensing applications.",
    meta: "Metal–graphene composite research",
    paper: scholar(
      "In-situ synthesis of metal-3D graphene composites on flexible substrates as an advanced material for electrochemical biosensors and antibacterial performance"
    ),
  },
];

const flagship = [
  {
    image: "/research/graphene/myoglobin-bioresistor.jpg",
    tag: "Cardiac Diagnostics",
    title: "Graphene BioResistor for Myoglobin",
    description:
      "A two-terminal antibody-functionalized graphene platform enables label-free myoglobin quantification through direct resistance modulation.",
    meta: "IEEE Sensors Letters · 2026",
    paper: "https://doi.org/10.1109/LSENS.2026.3659511",
  },
  {
    image: "/research/graphene/ctni-microfluidic-sensor.jpg",
    tag: "Point-of-Care Diagnostics",
    title: "Portable Microfluidic cTnI Sensor",
    description:
      "Laser-induced graphene electrodes, a PDMS microchannel, portable pumping, and smartphone-enabled electrochemical readout form an integrated cardiac biomarker platform.",
    meta: "Journal of Micromechanics and Microengineering",
    paper: "https://doi.org/10.1088/1361-6439/ac8a55",
  },
  {
    image: "/research/graphene/mxene-lig-dopamine.jpg",
    tag: "Neurochemical Sensing",
    title: "MXene–LIG Dopamine Detection",
    description:
      "An integrated microfluidic device combines MXene-enhanced LIG electrodes with electrochemical dopamine analysis.",
    meta: "Integrated microfluidic biosensor",
    paper: scholar(
      "Integrated Microfluidic Device With MXene Enhanced Laser-Induced Graphene Bioelectrode for Sensitive and Selective Electroanalytical Detection of Dopamine"
    ),
  },
  {
    image: "/research/graphene/doped-graphene-supercapacitor.png",
    tag: "Flexible Energy Storage",
    title: "Doped Graphene Supercapacitor",
    description:
      "Laser-assisted doped graphene on paper and textile substrates enables low-cost and mechanically compliant charge-storage architectures.",
    meta: "Materials Advances · 2026",
    paper: "https://doi.org/10.1039/D6MA00723F",
  },
];

const healthcare = [
  {
    image: "/research/graphene/urea-biosensor.jpg",
    tag: "Renal Health",
    title: "Flexible Urea Biosensor",
    description:
      "MWCNT-enhanced laser-induced graphene electrodes with urease immobilization enable point-of-care electrochemical urea quantification.",
    meta: "Sensors and Actuators A · 2026",
    paper: "https://doi.org/10.1016/j.sna.2026.117532",
  },
  {
    image: "/research/graphene/choline-platform.jpg",
    tag: "Multimodal Diagnostics",
    title: "CL–ECL–EC Choline Platform",
    description:
      "A shared graphene-enabled fabrication strategy supports chemiluminescent, electrochemiluminescent, and electrochemical point-of-care device architectures.",
    meta: "Sensors and Actuators A",
    paper: "https://doi.org/10.1016/j.sna.2024.116147",
  },
  {
    image: "/research/graphene/breath-sensor.gif",
    tag: "Wearable Respiration",
    title: "Piezoresistive Breath Sensor",
    description:
      "A clean-room-free graphene sensor integrated with a surgical mask enables non-invasive monitoring of respiratory patterns.",
    meta: "Wearable point-of-care sensing",
    paper: scholar(
      "Noninvasive Clean Room Free Printed Piezoresistive Breath Sensor for Point of Care Application"
    ),
  },
  {
    image: "/research/graphene/glucose-lactate-monitoring.jpg",
    tag: "Metabolic Monitoring",
    title: "Multiplex Glucose & Lactate Monitoring",
    description:
      "A real-time electrochemical platform supports simultaneous glucose and lactate analysis in sweat, cellular systems, and physiological fluids.",
    meta: "Multiplex biosensing",
    paper: scholar(
      "Real-time multiplex electrochemical biosensor for simultaneous quantification of glucose and lactate in cell and bodily fluids"
    ),
  },
];

const environment = [
  {
    image: "/research/graphene/fluoride-sensor.jpg",
    tag: "Water Quality",
    title: "Selective Fluoride Detection",
    description:
      "Polymer-functionalized laser-induced graphene provides selective electrochemical fluoride sensing in real water samples.",
    meta: "IEEE Sensors Journal",
    paper: "https://doi.org/10.1109/JSEN.2023.3285664",
  },
  {
    image: "/research/graphene/phosphate-sensor.gif",
    tag: "Nutrient Monitoring",
    title: "Co-rGO Phosphate Sensor",
    description:
      "An in-situ Co-rGO nanocomposite ink is integrated with screen-printed electrodes for selective electrochemical phosphate sensing.",
    meta: "Electrochemical nutrient analysis",
    paper: scholar(
      "In-Situ Synthesized Co-rGO Nanocomposite A Robust Selective Material for Phosphate Electrochemical Sensor"
    ),
  },
  {
    image: "/research/graphene/copper-sensor.png",
    tag: "Multimodal Ion Analysis",
    title: "Copper Detection & Remediation",
    description:
      "A molecular probe integrated with laser-induced graphene enables multimodal Cu(II) detection together with remediation-oriented functionality.",
    meta: "Optoelectrochemical sensing",
    paper: scholar(
      "Probe integrated with laser-induced graphene electrode application towards multimodal optoelectrochemical detection of Cu(ii) ions and their remediation"
    ),
  },
];

const energy = [
  {
    image: "/research/graphene/glucose-biofuel-cell.gif",
    tag: "Bioenergy",
    title: "Microfluidic Glucose Biofuel Cell",
    description:
      "CO₂-laser-ablated graphene bioelectrodes and microchannels form a compact direct-electron-transfer biofuel-cell architecture.",
    meta: "Microfluidic enzymatic biofuel cell",
    paper: scholar(
      "Direct-Electron-Transfer-Based Microfluidic Glucose Biofuel Cell With CO2 Laser Ablated Bioelectrodes and Microchannel"
    ),
  },
  {
    image: "/research/graphene/doped-graphene-supercapacitor.png",
    tag: "Flexible Energy Storage",
    title: "Doped Graphene on Paper & Textile",
    description:
      "Doped graphene is fabricated directly on flexible paper and textile substrates for scalable supercapacitor architectures.",
    meta: "Materials Advances · 2026",
    paper: "https://doi.org/10.1039/D6MA00723F",
  },
];

const microfluidics = [
  {
    image: "/research/graphene/mxene-lig-dopamine.jpg",
    tag: "Neurochemical Microfluidics",
    title: "MXene–LIG Dopamine Sensor",
    description:
      "A microchannel is integrated with MXene-modified graphene electrodes for sensitive electrochemical dopamine detection.",
    meta: "Integrated dopamine biosensor",
    paper: scholar(
      "Integrated Microfluidic Device With MXene Enhanced Laser-Induced Graphene Bioelectrode for Sensitive and Selective Electroanalytical Detection of Dopamine"
    ),
  },
  {
    image: "/research/graphene/lig-microheater.jpg",
    tag: "Thermal Microreactors",
    title: "Integrated LIG Microheater",
    description:
      "Laser-induced graphene heaters provide localized thermal control within PDMS microreactor systems.",
    meta: "Microfluidic synthesis platform",
    paper: scholar(
      "Microfluidic Microreactor Device With Integrated Heaters for Temperature Assisted Synthesis of Gold Nanoparticles and Alkene"
    ),
  },
  {
    image: "/research/graphene/transferable-lig.gif",
    tag: "Transfer Technology",
    title: "Transferred-LIG Microfluidic Devices",
    description:
      "A lamination-assisted process transfers graphene structures onto flexible layers for microfluidic sensors and compact fuel-cell systems.",
    meta: "Transferred LIG platform",
    paper: scholar(
      "Leveraging 3-D Printer With 2.8-W Blue Laser Diode to Form Laser-Induced Graphene for Microfluidic Fuel Cell and Electrochemical Sensor"
    ),
  },
  {
    image: "/research/graphene/ctni-microfluidic-sensor.jpg",
    tag: "Portable Microfluidics",
    title: "Cardiac Biomarker Point-of-Care Platform",
    description:
      "A PDMS microchannel, graphene electrodes, 3D-printed peristaltic pumping, and portable electrochemical readout form an integrated diagnostic system.",
    meta: "Journal of Micromechanics and Microengineering",
    paper: "https://doi.org/10.1088/1361-6439/ac8a55",
  },
];

const capabilities = [
  {
    title: "Laser Fabrication",
    text: "CO₂ and blue-diode laser graphenisation, engraving, direct writing, and patterning.",
  },
  {
    title: "Flexible Substrates",
    text: "Polyimide, paper, cloth, glass, polymer films, and laminated supports.",
  },
  {
    title: "Surface Functionalization",
    text: "Enzymes, antibodies, polymers, metals, MXenes, metal oxides, and nanocarbon hybrids.",
  },
  {
    title: "Electrochemical Testing",
    text: "CV, DPV, EIS, chronoamperometry, potentiometry, GCD, and related electroanalytical methods.",
  },
  {
    title: "Microfluidic Integration",
    text: "PDMS channels, transfer layers, pumps, reservoirs, fluid handling, and local thermal control.",
  },
  {
    title: "Portable Electronics",
    text: "Compact potentiostats, embedded electronics, signal conditioning, smartphones, and connected acquisition.",
  },
  {
    title: "Material Characterization",
    text: "SEM, Raman, XPS, XRD, EDX, morphology, and electrical characterization.",
  },
  {
    title: "Application Validation",
    text: "Healthcare, water, environmental, wearable, microfluidic, and energy-device evaluation.",
  },
];

function ResearchCard({
  item,
}: {
  item: {
    image: string;
    tag: string;
    title: string;
    description: string;
    meta: string;
    paper: string;
  };
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden border border-[#DDD5CC] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F7F3EC]">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-[1.025]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#385E9D]">
          {item.tag}
        </p>

        <h3 className="mt-3 text-xl font-semibold leading-tight text-[#4F2C1D]">
          {item.title}
        </h3>

        <p className="mt-4 flex-1 text-sm leading-7 text-[#706963]">
          {item.description}
        </p>

        <p className="mt-5 border-t border-[#E8E1D9] pt-4 text-xs text-[#8A8179]">
          {item.meta}
        </p>

        <a
          href={item.paper}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-sm font-semibold text-[#385E9D] transition hover:text-[#4F2C1D]"
        >
          View publication →
        </a>
      </div>
    </article>
  );
}

export default function GraphenePage() {
  return (
    <main className="min-h-screen bg-white text-[#4F2C1D]">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#4F2C1D] px-8 py-24 text-white md:px-16 md:py-32">
        <div className="absolute inset-0">
          <img
            src="/research/graphene/graphene-hero.jpg"
            alt=""
            className="h-full w-full object-cover opacity-28"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#2A1710] via-[#4F2C1D]/95 to-[#4F2C1D]/55" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#F2A900]">
            Research Foundation · Advanced Materials
          </p>

          <h1 className="mt-6 max-w-6xl text-6xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-8xl">
            Graphene
            <br />
            Technologies.
          </h1>

          <p className="mt-10 max-w-3xl text-xl leading-9 text-white/80">
            Engineering graphene from material synthesis and laser processing
            to flexible electronics, biosensors, microfluidics, environmental
            monitoring, energy harvesting, and storage.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {[
              "Laser-Induced Graphene",
              "Reduced Graphene Oxide",
              "Flexible Electronics",
              "Biosensors",
              "Microfluidics",
              "Energy",
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
              href="#story"
              className="rounded-full bg-[#F2A900] px-7 py-3.5 text-sm font-semibold text-[#2A1710]"
            >
              Explore research →
            </a>

            <a
              href="#flagship"
              className="rounded-full border border-white/35 px-7 py-3.5 text-sm font-semibold text-white"
            >
              Flagship technologies
            </a>
          </div>
        </div>
      </section>

      {/* PROVENANCE */}
      <section className="bg-[#FFF9EC] px-8 py-7 md:px-16">
        <div className="mx-auto max-w-7xl border-l-2 border-[#F2A900] pl-5">
          <p className="max-w-5xl text-sm leading-7 text-[#706963]">
            The work presented on this page reflects prior research led by
            Prof. Sanket Goel and collaborators and is showcased as part of the
            scientific and technological foundation informing future SenSys
            research at the University of Manitoba.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white px-8 py-12 md:px-16">
        <div className="mx-auto grid max-w-7xl border border-[#DDD5CC] md:grid-cols-4">
          {[
            ["30+", "Graphene-related research works"],
            ["15+", "Graphene-enabled device concepts"],
            ["8", "Application domains"],
            ["6+", "Material & hybrid platforms"],
          ].map(([value, label], index) => (
            <div
              key={label}
              className={`p-7 text-center ${
                index < 3
                  ? "border-b border-[#DDD5CC] md:border-b-0 md:border-r"
                  : ""
              }`}
            >
              <p className="text-4xl font-semibold text-[#F2A900]">
                {value}
              </p>

              <p className="mt-2 text-xs leading-5 text-[#706963]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PAGE NAV */}
      <section className="sticky top-[72px] z-30 border-y border-[#E2DBD3] bg-white/95 px-4 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto py-3 text-xs font-medium">
          {[
            ["Story", "#story"],
            ["Evolution", "#evolution"],
            ["Materials", "#materials"],
            ["Flagship", "#flagship"],
            ["Healthcare", "#healthcare"],
            ["Environment", "#environment"],
            ["Energy", "#energy"],
            ["Microfluidics", "#microfluidics"],
            ["Capabilities", "#capabilities"],
            ["Publications", "#publications"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="flex-none rounded-full px-4 py-2 text-[#4F2C1D] transition hover:bg-[#385E9D] hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section
        id="story"
        className="scroll-mt-36 bg-white px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative min-h-[500px] overflow-hidden border border-[#DDD5CC] bg-[#F7F3EC]">
            <img
              src="/research/graphene/graphene-portfolio.jpg"
              alt="Graphene research portfolio"
              className="absolute inset-0 h-full w-full object-contain p-6"
            />

            <div className="absolute bottom-5 left-5 right-5 bg-[#4F2C1D]/90 p-4 text-sm font-medium text-white">
              Material engineering → Device fabrication → Application
              validation
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
              Research Story
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
              Beyond graphene as an electrode.
            </h2>

            <p className="mt-7 max-w-3xl text-base leading-8 text-[#706963]">
              The research programme treats graphene not simply as a material,
              but as a scalable fabrication and integration platform. Material
              composition, substrate, laser parameters, surface chemistry, and
              device architecture are engineered according to the intended
              sensing, microfluidic, wearable, or energy function.
            </p>

            <div className="mt-9 space-y-6">
              {[
                [
                  "01",
                  "Engineer the material",
                  "Laser-induced graphene, reduced graphene oxide, doped graphene, nanocarbon hybrids, and functional composites.",
                ],
                [
                  "02",
                  "Build the device",
                  "Sensors, bioresistors, flexible electrodes, microfluidic platforms, heaters, fuel cells, and supercapacitors.",
                ],
                [
                  "03",
                  "Integrate the system",
                  "Fluid handling, electronics, portable readout, smartphone interfaces, and intelligent data interpretation.",
                ],
                [
                  "04",
                  "Validate the application",
                  "Healthcare, water, environmental monitoring, wearables, microfluidics, and energy technologies.",
                ],
              ].map(([number, title, text]) => (
                <div key={number} className="grid grid-cols-[48px_1fr] gap-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#385E9D] text-xs font-semibold text-white">
                    {number}
                  </div>

                  <div>
                    <h3 className="font-semibold">{title}</h3>

                    <p className="mt-1 text-sm leading-7 text-[#706963]">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EVOLUTION */}
      <section
        id="evolution"
        className="scroll-mt-36 bg-[#F7F3EC] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
            Research Evolution
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            From graphenised substrates to integrated systems.
          </h2>

          <div className="mt-14 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
            {[
              [
                "01",
                "Paper & polymer graphenisation",
                "Direct formation of conductive carbon on carbon-rich substrates.",
              ],
              [
                "02",
                "Laser-induced graphene",
                "Mask-free writing of electrodes and conductive structures.",
              ],
              [
                "03",
                "Flexible electronics",
                "Devices on paper, cloth, polymers, glass, and flexible layers.",
              ],
              [
                "04",
                "Microfluidic integration",
                "Channels, pumps, heaters, electrodes, and portable readers.",
              ],
              [
                "05",
                "Diagnostics",
                "Cardiac, renal, respiratory, and metabolic sensing platforms.",
              ],
              [
                "06",
                "Energy systems",
                "Biofuel cells, supercapacitors, and flexible storage.",
              ],
            ].map(([number, title, text], index) => (
              <div
                key={number}
                className="relative border border-[#DDD5CC] bg-white p-6"
              >
                <span className="text-xs font-semibold text-[#F2A900]">
                  Stage {number}
                </span>

                <h3 className="mt-8 text-base font-semibold leading-6">
                  {title}
                </h3>

                <p className="mt-3 text-xs leading-6 text-[#706963]">
                  {text}
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

      {/* MATERIALS */}
      <section
        id="materials"
        className="scroll-mt-36 bg-white px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
            Materials & Fabrication
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Graphene engineered for specific device functions.
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {materials.map((item) => (
              <ResearchCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* FLAGSHIP */}
      <section
        id="flagship"
        className="scroll-mt-36 bg-[#F7F3EC] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
            Flagship Technologies
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Representative transitions from material to technology.
          </h2>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {flagship.map((item) => (
              <ResearchCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* HEALTHCARE */}
      <section
        id="healthcare"
        className="scroll-mt-36 bg-white px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
            Healthcare
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Graphene-enabled point-of-care and wearable diagnostics.
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {healthcare.map((item) => (
              <ResearchCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ENVIRONMENT */}
      <section
        id="environment"
        className="scroll-mt-36 bg-[#F7F3EC] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
            Environmental & Chemical Monitoring
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Functional interfaces for ions, nutrients, and contaminants.
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {environment.map((item) => (
              <ResearchCard key={item.title} item={item} />
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/research/water-quality"
              className="text-sm font-semibold text-[#385E9D]"
            >
              Explore Water Quality Technologies →
            </Link>
          </div>
        </div>
      </section>

      {/* ENERGY */}
      <section
        id="energy"
        className="scroll-mt-36 bg-white px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
            Energy Technologies
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Graphene for harvesting, storage, and self-powered systems.
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {energy.map((item) => (
              <ResearchCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* MICROFLUIDICS */}
      <section
        id="microfluidics"
        className="scroll-mt-36 bg-[#F7F3EC] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
            Microfluidics & Integration
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Conductive structures integrated with microscale fluid handling.
          </h2>

          <p className="mt-7 max-w-3xl text-base leading-8 text-[#706963]">
            Graphene electrodes and heaters can become functional components
            of the microfluidic architecture rather than external accessories,
            enabling sensing, thermal control, pumping integration, and
            portable analytical systems.
          </p>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {microfluidics.map((item) => (
              <ResearchCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section
        id="capabilities"
        className="scroll-mt-36 bg-[#4F2C1D] px-8 py-24 text-white md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#F2A900]">
            Research Capabilities
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            One materials platform. Multiple engineering competencies.
          </h2>

          <div className="mt-14 grid border border-white/15 md:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((item) => (
              <div
                key={item.title}
                className="border-b border-white/15 p-7 md:border-r"
              >
                <h3 className="font-semibold text-[#F2A900]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/65">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PUBLICATIONS */}
      <section
        id="publications"
        className="scroll-mt-36 bg-white px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="border border-[#DDD5CC] bg-[#F7F3EC] p-5">
              <img
                src="/research/graphene/graphene-portfolio.jpg"
                alt="Graphene research portfolio"
                className="aspect-[4/3] w-full object-contain"
              />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
                Publications
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                A broad graphene research portfolio.
              </h2>

              <p className="mt-7 max-w-3xl text-base leading-8 text-[#706963]">
                The prior research portfolio extends across material
                fabrication, flexible electronics, electrochemical and
                resistive biosensors, microfluidic systems, healthcare,
                environmental monitoring, energy harvesting, and energy
                storage.
              </p>

              <Link
                href="/publications"
                className="mt-8 inline-flex rounded-full bg-[#385E9D] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#4F2C1D]"
              >
                Explore publications →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FUTURE AT SENSYS */}
      <section className="bg-[#F2A900] px-8 py-24 text-[#2A1710] md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#4F2C1D]/70">
                Graphene at SenSys
              </p>

              <h2 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] md:text-7xl">
                From functional carbon to intelligent integrated systems.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-8 text-[#4F2C1D]/85">
                At SenSys, this materials-to-device foundation will support new
                work in integrated microsystems, flexible and wearable devices,
                lab-on-chip technologies, environmental sensing, intelligent
                diagnostics, and next-generation energy-enabled sensing
                systems.
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