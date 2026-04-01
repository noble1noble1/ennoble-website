"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

/* ─── CONSTANTS ─── */
const BOOK_CALL_URL = "https://cal.com/ennoble/30min";
const STATS = [
  { value: "$9K", num: 9, prefix: "$", suffix: "K", desc: "wasted ad spend identified", bar: 75 },
  { value: "2 wks", num: 2, prefix: "", suffix: " wks", desc: "zero to live website", bar: 40 },
  { value: "15", num: 15, prefix: "", suffix: "", desc: "team members trained", bar: 60 },
  { value: "D+ → A", num: 0, prefix: "", suffix: "", desc: "site grade improvement", bar: 90, special: true },
  { value: "12", num: 12, prefix: "", suffix: "", desc: "AI systems designed", bar: 65 },
  { value: "$10K/yr", num: 10, prefix: "$", suffix: "K/yr", desc: "redundant tool costs found", bar: 80 },
];
const SERVICES = [
  { num: "01", title: "AI Operations Audit", desc: "Find what's broken, wasted, or invisible." },
  { num: "02", title: "Custom AI Systems", desc: "Websites, dashboards, agents, automations." },
  { num: "03", title: "Team Training", desc: "Skill transfer, not demos." },
  { num: "04", title: "Fractional AI Ops", desc: "Your AI department, without the department." },
];
const PROCESS_STEPS = [
  { title: "Discovery", desc: "30 minutes. We figure out what matters." },
  { title: "Audit", desc: "Deep dive. Specific findings." },
  { title: "Build", desc: "Custom systems. Weekly progress." },
  { title: "Train", desc: "Role-specific. Challenge-based." },
  { title: "Optimize", desc: "We don't disappear." },
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const problemRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const flowDiagramRef = useRef<SVGSVGElement>(null);
  const processSvgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    /* ── Lenis Smooth Scroll ── */
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    /* ── Hero Animations ── */
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTl
      .from(".hero-nav", { y: -30, opacity: 0, duration: 0.8 })
      .from(".hero-headline", { y: 60, opacity: 0, duration: 1 }, "-=0.4")
      .from(".hero-sub", { y: 40, opacity: 0, duration: 0.8 }, "-=0.6")
      .from(".hero-cta", { y: 30, opacity: 0, duration: 0.6, stagger: 0.15 }, "-=0.4")
      .from(".hero-flow", { y: 40, opacity: 0, duration: 1 }, "-=0.3");

    /* ── Hero Flow Diagram Draw ── */
    if (flowDiagramRef.current) {
      const paths = flowDiagramRef.current.querySelectorAll(".flow-path");
      paths.forEach((path) => {
        const p = path as SVGPathElement;
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(p, { strokeDashoffset: 0, duration: 2, delay: 1.2, ease: "power2.inOut" });
      });
      const nodes = flowDiagramRef.current.querySelectorAll(".flow-node-circle");
      gsap.from(nodes, { scale: 0, opacity: 0, duration: 0.5, stagger: 0.3, delay: 1.5, ease: "back.out(2)" });
      const labels = flowDiagramRef.current.querySelectorAll(".flow-label");
      gsap.from(labels, { opacity: 0, y: 10, duration: 0.4, stagger: 0.3, delay: 1.8 });
    }

    /* ── Problem Section ── */
    gsap.from(".problem-label", { scrollTrigger: { trigger: problemRef.current, start: "top 80%" }, y: 20, opacity: 0, duration: 0.6 });
    gsap.from(".problem-headline", { scrollTrigger: { trigger: problemRef.current, start: "top 75%" }, y: 40, opacity: 0, duration: 0.8 });
    gsap.from(".problem-text", { scrollTrigger: { trigger: problemRef.current, start: "top 70%" }, y: 30, opacity: 0, duration: 0.8, delay: 0.2 });
    gsap.from(".problem-visual", { scrollTrigger: { trigger: problemRef.current, start: "top 70%" }, x: 40, opacity: 0, duration: 1 });

    /* ── Services — Staggered Grid Reveal ── */
    gsap.from(".service-card", {
      scrollTrigger: { trigger: servicesRef.current, start: "top 75%" },
      y: 60, opacity: 0, duration: 0.7, stagger: 0.15, ease: "power3.out",
    });
    gsap.from(".services-label", { scrollTrigger: { trigger: servicesRef.current, start: "top 80%" }, y: 20, opacity: 0, duration: 0.6 });
    gsap.from(".services-headline", { scrollTrigger: { trigger: servicesRef.current, start: "top 78%" }, y: 40, opacity: 0, duration: 0.8 });

    /* ── Stats — Counter Animation ── */
    const statEls = document.querySelectorAll(".stat-number");
    statEls.forEach((el) => {
      const target = parseInt(el.getAttribute("data-target") || "0");
      const prefix = el.getAttribute("data-prefix") || "";
      const suffix = el.getAttribute("data-suffix") || "";
      const isSpecial = el.getAttribute("data-special") === "true";

      if (isSpecial) {
        // D+ → A animation
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(el, { textContent: "D+" }, {
              duration: 0.8,
              onStart: () => { el.textContent = "D+"; },
              onComplete: () => {
                gsap.to(el, {
                  duration: 0.3,
                  onStart: () => { el.textContent = "D+ → A"; },
                });
              },
            });
          },
          once: true,
        });
      } else {
        const obj = { val: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          onEnter: () => {
            gsap.to(obj, {
              val: target,
              duration: 2,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = prefix + Math.round(obj.val) + suffix;
              },
            });
          },
          once: true,
        });
      }
    });

    gsap.from(".stat-card", {
      scrollTrigger: { trigger: statsRef.current, start: "top 75%" },
      y: 50, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
    });

    // Stat bars
    document.querySelectorAll(".stat-bar-fill").forEach((bar) => {
      ScrollTrigger.create({
        trigger: bar,
        start: "top 90%",
        onEnter: () => {
          gsap.fromTo(bar, { width: "0%" }, { width: bar.getAttribute("data-width") || "50%", duration: 1.5, ease: "power2.out" });
        },
        once: true,
      });
    });

    /* ── Process — SVG Path Draw ── */
    if (processSvgRef.current) {
      const processPath = processSvgRef.current.querySelector(".process-line") as SVGPathElement;
      if (processPath) {
        const len = processPath.getTotalLength();
        gsap.set(processPath, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(processPath, {
          strokeDashoffset: 0,
          duration: 2,
          ease: "none",
          scrollTrigger: { trigger: processRef.current, start: "top 60%", end: "bottom 40%", scrub: 1 },
        });
      }
    }

    // Process nodes stagger
    gsap.from(".process-node", {
      scrollTrigger: { trigger: processRef.current, start: "top 70%" },
      y: 40, opacity: 0, duration: 0.6, stagger: 0.2, ease: "power3.out",
    });

    /* ── About ── */
    gsap.from(".about-image", { scrollTrigger: { trigger: aboutRef.current, start: "top 75%" }, x: -40, opacity: 0, duration: 1 });
    gsap.from(".about-text", { scrollTrigger: { trigger: aboutRef.current, start: "top 70%" }, x: 40, opacity: 0, duration: 1, delay: 0.2 });

    /* ── Footer ── */
    gsap.from(".footer-content", { scrollTrigger: { trigger: footerRef.current, start: "top 80%" }, y: 50, opacity: 0, duration: 1 });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const scrollToProcess = () => {
    const el = document.getElementById("process");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative">
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden">
        <div className="gradient-mesh">
          <div className="blob-3" />
        </div>

        {/* Nav */}
        <nav className="hero-nav absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 lg:px-20 py-6">
          <span className="font-satoshi font-bold text-xl tracking-tight text-text-primary">ennoble</span>
          <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer"
            className="px-5 py-2.5 bg-accent-amber text-bg-primary font-satoshi font-bold text-sm rounded-full hover:bg-amber-400 transition-colors">
            Book a Call
          </a>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center pt-24">
          <h1 className="hero-headline font-satoshi font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] tracking-tight mb-6">
            Stop paying for demos.<br />
            <span className="bg-gradient-to-r from-accent-amber via-orange-400 to-pink-400 bg-clip-text text-transparent">
              Start seeing results.
            </span>
          </h1>
          <p className="hero-sub text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10 font-inter leading-relaxed">
            From $9K in wasted ad spend to custom AI systems that run while you sleep.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer"
              className="hero-cta px-8 py-4 bg-accent-amber text-bg-primary font-satoshi font-bold rounded-full hover:bg-amber-400 hover:scale-105 transition-all text-base">
              Book a Call
            </a>
            <button onClick={scrollToProcess}
              className="hero-cta px-8 py-4 border border-text-tertiary text-text-primary font-satoshi font-bold rounded-full hover:border-accent-amber hover:text-accent-amber transition-all text-base">
              See How It Works
            </button>
          </div>

          {/* Mini Flow Diagram */}
          <div className="hero-flow max-w-lg mx-auto">
            <svg ref={flowDiagramRef} viewBox="0 0 500 80" fill="none" className="w-full">
              <defs>
                <linearGradient id="flowGrad" x1="0" y1="0" x2="500" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="50%" stopColor="#F97316" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
              {/* Connecting paths */}
              <path className="flow-path" d="M 90 40 L 210 40" stroke="url(#flowGrad)" strokeWidth="2" />
              <path className="flow-path" d="M 290 40 L 410 40" stroke="url(#flowGrad)" strokeWidth="2" />
              {/* Arrow heads */}
              <path className="flow-path" d="M 205 35 L 215 40 L 205 45" stroke="url(#flowGrad)" strokeWidth="2" fill="none" />
              <path className="flow-path" d="M 405 35 L 415 40 L 405 45" stroke="url(#flowGrad)" strokeWidth="2" fill="none" />
              {/* Nodes */}
              <circle className="flow-node-circle" cx="50" cy="40" r="20" fill="#1A1A1A" stroke="#F59E0B" strokeWidth="1.5" />
              <circle className="flow-node-circle" cx="250" cy="40" r="20" fill="#1A1A1A" stroke="#F97316" strokeWidth="1.5" />
              <circle className="flow-node-circle" cx="450" cy="40" r="20" fill="#1A1A1A" stroke="#EC4899" strokeWidth="1.5" />
              {/* Icons inside nodes */}
              <text className="flow-label" x="50" y="44" textAnchor="middle" fill="#F59E0B" fontSize="14">📊</text>
              <text className="flow-label" x="250" y="44" textAnchor="middle" fill="#F97316" fontSize="14">🤖</text>
              <text className="flow-label" x="450" y="44" textAnchor="middle" fill="#EC4899" fontSize="14">📈</text>
              {/* Labels below */}
              <text className="flow-label" x="50" y="72" textAnchor="middle" fill="#A0A0A0" fontSize="10" fontFamily="var(--font-jetbrains)">Business Data</text>
              <text className="flow-label" x="250" y="72" textAnchor="middle" fill="#A0A0A0" fontSize="10" fontFamily="var(--font-jetbrains)">AI Processing</text>
              <text className="flow-label" x="450" y="72" textAnchor="middle" fill="#A0A0A0" fontSize="10" fontFamily="var(--font-jetbrains)">Results</text>
            </svg>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50">
          <div className="w-5 h-8 border border-text-tertiary rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-text-tertiary rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      <div className="stripe-divider" />

      {/* ═══ THE PROBLEM ═══ */}
      <section ref={problemRef} className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="problem-label section-label">THE GAP</div>
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <h2 className="problem-headline font-satoshi font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-8">
                Most businesses bolt AI onto broken processes.
              </h2>
              <div className="problem-text space-y-4 text-text-secondary leading-relaxed text-base md:text-lg">
                <p>
                  They buy a ChatGPT subscription. Someone watches a YouTube video. A consultant flies in, does impressive demos, and leaves.
                </p>
                <p>
                  The tools aren&apos;t the problem. The approach is. AI doesn&apos;t fix bad processes. It accelerates them.
                </p>
              </div>
            </div>
            <div className="problem-visual flex items-center justify-center">
              {/* Animated "broken process" visual */}
              <div className="relative w-64 h-64 md:w-72 md:h-72">
                <svg viewBox="0 0 200 200" className="w-full h-full spin-slow opacity-30">
                  <defs>
                    <linearGradient id="brokenGrad" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#666" />
                      <stop offset="100%" stopColor="#333" />
                    </linearGradient>
                  </defs>
                  <path d="M 100 20 A 80 80 0 0 1 180 100" stroke="url(#brokenGrad)" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <path d="M 180 100 A 80 80 0 0 1 100 180" stroke="url(#brokenGrad)" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="8 6" />
                  <path d="M 100 180 A 80 80 0 0 1 20 100" stroke="url(#brokenGrad)" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <path d="M 20 100 A 80 80 0 0 1 100 20" stroke="url(#brokenGrad)" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="8 6" />
                  {/* Arrow heads */}
                  <polygon points="176,90 184,100 174,104" fill="#666" />
                  <polygon points="104,176 100,184 96,174" fill="#666" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-jetbrains text-text-tertiary text-sm">∞ loop</div>
                    <div className="font-jetbrains text-text-tertiary text-xs mt-1 opacity-60">no output</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="stripe-divider" />

      {/* ═══ SERVICES ═══ */}
      <section ref={servicesRef} className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="services-label section-label">SERVICES</div>
          <h2 className="services-headline font-satoshi font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-14">
            The full lifecycle, handled.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s) => (
              <div key={s.num} className="service-card gradient-border-card p-6 md:p-8 group hover:bg-bg-tertiary transition-colors">
                <span className="font-jetbrains text-accent-amber text-sm opacity-60 mb-4 block">{s.num}</span>
                <h3 className="font-satoshi font-bold text-lg md:text-xl mb-3 text-text-primary group-hover:text-accent-amber transition-colors">
                  {s.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="stripe-divider" />

      {/* ═══ STATS ═══ */}
      <section ref={statsRef} className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="section-label">RESULTS</div>
          <h2 className="font-satoshi font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-14">
            Numbers don&apos;t lie.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {STATS.map((s, i) => (
              <div key={i} className="stat-card bg-bg-secondary rounded-2xl p-6 md:p-8 border border-white/5">
                <div
                  className="stat-number font-jetbrains text-accent-amber text-3xl md:text-4xl font-bold mb-2"
                  data-target={s.num}
                  data-prefix={s.prefix}
                  data-suffix={s.suffix}
                  data-special={s.special ? "true" : "false"}
                >
                  {s.special ? "D+" : `${s.prefix}0${s.suffix}`}
                </div>
                <p className="text-text-secondary text-sm mb-4">{s.desc}</p>
                <div className="h-1 bg-bg-tertiary rounded-full overflow-hidden">
                  <div
                    className="stat-bar-fill h-full rounded-full bg-gradient-to-r from-accent-amber to-orange-400"
                    data-width={`${s.bar}%`}
                    style={{ width: 0 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="stripe-divider" />

      {/* ═══ PROCESS ═══ */}
      <section ref={processRef} id="process" className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <div className="section-label">PROCESS</div>
          <h2 className="font-satoshi font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-16">
            How We Work
          </h2>

          <div className="relative">
            {/* SVG connecting line — desktop only */}
            <svg ref={processSvgRef} className="hidden md:block absolute left-[39px] top-0 h-full w-2" viewBox="0 0 4 500" preserveAspectRatio="none" fill="none">
              <defs>
                <linearGradient id="processGrad" x1="0" y1="0" x2="0" y2="500" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#F97316" />
                </linearGradient>
              </defs>
              <line className="process-line" x1="2" y1="0" x2="2" y2="500" stroke="url(#processGrad)" strokeWidth="2" />
            </svg>

            <div className="space-y-12 md:space-y-16">
              {PROCESS_STEPS.map((step, i) => (
                <div key={i} className="process-node flex items-start gap-6 md:gap-10">
                  <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-bg-secondary border border-white/10 flex items-center justify-center">
                      <span className="font-jetbrains text-accent-amber font-bold text-lg">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <h3 className="font-satoshi font-bold text-xl md:text-2xl mb-2 text-text-primary">{step.title}</h3>
                    <p className="text-text-secondary text-base leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="stripe-divider" />

      {/* ═══ ABOUT ═══ */}
      <section ref={aboutRef} className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="section-label">ABOUT</div>
          <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-center">
            {/* Avatar */}
            <div className="about-image md:col-span-2 flex justify-center">
              <div className="relative">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-accent-amber via-orange-400 to-pink-400 p-[3px]">
                  <div className="w-full h-full rounded-full bg-bg-secondary flex items-center justify-center">
                    <span className="font-satoshi font-black text-5xl md:text-6xl bg-gradient-to-br from-accent-amber to-orange-400 bg-clip-text text-transparent">NZ</span>
                  </div>
                </div>
                {/* Decorative dots */}
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-accent-amber rounded-full opacity-20" />
                <div className="absolute -bottom-2 -left-4 w-4 h-4 bg-orange-400 rounded-full opacity-15" />
              </div>
            </div>
            {/* Text */}
            <div className="about-text md:col-span-3">
              <h2 className="font-satoshi font-bold text-3xl md:text-4xl leading-tight mb-6">
                The business guy who builds.
              </h2>
              <div className="space-y-4 text-text-secondary text-base md:text-lg leading-relaxed">
                <p>
                  Ad sales at 300 Entertainment. Product launches at io.net. $1M+ art operations for Yung Jake. Events for 1,500 people.
                </p>
                <p>
                  Now: AI operations consulting. One person, every tool, real results. Not demos or decks — audits, builds, training, and ongoing support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="stripe-divider" />

      {/* ═══ FOOTER ═══ */}
      <footer ref={footerRef} className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="gradient-mesh gradient-mesh-dark">
          <div className="blob-3" />
        </div>

        <div className="footer-content relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="font-satoshi font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-8">
            Ready to see what&apos;s possible?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 bg-accent-amber text-bg-primary font-satoshi font-bold rounded-full hover:bg-amber-400 hover:scale-105 transition-all text-base">
              Book a Call
            </a>
            <a href={`mailto:hello@ennoble.one?subject=Free%20Audit%20Request`}
              className="px-8 py-4 border border-text-tertiary text-text-primary font-satoshi font-bold rounded-full hover:border-accent-amber hover:text-accent-amber transition-all text-base">
              Get a Free Audit
            </a>
          </div>
          <div className="space-y-2 text-text-tertiary text-sm">
            <p>
              <a href="mailto:hello@ennoble.one" className="hover:text-accent-amber transition-colors">hello@ennoble.one</a>
            </p>
            <p>&copy; {new Date().getFullYear()} Ennoble. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
