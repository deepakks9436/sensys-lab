"use client";

import Link from "next/link";
import {
  KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  searchIndex,
  SearchCategory,
  SearchItem,
} from "../data/searchIndex";

const MAX_RESULTS = 10;

/* ============================================================
   SEARCH HELPERS
============================================================ */

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[&/–—-]/g, " ")
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreItem(
  item: SearchItem,
  rawQuery: string
) {
  const query = normalize(rawQuery);

  if (!query) return 0;

  const title = normalize(item.title);
  const description = normalize(
    item.description
  );

  const category = normalize(item.category);

  const keywords = normalize(
    item.keywords.join(" ")
  );

  const year = normalize(item.year || "");

  const words = query
    .split(" ")
    .filter(Boolean);

  let score = 0;

  /* EXACT / STRONG TITLE MATCHES */

  if (title === query) {
    score += 300;
  }

  if (title.startsWith(query)) {
    score += 180;
  }

  if (title.includes(query)) {
    score += 120;
  }

  /* OTHER FULL QUERY MATCHES */

  if (keywords.includes(query)) {
    score += 70;
  }

  if (description.includes(query)) {
    score += 45;
  }

  if (category.includes(query)) {
    score += 30;
  }

  if (year === query) {
    score += 45;
  }

  /* INDIVIDUAL WORD SCORING */

  words.forEach((word) => {
    if (title.startsWith(word)) {
      score += 35;
    }

    if (title.includes(word)) {
      score += 28;
    }

    if (keywords.includes(word)) {
      score += 14;
    }

    if (description.includes(word)) {
      score += 9;
    }

    if (category.includes(word)) {
      score += 5;
    }

    if (year.includes(word)) {
      score += 7;
    }
  });

  /*
    Slightly prioritize core site pages over a very weak
    publication keyword match.
  */

  if (
    item.category !== "Publication" &&
    title.includes(query)
  ) {
    score += 20;
  }

  return score;
}

/* ============================================================
   COLOUR LABELS
============================================================ */

const categoryStyles: Record<
  SearchCategory,
  string
> = {
  Research:
    "bg-[var(--um-blue)]/10 text-[var(--um-blue)]",

  Publication:
    "bg-[var(--um-sky)]/10 text-[var(--um-blue)]",

  People:
    "bg-[var(--um-sky)]/10 text-[var(--um-sky)]",

  Outputs:
    "bg-[var(--um-gold)]/15 text-[var(--foreground)]",

  Facilities:
    "bg-[var(--surface-soft)] text-[var(--foreground-soft)]",

  News:
    "bg-[var(--um-blue)]/10 text-[var(--um-blue)]",

  Opportunities:
    "bg-[var(--um-gold)]/15 text-[var(--foreground)]",

  Pages:
    "bg-[var(--surface-soft)] text-[var(--foreground-soft)]",
};

/* ============================================================
   COMPONENT
============================================================ */

