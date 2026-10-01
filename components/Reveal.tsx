"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  // Visible by default so content never disappears from SSR,
  // no-JS browsing, screenshots, or an observer failure.
  const [visible, setVisible] = useState(true);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const rect = element.getBoundingClientRect();
    const alreadyVisible =
      rect.top < window.innerHeight * 0.92 && rect.bottom > 0;

    // Keep above-the-fold content visible immediately.
    if (alreadyVisible) {
      setVisible(true);
      return;
    }

    // Only below-the-fold content gets progressive reveal animation.
    setEnhanced(true);
    setVisible(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -35px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const hiddenTransform =
    direction === "up"
      ? "translate-y-6"
      : direction === "left"
        ? "-translate-x-6"
        : direction === "right"
          ? "translate-x-6"
          : "";

  const motionClass = enhanced
    ? `transition-all duration-700 ease-out ${
        visible
          ? "translate-x-0 translate-y-0 opacity-100"
          : `${hiddenTransform} opacity-0`
      }`
    : "opacity-100";

  return (
    <div
      ref={ref}
      className={`${className} ${motionClass}`}
      style={{
        transitionDelay: enhanced ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}
