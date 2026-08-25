import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}