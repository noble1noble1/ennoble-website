'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

/* ─── TYPING ANIMATION HOOK ─── */
function useTyping(text: string, speed = 45, startDelay = 0) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  const start = useCallback(() => {
    if (started) return;
    setStarted(true);
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => clearTimeout(timer);
  }, [text, speed, startDelay, started]);

  return { displayed, done, start };
}

/* ─── COUNTER COMPONENT ─── */
function Counter({ end, suffix = '', prefix = '', duration = 1.5 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        if (counted.current) return;
        counted.current = true;
        gsap.fromTo(el, { innerText: 0 }, {
          innerText: end,
          duration,
          snap: { innerText: 1 },
          ease: 'power2.out',
          onUpdate: function () {
            el.textContent = prefix + Math.round(parseFloat(el.innerText || '0')).toLocaleString() + suffix;
          },
        });
      },
    });
  }, [end, suffix, prefix, duration]);

  return <span ref={ref} className="text-accent-amber">{prefix}0{suffix}</span>;
}

/* ─── MAIN PAGE ─── */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTyping = useTyping("We find what's broken. Then we build what's next.", 50, 800);
  const [heroVisible, setHeroVisible] = useState(false);

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => lenis.destroy();
  }, []);

  // Hero init
  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 200);
    setTimeout(() => heroTyping.start(), 600);
  }, []);

  // Section scroll animations
  useEffect(() => {
    // Error log lines
    const logLines = document.querySelectorAll('.log-line');
    logLines.forEach((line, i) => {
      gsap.fromTo(line, { opacity: 0, x: -10 }, {
        opacity: 1, x: 0, duration: 0.3, delay: i * 0.12,
        scrollTrigger: { trigger: line, start: 'top 88%', once: true },
      });
    });

    // Service tree items
    const treeItems = document.querySelectorAll('.tree-item');
    treeItems.forEach((item, i) => {
      gsap.fromTo(item, { opacity: 0, y: 10 }, {
        opacity: 1, y: 0, duration: 0.4, delay: i * 0.15,
        scrollTrigger: { trigger: item, start: 'top 88%', once: true },
      });
    });

    // Pipeline steps
    const steps = document.querySelectorAll('.pipeline-step');
    steps.forEach((step, i) => {
      gsap.fromTo(step, { opacity: 0, scale: 0.9 }, {
        opacity: 1, scale: 1, duration: 0.4, delay: i * 0.2,
        scrollTrigger: { trigger: step, start: 'top 88%', once: true },
      });
    });

    // Section command prompts — glitch
    const prompts = document.querySelectorAll('.section-prompt');
    prompts.forEach((prompt) => {
      ScrollTrigger.create({
        trigger: prompt,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          prompt.classList.add('glitch-trigger');
          gsap.fromTo(prompt, { opacity: 0 }, { opacity: 1, duration: 0.3 });
          setTimeout(() => prompt.classList.remove('glitch-trigger'), 300);
        },
      });
    });

    // About section
    const aboutLines = document.querySelectorAll('.about-line');
    aboutLines.forEach((line, i) => {
      gsap.fromTo(line, { opacity: 0, x: -8 }, {
        opacity: 1, x: 0, duration: 0.25, delay: i * 0.08,
        scrollTrigger: { trigger: line, start: 'top 90%', once: true },
      });
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div className="relative">
      {/* ─── HERO ─── */}
      <section ref={heroRef} className="scanlines min-h-[100dvh] flex flex-col relative overflow-hidden">
        {/* Top bar */}
        <div className={`flex items-center justify-between px-6 md:px-12 py-4 border-b border-white/5 transition-opacity duration-700 ${heroVisible ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-text-tertiary text-sm font-jetbrains tracking-wide">
            ennoble.one <span className="text-text-tertiary/50">— v1.0.0</span>
          </span>
          <a
            href="https://calendly.com/znob"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-amber text-sm font-jetbrains hover:underline underline-offset-4"
          >
            Book a Call
          </a>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-5xl">
          <div className={`transition-all duration-700 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="text-text-tertiary text-sm mb-6 font-jetbrains">$ ennoble --discover</p>
          </div>

          <h1 className="font-satoshi text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 min-h-[4rem] md:min-h-[8rem]">
            {heroTyping.displayed}
            <span className={`inline-block w-[0.5em] h-[1.1em] bg-accent-amber ml-1 align-middle ${heroTyping.done ? 'cursor-blink' : ''}`} />
          </h1>

          <div className={`transition-all duration-700 ${heroTyping.done ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="text-text-secondary text-base md:text-lg font-jetbrains mb-10 max-w-2xl">
              <span className="text-text-tertiary mr-2">&gt;</span>
              AI operations for businesses that make real things in the real world.
            </p>

            <a
              href="https://calendly.com/znob"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-accent-amber font-jetbrains text-lg hover:underline underline-offset-4 group"
            >
              <span className="text-text-tertiary mr-2">&gt;</span>
              book-call
              <span className="inline-block w-[0.5em] h-[0.9em] bg-accent-amber ml-2 align-middle cursor-blink opacity-60" />
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className={`pb-8 text-center transition-opacity duration-1000 delay-1000 ${heroTyping.done ? 'opacity-40' : 'opacity-0'}`}>
          <span className="text-text-tertiary text-xs font-jetbrains">scroll ↓</span>
        </div>
      </section>

      {/* ─── ERROR LOG ─── */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 border-t border-white/5">
        <div className="max-w-4xl">
          <p className="section-prompt text-text-tertiary text-sm font-jetbrains mb-10 opacity-0">$ ennoble --diagnose</p>

          <h2 className="log-line font-jetbrains text-accent-amber text-lg md:text-xl mb-8">
            [WARN] Most businesses bolt AI onto broken processes.
          </h2>

          <div className="space-y-3 font-jetbrains text-sm md:text-base">
            <p className="log-line text-text-secondary">
              <span className="text-text-tertiary">[2026-04-01]</span> They buy a ChatGPT subscription.
            </p>
            <p className="log-line text-text-secondary">
              <span className="text-text-tertiary">[2026-04-01]</span> Someone watches a YouTube video.
            </p>
            <p className="log-line text-text-secondary">
              <span className="text-text-tertiary">[2026-04-01]</span> A consultant flies in, does a 3-day kickoff.
            </p>
            <p className="log-line text-text-secondary">
              <span className="text-text-tertiary">[2026-04-01]</span> Nobody knows what to do on Monday morning.
            </p>
            <p className="log-line text-accent-red text-base md:text-lg mt-6">
              [ERROR] The tools aren&apos;t the problem. The approach is.
            </p>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 border-t border-white/5">
        <div className="max-w-4xl">
          <p className="section-prompt text-text-tertiary text-sm font-jetbrains mb-10 opacity-0">$ ennoble --services</p>

          <div className="font-jetbrains text-sm md:text-base space-y-8">
            {/* Service 1 */}
            <div className="tree-item">
              <p className="text-text-tertiary">├── 01-audit/</p>
              <div className="tree-indent pl-8 md:pl-12 mt-1">
                <p className="text-text-primary text-base md:text-lg">└── <span className="text-accent-amber">AI Operations Audit</span></p>
                <p className="text-text-secondary pl-8 mt-1">Find what&apos;s broken, wasted, or invisible.</p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="tree-item">
              <p className="text-text-tertiary">├── 02-build/</p>
              <div className="tree-indent pl-8 md:pl-12 mt-1">
                <p className="text-text-primary text-base md:text-lg">└── <span className="text-accent-amber">Custom AI Systems</span></p>
                <p className="text-text-secondary pl-8 mt-1">Websites, dashboards, agents, automations.</p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="tree-item">
              <p className="text-text-tertiary">├── 03-train/</p>
              <div className="tree-indent pl-8 md:pl-12 mt-1">
                <p className="text-text-primary text-base md:text-lg">└── <span className="text-accent-amber">Team Training &amp; Adoption</span></p>
                <p className="text-text-secondary pl-8 mt-1">Skill transfer, not demos. Challenge-based.</p>
              </div>
            </div>

            {/* Service 4 */}
            <div className="tree-item">
              <p className="text-text-tertiary">└── 04-ops/</p>
              <div className="tree-indent pl-8 md:pl-12 mt-1">
                <p className="text-text-primary text-base md:text-lg">└── <span className="text-accent-amber">Fractional AI Ops</span></p>
                <p className="text-text-secondary pl-8 mt-1">Your AI department, without the department.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── METRICS ─── */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 border-t border-white/5">
        <div className="max-w-4xl">
          <p className="section-prompt text-text-tertiary text-sm font-jetbrains mb-10 opacity-0">$ ennoble --metrics</p>

          <div className="font-jetbrains space-y-6">
            <div className="flex items-baseline gap-4 md:gap-12">
              <span className="text-text-secondary text-sm md:text-base w-44 md:w-52 shrink-0">waste_identified</span>
              <span className="text-lg md:text-2xl font-bold"><Counter end={9000} prefix="$" suffix="" /></span>
            </div>
            <div className="flex items-baseline gap-4 md:gap-12">
              <span className="text-text-secondary text-sm md:text-base w-44 md:w-52 shrink-0">deploy_time</span>
              <span className="text-lg md:text-2xl font-bold"><Counter end={2} suffix=" weeks" /></span>
            </div>
            <div className="flex items-baseline gap-4 md:gap-12">
              <span className="text-text-secondary text-sm md:text-base w-44 md:w-52 shrink-0">team_trained</span>
              <span className="text-lg md:text-2xl font-bold"><Counter end={15} suffix=" people" /></span>
            </div>
            <div className="flex items-baseline gap-4 md:gap-12">
              <span className="text-text-secondary text-sm md:text-base w-44 md:w-52 shrink-0">grade_improvement</span>
              <span className="text-lg md:text-2xl font-bold text-accent-amber">D+ → A</span>
            </div>
            <div className="flex items-baseline gap-4 md:gap-12">
              <span className="text-text-secondary text-sm md:text-base w-44 md:w-52 shrink-0">systems_built</span>
              <span className="text-lg md:text-2xl font-bold"><Counter end={12} /></span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PIPELINE ─── */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 border-t border-white/5">
        <div className="max-w-5xl">
          <p className="section-prompt text-text-tertiary text-sm font-jetbrains mb-12 opacity-0">$ ennoble --pipeline</p>

          {/* Desktop pipeline */}
          <div className="hidden md:flex items-start justify-between gap-2 mb-12">
            {[
              { num: 1, title: 'Discovery', desc: 'Deep-dive into your operations, tools, and team to map the landscape.' },
              { num: 2, title: 'Audit', desc: 'Score every process. Find the waste, the gaps, the quick wins.' },
              { num: 3, title: 'Build', desc: 'Custom AI systems designed for your actual workflows.' },
              { num: 4, title: 'Train', desc: 'Hands-on skill transfer. Your team owns it, not us.' },
              { num: 5, title: 'Optimize', desc: 'Ongoing tuning. Fractional AI ops on retainer.' },
            ].map((step, i) => (
              <div key={step.num} className="pipeline-step flex flex-col items-center text-center flex-1 opacity-0">
                <div className="flex items-center w-full">
                  <div className="w-10 h-10 rounded border border-accent-amber/40 flex items-center justify-center text-accent-amber font-jetbrains text-sm shrink-0 mx-auto">
                    {step.num}
                  </div>
                </div>
                <p className="text-text-primary font-jetbrains text-sm mt-3">{step.title}</p>
                <p className="text-text-tertiary font-jetbrains text-xs mt-2 max-w-[140px] leading-relaxed">{step.desc}</p>
                {i < 4 && (
                  <div className="absolute" />
                )}
              </div>
            ))}
          </div>

          {/* ASCII connectors — desktop */}
          <div className="hidden md:block font-jetbrains text-text-tertiary text-center text-sm mb-8">
            [1] ──→ [2] ──→ [3] ──→ [4] ──→ [5]
          </div>

          {/* Mobile pipeline */}
          <div className="md:hidden space-y-6">
            {[
              { num: 1, title: 'Discovery', desc: 'Deep-dive into your operations, tools, and team.' },
              { num: 2, title: 'Audit', desc: 'Score every process. Find the waste and quick wins.' },
              { num: 3, title: 'Build', desc: 'Custom AI systems for your actual workflows.' },
              { num: 4, title: 'Train', desc: 'Hands-on skill transfer. Your team owns it.' },
              { num: 5, title: 'Optimize', desc: 'Ongoing tuning. Fractional AI ops.' },
            ].map((step) => (
              <div key={step.num} className="pipeline-step flex items-start gap-4 opacity-0">
                <div className="w-8 h-8 rounded border border-accent-amber/40 flex items-center justify-center text-accent-amber font-jetbrains text-xs shrink-0">
                  {step.num}
                </div>
                <div>
                  <p className="text-text-primary font-jetbrains text-sm">{step.title}</p>
                  <p className="text-text-tertiary font-jetbrains text-xs mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT / README ─── */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 border-t border-white/5">
        <div className="max-w-3xl">
          <p className="section-prompt text-text-tertiary text-sm font-jetbrains mb-10 opacity-0">$ cat README.md</p>

          <div className="bg-bg-secondary/50 border border-white/5 rounded-lg p-6 md:p-10">
            {/* Avatar */}
            <div className="about-line flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-bg-tertiary flex items-center justify-center text-text-secondary font-jetbrains text-sm border border-white/10">
                NZ
              </div>
              <span className="text-text-tertiary font-jetbrains text-sm">Noble Zachary — Founder</span>
            </div>

            <h3 className="about-line font-satoshi text-xl md:text-2xl font-bold text-text-primary mb-2">
              # README.md
            </h3>

            <div className="font-jetbrains text-sm md:text-base space-y-4 mt-6">
              <p className="about-line text-accent-amber">## About</p>
              <p className="about-line text-text-secondary">Business guy who builds.</p>

              <p className="about-line text-accent-amber mt-6">## Experience</p>
              <ul className="space-y-2">
                <li className="about-line text-text-secondary">- Ad sales at 300 Entertainment</li>
                <li className="about-line text-text-secondary">- Product launches at io.net</li>
                <li className="about-line text-text-secondary">- $1M+ art operations for Yung Jake</li>
                <li className="about-line text-text-secondary">- Enterprise deals and events for 1,500+</li>
              </ul>

              <p className="about-line text-accent-amber mt-6">## Current</p>
              <p className="about-line text-text-secondary">AI operations consulting. One person, every tool, real results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-20 md:py-24 px-6 md:px-12 lg:px-24 border-t border-white/5">
        <div className="max-w-4xl">
          <p className="text-text-tertiary text-sm font-jetbrains mb-8">$ ennoble --contact</p>

          <div className="font-jetbrains text-base md:text-lg space-y-4">
            <a
              href="https://calendly.com/znob"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-text-secondary hover:text-accent-amber transition-colors group"
            >
              <span className="text-text-tertiary mr-3">&gt;</span>
              book-call
              <span className="text-text-tertiary ml-4 group-hover:text-accent-amber/60">→ calendly.com/znob</span>
            </a>

            <a
              href="https://calendly.com/znob"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-text-secondary hover:text-accent-amber transition-colors group"
            >
              <span className="text-text-tertiary mr-3">&gt;</span>
              free-audit
              <span className="text-text-tertiary ml-4 group-hover:text-accent-amber/60">→ Get started</span>
            </a>

            <a
              href="mailto:hello@ennoble.one"
              className="block text-text-secondary hover:text-accent-amber transition-colors group"
            >
              <span className="text-text-tertiary mr-3">&gt;</span>
              email
              <span className="text-text-tertiary ml-4 group-hover:text-accent-amber/60">→ hello@ennoble.one</span>
            </a>
          </div>

          <div className="mt-16 pt-8 border-t border-white/5">
            <p className="text-text-tertiary text-xs font-jetbrains">© 2026 ennoble.one</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
