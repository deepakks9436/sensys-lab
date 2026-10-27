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
    id: "optica-fellow-2027",
    date: "October 23, 2026",
    dateISO: "2026-10-23",
    category: "Award & Recognition",
    title: "Prof. Sanket Goel elected Optica Fellow for 2027",
    summary:
      "Prof. Sanket Goel was elected to the 2027 class of Optica Fellows for pioneering contributions to optofluidic and micro/nano-engineered sensing platforms enabling point-of-care diagnostics, wearable devices, and translational biophotonic technologies.",
    href:
      "https://www.optica.org/get_involved/awards_and_honors/fellow_members/elected_fellows/2027_fellows/",
    source: "Optica",
  },

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
    id: "cooling-free-infrared-sensor-2026",
    date: "July 30, 2026",
    dateISO: "2026-07-30",
    category: "Advanced Sensing",
    title: "Cooling-free infrared breakthrough enables compact room-temperature sensing",
    summary:
      "Researchers developed a room-temperature infrared sensor based on single-walled carbon nanotubes and zinc oxide nanoparticles, eliminating the need for bulky cryogenic cooling while enabling compact, low-power infrared detection.",
    href:
      "https://www.newindianexpress.com/cities/hyderabad/2026/Jul/30/cooling-free-infrared-breakthrough",
    source: "The New Indian Express",
  },

  {
    id: "pestisafe-dual-mode-pesticide-2026",
    date: "June 17, 2026",
    dateISO: "2026-06-17",
    category: "Agri & Environmental Intelligence",
    title: "PestiSafe brings dual-mode pesticide testing to the point of need",
    summary:
      "The portable PestiSafe platform combines two independent optical sensing modes, smartphone connectivity, and chemometric analysis for rapid pesticide detection and cross-validated field measurements in food, water, and agricultural samples.",
    href:
      "https://www.deccanchronicle.com/southern-states/telangana/bits-develops-low-cost-device-for-on-site-pesticide-testing-1964092",
    source: "Deccan Chronicle",
  },

  {
    id: "portable-liver-diagnostic-2026",
    date: "May 29, 2026",
    dateISO: "2026-05-29",
    category: "Point-of-Care Diagnostics",
    title: "Pocket-sized device detects liver-health biomarkers in under three minutes",
    summary:
      "A portable electrochemical platform was developed for rapid bilirubin measurement using a small serum sample, integrating disposable sensing, onboard electronics, wireless data transmission, and smartphone connectivity for decentralized liver-health testing.",
    href:
      "https://timesofindia.indiatimes.com/city/hyderabad/pocket-sized-device-detects-liver-issues-in-under-three-minutes/articleshow/131376816.cms",
    source: "The Times of India",
  },

  {
    id: "dual-diabetes-sensor-2026",
    date: "May 20, 2026",
    dateISO: "2026-05-20",
    category: "Intelligent Diagnostics",
    title: "Dual sensor enables simultaneous insulin and dopamine monitoring",
    summary:
      "A miniature plug-and-play electrochemical sensor was developed for simultaneous real-time monitoring of insulin and dopamine using titanium-dioxide nanofibres on carbon-cloth electrodes, supporting integrated metabolic monitoring.",
    href:
      "https://timesofindia.indiatimes.com/city/hyderabad/bits-hyderabad-team-develops-dual-sensor-for-diabetes-monitoring/articleshow/131217383.cms",
    source: "The Times of India",
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
    id: "phosphorus-doped-graphene-supercapacitor-2026",
    date: "May 19, 2026",
    dateISO: "2026-05-19",
    category: "Energy Microsystems",
    title: "Phosphorus-doped graphene electrode improves supercapacitor performance",
    summary:
      "Researchers developed phosphorus-doped laser-induced graphene electrodes with enhanced conductivity and electrochemical performance, offering a scalable route toward compact, flexible, and high-performance energy-storage systems.",
    href:
      "https://www.thehindu.com/sci-tech/science/bits-pilani-hyderabad-researchers-develop-graphene-electrode-for-improved-supercapacitor-performance/article70997258.ece",
    source: "The Hindu",
  },

  {
    id: "portable-water-quality-platforms-2026",
    date: "March 31, 2026",
    dateISO: "2026-03-31",
    category: "Agri & Environmental Intelligence",
    title: "Portable platforms bring rapid water-quality testing to the field",
    summary:
      "Portable sensing systems were developed for rapid on-site water-quality assessment, including simultaneous measurement of nitrate, ammonium, and chloride with smartphone or cloud connectivity and automatic temperature compensation.",
    href:
      "https://www.deccanchronicle.com/southern-states/telangana/bits-develops-portable-water-testing-devices-1947684",
    source: "Deccan Chronicle",
  },

  {
    id: "photocatalytic-fuel-cell-2025",
    date: "December 13, 2025",
    dateISO: "2025-12-13",
    category: "Energy Microsystems",
    title: "Low-cost photocatalytic fuel cell targets self-powered IoT devices",
    summary:
      "A portable membrane-less photocatalytic fuel cell was developed using carbon-cloth electrodes and sunlight-driven power generation, targeting low-energy IoT nodes and autonomous sensing applications.",
    href:
      "https://www.thehindu.com/news/national/telangana/bits-pilani-hyd-researchers-develop-70-photocatalytic-fuel-cell-for-self-powered-iot-devices/article70384636.ece",
    source: "The Hindu",
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
    date: "September 6, 2025",
    dateISO: "2025-09-06",
    category: "Award & Recognition",
    title: "Prof. Sanket Goel honoured with National Award to Teachers 2025",
    summary:
      "Prof. Sanket Goel was conferred the National Award to Teachers 2025 for excellence in teaching, research, innovation, and academic leadership, with the award presented by the President of India.",
    href:
      "https://telanganatoday.com/prof-sanket-goel-of-bits-pilani-honoured-with-national-award-to-teachers-2025",
    source: "Telangana Today",
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
    id: "edible-conductive-paste-2025",
    date: "June 6, 2025",
    dateISO: "2025-06-06",
    category: "Biointegrated Systems",
    title: "Edible eco-friendly conductive paste advances sustainable bioelectronics",
    summary:
      "Researchers developed a food-based nanoconductive paste as a non-toxic and biodegradable alternative to conventional electronic pastes, with potential use in wearable, ingestible, and edible medical devices.",
    href:
      "https://timesofindia.indiatimes.com/city/hyderabad/bits-pilani-researchers-develop-edible-eco-friendly-paste-for-bioelectronics/articleshow/121657017.cms",
    source: "The Times of India",
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

  {
    id: "flexible-energy-storage-wearables-2024",
    date: "October 30, 2024",
    dateISO: "2024-10-30",
    category: "Energy Microsystems",
    title: "Flexible graphene supercapacitors advance wearable energy storage",
    summary:
      "Flexible graphene-based supercapacitors were developed using laser-induced graphene on polyamide and laser-induced reduced graphene oxide on paper, demonstrating scalable and mechanically adaptable energy storage for wearable electronics.",
    href:
      "https://www.deccanchronicle.com/news/hyderabad-bits-pilani-unveils-energy-storage-for-wearables-1834489",
    source: "Deccan Chronicle",
  },

  {
    id: "portable-pesticide-device-2024",
    date: "December 12, 2024",
    dateISO: "2024-12-12",
    category: "Agri & Environmental Intelligence",
    title: "Portable device enables rapid pesticide-residue screening",
    summary:
      "A portable sensing platform was developed for rapid on-site detection of organophosphorus pesticide residues in produce-washing water and environmental samples, supporting low-cost and field-deployable food-safety monitoring.",
    href:
      "https://timesofindia.indiatimes.com/city/hyderabad/revolutionary-device-by-bits-pilani-hyderabad-rapidly-detects-pesticide-residues-in-food/articleshow/116223647.cms",
    source: "The Times of India",
  },

  {
    id: "sensor-integrated-face-mask-2023",
    date: "May 2023",
    dateISO: "2023-05-09",
    category: "Biointegrated Systems",
    title: "Sensor-integrated face mask enables real-time respiratory monitoring",
    summary:
      "Researchers developed a stretchable Kirigami-based laser-induced graphene sensor designed for integration with surgical masks, enabling real-time monitoring of respiratory and physiological parameters.",
    href:
      "https://www.thehindu.com/news/national/telangana/face-mask-with-sensor-to-check-for-illness-developed-by-bits-pilani-hyderabad-researchers/article66829792.ece",
    source: "The Hindu",
  },
];

export const sortedNewsItems = [...newsItems].sort(
  (a, b) =>
    new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
);

export const featuredNews =
  sortedNewsItems.find((item) => item.featured) ?? sortedNewsItems[0];

export const latestNews = sortedNewsItems.slice(0, 3);