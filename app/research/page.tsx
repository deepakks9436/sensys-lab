import Navbar from "../../components/Navbar";
export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-[#070707] text-white">

     <Navbar />
      <section className="px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">

          <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#ffb71b]">
            Research
          </p>

          <h1 className="mt-6 max-w-6xl text-6xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-8xl">
            From sensing principles
            <br />
            to intelligent systems.
          </h1>

          <div className="mt-12 grid gap-10 md:grid-cols-[1fr_0.8fr]">
            <p className="max-w-3xl text-xl leading-9 text-neutral-300">
              SenSys develops integrated sensing technologies that combine
              microsystems, microfluidics, advanced materials, electronics,
              and artificial intelligence.
            </p>

            <p className="max-w-xl text-base leading-8 text-neutral-500">
              Our research spans fundamental device engineering through
              translational platforms for healthcare, agriculture,
              environmental monitoring, and emerging cyber-physical sensory
              systems.
            </p>
          </div>

        </div>
      </section>

      <section className="bg-[#f3f1eb] px-8 py-24 text-black md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-px overflow-hidden border border-neutral-300 bg-neutral-300 md:grid-cols-2">

            <div className="bg-[#f3f1eb] p-8 md:p-12">
              <span className="text-xs tracking-[0.3em] text-[#b57a00]">
                01
              </span>

              <h2 className="mt-16 text-4xl font-semibold tracking-tight">
                Intelligent Microsystems
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-neutral-600">
                Microfluidics, MEMS, lab-on-chip technologies, advanced
                fabrication, printed electronics, and integrated sensing
                architectures.
              </p>

              <p className="mt-8 text-sm font-medium">
                Explore area →
              </p>
            </div>

            <div className="bg-[#f3f1eb] p-8 md:p-12">
              <span className="text-xs tracking-[0.3em] text-[#b57a00]">
                02
              </span>

              <h2 className="mt-16 text-4xl font-semibold tracking-tight">
                Biointegrated Systems
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-neutral-600">
                Wearable electronics, textile sensing, flexible platforms,
                body-interfaced devices, and emerging implantable systems.
              </p>

              <p className="mt-8 text-sm font-medium">
                Explore area →
              </p>
            </div>

            <div className="bg-[#f3f1eb] p-8 md:p-12">
              <span className="text-xs tracking-[0.3em] text-[#b57a00]">
                03
              </span>

              <h2 className="mt-16 text-4xl font-semibold tracking-tight">
                Intelligent Diagnostics
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-neutral-600">
                Biosensors, point-of-care diagnostics, electrochemical and
                optical platforms, analytical microsystems, and AI-enabled
                sensing.
              </p>

              <p className="mt-8 text-sm font-medium">
                Explore area →
              </p>
            </div>

            <div className="bg-[#f3f1eb] p-8 md:p-12">
              <span className="text-xs tracking-[0.3em] text-[#b57a00]">
                04
              </span>

              <h2 className="mt-16 text-4xl font-semibold tracking-tight">
                Agri & Environmental Intelligence
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-neutral-600">
                Sensing platforms for food, soil, water, plants, environmental
                surveillance, and sustainable agricultural systems.
              </p>

              <p className="mt-8 text-sm font-medium">
                Explore area →
              </p>
            </div>

          </div>

        </div>
      </section>

      <footer className="bg-[#070707] px-8 py-12 text-white md:px-16">
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