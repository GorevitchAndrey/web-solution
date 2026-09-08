export const caseStudies = [
  {
    slug: "canto-restaurant-website",
    name: "Canto",
    eyebrow: "Concept case study / Restaurant website",
    title: "Restaurant Website Design Focused on Discovery, Appetite, and Mobile Usability",
    description: "A self-directed restaurant website case study exploring visual identity, menu discovery, mobile usability, and performance-conscious frontend implementation.",
    summary: "Canto is a self-directed restaurant concept created to explore how a hospitality website can feel distinctive without making basic tasks harder. The experience combines strong visual storytelling with a clear path to discover the food and understand the atmosphere.",
    demoHref: "/work/pizza-website",
    serviceHref: "/services/business-websites",
    serviceLabel: "Business websites",
    type: "Restaurant / local business",
    focus: ["Mobile-first discovery", "Visual identity", "Menu presentation", "Scroll storytelling", "Responsive frontend", "Performance-conscious assets"],
    challenge: "Restaurant sites often over-index on visual mood or bury the information people need. This concept explores how to create a memorable first impression while preserving a straightforward, responsive experience.",
    approach: [
      { title: "Lead with a specific brand feeling", text: "The art direction uses ingredients, typography, spacing, and motion to create a warm neighbourhood identity rather than a generic restaurant template." },
      { title: "Keep the interaction legible", text: "Motion supports the narrative, but the hierarchy remains clear so visitors can understand the concept without learning a custom interface." },
      { title: "Design for the phone first", text: "Restaurant discovery frequently happens on mobile, so spacing, readable type, touch targets, and image behaviour are treated as core product decisions." },
      { title: "Build the concept as a real frontend", text: "The project is implemented as a responsive Next.js experience rather than a static mockup, which makes animation, layout, loading, and edge cases part of the design work." },
    ],
    takeaway: "This case study demonstrates how a local business website can use a strong visual identity while still prioritizing clarity, mobile usability, and a maintainable implementation."
  },
  {
    slug: "loopline-saas-website",
    name: "Loopline",
    eyebrow: "Concept case study / SaaS website",
    title: "SaaS Website Design That Turns Product Complexity Into a Clear Story",
    description: "A self-directed SaaS website case study focused on explaining product value, interface ideas, hierarchy, responsive behaviour, and a precise frontend system.",
    summary: "Loopline is a self-directed SaaS concept for an AI scheduling product. The goal was to present a technically capable product without overwhelming the visitor with feature lists, dashboards, or vague AI language.",
    demoHref: "/work/loopline-website",
    serviceHref: "/services/custom-web-app-development",
    serviceLabel: "Custom web app development",
    type: "SaaS / product",
    focus: ["Product storytelling", "Interface hierarchy", "SaaS positioning", "Responsive UI", "Motion with purpose", "Component-based frontend"],
    challenge: "Software products can become difficult to understand when every feature receives equal visual weight. The design challenge was to reduce scheduling complexity into a product story that feels calm and credible.",
    approach: [
      { title: "Start with the user problem", text: "The experience frames the product around attention, scheduling friction, and a clearer workday instead of beginning with implementation details." },
      { title: "Use interface fragments as evidence", text: "Calendar and workflow UI elements make the product feel tangible while staying secondary to the main message." },
      { title: "Create rhythm instead of feature overload", text: "Large type, whitespace, focused sections, and restrained motion give each idea enough room to be understood." },
      { title: "Treat the marketing site like product UI", text: "Responsive states, reusable components, interaction timing, and frontend consistency are designed with the same discipline as an application interface." },
    ],
    takeaway: "The concept shows how product thinking and frontend craft can make a SaaS offer easier to understand before a prospect ever reaches the application itself."
  },
  {
    slug: "fernline-travel-website",
    name: "Fernline",
    eyebrow: "Concept case study / Hospitality website",
    title: "Premium Travel Website Design Built Around Atmosphere Without Losing Clarity",
    description: "A self-directed hospitality website case study exploring premium visual direction, responsive storytelling, motion, hierarchy, and frontend execution.",
    summary: "Fernline is a self-directed lodge and travel concept. It explores how a premium hospitality site can create a strong sense of place through typography, depth, light, and restrained interaction without becoming slow or difficult to navigate.",
    demoHref: "/work/altitude-website",
    serviceHref: "/services/web-development-calgary",
    serviceLabel: "Calgary web development",
    type: "Hospitality / travel",
    focus: ["Premium art direction", "Atmosphere", "Responsive storytelling", "Depth and motion", "Typography", "Frontend polish"],
    challenge: "Premium travel brands need emotion and atmosphere, but highly visual websites can easily become inaccessible, slow, or confusing. The concept balances immersive presentation with a conventional reading flow.",
    approach: [
      { title: "Build a sense of place", text: "Night-sky imagery, depth, typography, and pacing are used to make the experience feel like a specific destination rather than a reusable hotel theme." },
      { title: "Restrain the motion", text: "Parallax and depth support the mood, while the page remains understandable when motion is ignored or reduced." },
      { title: "Protect the content hierarchy", text: "The visual system keeps primary messages, supporting copy, and actions distinct even when the background treatment is expressive." },
      { title: "Translate the art direction responsively", text: "The implementation adapts composition, spacing, and scale across screen sizes instead of simply shrinking the desktop layout." },
    ],
    takeaway: "Fernline demonstrates a premium visual approach that can still be engineered around responsive behaviour, usability, and maintainable frontend structure."
  },
] as const;

export type CaseStudy = (typeof caseStudies)[number];
