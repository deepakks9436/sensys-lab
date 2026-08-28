import Link from "next/link";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const programmes = [
  {
    number: "01",
    year: "2023",
    title: "Real-Time Microfluidic Bacterial Detection",
    subtitle: "Culture · Electrochemistry · Microfluidics",
    image: "/research/AMR/Microfluidic-electrochemical-device.jpg",
    description:
      "A miniaturized electrochemical microfluidic platform developed for simultaneous culturing and real-time monitoring of Escherichia coli growth.",
    features: [
      "Screen-printed three-electrode system integrated with a PDMS microfluidic reservoir.",
      "Graphitized mesoporous carbon-modified working electrode for bacterial detection.",
      "Integrated thermal management for incubator-free bacterial culturing.",
      "Continuous electrochemical monitoring of bacterial growth using cyclic voltammetry.",
      "Demonstrated in a real food matrix using mango juice.",
    ],
    metrics: [
      "LoD: 0.35 CFU/mL",
      "LoQ: 1.05 CFU/mL",
      "36 h real-time monitoring",
    ],
    publication:
      "https://www.sciencedirect.com/science/article/pii/S000326702201162X",
  },
  {
    number: "02",
    year: "2023",
    title: "Rapid Electromicrofluidic Antibiotic Susceptibility Testing",
    subtitle: "AST · LIG Heater · Electrochemical Monitoring",
    image: "/research/AMR/Electromicrofluidic-Device.png",
    description:
      "The bacterial-detection platform was extended toward rapid phenotypic antimicrobial susceptibility testing by combining electrochemistry, microfluidics, and localized laser-induced graphene heating.",
    features: [
      "Miniaturized microfluidic reservoirs integrated with screen-printed electrodes.",
      "Laser-induced graphene heater maintained bacterial culture near physiological incubation temperature.",
      "Simultaneous screening of multiple antibiotics against E. coli.",
      "Electrochemical monitoring of antibiotic-induced changes in bacterial growth.",
      "Validated using tap water and synthetic urine samples.",
    ],
    metrics: [
      "AST within 6 h",
      "4 antibiotics screened",
      "Water + synthetic urine",
    ],
    publication: "https://doi.org/10.3390/s23239314",
  },
  {
    number: "03",
    year: "2023",
    title: "Reproducible Lab-on-Chip Protocol",
    subtitle: "Fabrication · LIG Heating · Bacterial Fuel Cell",
    image: "/research/AMR/protocol-lab-on-chip-platform.jpg",
    description:
      "A detailed experimental protocol established the complete fabrication and operating workflow for simultaneous bacterial culture and electrochemical detection on a lab-on-chip platform.",
    features: [
      "Step-by-step screen-printed electrode fabrication.",
      "Fabrication and optimization of a laser-induced graphene heater.",
      "PDMS microfluidic-device fabrication and integration.",
      "Portable electrochemical measurement using cyclic voltammetry and chronoamperometry.",
      "Metabolic activity monitored using microfluidic bioelectrochemical principles.",
    ],
    metrics: [
      "Integrated fabrication protocol",
      "LIG heating at ~37 °C",
      "Portable electrochemistry",
    ],
    publication: "https://doi.org/10.1016/j.xpro.2023.102327",
  },
  {
    number: "04",
    year: "2026",
    title: "Bacteria-on-Chip",
    subtitle: "Multiplexed · Portable · Smartphone-Integrated",
    image: "/research/AMR/Bacteria-on-chip.png",
    description:
      "A fully portable bacteria-on-chip platform combines pathogen-selective electrochemical sensing, on-chip incubation, multiplexed AST, embedded potentiostat electronics, and a smartphone-enabled user interface.",
    features: [
      "Four three-electrode systems integrated on a single ITO-based sensing chip.",
      "Gold nanoparticle-enhanced immunosensor functionalized with anti-E. coli monoclonal antibodies.",
      "Microfluidic reservoirs integrated with an on-chip heating module.",
      "Swappable sensing cartridge interfacing with a multichannel portable potentiostat.",
      "BLE-enabled graphical user interface for control and real-time electrochemical visualization.",
    ],
    metrics: [
      "E. coli detection: 30 min",
      "AST: 5 h",
      "4 antibiotics simultaneously",
    ],
    publication: "https://doi.org/10.1039/D6SD00063K",
  },
];

