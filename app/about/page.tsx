import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Easy Web Solution, a Calgary web developer focused on thoughtful websites, custom web applications, responsive UI, and practical frontend engineering.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    title: "About Easy Web Solution",
    description: "Calgary web development combining product thinking, frontend craft, and practical implementation.",
    url: "/about",
  },
};

export default function AboutPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://easy-web-solution.com";
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Andrew",
        url: `${siteUrl}/about`,
        jobTitle: "Web Developer",
        worksFor: {
          "@type": "ProfessionalService",
          name: "Easy Web Solution",
          url: siteUrl,
        },
        homeLocation: {
          "@type": "City",
          name: "Calgary",
        },
        knowsAbout: ["Web development", "Next.js", "React", "TypeScript", "Node.js", "UI/UX", "Responsive web design"],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/about` },
        ],
      },
    ],
  };

  return (
    <div className="content-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <header className="content-nav">
        <a className="content-brand" href="/">EASY / WEB / SOLUTION</a>
        <nav className="content-nav-links" aria-label="About navigation">
          <a href="/services">Services</a>
          <a href="/case-studies">Case studies</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      <main className="content-main">
        <section className="content-hero">
          <p className="content-eyebrow">About / Calgary, Alberta</p>
          <h1>Product thinking, frontend craft, and practical web development.</h1>
          <p className="content-lede">
            I&apos;m Andrew, a Calgary-based web developer behind Easy Web Solution. I design and build websites and web applications with an emphasis on clear hierarchy, responsive behaviour, maintainable code, and a polished user experience.
          </p>
          <div className="content-actions">
            <a className="content-button content-button--primary" href="/contact">Start a project</a>
            <a className="content-button" href="/case-studies">See case studies</a>
          </div>
        </section>

        <section className="content-section">
          <div className="content-section-heading">
            <h2>How I work.</h2>
            <p>I prefer understanding the real job first, then choosing the simplest design and technical approach that can solve it well.</p>
          </div>
          <div className="content-grid">
            <article className="content-card">
              <span>01 / Product thinking</span>
              <h3>Start with the business problem.</h3>
              <p>Good implementation begins with the audience, the decision they need to make, the workflow they need to complete, and the reason the project exists.</p>
            </article>
            <article className="content-card">
              <span>02 / Design judgment</span>
              <h3>Use hierarchy before decoration.</h3>
              <p>Typography, spacing, responsive structure, accessibility, and interaction patterns should make the experience easier to understand before motion or visual effects are added.</p>
            </article>
            <article className="content-card">
              <span>03 / Engineering</span>
              <h3>Build for maintenance, not only launch day.</h3>
              <p>I favour reusable components, clear data flow, practical architecture, and production setups that can continue growing after the first version ships.</p>
            </article>
            <article className="content-card">
              <span>04 / Delivery</span>
              <h3>Finish the details that users actually notice.</h3>
              <p>Mobile behaviour, loading, forms, deployment, metadata, internal links, edge cases, and real-device usability are part of the work rather than post-launch extras.</p>
            </article>
          </div>
        </section>

        <section className="content-section">
          <div className="content-section-heading">
            <h2>What I build.</h2>
            <p>Projects can range from a focused website fix to a complete business website or a custom operational application.</p>
          </div>
          <div className="content-stack">
            <div className="content-row"><span>Websites</span><div><h3>Business and marketing websites</h3><p>Responsive websites for local businesses, services, product launches, and brands that need a clearer, faster, more credible online presence.</p></div></div>
            <div className="content-row"><span>Applications</span><div><h3>Custom web applications</h3><p>Dashboards, portals, internal tools, SaaS interfaces, reporting flows, integrations, and browser-based business software.</p></div></div>
            <div className="content-row"><span>Improvements</span><div><h3>Existing site fixes and frontend work</h3><p>React and Next.js bugs, mobile layout issues, forms, integrations, performance problems, and unfinished features.</p></div></div>
          </div>
        </section>

        <section className="content-section">
          <div className="content-section-heading">
            <h2>Tools I use regularly.</h2>
            <p>The exact stack depends on the project, but these are the technologies and disciplines that appear most often in my work.</p>
          </div>
          <div className="content-tags" aria-label="Technologies and skills">
            <span>Next.js</span><span>React</span><span>TypeScript</span><span>Node.js</span><span>NestJS</span><span>PostgreSQL</span><span>Firebase</span><span>REST APIs</span><span>Vercel</span><span>Responsive UI</span><span>Accessibility</span><span>Technical SEO</span>
          </div>
        </section>
      </main>

      <footer className="content-footer">
        <span>Easy Web Solution · Calgary, Alberta</span>
        <div className="content-footer-links"><a href="/services">Services</a><a href="/case-studies">Case studies</a><a href="/contact">Contact</a></div>
      </footer>
    </div>
  );
}
