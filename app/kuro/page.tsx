"use client";

import { useEffect, useRef } from "react";

const menu = [
  {
    name: "Tonkotsu",
    jp: "豚骨",
    desc: "18-hour pork bone broth, flame-seared chashu, ajitama, black garlic oil.",
    price: "18",
  },
  {
    name: "Shoyu",
    jp: "醤油",
    desc: "Clear three-day soy broth, char siu, bamboo, scallion, toasted nori.",
    price: "16",
  },
  {
    name: "Miso Black",
    jp: "黒味噌",
    desc: "Burnt miso, roasted garlic, ground pork, chili thread, sesame.",
    price: "17",
  },
  {
    name: "Vegetable Shio",
    jp: "野菜塩",
    desc: "Kelp and mushroom dashi, charred leek, soft tofu, yuzu oil.",
    price: "15",
  },
];

const tickerText = "TONKOTSU　·　SHOYU　·　MISO　·　YAKITORI　·　NATURAL SAKE　·　OPEN UNTIL 2AM　·　";

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const stage = (progress: number, start: number, end: number) => {
  const value = clamp((progress - start) / (end - start));
  return value * value * (3 - 2 * value);
};

export default function Kuro() {
  const assemblyRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = document.querySelectorAll<HTMLElement>(".kuro-page .kuro-reveal");

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
      { threshold: 0.15 }
    );
    revealItems.forEach((item) => observer.observe(item));

    let frame = 0;
    const updateAssembly = () => {
      frame = 0;
      const section = assemblyRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const travel = section.offsetHeight - window.innerHeight;
      const progress = clamp(-rect.top / Math.max(travel, 1));
      const bowl = stage(progress, 0.01, 0.1);
      const noodles = stage(progress, 0.08, 0.32);
      const chashu = stage(progress, 0.3, 0.56);
      const garnish = stage(progress, 0.54, 0.8);

      section.style.setProperty("--kuro-bowl-opacity", `${bowl}`);
      section.style.setProperty("--kuro-bowl-y", `${(1 - bowl) * 250}px`);
      section.style.setProperty("--kuro-bowl-scale", `${0.88 + bowl * 0.12}`);
      section.style.setProperty("--kuro-noodles-opacity", `${noodles}`);
      section.style.setProperty("--kuro-noodles-x", `${(1 - noodles) * -180}px`);
      section.style.setProperty("--kuro-noodles-y", `${(1 - noodles) * -530}px`);
      section.style.setProperty("--kuro-noodles-rotate", `${(1 - noodles) * -13}deg`);
      section.style.setProperty("--kuro-noodles-scale", `${0.84 + noodles * 0.16}`);
      section.style.setProperty("--kuro-chashu-opacity", `${chashu}`);
      section.style.setProperty("--kuro-chashu-x", `${(1 - chashu) * 470}px`);
      section.style.setProperty("--kuro-chashu-y", `${(1 - chashu) * -160}px`);
      section.style.setProperty("--kuro-chashu-rotate", `${(1 - chashu) * 15}deg`);
      section.style.setProperty("--kuro-chashu-scale", `${0.88 + chashu * 0.12}`);
      section.style.setProperty("--kuro-garnish-opacity", `${garnish}`);
      section.style.setProperty("--kuro-garnish-x", `${(1 - garnish) * -430}px`);
      section.style.setProperty("--kuro-garnish-y", `${(1 - garnish) * -250}px`);
      section.style.setProperty("--kuro-garnish-rotate", `${(1 - garnish) * -18}deg`);
      section.style.setProperty("--kuro-garnish-scale", `${0.88 + garnish * 0.12}`);
      section.style.setProperty("--kuro-steam-opacity", `${garnish * 0.26}`);
      section.classList.toggle("is-complete", progress >= 0.8);

      const current = progress < 0.08 ? 0 : progress < 0.32 ? 1 : progress < 0.56 ? 2 : 3;
      section.querySelectorAll<HTMLElement>(".kuro-stage-label").forEach((label, index) => {
        label.classList.toggle("is-active", index === current);
        label.classList.toggle("is-complete", index < current);
      });
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateAssembly);
    };

    updateAssembly();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="kuro-page bg-kuro-charcoal text-kuro-rice font-noto font-light">
      <a href="#menu" className="kuro-skip-link">Skip to tonight&apos;s menu</a>

      <nav className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-[5vw] py-6">
        <a href="#top" className="flex items-baseline gap-2" aria-label="Kuro home">
          <span className="font-bebas text-[2rem] tracking-[0.09em]">KURO</span>
          <span className="text-[0.58rem] tracking-[0.12em] text-kuro-lacquer">黒</span>
        </a>
        <div className="hidden items-center gap-9 text-[0.68rem] uppercase tracking-[0.15em] text-kuro-steam/70 md:flex">
          <a className="kuro-text-link" href="#menu">Menu</a>
          <a className="kuro-text-link" href="#bowl">Our bowl</a>
          <a className="kuro-text-link" href="#counter">The counter</a>
        </div>
        <a href="#reserve" className="kuro-nav-cta rounded-full border border-kuro-steam/25 px-5 py-2.5 text-[0.66rem] font-medium uppercase tracking-[0.14em]">
          Reserve
        </a>
      </nav>

      <main>
        <header id="top" className="kuro-hero relative flex min-h-[100svh] items-end overflow-hidden px-[5vw] pb-[9vh] pt-32">
          <div className="kuro-hero-glow absolute inset-0" aria-hidden="true" />
          <div className="absolute right-[5vw] top-[16vh] hidden text-right text-[0.6rem] uppercase leading-5 tracking-[0.18em] text-kuro-steam/35 lg:block">
            Tokyo method<br />Pacific ingredients<br />Twenty seats
          </div>

          <div className="relative z-10 w-full">
            <div className="kuro-load kuro-load-1 mb-6 flex items-center gap-3 text-[0.64rem] font-medium uppercase tracking-[0.2em] text-kuro-lacquer">
              <span className="h-px w-10 bg-kuro-lacquer" />
              Broth started at 02:14 this morning
            </div>
            <h1 className="kuro-load kuro-load-2 max-w-[11ch] font-bebas text-[clamp(4.5rem,12.2vw,11.5rem)] leading-[0.75] tracking-[-0.025em]">
              Eighteen hours.<br />
              <span className="text-kuro-lacquer">Eight minutes</span><br />
              in the bowl.
            </h1>
            <div className="kuro-load kuro-load-3 mt-8 flex max-w-[900px] flex-col justify-between gap-7 border-t border-kuro-steam/20 pt-6 md:flex-row md:items-end">
              <p className="max-w-[44ch] text-[0.95rem] leading-7 text-kuro-steam/68">
                One broth each night. Twenty seats around the pass. Nothing arrives at the counter before it is ready.
              </p>
              <a href="#bowl" className="kuro-circle-link group grid h-24 w-24 shrink-0 place-items-center rounded-full bg-kuro-lacquer text-center text-[0.58rem] font-medium uppercase tracking-[0.14em] text-kuro-rice">
                <span>Build<br />the bowl <span className="mt-1 inline-block text-base transition-transform duration-200 group-hover:translate-y-1">↓</span></span>
              </a>
            </div>
          </div>
        </header>

        <div className="kuro-ticker border-y border-kuro-lacquer/55 bg-kuro-charcoal2 py-3.5" aria-label="Tonkotsu, shoyu, miso, yakitori, natural sake, open until 2am">
          <div className="kuro-ticker-track font-bebas text-[0.95rem] tracking-[0.17em] text-kuro-lacquer" aria-hidden="true">
            <span>{tickerText}</span>
            <span>{tickerText}</span>
          </div>
        </div>

        <section id="bowl" ref={assemblyRef} className="kuro-assembly relative h-[360vh] bg-[#120f0d]">
          <div className="sticky top-0 grid h-[100svh] overflow-hidden px-[5vw] py-[5vh] lg:grid-cols-[0.68fr_1.32fr] lg:items-center lg:gap-[4vw]">
            <div className="relative z-20">
              <div className="mb-5 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-kuro-lacquer">The house bowl · No. 01</div>
              <h2 className="max-w-[8ch] font-bebas text-[clamp(3.4rem,6vw,5.8rem)] leading-[0.82]">
                Built in layers. Eaten as one.
              </h2>
              <p className="mt-6 max-w-[36ch] text-sm leading-6 text-kuro-steam/55">
                Scroll slowly. Every component lands in the order it does at the pass.
              </p>

              <ol className="mt-6 grid max-w-[390px] grid-cols-2 gap-x-8 gap-y-3 lg:grid-cols-1">
                {[
                  ["01", "Tonkotsu", "18-hour base"],
                  ["02", "Noodles", "34-second boil"],
                  ["03", "Chashu + egg", "Flame + soy"],
                  ["04", "Finish", "Nori + black garlic"],
                ].map(([number, title, detail]) => (
                  <li key={number} className="kuro-stage-label flex items-center gap-4 border-b border-white/10 pb-3">
                    <span className="font-mono text-[0.58rem] text-kuro-lacquer">{number}</span>
                    <span className="text-xs font-medium uppercase tracking-[0.1em]">{title}</span>
                    <span className="ml-auto hidden text-[0.58rem] text-kuro-steam/35 sm:block">{detail}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="kuro-bowl-stage pointer-events-none relative z-10 mt-5 aspect-square w-full self-center lg:mt-0" aria-hidden="true">
              <div className="kuro-table-halo absolute left-1/2 top-[56%] aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full" />
              <img className="kuro-food-layer kuro-layer-bowl" src="/images/kuro/bowl.png" alt="" />
              <img className="kuro-food-layer kuro-layer-noodles" src="/images/kuro/noodles.png" alt="" />
              <img className="kuro-food-layer kuro-layer-chashu" src="/images/kuro/chashu.png" alt="" />
              <img className="kuro-food-layer kuro-layer-garnish" src="/images/kuro/garnish.png" alt="" />
              <div className="kuro-steam kuro-steam-a" />
              <div className="kuro-steam kuro-steam-b" />
              <div className="kuro-steam kuro-steam-c" />
            </div>

            <div className="absolute bottom-5 right-[5vw] font-mono text-[0.55rem] uppercase tracking-[0.16em] text-kuro-steam/25">
              Scroll-controlled service · 01—04
            </div>
          </div>
        </section>

        <section id="menu" className="bg-kuro-rice px-[5vw] py-24 text-kuro-charcoal md:py-32">
          <div className="kuro-reveal mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <span className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-kuro-lacquer">Tonight · July 28</span>
              <h2 className="mt-3 font-bebas text-[clamp(3.2rem,7vw,6.5rem)] leading-[0.82]">Four bowls.<br />No substitutions.</h2>
            </div>
            <p className="max-w-[34ch] text-sm leading-6 text-kuro-charcoal/60">
              The broth changes when the bones do. Ask at the counter about allergens before ordering.
            </p>
          </div>

          <div className="border-t-2 border-kuro-charcoal">
            {menu.map((item, index) => (
              <a href="#reserve" key={item.name} className="kuro-menu-row group grid gap-4 border-b border-kuro-charcoal/25 py-6 md:grid-cols-[0.35fr_1fr_auto] md:items-center">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[0.58rem] text-kuro-lacquer">0{index + 1}</span>
                  <span className="font-bebas text-[clamp(1.8rem,3vw,2.7rem)] tracking-[0.02em]">{item.name}</span>
                  <span className="text-xs text-kuro-lacquer">{item.jp}</span>
                </div>
                <p className="max-w-[50ch] text-sm leading-6 text-kuro-charcoal/55">{item.desc}</p>
                <div className="flex items-center justify-between gap-7 font-bebas text-xl">
                  <span>${item.price}</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap justify-between gap-4 text-[0.58rem] uppercase tracking-[0.14em] text-kuro-charcoal/45">
            <span>Extra egg +3 · Noodles +4</span>
            <span>Kitchen closes 01:30</span>
          </div>
        </section>

        <section id="counter" className="grid border-y border-kuro-lacquer/35 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative min-h-[460px] overflow-hidden bg-kuro-lacquer p-[5vw]">
            <div className="kuro-counter-lines absolute inset-0 opacity-25" aria-hidden="true" />
            <div className="relative flex h-full flex-col justify-between">
              <span className="font-bebas text-2xl tracking-[0.1em]">黒 / KURO</span>
              <span className="max-w-[12ch] font-bebas text-[clamp(3.2rem,6vw,6rem)] leading-[0.83]">Twenty seats. Every one at the pass.</span>
            </div>
          </div>
          <div className="flex items-center bg-kuro-charcoal2 px-[8vw] py-24">
            <div className="kuro-reveal">
              <span className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-kuro-lacquer">The room</span>
              <blockquote className="mt-6 max-w-[18ch] font-bebas text-[clamp(2.5rem,5vw,5rem)] leading-[0.9]">
                No bad table. No back of house. The kitchen is the room.
              </blockquote>
              <p className="mt-7 max-w-[40ch] text-sm leading-7 text-kuro-steam/55">
                Sit close enough to hear the tare hit the bowl. Service moves clockwise, one course at a time.
              </p>
            </div>
          </div>
        </section>

        <section id="reserve" className="px-[5vw] py-24 text-center md:py-32">
          <div className="kuro-reveal">
            <div className="mx-auto mb-7 h-10 w-px bg-kuro-lacquer" />
            <span className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-kuro-lacquer">Dinner · Tuesday—Sunday</span>
            <h2 className="mx-auto mt-5 max-w-[9ch] font-bebas text-[clamp(3.7rem,8vw,8rem)] leading-[0.78]">
              Your seat at the counter.
            </h2>
            <a href="mailto:seat@kuro-ramen.com" className="kuro-primary-button mt-10 inline-flex items-center gap-8 rounded-full bg-kuro-lacquer px-8 py-4 text-sm font-medium uppercase tracking-[0.1em]">
              Reserve a seat <span aria-hidden="true">↗</span>
            </a>
            <p className="mt-5 text-xs text-kuro-steam/40">Walk-ins after 9pm · Groups of six by email</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-kuro-lacquer/35 bg-[#100d0b] px-[5vw] py-12">
        <div className="flex flex-col justify-between gap-9 md:flex-row md:items-end">
          <div>
            <div className="font-bebas text-3xl tracking-[0.1em]">KURO</div>
            <p className="mt-2 text-sm leading-6 text-kuro-steam/45">412 Wren Street<br />Open 5pm—2am</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[0.62rem] uppercase tracking-[0.14em] text-kuro-steam/45">
            <a className="kuro-text-link" href="#menu">Menu</a>
            <a className="kuro-text-link" href="#counter">Counter</a>
            <a className="kuro-text-link" href="mailto:hello@kuro-ramen.com">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
