// src/app/calculators/[category-page]/CategoryPageContent.tsx
'use client';
import Link from 'next/link';
import { CalculatorDef } from '@/lib/types';
import CalculatorCard from '@/components/ui/CalculatorCard';
import styles from './category.module.css';

interface Props {
  category: string;
  label: string;
  description: string;
  calcs: CalculatorDef[];
}

export default function CategoryPageContent({ category, label, description, calcs }: Props) {
  return (
    <div className={styles.page}>
      <div className="container">
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link> › <Link href="/calculators">Calculators</Link> › <span>{label}</span>
        </nav>

        <div className={styles.header}>
          <div className={styles.icon}>
            {category === 'finance' ? '📊' : category === 'health' ? '🏃' : '✨'}
          </div>
          <div>
            <h1 className={styles.title}>{label} Calculators</h1>
            <p className={styles.subtitle}>{description}</p>
          </div>
        </div>

        <p className={styles.count}>
          {calcs.length} calculator{calcs.length !== 1 ? 's' : ''} in this category
        </p>

        <div className={styles.grid}>
          {calcs.map((c) => (
            <CalculatorCard key={c.slug} calc={c} />
          ))}
        </div>

        <div className={styles.otherCats}>
          <p>Explore other categories:</p>
          {['finance', 'health', 'life']
            .filter((cat) => cat !== category)
            .map((cat) => (
              <Link key={cat} href={`/calculators/${cat}`} className={styles.catLink}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)} →
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
