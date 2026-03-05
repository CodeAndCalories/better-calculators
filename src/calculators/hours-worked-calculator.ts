// filename: hours-worked-calculator.ts
import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "hours-worked-calculator",
  title: "Hours Worked Calculator",
  description: "Calculate your total hours worked per week, month, or over a specific duration.",
  longDescription: "Whether you are a freelancer estimating a project, an employee checking your timesheet, or an employer forecasting payroll, this tool multiplies your daily working hours by your schedule to output total aggregate hours.",
  category: "finance",
  keywords: ["hours worked calculator", "timesheet calculator", "work hours", "payroll hours"],
  inputs:[
    { type: "number", key: "hoursPerDay", label: "Hours Worked Per Day", defaultValue: 8, min: 0 },
    { type: "number", key: "daysPerWeek", label: "Days Worked Per Week", defaultValue: 5, min: 0, max: 7 },
    { type: "number", key: "weeks", label: "Number of Weeks", defaultValue: 4, min: 0 }
  ],
  compute(values: InputValues): ComputeResult {
    const hoursPerDay = Number(values.hoursPerDay);
    const daysPerWeek = Number(values.daysPerWeek);
    const weeks = Number(values.weeks);

    if (isNaN(hoursPerDay) || isNaN(daysPerWeek) || isNaN(weeks)) {
      return { outputs:[], error: "Please enter valid numeric values." };
    }

    const hoursPerWeek = hoursPerDay * daysPerWeek;
    const totalHours = hoursPerWeek * weeks;
    // 52 weeks in a year / 12 months = average of 4.3333 weeks per month
    const hoursPerMonthApprox = hoursPerWeek * (52 / 12);

    return {
      outputs:[
        { key: "totalHours", label: "Total Hours for Period", value: Number(totalHours.toFixed(2)), format: "number", highlight: true },
        { key: "hoursPerWeek", label: "Hours Per Week", value: Number(hoursPerWeek.toFixed(2)), format: "number" },
        { key: "hoursPerMonthApprox", label: "Approx. Hours Per Month", value: Number(hoursPerMonthApprox.toFixed(2)), format: "number" }
      ]
    };
  },
  howItWorks: "The calculator multiplies your daily hours by your workdays to find your weekly hours. It then multiplies the weekly hours by the duration of weeks provided. It also provides a monthly average by multiplying your weekly hours by 4.33 (the average weeks in a month).",
  examples:[
    {
      title: "Standard Full-Time Employee",
      description: "Working 8 hours a day, 5 days a week, over a 4-week period.",
      inputs: { hoursPerDay: 8, daysPerWeek: 5, weeks: 4 },
      result: "Totals 160 hours for the period, with a standard 40 hours per week and about 173.33 hours per average month."
    },
    {
      title: "Part-Time Schedule",
      description: "Working a 4-hour shift, 3 days a week, over a 12-week semester.",
      inputs: { hoursPerDay: 4, daysPerWeek: 3, weeks: 12 },
      result: "Totals 144 hours over the 12 weeks, averaging 12 hours a week."
    },
    {
      title: "Heavy Overtime Sprint",
      description: "Working 10-hour days, 6 days a week, for a 2-week project crunch.",
      inputs: { hoursPerDay: 10, daysPerWeek: 6, weeks: 2 },
      result: "Totals 120 hours over the sprint, hitting 60 hours per week."
    }
  ],
  faqs:[
    { question: "Why is the monthly approximate not just weekly hours times 4?", answer: "Because months are slightly longer than exactly 4 weeks (except for February in non-leap years). An average month actually has about 4.33 weeks (52 weeks / 12 months)." },
    { question: "Does this account for unpaid lunch breaks?", answer: "No. You should only enter the net 'billable' or 'paid' hours you work per day. If you are at the office for 9 hours but have a 1-hour unpaid lunch, enter 8 hours." },
    { question: "How many working hours are in a standard year?", answer: "A standard full-time employee (40 hours/week) works 2,080 hours in a 52-week calendar year." },
    { question: "Can I use decimals for partial hours?", answer: "Yes. For example, if you work 7 and a half hours a day, enter 7.5." }
  ],
  relatedSlugs:["pay-per-hour-calculator", "time-and-a-half-calculator"]
};

export default def;