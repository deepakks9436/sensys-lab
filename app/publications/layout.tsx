import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Publications | SenSys Lab | University of Manitoba",
  },
  description:
    "Explore SenSys Lab scholarly publications across microfluidics, biosensors, electrochemistry, graphene, flexible devices, intelligent diagnostics, environmental sensing, optical systems, and energy technologies.",
  alternates: {
    canonical: "https://sensys.ca/publications",
  },
  openGraph: {
    title: "Publications | SenSys Lab | University of Manitoba",
    description:
      "Browse the scholarly publication archive associated with SenSys Lab research foundations.",
    url: "https://sensys.ca/publications",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "SenSys Lab Publications",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Publications | SenSys Lab | University of Manitoba",
    description:
      "Scholarly publications spanning sensing, microfluidics, diagnostics, graphene, environmental technologies, and more.",
    images: ["/opengraph-image.png"],
  },
};

export default function PublicationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
