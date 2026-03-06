import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "water-intake-by-weight",
  title: "Daily Water Intake Calculator",
  shortTitle: "Water Intake",
  description: "Calculate your recommended daily water intake based on body weight.",
  longDescription:
    "Adequate hydration is essential for metabolism, digestion, temperature regulation, and cognitive function. A widely used clinical guideline recommends approximately 35 ml of water per kilogram of body weight per day. This calculator uses that standard to give you a personalized daily water target.",
  category: "health",
  keywords: ["water intake calculator", "daily water intake", "how much water to drink", "hydration calculator"],
  inputs: [
    {
      type: "number",
      key: "weightKg",
      label: "Weight (kg)",
      defaultValue: 70,
      min: 1,
      step: 0.1,
      placeholder: "70",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const weightKg = Number(values.weightKg);

    if (isNaN(weightKg) || weightKg <= 0) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const dailyWaterLiters = (weightKg * 35) / 1000;

    return {
      outputs: [
        {
          key: "dailyWaterLiters",
          label: "Daily Water Intake (liters)",
          value: Number(dailyWaterLiters.toFixed(2)),
          format: "liters",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator multiplies your weight in kilograms by 35 ml — the standard clinical recommendation per kg of body weight — then converts the result from milliliters to liters by dividing by 1,000.",
  examples: [
    {
      title: "Average Adult",
      description: "A person weighing 70 kg.",
      inputs: { weightKg: 70 },
      result: "Recommended daily intake is 2.45 liters.",
    },
    {
      title: "Heavier Build",
      description: "A person weighing 100 kg.",
      inputs: { weightKg: 100 },
      result: "Recommended daily intake is 3.5 liters.",
    },
    {
      title: "Lighter Build",
      description: "A person weighing 55 kg.",
      inputs: { weightKg: 55 },
      result: "Recommended daily intake is 1.93 liters.",
    },
  ],
  faqs: [
    {
      question: "Does this account for exercise?",
      answer: "No. This is a baseline recommendation. You should drink additional water during exercise, in hot weather, or if you consume a lot of caffeine or alcohol.",
    },
    {
      question: "Does water from food count?",
      answer: "Yes. About 20% of daily water intake typically comes from food. The figure here represents total recommended fluid intake, including food sources.",
    },
    {
      question: "Is the 8 glasses rule accurate?",
      answer: "The '8 glasses a day' rule is a rough approximation. Basing intake on body weight, as this calculator does, is more personalized and widely supported by clinical guidelines.",
    },
  ],
  relatedSlugs: ["tdee-calculator", "bmr-calculator", "protein-intake-calculator"],
};

export default def;
