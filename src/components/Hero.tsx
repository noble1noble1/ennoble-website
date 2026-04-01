"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

const headline = "We find what's broken. Then we build what's next.";

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word-by-word slide up
      const words = headlineRef.current?.querySelectorAll(".word-inner");
      if (words) {
        gsap.fromTo(
          words,
          { y: "100%" },
          {
            y: "0%",
            duration: 0.55,
            stagger: 0.035,
            ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
            delay: 0.8,
          }
        );
      }

      // Subheadline fade in after headline completes
      const headlineDuration = 0.8 + 0.55 + (headline.split(" ").length - 1) * 0.035;
      gsap.fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          delay: headlineDuration + 0.15,
        }
      );

      // CTA fade in
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          delay: headlineDuration + 0.4,
        }
      );

      // Indicator pulse
      gsap.fromTo(
        indicatorRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          delay: headlineDuration + 0.8,
        }
      );

      // Hero parallax on scroll — scale down + translate
      gsap.to(sectionRef.current, {
        scale: 0.9,
        y: "-10%",
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100dvh] flex flex-col items-center justify-center px-6 md:px-8 lg:px-12 overflow-hidden gpu"
    >
      <h1
        ref={headlineRef}
        className="font-satoshi font-black text-[clamp(2.2rem,6.5vw,5.5rem)] leading-[1.05] tracking-[-0.04em] text-text-primary text-center max-w-5xl mb-6"
      >
        {headline.split(" ").map((word, i) => (
          <span key={i} className="word-clip mr-[0.2em]">
            <span className="word-inner">{word}</span>
          </span>
        ))}
      </h1>

      <p
        ref={subRef}
        className="font-inter text-[clamp(1rem,2vw,1.25rem)] text-text-secondary text-center max-w-xl mb-10 md:mb-14 opacity-0"
      >
        AI operations for businesses that make real things.
      </p>

      <div ref={ctaRef} className="opacity-0">
        <Button href="https://calendly.com/znob" variant="primary" size="lg">
          Book a Call
        </Button>
      </div>

      <div
        ref={indicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-inter text-[10px] tracking-[0.2em] uppercase text-text-tertiary">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-text-tertiary/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
