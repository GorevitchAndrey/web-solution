import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // altitude (lodges)
        alt: {
          ink: "#0c1220",
          ink2: "#141d33",
          amber: "#e8b978",
          amberdim: "#a9865a",
          sage: "#9fb0a3",
          mist: "#c9d2e0",
        },
        // loopline (saas)
        loop: {
          navy: "#0a0e1a",
          navy2: "#101832",
          cyan: "#5eead4",
          cyandim: "#2d6f66",
          violet: "#8b7ffb",
          text: "#dbe3f0",
          dim: "#7c8aa8",
        },
        // kuro (izakaya)
        kuro: {
          charcoal: "#1a1512",
          charcoal2: "#241d18",
          lacquer: "#c1382f",
          lacquerdim: "#7a241d",
          rice: "#f2e9d8",
          steam: "#d8cbb4",
        },
        // kinetic (agency)
        kin: {
          paper: "#f5f4f0",
          ink: "#111111",
          shock: "#ff4d1c",
        },
        // densho (coffee) - redesigned palette
        den: {
          cream: "#f7f3ea",
          bark: "#241d17",
          moss: "#4a5c43",
          mossdim: "#7c8a72",
          rust: "#b5502e",
          gold: "#c99b4a",
        },
      },
      fontFamily: {
        fraunces: ["var(--font-fraunces)"],
        manrope: ["var(--font-manrope)"],
        grotesk: ["var(--font-grotesk)"],
        mono: ["var(--font-mono)"],
        bebas: ["var(--font-bebas)"],
        noto: ["var(--font-noto)"],
        archivoblack: ["var(--font-archivo-black)"],
        archivo: ["var(--font-archivo)"],
        cormorant: ["var(--font-cormorant)"],
      },
    },
  },
  plugins: [],
};
export default config;
