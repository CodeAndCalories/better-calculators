import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "mph-to-fps-calculator",
  title: "MPH to Feet Per Second Calculator",
  shortTitle: "mph to fps",
  description: "Convert miles per hour to feet per second.",
  longDescription: "Feet per second (fps) is commonly used in physics, ballistics, and sports science. This calculator converts any mph value to fps using the exact factor of 1.46667 feet per second per mph.",
  category: "conversions",
  keywords: ["mph to fps", "miles per hour to feet per second", "speed converter", "fps calculator"],
  inputs: [
    { type: "number", key: "mph", label: "Miles Per Hour (mph)", defaultValue: 60, min: 0, step: 1, placeholder: "60" },
  ],
  compute(values: InputValues): ComputeResult {
    const mph = Number(values.mph);
    if (isNaN(mph) || mph < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const fps = mph * 1.46667;
    return {
      outputs: [
        { key: "fps", label: "Feet Per Second (fps)", value: Number(fps.toFixed(4)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Multiplies mph by 1.46667, derived from: 1 mile = 5280 feet, 1 hour = 3600 seconds, so 5280/3600 = 1.46667.",
  examples: [
    {
      title: "Highway Speed",
      description: "60 mph in feet per second.",
      inputs: { mph: 60 },
      result: "Approximately 88 fps.",
    },
    {
      title: "Sprint Speed",
      description: "15 mph (fast human sprint) in fps.",
      inputs: { mph: 15 },
      result: "Approximately 22 fps.",
    },
  ],
  faqs: [
    { question: "How many fps is 60 mph?", answer: "60 mph equals exactly 88 feet per second." },
    { question: "Where is fps used?", answer: "Physics problems, projectile motion, ballistics, sports science, and vehicle crash analysis." },
    { question: "Is this conversion exact?", answer: "1 mile = 5280 ft exactly and 1 hour = 3600 s exactly, so the factor 1.4̅ (1.46667) is exact." },
  ],
  relatedSlugs: ["fps-to-mph-calculator", "kmh-to-mph", "mph-to-kmh"],
};

export default def;
