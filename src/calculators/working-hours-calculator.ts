import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "working-hours-calculator",
  title: "Working Hours Calculator",
  shortTitle: "Working Hours",
  description: "Calculate total working hours over a period based on days per week, hours per day, and vacation.",
  category: "life",
  keywords: ["working hours calculator", "total work hours", "hours per week", "work schedule"],
  inputs: [
    { type: "number", key: "hoursPerDay",  label: "Hours Per Day",          defaultValue: 8,  min: 0.5, max: 24,  step: 0.5 },
    { type: "number", key: "daysPerWeek",  label: "Working Days Per Week",  defaultValue: 5,  min: 1,   max: 7,   step: 1   },
    { type: "number", key: "weeks",        label: "Number of Weeks",        defaultValue: 52, min: 1,   max: 520, step: 1   },
    { type: "number", key: "breakMins",    label: "Break Per Day (min)",    defaultValue: 30, min: 0,   max: 480, step: 5   },
    { type: "number", key: "vacDays",      label: "Vacation Days",          defaultValue: 10, min: 0,   max: 365, step: 1   },
  ],
  compute(values: InputValues): ComputeResult {
    const hpd  = Number(values.hoursPerDay);
    const dpw  = Number(values.daysPerWeek);
    const wks  = Number(values.weeks);
    const brk  = Number(values.breakMins);
    const vac  = Number(values.vacDays);
    if ([hpd, dpw, wks, brk, vac].some((n) => !Number.isFinite(n) || n < 0)) {
      return { outputs: [], error: "Please enter a valid number." };
    }
    const netHpd = hpd - brk / 60;
    if (netHpd <= 0) return { outputs: [], error: "Break time exceeds hours per day." };
    const totalDays = dpw * wks - vac;
    if (totalDays <= 0) return { outputs: [], error: "No working days remain after vacation." };
    const totalHours    = netHpd * totalDays;
    const hpwNet        = netHpd * dpw;
    const hpmNet        = hpwNet * (52 / 12);
    return {
      outputs: [
        { key: "totalHours",   label: "Total Net Working Hours",  value: Math.round(totalHours * 10) / 10, format: "number", highlight: true },
        { key: "hoursPerWeek", label: "Net Hours Per Week",       value: Math.round(hpwNet * 10)    / 10,  format: "number" },
        { key: "hoursPerMonth",label: "Avg Hours Per Month",      value: Math.round(hpmNet * 10)    / 10,  format: "number" },
        { key: "workingDays",  label: "Total Working Days",       value: totalDays,                         format: "number" },
      ],
    };
  },
  howItWorks: "Net hours/day = hours/day − break minutes / 60. Working days = (days/week × weeks) − vacation days. Total hours = net hours/day × working days.",
  relatedSlugs: ["work-hours-calculator", "hours-to-days-calculator", "sleep-calculator"],

  longDescription: "Calculate your total net working hours over a custom time period. Accounts for your working days per week, hours per day, break time, and vacation days. Useful for billing, project planning, and employment contracts.",
  examples: [
    { title: "Full-time, 8 hrs/day, 5 days/week, 52 weeks, 30-min break, 10 vacation days", description: "A standard annual work year.", inputs: { hoursPerDay: 8, daysPerWeek: 5, weeks: 52, breakMins: 30, vacDays: 10 }, result: "~1,937 net working hours per year." },
  ],
  faqs: [
    { question: "What is the difference from the Work Hours Calculator?", answer: "The Work Hours Calculator finds hours for a single shift. This calculator finds total hours across an entire period of weeks." },
  ],
};

export default def;
