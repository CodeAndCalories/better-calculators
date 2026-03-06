import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "days-until-winter",
  title: "Days Until Winter",
  shortTitle: "Winter Countdown",
  description: "Calculate how many days remain until winter begins.",
  longDescription:
    "Winter officially begins around December 21st with the winter solstice — the shortest day of the year. Whether you're bracing for cold weather or excited for snow season, this calculator tells you exactly how many days are left until winter arrives.",
  category: "life",
  keywords: ["days until winter", "winter countdown", "first day of winter", "winter solstice"],
  inputs: [],
  compute(_values: InputValues): ComputeResult {
    const today = new Date();
    const year = today.getFullYear();

    let winter = new Date(year, 11, 21);

    if (today > winter) {
      winter = new Date(year + 1, 11, 21);
    }

    const diff = winter.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return {
      outputs: [
        {
          key: "days",
          label: "Days Until Winter",
          value: days,
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator targets December 21st as the approximate start of winter (the winter solstice). If that date has already passed this year, it counts down to December 21st of the following year.",
  examples: [
    {
      title: "Early December",
      description: "Running the calculator on December 1st.",
      inputs: {},
      result: "Shows approximately 20 days until winter.",
    },
    {
      title: "Day After Winter Starts",
      description: "Running the calculator on December 22nd.",
      inputs: {},
      result: "Shows approximately 364 days until next winter.",
    },
  ],
  faqs: [
    {
      question: "When does winter officially begin?",
      answer: "Winter begins on the winter solstice, which falls around December 21st or 22nd each year in the Northern Hemisphere.",
    },
    {
      question: "Is the winter solstice always December 21st?",
      answer: "It's usually December 21st but can fall on December 20th, 21st, or 22nd depending on the year. This calculator uses the 21st as a consistent approximation.",
    },
  ],
  relatedSlugs: ["days-until-fall", "days-until-spring", "days-until-christmas"],
};

export default def;
