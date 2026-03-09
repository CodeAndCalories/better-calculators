import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "daily-screen-time-calculator",
  title: "Daily Screen Time Calculator",
  description: "Calculate your total daily screen time from multiple devices and see your weekly and yearly totals.",
  longDescription: "Add up your daily screen time across phone, computer, TV, and tablet to see how many hours per day, week, and year you spend in front of screens. A helpful tool for building awareness of digital habits.",
  category: "life",
  keywords: ["screen time calculator", "daily screen time", "phone usage time", "digital habits"],
  inputs: [
    { type: "number", key: "phone", label: "Phone (hours/day)", defaultValue: 3, min: 0, max: 24, step: 0.5 },
    { type: "number", key: "computer", label: "Computer / Laptop (hours/day)", defaultValue: 4, min: 0, max: 24, step: 0.5 },
    { type: "number", key: "tv", label: "TV / Streaming (hours/day)", defaultValue: 2, min: 0, max: 24, step: 0.5 },
    { type: "number", key: "tablet", label: "Tablet / Other (hours/day)", defaultValue: 1, min: 0, max: 24, step: 0.5 },
  ],
  compute(values: InputValues): ComputeResult {
    const phone = Number(values.phone);
    const computer = Number(values.computer);
    const tv = Number(values.tv);
    const tablet = Number(values.tablet);
    if ([phone, computer, tv, tablet].some(isNaN)) {
      return { outputs: [], error: "Please enter valid numbers for all fields." };
    }
    const daily = phone + computer + tv + tablet;
    const weekly = daily * 7;
    const yearly = daily * 365;
    const percentOfDay = (daily / 24) * 100;
    return {
      outputs: [
        { key: "daily", label: "Total Daily Screen Time (hours)", value: Number(daily.toFixed(1)), format: "number", highlight: true },
        { key: "percentDay", label: "Percentage of Day", value: Number(percentOfDay.toFixed(1)), format: "number" },
        { key: "weekly", label: "Weekly Screen Time (hours)", value: Number(weekly.toFixed(1)), format: "number" },
        { key: "yearly", label: "Yearly Screen Time (hours)", value: Math.round(yearly), format: "number" },
      ],
    };
  },
  howItWorks: "Screen time from all devices is summed to get daily total. Weekly = daily × 7. Yearly = daily × 365. Percentage of day = (daily ÷ 24) × 100.",
  examples: [
    {
      title: "Heavy user",
      description: "3h phone, 8h computer, 3h TV, 1h tablet.",
      inputs: { phone: 3, computer: 8, tv: 3, tablet: 1 },
      result: "15 hours/day (62.5% of the day), 5,475 hours/year.",
    },
    {
      title: "Moderate user",
      description: "2h phone, 4h computer, 2h TV, 0h tablet.",
      inputs: { phone: 2, computer: 4, tv: 2, tablet: 0 },
      result: "8 hours/day, 2,920 hours/year.",
    },
  ],
  faqs: [
    { question: "What is a healthy amount of screen time for adults?", answer: "There is no universal limit for adults, but most health organisations suggest at least 1–2 hours of screen-free time before bed to support sleep quality." },
    { question: "Should work screen time count?", answer: "Yes, all screen exposure contributes to eye strain and fatigue. Include work hours for the most accurate picture of your total exposure." },
  ],
  relatedSlugs: ["study-hours-calculator", "reading-time-calculator", "sleep-cycle-calculator"],
};

export default def;
