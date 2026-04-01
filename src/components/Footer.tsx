"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Big CTA headline reveal
      const words = headlineRef.current?.querySelectorAll(".word-inner");
      if (words) {
        gsap.fromTo(
          words,
          { y: "100%" },
          {
            y: "0%",
            duration: 0.7,
            stagger: 0.04,
            ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Buttons fade in
      const buttons = sectionRef.current?.querySelector(".footer-buttons");
      if (buttons) {
        gsap.fromTo(
          buttons,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: buttons,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} className="py-24 md:py-32 lg:py-40 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Big CTA */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            ref={headlineRef}
            className="font-satoshi font-black text-[clamp(2.5rem,7vw,6rem)] leading-[1.05] tracking-[-0.04em] text-text-primary mb-6"
          >
            {"Let's talk.".split(" ").map((word, i) => (
              <span key={i} className="word-clip mr-[0.22em]">
                <span className="word-inner">{word}</span>
              </span>
            ))}
          </h2>
          <p className="font-inter text-text-secondary text-lg mb-10 max-w-md mx-auto">
            30 minutes. No pitch deck. Just a conversation about what&apos;s actually going on.
          </p>
        </div>

        {/* Buttons */}
        <div className="footer-buttons flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 md:mb-24 opacity-0">
          <Button href="https://calendly.com/znob" variant="primary" size="lg">
            Book a Call
          </Button>
          <Button href="mailto:hello@ennoble.one" variant="secondary" size="lg">
            Get a Free Audit
          </Button>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-text-tertiary/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-satoshi font-black text-lg tracking-[-0.03em] text-text-primary lowercase">
            ennoble
          </span>
          <a
            href="mailto:hello@ennoble.one"
            className="font-inter text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            hello@ennoble.one
          </a>
          <span className="font-inter text-xs text-text-tertiary">
            © {new Date().getFullYear()} Ennoble. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
