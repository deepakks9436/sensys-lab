"use client";

import Link from "next/link";
import { useState } from "react";

const stories = [
  {
    number: "01",
    title: "PestiSafe",
    subtitle: "Portable pesticide sensing beyond the laboratory",
    description:
      "PestiSafe represents a family of portable sensing technologies designed for rapid pesticide monitoring using integrated optical, electrochemical, microfluidic, and intelligent analytical approaches.",
    tags: [
      "Pesticide Detection",
      "Food Safety",
      "Microfluidics",
      "Optical Sensing",
      "Electrochemical Sensing",
    ],
    accent: "#F2A900",
    accentSoft: "rgba(242,169,0,0.18)",
    visualLabel: "Food Safety · Field Diagnostics",
    href: "/research#agri-environment",
  },
  {
    number: "02",
    title: "Laser-Induced Graphene Platforms",
    subtitle: "Programmable carbon architectures for sensing and energy",
    description:
      "We explore laser-induced graphene as a versatile materials platform for electrochemical sensing, flexible devices, functional electrodes, energy storage, and emerging microfabricated systems.",
    tags: [
      "Laser-Induced Graphene",
      "Flexible Electronics",
      "Electrochemical Sensors",
      "Energy Devices",
      "Functional Materials",
    ],
    accent: "#00A3E0",
    accentSoft: "rgba(0,163,224,0.18)",
    visualLabel: "Advanced Materials · Flexible Systems",
    href: "/research#intelligent-microsystems",
  },
  {
    number: "03",
    title: "Portable Electrochemical Instrumentation",
    subtitle: "Compact electronics for connected point-of-care sensing",
    description:
      "We develop portable electrochemical instrumentation that integrates sensing interfaces, signal acquisition, embedded electronics, data processing, wireless connectivity, and user-facing interfaces into deployable diagnostic systems.",
    tags: [
      "Portable Potentiostats",
      "Electrochemistry",
      "Embedded Systems",
      "Point-of-Care",
      "Connected Diagnostics",
    ],
    accent: "#385E9D",
    accentSoft: "rgba(56,94,157,0.20)",
    visualLabel: "Instrumentation · Intelligent Diagnostics",
    href: "/research#intelligent-diagnostics",
  },
  {
    number: "04",
    title: "Water Quality Technologies",
    subtitle: "Connected sensing for environmental intelligence",
    description:
      "Our water-quality platforms combine chemical sensing, ion-selective measurements, portable instrumentation, compensation strategies, and connected data systems for rapid multiparameter environmental monitoring.",
    tags: [
      "Water Quality",
      "Ion-Selective Sensors",
      "IoT",
      "Environmental Monitoring",
      "Multiparameter Sensing",
    ],
    accent: "#00A3E0",
    accentSoft: "rgba(0,163,224,0.16)",
    visualLabel: "Environment · Connected Sensing",
    href: "/research#agri-environment",
  },
];

