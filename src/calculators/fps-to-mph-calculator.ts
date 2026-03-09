import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "fps-to-mph-calculator",
  title: "Feet Per Second to MPH Calculator",
  shortTitle: "fps to mph",
  description: "Convert feet per second to miles per hour.",
  longDescription: "Need to express a feet-per-second measurement in mph? This calculator divides by 1.46667 to give you the equivalent miles per hour — useful in sports, physics, and engineering.",
  category: "conversions",
  keywords: ["fps to mph", "feet per second to miles per hour", "speed converter"],
  inputs: [
    { type: "number", key: "fps", label: "Feet Per Second (fps)", defaultValue: 88, min: 0, step: 1, placeholder: "88" },
  ],
  compute(values: InputValues): ComputeResult {
    const fps = Number(values.fps);
    if (isNaN(fps) || fps < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const mph = fps / 1.46667;
    return {
      outputs: [
        { key: "mph", label: "Miles Per Hour (mph)", value: Number(mph.toFixed(4)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Divides fps by 1.46667 (5280 ft/mile ÷ 3600 s/hour).",
  examples: [
    {
      title: "88 fps",
      description: "88 feet per second to mph.",
      inputs: { fps: 88 },
      result: "Exactly 60 mph.",
    },
    {
      title: "Baseball Pitch",
      description: "A 130 fps pitch in mph.",
      inputs: { fps: 130 },
      result: "Approximately 88.6 mph.",
    },
  ],
  faqs: [
    { question: "How fast is 88 fps?", answer: "Exactly 60 mph — a common highway speed." },
    { question: "Why 1.46667 as the factor?", answer: "1 mile = 5280 feet, 1 hour = 3600 seconds: 5280 ÷ 3600 = 1.4̅ (repeating)." },
    { question: "Can I use this for projectile speed?", answer: "Yes — bullet and projectile speeds are often given in fps and sometimes need to be converted to mph." },
  ],
  relatedSlugs: ["mph-to-fps-calculator", "kmh-to-mph"],
};

export default def;
