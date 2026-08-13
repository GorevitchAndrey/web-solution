import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loopline AI Scheduling Website — Portfolio Sample",
  description:
    "A self-directed SaaS website concept using purposeful animation and a scroll-led product story to explain AI scheduling.",
  alternates: { canonical: "/loopline" },
};

export default function LooplineLayout({ children }: { children: React.ReactNode }) {
  return children;
}
