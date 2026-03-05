import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "hours-between-dates-calculator",
  title: "Hours Between Dates Calculator",
  shortTitle: "Hours Between Dates",
  description:
    "Calculate the total number of hours between two dates and times.",
  longDescription:
    "The hours between dates calculator computes the exact number of hours and minutes between any two date-time points. Useful for tracking project durations, calculating work hours across days, billing time, or measuring how long an event lasted. Handles spans that cross midnight, weekends, and month boundaries.",
  category: "life",
  keywords: [
    "hours between dates calculator",
    "how many hours between two dates",
    "time duration calculator",
    "hours between two times",
    "date and time difference",
  ],
  inputs: [
    {
      type: "number",
      key: "startYear",
      label: "Start Year",
      defaultValue: 2024,
      min: 2000,
      max: 2100,
      step: 1,
      placeholder: "2024",
    },
    {
      type: "number",
      key: "startMonth",
      label: "Start Month (1–12)",
      defaultValue: 1,
      min: 1,
      max: 12,
      step: 1,
      placeholder: "1",
    },
    {
      type: "number",
      key: "startDay",
      label: "Start Day",
      defaultValue: 1,
      min: 1,
      max: 31,
      step: 1,
      placeholder: "1",
    },
    {
      type: "number",
      key: "startHour",
      label: "Start Hour (0–23)",
      defaultValue: 9,
      min: 0,
      max: 23,
      step: 1,
      placeholder: "9",
      helpText: "24-hour format",
    },
    {
      type: "number",
      key: "startMinute",
      label: "Start Minute",
      defaultValue: 0,
      min: 0,
      max: 59,
      step: 1,
      placeholder: "0",
    },
    {
      type: "number",
      key: "endYear",
      label: "End Year",
      defaultValue: 2024,
      min: 2000,
      max: 2100,
      step: 1,
      placeholder: "2024",
    },
    {
      type: "number",
      key: "endMonth",
      label: "End Month (1–12)",
      defaultValue: 1,
      min: 1,
      max: 12,
      step: 1,
      placeholder: "1",
    },
    {
      type: "number",
      key: "endDay",
      label: "End Day",
      defaultValue: 3,
      min: 1,
      max: 31,
      step: 1,
      placeholder: "3",
    },
    {
      type: "number",
      key: "endHour",
      label: "End Hour (0–23)",
      defaultValue: 17,
      min: 0,
      max: 23,
      step: 1,
      placeholder: "17",
      helpText: "24-hour format",
    },
    {
      type: "number",
      key: "endMinute",
      label: "End Minute",
      defaultValue: 0,
      min: 0,
      max: 59,
      step: 1,
      placeholder: "0",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const startYear = Number(values.startYear);
    const startMonth = Number(values.startMonth);
    const startDay = Number(values.startDay);
    const startHour = Number(values.startHour);
    const startMinute = Number(values.startMinute);

    const endYear = Number(values.endYear);
    const endMonth = Number(values.endMonth);
    const endDay = Number(values.endDay);
    const endHour = Number(values.endHour);
    const endMinute = Number(values.endMinute);

    const start = new Date(startYear, startMonth - 1, startDay, startHour, startMinute);
    const end = new Date(endYear, endMonth - 1, endDay, endHour, endMinute);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return { outputs: [], error: "Invalid date values. Please check your inputs." };
    }
    if (end <= start) {
      return { outputs: [], error: "End date and time must be after the start date and time." };
    }

    const totalMs = end.getTime() - start.getTime();
    const totalMinutes = totalMs / (1000 * 60);
    const totalHours = totalMs / (1000 * 60 * 60);
    const totalDays = totalHours / 24;

    const wholeHours = Math.floor(totalHours);
    const remainingMinutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
    const formatted = `${wholeHours} hr ${remainingMinutes} min`;

    return {
      outputs: [
        {
          key: "totalHours",
          label: "Total Hours",
          value: Number(totalHours.toFixed(4)),
          format: "number",
          highlight: true,
        },
        {
          key: "hoursAndMinutes",
          label: "Hours & Minutes",
          value: formatted,
          format: "text",
          helpText: "Whole hours and remaining minutes",
        },
        {
          key: "totalMinutes",
          label: "Total Minutes",
          value: Number(totalMinutes.toFixed(2)),
          format: "number",
        },
        {
          key: "totalDays",
          label: "Total Days",
          value: Number(totalDays.toFixed(4)),
          format: "number",
        },
      ],
    };
  },

  howItWorks: `The calculator builds two date objects from the inputs and subtracts start from end to get total milliseconds. That value is divided by 3,600,000 for hours, 60,000 for minutes, and 86,400,000 for days. The hours-and-minutes output takes the whole-number hours and finds the remaining milliseconds to express leftover minutes.`,

  examples: [
    {
      title: "Overnight shift: Jan 15 10 PM to Jan 16 6 AM",
      description: "Calculating hours for a shift that crosses midnight.",
      inputs: { startYear: 2024, startMonth: 1, startDay: 15, startHour: 22, startMinute: 0, endYear: 2024, endMonth: 1, endDay: 16, endHour: 6, endMinute: 0 },
      result: "8 hours exactly.",
    },
    {
      title: "Multi-day project: Jan 15 9 AM to Jan 17 3 PM",
      description: "Measuring total elapsed hours for a project timeline.",
      inputs: { startYear: 2024, startMonth: 1, startDay: 15, startHour: 9, startMinute: 0, endYear: 2024, endMonth: 1, endDay: 17, endHour: 15, endMinute: 0 },
      result: "54 hours, 3,240 minutes, 2.25 days.",
    },
  ],

  faqs: [
    {
      question: "How do I enter times in 24-hour format?",
      answer:
        "Use 0 for midnight, 9 for 9 AM, 12 for noon, 13 for 1 PM, 17 for 5 PM, and 23 for 11 PM. Simply add 12 to any PM hour past noon. For example, 3 PM = 15, 8 PM = 20.",
    },
    {
      question: "How do I calculate hours between dates that span multiple days?",
      answer:
        "Enter the full date and time for both the start and end. The calculator handles any duration. For example, from January 1 at 9:00 AM to January 5 at 5:00 PM is 104 hours (4 days × 24 hours + 8 hours).",
    },
    {
      question: "Can I use this to calculate billable hours?",
      answer:
        "Yes. Enter your exact start and end times and use the total hours output. For billing in quarter-hour increments, round the decimal hours up to the nearest 0.25. For example, 3.1 hours billed in 15-minute increments would become 3.25 billable hours.",
    },
  ],

  relatedSlugs: [
    "days-between-dates-calculator",
    "weeks-between-dates-calculator",
    "time-between-times-calculator",
  ],
};

export default def;
