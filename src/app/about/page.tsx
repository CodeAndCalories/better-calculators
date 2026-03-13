import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "About Better Calculators | Our Mission & Mathematical Integrity",
  description: "Learn about Better Calculators, our commitment to mathematical accuracy, privacy-first tools, and our mission to provide transparent financial and health resources.",
  alternates: { canonical: "https://bettercalculators.net/about" },
};

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <div className={`container ${styles.content}`}>
        <h1>About Better Calculators</h1>
        <p className={styles.lead}>Precision tools for a data-driven world. We provide high-accuracy, fast-loading calculators for finance, health, and everyday problem-solving.</p>

        <h2>Our Mission</h2>
        <p>BetterCalculators.net was founded on the belief that complex math should never be a barrier to making informed life decisions. Most online calculators are either cluttered with intrusive ads or hide their formulas. We built a platform that prioritizes clarity, speed, and mathematical integrity.</p>
        
        <p>Every tool on our site is designed around four core pillars:</p>
        <ul>
          <li><strong>Accuracy</strong> — We use industry-standard formulas verified against financial and scientific benchmarks.</li>
          <li><strong>Transparency</strong> — We don't just give you a number; we show you the math behind it so you can verify the results.</li>
          <li><strong>Speed</strong> — Optimized for the modern web, our tools provide instant results on any device.</li>
          <li><strong>Privacy</strong> — Your data stays yours. Calculations are processed locally in your browser and are never stored on our servers.</li>
        </ul>

        <h2>Mathematical Integrity & Methodology</h2>
        <p>To ensure our users receive reliable data, we audit our calculators against established institutional standards:</p>
        <ul>
          <li><strong>Financial Tools:</strong> Our loan and investment calculators utilize standard amortization logic and GAAP (Generally Accepted Accounting Principles) compliant formulas.</li>
          <li><strong>Health Tools:</strong> BMI, BMR, and nutritional tools are based on peer-reviewed research and equations recognized by the NIH and WHO.</li>
          <li><strong>Regular Audits:</strong> Our editorial and development team regularly reviews each tool to ensure alignment with the latest professional and scientific consensus.</li>
        </ul>

        <h2>Who We Are</h2>
        <p>Better Calculators is an independent project managed by a dedicated team of software engineers and data enthusiasts. We are committed to remaining an unbiased resource; we are not affiliated with any financial or medical institutions, ensuring our results remain neutral and focused solely on mathematical accuracy.</p>

        <h2>Contact Us</h2>
        <p>We are constantly expanding our library of 300+ tools. If you have a suggestion for a new calculator, have found a bug, or require a specific calculation for your business, please reach out.</p>
        <p><strong>Email:</strong> <a href="mailto:hello@bettercalculators.net">hello@bettercalculators.net</a></p>

        <hr className={styles.divider} />
        <p><small><em>Disclaimer: BetterCalculators.net provides tools for informational and educational purposes only. Our results do not constitute financial, medical, or legal advice. Always consult with a licensed professional before making significant decisions.</em></small></p>
      </div>
    </main>
  );
}