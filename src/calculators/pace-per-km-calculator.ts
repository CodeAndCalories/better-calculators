import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

function formatPace(secondsPerUnit: number): string {
  const mins = Math.floor(secondsPerUnit / 60);
  const secs = Math.round(secondsPerUnit % 60);
  return `${mins}:${secs.toString().padStart(2, "0")} min`;
}

const def: CalculatorDef = {
  slug: "pace-per-km-calculator",
  title: "Pace Per KM Calculator",
  shortTitle: "Pace Per KM",
  description: "Calculate your running or walking pace per kilometre from distance and time.",
  longDescription:
    "Enter the distance you covered in kilometres and your total time in minutes. The calculator returns your pace per kilometre and per mile in MM:SS format — the standard used in running apps, race results, and training plans.",
  category: "health",
  keywords: ["pace per km calculator", "min per km calculator", "running pace calculator", "kilometre pace", "pace calculator km"],
  inputs: [
    {
      type: "number",
      key: "distanceKm",
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
      helpText: "Enter total minutes — e.g. 65.5 for 1 hr 5 min 30 sec",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const distanceKm = Number(values.distanceKm);
    const timeMinutes = Number(values.timeMinutes);

    if (
      !Number.isFinite(distanceKm) || !Number.isFinite(timeMinutes) ||
      distanceKm <= 0 || timeMinutes <= 0
    ) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const timeSeconds = timeMinutes * 60;
    const secondsPerKm = timeSeconds / distanceKm;

    const distanceMiles = distanceKm * 0.621371;
    const secondsPerMile = timeSeconds / distanceMiles;

    const speedKmh = distanceKm / (timeMinutes / 60);

    return {
      outputs: [
        { key: "pacePerKm", label: "Pace per Kilometre", value: formatPace(secondsPerKm), format: "text", highlight: true },
        { key: "pacePerMile", label: "Pace per Mile", value: formatPace(secondsPerMile), format: "text" },
        { key: "speedKmh", label: "Average Speed (km/h)", value: Math.round(speedKmh * 100) / 100, format: "number" },
      ],
    };
  },

  howItWorks: `Pace per km = total time (seconds) ÷ distance (km), formatted as MM:SS. Pace per mile = total time (seconds) ÷ distance (miles), where miles = km × 0.621371. Speed (km/h) = distance (km) ÷ time (hours).`,

  examples: [
    {
      title: "5 km in 30 minutes",
      description: "A common beginner-friendly 5K pace.",
      inputs: { distanceKm: 5, timeMinutes: 30 },
      result: "6:00 min/km — 9:39 min/mile — 10 km/h.",
    },
    {
      title: "10 km in 55 minutes",
      description: "An intermediate recreational pace.",
      inputs: { distanceKm: 10, timeMinutes: 55 },
      result: "5:30 min/km — 8:51 min/mile — 10.9 km/h.",
    },
  ],

  faqs: [
    {
      question: "How do I enter 1 hour 10 minutes?",
      answer: "Enter 70 in the time field. For 1 hour 10 minutes 30 seconds, enter 70.5.",
    },
    {
      question: "What is a good pace per km?",
      answer: "For beginners, 7–9 min/km is comfortable. Intermediate runners typically run 5–6:30 min/km. Competitive club runners often aim for under 4:30 min/km for 5K races.",
    },
    {
      question: "What is the difference between this and the Pace Calculator?",
      answer: "They calculate the same thing. This calculator is named and labelled specifically for kilometre-based runners, while the Pace Calculator uses the same logic with slightly different framing.",
    },
  ],

  relatedSlugs: ["pace-calculator", "running-speed-calculator", "running-cadence-calculator", "calories-burned-walking-calculator"],
};

export default def;
