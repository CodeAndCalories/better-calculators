import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://bettercalculators.net";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Better Calculators — Free Online Calculators",
    template: "%s | Better Calculators",
  },
  description: "Fast, accurate, free online calculators for finance, health, and everyday life. Mortgage, BMI, compound interest, tip, discount, and more.",
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
