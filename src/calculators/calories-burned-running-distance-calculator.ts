import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "calories-burned-running-distance-calculator",
  title: "Calories Burned Running by Distance Calculator",
  description: "Estimate calories burned running a specific distance based on your weight and pace.",
  longDescription: "Running burns approximately 0.63 calories per pound of body weight per mile (a well-validated rule of thumb). This calculator refines that estimate based on running pace using MET values, giving you calories for any distance.",
  category: "health",
  keywords: ["calories burned running", "running calorie calculator", "calories per mile running", "run distance calories"],
  inputs: [
    { type: "number", key: "weight", label: "Body Weight (lbs)", defaultValue: 160, min: 50, max: 500, step: 1 },
    { type: "number", key: "distance", label: "Distance (miles)", defaultValue: 3, min: 0.1, max: 100, step: 0.1 },
    {
      type: "select",
      key: "pace",
      label: "Running Pace",
      defaultValue: 10,
      options: [
        { label: "Slow jog (12 min/mile)", value: 12 },
        { label: "Easy run (10 min/mile)", value: 10 },
        { label: "Moderate run (9 min/mile)", value: 9 },
        { label: "Tempo run (8 min/mile)", value: 8 },
        { label: "Fast run (7 min/mile)", value: 7 },
        { label: "Race pace (6 min/mile)", value: 6 },
      ],
    },
  ],
  compute(values: InputValues): ComputeResult {
    const weightLbs = Number(values.weight);
    const distance = Number(values.distance);
    const paceMinPerMile = Number(values.pace);
    if (isNaN(weightLbs) || isNaN(distance) || weightLbs <= 0 || distance <= 0) {
      return { outputs: [], error: "Please enter valid positive values." };
    }
    const weightKg = weightLbs * 0.453592;
    // MET values by pace (min/mile)
    const metMap: Record<number, number> = { 12: 8.0, 10: 9.8, 9: 10.5, 8: 11.8, 7: 12.8, 6: 14.5 };
    const met = metMap[paceMinPerMile] ?? 10.0;
    const totalMinutes = distance * paceMinPerMile;
    const hours = totalMinutes / 60;
    const calories = met * weightKg * hours;
    const caloriesPerMile = calories / distance;
    return {
      outputs: [
        { key: "calories", label: "Total Calories Burned", value: Math.round(calories), format: "calories", highlight: true },
        { key: "caloriesPerMile", label: "Calories Per Mile", value: Math.round(caloriesPerMile), format: "number" },
        { key: "duration", label: "Estimated Run Time (minutes)", value: Math.round(totalMinutes), format: "number" },
        { key: "weightFactor", label: "Body Weight Used (lbs)", value: weightLbs, format: "number" },
      ],
    };
  },
  howItWorks: "Calories = MET × weight (kg) × time (hours). Duration = distance × pace. MET increases with speed, ranging from 8.0 (12 min/mile jog) to 14.5 (6 min/mile racing pace).",
  examples: [
    {
      title: "3-mile easy run",
      description: "160 lbs, 3 miles, 10 min/mile pace.",
      inputs: { weight: 160, distance: 3, pace: 10 },
      result: "~353 calories in 30 minutes (~118 per mile).",
    },
    {
      title: "Half marathon",
      description: "150 lbs, 13.1 miles, 9 min/mile.",
      inputs: { weight: 150, distance: 13.1, pace: 9 },
      result: "~1,380 calories in ~1 hr 58 min.",
    },
  ],
  faqs: [
    { question: "Why do heavier runners burn more calories?", answer: "More mass requires more energy to move. A heavier runner burns proportionally more calories per mile at the same pace." },
    { question: "Does running outside vs treadmill make a difference?", answer: "Running outside typically burns slightly more calories due to wind resistance and terrain variation, but the difference is small (5–10%)." },
  ],
  relatedSlugs: ["calories-burned-walking-calculator", "target-weight-loss-calculator", "daily-water-by-weight-calculator"],
};

export default def;
