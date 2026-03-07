import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "ideal-body-fat-calculator",
  title: "Ideal Body Fat Calculator",
  shortTitle: "Ideal Body Fat",
  description: "Find the recommended body fat percentage range for your sex and fitness category.",
  longDescription:
    "Body fat percentage is a better indicator of health and fitness than weight alone. This calculator shows the accepted healthy range for your sex and lets you compare your current body fat to standard fitness categories — from essential fat through athletic, fit, acceptable, and obese ranges.",
  category: "health",
  keywords: ["ideal body fat calculator", "healthy body fat percentage", "body fat range by sex", "body fat categories", "body fat chart"],
  inputs: [
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
    {
      type: "number",
      key: "currentBodyFat",
      label: "Current Body Fat (%)",
      defaultValue: 20,
      min: 2,
      max: 60,
      step: 0.1,
      placeholder: "20",
      helpText: "Leave as default to see ranges without a personal comparison",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const sex = values.sex as string;
    const currentBf = Number(values.currentBodyFat);

    if (!Number.isFinite(currentBf) || currentBf < 2 || currentBf > 60) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    // American College of Sports Medicine (ACSM) ranges
    type CategoryRange = { label: string; min: number; max: number };
    const categories: CategoryRange[] = sex === "male"
      ? [
          { label: "Essential Fat", min: 2, max: 5 },
          { label: "Athletic", min: 6, max: 13 },
          { label: "Fit", min: 14, max: 17 },
          { label: "Acceptable", min: 18, max: 24 },
          { label: "Obese", min: 25, max: 100 },
        ]
      : [
          { label: "Essential Fat", min: 10, max: 13 },
          { label: "Athletic", min: 14, max: 20 },
          { label: "Fit", min: 21, max: 24 },
          { label: "Acceptable", min: 25, max: 31 },
          { label: "Obese", min: 32, max: 100 },
        ];

    const matched = categories.find((c) => currentBf >= c.min && currentBf <= c.max);
    const category = matched ? matched.label : "Unknown";

    const fitRange = sex === "male" ? "14–17%" : "21–24%";
    const athleticRange = sex === "male" ? "6–13%" : "14–20%";

    return {
      outputs: [
        { key: "yourCategory", label: "Your Category", value: category, format: "text", highlight: true },
        { key: "currentBodyFat", label: "Your Body Fat (%)", value: Math.round(currentBf * 10) / 10, format: "number" },
        { key: "fitRange", label: "Fit Range for Your Sex", value: fitRange, format: "text" },
        { key: "athleticRange", label: "Athletic Range for Your Sex", value: athleticRange, format: "text" },
      ],
    };
  },

  howItWorks: `Body fat categories are based on the American College of Sports Medicine (ACSM) standards. Male ranges: Essential 2–5%, Athletic 6–13%, Fit 14–17%, Acceptable 18–24%, Obese 25%+. Female ranges: Essential 10–13%, Athletic 14–20%, Fit 21–24%, Acceptable 25–31%, Obese 32%+. These are widely cited reference ranges, not medical thresholds.`,

  examples: [
    {
      title: "Male at 15% body fat",
      description: "A fit adult male.",
      inputs: { sex: "male", currentBodyFat: 15 },
      result: "Category: Fit. Fit range for males: 14–17%.",
    },
    {
      title: "Female at 22% body fat",
      description: "A fit adult female.",
      inputs: { sex: "female", currentBodyFat: 22 },
      result: "Category: Fit. Fit range for females: 21–24%.",
    },
  ],

  faqs: [
    {
      question: "How do I measure body fat percentage accurately?",
      answer: "DEXA scan is the gold standard. Hydrostatic weighing and Bod Pod are also accurate. Bioimpedance scales are convenient but can vary by ±3–5%. Skinfold calipers with a trained technician are a good practical option.",
    },
    {
      question: "Is lower body fat always better?",
      answer: "No. Essential fat is necessary for hormonal function and organ protection. Extremely low body fat (below essential levels) is associated with serious health risks, including hormonal disruption and bone density loss.",
    },
  ],

  relatedSlugs: ["lean-body-mass-calculator", "bmi-calculator", "waist-to-height-ratio-calculator"],
};

export default def;
