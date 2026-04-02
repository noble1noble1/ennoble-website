'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

// ════════════════════════════════════════
// TYPING ANIMATION HOOK
// ════════════════════════════════════════
function useTypingAnimation(
  lines: { text: string; className?: string }[],
  startDelay = 500,
  charDelay = 30,
  lineDelay = 200,
  trigger = true
) {
  const [displayLines, setDisplayLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!trigger) return;
    setDisplayLines([]);
    setCurrentLine(0);
    setCurrentChar(0);
    setDone(false);

    const timeout = setTimeout(() => {
      setDisplayLines(['']);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [trigger, startDelay]);

  useEffect(() => {
    if (!trigger || done || displayLines.length === 0) return;
    if (currentLine >= lines.length) {
      setDone(true);
      return;
    }

    const line = lines[currentLine].text;
    if (currentChar < line.length) {
      const t = setTimeout(() => {
        setDisplayLines((prev) => {
          const copy = [...prev];
          copy[currentLine] = line.slice(0, currentChar + 1);
          return copy;
        });
        setCurrentChar((c) => c + 1);
      }, charDelay);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
        setDisplayLines((prev) => [...prev, '']);
      }, lineDelay);
      return () => clearTimeout(t);
    }
  }, [currentLine, currentChar, displayLines, lines, charDelay, lineDelay, done, trigger]);

  return { displayLines, done, lines };
}

// ════════════════════════════════════════
// COUNTER ANIMATION HOOK
// ════════════════════════════════════════
function useCounter(end: number, duration = 2000, trigger = false, prefix = '', suffix = '') {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const start = 0;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, end, duration]);
  return `${prefix}${value.toLocaleString()}${suffix}`;
}

