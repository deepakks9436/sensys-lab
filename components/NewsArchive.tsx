"use client";

import { useMemo, useState } from "react";
import type { NewsItem } from "../data/news";

type Props = {
  items: NewsItem[];
};

const INITIAL_VISIBLE = 8;

const filterGroups = [
  {
    label: "All",
    match: () => true,
  },
  {
    label: "Awards",
    match: (item: NewsItem) =>
      item.category === "Award & Recognition",
  },
  {
    label: "Diagnostics",
    match: (item: NewsItem) =>
      [
        "Intelligent Diagnostics",
        "Point-of-Care Diagnostics",
        "Healthcare Technology",
      ].includes(item.category),
  },
  {
    label: "Environment",
    match: (item: NewsItem) =>
      item.category === "Agri & Environmental Intelligence",
  },
  {
    label: "Energy",
    match: (item: NewsItem) =>
      item.category === "Energy Microsystems",
  },
  {
    label: "Biointegrated",
    match: (item: NewsItem) =>
      item.category === "Biointegrated Systems",
  },
  {
    label: "Microsystems",
    match: (item: NewsItem) =>
      [
        "Advanced Sensing",
        "Research in the Media",
        "Technology Translation",
      ].includes(item.category),
  },
];

export default function NewsArchive({
  items,
}: Props) {
  const [activeFilter, setActiveFilter] =
    useState("All");

  const [visibleCount, setVisibleCount] =
    useState(INITIAL_VISIBLE);

  const filteredItems = useMemo(() => {
    const selected =
      filterGroups.find(
        (filter) =>
          filter.label === activeFilter
      ) ?? filterGroups[0];

    return items.filter(selected.match);
  }, [items, activeFilter]);

  const visibleItems =
    filteredItems.slice(
      0,
      visibleCount
    );

  function changeFilter(
    filter: string
  ) {
    setActiveFilter(filter);
    setVisibleCount(
      INITIAL_VISIBLE
    );
  }

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-2">
        {filterGroups.map(
          (filter) => {
            const active =
              activeFilter ===
              filter.label;

            return (
              <button
                key={
                  filter.label
                }
                type="button"
                onClick={() =>
                  changeFilter(
                    filter.label
                  )
                }
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                  active
                    ? "border-[var(--um-blue)] bg-[var(--um-blue)] text-white"
                    : "border-[var(--border-strong)] bg-[var(--surface)] text-[var(--foreground-soft)] hover:border-[var(--um-blue)] hover:text-[var(--um-blue)]"
                }`}
              >
                {filter.label}
              </button>
            );
          }
        )}
      </div>

      <div className="mt-8 border-y border-[var(--border)]">
        {visibleItems.map(
          (item, index) => (
            <article
              key={item.id}
              className="group border-b border-[var(--border)] py-8 last:border-b-0 md:py-10"
            >
              <div className="grid gap-5 md:grid-cols-[0.12fr_0.23fr_1fr_0.12fr] md:items-start">
                <span className="text-xs font-semibold text-[var(--um-gold)]">
                  {String(
                    index + 1
                  ).padStart(
                    2,
                    "0"
                  )}
                </span>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--um-blue)]">
                    {
                      item.category
                    }
                  </p>

                  <p className="mt-2 text-xs text-[var(--foreground-muted)]">
                    {item.date}
                  </p>
                </div>

                <div>
                  <h3 className="max-w-3xl text-2xl font-semibold leading-tight tracking-[-0.025em] transition group-hover:text-[var(--um-blue)] md:text-3xl">
                    {item.title}
                  </h3>

                  <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--foreground-soft)]">
                    {item.summary}
                  </p>

                  {item.source && (
                    <p className="mt-4 text-[10px] uppercase tracking-[0.15em] text-[var(--foreground-muted)]">
                      Source ·{" "}
                      {
                        item.source
                      }
                    </p>
                  )}
                </div>

                <div className="md:text-right">
                  <a
                    href={
                      item.href
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Read ${item.title}`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-strong)] text-[var(--um-blue)] transition group-hover:border-[var(--um-blue)] group-hover:bg-[var(--um-blue)] group-hover:!text-white"
                  >
                    ↗
                  </a>
                </div>
              </div>
            </article>
          )
        )}
      </div>

      {visibleCount <
        filteredItems.length && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() =>
              setVisibleCount(
                (count) =>
                  count + 8
              )
            }
            className="rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-7 py-3.5 text-sm font-semibold transition hover:border-[var(--um-blue)] hover:text-[var(--um-blue)]"
          >
            Show more stories ↓
          </button>
        </div>
      )}

      {filteredItems.length ===
        0 && (
        <div className="mt-10 border border-[var(--border)] bg-[var(--surface)] p-8 text-sm text-[var(--foreground-soft)]">
          No stories are currently
          available in this
          category.
        </div>
      )}
    </>
  );
}