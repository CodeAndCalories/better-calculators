import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "sleep-cycle-calculator",
  title: "Sleep Cycle Calculator",
  description: "Calculate how many complete 90-minute sleep cycles fit into your available sleep time.",
  longDescription: "Each sleep cycle lasts approximately 90 minutes and includes both light, deep, and REM sleep stages. Waking up at the end of a cycle (rather than mid-cycle) helps you feel more refreshed. Enter your available sleep time to find the ideal number of complete cycles.",
  category: "health",
  keywords: ["sleep cycle calculator", "90 minute sleep cycle", "sleep stages", "rem sleep"],
  inputs: [
    { type: "number", key: "hours", label: "Available Sleep Time (hours)", defaultValue: 8, min: 1, max: 24, step: 0.5 },
    { type: "number", key: "fallAsleepMins", label: "Minutes to Fall Asleep", defaultValue: 14, min: 0, max: 60, step: 1 },
  ],
  compute(values: InputValues): ComputeResult {
    const hours = Number(values.hours);
    const fallAsleepMins = Number(values.fallAsleepMins);
    if (isNaN(hours) || isNaN(fallAsleepMins) || hours <= 0) {
      return { outputs: [], error: "Please enter a valid sleep duration." };
    }
    const totalSleepMins = hours * 60 - fallAsleepMins;
    if (totalSleepMins <= 0) return { outputs: [], error: "Not enough time for any sleep after accounting for time to fall asleep." };
    const cycles = Math.floor(totalSleepMins / 90);
    const actualSleepMins = cycles * 90;
    const leftoverMins = totalSleepMins - actualSleepMins;
    return {
      outputs: [
        { key: "cycles", label: "Complete Sleep Cycles", value: cycles, format: "number", highlight: true },
        { key: "actualSleep", label: "Actual Sleep Time (mins)", value: actualSleepMins, format: "number" },
        { key: "leftover", label: "Leftover Minutes (non-cycle)", value: Math.round(leftoverMins), format: "number" },
        { key: "totalAvailable", label: "Total Available Sleep (mins)", value: Math.round(totalSleepMins), format: "number" },
      ],
    };
  },
  howItWorks: "Subtract your fall-asleep time from total hours to get true sleep time. Divide by 90 (minutes per cycle) and round down to get complete cycles. Any remaining time is leftover non-cycle sleep.",
  examples: [
    {
      title: "8 hours in bed",
      description: "8 hours available, 14 minutes to fall asleep.",
      inputs: { hours: 8, fallAsleepMins: 14 },
      result: "466 minutes of sleep ÷ 90 = 5 complete cycles (450 mins), 16 mins leftover.",
    },
    {
      title: "6-hour night",
      description: "6 hours available, 10 minutes to fall asleep.",
      inputs: { hours: 6, fallAsleepMins: 10 },
      result: "350 minutes ÷ 90 = 3 complete cycles (270 mins), 80 mins leftover.",
    },
  ],
  faqs: [
    { question: "Why 90 minutes?", answer: "The average human sleep cycle lasts approximately 90 minutes. Research suggests waking at the end of a cycle, rather than during deep sleep, reduces grogginess." },
    { question: "How many cycles do I need?", answer: "Most adults need 5–6 complete cycles per night (7.5–9 hours of sleep)." },
  ],
  relatedSlugs: ["wake-up-time-calculator", "bedtime-calculator", "study-hours-calculator"],
};

export default def;