const workflow = [
  {
    number: "01",
    title: "Sample",
    text: "Clinical, environmental, food, urine, or other bacterial samples enter the diagnostic workflow.",
  },
  {
    number: "02",
    title: "Pathogen Detection",
    text: "Electrochemical or biorecognition interfaces identify bacterial presence and concentration.",
  },
  {
    number: "03",
    title: "On-Chip Culture",
    text: "Integrated heaters and microfluidics provide controlled conditions for bacterial growth.",
  },
  {
    number: "04",
    title: "Antibiotic Exposure",
    text: "Parallel chambers expose bacterial samples to selected antimicrobial agents.",
  },
  {
    number: "05",
    title: "AST",
    text: "Changes in bacterial growth and electrochemical behaviour identify susceptibility or resistance.",
  },
  {
    number: "06",
    title: "Decision Support",
    text: "Portable electronics and connected interfaces translate measurements into actionable results.",
  },
];

const publications = [
  {
    number: "01",
    year: "2023",
    journal: "Analytica Chimica Acta",
    title:
      "Microfluidic electrochemical device for real-time culturing and interference-free detection of Escherichia coli",
    authors:
      "Sonal Fande, Khairunnisa Amreen, D. Sriram and Sanket Goel",
    doi: "10.1016/j.aca.2022.340591",
    href: "https://www.sciencedirect.com/science/article/pii/S000326702201162X",
  },
  {
    number: "02",
    year: "2023",
    journal: "Sensors",
    title:
      "Electromicrofluidic Device for Interference-Free Rapid Antibiotic Susceptibility Testing of Escherichia coli from Real Samples",
    authors:
      "Sonal Fande, Khairunnisa Amreen, D. Sriram, Valentin Mateev and Sanket Goel",
    doi: "10.3390/s23239314",
    href: "https://doi.org/10.3390/s23239314",
  },
  {
    number: "03",
    year: "2023",
    journal: "STAR Protocols",
    title:
      "A protocol to execute a lab-on-chip platform for simultaneous culture and electrochemical detection of bacteria",
    authors:
      "Sonal Fande, Sangam Srikanth, Jayapiriya U S, Khairunnisa Amreen, Satish Kumar Dubey, Arshad Javed and Sanket Goel",
    doi: "10.1016/j.xpro.2023.102327",
    href: "https://doi.org/10.1016/j.xpro.2023.102327",
  },
  {
    number: "04",
    year: "2025",
    journal: "Microchemical Journal",
    title:
      "Antimicrobial resistance detection: Rapid transition to point-of-care platforms",
    authors:
      "Amir Ibrahim Madaje, Sonal Fande, D. Sriram and Sanket Goel",
    doi: "10.1016/j.microc.2025.115471",
    href: "https://doi.org/10.1016/j.microc.2025.115471",
  },
  {
    number: "05",
    year: "2026",
    journal: "Sensors & Diagnostics",
    title:
      "Bacteria-on-chip: a multiplexed point-of-care electrochemical platform for rapid detection of Escherichia coli and antimicrobial susceptibility testing",
    authors: "Sonal Fande, Areon Banerjee and Sanket Goel",
    doi: "10.1039/D6SD00063K",
    href: "https://doi.org/10.1039/D6SD00063K",
  },
];

const capabilities = [
  {
    title: "Microfluidic Culture",
    text: "Miniaturized reservoirs and chambers for controlled bacterial growth and sample handling.",
  },
  {
    title: "Electrochemical Detection",
    text: "CV, DPV, EIS, chronoamperometry, and electrochemical monitoring of bacterial activity.",
  },
  {
    title: "Rapid AST",
    text: "Phenotypic assessment of bacterial response to multiple antibiotics in parallel.",
  },
  {
    title: "Thermal Management",
    text: "LIG and printed microheaters for localized bacterial incubation and closed-loop temperature control.",
  },
  {
    title: "Biorecognition",
    text: "Nanomaterial-enhanced antibody-functionalized interfaces for pathogen-selective detection.",
  },
  {
    title: "Portable Instrumentation",
    text: "Embedded multichannel potentiostat electronics integrated into compact diagnostic hardware.",
  },
  {
    title: "Connected Diagnostics",
    text: "Bluetooth, smartphone applications, GUI interfaces, and real-time electrochemical visualization.",
  },
  {
    title: "Point-of-Care Translation",
    text: "Integrated sensing, culture, AST, electronics, packaging, and user interfaces within portable systems.",
  },
];

