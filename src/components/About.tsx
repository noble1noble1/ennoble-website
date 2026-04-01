"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const paragraphs = [
  "I've worked in ad sales at 300 Entertainment, helped launch products at io.net, and managed a $1M+ art operation for Yung Jake. I've organized events for 1,500 people, closed enterprise deals, and built products from scratch.",
  "Now I help businesses figure out what AI actually does for them. Not with demos or decks. With audits, builds, training, and ongoing support.",
  "I use AI to do the work of a full team. One person, moving fast, delivering results. That's the business model.",
];

export function About() {
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

      // Avatar and text
      const avatar = sectionRef.current?.querySelector(".about-avatar");
      if (avatar) {
        gsap.fromTo(
          avatar,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: avatar,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      const paras = sectionRef.current?.querySelectorAll(".about-paragraph");
      if (paras) {
        gsap.fromTo(
          paras,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: paras[0],
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Avatar + heading */}
          <div className="lg:col-span-4">
            <div className="about-avatar w-24 h-24 md:w-32 md:h-32 rounded-full bg-bg-tertiary flex items-center justify-center mb-8 opacity-0">
              <span className="font-satoshi font-bold text-2xl md:text-3xl text-text-tertiary">
                NZ
              </span>
            </div>
            <h2
              ref={headingRef}
              className="font-satoshi font-black text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.03em] text-text-primary"
            >
              {"The business guy who builds.".split(" ").map((word, i) => (
                <span key={i} className="word-clip mr-[0.22em]">
                  <span className="word-inner">{word}</span>
                </span>
              ))}
            </h2>
          </div>

          {/* Right: Bio copy */}
          <div className="lg:col-span-7 lg:col-start-6 space-y-6 pt-0 lg:pt-20">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className={`about-paragraph font-inter text-base md:text-lg leading-relaxed opacity-0 ${
                  i === 2
                    ? "text-text-primary font-medium"
                    : "text-text-secondary"
                }`}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
