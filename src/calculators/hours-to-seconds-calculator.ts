import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "hours-to-seconds-calculator",
  title: "Hours to Seconds Calculator",
  shortTitle: "hr to sec",
  description: "Convert hours to seconds instantly.",
  longDescription: "One hour contains 3,600 seconds (60 minutes × 60 seconds). This calculator converts hours to seconds — useful for physics calculations, data bandwidth estimates, and timing events.",
  category: "conversions",
  keywords: ["hours to seconds", "hr to sec", "convert hours seconds"],
  inputs: [
    { type: "number", key: "value", label: "Hours (hr)", defaultValue: 1, min: 0, step: 0.5 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v * 3600;
    return {
      outputs: [
        { key: "result", label: "Seconds (s)", value: Number(result.toFixed(2)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Multiply hours by 3,600 (60 min/hr × 60 sec/min). 1 hr = 3,600 s.",
  examples: [
    { title: "1 hour", description: "One hour in seconds.", inputs: { value: 1 }, result: "1 hr = 3,600 s" },
    { title: "2.5 hours", description: "Two and a half hours.", inputs: { value: 2.5 }, result: "2.5 hr = 9,000 s" },
  ],
  faqs: [
    { question: "How many seconds in 8 hours?", answer: "8 × 3,600 = 28,800 seconds." },
    { question: "How many seconds are in a day?", answer: "24 hours × 3,600 = 86,400 seconds." },
  ],
  relatedSlugs: ["seconds-to-hours-calculator", "hours-to-days-calculator", "minutes-to-seconds"],
};

export default def;
