import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

// Karvonen method: THR = ((HRmax − HRrest) × intensity%) + HRrest
// Falls back to simple % of HRmax if no resting HR is entered.

const def: CalculatorDef = {
  slug: "target-heart-rate-calculator",
  title: "Target Heart Rate Calculator",
  shortTitle: "Target Heart Rate",
  description: "Calculate your target heart rate zone and maximum heart rate for any exercise intensity.",
  longDescription:
    "Uses the Karvonen formula (Heart Rate Reserve method) when a resting heart rate is provided, giving a more personalised target. If resting heart rate is left blank, a simple percentage of maximum heart rate (220 − age) is used. Both methods are widely accepted in exercise science.",
  category: "health",
  keywords: ["target heart rate calculator", "heart rate zone calculator", "max heart rate", "Karvonen formula", "exercise heart rate"],
  inputs: [
    {
      type: "number",
      key: "age",
      label: "Age",
      suffix: "years",
      defaultValue: 30,
      min: 10,
      max: 100,
      step: 1,
      placeholder: "30",
    },
    {
      type: "number",
      key: "restingHeartRate",
      label: "Resting Heart Rate (optional)",
      suffix: "bpm",
      defaultValue: 65,
      min: 30,
      max: 120,
      step: 1,
      placeholder: "65",
      helpText: "Measure first thing in the morning before getting up. Leave at default to use simple % method.",
    },
    {
      type: "select",
      key: "intensityLevel",
      label: "Exercise Intensity",
      defaultValue: "0.70",
      options: [
        { label: "Light (50–60%) — warm-up, recovery", value: "0.55" },
        { label: "Moderate (60–70%) — fat burn, aerobic base", value: "0.65" },
        { label: "Vigorous (70–80%) — aerobic fitness", value: "0.75" },
        { label: "Hard (80–90%) — performance training", value: "0.85" },
        { label: "Maximum (90–100%) — peak effort", value: "0.95" },
      ],
    },
  ],

  compute(values: InputValues): ComputeResult {
    const age = Number(values.age);
    const restingHR = Number(values.restingHeartRate);
    const intensity = Number(values.intensityLevel);

    if (!Number.isFinite(age) || age <= 0 || !Number.isFinite(intensity)) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const maxHR = 220 - age;

    let targetHR: number;
    let method: string;

    const useKarvonen = Number.isFinite(restingHR) && restingHR >= 30 && restingHR <= 120;

    if (useKarvonen) {
      // Karvonen: THR = ((HRmax − HRrest) × intensity) + HRrest
      const hrReserve = maxHR - restingHR;
      targetHR = hrReserve * intensity + restingHR;
      method = `Karvonen formula (Heart Rate Reserve). HRR = ${maxHR} − ${Math.round(restingHR)} = ${Math.round(maxHR - restingHR)} bpm.`;
    } else {
      // Simple % of max HR
      targetHR = maxHR * intensity;
      method = "Simple % of maximum heart rate (220 − age).";
    }

    // Show a ±5 bpm range for practical use
    const targetLow = Math.round(targetHR - 5);
    const targetHigh = Math.round(targetHR + 5);

    return {
      outputs: [
        { key: "targetHR", label: "Target Heart Rate", value: `${targetLow}–${targetHigh} bpm`, format: "text", highlight: true },
        { key: "maxHR", label: "Estimated Max Heart Rate (bpm)", value: maxHR, format: "number" },
        ...(useKarvonen ? [{ key: "restingHR", label: "Resting Heart Rate (bpm)", value: Math.round(restingHR), format: "number" as const }] : []),
        { key: "method", label: "Method Used", value: method, format: "text" },
      ],
    };
  },

  howItWorks: `Maximum Heart Rate (HRmax) = 220 − age. This is the widely used age-based estimate.

If a resting heart rate is provided, the Karvonen (Heart Rate Reserve) method is used:
  Heart Rate Reserve (HRR) = HRmax − resting HR
  Target HR = (HRR × intensity %) + resting HR

If no resting heart rate is provided, the simpler method is used:
  Target HR = HRmax × intensity %

A ±5 bpm range is displayed to reflect real-world measurement variability. The Karvonen method is generally more accurate because it accounts for your individual cardiovascular fitness.`,

  examples: [
    {
      title: "30-year-old, resting HR 65 bpm, vigorous intensity",
      description: "Using the Karvonen method for a moderately fit adult.",
      inputs: { age: 30, restingHeartRate: 65, intensityLevel: "0.75" },
      result: "Target zone ~151–161 bpm. Max HR = 190 bpm.",
    },
    {
      title: "45-year-old, moderate intensity, no resting HR",
      description: "Simple percentage method for a general aerobic workout.",
      inputs: { age: 45, restingHeartRate: 65, intensityLevel: "0.65" },
      result: "Target zone ~108–118 bpm. Max HR = 175 bpm.",
    },
  ],

  faqs: [
    {
      question: "What is the Karvonen formula?",
      answer: "The Karvonen (Heart Rate Reserve) formula personalises your target by accounting for your resting heart rate: THR = ((HRmax − HRrest) × intensity) + HRrest. It's more accurate than a simple percentage because fitter people have lower resting heart rates.",
    },
    {
      question: "How do I measure my resting heart rate?",
      answer: "Measure it first thing in the morning before getting out of bed. Count your pulse for 60 seconds, or for 15 seconds and multiply by 4. Take the average over 3 mornings for the best result.",
    },
    {
      question: "Is 220 minus age accurate for everyone?",
      answer: "It's an estimate with a standard deviation of roughly ±10–12 bpm. It works well as a population average but can be inaccurate for individuals. If you've had a proper VO2 max test, use your lab-measured HRmax instead.",
    },
    {
      question: "What intensity should I train at?",
      answer: "For general cardiovascular health, 60–75% of HRmax or HRR is recommended. For performance training, 75–90% is appropriate. Always include time at lower intensities (50–65%) for recovery and aerobic base building.",
    },
  ],

  relatedSlugs: ["calorie-calculator", "macro-calculator", "bmi-calculator"],
};

export default def;
