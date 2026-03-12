"use client";
import Link from "next/link";
import { useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoMark}>BC</span>
          <span className={styles.logoText}>Better Calculators</span>
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`} aria-label="Main navigation">
    <Link href="/calculators" className={styles.navLink} onClick={() => setMenuOpen(false)}>All Calculators</Link>
    <Link href="/calculators/finance" className={styles.navLink} onClick={() => setMenuOpen(false)}>Finance</Link>
    <Link href="/calculators/health" className={styles.navLink} onClick={() => setMenuOpen(false)}>Health</Link>
    <Link href="/calculators/life" className={styles.navLink} onClick={() => setMenuOpen(false)}>Life</Link>
    <Link href="/calculators/conversions" className={styles.navLink} onClick={() => setMenuOpen(false)}>Conversions</Link>
    <Link href="/guides" className={styles.navLink} onClick={() => setMenuOpen(false)}>Guides</Link>
  </nav>

        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className={styles.menuBar} />
          <span className={styles.menuBar} />
          <span className={styles.menuBar} />
        </button>
      </div>
    </header>
  );
}
