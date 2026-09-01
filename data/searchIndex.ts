import { publications } from "./publications";
import { newsItems } from "./news";

export type SearchCategory =
  | "Research"
  | "Publication"
  | "People"
  | "Outputs"
  | "Facilities"
  | "News"
  | "Opportunities"
  | "Pages";

export type SearchItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  category: SearchCategory;
  keywords: string[];
  year?: string;
  external?: boolean;
};

/* ============================================================
   HELPERS
============================================================ */

function cleanString(value: unknown): string {
  if (typeof value === "string") {
    return value.trim();
  }

  if (typeof value === "number") {
    return String(value);
  }

  return "";
}

function getFirstString(
  object: Record<string, unknown>,
  keys: string[]
): string {
  for (const key of keys) {
    const value = cleanString(object[key]);

    if (value) {
      return value;
    }
  }

  return "";
}

function getAllText(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map(getAllText).join(" ");
  }

  if (value && typeof value === "object") {
    return Object.values(
      value as Record<string, unknown>
    )
      .map(getAllText)
      .join(" ");
  }

  return "";
}

function extractDoi(text: string): string {
  const match = text.match(
    /10\.\d{4,9}\/[-._;()/:A-Z0-9]+/i
  );

  if (!match) {
    return "";
  }

  return match[0].replace(/[.,;)\]]+$/, "");
}

function makeDoiUrl(doi: string): string {
  if (!doi) {
    return "";
  }

  if (doi.startsWith("http")) {
    return doi;
  }

  return `https://doi.org/${doi}`;
}

function compactDescription(
  text: string,
  maxLength = 180
): string {
  const cleaned = text
    .replace(/\s+/g, " ")
    .trim();

  if (cleaned.length <= maxLength) {
    return cleaned;
  }

  return `${cleaned.slice(0, maxLength).trim()}…`;
}

/* ============================================================
   STATIC SITE INDEX
============================================================ */

