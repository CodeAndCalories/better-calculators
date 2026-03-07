import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

function toUTCDate(year: number, month: number, day: number): Date | null {
  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) return null;
  if (year < 1 || year > 9999 || month < 1 || month > 12 || day < 1 || day > 31) return null;
  const d = new Date(Date.UTC(year, month - 1, day));
  if (d.getUTCFullYear() !== year || d.getUTCMonth() !== month - 1 || d.getUTCDate() !== day) return null;
  return d;
}

const def: CalculatorDef = {
  slug: "time-duration-calculator",
  title: "Time Duration Calculator",
  shortTitle: "Time Duration",
  description: "Calculate the number of days and weeks between two dates.",
  longDescription:
    "Enter a start date and end date using separate year, month, and day fields to find the exact number of days and weeks between them. Useful for project planning, countdowns, lease durations, event scheduling, or any situation where you need a precise date range.",
  category: "life",
  keywords: ["time duration calculator", "days between dates", "date difference calculator", "how many days between dates", "weeks between dates"],
  inputs: [
    {
      type: "number",
      key: "startYear",
      label: "Start Year",
      defaultValue: 2025,
      min: 1,
      max: 9999,
      step: 1,
      placeholder: "2025",
    },
    {
      type: "number",
      key: "startMonth",
      label: "Start Month",
      defaultValue: 1,
      min: 1,
      max: 12,
      step: 1,
      placeholder: "1",
    },
    {
      type: "number",
      key: "startDay",
      label: "Start Day",
      defaultValue: 1,
      min: 1,
      max: 31,
      step: 1,
      placeholder: "1",
    },
    {
      type: "number",
      key: "endYear",
      label: "End Year",
      defaultValue: 2025,
      min: 1,
      max: 9999,
      step: 1,
      placeholder: "2025",
    },
    {
      type: "number",
      key: "endMonth",
      label: "End Month",
      defaultValue: 12,
      min: 1,
      max: 12,
      step: 1,
      placeholder: "12",
    },
    {
      type: "number",
      key: "endDay",
      label: "End Day",
      defaultValue: 31,
      min: 1,
      max: 31,
      step: 1,
      placeholder: "31",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const startDate = toUTCDate(Number(values.startYear), Number(values.startMonth), Number(values.startDay));
    const endDate = toUTCDate(Number(values.endYear), Number(values.endMonth), Number(values.endDay));

    if (!startDate || !endDate) {
      return { outputs: [], error: "Please enter valid start and end dates." };
    }

    const msPerDay = 24 * 60 * 60 * 1000;
    const startUtc = Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate());
    const endUtc = Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate());

    const days = Math.abs(Math.round((endUtc - startUtc) / msPerDay));
    const weeks = Math.round((days / 7) * 100) / 100;
    const months = Math.round((days / 30.4375) * 100) / 100;

    return {
      outputs: [
        { key: "days", label: "Total Days", value: days, format: "number", highlight: true },
        { key: "weeks", label: "Total Weeks", value: weeks, format: "number" },
        { key: "months", label: "Approximate Months", value: months, format: "number" },
      ],
    };
  },

  howItWorks: `Both dates are validated and converted to UTC midnight to eliminate Daylight Saving Time errors. Days = |end − start| in milliseconds divided by 86,400,000. Weeks = days / 7. Months = days / 30.4375 (average days per month). The result is always positive regardless of which date is earlier.`,

  examples: [
    {
      title: "January 1 to December 31, 2025",
      description: "The length of a full calendar year.",
      inputs: { startYear: 2025, startMonth: 1, startDay: 1, endYear: 2025, endMonth: 12, endDay: 31 },
      result: "364 days — 52 weeks.",
    },
    {
      title: "March 1 to May 29, 2025",
      description: "A 90-day project sprint.",
      inputs: { startYear: 2025, startMonth: 3, startDay: 1, endYear: 2025, endMonth: 5, endDay: 29 },
      result: "89 days — 12.71 weeks.",
    },
  ],

  faqs: [
    {
      question: "Does the result include both the start and end dates?",
      answer: "No — the calculator counts the gap between the two dates. January 1 to January 2 is 1 day.",
    },
    {
      question: "What if I enter the end date before the start date?",
      answer: "The result is always a positive number — the order of the dates does not matter.",
    },
  ],

  relatedSlugs: ["date-subtract-calculator", "work-hours-calculator", "age-difference-calculator"],
};

export default def;
