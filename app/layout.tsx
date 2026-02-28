import type { Metadata } from "next";
import { Barlow_Condensed, Barlow } from "next/font/google";
import "./globals.css";
import PageHeader from "@/components/PageHeader";

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const barlow = Barlow({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pendecho Awards",
  description: "Het Beste Stemplatform van Nederland",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={`${barlowCondensed.variable} ${barlow.variable}`}>
      <body className="font-body text-poly-white min-h-screen">
        <PageHeader />
        <main className="max-w-5xl mx-auto px-4 py-10">{children}</main>

        <footer className="mt-16 border-t border-poly-line py-5 text-center">
          <p className="font-display font-semibold text-poly-dim uppercase tracking-[0.2em] text-xs">
            Pendecho Awards &nbsp;·&nbsp; Alle stemmen zijn anoniem &nbsp;·&nbsp; Nederland
          </p>
        </footer>
      </body>
    </html>
  );
}
