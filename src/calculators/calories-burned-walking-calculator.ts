import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "calories-burned-walking-calculator",
  title: "Calories Burned Walking Calculator",
  shortTitle: "Walking Calories",
  description: "Estimate calories burned walking based on your weight, distance, and pace.",
  longDescription:
    "Walking is one of the most accessible forms of exercise. This calculator estimates calories burned using MET (Metabolic Equivalent of Task) values for different walking speeds. Enter your body weight, distance walked, and average pace to get an accurate calorie estimate.",
  category: "health",
  keywords: ["calories burned walking calculator", "walking calorie calculator", "how many calories walking", "steps calories burned", "walking exercise calories"],
  inputs: [
    {
      type: "number",
      key: "weightKg",
      label: "Body Weight (kg)",
      defaultValue: 70,
      min: 20,
      max: 300,
      step: 0.5,
      placeholder: "70",
    },
    {
      type: "number",
      key: "distanceKm",
      label: "Distance (km)",
      defaultValue: 5,
      min: 0.1,
      max: 100,
      step: 0.1,
      placeholder: "5",
    },
    {
      type: "select",
      key: "pace",
      label: "Walking Pace",
      defaultValue: "moderate",
      options: [
        { label: "Slow (< 3 km/h)", value: "slow" },
        { label: "Leisurely (3 km/h)", value: "leisurely" },
        { label: "Moderate (4–5 km/h)", value: "moderate" },
        { label: "Brisk (5–6 km/h)", value: "brisk" },
        { label: "Fast (> 6 km/h)", value: "fast" },
      ],
    },
  ],

  compute(values: InputValues): ComputeResult {
    const weightKg = Number(values.weightKg);
    const distanceKm = Number(values.distanceKm);
    const pace = values.pace as string;

    if (
      !Number.isFinite(weightKg) || !Number.isFinite(distanceKm) ||
      weightKg <= 0 || distanceKm <= 0
    ) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    // MET values and speeds by pace (Compendium of Physical Activities)
    type PaceData = { met: number; speedKmh: number };
    const paceMap: Record<string, PaceData> = {
      slow:       { met: 2.0, speedKmh: 2.5 },
      leisurely:  { met: 2.5, speedKmh: 3.0 },
      moderate:   { met: 3.5, speedKmh: 4.5 },
      brisk:      { met: 4.3, speedKmh: 5.5 },
      fast:       { met: 5.0, speedKmh: 6.5 },
    };

    const { met, speedKmh } = paceMap[pace] ?? paceMap["moderate"];

    // Time in hours = distance / speed
    const timeHours = distanceKm / speedKmh;
    const timeMinutes = timeHours * 60;

    // Calories = MET × weight (kg) × time (hours)
    const caloriesBurned = met * weightKg * timeHours;

    return {
      outputs: [
        { key: "caloriesBurned", label: "Calories Burned", value: Math.round(caloriesBurned), format: "calories", highlight: true },
        { key: "timeMinutes", label: "Estimated Walk Time (min)", value: Math.round(timeMinutes), format: "number" },
        { key: "caloriesPerKm", label: "Calories per Kilometre", value: Math.round((caloriesBurned / distanceKm) * 10) / 10, format: "number" },
      ],
    };
  },

  howItWorks: `Uses the MET (Metabolic Equivalent of Task) formula: Calories = MET × weight (kg) × time (hours). MET values by pace: Slow 2.0, Leisurely 2.5, Moderate 3.5, Brisk 4.3, Fast 5.0 — based on the Compendium of Physical Activities. Walk time is estimated from distance ÷ average pace speed.`,

  examples: [
    {
      title: "70 kg person walks 5 km at moderate pace",
      description: "A typical lunchtime or evening walk.",
      inputs: { weightKg: 70, distanceKm: 5, pace: "moderate" },
      result: "~272 calories burned in ~67 minutes.",
    },
    {
      title: "85 kg person walks 10 km briskly",
      description: "A longer brisk walk for fitness.",
      inputs: { weightKg: 85, distanceKm: 10, pace: "brisk" },
      result: "~664 calories burned in ~109 minutes.",
    },
  ],

  faqs: [
    {
      question: "How accurate is MET-based calorie estimation?",
      answer: "MET estimates are accurate to within 10–20% for most people. Actual calories vary based on terrain (hills burn more), fitness level, and individual metabolic differences. Use the result as a reliable guide, not an exact figure.",
    },
    {
      question: "Does walking uphill burn more calories?",
      answer: "Yes, significantly. Incline walking can raise the MET by 50–100% depending on gradient. This calculator assumes flat terrain.",
    },
    {
      question: "How does walking compare to running for calories?",
      answer: "Running burns more calories per minute, but walking and running burn a similar number of calories per kilometre for most people because running is faster — you just cover the distance in less time.",
    },
  ],

  relatedSlugs: ["calorie-calculator", "target-heart-rate-calculator", "macro-calculator", "pace-calculator"],
};

export default def;
