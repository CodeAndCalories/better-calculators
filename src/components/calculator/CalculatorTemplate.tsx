import type { CalculatorDef, InputValues } from "@/lib/types";
import { getRelatedCalculators } from "@/calculators/index";
import CalculatorEngine from "./CalculatorEngine";
import CalculatorCard from "@/components/ui/CalculatorCard";
import styles from "./CalculatorTemplate.module.css";

interface Props {
  def: CalculatorDef;
  prefill?: InputValues;
}

export default function CalculatorTemplate({ def, prefill }: Props) {
  const related = getRelatedCalculators(def.relatedSlugs);

  return (
    <main className={styles.page}>
      {/* Hero / breadcrumb */}
      <div className={styles.hero}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span aria-hidden="true">›</span>
          <a href={`/calculators/${def.category}`}>{def.category}</a>
          <span aria-hidden="true">›</span>
          <span>{def.shortTitle ?? def.title}</span>
        </nav>
        <h1 className={styles.h1}>{def.title}</h1>
        {def.description && (
          <p className={styles.description}>{def.description}</p>
        )}
      </div>

      {/*
        Desktop page rail:
        - Left ad slot (desktop only, gracefully empty until scripts added)
        - Main content column
        - Right ad slot (desktop only, gracefully empty until scripts added)
      */}
      <div className={styles.pageRail}>
        {/* Left ad slot — desktop only, hidden on mobile */}
        <aside
          className={`${styles.adSlot} ${styles.adSlotLeft}`}
          aria-hidden="true"
          data-ad-slot="left"
        >
          {/* Future: insert ad unit here */}
        </aside>

        {/* Main content */}
        <div className={styles.mainContent}>
          {/* Calculator card */}
          <section className={`${styles.section} ${styles.calcSection}`}>
            <div className={styles.calculatorCard}>
              <CalculatorEngine slug={def.slug} prefill={prefill} />
            </div>
          </section>

          {/* How it works */}
          {def.howItWorks && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>How It Works</h2>
              <div className={styles.prose}>
                <p>{def.howItWorks}</p>
              </div>
            </section>
          )}

          {/* Examples */}
          {def.examples && def.examples.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Examples</h2>
              <div className={styles.examples}>
                {def.examples.map((ex, i) => (
                  <div key={i} className={styles.example}>
                    <div className={styles.exampleTitle}>{ex.title}</div>
                    {ex.description && (
                      <div className={styles.exampleDesc}>{ex.description}</div>
                    )}
                    {ex.result && (
                      <div className={styles.exampleResult}>
                        <strong>Result:</strong> {ex.result}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FAQs */}
          {def.faqs && def.faqs.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
              <div className={styles.faqs}>
                {def.faqs.map((faq, i) => (
                  <details key={i} className={styles.faq}>
                    <summary className={styles.faqQuestion}>{faq.question}</summary>
                    <div className={styles.faqAnswer}>{faq.answer}</div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Related calculators */}
          {related && related.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Related Calculators</h2>
              <div className={styles.relatedGrid}>
                {related.map((rel) => (
                  <CalculatorCard key={rel.slug} calc={rel} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right ad slot — desktop only, hidden on mobile */}
        <aside
          className={`${styles.adSlot} ${styles.adSlotRight}`}
          aria-hidden="true"
          data-ad-slot="right"
        >
          {/* Future: insert ad unit here */}
        </aside>
      </div>
    </main>
  );
}
