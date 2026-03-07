import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

function formatPace(secondsPerUnit: number): string {
  const mins = Math.floor(secondsPerUnit / 60);
  const secs = Math.round(secondsPerUnit % 60);
  return `${mins}:${secs.toString().padStart(2, "0")} min`;
}

const def: CalculatorDef = {
  slug: "pace-per-mile-calculator",
  title: "Pace Per Mile Calculator",
  shortTitle: "Pace Per Mile",
  description: "Calculate your pace per mile and per kilometre from a distance in miles and total time.",
  longDescription:
    "Enter your distance in miles and total time in minutes to get your pace per mile and pace per kilometre. Ideal for runners in the US, UK, and other countries using imperial distances who want both formats side by side.",
  category: "health",
  keywords: ["pace per mile calculator", "min per mile calculator", "running pace miles", "mile pace calculator", "pace converter"],
  inputs: [
    {
      type: "number",
      key: "distanceMiles",
      label: "Distance (miles)",
      defaultValue: 3.1,
      min: 0.1,
      step: 0.1,
      placeholder: "3.1",
      helpText: "5K = 3.107 miles, 10K = 6.214 miles, half marathon = 13.1 miles",
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
    const distanceMiles = Number(values.distanceMiles);
    const timeMinutes = Number(values.timeMinutes);

    if (
      !Number.isFinite(distanceMiles) || !Number.isFinite(timeMinutes) ||
      distanceMiles <= 0 || timeMinutes <= 0
    ) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const timeSeconds = timeMinutes * 60;
    const secondsPerMile = timeSeconds / distanceMiles;

    const distanceKm = distanceMiles * 1.60934;
    const secondsPerKm = timeSeconds / distanceKm;

    return {
      outputs: [
        { key: "pacePerMile", label: "Pace per Mile", value: formatPace(secondsPerMile), format: "text", highlight: true },
        { key: "pacePerKm", label: "Pace per Kilometre", value: formatPace(secondsPerKm), format: "text" },
      ],
    };
  },

  howItWorks: `Pace per mile = total time (seconds) ÷ distance (miles). Pace per km = total time (seconds) ÷ distance (km), where km = miles × 1.60934. Results are formatted as MM:SS per unit.`,

  examples: [
    {
      title: "5K (3.107 miles) in 30 minutes",
      description: "A common beginner 5K time.",
      inputs: { distanceMiles: 3.107, timeMinutes: 30 },
      result: "~9:39 min/mile — 6:00 min/km.",
    },
    {
      title: "Half marathon (13.1 miles) in 2 hours",
      description: "A popular half marathon target time.",
      inputs: { distanceMiles: 13.1, timeMinutes: 120 },
      result: "~9:10 min/mile — 5:42 min/km.",
    },
  ],

  faqs: [
    {
      question: "How do I enter 1 hour 30 minutes?",
      answer: "Enter 90 in the time field. For 2 hours 15 minutes, enter 135. For 1 hour 5 minutes 30 seconds, enter 65.5.",
    },
    {
      question: "What is the difference between this and the Pace Calculator?",
      answer: "The Pace Calculator uses distance in kilometres as input. This calculator uses miles as input — the maths produces the same two outputs but is more natural for runners who measure in miles.",
    },
  ],

  relatedSlugs: ["pace-calculator", "running-speed-calculator", "running-cadence-calculator"],
};

export default def;
