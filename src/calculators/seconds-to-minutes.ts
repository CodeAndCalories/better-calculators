import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "seconds-to-minutes",
  title: "Seconds to Minutes Calculator",
  shortTitle: "Sec to Min",
  description: "Convert seconds to minutes instantly.",
  longDescription:
    "When working with timestamps, video durations, race times, or code-based timers, converting a raw second count into minutes gives a more human-readable result. Enter any number of seconds and get the equivalent in minutes, including decimal fractions.",
  category: "life",
  keywords: ["seconds to minutes", "sec to min", "time converter", "time conversion"],
  inputs: [
    {
      type: "number",
      key: "seconds",
      label: "Seconds",
      defaultValue: 120,
      min: 0,
      step: 1,
      placeholder: "120",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const seconds = Number(values.seconds);

    if (isNaN(seconds) || seconds < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }

    const minutes = seconds / 60;

    return {
      outputs: [
        {
          key: "minutes",
          label: "Minutes",
          value: Number(minutes.toFixed(4)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator divides your second value by 60, since there are 60 seconds in every minute. The result is expressed as a decimal — for example, 90 seconds returns 1.5 minutes.",
  examples: [
    {
      title: "Two Minutes",
      description: "How many minutes is 120 seconds?",
      inputs: { seconds: 120 },
      result: "120 seconds equals exactly 2 minutes.",
    },
    {
      title: "90 Seconds",
      description: "Converting 90 seconds to minutes.",
      inputs: { seconds: 90 },
      result: "90 seconds equals 1.5 minutes.",
    },
    {
      title: "One Hour in Seconds",
      description: "Converting 3,600 seconds to minutes.",
      inputs: { seconds: 3600 },
      result: "3,600 seconds equals 60 minutes.",
    },
  ],
  faqs: [
    {
      question: "How many minutes is 60 seconds?",
      answer: "60 seconds equals exactly 1 minute.",
    },
    {
      question: "Does the result show a decimal?",
      answer: "Yes. If the seconds don't divide evenly into minutes, the result is shown as a decimal. For example, 75 seconds returns 1.25 minutes.",
    },
    {
      question: "How do I convert seconds to minutes and seconds?",
      answer: "Divide the total seconds by 60. The whole number part is the minutes, and the remainder (seconds mod 60) is the leftover seconds.",
    },
  ],
  relatedSlugs: ["minutes-to-seconds", "hours-to-seconds", "days-to-hours"],
};

export default def;