const staticSearchItems: SearchItem[] = [
  /* ==========================================================
     CORE PAGES
  ========================================================== */

  {
    id: "home",
    title: "SenSys Lab",
    description:
      "Intelligent sensing systems at the University of Manitoba.",
    href: "/",
    category: "Pages",
    keywords: [
      "home",
      "sensys",
      "lab",
      "university of manitoba",
      "winnipeg",
      "sensing",
      "sensor",
      "research lab",
    ],
  },

  {
    id: "research",
    title: "Research",
    description:
      "Explore SenSys research directions and technology platforms.",
    href: "/research",
    category: "Research",
    keywords: [
      "research",
      "sensing",
      "microfluidics",
      "microsystems",
      "diagnostics",
      "biointegrated",
      "agriculture",
      "environment",
    ],
  },

  /* ==========================================================
     FUTURE RESEARCH DIRECTIONS
  ========================================================== */

  {
    id: "intelligent-microsystems",
    title: "Intelligent Microsystems",
    description:
      "Integrated sensing, microfluidics, electronics and intelligent instrumentation.",
    href: "/research#intelligent-microsystems",
    category: "Research",
    keywords: [
      "microsystems",
      "mems",
      "microfluidics",
      "electronics",
      "sensors",
      "instrumentation",
      "microdevices",
      "smart devices",
    ],
  },

  {
    id: "biointegrated-systems",
    title: "Biointegrated Systems",
    description:
      "Wearable, implantable and biointegrated sensing technologies.",
    href: "/research#biointegrated-systems",
    category: "Research",
    keywords: [
      "biointegrated",
      "wearable",
      "implantable",
      "textile",
      "biosensors",
      "bioelectronics",
      "flexible",
    ],
  },

  {
    id: "intelligent-diagnostics",
    title: "Intelligent Diagnostics",
    description:
      "Point-of-care systems integrating sensing, microfluidics and intelligent decision-making.",
    href: "/research#intelligent-diagnostics",
    category: "Research",
    keywords: [
      "diagnostics",
      "point of care",
      "healthcare",
      "pathogen",
      "amr",
      "bacteria",
      "machine learning",
      "ai",
      "diagnostic",
    ],
  },

  {
    id: "agri-environment",
    title: "Agri & Environmental Intelligence",
    description:
      "Sensing technologies for agriculture, food, soil, water and environmental monitoring.",
    href: "/research#agri-environment",
    category: "Research",
    keywords: [
      "agriculture",
      "environment",
      "water",
      "soil",
      "food safety",
      "pesticide",
      "precision agriculture",
      "environmental sensing",
    ],
  },

  /* ==========================================================
     RESEARCH FOUNDATIONS
  ========================================================== */

  {
    id: "pesticide-detection",
    title: "Pesticide Detection",
    description:
      "Portable optical, electrochemical, wearable and microfluidic pesticide sensing technologies.",
    href: "/research/pesticide-detection",
    category: "Research",
    keywords: [
      "pesticide",
      "pesticides",
      "pestisafe",
      "food safety",
      "chemiluminescence",
      "fluorescence",
      "electrochemical",
      "lab on glove",
      "microfluidic",
      "organophosphorus",
      "monocrotophos",
      "portable pesticide",
    ],
  },

  {
    id: "graphene",
    title: "Graphene Technologies",
    description:
      "Graphene and laser-induced graphene technologies for sensing, electronics and energy systems.",
    href: "/research/graphene",
    category: "Research",
    keywords: [
      "graphene",
      "lig",
      "laser induced graphene",
      "rgo",
      "carbon",
      "microheater",
      "biosensor",
      "flexible electronics",
      "supercapacitor",
      "mxene",
    ],
  },

  {
    id: "water-quality",
    title: "Water Quality Technologies",
    description:
      "Portable and connected sensing technologies for water-quality analysis.",
    href: "/research/water-quality",
    category: "Research",
    keywords: [
      "water",
      "water quality",
      "ion selective",
      "heavy metal",
      "heavy metals",
      "fluoride",
      "ammonia",
      "ph",
      "iot",
      "nitrate",
      "environmental",
    ],
  },

  {
    id: "amr",
    title: "Pathogen & AMR Diagnostics",
    description:
      "Microfluidic and electrochemical platforms for bacteria detection and antimicrobial susceptibility testing.",
    href: "/research/amr",
    category: "Research",
    keywords: [
      "amr",
      "antimicrobial resistance",
      "bacteria",
      "pathogen",
      "ast",
      "antibiotic",
      "susceptibility",
      "bacteria on chip",
      "e coli",
      "escherichia coli",
    ],
  },

  /* ==========================================================
     PEOPLE
  ========================================================== */

  {
    id: "people",
    title: "People",
    description:
      "Meet the researchers and team members of SenSys Lab.",
    href: "/people",
    category: "People",
    keywords: [
      "people",
      "team",
      "researchers",
      "students",
      "postdoc",
      "postdoctoral",
      "principal investigator",
    ],
  },

  {
    id: "sanket-goel",
    title: "Prof. Sanket Goel",
    description:
      "Founder & Principal Investigator of SenSys Lab and Eddie Goldenberg Research Chair of Canada.",
    href: "/people/sanket-goel",
    category: "People",
    keywords: [
      "sanket",
      "sanket goel",
      "prof sanket goel",
      "prof goel",
      "goel",
      "principal investigator",
      "pi",
      "founder",
      "eddie goldenberg",
      "research chair",
      "canada impact plus",
      "microsystems",
      "microfluidics",
      "biosensors",
      "graphene",
      "laser induced graphene",
      "wearables",
      "point of care",
      "environmental sensing",
      "biofuel cell",
      "energy harvesting",
      "technology transfer",
    ],
  },

  {
    id: "ks-deepak",
    title: "K. S. Deepak",
    description:
      "Postdoctoral Researcher working on portable sensing, microfluidics, pesticide detection, wearable systems and multimodal analytical technologies.",
    href: "/people/ks-deepak",
    category: "People",
    keywords: [
      "deepak",
      "ks deepak",
      "k s deepak",
      "deepak ks",
      "postdoc",
      "postdoctoral researcher",
      "microfluidics",
      "pesticide",
      "pesticide detection",
      "pestisafe",
      "food safety",
      "wearable sensor",
      "lab on glove",
      "textile electrode",
      "optical sensing",
      "fluorescence",
      "chemiluminescence",
      "electrochemical sensing",
      "multimodal",
      "portable sensing",
      "portable diagnostics",
      "colorimetric",
      "soil nutrient",
      "cysteine",
      "tkx 50",
      "embedded systems",
      "sensome",
      "technology translation",
    ],
  },

  {
    id: "parvathy-nair",
    title: "Parvathy Nair",
    description:
      "Postdoctoral Researcher working on electrochemical biosensors, multiplexed biomarker detection, flexible electrodes and portable instrumentation.",
    href: "/people/parvathy-nair",
    category: "People",
    keywords: [
      "parvathy",
      "parvathy nair",
      "nair",
      "postdoc",
      "postdoctoral researcher",
      "electrochemical",
      "electrochemical biosensor",
      "biosensor",
      "microfluidics",
      "renal biomarkers",
      "renal",
      "cardiac biomarker",
      "ctni",
      "troponin",
      "myoglobin",
      "triglyceride",
      "biomarker detection",
      "multiplexed detection",
      "multiplexed electrochemical",
      "portable potentiostat",
      "potentiostat",
      "ubiopot",
      "µbiopot",
      "printed electrodes",
      "flexible electrodes",
      "interdigitated electrode",
      "3d printed electrode",
      "point of care",
      "portable instrumentation",
      "iot sensing",
    ],
  },

  /* ==========================================================
     OUTPUTS
  ========================================================== */

  {
    id: "publications",
    title: "Publications",
    description:
      "Browse the complete publication archive.",
    href: "/publications",
    category: "Outputs",
    keywords: [
      "publications",
      "publication",
      "papers",
      "paper",
      "journal",
      "articles",
      "doi",
      "research papers",
    ],
  },

  {
    id: "patents",
    title: "Patents",
    description:
      "Explore intellectual property and patented technologies.",
    href: "/patents",
    category: "Outputs",
    keywords: [
      "patent",
      "patents",
      "intellectual property",
      "ip",
      "innovation",
      "invention",
    ],
  },

  {
    id: "books",
    title: "Books",
    description:
      "Books and edited volumes associated with the research programme.",
    href: "/books",
    category: "Outputs",
    keywords: [
      "books",
      "book",
      "edited volume",
      "publication",
      "textbook",
    ],
  },

  /* ==========================================================
     FACILITIES
  ========================================================== */

  {
    id: "facilities",
    title: "Facilities & Infrastructure",
    description:
      "Research infrastructure being established for SenSys at the University of Manitoba.",
    href: "/facilities",
    category: "Facilities",
    keywords: [
      "facilities",
      "equipment",
      "infrastructure",
      "laboratory",
      "instrumentation",
      "fabrication",
      "lab equipment",
    ],
  },

  {
    id: "microfabrication-facilities",
    title: "Microfabrication & Additive Manufacturing",
    description:
      "Advanced fabrication, printing and rapid prototyping infrastructure.",
    href: "/facilities",
    category: "Facilities",
    keywords: [
      "3d printer",
      "direct ink writing",
      "diw",
      "screen printer",
      "direct laser writer",
      "sls",
      "sla",
      "laser",
      "fabrication",
      "microfabrication",
      "printing",
    ],
  },

  {
    id: "electrochemistry-facilities",
    title: "Electrochemical Instrumentation",
    description:
      "Advanced electrochemical measurement, impedance analysis and device characterization.",
    href: "/facilities",
    category: "Facilities",
    keywords: [
      "potentiostat",
      "biologic",
      "vmp 300",
      "vmp300",
      "eis",
      "impedance",
      "electrochemistry",
      "battery cycler",
      "electrochemical workstation",
    ],
  },

  {
    id: "microscopy-facilities",
    title: "Microscopy & Characterization",
    description:
      "Optical, fluorescence and advanced device-characterization infrastructure.",
    href: "/facilities",
    category: "Facilities",
    keywords: [
      "microscope",
      "optical microscope",
      "fluorescence microscope",
      "high speed camera",
      "characterization",
      "microscopy",
    ],
  },

  /* ==========================================================
     NEWS
  ========================================================== */

  {
    id: "news",
    title: "News & Impact",
    description:
      "Research news, awards, recognition and technology translation.",
    href: "/news",
    category: "News",
    keywords: [
      "news",
      "impact",
      "awards",
      "recognition",
      "media",
      "latest",
    ],
  },

  /* ==========================================================
     OPPORTUNITIES
  ========================================================== */

  {
    id: "join",
    title: "Join SenSys",
    description:
      "Explore research opportunities at SenSys Lab.",
    href: "/join",
    category: "Opportunities",
    keywords: [
      "join",
      "jobs",
      "vacancy",
      "positions",
      "phd",
      "msc",
      "postdoc",
      "students",
      "opportunities",
      "apply",
    ],
  },

  {
    id: "phd-opportunities",
    title: "Ph.D. Opportunities",
    description:
      "Doctoral research opportunities across SenSys research areas.",
    href: "/join",
    category: "Opportunities",
    keywords: [
      "phd",
      "doctoral",
      "graduate",
      "student",
      "funding",
      "position",
      "phd position",
      "phd vacancy",
    ],
  },

  {
    id: "msc-opportunities",
    title: "M.Sc. Opportunities",
    description:
      "Master's research opportunities across the SenSys programme.",
    href: "/join",
    category: "Opportunities",
    keywords: [
      "msc",
      "masters",
      "master",
      "graduate",
      "student",
      "funding",
      "msc position",
    ],
  },

  {
    id: "postdoctoral-opportunities",
    title: "Postdoctoral Opportunities",
    description:
      "Postdoctoral research opportunities across SenSys research areas.",
    href: "/join",
    category: "Opportunities",
    keywords: [
      "postdoc",
      "postdoctoral",
      "fellow",
      "researcher",
      "job",
      "position",
      "postdoctoral position",
    ],
  },
];

