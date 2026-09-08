import type { Metadata } from "next";
import { caseStudies } from "./data";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Concept case studies showing how Easy Web Solution approaches restaurant websites, SaaS product sites, hospitality experiences, responsive design, and frontend implementation.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    type: "website",
    title: "Web Design & Development Case Studies",
    description: "Self-directed concept case studies covering local business, SaaS, and hospitality website work.",
    url: "/case-studies",
  },
};

export default function CaseStudiesPage() {
  return (
    <div className="content-shell">
      <header className="content-nav">
        <a className="content-brand" href="/">EASY / WEB / SOLUTION</a>
        <nav className="content-nav-links" aria-label="Case study navigation">
          <a href="/services">Services</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      <main className="content-main">
        <section className="content-hero">
          <p className="content-eyebrow">Case studies / Self-directed concepts</p>
          <h1>How the design and frontend decisions fit together.</h1>
          <p className="content-lede">These are concept case studies, not claims about paid client results. Each one explains the problem framing, visual direction, responsive decisions, and implementation thinking behind an interactive portfolio sample.</p>
        </section>

        <section className="content-section">
          <p className="content-note">All three projects below are self-directed portfolio concepts created to demonstrate web design, frontend development, responsive thinking, and product judgment. No fabricated conversion, revenue, traffic, or client outcome metrics are used.</p>
          <div className="content-case-grid">
            {caseStudies.map((study) => (
              <a className="content-card content-card--link content-case-card" href={`/case-studies/${study.slug}`} key={study.slug}>
                <div>
                  <span>{study.type}</span>
                  <h2>{study.name}</h2>
                  <p>{study.description}</p>
                </div>
                <small>Read concept case study →</small>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="content-footer">
        <span>Easy Web Solution · Calgary, Alberta</span>
        <div className="content-footer-links"><a href="/services">Services</a><a href="/about">About</a><a href="/contact">Contact</a></div>
      </footer>
    </div>
  );
}
