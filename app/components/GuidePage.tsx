type GuideSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  callout?: string;
};

type RelatedLink = {
  href: string;
  label: string;
  title: string;
};

type GuidePageProps = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  sections: GuideSection[];
  relatedLinks: RelatedLink[];
  faq?: { question: string; answer: string }[];
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://easy-web-solution.com";

export default function GuidePage({
  slug,
  eyebrow,
  title,
  description,
  intro,
  sections,
  relatedLinks,
  faq = [],
}: GuidePageProps) {
  const url = `${siteUrl}/${slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: title,
        description,
        mainEntityOfPage: url,
        datePublished: "2026-09-08",
        dateModified: "2026-09-08",
        author: {
          "@type": "Person",
          name: "Andrew",
          url: `${siteUrl}/about`,
        },
        publisher: {
          "@type": "Organization",
          name: "Easy Web Solution",
          url: siteUrl,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: title, item: url },
        ],
      },
    ],
  };

  return (
    <div className="content-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />

      <header className="content-nav">
        <a className="content-brand" href="/">EASY / WEB / SOLUTION</a>
        <nav className="content-nav-links" aria-label="Guide navigation">
          <a href="/services">Services</a>
          <a href="/case-studies">Case studies</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      <main className="content-main guide-main">
        <article>
          <header className="content-hero guide-hero">
            <p className="content-eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p className="content-lede">{intro}</p>
            <div className="guide-meta" aria-label="Article information">
              <span>Easy Web Solution</span>
              <span>Calgary, Alberta</span>
              <span>Updated September 2026</span>
            </div>
          </header>

          <div className="guide-article">
            {sections.map((section) => (
              <section className="guide-section" key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                )}
                {section.callout && <p className="content-note">{section.callout}</p>}
              </section>
            ))}

            {faq.length > 0 && (
              <section className="guide-section">
                <h2>Common questions</h2>
                <div className="guide-faq">
                  {faq.map((item) => (
                    <details key={item.question}>
                      <summary>{item.question}</summary>
                      <p>{item.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>

          <section className="content-section guide-related">
            <div className="content-section-heading">
              <h2>Useful next steps.</h2>
              <p>These pages go deeper into the service, examples, or project planning topics connected to this guide.</p>
            </div>
            <div className="content-grid">
              {relatedLinks.map((link) => (
                <a className="content-card content-card--link" href={link.href} key={link.href}>
                  <span>{link.label}</span>
                  <h3>{link.title}</h3>
                  <strong>Open page →</strong>
                </a>
              ))}
            </div>
          </section>

          <section className="guide-cta">
            <p className="content-kicker">Planning a website?</p>
            <h2>Get a practical second opinion before you commit.</h2>
            <p>Send me your current website, project idea, or rough scope. I can help you separate what is actually needed from what can wait.</p>
            <div className="content-actions">
              <a className="content-button content-button--primary" href="/contact">Start a conversation</a>
              <a className="content-button" href="/services">View services</a>
            </div>
          </section>
        </article>
      </main>

      <footer className="content-footer">
        <span>Easy Web Solution · Calgary, Alberta</span>
        <div className="content-footer-links">
          <a href="/services">Services</a>
          <a href="/case-studies">Case studies</a>
          <a href="/contact">Contact</a>
        </div>
      </footer>
    </div>
  );
}
