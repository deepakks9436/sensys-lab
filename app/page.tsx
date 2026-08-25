import Link from "next/link";
import Image from "next/image";

import Navbar from "../components/Navbar";
import DynamicHero from "../components/DynamicHero";
import ResearchExplorer from "../components/ResearchExplorer";
import FeaturedResearch from "../components/FeaturedResearch";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#090909] text-white">
      {/* NAVIGATION */}
      <Navbar />

      {/* DYNAMIC HERO */}
      <DynamicHero />

      {/* INTERACTIVE RESEARCH EXPLORER */}
      <ResearchExplorer />

      <FeaturedResearch />

      {/* IMPACT */}
      <section className="bg-[#090909] px-8 py-24 text-white md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#F2A900]">
                Impact
              </p>
            </div>

            <div>
              <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                Research designed to move beyond the laboratory.
              </h2>

              <p className="mt-8 max-w-3xl text-lg leading-8 text-neutral-400">
                SenSys focuses on translating fundamental advances in sensing,
                microsystems, intelligent instrumentation, and materials into
                technologies that can be deployed, validated, and scaled for
                real-world use.
              </p>
            </div>
          </div>

          {/* METRICS */}
          <div className="mt-20 grid border-y border-neutral-800 md:grid-cols-2 lg:grid-cols-4">
            <div className="border-b border-neutral-800 py-10 md:border-r lg:border-b-0">
              <p className="text-5xl font-semibold tracking-tight text-[#F2A900] md:text-6xl">
                310+
              </p>

              <p className="mt-3 text-sm text-neutral-500">
                Journal Publications
              </p>
            </div>

            <div className="border-b border-neutral-800 py-10 md:pl-8 lg:border-b-0 lg:border-r">
              <p className="text-5xl font-semibold tracking-tight text-[#F2A900] md:text-6xl">
                93
              </p>

              <p className="mt-3 text-sm text-neutral-500">
                Patents
              </p>
            </div>

            <div className="border-b border-neutral-800 py-10 md:border-r md:pl-0 lg:border-b-0 lg:pl-8">
              <p className="text-5xl font-semibold tracking-tight text-[#F2A900] md:text-6xl">
                44
              </p>

              <p className="mt-3 text-sm text-neutral-500">
                Sponsored Research Grants
              </p>
            </div>

            <div className="py-10 md:pl-8">
              <p className="text-5xl font-semibold tracking-tight text-[#F2A900] md:text-6xl">
                05
              </p>

              <p className="mt-3 text-sm text-neutral-500">
                Technologies Transferred / Licensed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SELECTED PUBLICATIONS */}
      <section className="bg-[#f5f2ea] px-8 py-24 text-black md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-neutral-500">
                Selected Publications
              </p>

              <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                Research shaping the future of sensing.
              </h2>
            </div>

            <Link
              href="/publications"
              className="w-fit border-b border-black pb-1 text-sm font-medium transition hover:text-[#385E9D]"
            >
              View all publications →
            </Link>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {/* PAPER 1 */}
            <article className="group border-t border-neutral-300 pt-6">
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#090909]">
                <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-[#F2A900] transition-transform duration-500 group-hover:scale-x-100" />

                <div className="px-8 text-center">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#F2A900]">
                    Food Safety
                  </p>

                  <p className="mt-4 text-sm leading-6 text-neutral-400">
                    Portable optical sensing
                    <br />
                    + chemometrics
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
                  Microchemical Journal · 2026
                </p>

                <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight">
                  An Automated Portable Dual-Mode Optical Device for On-Site
                  Detection and Chemometrics-Enhanced Discrimination of
                  Pesticides
                </h3>

                <p className="mt-4 text-sm leading-6 text-neutral-600">
                  A field-deployable optical platform integrating pesticide
                  detection with chemometric discrimination.
                </p>

                <a
                  href="https://doi.org/10.1016/j.microc.2026.118355"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block border-b border-transparent pb-1 text-sm font-medium transition hover:border-black"
                >
                  Read publication →
                </a>
              </div>
            </article>

            {/* PAPER 2 */}
            <article className="group border-t border-neutral-300 pt-6">
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#090909]">
                <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-[#00A3E0] transition-transform duration-500 group-hover:scale-x-100" />

                <div className="px-8 text-center">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#00A3E0]">
                    Environmental Sensing
                  </p>

                  <p className="mt-4 text-sm leading-6 text-neutral-400">
                    IoT-enabled
                    <br />
                    water-quality analysis
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
                  IEEE Transactions on Instrumentation and Measurement · 2026
                </p>

                <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight">
                  Temperature-Compensated, IoT-Enabled Portable Ion-Selective
                  Array Device for Multi-Parameter Measurements in Water
                  Samples
                </h3>

                <p className="mt-4 text-sm leading-6 text-neutral-600">
                  A portable ion-selective sensing array for
                  temperature-compensated, multiparameter water-quality
                  monitoring.
                </p>

                <a
                  href="https://doi.org/10.1109/TIM.2026.3677997"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block border-b border-transparent pb-1 text-sm font-medium transition hover:border-black"
                >
                  Read publication →
                </a>
              </div>
            </article>

            {/* PAPER 3 */}
            <article className="group border-t border-neutral-300 pt-6">
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#090909]">
                <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-[#385E9D] transition-transform duration-500 group-hover:scale-x-100" />

                <div className="px-8 text-center">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#00A3E0]">
                    Wearable Bioenergy
                  </p>

                  <p className="mt-4 text-sm leading-6 text-neutral-400">
                    Embroidered
                    <br />
                    biofuel-cell systems
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
                  IEEE Journal on Flexible Electronics · 2026
                </p>

                <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight">
                  Embroidery-Integrated Silver Thread Biofuel Cells for
                  Implantable Glucose Energy Harvesting from a Living Rat
                </h3>

                <p className="mt-4 text-sm leading-6 text-neutral-600">
                  Embroidery-integrated biofuel cells using conductive silver
                  threads for glucose-based bioenergy harvesting.
                </p>

                <a
                  href="https://doi.org/10.1109/JFLEX.2026.3656478"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block border-b border-transparent pb-1 text-sm font-medium transition hover:border-black"
                >
                  Read publication →
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* PRINCIPAL INVESTIGATOR */}
      <section className="bg-[#0b0b0b] px-8 py-24 text-white md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#F2A900]">
                Principal Investigator
              </p>
            </div>

            <div>
              <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                Building sensing systems across disciplines.
              </h2>
            </div>
          </div>

          <div className="mt-16 grid overflow-hidden border border-neutral-800 lg:grid-cols-[0.9fr_1.1fr]">
            {/* PI IMAGE */}
            <div className="relative min-h-[560px] bg-[#151515]">
              <Image
                src="/people/sanket-goel.webp"
                alt="Prof. Sanket Goel"
                fill
                className="object-contain object-center"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>

            {/* PI CONTENT */}
            <div className="flex flex-col justify-between p-8 md:p-12">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#F2A900]">
                  Founder & Principal Investigator
                </p>

                <h3 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
                  Prof. Sanket Goel
                </h3>

                <p className="mt-3 text-lg text-neutral-400">
                  Senior Member, IEEE
                </p>

                <p className="mt-8 max-w-2xl text-base leading-8 text-neutral-300">
                  Prof. Sanket Goel leads an interdisciplinary research program
                  spanning microsystems, microfluidics, biosensors, wearable
                  technologies, advanced materials, intelligent instrumentation,
                  and translational sensing platforms.
                </p>

                <p className="mt-5 max-w-2xl text-base leading-8 text-neutral-400">
                  His work integrates sensing, fabrication, electronics, and
                  data intelligence to develop deployable technologies across
                  health, agriculture, environmental monitoring, energy, and
                  emerging cyber-physical sensory systems.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-6 text-sm">
                <Link
                  href="/people"
                  className="border-b border-neutral-600 pb-1 transition hover:border-white hover:text-white"
                >
                  Profile →
                </Link>

                <a
                  href="https://scholar.google.com/citations?hl=en&user=xgH6FBkAAAAJ&view_op=list_works&sortby=pubdate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-neutral-600 pb-1 transition hover:border-white hover:text-white"
                >
                  Google Scholar →
                </a>

                <Link
                  href="/publications"
                  className="border-b border-neutral-600 pb-1 transition hover:border-white hover:text-white"
                >
                  Publications →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PEOPLE */}
      <section className="bg-[#f5f2ea] px-8 py-24 text-black md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-neutral-500">
                People
              </p>

              <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                Researchers building the future of sensing.
              </h2>
            </div>

            <Link
              href="/people"
              className="w-fit border-b border-black pb-1 text-sm font-medium transition hover:text-[#385E9D]"
            >
              Meet the team →
            </Link>
          </div>

          {/* TEAM PREVIEW */}
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* PI */}
            <Link href="/people" className="group">
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                <Image
                  src="/people/sanket-goel.webp"
                  alt="Prof. Sanket Goel"
                  fill
                  className="object-contain object-center transition duration-500 group-hover:scale-[1.02]"
                />
              </div>

              <p className="mt-6 text-xs uppercase tracking-[0.25em] text-[#4F2C1D]">
                Principal Investigator
              </p>

              <h3 className="mt-3 text-2xl font-semibold">
                Prof. Sanket Goel
              </h3>
            </Link>

            {/* DEEPAK */}
            <Link href="/people" className="group">
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200 p-4">
                <Image
                  src="/people/ks-deepak.jpg"
                  alt="K. S. Deepak"
                  fill
                  className="object-contain object-center transition duration-500 group-hover:scale-[1.02]"
                />
              </div>

              <p className="mt-6 text-xs uppercase tracking-[0.25em] text-[#4F2C1D]">
                Postdoctoral Researcher
              </p>

              <h3 className="mt-3 text-2xl font-semibold">
                K. S. Deepak
              </h3>
            </Link>

            {/* PARVATHY */}
            <Link href="/people" className="group">
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200 p-4">
                <Image
                  src="/people/parvathy-nair.jpg"
                  alt="Parvathy Nair"
                  fill
                  className="object-contain object-center transition duration-500 group-hover:scale-[1.02]"
                />
              </div>

              <p className="mt-6 text-xs uppercase tracking-[0.25em] text-[#4F2C1D]">
                Postdoctoral Researcher
              </p>

              <h3 className="mt-3 text-2xl font-semibold">
                Parvathy Nair
              </h3>
            </Link>
          </div>
        </div>
      </section>

      {/* JOIN SENSYS */}
      <section className="relative overflow-hidden bg-[#F2A900] px-8 py-24 text-black md:px-16 md:py-28">
        {/* SUBTLE BLUE ACCENT */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#385E9D]/15 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-black/60">
                Join SenSys
              </p>

              <h2 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-7xl">
                Build the future of sensing with us.
              </h2>
            </div>

            <div>
              <p className="max-w-xl text-lg leading-8 text-black/70">
                We welcome researchers interested in microsystems,
                microfluidics, biosensors, wearable technologies, advanced
                materials, intelligent instrumentation, and AI-enabled sensing.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/join"
                  className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-[#385E9D]"
                >
                  View opportunities →
                </Link>

                <Link
                  href="/people"
                  className="rounded-full border border-black/40 px-6 py-3 text-sm font-medium transition hover:border-black hover:bg-black hover:text-white"
                >
                  Meet the team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#090909] px-8 py-16 text-white md:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 border-b border-neutral-800 pb-12 md:grid-cols-2 lg:grid-cols-4">
            {/* BRAND */}
            <div>
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-[#F2A900]" />

                <Link
                  href="/"
                  className="text-xl font-semibold tracking-tight"
                >
                  SenSys
                </Link>
              </div>

              <p className="mt-5 max-w-xs text-sm leading-6 text-neutral-500">
                Intelligent sensing systems for healthcare, agriculture,
                environment, food safety, and emerging cyber-physical
                applications.
              </p>
            </div>

            {/* EXPLORE */}
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                Explore
              </p>

              <div className="mt-5 flex flex-col gap-3 text-sm text-neutral-300">
                <Link href="/research" className="transition hover:text-white">
                  Research
                </Link>

                <Link href="/people" className="transition hover:text-white">
                  People
                </Link>

                <Link
                  href="/publications"
                  className="transition hover:text-white"
                >
                  Publications
                </Link>

                <Link
                  href="/facilities"
                  className="transition hover:text-white"
                >
                  Facilities
                </Link>
              </div>
            </div>

            {/* CONNECT */}
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                Connect
              </p>

              <div className="mt-5 flex flex-col gap-3 text-sm text-neutral-300">
                <Link href="/news" className="transition hover:text-white">
                  News
                </Link>

                <Link href="/join" className="transition hover:text-white">
                  Join SenSys
                </Link>

                <a
                  href="https://umanitoba.ca/facilities/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white"
                >
                  UM Facilities
                </a>
              </div>
            </div>

            {/* LOCATION */}
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                Location
              </p>

              <p className="mt-5 text-sm leading-6 text-neutral-300">
                University of Manitoba
                <br />
                Winnipeg, Manitoba
                <br />
                Canada
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-8 text-xs text-neutral-600 md:flex-row md:items-center md:justify-between">
            <p>© 2026 SenSys Lab. University of Manitoba.</p>

            <p>Intelligent Sensing Systems</p>
          </div>
        </div>
      </footer>
    </main>
  );
}