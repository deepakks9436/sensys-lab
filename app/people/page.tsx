import Navbar from "../../components/Navbar";
import Image from "next/image";

export default function PeoplePage() {
  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <Navbar />

      {/* HERO */}
      <section className="px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#ffb71b]">
            People
          </p>

          <h1 className="mt-6 max-w-6xl text-6xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-8xl">
            People behind
            <br />
            SenSys.
          </h1>

          <p className="mt-10 max-w-3xl text-xl leading-9 text-neutral-300">
            An interdisciplinary team working across microsystems,
            microfluidics, intelligent sensing, wearable technologies,
            advanced materials, electronics, diagnostics, and translational
            engineering.
          </p>
        </div>
      </section>

      {/* PRINCIPAL INVESTIGATOR */}
      <section className="bg-[#f3f1eb] px-8 py-24 text-black md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-neutral-500">
            Principal Investigator
          </p>

          <div className="mt-10 grid overflow-hidden border border-neutral-300 lg:grid-cols-[0.85fr_1.15fr]">
            
            {/* PI IMAGE */}
            <div className="relative min-h-[620px] bg-neutral-200">
              <Image
                src="/people/sanket-goel.webp"
                alt="Prof. Sanket Goel"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>

            {/* PI INFORMATION */}
            <div className="flex flex-col justify-center bg-white p-8 md:p-12 lg:p-16">
              <p className="text-xs uppercase tracking-[0.3em] text-[#b57a00]">
                Founder & Principal Investigator
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
                Prof. Sanket Goel
              </h2>

              <p className="mt-3 text-lg text-neutral-500">
                Senior Member, IEEE
              </p>

              <p className="mt-8 max-w-3xl text-base leading-8 text-neutral-600">
                Prof. Sanket Goel is an interdisciplinary researcher working at
                the convergence of microsystems, microfluidics, biosensors,
                flexible and wearable electronics, advanced materials,
                intelligent instrumentation, and energy technologies. His
                research focuses on translating micro- and nanoscale
                engineering into portable, connected, and application-driven
                sensing systems.
              </p>

              <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-600">
                He received his PhD in Electrical and Computer Engineering from
                the University of Alberta, Canada, following degrees in Physics
                from IIT Delhi and the University of Delhi. His research career
                has included appointments at Stanford University, A*STAR
                Singapore, UPES, and BITS Pilani, where he has led major
                academic, research, semiconductor, and innovation initiatives.
              </p>

              <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-600">
                His research portfolio spans more than 300 journal
                publications, an extensive patent portfolio, major sponsored
                research programmes, technology-transfer activities, and the
                supervision of researchers working across biosensing,
                microfluidics, flexible electronics, energy technologies, and
                cyber-physical systems.
              </p>

              {/* PI METRICS */}
              <div className="mt-10 grid grid-cols-2 gap-6 border-y border-neutral-200 py-8 md:grid-cols-4">
                <div>
                  <p className="text-3xl font-semibold">310</p>
                  <p className="mt-2 text-xs leading-5 text-neutral-500">
                    Journal
                    <br />
                    Publications
                  </p>
                </div>

                <div>
                  <p className="text-3xl font-semibold">93</p>
                  <p className="mt-2 text-xs leading-5 text-neutral-500">
                    Patents
                  </p>
                </div>

                <div>
                  <p className="text-3xl font-semibold">44</p>
                  <p className="mt-2 text-xs leading-5 text-neutral-500">
                    Research
                    <br />
                    Grants
                  </p>
                </div>

                <div>
                  <p className="text-3xl font-semibold">144</p>
                  <p className="mt-2 text-xs leading-5 text-neutral-500">
                    Invited
                    <br />
                    Talks
                  </p>
                </div>
              </div>

              {/* PI LINKS */}
              <div className="mt-8 flex flex-wrap gap-6 text-sm font-medium">
                <a
                  href="https://scholar.google.com/citations?hl=en&user=xgH6FBkAAAAJ&view_op=list_works&sortby=pubdate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-black pb-1 transition hover:text-[#b57a00]"
                >
                  Google Scholar →
                </a>

                <a
                  href="https://www.linkedin.com/in/sanketgoel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-black pb-1 transition hover:text-[#b57a00]"
                >
                  LinkedIn →
                </a>

                <a
                  href="https://www.bits-pilani.ac.in/hyderabad/publications/?faculty=sanket-goel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-black pb-1 transition hover:text-[#b57a00]"
                >
                  Publications →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POSTDOCTORAL RESEARCHERS */}
      <section className="bg-[#0b0b0b] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#ffb71b]">
            Postdoctoral Researchers
          </p>

          <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-6xl">
            Translating research into intelligent systems.
          </h2>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            
            {/* K S DEEPAK */}
            <article className="group overflow-hidden border border-neutral-800 bg-[#0f0f0f]">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#151515]">
                <Image
                  src="/people/ks-deepak.jpg"
                  alt="K. S. Deepak"
                  fill
                  className="object-cover object-center transition duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div className="p-8 md:p-10">
                <p className="text-xs uppercase tracking-[0.3em] text-[#ffb71b]">
                  Postdoctoral Researcher
                </p>

                <h3 className="mt-4 text-3xl font-semibold tracking-tight">
                  K. S. Deepak
                </h3>

                <p className="mt-3 text-sm text-neutral-500">
                  Graduate Student Member, IEEE
                </p>

                {/* RESEARCH INTERESTS */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {[
                    "Microfluidics",
                    "Biosensors",
                    "Pesticide Detection",
                    "Wearable Sensors",
                    "Optical Sensing",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-neutral-700 px-3 py-1.5 text-xs text-neutral-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* LINKS */}
                <div className="mt-8 flex flex-wrap gap-6 text-sm font-medium">
                  <a
                    href="https://scholar.google.com/citations?hl=en&user=LzxK0qkAAAAJ&view_op=list_works&sortby=pubdate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-neutral-600 pb-1 text-neutral-300 transition hover:border-white hover:text-white"
                  >
                    Google Scholar →
                  </a>

                  <a
                    href="https://www.linkedin.com/in/ks-d/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-neutral-600 pb-1 text-neutral-300 transition hover:border-white hover:text-white"
                  >
                    LinkedIn →
                  </a>
                </div>
              </div>
            </article>

            {/* PARVATHY NAIR */}
            <article className="group overflow-hidden border border-neutral-800 bg-[#0f0f0f]">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#151515]">
                <Image
                  src="/people/parvathy-nair.jpg"
                  alt="Parvathy Nair"
                  fill
                  className="object-cover object-center transition duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div className="p-8 md:p-10">
                <p className="text-xs uppercase tracking-[0.3em] text-[#ffb71b]">
                  Postdoctoral Researcher
                </p>

                <h3 className="mt-4 text-3xl font-semibold tracking-tight">
                  Parvathy Nair
                </h3>

                <p className="mt-3 text-sm text-neutral-500">
                  Graduate Student Member, IEEE
                </p>

                {/* RESEARCH INTERESTS */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {[
                    "Electrochemical Sensing",
                    "Microfluidics",
                    "Point-of-Care Diagnostics",
                    "Biomarker Detection",
                    "Portable Instrumentation",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-neutral-700 px-3 py-1.5 text-xs text-neutral-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* LINKS */}
                <div className="mt-8 flex flex-wrap gap-6 text-sm font-medium">
                  <a
                    href="https://scholar.google.com/citations?hl=en&user=LtYm2xoAAAAJ&view_op=list_works&sortby=pubdate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-neutral-600 pb-1 text-neutral-300 transition hover:border-white hover:text-white"
                  >
                    Google Scholar →
                  </a>

                  <a
                    href="https://www.linkedin.com/in/parvathy-nair-0b2814257/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-neutral-600 pb-1 text-neutral-300 transition hover:border-white hover:text-white"
                  >
                    LinkedIn →
                  </a>
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* FUTURE TEAM */}
      <section className="bg-[#f3f1eb] px-8 py-20 text-black md:px-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-[0.7fr_1.3fr]">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-neutral-500">
              Growing Team
            </p>

            <div>
              <h2 className="max-w-4xl text-3xl font-semibold tracking-tight md:text-5xl">
                New researchers. New disciplines. New possibilities.
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-600">
                SenSys is building an interdisciplinary team of graduate
                researchers, postdoctoral fellows, visiting researchers, and
                collaborators at the University of Manitoba.
              </p>

              <a
                href="/join"
                className="mt-8 inline-block border-b border-black pb-1 text-sm font-medium"
              >
                Explore opportunities →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#070707] px-8 py-12 md:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-neutral-800 pt-8 text-xs text-neutral-600 md:flex-row md:items-center md:justify-between">
          <p>© 2026 SenSys Lab. University of Manitoba.</p>

          <a href="/" className="transition hover:text-white">
            Back to home →
          </a>
        </div>
      </footer>
    </main>
  );
}