import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "target-weight-loss-calculator",
  title: "Target Weight Loss Calculator",
  description: "Calculate how long it will take to reach your target weight based on your daily calorie deficit.",
  longDescription: "Losing approximately one pound of fat requires a deficit of about 3,500 calories. Enter your current weight, goal weight, and daily calorie deficit to see how many weeks and months it will take to reach your target.",
  category: "health",
  keywords: ["weight loss calculator", "how long to lose weight", "calorie deficit weight loss", "target weight calculator"],
  inputs: [
    { type: "number", key: "currentWeight", label: "Current Weight (lbs)", defaultValue: 185, min: 50, max: 600, step: 1 },
    { type: "number", key: "targetWeight", label: "Target Weight (lbs)", defaultValue: 160, min: 50, max: 600, step: 1 },
    { type: "number", key: "dailyDeficit", label: "Daily Calorie Deficit", defaultValue: 500, min: 50, max: 2000, step: 50, suffix: "cal" },
  ],
  compute(values: InputValues): ComputeResult {
    const current = Number(values.currentWeight);
    const target = Number(values.targetWeight);
    const deficit = Number(values.dailyDeficit);
    if (isNaN(current) || isNaN(target) || isNaN(deficit) || current <= 0 || target <= 0 || deficit <= 0) {
      return { outputs: [], error: "Please enter valid positive values." };
    }
    if (target >= current) return { outputs: [], error: "Target weight must be less than current weight for a weight loss calculation." };
    const lbsToLose = current - target;
    const totalCalorieDeficit = lbsToLose * 3500;
    const days = totalCalorieDeficit / deficit;
    const weeks = days / 7;
    const months = days / 30.44;
    const weeklyLoss = (deficit * 7) / 3500;
    return {
      outputs: [
        { key: "months", label: "Estimated Time to Goal (months)", value: Number(months.toFixed(1)), format: "number", highlight: true },
        { key: "weeks", label: "Estimated Time to Goal (weeks)", value: Math.round(weeks), format: "number" },
        { key: "weeklyLoss", label: "Estimated Weekly Weight Loss (lbs)", value: Number(weeklyLoss.toFixed(2)), format: "number" },
        { key: "lbsToLose", label: "Total Weight to Lose (lbs)", value: lbsToLose, format: "number" },
      ],
    };
  },
  howItWorks: "3,500 calories ≈ 1 lb of fat. Total calories to burn = lbs to lose × 3,500. Days = total calories ÷ daily deficit. Weekly loss = (deficit × 7) ÷ 3,500.",
  examples: [
    {
      title: "25 lbs in 6 months",
      description: "185 lbs to 160 lbs, 500 cal/day deficit.",
      inputs: { currentWeight: 185, targetWeight: 160, dailyDeficit: 500 },
      result: "25 lbs × 3,500 = 87,500 cal deficit needed. ~25 weeks (~5.8 months) at 1 lb/week.",
    },
    {
      title: "Aggressive deficit",
      description: "200 lbs to 180 lbs, 750 cal/day deficit.",
      inputs: { currentWeight: 200, targetWeight: 180, dailyDeficit: 750 },
      result: "~93 days (~13.3 weeks) at ~1.5 lbs/week.",
    },
  ],
  faqs: [
    { question: "Is a 500-calorie daily deficit safe?", answer: "Yes, for most healthy adults. A 500 cal/day deficit creates roughly 1 lb/week weight loss, which is within the generally recommended range of 0.5–2 lbs per week." },
    { question: "Why does weight loss slow over time?", answer: "As you lose weight, your body requires fewer calories to function. Your TDEE decreases, meaning the same calorie intake creates a smaller deficit over time." },
  ],
  relatedSlugs: ["calories-burned-walking-calculator", "calories-burned-running-distance-calculator", "daily-water-by-weight-calculator"],
};

export default def;
