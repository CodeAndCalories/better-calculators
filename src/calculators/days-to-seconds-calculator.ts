import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "days-to-seconds-calculator",
  title: "Days to Seconds Calculator",
  shortTitle: "days to sec",
  description: "Convert days to seconds instantly.",
  longDescription: "One day equals exactly 86,400 seconds (24 hours × 60 minutes × 60 seconds). Use this calculator to convert days to seconds for physics, programming timestamps, and scientific calculations.",
  category: "conversions",
  keywords: ["days to seconds", "days to sec", "convert days seconds"],
  inputs: [
    { type: "number", key: "value", label: "Days", defaultValue: 1, min: 0, step: 1 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v * 86400;
    return {
      outputs: [
        { key: "result", label: "Seconds (s)", value: Number(result.toFixed(2)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Multiply days by 86,400 (24 × 60 × 60). 1 day = 86,400 seconds.",
  examples: [
    { title: "1 day", description: "One day in seconds.", inputs: { value: 1 }, result: "1 day = 86,400 s" },
    { title: "7 days", description: "One week in seconds.", inputs: { value: 7 }, result: "7 days = 604,800 s" },
  ],
  faqs: [
    { question: "How many seconds in a year?", answer: "365.25 × 86,400 = 31,557,600 seconds per year." },
    { question: "How many seconds in 30 days?", answer: "30 × 86,400 = 2,592,000 seconds." },
  ],
  relatedSlugs: ["seconds-to-hours-calculator", "days-to-minutes-calculator", "hours-to-seconds-calculator"],
};

export default def;
