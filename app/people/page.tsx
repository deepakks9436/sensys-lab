import Image from "next/image";
import Link from "next/link";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function PeoplePage() {
  return (
    <main className="min-h-screen bg-white text-[#4F2C1D]">
      <Navbar />

      {/* HERO */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
            People
          </p>

          <h1 className="mt-6 max-w-5xl text-6xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-8xl">
            People behind
            <br />
            SenSys.
          </h1>

          <p className="mt-10 max-w-3xl text-xl leading-9 text-[#706963]">
            An interdisciplinary research team developing intelligent sensing
            systems across microsystems, microfluidics, advanced materials,
            wearable technologies, diagnostics, environmental monitoring, and
            connected instrumentation.
          </p>
        </div>
      </section>

      {/* PRINCIPAL INVESTIGATOR */}
      <section className="bg-[#F7F3EC] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
            Principal Investigator
          </p>

          <div className="mt-12 grid overflow-hidden border border-[#DDD5CC] bg-white lg:grid-cols-[0.9fr_1.1fr]">
            {/* IMAGE */}
            <div className="relative min-h-[640px] bg-[#F1ECE5]">
              <Image
                src="/people/sanket-goel.webp"
                alt="Prof. Sanket Goel"
                fill
                className="object-contain object-center"
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>

            {/* CONTENT */}
            <div className="flex flex-col justify-between p-8 md:p-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#385E9D]">
                  Eddie Goldenberg Research Chair of Canada
                </p>

                <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                  Prof. Sanket Goel
                </h2>

                <p className="mt-3 text-sm font-semibold text-[#4F2C1D]">
                  Founder & Principal Investigator, SenSys Lab
                </p>

                <p className="mt-1 text-sm text-[#706963]">
                  University of Manitoba
                </p>

                <p className="mt-8 max-w-2xl text-base leading-8 text-[#706963]">
                  Prof. Sanket Goel leads an interdisciplinary research
                  programme spanning microsystems, microfluidics, biosensors,
                  electrochemical and optical sensing, wearable and implantable
                  technologies, advanced materials, intelligent
                  instrumentation, environmental sensing, and translational
                  engineering.
                </p>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-[#837A72]">
                  His broader research and innovation track record provides the
                  scientific, technological, and translational foundation
                  informing SenSys and its next-generation work in healthcare,
                  agriculture, food safety, environmental monitoring, and
                  intelligent cyber-physical sensing systems.
                </p>

                {/* TRACK RECORD */}
                <div className="mt-10 grid grid-cols-2 gap-6 border-y border-[#E3DBD2] py-8 md:grid-cols-4">
                  <div>
                    <p className="text-3xl font-semibold text-[#F2A900]">
                      319
                    </p>

                    <p className="mt-2 text-xs leading-5 text-[#706963]">
                      Publication Records
                    </p>
                  </div>

                  <div>
                    <p className="text-3xl font-semibold text-[#F2A900]">
                      98
                    </p>

                    <p className="mt-2 text-xs leading-5 text-[#706963]">
                      Patents
                    </p>
                  </div>

                  <div>
                    <p className="text-3xl font-semibold text-[#F2A900]">
                      44
                    </p>

                    <p className="mt-2 text-xs leading-5 text-[#706963]">
                      Sponsored Research Grants
                    </p>
                  </div>

                  <div>
                    <p className="text-3xl font-semibold text-[#F2A900]">
                      144
                    </p>

                    <p className="mt-2 text-xs leading-5 text-[#706963]">
                      Invited Talks
                    </p>
                  </div>
                </div>

                {/* RESEARCH THEMES */}
                <div className="mt-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#385E9D]">
                    Research Interests
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {[
                      "Microsystems",
                      "Microfluidics",
                      "Biosensors",
                      "Electrochemical Sensing",
                      "Optical Sensing",
                      "Wearable Devices",
                      "Advanced Materials",
                      "Point-of-Care Diagnostics",
                      "Environmental Sensing",
                      "Intelligent Instrumentation",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#D8D0C7] bg-[#FBF8F4] px-3.5 py-2 text-xs text-[#645D57]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* LINKS */}
              <div className="mt-10 flex flex-wrap gap-6 text-sm">
                <a
                  href="https://scholar.google.com/citations?hl=en&user=xgH6FBkAAAAJ&view_op=list_works&sortby=pubdate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#385E9D] transition hover:text-[#4F2C1D]"
                >
                  Google Scholar →
                </a>

                <a
                  href="https://www.linkedin.com/in/sanketgoel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#385E9D] transition hover:text-[#4F2C1D]"
                >
                  LinkedIn →
                </a>

                <Link
                  href="/publications"
                  className="text-[#385E9D] transition hover:text-[#4F2C1D]"
                >
                  Publications →
                </Link>

                <Link
                  href="/patents"
                  className="text-[#385E9D] transition hover:text-[#4F2C1D]"
                >
                  Patents →
                </Link>

                <a
                  href="https://www.canada.ca/en/impact-plus-chairs.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#385E9D] transition hover:text-[#4F2C1D]"
                >
                  Research Chair Programme →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POSTDOCTORAL RESEARCHERS */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
                Postdoctoral Researchers
              </p>
            </div>

            <div>
              <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                Integrating devices, systems, and applications.
              </h2>

              <p className="mt-7 max-w-3xl text-base leading-8 text-[#706963]">
                Postdoctoral researchers at SenSys work across sensing,
                microfluidics, wearable technologies, intelligent
                instrumentation, data-enabled systems, and translational
                applications.
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {/* DEEPAK */}
            <article className="overflow-hidden border border-[#DDD5CC] bg-[#FBF8F4]">
              <div className="relative aspect-[4/3] overflow-hidden bg-white p-5">
                <Image
                  src="/people/ks-deepak.jpg"
                  alt="K. S. Deepak"
                  fill
                  className="object-contain object-center transition duration-500 hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div className="p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#385E9D]">
                  Postdoctoral Researcher
                </p>

                <h3 className="mt-3 text-3xl font-semibold">
                  K. S. Deepak
                </h3>

                <p className="mt-5 max-w-xl text-sm leading-7 text-[#706963]">
                  Research across miniaturized sensing platforms, microfluidic
                  systems, portable diagnostics, wearable devices, and
                  multimodal analytical technologies.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "Microfluidics",
                    "Biosensors",
                    "Pesticide Detection",
                    "Wearable Sensors",
                    "Optical Sensing",
                    "Electrochemical Sensing",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#D8D0C7] bg-white px-3 py-2 text-xs text-[#645D57]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            {/* PARVATHY */}
            <article className="overflow-hidden border border-[#DDD5CC] bg-[#FBF8F4]">
              <div className="relative aspect-[4/3] overflow-hidden bg-white p-5">
                <Image
                  src="/people/parvathy-nair.jpg"
                  alt="Parvathy Nair"
                  fill
                  className="object-contain object-center transition duration-500 hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div className="p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#385E9D]">
                  Postdoctoral Researcher
                </p>

                <h3 className="mt-3 text-3xl font-semibold">
                  Parvathy Nair
                </h3>

                <p className="mt-5 max-w-xl text-sm leading-7 text-[#706963]">
                  Research focused on electrochemical sensing, multiplexed
                  biomarker detection, integrated microfluidics, portable
                  instrumentation, and point-of-care analytical systems.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "Electrochemical Sensing",
                    "Microfluidics",
                    "Point-of-Care Diagnostics",
                    "Biomarker Detection",
                    "Portable Instrumentation",
                    "Flexible Sensors",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#D8D0C7] bg-white px-3 py-2 text-xs text-[#645D57]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* GROWING TEAM */}
      <section className="bg-[#F7F3EC] px-8 py-24 md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
                Growing Team
              </p>

              <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                Building an interdisciplinary research community.
              </h2>
            </div>

            <div className="lg:pt-16">
              <p className="max-w-2xl text-lg leading-8 text-[#706963]">
                SenSys is expanding across undergraduate research, M.Sc. and
                Ph.D. training, postdoctoral research, technical support, and
                project management to support its major research thrusts.
              </p>

              <Link
                href="/join"
                className="mt-8 inline-block rounded-full bg-[#F2A900] px-7 py-3.5 text-sm font-semibold text-[#2A1710] transition hover:bg-[#385E9D] hover:text-white"
              >
                Explore opportunities →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* JOIN CTA */}
      <section className="bg-[#4F2C1D] px-8 py-20 text-white md:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#F2A900]">
              Work With Us
            </p>

            <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Join the next generation of sensing research.
            </h2>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/join"
              className="rounded-full bg-[#F2A900] px-7 py-3.5 text-sm font-semibold text-[#2A1710] transition hover:bg-white"
            >
              Join SenSys →
            </Link>

            <a
              href="mailto:sanketgoel@gmail.com?subject=Interest%20in%20Joining%20SenSys%20Lab"
              className="rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-[#4F2C1D]"
            >
              Contact Prof. Sanket Goel →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}