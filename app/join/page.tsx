import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const opportunities = [
  {
    number: "01",
    title: "Undergraduate Researchers",
    subtitle: "Prototype · Fabricate · Validate",
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

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-white text-[#4F2C1D]">
      <Navbar />

      {/* HERO */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
            Join SenSys
          </p>

          <h1 className="mt-6 max-w-6xl text-6xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-8xl">
            Build the future
            <br />
            of sensing with us.
          </h1>

          <p className="mt-10 max-w-3xl text-xl leading-9 text-[#706963]">
            SenSys is building an interdisciplinary research environment at the
            University of Manitoba spanning intelligent sensing, microsystems,
            microfluidics, wearable and implantable technologies, advanced
            materials, diagnostics, environmental monitoring, and
            field-deployable systems.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#opportunities"
              className="rounded-full bg-[#F2A900] px-7 py-3.5 text-sm font-semibold text-[#2A1710] transition hover:bg-[#385E9D] hover:text-white"
            >
              Explore opportunities →
            </a>

            <a
              href="mailto:sanketgoel@gmail.com?subject=Interest%20in%20Joining%20SenSys%20Lab"
              className="rounded-full border border-[#CFC5BC] px-7 py-3.5 text-sm font-semibold text-[#4F2C1D] transition hover:border-[#385E9D] hover:text-[#385E9D]"
            >
              Contact Prof. Sanket Goel →
            </a>
          </div>
        </div>
      </section>

      {/* RESEARCH PATHWAY */}
      <section className="bg-[#F7F3EC] px-8 py-20 md:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
                Research Pathway
              </p>
            </div>

            <div>
              <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                Grow from prototyping to research leadership.
              </h2>

              <p className="mt-7 max-w-3xl text-base leading-8 text-[#706963]">
                SenSys provides opportunities across multiple stages of
                research training and technology translation, with increasing
                responsibility in system design, validation, mentoring, and
                deployment.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-3 md:grid-cols-5">
            {[
              "Undergraduate",
              "M.Sc.",
              "Ph.D.",
              "Postdoctoral Fellow",
              "Translation & Leadership",
            ].map((item, index) => (
              <div
                key={item}
                className="relative border border-[#DDD5CC] bg-white p-5"
              >
                <span className="text-xs font-semibold text-[#F2A900]">
                  0{index + 1}
                </span>

                <p className="mt-3 text-sm font-semibold text-[#4F2C1D]">
                  {item}
                </p>

                {index < 4 && (
                  <span className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-xl text-[#385E9D] md:block">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-7 border-l-2 border-[#F2A900] pl-5">
            <p className="max-w-4xl text-sm leading-7 text-[#706963]">
              Project management and technical support operate alongside this
              research pathway, enabling coordination, infrastructure,
              fabrication, compliance, and translation across the lab.
            </p>
          </div>
        </div>
      </section>

      {/* OPPORTUNITIES */}
      <section
        id="opportunities"
        className="scroll-mt-28 bg-white px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
                Who We&apos;re Looking For
              </p>
            </div>

            <div>
              <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                Researchers and professionals who think across boundaries.
              </h2>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-[#706963]">
                Opportunities span research, technology development, systems
                integration, translation, mentoring, laboratory operations,
                and project coordination.
              </p>
            </div>
          </div>

          <div className="mt-20 space-y-6">
            {opportunities.map((item) => (
              <article
                key={item.number}
                className="grid gap-8 border border-[#DDD5CC] bg-[#FBF8F4] p-8 transition hover:border-[#385E9D] md:p-10 lg:grid-cols-[0.13fr_0.42fr_1fr]"
              >
                <div>
                  <span className="text-sm font-semibold tracking-[0.25em] text-[#F2A900]">
                    {item.number}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#385E9D]">
                    {item.subtitle}
                  </p>

                  <h3 className="mt-3 text-3xl font-semibold leading-tight tracking-tight">
                    {item.title}
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-[#706963]">
                    {item.description}
                  </p>
                </div>

                <div>
                  <ul className="space-y-4">
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-4 text-sm leading-7 text-[#5F5953]"
                      >
                        <span className="mt-[10px] h-2 w-2 flex-none rounded-full bg-[#385E9D]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* RESEARCH AREAS */}
      <section className="bg-[#F7F3EC] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
                Research Areas
              </p>
            </div>

            <div>
              <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                Work across materials, devices, systems, data, and
                applications.
              </h2>

              <p className="mt-7 max-w-3xl text-base leading-8 text-[#706963]">
                Projects are inherently interdisciplinary and may span more
                than one area depending on the research problem.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            {areas.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#D6CEC5] bg-white px-4 py-2.5 text-xs text-[#645D57] transition hover:border-[#385E9D] hover:text-[#385E9D]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT TO SEND */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
                Express Your Interest
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
                What should you send?
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-[#706963]">
                A concise application helps us understand your background,
                interests, and how your experience may align with the research
                programme.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden border border-[#DDD5CC] bg-[#DDD5CC] md:grid-cols-3">
              <div className="bg-[#FBF8F4] p-7">
                <span className="text-xs font-semibold text-[#F2A900]">
                  01
                </span>

                <h3 className="mt-8 text-xl font-semibold">
                  CV / Resume
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#706963]">
                  Include your academic background, research experience,
                  technical skills, publications, and relevant projects.
                </p>
              </div>

              <div className="bg-[#FBF8F4] p-7">
                <span className="text-xs font-semibold text-[#F2A900]">
                  02
                </span>

                <h3 className="mt-8 text-xl font-semibold">
                  Research Interests
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#706963]">
                  Briefly describe the research problems and technology areas
                  that interest you.
                </p>
              </div>

              <div className="bg-[#FBF8F4] p-7">
                <span className="text-xs font-semibold text-[#F2A900]">
                  03
                </span>

                <h3 className="mt-8 text-xl font-semibold">
                  Relevant Experience
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#706963]">
                  Highlight experimental, fabrication, programming,
                  instrumentation, analytical, or project-management
                  experience relevant to SenSys.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPLICATION CTA */}
      <section className="bg-[#F2A900] px-8 py-24 text-[#2A1710] md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
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
                description of your academic background, technical experience,
                and research interests.
              </p>

              <a
                href="mailto:sanketgoel@gmail.com?subject=Interest%20in%20Joining%20SenSys%20Lab"
                className="mt-8 inline-flex rounded-full bg-[#4F2C1D] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#385E9D]"
              >
                Email Prof. Sanket Goel →
              </a>

              <p className="mt-4 text-sm font-semibold">
                sanketgoel@gmail.com
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}