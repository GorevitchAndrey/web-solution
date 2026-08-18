import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://easy-web-solution.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const workRoutes = [
    "work/pizza-website",
    "work/altitude-website",
    "work/loopline-website",
    "work/kuro-website",
    "work/kinetic-website",
    "work/densho-website",
  ];

  const serviceRoutes = [
    "services",
    "services/web-development-calgary",
    "services/business-websites",
    "services/custom-web-app-development",
    "services/website-fixes",
  ];

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...serviceRoutes.map((route, index) => ({
      url: `${siteUrl}/${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: index === 0 ? 0.9 : 0.85,
    })),
    ...workRoutes.map((route) => ({
      url: `${siteUrl}/${route}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
