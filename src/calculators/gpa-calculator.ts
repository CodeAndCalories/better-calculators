import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

// Grade point lookup: select inputs map to grade points
// We use numeric inputs for credits and selects for letter grade

const def: CalculatorDef = {
  slug: "gpa-calculator",
  title: "GPA Calculator",
  shortTitle: "GPA",
  description: "Calculate your weighted GPA across up to 6 courses using letter grades and credit hours.",
  category: "life",
  keywords: ["GPA calculator", "grade point average", "college GPA", "semester GPA calculator"],
  inputs: [
    { type: "select", key: "g1", label: "Course 1 Grade", defaultValue: "4.0", options: [
      { label: "A+ / A (4.0)", value: "4.0" }, { label: "A− (3.7)", value: "3.7" },
      { label: "B+ (3.3)", value: "3.3" },      { label: "B (3.0)",  value: "3.0" },
      { label: "B− (2.7)", value: "2.7" },      { label: "C+ (2.3)", value: "2.3" },
      { label: "C (2.0)",  value: "2.0" },      { label: "C− (1.7)", value: "1.7" },
      { label: "D+ (1.3)", value: "1.3" },      { label: "D (1.0)",  value: "1.0" },
      { label: "F (0.0)",  value: "0.0" },
    ]},
    { type: "number", key: "c1", label: "Course 1 Credits", defaultValue: 3, min: 0.5, max: 6, step: 0.5 },
    { type: "select", key: "g2", label: "Course 2 Grade", defaultValue: "3.7", options: [
      { label: "A+ / A (4.0)", value: "4.0" }, { label: "A− (3.7)", value: "3.7" },
      { label: "B+ (3.3)", value: "3.3" },      { label: "B (3.0)",  value: "3.0" },
      { label: "B− (2.7)", value: "2.7" },      { label: "C+ (2.3)", value: "2.3" },
      { label: "C (2.0)",  value: "2.0" },      { label: "C− (1.7)", value: "1.7" },
      { label: "D+ (1.3)", value: "1.3" },      { label: "D (1.0)",  value: "1.0" },
      { label: "F (0.0)",  value: "0.0" },
    ]},
    { type: "number", key: "c2", label: "Course 2 Credits", defaultValue: 4, min: 0.5, max: 6, step: 0.5 },
    { type: "select", key: "g3", label: "Course 3 Grade", defaultValue: "3.3", options: [
      { label: "A+ / A (4.0)", value: "4.0" }, { label: "A− (3.7)", value: "3.7" },
      { label: "B+ (3.3)", value: "3.3" },      { label: "B (3.0)",  value: "3.0" },
      { label: "B− (2.7)", value: "2.7" },      { label: "C+ (2.3)", value: "2.3" },
      { label: "C (2.0)",  value: "2.0" },      { label: "C− (1.7)", value: "1.7" },
      { label: "D+ (1.3)", value: "1.3" },      { label: "D (1.0)",  value: "1.0" },
      { label: "F (0.0)",  value: "0.0" },
    ]},
    { type: "number", key: "c3", label: "Course 3 Credits", defaultValue: 3, min: 0.5, max: 6, step: 0.5 },
    { type: "toggle", key: "use4", label: "Include Course 4", defaultValue: false },
    { type: "select", key: "g4", label: "Course 4 Grade", defaultValue: "3.0", options: [
      { label: "A+ / A (4.0)", value: "4.0" }, { label: "A− (3.7)", value: "3.7" },
      { label: "B+ (3.3)", value: "3.3" },      { label: "B (3.0)",  value: "3.0" },
      { label: "B− (2.7)", value: "2.7" },      { label: "C+ (2.3)", value: "2.3" },
      { label: "C (2.0)",  value: "2.0" },      { label: "C− (1.7)", value: "1.7" },
      { label: "D+ (1.3)", value: "1.3" },      { label: "D (1.0)",  value: "1.0" },
      { label: "F (0.0)",  value: "0.0" },
    ]},
    { type: "number", key: "c4", label: "Course 4 Credits", defaultValue: 3, min: 0.5, max: 6, step: 0.5 },
    { type: "toggle", key: "use5", label: "Include Course 5", defaultValue: false },
    { type: "select", key: "g5", label: "Course 5 Grade", defaultValue: "2.7", options: [
      { label: "A+ / A (4.0)", value: "4.0" }, { label: "A− (3.7)", value: "3.7" },
      { label: "B+ (3.3)", value: "3.3" },      { label: "B (3.0)",  value: "3.0" },
      { label: "B− (2.7)", value: "2.7" },      { label: "C+ (2.3)", value: "2.3" },
      { label: "C (2.0)",  value: "2.0" },      { label: "C− (1.7)", value: "1.7" },
      { label: "D+ (1.3)", value: "1.3" },      { label: "D (1.0)",  value: "1.0" },
      { label: "F (0.0)",  value: "0.0" },
    ]},
    { type: "number", key: "c5", label: "Course 5 Credits", defaultValue: 3, min: 0.5, max: 6, step: 0.5 },
    { type: "toggle", key: "use6", label: "Include Course 6", defaultValue: false },
    { type: "select", key: "g6", label: "Course 6 Grade", defaultValue: "2.0", options: [
      { label: "A+ / A (4.0)", value: "4.0" }, { label: "A− (3.7)", value: "3.7" },
      { label: "B+ (3.3)", value: "3.3" },      { label: "B (3.0)",  value: "3.0" },
      { label: "B− (2.7)", value: "2.7" },      { label: "C+ (2.3)", value: "2.3" },
      { label: "C (2.0)",  value: "2.0" },      { label: "C− (1.7)", value: "1.7" },
      { label: "D+ (1.3)", value: "1.3" },      { label: "D (1.0)",  value: "1.0" },
      { label: "F (0.0)",  value: "0.0" },
    ]},
    { type: "number", key: "c6", label: "Course 6 Credits", defaultValue: 2, min: 0.5, max: 6, step: 0.5 },
  ],
  compute(values: InputValues): ComputeResult {
    const courses = [
      { g: "g1", c: "c1", active: true },
      { g: "g2", c: "c2", active: true },
      { g: "g3", c: "c3", active: true },
      { g: "g4", c: "c4", active: Boolean(values.use4) },
      { g: "g5", c: "c5", active: Boolean(values.use5) },
      { g: "g6", c: "c6", active: Boolean(values.use6) },
    ];
    let totalPoints = 0;
    let totalCredits = 0;
    for (const course of courses) {
      if (!course.active) continue;
      const gp = Number(values[course.g]);
      const cr = Number(values[course.c]);
      if (!Number.isFinite(gp) || !Number.isFinite(cr) || cr <= 0) {
        return { outputs: [], error: "Please enter valid grades and credits." };
      }
      totalPoints  += gp * cr;
      totalCredits += cr;
    }
    if (totalCredits === 0) return { outputs: [], error: "Please include at least one course." };
    const gpa = totalPoints / totalCredits;
    const letterGrade = gpa >= 3.7 ? "A" : gpa >= 3.3 ? "A−/B+" : gpa >= 3.0 ? "B" : gpa >= 2.7 ? "B−" : gpa >= 2.0 ? "C" : gpa >= 1.0 ? "D" : "F";
    return {
      outputs: [
        { key: "gpa",           label: "GPA",              value: Math.round(gpa * 1000) / 1000, format: "number", highlight: true },
        { key: "letterGrade",   label: "Letter Grade",     value: letterGrade,                    format: "text"   },
        { key: "totalCredits",  label: "Total Credits",    value: totalCredits,                   format: "number" },
        { key: "qualityPoints", label: "Quality Points",   value: Math.round(totalPoints * 100) / 100, format: "number" },
      ],
    };
  },
  howItWorks: "GPA = Σ(grade points × credits) / Σ(credits). Grade points follow the standard 4.0 scale.",
  relatedSlugs: ["grade-average-calculator"],

  longDescription: "Calculate your semester or cumulative GPA using letter grades and credit hours. Each grade is converted to grade points on the standard 4.0 scale, then weighted by credit hours to produce your overall GPA.",
  examples: [
    { title: "Three courses: A (3 credits), A− (4 credits), B+ (3 credits)", description: "A strong semester.", inputs: { g1: "4.0", c1: 3, g2: "3.7", c2: 4, g3: "3.3", c3: 3 }, result: "GPA ≈ 3.68." },
  ],
  faqs: [
    { question: "Why are credits weighted?", answer: "A 4-credit course contributes more to your GPA than a 1-credit course. Weighting ensures higher-credit courses have proportionally more impact." },
    { question: "Does A+ count differently from A?", answer: "On the standard 4.0 scale both A and A+ receive 4.0 grade points. Some institutions use a 4.3 scale where A+ = 4.3." },
  ],
};

export default def;
