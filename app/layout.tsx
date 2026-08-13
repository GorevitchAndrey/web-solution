import type { Metadata } from "next";
import {
  Fraunces,
  Manrope,
  Space_Grotesk,
  IBM_Plex_Mono,
  Bebas_Neue,
  Noto_Sans_JP,
  Archivo_Black,
  Archivo,
  Cormorant,
} from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", weight: ["300", "400", "500"] });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", weight: ["300", "400", "500", "600"] });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", weight: ["400", "500", "700"] });
const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500"] });
const bebas = Bebas_Neue({ subsets: ["latin"], variable: "--font-bebas", weight: ["400"] });
const noto = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-noto", weight: ["300", "500"] });
const archivoBlack = Archivo_Black({ subsets: ["latin"], variable: "--font-archivo-black", weight: ["400"] });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", weight: ["400", "500", "600"] });
const cormorant = Cormorant({ subsets: ["latin"], variable: "--font-cormorant", weight: ["400", "500"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio.example"),
  title: {
    default: "Calgary Web Developer | Websites & Custom Web Apps | Andrii",
    template: "%s | Andrii Web Development",
  },
  description:
    "Calgary web designer and developer creating fast business websites, polished landing pages, website fixes, and custom web applications.",
  keywords: [
    "Calgary web developer",
    "Calgary web designer",
    "website development Calgary",
    "small business website Calgary",
    "custom web application developer",
    "Next.js developer Calgary",
  ],
  authors: [{ name: "Andrii" }],
  creator: "Andrii",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "/",
    siteName: "Andrii Web Development",
    title: "Calgary Web Developer | Websites & Custom Web Apps",
    description:
      "Thoughtful websites and custom web applications for businesses in Calgary and beyond.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calgary Web Developer | Websites & Custom Web Apps",
    description:
      "Thoughtful websites and custom web applications for businesses in Calgary and beyond.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} ${grotesk.variable} ${mono.variable} ${bebas.variable} ${noto.variable} ${archivoBlack.variable} ${archivo.variable} ${cormorant.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
