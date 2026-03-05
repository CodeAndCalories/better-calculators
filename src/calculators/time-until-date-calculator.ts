import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

function toUTCTarget(year: number, month: number, day: number, hour24: number, minute: number): Date | null {
  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) return null;
  if (!Number.isFinite(hour24) || !Number.isFinite(minute)) return null;
  if (year < 1 || year > 9999) return null;
  if (month < 1 || month > 12) return null;
  if (day < 1 || day > 31) return null;
  if (hour24 < 0 || hour24 > 23) return null;
  if (minute < 0 || minute > 59) return null;

  const d = new Date(Date.UTC(year, month - 1, day, hour24, minute, 0, 0));
  if (d.getUTCFullYear() !== year || d.getUTCMonth() !== month - 1 || d.getUTCDate() !== day) return null;
  return d;
}

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

const def: CalculatorDef = {
  slug: "time-until-date-calculator",
  title: "Time Until Date Calculator",
  shortTitle: "Time Until Date",
  description: "Find how much time is left until a future date and time.",
  longDescription:
    "Enter a target date and time to see how long remains. This calculator shows days, hours, and minutes until the target moment. Useful for deadlines, events, launches, and countdowns.",
  category: "life",
  keywords: ["time until date calculator", "countdown calculator", "how long until"],
  inputs: [
    { type: "number", key: "month", label: "Target Month", defaultValue: 12, min: 1, max: 12, step: 1, placeholder: "12" },
    { type: "number", key: "day", label: "Target Day", defaultValue: 31, min: 1, max: 31, step: 1, placeholder: "31" },
    { type: "number", key: "year", label: "Target Year", defaultValue: 2026, min: 1, max: 9999, step: 1, placeholder: "2026" },

    { type: "number", key: "hour", label: "Hour (1–12)", defaultValue: 9, min: 1, max: 12, step: 1, placeholder: "9" },
    { type: "number", key: "minute", label: "Minute (0–59)", defaultValue: 0, min: 0, max: 59, step: 1, placeholder: "0" },
    {
      type: "select",
      key: "ampm",
      label: "AM/PM",
      defaultValue: "AM",
      options: [
        { label: "AM", value: "AM" },
        { label: "PM", value: "PM" },
      ],
    },
  ],

  compute(values: InputValues): ComputeResult {
    const month = Number(values.month);
    const day = Number(values.day);
    const year = Number(values.year);
    const hour12 = Number(values.hour);
    const minute = Number(values.minute);
    const ampm = String(values.ampm || "AM").toUpperCase();

    if (!Number.isFinite(hour12) || hour12 < 1 || hour12 > 12) {
      return { outputs: [{ key: "error", label: "Result", value: "Enter a valid hour (1–12).", format: "text", highlight: true }] };
    }

    let hour24 = hour12 % 12;
    if (ampm === "PM") hour24 += 12;

    const target = toUTCTarget(year, month, day, hour24, minute);
    if (!target) {
      return { outputs: [{ key: "error", label: "Result", value: "Enter a valid target date and time.", format: "text", highlight: true }] };
    }

    const now = new Date();
    // Compare using UTC timestamp for stability
    const diffMs = target.getTime() - now.getTime();

    const isPast = diffMs < 0;
    const absMs = Math.abs(diffMs);

    const totalMinutes = Math.floor(absMs / (60 * 1000));
    const daysLeft = Math.floor(totalMinutes / (60 * 24));
    const hoursLeft = Math.floor((totalMinutes - daysLeft * 60 * 24) / 60);
    const minutesLeft = totalMinutes - daysLeft * 60 * 24 - hoursLeft * 60;

    const label = isPast ? "Time Since Target" : "Time Until Target";

    const targetText = `${month}/${day}/${year} ${hour12}:${pad2(minute)} ${ampm}`;

    return {
      outputs: [
        { key: "summary", label, value: `${daysLeft}d ${hoursLeft}h ${minutesLeft}m`, format: "text", highlight: true },
        { key: "days", label: "Days", value: daysLeft, format: "number" },
        { key: "hours", label: "Hours", value: hoursLeft, format: "number" },
        { key: "minutes", label: "Minutes", value: minutesLeft, format: "number" },
        { key: "target", label: "Target", value: targetText, format: "text" },
      ],
    };
  },

  howItWorks:
    "We compute the difference between the target date/time and the current moment, then convert the milliseconds into days, hours, and minutes.",

  examples: [
    {
      title: "Countdown to a deadline",
      description: "See the time left until a specific date and time.",
      inputs: { month: 7, day: 1, year: 2026, hour: 9, minute: 0, ampm: "AM" },
      result: "Outputs days, hours, and minutes remaining.",
    },
    {
      title: "Event later tonight",
      description: "A quick countdown for an evening event.",
      inputs: { month: 3, day: 10, year: 2026, hour: 7, minute: 30, ampm: "PM" },
      result: "Shows time until the target moment.",
    },
  ],

  faqs: [
    { question: "Does this use my timezone?", answer: "Yes. It compares against your current local time. The target is entered in your local time as well." },
    { question: "What if the target is in the past?", answer: "It will show the time since the target instead of time until." },
    { question: "Why might minutes change as I type?", answer: "The countdown updates based on the current time, so values can tick forward as the clock moves." },
    { question: "Can I count down to midnight?", answer: "Yes. Use 12:00 AM on the target date." },
  ],

  relatedSlugs: [
    "days-until-calculator",
    "days-between-dates-calculator",
    "date-difference-calculator",
    "time-in-x-minutes",
  ],
};

export default def;
