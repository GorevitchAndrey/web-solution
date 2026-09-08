import type { Metadata } from "next";
import GuidePage from "../components/GuidePage";

export const metadata: Metadata = {
  title: "Website Redesign Calgary Guide",
  description:
    "A practical Calgary website redesign guide covering when to redesign, what to keep, SEO migration risks, mobile UX, content, and launch planning.",
  alternates: { canonical: "/website-redesign-calgary-guide" },
  openGraph: {
    title: "Website Redesign Calgary Guide",
    description:
      "How Calgary businesses can plan a website redesign without losing useful content, search visibility, or customer trust.",
    url: "/website-redesign-calgary-guide",
  },
};

const sections = [
  {
    heading: "A redesign should solve a business problem, not just change the look.",
    paragraphs: [
      "A redesign is worthwhile when the current site makes the business harder to understand, performs poorly on mobile, is difficult to update, creates technical problems, or no longer matches the services the company actually sells.",
      "Visual improvement matters, but it should support clearer messaging, better navigation, stronger trust, faster pages, and easier conversion rather than becoming the only goal.",
    ],
  },
  {
    heading: "Signs it may be time to redesign",
    bullets: [
      "The site is awkward or difficult to use on a phone.",
      "Important services are buried inside one generic page.",
      "The visual identity makes the business feel less established than it is.",
      "Pages are slow, unstable, or dependent on outdated plugins and themes.",
      "The site is difficult for your team to update without breaking something.",
      "Contact, booking, quote, or lead-generation flows are confusing.",
      "The company has changed services, positioning, locations, or audience since the site was built.",
    ],
  },
  {
    heading: "Do not throw away useful SEO history by accident.",
    paragraphs: [
      "One of the biggest redesign mistakes is changing or deleting existing URLs without a migration plan. If an old page already receives search impressions, backlinks, or traffic, replacing its URL carelessly can discard signals the site has built over time.",
    ],
    bullets: [
      "Export or document the existing important URLs before rebuilding.",
      "Keep strong URLs when the page purpose remains the same.",
      "Use permanent redirects when an old URL must move to a new one.",
      "Preserve useful content instead of rewriting everything only for novelty.",
      "Update internal links, sitemap entries, canonical tags, and navigation after launch.",
      "Use Search Console to watch indexing and errors after the migration.",
    ],
    callout:
      "A redesign can improve SEO, but only if the migration is treated as part of the project. New visuals alone do not protect existing rankings or backlinks.",
  },
  {
    heading: "Start with the page structure before visual design.",
    paragraphs: [
      "For many small businesses, the biggest redesign improvement is information architecture. Customers should be able to understand the offer quickly and reach a page that directly answers the problem they are trying to solve.",
    ],
    bullets: [
      "Define the primary services and give important ones dedicated pages when appropriate.",
      "Make contact details and next steps obvious without repeating intrusive buttons everywhere.",
      "Use headings that describe the actual content instead of vague marketing slogans alone.",
      "Separate proof, process, FAQs, pricing context, and service details so each section has a clear job.",
    ],
  },
  {
    heading: "Mobile should be designed, not merely compressed.",
    paragraphs: [
      "A desktop layout stacked into one narrow column is not automatically good mobile UX. Navigation, button size, reading width, images, animation, sticky elements, forms, and page speed all need to work naturally on a smaller screen.",
      "If most prospective customers first discover the business through Google, social links, or messages on their phone, the mobile version may be the most important version of the site.",
    ],
  },
  {
    heading: "Decide what content deserves to survive.",
    bullets: [
      "Keep accurate service information that customers still need.",
      "Keep pages that already earn search traffic or valuable links unless there is a strong reason to consolidate them.",
      "Remove outdated offers, duplicate pages, unsupported claims, and unnecessary filler.",
      "Rewrite weak content around customer questions and decisions, not around arbitrary word counts.",
      "Replace generic stock proof with real project examples, process details, credentials, or testimonials when available.",
    ],
  },
  {
    heading: "Launch with a checklist, not a last-minute switch.",
    bullets: [
      "Test key pages and forms on several screen sizes.",
      "Verify titles, descriptions, canonical URLs, robots rules, and sitemap output.",
      "Check old-to-new redirects before the domain points at the new build.",
      "Confirm analytics and Search Console still collect data.",
      "Test email, booking, payment, or CRM integrations if the site uses them.",
      "Check HTTPS, domain redirects, and the preferred www or non-www hostname.",
      "Review the production site after deployment rather than assuming the preview and production environments are identical.",
    ],
  },
  {
    heading: "Redesign in phases when that reduces risk.",
    paragraphs: [
      "A business does not always need to rebuild everything at once. Sometimes the right first phase is a cleaner homepage, stronger service pages, mobile fixes, and technical cleanup. More advanced content, integrations, or product features can follow after the core site is working well.",
      "Phasing can make the budget easier to control and gives the business a useful site sooner instead of waiting for every future idea to be included in version one.",
    ],
  },
];

const faq = [
  {
    question: "Will a website redesign hurt my Google rankings?",
    answer:
      "It can if URLs, content, redirects, or crawl settings are handled poorly. A careful migration can preserve useful signals while improving the site's structure, speed, and content.",
  },
  {
    question: "Should I keep my old website live while the redesign is being built?",
    answer:
      "Usually yes. Build and review the redesign in a separate preview or staging environment, then switch production only when the new version and migration steps are ready.",
  },
  {
    question: "Do I need to redesign if the current website still works?",
    answer:
      "Not necessarily. Focused fixes may be enough if the site still represents the business well and the problems are limited to performance, mobile layout, forms, or a few outdated sections.",
  },
];

export default function Page() {
  return (
    <GuidePage
      slug="website-redesign-calgary-guide"
      eyebrow="Calgary website redesign guide"
      title="Website Redesign Calgary Guide"
      description="A practical Calgary website redesign guide covering when to redesign, what to keep, SEO migration risks, mobile UX, content, and launch planning."
      intro="A redesign can make a business look more credible and easier to use, but it can also create new problems if valuable URLs, content, or technical details are discarded. This guide explains how to plan a redesign around business goals while protecting the parts of the existing site that are already useful."
      sections={sections}
      faq={faq}
      relatedLinks={[
        { href: "/services/business-websites", label: "Service", title: "Business Website Development" },
        { href: "/services/website-fixes", label: "Alternative", title: "Website Fixes & Improvements" },
        { href: "/case-studies/fernline-travel-website", label: "Concept case study", title: "Fernline Travel Website" },
        { href: "/how-to-choose-a-web-developer-in-calgary", label: "Hiring guide", title: "Choosing a Calgary Web Developer" },
      ]}
    />
  );
}
