import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "hydration-reminder-calculator",
  title: "Hydration Reminder Calculator",
  description: "Calculate how often you should drink water throughout the day to meet your daily hydration goal.",
  longDescription: "Enter your daily water intake goal and your waking hours to find out how many glasses you need per hour and how frequently you should be reminded to drink. A practical tool for building a daily hydration habit.",
  category: "health",
  keywords: ["hydration reminder", "water reminder calculator", "how often to drink water", "drinking schedule"],
  inputs: [
    { type: "number", key: "dailyOz", label: "Daily Water Goal (oz)", defaultValue: 64, min: 8, max: 200, step: 8, suffix: "oz" },
    { type: "number", key: "wakingHours", label: "Hours Awake Per Day", defaultValue: 16, min: 4, max: 20, step: 1 },
    { type: "number", key: "glassSize", label: "Glass / Bottle Size (oz)", defaultValue: 8, min: 1, max: 64, step: 1, suffix: "oz" },
  ],
  compute(values: InputValues): ComputeResult {
    const dailyOz = Number(values.dailyOz);
    const wakingHours = Number(values.wakingHours);
    const glassSize = Number(values.glassSize);
    if (isNaN(dailyOz) || isNaN(wakingHours) || isNaN(glassSize) || dailyOz <= 0 || wakingHours <= 0 || glassSize <= 0) {
      return { outputs: [], error: "Please enter valid positive values." };
    }
    const totalGlasses = dailyOz / glassSize;
    const ozPerHour = dailyOz / wakingHours;
    const minutesBetweenDrinks = (wakingHours * 60) / totalGlasses;
    return {
      outputs: [
        { key: "glasses", label: "Total Glasses Per Day", value: Number(totalGlasses.toFixed(1)), format: "number", highlight: true },
        { key: "minutesBetween", label: "Drink Every (minutes)", value: Math.round(minutesBetweenDrinks), format: "number" },
        { key: "ozPerHour", label: "Oz Per Hour", value: Number(ozPerHour.toFixed(1)), format: "number" },
        { key: "dailyOz", label: "Daily Goal", value: dailyOz, format: "number" },
      ],
    };
  },
  howItWorks: "Total glasses = daily goal ÷ glass size. Minutes between drinks = (waking hours × 60) ÷ total glasses. This gives you an even hydration schedule throughout the day.",
  examples: [
    {
      title: "64 oz goal, 8 oz glasses",
      description: "64 oz daily goal, 16 waking hours, 8 oz glasses.",
      inputs: { dailyOz: 64, wakingHours: 16, glassSize: 8 },
      result: "8 glasses per day. Drink one every 120 minutes (2 hours).",
    },
    {
      title: "Large water bottle",
      description: "80 oz goal, 16 hours awake, 20 oz bottle.",
      inputs: { dailyOz: 80, wakingHours: 16, glassSize: 20 },
      result: "4 bottles per day. Refill every 4 hours.",
    },
  ],
  faqs: [
    { question: "How much water should I drink daily?", answer: "A common guideline is 64 oz (8 cups) for women and 96 oz for men, but needs vary by body weight, activity, and climate." },
    { question: "Does coffee count toward my daily water intake?", answer: "Coffee and tea have a mild diuretic effect but still contribute to hydration. Most health guidelines count them partially." },
  ],
  relatedSlugs: ["daily-water-by-weight-calculator", "sleep-cycle-calculator", "daily-screen-time-calculator"],
};

export default def;
