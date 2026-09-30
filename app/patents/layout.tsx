import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Patents & Innovation | SenSys Lab | University of Manitoba" },
  description: "Explore the intellectual-property portfolio informing SenSys Lab, spanning sensors, microfluidics, electrochemical systems, graphene and advanced materials, environmental sensing, pathogen diagnostics, point-of-care technologies, wearable systems, instrumentation, and energy devices.",
  alternates: { canonical: "https://sensys.ca/patents" },
  openGraph: {
    title: "Patents & Innovation | SenSys Lab | University of Manitoba",
    description: "Intellectual property spanning sensors, microfluidics, graphene, diagnostics, environmental technologies, wearable systems, instrumentation, and energy devices.",
    url: "https://sensys.ca/patents",
    type: "website",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "SenSys Lab Patents and Innovation" }],
  },
  twitter: { card: "summary_large_image", title: "Patents & Innovation | SenSys Lab", description: "Intellectual property and translational engineering across sensing, diagnostics, materials, microfluidics, and energy systems.", images: ["/opengraph-image.png"] },
};

export default function PatentsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
