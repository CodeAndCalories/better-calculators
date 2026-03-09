import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "swimming-pool-volume-calculator",
  title: "Swimming Pool Volume Calculator",
  shortTitle: "Pool Volume",
  description: "Calculate the water volume of a rectangular swimming pool in gallons and liters.",
  longDescription:
    "Knowing your pool's volume is essential for calculating chemical dosing, heating costs, and water bills. Enter your pool's length, width, and average depth to get the total volume in gallons and liters.",
  category: "life",
  keywords: ["swimming pool volume calculator", "pool gallons calculator", "pool water volume", "how many gallons in pool", "pool size calculator"],
  inputs: [
    { type: "number", key: "lengthFt", label: "Pool Length (feet)", defaultValue: 30, min: 1, step: 1, placeholder: "30" },
    { type: "number", key: "widthFt", label: "Pool Width (feet)", defaultValue: 15, min: 1, step: 1, placeholder: "15" },
    { type: "number", key: "depthFt", label: "Average Depth (feet)", defaultValue: 5, min: 0.5, step: 0.5, placeholder: "5" },
  ],
  compute(values: InputValues): ComputeResult {
    const length = Number(values.lengthFt);
    const width = Number(values.widthFt);
    const depth = Number(values.depthFt);
    if ([length, width, depth].some(isNaN) || length <= 0 || width <= 0 || depth <= 0) {
      return { outputs: [], error: "Please enter valid dimensions." };
    }
    const cubicFeet = length * width * depth;
    const gallons = cubicFeet * 7.48052;
    const liters = cubicFeet * 28.3168;
    return {
      outputs: [
        { key: "gallons", label: "Volume (US Gallons)", value: Number(gallons.toFixed(0)), format: "number", highlight: true },
        { key: "liters", label: "Volume (Liters)", value: Number(liters.toFixed(0)), format: "number" },
        { key: "cubicFeet", label: "Volume (Cubic Feet)", value: Number(cubicFeet.toFixed(1)), format: "number" },
      ],
    };
  },
  howItWorks:
    "Multiplies length × width × average depth to get cubic feet. Converts to gallons using 7.48052 gallons per cubic foot, and to liters using 28.3168 liters per cubic foot.",
  examples: [
    {
      title: "Average Backyard Pool",
      description: "30 ft × 15 ft pool, 5 ft average depth.",
      inputs: { lengthFt: 30, widthFt: 15, depthFt: 5 },
      result: "Approximately 16,831 gallons (63,713 liters).",
    },
    {
      title: "Small Plunge Pool",
      description: "12 ft × 8 ft pool, 4 ft deep.",
      inputs: { lengthFt: 12, widthFt: 8, depthFt: 4 },
      result: "Approximately 2,874 gallons (10,876 liters).",
    },
  ],
  faqs: [
    { question: "How do I calculate average depth for a sloped pool?", answer: "Add the shallow end depth and deep end depth, then divide by 2. e.g. 3 ft shallow + 8 ft deep = 5.5 ft average." },
    { question: "Why do I need to know my pool volume?", answer: "Pool chemical dosing (chlorine, pH adjusters) is always based on total gallons. Over- or under-dosing leads to unsafe water." },
    { question: "Does this work for oval or round pools?", answer: "For round pools, use diameter × diameter × depth × 5.9. For oval pools: length × width × depth × 5.9." },
  ],
  relatedSlugs: ["gallons-to-liters", "liters-to-gallons"],
};

export default def;
