import Navbar from "../../components/Navbar";

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <Navbar />

      <section className="px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#ffb71b]">
            Join SenSys
          </p>

          <h1 className="mt-6 max-w-6xl text-6xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-8xl">
            Build the future
            <br />
            of sensing with us.
          </h1>

          <p className="mt-10 max-w-3xl text-xl leading-9 text-neutral-300">
            SenSys welcomes researchers interested in microsystems,
            microfluidics, biosensors, wearable technologies, advanced
            materials, intelligent instrumentation, and AI-enabled sensing.
          </p>
        </div>
      </section>

      <section className="bg-[#ffb71b] px-8 py-24 text-black md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-black/60">
            Opportunities
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-6xl">
            Find your place at SenSys.
          </h2>

          <div className="mt-16 grid gap-px overflow-hidden border border-black/20 bg-black/20 md:grid-cols-2">
            {[
              {
                title: "PhD Researchers",
                text: "Doctoral research opportunities across sensing, microfluidics, wearable systems, materials, and intelligent diagnostics.",
              },
              {
                title: "Postdoctoral Researchers",
                text: "Advanced research opportunities in interdisciplinary sensing systems and translational technologies.",
              },
              {
                title: "Master's Researchers",
                text: "Research-intensive graduate projects spanning devices, materials, instrumentation, and applications.",
              },
              {
                title: "Visiting & Collaborative Researchers",
                text: "Opportunities for short-term research visits, joint projects, and institutional collaborations.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-[#ffb71b] p-8 md:p-12">
                <h3 className="text-3xl font-semibold tracking-tight">
                  {item.title}
                </h3>

                <p className="mt-5 max-w-xl text-base leading-7 text-black/70">
                  {item.text}
                </p>

                <p className="mt-8 text-sm font-medium">
                  Learn more →
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0b0b0b] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#ffb71b]">
            What We Look For
          </p>

          <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-6xl">
            Curiosity across disciplinary boundaries.
          </h2>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-neutral-400">
            We value researchers who are comfortable working across engineering,
            materials, sensing, electronics, computation, and real-world
            applications.
          </p>
        </div>
      </section>

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