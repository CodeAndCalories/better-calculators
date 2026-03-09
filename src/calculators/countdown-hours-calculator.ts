import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "countdown-hours-calculator",
  title: "Countdown Hours Calculator",
  description: "Convert a countdown in days and hours into total hours, minutes, and seconds.",
  longDescription: "Need to know exactly how many hours until your flight, event, or deadline? Enter the number of days and hours remaining and this calculator will give you the total in hours, minutes, and seconds.",
  category: "life",
  keywords: ["countdown hours", "hours until event", "time remaining hours", "hours countdown"],
  inputs: [
    { type: "number", key: "days", label: "Days", defaultValue: 7, min: 0, step: 1 },
    { type: "number", key: "hours", label: "Hours", defaultValue: 0, min: 0, max: 23, step: 1 },
  ],
  compute(values: InputValues): ComputeResult {
    const days = Math.round(Number(values.days));
    const hours = Math.round(Number(values.hours));
    if (isNaN(days) || isNaN(hours) || days < 0 || hours < 0) {
      return { outputs: [], error: "Please enter valid non-negative values." };
    }
    const totalHours = days * 24 + hours;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;
    return {
      outputs: [
        { key: "totalHours", label: "Total Hours", value: totalHours, format: "number", highlight: true },
        { key: "totalMinutes", label: "Total Minutes", value: totalMinutes, format: "number" },
        { key: "totalSeconds", label: "Total Seconds", value: totalSeconds, format: "number" },
        { key: "days", label: "Days Component", value: days, format: "number" },
      ],
    };
  },
  howItWorks: "Total hours = (days × 24) + hours. Total minutes = total hours × 60. Total seconds = total minutes × 60.",
  examples: [
    {
      title: "One week away",
      description: "7 days, 0 hours.",
      inputs: { days: 7, hours: 0 },
      result: "168 hours, 10,080 minutes, 604,800 seconds.",
    },
    {
      title: "Event in 2 days and 6 hours",
      description: "2 days, 6 hours.",
      inputs: { days: 2, hours: 6 },
      result: "54 hours, 3,240 minutes.",
    },
  ],
  faqs: [
    { question: "What if my event is less than 24 hours away?", answer: "Set days to 0 and enter only the remaining hours." },
    { question: "How accurate is this?", answer: "This calculator converts exact inputs. For live countdowns tied to a specific date and time, a real-time timer app is more appropriate." },
  ],
  relatedSlugs: ["countdown-days-calculator", "sleep-cycle-calculator", "study-hours-calculator"],
};

export default def;
