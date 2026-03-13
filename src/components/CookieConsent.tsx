"use client";

import { useState, useEffect } from "react";
import styles from "./CookieConsent.module.css";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("cookie-consent");
      if (!consent) setVisible(true);
    } catch {
      // localStorage unavailable (private mode or SSR guard)
    }
  }, []);

  function handleAccept() {
    try {
      localStorage.setItem("cookie-consent", "true");
    } catch {
      // ignore write errors
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className={styles.banner} role="region" aria-label="Cookie consent">
      <div className={styles.inner}>
        <p className={styles.text}>
          We use cookies to improve your experience and display relevant ads.{" "}
          <a href="/privacy" className={styles.link}>
            Privacy Policy
          </a>
        </p>
        <button className={styles.btn} onClick={handleAccept}>
          Accept
        </button>
      </div>
    </div>
  );
}
