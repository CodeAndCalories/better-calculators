import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "days-until-spring",
  title: "Days Until Spring",
  shortTitle: "Spring Countdown",
  description: "Calculate how many days remain until spring begins.",
  longDescription:
    "Spring officially begins on the vernal equinox, around March 20th each year. If you're tired of the cold and can't wait for warmer weather, this calculator tells you exactly how many days are left until the first day of spring.",
  category: "life",
  keywords: ["days until spring", "spring countdown", "first day of spring", "vernal equinox"],
  inputs: [],
  compute(_values: InputValues): ComputeResult {
    const today = new Date();
    const year = today.getFullYear();

    let spring = new Date(year, 2, 20);

    if (today > spring) {
      spring = new Date(year + 1, 2, 20);
    }

    const diff = spring.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return {
      outputs: [
        {
          key: "days",
          label: "Days Until Spring",
          value: days,
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator targets March 20th as the approximate start of spring (the vernal equinox). If that date has already passed this year, it counts down to March 20th of the following year.",
  examples: [
    {
      title: "Deep Winter",
      description: "Running the calculator on January 15th.",
      inputs: {},
      result: "Shows approximately 64 days until spring.",
    },
    {
      title: "Day After Spring Starts",
      description: "Running the calculator on March 21st.",
      inputs: {},
      result: "Shows approximately 364 days until next spring.",
    },
  ],
  faqs: [
    {
      question: "When does spring officially begin?",
      answer: "Spring begins on the vernal equinox, which falls around March 20th or 21st each year in the Northern Hemisphere.",
    },
    {
      question: "Does this account for the exact equinox time?",
      answer: "This calculator uses March 20th as a fixed approximate date. The precise equinox time varies slightly each year.",
    },
  ],
  relatedSlugs: ["days-until-summer", "days-until-fall", "days-until-winter"],
};

export default def;
