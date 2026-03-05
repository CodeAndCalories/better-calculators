import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

function toUTCDate(year: number, month: number, day: number): Date | null {
  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) return null;
  if (year < 1 || year > 9999) return null;
  if (month < 1 || month > 12) return null;
  if (day < 1 || day > 31) return null;

  const d = new Date(Date.UTC(year, month - 1, day));
  if (d.getUTCFullYear() !== year || d.getUTCMonth() !== month - 1 || d.getUTCDate() !== day) return null;
  return d;
}

function compareUTC(a: Date, b: Date): number {
  const ta = Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate());
  const tb = Date.UTC(b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate());
  return ta - tb;
}

function diffYMD(older: Date, newer: Date): { years: number; months: number; days: number } {
  let y = newer.getUTCFullYear() - older.getUTCFullYear();
  let m = newer.getUTCMonth() - older.getUTCMonth();
  let d = newer.getUTCDate() - older.getUTCDate();

  if (d < 0) {
    // borrow days from previous month
    const prevMonth = new Date(Date.UTC(newer.getUTCFullYear(), newer.getUTCMonth(), 0));
    d += prevMonth.getUTCDate();
    m -= 1;
  }
  if (m < 0) {
    m += 12;
    y -= 1;
  }
  return { years: y, months: m, days: d };
}

const def: CalculatorDef = {
  slug: "age-difference-calculator",
  title: "Age Difference Calculator",
  shortTitle: "Age Difference",
  description: "Calculate the age difference between two birthdays in years, months, and days.",
  longDescription:
    "Enter two birth dates to calculate the age difference. This tool shows the difference in years, months, and days, plus the total days between the two dates. Helpful for anniversaries, siblings, and timelines.",
  category: "life",
  keywords: ["age difference calculator", "birthday difference", "years months days difference"],
  inputs: [
    { type: "number", key: "aMonth", label: "Person A Month", defaultValue: 1, min: 1, max: 12, step: 1, placeholder: "1" },
    { type: "number", key: "aDay", label: "Person A Day", defaultValue: 1, min: 1, max: 31, step: 1, placeholder: "1" },
    { type: "number", key: "aYear", label: "Person A Year", defaultValue: 1995, min: 1, max: 9999, step: 1, placeholder: "1995" },

    { type: "number", key: "bMonth", label: "Person B Month", defaultValue: 1, min: 1, max: 12, step: 1, placeholder: "1" },
    { type: "number", key: "bDay", label: "Person B Day", defaultValue: 1, min: 1, max: 31, step: 1, placeholder: "1" },
    { type: "number", key: "bYear", label: "Person B Year", defaultValue: 2000, min: 1, max: 9999, step: 1, placeholder: "2000" },
  ],

  compute(values: InputValues): ComputeResult {
    const a = toUTCDate(Number(values.aYear), Number(values.aMonth), Number(values.aDay));
    const b = toUTCDate(Number(values.bYear), Number(values.bMonth), Number(values.bDay));

    if (!a || !b) {
      return {
        outputs: [
          { key: "error", label: "Result", value: "Enter two valid birth dates.", format: "text", highlight: true },
        ],
      };
    }

    const older = compareUTC(a, b) <= 0 ? a : b;
    const newer = compareUTC(a, b) <= 0 ? b : a;

    const { years, months, days } = diffYMD(older, newer);

    const msPerDay = 24 * 60 * 60 * 1000;
    const totalDays = Math.round(
      (Date.UTC(newer.getUTCFullYear(), newer.getUTCMonth(), newer.getUTCDate()) -
        Date.UTC(older.getUTCFullYear(), older.getUTCMonth(), older.getUTCDate())) /
        msPerDay
    );

    return {
      outputs: [
        { key: "ymd", label: "Difference (Y M D)", value: `${years} years, ${months} months, ${days} days`, format: "text", highlight: true },
        { key: "years", label: "Years", value: years, format: "number" },
        { key: "months", label: "Additional Months", value: months, format: "number" },
        { key: "days", label: "Additional Days", value: days, format: "number" },
        { key: "totalDays", label: "Total Days Between", value: Math.abs(totalDays), format: "number" },
      ],
    };
  },

  howItWorks:
    "We compare the two dates, then compute the difference in years, months, and days by borrowing days from the prior month when needed. Total days is calculated using UTC midnight to avoid DST issues.",

  examples: [
    {
      title: "Sibling age gap",
      description: "One birthday in 1995 and another in 2000.",
      inputs: { aMonth: 6, aDay: 10, aYear: 1995, bMonth: 9, bDay: 2, bYear: 2000 },
      result: "Shows the difference in years, months, and days.",
    },
    {
      title: "Two close dates",
      description: "Two birthdays a few weeks apart.",
      inputs: { aMonth: 1, aDay: 5, aYear: 2001, bMonth: 2, bDay: 1, bYear: 2001 },
      result: "0 years, 0 months, 27 days (and total days).",
    },
  ],

  faqs: [
    { question: "Does this work if Person B is older?", answer: "Yes. The calculator automatically determines which date is earlier and reports the positive difference." },
    { question: "Why might results differ from another site?", answer: "Different calculators handle month and day borrowing differently. This version uses a standard year/month/day difference method." },
    { question: "Is the total day count exact?", answer: "Yes, total days is an exact difference between the two dates at UTC midnight." },
    { question: "Can I use this for anniversaries instead of birthdays?", answer: "Absolutely. Any two dates work." },
  ],

  relatedSlugs: [
    "days-between-dates-calculator",
    "date-difference-calculator",
    "time-until-date-calculator",
    "days-until-calculator",
  ],
};

export default def;
