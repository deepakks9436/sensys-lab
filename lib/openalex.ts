import {
  publications as curatedPublications,
  type Publication,
} from "../data/publications";

const OPENALEX_AUTHOR_ID = "A5047102862";
const OPENALEX_SYNC_START = "2026-10-11";

type OpenAlexAuthor = {
  author?: {
    id?: string;
    display_name?: string;
  };
};

type OpenAlexLocation = {
  landing_page_url?: string | null;
  source?: {
    display_name?: string | null;
  } | null;
};

type OpenAlexWork = {
  id?: string;
  doi?: string | null;
  display_name?: string | null;
  title?: string | null;

  publication_year?: number | null;
  publication_date?: string | null;

  type?: string | null;

  authorships?: OpenAlexAuthor[];

  primary_location?: OpenAlexLocation | null;

  biblio?: {
    volume?: string | null;
    issue?: string | null;
    first_page?: string | null;
    last_page?: string | null;
  } | null;

  topics?: Array<{
    display_name?: string | null;
  }>;
};

type OpenAlexResponse = {
  results?: OpenAlexWork[];
};

export type MergedPublicationResult = {
  publications: Publication[];
  curatedCount: number;
  syncedCount: number;
  totalCount: number;
  syncStart: string;
};

function normalizeDoi(value?: string | null) {
  if (!value) return "";

  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//, "")
    .replace(/^doi:\s*/, "");
}

