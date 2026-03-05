import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

function toUTCDate(year: number, month: number, day: number): Date | null {
  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) return null;
  if (year < 1 || year > 9999) return null;
  if (month < 1 || month > 12) return null;
  if (day < 1 || day > 31) return null;

  const d = new Date(Date.UTC(year, month - 1, day));
  // Validate round-trip (handles invalid dates like Feb 30)
  if (d.getUTCFullYear() !== year || d.getUTCMonth() !== month - 1 || d.getUTCDate() !== day) return null;
  return d;
}

function diffDaysUTC(a: Date, b: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  const t1 = Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate());
  const t2 = Date.UTC(b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate());
  return Math.round((t2 - t1) / msPerDay);
}

const def: CalculatorDef = {
  slug: "days-between-dates-calculator",
  title: "Days Between Dates Calculator",
  shortTitle: "Days Between Dates",
  description: "Find the number of days between two dates, plus weeks and total months estimate.",
  longDescription:
    "Use this calculator to find the number of days between two dates. It also shows the difference in weeks and a simple months and years estimate. Great for planning, timelines, and counting days between events.",
  category: "life",
  keywords: ["days between dates calculator", "date difference", "how many days between dates"],
  inputs: [
    { type: "number", key: "startMonth", label: "Start Month", defaultValue: 1, min: 1, max: 12, step: 1, placeholder: "1" },
    { type: "number", key: "startDay", label: "Start Day", defaultValue: 1, min: 1, max: 31, step: 1, placeholder: "1" },
    { type: "number", key: "startYear", label: "Start Year", defaultValue: 2026, min: 1, max: 9999, step: 1, placeholder: "2026" },

    { type: "number", key: "endMonth", label: "End Month", defaultValue: 12, min: 1, max: 12, step: 1, placeholder: "12" },
    { type: "number", key: "endDay", label: "End Day", defaultValue: 31, min: 1, max: 31, step: 1, placeholder: "31" },
    { type: "number", key: "endYear", label: "End Year", defaultValue: 2026, min: 1, max: 9999, step: 1, placeholder: "2026" },
  ],

  compute(values: InputValues): ComputeResult {
    const start = toUTCDate(Number(values.startYear), Number(values.startMonth), Number(values.startDay));
    const end = toUTCDate(Number(values.endYear), Number(values.endMonth), Number(values.endDay));

    if (!start || !end) {
      return {
        outputs: [
          { key: "error", label: "Result", value: "Enter valid start and end dates.", format: "text", highlight: true },
        ],
      };
    }

    const days = diffDaysUTC(start, end);
    const absDays = Math.abs(days);
    const weeks = absDays / 7;
    const monthsApprox = absDays / 30.4375; // average days per month
    const yearsApprox = absDays / 365.25;

    const direction = days >= 0 ? "End date is after start date." : "End date is before start date.";

    return {
      outputs: [
        { key: "days", label: "Days Between", value: absDays, format: "number", highlight: true },
        { key: "weeks", label: "Weeks (approx)", value: Number(weeks.toFixed(2)), format: "number" },
        { key: "months", label: "Months (approx)", value: Number(monthsApprox.toFixed(2)), format: "number" },
        { key: "years", label: "Years (approx)", value: Number(yearsApprox.toFixed(2)), format: "number" },
        { key: "note", label: "Note", value: direction, format: "text" },
      ],
    };
  },

  howItWorks:
    "We convert both dates to midnight UTC and compute the difference in whole days. Weeks, months, and years are shown as simple estimates based on average day counts.",

  examples: [
    {
      title: "Project timeline",
      description: "From March 1, 2026 to April 1, 2026.",
      inputs: { startMonth: 3, startDay: 1, startYear: 2026, endMonth: 4, endDay: 1, endYear: 2026 },
      result: "31 days between the dates.",
    },
    {
      title: "Counting days to a trip",
      description: "From January 10, 2026 to February 5, 2026.",
      inputs: { startMonth: 1, startDay: 10, startYear: 2026, endMonth: 2, endDay: 5, endYear: 2026 },
      result: "26 days between the dates.",
    },
  ],

  faqs: [
    { question: "Does this include the start date?", answer: "This shows the difference between the two dates. If you want to count inclusively, add 1 day to the result." },
    { question: "Why use UTC?", answer: "UTC avoids daylight saving time changes that can shift local midnight and cause off-by-one results." },
    { question: "Can the end date be before the start date?", answer: "Yes. The calculator still shows the absolute days between and notes the direction." },
    { question: "Are months and years exact?", answer: "Months and years are estimates based on average day counts. The exact day count is the primary result." },
  ],

  relatedSlugs: [
    "date-difference-calculator",
    "time-until-date-calculator",
    "days-until-calculator",
    "age-difference-calculator",
  ],
};

export default def;
