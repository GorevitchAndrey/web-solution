import type { Metadata } from "next";
import GuidePage from "../components/GuidePage";

export const metadata: Metadata = {
  title: "How Much Does a Website Cost in Calgary?",
  description:
    "A practical Calgary website cost guide covering realistic price ranges, what affects pricing, red flags, and how to compare quotes.",
  alternates: { canonical: "/how-much-does-a-website-cost-in-calgary" },
  openGraph: {
    title: "How Much Does a Website Cost in Calgary?",
    description:
      "A practical guide to Calgary website pricing, scope, trade-offs, and what businesses should expect to pay.",
    url: "/how-much-does-a-website-cost-in-calgary",
  },
};

const sections = [
  {
    heading: "Short answer: it depends on what the website has to do.",
    paragraphs: [
      "For a Calgary small business, a simple brochure-style website can cost a few hundred dollars at the very low end, while a professionally designed multi-page site often lands in the low thousands. Custom websites with advanced functionality, integrations, booking, ecommerce, or application-like features can cost much more.",
      "The useful question is not just ‘what does a website cost?’ but ‘what level of website is appropriate for the business goal?’ A local service company, restaurant, consultant, and SaaS startup may all need very different scopes.",
    ],
    callout:
      "Price ranges are only useful when the scope is clear. A cheap five-page site and a custom five-page site can be completely different products in design quality, content work, performance, flexibility, and long-term maintainability.",
  },
  {
    heading: "Typical website budget ranges in Calgary",
    bullets: [
      "Under $1,000: usually a small template-based site, a landing page, or a very limited custom scope.",
      "$1,000–$3,000: a focused small-business site with several pages, responsive design, contact forms, basic SEO setup, and custom styling.",
      "$3,000–$8,000: more strategy, custom design, stronger content structure, more service pages, integrations, motion, advanced forms, or migration work.",
      "$8,000+: larger custom sites, ecommerce, portals, complex integrations, multilingual work, custom CMS requirements, or product-like functionality.",
    ],
    paragraphs: [
      "These are not fixed market rates. They are planning ranges to help you compare scope. A strong freelancer can sometimes deliver excellent work below an agency quote because the overhead is different, while a complex project can quickly exceed these ranges if the business requirements are substantial.",
    ],
  },
  {
    heading: "What changes the price the most?",
    bullets: [
      "Number of genuinely different page types, not just the raw page count.",
      "Whether the design is custom or built from an existing template.",
      "How much help is needed with positioning, copy, page structure, and content.",
      "Forms, booking systems, payments, CRM connections, APIs, or other integrations.",
      "Ecommerce, user accounts, dashboards, customer portals, or custom web-app functionality.",
      "Photography, illustration, video, animation, or other custom media.",
      "Migration from an old site and preservation of important existing URLs for SEO.",
      "Accessibility, performance, testing, analytics, Search Console, and technical SEO requirements.",
    ],
  },
  {
    heading: "Why very cheap websites can become expensive later",
    paragraphs: [
      "A low initial price is not automatically a bad deal. It becomes a problem when the site is hard to edit, slow on mobile, tied to unnecessary subscriptions, poorly structured for search, or impossible to extend without starting over.",
      "Before choosing the cheapest quote, ask what you will actually own, how hosting works, whether the site is responsive, how future pages are added, and what happens if you stop working with that provider.",
    ],
  },
  {
    heading: "Questions to ask before accepting a website quote",
    bullets: [
      "What exactly is included in the quoted price?",
      "How many design revisions are included?",
      "Who provides the written content and images?",
      "Is mobile design included or treated as an afterthought?",
      "Will I own the domain, source code, content, and accounts?",
      "Are hosting, maintenance, plugin, or platform fees recurring?",
      "Will redirects be handled if an existing website is being replaced?",
      "Are sitemap, robots, metadata, analytics, and Search Console included?",
      "What does ongoing support cost after launch?",
    ],
  },
  {
    heading: "A practical way to set your budget",
    paragraphs: [
      "Start from the business outcome. If the website only needs to establish credibility and generate contact enquiries, keep the first version focused. If it needs to automate a workflow, take payments, support customers, or integrate with business systems, budget for the additional complexity deliberately.",
      "It is usually better to launch a smaller, well-built website that can grow than to spend the budget on a large collection of weak pages that do not help customers make a decision.",
    ],
  },
];

const faq = [
  {
    question: "Can I get a professional business website in Calgary for under $1,000?",
    answer:
      "Yes, for a tightly scoped project such as a landing page or small site. The key is keeping the requirements focused and being clear about what is not included.",
  },
  {
    question: "Should I pay monthly or pay once for a website?",
    answer:
      "Either model can be legitimate. Understand what the monthly fee covers and whether you retain control of your domain, content, accounts, and website if the relationship ends.",
  },
  {
    question: "Does SEO cost extra?",
    answer:
      "Technical SEO foundations should usually be part of a professional build. Ongoing SEO work such as content, digital PR, backlinks, competitive research, and local promotion is a separate ongoing discipline.",
  },
];

export default function Page() {
  return (
    <GuidePage
      slug="how-much-does-a-website-cost-in-calgary"
      eyebrow="Calgary website planning guide"
      title="How Much Does a Website Cost in Calgary?"
      description="A practical Calgary website cost guide covering realistic price ranges, what affects pricing, red flags, and how to compare quotes."
      intro="Website quotes can vary dramatically even when two proposals appear to describe the same project. This guide explains the main reasons, gives useful planning ranges, and shows Calgary business owners what to compare before choosing a developer."
      sections={sections}
      faq={faq}
      relatedLinks={[
        { href: "/services/business-websites", label: "Service", title: "Business Website Development" },
        { href: "/services/web-development-calgary", label: "Calgary service", title: "Web Development in Calgary" },
        { href: "/case-studies/canto-restaurant-website", label: "Concept case study", title: "Canto Restaurant Website" },
        { href: "/contact", label: "Project planning", title: "Ask About Your Website Scope" },
      ]}
    />
  );
}
