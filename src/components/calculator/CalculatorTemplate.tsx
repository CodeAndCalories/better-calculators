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
      <div className={`container ${styles.hero}`}>
        <div className={styles.breadcrumb}>
          <a href="/calculators">Calculators</a>
          <span>/</span>
          <a href={`/calculators/${def.category}`}>
            {def.category.charAt(0).toUpperCase() + def.category.slice(1)}
          </a>
          <span>/</span>
          <span>{def.shortTitle ?? def.title}</span>
        </div>

        <span className={`category-badge ${def.category}`}>{def.category}</span>
        <h1 className={styles.h1}>{def.title}</h1>
        <p className={styles.description}>{def.longDescription}</p>
      </div>

      {/* 1. Calculator */}
      <section className={`container ${styles.section} ${styles.calcSection}`} id="calculator">
        <div className={styles.calculatorCard}>
          <CalculatorEngine slug={def.slug} prefill={prefill} />
        </div>
      </section>

      {/* 2. What this calculator does */}
      <section className={`container ${styles.section}`} id="about">
        <h2 className={styles.sectionTitle}>What this calculator does</h2>
        <p>{def.longDescription}</p>
      </section>

      {/* 3. How it works */}
      <section className={`container ${styles.section}`} id="how-it-works">
        <h2 className={styles.sectionTitle}>How the calculation works</h2>
        <div className={styles.prose}>
          <p>{def.howItWorks}</p>
        </div>
      </section>

      {/* 4. Examples */}
      {def.examples.length > 0 && (
        <section className={`container ${styles.section}`} id="examples">
          <h2 className={styles.sectionTitle}>Examples</h2>
          <div className={styles.examples}>
            {def.examples.map((ex, i) => (
              <div key={i} className={styles.example}>
                <h3 className={styles.exampleTitle}>{ex.title}</h3>
                <p className={styles.exampleDesc}>{ex.description}</p>
                <div className={styles.exampleResult}>
                  <strong>Result:</strong> {ex.result}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. FAQs */}
      {def.faqs.length > 0 && (
        <section className={`container ${styles.section}`} id="faqs">
          <h2 className={styles.sectionTitle}>FAQ</h2>
          <div className={styles.faqs}>
            {def.faqs.map((faq, i) => (
              <details key={i} className={styles.faq}>
                <summary className={styles.faqQ}>{faq.question}</summary>
                <div className={styles.faqA}>{faq.answer}</div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* 6. Related */}
      {related.length > 0 && (
        <section className={`container ${styles.section}`} id="related">
          <h2 className={styles.sectionTitle}>Related calculators</h2>
          <div className={styles.relatedGrid}>
            {related.map((c) => (
              <CalculatorCard key={c.slug} calc={c} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}