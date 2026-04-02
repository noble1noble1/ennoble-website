"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── CONSTANTS ─── */
const CALENDLY_URL = "https://calendly.com/znob";

const SERVICES = [
  {
    title: "AI Operations Audit",
    desc: "A deep look at how your business actually works — and where AI can cut waste, save time, or unlock revenue.",
    deliverables: ["Process map + gap analysis", "Prioritized opportunity list", "30-day quick-win roadmap"],
  },
  {
    title: "Custom AI Systems",
    desc: "We build the tools, automations, and integrations your business actually needs — not off-the-shelf demos.",
    deliverables: ["Custom workflows & automations", "AI-powered dashboards", "Website & content systems"],
  },
  {
    title: "Team Training & Adoption",
    desc: "Real skill transfer, not a PowerPoint. We train your team to use AI in their actual roles.",
    deliverables: ["Role-specific AI playbooks", "Live workshop sessions", "Challenge-based practice"],
  },
  {
    title: "Fractional AI Ops",
    desc: "Your dedicated AI department — without the overhead. We embed into your operations on an ongoing basis.",
    deliverables: ["Weekly strategy check-ins", "Continuous system optimization", "On-call AI support"],
  },
];

const STATS = [
  { value: "$9K", label: "in wasted ad spend identified" },
  { value: "2 wks", label: "zero to live website" },
  { value: "15", label: "people trained on AI adoption" },
  { value: "D+ → A", label: "website grade improvement" },
  { value: "12", label: "AI systems designed for one operation" },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discovery",
    desc: "30 minutes. We figure out what actually matters, what's working, and where the real friction is.",
  },
  {
    num: "02",
    title: "Audit",
    desc: "A deep dive into your operations. You get specific findings, not vague recommendations.",
  },
  {
    num: "03",
    title: "Build",
    desc: "Custom systems, not templates. We build to your workflow and show weekly progress.",
  },
  {
    num: "04",
    title: "Train",
    desc: "Role-specific, challenge-based training. Your team leaves knowing how to use what we built.",
  },
  {
    num: "05",
    title: "Optimize",
    desc: "We don't disappear after launch. We monitor, improve, and adapt as your business grows.",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);

  // Word-by-word animation for hero headline
  const animateWords = useCallback((container: Element) => {
    const words = container.querySelectorAll(".word-inner");
    gsap.fromTo(
      words,
      { y: "110%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.7,
        stagger: 0.06,
        ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        delay: 0.2,
      }
    );
  }, []);

  useEffect(() => {
    let lenis: {
      raf: (time: number) => void;
      on: (event: string, cb: () => void) => void;
      destroy: () => void;
    } | null = null;

    const initLenis = async () => {
      const LenisModule = await import("@studio-freight/lenis");
      const LenisClass = LenisModule.default;

      lenis = new LenisClass({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }) as typeof lenis;

      function raf(time: number) {
        lenis!.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      lenis!.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis!.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    };

    initLenis();

    /* ── Nav reveal ── */
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.1 }
      );
    }

    /* ── Hero word animation ── */
    const heroHeadline = document.querySelector(".hero-headline");
    if (heroHeadline) {
      animateWords(heroHeadline);
    }

    /* ── Hero sub + CTA ── */
    gsap.fromTo(
      ".hero-sub",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.9 }
    );
    gsap.fromTo(
      ".hero-cta",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out", delay: 1.1 }
    );

    /* ── Section reveals ── */
    const sections = document.querySelectorAll(".reveal-section");
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 85%",
        onEnter: () => {
          gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        },
        once: true,
      });
    });

    /* ── Card stagger reveals ── */
    const cardGrids = document.querySelectorAll(".card-grid");
    cardGrids.forEach((grid) => {
      const cards = grid.querySelectorAll(".service-card");
      ScrollTrigger.create({
        trigger: grid,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            cards,
            { opacity: 0.3, y: 25 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" }
          );
        },
        once: true,
      });
    });

    /* ── Stats reveal with glow ── */
    const statItems = document.querySelectorAll(".stat-item");
    statItems.forEach((stat, i) => {
      ScrollTrigger.create({
        trigger: stat,
        start: "top 85%",
        onEnter: () => {
          gsap.fromTo(
            stat,
            { opacity: 0.3, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: i * 0.1,
              ease: "power3.out",
              onComplete: () => {
                const numEl = stat.querySelector(".stat-number");
                if (numEl) {
                  numEl.classList.add("stat-glow-anim");
                  setTimeout(() => numEl.classList.remove("stat-glow-anim"), 1500);
                }
              },
            }
          );
        },
        once: true,
      });
    });

    /* ── Timeline line draw ── */
    const timelineLine = document.querySelector(".timeline-draw") as HTMLElement;
    if (timelineLine) {
      gsap.set(timelineLine, { scaleY: 0, transformOrigin: "top center" });
      ScrollTrigger.create({
        trigger: timelineLine,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          gsap.to(timelineLine, {
            scaleY: 1,
            duration: 1.5,
            ease: "power2.inOut",
          });
        },
        once: true,
      });
    }

    /* ── Process steps stagger ── */
    const processSteps = document.querySelectorAll(".process-step");
    processSteps.forEach((step, i) => {
      ScrollTrigger.create({
        trigger: step,
        start: "top 85%",
        onEnter: () => {
          gsap.fromTo(
            step,
            { opacity: 0.3, x: -20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              delay: i * 0.1,
              ease: "power3.out",
            }
          );
        },
        once: true,
      });
    });

    /* ── Magnetic buttons ── */
    const magneticBtns = document.querySelectorAll(".magnetic-btn");
    magneticBtns.forEach((btn) => {
      const el = btn as HTMLElement;
      const handleMouseMove = (e: Event) => {
        const evt = e as MouseEvent;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (evt.clientX - cx) * 0.2;
        const dy = (evt.clientY - cy) * 0.2;
        gsap.to(el, { x: dx, y: dy, duration: 0.3, ease: "power3.out" });
      };
      const handleMouseLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
      };
      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      if (lenis) lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [animateWords]);

  return (
    <>
      {/* ── NAV ── */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-5 flex items-center justify-between"
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background: "rgba(10, 10, 10, 0.8)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <span
          className="font-satoshi font-black text-xl tracking-tight"
          style={{ color: "#FAFAFA" }}
        >
          ennoble
          <span className="text-amber" style={{ color: "#F59E0B" }}>.</span>
        </span>
        <div className="flex items-center gap-6">
          <a
            href="#services"
            className="hidden md:block text-sm font-inter transition-colors duration-200"
            style={{ color: "#A3A3A3" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#FAFAFA")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#A3A3A3")}
          >
            Services
          </a>
          <a
            href="#process"
            className="hidden md:block text-sm font-inter transition-colors duration-200"
            style={{ color: "#A3A3A3" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#FAFAFA")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#A3A3A3")}
          >
            Process
          </a>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn hero-cta inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
            style={{
              background: "#F59E0B",
              color: "#0A0A0A",
              fontFamily: "var(--font-inter)",
            }}
          >
            Book a Call
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ minHeight: "100dvh", paddingTop: "80px" }}
      >
        {/* Mesh glow background */}
        <div
          ref={meshRef}
          className="mesh-float pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(245,158,11,0.09) 0%, rgba(234,88,12,0.05) 40%, transparent 70%)",
          }}
        />
        {/* Secondary ambient glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 40% 30% at 60% 60%, rgba(245,158,11,0.04) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <p
            className="hero-cta font-jetbrains text-xs tracking-widest uppercase mb-8"
            style={{ color: "#F59E0B", letterSpacing: "0.2em" }}
          >
            AI Operations Consulting
          </p>

          {/* Headline with word-by-word reveal */}
          <h1
            className="hero-headline font-playfair leading-tight mb-6"
            style={{
              fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)",
              color: "#FAFAFA",
              lineHeight: 1.15,
            }}
          >
            {[
              "Most AI consultants",
              "give you a deck.",
              "We give you systems.",
            ].map((line, li) => (
              <span key={li} className="block">
                {line.split(" ").map((word, wi) => (
                  <span key={wi} className="word-wrap" style={{ marginRight: "0.25em" }}>
                    <span className="word-inner" style={{ opacity: 0.3 }}>
                      {word}
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p
            className="hero-sub font-inter text-lg max-w-xl mx-auto mb-10"
            style={{ color: "#A3A3A3", lineHeight: 1.7, opacity: 0.3 }}
          >
            Audit. Build. Train. Stay. The full lifecycle of AI adoption, handled.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta magnetic-btn inline-flex items-center justify-center px-8 py-4 rounded-xl font-medium text-base transition-all duration-200 w-full sm:w-auto"
              style={{
                background: "#F59E0B",
                color: "#0A0A0A",
                fontFamily: "var(--font-inter)",
                minHeight: "48px",
                opacity: 0.3,
                fontWeight: 600,
              }}
            >
              Book a Call
            </a>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta magnetic-btn inline-flex items-center justify-center px-8 py-4 rounded-xl font-medium text-base transition-all duration-200 w-full sm:w-auto"
              style={{
                border: "1px solid rgba(245,158,11,0.4)",
                color: "#F59E0B",
                fontFamily: "var(--font-inter)",
                minHeight: "48px",
                opacity: 0.3,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(245,158,11,0.08)";
                e.currentTarget.style.borderColor = "rgba(245,158,11,0.7)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(245,158,11,0.4)";
              }}
            >
              Get a Free Audit
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: "#A3A3A3" }}
        >
          <span className="font-jetbrains text-xs tracking-widest">scroll</span>
          <div
            className="w-px h-8"
            style={{ background: "linear-gradient(180deg, #F59E0B 0%, transparent 100%)" }}
          />
        </div>
      </section>

      {/* ── PROBLEM SECTION ── */}
      <section
        className="py-24 md:py-32 px-6 reveal-section"
        style={{ background: "#0A0A0A" }}
      >
        <div className="max-w-3xl mx-auto">
          <h2
            className="font-playfair mb-8"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              color: "#FAFAFA",
              lineHeight: 1.25,
            }}
          >
            We find{" "}
            <em
              style={{
                color: "#EF4444",
                fontStyle: "italic",
                fontFamily: "var(--font-playfair)",
              }}
            >
              what&apos;s broken.
            </em>{" "}
            <br />
            Then we build what&apos;s next.
          </h2>

          <div
            className="space-y-5 font-inter text-base leading-relaxed"
            style={{ color: "#A3A3A3", maxWidth: "600px" }}
          >
            <p>
              Most businesses bolt AI onto broken processes and wonder why nothing
              changes. The tool isn&apos;t the problem. The process is.
            </p>
            <p>
              We start with an honest look at how your business actually operates —
              where time is lost, where money leaks, where the team gets stuck. Then
              we design systems that fix the root cause, not the symptom.
            </p>
            <p>
              No jargon. No bloated retainers. Just real work that moves the needle
              for businesses that make real things.
            </p>
          </div>
        </div>
      </section>

      {/* ── SERVICES SECTION ── */}
      <section
        id="services"
        className="py-24 md:py-32 px-6"
        style={{ background: "#0D0D0D" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="reveal-section mb-16">
            <p
              className="font-jetbrains text-xs tracking-widest uppercase mb-4"
              style={{ color: "#F59E0B" }}
            >
              What We Do
            </p>
            <h2
              className="font-playfair"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                color: "#FAFAFA",
              }}
            >
              Four ways we make AI work for your business.
            </h2>
          </div>

          <div className="card-grid grid grid-cols-1 md:grid-cols-2 gap-5">
            {SERVICES.map((service, i) => (
              <div
                key={i}
                className="service-card card-glow rounded-2xl p-8"
                style={{
                  background: "#111111",
                  border: "1px solid rgba(255,255,255,0.06)",
                  opacity: 0.3,
                }}
              >
                <h3
                  className="font-playfair text-xl mb-3"
                  style={{ color: "#FAFAFA" }}
                >
                  {service.title}
                </h3>
                <p
                  className="font-inter text-sm leading-relaxed mb-5"
                  style={{ color: "#A3A3A3" }}
                >
                  {service.desc}
                </p>
                <ul className="space-y-2">
                  {service.deliverables.map((d, di) => (
                    <li
                      key={di}
                      className="flex items-start gap-2 font-inter text-sm"
                      style={{ color: "#A3A3A3" }}
                    >
                      <span style={{ color: "#F59E0B", marginTop: "1px" }}>→</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROOF / STATS SECTION ── */}
      <section
        className="py-24 md:py-32 px-6"
        style={{ background: "#0A0A0A" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="reveal-section mb-16">
            <h2
              className="font-playfair"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                color: "#FAFAFA",
              }}
            >
              Numbers don&apos;t lie.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="stat-item rounded-xl p-6"
                style={{
                  background: "#111111",
                  border: "1px solid rgba(255,255,255,0.06)",
                  opacity: 0.3,
                }}
              >
                <div
                  className="stat-number font-jetbrains font-bold mb-2"
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    color: "#F59E0B",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="font-inter text-sm"
                  style={{ color: "#A3A3A3" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS SECTION ── */}
      <section
        id="process"
        className="py-24 md:py-32 px-6"
        style={{ background: "#0D0D0D" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="reveal-section mb-16">
            <p
              className="font-jetbrains text-xs tracking-widest uppercase mb-4"
              style={{ color: "#F59E0B" }}
            >
              How We Work
            </p>
            <h2
              className="font-playfair"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                color: "#FAFAFA",
              }}
            >
              A clear process. No black boxes.
            </h2>
          </div>

          <div className="relative">
            {/* Timeline vertical line */}
            <div
              className="absolute left-5 top-6 bottom-6 w-px hidden md:block"
              style={{ background: "rgba(245,158,11,0.1)" }}
            />
            <div
              className="timeline-draw absolute left-5 top-6 bottom-6 w-px hidden md:block"
              style={{
                background: "linear-gradient(180deg, #F59E0B 0%, rgba(245,158,11,0.3) 100%)",
              }}
            />

            <div className="space-y-10">
              {PROCESS_STEPS.map((step, i) => (
                <div
                  key={i}
                  className="process-step flex gap-6 items-start"
                  style={{ opacity: 0.3 }}
                >
                  {/* Badge */}
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-jetbrains text-xs font-bold z-10"
                    style={{
                      background: "#1A1A1A",
                      border: "1px solid rgba(245,158,11,0.4)",
                      color: "#F59E0B",
                    }}
                  >
                    {step.num}
                  </div>
                  <div className="pt-1 pb-2">
                    <h3
                      className="font-playfair text-xl mb-2"
                      style={{ color: "#FAFAFA" }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="font-inter text-sm leading-relaxed"
                      style={{ color: "#A3A3A3" }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section
        className="py-24 md:py-32 px-6 reveal-section"
        style={{ background: "#0A0A0A" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Photo placeholder */}
            <div
              className="rounded-2xl flex items-center justify-center aspect-[4/5]"
              style={{
                background: "#111111",
                border: "1px solid rgba(245,158,11,0.15)",
                maxWidth: "360px",
                width: "100%",
                margin: "0 auto",
              }}
            >
              <div className="text-center">
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{
                    background: "rgba(245,158,11,0.08)",
                    border: "1px solid rgba(245,158,11,0.2)",
                  }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={0.5}
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                </div>
                <span
                  className="font-jetbrains text-xs"
                  style={{ color: "rgba(245,158,11,0.4)" }}
                >
                  Photo
                </span>
              </div>
            </div>

            {/* Copy */}
            <div>
              <p
                className="font-jetbrains text-xs tracking-widest uppercase mb-6"
                style={{ color: "#F59E0B" }}
              >
                About
              </p>
              <h2
                className="font-playfair mb-6"
                style={{
                  fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                  color: "#FAFAFA",
                  lineHeight: 1.25,
                }}
              >
                I&apos;m a business guy who builds AI systems.
              </h2>
              <div
                className="space-y-4 font-inter text-sm leading-relaxed"
                style={{ color: "#A3A3A3" }}
              >
                <p>
                  Not a developer who learned to pitch. Not a consultant who sells
                  strategy decks. A business operator who got obsessed with what AI
                  can actually do — and started building real systems to prove it.
                </p>
                <p>
                  I&apos;ve trained teams, rebuilt operations, and shipped custom AI tools
                  for businesses that make things, sell things, and serve people in
                  the real world.
                </p>
                <p>
                  If you&apos;re serious about getting more out of AI — not hype, not
                  demos, but actual systems that work — let&apos;s talk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER / CTA ── */}
      <footer
        className="py-24 md:py-32 px-6 relative overflow-hidden"
        style={{ background: "#0D0D0D" }}
      >
        {/* Footer mesh glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(245,158,11,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="reveal-section">
            <h2
              className="font-playfair mb-4"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "#FAFAFA",
                lineHeight: 1.15,
              }}
            >
              Let&apos;s talk about your business.
            </h2>
            <p
              className="font-inter text-base mb-10 max-w-md mx-auto"
              style={{ color: "#A3A3A3" }}
            >
              No pitch. No pressure. Just an honest conversation about where AI can
              actually help.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn inline-flex items-center justify-center px-8 py-4 rounded-xl font-medium text-base transition-all duration-200 w-full sm:w-auto"
                style={{
                  background: "#F59E0B",
                  color: "#0A0A0A",
                  fontFamily: "var(--font-inter)",
                  minHeight: "48px",
                  fontWeight: 600,
                }}
              >
                Book a Call
              </a>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn inline-flex items-center justify-center px-8 py-4 rounded-xl font-medium text-base transition-all duration-200 w-full sm:w-auto"
                style={{
                  border: "1px solid rgba(245,158,11,0.4)",
                  color: "#F59E0B",
                  fontFamily: "var(--font-inter)",
                  minHeight: "48px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(245,158,11,0.08)";
                  e.currentTarget.style.borderColor = "rgba(245,158,11,0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(245,158,11,0.4)";
                }}
              >
                Get a Free Audit
              </a>
            </div>

            {/* Divider */}
            <div
              className="w-full h-px mb-8"
              style={{ background: "rgba(255,255,255,0.06)" }}
            />

            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <span
                className="font-satoshi font-black text-xl"
                style={{ color: "#FAFAFA" }}
              >
                ennoble<span style={{ color: "#F59E0B" }}>.</span>
              </span>
              <a
                href="mailto:hello@ennoble.one"
                className="font-inter text-sm transition-colors duration-200"
                style={{ color: "#A3A3A3" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F59E0B")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#A3A3A3")}
              >
                hello@ennoble.one
              </a>
              <span
                className="font-inter text-sm"
                style={{ color: "#A3A3A3" }}
              >
                © 2026 Ennoble
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