export default function SiteSearch() {
  const [open, setOpen] = useState(false);

  const [query, setQuery] = useState("");

  const [activeIndex, setActiveIndex] =
    useState(0);

  const inputRef =
    useRef<HTMLInputElement | null>(null);

  /* ========================================================
     RESULTS
  ======================================================== */

  const results = useMemo(() => {
    if (!query.trim()) {
      /*
        Keep the initial state useful rather than showing
        hundreds of publications.
      */

      return searchIndex
        .filter((item) =>
          [
            "Research",
            "People",
            "Outputs",
            "News",
            "Opportunities",
          ].includes(item.category)
        )
        .slice(0, 8);
    }

    return searchIndex
      .map((item) => ({
        item,
        score: scoreItem(item, query),
      }))
      .filter(
        (result) => result.score > 0
      )
      .sort(
        (a, b) => b.score - a.score
      )
      .slice(0, MAX_RESULTS)
      .map((result) => result.item);
  }, [query]);

  /* ========================================================
     OPEN / CLOSE
  ======================================================== */

  const closeSearch = () => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  };

  const openSearch = () => {
    setOpen(true);
  };

  /* ========================================================
     NAVBAR EVENT
  ======================================================== */

  useEffect(() => {
    const handleOpenSearch = () => {
      openSearch();
    };

    window.addEventListener(
      "sensys:open-search",
      handleOpenSearch
    );

    return () => {
      window.removeEventListener(
        "sensys:open-search",
        handleOpenSearch
      );
    };
  }, []);

  /* ========================================================
     GLOBAL KEYBOARD SHORTCUTS
  ======================================================== */

  useEffect(() => {
    const handleKeyboard = (
      event: KeyboardEvent
    ) => {
      const target =
        event.target as HTMLElement | null;

      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable;

      /* CTRL/CMD + K */

      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();

        setOpen(
          (current) => !current
        );

        return;
      }

      /* / */

      if (
        event.key === "/" &&
        !typing &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey
      ) {
        event.preventDefault();

        openSearch();

        return;
      }

      /* ESC */

      if (
        event.key === "Escape" &&
        open
      ) {
        event.preventDefault();

        closeSearch();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyboard
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboard
      );
    };
  }, [open]);

  /* ========================================================
     BODY LOCK + AUTOFOCUS
  ======================================================== */

  useEffect(() => {
    if (!open) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const focusTimer =
      window.setTimeout(() => {
        inputRef.current?.focus();
      }, 50);

    return () => {
      window.clearTimeout(focusTimer);

      document.body.style.overflow =
        previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  /* ========================================================
     RESULT NAVIGATION
  ======================================================== */

  const navigateToResult = (
    item: SearchItem
  ) => {
    closeSearch();

    if (
      item.external ||
      item.href.startsWith("http")
    ) {
      window.open(
        item.href,
        "_blank",
        "noopener,noreferrer"
      );

      return;
    }

    window.location.href = item.href;
  };

  const handleInputKeyDown = (
    event: ReactKeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();

      setActiveIndex((current) =>
        results.length === 0
          ? 0
          : current ===
            results.length - 1
          ? 0
          : current + 1
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setActiveIndex((current) =>
        results.length === 0
          ? 0
          : current === 0
          ? results.length - 1
          : current - 1
      );
    }

    if (
      event.key === "Enter" &&
      results[activeIndex]
    ) {
      event.preventDefault();

      navigateToResult(
        results[activeIndex]
      );
    }
  };

  if (!open) return null;

  /* ========================================================
     UI
  ======================================================== */

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-[#14243a]/55 px-4 pt-[8vh] backdrop-blur-md md:px-8 md:pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Search SenSys"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          closeSearch();
        }
      }}
    >
      <div className="w-full max-w-3xl overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-2xl">
        {/* ================================================= */}
        {/* INPUT */}
        {/* ================================================= */}

        <div className="flex items-center gap-4 border-b border-[var(--border)] px-5 py-4 md:px-6">
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0 text-[var(--um-blue)]"
            aria-hidden="true"
          >
            <circle
              cx="11"
              cy="11"
              r="8"
            />

            <path d="m21 21-4.3-4.3" />
          </svg>

          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) =>
              setQuery(
                event.target.value
              )
            }
            onKeyDown={
              handleInputKeyDown
            }
            placeholder="Search papers, research, people, facilities..."
            className="min-w-0 flex-1 bg-transparent text-base text-[var(--foreground)] outline-none placeholder:text-[var(--foreground-muted)] md:text-lg"
            aria-label="Search SenSys"
          />

          <button
            type="button"
            onClick={closeSearch}
            className="hidden rounded-md border border-[var(--border)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--foreground-muted)] transition hover:border-[var(--um-blue)] hover:text-[var(--um-blue)] sm:block"
          >
            Esc
          </button>

          <button
            type="button"
            onClick={closeSearch}
            aria-label="Close search"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--foreground-muted)] transition hover:bg-[var(--surface-soft)] hover:text-[var(--um-blue)] sm:hidden"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* ================================================= */}
        {/* RESULT HEADER */}
        {/* ================================================= */}

        <div className="max-h-[68vh] overflow-y-auto">
          <div className="px-5 pb-2 pt-5 md:px-6">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--foreground-muted)]">
                {query.trim()
                  ? `${results.length} top result${
                      results.length === 1
                        ? ""
                        : "s"
                    }`
                  : "Explore SenSys"}
              </p>

              {query.trim() && (
                <button
                  type="button"
                  onClick={() =>
                    setQuery("")
                  }
                  className="text-xs font-medium text-[var(--um-blue)] transition hover:text-[var(--um-sky)]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* ================================================= */}
          {/* RESULTS */}
          {/* ================================================= */}

          {results.length > 0 ? (
            <div className="p-3">
              {results.map(
                (item, index) => {
                  const active =
                    activeIndex === index;

                  const content = (
                    <>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span
                            className={`rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] ${categoryStyles[item.category]}`}
                          >
                            {item.category}
                          </span>

                          {item.year && (
                            <span className="text-[10px] text-[var(--foreground-muted)]">
                              {item.year}
                            </span>
                          )}

                          {item.external && (
                            <span
                              className="text-[10px] text-[var(--foreground-muted)]"
                              aria-label="External link"
                            >
                              ↗
                            </span>
                          )}
                        </div>

                        <h3 className="mt-2 text-sm font-semibold leading-6 text-[var(--foreground)] md:text-base">
                          {item.title}
                        </h3>

                        {item.description && (
                          <p className="mt-1.5 line-clamp-2 max-w-2xl text-xs leading-5 text-[var(--foreground-muted)] md:text-sm">
                            {item.description}
                          </p>
                        )}
                      </div>

                      <span
                        className={`mt-2 shrink-0 text-lg transition ${
                          active
                            ? "translate-x-1 text-[var(--um-blue)]"
                            : "text-[var(--foreground-muted)] group-hover:translate-x-1 group-hover:text-[var(--um-blue)]"
                        }`}
                      >
                        →
                      </span>
                    </>
                  );

                  const className = `group flex items-start justify-between gap-5 border px-4 py-4 transition md:px-5 ${
                    active
                      ? "border-[var(--um-blue)] bg-[var(--surface-soft)]"
                      : "border-transparent hover:bg-[var(--surface-soft)]"
                  }`;

                  /*
                    EXTERNAL RESULT
                  */

                  if (
                    item.external ||
                    item.href.startsWith(
                      "http"
                    )
                  ) {
                    return (
                      <a
                        key={item.id}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={
                          closeSearch
                        }
                        onMouseEnter={() =>
                          setActiveIndex(
                            index
                          )
                        }
                        className={
                          className
                        }
                      >
                        {content}
                      </a>
                    );
                  }

                  /*
                    INTERNAL RESULT
                  */

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={closeSearch}
                      onMouseEnter={() =>
                        setActiveIndex(
                          index
                        )
                      }
                      className={
                        className
                      }
                    >
                      {content}
                    </Link>
                  );
                }
              )}
            </div>
          ) : (
            /* ================================================= */
            /* EMPTY STATE */
            /* ================================================= */

            <div className="px-6 py-14 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface-soft)] text-[var(--um-blue)]">
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="8"
                  />

                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>

              <p className="mt-5 text-base font-semibold">
                No results found
              </p>

              <p className="mt-2 text-sm text-[var(--foreground-muted)]">
                Try a technology,
                researcher, publication,
                author, journal, year,
                facility, or opportunity.
              </p>
            </div>
          )}
        </div>

        {/* ================================================= */}
        {/* SEARCH FOOTER */}
        {/* ================================================= */}

        <div className="hidden items-center justify-between border-t border-[var(--border)] bg-[var(--surface-soft)] px-6 py-3 text-[10px] text-[var(--foreground-muted)] sm:flex">
          <div className="flex items-center gap-5">
            <span>↑ ↓ Navigate</span>
            <span>↵ Open</span>
            <span>Esc Close</span>
          </div>

          <div className="flex items-center gap-4">
            <span>
              Search across SenSys
            </span>

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--um-blue)]" />
              <span className="h-2 w-2 rounded-full bg-[var(--um-sky)]" />
              <span className="h-2 w-2 rounded-full bg-[var(--um-gold)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}