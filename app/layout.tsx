import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col" style={{ background: "var(--bg)", color: "var(--text-primary)" }}>
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
