import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

// ── Formatting helpers ────────────────────────────────────────────────────────

function format12(date: Date): string {
  let h = date.getHours();
  const m = date.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${String(m).padStart(2, "0")} ${ampm}`;
}

function format24(date: Date): string {
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function formatDate(d: Date): string {
  return `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`;
}

// ─────────────────────────────────────────────────────────────────────────────

const def: CalculatorDef = {
  slug: "time-x-minutes-ago",
  title: "What Time Was It X Minutes Ago?",
  shortTitle: "Time X Minutes Ago",
  description:
    "Enter any current time and subtract any number of minutes or hours to find out exactly what time it was in the past.",
  longDescription:
    "Need to figure out what time something started, when a medication was last taken, or when an event occurred before a known reference point? Our calculator subtracts any duration — in hours and minutes — from any starting time and tells you the exact result in both 12-hour and 24-hour formats. It handles midnight rollovers correctly so crossing into the previous day is never a problem.",
  category: "life",
  keywords: [
    "what time was it x minutes ago",
    "time calculator",
    "subtract time",
    "time in the past calculator",
    "what time was it 30 minutes ago",
    "what time was it 2 hours ago",
  ],
  inputs: [
    {
      type: "number",
      key: "currentHour",
      label: "Reference Hour (now or any time)",
      defaultValue: 14,
      min: 0,
      max: 23,
      step: 1,
      placeholder: "14",
      helpText: "24-hour format — 0 = midnight, 13 = 1 PM, 14 = 2 PM",
    },
    {
      type: "number",
      key: "currentMinute",
      label: "Reference Minute",
      suffix: "min",
      defaultValue: 30,
      min: 0,
      max: 59,
      step: 1,
      placeholder: "30",
      helpText: "0–59",
    },
    {
      type: "number",
      key: "deltaHours",
      label: "Hours Ago",
      suffix: "hr",
      defaultValue: 0,
      min: 0,
      step: 1,
      placeholder: "0",
      helpText: "Leave 0 if subtracting minutes only",
    },
    {
      type: "number",
      key: "deltaMinutes",
      label: "Minutes Ago",
      suffix: "min",
      defaultValue: 45,
      min: 0,
      step: 1,
      placeholder: "45",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const currentHour   = Number(values.currentHour);
    const currentMinute = Number(values.currentMinute);
    const deltaHours    = Number(values.deltaHours)   || 0;
    const deltaMinutes  = Number(values.deltaMinutes) || 0;

    if (currentHour < 0 || currentHour > 23) {
      return { outputs: [], error: "Reference hour must be between 0 and 23." };
    }
    if (currentMinute < 0 || currentMinute > 59) {
      return { outputs: [], error: "Reference minute must be between 0 and 59." };
    }
    if (deltaHours < 0 || deltaMinutes < 0) {
      return { outputs: [], error: "Hours ago and minutes ago cannot be negative." };
    }
    if (deltaHours === 0 && deltaMinutes === 0) {
      return { outputs: [], error: "Please enter a duration greater than zero." };
    }

    const totalDeltaMin = deltaHours * 60 + deltaMinutes;

    // Use today as a reference date — only the time component matters for output
    const now = new Date();
    const reference = new Date(
      now.getFullYear(), now.getMonth(), now.getDate(),
      currentHour, currentMinute, 0, 0
    );
    const past = new Date(reference.getTime() - totalDeltaMin * 60_000);

    const crossedMidnight = past.getDate() !== reference.getDate();
    const dayLabel = crossedMidnight
      ? `Previous day (${formatDate(past)})`
      : `Same day (${formatDate(reference)})`;

    // Human-readable offset
    const dHr  = Math.floor(totalDeltaMin / 60);
    const dMin = totalDeltaMin % 60;
    const dParts: string[] = [];
    if (dHr  > 0) dParts.push(`${dHr} hour${dHr   !== 1 ? "s" : ""}`);
    if (dMin > 0) dParts.push(`${dMin} minute${dMin !== 1 ? "s" : ""}`);
    const durationStr = dParts.join(" ");

    const refLabel  = `${format12(reference)} (${format24(reference)})`;
    const summaryStr = `${durationStr} before ${format12(reference)}`;

    return {
      outputs: [
        {
          key: "pastTime12",
          label: "Time in the Past (12-hour)",
          value: format12(past),
          format: "text",
          highlight: true,
          helpText: summaryStr,
        },
        {
          key: "pastTime24",
          label: "Time in the Past (24-hour)",
          value: format24(past),
          format: "text",
        },
        {
          key: "referenceTime",
          label: "Reference Time",
          value: refLabel,
          format: "text",
        },
        {
          key: "dayNote",
          label: "Day",
          value: dayLabel,
          format: "text",
          helpText: crossedMidnight ? "Rolled back past midnight" : undefined,
        },
        {
          key: "totalOffset",
          label: "Total Offset",
          value: `−${totalDeltaMin} minute${totalDeltaMin !== 1 ? "s" : ""} (${durationStr})`,
          format: "text",
        },
      ],
    };
  },

  howItWorks: `The reference time is converted to a JavaScript Date object using today's date. The offset (hours × 60 + minutes = total minutes) is multiplied by 60,000 to get milliseconds and subtracted from the reference timestamp. JavaScript's Date handles midnight rollovers and daylight-saving transitions automatically. The result is formatted into both 12-hour AM/PM and 24-hour notation, and the output notes whether the result crossed into the previous calendar day.`,

  examples: [
    {
      title: "2:30 PM — 45 Minutes Ago",
      description:
        "Finding when a meeting or task began given a known end time — e.g. a 45-minute session that just ended at 2:30 PM.",
      inputs: { currentHour: 14, currentMinute: 30, deltaHours: 0, deltaMinutes: 45 },
      result: "1:45 PM (13:45) — same day.",
    },
    {
      title: "1:15 AM — 2 Hours 30 Minutes Ago",
      description:
        "A late-night scenario where subtracting crosses back past midnight into the previous day.",
      inputs: { currentHour: 1, currentMinute: 15, deltaHours: 2, deltaMinutes: 30 },
      result: "10:45 PM (22:45) — previous day. Midnight rollover handled correctly.",
    },
  ],

  faqs: [
    {
      question: "What is the 24-hour format for common times?",
      answer:
        "Midnight = 0, 1 AM = 1, 6 AM = 6, noon = 12, 1 PM = 13, 3 PM = 15, 6 PM = 18, 9 PM = 21, 11 PM = 23. To convert any PM time: add 12 to the 12-hour value (except noon). So 7 PM = 7 + 12 = 19.",
    },
    {
      question: "Does this cross midnight correctly?",
      answer:
        "Yes. If subtracting the duration takes you past midnight (e.g. 12:30 AM minus 2 hours = 10:30 PM), the calculator correctly shows the previous day's time and labels the result as 'Previous day' so there is no ambiguity.",
    },
    {
      question: "What are practical uses for this calculator?",
      answer:
        "Recalling when you last took medication (took a dose at 3 PM, need to know when 6 hours prior was), timestamping a past event from a known current time, determining a meeting start time from its end time, or figuring out what time a shift started.",
    },
    {
      question: "How is this different from the 'Time in X Minutes' calculator?",
      answer:
        "The 'Time in X Minutes' calculator adds time forward to find a future time. This calculator always subtracts backward to find a past time. Both use the same underlying arithmetic — just in opposite directions.",
    },
  ],

  relatedSlugs: [
    "time-in-x-minutes",
    "time-duration-calculator",
    "date-difference-calculator",
  ],
};

export default def;