/* ============================================================
   DYNAMIC NEWS INDEX
============================================================ */

const dynamicNewsItems: SearchItem[] = newsItems.map(
  (item, index) => ({
    id: `news-${item.id || index}`,
    title: item.title,
    description: item.summary,
    href: item.href || "/news",
    category: "News",
    year: item.date,
    external:
      Boolean(item.href) &&
      item.href.startsWith("http"),
    keywords: [
      item.category,
      item.source || "",
      item.date,
      "news",
      "impact",
      "research",
      item.title,
      item.summary,
    ].filter(Boolean),
  })
);

/* ============================================================
   DYNAMIC PUBLICATION INDEX
============================================================ */

const dynamicPublicationItems: SearchItem[] =
  publications.map((publication, index) => {
    const raw =
      typeof publication === "object" &&
      publication !== null
        ? (publication as Record<string, unknown>)
        : {};

    const allText = getAllText(publication)
      .replace(/\s+/g, " ")
      .trim();

    const explicitTitle = getFirstString(raw, [
      "title",
      "name",
      "publicationTitle",
      "paperTitle",
    ]);

    const explicitText = getFirstString(raw, [
      "text",
      "citation",
      "reference",
      "description",
    ]);

    const year =
      getFirstString(raw, [
        "year",
        "publicationYear",
        "date",
      ]) ||
      allText.match(/\b(19|20)\d{2}\b/)?.[0] ||
      "";

    const journal = getFirstString(raw, [
      "journal",
      "venue",
      "publisher",
      "source",
    ]);

    const authors = getFirstString(raw, [
      "authors",
      "author",
    ]);

    const explicitDoi = getFirstString(raw, [
      "doi",
      "DOI",
      "url",
      "link",
      "href",
    ]);

    const doiFromText = extractDoi(allText);

    let doiUrl = "";

    if (
      explicitDoi.startsWith("http://") ||
      explicitDoi.startsWith("https://")
    ) {
      doiUrl = explicitDoi;
    } else if (explicitDoi) {
      const extracted =
        extractDoi(explicitDoi) || explicitDoi;

      if (extracted.startsWith("10.")) {
        doiUrl = makeDoiUrl(extracted);
      }
    } else if (doiFromText) {
      doiUrl = makeDoiUrl(doiFromText);
    }

    const title =
      explicitTitle ||
      compactDescription(
        explicitText || allText,
        150
      ) ||
      `Publication ${index + 1}`;

    const descriptionParts = [
      journal,
      year,
      authors,
    ].filter(Boolean);

    const description =
      descriptionParts.length > 0
        ? descriptionParts.join(" · ")
        : compactDescription(
            explicitText || allText,
            170
          );

    const topicKeywords = [
      "publication",
      "paper",
      "research",
      journal,
      authors,
      year,
      explicitText,
      allText,
    ].filter(Boolean);

    return {
      id: `publication-${index}`,
      title,
      description,
      href: doiUrl || "/publications",
      category: "Publication",
      year,
      external: Boolean(doiUrl),
      keywords: topicKeywords,
    };
  });

/* ============================================================
   GLOBAL INDEX
============================================================ */

export const searchIndex: SearchItem[] = [
  ...staticSearchItems,
  ...dynamicNewsItems,
  ...dynamicPublicationItems,
];