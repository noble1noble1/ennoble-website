"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "We talk. You tell us what's broken. 30 minutes. No charge.",
  },
  {
    number: "02",
    title: "Audit",
    description: "We dig in. Website, ad spend, sales process, tech stack.",
  },
  {
    number: "03",
    title: "Build",
    description: "Custom systems for your stack, your team, your workflows.",
  },
  {
    number: "04",
    title: "Train",
    description: "Skill transfer, not demos. Role-specific, challenge-based.",
  },
  {
    number: "05",
    title: "Optimize",
    description: "We don't disappear. Monthly check-ins, ongoing support.",
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      const words = headingRef.current?.querySelectorAll(".word-inner");
      if (words) {
        gsap.fromTo(
          words,
          { y: "100%" },
          {
            y: "0%",
            duration: 0.7,
            stagger: 0.035,
            ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Steps animate sequentially
      const stepEls = sectionRef.current?.querySelectorAll(".process-step");
      if (stepEls) {
        stepEls.forEach((step, i) => {
          // Line grows
          const line = step.querySelector(".step-line");
          if (line) {
            gsap.fromTo(
              line,
              { scaleX: 0 },
              {
                scaleX: 1,
                duration: 0.6,
                ease: "power2.inOut",
                scrollTrigger: {
                  trigger: step,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
              }
            );
          }

          // Content reveals
          gsap.fromTo(
            step.querySelector(".step-content"),
            { opacity: 0, x: 30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: step,
                start: "top 80%",
                toggleActions: "play none none none",
              },
              delay: 0.2,
            }
          );

          // Number reveals
          gsap.fromTo(
            step.querySelector(".step-number"),
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: step,
                start: "top 80%",
                toggleActions: "play none none none",
              },
              delay: 0.1 * i,
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 lg:py-40 bg-bg-secondary"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <h2
          ref={headingRef}
          className="font-satoshi font-black text-[clamp(2rem,5vw,4rem)] leading-[1.1] tracking-[-0.03em] text-text-primary mb-16 md:mb-20"
        >
          {"How We Work".split(" ").map((word, i) => (
            <span key={i} className="word-clip mr-[0.22em]">
              <span className="word-inner">{word}</span>
            </span>
          ))}
        </h2>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <div
              key={i}
              className="process-step py-8 md:py-10 border-b border-text-tertiary/10 last:border-b-0"
            >
              <div className="step-line origin-left h-px bg-text-tertiary/20 mb-8 scale-x-0" />
              <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                <span className="step-number font-jetbrains text-sm text-text-tertiary opacity-0 md:w-16 flex-shrink-0">
                  {step.number}
                </span>
                <div className="step-content opacity-0 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 flex-1">
                  <h3 className="font-satoshi font-bold text-xl md:text-2xl text-text-primary tracking-[-0.02em] md:w-48 flex-shrink-0">
                    {step.title}
                  </h3>
                  <p className="font-inter text-sm md:text-base text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
