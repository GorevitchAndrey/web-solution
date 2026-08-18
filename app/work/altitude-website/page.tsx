"use client";

import { useEffect, useRef } from "react";

const stars = Array.from({ length: 132 }, (_, index) => ({
  left: `${(index * 47 + index * index * 7 + 11) % 100}%`,
  top: `${(index * 29 + index * index * 3 + 5) % 76}%`,
  size: index % 29 === 0 ? 2.4 : index % 11 === 0 ? 1.7 : index % 4 === 0 ? 1.2 : 0.8,
  opacity: 0.22 + ((index * 17) % 58) / 100,
  delay: `${((index * 13) % 57) * -0.17}s`,
  duration: `${4.2 + ((index * 7) % 31) / 10}s`,
  glow: index % 29 === 0,
}));

const shootingStars = [
  { left: "8%", top: "12%", delay: "-1.2s", duration: "6.2s" },
  { left: "29%", top: "5%", delay: "-4.8s", duration: "7.4s" },
  { left: "48%", top: "20%", delay: "-2.6s", duration: "5.7s" },
  { left: "68%", top: "8%", delay: "-6.1s", duration: "8.1s" },
  { left: "80%", top: "27%", delay: "-3.7s", duration: "6.8s" },
  { left: "91%", top: "14%", delay: "-7.3s", duration: "8.9s" },
  { left: "57%", top: "2%", delay: "-0.4s", duration: "7.8s" },
];

const lodges = [
  {
    idx: "01",
    range: "Cascade Range",
    title: "The Lantern Hut",
    desc: "A timber room at 6,200 ft, reached by a forty-minute footpath and warmed by the stove you light yourself.",
    meta: "Sleeps 2",
    price: "From $340",
    tone: "from-[#25324a] via-[#17243a] to-[#0d1423]",
  },
  {
    idx: "02",
    range: "Sawtooth Range",
    title: "Northface Cabin",
    desc: "North-facing glass, angled for aurora watching. A handwritten star chart waits beside the bed.",
    meta: "Sleeps 4",
    price: "From $410",
    tone: "from-[#2c3445] via-[#172338] to-[#0d1423]",
  },
  {
    idx: "03",
    range: "Bitterroot Range",
    title: "The Quiet Ridge",
    desc: "Above the treeline and intentionally outside cell range. Bring the book you keep meaning to finish.",
    meta: "Sleeps 2",
    price: "From $295",
    tone: "from-[#263b43] via-[#172a35] to-[#0d1423]",
  },
];

