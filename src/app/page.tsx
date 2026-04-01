'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroVisualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lenis smooth scroll
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
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 1. Nav blur reveal
    gsap.fromTo(
      '.nav-item',
      { opacity: 0, filter: 'blur(8px)' },
      { opacity: 1, filter: 'blur(0px)', duration: 0.9, stagger: 0.1, ease: 'power2.out', delay: 0.3 }
    );

    // 2. Hero text clip reveal (word by word)
    const heroWords = document.querySelectorAll('.hero-word');
    gsap.fromTo(
      heroWords,
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out', delay: 0.6 }
    );

    // Hero subheadline
    gsap.fromTo(
      '.hero-sub',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 1.6, ease: 'power2.out' }
    );

    // Hero button
    gsap.fromTo(
      '.hero-btn',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 2.0, ease: 'power2.out' }
    );

    // Hero visual elements
    gsap.fromTo(
      '.hero-shape',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, stagger: 0.15, delay: 0.8, ease: 'elastic.out(1,0.5)' }
    );

    // Parallax on hero decorative elements
    gsap.to('.hero-shape-1', {
      y: -80,
      scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1 },
    });
    gsap.to('.hero-shape-2', {
      y: -40,
      scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1 },
    });
    gsap.to('.hero-shape-3', {
      y: -120,
      scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1 },
    });

    // 3. Problem section — bold block reveal
    gsap.fromTo(
      '.problem-section',
      { clipPath: 'inset(0 0 100% 0)' },
      {
        clipPath: 'inset(0 0 0% 0)',
        duration: 1,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: '.problem-section', start: 'top 80%', end: 'top 30%', scrub: 1 },
      }
    );

    gsap.fromTo(
      '.problem-headline',
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: '.problem-section', start: 'top 60%', toggleActions: 'play none none reverse' },
      }
    );

    gsap.fromTo(
      '.problem-sub',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, delay: 0.2,
        scrollTrigger: { trigger: '.problem-section', start: 'top 60%', toggleActions: 'play none none reverse' },
      }
    );

    gsap.fromTo(
      '.problem-body',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, delay: 0.4,
        scrollTrigger: { trigger: '.problem-section', start: 'top 50%', toggleActions: 'play none none reverse' },
      }
    );

    // 4. What We Do — headline slide from left
    gsap.fromTo(
      '.services-headline',
      { x: -100, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.services-section', start: 'top 75%', toggleActions: 'play none none reverse' },
      }
    );

    // Service cards staggered entry
    gsap.fromTo(
      '.service-card',
      { y: 80, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.services-grid', start: 'top 80%', toggleActions: 'play none none reverse' },
      }
    );

    // 5. Stats counter animation
    const statElements = document.querySelectorAll('.stat-number');
    statElements.forEach((el) => {
      const target = el.getAttribute('data-target') || '';
      const isNumeric = /^\d+$/.test(target.replace(/[^0-9]/g, ''));

      if (isNumeric) {
        const numVal = parseInt(target.replace(/[^0-9]/g, ''));
        const prefix = target.match(/^[^0-9]*/)?.[0] || '';
        const suffix = target.match(/[^0-9]*$/)?.[0] || '';

        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          onEnter: () => {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: numVal, duration: 2, ease: 'power2.out',
              onUpdate: () => {
                const current = Math.round(obj.val);
                (el as HTMLElement).textContent = prefix + current + suffix;
              },
            });
          },
          once: true,
        });
      } else {
        // Non-numeric stats just fade in
        gsap.fromTo(el, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.6,
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        });
      }
    });

    // Stats labels
    gsap.fromTo(
      '.stat-label',
      { opacity: 0, y: 10 },
      {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.1,
        scrollTrigger: { trigger: '.stats-section', start: 'top 80%', toggleActions: 'play none none reverse' },
      }
    );

    // 6. How We Work — alternating slide in
    const steps = document.querySelectorAll('.process-step');
    steps.forEach((step, i) => {
      const fromX = i % 2 === 0 ? -100 : 100;
      gsap.fromTo(
        step,
        { x: fromX, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: step, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );
    });

    // Process line grow
    gsap.fromTo(
      '.process-line',
      { scaleY: 0 },
      {
        scaleY: 1, duration: 1, ease: 'none',
        scrollTrigger: { trigger: '.process-section', start: 'top 60%', end: 'bottom 60%', scrub: 1 },
      }
    );

    // 7. About section
    gsap.fromTo(
      '.about-headline',
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: '.about-section', start: 'top 70%', toggleActions: 'play none none reverse' },
      }
    );

    gsap.fromTo(
      '.about-avatar',
      { scale: 0.8, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: '.about-section', start: 'top 65%', toggleActions: 'play none none reverse' },
      }
    );

    gsap.fromTo(
      '.about-copy',
      { x: 60, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8, delay: 0.2,
        scrollTrigger: { trigger: '.about-section', start: 'top 65%', toggleActions: 'play none none reverse' },
      }
    );

    // 8. Footer CTA
    gsap.fromTo(
      '.footer-cta',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: '.footer-section', start: 'top 80%', toggleActions: 'play none none reverse' },
      }
    );

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Magnetic button handler
  const handleMagnetic = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.3)' });
  };

  const headline = 'Most AI consultants give you a deck. We give you systems.';

  return (
    <div ref={containerRef} className="overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-6 flex items-center justify-between">
          <a href="#" className="nav-item font-satoshi font-black text-2xl text-white opacity-0">
            ennoble
          </a>
          <div className="flex items-center gap-8">
            <a href="#services" className="nav-item font-inter text-sm text-white/70 hover:text-white transition-colors opacity-0">Services</a>
            <a href="#process" className="nav-item font-inter text-sm text-white/70 hover:text-white transition-colors opacity-0">Process</a>
            <a href="#about" className="nav-item font-inter text-sm text-white/70 hover:text-white transition-colors opacity-0">About</a>
            <a
              href="https://calendly.com/znob"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-item font-inter text-sm bg-accent-blue text-white px-5 py-2.5 rounded-full hover:bg-blue-500 transition-colors opacity-0"
            >
              Book a Call
            </a>
          </div>
        </div>
      </nav>

      {/* SECTION 1: HERO */}
      <section className="hero-section min-h-[100dvh] flex items-center relative">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 w-full">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-0">
            {/* Left — Text */}
            <div className="lg:w-[60%] w-full">
              <h1 className="font-satoshi font-black text-[clamp(2.5rem,6vw,6rem)] leading-[1.05] tracking-tight mb-8">
                {headline.split(' ').map((word, i) => (
                  <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
                    <span className="hero-word inline-block opacity-0">{word}</span>
                  </span>
                ))}
              </h1>
              <p className="hero-sub font-inter text-lg md:text-xl text-text-secondary max-w-xl mb-10 opacity-0">
                Audit. Build. Train. Stay. The full lifecycle of AI adoption, handled.
              </p>
              <a
                href="https://calendly.com/znob"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn inline-block bg-accent-blue text-white font-inter font-medium text-lg px-10 py-4 rounded-full opacity-0 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-shadow duration-300"
                onMouseMove={handleMagnetic}
                onMouseLeave={handleMagneticLeave}
              >
                Book a Call
              </a>
            </div>

            {/* Right — Abstract Visual */}
            <div ref={heroVisualRef} className="lg:w-[40%] w-full flex items-center justify-center relative h-[300px] lg:h-[500px]">
              {/* Animated geometric shapes */}
              <div className="hero-shape hero-shape-1 absolute w-48 h-48 md:w-64 md:h-64 border-2 border-accent-blue rounded-full opacity-0" style={{ top: '10%', right: '15%' }} />
              <div className="hero-shape hero-shape-2 absolute w-32 h-32 md:w-40 md:h-40 bg-accent-blue/10 rounded-full opacity-0" style={{ top: '30%', right: '5%' }} />
              <div className="hero-shape hero-shape-3 absolute w-20 h-20 md:w-28 md:h-28 border border-accent-blue/50 opacity-0" style={{ bottom: '20%', right: '25%' }} />
              <div className="hero-shape absolute w-1 h-32 md:h-48 bg-gradient-to-b from-accent-blue to-transparent opacity-0" style={{ top: '5%', right: '40%' }} />
              <div className="hero-shape absolute w-16 h-16 md:w-24 md:h-24 border border-accent-blue/30 rounded-full opacity-0" style={{ bottom: '10%', right: '10%' }} />
              {/* Pulsing dots grid */}
              <div className="hero-shape absolute grid grid-cols-5 gap-3 opacity-0" style={{ top: '20%', left: '10%' }}>
                {Array.from({ length: 25 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 bg-accent-blue rounded-full"
                    style={{ animation: `pulse 2s ease-in-out ${i * 0.1}s infinite` }}
                  />
                ))}
              </div>
              {/* Large E letterform */}
              <span className="hero-shape absolute font-satoshi font-black text-[12rem] md:text-[16rem] text-accent-blue/[0.07] leading-none select-none opacity-0" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                E
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM */}
      <section className="problem-section bg-accent-blue py-24 md:py-32 lg:py-40">
        <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12">
          <h2 className="problem-headline font-satoshi font-black text-[clamp(2rem,4vw,4rem)] text-white leading-tight mb-4">
            Your competitors are already using AI.
          </h2>
          <p className="problem-sub font-satoshi font-bold text-[clamp(1.25rem,2.5vw,2.25rem)] text-white/80 mb-10">
            They’re just not using it well.
          </p>
          <div className="problem-body font-inter text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl space-y-6">
            <p>
              They buy a ChatGPT subscription. Someone watches a YouTube video. A consultant flies in, does a 3-day kickoff with impressive demos, and leaves. Nobody knows what to actually do on Monday morning.
            </p>
            <p>
              The tools aren’t the problem. The approach is. You don’t need more tools. You need someone who understands your business, finds where AI actually moves the needle, and builds the systems that do it.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHAT WE DO */}
      <section id="services" className="services-section py-24 md:py-32 lg:py-40 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <h2 className="services-headline font-satoshi font-black text-[clamp(2.5rem,5vw,5.5rem)] leading-none mb-16 md:mb-20">
            What We Do
          </h2>
          <div className="services-grid grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                num: '01',
                title: 'AI Operations Audit',
                desc: "Find what’s broken, wasted, or invisible. We check your website, ad spend, sales process, tools, and workflows. We find the gaps you didn’t know existed.",
              },
              {
                num: '02',
                title: 'Custom AI Systems',
                desc: "Websites, automations, dashboards, agents. We build what your business needs but doesn’t have.",
              },
              {
                num: '03',
                title: 'Team Training & Adoption',
                desc: 'Not a demo. A skill transfer. We teach your team AI in the context of their real work.',
              },
              {
                num: '04',
                title: 'Fractional AI Ops',
                desc: 'Your AI department, without the department. Ongoing support, builds, and optimization.',
              },
            ].map((card) => (
              <div
                key={card.num}
                className="service-card group border border-white/10 rounded-2xl p-8 md:p-10 hover:border-accent-blue/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] transition-all duration-500 bg-bg-secondary/50"
              >
                <span className="font-jetbrains text-accent-blue text-sm mb-6 block">{card.num}</span>
                <h3 className="font-satoshi font-bold text-2xl md:text-3xl mb-4">{card.title}</h3>
                <p className="font-inter text-text-secondary leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: PROOF — STATS BAR */}
      <section className="stats-section bg-bg-secondary border-y border-white/5 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 text-center">
            {[
              { value: '$9K', target: '9', prefix: '$', suffix: 'K', label: 'wasted ad spend found' },
              { value: '2 wks', target: '2', prefix: '', suffix: ' wks', label: 'zero to live website' },
              { value: '15', target: '15', prefix: '', suffix: '', label: 'team members trained' },
              { value: 'D+ → A', target: 'D+ → A', prefix: '', suffix: '', label: 'site grade improvement', noCount: true },
              { value: '12', target: '12', prefix: '', suffix: '', label: 'AI systems built' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span
                  className="stat-number font-jetbrains font-medium text-accent-blue text-3xl md:text-4xl lg:text-5xl mb-2"
                  data-target={stat.noCount ? '' : stat.prefix + stat.target + stat.suffix}
                >
                  {stat.noCount ? stat.value : (stat.prefix + '0' + stat.suffix)}
                </span>
                <span className="stat-label font-inter text-sm text-text-secondary">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: HOW WE WORK */}
      <section id="process" className="process-section py-24 md:py-32 lg:py-40 bg-bg-primary relative">
        <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12">
          <h2 className="services-headline font-satoshi font-black text-[clamp(2.5rem,5vw,5.5rem)] leading-none mb-20 md:mb-24 text-center">
            How We Work
          </h2>

          <div className="relative">
            {/* Center line */}
            <div className="process-line absolute left-1/2 top-0 bottom-0 w-px bg-accent-blue/30 origin-top hidden md:block" />

            {[
              { num: '01', title: 'Discovery', desc: '30 minutes. No charge. We figure out what\'s broken.' },
              { num: '02', title: 'Audit', desc: 'Deep dive into your operations. Specific findings, not generic advice.' },
              { num: '03', title: 'Build', desc: 'Custom systems. Your stack. Weekly progress.' },
              { num: '04', title: 'Train', desc: 'Role-specific. Challenge-based. Skills they keep.' },
              { num: '05', title: 'Optimize', desc: 'We don\'t leave. Monthly check-ins. Continuous improvement.' },
            ].map((step, i) => (
              <div
                key={step.num}
                className={`process-step flex flex-col md:flex-row items-center mb-16 md:mb-20 last:mb-0 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                  <span className="font-jetbrains text-accent-blue text-5xl md:text-6xl font-medium block mb-3">
                    {step.num}
                  </span>
                  <h3 className="font-satoshi font-bold text-2xl md:text-3xl mb-3">{step.title}</h3>
                  <p className="font-inter text-text-secondary text-lg">{step.desc}</p>
                </div>
                {/* Center dot */}
                <div className="hidden md:flex w-4 h-4 bg-accent-blue rounded-full border-4 border-bg-primary z-10 absolute left-1/2 -translate-x-1/2" />
                <div className="md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: ABOUT */}
      <section id="about" className="about-section py-24 md:py-32 lg:py-40 bg-bg-secondary">
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
          <h2 className="about-headline font-satoshi font-black text-[clamp(2rem,4.5vw,4.5rem)] leading-tight mb-16">
            One person. Every tool.<br />Real results.
          </h2>
          <div className="flex flex-col md:flex-row items-start gap-12 md:gap-16">
            <div className="about-avatar w-32 h-32 md:w-48 md:h-48 rounded-full bg-bg-tertiary border border-white/10 flex items-center justify-center flex-shrink-0">
              <span className="font-satoshi font-bold text-3xl md:text-4xl text-text-secondary">NZ</span>
            </div>
            <div className="about-copy font-inter text-lg md:text-xl text-text-secondary leading-relaxed space-y-6">
              <p>
                I’ve worked in ad sales at 300 Entertainment, helped launch products at io.net, and managed a $1M+ art operation for Yung Jake.
              </p>
              <p>
                Now I help businesses figure out what AI actually does for them. Not with demos or decks. With audits, builds, training, and ongoing support. One person, moving fast, delivering results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: FOOTER CTA */}
      <section className="footer-section py-24 md:py-32 lg:py-40 bg-bg-primary">
        <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 text-center">
          <h2 className="footer-cta font-satoshi font-black text-[clamp(2rem,4vw,4rem)] leading-tight mb-12">
            Ready to see what AI actually does for your business?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="https://calendly.com/znob"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent-blue text-white font-inter font-medium text-lg px-10 py-4 rounded-full hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300"
              onMouseMove={handleMagnetic}
              onMouseLeave={handleMagneticLeave}
            >
              Book a Call
            </a>
            <a
              href="mailto:hello@ennoble.one?subject=Free%20AI%20Audit"
              className="inline-block border-2 border-white text-white font-inter font-medium text-lg px-10 py-4 rounded-full hover:bg-white hover:text-bg-primary transition-all duration-300"
              onMouseMove={handleMagnetic}
              onMouseLeave={handleMagneticLeave}
            >
              Get a Free Audit
            </a>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-text-tertiary font-inter text-sm">
            <a href="mailto:hello@ennoble.one" className="hover:text-text-primary transition-colors">hello@ennoble.one</a>
            <span>© {new Date().getFullYear()} Ennoble. All rights reserved.</span>
          </div>
        </div>
      </section>

      {/* Pulse animation for dots */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
}
