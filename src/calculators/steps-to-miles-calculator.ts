import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "steps-to-miles-calculator",
  title: "Steps to Miles Calculator",
  shortTitle: "Steps to Miles",
  description: "Convert your step count to miles walked.",
  longDescription: "The average person's stride length is about 2.5 feet, meaning roughly 2,000 steps per mile. This calculator converts your step count to miles using an adjustable stride length.",
  category: "health",
  keywords: ["steps to miles", "step count to miles", "pedometer miles", "walking distance steps"],
  inputs: [
    { type: "number", key: "steps", label: "Number of Steps", defaultValue: 10000, min: 0, step: 500, placeholder: "10000" },
    { type: "number", key: "strideLength", label: "Stride Length (feet)", defaultValue: 2.5, min: 1, max: 4, step: 0.1, placeholder: "2.5" },
  ],
  compute(values: InputValues): ComputeResult {
    const steps = Number(values.steps);
    const strideLength = Number(values.strideLength);
    if (isNaN(steps) || isNaN(strideLength) || steps < 0 || strideLength <= 0) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const miles = (steps * strideLength) / 5280;
    return {
      outputs: [
        { key: "miles", label: "Distance (miles)", value: Number(miles.toFixed(3)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Multiplies steps by stride length in feet, then divides by 5,280 (feet per mile).",
  examples: [
    {
      title: "10,000 Steps",
      description: "10,000 steps at 2.5 ft stride.",
      inputs: { steps: 10000, strideLength: 2.5 },
      result: "Approximately 4.735 miles.",
    },
    {
      title: "5K Goal",
      description: "Steps needed for 3.1 miles at 2.5 ft stride.",
      inputs: { steps: 6534, strideLength: 2.5 },
      result: "Approximately 3.1 miles.",
    },
  ],
  faqs: [
    { question: "What is the average stride length?", answer: "About 2.5 feet (0.76 m) for adults, though taller people tend to have longer strides." },
    { question: "How do I measure my stride?", answer: "Walk 10 steps, measure the distance, and divide by 10." },
    { question: "How many steps in a mile?", answer: "At a 2.5 ft stride, there are approximately 2,112 steps per mile." },
  ],
  relatedSlugs: ["steps-to-calories-calculator", "pace-calculator"],
};

export default def;
