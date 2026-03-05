import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "weeks-between-dates-calculator",
  title: "Weeks Between Dates Calculator",
  shortTitle: "Weeks Between Dates",
  description:
    "Calculate the number of weeks between two dates.",
  longDescription:
    "The weeks between dates calculator finds the exact number of weeks — and remaining days — between any two calendar dates. Useful for pregnancy tracking, project planning, countdowns, subscription durations, lease periods, and any situation where you need to measure time in weeks rather than days.",
  category: "life",
  keywords: [
    "weeks between dates calculator",
    "how many weeks between two dates",
    "weeks and days between dates",
    "date difference in weeks",
    "week counter calculator",
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
      defaultValue: 4,
      min: 1,
      max: 12,
      step: 1,
      placeholder: "4",
    },
    {
      type: "number",
      key: "endDay",
      label: "End Day",
      defaultValue: 1,
      min: 1,
      max: 31,
      step: 1,
      placeholder: "1",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const startYear = Number(values.startYear);
    const startMonth = Number(values.startMonth);
    const startDay = Number(values.startDay);
    const endYear = Number(values.endYear);
    const endMonth = Number(values.endMonth);
    const endDay = Number(values.endDay);

    const start = new Date(startYear, startMonth - 1, startDay);
    const end = new Date(endYear, endMonth - 1, endDay);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return { outputs: [], error: "Invalid date values. Please check your inputs." };
    }
    if (end <= start) {
      return { outputs: [], error: "End date must be after the start date." };
    }

    const totalMs = end.getTime() - start.getTime();
    const totalDays = Math.round(totalMs / (1000 * 60 * 60 * 24));
    const totalWeeks = totalDays / 7;
    const wholeWeeks = Math.floor(totalWeeks);
    const remainingDays = totalDays % 7;

    const formatted =
      remainingDays === 0
        ? `${wholeWeeks} week${wholeWeeks !== 1 ? "s" : ""} exactly`
        : `${wholeWeeks} week${wholeWeeks !== 1 ? "s" : ""} and ${remainingDays} day${remainingDays !== 1 ? "s" : ""}`;

    return {
      outputs: [
        {
          key: "totalWeeks",
          label: "Total Weeks",
          value: Number(totalWeeks.toFixed(4)),
          format: "number",
          highlight: true,
        },
        {
          key: "weeksAndDays",
          label: "Weeks & Days",
          value: formatted,
          format: "text",
          helpText: "Whole weeks and remaining days",
        },
        {
          key: "totalDays",
          label: "Total Days",
          value: totalDays,
          format: "number",
        },
        {
          key: "totalMonths",
          label: "Approximate Months",
          value: Number((totalDays / 30.4375).toFixed(2)),
          format: "number",
          helpText: "Based on average month length of 30.4375 days",
        },
      ],
    };
  },

  howItWorks: `The calculator subtracts the start date from the end date to get total days. Weeks are found by dividing total days by 7. The whole number of weeks is the floor of that result; the remainder (total days mod 7) gives the leftover days. Approximate months divide total days by 30.4375, the average calendar month length.`,

  examples: [
    {
      title: "12-week training plan: Jan 1 to Mar 25",
      description: "Confirming the length of a fitness or study program.",
      inputs: { startYear: 2024, startMonth: 1, startDay: 1, endYear: 2024, endMonth: 3, endDay: 25 },
      result: "12 weeks and 3 days, 85 total days.",
    },
    {
      title: "Pregnancy: 40 weeks from Jan 1",
      description: "Counting weeks from a known start date to an estimated due date.",
      inputs: { startYear: 2024, startMonth: 1, startDay: 1, endYear: 2024, endMonth: 10, endDay: 7 },
      result: "40 weeks exactly, 280 days.",
    },
  ],

  faqs: [
    {
      question: "How many weeks are in a year?",
      answer:
        "A standard calendar year has exactly 52 weeks and 1 day (365 days ÷ 7 = 52.143 weeks). A leap year has 52 weeks and 2 days. This is why the day of the week shifts by one each year (or two after a leap year).",
    },
    {
      question: "How do I count weeks of pregnancy?",
      answer:
        "Pregnancy is typically measured from the first day of your last menstrual period (LMP), not from conception. Enter your LMP as the start date and today's date or your estimated due date as the end date. A full-term pregnancy is 40 weeks from LMP.",
    },
    {
      question: "What is the difference between 4 weeks and 1 month?",
      answer:
        "4 weeks is exactly 28 days. One calendar month averages 30.4375 days, so it is slightly longer than 4 weeks. This means 12 months is not the same as 48 weeks — there are approximately 52.18 weeks in a year. For precise durations, counting in weeks is more accurate than counting in months.",
    },
  ],

  relatedSlugs: [
    "days-between-dates-calculator",
    "hours-between-dates-calculator",
    "date-difference-calculator",
  ],
};

export default def;
