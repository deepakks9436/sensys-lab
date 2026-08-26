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

      <DynamicHero />

      <ResearchExplorer />

      <FeaturedResearch />

      {/* IMPACT */}
      <section className="bg-[#F7F3EC] px-8 py-24 text-[#4F2C1D] md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#005EA8]">
                Research Impact
              </p>
            </div>

            <div>
              <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                Research designed to move beyond the laboratory.
              </h2>

              <p className="mt-8 max-w-3xl text-lg leading-8 text-[#706963]">
                Our research foundation spans microsystems, intelligent
                instrumentation, materials, biosensing, and translational
                technologies designed to address real-world problems.
              </p>
            </div>
          </div>

          <div className="mt-20 grid border-y border-[#ddd5cc] md:grid-cols-2 lg:grid-cols-4">
            <div className="border-b border-[#ddd5cc] py-10 md:border-r lg:border-b-0">
              <p className="text-5xl font-semibold tracking-tight text-[#F2A900] md:text-6xl">
                310+
              </p>

              <p className="mt-3 text-sm text-[#706963]">
                Journal Publications
              </p>
            </div>

            <div className="border-b border-[#ddd5cc] py-10 md:pl-8 lg:border-b-0 lg:border-r">
              <p className="text-5xl font-semibold tracking-tight text-[#F2A900] md:text-6xl">
                93
              </p>

              <p className="mt-3 text-sm text-[#706963]">Patents</p>
            </div>

            <div className="border-b border-[#ddd5cc] py-10 md:border-r lg:border-b-0 lg:pl-8">
              <p className="text-5xl font-semibold tracking-tight text-[#F2A900] md:text-6xl">
                44
              </p>

              <p className="mt-3 text-sm text-[#706963]">
                Sponsored Research Grants
              </p>
            </div>

            <div className="py-10 md:pl-8">
              <p className="text-5xl font-semibold tracking-tight text-[#F2A900] md:text-6xl">
                05
              </p>

              <p className="mt-3 text-sm text-[#706963]">
                Technologies Transferred / Licensed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SELECTED PUBLICATIONS */}
      <section className="bg-white px-8 py-24 text-[#4F2C1D] md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#005EA8]">
                Selected Publications
              </p>

              <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                Research shaping the future of sensing.
              </h2>
            </div>

            <Link
              href="/publications"
              className="w-fit border-b border-[#4F2C1D] pb-1 text-sm font-medium transition hover:border-[#005EA8] hover:text-[#005EA8]"
            >
              View all publications →
            </Link>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {/* PAPER 1 */}
            <article className="group border-t border-[#dcd4cc] pt-6">
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#F7F3EC]">
                <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-[#F2A900] transition-transform duration-500 group-hover:scale-x-100" />

                <div className="px-8 text-center">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#005EA8]">
                    Food Safety
                  </p>

                  <p className="mt-4 text-sm leading-6 text-[#706963]">
                    Portable optical sensing
                    <br />+ chemometrics
                  </p>
                </div>
              </div>

              <p className="mt-6 text-xs uppercase tracking-[0.25em] text-[#837a72]">
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
                className="mt-5 inline-block text-sm font-medium text-[#005EA8]"
              >
                Read publication →
              </a>
            </article>

            {/* PAPER 2 */}
            <article className="group border-t border-[#dcd4cc] pt-6">
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#F7F3EC]">
                <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-[#005EA8] transition-transform duration-500 group-hover:scale-x-100" />

                <div className="px-8 text-center">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#005EA8]">
                    Environmental Sensing
                  </p>

                  <p className="mt-4 text-sm leading-6 text-[#706963]">
                    IoT-enabled
                    <br />
                    water-quality analysis
                  </p>
                </div>
              </div>

              <p className="mt-6 text-xs uppercase tracking-[0.25em] text-[#837a72]">
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
                className="mt-5 inline-block text-sm font-medium text-[#005EA8]"
              >
                Read publication →
              </a>
            </article>

            {/* PAPER 3 */}
            <article className="group border-t border-[#dcd4cc] pt-6">
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#F7F3EC]">
                <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-[#F2A900] transition-transform duration-500 group-hover:scale-x-100" />

                <div className="px-8 text-center">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#005EA8]">
                    Wearable Bioenergy
                  </p>

                  <p className="mt-4 text-sm leading-6 text-[#706963]">
                    Embroidered
                    <br />
                    biofuel-cell systems
                  </p>
                </div>
              </div>

              <p className="mt-6 text-xs uppercase tracking-[0.25em] text-[#837a72]">
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
                className="mt-5 inline-block text-sm font-medium text-[#005EA8]"
              >
                Read publication →
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* PRINCIPAL INVESTIGATOR */}
      <section className="bg-[#F7F3EC] px-8 py-24 text-[#4F2C1D] md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#005EA8]">
            Principal Investigator
          </p>

          <div className="mt-12 grid overflow-hidden border border-[#ddd5cc] bg-white lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[560px] bg-[#F1ECE5]">
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
                <p className="text-xs uppercase tracking-[0.3em] text-[#005EA8]">
                  Founder & Principal Investigator
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
                  Prof. Sanket Goel
                </h2>

                <p className="mt-8 max-w-2xl text-base leading-8 text-[#706963]">
                  Prof. Sanket Goel leads an interdisciplinary research program
                  spanning microsystems, microfluidics, biosensors, wearable
                  technologies, advanced materials, intelligent
                  instrumentation, and translational sensing platforms.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-6 text-sm">
                <Link
                  href="/people"
                  className="text-[#005EA8] transition hover:text-[#003E6B]"
                >
                  Profile →
                </Link>

                <a
                  href="https://scholar.google.com/citations?hl=en&user=xgH6FBkAAAAJ&view_op=list_works&sortby=pubdate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#005EA8] transition hover:text-[#003E6B]"
                >
                  Google Scholar →
                </a>

                <Link
                  href="/publications"
                  className="text-[#005EA8] transition hover:text-[#003E6B]"
                >
                  Publications →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PEOPLE */}
      <section className="bg-white px-8 py-24 text-[#4F2C1D] md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#005EA8]">
                People
              </p>

              <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                Researchers building the future of sensing.
              </h2>
            </div>

            <Link
              href="/people"
              className="w-fit text-sm font-medium text-[#005EA8]"
            >
              Meet the team →
            </Link>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/people" className="group">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F7F3EC]">
                <Image
                  src="/people/sanket-goel.webp"
                  alt="Prof. Sanket Goel"
                  fill
                  className="object-contain object-center transition duration-500 group-hover:scale-[1.02]"
                />
              </div>

              <p className="mt-6 text-xs uppercase tracking-[0.25em] text-[#005EA8]">
                Principal Investigator
              </p>

              <h3 className="mt-3 text-2xl font-semibold">
                Prof. Sanket Goel
              </h3>
            </Link>

            <Link href="/people" className="group">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F7F3EC] p-4">
                <Image
                  src="/people/ks-deepak.jpg"
                  alt="K. S. Deepak"
                  fill
                  className="object-contain object-center transition duration-500 group-hover:scale-[1.02]"
                />
              </div>

              <p className="mt-6 text-xs uppercase tracking-[0.25em] text-[#005EA8]">
                Postdoctoral Researcher
              </p>

              <h3 className="mt-3 text-2xl font-semibold">K. S. Deepak</h3>
            </Link>

            <Link href="/people" className="group">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F7F3EC] p-4">
                <Image
                  src="/people/parvathy-nair.jpg"
                  alt="Parvathy Nair"
                  fill
                  className="object-contain object-center transition duration-500 group-hover:scale-[1.02]"
                />
              </div>

              <p className="mt-6 text-xs uppercase tracking-[0.25em] text-[#005EA8]">
                Postdoctoral Researcher
              </p>

              <h3 className="mt-3 text-2xl font-semibold">Parvathy Nair</h3>
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
              <p className="max-w-xl text-lg leading-8 text-[#4F2C1D]/80">
                We welcome researchers interested in microsystems,
                microfluidics, biosensors, wearable technologies, advanced
                materials, intelligent instrumentation, and AI-enabled sensing.
              </p>

              <Link
                href="/join"
                className="mt-8 inline-block rounded-full bg-[#4F2C1D] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#005EA8]"
              >
                View opportunities →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}