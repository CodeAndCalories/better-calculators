import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "running-cadence-calculator",
  title: "Running Cadence Calculator",
  shortTitle: "Running Cadence",
  description: "Calculate your running cadence (steps per minute) and see how it compares to the optimal range.",
  longDescription:
    "Running cadence — steps per minute — is one of the most important form metrics for runners. A higher cadence reduces ground contact time, lowers injury risk, and generally improves efficiency. Enter your step count over a timed interval to calculate your current cadence and see how it compares to the widely recommended target of 170–180 spm.",
  category: "health",
  keywords: ["running cadence calculator", "steps per minute running", "optimal running cadence", "running form calculator", "cadence spm"],
  inputs: [
    {
      type: "number",
      key: "steps",
      label: "Steps Counted",
      defaultValue: 170,
      min: 1,
      step: 1,
      placeholder: "170",
      helpText: "Count every footfall (both feet) over your timed interval",
    },
    {
      type: "number",
      key: "intervalSeconds",
      label: "Counting Interval (seconds)",
      defaultValue: 60,
      min: 5,
      max: 300,
      step: 5,
      placeholder: "60",
      helpText: "e.g. 30 seconds or 60 seconds",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const steps = Number(values.steps);
    const intervalSeconds = Number(values.intervalSeconds);

    if (
      !Number.isFinite(steps) || !Number.isFinite(intervalSeconds) ||
      steps <= 0 || intervalSeconds <= 0
    ) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const cadenceSpm = (steps / intervalSeconds) * 60;

    let cadenceCategory: string;
    if (cadenceSpm < 160) {
      cadenceCategory = "Low — focus on shorter, quicker steps";
    } else if (cadenceSpm < 170) {
      cadenceCategory = "Below optimal — room for improvement";
    } else if (cadenceSpm <= 180) {
      cadenceCategory = "Optimal — in the ideal 170–180 spm range";
    } else {
      cadenceCategory = "High — suitable for faster paces or sprinting";
    }

    return {
      outputs: [
        { key: "cadenceSpm", label: "Cadence (steps/min)", value: Math.round(cadenceSpm * 10) / 10, format: "number", highlight: true },
        { key: "cadenceCategory", label: "Assessment", value: cadenceCategory, format: "text" },
        { key: "stepsPerHour", label: "Estimated Steps per Hour", value: Math.round(cadenceSpm * 60), format: "number" },
      ],
    };
  },

  howItWorks: `Cadence (spm) = (steps counted ÷ interval in seconds) × 60. Count every footfall of both feet during your interval. The widely cited optimal range for recreational runners is 170–180 steps per minute, based on research suggesting this minimises overstriding and reduces injury risk.`,

  examples: [
    {
      title: "85 steps in 30 seconds",
      description: "A common method — count one foot only for 30 seconds and double it, or count both feet.",
      inputs: { steps: 85, intervalSeconds: 30 },
      result: "170 spm — optimal range.",
    },
    {
      title: "150 steps in 60 seconds",
      description: "A low cadence typical of beginners or very slow jogging.",
      inputs: { steps: 150, intervalSeconds: 60 },
      result: "150 spm — below optimal.",
    },
  ],

  faqs: [
    {
      question: "Should I count one foot or both feet?",
      answer: "Count every footfall of both feet for the most accurate result. If counting one foot only, multiply your count by 2 before entering it — or double your counting interval.",
    },
    {
      question: "Does optimal cadence change at different speeds?",
      answer: "Yes. Slower paces naturally have lower cadence. The 170–180 spm target is most applicable at comfortable aerobic running pace. Sprint cadence can exceed 200 spm.",
    },
  ],

  relatedSlugs: ["pace-calculator", "running-speed-calculator", "target-heart-rate-calculator"],
};

export default def;
