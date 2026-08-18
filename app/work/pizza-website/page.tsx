"use client";

import { useEffect, useRef } from "react";

const ingredients = [
  { src: "/images/pizza/ingredient-01.webp", x: -320, y: -210, rotate: -18 },
  { src: "/images/pizza/ingredient-02.webp", x: 330, y: -260, rotate: 14 },
  { src: "/images/pizza/ingredient-03.webp", x: -360, y: -90, rotate: -10 },
  { src: "/images/pizza/ingredient-04.webp", x: 390, y: -70, rotate: 22 },
  { src: "/images/pizza/ingredient-05.webp", x: -330, y: 80, rotate: -20 },
  { src: "/images/pizza/ingredient-06.webp", x: 370, y: 40, rotate: 16 },
  { src: "/images/pizza/ingredient-07.webp", x: -390, y: 190, rotate: -15 },
  { src: "/images/pizza/ingredient-08.webp", x: 350, y: 220, rotate: 18 },
  { src: "/images/pizza/ingredient-09.webp", x: -300, y: 330, rotate: -12 },
];

const menu = [
  {
    number: "01",
    name: "The Market",
    ingredients: "Tomato, fior di latte, roasted pepper, red onion, arugula",
    price: "23",
  },
  {
    number: "02",
    name: "Hot Honey",
    ingredients: "Spicy salami, mozzarella, Calabrian chili, local honey",
    price: "25",
  },
  {
    number: "03",
    name: "Green Room",
    ingredients: "Zucchini, artichoke, lemon ricotta, basil, aged pecorino",
    price: "24",
  },
];

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => {
  const t = clamp(value);
  return 1 - Math.pow(1 - t, 4);
};

