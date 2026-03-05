import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

function toMinutesSinceMidnight(hour12: number, minute: number, ampm: string): number | null {
  if (!Number.isFinite(hour12) || hour12 < 1 || hour12 > 12) return null;
  if (!Number.isFinite(minute) || minute < 0 || minute > 59) return null;

  const ap = String(ampm || "AM").toUpperCase();
  let h = hour12 % 12;
  if (ap === "PM") h += 12;
  if (ap !== "AM" && ap !== "PM") return null;

  return h * 60 + minute;
}

function formatHM(totalMinutes: number): string {
  const m = Math.max(0, Math.round(totalMinutes));
  const h = Math.floor(m / 60);
  const r = m % 60;
  return `${h}h ${String(r).padStart(2, "0")}m`;
}

const def: CalculatorDef = {
  slug: "time-between-times-calculator",
  title: "Time Between Times Calculator",
  shortTitle: "Time Between Times",
  description: "Find the time difference between two clock times, with optional overnight handling.",
  longDescription:
    "This calculator finds the time between two times (like 9:15 AM to 4:45 PM). It returns the difference in hours and minutes and also as decimal hours. If your end time is on the next day, enable the overnight option.",
  category: "life",
  keywords: ["time between times calculator", "time difference", "hours between times", "duration between times"],
  inputs: [
    { type: "number", key: "startHour", label: "Start Hour (1–12)", defaultValue: 9, min: 1, max: 12, step: 1, placeholder: "9" },
    { type: "number", key: "startMinute", label: "Start Minute (0–59)", defaultValue: 0, min: 0, max: 59, step: 1, placeholder: "0" },
    {
      type: "select",
      key: "startAmPm",
      label: "Start AM/PM",
      defaultValue: "AM",
      options: [
        { label: "AM", value: "AM" },
        { label: "PM", value: "PM" },
      ],
    },

    { type: "number", key: "endHour", label: "End Hour (1–12)", defaultValue: 5, min: 1, max: 12, step: 1, placeholder: "5" },
    { type: "number", key: "endMinute", label: "End Minute (0–59)", defaultValue: 0, min: 0, max: 59, step: 1, placeholder: "0" },
    {
      type: "select",
      key: "endAmPm",
      label: "End AM/PM",
      defaultValue: "PM",
      options: [
        { label: "AM", value: "AM" },
        { label: "PM", value: "PM" },
      ],
    },

    {
      type: "toggle",
      key: "overnight",
      label: "Overnight (end is next day)",
      defaultValue: false,
    },
  ],

  compute(values: InputValues): ComputeResult {
    const start = toMinutesSinceMidnight(Number(values.startHour), Number(values.startMinute), String(values.startAmPm));
    const end = toMinutesSinceMidnight(Number(values.endHour), Number(values.endMinute), String(values.endAmPm));
    const overnight = Boolean(values.overnight);

    if (start === null || end === null) {
      return { outputs: [{ key: "error", label: "Result", value: "Enter a valid start and end time.", format: "text", highlight: true }] };
    }

    let diff = end - start;
    if (overnight && diff <= 0) diff += 24 * 60;
    if (!overnight && diff < 0) {
      return { outputs: [{ key: "error", label: "Result", value: "End time is earlier than start time. Enable overnight if needed.", format: "text", highlight: true }] };
    }

    const hoursDecimal = diff / 60;

    return {
      outputs: [
        { key: "durationHM", label: "Duration (h m)", value: formatHM(diff), format: "text", highlight: true },
        { key: "durationHours", label: "Duration (decimal hours)", value: Number(hoursDecimal.toFixed(2)), format: "number" },
        { key: "totalMinutes", label: "Total Minutes", value: Math.round(diff), format: "number" },
      ],
    };
  },

  howItWorks:
    "We convert each time to minutes since midnight, subtract to get the difference, and optionally add 24 hours if the end time is the next day. Decimal hours are minutes divided by 60.",

  examples: [
    {
      title: "Workday example",
      description: "From 9:00 AM to 4:45 PM.",
      inputs: { startHour: 9, startMinute: 0, startAmPm: "AM", endHour: 4, endMinute: 45, endAmPm: "PM", overnight: false },
      result: "7h 45m (7.75 hours).",
    },
    {
      title: "Overnight example",
      description: "From 10:30 PM to 2:15 AM the next day.",
      inputs: { startHour: 10, startMinute: 30, startAmPm: "PM", endHour: 2, endMinute: 15, endAmPm: "AM", overnight: true },
      result: "3h 45m (3.75 hours).",
    },
  ],

  faqs: [
    { question: "What if the end time is earlier than the start time?", answer: "Enable the overnight option to treat the end time as the next day." },
    { question: "Why show decimal hours?", answer: "Decimal hours make it easy to multiply by an hourly rate for billing or payroll." },
    { question: "Does this account for breaks?", answer: "This calculator measures time between two times. Use the Work Hours Calculator if you want to subtract break minutes." },
    { question: "Is this affected by daylight saving time?", answer: "This uses clock time conversion to minutes. For exact date and timezone differences, use a date based calculator." },
  ],

  relatedSlugs: [
    "work-hours-calculator",
    "time-duration-calculator",
    "minutes-to-hours-calculator",
    "hours-to-minutes-calculator",
    "date-difference-calculator",
  ],
};

export default def;
