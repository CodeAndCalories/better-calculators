import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "lean-body-mass-calculator",
  title: "Lean Body Mass Calculator",
  shortTitle: "Lean Body Mass",
  description: "Calculate your lean body mass and fat mass from your weight and body fat percentage.",
  longDescription:
    "Lean body mass (LBM) is everything in your body except fat — muscles, bones, organs, and water. Knowing your LBM helps set accurate protein targets, track fitness progress, and understand your body composition beyond just scale weight.",
  category: "health",
  keywords: ["lean body mass calculator", "LBM calculator", "fat mass calculator", "body composition calculator", "muscle mass"],
  inputs: [
    {
      type: "number",
      key: "weightKg",
      label: "Body Weight",
      suffix: "kg",
      defaultValue: 80,
      min: 20,
      max: 300,
      step: 0.1,
      placeholder: "80",
    },
    {
      type: "number",
      key: "bodyFatPercent",
      label: "Body Fat Percentage",
      suffix: "%",
      defaultValue: 20,
      min: 2,
      max: 60,
      step: 0.1,
      placeholder: "20",
      helpText: "Don't know your body fat %? Use a body fat calculator or skinfold test.",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const weightKg = Number(values.weightKg);
    const bodyFatPercent = Number(values.bodyFatPercent);

    if (
      !Number.isFinite(weightKg) || !Number.isFinite(bodyFatPercent) ||
      weightKg <= 0 || bodyFatPercent < 2 || bodyFatPercent > 60
    ) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const fatMassKg = weightKg * (bodyFatPercent / 100);
    const leanBodyMassKg = weightKg - fatMassKg;

    return {
      outputs: [
        { key: "leanBodyMassKg", label: "Lean Body Mass", value: Math.round(leanBodyMassKg * 10) / 10, format: "number", suffix: "kg", highlight: true },
        { key: "fatMassKg", label: "Fat Mass", value: Math.round(fatMassKg * 10) / 10, format: "number", suffix: "kg" },
        { key: "bodyFatPercent", label: "Body Fat", value: Math.round(bodyFatPercent * 10) / 10, format: "number", suffix: "%" },
      ],
    };
  },

  howItWorks: `Fat mass = body weight × (body fat % ÷ 100). Lean body mass = body weight − fat mass. This is the direct calculation method — accurate when body fat % is measured reliably (e.g. DEXA, hydrostatic weighing). Estimates from visual charts or bioimpedance will reduce accuracy.`,

  examples: [
    {
      title: "80 kg person at 20% body fat",
      description: "A common starting point for a moderately lean adult.",
      inputs: { weightKg: 80, bodyFatPercent: 20 },
      result: "64 kg lean body mass, 16 kg fat mass.",
    },
    {
      title: "65 kg person at 28% body fat",
      description: "A higher body fat percentage scenario.",
      inputs: { weightKg: 65, bodyFatPercent: 28 },
      result: "46.8 kg lean body mass, 18.2 kg fat mass.",
    },
  ],

  faqs: [
    {
      question: "Why does lean body mass matter?",
      answer: "LBM is a better predictor of metabolic rate than total weight. It also helps set protein targets — most recommendations are 1.6–2.2g of protein per kg of lean body mass for active people.",
    },
    {
      question: "How do I measure body fat percentage accurately?",
      answer: "DEXA scans are the gold standard. Hydrostatic weighing and Bod Pod are also accurate. Bioimpedance scales are convenient but can vary by ±3–5%. Skinfold calipers with a skilled technician are a good middle ground.",
    },
    {
      question: "Can lean body mass include fat?",
      answer: "No. By definition, LBM = total mass − fat mass. It includes muscle, bone, water, organs, and connective tissue — everything except stored fat.",
    },
  ],

  relatedSlugs: ["macro-calculator", "calorie-calculator", "bmi-calculator", "waist-to-height-ratio-calculator"],
};

export default def;
