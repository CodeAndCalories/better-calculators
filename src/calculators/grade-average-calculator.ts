import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "grade-average-calculator",
  title: "Grade Average Calculator",
  shortTitle: "Grade Average",
  description: "Calculate your weighted average percentage grade across up to 6 assignments or exams.",
  category: "education",
  keywords: ["grade average calculator", "weighted grade calculator", "average score", "grade percentage"],
  inputs: [
    { type: "number", key: "s1", label: "Score 1 (%)",  defaultValue: 88, min: 0, max: 100, step: 0.1 },
    { type: "number", key: "w1", label: "Weight 1 (%)", defaultValue: 20, min: 0, max: 100, step: 1   },
    { type: "number", key: "s2", label: "Score 2 (%)",  defaultValue: 74, min: 0, max: 100, step: 0.1 },
    { type: "number", key: "w2", label: "Weight 2 (%)", defaultValue: 20, min: 0, max: 100, step: 1   },
    { type: "number", key: "s3", label: "Score 3 (%)",  defaultValue: 91, min: 0, max: 100, step: 0.1 },
    { type: "number", key: "w3", label: "Weight 3 (%)", defaultValue: 30, min: 0, max: 100, step: 1   },
    { type: "number", key: "s4", label: "Score 4 (%)",  defaultValue: 82, min: 0, max: 100, step: 0.1 },
    { type: "number", key: "w4", label: "Weight 4 (%)", defaultValue: 30, min: 0, max: 100, step: 1   },
    { type: "toggle", key: "use5", label: "Include Item 5", defaultValue: false },
    { type: "number", key: "s5", label: "Score 5 (%)",  defaultValue: 70, min: 0, max: 100, step: 0.1 },
    { type: "number", key: "w5", label: "Weight 5 (%)", defaultValue: 0,  min: 0, max: 100, step: 1   },
    { type: "toggle", key: "use6", label: "Include Item 6", defaultValue: false },
    { type: "number", key: "s6", label: "Score 6 (%)",  defaultValue: 95, min: 0, max: 100, step: 0.1 },
    { type: "number", key: "w6", label: "Weight 6 (%)", defaultValue: 0,  min: 0, max: 100, step: 1   },
  ],
  compute(values: InputValues): ComputeResult {
    const items = [
      { s: "s1", w: "w1", active: true },
      { s: "s2", w: "w2", active: true },
      { s: "s3", w: "w3", active: true },
      { s: "s4", w: "w4", active: true },
      { s: "s5", w: "w5", active: Boolean(values.use5) },
      { s: "s6", w: "w6", active: Boolean(values.use6) },
    ];
    let totalWeightedScore = 0;
    let totalWeight = 0;
    for (const item of items) {
      if (!item.active) continue;
      const score  = Number(values[item.s]);
      const weight = Number(values[item.w]);
      if (!Number.isFinite(score) || !Number.isFinite(weight) || score < 0 || weight < 0) {
        return { outputs: [], error: "Please enter valid scores and weights." };
      }
      totalWeightedScore += score * weight;
      totalWeight        += weight;
    }
    if (totalWeight === 0) return { outputs: [], error: "Total weight cannot be zero." };
    const avg = totalWeightedScore / totalWeight;
    let letter = "F";
    if (avg >= 93) letter = "A";
    else if (avg >= 90) letter = "A−";
    else if (avg >= 87) letter = "B+";
    else if (avg >= 83) letter = "B";
    else if (avg >= 80) letter = "B−";
    else if (avg >= 77) letter = "C+";
    else if (avg >= 73) letter = "C";
    else if (avg >= 70) letter = "C−";
    else if (avg >= 67) letter = "D+";
    else if (avg >= 60) letter = "D";
    return {
      outputs: [
        { key: "average",      label: "Weighted Average (%)", value: Math.round(avg * 100) / 100, format: "number", highlight: true },
        { key: "letterGrade",  label: "Letter Grade",         value: letter,                       format: "text"   },
        { key: "totalWeight",  label: "Total Weight (%)",     value: totalWeight,                  format: "number" },
      ],
    };
  },
  howItWorks: "Weighted average = Σ(score × weight) / Σ(weights). Weights do not need to sum to 100 — the calculator normalises automatically.",
  relatedSlugs: ["gpa-calculator"],

  longDescription: "Calculate your overall course grade from individual assignments, quizzes, and exams — each with its own percentage weight. Weights do not need to sum to 100; the calculator normalises them automatically so you can add items incrementally.",
  examples: [
    { title: "Two midterms (20% each), final (30%), homework (30%): scores 88, 74, 91, 82", description: "Typical university course weighting.", inputs: { s1: 88, w1: 20, s2: 74, w2: 20, s3: 91, w3: 30, s4: 82, w4: 30 }, result: "Weighted average ≈ 84.8% — B." },
  ],
  faqs: [
    { question: "Do weights need to add up to 100?", answer: "No — the calculator divides by the total weight you enter, so it works correctly even if your weights sum to any number." },
    { question: "What if I have not received a grade yet?", answer: "Leave that item toggled off. The average is calculated only from the items you include." },
  ],
};

export default def;
