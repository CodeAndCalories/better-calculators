import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "bmi-prime-calculator",
  title: "BMI Prime Calculator",
  shortTitle: "BMI Prime",
  description: "Calculate your BMI Prime — a normalized BMI ratio.",
  longDescription: "BMI Prime is your actual BMI divided by the upper limit of the normal BMI range (25). A BMI Prime of 1.0 means you are exactly at the top of normal weight. Values below 1.0 are underweight or normal; above 1.0 is overweight.",
  category: "health",
  keywords: ["BMI prime", "normalized BMI", "BMI ratio", "healthy weight indicator"],
  inputs: [
    { type: "number", key: "weightKg", label: "Weight (kg)", defaultValue: 70, min: 10, step: 0.5, placeholder: "70" },
    { type: "number", key: "heightCm", label: "Height (cm)", defaultValue: 170, min: 100, max: 250, step: 1, placeholder: "170" },
  ],
  compute(values: InputValues): ComputeResult {
    const weightKg = Number(values.weightKg);
    const heightCm = Number(values.heightCm);
    if (isNaN(weightKg) || isNaN(heightCm) || heightCm <= 0) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    const bmiPrime = bmi / 25;
    return {
      outputs: [
        { key: "bmiPrime", label: "BMI Prime", value: Number(bmiPrime.toFixed(3)), format: "number", highlight: true },
        { key: "bmi", label: "BMI", value: Number(bmi.toFixed(1)), format: "number" },
      ],
    };
  },
  howItWorks: "Calculates BMI (weight ÷ height²), then divides by 25 (the normal/overweight boundary) to get BMI Prime.",
  examples: [
    {
      title: "Normal Weight",
      description: "70 kg, 175 cm tall.",
      inputs: { weightKg: 70, heightCm: 175 },
      result: "BMI: 22.9, BMI Prime: 0.916 (normal).",
    },
    {
      title: "Slightly Overweight",
      description: "85 kg, 170 cm tall.",
      inputs: { weightKg: 85, heightCm: 170 },
      result: "BMI: 29.4, BMI Prime: 1.18 (overweight).",
    },
  ],
  faqs: [
    { question: "What does a BMI Prime of 1.0 mean?", answer: "You are exactly at the boundary between normal weight and overweight (BMI = 25)." },
    { question: "What is the healthy BMI Prime range?", answer: "0.74 to 1.00 corresponds to the healthy BMI range of 18.5 to 25." },
    { question: "How is BMI Prime different from BMI?", answer: "BMI Prime normalizes BMI to a reference value of 25, making it easier to compare across the boundary." },
  ],
  relatedSlugs: ["bmi", "ideal-weight-calculator", "body-fat-calculator"],
};

export default def;
