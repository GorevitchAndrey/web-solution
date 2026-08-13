import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kuro Ramen Restaurant Website — Portfolio Sample",
  description:
    "A self-directed restaurant website concept with editorial typography, late-night atmosphere, and a scroll-controlled ramen assembly.",
  alternates: { canonical: "/kuro" },
};

export default function KuroLayout({ children }: { children: React.ReactNode }) {
  return children;
}
