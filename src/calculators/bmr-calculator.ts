import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "bmr-calculator",
  title: "BMR Calculator",
  shortTitle: "BMR",
  description: "Calculate your Basal Metabolic Rate using the Mifflin-St Jeor formula.",
  longDescription:
    "Your Basal Metabolic Rate (BMR) is the number of calories your body burns at complete rest to maintain basic functions like breathing, circulation, and cell production. The Mifflin-St Jeor formula is considered the most accurate for estimating BMR and is widely used by dietitians and fitness professionals.",
  category: "health",
  keywords: ["bmr calculator", "basal metabolic rate", "calorie calculator", "mifflin st jeor", "metabolism"],
  inputs: [
    {
      type: "number",
      key: "age",
      label: "Age (years)",
      defaultValue: 30,
      min: 1,
      max: 120,
      step: 1,
      placeholder: "30",
    },
    {
      type: "number",
      key: "weightKg",
      label: "Weight (kg)",
      defaultValue: 70,
      min: 1,
      step: 0.1,
      placeholder: "70",
    },
    {
      type: "number",
      key: "heightCm",
      label: "Height (cm)",
      defaultValue: 170,
      min: 50,
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
    const age = Number(values.age);
    const weightKg = Number(values.weightKg);
    const heightCm = Number(values.heightCm);
    const sex = String(values.sex);

    if (isNaN(age) || isNaN(weightKg) || isNaN(heightCm) || age <= 0 || weightKg <= 0 || heightCm <= 0) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    // Mifflin-St Jeor formula
    const bmr =
      sex === "male"
        ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
        : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

    return {
      outputs: [
        {
          key: "bmr",
          label: "Basal Metabolic Rate (calories/day)",
          value: Number(bmr.toFixed(0)),
          format: "calories",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The Mifflin-St Jeor formula calculates BMR as: (10 × weight in kg) + (6.25 × height in cm) − (5 × age). For males, add 5; for females, subtract 161. This accounts for the metabolic differences between biological sexes.",
  examples: [
    {
      title: "30-Year-Old Male",
      description: "A 30-year-old male, 70 kg, 175 cm tall.",
      inputs: { age: 30, weightKg: 70, heightCm: 175, sex: "male" },
      result: "BMR is approximately 1,680 calories/day.",
    },
    {
      title: "25-Year-Old Female",
      description: "A 25-year-old female, 60 kg, 163 cm tall.",
      inputs: { age: 25, weightKg: 60, heightCm: 163, sex: "female" },
      result: "BMR is approximately 1,415 calories/day.",
    },
  ],
  faqs: [
    {
      question: "What does BMR mean?",
      answer: "BMR is the number of calories your body needs at complete rest — just to keep your organs functioning. It does not include calories burned through activity.",
    },
    {
      question: "Why is BMR different for males and females?",
      answer: "Biological males generally have more muscle mass and less body fat than females of the same weight, which results in a higher resting metabolic rate.",
    },
    {
      question: "How do I use my BMR to lose weight?",
      answer: "Multiply your BMR by an activity factor (see TDEE calculator) to get your total daily energy expenditure, then create a calorie deficit below that number.",
    },
  ],
  relatedSlugs: ["tdee-calculator", "ideal-weight-calculator", "protein-intake-calculator"],
};

export default def;
