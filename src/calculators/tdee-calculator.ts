import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "tdee-calculator",
  title: "TDEE Calculator",
  shortTitle: "TDEE",
  description: "Calculate your Total Daily Energy Expenditure based on BMR and activity level.",
  longDescription:
    "Total Daily Energy Expenditure (TDEE) is the total number of calories your body burns in a day, accounting for your activity level on top of your resting metabolism. It's the most important number for understanding whether you'll lose, maintain, or gain weight based on your calorie intake.",
  category: "health",
  keywords: ["tdee calculator", "total daily energy expenditure", "calorie needs", "maintenance calories", "activity level"],
  inputs: [
    {
      type: "number",
      key: "bmr",
      label: "BMR (calories/day)",
      defaultValue: 1700,
      min: 1,
      step: 1,
      placeholder: "1700",
      helpText: "Use the BMR Calculator to find your value.",
    },
    {
      type: "select",
      key: "activityMultiplier",
      label: "Activity Level",
      defaultValue: 1.375,
      options: [
        { label: "Sedentary (little or no exercise)", value: 1.2 },
        { label: "Lightly active (1–3 days/week)", value: 1.375 },
        { label: "Moderately active (3–5 days/week)", value: 1.55 },
        { label: "Very active (6–7 days/week)", value: 1.725 },
        { label: "Extra active (physical job or 2x training)", value: 1.9 },
      ],
    },
  ],
  compute(values: InputValues): ComputeResult {
    const bmr = Number(values.bmr);
    const activityMultiplier = Number(values.activityMultiplier);

    if (isNaN(bmr) || isNaN(activityMultiplier) || bmr <= 0 || activityMultiplier <= 0) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const tdee = bmr * activityMultiplier;

    return {
      outputs: [
        {
          key: "tdee",
          label: "Total Daily Energy Expenditure (calories/day)",
          value: Number(tdee.toFixed(0)),
          format: "calories",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "TDEE is calculated by multiplying your BMR by an activity factor (also called the Harris-Benedict activity multiplier). The multiplier ranges from 1.2 (sedentary) to 1.9 (extremely active), scaling your base metabolism to reflect how much you move throughout the day.",
  examples: [
    {
      title: "Office Worker",
      description: "BMR of 1,700 with a sedentary lifestyle.",
      inputs: { bmr: 1700, activityMultiplier: 1.2 },
      result: "TDEE is 2,040 calories/day.",
    },
    {
      title: "Regular Gym-Goer",
      description: "BMR of 1,800 training 4 days per week.",
      inputs: { bmr: 1800, activityMultiplier: 1.55 },
      result: "TDEE is 2,790 calories/day.",
    },
    {
      title: "Athlete",
      description: "BMR of 2,000 with daily intense training.",
      inputs: { bmr: 2000, activityMultiplier: 1.725 },
      result: "TDEE is 3,450 calories/day.",
    },
  ],
  faqs: [
    {
      question: "How do I use TDEE to lose weight?",
      answer: "Eat below your TDEE. A common approach is a 500-calorie daily deficit, which creates roughly 0.5 kg (1 lb) of fat loss per week.",
    },
    {
      question: "Should I eat my TDEE to maintain weight?",
      answer: "Yes. Consuming calories equal to your TDEE will maintain your current body weight over time.",
    },
    {
      question: "How do I find my BMR?",
      answer: "Use the BMR Calculator on this site. Enter your age, weight, height, and biological sex to get your BMR, then plug it in here.",
    },
  ],
  relatedSlugs: ["bmr-calculator", "protein-intake-calculator", "water-intake-by-weight"],
};

export default def;
