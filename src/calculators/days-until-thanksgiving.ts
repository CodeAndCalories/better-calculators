import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

function getThanksgiving(year: number): Date {
  const date = new Date(year, 10, 1);
  const day = date.getDay();
  const offset = (4 - day + 7) % 7;
  date.setDate(1 + offset + 21);
  return date;
}

const def: CalculatorDef = {
  slug: "days-until-thanksgiving",
  title: "Days Until Thanksgiving",
  shortTitle: "Thanksgiving Countdown",
  description: "Calculate how many days remain until Thanksgiving.",
  longDescription:
    "Thanksgiving falls on the fourth Thursday of November each year, making the date different every year. This calculator automatically determines the correct Thursday for the current or next year and counts down the exact number of days remaining.",
  category: "life",
  keywords: ["days until thanksgiving", "thanksgiving countdown", "how many days until thanksgiving"],
  inputs: [],
  compute(_values: InputValues): ComputeResult {
    const today = new Date();
    let thanksgiving = getThanksgiving(today.getFullYear());

    if (today > thanksgiving) {
      thanksgiving = getThanksgiving(today.getFullYear() + 1);
    }

    const diff = thanksgiving.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return {
      outputs: [
        {
          key: "days",
          label: "Days Until Thanksgiving",
          value: days,
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "Thanksgiving is the fourth Thursday of November. The calculator finds the first Thursday of November, then adds 21 days to land on the fourth one. If that date has already passed, it calculates the same Thursday for the following year.",
  examples: [
    {
      title: "Early November",
      description: "Running the calculator on November 1st.",
      inputs: {},
      result: "Shows roughly 21–27 days until Thanksgiving depending on the year.",
    },
    {
      title: "Day After Thanksgiving",
      description: "Running the calculator on Black Friday.",
      inputs: {},
      result: "Shows approximately 364 days until the next Thanksgiving.",
    },
  ],
  faqs: [
    {
      question: "Why does Thanksgiving change dates every year?",
      answer: "Thanksgiving is defined as the fourth Thursday of November, not a fixed calendar date, so it shifts by a day or more each year.",
    },
    {
      question: "Is this for US Thanksgiving?",
      answer: "Yes. This calculator uses the US Thanksgiving date (fourth Thursday of November). Canadian Thanksgiving falls on the second Monday of October.",
    },
  ],
  relatedSlugs: ["days-until-christmas", "days-until-halloween", "days-until-new-year"],
};

export default def;
