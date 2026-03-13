import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Contact Us | Better Calculators",
  description:
    "Contact the Better Calculators editorial team to report a bug, suggest a new calculator, or discuss partnership opportunities.",
  alternates: { canonical: "https://bettercalculators.net/contact" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Contact Better Calculators",
    description:
      "Get in touch with our editorial team for bug reports, calculator suggestions, and partnership inquiries.",
    url: "https://bettercalculators.net/contact",
    siteName: "Better Calculators",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <div className={`container ${styles.content}`}>
        <h1>Contact Us</h1>
        <p className={styles.lead}>
          We value your feedback and are always working to improve our tools.
          Whether you&apos;ve found a bug, have a suggestion, or want to explore a
          partnership, we&apos;d love to hear from you.
        </p>

        <h2>Editorial Contact</h2>
        <p>For editorial and content inquiries, reach our team directly:</p>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:editorial@bettercalculators.net">
            editorial@bettercalculators.net
          </a>
        </p>

        <h2>Response Commitment</h2>
        <p>
          Our editorial team reviews all inquiries within{" "}
          <strong>48 business hours</strong>. We read every message and
          prioritize responses based on urgency and impact.
        </p>

        <h2>Reasons to Contact</h2>
        <ul>
          <li>
            <strong>Report a calculator bug</strong> — Found an incorrect result
            or broken input? Let us know the calculator name and the values you
            used.
          </li>
          <li>
            <strong>Suggest a new calculator</strong> — Have a calculation
            you&apos;d like us to build? We welcome community-driven tool ideas.
          </li>
          <li>
            <strong>Partnership inquiries</strong> — Interested in featuring our
            tools, co-creating content, or exploring commercial opportunities?
          </li>
          <li>
            <strong>Request specialized calculations</strong> — Need a custom
            formula or niche calculator for a specific use case? We&apos;re happy to
            discuss.
          </li>
        </ul>

        <hr className={styles.divider} />

        <p>
          <small>
            <em>
              For privacy-related questions, email{" "}
              <a href="mailto:privacy@bettercalculators.net">
                privacy@bettercalculators.net
              </a>
              . For legal inquiries, contact{" "}
              <a href="mailto:legal@bettercalculators.net">
                legal@bettercalculators.net
              </a>
              .
            </em>
          </small>
        </p>
      </div>
    </main>
  );
}
