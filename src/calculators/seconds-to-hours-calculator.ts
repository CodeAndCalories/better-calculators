import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "seconds-to-hours-calculator",
  title: "Seconds to Hours Calculator",
  shortTitle: "sec to hr",
  description: "Convert seconds to hours instantly.",
  longDescription: "One hour equals 3,600 seconds (60 minutes × 60 seconds). This calculator divides any number of seconds by 3,600 to give you the equivalent in hours — handy for data logs, video lengths, and sports timing.",
  category: "conversions",
  keywords: ["seconds to hours", "sec to hr", "convert seconds hours"],
  inputs: [
    { type: "number", key: "value", label: "Seconds (s)", defaultValue: 3600, min: 0, step: 60 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v / 3600;
    return {
      outputs: [
        { key: "result", label: "Hours (hr)", value: Number(result.toFixed(6)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Divide seconds by 3,600 (60 × 60). 1 hour = 3,600 seconds.",
  examples: [
    { title: "3600 seconds", description: "One hour.", inputs: { value: 3600 }, result: "3,600 s = 1 hr" },
    { title: "7200 seconds", description: "Two hours.", inputs: { value: 7200 }, result: "7,200 s = 2 hr" },
  ],
  faqs: [
    { question: "How many hours is 10,000 seconds?", answer: "10,000 ÷ 3,600 ≈ 2.778 hours." },
    { question: "How many seconds are in a day?", answer: "24 × 3,600 = 86,400 seconds per day." },
  ],
  relatedSlugs: ["hours-to-seconds-calculator", "seconds-to-minutes", "days-to-seconds-calculator"],
};

export default def;
