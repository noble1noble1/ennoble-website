"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = navRef.current?.querySelectorAll(".nav-item");
    if (!items) return;

    gsap.fromTo(
      items,
      { opacity: 0, filter: "blur(8px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.9,
        stagger: 0.1,
        ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        delay: 0.3,
      }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 lg:px-12 py-5 mix-blend-difference"
    >
      <a href="#" className="nav-item opacity-0">
        <span className="font-satoshi font-black text-xl tracking-[-0.03em] text-white lowercase">
          ennoble
        </span>
      </a>
      <a
        href="https://calendly.com/znob"
        target="_blank"
        rel="noopener noreferrer"
        className="nav-item opacity-0 font-inter text-sm text-white/70 hover:text-white transition-colors duration-300 border border-white/20 hover:border-white/50 rounded-full px-5 py-2"
      >
        Book a Call
      </a>
    </nav>
  );
}
