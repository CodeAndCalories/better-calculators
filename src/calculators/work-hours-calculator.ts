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
  slug: "work-hours-calculator",
  title: "Work Hours Calculator",
  shortTitle: "Work Hours",
  description: "Calculate total work hours between a start and end time, including breaks.",
  longDescription:
    "Use this Work Hours Calculator to find how many hours you worked. Enter your start time, end time, and optional break minutes to get total worked time in hours (decimal) and hours and minutes. Great for timesheets, payroll, and shift planning.",
  category: "life",
  keywords: ["work hours calculator", "hours worked", "timesheet calculator", "shift hours calculator"],
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

    { type: "number", key: "breakMinutes", label: "Break Minutes", defaultValue: 30, min: 0, max: 600, step: 5, placeholder: "30" },
    {
      type: "toggle",
      key: "overnight",
      label: "Overnight shift (end is next day)",
      defaultValue: false,
    },
  ],

  compute(values: InputValues): ComputeResult {
    const start = toMinutesSinceMidnight(Number(values.startHour), Number(values.startMinute), String(values.startAmPm));
    const end = toMinutesSinceMidnight(Number(values.endHour), Number(values.endMinute), String(values.endAmPm));
    const breakMinutes = Number(values.breakMinutes);
    const overnight = Boolean(values.overnight);

    if (start === null || end === null) {
      return {
        outputs: [{ key: "error", label: "Result", value: "Enter a valid start and end time.", format: "text", highlight: true }],
      };
    }
    if (!Number.isFinite(breakMinutes) || breakMinutes < 0) {
      return {
        outputs: [{ key: "error", label: "Result", value: "Enter a valid break minutes value (0 or more).", format: "text", highlight: true }],
      };
    }

    let diff = end - start;
    if (overnight && diff <= 0) diff += 24 * 60;
    if (!overnight && diff < 0) {
      return {
        outputs: [{ key: "error", label: "Result", value: "End time is earlier than start time. Enable overnight shift if needed.", format: "text", highlight: true }],
      };
    }

    const worked = Math.max(0, diff - breakMinutes);
    const hoursDecimal = worked / 60;

    return {
      outputs: [
        { key: "workedHours", label: "Hours Worked (decimal)", value: Number(hoursDecimal.toFixed(2)), format: "number", highlight: true },
        { key: "workedHM", label: "Hours Worked (h m)", value: formatHM(worked), format: "text" },
        { key: "shiftLength", label: "Shift Length (before breaks)", value: formatHM(diff), format: "text" },
        { key: "breaks", label: "Break Time", value: `${Math.round(breakMinutes)} minutes`, format: "text" },
      ],
    };
  },

  howItWorks:
    "We convert your start and end times into minutes since midnight, subtract to get shift length, then subtract break minutes to get hours worked. Decimal hours are simply worked minutes divided by 60.",

  examples: [
    {
      title: "9:00 AM to 5:00 PM with a 30 minute break",
      description: "A common full day shift.",
      inputs: { startHour: 9, startMinute: 0, startAmPm: "AM", endHour: 5, endMinute: 0, endAmPm: "PM", breakMinutes: 30, overnight: false },
      result: "8h shift minus 30m break = 7.50 hours worked.",
    },
    {
      title: "Overnight shift",
      description: "11:00 PM to 7:00 AM with a 45 minute break.",
      inputs: { startHour: 11, startMinute: 0, startAmPm: "PM", endHour: 7, endMinute: 0, endAmPm: "AM", breakMinutes: 45, overnight: true },
      result: "8h shift minus 45m break = 7.25 hours worked.",
    },
  ],

  faqs: [
    { question: "How do I calculate hours worked for a shift?", answer: "Subtract start time from end time to get shift length, then subtract unpaid break minutes. Convert minutes to hours by dividing by 60." },
    { question: "What is decimal hours used for?", answer: "Decimal hours are common for payroll and timesheets because they are easy to multiply by an hourly rate." },
    { question: "What if my shift crosses midnight?", answer: "Enable the overnight shift toggle so the end time is treated as the next day." },
    { question: "Does this include paid breaks?", answer: "If your break is paid, set break minutes to 0. If it is unpaid, enter the break minutes to subtract it." },
  ],

  relatedSlugs: [
    "time-between-times-calculator",
    "time-duration-calculator",
    "minutes-to-hours-calculator",
    "hours-to-minutes-calculator",
    "salary-to-hourly-calculator",
  ],
};

export default def;
