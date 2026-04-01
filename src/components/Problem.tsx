"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const bodyParagraphs = [
  "They buy a ChatGPT subscription. Someone watches a YouTube video. A consultant flies in, does a 3-day kickoff with impressive demos, and leaves. Nobody knows what to actually do on Monday morning.",
  "The tools aren't the problem. The approach is.",
  "AI doesn't fix bad processes. It accelerates them. If your sales pipeline leaks, AI will help you leak faster. If your team wastes 10 hours a week on reports nobody reads, AI will generate those useless reports in 10 minutes.",
  "You don't need more tools. You need someone who understands your business, finds where AI actually moves the needle, and builds the systems that do it.",
];

export function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading text clip reveal
      const headingLines = headingRef.current?.querySelectorAll(".word-inner");
      if (headingLines) {
        gsap.fromTo(
          headingLines,
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

      // Horizontal scrolling text (Dennis signature)
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          x: "-50%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.3,
          },
        });
      }

      // Body paragraphs fade in with stagger
      const paragraphs = bodyRef.current?.querySelectorAll(".body-paragraph");
      if (paragraphs) {
        gsap.fromTo(
          paragraphs,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bodyRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headlineText = "Most businesses bolt AI onto broken processes.";

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Horizontal scrolling large text — Dennis style */}
      <div className="mb-16 md:mb-24 overflow-hidden">
        <div
          ref={marqueeRef}
          className="horizontal-scroll-text font-satoshi font-black text-[clamp(4rem,15vw,12rem)] leading-none tracking-[-0.04em] text-text-primary/[0.04] uppercase select-none gpu"
        >
          AI DOESN&apos;T FIX BAD PROCESSES&nbsp;&nbsp;•&nbsp;&nbsp;AI DOESN&apos;T FIX BAD PROCESSES&nbsp;&nbsp;•&nbsp;&nbsp;AI DOESN&apos;T FIX BAD PROCESSES&nbsp;&nbsp;•&nbsp;&nbsp;
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <h2
          ref={headingRef}
          className="font-satoshi font-black text-[clamp(2rem,5vw,4rem)] leading-[1.1] tracking-[-0.03em] text-text-primary mb-12 md:mb-16 max-w-4xl"
        >
          {headlineText.split(" ").map((word, i) => (
            <span key={i} className="word-clip mr-[0.22em]">
              <span className="word-inner">{word}</span>
            </span>
          ))}
        </h2>

        <div ref={bodyRef} className="max-w-2xl space-y-6">
          {bodyParagraphs.map((p, i) => (
            <p
              key={i}
              className={`body-paragraph font-inter text-base md:text-lg leading-relaxed opacity-0 ${
                i === 1
                  ? "text-text-primary font-medium text-lg md:text-xl"
                  : "text-text-secondary"
              }`}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
