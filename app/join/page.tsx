import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";

type OpportunityStatus =
  | "Open"
  | "Rolling"
  | "Expressions of Interest"
  | "Planned"
  | "Closed";

type Opportunity = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  status: OpportunityStatus;
  statusNote: string;
  points: string[];
};

const opportunities: Opportunity[] = [
  {
    number: "01",
    title: "Undergraduate Researchers",
    subtitle: "Prototype · Fabricate · Validate",
    status: "Expressions of Interest",
    statusNote:
      "Students interested in research experience are welcome to get in touch.",
    description:
      "Work alongside graduate researchers and postdoctoral fellows to prototype, fabricate, test, and validate emerging sensing platforms.",
    points: [
      "Support device fabrication and prototyping.",
      "Assist with experimental testing and validation.",
      "Contribute to electronics integration and data collection.",
      "Participate in sensing, microfluidics, wearable-device, and application-validation projects.",
    ],
  },
  {
    number: "02",
    title: "M.Sc. Researchers",
    subtitle: "Focused Technology Development",
    status: "Expressions of Interest",
    statusNote:
      "Prospective M.Sc. researchers may contact the lab with their background and interests.",
    description:
      "Develop and optimize sensing technologies across microfluidics, flexible systems, diagnostics, and environmental monitoring.",
    points: [
      "Develop multiplexed microfluidic platforms and optimize assay performance.",
      "Fabricate and characterize flexible sensors, screen functional materials, and integrate devices for continuous monitoring.",
      "Design and validate environmental sensing platforms for water, soil, food, and agricultural applications.",
    ],
  },
  {
    number: "03",
    title: "Ph.D. Researchers",
    subtitle: "Integrated Systems · Advanced Research",
    status: "Expressions of Interest",
    statusNote:
      "Prospective Ph.D. researchers are welcome to share their research background and interests.",
    description:
      "Lead interdisciplinary research combining microfluidics, functional materials, sensors, electronics, and intelligent systems.",
    points: [
      "Integrate lab-on-chip systems using microfluidics, sensor functionalization, fluid handling, and embedded sensing.",
      "Develop wearable and implantable devices using biocompatible and flexible materials for real-time health monitoring.",
      "Design Soil-on-Chip and water-quality platforms for multi-analyte detection using advanced and 4D-printed architectures.",
    ],
  },
  {
    number: "04",
    title: "Postdoctoral Fellows",
    subtitle: "Integration · Translation · Leadership",
    status: "Expressions of Interest",
    statusNote:
      "Researchers interested in future postdoctoral opportunities may share their CV and research profile.",
    description:
      "Drive multidisciplinary sensing technologies from advanced research toward validation, deployment, and translation.",
    points: [
      "Integrate sensors, microfluidics, electronics, and data analytics into complete lab-on-chip systems.",
      "Develop wearable and implantable cyber-physical sensing systems.",
      "Develop field-ready agri-food and environmental sensing platforms.",
      "Mentor graduate and undergraduate researchers.",
      "Lead technology translation including validation, regulatory pathways, device deployment, and scale-up.",
    ],
  },
  {
    number: "05",
    title: "Project Manager / Technical Support",
    subtitle: "Operations · Coordination · Research Support",
    status: "Expressions of Interest",
    statusNote:
      "Professionals interested in research operations and technical-support roles may submit an expression of interest.",
    description:
      "Enable the research programme through technical coordination, laboratory operations, project management, and translational support.",
    points: [
      "Coordinate multidisciplinary activities across the lab's research thrusts.",
      "Manage timelines, resources, documentation, and compliance.",
      "Support procurement, equipment commissioning, and laboratory operations.",
      "Assist fabrication, prototyping, testing, and experimental workflows.",
      "Support collaborations, translation activities, and technology deployment.",
    ],
  },
];

const areas = [
  "Microfluidics",
  "Lab-on-Chip",
  "Biosensors",
  "Electrochemical Sensing",
  "Optical Sensing",
  "Wearable Devices",
  "Implantable Devices",
  "Flexible Electronics",
  "Biocompatible Materials",
  "Advanced Materials",
  "Embedded Systems",
  "Artificial Intelligence",
  "Data Analytics",
  "Soil-on-Chip",
  "Water Quality",
  "Food Safety",
  "Precision Agriculture",
  "Environmental Monitoring",
  "4D Printing",
];

