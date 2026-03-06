import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "days-until-summer",
  title: "Days Until Summer",
  shortTitle: "Summer Countdown",
  description: "Calculate how many days remain until summer begins.",
  longDescription:
    "Summer officially kicks off around June 21st with the summer solstice — the longest day of the year. Whether you're planning a vacation or just dreaming of warm weather, this calculator tells you exactly how many days are left until summer arrives.",
  category: "life",
  keywords: ["days until summer", "summer countdown", "first day of summer", "summer solstice"],
  inputs: [],
  compute(_values: InputValues): ComputeResult {
    const today = new Date();
    const year = today.getFullYear();

    let summer = new Date(year, 5, 21);

    if (today > summer) {
      summer = new Date(year + 1, 5, 21);
    }

    const diff = summer.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return {
      outputs: [
        {
          key: "days",
          label: "Days Until Summer",
          value: days,
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator targets June 21st as the approximate start of summer (the summer solstice). If that date has already passed this year, it counts down to June 21st of the following year.",
  examples: [
    {
      title: "Spring Morning",
      description: "Running the calculator on April 1st.",
      inputs: {},
      result: "Shows approximately 81 days until summer.",
    },
    {
      title: "Midsummer",
      description: "Running the calculator on July 4th.",
      inputs: {},
      result: "Shows approximately 352 days until next summer.",
    },
  ],
  faqs: [
    {
      question: "When does summer officially begin?",
      answer: "Summer begins on the summer solstice, which falls around June 20th or 21st each year in the Northern Hemisphere.",
    },
    {
      question: "Why does the solstice date vary?",
      answer: "The exact solstice date shifts slightly each year due to the way our calendar aligns with Earth's orbit. This calculator uses June 21st as a consistent approximation.",
    },
  ],
  relatedSlugs: ["days-until-spring", "days-until-fall", "days-until-winter"],
};

export default def;
