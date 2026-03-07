import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

function formatPace(secondsPerUnit: number): string {
  const mins = Math.floor(secondsPerUnit / 60);
  const secs = Math.round(secondsPerUnit % 60);
  return `${mins}:${secs.toString().padStart(2, "0")} min`;
}

const def: CalculatorDef = {
  slug: "pace-calculator",
  title: "Pace Calculator",
  shortTitle: "Pace",
  description: "Calculate your running or walking pace per kilometre and per mile from a distance and time.",
  longDescription:
    "Enter the distance you covered and the total time in minutes. The calculator returns your pace per kilometre and per mile, formatted as minutes:seconds — the standard format used in running apps, races, and training plans.",
  category: "health",
  keywords: ["pace calculator", "running pace calculator", "min per km calculator", "min per mile calculator", "running speed pace"],
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

    const timeSeconds = timeMinutes * 60;
    const secondsPerKm = timeSeconds / distanceKm;
    const distanceMiles = distanceKm * 0.621371;
    const secondsPerMile = timeSeconds / distanceMiles;

    return {
      outputs: [
        { key: "pacePerKm", label: "Pace per Kilometre", value: formatPace(secondsPerKm), format: "text", highlight: true },
        { key: "pacePerMile", label: "Pace per Mile", value: formatPace(secondsPerMile), format: "text" },
      ],
    };
  },

  howItWorks: `Pace per km = total time (seconds) ÷ distance (km). Pace per mile = total time (seconds) ÷ distance (miles), where distance in miles = km × 0.621371. Results are formatted as MM:SS per unit.`,

  examples: [
    {
      title: "5 km in 30 minutes",
      description: "A common beginner 5K time.",
      inputs: { distance: 5, timeMinutes: 30 },
      result: "6:00 min/km — 9:39 min/mile.",
    },
    {
      title: "10 km in 50 minutes",
      description: "A solid intermediate 10K performance.",
      inputs: { distance: 10, timeMinutes: 50 },
      result: "5:00 min/km — 8:03 min/mile.",
    },
  ],

  faqs: [
    {
      question: "How do I enter 1 hour and 5 minutes?",
      answer: "Enter 65 in the time field. For 1 hour, 5 minutes, and 30 seconds, enter 65.5.",
    },
    {
      question: "What is a good running pace?",
      answer: "It depends on your fitness level and distance. For a 5K, beginners often run 7–9 min/km; intermediate runners 5–6 min/km; competitive runners under 4:30 min/km.",
    },
  ],

  relatedSlugs: ["running-speed-calculator", "target-heart-rate-calculator", "calorie-calculator"],
};

export default def;
