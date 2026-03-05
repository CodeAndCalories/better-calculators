import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

// Helper: format a Date as 12-hour clock string with AM/PM
function format12(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${String(minutes).padStart(2, "0")} ${ampm}`;
}

// Helper: format a Date as 24-hour clock string
function format24(date: Date): string {
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

// Helper: day-of-week label
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(date: Date): string {
  return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}`;
}

const def: CalculatorDef = {
  slug: "time-in-x-minutes",
  title: "What Time Will It Be in X Minutes?",
  shortTitle: "Time in X Minutes",
  description:
    "Enter a start time and add or subtract any number of minutes (or hours) to find exactly what time it will be.",
  longDescription:
    "Quickly find out what time it will be after a given number of minutes or hours from any starting time. Useful for setting timers, scheduling meetings, calculating cook times, tracking medication intervals, or planning commutes. Supports both addition and subtraction, crosses midnight correctly, and shows results in both 12-hour and 24-hour formats.",
  category: "life",
  keywords: [
    "what time will it be in x minutes",
    "time calculator",
    "add minutes to time",
    "time in 30 minutes",
    "time in 45 minutes",
    "what time is it in 2 hours",
  ],
  inputs: [
    {
      type: "number",
      key: "startHour",
      label: "Start Hour",
      defaultValue: 9,
      min: 0,
      max: 23,
      step: 1,
      placeholder: "9",
      helpText: "24-hour format (0 = midnight, 13 = 1 PM)",
    },
    {
      type: "number",
      key: "startMinute",
      label: "Start Minute",
      suffix: "min",
      defaultValue: 0,
      min: 0,
      max: 59,
      step: 1,
      placeholder: "0",
      helpText: "0–59",
    },
    {
      type: "select",
      key: "operation",
      label: "Add or Subtract?",
      defaultValue: "add",
      options: [
        { label: "➕ Add time (forward)", value: "add" },
        { label: "➖ Subtract time (backward)", value: "subtract" },
      ],
    },
    {
      type: "number",
      key: "deltaHours",
      label: "Hours to Add/Subtract",
      suffix: "hr",
      defaultValue: 0,
      min: 0,
      step: 1,
      placeholder: "0",
      helpText: "Leave 0 if using only minutes",
    },
    {
      type: "number",
      key: "deltaMinutes",
      label: "Minutes to Add/Subtract",
      suffix: "min",
      defaultValue: 45,
      min: 0,
      step: 1,
      placeholder: "45",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const startHour = Number(values.startHour);
    const startMinute = Number(values.startMinute);
    const deltaHours = Number(values.deltaHours) || 0;
    const deltaMinutes = Number(values.deltaMinutes) || 0;
    const operation = values.operation as string;

    if (startHour < 0 || startHour > 23) {
      return { outputs: [], error: "Start hour must be between 0 and 23 (24-hour format)." };
    }
    if (startMinute < 0 || startMinute > 59) {
      return { outputs: [], error: "Start minute must be between 0 and 59." };
    }
    if (deltaHours < 0 || deltaMinutes < 0) {
      return { outputs: [], error: "Hours and minutes to add/subtract cannot be negative." };
    }
    if (deltaHours === 0 && deltaMinutes === 0) {
      return { outputs: [], error: "Please enter a duration to add or subtract (at least 1 minute)." };
    }

    const totalDeltaMinutes = deltaHours * 60 + deltaMinutes;

    // Use a reference date (today) but only care about time
    const now = new Date();
    const start = new Date(
      now.getFullYear(), now.getMonth(), now.getDate(),
      startHour, startMinute, 0, 0
    );

    const deltaMs = totalDeltaMinutes * 60 * 1000;
    const result =
      operation === "add"
        ? new Date(start.getTime() + deltaMs)
        : new Date(start.getTime() - deltaMs);

    // Did we cross midnight?
    const crossedMidnight = result.getDate() !== start.getDate();
    const dayDiff = Math.round(
      (result.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );

    const time12 = format12(result);
    const time24 = format24(result);
    const dayLabel = crossedMidnight
      ? operation === "add"
        ? `Next day (${formatDate(result)})`
        : `Previous day (${formatDate(result)})`
      : `Same day (${formatDate(result)})`;

    // Human-readable duration string
    const dHours = Math.floor(totalDeltaMinutes / 60);
    const dMins = totalDeltaMinutes % 60;
    const durationParts: string[] = [];
    if (dHours > 0) durationParts.push(`${dHours} hour${dHours !== 1 ? "s" : ""}`);
    if (dMins > 0) durationParts.push(`${dMins} minute${dMins !== 1 ? "s" : ""}`);
    const durationStr = durationParts.join(" ");

    const startLabel = `${format12(start)} (${format24(start)})`;
    const opWord = operation === "add" ? "after" : "before";
    const summaryStr = `${durationStr} ${opWord} ${format12(start)}`;

    return {
      outputs: [
        {
          key: "result12",
          label: "Result Time (12-hour)",
          value: time12,
          format: "text",
          highlight: true,
          helpText: summaryStr,
        },
        {
          key: "result24",
          label: "Result Time (24-hour)",
          value: time24,
          format: "text",
        },
        {
          key: "startTime",
          label: "Start Time",
          value: startLabel,
          format: "text",
        },
        {
          key: "dayNote",
          label: "Day",
          value: dayLabel,
          format: "text",
          helpText: crossedMidnight ? "Midnight was crossed" : undefined,
        },
        {
          key: "totalMinutes",
          label: "Total Offset",
          value: `${operation === "subtract" ? "−" : "+"}${totalDeltaMinutes} minute${totalDeltaMinutes !== 1 ? "s" : ""} (${durationStr})`,
          format: "text",
        },
      ],
    };
  },

  howItWorks: `We convert the start time to a JavaScript Date object set to today's date. The offset (hours × 60 + minutes = total minutes) is multiplied by 60,000 to get milliseconds, then added or subtracted from the start timestamp. JavaScript handles all edge cases — midnight rollovers, month-end crossings, and DST transitions — automatically. The result is formatted into both 12-hour (with AM/PM) and 24-hour notation.`,

  examples: [
    {
      title: "9:00 AM + 45 Minutes",
      description:
        "A common scenario: a meeting starts at 9:00 AM and is scheduled for 45 minutes — what time does it end?",
      inputs: {
        startHour: 9, startMinute: 0,
        operation: "add",
        deltaHours: 0, deltaMinutes: 45,
      },
      result: "9:45 AM (09:45) — same day.",
    },
    {
      title: "11:30 PM + 1 Hour 15 Minutes",
      description:
        "A late-night scenario that crosses midnight — useful for shift workers or long drives.",
      inputs: {
        startHour: 23, startMinute: 30,
        operation: "add",
        deltaHours: 1, deltaMinutes: 15,
      },
      result: "12:45 AM (00:45) — next day. Midnight is crossed correctly.",
    },
  ],

  faqs: [
    {
      question: "What format should I enter the start hour in?",
      answer:
        "Use 24-hour format (also called military time): 0 = midnight, 1–11 = 1 AM to 11 AM, 12 = noon, 13–23 = 1 PM to 11 PM. So 3 PM is entered as 15, and 9 PM is entered as 21. The result is shown in both 12-hour (AM/PM) and 24-hour formats.",
    },
    {
      question: "Does the calculator handle midnight crossovers?",
      answer:
        "Yes. If you add time past midnight (e.g. 11:00 PM + 2 hours = 1:00 AM) or subtract past midnight (e.g. 1:00 AM − 90 minutes = 11:30 PM the previous day), the calculator correctly rolls over and tells you which day the result falls on.",
    },
    {
      question: "What are some practical uses for this calculator?",
      answer:
        "Medication timing (take again in 4 hours), cooking (roast needs 2h 45m, put it in at what time?), meeting end times, parking meter expiry, shift end time, DNS / cache TTL expiry, and deadline countdowns are all common uses.",
    },
    {
      question: "Can I calculate what time it was X minutes ago?",
      answer:
        "Yes — switch the operation to 'Subtract time (backward)' and enter your current time as the start. The result will show what time it was that many minutes in the past, including rolling back past midnight if necessary.",
    },
  ],

  relatedSlugs: [
    "date-difference-calculator",
    "time-duration-calculator",
    "hours-to-minutes-calculator",
  ],
};

export default def;
