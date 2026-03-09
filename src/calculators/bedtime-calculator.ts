import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "bedtime-calculator",
  title: "Bedtime Calculator",
  description: "Find the ideal bedtime to wake up refreshed at your target wake-up time.",
  longDescription: "Working backwards from your desired wake-up time, this calculator finds the best bedtimes based on completing 5 or 6 full 90-minute sleep cycles, accounting for the time it takes you to fall asleep.",
  category: "health",
  keywords: ["bedtime calculator", "what time should I go to bed", "sleep time calculator", "bedtime sleep cycles"],
  inputs: [
    { type: "number", key: "wakeHour", label: "Wake-Up Hour (0–23)", defaultValue: 7, min: 0, max: 23, step: 1 },
    { type: "number", key: "wakeMinute", label: "Wake-Up Minute (0–59)", defaultValue: 0, min: 0, max: 59, step: 1 },
    { type: "number", key: "fallAsleepMins", label: "Minutes to Fall Asleep", defaultValue: 14, min: 0, max: 60, step: 1 },
  ],
  compute(values: InputValues): ComputeResult {
    const wakeHour = Math.round(Number(values.wakeHour));
    const wakeMinute = Math.round(Number(values.wakeMinute));
    const fallAsleep = Math.round(Number(values.fallAsleepMins));
    if (isNaN(wakeHour) || isNaN(wakeMinute) || isNaN(fallAsleep)) {
      return { outputs: [], error: "Please enter valid values." };
    }

    const wakeTimeMins = wakeHour * 60 + wakeMinute;

    const formatTime = (totalMins: number): string => {
      const normalised = ((totalMins % 1440) + 1440) % 1440;
      const h = Math.floor(normalised / 60);
      const m = normalised % 60;
      const period = h < 12 ? "AM" : "PM";
      const displayH = h % 12 === 0 ? 12 : h % 12;
      return `${displayH}:${String(m).padStart(2, "0")} ${period}`;
    };

    const bed6 = formatTime(wakeTimeMins - 6 * 90 - fallAsleep);
    const bed5 = formatTime(wakeTimeMins - 5 * 90 - fallAsleep);
    const bed4 = formatTime(wakeTimeMins - 4 * 90 - fallAsleep);

    return {
      outputs: [
        { key: "bed6", label: "Bedtime for 6 Cycles (9 hrs sleep)", value: bed6, format: "text", highlight: true },
        { key: "bed5", label: "Bedtime for 5 Cycles (7.5 hrs sleep)", value: bed5, format: "text" },
        { key: "bed4", label: "Bedtime for 4 Cycles (6 hrs sleep)", value: bed4, format: "text" },
      ],
    };
  },
  howItWorks: "Multiply cycles × 90 minutes to get total sleep time, then add your fall-asleep time and subtract the total from your wake-up time to find when you need to be in bed.",
  examples: [
    {
      title: "7:00 AM wake-up",
      description: "Wake at 7:00 AM, 14 minutes to fall asleep.",
      inputs: { wakeHour: 7, wakeMinute: 0, fallAsleepMins: 14 },
      result: "Bedtime for 6 cycles ≈ 9:46 PM. For 5 cycles ≈ 11:16 PM.",
    },
  ],
  faqs: [
    { question: "Why is 6 cycles recommended?", answer: "Six 90-minute cycles total 9 hours, which gives most adults enough time for all sleep stages including ample REM sleep." },
    { question: "What if I have to wake up earlier than suggested?", answer: "Try to at least hit a full cycle end. Four cycles (6 hours) is better than 6.5 hours if the latter wakes you mid-cycle." },
  ],
  relatedSlugs: ["sleep-cycle-calculator", "wake-up-time-calculator", "study-hours-calculator"],
};

export default def;
