import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "About Better Calculators",
  description: "Better Calculators provides free, accurate, and beautifully designed online calculators for finance, health, and everyday life.",
  alternates: { canonical: "https://bettercalculators.net/about" },
};

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <div className={`container ${styles.content}`}>
        <h1>About Better Calculators</h1>
        <p className={styles.lead}>We build tools that give you fast, accurate answers to everyday calculations — no fluff, no friction.</p>

        <h2>Our Mission</h2>
        <p>Better Calculators was founded with a simple premise: calculators online were either cluttered with ads, hard to use on mobile, or hiding the math behind their results. We set out to fix that.</p>
        <p>Every calculator on our site is built to be:</p>
        <ul>
          <li><strong>Accurate</strong> — We use the same formulas trusted by financial professionals, healthcare providers, and academic institutions.</li>
          <li><strong>Transparent</strong> — Each calculator page explains exactly how the math works, so you understand your results.</li>
          <li><strong>Fast</strong> — Results in one click. No lengthy forms, no account required.</li>
          <li><strong>Private</strong> — Everything runs in your browser. We never collect, store, or transmit your numbers.</li>
        </ul>

        <h2>Who We Are</h2>
        <p>Better Calculators is an independent project. We're a small team of developers and writers who are tired of bad calculator UX. We're not backed by a financial institution and have no vested interest in the results our calculators produce.</p>

        <h2>Accuracy & Methodology</h2>
        <p>We document the formula behind every calculator on its individual page. For financial calculators, we use standard actuarial formulas. For health calculators, we use clinically validated equations (such as Mifflin-St Jeor for calorie estimation). We update our calculators when scientific or professional consensus changes.</p>
        <p><strong>Our calculators are for informational and educational purposes only.</strong> They do not constitute financial, medical, or legal advice. Always consult a licensed professional for decisions that matter.</p>

        <h2>Contact</h2>
        <p>Have a suggestion for a new calculator, found an error, or want to report a bug? We'd love to hear from you. Reach us at: <a href="mailto:hello@bettercalculators.net">hello@bettercalculators.net</a></p>
      </div>
    </main>
  );
}
