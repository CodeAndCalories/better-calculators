"use client";
import { useState, useMemo } from "react";
import { calculators } from "@/calculators/index";
import CalculatorCard from "@/components/ui/CalculatorCard";
import styles from "./page.module.css";
import type { Category } from "@/lib/types";

const CATEGORIES: Array<{ value: Category | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "finance", label: "💰 Finance" },
  { value: "health", label: "❤️ Health" },
  { value: "life", label: "✨ Life" },
];

export default function CalculatorsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");

  const filtered = useMemo(() => {
    return calculators.filter((c) => {
      const matchCat = category === "all" || c.category === category;
      const q = search.toLowerCase();
      const matchSearch = !q ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        (c.keywords ?? []).some((k) => k.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [search, category]);

  return (
    <main className={styles.page}>
      <div className={`container ${styles.header}`}>
        <h1>All Calculators</h1>
        <p className={styles.subtitle}>
          {calculators.length} free calculators for finance, health, and everyday life.
        </p>

        <div className={styles.controls}>
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="search"
              className={styles.search}
              placeholder="Search calculators..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search calculators"
            />
          </div>

          <div className={styles.filters} role="group" aria-label="Filter by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                className={`${styles.filterBtn} ${category === cat.value ? styles.filterActive : ""}`}
                onClick={() => setCategory(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <p>No calculators match your search. Try a different term.</p>
            <button onClick={() => { setSearch(""); setCategory("all"); }} className={styles.clearBtn}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((c) => (
              <CalculatorCard key={c.slug} calc={c} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
