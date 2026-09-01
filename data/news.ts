export type NewsItem = {
  id: string;
  date: string;
  dateISO: string;
  category: string;
  title: string;
  summary: string;
  image?: string;
  href: string;
  source?: string;
  featured?: boolean;
};

export const newsItems: NewsItem[] = [
  {
    id: "um-impact-plus-chairs-2026",
    date: "August 27, 2026",
    dateISO: "2026-08-27",
    category: "University of Manitoba",
    title: "$79 million investment brings global researchers to Manitoba",
    summary:
      "Prof. Sanket Goel joins the University of Manitoba as Eddie Goldenberg Research Chair in Translating Cyber Physical Sensory Systems to Reimagine Health and Prosperity.",
    image: "/news/um-impact-plus-chairs.webp",
    href:
      "https://umtoday.ca/stories/79-million-dollar-investment-brings-global-researchers-manitoba",
    source: "UM Today",
    featured: true,
  },

  {
    id: "ai-assisted-lab-on-chip-2026",
    date: "May 20, 2026",
    dateISO: "2026-05-20",
    category: "Research in the Media",
    title:
      "AI-assisted fabrication could accelerate lab-on-chip development",
    summary:
      "Machine-learning models were used to predict and optimize laser-fabricated microchannel geometries, reducing trial-and-error in the development of miniaturized diagnostic devices.",
    href:
      "https://www.deccanchronicle.com/southern-states/telangana/bits-uses-ai-to-improve-medical-testing-chip-production-1957882",
    source: "Deccan Chronicle",
  },

  {
    id: "ieee-technologist-year-2025",
    date: "2025",
    dateISO: "2025-12-01",
    category: "Award & Recognition",
    title: "IEEE India Council Technologist of the Year 2025",
    summary:
      "Prof. Sanket Goel was recognized with the IEEE India Council Technologist of the Year Award 2025 for contributions to technology development and engineering innovation.",
    href:
      "https://ieeeindiacouncil.org/wp-content/uploads/sites/149/2025/12/IC_Awardees_2025.pdf",
    source: "IEEE India Council",
  },

  {
    id: "national-award-teachers-2025",
    date: "September 2025",
    dateISO: "2025-09-05",
    category: "Award & Recognition",
    title: "National Award for Teachers 2025",
    summary:
      "Prof. Sanket Goel was among the higher-education faculty members recognized nationally for excellence in teaching, research, innovation, and academic leadership.",
    href: "https://www.education.gov.in/",
    source: "Ministry of Education, Government of India",
  },

  {
    id: "portable-multiplexed-platform-2025",
    date: "2025",
    dateISO: "2025-08-01",
    category: "Technology Translation",
    title:
      "Portable multiplexed electrochemical platform moves diagnostics closer to the field",
    summary:
      "A compact, low-cost electrochemical platform was demonstrated for rapid measurement across healthcare, water, soil, and other sensing applications using flexible electrodes and wireless readout.",
    href:
      "https://www.deccanchronicle.com/southern-states/telangana/bits-team-builds-affordable-testing-device-1910420",
    source: "Deccan Chronicle",
  },

  {
    id: "wearable-diabetes-monitoring-2025",
    date: "2025",
    dateISO: "2025-06-01",
    category: "Healthcare Technology",
    title:
      "Wearable platform advances non-invasive monitoring of diabetes complications",
    summary:
      "A smartwatch-style wearable platform was reported for continuous analysis of multiple biomarkers using sweat, supporting painless and lower-cost approaches to diabetes-related monitoring.",
    href:
      "https://www.deccanchronicle.com/southern-states/telangana/bits-smartwatch-based-wearable-offers-painless-diabetes-complication-tracking-1894088",
    source: "Deccan Chronicle",
  },

  {
    id: "smartphone-diabetes-platform-2025",
    date: "January 12, 2025",
    dateISO: "2025-01-12",
    category: "Point-of-Care Diagnostics",
    title:
      "Affordable smartphone-connected platform demonstrated for diabetes testing",
    summary:
      "A handheld platform integrating sensing, machine learning, and smartphone connectivity was reported for monitoring glucose, lactate, and other clinically relevant biomarkers.",
    href:
      "https://www.deccanchronicle.com/southern-states/telangana/hyderabad-researchers-develop-affordable-diabetes-testing-device-1853802",
    source: "Deccan Chronicle",
  },
];

/*
  Automatically sort stories from newest to oldest.
*/
export const sortedNewsItems = [...newsItems].sort(
  (a, b) =>
    new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
);

/*
  Featured homepage / News page story.
  If no item has featured: true, the newest story is used.
*/
export const featuredNews =
  sortedNewsItems.find((item) => item.featured) ?? sortedNewsItems[0];

/*
  Useful anywhere we want only the latest three stories.
*/
export const latestNews = sortedNewsItems.slice(0, 3);