const samples = [
    {
    href: "/pizza",
    index: "00",
    name: "Canto",
    category: "Pizza cafe",
    description: "A bright neighbourhood restaurant concept where raw ingredients assemble into the evening’s first pizza as you scroll.",
    theme: "pizza",
  },
  {
    href: "/altitude",
    index: "01",
    name: "Fernline",
    category: "Luxury travel",
    description: "An atmospheric lodge experience shaped by depth, light, and a restrained night-sky parallax.",
    theme: "altitude",
  },
  {
    href: "/loopline",
    index: "02",
    name: "Loopline",
    category: "AI scheduling",
    description: "A precise SaaS narrative that turns calendar complexity into a clear, scroll-led product story.",
    theme: "loopline",
  },
  {
    href: "/kuro",
    index: "03",
    name: "Kuro",
    category: "Ramen & izakaya",
    description: "A late-night restaurant concept with editorial typography and a cinematic bowl assembly.",
    theme: "kuro",
  },
  {
    href: "/kinetic",
    index: "04",
    name: "Ferrous",
    category: "Creative studio",
    description: "An expressive agency site where type, rhythm, and motion become part of the brand system.",
    theme: "kinetic",
  },
  {
    href: "/densho",
    index: "05",
    name: "Densho",
    category: "Specialty coffee",
    description: "A tactile commerce concept built around ritual, product detail, and quiet editorial motion.",
    theme: "densho",
  },
];

const services = [
  {
    number: "01",
    title: "Website fixes",
    price: "From $100",
    description: "Focused help for broken layouts, slow pages, mobile issues, forms, integrations, and unfinished details.",
  },
  {
    number: "02",
    title: "Business websites",
    price: "From $600",
    description: "Clear, fast, search-ready websites that make a small business feel established and easy to trust.",
  },
  {
    number: "03",
    title: "Custom web apps",
    price: "Scoped to fit",
    description: "Purpose-built dashboards, internal tools, portals, and product interfaces designed around real workflows.",
  },
];

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio.example";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Andrii Web Development",
  url: siteUrl,
  email: "mailto:doc.horevych@gmail.com",
  telephone: "+18252883116",
  description: "Web design, website development, website fixes, and custom web applications for businesses in Calgary and beyond.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Calgary",
    addressRegion: "AB",
    addressCountry: "CA",
  },
  areaServed: [
    { "@type": "City", name: "Calgary" },
    { "@type": "Country", name: "Canada" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web development services",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
      },
    })),
  },
};

function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

function ProductPreview({ theme }: { theme: string }) {
  if (theme === "altitude") {
    return (
      <div className="home-preview home-preview--altitude" aria-hidden="true">
        <span className="home-moon" />
        <span className="home-star home-star--one" />
        <span className="home-star home-star--two" />
        <span className="home-mountain home-mountain--back" />
        <span className="home-mountain home-mountain--front" />
        <span className="home-preview-word">FERNLINE</span>
      </div>
    );
  }

  if (theme === "loopline") {
    return (
      <div className="home-preview home-preview--loopline" aria-hidden="true">
        <div className="home-loop-window">
          <div className="home-loop-bar"><i /><i /><i /></div>
          <div className="home-loop-grid">
            <span /><span /><span /><span /><span /><span /><span /><span />
          </div>
          <b className="home-loop-event home-loop-event--one">Focus</b>
          <b className="home-loop-event home-loop-event--two">Review</b>
          <b className="home-loop-event home-loop-event--three">Plan</b>
        </div>
      </div>
    );
  }

  if (theme === "kuro") {
    return (
      <div className="home-preview home-preview--kuro" aria-hidden="true">
        <span className="home-kuro-mark">黒</span>
        <span className="home-kuro-copy">RAMEN<br />AFTER<br />DARK.</span>
        <span className="home-kuro-seal">02:00</span>
      </div>
    );
  }

  if (theme === "kinetic") {
    return (
      <div className="home-preview home-preview--kinetic" aria-hidden="true">
        <span className="home-kinetic-small">Independent creative studio</span>
        <span className="home-kinetic-word">MOVE</span>
        <span className="home-kinetic-slash">/</span>
        <span className="home-kinetic-orbit" />
      </div>
    );
  }

  if (theme === "densho") {
    return (
      <div className="home-preview home-preview--densho" aria-hidden="true">
        <span className="home-densho-ring home-densho-ring--one" />
        <span className="home-densho-ring home-densho-ring--two" />
        <span className="home-densho-ring home-densho-ring--three" />
        <span className="home-densho-drop" />
        <span className="home-densho-copy">一杯の<br />物語</span>
      </div>
    );
  }

  return (
    <div className="home-preview home-preview--pizza" aria-hidden="true">
      <img className="home-pizza-photo" src="/images/pizza/board.webp" alt="" />
      <span className="home-pizza-name">CANTO<span>•</span></span>
      <span className="home-pizza-note">Flour · fire · market</span>
    </div>
  );
}

