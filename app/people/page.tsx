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
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#005EA8]">
            People
          </p>

          <h1 className="mt-6 max-w-5xl text-6xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-8xl">
            People behind SenSys.
          </h1>

          <p className="mt-10 max-w-3xl text-xl leading-9 text-[#706963]">
            An interdisciplinary team working across sensing, microsystems,
            microfluidics, materials, electronics, and intelligent
            instrumentation.
          </p>
        </div>
      </section>

      {/* PI */}
      <section className="bg-[#F7F3EC] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#005EA8]">
            Principal Investigator
          </p>

          <div className="mt-12 grid overflow-hidden border border-[#ddd5cc] bg-white lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[620px] bg-[#F1ECE5]">
              <Image
                src="/people/sanket-goel.webp"
                alt="Prof. Sanket Goel"
                fill
                className="object-contain object-center"
                priority
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
                  technologies, advanced materials, intelligent instrumentation,
                  and translational sensing platforms.
                </p>

                <div className="mt-10 grid grid-cols-2 gap-6 border-y border-[#e3dbd2] py-8 md:grid-cols-4">
                  <div>
                    <p className="text-3xl font-semibold text-[#F2A900]">310+</p>
                    <p className="mt-2 text-xs text-[#706963]">
                      Journal Publications
                    </p>
                  </div>

                  <div>
                    <p className="text-3xl font-semibold text-[#F2A900]">93</p>
                    <p className="mt-2 text-xs text-[#706963]">Patents</p>
                  </div>

                  <div>
                    <p className="text-3xl font-semibold text-[#F2A900]">44</p>
                    <p className="mt-2 text-xs text-[#706963]">
                      Research Grants
                    </p>
                  </div>

                  <div>
                    <p className="text-3xl font-semibold text-[#F2A900]">144</p>
                    <p className="mt-2 text-xs text-[#706963]">
                      Invited Talks
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-6 text-sm">
                <a
                  href="https://scholar.google.com/citations?hl=en&user=xgH6FBkAAAAJ&view_op=list_works&sortby=pubdate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#005EA8]"
                >
                  Google Scholar →
                </a>

                <a
                  href="https://www.linkedin.com/in/sanketgoel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#005EA8]"
                >
                  LinkedIn →
                </a>

                <Link href="/publications" className="text-[#005EA8]">
                  Publications →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POSTDOCS */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#005EA8]">
            Postdoctoral Researchers
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* DEEPAK */}
            <article className="border border-[#ddd5cc] bg-[#FBF8F4] p-6">
              <div className="relative aspect-[4/3] overflow-hidden bg-white p-4">
                <Image
                  src="/people/ks-deepak.jpg"
                  alt="K. S. Deepak"
                  fill
                  className="object-contain object-center transition duration-500 hover:scale-[1.02]"
                />
              </div>

              <div className="pt-7">
                <p className="text-xs uppercase tracking-[0.25em] text-[#005EA8]">
                  Postdoctoral Researcher
                </p>

                <h2 className="mt-3 text-3xl font-semibold">K. S. Deepak</h2>

                <p className="mt-2 text-sm text-[#706963]">
                  Graduate Student Member, IEEE
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "Microfluidics",
                    "Biosensors",
                    "Pesticide Detection",
                    "Wearable Sensors",
                    "Optical Sensing",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#d8d0c7] bg-white px-3 py-2 text-xs text-[#645d57]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex gap-6 text-sm">
                  <a
                    href="https://scholar.google.com/citations?hl=en&user=LzxK0qkAAAAJ&view_op=list_works&sortby=pubdate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#005EA8]"
                  >
                    Scholar →
                  </a>

                  <a
                    href="https://www.linkedin.com/in/ks-d/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#005EA8]"
                  >
                    LinkedIn →
                  </a>
                </div>
              </div>
            </article>

            {/* PARVATHY */}
            <article className="border border-[#ddd5cc] bg-[#FBF8F4] p-6">
              <div className="relative aspect-[4/3] overflow-hidden bg-white p-4">
                <Image
                  src="/people/parvathy-nair.jpg"
                  alt="Parvathy Nair"
                  fill
                  className="object-contain object-center transition duration-500 hover:scale-[1.02]"
                />
              </div>

              <div className="pt-7">
                <p className="text-xs uppercase tracking-[0.25em] text-[#005EA8]">
                  Postdoctoral Researcher
                </p>

                <h2 className="mt-3 text-3xl font-semibold">Parvathy Nair</h2>

                <p className="mt-2 text-sm text-[#706963]">
                  Graduate Student Member, IEEE
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "Electrochemical Sensing",
                    "Microfluidics",
                    "Point-of-Care Diagnostics",
                    "Biomarker Detection",
                    "Portable Instrumentation",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#d8d0c7] bg-white px-3 py-2 text-xs text-[#645d57]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex gap-6 text-sm">
                  <a
                    href="https://scholar.google.com/citations?hl=en&user=LtYm2xoAAAAJ&view_op=list_works&sortby=pubdate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#005EA8]"
                  >
                    Scholar →
                  </a>

                  <a
                    href="https://www.linkedin.com/in/parvathy-nair-0b2814257/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#005EA8]"
                  >
                    LinkedIn →
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* GROWING TEAM */}
      <section className="bg-[#F7F3EC] px-8 py-24 md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#005EA8]">
            Growing Team
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            New researchers. New disciplines. New possibilities.
          </h2>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-[#706963]">
            SenSys is building an interdisciplinary team of graduate
            researchers, postdoctoral fellows, visiting researchers, and
            collaborators at the University of Manitoba.
          </p>

          <Link
            href="/join"
            className="mt-8 inline-block rounded-full bg-[#F2A900] px-7 py-3.5 text-sm font-semibold text-[#2A1710]"
          >
            Join SenSys →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}