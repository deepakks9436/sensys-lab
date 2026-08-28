"use client";

import { useMemo, useState } from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

type PatentStatus = "Granted" | "Published" | "Filed";

type Patent = {
  title: string;
  inventors: string;
  application: string;
  date: string;
  status: PatentStatus;
  category: string;
};

const patents: Patent[] = [
  /* -------------------- GRANTED -------------------- */

  {
    title:
      "Graphene Bioelectrode Comprising Polydopamine-Coated Gold Nanoparticles, Method of Synthesis and Biosensor System Thereof",
    inventors: "Mrunali Wagh, S. K. Sahoo and Sanket Goel",
    application: "202311002716",
    date: "Filed Jan 2023 · Granted May 2026",
    status: "Granted",
    category: "Graphene & Materials",
  },
  {
    title:
      "A Thin-Film-Heater-Based Microfluidic Nucleic Acid Amplification and Integrated Detection System",
    inventors:
      "Satish Kumar Dubey, Tinku Naik B., Mukesh Kumar S., Shraddha and Sohan Dudala",
    application: "202441079295",
    date: "Filed Oct 2024 · Granted Apr 2026",
    status: "Granted",
    category: "Microfluidics & Diagnostics",
  },
  {
    title:
      "Miniaturised Electrochemical Microfluidic Device (MEMD) and Platforms",
    inventors: "Sanket Goel, Ramya K. and Khairunnisa Amreen",
    application: "202411007574",
    date: "Filed Feb 2024 · Granted Mar 2026",
    status: "Granted",
    category: "Electrochemical Systems",
  },
  {
    title:
      "Fluid Management and Visualization Platform for Incubator-Based Cell Culture Applications",
    inventors:
      "Sohan Dudala, Satish Kumar Dubey, Arshad Javed and Sanket Goel",
    application: "202211060178",
    date: "Filed Oct 2022 · Granted Feb 2026",
    status: "Granted",
    category: "Microfluidics & Diagnostics",
  },
  {
    title:
      "Miniaturized 2D-Nanomaterial-Based Dual-Hormone Sensor for Simultaneous Dopamine and Insulin Detection",
    inventors: "Sanket Goel, Ramya K. and Khairunnisa Amreen",
    application: "202311038759",
    date: "Filed Jun 2023 · Granted Jan 2026",
    status: "Granted",
    category: "Sensors & Diagnostics",
  },
  {
    title:
      "A Method of Making Metal and Laser-Induced Graphene Nanocomposite",
    inventors: "Nishchitha N. K. and Sanket Goel",
    application: "202311029011",
    date: "Filed Apr 2023 · Granted Nov 2024",
    status: "Granted",
    category: "Graphene & Materials",
  },
  {
    title:
      "Method of Fabricating a Graphene-Electrode-Based Heterojunction Photovoltaic Cell",
    inventors:
      "Sanket Goel, Renuka Hyderkhan and Prasanth Kumar Enaganti",
    application: "202111032227",
    date: "Filed Jul 2021 · Granted Jun 2025",
    status: "Granted",
    category: "Energy Systems",
  },
  {
    title: "A Method of Fabricating Reduced Graphene Oxide",
    inventors: "Sanket Goel and Pavar Sai Kumar",
    application: "202111026737",
    date: "Filed Jun 2021 · Granted Aug 2023",
    status: "Granted",
    category: "Graphene & Materials",
  },
  {
    title:
      "A Bioelectrode Pair for Use in Enzymatic Biofuel Cells and a Process for Making the Same",
    inventors: "Sanket Goel and Jayapiriya U. S.",
    application: "202111017427",
    date: "Filed Apr 2021 · Granted Mar 2025",
    status: "Granted",
    category: "Energy Systems",
  },
  {
    title:
      "A Method of Transferring Laser-Induced Graphene from a Polyimide Sheet",
    inventors: "Sanket Goel and Avinash Kothuru",
    application: "202011000918",
    date: "Filed Jan 2020 · Granted Aug 2024",
    status: "Granted",
    category: "Graphene & Materials",
  },
  {
    title:
      "Microfluidics-Based Integrated System for Nitrite and Nitrate Detection and Analysis",
    inventors: "Sohan Dudala, Satish Kumar Dubey and Sanket Goel",
    application: "201911004347",
    date: "Filed Feb 2019 · Granted Feb 2024",
    status: "Granted",
    category: "Environmental Sensing",
  },
  {
    title: "Integrated Microfluidic and Solid-State Pyrosequencing Systems",
    inventors: "Sanket Goel, Min Gong, A. R. A. Rahman and Shi-Hui Foo",
    application: "US2013004587 / WO2011102808",
    date: "Aug 2011",
    status: "Granted",
    category: "Microfluidics & Diagnostics",
  },

  /* -------------------- PUBLISHED -------------------- */

  {
    title:
      "Electrochemical Sensing Platform and Method for Determining Presence of Heavy Metals in a Fluid Sample",
    inventors:
      "Ponnalagu R. N., Amrutha Lahiri, Khairunnisa Amreen and Sanket Goel",
    application: "202411042814",
    date: "Jun 2024",
    status: "Published",
    category: "Environmental Sensing",
  },
  {
    title:
      "Miniaturized Handheld Electrochemical Analyzer for the Detection of Creatinine",
    inventors: "Satish Kumar Dubey, Sanjeet Kumar and Sanket Goel",
    application: "202411047967",
    date: "Jun 2024",
    status: "Published",
    category: "Sensors & Diagnostics",
  },
  {
    title:
      "Optimized Interdigitated Electrode Configuration for Enhanced-Performance Electrochemical Measurement Systems",
    inventors:
      "Sanket Goel, Aniket Patil, Arindam Kushagra, B. V. V. S. N. Prabhakar Rao and Satish Kumar Dubey",
    application: "202411055865",
    date: "Jul 2024",
    status: "Published",
    category: "Electrochemical Systems",
  },
  {
    title:
      "Machine-Learning-Based Automated System and Method of Generating Droplets in a Microfluidic Device",
    inventors:
      "Sameer Dubey, Leela Kishan Jakkam, Arshad Javed and Satish Kumar Dubey",
    application: "202411068188",
    date: "Sep 2024",
    status: "Published",
    category: "Microfluidics & Diagnostics",
  },
  {
    title:
      "Fabrication of Disposable Paper-Based Semi-Dry Electrode for Electrocardiography Signal Sensing",
    inventors:
      "Billa Bhandari, Alex Chun Kit Chan, Tanuj Wadhi, Nishchitha N. K., Imran Khan, Sohan Dudala and Krishnapriya G. B.",
    application: "202411077094",
    date: "Oct 2024",
    status: "Published",
    category: "Wearable & Flexible Systems",
  },
  {
    title:
      "Multi-Temperature DNA Amplification and Micro-Reaction System and Method with Laser-Induced Graphene",
    inventors:
      "Sanket Goel, Satish Kumar Dubey, Tinku Naik B. and Mukesh Kumar S.",
    application: "202441039024",
    date: "2024",
    status: "Published",
    category: "Microfluidics & Diagnostics",
  },
  {
    title:
      "Multiplexed Biosensing Device for Detection of Antibiotic-Resistant Bacteria",
    inventors: "Sanket Goel and Sonal Fande",
    application: "202411015293",
    date: "Mar 2024",
    status: "Published",
    category: "AMR & Pathogen Diagnostics",
  },
  {
    title:
      "Portable Point-of-Source Testing (PoST) Multimode Optical Detection System",
    inventors: "Sanket Goel and Pavar Sai Kumar",
    application: "202411008440",
    date: "Feb 2024",
    status: "Published",
    category: "Optical & Point-of-Care",
  },
  {
    title: "A Flexible Microheater and a Process for Fabrication Thereof",
    inventors: "Sanket Goel, Sonal Fande and Khairunnisa Amreen",
    application: "202411000357",
    date: "Jan 2024",
    status: "Published",
    category: "Microfluidics & Diagnostics",
  },
  {
    title:
      "A Microfluidic Colorimetric Device and a Method of Manufacturing the Same",
    inventors:
      "Arshad Javed, Sanket Goel, Satish Kumar Dubey and K. S. Deepak",
    application: "202311075934",
    date: "Nov 2023",
    status: "Published",
    category: "Optical & Point-of-Care",
  },

  /* -------------------- FILED -------------------- */

  {
    title:
      "Process for Synthesizing Hematite-Decorated Laser-Induced Graphene Composite for Fabricating a Coin-Cell-Based Symmetric Energy Storage Device",
    inventors: "Sowmya Sree Palavai, Sanket Goel and Satya Tatavarthy",
    application: "202611055547",
    date: "May 2026",
    status: "Filed",
    category: "Energy Systems",
  },
  {
    title:
      "Perovskite-LIG-Based Resistive Device for Ionizing Radiation Detection",
    inventors:
      "Arindam Kushagra, Sai R. Goud Prasad, Bavana Harshitha, Sanket Goel and V. Ramgopal Rao",
    application: "202611046898",
    date: "Apr 2026",
    status: "Filed",
    category: "Graphene & Materials",
  },
  {
    title:
      "An Automated Viscometer System for Detection of Ionizing Radiation",
    inventors:
      "Sanket Goel, Indukalpa Dutta, Sai Prasad Goud R., Nikhil Thoutu and Arindam Kushagra",
    application: "202611053992",
    date: "Apr 2026",
    status: "Filed",
    category: "Instrumentation",
  },
  {
    title:
      "A Flexible Enzymatic Biofuel Cell Device and a Method for Generating Electrical Energy Therefrom",
    inventors: "Sanket Goel and Vanmathi S.",
    application: "202611028403",
    date: "Mar 2026",
    status: "Filed",
    category: "Energy Systems",
  },
  {
    title:
      "A Point-of-Care Device for Dual-Mode Ratiometric Colorimetric Sensing",
    inventors:
      "Satish Kumar Dubey, Sanket Goel, E. Prasanna, Aniket Balapure, Deepak K. S. and P. Ramya Priya",
    application: "202611013709",
    date: "Feb 2026",
    status: "Filed",
    category: "Optical & Point-of-Care",
  },
  {
    title:
      "Fluorometric Device for Detection and Quantification of Cysteine from a Liquid Sample",
    inventors:
      "Sanket Goel, Amitava Das, Samit Chattopadhyay, Satish Kumar Dubey, Somnath, P. Ramya Priya, Deepak K. S., Sourav Dutta and Aniket Balapure",
    application: "202511055942",
    date: "Jun 2025",
    status: "Filed",
    category: "Optical & Point-of-Care",
  },
  {
    title:
      "Portable Device and Process for Temperature-Compensated Onsite Water Quality Monitoring of Nitrate, Ammonia and Chlorine",
    inventors: "Ponnalagu R. N., Sanket Goel and Amrutha Lahiri",
    application: "202511042788",
    date: "May 2025",
    status: "Filed",
    category: "Environmental Sensing",
  },
  {
    title:
      "Device and Method of Multi-Technique Electrochemical Detection with an Integrated Multimode User Interface",
    inventors: "Ponnalagu R. N., Sanket Goel and Parvathy Nair",
    application: "202511031733",
    date: "Mar 2025",
    status: "Filed",
    category: "Electrochemical Systems",
  },
  {
    title:
      "A Wearable Electrochemical Diagnostic Device for Real-Time Monitoring of Electrolyte and Sweat Rate",
    inventors: "Satish Kumar Dubey, Sanket Goel and Sanjeet Kumar",
    application: "202511013461",
    date: "Mar 2025",
    status: "Filed",
    category: "Wearable & Flexible Systems",
  },
  {
    title:
      "Portable Electrochemiluminescence Device and Method for Processing Electrochemiluminescence Signals",
    inventors: "Sanket Goel and Abhishek Kumar",
    application: "202411102377",
    date: "Dec 2024",
    status: "Filed",
    category: "Optical & Point-of-Care",
  },
];

