"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const researchThrusts = [
  {
    title: "Intelligent Microsystems",
    href: "/research#intelligent-microsystems",
  },
  {
    title: "Biointegrated Systems",
    href: "/research#biointegrated-systems",
  },
  {
    title: "Intelligent Diagnostics",
    href: "/research#intelligent-diagnostics",
  },
  {
    title: "Agri & Environmental Intelligence",
    href: "/research#agri-environment",
  },
];

const researchFoundations = [
  {
    title: "Graphene Technologies",
    href: "/research/graphene",
  },
  {
    title: "Pesticide Detection",
    href: "/research/pesticide-detection",
  },
  {
    title: "Water Quality Technologies",
    href: "/research/water-quality",
  },
  {
    title: "Pathogen & AMR Diagnostics",
    href: "/research/amr",
  },
];

const outputs = [
  {
    title: "Publications",
    href: "/publications",
  },
  {
    title: "Patents",
    href: "/patents",
  },
  {
    title: "Books",
    href: "/books",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [researchOpen, setResearchOpen] = useState(false);
  const [outputsOpen, setOutputsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setResearchOpen(false);
    setOutputsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-t-2 border-[#F2A900] transition ${
        scrolled
          ? "border-b border-[#E5E0D8] bg-white/95 shadow-sm backdrop-blur-xl"
          : "border-b border-[#E5E0D8] bg-white"
      }`}
    >
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 md:px-8">
        {/* BRAND */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F2A900]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#F2A900]" />
          </div>

          <div className="leading-none">
            <p className="text-[17px] font-semibold tracking-tight text-[#4F2C1D]">
              SenSys
            </p>

            <p className="mt-1 text-[9px] uppercase tracking-[0.28em] text-[#837A72]">
              University of Manitoba
            </p>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-8 lg:flex">
          {/* RESEARCH */}
          <div
            className="relative"
            onMouseEnter={() => setResearchOpen(true)}
            onMouseLeave={() => setResearchOpen(false)}
          >
            <button
              type="button"
              onClick={() => {
                setResearchOpen((current) => !current);
                setOutputsOpen(false);
              }}
              className={`flex items-center gap-2 border-b pb-1 text-sm transition ${
                pathname.startsWith("/research")
                  ? "border-[#385E9D] text-[#4F2C1D]"
                  : "border-transparent text-[#4F2C1D] hover:border-[#385E9D]"
              }`}
            >
              Research
              <span className="text-[10px] text-[#385E9D]">⌄</span>
            </button>

            {researchOpen && (
              <div className="absolute left-1/2 top-full w-[660px] -translate-x-1/2 pt-5">
                <div className="grid grid-cols-2 border border-[#DDD5CC] bg-white shadow-xl">
                  {/* THRUSTS */}
                  <div className="p-7">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#385E9D]">
                      SenSys Research
                    </p>

                    <div className="mt-5 space-y-1">
                      {researchThrusts.map((item, index) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="group flex items-start gap-4 border-b border-[#EFE9E2] py-4 last:border-b-0"
                        >
                          <span className="pt-[2px] text-[10px] font-semibold text-[#F2A900]">
                            0{index + 1}
                          </span>

                          <div>
                            <p className="text-sm font-semibold text-[#4F2C1D] transition group-hover:text-[#385E9D]">
                              {item.title}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <Link
                      href="/research"
                      className="mt-5 inline-block text-xs font-semibold text-[#385E9D]"
                    >
                      View all research →
                    </Link>
                  </div>

                  {/* FOUNDATIONS */}
                  <div className="border-l border-[#DDD5CC] bg-[#F7F3EC] p-7">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#385E9D]">
                      Research Foundations
                    </p>

                    <p className="mt-3 text-xs leading-6 text-[#837A72]">
                      Selected technology programmes demonstrating the research
                      foundations informing SenSys.
                    </p>

                    <div className="mt-5 space-y-2">
                      {researchFoundations.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="flex items-center justify-between border border-[#DDD5CC] bg-white px-4 py-3 text-sm text-[#4F2C1D] transition hover:border-[#385E9D] hover:text-[#385E9D]"
                        >
                          <span>{item.title}</span>
                          <span>→</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* PEOPLE */}
          <Link
            href="/people"
            className={`border-b pb-1 text-sm transition ${
              isActive("/people")
                ? "border-[#385E9D]"
                : "border-transparent hover:border-[#385E9D]"
            }`}
          >
            People
          </Link>

          {/* OUTPUTS */}
          <div
            className="relative"
            onMouseEnter={() => setOutputsOpen(true)}
            onMouseLeave={() => setOutputsOpen(false)}
          >
            <button
              type="button"
              onClick={() => {
                setOutputsOpen((current) => !current);
                setResearchOpen(false);
              }}
              className={`flex items-center gap-2 border-b pb-1 text-sm transition ${
                pathname.startsWith("/publications") ||
                pathname.startsWith("/patents") ||
                pathname.startsWith("/books")
                  ? "border-[#385E9D]"
                  : "border-transparent hover:border-[#385E9D]"
              }`}
            >
              Outputs
              <span className="text-[10px] text-[#385E9D]">⌄</span>
            </button>

            {outputsOpen && (
              <div className="absolute left-1/2 top-full w-56 -translate-x-1/2 pt-5">
                <div className="border border-[#DDD5CC] bg-white p-2 shadow-xl">
                  {outputs.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="flex items-center justify-between px-4 py-3 text-sm text-[#4F2C1D] transition hover:bg-[#F7F3EC] hover:text-[#385E9D]"
                    >
                      {item.title}
                      <span>→</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* FACILITIES */}
          <Link
            href="/facilities"
            className={`border-b pb-1 text-sm transition ${
              isActive("/facilities")
                ? "border-[#385E9D]"
                : "border-transparent hover:border-[#385E9D]"
            }`}
          >
            Facilities
          </Link>

          {/* NEWS */}
          <Link
            href="/news"
            className={`border-b pb-1 text-sm transition ${
              isActive("/news")
                ? "border-[#385E9D]"
                : "border-transparent hover:border-[#385E9D]"
            }`}
          >
            News
          </Link>

          {/* JOIN */}
          <Link
            href="/join"
            className="rounded-full bg-[#F2A900] px-6 py-3 text-sm font-semibold text-[#2A1710] transition hover:bg-[#385E9D] hover:text-white"
          >
            Join SenSys
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          type="button"
          onClick={() => setMobileOpen((current) => !current)}
          className="flex h-10 w-10 items-center justify-center border border-[#DDD5CC] text-[#4F2C1D] lg:hidden"
          aria-label="Toggle navigation"
        >
          <span className="text-xl">
            {mobileOpen ? "×" : "☰"}
          </span>
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="border-t border-[#DDD5CC] bg-white px-6 py-6 lg:hidden">
          <div className="mx-auto max-w-7xl space-y-2">
            <Link
              href="/research"
              className="block border-b border-[#EAE4DD] py-3 text-sm font-semibold"
            >
              Research
            </Link>

            <div className="grid gap-2 py-2 sm:grid-cols-2">
              {researchFoundations.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="border border-[#DDD5CC] bg-[#F7F3EC] px-4 py-3 text-xs"
                >
                  {item.title}
                </Link>
              ))}
            </div>

            <Link
              href="/people"
              className="block border-b border-[#EAE4DD] py-3 text-sm"
            >
              People
            </Link>

            <div className="border-b border-[#EAE4DD] py-3">
              <p className="text-sm font-semibold">Outputs</p>

              <div className="mt-3 grid grid-cols-3 gap-2">
                {outputs.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="border border-[#DDD5CC] px-3 py-2 text-center text-xs"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/facilities"
              className="block border-b border-[#EAE4DD] py-3 text-sm"
            >
              Facilities
            </Link>

            <Link
              href="/news"
              className="block border-b border-[#EAE4DD] py-3 text-sm"
            >
              News
            </Link>

            <Link
              href="/join"
              className="mt-5 block rounded-full bg-[#F2A900] px-6 py-3.5 text-center text-sm font-semibold text-[#2A1710]"
            >
              Join SenSys
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}