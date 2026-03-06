import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "protein-intake-calculator",
  title: "Daily Protein Intake Calculator",
  shortTitle: "Protein Intake",
  description: "Calculate your recommended daily protein intake based on weight and activity level.",
  longDescription:
    "Protein is essential for muscle repair, immune function, hormone production, and nearly every process in the human body. The optimal daily intake varies significantly based on how active you are. Sedentary individuals need far less protein than athletes or those engaged in regular strength training.",
  category: "health",
  keywords: ["protein intake calculator", "daily protein", "how much protein", "protein needs", "macros calculator"],
  inputs: [
    {
      type: "number",
      key: "weightKg",
      label: "Weight (kg)",
      defaultValue: 75,
      min: 1,
      step: 0.1,
      placeholder: "75",
    },
    {
      type: "select",
      key: "activityLevel",
      label: "Activity Level",
      defaultValue: "moderate",
      options: [
        { label: "Sedentary (desk job, minimal exercise)", value: "sedentary" },
        { label: "Lightly active (light exercise 1–3x/week)", value: "light" },
        { label: "Moderately active (exercise 3–5x/week)", value: "moderate" },
        { label: "Very active (intense exercise 6–7x/week)", value: "active" },
        { label: "Athlete / Heavy training", value: "athlete" },
      ],
    },
  ],
  compute(values: InputValues): ComputeResult {
    const weightKg = Number(values.weightKg);
    const activityLevel = String(values.activityLevel);

    if (isNaN(weightKg) || weightKg <= 0) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    // Grams of protein per kg of body weight by activity level
    const multipliers: Record<string, number> = {
      sedentary: 0.8,
      light: 1.1,
      moderate: 1.4,
      active: 1.8,
      athlete: 2.2,
    };

    const multiplier = multipliers[activityLevel] ?? 1.4;
    const proteinGrams = weightKg * multiplier;

    return {
      outputs: [
        {
          key: "proteinGrams",
          label: "Daily Protein (grams)",
          value: Number(proteinGrams.toFixed(0)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator multiplies your weight in kilograms by a protein factor (g/kg) that scales with your activity level — from 0.8 g/kg for sedentary individuals (per WHO/RDA guidelines) up to 2.2 g/kg for athletes in heavy training (per sports nutrition research).",
  examples: [
    {
      title: "Sedentary Adult",
      description: "A 70 kg person with a desk job and minimal exercise.",
      inputs: { weightKg: 70, activityLevel: "sedentary" },
      result: "Recommended intake is 56 grams of protein per day.",
    },
    {
      title: "Regular Gym-Goer",
      description: "A 75 kg person training 4 days per week.",
      inputs: { weightKg: 75, activityLevel: "moderate" },
      result: "Recommended intake is 105 grams of protein per day.",
    },
    {
      title: "Competitive Athlete",
      description: "A 85 kg athlete in heavy daily training.",
      inputs: { weightKg: 85, activityLevel: "athlete" },
      result: "Recommended intake is 187 grams of protein per day.",
    },
  ],
  faqs: [
    {
      question: "Can I eat too much protein?",
      answer: "For healthy individuals, high protein intakes are generally safe. However, very high intakes (above 3 g/kg) offer no added benefit and may stress the kidneys in people with pre-existing conditions.",
    },
    {
      question: "Should I base this on my current weight or goal weight?",
      answer: "If you are cutting calories to lose fat, using your goal weight can help avoid overcalculating protein needs during a deficit.",
    },
    {
      question: "What are good sources of protein?",
      answer: "Lean meats, fish, eggs, dairy, legumes, tofu, and protein supplements (whey, casein, pea) are all effective sources for hitting your daily target.",
    },
  ],
  relatedSlugs: ["bmr-calculator", "tdee-calculator", "water-intake-by-weight"],
};

export default def;
