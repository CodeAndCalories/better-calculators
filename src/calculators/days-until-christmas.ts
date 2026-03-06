import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "days-until-christmas",
  title: "Days Until Christmas",
  shortTitle: "Christmas Countdown",
  description: "Calculate how many days are left until Christmas.",
  longDescription:
    "Wondering how many days until Christmas? This calculator automatically figures out today's date and counts down the exact number of days remaining until December 25th. If Christmas has already passed this year, it counts down to next year's.",
  category: "life",
  keywords: ["days until christmas", "christmas countdown", "how many days until christmas"],
  inputs: [],
  compute(_values: InputValues): ComputeResult {
    const today = new Date();
    const year = today.getFullYear();

    let christmas = new Date(year, 11, 25);

    if (today > christmas) {
      christmas = new Date(year + 1, 11, 25);
    }

    const diff = christmas.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return {
      outputs: [
        {
          key: "days",
          label: "Days Until Christmas",
          value: days,
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator gets today's date and compares it to December 25th of the current year. If that date has already passed, it uses December 25th of the following year. The difference in milliseconds is converted to whole days using Math.ceil.",
  examples: [
    {
      title: "Mid-December",
      description: "Running the calculator on December 15th.",
      inputs: {},
      result: "Shows 10 days until Christmas.",
    },
    {
      title: "Day After Christmas",
      description: "Running the calculator on December 26th.",
      inputs: {},
      result: "Shows 364 days until next Christmas.",
    },
  ],
  faqs: [
    {
      question: "Does this update automatically?",
      answer: "Yes. The calculator uses your device's current date every time it runs, so the count is always accurate to today.",
    },
    {
      question: "What if today is Christmas?",
      answer: "If today is December 25th, the calculator will return 0 days remaining.",
    },
  ],
  relatedSlugs: ["days-until-new-year", "days-until-halloween", "days-until-thanksgiving"],
};

export default def;
