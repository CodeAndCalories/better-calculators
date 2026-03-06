import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "days-until-new-year",
  title: "Days Until New Year",
  shortTitle: "New Year Countdown",
  description: "Calculate how many days remain until the New Year.",
  longDescription:
    "Count down the days until January 1st with this simple calculator. It automatically detects today's date and calculates the exact number of days remaining until the next New Year's Day, so you always know how much time is left to celebrate.",
  category: "life",
  keywords: ["days until new year", "new year countdown", "how many days until new year"],
  inputs: [],
  compute(_values: InputValues): ComputeResult {
    const today = new Date();
    const year = today.getFullYear();

    const newYear = new Date(year + 1, 0, 1);

    const diff = newYear.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return {
      outputs: [
        {
          key: "days",
          label: "Days Until New Year",
          value: days,
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator always targets January 1st of the next calendar year. It subtracts today's date from that target, converts the millisecond difference into days, and rounds up with Math.ceil to give you a whole-day count.",
  examples: [
    {
      title: "New Year's Eve",
      description: "Running the calculator on December 31st.",
      inputs: {},
      result: "Shows 1 day until New Year.",
    },
    {
      title: "Start of the Year",
      description: "Running the calculator on January 2nd.",
      inputs: {},
      result: "Shows 364 days until the next New Year.",
    },
  ],
  faqs: [
    {
      question: "Does this always count to January 1st?",
      answer: "Yes. The calculator always targets January 1st of the next year, regardless of what day you run it.",
    },
    {
      question: "Is this based on my local time?",
      answer: "Yes. It uses your device's local date to calculate the countdown.",
    },
  ],
  relatedSlugs: ["days-until-christmas", "days-until-thanksgiving", "days-until-halloween"],
};

export default def;
