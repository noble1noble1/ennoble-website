"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

/* ─── Particle Background ─── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const dots: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const COUNT = 60;

    function resize() {
      canvas!.width = canvas!.offsetWidth * 2;
      canvas!.height = canvas!.offsetHeight * 2;
    }
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < COUNT; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > canvas!.width) d.vx *= -1;
        if (d.y < 0 || d.y > canvas!.height) d.vy *= -1;
        ctx!.beginPath();
        ctx!.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(16, 185, 129, 0.15)";
        ctx!.fill();
      });
      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="particle-canvas" />;
}

/* ─── Section Label ─── */
function Label({ children }: { children: string }) {
  return (
    <span className="inline-block text-xs font-jetbrains font-medium tracking-[0.2em] uppercase text-accent-emerald border border-accent-emerald/30 rounded-full px-4 py-1.5 mb-6">
      {children}
    </span>
  );
}

/* ─── Main Page ─── */
export default function Page() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* Lenis smooth scroll */
    const lenis = new Lenis({ duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    /* Nav fade in */
    gsap.fromTo("nav", { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out" });

    /* Hero fade + slide up */
    gsap.fromTo(
      ".hero-content > *",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, delay: 0.5, ease: "power2.out" }
    );

    /* Generic reveal for sections */
    gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      );
    });

    /* Staggered cards */
    gsap.utils.toArray<HTMLElement>(".stagger-group").forEach((group) => {
      const cards = group.querySelectorAll(".stagger-item");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: group, start: "top 85%", once: true },
        }
      );
    });

    /* Counter animation */
    gsap.utils.toArray<HTMLElement>(".counter").forEach((el) => {
      const text = el.dataset.value || el.textContent || "";
      // Only animate pure numbers
      const num = parseFloat(text.replace(/[^0-9.]/g, ""));
      if (isNaN(num)) {
        // Non-numeric stats — just reveal
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.6, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
        return;
      }
      const prefix = text.match(/^[^0-9]*/)?.[0] || "";
      const suffix = text.match(/[^0-9]*$/)?.[0] || "";
      const obj = { val: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: num,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = prefix + (num % 1 === 0 ? Math.round(obj.val) : obj.val.toFixed(1)) + suffix;
            },
          });
        },
      });
    });

    /* Timeline line draw */
    const line = document.querySelector(".timeline-draw");
    if (line) {
      gsap.fromTo(
        line,
        { strokeDashoffset: 600 },
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: { trigger: ".timeline-section", start: "top 70%", end: "bottom 60%", scrub: 1 },
        }
      );
    }

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const services = [
    {
      num: "01",
      title: "AI Operations Audit",
      desc: "We look at how your business actually runs — website, ad spend, sales process, tools, workflows. We find the gaps, the waste, and the opportunities you didn\u2019t know existed.",
    },
    {
      num: "02",
      title: "Custom AI Systems",
      desc: "Websites, dashboards, AI agents, automations. We build what your business needs but doesn\u2019t have.",
    },
    {
      num: "03",
      title: "Team Training & Adoption",
      desc: "We teach your team AI in the context of their real work. Challenge-based, not demo-based.",
    },
    {
      num: "04",
      title: "Fractional AI Ops",
      desc: "Your AI department, without the department. Ongoing support, new builds, continuous optimization.",
    },
  ];

  const stats = [
    { value: "$9K", label: "in wasted ad spend identified in one audit" },
    { value: "2 weeks", label: "from zero to live website" },
    { value: "15 people", label: "trained on AI adoption" },
    { value: "D+ → A", label: "website grade improvement" },
    { value: "12", label: "AI systems designed for one operation" },
    { value: "$10K/yr", label: "in redundant tool costs identified" },
  ];

  const steps = [
    { title: "Discovery", desc: "30 minutes. No charge. We figure out what\u2019s broken." },
    { title: "Audit", desc: "Deep dive into your operations. Specific findings, clear priorities." },
    { title: "Build", desc: "Custom systems. Your stack. Weekly progress updates." },
    { title: "Train", desc: "Role-specific skills. Challenge-based learning." },
    { title: "Optimize", desc: "We don\u2019t disappear. Monthly reviews, continuous improvement." },
  ];

  return (
    <div ref={mainRef} className="bg-bg-primary min-h-[100dvh]">
      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 inset-x-0 z-50 opacity-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
          <a href="#" className="font-satoshi font-bold text-lg text-text-primary tracking-tight">
            ennoble
          </a>
          <a
            href="https://calendly.com/noblezachnoble/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-text-secondary hover:text-accent-emerald transition-colors"
          >
            Book a Call
          </a>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <ParticleCanvas />
        <div className="hero-content relative z-10 text-center max-w-3xl mx-auto px-6">
          <h1 className="font-satoshi font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight text-text-primary opacity-0">
            AI that works.<br />Not AI that impresses.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed opacity-0">
            We help businesses find their highest-impact AI opportunities, then build and deploy the systems that capture them.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
            <a
              href="https://calendly.com/noblezachnoble/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent-emerald text-bg-primary font-medium px-7 py-3 rounded-lg text-sm hover:bg-emerald-400 transition-colors"
            >
              Book a Call
            </a>
            <a
              href="mailto:hello@ennoble.one?subject=Free%20AI%20Audit"
              className="border border-text-tertiary text-text-primary font-medium px-7 py-3 rounded-lg text-sm hover:border-accent-emerald hover:text-accent-emerald transition-colors"
            >
              Get a Free Audit
            </a>
          </div>
        </div>
      </section>

      {/* ═══ THE PROBLEM ═══ */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="reveal">
            <Label>THE PROBLEM</Label>
          </div>
          <h2 className="reveal font-satoshi font-bold text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
            Most businesses bolt AI onto broken processes.
          </h2>
          <div className="reveal mt-10 space-y-6 text-text-secondary text-lg leading-relaxed text-left sm:text-center">
            <p>
              They buy a ChatGPT subscription. Someone watches a YouTube video. A consultant flies in, does a 3-day kickoff with impressive demos, and leaves. Nobody knows what to actually do on Monday morning.
            </p>
            <p className="text-text-primary font-medium">
              The tools aren&apos;t the problem. The approach is.
            </p>
            <p>
              You don&apos;t need more tools. You need someone who understands your business, finds where AI actually moves the needle, and builds the systems that do it.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="reveal"><Label>SERVICES</Label></div>
            <h2 className="reveal font-satoshi font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight">What We Do</h2>
          </div>
          <div className="stagger-group grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((s) => (
              <div
                key={s.num}
                className="stagger-item card-hover opacity-0 border border-bg-tertiary rounded-xl p-8 bg-bg-secondary/50"
              >
                <span className="font-jetbrains text-accent-emerald text-sm font-bold">{s.num}</span>
                <h3 className="font-satoshi font-bold text-xl mt-3 mb-3 text-text-primary">{s.title}</h3>
                <p className="text-text-secondary leading-relaxed text-[15px]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RESULTS / STATS ═══ */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="reveal"><Label>RESULTS</Label></div>
            <h2 className="reveal font-satoshi font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight">Proof, Not Promises</h2>
          </div>
          <div className="stagger-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {stats.map((s, i) => (
              <div
                key={i}
                className="stagger-item opacity-0 border border-bg-tertiary rounded-xl p-8 bg-bg-secondary/50 text-center"
              >
                <div
                  className="counter font-jetbrains font-bold text-3xl sm:text-4xl text-accent-emerald mb-3"
                  data-value={s.value}
                >
                  {s.value}
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW WE WORK / TIMELINE ═══ */}
      <section className="timeline-section py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="reveal"><Label>PROCESS</Label></div>
            <h2 className="reveal font-satoshi font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight">How We Work</h2>
          </div>
          <div className="relative">
            {/* SVG vertical line */}
            <svg className="absolute left-[19px] md:left-[23px] top-0 h-full w-2 overflow-visible" preserveAspectRatio="none">
              <line
                className="timeline-draw"
                x1="4" y1="0" x2="4" y2="100%"
                stroke="#10B981"
                strokeWidth="2"
                strokeDasharray="600"
                strokeDashoffset="600"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div className="space-y-12">
              {steps.map((step, i) => (
                <div key={i} className="reveal flex items-start gap-6 md:gap-8">
                  <div className="relative z-10 flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-bg-primary border-2 border-accent-emerald flex items-center justify-center">
                    <span className="font-jetbrains text-accent-emerald text-xs font-bold">{i + 1}</span>
                  </div>
                  <div className="pt-1.5">
                    <h3 className="font-satoshi font-bold text-xl text-text-primary">{step.title}</h3>
                    <p className="text-text-secondary mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="reveal"><Label>ABOUT</Label></div>
          </div>
          <div className="reveal border border-bg-tertiary rounded-xl p-10 md:p-14 bg-bg-secondary/50 flex flex-col md:flex-row items-start gap-8">
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-bg-tertiary flex items-center justify-center">
              <span className="font-satoshi font-bold text-text-secondary text-lg">NZ</span>
            </div>
            <div>
              <h3 className="font-satoshi font-bold text-2xl text-text-primary mb-4">Noble</h3>
              <p className="text-text-secondary leading-relaxed">
                Business guy who builds. I&apos;ve worked across ad sales, crypto, art operations, and tech. Now I help businesses figure out what AI actually does for them — not with demos or decks, but with audits, builds, training, and ongoing support. One person, moving fast, delivering results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER / CTA ═══ */}
      <section className="py-32 px-6 border-t border-bg-tertiary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="reveal font-satoshi font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight">
            Ready to get started?
          </h2>
          <div className="reveal mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://calendly.com/noblezachnoble/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent-emerald text-bg-primary font-medium px-7 py-3 rounded-lg text-sm hover:bg-emerald-400 transition-colors"
            >
              Book a Call
            </a>
            <a
              href="mailto:hello@ennoble.one?subject=Free%20AI%20Audit"
              className="border border-text-tertiary text-text-primary font-medium px-7 py-3 rounded-lg text-sm hover:border-accent-emerald hover:text-accent-emerald transition-colors"
            >
              Get a Free Audit
            </a>
          </div>
          <p className="reveal mt-12 text-text-tertiary text-sm">
            <a href="mailto:hello@ennoble.one" className="hover:text-accent-emerald transition-colors">
              hello@ennoble.one
            </a>
          </p>
          <p className="mt-8 text-text-tertiary/50 text-xs">
            &copy; {new Date().getFullYear()} Ennoble. All rights reserved.
          </p>
        </div>
      </section>
    </div>
  );
}
