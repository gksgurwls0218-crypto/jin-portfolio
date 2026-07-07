import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap", weight: ["500", "600", "700"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-jb", display: "swap", weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "Jin — Tactical Analyst",
  description: "Football tactical analyst building the next disruption. Variation theory, match analysis, data-driven approach.",
  openGraph: {
    title: "Jin — Tactical Analyst",
    description: "System adapts. Variation breaks it.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${space.variable} ${mono.variable}`}>
      <body className="min-h-screen flex flex-col" style={{ background: "var(--stage)", color: "var(--ink)" }}>
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
