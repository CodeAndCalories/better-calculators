// src/components/ui/Header.tsx
'use client';
import Link from 'next/link';
import { useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoMark}>BC</span>
          <span className={styles.logoText}>Better<strong>Calculators</strong></span>
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`} aria-label="Main navigation">
          <Link href="/calculators" className={styles.navLink} onClick={() => setMenuOpen(false)}>
            All Calculators
          </Link>
          <Link href="/calculators/finance" className={styles.navLink} onClick={() => setMenuOpen(false)}>
            Finance
          </Link>
          <Link href="/calculators/health" className={styles.navLink} onClick={() => setMenuOpen(false)}>
            Health
          </Link>
          <Link href="/calculators/life" className={styles.navLink} onClick={() => setMenuOpen(false)}>
            Life
          </Link>
        </nav>

        <button
          className={styles.menuToggle}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ''}`} />
        </button>
      </div>
    </header>
  );
}
