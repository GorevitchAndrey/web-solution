"use client";

import { useEffect, useRef } from "react";

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const stage = (progress: number, start: number, end: number) => {
  const value = clamp((progress - start) / (end - start));
  return value * value * (3 - 2 * value);
};

const decisions = [
  {
    number: "01",
    label: "Read the room",
    title: "Context before availability.",
    desc: "Priya has another review at 9:00. Sam is eight hours ahead. Tuesday is your strongest collaboration day.",
  },
  {
    number: "02",
    label: "Protect the work",
    title: "Focus time stays intact.",
    desc: "The afternoon block has been moved three times this month. Loopline treats that pattern as a boundary.",
  },
  {
    number: "03",
    label: "Resolve the slot",
    title: "One recommendation, not ten.",
    desc: "10:00 creates a clean handoff from planning, keeps both time zones comfortable, and leaves preparation room.",
  },
  {
    number: "04",
    label: "Make it legible",
    title: "Every decision explains itself.",
    desc: "The answer includes the tradeoffs, so your team can trust the recommendation—or change it with context.",
  },
];

export default function Loopline() {
  const heroRef = useRef<HTMLElement>(null);
  const decisionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = document.querySelectorAll<HTMLElement>(".loopline-page .loop-reveal");

    if (reducedMotion) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const revealTimers: number[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const item = entry.target as HTMLElement;
            const delay = Number(item.dataset.revealDelay ?? 0);
            revealTimers.push(window.setTimeout(() => item.classList.add("is-visible"), delay));
            observer.unobserve(item);
          }
        });
      },
      { threshold: 0.14 }
    );
    revealItems.forEach((item) => observer.observe(item));

    let frame = 0;
    const update = () => {
      frame = 0;
      const hero = heroRef.current;
      const decision = decisionRef.current;

      if (hero) {
        const distance = Math.min(window.scrollY, window.innerHeight);
        hero.style.setProperty("--loop-grid-y", `${distance * 0.06}px`);
        hero.style.setProperty("--loop-copy-y", `${distance * -0.025}px`);
        hero.style.setProperty("--loop-visual-y", `${distance * 0.09}px`);
        hero.style.setProperty("--loop-chip-a-y", `${distance * -0.035}px`);
        hero.style.setProperty("--loop-chip-b-y", `${distance * -0.14}px`);
      }

      if (decision) {
        if (window.innerWidth < 1024) {
          decision.removeAttribute("style");
          decision.querySelectorAll<HTMLElement>(".loop-decision-copy").forEach((item) => {
            item.classList.remove("is-active", "is-complete");
          });
          return;
        }

        const rect = decision.getBoundingClientRect();
        const travel = decision.offsetHeight - window.innerHeight;
        const progress = clamp(-rect.top / Math.max(travel, 1));
        const context = stage(progress, 0.03, 0.24);
        const protect = stage(progress, 0.23, 0.47);
        const resolve = stage(progress, 0.46, 0.7);
        const explain = stage(progress, 0.69, 0.88);

        decision.style.setProperty("--loop-context", `${context}`);
        decision.style.setProperty("--loop-protect", `${protect}`);
        decision.style.setProperty("--loop-resolve", `${resolve}`);
        decision.style.setProperty("--loop-explain", `${explain}`);
        decision.style.setProperty("--loop-scan-y", `${14 + progress * 68}%`);
        decision.style.setProperty("--loop-context-y", `${24 * (1 - context)}px`);
        decision.style.setProperty("--loop-scan-opacity", `${0.15 + context * 0.65}`);
        decision.style.setProperty("--loop-protect-border", `${0.2 + protect * 0.55}`);
        decision.style.setProperty("--loop-protect-ring", `${protect * 3}px`);
        decision.style.setProperty("--loop-protect-y", `${protect * -5}px`);
        decision.style.setProperty("--loop-candidate-opacity", `${0.2 + resolve * 0.8}`);
        decision.style.setProperty("--loop-candidate-x", `${(1 - resolve) * 130}px`);
        decision.style.setProperty("--loop-candidate-y", `${(1 - resolve) * 52}px`);
        decision.style.setProperty("--loop-candidate-scale", `${0.94 + resolve * 0.06}`);
        decision.style.setProperty("--loop-explain-height", `${22 + explain * 110}px`);
        decision.style.setProperty("--loop-explain-opacity", `${0.18 + explain * 0.82}`);
        decision.style.setProperty("--loop-explain-y", `${(1 - explain) * 12}px`);

        const current = progress < 0.23 ? 0 : progress < 0.46 ? 1 : progress < 0.69 ? 2 : 3;
        decision.querySelectorAll<HTMLElement>(".loop-decision-copy").forEach((item, index) => {
          item.classList.toggle("is-active", index === current);
          item.classList.toggle("is-complete", index < current);
        });
      }
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      observer.disconnect();
      revealTimers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="loopline-page bg-loop-navy text-loop-text font-grotesk overflow-x-clip">
      <a href="#decision" className="loop-skip-link">Skip to product demonstration</a>

      <nav className="absolute inset-x-0 top-0 z-40 flex items-center justify-between border-b border-loop-cyan/15 px-[5vw] py-5 backdrop-blur-sm">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Loopline home">
          <span className="loop-logo-mark grid h-7 w-7 place-items-center rounded-[8px] border border-loop-cyan/40">
            <span className="block h-2.5 w-2.5 rounded-full bg-loop-cyan" />
          </span>
          <span className="text-lg font-bold tracking-[-0.04em]">loop<span className="text-loop-cyan">line</span></span>
        </a>
        <div className="hidden items-center gap-8 text-[0.7rem] font-medium tracking-[0.08em] text-loop-dim md:flex">
          <a className="loop-text-link" href="#decision">Product</a>
          <a className="loop-text-link" href="#features">Method</a>
          <a className="loop-text-link" href="#proof">Results</a>
        </div>
        <a href="#start" className="loop-nav-cta rounded-full bg-loop-cyan px-5 py-2.5 text-xs font-semibold text-loop-navy">
          Start free <span aria-hidden="true">↗</span>
        </a>
      </nav>

      <main>
        <header id="top" ref={heroRef} className="loop-hero relative grid min-h-[100svh] items-center overflow-hidden px-[5vw] pb-16 pt-32 lg:grid-cols-[0.95fr_1.05fr] lg:gap-[6vw]">
          <div className="loop-hero-grid absolute inset-0" aria-hidden="true" />
          <div className="loop-hero-glow absolute inset-0" aria-hidden="true" />

          <div className="loop-hero-copy relative z-20 max-w-[760px]">
            <div className="loop-load loop-load-1 mb-7 inline-flex items-center gap-3 rounded-full border border-loop-cyan/20 bg-loop-cyan/[0.05] px-3.5 py-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-loop-cyan">
              <span className="h-1.5 w-1.5 rounded-full bg-loop-cyan" />
              Calendar intelligence · online
            </div>
            <h1 className="loop-load loop-load-2 text-[clamp(3.6rem,7.4vw,7.6rem)] font-bold leading-[0.88] tracking-[-0.065em]">
              Your calendar has context.{" "}
              <span className="text-loop-cyan">Now it can use it.</span>
            </h1>
            <p className="loop-load loop-load-3 mt-8 max-w-[47ch] text-[1.05rem] leading-7 text-loop-dim">
              Loopline weighs meeting history, energy patterns, time zones, and preparation—not just empty rectangles.
            </p>
            <div className="loop-load loop-load-4 mt-9 flex flex-wrap items-center gap-4">
              <a href="#start" className="loop-primary-button group inline-flex items-center gap-7 rounded-full bg-loop-cyan px-6 py-3.5 text-sm font-semibold text-loop-navy">
                Build a better week
                <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
              </a>
              <a href="#decision" className="loop-secondary-button rounded-full border border-loop-cyan/20 px-6 py-3.5 text-sm font-medium">
                Watch one decision
              </a>
            </div>
            <div className="loop-load loop-load-5 mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-loop-dim/75">
              <span>No card required</span>
              <span className="text-loop-cyan/50">◆</span>
              <span>Google + Outlook</span>
              <span className="text-loop-cyan/50">◆</span>
              <span>Setup in 4 minutes</span>
            </div>
          </div>

          <div className="loop-hero-visual relative z-10 mt-16 min-h-[500px] lg:mt-0">
            <div className="loop-float-chip loop-float-chip-a">
              <span className="text-loop-violet">●</span>
              Priya · GMT−4
            </div>
            <div className="loop-float-chip loop-float-chip-b">
              <span className="text-loop-cyan">◆</span>
              Focus boundary learned
            </div>
            <div className="loop-hero-panel absolute left-1/2 top-1/2 w-[min(94%,650px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[22px] border border-loop-cyan/15 bg-[#0c1327]/95 shadow-[0_38px_100px_-44px_rgba(94,234,212,.4)] backdrop-blur">
              <div className="flex items-center justify-between border-b border-loop-cyan/10 px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-loop-cyan" />
                  <span className="text-xs font-medium">Tuesday · July 28</span>
                </div>
                <span className="font-mono text-[0.56rem] uppercase tracking-[0.12em] text-loop-dim">Week 31</span>
              </div>
              <div className="grid grid-cols-[58px_1fr] p-5">
                <div className="flex flex-col justify-between py-2 font-mono text-[0.56rem] text-loop-dim/70">
                  <span>09:00</span><span>10:00</span><span>11:00</span><span>12:00</span><span>13:00</span><span>14:00</span><span>15:00</span>
                </div>
                <div className="relative h-[350px] overflow-hidden rounded-xl border border-loop-cyan/10 bg-[#080e1d]">
                  <div className="loop-calendar-lines absolute inset-0" />
                  <div className="absolute left-[6%] top-[7%] w-[54%] rounded-lg border border-loop-violet/30 bg-loop-violet/10 px-3 py-2">
                    <div className="text-[0.68rem] font-medium">Weekly planning</div>
                    <div className="mt-1 font-mono text-[0.52rem] text-loop-violet">09:00—09:40</div>
                  </div>
                  <div className="absolute right-[6%] top-[44%] w-[42%] rounded-lg border border-loop-cyan/20 bg-loop-cyan/[0.06] px-3 py-2">
                    <div className="text-[0.68rem] font-medium">Lunch</div>
                    <div className="mt-1 font-mono text-[0.52rem] text-loop-dim">12:15—13:00</div>
                  </div>
                  <div className="absolute bottom-[7%] left-[6%] w-[88%] rounded-lg border border-loop-cyan/30 bg-loop-cyan/[0.07] px-3 py-2.5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[0.68rem] font-medium">Deep work</div>
                        <div className="mt-1 font-mono text-[0.52rem] text-loop-cyan">14:00—16:00</div>
                      </div>
                      <span className="rounded-full bg-loop-cyan/10 px-2 py-1 font-mono text-[0.48rem] text-loop-cyan">Protected</span>
                    </div>
                  </div>
                  <div className="loop-hero-candidate absolute left-[24%] top-[23%] w-[68%] rounded-lg border border-loop-cyan bg-loop-cyan/10 px-3 py-2.5 shadow-[0_0_30px_rgba(94,234,212,.12)]">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[0.68rem] font-medium">Design review · Priya</div>
                        <div className="mt-1 font-mono text-[0.52rem] text-loop-cyan">10:00—10:45</div>
                      </div>
                      <span className="rounded-full bg-loop-cyan px-2 py-1 font-mono text-[0.48rem] font-medium text-loop-navy">Best fit</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-loop-cyan/10 px-5 py-4 font-mono text-[0.62rem] text-loop-dim">
                <span className="text-loop-cyan">loopline›</span> protected 2h focus · saved 18m coordination
              </div>
            </div>
          </div>
        </header>

        <section className="border-y border-loop-cyan/10 bg-[#080d19] px-[5vw] py-7">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-loop-dim">Scheduling quietly for</span>
            <div className="flex flex-wrap gap-x-10 gap-y-3 text-sm font-medium text-loop-dim/75">
              <span>Fieldnote</span><span>Arcvale</span><span>Northbeam</span><span>Kiln</span><span>Seam</span>
            </div>
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-loop-cyan">12,840 weeks improved</span>
          </div>
        </section>

        <section id="decision" ref={decisionRef} className="loop-decision relative h-[350vh] bg-[#080d19]">
          <div className="sticky top-0 grid h-[100svh] overflow-hidden px-[5vw] py-[7vh] lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-[5vw]">
            <div className="relative z-20">
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-loop-cyan">One decision · four judgments</span>
              <h2 className="mt-4 max-w-[9ch] text-[clamp(2.8rem,5.6vw,5.7rem)] font-bold leading-[0.9] tracking-[-0.055em]">
                Watch the right time emerge.
              </h2>
              <div className="mt-9 max-w-[500px]">
                {decisions.map((decision) => (
                  <article key={decision.number} className="loop-decision-copy grid grid-cols-[36px_1fr] gap-3 border-t border-loop-cyan/10 py-4">
                    <span className="font-mono text-[0.55rem] text-loop-cyan">{decision.number}</span>
                    <div>
                      <div className="text-[0.6rem] font-medium uppercase tracking-[0.13em] text-loop-dim">{decision.label}</div>
                      <h3 className="mt-1.5 text-sm font-semibold">{decision.title}</h3>
                      <p className="loop-decision-detail mt-2 text-xs leading-5 text-loop-dim">{decision.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="loop-engine relative z-10 mt-8 w-full justify-self-center lg:mt-0">
              <div className="loop-context-card loop-context-a">
                <span className="font-mono text-[0.5rem] uppercase tracking-[0.1em] text-loop-violet">Meeting history</span>
                <strong className="mt-1 block text-xs">3 productive Tuesdays</strong>
              </div>
              <div className="loop-context-card loop-context-b">
                <span className="font-mono text-[0.5rem] uppercase tracking-[0.1em] text-loop-cyan">Energy signal</span>
                <strong className="mt-1 block text-xs">Collaboration peak · 10am</strong>
              </div>
              <div className="loop-context-card loop-context-c">
                <span className="font-mono text-[0.5rem] uppercase tracking-[0.1em] text-loop-violet">Timezone overlap</span>
                <strong className="mt-1 block text-xs">4h 30m shared</strong>
              </div>

              <div className="loop-engine-window overflow-hidden rounded-[22px] border border-loop-cyan/15 bg-[#0d1428] shadow-[0_40px_100px_-50px_rgba(94,234,212,.35)]">
                <div className="flex items-center justify-between border-b border-loop-cyan/10 px-5 py-4">
                  <div>
                    <div className="text-xs font-medium">Tuesday · proposed schedule</div>
                    <div className="mt-1 font-mono text-[0.52rem] text-loop-dim">4 calendars · 18 constraints</div>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-loop-cyan/25" />
                    <span className="h-2 w-2 rounded-full bg-loop-cyan/25" />
                    <span className="h-2 w-2 rounded-full bg-loop-cyan" />
                  </div>
                </div>

                <div className="grid grid-cols-[52px_1fr] p-5">
                  <div className="flex h-[390px] flex-col justify-between py-2 font-mono text-[0.52rem] text-loop-dim/65">
                    <span>09:00</span><span>10:00</span><span>11:00</span><span>12:00</span><span>13:00</span><span>14:00</span><span>15:00</span><span>16:00</span>
                  </div>
                  <div className="relative h-[390px] overflow-hidden rounded-xl border border-loop-cyan/10 bg-[#080e1d]">
                    <div className="loop-calendar-lines absolute inset-0" />
                    <div className="loop-scan-line absolute inset-x-0 z-30 h-px bg-gradient-to-r from-transparent via-loop-cyan to-transparent" />

                    <div className="absolute left-[5%] top-[5%] w-[57%] rounded-lg border border-loop-violet/25 bg-loop-violet/10 px-3 py-2">
                      <div className="text-[0.65rem] font-medium">Weekly planning</div>
                      <div className="mt-1 font-mono text-[0.5rem] text-loop-violet">09:00—09:40</div>
                    </div>
                    <div className="absolute right-[5%] top-[46%] w-[42%] rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                      <div className="text-[0.65rem] font-medium">Lunch</div>
                      <div className="mt-1 font-mono text-[0.5rem] text-loop-dim">12:15—13:00</div>
                    </div>
                    <div className="loop-focus-block absolute bottom-[5%] left-[5%] w-[90%] rounded-lg border border-loop-cyan/25 bg-loop-cyan/[0.06] px-3 py-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[0.65rem] font-medium">Deep work</div>
                          <div className="mt-1 font-mono text-[0.5rem] text-loop-cyan">14:00—16:00</div>
                        </div>
                        <span className="loop-lock rounded-full bg-loop-cyan/10 px-2 py-1 font-mono text-[0.46rem] text-loop-cyan">Learning boundary</span>
                      </div>
                    </div>
                    <div className="loop-candidate absolute left-[19%] top-[25%] z-20 w-[75%] rounded-lg border border-loop-cyan bg-[#12323b] px-3 py-3 shadow-[0_0_36px_rgba(94,234,212,.14)]">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-[0.67rem] font-medium">Design review · Priya</div>
                          <div className="mt-1 font-mono text-[0.5rem] text-loop-cyan">10:00—10:45</div>
                        </div>
                        <span className="loop-best-fit rounded-full bg-loop-cyan px-2 py-1 font-mono text-[0.46rem] font-medium text-loop-navy">Candidate</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="loop-explanation border-t border-loop-cyan/10 bg-[#0a1121] px-5 py-4">
                  <div className="flex gap-3">
                    <span className="mt-0.5 text-loop-cyan">↳</span>
                    <div>
                      <div className="font-mono text-[0.52rem] uppercase tracking-[0.11em] text-loop-cyan">Why 10:00?</div>
                      <p className="mt-2 text-xs leading-5 text-loop-dim">
                        Best timezone overlap, 20 minutes after planning, and 45 minutes before Priya&apos;s next meeting. Afternoon focus remains untouched.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="px-[5vw] py-28 md:py-36">
          <div className="loop-reveal mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-loop-cyan">Intelligence with boundaries</span>
              <h2 className="mt-4 max-w-[13ch] text-[clamp(2.6rem,5vw,5.2rem)] font-bold leading-[0.92] tracking-[-0.055em]">
                Less coordination. More considered time.
              </h2>
            </div>
            <p className="max-w-[39ch] text-sm leading-6 text-loop-dim">
              Loopline does not automate judgment away. It makes the signals behind a good scheduling decision visible and repeatable.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {[
              ["01", "Learns quietly", "No preference survey. Loopline observes the changes you keep making and learns from the pattern.", "12 days", "to a useful model"],
              ["02", "Protects deliberately", "Focus blocks become real constraints when your behavior says they matter—not decorative calendar colors.", "4.2h", "focus preserved weekly"],
              ["03", "Explains clearly", "Every suggestion shows its reasoning, including tradeoffs and whose preferences shaped the result.", "91%", "suggestions accepted"],
            ].map(([number, title, desc, stat, statLabel], index) => (
              <article key={title} className="loop-feature-card loop-reveal group rounded-[18px] border border-loop-cyan/12 bg-loop-navy2 p-7" data-reveal-delay={index * 60}>
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[0.55rem] text-loop-cyan">{number}</span>
                  <span className="loop-feature-icon grid h-9 w-9 place-items-center rounded-full border border-loop-cyan/20 text-loop-cyan">↗</span>
                </div>
                <h3 className="mt-14 text-xl font-semibold tracking-[-0.025em]">{title}</h3>
                <p className="mt-3 min-h-[72px] text-sm leading-6 text-loop-dim">{desc}</p>
                <div className="mt-8 border-t border-loop-cyan/10 pt-6">
                  <strong className="text-3xl font-medium tracking-[-0.04em] text-loop-cyan">{stat}</strong>
                  <span className="ml-3 font-mono text-[0.52rem] uppercase tracking-[0.1em] text-loop-dim">{statLabel}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="proof" className="grid border-y border-loop-cyan/10 bg-[#080d19] lg:grid-cols-[0.78fr_1.22fr]">
          <div className="loop-proof-data grid min-h-[470px] grid-cols-2 border-b border-loop-cyan/10 lg:border-b-0 lg:border-r">
            <div className="flex flex-col justify-between border-b border-r border-loop-cyan/10 p-[5vw] lg:p-8">
              <span className="font-mono text-[0.52rem] uppercase tracking-[0.12em] text-loop-dim">Coordination</span>
              <strong className="text-[clamp(2.5rem,5vw,5rem)] font-medium tracking-[-0.06em] text-loop-cyan">−38%</strong>
            </div>
            <div className="flex flex-col justify-between border-b border-loop-cyan/10 p-[5vw] lg:p-8">
              <span className="font-mono text-[0.52rem] uppercase tracking-[0.12em] text-loop-dim">Focus recovered</span>
              <strong className="text-[clamp(2.5rem,5vw,5rem)] font-medium tracking-[-0.06em] text-loop-violet">4.2h</strong>
            </div>
            <div className="col-span-2 flex flex-col justify-between p-[5vw] lg:p-8">
              <span className="font-mono text-[0.52rem] uppercase tracking-[0.12em] text-loop-dim">Reschedules avoided per team · monthly</span>
              <strong className="text-[clamp(3.5rem,8vw,8rem)] font-medium leading-none tracking-[-0.07em]">164</strong>
            </div>
          </div>
          <div className="flex items-center px-[8vw] py-24">
            <div className="loop-reveal">
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-loop-cyan">Fieldnote · 42 people</span>
              <blockquote className="mt-7 max-w-[18ch] text-[clamp(2rem,4vw,4.1rem)] font-medium leading-[1.03] tracking-[-0.045em]">
                “It feels less like software scheduling us and more like the team finally remembering how we work.”
              </blockquote>
              <p className="mt-7 text-sm text-loop-dim">Mara Chen · VP Product</p>
            </div>
          </div>
        </section>

        <section id="start" className="relative overflow-hidden px-[5vw] py-28 md:py-36">
          <div className="loop-cta-grid absolute inset-0" aria-hidden="true" />
          <div className="loop-reveal relative z-10 mx-auto max-w-[1000px] text-center">
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-loop-cyan">Your calendar, with judgment</span>
            <h2 className="mx-auto mt-5 max-w-[12ch] text-[clamp(3.1rem,7vw,7.2rem)] font-bold leading-[0.87] tracking-[-0.065em]">
              Give every hour a second opinion.
            </h2>
            <a href="#top" className="loop-primary-button mt-10 inline-flex items-center gap-9 rounded-full bg-loop-cyan px-7 py-4 text-sm font-semibold text-loop-navy">
              Start free for 14 days <span aria-hidden="true">→</span>
            </a>
            <p className="mt-5 font-mono text-[0.56rem] uppercase tracking-[0.11em] text-loop-dim">Connect one calendar · cancel anytime</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-loop-cyan/10 bg-[#070b14] px-[5vw] py-12">
        <div className="flex flex-col justify-between gap-9 md:flex-row md:items-end">
          <div>
            <div className="text-xl font-bold tracking-[-0.04em]">loop<span className="text-loop-cyan">line</span></div>
            <p className="mt-2 text-sm text-loop-dim">Time, considered.</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-loop-dim">
            <a className="loop-text-link" href="#decision">Product</a>
            <a className="loop-text-link" href="#features">Method</a>
            <a className="loop-text-link" href="mailto:hello@loopline.io">Contact</a>
          </div>
        </div>
        <div className="mt-12 border-t border-loop-cyan/10 pt-5 font-mono text-[0.52rem] uppercase tracking-[0.12em] text-loop-dim/50">
          © 2026 Loopline, Inc.
        </div>
      </footer>
    </div>
  );
}
