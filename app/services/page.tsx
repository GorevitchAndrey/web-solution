import type { Metadata } from "next";
import { serviceList } from "./data";

export const metadata: Metadata = {
  title: "Web Development Services in Calgary",
  description:
    "Web development services in Calgary including business websites, custom web applications, technical improvements, and focused website fixes.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Web Development Services in Calgary",
    description:
      "Business websites, custom web applications, Calgary web development, and focused website fixes.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <div className="services-shell">
      <header className="services-nav">
        <a className="services-brand" href="/">EASY / WEB / SOLUTION</a>
        <nav className="services-nav-links" aria-label="Services navigation">
          <a href="/">Home</a>
          <a href="/#work">Work</a>
          <a href="mailto:doc.horevych@gmail.com">Contact</a>
        </nav>
      </header>

      <main className="services-main">
        <section className="services-hero">
          <p className="services-eyebrow">Services / Calgary & remote</p>
          <h1>Web development built around the job your business actually needs done.</h1>
          <p className="services-lede">
            From a focused bug fix to a complete business website or custom web application,
            each service has a clear scope and a page that explains what it is for.
          </p>
          <div className="services-actions">
            <a className="services-button services-button--primary" href="mailto:doc.horevych@gmail.com">Discuss a project</a>
            <a className="services-button" href="/#work">See selected work</a>
          </div>
        </section>

        <section className="services-section" aria-labelledby="service-list-title">
          <div className="services-section-heading">
            <h2 id="service-list-title">Choose the closest fit.</h2>
            <p>
              These pages are intentionally separated because a company looking for a new business
              website has a different problem from a team that needs a custom application or a developer
              to repair an existing site.
            </p>
          </div>
          <div className="services-grid">
            {serviceList.map((service, index) => (
              <a className="services-card" href={`/services/${service.slug}`} key={service.slug}>
                <span>0{index + 1}</span>
                <h2>{service.shortTitle}</h2>
                <p>{service.description}</p>
                <strong>Explore service →</strong>
              </a>
            ))}
          </div>
        </section>

        <section className="services-cta">
          <h2>Not sure which service fits?</h2>
          <p>Send me the problem, the current URL if there is one, and what you want the site or application to accomplish.</p>
          <a className="services-button services-button--primary" href="mailto:doc.horevych@gmail.com">Start with the problem</a>
        </section>
      </main>

      <footer className="services-footer">Easy Web Solution · Calgary, Alberta · Web design & development</footer>
    </div>
  );
}
