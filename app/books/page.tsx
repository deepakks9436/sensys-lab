import Link from "next/link";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const books = [
  {
    number: "01",
    title:
      "Microelectronics and Signal Processing: Advanced Concepts and Applications",
    role: "Edited Volume",
    publisher: "Taylor & Francis / CRC Press",
    year: "2021",
    image: "/books/9781003168225.webp",
    description:
      "A reference volume covering advanced topics in microelectronics, signal processing, embedded systems, circuits, devices, and emerging engineering applications.",
    link:
      "https://www.taylorfrancis.com/books/edit/10.1201/9781003168225/microelectronics-signal-processing-sanket-goel",
    identifier: "DOI: 10.1201/9781003168225",
  },
  {
    number: "02",
    title:
      "Miniaturized Electrochemical Devices: Advanced Concepts, Fabrication, and Applications",
    role: "Edited Volume",
    publisher: "Taylor & Francis / CRC Press",
    year: "2023",
    image: "/books/9781003415497.webp",
    description:
      "A focused volume on miniaturized electrochemical platforms, fabrication strategies, sensing architectures, portable devices, and analytical applications.",
    link:
      "https://www.taylorfrancis.com/books/edit/10.1201/b23359/miniaturized-electrochemical-devices-sanket-goel-khairunnisa-amreen",
    identifier: "DOI: 10.1201/b23359",
  },
  {
    number: "03",
    title:
      "3D Printed Smart Sensors and Energy Harvesting Devices: Concepts, Fabrication and Applications",
    role: "Edited Volume",
    publisher: "IOP Publishing",
    year: "2023",
    image: "/books/9780750353519.jpg",
    description:
      "A book exploring 3D-printed smart sensors, energy-harvesting devices, additive fabrication strategies, functional materials, and integrated device applications.",
    link:
      "https://store.ioppublishing.org/page/detail/3D-Printed-Smart-Sensors-and-Energy-Harvesting-Devices//?k=9780750353519",
    identifier: "DOI: 10.1088/978-0-7503-5351-9",
  },
  {
    number: "04",
    title:
      "Droplet and Digital Microfluidics: Ideation to Implementation",
    role: "Edited Volume",
    publisher: "Elsevier",
    year: "2024",
    image: "/books/9780443154164.jpg",
    description:
      "A comprehensive volume covering droplet and digital microfluidics from fundamental concepts and device engineering to implementation and application development.",
    link:
      "https://shop.elsevier.com/books/droplet-and-digital-microfluidics/goel/978-0-443-15416-4",
    identifier: "ISBN: 978-0-443-15416-4",
  },
  {
    number: "05",
    title:
      "Micro Electromechanical Systems (MEMS): Practical Lab Manual",
    role: "Book",
    publisher: "Wiley",
    year: "2025",
    image: "/books/1394229836.webp",
    description:
      "A practical laboratory-oriented guide to MEMS fabrication, characterization, experimentation, and implementation for students and researchers.",
    link:
      "https://www.wiley.com/en-jp/shop/general-introductory-electrical-electronics-engineering/micro-electromechanical-systems-(mems)-practical-lab-manual-p-9781394229840",
    identifier: "ISBN: 9781394229840",
  },
];