export default function AMRPage() {
  return (
    <main className="min-h-screen bg-white text-[#4F2C1D]">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#4F2C1D] px-8 py-24 text-white md:px-16 md:py-32">
        <div className="absolute inset-0">
          <img
            src="/research/AMR/Antimicrobial-resistance-detection.jpg"
            alt=""
            className="h-full w-full object-cover opacity-18"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#2A1710] via-[#4F2C1D]/95 to-[#4F2C1D]/60" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#F2A900]">
            Research Foundation · Intelligent Diagnostics
          </p>

          <h1 className="mt-6 max-w-6xl text-6xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-8xl">
            Pathogen & AMR
            <br />
            Diagnostics.
          </h1>

          <p className="mt-10 max-w-3xl text-xl leading-9 text-white/80">
            Microfluidic, electrochemical, and connected diagnostic systems for
            rapid bacterial detection, antimicrobial susceptibility testing,
            and point-of-care antimicrobial-resistance assessment.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {[
              "Pathogen Detection",
              "Antimicrobial Resistance",
              "AST",
              "Microfluidics",
              "Electrochemistry",
              "Point-of-Care",
              "Connected Diagnostics",
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
              href="#evolution"
              className="rounded-full bg-[#F2A900] px-7 py-3.5 text-sm font-semibold text-[#2A1710]"
            >
              Explore technology evolution →
            </a>

            <a
              href="#bacteria-on-chip"
              className="rounded-full border border-white/35 px-7 py-3.5 text-sm font-semibold text-white"
            >
              Bacteria-on-Chip
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

      {/* WHY AMR */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="border border-[#DDD5CC] bg-[#F7F3EC] p-5">
            <img
              src="/research/AMR/Antimicrobial-resistance-detection.jpg"
              alt="Antimicrobial resistance diagnostic landscape"
              className="aspect-[4/3] w-full object-contain"
            />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
              Diagnostic Challenge
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
              Faster diagnostics can support better antibiotic decisions.
            </h2>

            <p className="mt-7 text-base leading-8 text-[#706963]">
              Conventional phenotypic antimicrobial susceptibility testing is
              reliable but often requires bacterial culture and extended
              turnaround times. Molecular methods can be faster, but frequently
              depend on specialized infrastructure and trained personnel.
            </p>

            <p className="mt-5 text-base leading-8 text-[#706963]">
              Microfluidic point-of-care systems offer a route toward bringing
              bacterial culture, sensing, antimicrobial exposure, and
              interpretation into a single compact diagnostic workflow.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="border border-[#DDD5CC] bg-[#FBF8F4] p-5">
                <p className="text-3xl font-semibold text-[#F2A900]">
                  24–48 h
                </p>
                <p className="mt-2 text-xs leading-6 text-[#706963]">
                  Typical timeframe discussed for conventional phenotypic
                  approaches
                </p>
              </div>

              <div className="border border-[#DDD5CC] bg-[#FBF8F4] p-5">
                <p className="text-3xl font-semibold text-[#385E9D]">
                  4–6 h
                </p>
                <p className="mt-2 text-xs leading-6 text-[#706963]">
                  Emerging microfluidic AST timeframe highlighted in the
                  research review
                </p>
              </div>

              <div className="border border-[#DDD5CC] bg-[#FBF8F4] p-5">
                <p className="text-3xl font-semibold text-[#4F2C1D]">
                  POC
                </p>
                <p className="mt-2 text-xs leading-6 text-[#706963]">
                  Direction toward portable decentralized testing
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVOLUTION */}
      <section
        id="evolution"
        className="scroll-mt-28 bg-[#F7F3EC] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
            Technology Evolution
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            From bacterial growth monitoring to multiplexed point-of-care AST.
          </h2>

          <p className="mt-7 max-w-3xl text-base leading-8 text-[#706963]">
            The research programme progressed through successive levels of
            integration: bacterial culture and detection, rapid antibiotic
            susceptibility testing, standardized lab-on-chip fabrication, and
            ultimately a portable multiplexed diagnostic platform.
          </p>

          <div className="mt-16 space-y-8">
            {programmes.map((programme, index) => (
              <article
                key={programme.number}
                id={programme.number === "04" ? "bacteria-on-chip" : undefined}
                className="scroll-mt-32 grid overflow-hidden border border-[#DDD5CC] bg-white lg:grid-cols-2"
              >
                <div
                  className={`relative min-h-[460px] bg-[#F8F6F2] ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <img
                    src={programme.image}
                    alt={programme.title}
                    className="absolute inset-0 h-full w-full object-contain p-5"
                  />

                  <div className="absolute left-5 top-5 rounded-full bg-[#4F2C1D] px-4 py-2 text-xs font-semibold text-white">
                    {programme.year}
                  </div>
                </div>

                <div
                  className={`flex flex-col justify-center p-8 md:p-10 lg:p-12 ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#385E9D]">
                    Platform {programme.number}
                  </p>

                  <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                    {programme.title}
                  </h3>

                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#F2A900]">
                    {programme.subtitle}
                  </p>

                  <p className="mt-6 text-base leading-8 text-[#706963]">
                    {programme.description}
                  </p>

                  <ul className="mt-7 space-y-3">
                    {programme.features.map((feature) => (
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
                    {programme.metrics.map((metric) => (
                      <span
                        key={metric}
                        className="rounded-full border border-[#D8D0C7] bg-[#FBF8F4] px-4 py-2 text-xs font-medium"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>

                  <a
                    href={programme.publication}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 w-fit rounded-full bg-[#385E9D] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4F2C1D]"
                  >
                    Read publication →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BACTERIA ON CHIP HIGHLIGHT */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
                Latest Platform
              </p>

              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                Bacteria-on-Chip integrates the complete diagnostic chain.
              </h2>

              <p className="mt-7 text-base leading-8 text-[#706963]">
                The portable platform integrates pathogen-selective
                immunosensing, multiplexed electrochemistry, microfluidic
                reservoirs, thermal incubation, multichannel potentiostat
                electronics, a swappable sensor architecture, and a connected
                graphical user interface.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {[
                  ["30 min", "Pathogen detection"],
                  ["5 h", "Antibiotic susceptibility testing"],
                  ["4", "Antibiotics tested simultaneously"],
                  ["BLE", "Smartphone / GUI connectivity"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="border border-[#DDD5CC] bg-[#FBF8F4] p-6"
                  >
                    <p className="text-3xl font-semibold text-[#385E9D]">
                      {value}
                    </p>

                    <p className="mt-2 text-sm text-[#706963]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-[#DDD5CC] bg-[#F7F3EC] p-5">
              <img
                src="/research/AMR/Bacteria-on-chip.png"
                alt="Portable Bacteria-on-Chip point-of-care diagnostic platform"
                className="aspect-[4/3] w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="bg-[#F7F3EC] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
            Diagnostic Workflow
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Sample to susceptibility result.
          </h2>

          <div className="mt-14 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
            {workflow.map((step, index) => (
              <div
                key={step.number}
                className="relative border border-[#DDD5CC] bg-white p-6"
              >
                <span className="text-xs font-semibold text-[#F2A900]">
                  {step.number}
                </span>

                <h3 className="mt-8 text-lg font-semibold">
                  {step.title}
                </h3>

                <p className="mt-3 text-xs leading-6 text-[#706963]">
                  {step.text}
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

      {/* PROTOCOL IMAGE */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="border border-[#DDD5CC] bg-[#F7F3EC] p-5">
            <img
              src="/research/AMR/protocol-lab-on-chip-platform.jpg"
              alt="Lab-on-chip bacterial detection protocol"
              className="w-full object-contain"
            />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
              Platform Engineering
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
              Diagnostics built as integrated engineered systems.
            </h2>

            <p className="mt-7 text-base leading-8 text-[#706963]">
              The underlying platform engineering combines electrode
              fabrication, nanomaterial modification, laser-induced graphene
              heating, microfluidic fabrication, bacterial culture, and
              electrochemical measurement.
            </p>

            <p className="mt-5 text-base leading-8 text-[#706963]">
              This modular approach allows individual components to evolve
              while preserving a common lab-on-chip architecture for pathogen
              detection and antimicrobial susceptibility testing.
            </p>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="bg-[#4F2C1D] px-8 py-24 text-white md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#F2A900]">
            Research Capabilities
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            An end-to-end AMR diagnostic technology stack.
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

      {/* VIDEO */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
                Research Demonstration
              </p>

              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                See the platform in operation.
              </h2>

              <p className="mt-7 text-base leading-8 text-[#706963]">
                The demonstration highlights the integration of microfluidics,
                bacterial culture, electrochemical detection, thermal
                management, and portable instrumentation.
              </p>

              <a
                href="https://www.youtube.com/watch?v=lIjwN9cSS4s"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex rounded-full bg-[#385E9D] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4F2C1D]"
              >
                Watch on YouTube →
              </a>
            </div>

            <div className="aspect-video overflow-hidden border border-[#DDD5CC] bg-black">
              <iframe
                src="https://www.youtube.com/embed/lIjwN9cSS4s"
                title="AMR and bacteria-on-chip research demonstration"
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
      <section className="bg-[#F7F3EC] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
                Selected Publications
              </p>

              <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                Research underpinning the AMR diagnostic programme.
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
                Intelligent Diagnostics at SenSys
              </p>

              <h2 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] md:text-7xl">
                Toward rapid sample-to-answer AMR diagnostics.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-8 text-[#4F2C1D]/85">
                At SenSys, this foundation will support next-generation
                pathogen and antimicrobial-resistance platforms integrating
                microfluidic sample handling, multiplexed biosensing,
                controlled incubation, rapid AST, portable instrumentation,
                connected interfaces, and intelligent data interpretation.
              </p>

              <p className="mt-5 text-base leading-7 text-[#4F2C1D]/80">
                The longer-term goal is to move from individual sensing
                functions toward integrated point-of-care systems capable of
                supporting timely and evidence-based antimicrobial decisions.
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