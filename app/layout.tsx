import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond, Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
});

const notoSansTC = Noto_Sans_TC({
  subsets: ["chinese-traditional", "latin"],
  weight: ["400", "500"],
  variable: "--font-cjk",
});

export const metadata: Metadata = {
  title: "Honkaku Tattoo Studio | Coming Soon",
  description:
    "Honkaku Tattoo Studio — Authentic traditional Japanese artistry meets contemporary ink. Coming soon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${cormorant.variable} ${notoSansTC.variable} min-h-screen bg-background text-foreground antialiased font-sans`}
      >
        <div className="grain-overlay" aria-hidden />
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