const statuses = ["All", "Granted", "Published", "Filed"];

const categories = [
  "All",
  "Sensors & Diagnostics",
  "Microfluidics & Diagnostics",
  "Electrochemical Systems",
  "Graphene & Materials",
  "Environmental Sensing",
  "AMR & Pathogen Diagnostics",
  "Optical & Point-of-Care",
  "Wearable & Flexible Systems",
  "Energy Systems",
  "Instrumentation",
];

export default function PatentsPage() {
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filteredPatents = useMemo(() => {
    const search = query.trim().toLowerCase();

    return patents.filter((patent) => {
      const matchesStatus =
        status === "All" || patent.status === status;

      const matchesCategory =
        category === "All" || patent.category === category;

      const matchesSearch =
        !search ||
        patent.title.toLowerCase().includes(search) ||
        patent.inventors.toLowerCase().includes(search) ||
        patent.application.toLowerCase().includes(search) ||
        patent.category.toLowerCase().includes(search);

      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [status, category, query]);

  return (
    <main className="min-h-screen bg-white text-[#4F2C1D]">
      <Navbar />

      {/* HERO */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
            Outputs · Intellectual Property
          </p>

          <h1 className="mt-6 max-w-6xl text-6xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-8xl">
            Patents &
            <br />
            Innovation.
          </h1>

          <p className="mt-10 max-w-3xl text-xl leading-9 text-[#706963]">
            A broad intellectual-property portfolio spanning sensors,
            microfluidics, graphene, point-of-care diagnostics, flexible
            systems, environmental technologies, instrumentation, and energy
            devices.
          </p>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#837A72]">
            The portfolio shown here reflects Prof. Sanket Goel&apos;s broader
            research and innovation track record prior to and informing the
            establishment of SenSys at the University of Manitoba.
          </p>
        </div>
      </section>

      {/* PORTFOLIO NUMBERS */}
      <section className="bg-[#F7F3EC] px-8 py-16 md:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid overflow-hidden border border-[#DDD5CC] md:grid-cols-4">
            <div className="border-b border-[#DDD5CC] bg-white p-8 md:border-b-0 md:border-r">
              <p className="text-5xl font-semibold tracking-tight text-[#F2A900]">
                98
              </p>

              <p className="mt-3 text-sm font-semibold">
                Patent Portfolio
              </p>

              <p className="mt-2 text-xs text-[#837A72]">
                As of 10 July 2026
              </p>
            </div>

            <div className="border-b border-[#DDD5CC] bg-white p-8 md:border-b-0 md:border-r">
              <p className="text-5xl font-semibold tracking-tight text-[#385E9D]">
                20
              </p>

              <p className="mt-3 text-sm font-semibold">
                Granted
              </p>
            </div>

            <div className="border-b border-[#DDD5CC] bg-white p-8 md:border-b-0 md:border-r">
              <p className="text-5xl font-semibold tracking-tight text-[#385E9D]">
                36
              </p>

              <p className="mt-3 text-sm font-semibold">
                Published
              </p>
            </div>

            <div className="bg-white p-8">
              <p className="text-5xl font-semibold tracking-tight text-[#385E9D]">
                42
              </p>

              <p className="mt-3 text-sm font-semibold">
                Filed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY THEMES */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
                Innovation Themes
              </p>
            </div>

            <div>
              <h2 className="max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                Intellectual property across the complete technology pathway.
              </h2>

              <p className="mt-7 max-w-3xl text-base leading-8 text-[#706963]">
                The portfolio extends from materials and fabrication methods
                through sensors, microfluidics, portable instrumentation,
                diagnostic systems, environmental technologies, and energy
                devices.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden border border-[#DDD5CC] bg-[#DDD5CC] md:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "01",
                "Sensors & Diagnostics",
                "Electrochemical, optical, biochemical, and point-of-care sensing technologies.",
              ],
              [
                "02",
                "Microfluidics",
                "Fluid handling, lab-on-chip systems, thermal control, amplification, and droplet technologies.",
              ],
              [
                "03",
                "Advanced Materials",
                "Laser-induced graphene, rGO, functional nanocomposites, and engineered electrode interfaces.",
              ],
              [
                "04",
                "Portable Systems",
                "Integrated electronics, user interfaces, field diagnostics, environmental monitoring, and energy systems.",
              ],
            ].map(([number, title, text]) => (
              <div key={number} className="bg-[#FBF8F4] p-7">
                <span className="text-xs font-semibold text-[#F2A900]">
                  {number}
                </span>

                <h3 className="mt-8 text-xl font-semibold">
                  {title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#706963]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEARCH / FILTER */}
      <section className="bg-[#F7F3EC] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
            Selected Patent Portfolio
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Explore representative intellectual-property outputs.
          </h2>

          <p className="mt-6 max-w-3xl text-sm leading-7 text-[#706963]">
            Search by technology, inventor, or application number, or filter
            by patent status and research area.
          </p>

          {/* SEARCH */}
          <div className="mt-12">
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search patents, inventors or application numbers..."
              className="w-full border border-[#CCC3BA] bg-white px-5 py-4 text-sm text-[#4F2C1D] outline-none transition placeholder:text-[#9A9189] focus:border-[#385E9D]"
            />
          </div>

          {/* STATUS */}
          <div className="mt-5 flex flex-wrap gap-2">
            {statuses.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setStatus(item)}
                className={`rounded-full border px-5 py-2.5 text-xs font-semibold transition ${
                  status === item
                    ? "border-[#4F2C1D] bg-[#4F2C1D] text-white"
                    : "border-[#D6CEC5] bg-white text-[#645D57] hover:border-[#385E9D] hover:text-[#385E9D]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* CATEGORY */}
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-full border px-4 py-2 text-[11px] transition ${
                  category === item
                    ? "border-[#385E9D] bg-[#385E9D] text-white"
                    : "border-[#D6CEC5] bg-[#FBF8F4] text-[#706963] hover:border-[#385E9D]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between border-b border-[#CCC3BA] pb-4">
            <p className="text-sm text-[#706963]">
              Showing{" "}
              <span className="font-semibold text-[#4F2C1D]">
                {filteredPatents.length}
              </span>{" "}
              selected records
            </p>

            {(status !== "All" ||
              category !== "All" ||
              query.length > 0) && (
              <button
                type="button"
                onClick={() => {
                  setStatus("All");
                  setCategory("All");
                  setQuery("");
                }}
                className="text-xs font-semibold text-[#385E9D]"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* PATENT CARDS */}
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {filteredPatents.map((patent, index) => (
              <article
                key={`${patent.application}-${patent.title}`}
                className="group flex flex-col justify-between border border-[#DDD5CC] bg-white p-7 transition hover:border-[#385E9D]"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] ${
                          patent.status === "Granted"
                            ? "bg-[#F2A900]/20 text-[#4F2C1D]"
                            : patent.status === "Published"
                            ? "bg-[#385E9D]/10 text-[#385E9D]"
                            : "bg-[#F1ECE5] text-[#706963]"
                        }`}
                      >
                        {patent.status}
                      </span>

                      <span className="text-[10px] uppercase tracking-[0.16em] text-[#837A72]">
                        {patent.category}
                      </span>
                    </div>

                    <span className="text-xs font-semibold text-[#F2A900]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-semibold leading-8 tracking-tight md:text-2xl">
                    {patent.title}
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-[#706963]">
                    {patent.inventors}
                  </p>
                </div>

                <div className="mt-8 border-t border-[#E7E0D8] pt-5">
                  <div className="flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-semibold text-[#385E9D]">
                      {patent.application}
                    </p>

                    <p className="text-[#837A72]">
                      {patent.date}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPatents.length === 0 && (
            <div className="mt-8 border border-[#DDD5CC] bg-white p-10 text-center">
              <p className="font-semibold">
                No matching patents found.
              </p>

              <p className="mt-2 text-sm text-[#706963]">
                Try changing the search term or filters.
              </p>
            </div>
          )}

          <div className="mt-8 border-l-2 border-[#F2A900] pl-5">
            <p className="max-w-4xl text-xs leading-6 text-[#837A72]">
              This page displays a representative selection from the broader
              patent portfolio. Portfolio totals reflect records available as
              of 10 July 2026.
            </p>
          </div>
        </div>
      </section>

      {/* TRANSLATION */}
      <section className="bg-[#4F2C1D] px-8 py-24 text-white md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#F2A900]">
                From IP to Impact
              </p>
            </div>

            <div>
              <h2 className="max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                Innovation designed for translation.
              </h2>

              <p className="mt-7 max-w-3xl text-base leading-8 text-white/70">
                Patents are one element of a broader translation pathway
                connecting fundamental research, prototype development,
                validation, intellectual property, industry engagement,
                licensing, and deployment.
              </p>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  ["Research", "Scientific discovery and engineering"],
                  ["IP", "Protectable technology and system design"],
                  ["Translation", "Licensing, deployment and scale-up"],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    className="border border-white/15 p-6"
                  >
                    <h3 className="font-semibold text-[#F2A900]">
                      {title}
                    </h3>

                    <p className="mt-3 text-xs leading-6 text-white/65">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OTHER OUTPUTS */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
            Explore More
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
            More scholarly outputs.
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <a
              href="/publications"
              className="border border-[#DDD5CC] bg-[#FBF8F4] p-8 transition hover:border-[#385E9D]"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-[#385E9D]">
                Publications
              </p>

              <h3 className="mt-4 text-3xl font-semibold">
                Journal & Conference Publications
              </h3>

              <p className="mt-7 text-sm font-semibold text-[#385E9D]">
                Explore publications →
              </p>
            </a>

            <a
              href="/books"
              className="border border-[#DDD5CC] bg-[#FBF8F4] p-8 transition hover:border-[#385E9D]"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-[#385E9D]">
                Books
              </p>

              <h3 className="mt-4 text-3xl font-semibold">
                Books & Edited Volumes
              </h3>

              <p className="mt-7 text-sm font-semibold text-[#385E9D]">
                Explore books →
              </p>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}