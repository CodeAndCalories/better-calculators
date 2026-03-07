import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

function toUTCDate(year: number, month: number, day: number): Date | null {
  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) return null;
  if (year < 1 || year > 9999 || month < 1 || month > 12 || day < 1 || day > 31) return null;
  const d = new Date(Date.UTC(year, month - 1, day));
  if (d.getUTCFullYear() !== year || d.getUTCMonth() !== month - 1 || d.getUTCDate() !== day) return null;
  return d;
}

const def: CalculatorDef = {
  slug: "date-subtract-calculator",
  title: "Date Subtract Calculator",
  shortTitle: "Date Subtract",
  description: "Subtract a number of days, weeks, or months from a date to find an earlier date.",
  longDescription:
    "Enter a start date and subtract any combination of days, weeks, and months to calculate a target date in the past. Useful for deadline counting, working backwards from a due date, calculating notice periods, or finding a date a specific number of days before an event.",
  category: "life",
  keywords: ["date subtract calculator", "subtract days from date", "calculate date in the past", "date minus days", "working backwards from a date"],
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
      defaultValue: 6,
      min: 1,
      max: 12,
      step: 1,
      placeholder: "6",
    },
    {
      type: "number",
      key: "startDay",
      label: "Start Day",
      defaultValue: 15,
      min: 1,
      max: 31,
      step: 1,
      placeholder: "15",
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
      defaultValue: 1,
      min: 0,
      step: 1,
      placeholder: "0",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const startYear = Number(values.startYear);
    const startMonth = Number(values.startMonth);
    const startDay = Number(values.startDay);
    const subtractDays = Number(values.subtractDays);
    const subtractWeeks = Number(values.subtractWeeks);
    const subtractMonths = Number(values.subtractMonths);

    const startDate = toUTCDate(startYear, startMonth, startDay);
    if (!startDate) {
      return { outputs: [], error: "Please enter a valid start date." };
    }

    if (
      !Number.isFinite(subtractDays) || !Number.isFinite(subtractWeeks) || !Number.isFinite(subtractMonths) ||
      subtractDays < 0 || subtractWeeks < 0 || subtractMonths < 0
    ) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const totalDaysToSubtract = subtractDays + subtractWeeks * 7;

    const result = new Date(Date.UTC(
      startDate.getUTCFullYear(),
      startDate.getUTCMonth() - subtractMonths,
      startDate.getUTCDate() - totalDaysToSubtract,
    ));

    const yy = result.getUTCFullYear();
    const mm = String(result.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(result.getUTCDate()).padStart(2, "0");
    const resultStr = `${yy}-${mm}-${dd}`;

    const msPerDay = 24 * 60 * 60 * 1000;
    const startUtc = Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate());
    const resultUtc = result.getTime();
    const totalDays = Math.round((startUtc - resultUtc) / msPerDay);
    const totalWeeks = Math.round((totalDays / 7) * 100) / 100;

    return {
      outputs: [
        { key: "resultDate", label: "Result Date (YYYY-MM-DD)", value: resultStr, format: "text", highlight: true },
        { key: "totalDaysSubtracted", label: "Total Days Subtracted", value: totalDays, format: "number" },
        { key: "totalWeeksSubtracted", label: "Total Weeks Subtracted", value: totalWeeks, format: "number" },
      ],
    };
  },

  howItWorks: `Months are subtracted from the UTC month component first (JavaScript's Date constructor handles overflow, e.g. March minus 1 month = February). Days and weeks (converted to days) are subtracted from the UTC day component. All calculations use UTC midnight to avoid Daylight Saving Time errors.`,

  examples: [
    {
      title: "Subtract 30 days from June 15, 2025",
      description: "Find a date 30 days before a deadline.",
      inputs: { startYear: 2025, startMonth: 6, startDay: 15, subtractDays: 30, subtractWeeks: 0, subtractMonths: 0 },
      result: "Result: 2025-05-16.",
    },
    {
      title: "Subtract 3 months and 2 weeks from December 1, 2025",
      description: "Working backwards for a project start date.",
      inputs: { startYear: 2025, startMonth: 12, startDay: 1, subtractDays: 0, subtractWeeks: 2, subtractMonths: 3 },
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
