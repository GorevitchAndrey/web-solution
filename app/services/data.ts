export type ServiceSlug =
  | "web-development-calgary"
  | "business-websites"
  | "custom-web-app-development"
  | "website-fixes";

export type ServiceContent = {
  slug: ServiceSlug;
  eyebrow: string;
  title: string;
  shortTitle: string;
  description: string;
  intro: string;
  idealFor: string[];
  deliverables: string[];
  process: { title: string; text: string }[];
  faq: { question: string; answer: string }[];
  relatedWork: { href: string; name: string; label: string }[];
};

export const services: Record<ServiceSlug, ServiceContent> = {
  "web-development-calgary": {
    slug: "web-development-calgary",
    eyebrow: "Calgary web development",
    title: "Web Development in Calgary for Businesses That Need More Than a Template",
    shortTitle: "Web Development Calgary",
    description:
      "Custom web development in Calgary for businesses that need fast, polished websites and web applications built around real goals.",
    intro:
      "I design and build custom websites and web applications for Calgary businesses that want a sharper digital presence, better performance, and a product that is easy to maintain after launch.",
    idealFor: [
      "Calgary businesses replacing an outdated or slow website",
      "Teams that need custom functionality instead of a page-builder workaround",
      "Companies that want one developer to think about design, UX, frontend quality, and implementation",
      "Projects where mobile usability, speed, SEO foundations, and maintainability matter",
    ],
    deliverables: [
      "Responsive website or web application development",
      "Next.js, React, TypeScript, and modern frontend architecture",
      "Technical SEO foundations and search-friendly page structure",
      "Performance, accessibility, and mobile optimization",
      "Forms, APIs, dashboards, integrations, and custom interactions",
      "Deployment on Vercel with production-ready configuration",
    ],
    process: [
      { title: "Understand the job", text: "We define the business goal, audience, required pages, functionality, constraints, and what success should look like." },
      { title: "Shape the experience", text: "I establish information architecture, page hierarchy, interaction ideas, and the technical approach before polishing details." },
      { title: "Build and refine", text: "The project is implemented responsively, tested across key states, and refined for speed, accessibility, and clarity." },
      { title: "Launch cleanly", text: "I connect the domain, production environment, analytics and SEO essentials, then verify the deployed result." },
    ],
    faq: [
      { question: "Do you only work with Calgary businesses?", answer: "No. Calgary is my local market, but I can work remotely with businesses anywhere in Canada or beyond." },
      { question: "Can you work with an existing design or codebase?", answer: "Yes. I can build from an existing design, improve an existing Next.js or React project, or start from a blank project when that is the better option." },
      { question: "Will the website be ready for Google SEO?", answer: "I build the technical foundation for SEO: crawlable pages, metadata, canonical URLs, structured content, sitemap, robots rules, internal links, performance, and mobile usability. Rankings also depend on content quality, competition, authority, and ongoing promotion." },
    ],
    relatedWork: [
      { href: "/work/pizza-website", name: "Canto", label: "Restaurant website concept" },
      { href: "/work/loopline-website", name: "Loopline", label: "SaaS product website concept" },
    ],
  },
  "business-websites": {
    slug: "business-websites",
    eyebrow: "Business websites",
    title: "Business Websites Built to Look Credible, Load Fast, and Generate Enquiries",
    shortTitle: "Business Websites",
    description:
      "Custom business websites for small and growing companies, with clear messaging, responsive design, fast performance, and SEO-ready structure.",
    intro:
      "A business website should make it easy for a potential customer to understand what you do, trust the company, and take the next step. I build focused websites around that job instead of filling pages with generic sections.",
    idealFor: [
      "Local service businesses that need a professional first website",
      "Companies replacing a dated WordPress, Wix, or template-based site",
      "Businesses launching a new service, location, or brand",
      "Owners who want a fast site that is easy to extend as the company grows",
    ],
    deliverables: [
      "Homepage and service-page information architecture",
      "Custom responsive UI rather than an off-the-shelf theme",
      "Contact, quote, booking, or lead-generation flows",
      "Search-friendly headings, metadata, and internal linking",
      "Optimized images and performance-conscious frontend code",
      "Vercel deployment, SSL, domain setup, sitemap, and robots configuration",
    ],
    process: [
      { title: "Clarify the offer", text: "We identify the services customers actually buy and the questions the website must answer before they contact you." },
      { title: "Build the page structure", text: "Each important service receives enough space to explain value clearly instead of competing inside one overloaded homepage." },
      { title: "Design for trust", text: "Typography, spacing, proof, calls to action, mobile layout, and visual hierarchy are treated as conversion details, not decoration." },
      { title: "Launch and measure", text: "After deployment, the site is ready to connect to Search Console, analytics, and ongoing content or local SEO work." },
    ],
    faq: [
      { question: "How many pages should a small business website have?", answer: "There is no magic number. A focused company may need five or six strong pages, while a business with distinct services often benefits from dedicated service pages that answer different customer searches." },
      { question: "Can you redesign an existing business website?", answer: "Yes. I can preserve useful content and brand equity while rebuilding the experience, page structure, and frontend implementation." },
      { question: "Can the site grow later?", answer: "Yes. I structure the project so new service pages, work, locations, articles, integrations, or custom application features can be added without rebuilding everything." },
    ],
    relatedWork: [
      { href: "/work/pizza-website", name: "Canto", label: "Local restaurant concept" },
      { href: "/work/densho-website", name: "Densho", label: "Specialty retail concept" },
    ],
  },
  "custom-web-app-development": {
    slug: "custom-web-app-development",
    eyebrow: "Custom web applications",
    title: "Custom Web App Development for Real Business Workflows",
    shortTitle: "Custom Web App Development",
    description:
      "Custom web application development for dashboards, portals, internal tools, customer workflows, and SaaS products using modern React and Next.js architecture.",
    intro:
      "When spreadsheets, disconnected tools, or generic software start slowing a team down, a focused web application can turn the workflow into something clear and repeatable. I build interfaces around how the work actually happens.",
    idealFor: [
      "Internal dashboards and operational tools",
      "Customer or staff portals",
      "SaaS MVPs and product interfaces",
      "Messaging, inspection, booking, reporting, or workflow systems",
      "Teams that need API integrations or custom business logic",
    ],
    deliverables: [
      "Product and workflow mapping",
      "Responsive application UI and reusable component systems",
      "Next.js, React, TypeScript, Node.js, and API integration",
      "Authentication and role-aware interface planning when required",
      "Forms, tables, filters, file workflows, dashboards, and data-heavy screens",
      "Deployment strategy designed for ongoing product development",
    ],
    process: [
      { title: "Map the workflow", text: "We define users, actions, states, data, integrations, and the painful parts of the current process." },
      { title: "Reduce the complexity", text: "The interface is organized around the most important decisions and tasks instead of exposing every underlying technical detail." },
      { title: "Build in useful slices", text: "Core flows are implemented first so the product can be tested early before secondary features expand the scope." },
      { title: "Prepare for iteration", text: "The codebase, deployment, and component structure are kept maintainable so the application can continue growing after the initial release." },
    ],
    faq: [
      { question: "What kinds of web apps do you build?", answer: "Dashboards, portals, internal tools, customer-facing workflows, SaaS interfaces, messaging products, inspection systems, booking flows, and other browser-based business software." },
      { question: "Can you connect to an existing backend or API?", answer: "Yes. A frontend can be built against an existing API, or the project can include server-side and integration work when required." },
      { question: "Can you help turn a manual process into an application?", answer: "Yes. That is often the most valuable starting point: documenting the current workflow, identifying repetitive steps, and designing a simpler digital flow around the real users." },
    ],
    relatedWork: [
      { href: "/work/loopline-website", name: "Loopline", label: "SaaS interface concept" },
      { href: "/#work", name: "Product experience", label: "Messaging and inspection interface samples" },
    ],
  },
  "website-fixes": {
    slug: "website-fixes",
    eyebrow: "Website fixes",
    title: "Website Fixes for Bugs, Mobile Problems, Performance, and Unfinished Features",
    shortTitle: "Website Fixes",
    description:
      "Focused website fixes for broken layouts, mobile issues, React and Next.js bugs, forms, integrations, performance problems, and unfinished frontend work.",
    intro:
      "Not every project needs a redesign. If the website already exists but something is broken, slow, awkward, or unfinished, I can focus on the problem and improve the part that is holding the site back.",
    idealFor: [
      "Broken responsive layouts or mobile navigation",
      "React or Next.js frontend bugs",
      "Forms that do not submit or integrations that stopped working",
      "Slow pages, oversized assets, or poor loading behaviour",
      "Accessibility and interaction issues",
      "Small features that another developer left unfinished",
    ],
    deliverables: [
      "Targeted debugging and root-cause analysis",
      "Responsive CSS and component fixes",
      "React and Next.js implementation corrections",
      "Performance and asset optimization",
      "Form and integration troubleshooting",
      "Clear summary of what changed and any remaining risks",
    ],
    process: [
      { title: "Reproduce the issue", text: "I first confirm the problem and the conditions that trigger it instead of guessing from symptoms." },
      { title: "Find the cause", text: "The relevant component, CSS, request, state flow, configuration, or deployment behaviour is isolated before changes are made." },
      { title: "Fix the smallest useful scope", text: "I avoid unnecessary rewrites when a focused correction will solve the problem reliably." },
      { title: "Verify the result", text: "The affected flow is retested, including nearby responsive states or edge cases that could regress." },
    ],
    faq: [
      { question: "Do you take small website jobs?", answer: "Yes. Focused fixes are a good fit when the scope is clear, whether it is a layout problem, bug, form, performance issue, or unfinished feature." },
      { question: "Can you fix code written by another developer?", answer: "Usually, yes. I first inspect the project structure and reproduce the issue so the change is based on evidence rather than assumptions." },
      { question: "Can a small fix turn into a larger improvement project?", answer: "Yes, but only when it makes sense. I can separate the immediate fix from optional follow-up work so you can decide what is worth doing next." },
    ],
    relatedWork: [
      { href: "/work/kinetic-website", name: "Ferrous", label: "Motion-heavy frontend concept" },
      { href: "/work/altitude-website", name: "Fernline", label: "Responsive visual experience" },
    ],
  },
};

export const serviceList = Object.values(services);
