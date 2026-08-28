import Image from "next/image";
import Link from "next/link";

import Navbar from "../components/Navbar";
import DynamicHero from "../components/DynamicHero";
import ResearchExplorer from "../components/ResearchExplorer";
import FeaturedResearch from "../components/FeaturedResearch";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#4F2C1D]">
      <Navbar />

      {/* HERO */}
      <DynamicHero />

      {/* CURRENT / FUTURE SENsys RESEARCH AREAS */}
      <ResearchExplorer />

      {/* PRIOR RESEARCH FOUNDATIONS */}
      <FeaturedResearch />

      {/* RESEARCH TRACK RECORD */}
      <section className="bg-[#F7F3EC] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
                Research Track Record
              </p>
            </div>

            <div>
              <h2 className="max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                Deep experience in translating research into technologies.
              </h2>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-[#706963]">
                SenSys is being established on the foundation of an extensive
                interdisciplinary research programme led by Prof. Sanket Goel,
                spanning microsystems, microfluidics, biosensors, advanced
                materials, wearable technologies, intelligent instrumentation,
                energy devices, environmental sensing, and point-of-care
                diagnostics.
              </p>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-[#837A72]">
                The figures below reflect Prof. Goel&apos;s broader research
                and innovation record prior to the establishment of SenSys and
                illustrate the scientific, technological, and translational
                experience informing the new programme at the University of
                Manitoba.
              </p>
            </div>
          </div>

          <div className="mt-20 grid border-y border-[#DDD5CC] md:grid-cols-2 lg:grid-cols-4">
            {/* PUBLICATIONS */}
            <div className="border-b border-[#DDD5CC] py-10 md:border-r lg:border-b-0">
              <p className="text-5xl font-semibold tracking-tight text-[#F2A900] md:text-6xl">
                319
              </p>

              <p className="mt-3 text-sm text-[#706963]">
                Publication Records
              </p>
            </div>

            {/* PATENTS */}
            <div className="border-b border-[#DDD5CC] py-10 md:pl-8 lg:border-b-0 lg:border-r">
              <p className="text-5xl font-semibold tracking-tight text-[#F2A900] md:text-6xl">
                98
              </p>

              <p className="mt-3 text-sm text-[#706963]">
                Patents
              </p>
            </div>

            {/* GRANTS */}
            <div className="border-b border-[#DDD5CC] py-10 md:border-r lg:border-b-0 lg:pl-8">
              <p className="text-5xl font-semibold tracking-tight text-[#F2A900] md:text-6xl">
                44
              </p>

              <p className="mt-3 text-sm text-[#706963]">
                Sponsored Research Grants
              </p>
            </div>

            {/* TECHNOLOGY TRANSFER */}
            <div className="py-10 md:pl-8">
              <p className="text-5xl font-semibold tracking-tight text-[#F2A900] md:text-6xl">
                05
              </p>

              <p className="mt-3 text-sm text-[#706963]">
                Technologies Transferred / Licensed
              </p>
            </div>
          </div>

          {/* OUTPUT LINKS */}
          <div className="mt-14 flex flex-wrap gap-4">
            <Link
              href="/publications"
              className="rounded-full border border-[#CFC5BC] bg-white px-6 py-3 text-sm font-medium text-[#4F2C1D] transition hover:border-[#385E9D] hover:text-[#385E9D]"
            >
              Publications →
            </Link>

            <Link
              href="/patents"
              className="rounded-full border border-[#CFC5BC] bg-white px-6 py-3 text-sm font-medium text-[#4F2C1D] transition hover:border-[#385E9D] hover:text-[#385E9D]"
            >
              Patents →
            </Link>

            <Link
              href="/books"
              className="rounded-full border border-[#CFC5BC] bg-white px-6 py-3 text-sm font-medium text-[#4F2C1D] transition hover:border-[#385E9D] hover:text-[#385E9D]"
            >
              Books →
            </Link>
          </div>
        </div>
      </section>

      {/* SELECTED PUBLICATIONS */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
                Selected Publications
              </p>

              <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                Research shaping the future of sensing.
              </h2>

              <p className="mt-7 max-w-3xl text-base leading-8 text-[#706963]">
                Representative publications from the broader research
                programme led by Prof. Goel and collaborators across sensing,
                microfluidics, wearables, environmental monitoring,
                intelligent instrumentation, and biointegrated systems.
              </p>
            </div>

            <Link
              href="/publications"
              className="w-fit border-b border-[#4F2C1D] pb-1 text-sm font-medium transition hover:border-[#385E9D] hover:text-[#385E9D]"
            >
              View all publications →
            </Link>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {/* PAPER 1 */}
            <article className="group border-t border-[#DCD4CC] pt-6">
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#F7F3EC]">
                <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-[#F2A900] transition-transform duration-500 group-hover:scale-x-100" />

                <div className="px-8 text-center">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#385E9D]">
                    Food Safety
                  </p>

                  <p className="mt-4 text-sm leading-6 text-[#706963]">
                    Portable optical sensing
                    <br />
                    + chemometrics
                  </p>
                </div>
              </div>

              <p className="mt-6 text-xs uppercase tracking-[0.25em] text-[#837A72]">
                Microchemical Journal · 2026
              </p>

              <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight">
                An Automated Portable Dual-Mode Optical Device for On-Site
                Detection and Chemometrics-Enhanced Discrimination of
                Pesticides
              </h3>

              <a
                href="https://doi.org/10.1016/j.microc.2026.118355"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block text-sm font-medium text-[#385E9D]"
              >
                Read publication →
              </a>
            </article>

            {/* PAPER 2 */}
            <article className="group border-t border-[#DCD4CC] pt-6">
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#F7F3EC]">
                <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-[#385E9D] transition-transform duration-500 group-hover:scale-x-100" />

                <div className="px-8 text-center">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#385E9D]">
                    Environmental Sensing
                  </p>

                  <p className="mt-4 text-sm leading-6 text-[#706963]">
                    IoT-enabled
                    <br />
                    water-quality analysis
                  </p>
                </div>
              </div>

              <p className="mt-6 text-xs uppercase tracking-[0.25em] text-[#837A72]">
                IEEE Transactions on Instrumentation and Measurement · 2026
              </p>

              <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight">
                Temperature-Compensated, IoT-Enabled Portable Ion-Selective
                Array Device for Multi-Parameter Measurements in Water Samples
              </h3>

              <a
                href="https://doi.org/10.1109/TIM.2026.3677997"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block text-sm font-medium text-[#385E9D]"
              >
                Read publication →
              </a>
            </article>

            {/* PAPER 3 */}
            <article className="group border-t border-[#DCD4CC] pt-6">
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#F7F3EC]">
                <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-[#F2A900] transition-transform duration-500 group-hover:scale-x-100" />

                <div className="px-8 text-center">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#385E9D]">
                    Wearable Bioenergy
                  </p>

                  <p className="mt-4 text-sm leading-6 text-[#706963]">
                    Embroidered
                    <br />
                    biofuel-cell systems
                  </p>
                </div>
              </div>

              <p className="mt-6 text-xs uppercase tracking-[0.25em] text-[#837A72]">
                IEEE Journal on Flexible Electronics · 2026
              </p>

              <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight">
                Embroidery-Integrated Silver Thread Biofuel Cells for
                Implantable Glucose Energy Harvesting from a Living Rat
              </h3>

              <a
                href="https://doi.org/10.1109/JFLEX.2026.3656478"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block text-sm font-medium text-[#385E9D]"
              >
                Read publication →
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* PRINCIPAL INVESTIGATOR */}
      <section className="bg-[#F7F3EC] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
            Principal Investigator
          </p>

          <div className="mt-12 grid overflow-hidden border border-[#DDD5CC] bg-white lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[600px] bg-[#F1ECE5]">
              <Image
                src="/people/sanket-goel.webp"
                alt="Prof. Sanket Goel"
                fill
                className="object-contain object-center"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>

            <div className="flex flex-col justify-between p-8 md:p-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#385E9D]">
                  Eddie Goldenberg Research Chair of Canada
                </p>

                <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                  Prof. Sanket Goel
                </h2>

                <p className="mt-3 text-sm font-medium text-[#4F2C1D]">
                  Founder & Principal Investigator, SenSys Lab
                </p>

                <p className="mt-1 text-sm text-[#706963]">
                  University of Manitoba
                </p>

                <p className="mt-8 max-w-2xl text-base leading-8 text-[#706963]">
                  Prof. Sanket Goel leads an interdisciplinary research
                  programme spanning microsystems, microfluidics, biosensors,
                  wearable and implantable technologies, advanced materials,
                  intelligent instrumentation, environmental sensing, and
                  translational engineering.
                </p>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-[#837A72]">
                  At SenSys, this expertise is being extended toward
                  next-generation intelligent sensing systems for healthcare,
                  agriculture, food safety, environmental monitoring, and
                  emerging cyber-physical applications.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-6 text-sm">
                <Link
                  href="/people"
                  className="text-[#385E9D] transition hover:text-[#4F2C1D]"
                >
                  Profile →
                </Link>

                <a
                  href="https://scholar.google.com/citations?hl=en&user=xgH6FBkAAAAJ&view_op=list_works&sortby=pubdate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#385E9D] transition hover:text-[#4F2C1D]"
                >
                  Google Scholar →
                </a>

                <a
                  href="https://www.canada.ca/en/impact-plus-chairs.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#385E9D] transition hover:text-[#4F2C1D]"
                >
                  Eddie Goldenberg Research Chairs →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
                People
              </p>

              <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                Researchers building the future of sensing.
              </h2>
            </div>

            <Link
              href="/people"
              className="w-fit text-sm font-medium text-[#385E9D]"
            >
              Meet the team →
            </Link>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* SANKET */}
            <Link href="/people" className="group">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F7F3EC]">
                <Image
                  src="/people/sanket-goel.webp"
                  alt="Prof. Sanket Goel"
                  fill
                  className="object-contain object-center transition duration-500 group-hover:scale-[1.02]"
                />
              </div>

              <p className="mt-6 text-xs uppercase tracking-[0.25em] text-[#385E9D]">
                Eddie Goldenberg Research Chair of Canada
              </p>

              <h3 className="mt-3 text-2xl font-semibold">
                Prof. Sanket Goel
              </h3>

              <p className="mt-2 text-sm text-[#706963]">
                Founder & Principal Investigator
              </p>
            </Link>

            {/* DEEPAK */}
            <Link href="/people" className="group">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F7F3EC] p-4">
                <Image
                  src="/people/ks-deepak.jpg"
                  alt="K. S. Deepak"
                  fill
                  className="object-contain object-center transition duration-500 group-hover:scale-[1.02]"
                />
              </div>

              <p className="mt-6 text-xs uppercase tracking-[0.25em] text-[#385E9D]">
                Postdoctoral Researcher
              </p>

              <h3 className="mt-3 text-2xl font-semibold">
                K. S. Deepak
              </h3>
            </Link>

            {/* PARVATHY */}
            <Link href="/people" className="group">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F7F3EC] p-4">
                <Image
                  src="/people/parvathy-nair.jpg"
                  alt="Parvathy Nair"
                  fill
                  className="object-contain object-center transition duration-500 group-hover:scale-[1.02]"
                />
              </div>

              <p className="mt-6 text-xs uppercase tracking-[0.25em] text-[#385E9D]">
                Postdoctoral Researcher
              </p>

              <h3 className="mt-3 text-2xl font-semibold">
                Parvathy Nair
              </h3>
            </Link>
          </div>
        </div>
      </section>

      {/* JOIN */}
      <section className="bg-[#F2A900] px-8 py-24 text-[#2A1710] md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#4F2C1D]/70">
                Join SenSys
              </p>

              <h2 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-7xl">
                Build the future of sensing with us.
              </h2>
            </div>

            <div>
              <p className="max-w-xl text-lg leading-8 text-[#4F2C1D]/85">
                We are recruiting undergraduate researchers, M.Sc. and Ph.D.
                students, postdoctoral fellows, project-management personnel,
                and technical support staff across our major research thrusts.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/join"
                  className="rounded-full bg-[#4F2C1D] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#385E9D]"
                >
                  View opportunities →
                </Link>

                <a
                  href="mailto:sanketgoel@gmail.com?subject=Interest%20in%20Joining%20SenSys%20Lab"
                  className="rounded-full border border-[#4F2C1D] px-7 py-3.5 text-sm font-semibold text-[#4F2C1D] transition hover:bg-white"
                >
                  Email Prof. Sanket Goel →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}