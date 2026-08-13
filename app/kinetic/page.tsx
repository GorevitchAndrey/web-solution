"use client";

import { useEffect, useRef } from "react";

const projects = [
  {
    number: "01",
    type: "Brand film",
    client: "Kindred Audio",
    title: "The room disappears.",
    detail: "Direction · Edit · Sound",
    year: "2026",
    visual: "kin-visual-orbit",
    span: "lg:col-span-7",
  },
  {
    number: "02",
    type: "Title sequence",
    client: "Norlight Films",
    title: "A season opens in reverse.",
    detail: "Concept · Titles · 3D",
    year: "2025",
    visual: "kin-visual-type",
    span: "lg:col-span-5",
  },
  {
    number: "03",
    type: "Product launch",
    client: "Vantable OS",
    title: "Ninety seconds to first click.",
    detail: "Strategy · Motion system",
    year: "2026",
    visual: "kin-visual-grid",
    span: "lg:col-span-5",
  },
  {
    number: "04",
    type: "CG campaign",
    client: "Marrow Studio",
    title: "Made to turn heads—and products.",
    detail: "Direction · CG · Toolkit",
    year: "2025",
    visual: "kin-visual-object",
    span: "lg:col-span-7",
  },
];

export default function Kinetic() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = document.querySelectorAll<HTMLElement>(".kinetic-page .kin-reveal");

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
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealItems.forEach((item) => observer.observe(item));

    let frame = 0;
    const updateHero = () => {
      frame = 0;
      const hero = heroRef.current;
      if (!hero) return;
      hero.style.setProperty("--kin-scroll", `${Math.min(window.scrollY, window.innerHeight)}px`);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateHero);
    };

    updateHero();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      revealTimers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="kinetic-page bg-kin-paper text-kin-ink font-archivo overflow-x-hidden">
      <a href="#work" className="kin-skip-link">Skip to selected work</a>

      <nav className="absolute inset-x-0 top-0 z-40 flex items-center justify-between border-b-2 border-kin-ink px-[4vw] py-5">
        <a href="#top" className="flex items-center gap-3" aria-label="Ferrous studio home">
          <span className="kin-logo-mark relative block h-7 w-7 bg-kin-shock" aria-hidden="true" />
          <span className="font-archivoblack text-lg tracking-[-0.03em]">FERROUS®</span>
        </a>
        <div className="hidden items-center gap-8 text-[0.7rem] font-semibold uppercase tracking-[0.12em] md:flex">
          <a className="kin-text-link" href="#work">Work</a>
          <a className="kin-text-link" href="#studio">Studio</a>
          <a className="kin-text-link" href="#services">Services</a>
        </div>
        <a href="#contact" className="kin-nav-cta inline-flex items-center gap-3 bg-kin-ink px-5 py-2.5 text-xs font-semibold text-kin-paper">
          Start a project <span aria-hidden="true">↗</span>
        </a>
      </nav>

      <main>
        <header id="top" ref={heroRef} className="kin-hero relative flex min-h-[100svh] flex-col justify-end overflow-hidden border-b-[3px] border-kin-ink px-[4vw] pb-7 pt-32">
          <div className="kin-hero-meta mb-5 flex items-end justify-between gap-6 border-b-2 border-kin-ink pb-4 text-[0.66rem] font-semibold uppercase tracking-[0.13em]">
            <span>Independent motion studio</span>
            <span className="hidden text-right sm:block">Los Angeles · Working everywhere<br />Est. 2019</span>
          </div>

          <h1 className="font-archivoblack text-[clamp(4.2rem,13.1vw,13.2rem)] leading-[0.74] tracking-[-0.07em]" aria-label="We make motion matter">
            <span className="kin-line kin-line-a block overflow-hidden whitespace-nowrap">
              <span className="kin-word kin-word-1 inline-block">WE MAKE</span>
            </span>
            <span className="kin-line kin-line-b block overflow-hidden whitespace-nowrap text-kin-shock">
              <span className="kin-word kin-word-2 inline-block">MOTION</span>
            </span>
            <span className="kin-line kin-line-c block overflow-hidden whitespace-nowrap text-right">
              <span className="kin-word kin-word-3 inline-block">MATTER.</span>
            </span>
          </h1>

          <div className="kin-hero-footer mt-7 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <p className="max-w-[44ch] text-[1rem] font-medium leading-6">
              Title sequences, brand films, and launch systems for people who know movement is part of the message.
            </p>
            <a href="#work" className="kin-circle-link group grid h-24 w-24 shrink-0 place-items-center rounded-full border-2 border-kin-ink text-center text-[0.62rem] font-bold uppercase tracking-[0.12em]">
              <span>View work<br /><span className="inline-block text-xl transition-transform duration-200 group-hover:translate-y-1">↓</span></span>
            </a>
          </div>
        </header>

        <section id="services" className="grid border-b-[3px] border-kin-ink md:grid-cols-4">
          {[
            ["01", "Brand motion"],
            ["02", "Title design"],
            ["03", "Launch films"],
            ["04", "Motion systems"],
          ].map(([number, label]) => (
            <div key={label} className="flex items-center justify-between border-b-2 border-kin-ink px-[4vw] py-7 last:border-b-0 md:border-b-0 md:border-r-2 md:px-6 md:last:border-r-0">
              <span className="text-sm font-semibold">{label}</span>
              <span className="font-mono text-[0.6rem] text-kin-shock">{number}</span>
            </div>
          ))}
        </section>

        <section id="work" className="px-[4vw] py-24 md:py-32">
          <div className="kin-reveal mb-14 flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <span className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-kin-shock">Selected work · 2025—26</span>
              <h2 className="mt-3 font-archivoblack text-[clamp(2.8rem,6vw,6.2rem)] leading-[0.88] tracking-[-0.055em]">
                FOUR FILMS.<br />NO FILLER.
              </h2>
            </div>
            <p className="max-w-[35ch] text-sm font-medium leading-6">
              Every frame has a job. These are the projects where strategy, sound, and movement arrived at the same answer.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-4">
            {projects.map((project, index) => (
              <a
                key={project.title}
                href="#contact"
                className={`kin-project kin-reveal group col-span-12 ${project.span} border-2 border-kin-ink bg-kin-paper focus:outline-none`}
                data-reveal-delay={index * 60}
              >
                <div
                  className={`kin-project-visual ${project.visual} relative min-h-[310px] overflow-hidden border-b-2 border-kin-ink md:min-h-[400px]`}
                  aria-hidden="true"
                >
                  {project.visual === "kin-visual-orbit" && (
                    <>
                      <span className="kin-orbit kin-orbit-a" />
                      <span className="kin-orbit kin-orbit-b" />
                      <span className="kin-orbit-dot" />
                    </>
                  )}
                  {project.visual === "kin-visual-type" && (
                    <div className="absolute inset-0 flex flex-col justify-center font-archivoblack text-[clamp(4rem,9vw,8rem)] leading-[0.68] tracking-[-0.08em]">
                      <span className="-translate-x-[8%]">AFTER</span>
                      <span className="translate-x-[15%] text-kin-shock">DARK</span>
                    </div>
                  )}
                  {project.visual === "kin-visual-grid" && (
                    <>
                      <div className="kin-grid-plane absolute inset-0" />
                      <div className="kin-grid-window absolute left-1/2 top-1/2 w-[66%] -translate-x-1/2 -translate-y-1/2 border-2 border-kin-ink bg-kin-paper p-4 shadow-[10px_10px_0_#ff4d1c]">
                        <div className="mb-8 flex gap-1.5">
                          <i /><i /><i />
                        </div>
                        <div className="h-2 w-2/3 bg-kin-ink" />
                        <div className="mt-3 h-2 w-5/6 bg-kin-ink/25" />
                        <div className="mt-3 h-2 w-1/2 bg-kin-ink/25" />
                      </div>
                    </>
                  )}
                  {project.visual === "kin-visual-object" && (
                    <div className="kin-object absolute left-1/2 top-1/2 aspect-square w-[40%] -translate-x-1/2 -translate-y-1/2 bg-kin-shock" />
                  )}
                  <span className="absolute left-5 top-5 border-2 border-kin-ink bg-kin-paper px-3 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.1em]">
                    Play project ↗
                  </span>
                </div>
                <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto]">
                  <div>
                    <div className="text-[0.62rem] font-bold uppercase tracking-[0.13em] text-kin-shock">
                      {project.type} · {project.client}
                    </div>
                    <h3 className="mt-3 max-w-[18ch] font-archivoblack text-[clamp(1.65rem,3vw,2.8rem)] leading-[0.96] tracking-[-0.035em]">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex items-end justify-between gap-8 text-right md:flex-col">
                    <span className="font-mono text-[0.6rem]">{project.number} / {project.year}</span>
                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.1em]">{project.detail}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="studio" className="grid border-y-[3px] border-kin-ink lg:grid-cols-[0.72fr_1.28fr]">
          <div className="flex min-h-[390px] flex-col justify-between bg-kin-shock p-[4vw] text-kin-paper">
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.16em]">Studio principle No. 01</span>
            <div className="kin-studio-mark relative h-32 w-32" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="flex items-center bg-kin-ink px-[7vw] py-24 text-kin-paper md:py-32">
            <div className="kin-reveal">
              <p className="max-w-[16ch] font-archivoblack text-[clamp(2.5rem,5vw,5.3rem)] leading-[0.93] tracking-[-0.05em]">
                IF IT DOESN’T CHANGE HOW THE IDEA FEELS, IT DOESN’T MOVE.
              </p>
              <p className="mt-8 max-w-[44ch] text-sm leading-6 text-kin-paper/55">
                We use motion to clarify a point, build anticipation, or land a feeling. Never to decorate an empty frame.
              </p>
            </div>
          </div>
        </section>

        <section className="px-[4vw] py-24 md:py-32">
          <div className="kin-reveal grid gap-12 md:grid-cols-[0.75fr_1.25fr]">
            <div>
              <span className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-kin-shock">Small by design</span>
              <h2 className="mt-4 font-archivoblack text-[clamp(2.5rem,5vw,5rem)] leading-[0.9] tracking-[-0.05em]">THE PEOPLE WHO PITCH DO THE WORK.</h2>
            </div>
            <div className="grid gap-px self-end bg-kin-ink md:grid-cols-3">
              {[
                ["06", "Core team"],
                ["12", "Specialist collaborators"],
                ["01", "Project at a time"],
              ].map(([number, label]) => (
                <div key={label} className="bg-kin-paper p-6">
                  <div className="font-archivoblack text-4xl text-kin-shock">{number}</div>
                  <div className="mt-2 text-xs font-semibold uppercase tracking-[0.1em]">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t-[3px] border-kin-ink bg-kin-shock px-[4vw] py-20 md:py-28">
          <div className="kin-reveal flex flex-col justify-between gap-12 md:flex-row md:items-end">
            <div>
              <span className="text-[0.66rem] font-bold uppercase tracking-[0.16em]">Taking on one Q4 project</span>
              <h2 className="mt-4 max-w-[10ch] font-archivoblack text-[clamp(3.6rem,8.5vw,9rem)] leading-[0.78] tracking-[-0.07em]">
                MAKE IT MOVE.
              </h2>
            </div>
            <a href="mailto:hello@ferrous.studio" className="kin-contact-link group flex min-w-[290px] items-center justify-between border-b-[3px] border-kin-ink py-4 text-lg font-bold">
              hello@ferrous.studio
              <span className="text-2xl transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="flex flex-wrap justify-between gap-5 bg-kin-ink px-[4vw] py-8 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-kin-paper/55">
        <span>© Ferrous Studio 2026</span>
        <span>Los Angeles · Remote</span>
        <a className="kin-text-link" href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}
