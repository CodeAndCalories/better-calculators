import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "ideal-weight-calculator",
  title: "Ideal Weight Calculator",
  shortTitle: "Ideal Weight",
  description: "Estimate your ideal body weight based on height using the Devine formula.",
  longDescription:
    "The ideal body weight formula gives a clinical reference point based on height and biological sex. Developed by Dr. B.J. Devine in 1974, it is widely used in medical settings for drug dosage calculations and health benchmarking. It is a guideline, not a strict target — healthy weight varies by frame size, muscle mass, and individual physiology.",
  category: "health",
  keywords: ["ideal weight calculator", "healthy weight", "ideal body weight", "devine formula", "target weight"],
  inputs: [
    {
      type: "number",
      key: "heightCm",
      label: "Height (cm)",
      defaultValue: 170,
      min: 100,
      step: 0.1,
      placeholder: "170",
    },
    {
      type: "select",
      key: "sex",
      label: "Biological Sex",
      defaultValue: "male",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
    },
  ],
  compute(values: InputValues): ComputeResult {
    const heightCm = Number(values.heightCm);
    const sex = String(values.sex);

    if (isNaN(heightCm) || heightCm <= 0) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const heightInches = heightCm / 2.54;
    const inchesOver5Feet = Math.max(0, heightInches - 60);

    // Devine formula
    const idealWeight =
      sex === "male"
        ? 50 + 2.3 * inchesOver5Feet
        : 45.5 + 2.3 * inchesOver5Feet;

    return {
      outputs: [
        {
          key: "idealWeight",
          label: "Ideal Weight (kg)",
          value: Number(idealWeight.toFixed(1)),
          format: "kg",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The Devine formula converts height to inches, then calculates ideal weight as a base value (50 kg for males, 45.5 kg for females) plus 2.3 kg for every inch over 5 feet (60 inches). Heights at or below 5 feet return the base value.",
  examples: [
    {
      title: "Average Male Height",
      description: "A male standing 175 cm (5 ft 9 in).",
      inputs: { heightCm: 175, sex: "male" },
      result: "Ideal weight is approximately 71.2 kg.",
    },
    {
      title: "Average Female Height",
      description: "A female standing 163 cm (5 ft 4 in).",
      inputs: { heightCm: 163, sex: "female" },
      result: "Ideal weight is approximately 54.6 kg.",
    },
  ],
  faqs: [
    {
      question: "Is ideal weight the same as healthy weight?",
      answer: "Not exactly. Ideal weight formulas are clinical tools. Healthy weight depends on many factors including muscle mass, bone density, and body composition.",
    },
    {
      question: "What if I am shorter than 5 feet?",
      answer: "The Devine formula returns the base value (50 kg for males, 45.5 kg for females) for heights at or below 5 feet (152.4 cm).",
    },
    {
      question: "Should I try to reach my ideal weight?",
      answer: "Use it as a rough reference. Always consult a healthcare provider before setting weight loss or gain targets.",
    },
  ],
  relatedSlugs: ["bmr-calculator", "body-fat-calculator", "tdee-calculator"],
};

export default def;
