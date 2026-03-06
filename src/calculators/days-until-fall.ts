import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "days-until-fall",
  title: "Days Until Fall",
  shortTitle: "Fall Countdown",
  description: "Calculate how many days remain until fall begins.",
  longDescription:
    "Fall (autumn) officially begins around September 22nd with the autumnal equinox. If you're looking forward to cooler temperatures, changing leaves, and pumpkin season, this calculator tells you exactly how many days are left until fall arrives.",
  category: "life",
  keywords: ["days until fall", "days until autumn", "fall countdown", "first day of fall", "autumnal equinox"],
  inputs: [],
  compute(_values: InputValues): ComputeResult {
    const today = new Date();
    const year = today.getFullYear();

    let fall = new Date(year, 8, 22);

    if (today > fall) {
      fall = new Date(year + 1, 8, 22);
    }

    const diff = fall.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return {
      outputs: [
        {
          key: "days",
          label: "Days Until Fall",
          value: days,
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator targets September 22nd as the approximate start of fall (the autumnal equinox). If that date has already passed this year, it counts down to September 22nd of the following year.",
  examples: [
    {
      title: "Late Summer",
      description: "Running the calculator on August 22nd.",
      inputs: {},
      result: "Shows approximately 31 days until fall.",
    },
    {
      title: "Day After Fall Starts",
      description: "Running the calculator on September 23rd.",
      inputs: {},
      result: "Shows approximately 364 days until next fall.",
    },
  ],
  faqs: [
    {
      question: "When does fall officially begin?",
      answer: "Fall begins on the autumnal equinox, which falls around September 22nd or 23rd each year in the Northern Hemisphere.",
    },
    {
      question: "Is fall the same as autumn?",
      answer: "Yes. Fall and autumn refer to the same season. 'Fall' is more commonly used in the US, while 'autumn' is more common in the UK.",
    },
  ],
  relatedSlugs: ["days-until-summer", "days-until-winter", "days-until-spring"],
};

export default def;
