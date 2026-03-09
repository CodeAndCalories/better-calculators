import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "wake-up-time-calculator",
  title: "Wake-Up Time Calculator",
  description: "Find the best wake-up times based on your bedtime and 90-minute sleep cycles.",
  longDescription: "Waking up at the end of a sleep cycle helps you feel alert and refreshed. Enter your bedtime hour and minutes to fall asleep and this calculator will show the ideal wake-up times after 4, 5, and 6 complete 90-minute sleep cycles.",
  category: "health",
  keywords: ["wake up time calculator", "best time to wake up", "sleep cycle wake up", "alarm time"],
  inputs: [
    { type: "number", key: "bedHour", label: "Bedtime Hour (0–23)", defaultValue: 22, min: 0, max: 23, step: 1 },
    { type: "number", key: "bedMinute", label: "Bedtime Minute (0–59)", defaultValue: 30, min: 0, max: 59, step: 1 },
    { type: "number", key: "fallAsleepMins", label: "Minutes to Fall Asleep", defaultValue: 14, min: 0, max: 60, step: 1 },
  ],
  compute(values: InputValues): ComputeResult {
    const bedHour = Math.round(Number(values.bedHour));
    const bedMinute = Math.round(Number(values.bedMinute));
    const fallAsleep = Math.round(Number(values.fallAsleepMins));
    if (isNaN(bedHour) || isNaN(bedMinute) || isNaN(fallAsleep)) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const sleepStartMins = bedHour * 60 + bedMinute + fallAsleep;

    const formatTime = (totalMins: number): string => {
      const normalised = ((totalMins % 1440) + 1440) % 1440;
      const h = Math.floor(normalised / 60);
      const m = normalised % 60;
      const period = h < 12 ? "AM" : "PM";
      const displayH = h % 12 === 0 ? 12 : h % 12;
      return `${displayH}:${String(m).padStart(2, "0")} ${period}`;
    };

    const wake4 = formatTime(sleepStartMins + 4 * 90);
    const wake5 = formatTime(sleepStartMins + 5 * 90);
    const wake6 = formatTime(sleepStartMins + 6 * 90);

    return {
      outputs: [
        { key: "wake6", label: "Wake Up (6 cycles — 9 hrs)", value: wake6, format: "text", highlight: true },
        { key: "wake5", label: "Wake Up (5 cycles — 7.5 hrs)", value: wake5, format: "text" },
        { key: "wake4", label: "Wake Up (4 cycles — 6 hrs)", value: wake4, format: "text" },
        { key: "sleepStart", label: "Sleep Start (after falling asleep)", value: formatTime(sleepStartMins), format: "text" },
      ],
    };
  },
  howItWorks: "Add your fall-asleep time to your bedtime to find when sleep actually begins. Then add 4, 5, or 6 complete 90-minute cycles to that time to identify ideal wake-up windows.",
  examples: [
    {
      title: "10:30 PM bedtime",
      description: "Bedtime 22:30, 14 minutes to fall asleep.",
      inputs: { bedHour: 22, bedMinute: 30, fallAsleepMins: 14 },
      result: "Sleep starts ~10:44 PM. Wake at 4:44 AM (4 cycles), 6:14 AM (5 cycles), 7:44 AM (6 cycles).",
    },
  ],
  faqs: [
    { question: "Which wake-up time is best?", answer: "Six cycles (about 9 hours) is ideal for most adults. Five cycles (7.5 hours) is the most practical target. Four cycles (6 hours) is the minimum for most people." },
    { question: "What if I cannot fall asleep in 14 minutes?", answer: "Adjust the fall-asleep minutes to match your typical experience. People with insomnia may take 30+ minutes." },
  ],
  relatedSlugs: ["sleep-cycle-calculator", "bedtime-calculator", "study-hours-calculator"],
};

export default def;
