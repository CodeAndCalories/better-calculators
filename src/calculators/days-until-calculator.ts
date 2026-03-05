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

function diffDaysFromTodayUTC(target: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  const now = new Date();
  const todayUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const targetUTC = Date.UTC(target.getUTCFullYear(), target.getUTCMonth(), target.getUTCDate());
  return Math.round((targetUTC - todayUTC) / msPerDay);
}

const def: CalculatorDef = {
  slug: "days-until-calculator",
  title: "How Many Days Until Calculator",
  shortTitle: "Days Until",
  description: "Find how many days are left until a future date.",
  longDescription:
    "Enter a future date to see how many days remain. This is great for counting down to birthdays, holidays, vacations, and deadlines. The result updates based on today's date.",
  category: "life",
  keywords: ["days until calculator", "how many days until", "countdown days"],
  inputs: [
    { type: "number", key: "month", label: "Target Month", defaultValue: 12, min: 1, max: 12, step: 1, placeholder: "12" },
    { type: "number", key: "day", label: "Target Day", defaultValue: 31, min: 1, max: 31, step: 1, placeholder: "31" },
    { type: "number", key: "year", label: "Target Year", defaultValue: 2026, min: 1, max: 9999, step: 1, placeholder: "2026" },
  ],

  compute(values: InputValues): ComputeResult {
    const target = toUTCDate(Number(values.year), Number(values.month), Number(values.day));
    if (!target) {
      return { outputs: [{ key: "error", label: "Result", value: "Enter a valid target date.", format: "text", highlight: true }] };
    }

    const days = diffDaysFromTodayUTC(target);
    const absDays = Math.abs(days);
    const weeks = absDays / 7;

    const summary =
      days > 0 ? `${days} days until your date.` : days < 0 ? `${absDays} days since your date.` : "That date is today.";

    return {
      outputs: [
        { key: "days", label: "Days", value: absDays, format: "number", highlight: true },
        { key: "weeks", label: "Weeks (approx)", value: Number(weeks.toFixed(2)), format: "number" },
        { key: "note", label: "Note", value: summary, format: "text" },
      ],
    };
  },

  howItWorks:
    "We compare your target date to today's date (using UTC midnight to avoid daylight saving issues) and compute the difference in whole days.",

  examples: [
    {
      title: "Vacation countdown",
      description: "Count the days until a trip date.",
      inputs: { month: 6, day: 15, year: 2026 },
      result: "Shows the number of days remaining from today.",
    },
    {
      title: "Birthday countdown",
      description: "Find how many days until a birthday.",
      inputs: { month: 9, day: 2, year: 2026 },
      result: "Shows the days until the birthday date.",
    },
  ],

  faqs: [
    { question: "Does this update automatically?", answer: "Yes. The result depends on today's date, so it naturally changes as days pass." },
    { question: "Why use UTC?", answer: "UTC avoids daylight saving time changes that can cause off-by-one errors in day counts." },
    { question: "What if the date is in the past?", answer: "It will show how many days have passed since that date." },
    { question: "Is this inclusive of today?", answer: "This is a straight difference between dates. If you want to count inclusively, add 1 day." },
  ],

  relatedSlugs: [
    "time-until-date-calculator",
    "days-between-dates-calculator",
    "date-difference-calculator",
    "age-difference-calculator",
  ],
};

export default def;
