import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "countdown-calculator",
  title: "Countdown Calculator",
  shortTitle: "Countdown",
  description: "Calculate days, weeks, and months remaining until a future event.",
  category: "life",
  keywords: ["countdown calculator", "days until", "time remaining", "event countdown"],
  inputs: [
    { type: "number", key: "targetYear",  label: "Target Year",  defaultValue: 2026, min: 2025, max: 2100, step: 1 },
    { type: "number", key: "targetMonth", label: "Target Month", defaultValue: 12,   min: 1,    max: 12,   step: 1 },
    { type: "number", key: "targetDay",   label: "Target Day",   defaultValue: 31,   min: 1,    max: 31,   step: 1 },
    { type: "number", key: "fromYear",    label: "From Year",    defaultValue: 2025, min: 2000, max: 2100, step: 1 },
    { type: "number", key: "fromMonth",   label: "From Month",   defaultValue: 3,    min: 1,    max: 12,   step: 1 },
    { type: "number", key: "fromDay",     label: "From Day",     defaultValue: 7,    min: 1,    max: 31,   step: 1 },
  ],
  compute(values: InputValues): ComputeResult {
    const ty = Number(values.targetYear);
    const tm = Number(values.targetMonth);
    const td = Number(values.targetDay);
    const fy = Number(values.fromYear);
    const fm = Number(values.fromMonth);
    const fd = Number(values.fromDay);
    if ([ty, tm, td, fy, fm, fd].some((n) => !Number.isFinite(n))) {
      return { outputs: [], error: "Please enter a valid number." };
    }
    const diffMs = Date.UTC(ty, tm - 1, td) - Date.UTC(fy, fm - 1, fd);
    if (diffMs <= 0) {
      return { outputs: [], error: "Target date must be after the From date." };
    }
    const totalDays  = Math.floor(diffMs / 86400000);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = Math.abs((ty * 12 + tm) - (fy * 12 + fm));
    const remDays = totalDays % 7;
    return {
      outputs: [
        { key: "totalDays",   label: "Days Remaining",   value: totalDays,   format: "number", highlight: true },
        { key: "totalWeeks",  label: "Weeks Remaining",  value: totalWeeks,  format: "number" },
        { key: "totalMonths", label: "Months Remaining", value: totalMonths, format: "number" },
        { key: "breakdown",   label: "Weeks + Days",     value: `${totalWeeks}w ${remDays}d`, format: "text" },
      ],
    };
  },
  howItWorks: "Difference in milliseconds between target and from dates (UTC), divided by 86,400,000 to get total days. Weeks = floor(days / 7). Months = absolute difference in year×12+month values.",
  relatedSlugs: ["date-add-calculator", "months-between-dates-calculator", "time-duration-calculator"],

  longDescription: "Enter a future event date and a starting date to see exactly how many days, weeks, and months remain. Useful for countdowns to holidays, deadlines, weddings, product launches, or any upcoming event.",
  examples: [
    { title: "Days until December 31, 2026 from March 7, 2025", description: "Countdown to New Year.", inputs: { targetYear: 2026, targetMonth: 12, targetDay: 31, fromYear: 2025, fromMonth: 3, fromDay: 7 }, result: "664 days remaining." },
  ],
  faqs: [
    { question: "Can I count down to a date in the past?", answer: "No — the target date must be after the from date. For elapsed time, use the Time Duration Calculator." },
  ],
};

export default def;
