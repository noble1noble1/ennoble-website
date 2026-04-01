"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "$9K", label: "in wasted ad spend identified in one audit" },
  { value: "2 weeks", label: "from zero to live website for a $100M manufacturer" },
  { value: "15 people", label: "trained on AI adoption in one organization" },
  { value: "D+ → A", label: "website grade improvement after rebuild" },
  { value: "12", label: "AI systems designed for one sales operation" },
];

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll(".stat-item");
      if (!items) return;

      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: i * 0.1,
          }
        );

        // Animate the number with a counting/reveal effect
        const valueEl = item.querySelector(".stat-value");
        if (valueEl) {
          gsap.fromTo(
            valueEl,
            { scale: 0.8, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              ease: "back.out(1.5)",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none none",
              },
              delay: i * 0.1 + 0.2,
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item opacity-0 text-center lg:text-left">
              <div className="stat-value font-jetbrains font-medium text-[clamp(2rem,4vw,3rem)] text-text-primary mb-3 tracking-[-0.02em]">
                {stat.value}
              </div>
              <p className="font-inter text-sm text-text-secondary leading-relaxed">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
