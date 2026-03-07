import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://bettercalculators.net";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Free Online Calculators for Finance, Health & Everyday Life | Better Calculators",
    template: "%s | Better Calculators",
  },
  description:
  "Use 140+ free online calculators for finance, health, percentages, loans, time, and everyday decisions. Fast, accurate tools including mortgage, BMI, compound interest, tip, conversions, and more.",
  keywords: [
  "free calculators",
  "online calculators",
  "finance calculators",
  "health calculators",
  "loan calculator",
  "percentage calculator",
  "bmi calculator"
],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Better Calculators",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
