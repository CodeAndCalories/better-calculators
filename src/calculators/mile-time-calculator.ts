import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

function formatPace(secondsPerUnit: number): string {
  const mins = Math.floor(secondsPerUnit / 60);
  const secs = Math.round(secondsPerUnit % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

const def: CalculatorDef = {
  slug: "mile-time-calculator",
  title: "Mile Time Calculator",
  shortTitle: "Mile Time",
  description: "Calculate your mile time from a known pace or convert between pace and speed.",
  longDescription:
    "Enter your pace in minutes and seconds per kilometre or per mile to calculate your projected mile time, 5K time, and equivalent speed. Useful for race planning, treadmill workouts, and tracking fitness progress.",
  category: "health",
  keywords: ["mile time calculator", "how fast is my mile", "pace to mile time", "running mile calculator", "mile pace converter"],
  inputs: [
    {
      type: "select",
      key: "paceUnit",
      label: "Pace Input Unit",
      defaultValue: "perKm",
      options: [
        { label: "Minutes per kilometre", value: "perKm" },
        { label: "Minutes per mile", value: "perMile" },
      ],
    },
    {
      type: "number",
      key: "paceMinutes",
      label: "Pace — Minutes",
      defaultValue: 5,
      min: 0,
      max: 30,
      step: 1,
      placeholder: "5",
    },
    {
      type: "number",
      key: "paceSeconds",
      label: "Pace — Seconds",
      defaultValue: 30,
      min: 0,
      max: 59,
      step: 1,
      placeholder: "30",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const paceUnit = values.paceUnit as string;
    const paceMinutes = Number(values.paceMinutes);
    const paceSeconds = Number(values.paceSeconds);

    if (
      !Number.isFinite(paceMinutes) || !Number.isFinite(paceSeconds) ||
      paceMinutes < 0 || paceSeconds < 0 || paceSeconds > 59 ||
      (paceMinutes === 0 && paceSeconds === 0)
    ) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const totalSecondsPerUnit = paceMinutes * 60 + paceSeconds;

    const mileInKm = 1.60934;

    let secondsPerKm: number;
    let secondsPerMile: number;

    if (paceUnit === "perKm") {
      secondsPerKm = totalSecondsPerUnit;
      secondsPerMile = secondsPerKm * mileInKm;
    } else {
      secondsPerMile = totalSecondsPerUnit;
      secondsPerKm = secondsPerMile / mileInKm;
    }

    const mileTimeSeconds = secondsPerMile;
    const fiveKTimeSeconds = secondsPerKm * 5;
    const speedKmh = 3600 / secondsPerKm;
    const speedMph = 3600 / secondsPerMile;

    return {
      outputs: [
        { key: "mileTime", label: "Mile Time (MM:SS)", value: formatPace(mileTimeSeconds), format: "text", highlight: true },
        { key: "pacePerKm", label: "Pace per KM (MM:SS)", value: formatPace(secondsPerKm), format: "text" },
        { key: "fiveK", label: "Projected 5K Time (MM:SS)", value: formatPace(fiveKTimeSeconds), format: "text" },
        { key: "speedKmh", label: "Speed (km/h)", value: Math.round(speedKmh * 100) / 100, format: "number" },
        { key: "speedMph", label: "Speed (mph)", value: Math.round(speedMph * 100) / 100, format: "number" },
      ],
    };
  },

  howItWorks: `If pace is entered per km: pace per mile = pace per km × 1.60934. If entered per mile: pace per km = pace per mile ÷ 1.60934. Mile time = pace per mile in MM:SS. 5K time = pace per km × 5. Speed (km/h) = 3600 ÷ seconds per km.`,

  examples: [
    {
      title: "5:30 min/km pace",
      description: "A solid intermediate running pace.",
      inputs: { paceUnit: "perKm", paceMinutes: 5, paceSeconds: 30 },
      result: "Mile time ~8:51. 5K ~27:30. Speed ~10.9 km/h.",
    },
    {
      title: "9:00 min/mile pace",
      description: "A common beginner to intermediate pace.",
      inputs: { paceUnit: "perMile", paceMinutes: 9, paceSeconds: 0 },
      result: "Pace ~5:35/km. 5K ~27:57. Speed ~10.7 km/h.",
    },
  ],

  faqs: [
    {
      question: "What is a good mile time?",
      answer: "For recreational runners: under 10 minutes is solid, under 8 minutes is good, under 7 minutes is competitive. Elite runners run sub-4 minutes. Average untrained adults run 10–12 minutes.",
    },
    {
      question: "Does this account for elevation or fatigue?",
      answer: "No — results assume a flat course at a consistent effort. Race and real-world times will differ based on terrain, weather, and pacing strategy.",
    },
  ],

  relatedSlugs: ["pace-calculator", "pace-per-mile-calculator", "pace-per-km-calculator", "running-speed-calculator"],
};

export default def;
