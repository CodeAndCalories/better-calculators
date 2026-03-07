import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy — Better Calculators",
  description: "Privacy policy for BetterCalculators.net. We don't collect your data.",
  alternates: { canonical: "https://bettercalculators.net/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <div className={`container ${styles.content}`}>
        <h1>Privacy Policy</h1>
        <p className={styles.meta}>Last updated: March 2026</p>

        <h2>Overview</h2>
        <p>BetterCalculators.net ("we", "us", "our") is committed to protecting your privacy. This policy explains what information we collect, how we use it, and your rights.</p>

        <h2>Information We Collect</h2>
        <h3>Calculator Inputs</h3>
        <p>All calculator computations run entirely in your browser (client-side JavaScript). We do not transmit, store, or process any numbers you enter into our calculators on our servers. Your financial, health, and personal data stays on your device.</p>

        <h3>Analytics</h3>
        <p>We may use privacy-respecting analytics tools to understand aggregate usage patterns (e.g., which pages are visited most). Any analytics we use are configured to anonymize IP addresses and not use cookies for cross-site tracking.</p>

        <h3>Log Data</h3>
        <p>Like all web servers, our hosting provider may automatically collect log data including your IP address, browser type, referring URL, and pages visited. This data is used only for security monitoring and is not linked to personal identifiers.</p>

        <h2>Cookies</h2>
        <p>We do not use cookies for tracking or advertising. We may use minimal session-based cookies if needed for site functionality.</p>

        <h2>Third-Party Services</h2>
        <p>We may display Google AdSense advertisements to support the site. Google may use cookies to serve personalized ads based on your prior visits to websites. You can opt out at <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>.</p>

        <h2>Children's Privacy</h2>
        <p>Our service is not directed to children under 13. We do not knowingly collect personal information from children under 13.</p>

        <h2>Changes to This Policy</h2>
        <p>We may update this policy from time to time. Changes will be posted on this page with an updated date.</p>

        <h2>Contact</h2>
        <p>Questions about this privacy policy? Contact us at <a href="mailto:privacy@bettercalculators.net">privacy@bettercalculators.net</a>.</p>
      </div>
    </main>
  );
}