export default function PizzaCafe() {
  const assemblyRef = useRef<HTMLElement>(null);
  const cutRef = useRef<HTMLElement>(null);
  const explodeRef = useRef<HTMLElement>(null);
  const finishRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = assemblyRef.current;
    if (!section) return;

    const layers = Array.from(section.querySelectorAll<HTMLElement>(".pizza-ingredient"));
    const labels = Array.from(section.querySelectorAll<HTMLElement>(".pizza-stage-label"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = reducedMotion ? 1 : clamp(-rect.top / travel);

      layers.forEach((layer, index) => {
        const start = 0.06 + index * 0.055;
        const ingredientProgress = ease((progress - start) / 0.25);
        const item = ingredients[index];
        const x = (1 - ingredientProgress) * item.x;
        const y = (1 - ingredientProgress) * item.y;
        const rotate = (1 - ingredientProgress) * item.rotate;
        const scale = 0.72 + ingredientProgress * 0.28;

        layer.style.opacity = `${clamp(ingredientProgress * 1.6)}`;
        layer.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`;
      });

      const active = progress < 0.2 ? 0 : progress < 0.44 ? 1 : progress < 0.7 ? 2 : 3;
      labels.forEach((label, index) => {
        label.classList.toggle("is-active", index === active);
        label.classList.toggle("is-complete", index < active);
      });
      section.style.setProperty("--pizza-progress", `${progress}`);

      const sceneProgress = (scene: HTMLElement | null) => {
        if (!scene) return 0;
        const sceneRect = scene.getBoundingClientRect();
        const sceneTravel = Math.max(scene.offsetHeight - window.innerHeight, 1);
        return reducedMotion ? 1 : clamp(-sceneRect.top / sceneTravel);
      };

      const cutScene = cutRef.current;
      if (cutScene) {
        const cutProgress = ease(sceneProgress(cutScene));
        cutScene.style.setProperty("--pizza-cut", `${cutProgress}`);
        cutScene.style.setProperty("--pizza-cut-offset", `${cutProgress * 100}%`);
        cutScene.querySelectorAll<HTMLElement>(".pizza-cut-mask").forEach((mask) => {
          mask.style.clipPath = `inset(0 0 ${cutProgress * 100}% 0)`;
        });
      }

      const explodeScene = explodeRef.current;
      if (explodeScene) {
        const explodeProgress = ease(sceneProgress(explodeScene));
        const targets = [-250, -200, -100, 0, 150, 250];
        explodeScene.querySelectorAll<HTMLElement>(".pizza-explode-layer").forEach((layer, index) => {
          const responsiveDistance = Math.min(window.innerHeight / 850, 1);
          const y = targets[index] * explodeProgress * responsiveDistance;
          const x = (index - 2.5) * explodeProgress * 3;
          layer.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0)`;
        });
        explodeScene.style.setProperty("--pizza-explode", `${explodeProgress}`);
      }

      const finishScene = finishRef.current;
      if (finishScene) {
        const finishProgress = sceneProgress(finishScene);
        const fade = (start: number, end: number) => ease((finishProgress - start) / (end - start));
        const opacities = [
          1 - fade(0.08, 0.25),
          fade(0.08, 0.25) * (1 - fade(0.34, 0.52)),
          fade(0.34, 0.52) * (1 - fade(0.61, 0.77)),
          fade(0.61, 0.77),
        ];
        finishScene.querySelectorAll<HTMLElement>(".pizza-finish-layer").forEach((layer, index) => {
          layer.style.opacity = `${opacities[index]}`;
          layer.style.transform = `scale(${0.985 + opacities[index] * 0.015})`;
        });
        const finishStep = finishProgress < 0.2 ? 0 : finishProgress < 0.46 ? 1 : finishProgress < 0.7 ? 2 : 3;
        finishScene.querySelectorAll<HTMLElement>(".pizza-finish-step").forEach((step, index) => {
          step.classList.toggle("is-active", index === finishStep);
        });
      }
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="pizza-page">
      <a href="#menu" className="pizza-skip-link">Skip to menu</a>

      <nav className="pizza-nav">
        <a href="#top" className="pizza-logo" aria-label="Canto Pizza Cafe home">
          CANTO<span>•</span>
        </a>
        <div className="pizza-nav-links">
          <a href="#menu">Menu</a>
          <a href="#story">Our dough</a>
          <a href="#visit">Visit</a>
        </div>
        <a href="#visit" className="pizza-nav-cta">Book a table</a>
      </nav>

      <main>
        <section id="top" ref={assemblyRef} className="pizza-assembly">
          <div className="pizza-sticky">
            <div className="pizza-copy">
              <p className="pizza-kicker">Neighbourhood pizza café · Calgary</p>
              <h1>
                Simple things.<br />
                <em>Done properly.</em>
              </h1>
              <p className="pizza-intro">
                Flour, fire, and what looked best at the market this morning.
                Scroll to bring tonight&apos;s first pie together.
              </p>
              <ol className="pizza-stage-list">
                {[
                  ["01", "The flour", "Prairie wheat"],
                  ["02", "The market", "Picked today"],
                  ["03", "The fire", "430°C"],
                  ["04", "The table", "Ready"],
                ].map(([number, title, detail]) => (
                  <li className="pizza-stage-label" key={number}>
                    <span>{number}</span><b>{title}</b><small>{detail}</small>
                  </li>
                ))}
              </ol>
            </div>

            <div className="pizza-food-stage" aria-label="Raw ingredients moving into place beside a finished market pizza as you scroll">
              <img
                className="pizza-board"
                src="/images/pizza/board.webp"
                alt="Half of a freshly baked vegetable pizza, showing its ingredients before and after the oven"
              />
              <div className="pizza-ingredient-group" aria-hidden="true">
                {ingredients.map((ingredient, index) => (
                  <img
                    className={`pizza-ingredient pizza-ingredient--${index + 1}`}
                    src={ingredient.src}
                    alt=""
                    key={ingredient.src}
                  />
                ))}
              </div>
              <div className="pizza-food-caption" aria-hidden="true">
                <span>RAW</span><i /><span>FIRED</span>
              </div>
            </div>

            <div className="pizza-scroll-note" aria-hidden="true">
              Scroll to assemble <span>↓</span>
            </div>
          </div>
        </section>

        <section ref={cutRef} className="pizza-cut-scene">
          <div className="pizza-scene-sticky">
            <div className="pizza-scene-heading">
              <p className="pizza-kicker">What came in this morning</p>
              <h2>Good outside.<br /><em>Even better within.</em></h2>
              <p>Scroll through today&apos;s market crate.</p>
            </div>

            <div className="pizza-cut-row" aria-label="Whole vegetables reveal their fresh cut interiors as you scroll">
              {[1, 2, 3, 4, 5].map((number) => (
                <div className="pizza-cut-item" key={number}>
                  <img
                    className="pizza-cut-bottom"
                    src={`/images/pizza/cut-bottom-0${number}.webp`}
                    alt=""
                    aria-hidden="true"
                  />
                  <div className="pizza-cut-mask" aria-hidden="true">
                    <img
                      className="pizza-cut-top"
                      src={`/images/pizza/cut-top-0${number}.webp`}
                      alt=""
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pizza-scene-index" aria-hidden="true">
              <span>Whole</span><i /><span>Cut</span>
            </div>
          </div>
        </section>

        <section ref={explodeRef} className="pizza-explode-scene">
          <div className="pizza-scene-sticky">
            <div className="pizza-scene-heading pizza-scene-heading--center">
              <p className="pizza-kicker">Nothing to hide</p>
              <h2>Every layer<br /><em>earns its place.</em></h2>
              <p>Keep scrolling to see what is inside the slice.</p>
            </div>

            <div className="pizza-explode-stack" aria-label="A pizza slice separating into its individual layers as you scroll">
              {[1, 2, 3, 4, 5, 6].map((number) => (
                <img
                  className={`pizza-explode-layer pizza-explode-layer--${number}`}
                  src={`/images/pizza/slice-0${number}.webp`}
                  alt={number === 6 ? "A pizza slice shown as separate crust, tomato, cheese, olive, and basil layers" : ""}
                  aria-hidden={number !== 6}
                  key={number}
                />
              ))}
            </div>

            <div className="pizza-explode-labels" aria-hidden="true">
              <span>Basil + olive</span><span>Cheese</span><span>Tomato</span><span>72-hour base</span>
            </div>
          </div>
        </section>

        <section ref={finishRef} className="pizza-finish-scene">
          <div className="pizza-scene-sticky pizza-finish-sticky">
            <div className="pizza-finish-copy">
              <p className="pizza-kicker">From bench to table</p>
              <h2>Built one<br /><em>decision at a time.</em></h2>
              <ol>
                {["Stretch", "Sauce", "Dress", "Fire"].map((step, index) => (
                  <li className="pizza-finish-step" key={step}>
                    <span>0{index + 1}</span>{step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="pizza-finish-stage" aria-label="Pizza progressing from stretched dough to a finished baked pie as you scroll">
              {[1, 2, 3, 4].map((number) => (
                <img
                  className={`pizza-finish-layer pizza-finish-layer--${number}`}
                  src={`/images/pizza/variation-0${number}.webp`}
                  alt={number === 4 ? "A finished Canto pizza ready to serve" : ""}
                  aria-hidden={number !== 4}
                  key={number}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="pizza-statement">
          <p className="pizza-kicker">One dough · three days</p>
          <h2>
            Crisp at the edge.<br />
            <em>Soft where it matters.</em>
          </h2>
          <p>
            We ferment every batch for 72 hours, stretch it by hand, and fire
            each pizza when you order. No shortcuts hiding under the cheese.
          </p>
        </section>

        <section id="menu" className="pizza-menu">
          <div className="pizza-menu-heading">
            <div>
              <p className="pizza-kicker">Tonight at Canto</p>
              <h2>A short menu.<br />A good reason.</h2>
            </div>
            <p>
              Our menu changes with the growers. These three stay until the
              season tells us otherwise.
            </p>
          </div>
          <div className="pizza-menu-list">
            {menu.map((pizza) => (
              <article key={pizza.number} className="pizza-menu-row">
                <span>{pizza.number}</span>
                <h3>{pizza.name}</h3>
                <p>{pizza.ingredients}</p>
                <strong>${pizza.price}</strong>
              </article>
            ))}
          </div>
        </section>

        <section id="story" className="pizza-story">
          <div className="pizza-story-orbit" aria-hidden="true">
            <span>72</span><small>hours</small>
          </div>
          <div className="pizza-story-copy">
            <p className="pizza-kicker">Made downstairs</p>
            <h2>Time is our<br />main ingredient.</h2>
            <p>
              The dough starts three mornings before it reaches your table.
              Slow fermentation builds flavour, a lighter crumb, and the kind
              of crust you finish even when you said you were full.
            </p>
            <dl>
              <div><dt>Flour</dt><dd>Prairie-grown</dd></div>
              <div><dt>Oven</dt><dd>430°C stone deck</dd></div>
              <div><dt>Ferment</dt><dd>72 hours</dd></div>
            </dl>
          </div>
        </section>

        <section id="visit" className="pizza-visit">
          <div>
            <p className="pizza-kicker">Dinner, coffee, another slice</p>
            <h2>Come hungry.<br /><em>Stay a while.</em></h2>
          </div>
          <div className="pizza-visit-details">
            <p>Tuesday—Sunday<br />4:00 pm—late</p>
            <p>17th Avenue SW<br />Calgary, Alberta</p>
            <a href="mailto:hello@cantopizza.ca">Reserve a table <span>→</span></a>
          </div>
        </section>
      </main>

      <footer className="pizza-footer">
        <a href="#top" className="pizza-logo">CANTO<span>•</span></a>
        <p>Pizza · espresso · good neighbours</p>
        <p>© 2026 Canto Pizza Café</p>
      </footer>
    </div>
  );
}
