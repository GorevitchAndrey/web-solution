import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Canto Pizza Cafe Website — Portfolio Sample",
  description:
    "A self-directed pizza cafe website concept with a scroll-controlled ingredient story, editorial menu, and modern neighbourhood identity.",
  alternates: { canonical: "/pizza" },
  openGraph: {
    title: "Canto Pizza Cafe Website — Portfolio Sample",
    description:
      "A self-directed restaurant concept with a scroll-controlled ingredient story and modern neighbourhood identity.",
    url: "/pizza",
    type: "website",
  },
};

export default function PizzaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
