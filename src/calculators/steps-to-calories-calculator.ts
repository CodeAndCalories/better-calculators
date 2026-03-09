import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "steps-to-calories-calculator",
  title: "Steps to Calories Calculator",
  shortTitle: "Steps to Calories",
  description: "Convert your daily step count to calories burned.",
  longDescription: "On average, 2,000 steps burn roughly 100 calories, though this varies by weight and stride. This calculator estimates calories burned from steps using a weight-adjusted formula.",
  category: "health",
  keywords: ["steps to calories", "walking calories", "step counter calories", "pedometer calories"],
  inputs: [
    { type: "number", key: "steps", label: "Number of Steps", defaultValue: 10000, min: 0, step: 500, placeholder: "10000" },
    { type: "number", key: "weightKg", label: "Body Weight (kg)", defaultValue: 70, min: 30, step: 0.5, placeholder: "70" },
  ],
  compute(values: InputValues): ComputeResult {
    const steps = Number(values.steps);
    const weightKg = Number(values.weightKg);
    if (isNaN(steps) || isNaN(weightKg) || steps < 0 || weightKg <= 0) {
      return { outputs: [], error: "Please enter valid values." };
    }
    // ~0.04 kcal per step per 70kg, scaled by weight
    const calories = steps * 0.04 * (weightKg / 70);
    return {
      outputs: [
        { key: "calories", label: "Estimated Calories Burned (kcal)", value: Number(calories.toFixed(1)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Uses an average of ~0.04 kcal per step at 70 kg body weight, scaled proportionally for other weights.",
  examples: [
    {
      title: "10,000 Steps",
      description: "70 kg person walking 10,000 steps.",
      inputs: { steps: 10000, weightKg: 70 },
      result: "Approximately 400 calories burned.",
    },
    {
      title: "5,000 Steps",
      description: "80 kg person walking 5,000 steps.",
      inputs: { steps: 5000, weightKg: 80 },
      result: "Approximately 229 calories burned.",
    },
  ],
  faqs: [
    { question: "How many steps equal 1 mile?", answer: "Approximately 2,000 steps equal 1 mile for an average adult." },
    { question: "How accurate is this estimate?", answer: "It is an estimate. Actual calories depend on pace, terrain, age, and fitness level." },
    { question: "What is the 10,000 steps goal from?", answer: "It originated from a 1960s Japanese pedometer marketing campaign, but research supports it as a good daily activity target." },
  ],
  relatedSlugs: ["steps-to-miles-calculator", "calories-burned-walking-calculator"],
};

export default def;
