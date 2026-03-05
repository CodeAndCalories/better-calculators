import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "calorie-calculator",
  title: "Calorie Calculator",
  shortTitle: "Calories",
  description: "Calculate your daily calorie needs (TDEE) based on your age, weight, height, sex, and activity level.",
  longDescription: "Estimate your Total Daily Energy Expenditure (TDEE) using the Mifflin-St Jeor equation — the most accurate formula for most people. Get specific targets for weight loss, maintenance, and weight gain.",
  category: "health",
  keywords: ["calorie calculator", "TDEE calculator", "daily calorie needs", "how many calories should I eat", "weight loss calories"],
  inputs: [
    { type: "select", key: "sex", label: "Biological Sex", defaultValue: "male", options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ]},
    { type: "number", key: "age", label: "Age", suffix: "years", defaultValue: 30, min: 15, max: 80, step: 1, placeholder: "30" },
    { type: "select", key: "units", label: "Units", defaultValue: "imperial", options: [
      { label: "Imperial (lbs, inches)", value: "imperial" },
      { label: "Metric (kg, cm)", value: "metric" },
    ]},
    { type: "number", key: "weight", label: "Weight", defaultValue: 170, min: 50, step: 1, placeholder: "170", helpText: "lbs or kg" },
    { type: "number", key: "heightCm", label: "Height (cm)", defaultValue: 178, min: 100, max: 250, step: 1, helpText: "Metric only" },
    { type: "number", key: "heightFt", label: "Height (feet)", defaultValue: 5, min: 3, max: 8, step: 1, helpText: "Imperial only" },
    { type: "number", key: "heightIn", label: "Height (inches)", defaultValue: 10, min: 0, max: 11, step: 1, helpText: "Imperial only" },
    { type: "select", key: "activity", label: "Activity Level", defaultValue: "1.375", options: [
      { label: "Sedentary (little or no exercise)", value: "1.2" },
      { label: "Lightly active (1–3 days/week)", value: "1.375" },
      { label: "Moderately active (3–5 days/week)", value: "1.55" },
      { label: "Very active (6–7 days/week)", value: "1.725" },
      { label: "Super active (physical job or 2x training)", value: "1.9" },
    ]},
  ],
  compute(values: InputValues): ComputeResult {
    const sex = values.sex as string;
    const age = Number(values.age);
    const units = values.units as string;
    const activityMultiplier = Number(values.activity);

    let weightKg: number;
    let heightCm: number;

    if (units === "imperial") {
      weightKg = Number(values.weight) * 0.453592;
      heightCm = (Number(values.heightFt) * 12 + Number(values.heightIn)) * 2.54;
    } else {
      weightKg = Number(values.weight);
      heightCm = Number(values.heightCm);
    }

    // Mifflin-St Jeor BMR
    let bmr: number;
    if (sex === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }

    const tdee = bmr * activityMultiplier;

    return {
      outputs: [
        { key: "tdee", label: "Daily Calories to Maintain Weight", value: tdee, format: "calories", highlight: true },
        { key: "bmr", label: "Basal Metabolic Rate (BMR)", value: bmr, format: "calories" },
        { key: "mildLoss", label: "Mild Weight Loss (0.5 lb/wk)", value: tdee - 250, format: "calories" },
        { key: "weightLoss", label: "Weight Loss (1 lb/wk)", value: tdee - 500, format: "calories" },
        { key: "weightGain", label: "Weight Gain (1 lb/wk)", value: tdee + 500, format: "calories" },
      ],
    };
  },
  howItWorks: `We use the Mifflin-St Jeor equation: For men: BMR = 10W + 6.25H - 5A + 5. For women: BMR = 10W + 6.25H - 5A - 161. (W = weight in kg, H = height in cm, A = age in years). TDEE = BMR × Activity Multiplier. A 500 calorie/day deficit creates roughly 1 lb/week of weight loss.`,
  examples: [
    {
      title: "30-year-old male, 170 lbs, 5'10\", lightly active",
      description: "A common scenario for a moderately active adult male.",
      inputs: { sex: "male", age: 30, units: "imperial", weight: 170, heightFt: 5, heightIn: 10, heightCm: 178, activity: "1.375" },
      result: "TDEE of ~2,450 cal/day to maintain weight.",
    },
    {
      title: "28-year-old female, 135 lbs, 5'5\", moderately active",
      description: "An active adult female looking to understand her calorie needs.",
      inputs: { sex: "female", age: 28, units: "imperial", weight: 135, heightFt: 5, heightIn: 5, heightCm: 165, activity: "1.55" },
      result: "TDEE of ~2,100 cal/day to maintain weight.",
    },
  ],
  faqs: [
    { question: "What is TDEE?", answer: "Total Daily Energy Expenditure (TDEE) is the total number of calories you burn in a day, including your Basal Metabolic Rate plus all activity. It's the key number for weight management." },
    { question: "How many calories do I need to lose weight?", answer: "A deficit of 500 calories/day leads to about 1 lb of fat loss per week, which is a sustainable rate. Extreme deficits can cause muscle loss and nutrient deficiencies." },
    { question: "How accurate is the Mifflin-St Jeor equation?", answer: "Studies show Mifflin-St Jeor is accurate to within 10% for most people. Actual needs vary based on genetics, muscle mass, and metabolic health. Treat the result as a starting point and adjust based on real-world results." },
  ],
  relatedSlugs: ["bmi-calculator", "water-intake-calculator", "age-calculator"],
};

export default def;
