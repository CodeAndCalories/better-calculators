import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "vo2-max-calculator",
  title: "VO2 Max Calculator",
  shortTitle: "VO2 Max",
  description: "Estimate your VO2 max from your resting heart rate.",
  longDescription: "VO2 max is the maximum rate of oxygen your body can use during exercise — a key indicator of cardiovascular fitness. This calculator uses the Uth–Sørensen–Overgaard–Pedersen formula to estimate it from your resting and maximum heart rate.",
  category: "health",
  keywords: ["VO2 max", "cardio fitness", "resting heart rate", "aerobic capacity"],
  inputs: [
    { type: "number", key: "restingHR", label: "Resting Heart Rate (bpm)", defaultValue: 60, min: 30, max: 100, step: 1, placeholder: "60" },
    { type: "number", key: "maxHR", label: "Max Heart Rate (bpm)", defaultValue: 185, min: 100, max: 220, step: 1, placeholder: "185" },
  ],
  compute(values: InputValues): ComputeResult {
    const restingHR = Number(values.restingHR);
    const maxHR = Number(values.maxHR);
    if (isNaN(restingHR) || isNaN(maxHR) || restingHR <= 0 || maxHR <= restingHR) {
      return { outputs: [], error: "Max HR must be greater than resting HR." };
    }
    const vo2max = 15 * (maxHR / restingHR);
    return {
      outputs: [
        { key: "vo2max", label: "Estimated VO2 Max (mL/kg/min)", value: Number(vo2max.toFixed(1)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Uses the formula VO2 max = 15 × (HRmax / HRrest), known as the Uth–Sørensen–Overgaard–Pedersen estimation.",
  examples: [
    {
      title: "Average Fitness",
      description: "Resting HR 65, max HR 185.",
      inputs: { restingHR: 65, maxHR: 185 },
      result: "Estimated VO2 max: ~42.7 mL/kg/min.",
    },
    {
      title: "High Fitness",
      description: "Resting HR 45, max HR 195.",
      inputs: { restingHR: 45, maxHR: 195 },
      result: "Estimated VO2 max: ~65 mL/kg/min.",
    },
  ],
  faqs: [
    { question: "What is a good VO2 max?", answer: "Above 50 mL/kg/min is considered good for men; above 45 for women. Elite athletes often exceed 60–70." },
    { question: "How do I find my max heart rate?", answer: "A common estimate is 220 minus your age. For accuracy, a lab or field test is best." },
    { question: "Can I improve my VO2 max?", answer: "Yes. High-intensity interval training (HIIT) and consistent cardio are most effective." },
  ],
  relatedSlugs: ["target-heart-rate-calculator", "heart-rate-zone-calculator"],
};

export default def;
