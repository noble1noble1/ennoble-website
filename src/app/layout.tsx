import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { StructuredData } from "../components/StructuredData";
import "./globals.css";

const satoshi = localFont({
  src: [
    { path: "../fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/Satoshi-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
});

const siteUrl = "https://ennoble.one";

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ennoble — AI Operations Consulting for Your Business",
  description:
    "We find what's broken. Then we build what's next. AI operations consulting — audit, build, train, and optimize — for businesses that make real things.",
  keywords: [
    "AI consulting",
    "AI operations",
    "business automation",
    "AI audit",
    "AI systems",
    "fractional AI",
    "AI training",
    "small business AI",
    "AI integration",
  ],
  authors: [{ name: "Noble", url: siteUrl }],
  creator: "Ennoble",
  publisher: "Ennoble",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Ennoble",
    title: "Ennoble — AI Operations Consulting",
    description:
      "Most AI consultants give you a deck. We give you systems. Audit. Build. Train. Stay.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ennoble — AI Operations Consulting",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ennoble — AI Operations Consulting",
    description:
      "Most AI consultants give you a deck. We give you systems. Audit. Build. Train. Stay.",
    images: ["/og-image.png"],
    creator: "@znob",
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${inter.variable} ${jetbrainsMono.variable} ${playfair.variable}`}
    >
      <body className="bg-[#0A0A0A] text-[#FAFAFA] font-inter antialiased">
        <StructuredData />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
