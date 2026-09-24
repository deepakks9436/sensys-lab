import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";

import BackToTop from "../components/BackToTop";
import ScrollProgress from "../components/ScrollProgress";

import "./globals.css";

/* ============================================================
   TYPOGRAPHY
============================================================ */

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: [
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* ============================================================
   SITE METADATA
============================================================ */

export const metadata: Metadata = {
  metadataBase: new URL("https://sensys.ca"),

  title: {
    default: "SenSys Lab | University of Manitoba",
    template: "%s | SenSys Lab",
  },

  description:
    "SenSys Lab at the University of Manitoba develops intelligent sensing systems for healthcare, agriculture, food safety, environmental monitoring, and emerging cyber-physical applications.",

  keywords: [
    "SenSys Lab",
    "University of Manitoba",
    "Intelligent Sensing Systems",
    "Microfluidics",
    "Biosensors",
    "Wearable Sensors",
    "Electrochemical Sensing",
    "Optical Sensing",
    "Laser-Induced Graphene",
    "Point-of-Care Diagnostics",
    "Environmental Monitoring",
    "Water Quality",
    "Pesticide Detection",
    "Artificial Intelligence",
    "One Health",
  ],

  authors: [
    {
      name: "SenSys Lab",
    },
  ],

  creator: "SenSys Lab",
  publisher: "SenSys Lab",

  alternates: {
    canonical: "https://sensys.ca",
  },

  openGraph: {
    title: "SenSys Lab | University of Manitoba",

    description:
      "Intelligent sensing systems for healthcare, agriculture, food safety, environmental monitoring, and emerging cyber-physical applications.",

    url: "https://sensys.ca",

    siteName: "SenSys Lab",

    locale: "en_CA",

    type: "website",

    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "SenSys Lab at the University of Manitoba",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "SenSys Lab | University of Manitoba",

    description:
      "Intelligent sensing systems for healthcare, agriculture, food safety, environmental monitoring, and emerging cyber-physical applications.",

    images: ["/opengraph-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

/* ============================================================
   THEME INITIALIZATION
============================================================ */

const themeScript = `
(function () {
  try {
    var savedTheme = localStorage.getItem("sensys-theme");

    var theme = savedTheme;

    if (theme !== "light" && theme !== "dark") {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    document.documentElement.setAttribute("data-theme", theme);
  } catch (error) {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();
`;

/* ============================================================
   ROOT LAYOUT
============================================================ */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${roboto.variable} ${robotoMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeScript,
          }}
        />
      </head>

      <body className="min-h-full">
        {/* ACCESSIBILITY */}

        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[200] -translate-y-24 rounded-full bg-[#385E9D] px-5 py-3 text-sm font-semibold text-white shadow-lg transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>

        {/* GLOBAL SCROLL PROGRESS */}

        <ScrollProgress />

        {/* PAGE CONTENT */}

        <div
          id="main-content"
          className="min-h-screen"
        >
          {children}
        </div>

        {/* GLOBAL BACK TO TOP */}

        <BackToTop />
      </body>
    </html>
  );
}