import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Easy Web Solution for Calgary web development, business websites, custom web applications, and focused website fixes.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    title: "Contact Easy Web Solution",
    description: "Start a web development project in Calgary or remotely.",
    url: "/contact",
  },
};

export default function ContactPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://easy-web-solution.com";
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        name: "Contact Easy Web Solution",
        url: `${siteUrl}/contact`,
        mainEntity: {
          "@type": "ProfessionalService",
          name: "Easy Web Solution",
          url: siteUrl,
          email: "mailto:doc.horevych@gmail.com",
          telephone: "+18252883116",
          areaServed: [{ "@type": "City", name: "Calgary" }, { "@type": "Country", name: "Canada" }],
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Contact", item: `${siteUrl}/contact` },
        ],
      },
    ],
  };

  return (
    <div className="content-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <header className="content-nav">
        <a className="content-brand" href="/">EASY / WEB / SOLUTION</a>
        <nav className="content-nav-links" aria-label="Contact navigation">
          <a href="/services">Services</a>
          <a href="/case-studies">Case studies</a>
          <a href="/about">About</a>
        </nav>
      </header>

      <main className="content-main">
        <section className="content-hero">
          <p className="content-eyebrow">Contact / Calgary & remote</p>
          <h1>Tell me what needs to work better.</h1>
          <p className="content-lede">A useful first message can be short. Tell me what the business does, what you have now, what you want to improve, and whether there is a deadline or budget range I should know about.</p>
        </section>

        <section className="content-section">
          <div className="content-section-heading">
            <h2>Start here.</h2>
            <p>Email is the easiest way to send project context, links, screenshots, requirements, or a description of the problem.</p>
          </div>
          <div className="content-contact-grid">
            <a className="content-card content-card--link" href="mailto:doc.horevych@gmail.com">
              <span>Email</span>
              <strong className="content-contact-value">doc.horevych@gmail.com</strong>
              <p>Best for project details, existing website links, screenshots, and scope.</p>
            </a>
            <a className="content-card content-card--link" href="tel:+18252883116">
              <span>Phone</span>
              <strong className="content-contact-value">+1 825 288 3116</strong>
              <p>Available for project conversations in Calgary and remote work across Canada.</p>
            </a>
          </div>
        </section>

        <section className="content-section">
          <div className="content-section-heading">
            <h2>Helpful details to include.</h2>
            <p>You do not need a formal brief. These details simply help me understand the job faster.</p>
          </div>
          <div className="content-grid">
            <article className="content-card"><span>01</span><h3>What is the business or product?</h3><p>A sentence or two about what you sell, who uses it, and where the business operates.</p></article>
            <article className="content-card"><span>02</span><h3>What exists today?</h3><p>Share the current URL, codebase, design, screenshots, or workflow if there is already something in place.</p></article>
            <article className="content-card"><span>03</span><h3>What should improve?</h3><p>Describe the result you want: a new site, better mobile UX, a fixed bug, a custom workflow, or a clearer way to generate enquiries.</p></article>
            <article className="content-card"><span>04</span><h3>Any constraints?</h3><p>Deadlines, required integrations, existing hosting, brand requirements, or budget context can all affect the best approach.</p></article>
          </div>
        </section>

        <section className="content-section">
          <div className="content-section-heading">
            <h2>Not sure what you need yet?</h2>
            <p>That is fine. You can start by choosing the closest service or looking through a case study to see how I think about different project types.</p>
          </div>
          <div className="content-actions">
            <a className="content-button" href="/services">Browse services</a>
            <a className="content-button" href="/case-studies">View case studies</a>
          </div>
        </section>
      </main>

      <footer className="content-footer">
        <span>Easy Web Solution · Calgary, Alberta</span>
        <div className="content-footer-links"><a href="/services">Services</a><a href="/about">About</a><a href="/case-studies">Case studies</a></div>
      </footer>
    </div>
  );
}
