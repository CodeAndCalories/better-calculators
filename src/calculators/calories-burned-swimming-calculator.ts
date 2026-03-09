import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "calories-burned-swimming-calculator",
  title: "Calories Burned Swimming Calculator",
  shortTitle: "Swimming Calories",
  description: "Estimate calories burned during a swimming session.",
  longDescription: "Swimming is a full-body, low-impact workout. This calculator estimates calories burned based on your body weight and time spent swimming at a moderate pace, using a MET value of 7.0.",
  category: "health",
  keywords: ["calories burned swimming", "swim workout calories", "swimming calorie calculator"],
  inputs: [
    { type: "number", key: "weightKg", label: "Body Weight (kg)", defaultValue: 70, min: 30, step: 0.5, placeholder: "70" },
    { type: "number", key: "minutes", label: "Duration (minutes)", defaultValue: 30, min: 1, step: 5, placeholder: "30" },
  ],
  compute(values: InputValues): ComputeResult {
    const weightKg = Number(values.weightKg);
    const minutes = Number(values.minutes);
    if (isNaN(weightKg) || isNaN(minutes) || weightKg <= 0 || minutes <= 0) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const MET = 7.0;
    const calories = (MET * weightKg * 3.5 / 200) * minutes;
    return {
      outputs: [
        { key: "calories", label: "Calories Burned (kcal)", value: Number(calories.toFixed(0)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Uses the MET (Metabolic Equivalent of Task) formula: Calories = (MET × weight kg × 3.5 / 200) × minutes. A MET of 7.0 represents moderate freestyle swimming.",
  examples: [
    {
      title: "30-Min Swim",
      description: "70 kg person swimming 30 minutes.",
      inputs: { weightKg: 70, minutes: 30 },
      result: "Approximately 257 calories burned.",
    },
    {
      title: "Hour Swim",
      description: "80 kg person swimming 60 minutes.",
      inputs: { weightKg: 80, minutes: 60 },
      result: "Approximately 588 calories burned.",
    },
  ],
  faqs: [
    { question: "Is this accurate for all swimming styles?", answer: "This uses a MET for moderate freestyle. Vigorous butterfly or breaststroke burns more; casual paddling burns less." },
    { question: "What is MET?", answer: "MET (Metabolic Equivalent of Task) measures exercise intensity. 1 MET = resting energy expenditure. Swimming at moderate pace is about 7 METs." },
    { question: "How does swimming compare to running for calories?", answer: "Running typically burns slightly more calories per minute, but swimming is easier on joints." },
  ],
  relatedSlugs: ["calorie", "calories-burned-running-distance-calculator", "calories-burned-cycling-calculator"],
};

export default def;
