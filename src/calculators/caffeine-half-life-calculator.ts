import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "caffeine-half-life-calculator",
  title: "Caffeine Half-Life Calculator",
  shortTitle: "Caffeine Half-Life",
  description: "Estimate how much caffeine remains in your system after a given time.",
  longDescription: "Caffeine has a half-life of approximately 5–6 hours, meaning half of it is eliminated every ~5.5 hours. Enter how many milligrams you consumed and how many hours ago to see how much is still in your system.",
  category: "life",
  keywords: ["caffeine half life", "caffeine calculator", "coffee caffeine", "caffeine remaining"],
  inputs: [
    { type: "number", key: "mgConsumed", label: "Caffeine Consumed (mg)", defaultValue: 200, min: 0, step: 10, placeholder: "200" },
    { type: "number", key: "hoursAgo", label: "Hours Since Consumption", defaultValue: 5, min: 0, step: 0.5, placeholder: "5" },
  ],
  compute(values: InputValues): ComputeResult {
    const mgConsumed = Number(values.mgConsumed);
    const hoursAgo = Number(values.hoursAgo);
    if (isNaN(mgConsumed) || isNaN(hoursAgo) || mgConsumed < 0 || hoursAgo < 0) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const halfLife = 5.5; // hours
    const remaining = mgConsumed * Math.pow(0.5, hoursAgo / halfLife);
    return {
      outputs: [
        { key: "remaining", label: "Caffeine Remaining (mg)", value: Number(remaining.toFixed(1)), format: "number", highlight: true },
        { key: "eliminated", label: "Caffeine Eliminated (mg)", value: Number((mgConsumed - remaining).toFixed(1)), format: "number" },
      ],
    };
  },
  howItWorks: "Uses the exponential decay formula: Remaining = Initial × 0.5^(hours / half-life). The caffeine half-life used is 5.5 hours, the commonly cited average for healthy adults.",
  examples: [
    {
      title: "Morning Coffee",
      description: "200 mg caffeine consumed 5.5 hours ago.",
      inputs: { mgConsumed: 200, hoursAgo: 5.5 },
      result: "Approximately 100 mg remaining.",
    },
    {
      title: "Afternoon Coffee",
      description: "150 mg caffeine consumed 8 hours ago.",
      inputs: { mgConsumed: 150, hoursAgo: 8 },
      result: "Approximately 60 mg remaining.",
    },
  ],
  faqs: [
    { question: "What is the half-life of caffeine?", answer: "Approximately 5–6 hours for most healthy adults. Pregnancy, liver conditions, and certain medications can extend it to 10+ hours." },
    { question: "How much caffeine is in a cup of coffee?", answer: "An 8 oz cup of brewed coffee typically contains 80–100 mg of caffeine. A double espresso is about 120–140 mg." },
    { question: "When should I stop drinking caffeine to sleep well?", answer: "Most sleep experts recommend cutting off caffeine 6–8 hours before bedtime." },
  ],
  relatedSlugs: ["sleep-calculator", "bedtime-calculator"],
};

export default def;