// ════════════════════════════════════════
// MAIN PAGE
// ════════════════════════════════════════
export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [metricsVisible, setMetricsVisible] = useState(false);
  const [pipelineActive, setPipelineActive] = useState(-1);

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

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  // GSAP scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-in sections
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      });

      // Code blocks slide in
      gsap.utils.toArray<HTMLElement>('.code-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          }
        );
      });

      // Metrics trigger
      ScrollTrigger.create({
        trigger: '#metrics',
        start: 'top 75%',
        onEnter: () => setMetricsVisible(true),
        once: true,
      });

      // Pipeline cards stagger
      ScrollTrigger.create({
        trigger: '#pipeline',
        start: 'top 70%',
        onEnter: () => {
          [0, 1, 2, 3, 4].forEach((i) => {
            setTimeout(() => setPipelineActive(i), i * 200);
          });
        },
        once: true,
      });

      // Service cards
      gsap.utils.toArray<HTMLElement>('.service-card').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  // Hero typing
  const heroLines = [
    { text: '> analyzing operations...', className: 'text-text-secondary' },
    { text: '✓ website audit complete', className: 'text-emerald-400' },
    { text: '✓ $9K waste identified', className: 'text-emerald-400' },
    { text: '✓ 12 automation opportunities', className: 'text-emerald-400' },
    { text: '> building custom systems...', className: 'text-text-secondary' },
    { text: '✓ 3 agents deployed', className: 'text-emerald-400' },
    { text: '> optimizing workflow...', className: 'text-text-secondary' },
  ];
  const heroTyping = useTypingAnimation(heroLines, 800, 25, 300);

  // Counters
  const waste = useCounter(9000, 2000, metricsVisible, '$', '');
  const speed = useCounter(2, 1500, metricsVisible, '', '');
  const trained = useCounter(15, 1800, metricsVisible);
  const systems = useCounter(12, 1600, metricsVisible);

  const CALENDLY = 'https://calendly.com/znob';

  const services = [
    { cmd: '> audit', title: 'AI Operations Audit', desc: 'Find what\'s broken. Website, ad spend, sales process, tools, workflows.' },
    { cmd: '> build', title: 'Custom AI Systems', desc: 'Websites, dashboards, agents, automations. Built for your stack.' },
    { cmd: '> train', title: 'Team Training', desc: 'Skill transfer, not demos. Challenge-based. Role-specific.' },
    { cmd: '> ops', title: 'Fractional AI Ops', desc: 'Your AI department. Ongoing builds, optimization, support.' },
  ];

  const pipeline = [
    { title: 'Discovery', desc: '30 min call. We map what matters.' },
    { title: 'Audit', desc: 'Deep dive. Specific findings. Clear priorities.' },
    { title: 'Build', desc: 'Custom systems. Your stack. Weekly updates.' },
    { title: 'Train', desc: 'Your team learns by doing.' },
    { title: 'Optimize', desc: 'We stay. Monthly reviews.' },
  ];

  const metrics = [
    { label: 'waste_identified', value: waste, pct: 80, tag: 'audit' },
    { label: 'deploy_speed', value: `${speed} weeks`, pct: 100, tag: 'build' },
    { label: 'team_trained', value: trained, pct: 70, tag: 'train' },
    { label: 'grade_improvement', value: 'D+ → A', pct: 100, tag: 'audit' },
    { label: 'systems_built', value: systems, pct: 90, tag: 'build' },
  ];

  return (
    <div ref={mainRef} className="relative">
      {/* ══════ NAV ══════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-bg-primary/80 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-satoshi font-bold text-xl tracking-tight">ennoble</span>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-lg bg-accent-purple text-white text-sm font-medium hover:bg-purple-500 transition-all"
          >
            Book a Call
          </a>
        </div>
      </nav>

      {/* ══════ HERO ══════ */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
        {/* Dot grid background */}
        <div className="absolute inset-0 dot-grid" />
        {/* Gradient glow */}
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-accent-purple/20 rounded-full blur-[120px] glow-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] glow-pulse pointer-events-none" style={{ animationDelay: '1.5s' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left */}
          <div>
            <h1 className="font-satoshi font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-6">
              What if your best employee{' '}
              <span className="bg-gradient-to-r from-accent-purple to-blue-400 bg-clip-text text-transparent">
                never slept?
              </span>
            </h1>
            <p className="font-inter text-text-secondary text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
              AI systems that work while you don&apos;t. Audits, builds, training, ops.
            </p>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-to-r from-accent-purple to-purple-500 text-white font-medium text-base hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all"
            >
              Book a Call
              <span className="text-sm">→</span>
            </a>
          </div>

          {/* Right — Terminal */}
          <div className="code-reveal lg:justify-self-end w-full max-w-md">
            <div className="bg-bg-secondary/80 backdrop-blur border border-white/10 rounded-xl overflow-hidden shadow-2xl">
              {/* Terminal title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-xs text-text-tertiary font-jetbrains">ennoble-cli</span>
              </div>
              {/* Terminal body */}
              <div className="p-5 font-jetbrains text-sm leading-7 min-h-[240px]">
                {heroTyping.displayLines.map((text, i) => (
                  <div key={i} className={heroTyping.lines[i]?.className || 'text-text-secondary'}>
                    {text}
                    {i === heroTyping.displayLines.length - 1 && !heroTyping.done && (
                      <span className="cursor-blink text-accent-purple font-bold">█</span>
                    )}
                  </div>
                ))}
                {heroTyping.done && (
                  <div className="text-text-secondary">
                    <span className="cursor-blink text-accent-purple font-bold">█</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ THE PROBLEM ══════ */}
      <section className="py-24 sm:py-32 relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="reveal">
            <span className="font-jetbrains text-accent-purple text-sm tracking-wide mb-6 block">
              {'// THE PROBLEM'}
            </span>
            <h2 className="font-satoshi font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-10">
              Most businesses bolt AI onto{' '}
              <span className="text-text-tertiary line-through decoration-accent-purple/50">broken</span>{' '}
              processes.
            </h2>
          </div>

          <div className="code-reveal bg-bg-secondary/50 border border-white/5 rounded-xl p-6 sm:p-8 font-jetbrains text-sm sm:text-base leading-8">
            <p className="text-accent-purple/70">{'// What usually happens:'}</p>
            <p className="text-text-primary pl-0 sm:pl-4">They buy a ChatGPT subscription.</p>
            <p className="text-text-primary pl-0 sm:pl-4">Someone watches a YouTube video.</p>
            <p className="text-text-primary pl-0 sm:pl-4">A consultant does a 3-day kickoff with demos.</p>
            <br />
            <p className="text-accent-purple/70">{'// Result:'}</p>
            <p className="text-text-primary pl-0 sm:pl-4">Nobody knows what to do on Monday morning.</p>
          </div>

          <p className="reveal font-inter text-text-secondary text-lg mt-8">
            The tools aren&apos;t the problem.{' '}
            <span className="text-text-primary font-medium">The approach is.</span>
          </p>
        </div>
      </section>

      {/* ══════ SERVICES ══════ */}
      <section className="py-24 sm:py-32 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="reveal mb-14">
            <span className="font-jetbrains text-accent-purple text-sm tracking-wide mb-4 block">
              {'// SERVICES'}
            </span>
            <h2 className="font-satoshi font-bold text-3xl sm:text-4xl lg:text-5xl">What We Do</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {services.map((s) => (
              <div
                key={s.cmd}
                className="service-card bg-bg-secondary/60 border border-white/5 rounded-xl p-6 sm:p-8"
              >
                <div className="border-t-2 border-gradient-purple -mt-6 sm:-mt-8 -mx-6 sm:-mx-8 mb-6"
                  style={{ borderImage: 'linear-gradient(to right, #8B5CF6, #3B82F6) 1' }}
                />
                <span className="font-jetbrains text-accent-purple text-sm mb-3 block">{s.cmd}</span>
                <h3 className="font-satoshi font-bold text-xl mb-2">{s.title}</h3>
                <p className="font-inter text-text-secondary leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ METRICS ══════ */}
      <section id="metrics" className="py-24 sm:py-32 relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="reveal mb-10">
            <span className="font-jetbrains text-accent-purple text-sm tracking-wide mb-4 block">
              {'// METRICS'}
            </span>
          </div>

          <div className="code-reveal bg-bg-secondary/50 border border-white/5 rounded-xl p-5 sm:p-8 font-jetbrains text-sm overflow-x-auto">
            <p className="text-text-secondary mb-4">{'> ennoble metrics --all'}</p>
            <div className="space-y-3">
              {metrics.map((m, i) => (
                <div key={m.label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
                  <span className="text-text-tertiary w-44 shrink-0">{m.label}</span>
                  <span className="text-text-primary w-24 shrink-0 font-medium">{m.value}</span>
                  <div className="flex-1 flex items-center gap-3">
                    <div className="flex-1 h-3 bg-bg-tertiary rounded-sm overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent-purple to-blue-400 rounded-sm transition-all duration-[2s] ease-out"
                        style={{
                          width: metricsVisible ? `${m.pct}%` : '0%',
                          transitionDelay: `${i * 200}ms`,
                        }}
                      />
                    </div>
                    <span className="text-text-tertiary text-xs w-10 text-right">{m.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════ PIPELINE ══════ */}
      <section id="pipeline" className="py-24 sm:py-32 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="reveal mb-14">
            <span className="font-jetbrains text-accent-purple text-sm tracking-wide mb-4 block">
              {'// PIPELINE'}
            </span>
            <h2 className="font-satoshi font-bold text-3xl sm:text-4xl lg:text-5xl">How We Work</h2>
          </div>

          {/* Desktop: horizontal */}
          <div className="hidden lg:flex items-start gap-0 relative">
            {pipeline.map((step, i) => (
              <div key={step.title} className="flex items-start flex-1">
                <div
                  className={`flex flex-col items-center text-center transition-all duration-500 ${
                    i <= pipelineActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-jetbrains text-sm font-bold mb-4 transition-all duration-500 ${
                      i <= pipelineActive
                        ? 'bg-gradient-to-br from-accent-purple to-blue-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                        : 'bg-bg-tertiary text-text-tertiary'
                    }`}
                  >
                    {i + 1}
                  </div>
                  <h3 className="font-satoshi font-bold text-base mb-2">{step.title}</h3>
                  <p className="font-inter text-text-secondary text-sm max-w-[160px]">{step.desc}</p>
                </div>
                {i < pipeline.length - 1 && (
                  <div className="flex-1 flex items-center pt-6 px-2">
                    <div className="w-full h-px relative">
                      <div className="absolute inset-0 bg-white/10" />
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-accent-purple to-blue-400 transition-all duration-700"
                        style={{
                          width: i < pipelineActive ? '100%' : '0%',
                          transitionDelay: `${i * 200}ms`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile: vertical */}
          <div className="lg:hidden space-y-6">
            {pipeline.map((step, i) => (
              <div
                key={step.title}
                className={`flex gap-4 items-start transition-all duration-500 ${
                  i <= pipelineActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-jetbrains text-sm font-bold shrink-0 transition-all duration-500 ${
                    i <= pipelineActive
                      ? 'bg-gradient-to-br from-accent-purple to-blue-500 text-white'
                      : 'bg-bg-tertiary text-text-tertiary'
                  }`}
                >
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-satoshi font-bold text-base">{step.title}</h3>
                  <p className="font-inter text-text-secondary text-sm mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ ABOUT ══════ */}
      <section className="py-24 sm:py-32 relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="reveal">
            <span className="font-jetbrains text-accent-purple text-sm tracking-wide mb-8 block">
              {'// ABOUT'}
            </span>
          </div>

          <div className="reveal bg-bg-secondary/50 border border-white/5 rounded-xl p-6 sm:p-10">
            <div className="flex items-start gap-5 mb-6">
              {/* Avatar */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-bg-tertiary shrink-0 flex items-center justify-center text-2xl font-satoshi font-bold text-accent-purple ring-2 ring-accent-purple/30 ring-offset-2 ring-offset-bg-secondary">
                NZ
              </div>
              <div>
                <h3 className="font-satoshi font-bold text-2xl">Noble</h3>
                <p className="font-jetbrains text-text-tertiary text-sm">@ennoble · AI Operations</p>
              </div>
            </div>

            <div className="font-inter text-text-secondary leading-relaxed space-y-3 mb-8">
              <p>
                Business guy who builds. Ad sales → crypto → art ops → AI consulting.
              </p>
              <p>
                300 Entertainment, io.net, Yung Jake ($1M+ operations).
              </p>
              <p className="text-text-primary font-medium">
                Now: one person, every tool, real results.
              </p>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 font-jetbrains text-sm text-text-tertiary">
              <span>
                <span className="text-text-primary font-medium">5</span> clients
              </span>
              <span>
                <span className="text-text-primary font-medium">12</span> systems
              </span>
              <span>
                <span className="text-text-primary font-medium">15</span> trained
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="reveal font-satoshi font-bold text-4xl sm:text-5xl lg:text-6xl mb-8">
            Ready to{' '}
            <span className="bg-gradient-to-r from-accent-purple to-blue-400 bg-clip-text text-transparent">
              ship?
            </span>
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-accent-purple to-purple-500 text-white font-medium hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all"
            >
              Book a Call
            </a>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-lg border border-white/20 text-text-primary font-medium hover:border-accent-purple/50 hover:text-accent-purple transition-all"
            >
              Get a Free Audit
            </a>
          </div>

          <div className="space-y-2">
            <a
              href="mailto:hello@ennoble.one"
              className="font-jetbrains text-text-tertiary text-sm hover:text-accent-purple transition-colors block"
            >
              hello@ennoble.one
            </a>
            <p className="font-inter text-text-tertiary text-xs">© 2026 Ennoble</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
