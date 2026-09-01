import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import BackToTop from "../components/BackToTop";
import ScrollProgress from "../components/ScrollProgress";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sensys-lab.vercel.app"),

  title: {
    default: "SenSys Lab | University of Manitoba",
    template: "%s | SenSys Lab",
  },

  description:
    "SenSys Lab at the University of Manitoba develops intelligent sensing systems integrating microsystems, microfluidics, advanced materials, electronics, wearable technologies, environmental sensing, and artificial intelligence.",

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
  ],

  authors: [
    {
      name: "SenSys Lab",
    },
  ],

  creator: "SenSys Lab",
  publisher: "SenSys Lab",

  openGraph: {
    title: "SenSys Lab | University of Manitoba",
    description:
      "Intelligent sensing systems for healthcare, agriculture, food safety, environmental monitoring, and emerging cyber-physical applications.",
    url: "https://sensys-lab.vercel.app",
    siteName: "SenSys Lab",
    locale: "en_CA",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SenSys Lab | University of Manitoba",
    description:
      "Intelligent sensing systems integrating microsystems, microfluidics, advanced materials, electronics, and AI.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Prevents a light-theme flash before React hydrates */}
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
        <div id="main-content" className="min-h-screen">
          {children}
        </div>

        {/* GLOBAL BACK TO TOP */}
        <BackToTop />
      </body>
    </html>
  );
}