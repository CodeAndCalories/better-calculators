import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

function getWHtRCategory(ratio: number): string {
  if (ratio < 0.4) return "Extremely Slim — potential underweight risk";
  if (ratio < 0.5) return "Healthy — low cardiometabolic risk";
  if (ratio < 0.6) return "Overweight — increased risk";
  return "Very High Risk — strong association with metabolic disease";
}

const def: CalculatorDef = {
  slug: "waist-to-height-ratio-calculator",
  title: "Waist-to-Height Ratio Calculator",
  shortTitle: "WHtR",
  description: "Calculate your waist-to-height ratio (WHtR) — a simple and reliable indicator of central adiposity and cardiometabolic risk.",
  longDescription:
    "The waist-to-height ratio is considered a stronger predictor of cardiovascular disease, type 2 diabetes, and metabolic syndrome than BMI alone, because it accounts for central (abdominal) fat distribution. A ratio under 0.5 is generally considered healthy for adults.",
  category: "health",
  keywords: ["waist to height ratio calculator", "WHtR", "central obesity", "abdominal fat calculator", "cardiometabolic risk"],
  inputs: [
    {
      type: "number",
      key: "waistCm",
      label: "Waist Circumference",
      suffix: "cm",
      defaultValue: 85,
      min: 40,
      max: 200,
      step: 0.1,
      placeholder: "85",
      helpText: "Measure at the narrowest point of your torso, or at your navel.",
    },
    {
      type: "number",
      key: "heightCm",
      label: "Height",
      suffix: "cm",
      defaultValue: 175,
      min: 100,
      max: 250,
      step: 0.1,
      placeholder: "175",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const waistCm = Number(values.waistCm);
    const heightCm = Number(values.heightCm);

    if (
      !Number.isFinite(waistCm) || !Number.isFinite(heightCm) ||
      waistCm <= 0 || heightCm <= 0
    ) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const ratio = waistCm / heightCm;
    const category = getWHtRCategory(ratio);

    return {
      outputs: [
        { key: "ratio", label: "Waist-to-Height Ratio", value: Math.round(ratio * 1000) / 1000, format: "number", highlight: true },
        { key: "category", label: "Health Category", value: category, format: "text" },
        { key: "waistCm", label: "Waist (cm)", value: waistCm, format: "number" },
        { key: "heightCm", label: "Height (cm)", value: heightCm, format: "number" },
      ],
    };
  },

  howItWorks: `WHtR = waist circumference (cm) ÷ height (cm). Interpretation bands used in this calculator:
• < 0.40 — Extremely slim, potential underweight risk
• 0.40–0.49 — Healthy range, low cardiometabolic risk
• 0.50–0.59 — Overweight range, increased risk
• ≥ 0.60 — Very high risk, strong association with metabolic disease
These thresholds are consistent with those used in published meta-analyses and the "keep your waist to less than half your height" public health guideline.`,

  examples: [
    {
      title: "85 cm waist, 175 cm height",
      description: "A common adult male measurement.",
      inputs: { waistCm: 85, heightCm: 175 },
      result: "WHtR ≈ 0.486 — Healthy range.",
    },
    {
      title: "95 cm waist, 165 cm height",
      description: "An elevated waist circumference relative to height.",
      inputs: { waistCm: 95, heightCm: 165 },
      result: "WHtR ≈ 0.576 — Overweight range, increased risk.",
    },
  ],

  faqs: [
    {
      question: "Is WHtR better than BMI?",
      answer: "Research suggests WHtR is a stronger predictor of cardiovascular and metabolic risk than BMI because it specifically captures central (abdominal) fat, which is more metabolically active. Many health researchers recommend using both together.",
    },
    {
      question: "Where should I measure my waist?",
      answer: "Measure at the narrowest point of your torso (usually between your bottom rib and hip bone) while breathing out normally. If you have no clear narrowing, measure at the navel. Use the same position each time for consistent tracking.",
    },
    {
      question: "Does this apply to children?",
      answer: "The 0.5 threshold is widely cited for adults. Age-specific and sex-specific norms exist for children — this calculator is designed for adults aged 18+.",
    },
  ],

  relatedSlugs: ["bmi-calculator", "lean-body-mass-calculator", "calorie-calculator", "macro-calculator"],
};

export default def;
