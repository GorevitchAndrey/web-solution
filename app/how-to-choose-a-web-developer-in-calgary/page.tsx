import type { Metadata } from "next";
import GuidePage from "../components/GuidePage";

export const metadata: Metadata = {
  title: "How to Choose a Web Developer in Calgary",
  description:
    "A practical guide to choosing a Calgary web developer: what to ask, what to verify, common red flags, and how to compare freelancers and agencies.",
  alternates: { canonical: "/how-to-choose-a-web-developer-in-calgary" },
  openGraph: {
    title: "How to Choose a Web Developer in Calgary",
    description:
      "What Calgary businesses should check before hiring a web developer, freelancer, or agency.",
    url: "/how-to-choose-a-web-developer-in-calgary",
  },
};

const sections = [
  {
    heading: "Start with the business problem, not the technology.",
    paragraphs: [
      "A good developer should be able to explain the project in business terms before discussing frameworks, plugins, or hosting. The website might need to generate enquiries, replace an outdated presence, support bookings, improve mobile usability, or automate a workflow. Those goals should shape the technical decisions.",
      "If the first conversation immediately becomes a list of tools without a clear understanding of the audience and outcome, the project may be starting in the wrong place.",
    ],
  },
  {
    heading: "Review the work, but look beyond visual style.",
    paragraphs: [
      "A portfolio can show taste and execution, but a polished screenshot does not tell you whether the site is responsive, accessible, fast, maintainable, or easy for customers to use.",
    ],
    bullets: [
      "Open portfolio examples on your phone, not only on desktop.",
      "Click through real interactions instead of judging screenshots alone.",
      "Check whether pages load quickly and remain readable without animation.",
      "Look for variety: can the developer adapt to different businesses instead of repeating one template?",
      "Ask which parts of the displayed work the developer actually designed and built.",
    ],
  },
  {
    heading: "Ask how the project will be structured.",
    bullets: [
      "What pages are included and why are they needed?",
      "Who writes or edits the content?",
      "How are mobile layouts handled?",
      "How are forms, integrations, analytics, and SEO basics implemented?",
      "What happens to existing URLs if this is a redesign?",
      "Who controls the domain, hosting, repository, analytics, and third-party accounts?",
      "How will changes be reviewed before launch?",
    ],
    callout:
      "You do not need to understand every technical detail. You should be able to understand the ownership, scope, process, and risks before the work begins.",
  },
  {
    heading: "Freelancer or agency?",
    paragraphs: [
      "Neither model is automatically better. A freelancer can offer direct communication, lower overhead, and strong continuity from design through development. An agency may be better when a large project needs several specialists working in parallel, extensive account management, or a broader marketing engagement.",
      "For a focused small-business website, a capable independent developer can be a very efficient fit. For a complex brand, content, paid-media, and development program running simultaneously, a larger team may make more sense.",
    ],
  },
  {
    heading: "Common red flags",
    bullets: [
      "Guaranteed first-place Google rankings.",
      "Pressure to transfer domain ownership to the provider without a clear reason.",
      "No written scope or unclear deliverables.",
      "A very large upfront payment with no milestones or review process.",
      "No discussion of mobile usability, accessibility, page speed, or redirects.",
      "Portfolio work that cannot be explained in terms of the developer's actual contribution.",
      "A proposal that adds unnecessary features before understanding the core goal.",
    ],
  },
  {
    heading: "Questions worth asking in the first call",
    bullets: [
      "What would you change about my current website first?",
      "What information do you need from me before estimating the project?",
      "What is the biggest risk in this scope?",
      "What would you leave out of version one?",
      "How do you handle responsive design and testing?",
      "What technical SEO work is included?",
      "What happens after launch if something breaks?",
      "Can the site be extended later without a rebuild?",
    ],
  },
  {
    heading: "Choose the person who makes the project clearer.",
    paragraphs: [
      "The strongest signal is often clarity. A useful developer should make the project easier to understand: what matters, what can wait, what the trade-offs are, and what you will receive for the budget.",
      "You are not only hiring someone to write code. You are hiring judgment about structure, user experience, technical decisions, and the details that make the finished site credible.",
    ],
  },
];

const faq = [
  {
    question: "Do I need a Calgary-based web developer if the project is fully remote?",
    answer:
      "No. Web projects can be delivered remotely. A Calgary-based developer can still be useful when local market context, Canadian business conventions, or the option of working in the same time zone matters.",
  },
  {
    question: "Should I choose a developer based on hourly rate?",
    answer:
      "Hourly rate matters, but it is not a complete comparison. Scope clarity, speed, experience, rework, maintainability, and communication can have a larger effect on the final cost than the hourly number alone.",
  },
  {
    question: "Should the developer own my domain?",
    answer:
      "Generally, the business should control its own domain and primary accounts. A developer can be granted the access needed to configure them without becoming the long-term owner.",
  },
];

export default function Page() {
  return (
    <GuidePage
      slug="how-to-choose-a-web-developer-in-calgary"
      eyebrow="Calgary hiring guide"
      title="How to Choose a Web Developer in Calgary"
      description="A practical guide to choosing a Calgary web developer: what to ask, what to verify, common red flags, and how to compare freelancers and agencies."
      intro="The best choice is not necessarily the lowest quote or the largest portfolio. This guide gives Calgary businesses a practical way to evaluate a developer, understand the proposal, and avoid preventable problems before the project starts."
      sections={sections}
      faq={faq}
      relatedLinks={[
        { href: "/about", label: "About", title: "How I Approach Web Development" },
        { href: "/case-studies", label: "Portfolio", title: "Concept Case Studies" },
        { href: "/services/web-development-calgary", label: "Service", title: "Calgary Web Development" },
        { href: "/how-much-does-a-website-cost-in-calgary", label: "Planning guide", title: "Website Cost in Calgary" },
      ]}
    />
  );
}
