import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "inches-to-meters-calculator",
  title: "Inches to Meters Calculator",
  shortTitle: "in to m",
  description: "Convert inches to meters instantly.",
  longDescription: "One inch equals exactly 0.0254 meters. This calculator converts any length in inches to meters — handy for international projects, science, and working between imperial and metric systems.",
  category: "conversions",
  keywords: ["inches to meters", "in to m", "inch meter conversion"],
  inputs: [
    { type: "number", key: "value", label: "Inches (in)", defaultValue: 12, min: 0, step: 0.1 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v * 0.0254;
    return {
      outputs: [
        { key: "result", label: "Meters (m)", value: Number(result.toFixed(6)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Multiply inches by 0.0254 to get meters. 1 inch = 0.0254 m exactly (defined by international agreement).",
  examples: [
    { title: "12 inches (1 foot)", description: "Convert 12 in to meters.", inputs: { value: 12 }, result: "12 in = 0.3048 m" },
    { title: "72 inches (6 feet)", description: "Six-foot height.", inputs: { value: 72 }, result: "72 in = 1.8288 m" },
  ],
  faqs: [
    { question: "How many meters is one inch?", answer: "One inch equals exactly 0.0254 meters." },
    { question: "Why is 0.0254 the exact value?", answer: "In 1959 the international yard and pound agreement defined one inch as exactly 25.4 millimetres, making 1 inch = 0.0254 m by definition." },
  ],
  relatedSlugs: ["meters-to-inches-calculator", "cm-to-inches", "feet-to-meters"],
};

export default def;
