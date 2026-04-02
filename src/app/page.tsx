"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // --- ANIMATIONS ---

    // 1. Hero clip reveals
    gsap.utils.toArray<HTMLElement>(".clip-reveal-inner").forEach((el) => {
      gsap.to(el, {
        y: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: parseFloat(el.dataset.delay || "0"),
      });
    });

    // 2. Red accent line draws
    gsap.utils.toArray<HTMLElement>(".red-rule").forEach((el) => {
      gsap.to(el, {
        scaleX: 1,
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    // Hero red rule draws on load
    const heroRule = document.querySelector(".hero-red-rule");
    if (heroRule) {
      gsap.to(heroRule, {
        scaleX: 1,
        duration: 1.4,
        ease: "power3.inOut",
        delay: 0.8,
      });
    }

    // 3. Staggered paragraph reveals
    gsap.utils.toArray<HTMLElement>(".stagger-reveal").forEach((el) => {
      const children = el.querySelectorAll(".stagger-child");
      gsap.fromTo(
        children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // 4. Pull quote scale animation
    gsap.utils.toArray<HTMLElement>(".pull-quote-anim").forEach((el) => {
      gsap.fromTo(
        el,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // 5. Section number reveals
    gsap.utils.toArray<HTMLElement>(".section-num-anim").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // 6. Headline scroll reveals
    gsap.utils.toArray<HTMLElement>(".headline-reveal").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // 7. Image placeholder wipe reveal
    gsap.utils.toArray<HTMLElement>(".img-reveal").forEach((el) => {
      gsap.fromTo(
        el,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // 8. Parallax on text blocks
    gsap.utils.toArray<HTMLElement>(".parallax-slow").forEach((el) => {
      gsap.to(el, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    gsap.utils.toArray<HTMLElement>(".parallax-fast").forEach((el) => {
      gsap.to(el, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    // 9. Stat counter animations
    gsap.utils.toArray<HTMLElement>(".stat-anim").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // 10. Service columns stagger
    const serviceCols = document.querySelectorAll(".service-col");
    if (serviceCols.length) {
      gsap.fromTo(
        serviceCols,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: serviceCols[0],
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // 11. Method steps stagger
    const methodSteps = document.querySelectorAll(".method-step");
    if (methodSteps.length) {
      gsap.fromTo(
        methodSteps,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: methodSteps[0],
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* ==================== HERO ==================== */}
      <section className="h-[100dvh] relative flex flex-col justify-between px-6 md:px-12 lg:px-20 py-8 md:py-12 overflow-hidden">
        {/* Top label */}
        <div className="clip-reveal">
          <p className="clip-reveal-inner text-[11px] md:text-xs tracking-[0.3em] uppercase text-editorial-muted font-inter" data-delay="0.2">
            Issue 01 — AI Operations
          </p>
        </div>

        {/* Main headline area */}
        <div className="flex-1 flex flex-col justify-center max-w-[90vw] lg:max-w-[70vw]">
          <div className="clip-reveal">
            <h1 className="clip-reveal-inner font-playfair text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.95] tracking-tight" data-delay="0.3">
              We find <span className="text-editorial-red italic">what&apos;s broken.</span>
            </h1>
          </div>
          <div className="clip-reveal mt-2 md:mt-3">
            <h1 className="clip-reveal-inner font-playfair text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.95] tracking-tight" data-delay="0.5">
              Then we build what&apos;s next.
            </h1>
          </div>

          {/* Red rule */}
          <div className="hero-red-rule red-rule w-full max-w-[200px] md:max-w-[300px] mt-8 md:mt-12" />

          {/* Subheadline — offset right */}
          <div className="clip-reveal mt-6 md:mt-8 md:ml-auto md:mr-[10%]">
            <p className="clip-reveal-inner font-inter text-base md:text-lg text-editorial-muted max-w-md leading-relaxed" data-delay="0.9">
              AI operations for businesses that make real things.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-end">
          <a
            href="https://calendly.com/znob"
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter text-xs tracking-[0.2em] uppercase text-editorial-text underline underline-offset-4 decoration-editorial-red hover:text-editorial-red transition-colors duration-300"
          >
            Book a Call
          </a>
        </div>
      </section>

      {/* ==================== 01: THE PROBLEM ==================== */}
      <section className="px-6 md:px-12 lg:px-20 py-24 md:py-32 lg:py-40">
        <div className="section-num-anim section-number mb-6">01</div>

        <div className="headline-reveal mb-4">
          <h2 className="font-playfair text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] tracking-tight">
            The Consultant Problem
          </h2>
        </div>

        <div className="headline-reveal mb-12 md:mb-16">
          <p className="font-inter text-lg md:text-xl text-editorial-muted">
            Most businesses bolt AI onto broken processes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Body text — narrow column */}
          <div className="lg:col-span-5 stagger-reveal">
            <p className="stagger-child font-inter text-base md:text-lg leading-[1.8] text-editorial-muted mb-6">
              They buy a ChatGPT subscription. Someone watches a YouTube video. A consultant flies in, does a 3-day kickoff with impressive demos, and leaves. Nobody knows what to actually do on Monday morning.
            </p>
            <p className="stagger-child font-inter text-base md:text-lg leading-[1.8] text-editorial-text font-medium">
              The tools aren&apos;t the problem. The approach is.
            </p>
          </div>

          {/* Pull quote — offset right */}
          <div className="lg:col-span-6 lg:col-start-7 flex items-center">
            <div className="pull-quote-anim parallax-slow">
              <div className="red-rule w-16 mb-6" />
              <blockquote className="pull-quote text-[clamp(1.5rem,3vw,2.5rem)] text-editorial-text">
                &ldquo;AI doesn&apos;t fix bad processes. It accelerates them.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 02: THE PRACTICE ==================== */}
      <section className="px-6 md:px-12 lg:px-20 py-24 md:py-32 lg:py-40">
        <div className="section-num-anim section-number mb-6">02</div>

        <div className="headline-reveal mb-16 md:mb-20">
          <h2 className="font-playfair text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] tracking-tight">
            The Practice
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {[
            {
              num: "01",
              title: "AI Operations Audit",
              desc: "We look at how your business actually runs. Not how you think it runs.",
            },
            {
              num: "02",
              title: "Custom AI Systems",
              desc: "Websites, dashboards, agents, automations. We build what\u2019s missing.",
            },
            {
              num: "03",
              title: "Team Training",
              desc: "Not a demo. A skill transfer. Challenge-based, role-specific.",
            },
            {
              num: "04",
              title: "Fractional AI Ops",
              desc: "Your AI department, without the department.",
            },
          ].map((service) => (
            <div key={service.num} className="service-col border-t border-editorial-dim/30 pt-6">
              <span className="font-jetbrains text-editorial-red text-sm tracking-wider">
                {service.num}
              </span>
              <h3 className="font-inter font-bold text-lg md:text-xl mt-3 mb-4 text-editorial-text">
                {service.title}
              </h3>
              <p className="font-playfair text-base md:text-lg text-editorial-muted leading-relaxed italic">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== 03: BY THE NUMBERS ==================== */}
      <section className="px-6 md:px-12 lg:px-20 py-24 md:py-32 lg:py-40">
        <div className="section-num-anim section-number mb-6">03</div>

        <div className="headline-reveal mb-16 md:mb-20">
          <h2 className="font-playfair text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] tracking-tight">
            By the Numbers
          </h2>
        </div>

        {/* Asymmetric stat layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Hero stat — large */}
          <div className="lg:col-span-6 stat-anim">
            <span className="font-jetbrains text-[clamp(4rem,12vw,10rem)] leading-none text-editorial-text font-bold block">
              $9K
            </span>
            <p className="font-inter text-editorial-muted text-base md:text-lg mt-4 max-w-sm">
              in wasted ad spend identified in one audit
            </p>
          </div>

          {/* Smaller stats — scattered */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-8 lg:gap-10 content-start">
            <div className="stat-anim">
              <span className="font-jetbrains text-3xl md:text-4xl text-editorial-text font-bold">
                2 <span className="text-editorial-red">weeks</span>
              </span>
              <p className="font-inter text-editorial-muted text-sm mt-2">
                zero to live website
              </p>
            </div>

            <div className="stat-anim">
              <span className="font-jetbrains text-3xl md:text-4xl text-editorial-text font-bold">
                15 <span className="text-editorial-red">people</span>
              </span>
              <p className="font-inter text-editorial-muted text-sm mt-2">
                trained on AI adoption
              </p>
            </div>

            <div className="stat-anim">
              <span className="font-jetbrains text-3xl md:text-4xl text-editorial-text font-bold">
                D+ → <span className="text-editorial-red">A</span>
              </span>
              <p className="font-inter text-editorial-muted text-sm mt-2">
                grade improvement
              </p>
            </div>

            <div className="stat-anim">
              <span className="font-jetbrains text-3xl md:text-4xl text-editorial-text font-bold">
                <span className="text-editorial-red">12</span>
              </span>
              <p className="font-inter text-editorial-muted text-sm mt-2">
                AI systems for one operation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 04: THE METHOD ==================== */}
      <section className="px-6 md:px-12 lg:px-20 py-24 md:py-32 lg:py-40">
        <div className="section-num-anim section-number mb-6">04</div>

        <div className="headline-reveal mb-16 md:mb-20">
          <h2 className="font-playfair text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] tracking-tight">
            The Method
          </h2>
        </div>

        <div className="max-w-3xl">
          {[
            {
              num: "01",
              title: "Discovery",
              desc: "It starts with a conversation. 30 minutes, no charge.",
            },
            {
              num: "02",
              title: "Audit",
              desc: "We dig into everything. Website, ad spend, sales process, tech stack.",
            },
            {
              num: "03",
              title: "Build",
              desc: "Custom systems, built for your stack. You see progress weekly.",
            },
            {
              num: "04",
              title: "Train",
              desc: "Your team learns by doing. Role-specific, challenge-based.",
            },
            {
              num: "05",
              title: "Optimize",
              desc: "We don\u2019t disappear. Monthly check-ins, continuous improvement.",
            },
          ].map((step) => (
            <div key={step.num} className="method-step flex gap-6 md:gap-8 mb-10 md:mb-14">
              <span className="font-jetbrains text-editorial-red text-sm tracking-wider pt-1 shrink-0">
                {step.num}
              </span>
              <div>
                <h3 className="font-inter font-bold text-xl md:text-2xl text-editorial-text mb-2">
                  {step.title}
                </h3>
                <p className="font-inter text-editorial-muted text-base md:text-lg leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== 05: THE OPERATOR ==================== */}
      <section className="px-6 md:px-12 lg:px-20 py-24 md:py-32 lg:py-40">
        <div className="section-num-anim section-number mb-6">05</div>

        <div className="headline-reveal mb-12 md:mb-16">
          <h2 className="font-playfair text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] tracking-tight">
            The Operator
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Photo placeholder */}
          <div className="lg:col-span-5">
            <div className="img-reveal aspect-[3/4] bg-editorial-surface w-full max-w-sm">
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-inter text-xs tracking-[0.2em] uppercase text-editorial-dim">
                  Photo
                </span>
              </div>
            </div>
          </div>

          {/* Profile copy */}
          <div className="lg:col-span-6 lg:col-start-7 stagger-reveal flex flex-col justify-center">
            <p className="stagger-child font-inter text-base md:text-lg leading-[1.8] text-editorial-muted mb-6">
              Noble has worked across ad sales, crypto, art operations, and tech startups. 300 Entertainment. io.net. A $1M+ art operation for Yung Jake. Events for 1,500 people.
            </p>
            <p className="stagger-child font-inter text-base md:text-lg leading-[1.8] text-editorial-muted mb-8">
              Now he runs AI operations for businesses that make real things. Not with demos or decks — with audits, builds, training, and ongoing support. One person. Every tool. Real results.
            </p>
            <div className="stagger-child">
              <a
                href="https://calendly.com/znob"
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-xs tracking-[0.2em] uppercase text-editorial-text underline underline-offset-4 decoration-editorial-red hover:text-editorial-red transition-colors duration-300"
              >
                Book a Call →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-12">
        <div className="red-rule w-full mb-16 md:mb-20" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-6 headline-reveal">
            <h2 className="font-playfair text-[clamp(2.5rem,6vw,5rem)] leading-[1] tracking-tight">
              Let&apos;s talk.
            </h2>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 flex flex-col justify-end gap-6">
            <a
              href="https://calendly.com/znob"
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-lg md:text-xl text-editorial-text hover:text-editorial-red transition-colors duration-300"
            >
              Book a Call →
            </a>
            <a
              href="https://calendly.com/znob"
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-lg md:text-xl text-editorial-text hover:text-editorial-red transition-colors duration-300"
            >
              Request an Audit →
            </a>
            <a
              href="mailto:hello@ennoble.one"
              className="font-inter text-base text-editorial-muted hover:text-editorial-red transition-colors duration-300"
            >
              hello@ennoble.one
            </a>
          </div>
        </div>

        <div className="mt-20 md:mt-24">
          <p className="font-inter text-xs text-editorial-dim tracking-wider">
            © 2026 Ennoble
          </p>
        </div>
      </footer>
    </div>
  );
}
