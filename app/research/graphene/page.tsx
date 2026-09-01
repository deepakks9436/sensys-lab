import Image from "next/image";
import Link from "next/link";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Reveal from "../../../components/Reveal";

/* ============================================================
   PUBLICATION SEARCH HELPER
============================================================ */

const scholar = (title: string) =>
  `https://scholar.google.com/scholar?q=${encodeURIComponent(`"${title}"`)}`;

/* ============================================================
   SHARED CARD TYPE
============================================================ */

type ResearchItem = {
  image: string;
  tag: string;
  title: string;
  description: string;
  meta: string;
  paper: string;
};

/* ============================================================
   MATERIALS & FABRICATION
============================================================ */

const materials: ResearchItem[] = [
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

/* ============================================================
   FLAGSHIP TECHNOLOGIES
============================================================ */

const flagship: ResearchItem[] = [
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
      "An integrated microfluidic device combines MXene-enhanced laser-induced graphene electrodes with electrochemical dopamine analysis.",
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

/* ============================================================
   HEALTHCARE
============================================================ */

const healthcare: ResearchItem[] = [
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

/* ============================================================
   ENVIRONMENTAL
============================================================ */

const environment: ResearchItem[] = [
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

/* ============================================================
   ENERGY
============================================================ */

const energy: ResearchItem[] = [
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

/* ============================================================
   MICROFLUIDICS
============================================================ */

const microfluidics: ResearchItem[] = [
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

/* ============================================================
   CAPABILITIES
============================================================ */

const capabilities = [
  {
    number: "01",
    title: "Laser Fabrication",
    text: "CO₂ and blue-diode laser graphenisation, engraving, direct writing, and patterning.",
  },
  {
    number: "02",
    title: "Flexible Substrates",
    text: "Polyimide, paper, cloth, glass, polymer films, and laminated supports.",
  },
  {
    number: "03",
    title: "Surface Functionalization",
    text: "Enzymes, antibodies, polymers, metals, MXenes, metal oxides, and nanocarbon hybrids.",
  },
  {
    number: "04",
    title: "Electrochemical Testing",
    text: "CV, DPV, EIS, chronoamperometry, potentiometry, GCD, and related electroanalytical methods.",
  },
  {
    number: "05",
    title: "Microfluidic Integration",
    text: "PDMS channels, transfer layers, pumps, reservoirs, fluid handling, and local thermal control.",
  },
  {
    number: "06",
    title: "Portable Electronics",
    text: "Compact potentiostats, embedded electronics, signal conditioning, smartphones, and connected acquisition.",
  },
  {
    number: "07",
    title: "Material Characterization",
    text: "SEM, Raman, XPS, XRD, EDX, morphology, and electrical characterization.",
  },
  {
    number: "08",
    title: "Application Validation",
    text: "Healthcare, water, environmental, wearable, microfluidic, and energy-device evaluation.",
  },
];

/* ============================================================
   RESEARCH CATEGORIES
============================================================ */

const categoryExplorer = [
  {
    number: "01",
    title: "Materials & Fabrication",
    description:
      "Laser graphenisation, transfer processes, doping, green reduction, and hybrid interfaces.",
    href: "#materials",
  },
  {
    number: "02",
    title: "Healthcare",
    description:
      "Point-of-care, wearable, cardiac, renal, respiratory, and metabolic sensing.",
    href: "#healthcare",
  },
  {
    number: "03",
    title: "Environment",
    description:
      "Ion, nutrient, contaminant, and water-quality sensing interfaces.",
    href: "#environment",
  },
  {
    number: "04",
    title: "Energy",
    description:
      "Graphene biofuel cells, flexible supercapacitors, and energy-enabled sensing.",
    href: "#energy",
  },
  {
    number: "05",
    title: "Microfluidics",
    description:
      "Integrated electrodes, heaters, fluid handling, and portable analytical devices.",
    href: "#microfluidics",
  },
];

/* ============================================================
   EXPLORE NEXT
============================================================ */

const exploreNext = [
  {
    title: "Pesticide Detection",
    description:
      "Portable optical, electrochemical, wearable, and microfluidic systems for residue screening.",
    image: "/research/pesticide-detection/pestisafe-2.jpg",
    href: "/research/pesticide-detection",
  },
  {
    title: "Water Quality",
    description:
      "Connected electrochemical and ion-selective technologies for environmental analysis.",
    image: "/research/water-quality/ion-selective-array.png",
    href: "/research/water-quality",
  },
  {
    title: "Pathogen & AMR",
    description:
      "Integrated microfluidic and electrochemical systems for bacterial detection and rapid AST.",
    image: "/research/AMR/Bacteria-on-chip.png",
    href: "/research/amr",
  },
];

/* ============================================================
   RESEARCH CARD
============================================================ */

function ResearchCard({ item }: { item: ResearchItem }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden border border-[var(--border)] bg-[var(--surface)] transition duration-300 hover:-translate-y-1 hover:border-[var(--um-blue)] hover:shadow-[var(--shadow-medium)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-soft)]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain p-5 transition duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--um-blue)]">
          {item.tag}
        </p>

        <h3 className="mt-3 text-xl font-semibold leading-tight">
          {item.title}
        </h3>

        <p className="mt-4 flex-1 text-sm leading-7 text-[var(--foreground-soft)]">
          {item.description}
        </p>

        <p className="mt-5 border-t border-[var(--border)] pt-4 text-xs text-[var(--foreground-muted)]">
          {item.meta}
        </p>

        <a
          href={item.paper}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-sm font-semibold text-[var(--um-blue)] transition hover:text-[var(--um-sky)]"
        >
          View publication →
        </a>
      </div>
    </article>
  );
}

/* ============================================================
   PAGE
============================================================ */

export default function GraphenePage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />

      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <section className="relative overflow-hidden bg-[#17263D] px-8 py-24 text-white md:px-16 md:py-32">
        <Image
          src="/research/graphene/graphene-hero.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#101C2E] via-[#17263D]/95 to-[#385E9D]/45" />

        <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#00A3E0]/15 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#F2A900]">
              Research Foundation · Advanced Materials
            </p>

            <h1 className="mt-6 max-w-6xl text-6xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-8xl">
              Graphene
              <br />
              Technologies.
            </h1>

            <p className="mt-10 max-w-3xl text-lg leading-9 text-white/80 md:text-xl">
              Engineering graphene from material synthesis and laser processing
              to flexible electronics, biosensors, microfluidics,
              environmental monitoring, energy harvesting, and storage.
            </p>

            <div className="mt-9 flex flex-wrap gap-2">
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
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs text-white/85 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#overview"
                className="rounded-full bg-[#F2A900] px-7 py-3.5 text-sm font-semibold text-[#2A1710] transition hover:bg-white"
              >
                Explore research →
              </a>

              <a
                href="#flagship"
                className="rounded-full border border-white/35 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-[#385E9D]"
              >
                Flagship technologies →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* STICKY NAV */}
      {/* ===================================================== */}

      <nav className="sticky top-[72px] z-30 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl overflow-x-auto px-8 md:px-16">
          <div className="flex min-w-max items-center gap-8 py-4">
            {[
              ["Overview", "#overview"],
              ["Materials", "#materials"],
              ["Flagship", "#flagship"],
              ["Healthcare", "#healthcare"],
              ["Environment", "#environment"],
              ["Energy", "#energy"],
              ["Microfluidics", "#microfluidics"],
              ["Capabilities", "#capabilities"],
              ["Publications", "#publications"],
              ["Explore Next", "#explore-next"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-xs font-semibold text-[var(--foreground-muted)] transition hover:text-[var(--um-blue)]"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ===================================================== */}
      {/* OVERVIEW */}
      {/* ===================================================== */}

      <section
        id="overview"
        className="scroll-mt-40 bg-[var(--background)] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Research Overview
                </p>
              </div>

              <div>
                <h2 className="max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                  Beyond graphene as an electrode.
                </h2>

                <p className="mt-8 max-w-3xl text-lg leading-9 text-[var(--foreground-soft)]">
                  The graphene portfolio treats the material as a fabrication
                  and integration platform rather than simply a conductive
                  electrode.
                </p>

                <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--foreground-muted)]">
                  Material composition, substrate, laser parameters, surface
                  chemistry, transfer methods, and device architecture are
                  engineered according to the intended sensing, microfluidic,
                  wearable, energy, or environmental function.
                </p>
              </div>
            </div>
          </Reveal>

          {/* PORTFOLIO METRICS */}

          <div className="mt-16 grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] md:grid-cols-4">
            {[
              ["30+", "Graphene-Related Research Works"],
              ["15+", "Device Concepts"],
              ["8", "Application Domains"],
              ["6+", "Material & Hybrid Platforms"],
            ].map(([value, label], index) => (
              <Reveal key={label} delay={index * 70}>
                <div className="h-full bg-[var(--surface)] p-7">
                  <p className="text-3xl font-semibold text-[var(--um-gold)]">
                    {value}
                  </p>

                  <p className="mt-3 text-xs leading-5 text-[var(--foreground-muted)]">
                    {label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* MATERIAL → SYSTEM STORY */}

          <Reveal delay={220}>
            <div className="mt-16 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="relative min-h-[520px] overflow-hidden border border-[var(--border)] bg-[var(--surface-soft)]">
                <Image
                  src="/research/graphene/graphene-portfolio.jpg"
                  alt="Graphene research portfolio"
                  fill
                  className="object-contain p-6"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />

                <div className="absolute inset-x-5 bottom-5 bg-[#17263D]/90 p-4 text-sm font-medium text-white backdrop-blur-sm">
                  Material engineering → Device fabrication → System
                  integration → Application
                </div>
              </div>

              <div className="space-y-7">
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
                  <div
                    key={number}
                    className="grid grid-cols-[50px_1fr] gap-5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--um-blue)] text-xs font-semibold text-white">
                      {number}
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        {title}
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-[var(--foreground-soft)]">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* CATEGORY EXPLORER */}
      {/* ===================================================== */}

      <section className="bg-[var(--surface-soft)] px-8 py-20 md:px-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
              Explore the Portfolio
            </p>

            <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
              One material platform across multiple technology domains.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {categoryExplorer.map((category, index) => (
              <Reveal key={category.title} delay={index * 60}>
                <a
                  href={category.href}
                  className="group block h-full border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:-translate-y-1 hover:border-[var(--um-blue)] hover:shadow-[var(--shadow-soft)]"
                >
                  <p className="text-xs font-semibold text-[var(--um-gold)]">
                    {category.number}
                  </p>

                  <h3 className="mt-5 text-lg font-semibold">
                    {category.title}
                  </h3>

                  <p className="mt-4 text-xs leading-6 text-[var(--foreground-soft)]">
                    {category.description}
                  </p>

                  <p className="mt-6 text-xs font-semibold text-[var(--um-blue)]">
                    Explore →
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* MATERIALS */}
      {/* ===================================================== */}

      <section
        id="materials"
        className="scroll-mt-40 bg-[var(--background)] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
              Materials & Fabrication
            </p>

            <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Graphene engineered for specific device functions.
            </h2>

            <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
              Laser processing, substrate engineering, doping, transfer,
              reduction, and hybridization enable graphene structures with
              different electrical, mechanical, chemical, and catalytic
              properties.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {materials.map((item, index) => (
              <Reveal key={item.title} delay={index * 60}>
                <ResearchCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* FLAGSHIP */}
      {/* ===================================================== */}

      <section
        id="flagship"
        className="scroll-mt-40 bg-[var(--surface-soft)] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
              Flagship Technologies
            </p>

            <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Representative transitions from material to technology.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {flagship.map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <ResearchCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* HEALTHCARE */}
      {/* ===================================================== */}

      <section
        id="healthcare"
        className="scroll-mt-40 bg-[var(--background)] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
              Healthcare
            </p>

            <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Graphene-enabled point-of-care and wearable diagnostics.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {healthcare.map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <ResearchCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* ENVIRONMENT */}
      {/* ===================================================== */}

      <section
        id="environment"
        className="scroll-mt-40 bg-[var(--surface-soft)] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
              Environmental & Chemical Monitoring
            </p>

            <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Functional interfaces for ions, nutrients, and contaminants.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {environment.map((item, index) => (
              <Reveal key={item.title} delay={index * 80}>
                <ResearchCard item={item} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={250}>
            <div className="mt-10">
              <Link
                href="/research/water-quality"
                className="text-sm font-semibold text-[var(--um-blue)] transition hover:text-[var(--um-sky)]"
              >
                Explore Water Quality Technologies →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* ENERGY */}
      {/* ===================================================== */}

      <section
        id="energy"
        className="scroll-mt-40 bg-[var(--background)] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
              Energy Technologies
            </p>

            <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Graphene for harvesting, storage, and self-powered systems.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {energy.map((item, index) => (
              <Reveal key={item.title} delay={index * 80}>
                <ResearchCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* MICROFLUIDICS */}
      {/* ===================================================== */}

      <section
        id="microfluidics"
        className="scroll-mt-40 bg-[var(--surface-soft)] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
              Microfluidics & Integration
            </p>

            <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Conductive structures integrated with microscale fluid handling.
            </h2>

            <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
              Graphene electrodes and heaters can become functional elements
              within the microfluidic architecture itself, enabling sensing,
              thermal control, pumping integration, and portable analytical
              systems.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {microfluidics.map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <ResearchCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* CAPABILITIES */}
      {/* ===================================================== */}

      <section
        id="capabilities"
        className="scroll-mt-40 bg-[var(--section-blue)] px-8 py-24 text-white md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-gold)]">
                  Research Capabilities
                </p>
              </div>

              <div>
                <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  One materials platform.
                  <br />
                  Multiple engineering competencies.
                </h2>

                <p className="mt-7 max-w-3xl text-base leading-8 text-white/75">
                  The graphene portfolio spans the complete pipeline from
                  fabrication and characterization to device integration,
                  portable instrumentation, and application-level validation.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden bg-white/15 md:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((item, index) => (
              <Reveal key={item.title} delay={index * 50}>
                <div className="h-full bg-[var(--section-blue)] p-7">
                  <p className="text-xs font-semibold text-[var(--um-gold)]">
                    {item.number}
                  </p>

                  <h3 className="mt-5 text-lg font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/70">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* PUBLICATIONS */}
      {/* ===================================================== */}

      <section
        id="publications"
        className="scroll-mt-40 bg-[var(--background)] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="relative aspect-[4/3] overflow-hidden border border-[var(--border)] bg-[var(--surface-soft)]">
                <Image
                  src="/research/graphene/graphene-portfolio.jpg"
                  alt="Graphene research portfolio"
                  fill
                  className="object-contain p-6"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Publications
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  A broad graphene research portfolio.
                </h2>

                <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
                  The publication portfolio extends across material
                  fabrication, flexible electronics, electrochemical and
                  resistive biosensors, microfluidic systems, healthcare,
                  environmental monitoring, energy harvesting, and energy
                  storage.
                </p>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--foreground-muted)]">
                  Individual technology cards above link directly to their
                  associated publications. The complete publication archive
                  provides the broader research record.
                </p>

                <Link
                  href="/publications"
                  className="mt-8 inline-flex rounded-full bg-[var(--um-blue)] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--um-blue-dark)]"
                >
                  View all publications →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* FUTURE DIRECTION */}
      {/* ===================================================== */}

      <section className="bg-[var(--um-gold)] px-8 py-24 text-[#2A1710] md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
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
                  This materials-to-device foundation supports future work in
                  integrated microsystems, flexible and wearable devices,
                  lab-on-chip technologies, environmental sensing, intelligent
                  diagnostics, and energy-enabled sensing systems.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/research"
                    className="rounded-full bg-[#2A1710] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#385E9D]"
                  >
                    SenSys Research →
                  </Link>

                  <Link
                    href="/join"
                    className="rounded-full border border-[#2A1710] px-7 py-3.5 text-sm font-semibold transition hover:bg-[#2A1710] hover:text-white"
                  >
                    Join SenSys →
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* EXPLORE NEXT */}
      {/* ===================================================== */}

      <section
        id="explore-next"
        className="scroll-mt-40 bg-[var(--background)] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Explore Next
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  Connected research foundations.
                </h2>
              </div>

              <Link
                href="/research"
                className="text-sm font-semibold text-[var(--um-blue)] transition hover:text-[var(--um-sky)]"
              >
                All research →
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {exploreNext.map((item, index) => (
              <Reveal key={item.title} delay={index * 90}>
                <Link
                  href={item.href}
                  className="group block h-full overflow-hidden border border-[var(--border)] bg-[var(--surface)] transition hover:-translate-y-1 hover:border-[var(--um-blue)] hover:shadow-[var(--shadow-medium)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface-soft)]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-5 transition duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />

                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#17263D]/35 to-transparent" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)]">
                      {item.description}
                    </p>

                    <p className="mt-6 text-xs font-semibold text-[var(--um-blue)]">
                      Explore research →
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}