import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "one-rep-max-calculator",
  title: "One Rep Max Calculator",
  shortTitle: "1RM Calculator",
  description: "Estimate your one-rep max (1RM) for any lift from a weight and rep count.",
  longDescription:
    "Your one-rep maximum (1RM) is the most weight you can lift for a single rep. This calculator estimates it from a submaximal set using the Epley formula — the most widely used method in strength training. It also calculates common training percentages so you can programme your workouts.",
  category: "health",
  keywords: ["one rep max calculator", "1RM calculator", "max lift calculator", "strength training calculator", "Epley formula"],
  inputs: [
    {
      type: "number",
      key: "weight",
      label: "Weight Lifted",
      defaultValue: 100,
      min: 1,
      step: 1,
      placeholder: "100",
      helpText: "kg or lbs — units are consistent in the result",
    },
    {
      type: "number",
      key: "reps",
      label: "Reps Performed",
      defaultValue: 5,
      min: 1,
      max: 30,
      step: 1,
      placeholder: "5",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const weight = Number(values.weight);
    const reps = Number(values.reps);

    if (!Number.isFinite(weight) || !Number.isFinite(reps) || weight <= 0 || reps < 1 || !Number.isInteger(reps)) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    if (reps === 1) {
      // Actual 1RM entered directly
      return {
        outputs: [
          { key: "oneRepMax", label: "Estimated 1RM", value: weight, format: "number", highlight: true },
          { key: "pct90", label: "90% (heavy singles)", value: Math.round(weight * 0.9 * 10) / 10, format: "number" },
          { key: "pct80", label: "80% (3–5 rep range)", value: Math.round(weight * 0.8 * 10) / 10, format: "number" },
          { key: "pct70", label: "70% (8–10 rep range)", value: Math.round(weight * 0.7 * 10) / 10, format: "number" },
          { key: "pct60", label: "60% (12–15 rep range)", value: Math.round(weight * 0.6 * 10) / 10, format: "number" },
        ],
      };
    }

    // Epley formula: 1RM = weight × (1 + reps / 30)
    const oneRepMax = weight * (1 + reps / 30);

    return {
      outputs: [
        { key: "oneRepMax", label: "Estimated 1RM", value: Math.round(oneRepMax * 10) / 10, format: "number", highlight: true },
        { key: "pct90", label: "90% (heavy singles)", value: Math.round(oneRepMax * 0.9 * 10) / 10, format: "number" },
        { key: "pct80", label: "80% (3–5 rep range)", value: Math.round(oneRepMax * 0.8 * 10) / 10, format: "number" },
        { key: "pct70", label: "70% (8–10 rep range)", value: Math.round(oneRepMax * 0.7 * 10) / 10, format: "number" },
        { key: "pct60", label: "60% (12–15 rep range)", value: Math.round(oneRepMax * 0.6 * 10) / 10, format: "number" },
      ],
    };
  },

  howItWorks: `Uses the Epley formula: 1RM = weight × (1 + reps ÷ 30). This is the most common formula in strength training and is accurate for most lifters in the 2–10 rep range. Estimates become less reliable beyond 10 reps. Training percentages are standard intensity zones used in powerlifting and strength programming.`,

  examples: [
    {
      title: "100 kg for 5 reps",
      description: "A typical working set for an intermediate lifter.",
      inputs: { weight: 100, reps: 5 },
      result: "Estimated 1RM ~117 kg.",
    },
    {
      title: "225 lbs for 3 reps",
      description: "A heavy triple on the bench press.",
      inputs: { weight: 225, reps: 3 },
      result: "Estimated 1RM ~247 lbs.",
    },
  ],

  faqs: [
    {
      question: "How accurate is the Epley formula?",
      answer: "It's a reliable estimate for most people in the 2–10 rep range. Accuracy decreases above 10 reps. Actual 1RM can differ based on technique, fatigue, and individual strength curves.",
    },
    {
      question: "Should I ever attempt my 1RM?",
      answer: "Max attempts are high-risk unless you are an experienced lifter with a spotter. For most people, using a calculated estimate from a heavy set is safer and practical enough for programming.",
    },
  ],

  relatedSlugs: ["target-heart-rate-calculator", "calorie-calculator", "lean-body-mass-calculator"],
};

export default def;
