import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "daily-water-by-weight-calculator",
  title: "Daily Water Intake by Body Weight Calculator",
  description: "Calculate your recommended daily water intake based on your body weight and activity level.",
  longDescription: "A common method for determining daily water needs is to drink half your body weight in ounces. Activity level and climate increase these needs. This calculator provides a personalised water goal based on your weight and how active you are.",
  category: "health",
  keywords: ["water intake by weight", "daily water goal", "how much water should I drink", "hydration calculator weight"],
  inputs: [
    { type: "number", key: "weight", label: "Body Weight (lbs)", defaultValue: 160, min: 50, max: 500, step: 1 },
    {
      type: "select",
      key: "activity",
      label: "Activity Level",
      defaultValue: 0,
      options: [
        { label: "Sedentary (little/no exercise)", value: 0 },
        { label: "Light (1–3 days/week)", value: 8 },
        { label: "Moderate (3–5 days/week)", value: 16 },
        { label: "Active (6–7 days/week)", value: 24 },
        { label: "Very Active (twice daily training)", value: 32 },
      ],
    },
  ],
  compute(values: InputValues): ComputeResult {
    const weight = Number(values.weight);
    const activityOz = Number(values.activity);
    if (isNaN(weight) || weight <= 0) return { outputs: [], error: "Please enter a valid body weight." };
    const baseOz = weight / 2;
    const totalOz = baseOz + activityOz;
    const totalLiters = totalOz * 0.02957;
    const cups = totalOz / 8;
    return {
      outputs: [
        { key: "totalOz", label: "Daily Water Goal (oz)", value: Math.round(totalOz), format: "number", highlight: true },
        { key: "liters", label: "Daily Water Goal (liters)", value: Number(totalLiters.toFixed(2)), format: "liters" },
        { key: "cups", label: "Daily Water Goal (cups)", value: Number(cups.toFixed(1)), format: "number" },
        { key: "baseOz", label: "Base Recommendation (without activity)", value: Math.round(baseOz), format: "number" },
      ],
    };
  },
  howItWorks: "Base recommendation = weight (lbs) ÷ 2 = ounces per day. Additional ounces are added based on activity level. Convert to liters by multiplying ounces by 0.02957.",
  examples: [
    {
      title: "Moderately active person",
      description: "160 lbs, moderate activity.",
      inputs: { weight: 160, activity: 16 },
      result: "Base 80 oz + 16 oz activity = 96 oz (2.84 liters, 12 cups).",
    },
    {
      title: "Sedentary person",
      description: "140 lbs, sedentary.",
      inputs: { weight: 140, activity: 0 },
      result: "70 oz (2.07 liters, ~8.75 cups).",
    },
  ],
  faqs: [
    { question: "Is the half-your-weight formula accurate?", answer: "It is a useful starting estimate. Individual needs vary with climate, health conditions, and diet (water-rich foods reduce drinking needs)." },
    { question: "Can I drink too much water?", answer: "Yes, though rare. Overhydration (hyponatremia) can occur with extreme water intake. Stick to recommended ranges unless instructed otherwise by a doctor." },
  ],
  relatedSlugs: ["hydration-reminder-calculator", "calories-burned-walking-calculator", "target-weight-loss-calculator"],
};

export default def;
