"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const researchLinks = [
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

const navigation = [
  { name: "Research", href: "/research" },
  { name: "People", href: "/people" },
  { name: "Publications", href: "/publications" },
  { name: "Facilities", href: "/facilities" },
  { name: "News", href: "/news" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [researchOpen, setResearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setResearchOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-white/10 bg-[#090909]/90 backdrop-blur-xl"
            : "border-transparent bg-[#090909]"
        }`}
      >
        {/* UM GOLD ACCENT */}
        <div className="h-[3px] w-full bg-[#F2A900]" />

        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5 md:px-16">
          {/* LOGO */}
          <Link href="/" className="group flex items-center gap-4">
            <div className="relative flex h-10 w-10 items-center justify-center">
              <div className="absolute h-10 w-10 rounded-full border border-[#F2A900]/40 transition group-hover:border-[#F2A900]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#F2A900]" />
            </div>

            <div>
              <p className="text-lg font-semibold leading-none tracking-tight text-white">
                SenSys
              </p>

              <p className="mt-1 text-[9px] uppercase tracking-[0.24em] text-neutral-500">
                University of Manitoba
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              if (item.name === "Research") {
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setResearchOpen(true)}
                    onMouseLeave={() => setResearchOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className={`group relative flex items-center gap-2 px-4 py-3 text-sm transition ${
                        active
                          ? "text-white"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      Research

                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        className={`transition duration-200 ${
                          researchOpen ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />
                      </svg>

                      <span
                        className={`absolute bottom-1 left-4 right-4 h-px origin-left bg-[#F2A900] transition-transform ${
                          active
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </Link>

                    {/* RESEARCH MEGA DROPDOWN */}
                    <div
                      className={`absolute left-1/2 top-full w-[580px] -translate-x-1/2 pt-4 transition-all duration-200 ${
                        researchOpen
                          ? "visible translate-y-0 opacity-100"
                          : "invisible -translate-y-2 opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden border border-white/10 bg-[#111111] shadow-2xl">
                        <div className="grid grid-cols-[0.7fr_1.3fr]">
                          <div className="bg-[#F2A900] p-8 text-black">
                            <p className="text-xs font-medium uppercase tracking-[0.28em] text-black/60">
                              Research
                            </p>

                            <p className="mt-12 text-2xl font-semibold leading-tight">
                              From sensing principles to intelligent systems.
                            </p>

                            <Link
                              href="/research"
                              className="mt-8 inline-block border-b border-black pb-1 text-xs font-medium"
                            >
                              Explore all research →
                            </Link>
                          </div>

                          <div className="p-6">
                            {researchLinks.map((link, index) => (
                              <Link
                                key={link.title}
                                href={link.href}
                                className="group flex items-center justify-between border-b border-white/10 px-2 py-4 last:border-none"
                              >
                                <div className="flex items-center gap-4">
                                  <span className="text-[10px] tracking-[0.2em] text-[#F2A900]">
                                    0{index + 1}
                                  </span>

                                  <span className="text-sm text-neutral-300 transition group-hover:text-white">
                                    {link.title}
                                  </span>
                                </div>

                                <span className="translate-x-0 text-neutral-600 transition group-hover:translate-x-1 group-hover:text-[#F2A900]">
                                  →
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group relative px-4 py-3 text-sm transition ${
                    active
                      ? "text-white"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {item.name}

                  <span
                    className={`absolute bottom-1 left-4 right-4 h-px origin-left bg-[#F2A900] transition-transform ${
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}

            {/* JOIN CTA */}
            <Link
              href="/join"
              className={`ml-4 rounded-full px-6 py-3 text-sm font-medium transition ${
                pathname === "/join"
                  ? "bg-white text-black"
                  : "bg-[#F2A900] text-black hover:bg-white"
              }`}
            >
              Join SenSys
            </Link>
          </nav>

          {/* MOBILE BUTTON */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-11 w-11 items-center justify-center border border-white/15 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            <div className="space-y-1.5">
              <span
                className={`block h-px w-5 bg-white transition ${
                  mobileOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-5 bg-white transition ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-px w-5 bg-white transition ${
                  mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* MOBILE NAVIGATION */}
      <div
        className={`fixed inset-x-0 bottom-0 top-[84px] z-40 overflow-y-auto bg-[#090909] transition-all duration-300 lg:hidden ${
          mobileOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-4 opacity-0"
        }`}
      >
        <div className="px-8 py-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#F2A900]">
            Explore SenSys
          </p>

          <nav className="mt-8">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center justify-between border-t border-white/10 py-6"
              >
                <div className="flex items-center gap-5">
                  <span className="text-xs text-[#F2A900]">
                    0{index + 1}
                  </span>

                  <span className="text-3xl font-semibold tracking-tight">
                    {item.name}
                  </span>
                </div>

                <span className="text-2xl text-neutral-600 transition group-hover:text-[#F2A900]">
                  →
                </span>
              </Link>
            ))}

            <Link
              href="/join"
              className="mt-8 flex items-center justify-between bg-[#F2A900] p-6 text-black"
            >
              <span className="text-2xl font-semibold">
                Join SenSys
              </span>

              <span className="text-2xl">→</span>
            </Link>
          </nav>

          <div className="mt-14 border-t border-white/10 pt-8">
            <p className="text-sm text-neutral-500">
              University of Manitoba
            </p>

            <p className="mt-1 text-sm text-neutral-600">
              Winnipeg, Canada
            </p>
          </div>
        </div>
      </div>
    </>
  );
}