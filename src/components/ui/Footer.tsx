// src/components/ui/Footer.tsx
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={styles.logoMark}>BC</span>
          <div>
            <div className={styles.brandName}>BetterCalculators.net</div>
            <div className={styles.brandTagline}>Free calculators for everyday decisions.</div>
          </div>
        </div>

        <nav className={styles.links} aria-label="Footer navigation">
          <div className={styles.linkGroup}>
            <h3 className={styles.groupTitle}>Calculators</h3>
            <Link href="/calculators/finance">Finance</Link>
            <Link href="/calculators/health">Health</Link>
            <Link href="/calculators/life">Life</Link>
            <Link href="/calculators">All Calculators</Link>
          </div>
          <div className={styles.linkGroup}>
            <h3 className={styles.groupTitle}>Popular</h3>
            <Link href="/calculators/mortgage-calculator">Mortgage</Link>
            <Link href="/calculators/bmi-calculator">BMI</Link>
            <Link href="/calculators/tip-calculator">Tip</Link>
            <Link href="/calculators/compound-interest-calculator">Compound Interest</Link>
          </div>
          <div className={styles.linkGroup}>
            <h3 className={styles.groupTitle}>Company</h3>
            <Link href="/about">About</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Use</Link>
          </div>
        </nav>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>© {year} BetterCalculators.net — All rights reserved.</p>
        <p className={styles.disclaimer}>
          Calculators are for informational purposes only and do not constitute financial, medical, or legal advice.
        </p>
      </div>
    </footer>
  );
}
