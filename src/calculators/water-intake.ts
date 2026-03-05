import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "water-intake-calculator",
  title: "Water Intake Calculator",
  shortTitle: "Water Intake",
  description: "Calculate your recommended daily water intake based on your weight, activity level, and climate.",
  longDescription: "Proper hydration is essential for health, metabolism, and performance. Our water intake calculator uses your body weight and activity level to give a personalized daily water recommendation in both liters and fluid ounces.",
  category: "health",
  keywords: ["water intake calculator", "how much water should I drink", "daily water calculator", "hydration calculator"],
  inputs: [
    { type: "select", key: "units", label: "Units", defaultValue: "imperial", options: [
      { label: "Imperial (lbs)", value: "imperial" },
      { label: "Metric (kg)", value: "metric" },
    ]},
    { type: "number", key: "weight", label: "Body Weight", defaultValue: 170, min: 50, step: 1, placeholder: "170", helpText: "lbs or kg" },
    { type: "select", key: "activity", label: "Activity Level", defaultValue: "moderate", options: [
      { label: "Sedentary (desk job, little exercise)", value: "sedentary" },
      { label: "Moderate (exercise 3–4x/week)", value: "moderate" },
      { label: "Active (exercise 5–7x/week)", value: "active" },
      { label: "Very Active (athlete or physical labor)", value: "very_active" },
    ]},
    { type: "select", key: "climate", label: "Climate", defaultValue: "temperate", options: [
      { label: "Cool / Temperate", value: "temperate" },
      { label: "Hot / Humid", value: "hot" },
    ]},
  ],
  compute(values: InputValues): ComputeResult {
    const units = values.units as string;
    const activity = values.activity as string;
    const climate = values.climate as string;

    let weightLbs: number;
    if (units === "imperial") {
      weightLbs = Number(values.weight);
    } else {
      weightLbs = Number(values.weight) * 2.20462;
    }

    // Base: 0.5 oz per lb of body weight
    let baseOz = weightLbs * 0.5;

    // Activity adjustments
    const activityAdd: Record<string, number> = {
      sedentary: 0,
      moderate: 12,
      active: 24,
      very_active: 36,
    };
    baseOz += activityAdd[activity] || 0;

    // Climate adjustment
    if (climate === "hot") baseOz += 16;

    const totalLiters = baseOz * 0.0295735;
    const totalCups = baseOz / 8;

    return {
      outputs: [
        { key: "liters", label: "Daily Water Intake (Liters)", value: totalLiters, format: "liters", highlight: true },
        { key: "oz", label: "Daily Water Intake (fl oz)", value: baseOz, format: "oz" },
        { key: "cups", label: "Cups of Water (8 fl oz each)", value: totalCups, format: "number" },
      ],
    };
  },
  howItWorks: `The base recommendation is 0.5 fl oz of water per pound of body weight per day. We add 12 oz for moderate activity, 24 oz for active, and 36 oz for very active individuals. Hot or humid climates add an additional 16 oz. Convert to liters by multiplying fl oz by 0.0296.`,
  examples: [
    {
      title: "170 lbs, Moderate Activity, Temperate",
      description: "A typical person with a moderate exercise routine.",
      inputs: { units: "imperial", weight: 170, activity: "moderate", climate: "temperate" },
      result: "About 2.4 liters (97 fl oz) per day.",
    },
    {
      title: "80 kg, Very Active, Hot Climate",
      description: "An athlete training in a warm environment.",
      inputs: { units: "metric", weight: 80, activity: "very_active", climate: "hot" },
      result: "About 4.2 liters (141 fl oz) per day.",
    },
  ],
  faqs: [
    { question: "Does coffee or tea count toward water intake?", answer: "Yes — caffeinated beverages are mildly diuretic but still contribute to your overall hydration. Water, herbal teas, and other non-alcoholic beverages all count." },
    { question: "Is the 8 glasses a day rule accurate?", answer: "The '8×8' rule (eight 8-oz glasses) is a rough approximation. Actual needs vary significantly based on body size, activity, climate, and diet. Our calculator provides a more personalized estimate." },
    { question: "What are signs of dehydration?", answer: "Common signs include dark yellow urine, dry mouth, fatigue, headaches, and dizziness. Pale yellow urine typically indicates adequate hydration." },
  ],
  relatedSlugs: ["bmi-calculator", "calorie-calculator", "age-calculator"],
};

export default def;
