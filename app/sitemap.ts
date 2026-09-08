import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://easy-web-solution.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1 },
    { path: "services", priority: 0.9 },
    { path: "services/web-development-calgary", priority: 0.85 },
    { path: "services/business-websites", priority: 0.85 },
    { path: "services/custom-web-app-development", priority: 0.85 },
    { path: "services/website-fixes", priority: 0.85 },
    { path: "about", priority: 0.7 },
    { path: "contact", priority: 0.75 },
    { path: "case-studies", priority: 0.8 },
    { path: "case-studies/canto-restaurant-website", priority: 0.75 },
    { path: "case-studies/loopline-saas-website", priority: 0.75 },
    { path: "case-studies/fernline-travel-website", priority: 0.75 },
    { path: "work/pizza-website", priority: 0.65 },
    { path: "work/altitude-website", priority: 0.65 },
    { path: "work/loopline-website", priority: 0.65 },
    { path: "work/kuro-website", priority: 0.65 },
    { path: "work/kinetic-website", priority: 0.65 },
    { path: "work/densho-website", priority: 0.65 },
  ];

  return routes.map(({ path, priority }) => ({
    url: path ? `${siteUrl}/${path}` : siteUrl,
    priority,
  }));
}