function getStatusStyles(status: OpportunityStatus) {
  switch (status) {
    case "Open":
      return {
        dot: "bg-emerald-500",
        badge:
          "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
      };

    case "Rolling":
      return {
        dot: "bg-[var(--um-sky)]",
        badge:
          "border-[var(--um-sky)]/30 bg-[var(--um-sky)]/10 text-[var(--um-blue)]",
      };

    case "Planned":
      return {
        dot: "bg-[var(--um-gold)]",
        badge:
          "border-[var(--um-gold)]/40 bg-[var(--um-gold)]/10 text-[var(--foreground)]",
      };

    case "Closed":
      return {
        dot: "bg-[var(--foreground-muted)]",
        badge:
          "border-[var(--border)] bg-[var(--surface-muted)] text-[var(--foreground-muted)]",
      };

    default:
      return {
        dot: "bg-[var(--um-blue)]",
        badge:
          "border-[var(--um-blue)]/25 bg-[var(--um-blue)]/10 text-[var(--um-blue)]",
      };
  }
}

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />

      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <section className="relative overflow-hidden bg-[var(--background)] px-8 py-24 md:px-16 md:py-32">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[var(--um-blue)]/8 blur-[120px]" />

        <div className="pointer-events-none absolute bottom-[-180px] left-[18%] h-[400px] w-[400px] rounded-full bg-[var(--um-sky)]/5 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
              Join SenSys
            </p>

            <h1 className="mt-6 max-w-6xl text-6xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-8xl">
              Build the future
              <br />
              of sensing with us.
            </h1>

            <p className="mt-10 max-w-3xl text-xl leading-9 text-[var(--foreground-soft)]">
              SenSys is building an interdisciplinary research environment at
              the University of Manitoba spanning intelligent sensing,
              microsystems, microfluidics, wearable and implantable
              technologies, advanced materials, diagnostics, environmental
              monitoring, and field-deployable systems.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#opportunities"
                className="rounded-full bg-[var(--um-gold)] px-7 py-3.5 text-sm font-semibold text-[#2A1710] transition hover:bg-[var(--um-blue)] hover:text-white"
              >
                Explore opportunities →
              </a>

              <a
                href="mailto:sanketgoel@gmail.com?subject=Interest%20in%20Joining%20SenSys%20Lab"
                className="rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-7 py-3.5 text-sm font-semibold transition hover:border-[var(--um-blue)] hover:text-[var(--um-blue)]"
              >
                Contact Prof. Sanket Goel →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* CURRENT OPPORTUNITY STATUS */}
      {/* ===================================================== */}

      <section className="border-y border-[var(--border)] bg-[var(--surface)] px-8 py-8 md:px-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--um-blue)] opacity-30" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--um-blue)]" />
                </span>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--um-blue)]">
                    Current Opportunity Status
                  </p>

                  <p className="mt-1 text-sm text-[var(--foreground-soft)]">
                    Expressions of interest are welcome across SenSys research
                    and support categories.
                  </p>
                </div>
              </div>

              <p className="max-w-xl text-xs leading-6 text-[var(--foreground-muted)] md:text-right">
                Formal vacancies, funded positions, application deadlines, and
                intake-specific requirements will be identified separately when
                applicable.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* RESEARCH PATHWAY */}
      {/* ===================================================== */}

      <section className="bg-[var(--surface-soft)] px-8 py-20 md:px-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 md:grid-cols-[0.7fr_1.3fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Research Pathway
                </p>
              </div>

              <div>
                <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                  Grow from prototyping to research leadership.
                </h2>

                <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
                  SenSys provides opportunities across multiple stages of
                  research training and technology translation, with increasing
                  responsibility in system design, validation, mentoring, and
                  deployment.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-3 md:grid-cols-5">
            {[
              "Undergraduate",
              "M.Sc.",
              "Ph.D.",
              "Postdoctoral Fellow",
              "Translation & Leadership",
            ].map((item, index) => (
              <Reveal key={item} delay={index * 70}>
                <div className="relative h-full border border-[var(--border)] bg-[var(--surface)] p-5">
                  <span className="text-xs font-semibold text-[var(--um-gold)]">
                    0{index + 1}
                  </span>

                  <p className="mt-3 text-sm font-semibold">
                    {item}
                  </p>

                  {index < 4 && (
                    <span className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-xl text-[var(--um-blue)] md:block">
                      →
                    </span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={350}>
            <div className="mt-7 border-l-2 border-[var(--um-gold)] pl-5">
              <p className="max-w-4xl text-sm leading-7 text-[var(--foreground-soft)]">
                Project management and technical support operate alongside this
                research pathway, enabling coordination, infrastructure,
                fabrication, compliance, and translation across the lab.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* OPPORTUNITIES */}
      {/* ===================================================== */}

      <section
        id="opportunities"
        className="scroll-mt-28 bg-[var(--background)] px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 md:grid-cols-[0.7fr_1.3fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Opportunities
                </p>
              </div>

              <div>
                <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                  Researchers and professionals who think across boundaries.
                </h2>

                <p className="mt-7 max-w-3xl text-lg leading-8 text-[var(--foreground-soft)]">
                  Opportunities span research, technology development, systems
                  integration, translation, mentoring, laboratory operations,
                  and project coordination.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-20 space-y-6">
            {opportunities.map((item, index) => {
              const statusStyles = getStatusStyles(item.status);

              return (
                <Reveal
                  key={item.number}
                  delay={index * 70}
                >
                  <article className="group overflow-hidden border border-[var(--border)] bg-[var(--surface)] transition duration-300 hover:-translate-y-1 hover:border-[var(--um-blue)] hover:shadow-[var(--shadow-soft)]">
                    {/* STATUS BAR */}

                    <div className="flex flex-col gap-4 border-b border-[var(--border)] bg-[var(--surface-muted)] px-7 py-4 sm:flex-row sm:items-center sm:justify-between md:px-10">
                      <div
                        className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] ${statusStyles.badge}`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${statusStyles.dot}`}
                        />

                        {item.status}
                      </div>

                      <p className="max-w-2xl text-xs leading-5 text-[var(--foreground-muted)] sm:text-right">
                        {item.statusNote}
                      </p>
                    </div>

                    {/* CONTENT */}

                    <div className="grid gap-8 p-8 md:p-10 lg:grid-cols-[0.13fr_0.42fr_1fr]">
                      <div>
                        <span className="text-sm font-semibold tracking-[0.25em] text-[var(--um-gold)]">
                          {item.number}
                        </span>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--um-blue)]">
                          {item.subtitle}
                        </p>

                        <h3 className="mt-3 text-3xl font-semibold leading-tight tracking-tight">
                          {item.title}
                        </h3>

                        <p className="mt-5 text-sm leading-7 text-[var(--foreground-soft)]">
                          {item.description}
                        </p>

                        <a
                          href={`mailto:sanketgoel@gmail.com?subject=${encodeURIComponent(
                            `Interest in SenSys Lab — ${item.title}`
                          )}`}
                          className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[var(--um-blue)] transition hover:text-[var(--um-sky)]"
                        >
                          Express interest
                          <span className="transition-transform group-hover:translate-x-1">
                            →
                          </span>
                        </a>
                      </div>

                      <div>
                        <ul className="space-y-4">
                          {item.points.map((point) => (
                            <li
                              key={point}
                              className="flex gap-4 text-sm leading-7 text-[var(--foreground-soft)]"
                            >
                              <span className="mt-[10px] h-2 w-2 flex-none rounded-full bg-[var(--um-blue)]" />

                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* STATUS LEGEND */}
      {/* ===================================================== */}

      <section className="border-y border-[var(--border)] bg-[var(--surface-soft)] px-8 py-14 md:px-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[0.55fr_1.45fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--um-blue)]">
                  Opportunity Status
                </p>

                <p className="mt-4 max-w-md text-sm leading-7 text-[var(--foreground-soft)]">
                  Status labels make it easier to distinguish active vacancies
                  from broader expressions of interest.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  {
                    label: "Open",
                    description: "Active vacancy",
                    dot: "bg-emerald-500",
                  },
                  {
                    label: "Rolling",
                    description: "Reviewed continuously",
                    dot: "bg-[var(--um-sky)]",
                  },
                  {
                    label: "Interest",
                    description: "EOI welcome",
                    dot: "bg-[var(--um-blue)]",
                  },
                  {
                    label: "Planned",
                    description: "Expected later",
                    dot: "bg-[var(--um-gold)]",
                  },
                  {
                    label: "Closed",
                    description: "Not accepting",
                    dot: "bg-[var(--foreground-muted)]",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="border border-[var(--border)] bg-[var(--surface)] p-4"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${item.dot}`}
                      />

                      <p className="text-xs font-semibold">
                        {item.label}
                      </p>
                    </div>

                    <p className="mt-2 text-[10px] leading-5 text-[var(--foreground-muted)]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* RESEARCH AREAS */}
      {/* ===================================================== */}

      <section className="bg-[var(--surface-soft)] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 md:grid-cols-[0.7fr_1.3fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Research Areas
                </p>
              </div>

              <div>
                <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  Work across materials, devices, systems, data, and
                  applications.
                </h2>

                <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
                  Projects are inherently interdisciplinary and may span more
                  than one area depending on the research problem.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-12 flex flex-wrap gap-3">
              {areas.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-xs text-[var(--foreground-soft)] transition hover:border-[var(--um-blue)] hover:text-[var(--um-blue)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* WHAT TO SEND */}
      {/* ===================================================== */}

      <section className="bg-[var(--background)] px-8 py-24 md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--um-blue)]">
                  Express Your Interest
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
                  What should you send?
                </h2>

                <p className="mt-6 max-w-xl text-base leading-8 text-[var(--foreground-soft)]">
                  A concise application helps us understand your background,
                  interests, and how your experience may align with the
                  research programme.
                </p>
              </div>

              <div className="grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] md:grid-cols-3">
                {[
                  {
                    number: "01",
                    title: "CV / Resume",
                    text: "Include your academic background, research experience, technical skills, publications, and relevant projects.",
                  },
                  {
                    number: "02",
                    title: "Research Interests",
                    text: "Briefly describe the research problems and technology areas that interest you.",
                  },
                  {
                    number: "03",
                    title: "Relevant Experience",
                    text: "Highlight experimental, fabrication, programming, instrumentation, analytical, or project-management experience relevant to SenSys.",
                  },
                ].map((item) => (
                  <div
                    key={item.number}
                    className="bg-[var(--surface)] p-7"
                  >
                    <span className="text-xs font-semibold text-[var(--um-gold)]">
                      {item.number}
                    </span>

                    <h3 className="mt-8 text-xl font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== */}
      {/* APPLICATION CTA */}
      {/* ===================================================== */}

      <section className="bg-[var(--um-gold)] px-8 py-24 text-[#2A1710] md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#4F2C1D]/70">
                  Join SenSys
                </p>

                <h2 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] md:text-7xl">
                  Interested in working with us?
                </h2>
              </div>

              <div>
                <p className="text-lg leading-8 text-[#4F2C1D]/85">
                  Prospective undergraduate researchers, M.Sc. and Ph.D.
                  students, postdoctoral fellows, project-management personnel,
                  and technical staff are welcome to express their interest.
                </p>

                <p className="mt-5 text-base leading-7 text-[#4F2C1D]/80">
                  Email Prof. Sanket Goel with your CV or resume and a brief
                  description of your academic background, technical
                  experience, and research interests.
                </p>

                <a
                  href="mailto:sanketgoel@gmail.com?subject=Interest%20in%20Joining%20SenSys%20Lab"
                  className="mt-8 inline-flex rounded-full bg-[#2A1710] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#385E9D]"
                >
                  Email Prof. Sanket Goel →
                </a>

                <p className="mt-4 text-sm font-semibold">
                  sanketgoel@gmail.com
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}