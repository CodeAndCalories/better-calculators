import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "hours-to-seconds",
  title: "Hours to Seconds Calculator",
  shortTitle: "Hours to Seconds",
  description: "Convert hours to seconds instantly.",
  longDescription:
    "Whether you're working on a programming problem, calculating elapsed time, or converting durations for scientific use, this calculator converts any number of hours into the exact equivalent in seconds. It also shows the intermediate minute value for clarity.",
  category: "life",
  keywords: ["hours to seconds", "time converter", "hours to sec", "duration conversion"],
  inputs: [
    {
      type: "number",
      key: "hours",
      label: "Hours",
      defaultValue: 1,
      min: 0,
      step: 0.5,
      placeholder: "1",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const hours = Number(values.hours);

    if (isNaN(hours) || hours < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }

    const minutes = hours * 60;
    const seconds = hours * 3600;

    return {
      outputs: [
        {
          key: "seconds",
          label: "Seconds",
          value: Number(seconds.toFixed(2)),
          format: "number",
          highlight: true,
        },
        {
          key: "minutes",
          label: "Minutes",
          value: Number(minutes.toFixed(2)),
          format: "number",
        },
      ],
    };
  },
  howItWorks:
    "One hour contains 60 minutes, and each minute contains 60 seconds. The calculator multiplies your hour value by 3,600 (60 × 60) to get the total seconds. It also shows the minutes value as a helpful intermediate step.",
  examples: [
    {
      title: "One Hour",
      description: "How many seconds are in a single hour?",
      inputs: { hours: 1 },
      result: "1 hour equals exactly 3,600 seconds.",
    },
    {
      title: "Workday",
      description: "An 8-hour workday expressed in seconds.",
      inputs: { hours: 8 },
      result: "8 hours equals 28,800 seconds.",
    },
    {
      title: "Half Hour",
      description: "Converting 0.5 hours to seconds.",
      inputs: { hours: 0.5 },
      result: "0.5 hours equals 1,800 seconds (30 minutes).",
    },
  ],
  faqs: [
    {
      question: "How many seconds are in an hour?",
      answer: "There are exactly 3,600 seconds in one hour (60 minutes × 60 seconds).",
    },
    {
      question: "Can I enter decimal hours?",
      answer: "Yes. For example, entering 1.5 will correctly calculate 5,400 seconds (one and a half hours).",
    },
    {
      question: "Why is this useful for programming?",
      answer: "Many programming languages and APIs measure time in milliseconds or seconds. Converting hours to seconds is a common step when setting timeouts, intervals, or expiration values.",
    },
  ],
  relatedSlugs: ["miles-to-km", "kg-to-lbs"],
};

export default def;
