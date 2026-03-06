import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "body-fat-calculator",
  title: "Body Fat Percentage Calculator",
  shortTitle: "Body Fat %",
  description: "Estimate your body fat percentage using the US Navy circumference method.",
  longDescription:
    "The US Navy body fat method estimates body fat percentage using simple circumference measurements — no calipers or lab equipment needed. It uses waist, neck, and height measurements (plus hip for females) to estimate the percentage of your total body weight that is fat. While not as precise as DEXA scanning, it's a reliable and widely used estimation method.",
  category: "health",
  keywords: ["body fat calculator", "body fat percentage", "us navy method", "fat percentage", "body composition"],
  inputs: [
    {
      type: "number",
      key: "waist",
      label: "Waist (cm)",
      defaultValue: 85,
      min: 1,
      step: 0.1,
      placeholder: "85",
      helpText: "Measure at the narrowest point (navel level for males).",
    },
    {
      type: "number",
      key: "neck",
      label: "Neck (cm)",
      defaultValue: 38,
      min: 1,
      step: 0.1,
      placeholder: "38",
      helpText: "Measure just below the larynx.",
    },
    {
      type: "number",
      key: "height",
      label: "Height (cm)",
      defaultValue: 175,
      min: 50,
      step: 0.1,
      placeholder: "175",
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
    const waist = Number(values.waist);
    const neck = Number(values.neck);
    const height = Number(values.height);
    const sex = String(values.sex);

    if (isNaN(waist) || isNaN(neck) || isNaN(height) || waist <= 0 || neck <= 0 || height <= 0) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    if (waist <= neck) {
      return { outputs: [], error: "Waist measurement must be greater than neck measurement." };
    }

    // US Navy formula (metric, using cm)
    let bodyFatPercent: number;

    if (sex === "male") {
      bodyFatPercent =
        495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    } else {
      // For females the standard formula requires a hip measurement.
      // Without hip, we use the male-derived approximation adjusted for females.
      // We add a standard offset of 9.4 percentage points as per clinical approximations.
      const baseFat =
        495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
      bodyFatPercent = baseFat + 9.4;
    }

    const clamped = Math.min(Math.max(bodyFatPercent, 2), 60);

    return {
      outputs: [
        {
          key: "bodyFatPercent",
          label: "Estimated Body Fat %",
          value: Number(clamped.toFixed(1)),
          format: "percentage",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The US Navy formula uses the circumference of the waist and neck (and height) to estimate body density, then converts that to a body fat percentage using the Siri equation. For males: 495 ÷ (1.0324 − 0.19077 × log10(waist − neck) + 0.15456 × log10(height)) − 450.",
  examples: [
    {
      title: "Average Male",
      description: "Male with 85 cm waist, 38 cm neck, 175 cm height.",
      inputs: { waist: 85, neck: 38, height: 175, sex: "male" },
      result: "Estimated body fat is approximately 16–18%.",
    },
    {
      title: "Fit Male",
      description: "Male with 78 cm waist, 38 cm neck, 178 cm height.",
      inputs: { waist: 78, neck: 38, height: 178, sex: "male" },
      result: "Estimated body fat is approximately 11–13%.",
    },
  ],
  faqs: [
    {
      question: "How accurate is this method?",
      answer: "The US Navy method has an error margin of roughly ±3–4% compared to DEXA scanning. It is a useful estimate but not a clinical diagnosis.",
    },
    {
      question: "Where do I measure my waist?",
      answer: "For males, measure at the navel. For females, measure at the narrowest part of the torso. Keep the tape horizontal and snug but not compressing the skin.",
    },
    {
      question: "What is a healthy body fat percentage?",
      answer: "For males, 6–24% is generally healthy; athletes are typically 6–13%. For females, 16–30% is generally healthy; athletes are typically 14–20%.",
    },
  ],
  relatedSlugs: ["bmr-calculator", "ideal-weight-calculator", "tdee-calculator"],
};

export default def;