export default function BooksPage() {
  return (
    <main className="min-h-screen bg-white text-[#4F2C1D]">
      <Navbar />

      {/* HERO */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
            Outputs · Books
          </p>

          <h1 className="mt-6 max-w-6xl text-6xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-8xl">
            Books &
            <br />
            Edited Volumes.
          </h1>

          <p className="mt-10 max-w-3xl text-xl leading-9 text-[#706963]">
            Selected books and edited volumes reflecting Prof. Sanket
            Goel&apos;s broader scholarly contributions across
            microelectronics, microfluidics, electrochemical devices, additive
            manufacturing, sensing, energy, and MEMS.
          </p>
        </div>
      </section>

      {/* SUMMARY */}
      <section className="bg-[#F7F3EC] px-8 py-16 md:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-px overflow-hidden border border-[#DDD5CC] bg-[#DDD5CC] md:grid-cols-5">
            {[
              ["05", "Books & Edited Volumes"],
              ["CRC", "Taylor & Francis"],
              ["IOP", "Publishing"],
              ["Elsevier", "Publisher"],
              ["Wiley", "Publisher"],
            ].map(([value, label]) => (
              <div key={label} className="bg-white p-7 text-center">
                <p className="text-3xl font-semibold text-[#F2A900]">
                  {value}
                </p>

                <p className="mt-2 text-xs text-[#706963]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKS */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
                Selected Titles
              </p>
            </div>

            <div>
              <h2 className="max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                Scholarly work across sensing, microsystems, and emerging
                technologies.
              </h2>
            </div>
          </div>

          <div className="mt-16 space-y-8">
            {books.map((book, index) => (
              <article
                key={book.title}
                className="grid overflow-hidden border border-[#DDD5CC] bg-[#FBF8F4] lg:grid-cols-[0.72fr_1.28fr]"
              >
                {/* BOOK COVER */}
                <div
                  className={`relative flex min-h-[520px] items-center justify-center bg-white p-10 ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <div className="flex h-[420px] w-full items-center justify-center">
                    <img
                      src={book.image}
                      alt={`Book cover: ${book.title}`}
                      className="max-h-full max-w-[82%] object-contain shadow-lg transition duration-500 hover:scale-[1.02]"
                    />
                  </div>
                </div>

                {/* BOOK INFORMATION */}
                <div
                  className={`flex flex-col justify-center p-8 md:p-10 lg:p-12 ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-semibold tracking-[0.25em] text-[#F2A900]">
                      {book.number}
                    </span>

                    <span className="text-xs uppercase tracking-[0.2em] text-[#385E9D]">
                      {book.role}
                    </span>
                  </div>

                  <h3 className="mt-6 max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                    {book.title}
                  </h3>

                  <p className="mt-5 text-sm font-semibold">
                    {book.publisher} · {book.year}
                  </p>

                  <p className="mt-6 max-w-2xl text-base leading-8 text-[#706963]">
                    {book.description}
                  </p>

                  <p className="mt-6 text-xs text-[#837A72]">
                    {book.identifier}
                  </p>

                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 w-fit rounded-full bg-[#385E9D] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4F2C1D]"
                  >
                    View publisher page →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* THEMES */}
      <section className="bg-[#F7F3EC] px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
            Scholarly Contributions
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            From fundamentals to implementation.
          </h2>

          <div className="mt-14 grid gap-px overflow-hidden border border-[#DDD5CC] bg-[#DDD5CC] md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                number: "01",
                title: "Electrochemical Devices",
                text: "Miniaturized sensing architectures, fabrication approaches, and analytical applications.",
              },
              {
                number: "02",
                title: "Microfluidics",
                text: "Droplet, digital, and integrated microfluidic systems from concept to implementation.",
              },
              {
                number: "03",
                title: "Smart Sensors",
                text: "Additively manufactured and integrated sensing platforms across multiple domains.",
              },
              {
                number: "04",
                title: "MEMS & Microsystems",
                text: "Practical fabrication, characterization, and laboratory-based microsystem engineering.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white p-7">
                <span className="text-xs font-semibold text-[#F2A900]">
                  {item.number}
                </span>

                <h3 className="mt-8 text-lg font-semibold">{item.title}</h3>

                <p className="mt-4 text-sm leading-7 text-[#706963]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OTHER OUTPUTS */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
            Explore More
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
            More research outputs.
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <Link
              href="/publications"
              className="group border border-[#DDD5CC] bg-[#FBF8F4] p-8 transition hover:border-[#385E9D]"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-[#385E9D]">
                Publications
              </p>

              <h3 className="mt-4 text-3xl font-semibold">
                Journal & Conference Publications
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#706963]">
                Explore scholarly publications across sensing, microfluidics,
                flexible devices, energy, diagnostics, environmental
                technologies, and intelligent systems.
              </p>

              <p className="mt-8 text-sm font-semibold text-[#385E9D]">
                Explore publications →
              </p>
            </Link>

            <Link
              href="/patents"
              className="group border border-[#DDD5CC] bg-[#FBF8F4] p-8 transition hover:border-[#385E9D]"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-[#385E9D]">
                Patents
              </p>

              <h3 className="mt-4 text-3xl font-semibold">
                Intellectual Property & Translation
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#706963]">
                Explore intellectual-property outputs spanning sensors,
                microfluidics, diagnostics, energy devices, fabrication, and
                translational engineering.
              </p>

              <p className="mt-8 text-sm font-semibold text-[#385E9D]">
                Explore patents →
              </p>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}