export default function FeaturedResearch() {
  const [active, setActive] = useState(0);

  const story = stories[active];

  const previous = () => {
    setActive((current) =>
      current === 0 ? stories.length - 1 : current - 1
    );
  };

  const next = () => {
    setActive((current) =>
      current === stories.length - 1 ? 0 : current + 1
    );
  };

  return (
    <section className="bg-[#f5f2ea] px-8 py-24 text-black md:px-16 md:py-32">
      <div className="mx-auto max-w-7xl">
        
        {/* HEADER */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-neutral-500">
              Featured Research
            </p>

            <h2 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
              Technologies designed to move from concept to deployment.
            </h2>
          </div>

          <Link
            href="/research"
            className="w-fit border-b border-black pb-1 text-sm font-medium transition hover:text-[#385E9D]"
          >
            Explore all research →
          </Link>
        </div>

        {/* STORY MODULE */}
        <div className="mt-16 overflow-hidden border border-neutral-300 bg-white">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            
            {/* VISUAL SIDE */}
            <div className="relative min-h-[540px] overflow-hidden bg-[#090909]">
              
              {/* BACKGROUND */}
              <div
                className="absolute inset-0 transition-colors duration-500"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${story.accentSoft}, transparent 32%), radial-gradient(circle at 75% 70%, rgba(255,255,255,0.08), transparent 32%), #090909`,
                }}
              />

              {/* ABSTRACT SYSTEM GRAPHIC */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-[300px] w-[300px]">
                  
                  <div
                    className="absolute inset-0 rounded-full border transition-colors duration-500"
                    style={{
                      borderColor: `${story.accent}55`,
                    }}
                  />

                  <div
                    className="absolute left-1/2 top-1/2 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-colors duration-500"
                    style={{
                      borderColor: `${story.accent}88`,
                    }}
                  />

                  <div
                    className="absolute left-1/2 top-1/2 h-[115px] w-[115px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-500"
                    style={{
                      backgroundColor: story.accentSoft,
                      boxShadow: `0 0 80px ${story.accentSoft}`,
                    }}
                  />

                  <div
                    className="absolute left-1/2 top-[-5px] h-3 w-3 -translate-x-1/2 rounded-full transition-colors duration-500"
                    style={{
                      backgroundColor: story.accent,
                    }}
                  />

                  <div
                    className="absolute bottom-[16%] right-[5%] h-2.5 w-2.5 rounded-full transition-colors duration-500"
                    style={{
                      backgroundColor: story.accent,
                    }}
                  />

                  <div
                    className="absolute left-[10%] top-[35%] h-2 w-2 rounded-full transition-colors duration-500"
                    style={{
                      backgroundColor: story.accent,
                    }}
                  />

                  <div
                    className="absolute right-[18%] top-[18%] h-px w-20 rotate-45 transition-colors duration-500"
                    style={{
                      backgroundColor: `${story.accent}66`,
                    }}
                  />

                  <div
                    className="absolute bottom-[18%] left-[15%] h-px w-24 -rotate-45 transition-colors duration-500"
                    style={{
                      backgroundColor: `${story.accent}66`,
                    }}
                  />
                </div>
              </div>

              {/* COUNTER */}
              <div className="absolute left-8 top-8 flex items-center gap-3">
                <span
                  className="text-sm font-medium"
                  style={{
                    color: story.accent,
                  }}
                >
                  {story.number}
                </span>

                <span className="text-sm text-neutral-600">/ 04</span>
              </div>

              {/* VISUAL LABEL */}
              <div className="absolute bottom-8 left-8 right-8">
                <p
                  className="text-xs uppercase tracking-[0.3em]"
                  style={{
                    color: story.accent,
                  }}
                >
                  {story.visualLabel}
                </p>
              </div>
            </div>

            {/* CONTENT SIDE */}
            <div className="flex min-h-[540px] flex-col justify-between p-8 md:p-12 lg:p-14">
              <div>
                <p
                  className="text-xs uppercase tracking-[0.3em]"
                  style={{
                    color: story.accent,
                  }}
                >
                  Featured Story {story.number}
                </p>

                <h3 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
                  {story.title}
                </h3>

                <p className="mt-5 max-w-xl text-lg font-medium leading-8 text-neutral-700">
                  {story.subtitle}
                </p>

                <p className="mt-7 max-w-xl text-base leading-8 text-neutral-600">
                  {story.description}
                </p>

                <div className="mt-9 flex flex-wrap gap-2">
                  {story.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-neutral-300 px-4 py-2 text-xs text-neutral-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-12">
                <Link
                  href={story.href}
                  className="inline-flex items-center gap-3 border-b border-black pb-1 text-sm font-medium transition hover:text-[#385E9D]"
                >
                  Explore this research
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* CONTROLS */}
          <div className="flex flex-col border-t border-neutral-300 md:flex-row md:items-center md:justify-between">
            
            {/* STORY SELECTORS */}
            <div className="grid flex-1 grid-cols-2 md:grid-cols-4">
              {stories.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`border-b border-neutral-300 px-5 py-5 text-left transition md:border-b-0 md:border-r ${
                    active === index
                      ? "bg-[#090909] text-white"
                      : "bg-white text-neutral-500 hover:bg-neutral-100"
                  }`}
                >
                  <span
                    className="text-[10px] tracking-[0.25em]"
                    style={{
                      color:
                        active === index
                          ? item.accent
                          : "rgb(115 115 115)",
                    }}
                  >
                    {item.number}
                  </span>

                  <p className="mt-2 text-xs font-medium leading-5">
                    {item.title}
                  </p>
                </button>
              ))}
            </div>

            {/* ARROWS */}
            <div className="flex">
              <button
                type="button"
                onClick={previous}
                aria-label="Previous featured research story"
                className="flex h-16 w-16 items-center justify-center border-l border-neutral-300 text-xl transition hover:bg-[#F2A900]"
              >
                ←
              </button>

              <button
                type="button"
                onClick={next}
                aria-label="Next featured research story"
                className="flex h-16 w-16 items-center justify-center border-l border-neutral-300 text-xl transition hover:bg-[#F2A900]"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}