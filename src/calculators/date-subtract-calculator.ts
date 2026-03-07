import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

function parseDate(val: unknown): Date | null {
  if (typeof val !== "string" || val.trim() === "") return null;
  const d = new Date(val.trim());
  if (isNaN(d.getTime())) return null;
  return d;
}

const def: CalculatorDef = {
  slug: "date-subtract-calculator",
  title: "Date Subtract Calculator",
  shortTitle: "Date Subtract",
  description: "Subtract a number of days, weeks, or months from a date to find an earlier date.",
  longDescription:
    "Enter a start date and subtract any combination of days, weeks, and months to calculate a target date in the past. Useful for deadline counting, working backwards from a due date, calculating notice periods, or finding dates a specific number of days before an event.",
  category: "life",
  keywords: ["date subtract calculator", "subtract days from date", "calculate date in the past", "date minus days", "working backwards from a date"],
  inputs: [
    {
      type: "text",
      key: "startDate",
      label: "Start Date",
      defaultValue: "",
      placeholder: "YYYY-MM-DD",
      helpText: "The date to subtract from",
    },
    {
      type: "number",
      key: "subtractDays",
      label: "Subtract Days",
      defaultValue: 0,
      min: 0,
      step: 1,
      placeholder: "0",
    },
    {
      type: "number",
      key: "subtractWeeks",
      label: "Subtract Weeks",
      defaultValue: 0,
      min: 0,
      step: 1,
      placeholder: "0",
    },
    {
      type: "number",
      key: "subtractMonths",
      label: "Subtract Months",
      defaultValue: 0,
      min: 0,
      step: 1,
      placeholder: "0",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const startDate = parseDate(values.startDate);
    const subtractDays = Number(values.subtractDays);
    const subtractWeeks = Number(values.subtractWeeks);
    const subtractMonths = Number(values.subtractMonths);

    if (!startDate) {
      return { outputs: [], error: "Please enter a valid date in YYYY-MM-DD format." };
    }

    if (
      !Number.isFinite(subtractDays) || !Number.isFinite(subtractWeeks) || !Number.isFinite(subtractMonths) ||
      subtractDays < 0 || subtractWeeks < 0 || subtractMonths < 0
    ) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const totalDaysToSubtract = subtractDays + subtractWeeks * 7;

    // Work with UTC to avoid DST issues
    const result = new Date(Date.UTC(
      startDate.getFullYear(),
      startDate.getMonth() - subtractMonths,
      startDate.getDate() - totalDaysToSubtract,
    ));

    const resultStr = result.toISOString().split("T")[0];

    // Days between start and result
    const msPerDay = 24 * 60 * 60 * 1000;
    const startUtc = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const resultUtc = result.getTime();
    const totalDays = Math.round((startUtc - resultUtc) / msPerDay);
    const totalWeeks = Math.round((totalDays / 7) * 10) / 10;

    return {
      outputs: [
        { key: "resultDate", label: "Result Date", value: resultStr, format: "text", highlight: true },
        { key: "totalDaysSubtracted", label: "Total Days Subtracted", value: totalDays, format: "number" },
        { key: "totalWeeksSubtracted", label: "Total Weeks Subtracted", value: totalWeeks, format: "number" },
      ],
    };
  },

  howItWorks: `Months are subtracted from the month component of the date first (JavaScript Date handles overflow correctly, e.g. March minus 1 month = February). Days and weeks (converted to days) are then subtracted from the day component. All calculations use UTC midnight to avoid Daylight Saving Time errors.`,

  examples: [
    {
      title: "Subtract 30 days from 2025-06-15",
      description: "Find a date 30 days before a deadline.",
      inputs: { startDate: "2025-06-15", subtractDays: 30, subtractWeeks: 0, subtractMonths: 0 },
      result: "Result: 2025-05-16.",
    },
    {
      title: "Subtract 3 months and 2 weeks from 2025-12-01",
      description: "Working backwards for a project start date.",
      inputs: { startDate: "2025-12-01", subtractDays: 0, subtractWeeks: 2, subtractMonths: 3 },
      result: "Result: 2025-08-18.",
    },
  ],

  faqs: [
    {
      question: "What happens when subtracting months crosses a year boundary?",
      answer: "The calculator handles this automatically — subtracting 3 months from February 2025 correctly returns November 2024.",
    },
    {
      question: "Can I subtract just weeks or just months?",
      answer: "Yes — leave unused fields at 0. You can subtract any combination of days, weeks, and months independently.",
    },
  ],

  relatedSlugs: ["time-duration-calculator", "work-hours-calculator", "age-difference-calculator"],
};

export default def;
