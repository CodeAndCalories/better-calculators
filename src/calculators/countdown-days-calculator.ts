import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "countdown-days-calculator",
  title: "Countdown Days Calculator",
  description: "Calculate the number of days remaining from today until a future event.",
  longDescription: "Enter the number of months and days until your event to instantly see the total day countdown. Perfect for planning weddings, vacations, project deadlines, or any upcoming milestone.",
  category: "life",
  keywords: ["countdown days", "days until event", "event countdown", "days remaining"],
  inputs: [
    { type: "number", key: "months", label: "Months Away", defaultValue: 3, min: 0, max: 120, step: 1 },
    { type: "number", key: "days", label: "Additional Days", defaultValue: 0, min: 0, max: 30, step: 1 },
  ],
  compute(values: InputValues): ComputeResult {
    const months = Math.round(Number(values.months));
    const extraDays = Math.round(Number(values.days));
    if (isNaN(months) || isNaN(extraDays) || months < 0 || extraDays < 0) {
      return { outputs: [], error: "Please enter valid non-negative values." };
    }
    const totalDays = months * 30 + extraDays;
    const weeks = Math.floor(totalDays / 7);
    const remainderDays = totalDays % 7;
    const hours = totalDays * 24;
    return {
      outputs: [
        { key: "totalDays", label: "Total Days", value: totalDays, format: "number", highlight: true },
        { key: "weeks", label: "Weeks", value: weeks, format: "number" },
        { key: "remainderDays", label: "Remaining Days (after full weeks)", value: remainderDays, format: "number" },
        { key: "hours", label: "Total Hours", value: hours, format: "number" },
      ],
    };
  },
  howItWorks: "Each month is approximated as 30 days. Total days = (months × 30) + extra days. Weeks are calculated by dividing total days by 7.",
  examples: [
    {
      title: "3-month event",
      description: "Event is 3 months away.",
      inputs: { months: 3, days: 0 },
      result: "90 days, 12 weeks, 1,080 hours.",
    },
    {
      title: "6 weeks away",
      description: "1 month and 12 days.",
      inputs: { months: 1, days: 12 },
      result: "42 days, 6 weeks exactly.",
    },
  ],
  faqs: [
    { question: "Why are months approximated as 30 days?", answer: "For simplicity, each month is treated as 30 days. For an exact date-based calculation, use a date-difference calculator." },
    { question: "Can I enter zero months?", answer: "Yes. Set months to 0 and use only the days field for short countdowns under a month." },
  ],
  relatedSlugs: ["countdown-hours-calculator", "sleep-cycle-calculator", "study-hours-calculator"],
};

export default def;