function extractDoiFromHref(href: string) {
  if (!href) return "";

  const lower = href.toLowerCase();

  if (!lower.includes("doi.org/")) {
    return "";
  }

  return normalizeDoi(
    href.split(/doi\.org\//i)[1]
  );
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getWorkTitle(work: OpenAlexWork) {
  return String(
    work.display_name ||
      work.title ||
      ""
  ).trim();
}

function isAlreadyCurated(
  work: OpenAlexWork,
  curatedDoiSet: Set<string>
) {
  const openAlexDoi =
    normalizeDoi(work.doi);

  if (
    openAlexDoi &&
    curatedDoiSet.has(openAlexDoi)
  ) {
    return true;
  }

  const title =
    normalizeText(
      getWorkTitle(work)
    );

  if (title.length < 20) {
    return false;
  }

  return curatedPublications.some(
    (paper) => {
      const citation =
        normalizeText(
          paper.citation
        );

      return citation.includes(
        title
      );
    }
  );
}

function classifyResearchAreas(
  work: OpenAlexWork
): string[] {
  const text =
    normalizeText(
      [
        getWorkTitle(work),
        ...(work.topics ?? []).map(
          (topic) =>
            topic.display_name ?? ""
        ),
      ].join(" ")
    );

  const areas =
    new Set<string>();

  const includesAny = (
    terms: string[]
  ) =>
    terms.some((term) =>
      text.includes(
        normalizeText(term)
      )
    );

  if (
    includesAny([
      "microfluidic",
      "lab on chip",
      "microchannel",
      "micro reactor",
      "microreactor",
    ])
  ) {
    areas.add("Microfluidics");
  }

  if (
    includesAny([
      "biosensor",
      "biomarker",
      "bio sensor",
      "diagnostic",
      "glucose",
      "lactate",
      "cortisol",
      "dopamine",
      "insulin",
      "bilirubin",
      "cardiac",
      "pathogen",
      "bacteria",
    ])
  ) {
    areas.add("Biosensors");
  }

  if (
    includesAny([
      "electrochemical",
      "electrochemistry",
      "voltammetry",
      "impedance",
      "electrode",
      "electroanalytical",
    ])
  ) {
    areas.add(
      "Electrochemistry"
    );
  }

  if (
    includesAny([
      "graphene",
      "laser induced graphene",
      "laser-induced graphene",
      "reduced graphene oxide",
      "rgo",
    ])
  ) {
    areas.add(
      "Graphene/LIG"
    );
  }

  if (
    includesAny([
      "wearable",
      "textile",
      "fabric",
      "implantable",
      "flexible",
      "glove",
    ])
  ) {
    areas.add("Wearables");
  }

  if (
    includesAny([
      "chemiluminescence",
      "electrochemiluminescence",
      "optical",
      "fluorescence",
      "photometric",
      "spectroscopy",
      "infrared",
    ])
  ) {
    areas.add(
      "Optical Sensing"
    );
  }

  if (
    includesAny([
      "fuel cell",
      "supercapacitor",
      "energy storage",
      "energy harvesting",
      "photovoltaic",
      "battery",
    ])
  ) {
    areas.add(
      "Energy Devices"
    );
  }

  if (
    includesAny([
      "water",
      "soil",
      "pesticide",
      "herbicide",
      "agriculture",
      "food",
      "environmental",
      "heavy metal",
    ])
  ) {
    areas.add(
      "Water/Agriculture"
    );
  }

  if (
    includesAny([
      "point of care",
      "point-of-care",
      "portable diagnostic",
    ])
  ) {
    areas.add(
      "Point-of-Care Diagnostics"
    );
  }

  if (
    includesAny([
      "mems",
      "microsystem",
      "microelectromechanical",
    ])
  ) {
    areas.add("MEMS");
  }

  if (areas.size === 0) {
    areas.add("General");
  }

  return Array.from(areas);
}

function formatAuthors(
  authorships:
    | OpenAlexAuthor[]
    | undefined
) {
  const authors =
    (authorships ?? [])
      .map(
        (item) =>
          item.author
            ?.display_name
      )
      .filter(
        (
          value
        ): value is string =>
          Boolean(value)
      );

  if (authors.length === 0) {
    return "Sanket Goel";
  }

  if (authors.length === 1) {
    return authors[0];
  }

  if (authors.length === 2) {
    return `${authors[0]} and ${authors[1]}`;
  }

  return `${authors
    .slice(0, -1)
    .join(", ")} and ${
    authors[
      authors.length - 1
    ]
  }`;
}

function buildCitation(
  work: OpenAlexWork
) {
  const authors =
    formatAuthors(
      work.authorships
    );

  const title =
    getWorkTitle(work);

  const source =
    work.primary_location
      ?.source?.display_name?.trim() ||
    "";

  const year =
    work.publication_year ||
    "";

  const volume =
    work.biblio?.volume
      ?.trim() || "";

  const issue =
    work.biblio?.issue
      ?.trim() || "";

  const firstPage =
    work.biblio
      ?.first_page?.trim() ||
    "";

  const lastPage =
    work.biblio
      ?.last_page?.trim() ||
    "";

  let citation =
    `${authors}. ${title}.`;

  if (source) {
    citation += ` ${source}`;
  }

  if (volume) {
    citation += `, Vol. ${volume}`;
  }

  if (issue) {
    citation += `(${issue})`;
  }

  if (firstPage) {
    citation += `, ${firstPage}`;

    if (
      lastPage &&
      lastPage !== firstPage
    ) {
      citation += `-${lastPage}`;
    }
  }

  if (year) {
    citation += `, ${year}`;
  }

  citation += ".";

  const doi =
    normalizeDoi(
      work.doi
    );

  if (doi) {
    citation += ` DOI: https://doi.org/${doi}`;
  }

  return citation
    .replace(/\s+/g, " ")
    .trim();
}

function getPublicationHref(
  work: OpenAlexWork
) {
  const doi =
    normalizeDoi(
      work.doi
    );

  if (doi) {
    return `https://doi.org/${doi}`;
  }

  if (
    work.primary_location
      ?.landing_page_url
  ) {
    return work.primary_location
      .landing_page_url;
  }

  return (
    work.id ||
    "https://openalex.org"
  );
}

function convertOpenAlexWork(
  work: OpenAlexWork
): Publication | null {
  const title =
    getWorkTitle(work);

  const year =
    work.publication_year;

  if (
    !title ||
    !year ||
    !work.id
  ) {
    return null;
  }

  return {
    id: `openalex:${work.id
      .split("/")
      .pop()}`,

    year,

    citation:
      buildCitation(work),

    areas:
      classifyResearchAreas(
        work
      ),

    href:
      getPublicationHref(
        work
      ),
  };
}

async function fetchOpenAlexWorks() {
  const params =
    new URLSearchParams({
      filter:
        `author.id:${OPENALEX_AUTHOR_ID},from_publication_date:${OPENALEX_SYNC_START}`,

      sort:
        "publication_date:desc",

      per_page:
        "100",

      select: [
        "id",
        "doi",
        "display_name",
        "publication_year",
        "publication_date",
        "type",
        "authorships",
        "primary_location",
        "biblio",
        "topics",
      ].join(","),
    });

  const apiKey =
    process.env
      .OPENALEX_API_KEY;

  if (apiKey) {
    params.set(
      "api_key",
      apiKey
    );
  }

  const response =
    await fetch(
      `https://api.openalex.org/works?${params.toString()}`,
      {
        next: {
          revalidate: 86400,
        },

        headers: {
          Accept:
            "application/json",
        },
      }
    );

  if (!response.ok) {
    throw new Error(
      `OpenAlex request failed with ${response.status}`
    );
  }

  const data =
    (await response.json()) as OpenAlexResponse;

  return data.results ?? [];
}

export async function getMergedPublications(): Promise<MergedPublicationResult> {
  try {
    const openAlexWorks =
      await fetchOpenAlexWorks();

    const curatedDoiSet =
      new Set(
        curatedPublications
          .map((paper) =>
            extractDoiFromHref(
              paper.href
            )
          )
          .filter(Boolean)
      );

    const synced: Publication[] =
      [];

    for (
      const work of
      openAlexWorks
    ) {
      if (
        isAlreadyCurated(
          work,
          curatedDoiSet
        )
      ) {
        continue;
      }

      const publication =
        convertOpenAlexWork(
          work
        );

      if (!publication) {
        continue;
      }

      synced.push(
        publication
      );
    }

    const merged = [
  ...synced,
  ...curatedPublications,
];

    return {
      publications:
        merged,

      curatedCount:
        curatedPublications.length,

      syncedCount:
        synced.length,

      totalCount:
        merged.length,

      syncStart:
        OPENALEX_SYNC_START,
    };
  } catch (error) {
    console.error(
      "OpenAlex publication sync failed:",
      error
    );

    return {
      publications:
        curatedPublications,

      curatedCount:
        curatedPublications.length,

      syncedCount: 0,

      totalCount:
        curatedPublications.length,

      syncStart:
        OPENALEX_SYNC_START,
    };
  }
}