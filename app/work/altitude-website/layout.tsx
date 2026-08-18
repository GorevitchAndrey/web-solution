import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fernline Luxury Lodge Website — Portfolio Sample",
  description:
    "A self-directed luxury travel website concept featuring atmospheric art direction, layered parallax, and refined motion.",
  alternates: { canonical: "/altitude" },
};

export default function AltitudeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
