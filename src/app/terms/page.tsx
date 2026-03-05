import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Terms of Service — Better Calculators",
  description: "Terms of service for BetterCalculators.net.",
  alternates: { canonical: "https://bettercalculators.net/terms" },
};

export default function TermsPage() {
  return (
    <main className={styles.page}>
      <div className={`container ${styles.content}`}>
        <h1>Terms of Service</h1>
        <p className={styles.meta}>Last updated: January 1, 2025</p>

        <h2>Acceptance of Terms</h2>
        <p>By accessing and using BetterCalculators.net ("Site"), you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use the Site.</p>

        <h2>Use of the Site</h2>
        <p>Better Calculators grants you a limited, non-exclusive, non-transferable right to access and use the Site for personal, non-commercial purposes. You agree not to:</p>
        <ul>
          <li>Use the Site for any unlawful purpose or in violation of any regulations.</li>
          <li>Attempt to gain unauthorized access to any portion of the Site.</li>
          <li>Scrape, copy, or redistribute our content without permission.</li>
          <li>Use automated tools to access the Site in a way that degrades its performance for other users.</li>
        </ul>

        <h2>Disclaimer of Warranties</h2>
        <p>The calculators and information on this Site are provided for <strong>informational and educational purposes only</strong>. They are not a substitute for professional financial, medical, legal, or other expert advice.</p>
        <p>While we strive for accuracy, we make no warranty that the results of our calculators are correct, complete, or up-to-date. Formulas and reference values may change. Always verify critical calculations with a qualified professional.</p>
        <p>THE SITE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.</p>

        <h2>Limitation of Liability</h2>
        <p>To the fullest extent permitted by law, Better Calculators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Site or reliance on any calculator results.</p>

        <h2>Intellectual Property</h2>
        <p>All content on this Site, including text, design, graphics, and code, is the property of Better Calculators or its content suppliers and is protected by intellectual property laws. Underlying mathematical formulas are not owned by us.</p>

        <h2>Changes to Terms</h2>
        <p>We reserve the right to modify these terms at any time. Changes will be posted on this page. Continued use of the Site after changes constitutes acceptance.</p>

        <h2>Governing Law</h2>
        <p>These terms are governed by the laws of the United States. Any disputes shall be resolved in the courts of applicable jurisdiction.</p>

        <h2>Contact</h2>
        <p>Questions? Contact us at <a href="mailto:legal@bettercalculators.net">legal@bettercalculators.net</a>.</p>
      </div>
    </main>
  );
}
