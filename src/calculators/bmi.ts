import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "bmi-calculator",
  title: "BMI Calculator",
  shortTitle: "BMI",
  description: "Calculate your Body Mass Index (BMI) and see where you fall on the standard BMI scale.",
  longDescription: "Body Mass Index (BMI) is a widely used screening tool to assess weight relative to height. Our BMI calculator supports both imperial (lbs/inches) and metric (kg/cm) units and provides a clear health category result.",
  category: "health",
  keywords: ["BMI calculator", "body mass index calculator", "am I overweight calculator", "healthy weight calculator"],
  inputs: [
    { type: "select", key: "units", label: "Unit System", defaultValue: "imperial", options: [
      { label: "Imperial (lbs, ft/in)", value: "imperial" },
      { label: "Metric (kg, cm)", value: "metric" },
    ]},
    { type: "number", key: "weight", label: "Weight", defaultValue: 170, min: 10, step: 0.5, placeholder: "170", helpText: "lbs for imperial, kg for metric" },
    { type: "number", key: "heightFt", label: "Height (feet)", defaultValue: 5, min: 1, max: 8, step: 1, placeholder: "5", helpText: "Imperial only" },
    { type: "number", key: "heightIn", label: "Height (inches)", defaultValue: 10, min: 0, max: 11, step: 1, placeholder: "10", helpText: "Imperial only (0-11)" },
    { type: "number", key: "heightCm", label: "Height (cm)", defaultValue: 178, min: 50, max: 300, step: 0.5, placeholder: "178", helpText: "Metric only" },
  ],
  compute(values: InputValues): ComputeResult {
    const units = values.units as string;
    let bmi: number;
    let weightKg: number;
    let heightM: number;

    if (units === "imperial") {
      const weightLbs = Number(values.weight);
      const totalInches = Number(values.heightFt) * 12 + Number(values.heightIn);
      if (totalInches <= 0) return { outputs: [], error: "Please enter a valid height." };
      bmi = (weightLbs / (totalInches * totalInches)) * 703;
      weightKg = weightLbs * 0.453592;
      heightM = totalInches * 0.0254;
    } else {
      weightKg = Number(values.weight);
      heightM = Number(values.heightCm) / 100;
      if (heightM <= 0) return { outputs: [], error: "Please enter a valid height." };
      bmi = weightKg / (heightM * heightM);
    }

    let category: string;
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal weight";
    else if (bmi < 30) category = "Overweight";
    else category = "Obese";

    const normalLow = 18.5 * heightM * heightM;
    const normalHigh = 24.9 * heightM * heightM;
    const healthyRangeLow = units === "imperial" ? normalLow / 0.453592 : normalLow;
    const healthyRangeHigh = units === "imperial" ? normalHigh / 0.453592 : normalHigh;
    const weightUnit = units === "imperial" ? "lbs" : "kg";

    return {
      outputs: [
        { key: "bmi", label: "Your BMI", value: bmi, format: "bmi", highlight: true },
        { key: "category", label: "BMI Category", value: category, format: "text" },
        { key: "healthyLow", label: `Healthy Weight Range (low)`, value: healthyRangeLow, format: units === "imperial" ? "lbs" : "kg" },
        { key: "healthyHigh", label: `Healthy Weight Range (high)`, value: healthyRangeHigh, format: units === "imperial" ? "lbs" : "kg" },
      ],
    };
  },
  howItWorks: `BMI = weight(kg) / height(m)². For imperial: BMI = (weight in lbs / height in inches²) × 703. Categories: Below 18.5 = Underweight, 18.5–24.9 = Normal, 25–29.9 = Overweight, 30+ = Obese. Note that BMI is a screening tool, not a diagnostic tool.`,
  examples: [
    {
      title: "170 lbs, 5'10\" — Imperial",
      description: "A common height and weight combination in imperial units.",
      inputs: { units: "imperial", weight: 170, heightFt: 5, heightIn: 10, heightCm: 178 },
      result: "BMI of 24.4 — Normal weight.",
    },
    {
      title: "80 kg, 175 cm — Metric",
      description: "A standard metric calculation.",
      inputs: { units: "metric", weight: 80, heightFt: 5, heightIn: 9, heightCm: 175 },
      result: "BMI of 26.1 — Overweight.",
    },
  ],
  faqs: [
    { question: "Is BMI accurate?", answer: "BMI is a useful screening tool but has limitations. It doesn't distinguish between muscle and fat, doesn't account for age, sex, or ethnicity, and isn't diagnostic on its own. Athletes may have high BMI but low body fat." },
    { question: "What is a healthy BMI range?", answer: "The standard healthy BMI range is 18.5 to 24.9. However, some health organizations suggest that optimal ranges may vary by age and ethnic background." },
    { question: "What is a BMI of 30?", answer: "A BMI of 30 or above is classified as Obese (Class I). This is associated with increased risk of type 2 diabetes, heart disease, and other conditions. A healthcare professional can assess individual risk." },
  ],
  relatedSlugs: ["calorie-calculator", "water-intake-calculator", "age-calculator"],
};

export default def;
