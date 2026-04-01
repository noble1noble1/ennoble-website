"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "AI Operations Audit",
    number: "01",
    description:
      "We look at how your business actually runs. Not how you think it runs. We check your website, your ad spend, your sales process, your tools, your team workflows. We find the gaps, the waste, and the opportunities you didn't know existed.",
  },
  {
    title: "Custom AI Systems",
    number: "02",
    description:
      "We build the things your business needs but doesn't have. Custom websites that convert. Dashboards that show what's actually happening. AI agents that handle the repetitive work. Automations that connect your tools so data stops living in silos.",
  },
  {
    title: "Team Training & Adoption",
    number: "03",
    description:
      "We sit with your team, learn their actual workflows, and teach them to use AI in the context of their real work. Challenge-based, not demo-based. One tool deep before going wide.",
  },
  {
    title: "Fractional AI Ops",
    number: "04",
    description:
      "Some businesses need ongoing AI support but can't justify a full-time hire. We become part of your team. New builds as needs emerge. Continuous optimization. We evolve with your business.",
  },
];

export function Services() {
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

      // Cards stagger in
      const cards = sectionRef.current?.querySelectorAll(".service-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cards[0],
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
    <section
      ref={sectionRef}
      className="py-24 md:py-32 lg:py-40 bg-bg-secondary"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <h2
          ref={headingRef}
          className="font-satoshi font-black text-[clamp(2rem,5vw,4rem)] leading-[1.1] tracking-[-0.03em] text-text-primary mb-16 md:mb-20"
        >
          {"What We Do".split(" ").map((word, i) => (
            <span key={i} className="word-clip mr-[0.22em]">
              <span className="word-inner">{word}</span>
            </span>
          ))}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-text-tertiary/10">
          {services.map((service, i) => (
            <div
              key={i}
              className="service-card opacity-0 bg-bg-secondary p-8 md:p-10 lg:p-12 group hover:bg-bg-tertiary transition-colors duration-500"
            >
              <div className="flex items-baseline justify-between mb-6">
                <span className="font-jetbrains text-xs text-text-tertiary tracking-wider">
                  {service.number}
                </span>
              </div>
              <h3 className="font-satoshi font-bold text-xl md:text-2xl text-text-primary mb-4 tracking-[-0.02em]">
                {service.title}
              </h3>
              <p className="font-inter text-sm md:text-base text-text-secondary leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
