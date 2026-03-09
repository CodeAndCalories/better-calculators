import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "screen-time-weekly-calculator",
  title: "Weekly Screen Time Calculator",
  shortTitle: "Weekly Screen Time",
  description: "Convert your daily screen time to a weekly total.",
  longDescription: "It's easy to underestimate how much time you spend on screens. Enter your average daily hours to see the weekly total and annual projection — a helpful reality check for digital wellness goals.",
  category: "life",
  keywords: ["screen time calculator", "weekly screen time", "digital wellness", "phone usage hours"],
  inputs: [
    { type: "number", key: "dailyHours", label: "Average Daily Screen Time (hours)", defaultValue: 4, min: 0, max: 24, step: 0.5, placeholder: "4" },
  ],
  compute(values: InputValues): ComputeResult {
    const dailyHours = Number(values.dailyHours);
    if (isNaN(dailyHours) || dailyHours < 0) {
      return { outputs: [], error: "Please enter a valid number of hours." };
    }
    const weekly = dailyHours * 7;
    const annual = dailyHours * 365;
    return {
      outputs: [
        { key: "weekly", label: "Weekly Screen Time (hours)", value: Number(weekly.toFixed(1)), format: "number", highlight: true },
        { key: "annual", label: "Annual Screen Time (hours)", value: Number(annual.toFixed(0)), format: "number" },
      ],
    };
  },
  howItWorks: "Multiplies daily hours by 7 for a weekly total and by 365 for an annual projection.",
  examples: [
    {
      title: "Average Adult",
      description: "4 hours/day screen time.",
      inputs: { dailyHours: 4 },
      result: "28 hours/week, 1,460 hours/year.",
    },
    {
      title: "Heavy User",
      description: "7 hours/day screen time.",
      inputs: { dailyHours: 7 },
      result: "49 hours/week, 2,555 hours/year.",
    },
  ],
  faqs: [
    { question: "What is the average daily screen time?", answer: "Adults in the US average 7+ hours per day across all screens according to Nielsen research." },
    { question: "How much screen time is too much?", answer: "WHO and APA guidelines vary by age, but the quality and context of use matters as much as quantity." },
    { question: "How can I reduce screen time?", answer: "Use app timers, designate phone-free hours, and replace scroll sessions with a specific activity." },
  ],
  relatedSlugs: ["daily-screen-time-calculator", "reading-time-calculator"],
};

export default def;
