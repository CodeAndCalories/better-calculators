import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={`container ${styles.content}`}>
        <p className={styles.code}>404</p>
        <h1>Page not found</h1>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <div className={styles.actions}>
          <Link href="/" className={styles.primary}>Go Home</Link>
          <Link href="/calculators" className={styles.secondary}>Browse Calculators</Link>
        </div>
      </div>
    </main>
  );
}
