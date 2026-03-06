import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "days-to-hours",
  title: "Days to Hours Calculator",
  shortTitle: "Days to Hours",
  description: "Convert days to hours instantly.",
  longDescription:
    "Whether you're calculating a project deadline, billing hours across a multi-day period, or just curious how many hours are in a given number of days, this calculator gives you the exact total in seconds. Decimal day values are fully supported.",
  category: "life",
  keywords: ["days to hours", "time converter", "how many hours in a day", "time conversion"],
  inputs: [
    {
      type: "number",
      key: "days",
      label: "Days",
      defaultValue: 7,
      min: 0,
      step: 1,
      placeholder: "7",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const days = Number(values.days);

    if (isNaN(days) || days < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }

    const hours = days * 24;

    return {
      outputs: [
        {
          key: "hours",
          label: "Hours",
          value: Number(hours.toFixed(2)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator multiplies your day value by 24, since there are exactly 24 hours in every day. Decimal inputs are supported — for example, 1.5 days correctly returns 36 hours.",
  examples: [
    {
      title: "One Week",
      description: "How many hours are in 7 days?",
      inputs: { days: 7 },
      result: "7 days equals 168 hours.",
    },
    {
      title: "Half a Day",
      description: "Converting 0.5 days to hours.",
      inputs: { days: 0.5 },
      result: "0.5 days equals 12 hours.",
    },
    {
      title: "One Year",
      description: "How many hours are in 365 days?",
      inputs: { days: 365 },
      result: "365 days equals 8,760 hours.",
    },
  ],
  faqs: [
    {
      question: "How many hours are in a day?",
      answer: "There are exactly 24 hours in one day.",
    },
    {
      question: "Can I enter decimal days?",
      answer: "Yes. For example, entering 2.5 will correctly return 60 hours (two and a half days).",
    },
    {
      question: "How many hours are in a week?",
      answer: "A week has 7 days × 24 hours = 168 hours total.",
    },
  ],
  relatedSlugs: ["hours-to-seconds", "minutes-to-seconds", "seconds-to-minutes"],
};

export default def;
