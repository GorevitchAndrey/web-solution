"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const ritualSteps = [
  {
    time: "0:00",
    title: "Let it bloom",
    volume: "40 ml",
    desc: "Begin just beside the center. The grounds rise while the first channel finds the off-axis hole.",
  },
  {
    time: "0:45",
    title: "Open the spiral",
    volume: "120 ml",
    desc: "Pour outward in one unbroken circle. The geometry lengthens contact without slowing your hand.",
  },
  {
    time: "2:00",
    title: "Return inward",
    volume: "220 ml",
    desc: "Follow the same path home. Water settles deeper into the bed instead of passing straight through it.",
  },
  {
    time: "4:00",
    title: "Let it clear",
    volume: "340 ml",
    desc: "The last water gathers at the offset and draws down cleanly. No stirring. No intervention.",
  },
];

export default function Densho() {
  const heroRef = useRef<HTMLElement>(null);
  const ritualRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = document.querySelectorAll<HTMLElement>(".densho-page .den-reveal");

    if (reducedMotion) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    revealItems.forEach((item) => observer.observe(item));

    let frame = 0;
    const update = () => {
      frame = 0;
      const hero = heroRef.current;
      const ritual = ritualRef.current;

      if (hero) {
        const distance = Math.min(window.scrollY, window.innerHeight);
        hero.style.setProperty("--den-scroll", `${distance}px`);
      }

      if (ritual) {
        const rect = ritual.getBoundingClientRect();
        const travel = rect.height - window.innerHeight * 0.55;
        const progress = Math.max(0, Math.min(1, -rect.top / Math.max(travel, 1)));
        ritual.style.setProperty("--den-ritual-dash", `${760 * (1 - progress)}`);

        const activeIndex = Math.min(3, Math.floor(progress * 4.15));
        ritual.querySelectorAll<HTMLElement>(".den-ritual-step").forEach((step, index) => {
          step.classList.toggle("is-active", index <= activeIndex);
        });
      }
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="densho-page min-h-screen bg-[#e9e5dc] text-den-bark font-manrope font-light">
      <a href="#main" className="den-skip-link">Skip to product</a>

      <nav className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-[6vw] py-7">
        <a href="#top" className="font-cormorant text-[1.7rem] font-medium tracking-[0.04em]" aria-label="Densho home">
          Densho
        </a>
        <div className="hidden items-center gap-9 text-[0.7rem] font-medium uppercase tracking-[0.16em] md:flex">
          <a className="den-text-link" href="#ritual">The ritual</a>
          <a className="den-text-link" href="#craft">The craft</a>
          <a className="den-text-link" href="#notes">Notes</a>
        </div>
        <a href="#purchase" className="den-cart-link flex items-center gap-3 text-xs font-medium tracking-[0.08em]">
          Cart
          <span className="grid h-7 w-7 place-items-center rounded-full border border-den-bark/25 font-mono text-[0.62rem]">0</span>
        </a>
      </nav>

      <main id="main">
        <header id="top" ref={heroRef} className="den-hero relative grid min-h-[100svh] overflow-hidden px-[6vw] pb-14 pt-32 lg:grid-cols-[0.94fr_1.06fr] lg:items-center lg:gap-[6vw] lg:pb-16">
          <div className="den-hero-copy relative z-20 max-w-[680px]">
            <div className="den-load den-load-1 mb-7 flex items-center gap-3 text-[0.66rem] font-medium uppercase tracking-[0.2em] text-den-moss">
              <span className="h-px w-8 bg-den-rust" />
              Object No. 01 · Hand-thrown stoneware
            </div>
            <h1 className="den-load den-load-2 font-cormorant text-[clamp(3.5rem,7.1vw,7rem)] font-normal leading-[0.86] tracking-[-0.045em]">
              Take the<br />
              <em className="font-normal text-den-rust">long way</em> down.
            </h1>
            <p className="den-load den-load-3 mt-8 max-w-[43ch] text-[1rem] leading-7 text-den-bark/68">
              One hole, deliberately off-center. Water travels in a slow spiral through the coffee
              instead of finding the shortest path out.
            </p>
            <div className="den-load den-load-4 mt-9 flex flex-wrap items-center gap-4">
              <a href="#purchase" className="den-primary-button group inline-flex items-center gap-7 rounded-full bg-den-bark px-7 py-4 text-sm font-medium text-[#f4f0e7]">
                Reserve batch 08
                <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
              </a>
              <span className="font-cormorant text-2xl">$68</span>
            </div>
          </div>

          <div className="den-hero-object relative z-10 mt-14 flex items-center justify-center lg:mt-0" aria-label="Diagram showing the Densho dripper's off-center pour geometry">
            <div className="den-orbit relative aspect-square w-full max-w-[650px] rounded-full border border-den-bark/10 bg-[#f3efe6]">
              <span className="absolute left-[7%] top-1/2 -translate-y-1/2 -rotate-90 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-den-moss/65">
                Four-minute extraction
              </span>
              <svg viewBox="0 0 560 560" className="absolute inset-[9%] h-[82%] w-[82%]" fill="none">
                <circle cx="280" cy="280" r="228" stroke="#4a5c43" strokeOpacity=".13" />
                <circle cx="280" cy="280" r="184" stroke="#4a5c43" strokeOpacity=".17" />
                <circle cx="280" cy="280" r="140" stroke="#4a5c43" strokeOpacity=".21" />
                <circle cx="280" cy="280" r="96" stroke="#4a5c43" strokeOpacity=".25" />
                <path
                  d="M280 52c157 0 226 113 199 221-24 96-127 146-219 113-69-25-100-102-68-160 24-43 82-60 121-32 28 20 32 62 8 86-16 16-43 18-60 4"
                  stroke="#b5502e"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="den-hero-pour"
                />
                <circle cx="261" cy="284" r="8" fill="#b5502e" />
                <circle cx="261" cy="284" r="18" stroke="#b5502e" strokeOpacity=".24" />
              </svg>

              <div className="den-dripper absolute left-1/2 top-1/2 h-[41%] w-[43%] -translate-x-1/2 -translate-y-[38%]" aria-hidden="true">
                <div className="absolute left-1/2 top-0 h-[74%] w-[82%] -translate-x-1/2 rounded-[42%_42%_28%_28%/15%_15%_85%_85%] border border-den-bark/35 bg-gradient-to-br from-[#faf7f0]/90 to-[#d9d0bd]/90 shadow-[0_24px_45px_-28px_rgba(36,29,23,.65)]" />
                <div className="absolute bottom-[19%] left-1/2 h-[9%] w-full -translate-x-1/2 rounded-[50%] border border-den-bark/30 bg-[#ded5c4]" />
                <span className="absolute bottom-[22%] left-[59%] h-2.5 w-2.5 rounded-full bg-den-rust shadow-[0_0_0_7px_rgba(181,80,46,.12)]" />
              </div>
              <div className="absolute bottom-[8%] right-[12%] text-right">
                <div className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-den-rust">Offset 11.2 mm</div>
                <div className="mt-1 text-xs text-den-bark/45">Patent pending geometry</div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-7 left-[6vw] hidden items-center gap-3 text-[0.62rem] uppercase tracking-[0.16em] text-den-bark/45 lg:flex">
            <span className="h-8 w-px bg-den-bark/25" />
            Scroll to follow the pour
          </div>
        </header>

        <section className="border-y border-den-bark/10 bg-[#f3efe7] px-[6vw] py-5">
          <div className="flex flex-wrap items-center justify-between gap-5 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-den-bark/55">
            <span className="text-den-rust">Cup profile</span>
            <span>Stone fruit</span>
            <span>Brown sugar</span>
            <span>Soft citrus</span>
            <span>Long, clean finish</span>
          </div>
        </section>

        <section className="px-[6vw] py-28 md:py-40">
          <div className="den-reveal mx-auto grid max-w-[1200px] gap-12 md:grid-cols-[0.65fr_1.35fr] md:items-start">
            <div className="text-[0.66rem] font-medium uppercase tracking-[0.2em] text-den-moss">
              The principle
            </div>
            <p className="font-cormorant text-[clamp(2.4rem,4.8vw,4.8rem)] leading-[1.02] tracking-[-0.025em]">
              Most drippers reward speed. Densho makes{" "}
              <em className="font-normal text-den-rust">time part of the taste.</em>
            </p>
          </div>
        </section>

        <section id="ritual" ref={ritualRef} className="den-ritual relative bg-den-bark text-[#eee9df]">
          <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
            <div className="relative min-h-[70vh] border-b border-white/10 p-[6vw] lg:min-h-[100vh] lg:border-b-0 lg:border-r">
              <div className="sticky top-[12vh]">
                <div className="mb-9 text-[0.66rem] font-medium uppercase tracking-[0.2em] text-den-gold">
                  The four-minute ritual
                </div>
                <h2 className="max-w-[12ch] font-cormorant text-[clamp(2.8rem,5vw,5rem)] font-normal leading-[0.95]">
                  One movement, beginning to end.
                </h2>
                <div className="relative mt-12 aspect-square max-w-[470px]">
                  <svg viewBox="0 0 500 500" className="h-full w-full" fill="none" aria-hidden="true">
                    <circle cx="250" cy="250" r="210" stroke="white" strokeOpacity=".08" />
                    <circle cx="250" cy="250" r="160" stroke="white" strokeOpacity=".08" />
                    <circle cx="250" cy="250" r="110" stroke="white" strokeOpacity=".08" />
                    <path
                      d="M250 40c138 0 214 102 199 211-14 100-104 165-200 155-78-8-140-76-133-151 6-59 56-105 112-105 45 0 81 34 80 77-1 31-26 56-57 56"
                      stroke="#c99b4a"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="760"
                      className="den-ritual-line"
                    />
                    <circle cx="251" cy="283" r="7" fill="#b5502e" />
                  </svg>
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="text-center">
                      <span className="block font-cormorant text-5xl text-[#f3eee4]">4:00</span>
                      <span className="mt-1 block font-mono text-[0.56rem] uppercase tracking-[0.2em] text-white/35">Total draw-down</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-[6vw] py-20 lg:py-[22vh]">
              {ritualSteps.map((step, index) => (
                <article key={step.time} className="den-ritual-step grid min-h-[52vh] content-center border-b border-white/10 py-16 last:border-0">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-den-gold">{step.time}</span>
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/30">{step.volume}</span>
                  </div>
                  <div className="mt-8 grid gap-5 md:grid-cols-[auto_1fr] md:gap-8">
                    <span className="font-cormorant text-2xl text-den-gold/50">0{index + 1}</span>
                    <div>
                      <h3 className="font-cormorant text-[clamp(2.2rem,4vw,3.8rem)] leading-none">{step.title}</h3>
                      <p className="mt-5 max-w-[38ch] text-sm leading-7 text-white/52">{step.desc}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="craft" className="grid bg-[#f3efe7] lg:grid-cols-[1.02fr_0.98fr]">
          <div className="den-craft-image relative min-h-[68vh] overflow-hidden lg:min-h-[920px]">
            <Image
              src="/images/densho/handmade-dripper.jpg"
              alt="Handmade speckled stoneware Densho coffee dripper on a walnut workshop table"
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 51vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-den-bark/30 via-transparent to-transparent" />
            <div className="absolute bottom-7 left-7 rounded-full bg-[#f3efe7]/90 px-4 py-2 font-mono text-[0.58rem] uppercase tracking-[0.14em] backdrop-blur">
              Workshop no. 03 · Tajimi
            </div>
          </div>
          <div className="flex items-center px-[8vw] py-24 lg:px-[7vw]">
            <div className="den-reveal">
              <div className="text-[0.66rem] font-medium uppercase tracking-[0.2em] text-den-moss">Made by touch</div>
              <h2 className="mt-5 max-w-[12ch] font-cormorant text-[clamp(2.7rem,4.8vw,4.8rem)] leading-[0.96]">
                The hand stays visible in the clay.
              </h2>
              <p className="mt-8 max-w-[42ch] text-[0.98rem] leading-7 text-den-bark/65">
                Each body is thrown and drilled in one workshop. The speckled glaze pools differently
                around every ridge, while the single measured hole stays exact.
              </p>
              <dl className="mt-11 grid max-w-[430px] grid-cols-2 gap-x-9 gap-y-7 border-t border-den-bark/12 pt-7">
                <div>
                  <dt className="text-[0.62rem] uppercase tracking-[0.14em] text-den-moss">Capacity</dt>
                  <dd className="mt-2 font-cormorant text-2xl">340 ml</dd>
                </div>
                <div>
                  <dt className="text-[0.62rem] uppercase tracking-[0.14em] text-den-moss">Material</dt>
                  <dd className="mt-2 font-cormorant text-2xl">Stoneware</dd>
                </div>
                <div>
                  <dt className="text-[0.62rem] uppercase tracking-[0.14em] text-den-moss">Batch size</dt>
                  <dd className="mt-2 font-cormorant text-2xl">48 pieces</dd>
                </div>
                <div>
                  <dt className="text-[0.62rem] uppercase tracking-[0.14em] text-den-moss">Firing</dt>
                  <dd className="mt-2 font-cormorant text-2xl">1,240°C</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section id="notes" className="px-[6vw] py-28 md:py-40">
          <div className="den-reveal mx-auto max-w-[1000px] text-center">
            <div className="mx-auto mb-8 h-10 w-px bg-den-rust/60" />
            <blockquote className="font-cormorant text-[clamp(2.3rem,4.5vw,4.5rem)] font-normal leading-[1.03] tracking-[-0.02em]">
              “It changed the pace of my morning before it changed the coffee.”
            </blockquote>
            <p className="mt-7 text-xs uppercase tracking-[0.15em] text-den-moss">M. Ito · Batch 04 owner</p>
          </div>
        </section>

        <section id="purchase" className="bg-den-rust px-[6vw] py-24 text-[#f5eee4] md:py-32">
          <div className="den-reveal mx-auto flex max-w-[1200px] flex-col justify-between gap-12 md:flex-row md:items-end">
            <div>
              <div className="text-[0.66rem] font-medium uppercase tracking-[0.2em] text-white/60">Batch 08 · 17 remaining</div>
              <h2 className="mt-5 max-w-[11ch] font-cormorant text-[clamp(3rem,6vw,6rem)] leading-[0.9]">Make four minutes yours.</h2>
            </div>
            <div className="shrink-0">
              <div className="mb-5 flex items-baseline justify-between gap-12 border-b border-white/25 pb-4">
                <span className="text-sm text-white/60">Densho No. 01</span>
                <span className="font-cormorant text-3xl">$68</span>
              </div>
              <a href="#top" className="den-light-button inline-flex w-full items-center justify-between rounded-full bg-[#f3eee4] px-7 py-4 text-sm font-medium text-den-rust">
                Add to cart <span aria-hidden="true">→</span>
              </a>
              <p className="mt-4 text-center font-mono text-[0.58rem] uppercase tracking-[0.12em] text-white/50">
                Includes 20 filters · ships in 3 days
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-den-bark px-[6vw] py-14 text-[#eee9df]">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <div className="font-cormorant text-3xl">Densho</div>
            <p className="mt-2 text-sm text-white/40">Objects for slower mornings.</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[0.68rem] uppercase tracking-[0.13em] text-white/50">
            <a className="den-text-link" href="#ritual">Ritual</a>
            <a className="den-text-link" href="#craft">Care</a>
            <a className="den-text-link" href="mailto:hello@densho.co">Contact</a>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/25">
          © 2026 Densho Studio
        </div>
      </footer>
    </div>
  );
}
