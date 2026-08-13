import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ferrous Creative Studio Website — Portfolio Sample",
  description:
    "A self-directed creative agency website concept built around expressive typography, graphic rhythm, and kinetic motion.",
  alternates: { canonical: "/kinetic" },
};

export default function KineticLayout({ children }: { children: React.ReactNode }) {
  return children;
}
