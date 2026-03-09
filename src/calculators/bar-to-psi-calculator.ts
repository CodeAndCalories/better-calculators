import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "bar-to-psi-calculator",
  title: "Bar to PSI Calculator",
  shortTitle: "bar to psi",
  description: "Convert pressure in bar to pounds per square inch (PSI) instantly.",
  longDescription: "One bar equals approximately 14.5038 PSI (pounds per square inch). This calculator converts pressure readings between metric bar and imperial PSI units — commonly used for tire pressure, hydraulic systems, and industrial equipment.",
  category: "conversions",
  keywords: ["bar to psi", "bar psi conversion", "pressure conversion bar psi"],
  inputs: [
    { type: "number", key: "value", label: "Bar", defaultValue: 2, min: 0, step: 0.1 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v * 14.5038;
    return {
      outputs: [
        { key: "result", label: "PSI", value: Number(result.toFixed(4)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Multiply bar by 14.5038. 1 bar = 14.5038 PSI (1 bar = 100,000 Pa; 1 PSI = 6,894.76 Pa).",
  examples: [
    { title: "2 bar", description: "Typical bicycle tyre pressure.", inputs: { value: 2 }, result: "2 bar ≈ 29.01 PSI" },
    { title: "2.5 bar", description: "Car tyre pressure.", inputs: { value: 2.5 }, result: "2.5 bar ≈ 36.26 PSI" },
  ],
  faqs: [
    { question: "Is bar the same as atmosphere?", answer: "Close but not exact. 1 atmosphere (atm) = 1.01325 bar. Standard atmosphere is slightly above 1 bar." },
    { question: "What is PSI?", answer: "PSI stands for pounds per square inch, a common imperial pressure unit. It measures force (in pounds) applied per square inch of area." },
  ],
  relatedSlugs: ["psi-to-bar-calculator", "kelvin-to-fahrenheit-calculator", "fahrenheit-to-kelvin-calculator"],
};

export default def;
