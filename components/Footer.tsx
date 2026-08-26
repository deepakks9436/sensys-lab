import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#e6dfd7] bg-[#F7F3EC] px-8 py-16 text-[#4F2C1D] md:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-[#ddd4ca] pb-12 md:grid-cols-2 lg:grid-cols-4">
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#F2A900]" />

              <Link href="/" className="text-xl font-semibold tracking-tight">
                SenSys
              </Link>
            </div>

            <p className="mt-5 max-w-xs text-sm leading-6 text-[#746d66]">
              Intelligent sensing systems for healthcare, agriculture,
              environmental monitoring, food safety, and emerging
              cyber-physical applications.
            </p>
          </div>

          {/* EXPLORE */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#005EA8]">
              Explore
            </p>

            <div className="mt-5 flex flex-col gap-3 text-sm text-[#5e5751]">
              <Link href="/research" className="transition hover:text-[#005EA8]">
                Research
              </Link>

              <Link href="/people" className="transition hover:text-[#005EA8]">
                People
              </Link>

              <Link
                href="/publications"
                className="transition hover:text-[#005EA8]"
              >
                Publications
              </Link>

              <Link
                href="/facilities"
                className="transition hover:text-[#005EA8]"
              >
                Facilities
              </Link>
            </div>
          </div>

          {/* CONNECT */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#005EA8]">
              Connect
            </p>

            <div className="mt-5 flex flex-col gap-3 text-sm text-[#5e5751]">
              <Link href="/news" className="transition hover:text-[#005EA8]">
                News
              </Link>

              <Link href="/join" className="transition hover:text-[#005EA8]">
                Join SenSys
              </Link>

              <a
                href="https://umanitoba.ca/facilities/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-[#005EA8]"
              >
                University Facilities
              </a>
            </div>
          </div>

          {/* LOCATION */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#005EA8]">
              Location
            </p>

            <p className="mt-5 text-sm leading-6 text-[#5e5751]">
              University of Manitoba
              <br />
              Winnipeg, Manitoba
              <br />
              Canada
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-xs text-[#8b837b] md:flex-row md:items-center md:justify-between">
          <p>© 2026 SenSys Lab. University of Manitoba.</p>

          <p>Intelligent Sensing Systems</p>
        </div>
      </div>
    </footer>
  );
}