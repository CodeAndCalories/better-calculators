import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "minutes-to-hours-calculator",
  title: "Minutes to Hours Converter",
  shortTitle: "Minutes to Hours",
  description: "Convert minutes into hours (decimal) and hours plus minutes.",
  longDescription:
    "This minutes to hours converter helps you quickly turn any number of minutes into hours. It shows both a decimal hour result (useful for timesheets and billing) and an hours plus minutes format (useful for everyday time conversions).",
  category: "life",
  keywords: ["minutes to hours", "minutes-to-hours-calculator", "convert minutes to hours"],
  inputs: [
    {
      type: "number",
      key: "value",
      label: "Minutes",
      defaultValue: 90,
      min: 0,
      step: 1,
      placeholder: "90",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const minutesRaw = Number(values.value);

    if (!Number.isFinite(minutesRaw) || minutesRaw < 0) {
      return {
        outputs: [
          {
            key: "error",
            label: "Result",
            value: "Enter a valid number of minutes (0 or more).",
            format: "text",
            highlight: true,
          },
        ],
      };
    }

    const minutes = Math.floor(minutesRaw);
    const hoursDecimal = minutes / 60;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return {
      outputs: [
        {
          key: "hoursDecimal",
          label: "Hours (decimal)",
          value: Number(hoursDecimal.toFixed(2)),
          format: "number",
          highlight: true,
        },
        {
          key: "hoursMinutes",
          label: "Hours and minutes",
          value: `${hours}h ${remainingMinutes}m`,
          format: "text",
        },
      ],
    };
  },

  howItWorks:
    "To convert minutes to hours, divide minutes by 60. For an hours-and-minutes format, take the whole hours (minutes ÷ 60) and the remaining minutes (minutes mod 60).",
  examples: [
    {
      title: "Convert 90 minutes",
      description: "A common time conversion for meetings or workouts.",
      inputs: { value: 90 },
      result: "90 minutes = 1.50 hours = 1h 30m",
    },
    {
      title: "Convert 150 minutes",
      description: "Useful for longer events or travel time.",
      inputs: { value: 150 },
      result: "150 minutes = 2.50 hours = 2h 30m",
    },
  ],
  faqs: [
    {
      question: "How many hours is 60 minutes?",
      answer: "60 minutes equals 1 hour.",
    },
    {
      question: "Why do you show decimal hours?",
      answer:
        "Decimal hours are helpful for timesheets, payroll, and billing because you can multiply hours by a rate (for example, 1.50 hours × $20/hour).",
    },
    {
      question: "Does this round the result?",
      answer:
        "The decimal hours output is shown to 2 decimal places for readability. The hours and minutes output is exact for whole-minute inputs.",
    },
    {
      question: "Can I convert seconds too?",
      answer:
        "This calculator converts minutes to hours. If you have seconds, divide seconds by 60 to get minutes first, then convert minutes to hours.",
    },
  ],
  relatedSlugs: [
    "hours-to-minutes-calculator",
    "time-duration-calculator",
    "time-in-x-minutes",
    "time-x-minutes-ago",
  ],
};

export default def;