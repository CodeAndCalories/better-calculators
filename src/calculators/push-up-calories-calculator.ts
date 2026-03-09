import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "push-up-calories-calculator",
  title: "Push-Up Calories Calculator",
  shortTitle: "Push-Up Calories",
  description: "Estimate calories burned doing push-ups.",
  longDescription: "Push-ups are a bodyweight exercise that burns calories based on your weight and the number of repetitions. This calculator uses a MET-based formula to estimate total calories burned.",
  category: "health",
  keywords: ["push-up calories", "calories burned push ups", "bodyweight exercise calories", "calisthenics calories"],
  inputs: [
    { type: "number", key: "reps", label: "Number of Push-Ups", defaultValue: 50, min: 1, step: 5, placeholder: "50" },
    { type: "number", key: "weightKg", label: "Body Weight (kg)", defaultValue: 70, min: 30, step: 0.5, placeholder: "70" },
  ],
  compute(values: InputValues): ComputeResult {
    const reps = Number(values.reps);
    const weightKg = Number(values.weightKg);
    if (isNaN(reps) || isNaN(weightKg) || reps <= 0 || weightKg <= 0) {
      return { outputs: [], error: "Please enter valid values." };
    }
    // ~0.32 kcal per push-up at 70kg, scaled by weight
    const calories = reps * 0.32 * (weightKg / 70);
    return {
      outputs: [
        { key: "calories", label: "Estimated Calories Burned (kcal)", value: Number(calories.toFixed(1)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Uses an average of ~0.32 kcal per push-up for a 70 kg person, scaled proportionally by body weight.",
  examples: [
    {
      title: "50 Push-Ups",
      description: "70 kg person doing 50 push-ups.",
      inputs: { reps: 50, weightKg: 70 },
      result: "Approximately 16 calories burned.",
    },
    {
      title: "100 Push-Ups",
      description: "80 kg person doing 100 push-ups.",
      inputs: { reps: 100, weightKg: 80 },
      result: "Approximately 37 calories burned.",
    },
  ],
  faqs: [
    { question: "Are push-ups effective for weight loss?", answer: "Push-ups burn modest calories but build muscle, which raises your resting metabolic rate over time." },
    { question: "How many push-ups should I do per day?", answer: "Beginners can start with 10–20; working up to 50–100 per day is a solid goal for most adults." },
    { question: "Does pace affect calorie burn?", answer: "Yes — faster, more explosive push-ups have a higher MET and burn slightly more calories per rep." },
  ],
  relatedSlugs: ["calorie", "one-rep-max-calculator"],
};

export default def;
