import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "running-speed-calculator",
  title: "Running Speed Calculator",
  shortTitle: "Running Speed",
  description: "Calculate your average running or walking speed in km/h and mph from distance and time.",
  longDescription:
    "Enter the distance covered and total time in minutes to get your average speed in both kilometres per hour and miles per hour. Useful for tracking treadmill workouts, comparing efforts across different distances, or converting between metric and imperial speed.",
  category: "health",
  keywords: ["running speed calculator", "average speed calculator", "km/h calculator", "mph running calculator", "speed from distance and time"],
  inputs: [
    {
      type: "number",
      key: "distance",
      label: "Distance (km)",
      defaultValue: 5,
      min: 0.1,
      step: 0.1,
      placeholder: "5",
    },
    {
      type: "number",
      key: "timeMinutes",
      label: "Total Time (minutes)",
      defaultValue: 30,
      min: 0.1,
      step: 0.5,
      placeholder: "30",
      helpText: "Enter total minutes, e.g. 65.5 for 1 hr 5 min 30 sec",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const distanceKm = Number(values.distance);
    const timeMinutes = Number(values.timeMinutes);

    if (
      !Number.isFinite(distanceKm) || !Number.isFinite(timeMinutes) ||
      distanceKm <= 0 || timeMinutes <= 0
    ) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const timeHours = timeMinutes / 60;
    const speedKmh = distanceKm / timeHours;
    const speedMph = speedKmh * 0.621371;

    return {
      outputs: [
        { key: "speedKmh", label: "Speed (km/h)", value: Math.round(speedKmh * 100) / 100, format: "number", highlight: true },
        { key: "speedMph", label: "Speed (mph)", value: Math.round(speedMph * 100) / 100, format: "number" },
      ],
    };
  },

  howItWorks: `Speed (km/h) = distance (km) ÷ time (hours). Speed (mph) = speed (km/h) × 0.621371.`,

  examples: [
    {
      title: "5 km in 30 minutes",
      description: "An easy jogging pace.",
      inputs: { distance: 5, timeMinutes: 30 },
      result: "10 km/h — 6.21 mph.",
    },
    {
      title: "10 km in 45 minutes",
      description: "A strong aerobic effort.",
      inputs: { distance: 10, timeMinutes: 45 },
      result: "13.33 km/h — 8.29 mph.",
    },
  ],

  faqs: [
    {
      question: "What is a good running speed?",
      answer: "Average recreational runners cover 8–12 km/h (5–7.5 mph). Elite marathon pace is around 20 km/h (12.4 mph). Walking is typically 4–6 km/h.",
    },
    {
      question: "How is this different from the Pace Calculator?",
      answer: "Speed tells you how many kilometres or miles you cover per hour. Pace tells you how many minutes it takes per kilometre or mile. Runners typically use pace; cyclists and general fitness tracking often use speed.",
    },
  ],

  relatedSlugs: ["pace-calculator", "target-heart-rate-calculator", "calorie-calculator"],
};

export default def;
