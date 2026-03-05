import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "hours-to-minutes-calculator",
  title: "Hours to Minutes Converter",
  shortTitle: "Hours to Minutes",
  description:
    "Convert hours, minutes, and seconds into total minutes, seconds, or decimal hours — instantly.",
  longDescription:
    "Need to convert a time duration for a timesheet, billing entry, sports result, or scheduling task? Our hours to minutes converter handles mixed inputs — enter hours, minutes, and seconds together and get the total expressed in any unit you need. Perfect for payroll calculations, project tracking, and any situation where you need precise time conversions.",
  category: "life",
  keywords: [
    "hours to minutes calculator",
    "convert hours to minutes",
    "time converter",
    "hours minutes seconds calculator",
    "decimal hours calculator",
  ],
  inputs: [
    {
      type: "number",
      key: "hours",
      label: "Hours",
      suffix: "hr",
      defaultValue: 2,
      min: 0,
      step: 1,
      placeholder: "2",
    },
    {
      type: "number",
      key: "minutes",
      label: "Minutes",
      suffix: "min",
      defaultValue: 30,
      min: 0,
      max: 59,
      step: 1,
      placeholder: "30",
      helpText: "0–59 minutes",
    },
    {
      type: "number",
      key: "seconds",
      label: "Seconds",
      suffix: "sec",
      defaultValue: 0,
      min: 0,
      max: 59,
      step: 1,
      placeholder: "0",
      helpText: "0–59 seconds (optional)",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const hours = Number(values.hours) || 0;
    const minutes = Number(values.minutes) || 0;
    const seconds = Number(values.seconds) || 0;

    if (hours < 0 || minutes < 0 || seconds < 0) {
      return { outputs: [], error: "Time values cannot be negative." };
    }
    if (minutes > 59) {
      return { outputs: [], error: "Minutes must be between 0 and 59." };
    }
    if (seconds > 59) {
      return { outputs: [], error: "Seconds must be between 0 and 59." };
    }
    if (hours === 0 && minutes === 0 && seconds === 0) {
      return { outputs: [], error: "Please enter a time duration greater than zero." };
    }

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const totalMinutes = totalSeconds / 60;
    const totalHoursDecimal = totalSeconds / 3600;

    // Format as HH:MM:SS string
    const hh = Math.floor(totalHoursDecimal);
    const mm = Math.floor((totalSeconds % 3600) / 60);
    const ss = totalSeconds % 60;
    const formatted = `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;

    // Billing decimal (rounded to nearest 0.25 for quarter-hour billing)
    const billingHours = Math.ceil(totalHoursDecimal * 4) / 4;

    return {
      outputs: [
        {
          key: "totalMinutes",
          label: "Total Minutes",
          value: totalMinutes,
          format: "number",
          highlight: true,
        },
        {
          key: "totalSeconds",
          label: "Total Seconds",
          value: totalSeconds,
          format: "number",
        },
        {
          key: "decimalHours",
          label: "Decimal Hours",
          value: totalHoursDecimal,
          format: "number",
          helpText: "Useful for timesheets and payroll",
        },
        {
          key: "billingHours",
          label: "Billing Hours (nearest ¼ hr)",
          value: billingHours,
          format: "number",
          helpText: "Rounded up to nearest 15-minute increment",
        },
        {
          key: "formatted",
          label: "HH:MM:SS Format",
          value: formatted,
          format: "text",
        },
      ],
    };
  },

  howItWorks: `We first convert everything to a common base unit — seconds. Total Seconds = (Hours × 3,600) + (Minutes × 60) + Seconds. From there: Total Minutes = Total Seconds ÷ 60. Decimal Hours = Total Seconds ÷ 3,600. Billing Hours rounds up to the nearest quarter-hour (0.25) increment, which is standard practice in legal, consulting, and freelance billing. The HH:MM:SS output simply restates the total duration in clock format.`,

  examples: [
    {
      title: "2 hours 30 minutes — Timesheet Entry",
      description:
        "A common scenario for logging a work session or meeting duration on a timesheet.",
      inputs: { hours: 2, minutes: 30, seconds: 0 },
      result:
        "150 total minutes, 9,000 seconds, 2.5 decimal hours, 2.5 billing hours, 02:30:00.",
    },
    {
      title: "1 hour 17 minutes 45 seconds — Fitness or Race Time",
      description:
        "Converting a race finish time or workout duration to total minutes for comparison.",
      inputs: { hours: 1, minutes: 17, seconds: 45 },
      result:
        "77.75 total minutes, 4,665 total seconds, 1.296 decimal hours, 01:17:45.",
    },
  ],

  faqs: [
    {
      question: "How many minutes are in an hour?",
      answer:
        "There are exactly 60 minutes in one hour, and 3,600 seconds in one hour. So to convert any number of hours to minutes, multiply by 60. For example, 2.5 hours = 2.5 × 60 = 150 minutes.",
    },
    {
      question: "What are decimal hours and why are they used?",
      answer:
        "Decimal hours express time as a single number rather than hours and minutes. For example, 1 hour 30 minutes = 1.5 decimal hours. Payroll systems, timesheets, and billing software often require decimal hours because they're easier to multiply by an hourly rate (1.5 hrs × $50/hr = $75).",
    },
    {
      question: "What does 'billing hours rounded to the nearest quarter-hour' mean?",
      answer:
        "Many professionals (lawyers, consultants, freelancers) bill in 15-minute increments. So a task that takes 1 hour 10 minutes would be billed as 1.25 hours (75 minutes rounded up to 90 minutes). Our calculator shows this 'ceiling' value automatically.",
    },
    {
      question: "How do I convert minutes back to hours and minutes?",
      answer:
        "Divide total minutes by 60. The whole number is your hours; the remainder is your minutes. Example: 155 minutes ÷ 60 = 2 remainder 35, so 2 hours and 35 minutes. Equivalently, 155 ÷ 60 = 2.583 decimal hours.",
    },
  ],

  relatedSlugs: [
    "age-calculator",
    "tip-calculator",
    "percentage-calculator",
  ],
};

export default def;
