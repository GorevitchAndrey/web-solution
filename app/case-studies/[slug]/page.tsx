import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies } from "../data";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const study = caseStudies.find((item) => item.slug === params.slug);
  if (!study) return {};
  return {
    title: `${study.name} Case Study`,
    description: study.description,
    alternates: { canonical: `/case-studies/${study.slug}` },
    openGraph: {
      type: "article",
      title: study.title,
      description: study.description,
      url: `/case-studies/${study.slug}`,
    },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = caseStudies.find((item) => item.slug === params.slug);
  if (!study) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://easy-web-solution.com";
  const url = `${siteUrl}/case-studies/${study.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: study.title,
        description: study.description,
        url,
        author: { "@type": "Person", name: "Andrew" },
        publisher: { "@type": "Organization", name: "Easy Web Solution", url: siteUrl },
        about: study.type,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Case Studies", item: `${siteUrl}/case-studies` },
          { "@type": "ListItem", position: 3, name: study.name, item: url },
        ],
      },
    ],
  };

  return (
    <div className="content-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <header className="content-nav">
        <a className="content-brand" href="/">EASY / WEB / SOLUTION</a>
        <nav className="content-nav-links" aria-label="Case study navigation">
          <a href="/case-studies">All case studies</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      <main className="content-main">
        <section className="content-hero">
          <p className="content-eyebrow">{study.eyebrow}</p>
          <h1>{study.title}</h1>
          <p className="content-lede">{study.summary}</p>
          <div className="content-actions">
            <a className="content-button content-button--primary" href={study.demoHref}>View interactive demo</a>
            <a className="content-button" href={study.serviceHref}>{study.serviceLabel}</a>
          </div>
        </section>

        <section className="content-section">
          <p className="content-note">This is a self-directed concept case study. It demonstrates design and development thinking rather than reporting paid-client performance or business results.</p>
          <div className="content-section-heading">
            <h2>The design problem.</h2>
            <p>{study.challenge}</p>
          </div>
          <div className="content-tags" aria-label="Case study focus areas">
            {study.focus.map((item) => <span key={item}>{item}</span>)}
          </div>
        </section>

        <section className="content-section">
          <div className="content-section-heading">
            <h2>Approach and implementation.</h2>
            <p>The concept is treated as a real responsive frontend, so visual direction, interaction, performance, hierarchy, and implementation constraints are considered together.</p>
          </div>
          <div className="content-grid">
            {study.approach.map((item, index) => (
              <article className="content-card" key={item.title}>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section">
          <div className="content-section-heading">
            <h2>What this demonstrates.</h2>
            <p>{study.takeaway}</p>
          </div>
          <div className="content-actions">
            <a className="content-button content-button--primary" href="/contact">Discuss a similar project</a>
            <a className="content-button" href={study.demoHref}>Open the demo</a>
          </div>
        </section>
      </main>

      <footer className="content-footer">
        <span>Easy Web Solution · Calgary, Alberta</span>
        <div className="content-footer-links"><a href="/case-studies">Case studies</a><a href="/services">Services</a><a href="/contact">Contact</a></div>
      </footer>
    </div>
  );
}
