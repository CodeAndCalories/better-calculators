import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "minutes-to-seconds",
  title: "Minutes to Seconds Calculator",
  shortTitle: "Min to Sec",
  description: "Convert minutes to seconds instantly.",
  longDescription:
    "Whether you're writing code that uses time intervals, setting a countdown timer, or working through a physics problem, knowing the exact number of seconds in any minute value is essential. This calculator gives you an instant result for any input.",
  category: "life",
  keywords: ["minutes to seconds", "min to sec", "time converter", "time conversion"],
  inputs: [
    {
      type: "number",
      key: "minutes",
      label: "Minutes",
      defaultValue: 5,
      min: 0,
      step: 1,
      placeholder: "5",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const minutes = Number(values.minutes);

    if (isNaN(minutes) || minutes < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }

    const seconds = minutes * 60;

    return {
      outputs: [
        {
          key: "seconds",
          label: "Seconds",
          value: Number(seconds.toFixed(2)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator multiplies your minute value by 60, since there are exactly 60 seconds in every minute. Decimal inputs are supported — for example, 1.5 minutes correctly returns 90 seconds.",
  examples: [
    {
      title: "5-Minute Timer",
      description: "How many seconds in a 5-minute countdown?",
      inputs: { minutes: 5 },
      result: "5 minutes equals 300 seconds.",
    },
    {
      title: "Half Minute",
      description: "Converting 0.5 minutes to seconds.",
      inputs: { minutes: 0.5 },
      result: "0.5 minutes equals 30 seconds.",
    },
    {
      title: "One Hour in Minutes",
      description: "Converting 60 minutes to seconds.",
      inputs: { minutes: 60 },
      result: "60 minutes equals 3,600 seconds.",
    },
  ],
  faqs: [
    {
      question: "How many seconds are in a minute?",
      answer: "There are exactly 60 seconds in one minute.",
    },
    {
      question: "Can I enter decimal minutes?",
      answer: "Yes. For example, 2.5 minutes will correctly return 150 seconds.",
    },
    {
      question: "Why is this useful for programming?",
      answer: "Many APIs and programming functions take time arguments in seconds (e.g. setTimeout, sleep). Converting from minutes is a common step when setting delays or intervals.",
    },
  ],
  relatedSlugs: ["seconds-to-minutes", "hours-to-seconds", "days-to-hours"],
};

export default def;
