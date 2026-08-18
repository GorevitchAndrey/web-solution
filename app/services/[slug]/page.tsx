import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceList, services, type ServiceSlug } from "../data";

export function generateStaticParams() {
  return serviceList.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = services[params.slug as ServiceSlug];
  if (!service) return {};

  return {
    title: service.shortTitle,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      type: "website",
      title: service.title,
      description: service.description,
      url: `/services/${service.slug}`,
    },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services[params.slug as ServiceSlug];
  if (!service) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://easy-web-solution.com";
  const url = `${siteUrl}/services/${service.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.shortTitle,
        description: service.description,
        url,
        provider: {
          "@type": "ProfessionalService",
          name: "Easy Web Solution",
          url: siteUrl,
          areaServed: [
            { "@type": "City", name: "Calgary" },
            { "@type": "Country", name: "Canada" },
          ],
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
          { "@type": "ListItem", position: 3, name: service.shortTitle, item: url },
        ],
      },
    ],
  };

  return (
    <div className="services-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />

      <header className="services-nav">
        <a className="services-brand" href="/">EASY / WEB / SOLUTION</a>
        <nav className="services-nav-links" aria-label="Service page navigation">
          <a href="/services">All services</a>
          <a href="/#work">Work</a>
          <a href="mailto:doc.horevych@gmail.com">Contact</a>
        </nav>
      </header>

      <main className="services-main">
        <section className="services-hero">
          <p className="services-eyebrow">{service.eyebrow}</p>
          <h1>{service.title}</h1>
          <p className="services-lede">{service.intro}</p>
          <div className="services-actions">
            <a className="services-button services-button--primary" href="mailto:doc.horevych@gmail.com">Discuss this service</a>
            <a className="services-button" href="/services">View all services</a>
          </div>
        </section>

        <section className="services-section">
          <div className="services-section-heading">
            <h2>A good fit when...</h2>
            <p>The goal is to solve a specific business problem with a clear, maintainable web experience rather than add unnecessary complexity.</p>
          </div>
          <div className="services-grid">
            <article className="services-card">
              <span>Best for</span>
              <h2>Projects with a clear outcome.</h2>
              <ul>{service.idealFor.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            <article className="services-card">
              <span>Typical scope</span>
              <h2>What can be included.</h2>
              <ul>{service.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          </div>
        </section>

        <section className="services-section">
          <div className="services-section-heading">
            <h2>How I approach the work.</h2>
            <p>A small project and a large application do not need the same amount of process, but both benefit from understanding the problem before writing code.</p>
          </div>
          <div className="services-process">
            {service.process.map((step, index) => (
              <article key={step.title}>
                <b>0{index + 1}</b>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="services-section">
          <div className="services-section-heading">
            <h2>Related work.</h2>
            <p>Selected portfolio concepts and interface examples that show the visual and product thinking behind the implementation.</p>
          </div>
          <div className="services-related">
            {service.relatedWork.map((work) => (
              <a href={work.href} key={work.href}>
                <span>{work.label}</span>
                <strong>{work.name} →</strong>
              </a>
            ))}
          </div>
        </section>

        <section className="services-section">
          <div className="services-section-heading">
            <h2>Questions clients usually ask.</h2>
            <p>Useful context before we talk about scope, timing, or the right technical approach.</p>
          </div>
          <div className="services-faq">
            {service.faq.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="services-cta">
          <h2>Have a project that sounds like this?</h2>
          <p>Send me a short description of the business, the current situation, and what you want the website or application to accomplish.</p>
          <a className="services-button services-button--primary" href="mailto:doc.horevych@gmail.com">Start a project</a>
        </section>
      </main>

      <footer className="services-footer">
        <a href="/services">Services</a> · Easy Web Solution · Calgary, Alberta
      </footer>
    </div>
  );
}