export default function Altitude() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const updateScene = () => {
      frame = 0;
      const distance = Math.min(window.scrollY, window.innerHeight * 1.1);
      scene.style.setProperty("--alt-scroll", `${distance}px`);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScene);
    };

    updateScene();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="altitude-page bg-alt-ink text-alt-mist font-manrope font-light overflow-x-hidden">
      <a className="alt-skip-link" href="#lodges">
        Skip to lodges
      </a>

      <nav className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-[6vw] py-7">
        <a
          href="#top"
          className="font-fraunces text-[1.35rem] font-medium tracking-[0.04em] text-[#f6f3ec]"
          aria-label="Fernline home"
        >
          Fernline<span className="text-alt-amber">.</span>
        </a>
        <div className="hidden items-center gap-9 text-[0.78rem] tracking-[0.12em] text-alt-mist/70 md:flex">
          <a className="alt-text-link" href="#lodges">Lodges</a>
          <a className="alt-text-link" href="#field-notes">Field notes</a>
          <a className="alt-text-link" href="#about">Our standard</a>
        </div>
        <a
          href="#lodges"
          className="alt-nav-cta rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-xs font-medium tracking-[0.08em] text-[#f6f3ec] backdrop-blur-md"
        >
          Find a stay
          <span aria-hidden="true"> ↗</span>
        </a>
      </nav>

      <header id="top" ref={sceneRef} className="alt-hero relative min-h-[100svh] overflow-hidden">
        <div className="alt-sky absolute inset-0" aria-hidden="true">
          <div className="alt-aurora absolute inset-0" />
          <div className="alt-star-field absolute inset-0">
            {stars.map((star, index) => (
              <i
                key={index}
                className={`alt-star${star.glow ? " alt-star--glow" : ""}`}
                style={{
                  left: star.left,
                  top: star.top,
                  width: star.size,
                  height: star.size,
                  opacity: star.opacity,
                  animationDelay: star.delay,
                  animationDuration: star.duration,
                }}
              />
            ))}
            {shootingStars.map((star, index) => (
              <i
                key={index}
                className="alt-shooting-star"
                style={{
                  left: star.left,
                  top: star.top,
                  animationDelay: star.delay,
                  animationDuration: star.duration,
                }}
              />
            ))}
          </div>
        </div>

        <div className="alt-horizon-glow absolute inset-x-0 bottom-0 h-[58%]" aria-hidden="true" />
        <div className="alt-mountain-back absolute inset-x-0 bottom-0 h-[55%]" aria-hidden="true">
          <svg viewBox="0 0 1600 620" preserveAspectRatio="none" className="h-full w-full">
            <path d="M0 620V430C106 397 180 380 273 350c101-33 165-105 256-121 90-16 157 52 240 53 88 2 150-86 238-114 99-32 161 62 248 81 120 27 202-68 345-91v462Z" fill="url(#farRidge)" />
            <path d="M246 362c111-40 176-115 282-133 88-15 152 48 239 53 90 5 160-81 240-114" fill="none" stroke="rgba(197,214,227,.12)" strokeWidth="2" />
            <defs>
              <linearGradient id="farRidge" x1="800" y1="160" x2="800" y2="620" gradientUnits="userSpaceOnUse">
                <stop stopColor="#263953" stopOpacity=".76" />
                <stop offset=".55" stopColor="#17263b" />
                <stop offset="1" stopColor="#101a2b" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="alt-mist alt-mist-one absolute inset-x-0 bottom-[28%] h-24" aria-hidden="true" />

        <div className="alt-mountain-mid absolute inset-x-0 bottom-0 h-[45%]" aria-hidden="true">
          <svg viewBox="0 0 1600 520" preserveAspectRatio="none" className="h-full w-full">
            <path d="M0 520V404c91-22 178-84 265-116 61-23 101-7 151-31 78-37 116-142 211-173 74-25 122 91 190 110 66 18 114-31 174-17 77 19 113 126 190 140 81 15 146-92 231-104 63-8 129 31 188 63v244Z" fill="url(#midRidge)" />
            <path d="M416 257c79-39 117-142 211-173 44-15 78 21 111 59l-61-28-48 60-39-38-81 81Z" fill="rgba(215,225,231,.13)" />
            <path d="M1181 317c81 15 146-92 231-104 44-6 88 11 130 33l-100 4-34 48-35-29-74 69Z" fill="rgba(210,222,229,.1)" />
            <path d="M0 435c136-14 225-112 350-120 95-6 143 63 238 60 111-4 171-101 273-96 118 5 166 104 269 107 111 3 176-87 292-94 60-3 119 12 178 42" fill="none" stroke="rgba(210,223,231,.075)" strokeWidth="2" />
            <defs>
              <linearGradient id="midRidge" x1="820" y1="84" x2="820" y2="520" gradientUnits="userSpaceOnUse">
                <stop stopColor="#17273b" />
                <stop offset="1" stopColor="#0b1423" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="alt-mist alt-mist-two absolute inset-x-0 bottom-[13%] h-20" aria-hidden="true" />

        <div className="alt-mountain-front absolute inset-x-0 bottom-0 h-[27%]" aria-hidden="true">
          <svg viewBox="0 0 1600 330" preserveAspectRatio="none" className="h-full w-full">
            <path d="M0 330V214c138-5 222-96 355-87 117 8 173 102 288 99 132-4 209-118 348-113 119 4 185 105 297 103 115-2 194-71 312-83v197Z" fill="#080f1b" />
            <path d="M0 256c172-2 224-74 362-69 104 4 174 71 280 67 126-5 216-91 350-84 116 6 188 75 296 73 125-2 191-54 312-63" fill="none" stroke="rgba(148,171,178,.06)" strokeWidth="2" />
          </svg>
        </div>

        <div className="alt-cabin absolute bottom-[13.5%] right-[13vw]" aria-hidden="true">
          <span className="alt-cabin-roof" />
          <span className="alt-cabin-body" />
          <span className="alt-cabin-window" />
          <span className="alt-cabin-smoke" />
        </div>

        <div className="relative z-20 flex min-h-[100svh] flex-col justify-end px-[6vw] pb-[9vh] pt-36">
          <div className="alt-hero-copy max-w-[900px]">
            <div className="alt-load alt-load-1 mb-7 flex items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-alt-amber">
              <span className="h-px w-9 bg-alt-amber/70" />
              Private mountain stays · scouted on foot
            </div>
            <h1 className="alt-load alt-load-2 max-w-[15ch] font-fraunces text-[clamp(3.1rem,7.1vw,6.8rem)] font-light leading-[0.94] tracking-[-0.035em] text-[#f7f3eb]">
              Go where the road{" "}
              <em className="font-normal text-alt-amber">runs out.</em>
            </h1>
            <div className="alt-load alt-load-3 mt-8 flex max-w-[760px] flex-col gap-8 border-t border-white/15 pt-6 md:flex-row md:items-end md:justify-between">
              <p className="max-w-[46ch] text-[0.98rem] leading-7 text-alt-mist/76">
                Cabins and lodges selected for silence, dark skies, and the rare comfort of being
                completely out of reach.
              </p>
              <a href="#lodges" className="alt-primary-cta group inline-flex shrink-0 items-center gap-5 self-start rounded-full bg-alt-amber px-6 py-3.5 text-sm font-semibold text-alt-ink">
                Explore the collection
                <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="alt-load alt-load-4 absolute bottom-[9vh] right-[6vw] hidden items-end gap-4 xl:flex">
            <div className="text-right">
              <div className="font-mono text-[0.65rem] tracking-[0.12em] text-alt-amber/80">51.1784° N</div>
              <div className="mt-1 text-xs text-alt-mist/55">Last scouted · 12 nights ago</div>
            </div>
            <div className="relative h-11 w-11 rounded-full border border-white/20">
              <span className="absolute left-1/2 top-1.5 h-2 w-px -translate-x-1/2 bg-alt-amber" />
              <span className="absolute inset-2 rounded-full border border-white/10" />
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-20 bg-alt-ink">
        <section id="about" className="border-y border-white/[0.07] px-[6vw] py-8">
          <div className="grid gap-7 md:grid-cols-3 md:divide-x md:divide-white/[0.08]">
            {[
              ["240+", "Stays visited in person"],
              ["19", "Mountain ranges crossed"],
              ["0 dB", "Road noise at night"],
            ].map(([number, label]) => (
              <div key={label} className="md:px-8 first:pl-0">
                <div className="font-fraunces text-[1.8rem] text-[#f6f3ec]">{number}</div>
                <div className="mt-1 text-[0.68rem] uppercase tracking-[0.14em] text-alt-sage/70">{label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="lodges" className="px-[6vw] py-28 md:py-36">
          <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <div className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-alt-amber">The winter edit · 2026</div>
              <h2 className="mt-4 max-w-[14ch] font-fraunces text-[clamp(2.25rem,4vw,3.7rem)] font-light leading-[1.03] text-[#f6f3ec]">
                Three places worth the walk.
              </h2>
            </div>
            <p className="max-w-[38ch] text-sm leading-6 text-alt-sage/75">
              No ranked lists. No paid placement. Every stay is slept in, walked to, and checked after dark.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {lodges.map((lodge) => (
              <a
                href="#field-notes"
                key={lodge.title}
                className="alt-lodge-card group relative min-h-[500px] overflow-hidden rounded-[2px] border border-white/[0.08] bg-alt-ink2 p-7 focus:outline-none"
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${lodge.tone}`} />
                <div className="absolute inset-x-0 top-0 h-[58%] overflow-hidden opacity-80" aria-hidden="true">
                  <svg viewBox="0 0 500 300" preserveAspectRatio="none" className="h-full w-full transition-transform duration-700 group-hover:scale-[1.025]">
                    <path d="M0 300V213l73-62 45 35 90-117 63 96 52-42 77 82 54-38 46 34v99Z" fill="rgba(202,211,224,.08)" />
                    <path d="M0 300V246l90-54 72 39 101-87 85 95 73-51 79 58v54Z" fill="rgba(5,11,20,.72)" />
                  </svg>
                </div>
                <div className="relative flex h-full min-h-[444px] flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[0.66rem] tracking-[0.16em] text-alt-amber">{lodge.idx}</span>
                    <span className="text-[0.66rem] uppercase tracking-[0.14em] text-alt-mist/55">{lodge.range}</span>
                  </div>
                  <div>
                    <h3 className="font-fraunces text-[2rem] font-light text-[#f6f3ec]">{lodge.title}</h3>
                    <p className="mt-3 max-w-[38ch] text-sm leading-6 text-alt-sage/75">{lodge.desc}</p>
                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-xs">
                      <span className="text-alt-mist/60">{lodge.meta}</span>
                      <span className="flex items-center gap-3 font-medium text-alt-amber">
                        {lodge.price}
                        <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="field-notes" className="grid border-y border-white/[0.07] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[420px] overflow-hidden bg-[#111b2b] p-[6vw]">
            <div className="absolute inset-0 opacity-70" aria-hidden="true">
              <svg viewBox="0 0 800 560" preserveAspectRatio="none" className="h-full w-full">
                <path d="M0 560V382L145 246l92 79 177-227 138 182 98-89 150 151v218Z" fill="#1c2b41" />
                <path d="M0 560V453l167-97 109 72 180-154 122 142 105-67 117 81v130Z" fill="#0b1321" />
              </svg>
            </div>
            <div className="relative flex h-full flex-col justify-between">
              <span className="text-[0.66rem] uppercase tracking-[0.18em] text-alt-amber">Scout note · 07</span>
              <span className="font-mono text-[0.65rem] leading-5 text-alt-mist/45">
                BITTERROOT RANGE<br />47.1160° N · −114.0440° W
              </span>
            </div>
          </div>
          <div className="flex items-center bg-alt-ink2 px-[7vw] py-24">
            <div>
              <blockquote className="max-w-[19ch] font-fraunces text-[clamp(1.9rem,3.5vw,3.25rem)] font-light leading-[1.16] text-[#f6f3ec]">
                “At 11:42 p.m. the generator clicked off. The silence arrived all at once.”
              </blockquote>
              <p className="mt-7 text-sm leading-6 text-alt-sage/70">
                From Mara’s scouting journal, after one night at The Quiet Ridge.
              </p>
              <a href="#lodges" className="alt-text-link mt-8 inline-block text-xs uppercase tracking-[0.13em] text-alt-amber">
                Read the field notes →
              </a>
            </div>
          </div>
        </section>

        <section className="px-[6vw] py-28 text-center md:py-36">
          <div className="mx-auto mb-6 h-10 w-px bg-gradient-to-b from-transparent to-alt-amber/70" />
          <p className="mx-auto max-w-[17ch] font-fraunces text-[clamp(2rem,4.2vw,4rem)] font-light leading-[1.05] text-[#f6f3ec]">
            The best room is the one the world cannot reach.
          </p>
          <a href="#lodges" className="alt-primary-cta mt-9 inline-flex rounded-full bg-alt-amber px-7 py-3.5 text-sm font-semibold text-alt-ink">
            Find your way out
          </a>
        </section>
      </main>

      <footer className="relative z-20 border-t border-white/[0.07] bg-[#080e18] px-[6vw] py-14">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <div className="font-fraunces text-2xl text-[#f6f3ec]">Fernline<span className="text-alt-amber">.</span></div>
            <p className="mt-3 max-w-[32ch] text-sm leading-6 text-alt-sage/60">Small stays, high places, checked in person.</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs tracking-[0.08em] text-alt-mist/60">
            <a className="alt-text-link" href="#lodges">Lodges</a>
            <a className="alt-text-link" href="#field-notes">Journal</a>
            <a className="alt-text-link" href="mailto:hello@fernline.co">hello@fernline.co</a>
          </div>
        </div>
        <div className="mt-12 border-t border-white/[0.07] pt-5 text-[0.66rem] uppercase tracking-[0.12em] text-alt-mist/35">
          © 2026 Fernline Alpine Stays
        </div>
      </footer>
    </div>
  );
}
