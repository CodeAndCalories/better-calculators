import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "calorie-deficit-calculator",
  title: "Calorie Deficit Calculator",
  shortTitle: "Calorie Deficit",
  description: "Find out how many calories to eat per day to hit your target weight loss rate.",
  longDescription:
    "Enter your Total Daily Energy Expenditure (TDEE) and your desired weekly weight loss. The calculator works backwards from 1 kg of fat ≈ 7,700 calories to give you a precise daily calorie target and deficit.",
  category: "health",
  keywords: ["calorie deficit calculator", "how many calories to lose weight", "weight loss calories", "daily calorie target", "fat loss calculator"],
  inputs: [
    {
      type: "number",
      key: "tdee",
      label: "Your TDEE (Maintenance Calories)",
      suffix: "kcal/day",
      defaultValue: 2500,
      min: 1000,
      max: 6000,
      step: 10,
      placeholder: "2500",
      helpText: "Don't know your TDEE? Use our Calorie Calculator first.",
    },
    {
      type: "number",
      key: "targetLossPerWeekKg",
      label: "Target Weight Loss",
      suffix: "kg/week",
      defaultValue: 0.5,
      min: 0.1,
      max: 1.5,
      step: 0.1,
      placeholder: "0.5",
      helpText: "0.25–0.75 kg/week is considered sustainable.",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const tdee = Number(values.tdee);
    const targetLossPerWeekKg = Number(values.targetLossPerWeekKg);

    if (!Number.isFinite(tdee) || !Number.isFinite(targetLossPerWeekKg) || tdee <= 0 || targetLossPerWeekKg <= 0) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    // 1 kg of fat ≈ 7700 kcal
    const weeklyDeficit = targetLossPerWeekKg * 7700;
    const dailyDeficit = weeklyDeficit / 7;
    const dailyCalories = tdee - dailyDeficit;

    if (dailyCalories < 1000) {
      return {
        outputs: [],
        error: "Your target loss rate requires eating below 1,000 calories/day. Please choose a more gradual goal.",
      };
    }

    return {
      outputs: [
        { key: "dailyCalories", label: "Daily Calorie Target", value: Math.round(dailyCalories), format: "calories", highlight: true },
        { key: "dailyDeficit", label: "Daily Deficit", value: Math.round(dailyDeficit), format: "calories" },
        { key: "weeklyDeficit", label: "Weekly Deficit", value: Math.round(weeklyDeficit), format: "calories" },
      ],
    };
  },

  howItWorks: `One kilogram of body fat contains approximately 7,700 kcal. To lose your target amount per week, you need a weekly deficit of: target kg × 7,700 = weekly deficit. Dividing by 7 gives your daily deficit. Your daily calorie target = TDEE − daily deficit. A minimum floor of 1,000 kcal/day is enforced for safety.`,

  examples: [
    {
      title: "TDEE 2,500 kcal, lose 0.5 kg/week",
      description: "A moderate, sustainable fat loss pace for most people.",
      inputs: { tdee: 2500, targetLossPerWeekKg: 0.5 },
      result: "Daily target: ~1,950 kcal/day with a 550 kcal/day deficit.",
    },
    {
      title: "TDEE 2,000 kcal, lose 0.25 kg/week",
      description: "A gentle deficit suitable for people close to their goal weight.",
      inputs: { tdee: 2000, targetLossPerWeekKg: 0.25 },
      result: "Daily target: ~1,725 kcal/day with a 275 kcal/day deficit.",
    },
  ],

  faqs: [
    {
      question: "How accurate is the 7,700 kcal per kg rule?",
      answer: "It's a well-established approximation. Real fat loss varies based on water retention, muscle gain, and metabolic adaptation. Treat your result as a starting point and adjust after 2–3 weeks of real data.",
    },
    {
      question: "Is it safe to eat below my daily target?",
      answer: "Consistently eating below 1,200–1,500 kcal/day (depending on your size) risks nutrient deficiencies and muscle loss. Aim for a gradual deficit rather than a steep cut.",
    },
    {
      question: "Where do I find my TDEE?",
      answer: "Use our Calorie Calculator to estimate your TDEE from your age, weight, height, sex, and activity level.",
    },
  ],

  relatedSlugs: ["calorie-calculator", "macro-calculator", "bmi-calculator", "lean-body-mass-calculator"],
};

export default def;
