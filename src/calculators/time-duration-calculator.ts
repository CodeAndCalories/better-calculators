import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "time-duration-calculator",
  title: "Time Duration Calculator",
  shortTitle: "Time Duration",
  description:
    "Add or subtract two time durations and get the result in hours, minutes, seconds, and decimal format.",
  longDescription:
    "Need to add up work shifts, combine lap times, or find how long two tasks take together? Our time duration calculator lets you add or subtract any two time values expressed in hours, minutes, and seconds. It handles carry-overs automatically (e.g. 45 min + 30 min = 1 hr 15 min) and outputs the result in every useful format — HH:MM:SS, decimal hours, total minutes, and total seconds.",
  category: "life",
  keywords: [
    "time duration calculator",
    "add time calculator",
    "subtract time calculator",
    "time addition calculator",
    "hours minutes seconds calculator",
    "elapsed time calculator",
  ],
  inputs: [
    {
      type: "number",
      key: "hours1",
      label: "First Duration — Hours",
      suffix: "hr",
      defaultValue: 1,
      min: 0,
      step: 1,
      placeholder: "1",
    },
    {
      type: "number",
      key: "minutes1",
      label: "First Duration — Minutes",
      suffix: "min",
      defaultValue: 45,
      min: 0,
      max: 59,
      step: 1,
      placeholder: "45",
      helpText: "0–59",
    },
    {
      type: "number",
      key: "seconds1",
      label: "First Duration — Seconds",
      suffix: "sec",
      defaultValue: 30,
      min: 0,
      max: 59,
      step: 1,
      placeholder: "30",
      helpText: "0–59",
    },
    {
      type: "select",
      key: "operation",
      label: "Operation",
      defaultValue: "add",
      options: [
        { label: "➕ Add (Duration 1 + Duration 2)", value: "add" },
        { label: "➖ Subtract (Duration 1 − Duration 2)", value: "subtract" },
      ],
    },
    {
      type: "number",
      key: "hours2",
      label: "Second Duration — Hours",
      suffix: "hr",
      defaultValue: 0,
      min: 0,
      step: 1,
      placeholder: "0",
    },
    {
      type: "number",
      key: "minutes2",
      label: "Second Duration — Minutes",
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
      key: "seconds2",
      label: "Second Duration — Seconds",
      suffix: "sec",
      defaultValue: 0,
      min: 0,
      max: 59,
      step: 1,
      placeholder: "0",
      helpText: "0–59",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const h1 = Number(values.hours1) || 0;
    const m1 = Number(values.minutes1) || 0;
    const s1 = Number(values.seconds1) || 0;
    const h2 = Number(values.hours2) || 0;
    const m2 = Number(values.minutes2) || 0;
    const s2 = Number(values.seconds2) || 0;
    const operation = values.operation as string;

    if (m1 > 59 || s1 > 59) {
      return { outputs: [], error: "Minutes and seconds in Duration 1 must be 0–59." };
    }
    if (m2 > 59 || s2 > 59) {
      return { outputs: [], error: "Minutes and seconds in Duration 2 must be 0–59." };
    }

    const totalSec1 = h1 * 3600 + m1 * 60 + s1;
    const totalSec2 = h2 * 3600 + m2 * 60 + s2;

    let resultSec: number;
    if (operation === "add") {
      resultSec = totalSec1 + totalSec2;
    } else {
      resultSec = totalSec1 - totalSec2;
      if (resultSec < 0) {
        return {
          outputs: [],
          error:
            "Duration 1 is shorter than Duration 2. Swap them or switch to addition.",
        };
      }
    }

    const rHours = Math.floor(resultSec / 3600);
    const rMinutes = Math.floor((resultSec % 3600) / 60);
    const rSeconds = resultSec % 60;

    const formatted = `${String(rHours).padStart(2, "0")}:${String(rMinutes).padStart(2, "0")}:${String(rSeconds).padStart(2, "0")}`;
    const decimalHours = resultSec / 3600;
    const totalMinutes = resultSec / 60;

    // Input summaries for context
    const dur1Str = `${String(h1).padStart(2, "0")}:${String(m1).padStart(2, "0")}:${String(s1).padStart(2, "0")}`;
    const dur2Str = `${String(h2).padStart(2, "0")}:${String(m2).padStart(2, "0")}:${String(s2).padStart(2, "0")}`;
    const opSymbol = operation === "add" ? "+" : "−";
    const equation = `${dur1Str} ${opSymbol} ${dur2Str}`;

    // Billing hours: round up to nearest 0.25
    const billingHours = Math.ceil(decimalHours * 4) / 4;

    return {
      outputs: [
        {
          key: "formatted",
          label: "Result",
          value: `${formatted}  (${equation})`,
          format: "text",
          highlight: true,
        },
        {
          key: "decimalHours",
          label: "Decimal Hours",
          value: decimalHours,
          format: "number",
          helpText: "For payroll and timesheet entry",
        },
        {
          key: "totalMinutes",
          label: "Total Minutes",
          value: totalMinutes,
          format: "number",
        },
        {
          key: "totalSeconds",
          label: "Total Seconds",
          value: resultSec,
          format: "number",
        },
        {
          key: "billingHours",
          label: "Billing Hours (nearest ¼ hr)",
          value: billingHours,
          format: "number",
          helpText: "Rounded up to next 15-min increment",
        },
      ],
    };
  },

  howItWorks: `Both durations are converted to a total-seconds representation: Total Seconds = (Hours × 3,600) + (Minutes × 60) + Seconds. For addition, the two second counts are summed. For subtraction, Duration 2 is subtracted from Duration 1 (an error is shown if the result would be negative). The result in seconds is then broken back out: Hours = floor(result ÷ 3,600), Minutes = floor((result mod 3,600) ÷ 60), Seconds = result mod 60. Decimal hours = result ÷ 3,600. Billing hours uses ceiling rounding to the nearest 0.25 increment.`,

  examples: [
    {
      title: "Add Two Work Shifts: 3h 45m + 2h 30m",
      description:
        "Combining two work sessions for a daily timesheet — carry-overs handled automatically.",
      inputs: {
        hours1: 3, minutes1: 45, seconds1: 0,
        operation: "add",
        hours2: 2, minutes2: 30, seconds2: 0,
      },
      result:
        "06:15:00 — 6 hours 15 minutes total, 6.25 decimal hours, 375 total minutes.",
    },
    {
      title: "Subtract Lap Times: 1h 22m 48s − 0h 58m 15s",
      description:
        "Finding the gap between two race or fitness lap times.",
      inputs: {
        hours1: 1, minutes1: 22, seconds1: 48,
        operation: "subtract",
        hours2: 0, minutes2: 58, seconds2: 15,
      },
      result:
        "00:24:33 — 24 minutes 33 seconds difference, 0.41 decimal hours.",
    },
  ],

  faqs: [
    {
      question: "Can I add more than two durations?",
      answer:
        "This calculator adds or subtracts exactly two durations at a time. To sum three or more, chain the results: add the first two, then take that result and add the third. For large sets of durations (e.g. a full week of time entries), a spreadsheet with SUM() is more efficient.",
    },
    {
      question: "What is decimal hours and why does it matter?",
      answer:
        "Decimal hours express a duration as a single number (e.g. 1.5 instead of 1:30). Payroll systems and invoicing software require decimal hours because they can be directly multiplied by an hourly rate. For example, 2.25 hours × $60/hr = $135.",
    },
    {
      question: "What if my subtraction result goes negative?",
      answer:
        "If Duration 2 is longer than Duration 1 when subtracting, the result would be negative — which isn't meaningful for time durations. The calculator will show an error and ask you to swap the durations or switch to addition.",
    },
    {
      question: "How does carry-over work when adding times?",
      answer:
        "By converting everything to seconds first, carry-overs happen automatically. 45 minutes + 25 minutes becomes 70 minutes, which correctly becomes 1 hour and 10 minutes in the output — no manual carrying required.",
    },
  ],

  relatedSlugs: [
    "hours-to-minutes-calculator",
    "date-difference-calculator",
    "age-calculator",
  ],
};

export default def;
