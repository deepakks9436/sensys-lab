"use client";

import { useMemo, useState } from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  publications,
  publicationAreas,
  publicationYears,
} from "../../data/publications";

const highlights = [
  "10.1016/j.microc.2026.119194",
  "10.1039/D6SD00063K",
  "10.1039/D6LC00452K",
  "10.1016/j.microc.2026.118355",
  "10.1109/TIM.2026.3677997",
  "10.1016/j.electacta.2026.149275",
];

function extractDoi(href: string) {
  if (!href.includes("doi.org/")) return null;
  return href.split("doi.org/")[1];
}

export default function PublicationsPage() {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("All");
  const [year, setYear] = useState<number | "All">("All");
  const [expandedYears, setExpandedYears] = useState<number[]>([
    publicationYears[0],
  ]);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();

    return publications.filter((paper) => {
      const matchesArea = area === "All" || paper.areas.includes(area);
      const matchesYear = year === "All" || paper.year === year;

      const matchesSearch =
        !search ||
        paper.citation.toLowerCase().includes(search) ||
        paper.areas.join(" ").toLowerCase().includes(search) ||
        String(paper.year).includes(search);

      return matchesArea && matchesYear && matchesSearch;
    });
  }, [query, area, year]);

  const grouped = useMemo(() => {
    const map = new Map<number, typeof publications>();

    for (const paper of filtered) {
      const current = map.get(paper.year) ?? [];
      current.push(paper);
      map.set(paper.year, current);
    }

    return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
  }, [filtered]);

  const highlightPapers = useMemo(
    () =>
      highlights
        .map((doi) =>
          publications.find((paper) =>
            paper.href.toLowerCase().includes(doi.toLowerCase())
          )
        )
        .filter(Boolean),
    []
  );

  const toggleYear = (selectedYear: number) => {
    setExpandedYears((current) =>
      current.includes(selectedYear)
        ? current.filter((item) => item !== selectedYear)
        : [...current, selectedYear]
    );
  };

  const expandAll = () => {
    setExpandedYears(grouped.map(([groupYear]) => groupYear));
  };

  const collapseAll = () => {
    setExpandedYears([]);
  };

  return (
    <main className="min-h-screen bg-white text-[#4F2C1D]">
      <Navbar />

      {/* HERO */}
      <section className="bg-white px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
            Outputs · Publications
          </p>

          <h1 className="mt-6 max-w-6xl text-6xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-8xl">
            Publications &
            <br />
            Scholarly Work.
          </h1>

          <p className="mt-10 max-w-3xl text-xl leading-9 text-[#706963]">
            A searchable scholarly archive spanning microfluidics, biosensors,
            electrochemistry, graphene, flexible devices, intelligent
            diagnostics, environmental sensing, optical systems, and energy
            technologies.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="#archive"
              className="rounded-full bg-[#F2A900] px-7 py-3.5 text-sm font-semibold text-[#2A1710] transition hover:bg-[#385E9D] hover:text-white"
            >
              Browse full archive →
            </a>

            <a
              href="https://scholar.google.com/citations?hl=en&user=xgH6FBkAAAAJ&view_op=list_works&sortby=pubdate"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#385E9D] px-7 py-3.5 text-sm font-semibold text-[#385E9D] transition hover:bg-[#385E9D] hover:text-white"
            >
              Google Scholar ↗
            </a>
          </div>
        </div>
      </section>

      {/* RECENT HIGHLIGHTS */}
      <section className="bg-[#F7F3EC] px-8 py-20 md:px-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-[0.68fr_1.32fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
                Recent Highlights
              </p>
            </div>

            <div>
              <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                Selected recent work across the research foundations informing
                SenSys.
              </h2>

              <p className="mt-6 max-w-3xl text-base leading-8 text-[#706963]">
                A small selection of recent publications is highlighted here,
                followed by the complete searchable publication archive.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {highlightPapers.map((paper, index) => {
              if (!paper) return null;

              const doi = extractDoi(paper.href);

              return (
                <article
                  key={paper.id}
                  className="flex min-h-[360px] flex-col justify-between border border-[#DDD5CC] bg-white p-7 transition hover:border-[#385E9D]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-5">
                      <span className="text-xs font-semibold text-[#F2A900]">
                        0{index + 1}
                      </span>

                      <span className="text-xs font-semibold text-[#385E9D]">
                        {paper.year}
                      </span>
                    </div>

                    <p className="mt-8 text-base leading-8">
                      {paper.citation}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {paper.areas.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#D8D0C7] bg-[#FBF8F4] px-3 py-1.5 text-[10px] text-[#645D57]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 border-t border-[#DDD5CC] pt-5">
                    {doi && (
                      <p className="mb-3 text-[10px] text-[#837A72]">
                        DOI: {doi}
                      </p>
                    )}

                    <a
                      href={paper.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[#385E9D]"
                    >
                      View publication →
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMPLETE ARCHIVE */}
      <section
        id="archive"
        className="scroll-mt-28 bg-white px-8 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#385E9D]">
            Publication Archive
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Search the complete scholarly record.
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#706963]">
            Browse publications by year and research area, or search using
            author names, journal titles, keywords, DOI information, and
            publication topics.
          </p>

          {/* SEARCH */}
          <div className="mt-12">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title, author, journal, DOI, year or keyword..."
              className="w-full border border-[#CCC3BA] bg-[#FBF8F4] px-5 py-4 text-sm text-[#4F2C1D] outline-none transition placeholder:text-[#9A9189] focus:border-[#385E9D] focus:bg-white"
            />
          </div>

          {/* YEAR FILTER */}
          <div className="mt-6">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#837A72]">
              Filter by year
            </p>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setYear("All")}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                  year === "All"
                    ? "border-[#4F2C1D] bg-[#4F2C1D] text-white"
                    : "border-[#D6CEC5] bg-white text-[#706963] hover:border-[#4F2C1D]"
                }`}
              >
                All years
              </button>

              {publicationYears.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setYear(item)}
                  className={`rounded-full border px-4 py-2 text-xs transition ${
                    year === item
                      ? "border-[#4F2C1D] bg-[#4F2C1D] text-white"
                      : "border-[#D6CEC5] bg-white text-[#706963] hover:border-[#4F2C1D]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* RESEARCH AREA FILTER */}
          <div className="mt-6">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#837A72]">
              Filter by research area
            </p>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setArea("All")}
                className={`rounded-full border px-4 py-2 text-[11px] transition ${
                  area === "All"
                    ? "border-[#385E9D] bg-[#385E9D] text-white"
                    : "border-[#D6CEC5] bg-[#FBF8F4] text-[#706963] hover:border-[#385E9D]"
                }`}
              >
                All research areas
              </button>

              {publicationAreas.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setArea(item)}
                  className={`rounded-full border px-4 py-2 text-[11px] transition ${
                    area === item
                      ? "border-[#385E9D] bg-[#385E9D] text-white"
                      : "border-[#D6CEC5] bg-[#FBF8F4] text-[#706963] hover:border-[#385E9D]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* CONTROLS */}
          <div className="mt-10 flex flex-col gap-4 border-y border-[#D6CEC5] py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[#706963]">
              Showing{" "}
              <span className="font-semibold text-[#4F2C1D]">
                {filtered.length}
              </span>{" "}
              publications
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={expandAll}
                className="text-xs font-semibold text-[#385E9D]"
              >
                Expand all
              </button>

              <button
                type="button"
                onClick={collapseAll}
                className="text-xs font-semibold text-[#385E9D]"
              >
                Collapse all
              </button>

              {(query || area !== "All" || year !== "All") && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setArea("All");
                    setYear("All");
                  }}
                  className="text-xs font-semibold text-[#4F2C1D]"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* YEAR GROUPS */}
          <div className="mt-8 space-y-4">
            {grouped.map(([groupYear, papers]) => {
              const open =
                expandedYears.includes(groupYear) ||
                query.length > 0 ||
                year !== "All" ||
                area !== "All";

              return (
                <section
                  key={groupYear}
                  className="overflow-hidden border border-[#DDD5CC] bg-white"
                >
                  <button
                    type="button"
                    onClick={() => toggleYear(groupYear)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition hover:bg-[#FBF8F4] md:px-8"
                  >
                    <div>
                      <p className="text-3xl font-semibold tracking-tight">
                        {groupYear}
                      </p>
                    </div>

                    <div className="flex items-center gap-5">
                      <span className="rounded-full bg-[#F7F3EC] px-4 py-2 text-xs text-[#706963]">
                        {papers.length} publications
                      </span>

                      <span className="text-xl text-[#385E9D]">
                        {open ? "−" : "+"}
                      </span>
                    </div>
                  </button>

                  {open && (
                    <div className="border-t border-[#DDD5CC]">
                      {papers.map((paper, index) => {
                        const doi = extractDoi(paper.href);

                        return (
                          <article
                            key={paper.id}
                            className="grid gap-6 border-b border-[#EEE8E1] px-6 py-7 last:border-b-0 md:grid-cols-[60px_1fr_auto] md:px-8"
                          >
                            <div className="text-xs font-semibold text-[#F2A900]">
                              {String(index + 1).padStart(2, "0")}
                            </div>

                            <div>
                              <p className="max-w-5xl text-sm leading-7 text-[#4F2C1D]">
                                {paper.citation}
                              </p>

                              <div className="mt-4 flex flex-wrap gap-2">
                                {paper.areas.map((tag) => (
                                  <span
                                    key={tag}
                                    className="rounded-full border border-[#DDD5CC] bg-[#FBF8F4] px-3 py-1.5 text-[10px] text-[#706963]"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>

                              {doi && (
                                <p className="mt-3 break-all text-[10px] text-[#8A8179]">
                                  DOI: {doi}
                                </p>
                              )}
                            </div>

                            <a
                              href={paper.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="h-fit w-fit rounded-full border border-[#385E9D] px-5 py-2.5 text-xs font-semibold text-[#385E9D] transition hover:bg-[#385E9D] hover:text-white"
                            >
                              {doi ? "View paper →" : "Scholar search →"}
                            </a>
                          </article>
                        );
                      })}
                    </div>
                  )}
                </section>
              );
            })}

            {grouped.length === 0 && (
              <div className="border border-[#DDD5CC] bg-[#FBF8F4] p-10 text-center">
                <p className="font-semibold">
                  No publications found.
                </p>

                <p className="mt-2 text-sm text-[#706963]">
                  Try a different search term or remove one of the filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* GOOGLE SCHOLAR */}
      <section className="bg-[#4F2C1D] px-8 py-24 text-white md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#F2A900]">
                Live Scholarly Profile
              </p>
            </div>

            <div>
              <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                Follow the latest scholarly output.
              </h2>

              <p className="mt-7 max-w-3xl text-base leading-8 text-white/70">
                This publication archive is maintained independently within
                SenSys. Google Scholar provides the latest external indexing,
                citation metrics, and bibliographic information.
              </p>

              <a
                href="https://scholar.google.com/citations?hl=en&user=xgH6FBkAAAAJ&view_op=list_works&sortby=pubdate"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex rounded-full bg-[#F2A900] px-7 py-3.5 text-sm font-semibold text-[#2A1710] transition hover:bg-white"
              >
                Open Google Scholar →
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}