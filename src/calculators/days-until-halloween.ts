import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "days-until-halloween",
  title: "Days Until Halloween",
  shortTitle: "Halloween Countdown",
  description: "Calculate how many days remain until Halloween.",
  longDescription:
    "Find out exactly how many days are left until October 31st. Whether you're planning a costume, decorating your home, or just counting down to the spookiest night of the year, this calculator gives you an instant answer based on today's date.",
  category: "life",
  keywords: ["days until halloween", "halloween countdown", "how many days until halloween"],
  inputs: [],
  compute(_values: InputValues): ComputeResult {
    const today = new Date();
    const year = today.getFullYear();

    let halloween = new Date(year, 9, 31);

    if (today > halloween) {
      halloween = new Date(year + 1, 9, 31);
    }

    const diff = halloween.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return {
      outputs: [
        {
          key: "days",
          label: "Days Until Halloween",
          value: days,
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator sets the target date to October 31st of the current year. If that date has already passed, it advances to October 31st of the following year. The remaining days are calculated by dividing the millisecond difference by the length of one day.",
  examples: [
    {
      title: "One Week Away",
      description: "Running the calculator on October 24th.",
      inputs: {},
      result: "Shows 7 days until Halloween.",
    },
    {
      title: "Day After Halloween",
      description: "Running the calculator on November 1st.",
      inputs: {},
      result: "Shows 364 days until next Halloween.",
    },
  ],
  faqs: [
    {
      question: "What date does this count down to?",
      answer: "Halloween is always October 31st, so the calculator always targets that date.",
    },
    {
      question: "Will it roll over to next year automatically?",
      answer: "Yes. Once October 31st has passed, the countdown automatically switches to October 31st of the following year.",
    },
  ],
  relatedSlugs: ["days-until-christmas", "days-until-thanksgiving", "days-until-new-year"],
};

export default def;
