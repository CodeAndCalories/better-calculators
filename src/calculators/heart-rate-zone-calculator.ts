import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "heart-rate-zone-calculator",
  title: "Heart Rate Zone Calculator",
  shortTitle: "HR Zones",
  description: "Calculate all five heart rate training zones from your age and resting heart rate.",
  longDescription:
    "Heart rate training zones let you train with precision — from gentle recovery to maximum effort. This calculator uses the Karvonen (Heart Rate Reserve) method to derive personalised zones 1–5, accounting for both your max heart rate and your resting heart rate. Each zone targets a different energy system and fitness adaptation.",
  category: "health",
  keywords: ["heart rate zone calculator", "training zones calculator", "HR zone 1 2 3 4 5", "Karvonen heart rate zones", "cardio training zones"],
  inputs: [
    {
      type: "number",
      key: "age",
      label: "Age",
      defaultValue: 35,
      min: 10,
      max: 100,
      step: 1,
      placeholder: "35",
    },
    {
      type: "number",
      key: "restingHR",
      label: "Resting Heart Rate (bpm)",
      defaultValue: 60,
      min: 30,
      max: 120,
      step: 1,
      placeholder: "60",
      helpText: "Measure first thing in the morning before getting up",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const age = Number(values.age);
    const restingHR = Number(values.restingHR);

    if (
      !Number.isFinite(age) || !Number.isFinite(restingHR) ||
      age <= 0 || restingHR <= 0
    ) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const maxHR = 220 - age;
    const hrr = maxHR - restingHR; // Heart Rate Reserve

    // Karvonen zones: THR = (HRR × intensity%) + resting HR
    // Zone 1: 50–60%, Zone 2: 60–70%, Zone 3: 70–80%, Zone 4: 80–90%, Zone 5: 90–100%
    function zone(lowPct: number, highPct: number): string {
      const low = Math.round(hrr * lowPct + restingHR);
      const high = Math.round(hrr * highPct + restingHR);
      return `${low}–${high} bpm`;
    }

    return {
      outputs: [
        { key: "maxHR", label: "Estimated Max Heart Rate", value: maxHR, format: "number", highlight: true },
        { key: "zone1", label: "Zone 1 — Recovery (50–60%)", value: zone(0.50, 0.60), format: "text" },
        { key: "zone2", label: "Zone 2 — Aerobic Base (60–70%)", value: zone(0.60, 0.70), format: "text" },
        { key: "zone3", label: "Zone 3 — Aerobic Fitness (70–80%)", value: zone(0.70, 0.80), format: "text" },
        { key: "zone4", label: "Zone 4 — Lactate Threshold (80–90%)", value: zone(0.80, 0.90), format: "text" },
        { key: "zone5", label: "Zone 5 — Maximum Effort (90–100%)", value: zone(0.90, 1.00), format: "text" },
      ],
    };
  },

  howItWorks: `Max HR = 220 − age. Heart Rate Reserve (HRR) = max HR − resting HR. Each zone uses the Karvonen formula: zone boundary = (HRR × intensity%) + resting HR. Zone 1: 50–60%, Zone 2: 60–70%, Zone 3: 70–80%, Zone 4: 80–90%, Zone 5: 90–100%.`,

  examples: [
    {
      title: "35 years old, resting HR 60 bpm",
      description: "A typical healthy adult.",
      inputs: { age: 35, restingHR: 60 },
      result: "Max HR 185. Zone 2: ~129–147 bpm. Zone 4: ~166–175 bpm.",
    },
    {
      title: "50 years old, resting HR 55 bpm",
      description: "A fit older adult with a low resting heart rate.",
      inputs: { age: 50, restingHR: 55 },
      result: "Max HR 170. Zones shift lower due to age.",
    },
  ],

  faqs: [
    {
      question: "What zone should I train in most?",
      answer: "Zone 2 (aerobic base) is where most endurance experts recommend spending 70–80% of training time. It builds aerobic capacity with low injury risk. Zone 4–5 should be used sparingly — 1–2 sessions per week.",
    },
    {
      question: "How is this different from the Target Heart Rate Calculator?",
      answer: "The Target Heart Rate Calculator gives a single target for a chosen intensity. This calculator gives all five zones at once for full training plan visibility.",
    },
    {
      question: "Is 220 minus age accurate for everyone?",
      answer: "It's an estimate with a standard deviation of ±10–12 bpm. If you've had a lab or field max HR test, use that value for more accurate zones.",
    },
  ],

  relatedSlugs: ["target-heart-rate-calculator", "calories-burned-walking-calculator", "calories-burned-cycling-calculator", "running-cadence-calculator"],
};

export default def;
