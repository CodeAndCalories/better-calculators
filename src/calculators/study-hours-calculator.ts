import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "study-hours-calculator",
  title: "Study Hours Calculator",
  description: "Calculate how many hours per day you need to study to meet your total study goal before a deadline.",
  longDescription: "Enter your total study hours needed and how many days until your exam or deadline, and this calculator will tell you how many hours per day you need to study, broken down with and without weekends.",
  category: "life",
  keywords: ["study hours calculator", "exam study planner", "hours per day study", "study time calculator"],
  inputs: [
    { type: "number", key: "totalHours", label: "Total Hours to Study", defaultValue: 40, min: 1, step: 1 },
    { type: "number", key: "daysLeft", label: "Days Until Exam / Deadline", defaultValue: 14, min: 1, step: 1 },
    { type: "toggle", key: "includeWeekends", label: "Include weekends in study days?", defaultValue: true },
  ],
  compute(values: InputValues): ComputeResult {
    const totalHours = Number(values.totalHours);
    const daysLeft = Math.round(Number(values.daysLeft));
    const includeWeekends = Boolean(values.includeWeekends);
    if (isNaN(totalHours) || isNaN(daysLeft) || totalHours <= 0 || daysLeft <= 0) {
      return { outputs: [], error: "Please enter valid positive values." };
    }
    const studyDays = includeWeekends ? daysLeft : Math.round(daysLeft * (5 / 7));
    if (studyDays === 0) return { outputs: [], error: "No study days available in the selected period." };
    const hoursPerDay = totalHours / studyDays;
    const sessionsPerDay = Math.ceil(hoursPerDay / 1.5); // 90-min sessions
    return {
      outputs: [
        { key: "hoursPerDay", label: "Hours Per Day Needed", value: Number(hoursPerDay.toFixed(2)), format: "number", highlight: true },
        { key: "studyDays", label: "Available Study Days", value: studyDays, format: "number" },
        { key: "sessionsPerDay", label: "90-Min Sessions Per Day", value: sessionsPerDay, format: "number" },
        { key: "totalHours", label: "Total Hours to Cover", value: totalHours, format: "number" },
      ],
    };
  },
  howItWorks: "Total study hours are divided evenly across the available study days. If weekends are excluded, the number of weekdays is approximated as 5/7 of the total days.",
  examples: [
    {
      title: "40-hour exam prep in 2 weeks",
      description: "40 hours over 14 days including weekends.",
      inputs: { totalHours: 40, daysLeft: 14, includeWeekends: true },
      result: "About 2.86 hours per day (≈ 2 sessions of 90 minutes).",
    },
    {
      title: "Weekdays only",
      description: "40 hours, 14 days, no weekends.",
      inputs: { totalHours: 40, daysLeft: 14, includeWeekends: false },
      result: "10 weekdays available, 4 hours per day needed.",
    },
  ],
  faqs: [
    { question: "What is a good study session length?", answer: "Research suggests 90-minute focused sessions with breaks are effective. This calculator uses 90 minutes as the session benchmark." },
    { question: "Should I study every day?", answer: "Rest days improve retention. If your daily hours are very low, studying every day is fine. If hours are high, consider rest days." },
  ],
  relatedSlugs: ["countdown-days-calculator", "reading-time-calculator", "daily-screen-time-calculator"],
};

export default def;
