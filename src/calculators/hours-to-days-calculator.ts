import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "hours-to-days-calculator",
  title: "Hours to Days Calculator",
  shortTitle: "Hours to Days",
  description: "Convert a number of hours into days, weeks, and minutes.",
  longDescription:
    "Quickly convert any number of hours into days, weeks, and remaining hours. Useful for project planning, shift scheduling, understanding time estimates, or converting hours worked into workdays and workweeks.",
  category: "life",
  keywords: ["hours to days calculator", "convert hours to days", "hours to weeks", "how many days is X hours", "hours days weeks converter"],
  inputs: [
    {
      type: "number",
      key: "totalHours",
      label: "Total Hours",
      defaultValue: 48,
      min: 0,
      step: 0.5,
      placeholder: "48",
    },
    {
      type: "select",
      key: "workdayHours",
      label: "Hours per Workday",
      defaultValue: "8",
      options: [
        { label: "6 hours (short day)", value: "6" },
        { label: "7 hours", value: "7" },
        { label: "7.5 hours", value: "7.5" },
        { label: "8 hours (standard)", value: "8" },
        { label: "10 hours (long day)", value: "10" },
        { label: "12 hours (shift work)", value: "12" },
      ],
    },
  ],

  compute(values: InputValues): ComputeResult {
    const totalHours = Number(values.totalHours);
    const workdayHours = Number(values.workdayHours);

    if (!Number.isFinite(totalHours) || !Number.isFinite(workdayHours) || totalHours < 0 || workdayHours <= 0) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    // Calendar time (24-hour days)
    const calendarDays = totalHours / 24;
    const calendarDaysWhole = Math.floor(calendarDays);
    const remainingHours = Math.round((calendarDays - calendarDaysWhole) * 24 * 10) / 10;
    const calendarWeeks = Math.round((totalHours / (24 * 7)) * 100) / 100;
    const totalMinutes = Math.round(totalHours * 60);

    // Working time
    const workdays = Math.round((totalHours / workdayHours) * 100) / 100;
    const workweeks = Math.round((workdays / 5) * 100) / 100;

    return {
      outputs: [
        { key: "calendarDays", label: "Calendar Days", value: Math.round(calendarDays * 100) / 100, format: "number", highlight: true },
        { key: "calendarWeeks", label: "Calendar Weeks", value: calendarWeeks, format: "number" },
        { key: "remainingHours", label: "Remaining Hours (after full days)", value: remainingHours, format: "number" },
        { key: "totalMinutes", label: "Total Minutes", value: totalMinutes, format: "number" },
        { key: "workdays", label: `Workdays (${workdayHours}-hr day)`, value: workdays, format: "number" },
        { key: "workweeks", label: "Workweeks (5-day week)", value: workweeks, format: "number" },
      ],
    };
  },

  howItWorks: `Calendar days = total hours ÷ 24. Calendar weeks = total hours ÷ 168 (24 × 7). Remaining hours = fractional day × 24. Workdays = total hours ÷ hours per workday. Workweeks = workdays ÷ 5.`,

  examples: [
    {
      title: "48 hours",
      description: "A common estimate or deadline span.",
      inputs: { totalHours: 48, workdayHours: "8" },
      result: "2 calendar days. 6 workdays at 8 hrs/day.",
    },
    {
      title: "100 hours",
      description: "A project time estimate.",
      inputs: { totalHours: 100, workdayHours: "8" },
      result: "4.17 calendar days. 12.5 workdays. 2.5 workweeks.",
    },
  ],

  faqs: [
    {
      question: "What is the difference between calendar days and workdays?",
      answer: "Calendar days divide by 24 — they count every hour including nights and weekends. Workdays divide by your chosen working hours per day, giving a practical sense of how long something takes in a work context.",
    },
    {
      question: "Can I convert fractional hours?",
      answer: "Yes — enter decimal hours like 7.5 for 7 hours 30 minutes, or 1.25 for 1 hour 15 minutes.",
    },
  ],

  relatedSlugs: ["work-hours-calculator", "time-duration-calculator", "date-subtract-calculator"],
};

export default def;
