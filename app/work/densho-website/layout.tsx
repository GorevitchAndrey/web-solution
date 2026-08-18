import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Densho Specialty Coffee Website — Portfolio Sample",
  description:
    "A self-directed specialty coffee commerce concept combining editorial restraint, tactile product detail, and quiet motion.",
  alternates: { canonical: "/densho" },
};

export default function DenshoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
