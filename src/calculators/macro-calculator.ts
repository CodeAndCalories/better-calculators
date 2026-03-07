import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "macro-calculator",
  title: "Macro Calculator",
  shortTitle: "Macros",
  description: "Calculate your daily protein, carbs, and fat targets based on your body stats, activity level, and goal.",
  longDescription:
    "Uses the Mifflin-St Jeor equation to estimate your BMR, then applies an activity multiplier to find your TDEE. A calorie adjustment is applied based on your goal (lose, maintain, or gain), and your macros are split using goal-specific ratios for optimal results.",
  category: "health",
  keywords: ["macro calculator", "macronutrient calculator", "protein carbs fat calculator", "TDEE macros", "diet macros"],
  inputs: [
    {
      type: "select",
      key: "sex",
      label: "Biological Sex",
      defaultValue: "male",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
    },
    {
      type: "number",
      key: "age",
      label: "Age",
      suffix: "years",
      defaultValue: 30,
      min: 15,
      max: 80,
      step: 1,
      placeholder: "30",
    },
    {
      type: "number",
      key: "weightKg",
      label: "Weight",
      suffix: "kg",
      defaultValue: 75,
      min: 30,
      max: 300,
      step: 0.1,
      placeholder: "75",
    },
    {
      type: "number",
      key: "heightCm",
      label: "Height",
      suffix: "cm",
      defaultValue: 175,
      min: 100,
      max: 250,
      step: 1,
      placeholder: "175",
    },
    {
      type: "select",
      key: "activityLevel",
      label: "Activity Level",
      defaultValue: "1.375",
      options: [
        { label: "Sedentary (little or no exercise)", value: "1.2" },
        { label: "Lightly active (1–3 days/week)", value: "1.375" },
        { label: "Moderately active (3–5 days/week)", value: "1.55" },
        { label: "Very active (6–7 days/week)", value: "1.725" },
        { label: "Super active (physical job or 2x training)", value: "1.9" },
      ],
    },
    {
      type: "select",
      key: "goal",
      label: "Goal",
      defaultValue: "maintain",
      options: [
        { label: "Lose weight", value: "lose" },
        { label: "Maintain weight", value: "maintain" },
        { label: "Gain weight", value: "gain" },
      ],
    },
  ],

  compute(values: InputValues): ComputeResult {
    const sex = values.sex as string;
    const age = Number(values.age);
    const weightKg = Number(values.weightKg);
    const heightCm = Number(values.heightCm);
    const activityMultiplier = Number(values.activityLevel);
    const goal = values.goal as string;

    if (
      !Number.isFinite(age) || !Number.isFinite(weightKg) ||
      !Number.isFinite(heightCm) || !Number.isFinite(activityMultiplier) ||
      weightKg <= 0 || heightCm <= 0 || age <= 0
    ) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    // Mifflin-St Jeor BMR
    const bmr =
      sex === "male"
        ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
        : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

    const tdee = bmr * activityMultiplier;

    // Calorie adjustment by goal
    let targetCalories: number;
    if (goal === "lose") {
      targetCalories = tdee - 500;
    } else if (goal === "gain") {
      targetCalories = tdee + 300;
    } else {
      targetCalories = tdee;
    }

    // Macro splits by goal (% of calories)
    // lose:     protein 35%, fat 30%, carbs 35%
    // maintain: protein 30%, fat 30%, carbs 40%
    // gain:     protein 25%, fat 25%, carbs 50%
    let proteinPct: number;
    let fatPct: number;
    let carbsPct: number;

    if (goal === "lose") {
      proteinPct = 0.35;
      fatPct = 0.30;
      carbsPct = 0.35;
    } else if (goal === "gain") {
      proteinPct = 0.25;
      fatPct = 0.25;
      carbsPct = 0.50;
    } else {
      proteinPct = 0.30;
      fatPct = 0.30;
      carbsPct = 0.40;
    }

    // protein & carbs = 4 kcal/g, fat = 9 kcal/g
    const proteinGrams = Math.round((targetCalories * proteinPct) / 4);
    const fatGrams = Math.round((targetCalories * fatPct) / 9);
    const carbsGrams = Math.round((targetCalories * carbsPct) / 4);

    return {
      outputs: [
        { key: "calories", label: "Daily Calorie Target", value: Math.round(targetCalories), format: "calories", highlight: true },
        { key: "protein", label: "Protein (g)", value: proteinGrams, format: "number" },
        { key: "carbs", label: "Carbohydrates (g)", value: carbsGrams, format: "number" },
        { key: "fat", label: "Fat (g)", value: fatGrams, format: "number" },
        { key: "tdee", label: "TDEE (Maintenance Calories)", value: Math.round(tdee), format: "calories" },
      ],
    };
  },

  howItWorks: `BMR is calculated using the Mifflin-St Jeor equation: Men: 10W + 6.25H − 5A + 5 / Women: 10W + 6.25H − 5A − 161 (W = kg, H = cm, A = years). TDEE = BMR × activity multiplier. Goal adjustment: −500 kcal for weight loss, +300 kcal for weight gain. Macros are split by goal — lose: 35% protein / 30% fat / 35% carbs; maintain: 30/30/40; gain: 25/25/50. Protein and carbs = 4 kcal/g, fat = 9 kcal/g.`,

  examples: [
    {
      title: "75 kg male, 175 cm, 30 years, lightly active, lose weight",
      description: "A common scenario for someone looking to lose fat while preserving muscle.",
      inputs: { sex: "male", age: 30, weightKg: 75, heightCm: 175, activityLevel: "1.375", goal: "lose" },
      result: "~1,950 cal/day — ~170g protein, ~170g carbs, ~65g fat.",
    },
    {
      title: "60 kg female, 165 cm, 26 years, moderately active, maintain",
      description: "Maintenance macros for an active young woman.",
      inputs: { sex: "female", age: 26, weightKg: 60, heightCm: 165, activityLevel: "1.55", goal: "maintain" },
      result: "~2,100 cal/day — ~158g protein, ~210g carbs, ~70g fat.",
    },
  ],

  faqs: [
    {
      question: "What macro split should I use to lose weight?",
      answer: "Higher protein helps preserve muscle during a deficit. This calculator uses 35% protein, 30% fat, and 35% carbs for weight loss — a well-supported starting point.",
    },
    {
      question: "Why are my macros different from another calculator?",
      answer: "Macro splits vary between calculators. There is no single correct answer. This calculator uses goal-specific splits based on commonly cited sports nutrition guidelines.",
    },
    {
      question: "Should I hit macros exactly every day?",
      answer: "Hitting your targets consistently over the week matters more than perfection each day. Focus on your weekly average.",
    },
  ],

  relatedSlugs: ["calorie-calculator", "calorie-deficit-calculator", "lean-body-mass-calculator", "bmi-calculator"],
};

export default def;
