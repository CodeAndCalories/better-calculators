import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "body-surface-area-calculator",
  title: "Body Surface Area Calculator",
  shortTitle: "Body Surface Area",
  description: "Calculate your body surface area (BSA) using the Mosteller formula.",
  longDescription:
    "Body Surface Area (BSA) is used in medicine to calculate drug dosages, chemotherapy doses, and other clinical measurements. The Mosteller formula is the most widely used method due to its simplicity and accuracy. Enter your height and weight to get your BSA in square metres.",
  category: "health",
  keywords: ["body surface area calculator", "BSA calculator", "Mosteller formula", "BSA medical", "drug dosage calculator"],
  inputs: [
    {
      type: "number",
      key: "weightKg",
      label: "Weight (kg)",
      defaultValue: 70,
      min: 1,
      max: 300,
      step: 0.1,
      placeholder: "70",
    },
    {
      type: "number",
      key: "heightCm",
      label: "Height (cm)",
      defaultValue: 170,
      min: 50,
      max: 250,
      step: 0.1,
      placeholder: "170",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const weightKg = Number(values.weightKg);
    const heightCm = Number(values.heightCm);

    if (
      !Number.isFinite(weightKg) || !Number.isFinite(heightCm) ||
      weightKg <= 0 || heightCm <= 0
    ) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    // Mosteller formula: BSA (m²) = sqrt((height_cm × weight_kg) / 3600)
    const bsa = Math.sqrt((heightCm * weightKg) / 3600);

    return {
      outputs: [
        { key: "bsa", label: "Body Surface Area (m²)", value: Math.round(bsa * 1000) / 1000, format: "number", highlight: true },
      ],
    };
  },

  howItWorks: `Mosteller formula: BSA (m²) = √(height in cm × weight in kg ÷ 3600). The Mosteller formula is the clinical standard due to its accuracy and ease of calculation. Average BSA for an adult male is approximately 1.9 m² and for an adult female approximately 1.6 m².`,

  examples: [
    {
      title: "70 kg, 170 cm",
      description: "An average adult male.",
      inputs: { weightKg: 70, heightCm: 170 },
      result: "BSA ≈ 1.819 m².",
    },
    {
      title: "60 kg, 165 cm",
      description: "An average adult female.",
      inputs: { weightKg: 60, heightCm: 165 },
      result: "BSA ≈ 1.658 m².",
    },
  ],

  faqs: [
    {
      question: "Why is BSA used instead of body weight for drug dosing?",
      answer: "BSA correlates more reliably with organ function (especially liver and kidney metabolism) than body weight alone, making it a more accurate basis for dosage calculations in oncology and paediatric medicine.",
    },
    {
      question: "What is the normal BSA for an adult?",
      answer: "Average BSA is approximately 1.7–1.9 m² for adult males and 1.6–1.7 m² for adult females. Values vary significantly by body size.",
    },
  ],

  relatedSlugs: ["lean-body-mass-calculator", "bmi-calculator", "waist-to-height-ratio-calculator"],
};

export default def;
