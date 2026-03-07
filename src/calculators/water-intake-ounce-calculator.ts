import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "water-intake-ounce-calculator",
  title: "Water Intake Calculator (oz)",
  shortTitle: "Water Intake (oz)",
  description: "Calculate your recommended daily water intake in fluid ounces based on weight and activity level.",
  longDescription:
    "Proper hydration is foundational to health, performance, and recovery. This calculator estimates your daily water needs in fluid ounces using a weight-based formula, adjusted for activity level and climate. It also shows the equivalent in glasses, litres, and millilitres.",
  category: "health",
  keywords: ["water intake calculator ounces", "how much water should I drink oz", "daily water intake oz", "hydration calculator", "water intake by weight"],
  inputs: [
    {
      type: "number",
      key: "weightLbs",
      label: "Body Weight (lbs)",
      defaultValue: 160,
      min: 50,
      max: 600,
      step: 1,
      placeholder: "160",
    },
    {
      type: "select",
      key: "activityLevel",
      label: "Activity Level",
      defaultValue: "moderate",
      options: [
        { label: "Sedentary (little or no exercise)", value: "sedentary" },
        { label: "Lightly active (1–3 days/week)", value: "light" },
        { label: "Moderately active (3–5 days/week)", value: "moderate" },
        { label: "Very active (6–7 days/week)", value: "active" },
        { label: "Athlete / intense daily training", value: "athlete" },
      ],
    },
    {
      type: "select",
      key: "climate",
      label: "Climate",
      defaultValue: "temperate",
      options: [
        { label: "Cool / temperate", value: "temperate" },
        { label: "Hot or humid", value: "hot" },
      ],
    },
  ],

  compute(values: InputValues): ComputeResult {
    const weightLbs = Number(values.weightLbs);
    const activityLevel = values.activityLevel as string;
    const climate = values.climate as string;

    if (!Number.isFinite(weightLbs) || weightLbs <= 0) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    // Base: 0.5 oz per lb of body weight (common clinical guideline)
    let baseOz = weightLbs * 0.5;

    // Activity multiplier
    const activityAddOz: Record<string, number> = {
      sedentary: 0,
      light:     8,
      moderate:  12,
      active:    16,
      athlete:   24,
    };
    baseOz += activityAddOz[activityLevel] ?? 0;

    // Climate adjustment
    if (climate === "hot") {
      baseOz += 16;
    }

    const glasses8oz = Math.round(baseOz / 8 * 10) / 10;
    const litres = Math.round((baseOz * 29.5735) / 1000 * 100) / 100;
    const ml = Math.round(baseOz * 29.5735);

    return {
      outputs: [
        { key: "dailyOz", label: "Daily Water Intake (fl oz)", value: Math.round(baseOz), format: "number", highlight: true },
        { key: "glasses", label: "8 oz Glasses per Day", value: glasses8oz, format: "number" },
        { key: "litres", label: "Litres per Day", value: litres, format: "number" },
        { key: "ml", label: "Millilitres per Day", value: ml, format: "number" },
      ],
    };
  },

  howItWorks: `Base intake = body weight (lbs) × 0.5 fl oz. Activity adjustments: Lightly active +8 oz, Moderately active +12 oz, Very active +16 oz, Athlete +24 oz. Hot/humid climate adds +16 oz. All conversions: 1 fl oz = 29.57 ml.`,

  examples: [
    {
      title: "160 lbs, moderately active, temperate climate",
      description: "A typical healthy adult.",
      inputs: { weightLbs: 160, activityLevel: "moderate", climate: "temperate" },
      result: "~92 fl oz/day — about 11.5 glasses or 2.7 litres.",
    },
    {
      title: "200 lbs, athlete, hot climate",
      description: "A larger person training intensely in heat.",
      inputs: { weightLbs: 200, activityLevel: "athlete", climate: "hot" },
      result: "~140 fl oz/day — about 17.5 glasses or 4.1 litres.",
    },
  ],

  faqs: [
    {
      question: "Does this include water from food?",
      answer: "No — this is a target for fluids you drink. Roughly 20% of daily water intake typically comes from food (fruits, vegetables, soups). You can subtract ~16–20 oz if you eat a high-water-content diet.",
    },
    {
      question: "Is the 8 glasses per day rule accurate?",
      answer: "It's a rough approximation. Individual needs vary significantly based on body size, activity, climate, and diet. A weight-based formula like this one is more personalised.",
    },
  ],

  relatedSlugs: ["calorie-calculator", "calories-burned-walking-calculator", "calories-burned-cycling-calculator"],
};

export default def;
