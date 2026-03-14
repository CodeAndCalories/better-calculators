import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.logoMark}>BC</span>
            <span className={styles.logoText}>Better Calculators</span>
          </div>
          <p className={styles.tagline}>Fast, accurate, free calculators for everyday decisions.</p>
        </div>

        <nav className={styles.links} aria-label="Footer navigation">
          <div className={styles.linkGroup}>
            <p className={styles.groupLabel}>Calculators</p>
            <Link href="/calculators/finance">Finance</Link>
            <Link href="/calculators/health">Health</Link>
            <Link href="/calculators/life">Life</Link>
            <Link href="/calculators">All Calculators</Link>
          </div>
          <div className={styles.linkGroup}>
            <p className={styles.groupLabel}>Company</p>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
           <a
             href="https://toolsdock.io"
             target="_blank"
             rel="noopener noreferrer"
             className={styles.link}
            >
            300+ Free Online Developer Tools
        </a>
          </div>
        </nav>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>© {year} BetterCalculators.net — All rights reserved.</p>
        <p>Results are for informational purposes only and do not constitute professional advice.</p>
      </div>
    </footer>
  );
}