export default function Home() {
  return (
    <main className="home-page">
      <a className="home-skip-link" href="#main-content">Skip to content</a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />

      <header className="home-header">
        <a className="home-logo" href="#" aria-label="Andrii, home">
          A<span>/</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#about">About</a>
        </nav>
        <a className="home-header-cta" href="mailto:doc.horevych@gmail.com">
          Start a project <Arrow />
        </a>
      </header>

      <section className="home-hero" id="main-content">
        <div className="home-hero-glow" aria-hidden="true" />
        <div className="home-hero-index" aria-hidden="true">51.0447° N<br />114.0719° W</div>
        <p className="home-eyebrow home-load home-load--one">
          Calgary web designer &amp; developer
        </p>
        <h1 className="home-load home-load--two">
          Digital work that<br />
          <em>earns attention.</em>
        </h1>
        <div className="home-hero-bottom home-load home-load--three">
          <p>
            I design and build thoughtful websites and web applications for
            businesses that care how they show up.
          </p>
          <a className="home-primary-button" href="#work">
            Explore selected work <Arrow />
          </a>
        </div>
        <div className="home-scroll-cue" aria-hidden="true">
          <span>Scroll to explore</span><i />
        </div>
      </section>

      <section className="home-section home-services" id="services">
        <div className="home-section-heading">
          <p className="home-kicker">01 / Services</p>
          <h2>Useful work.<br /><span>No excess.</span></h2>
          <p>From a stubborn bug to a complete product, every engagement starts with the real problem—not a template.</p>
        </div>
        <div className="home-service-list">
          {services.map((service) => (
            <article className="home-service-row" key={service.number}>
              <span>{service.number}</span>
              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
              <strong>{service.price}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section home-work" id="work">
        <div className="home-work-intro">
          <div>
            <p className="home-kicker">02 / Selected work</p>
            <h2>Built to feel<br /><span>specific.</span></h2>
          </div>
          <p>
            These self-directed portfolio samples explore different industries,
            visual systems, and interaction ideas. Each one is designed and built
            as a realistic product experience.
          </p>
        </div>

        <div className="home-sample-grid">
          {samples.map((sample, position) => (
            <a
              className={`home-sample-card home-sample-card--${sample.theme}`}
              href={sample.href}
              key={sample.href}
              aria-label={`View ${sample.name}, ${sample.category} portfolio sample`}
            >
              <div className="home-sample-preview">
                <ProductPreview theme={sample.theme} />
                <span className="home-sample-open">View live sample <Arrow /></span>
              </div>
              <div className="home-sample-meta">
                <div>
                  <span className="home-sample-label">Portfolio sample / {sample.index}</span>
                  <h3>{sample.name}</h3>
                </div>
                <p>{sample.description}</p>
                <span className="home-sample-category">{sample.category}</span>
              </div>
              {position === 0 && <span className="home-featured-mark">Featured concept</span>}
            </a>
          ))}
        </div>
      </section>

      <section className="home-section home-experience">
        <div className="home-section-heading">
          <p className="home-kicker">03 / Product experience</p>
          <h2>Interfaces for<br /><span>real workflows.</span></h2>
          <p>Beyond marketing sites, I work on operational products where clarity, reliability, and speed matter every day.</p>
        </div>
        <div className="home-product-grid">
          <article className="home-product-card">
            <div className="home-product-ui home-product-ui--messages" aria-hidden="true">
              <div className="home-ui-sidebar"><i /><i /><i /><i /></div>
              <div className="home-ui-list"><b /><span /><span /><span /></div>
              <div className="home-ui-conversation"><b /><p /><p /><p /></div>
            </div>
            <span>Interface sample</span>
            <h3>Customer messaging platform</h3>
            <p>A communication workspace that keeps conversations, customer context, and team actions in one clear interface.</p>
          </article>
          <article className="home-product-card">
            <div className="home-product-ui home-product-ui--inspection" aria-hidden="true">
              <div className="home-inspection-top"><i /><i /></div>
              <div className="home-inspection-score">92<small>/100</small></div>
              <div className="home-inspection-bars"><i /><i /><i /><i /></div>
              <div className="home-inspection-photo" />
            </div>
            <span>Interface sample</span>
            <h3>Automotive inspection platform</h3>
            <p>A structured inspection and reporting tool that turns complex vehicle data into decisions customers can understand.</p>
          </article>
        </div>
      </section>

      <section className="home-section home-about" id="about">
        <div>
          <p className="home-kicker">04 / Approach</p>
          <h2>Design judgment.<br />Engineering discipline.</h2>
        </div>
        <div className="home-about-copy">
          <p className="home-about-lead">
            I combine product thinking, frontend craft, and practical development
            to make digital work that feels considered at every scale.
          </p>
          <p>
            That means strong hierarchy before animation, maintainable systems
            before shortcuts, and an experience that works just as well with a
            keyboard as it does on a trackpad.
          </p>
          <div className="home-tech-list" aria-label="Technologies">
            <span>React</span><span>Next.js</span><span>TypeScript</span>
            <span>Node.js</span><span>UI/UX</span><span>Motion</span>
          </div>
        </div>
      </section>

      <section className="home-contact">
        <p className="home-kicker">Have something in mind?</p>
        <h2>Let&apos;s make it<br /><em>work beautifully.</em></h2>
        <div className="home-contact-links">
          <a href="mailto:doc.horevych@gmail.com">doc.horevych@gmail.com <Arrow /></a>
          <a href="tel:+18252883116">+1 825 288 3116 <Arrow /></a>
        </div>
      </section>

      <footer className="home-footer">
        <a className="home-logo" href="#" aria-label="Back to top">A<span>/</span></a>
        <p>Independent web designer &amp; developer<br />Calgary, Alberta</p>
        <p>© {new Date().getFullYear()} Andrii. All rights reserved.</p>
      </footer>
    </main>
  );
}
