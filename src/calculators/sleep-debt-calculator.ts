import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "sleep-debt-calculator",
  title: "Sleep Debt Calculator",
  shortTitle: "Sleep Debt",
  description: "Calculate how much sleep debt you've accumulated.",
  longDescription: "Sleep debt is the cumulative difference between the sleep you need and the sleep you actually get. Enter your recommended nightly sleep, actual sleep, and number of days to calculate your total sleep debt.",
  category: "health",
  keywords: ["sleep debt", "sleep deficit", "sleep hours needed", "sleep calculator"],
  inputs: [
    { type: "number", key: "neededHours", label: "Recommended Sleep (hours/night)", defaultValue: 8, min: 5, max: 12, step: 0.5, placeholder: "8" },
    { type: "number", key: "actualHours", label: "Actual Sleep (hours/night)", defaultValue: 6, min: 0, max: 12, step: 0.5, placeholder: "6" },
    { type: "number", key: "days", label: "Number of Days", defaultValue: 7, min: 1, step: 1, placeholder: "7" },
  ],
  compute(values: InputValues): ComputeResult {
    const neededHours = Number(values.neededHours);
    const actualHours = Number(values.actualHours);
    const days = Number(values.days);
    if ([neededHours, actualHours, days].some(isNaN) || days < 1) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const debtPerNight = Math.max(0, neededHours - actualHours);
    const totalDebt = debtPerNight * days;
    return {
      outputs: [
        { key: "totalDebt", label: "Total Sleep Debt (hours)", value: Number(totalDebt.toFixed(1)), format: "number", highlight: true },
        { key: "debtPerNight", label: "Debt Per Night (hours)", value: Number(debtPerNight.toFixed(1)), format: "number" },
      ],
    };
  },
  howItWorks: "Subtracts actual nightly sleep from the recommended amount, then multiplies by the number of days.",
  examples: [
    {
      title: "Work Week Deficit",
      description: "Need 8 hrs, getting 6 hrs for 5 days.",
      inputs: { neededHours: 8, actualHours: 6, days: 5 },
      result: "10 hours of sleep debt.",
    },
    {
      title: "Two Weeks",
      description: "Need 8 hrs, getting 6.5 hrs for 14 days.",
      inputs: { neededHours: 8, actualHours: 6.5, days: 14 },
      result: "21 hours of sleep debt.",
    },
  ],
  faqs: [
    { question: "How much sleep do adults need?", answer: "The CDC recommends 7–9 hours per night for adults aged 18–60." },
    { question: "Can you fully recover from sleep debt?", answer: "Research suggests short-term debt can be recovered, but chronic sleep deprivation has lasting effects." },
    { question: "What are the effects of sleep debt?", answer: "Impaired cognition, mood issues, weakened immune function, and increased risk of metabolic disease." },
  ],
  relatedSlugs: ["sleep-calculator", "sleep-cycle-calculator", "bedtime-calculator"],
};

export default def;
