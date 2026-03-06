import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "yards-to-meters",
  title: "Yards to Meters Calculator",
  shortTitle: "yd to m",
  description: "Convert yards to meters instantly.",
  longDescription:
    "The yard is a unit of length used in the United States and United Kingdom, while the meter is the international standard. Whether you're measuring fabric, a football field, or a garden, this calculator converts any yard value to its precise meter equivalent.",
  category: "life",
  keywords: ["yards to meters", "yd to m", "length converter", "distance conversion", "yards to metres"],
  inputs: [
    {
      type: "number",
      key: "yards",
      label: "Yards (yd)",
      defaultValue: 10,
      min: 0,
      step: 0.1,
      placeholder: "10",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const yards = Number(values.yards);

    if (isNaN(yards) || yards < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }

    const meters = yards * 0.9144;

    return {
      outputs: [
        {
          key: "meters",
          label: "Meters (m)",
          value: Number(meters.toFixed(4)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator multiplies your yard value by 0.9144, the exact number of meters in one international yard. This is a defined conversion — not an approximation — established by the international yard and pound agreement of 1959.",
  examples: [
    {
      title: "American Football Field",
      description: "A standard football field is 100 yards long.",
      inputs: { yards: 100 },
      result: "100 yards equals 91.44 meters.",
    },
    {
      title: "Fabric Measurement",
      description: "Converting 3 yards of fabric to meters.",
      inputs: { yards: 3 },
      result: "3 yards equals 2.7432 meters.",
    },
    {
      title: "One Yard",
      description: "The base conversion: how many meters is one yard?",
      inputs: { yards: 1 },
      result: "1 yard equals exactly 0.9144 meters.",
    },
  ],
  faqs: [
    {
      question: "How many meters are in a yard?",
      answer: "One yard is exactly 0.9144 meters. This is a defined constant, not a rounded approximation.",
    },
    {
      question: "Is a yard close to a meter?",
      answer: "Yes. A yard is about 91.4% of a meter, so they are quite close in size — roughly 8.6% shorter than a meter.",
    },
    {
      question: "What is a yard used for?",
      answer: "Yards are commonly used in the US and UK to measure fabric, lawn and garden distances, and sports fields such as American football and golf.",
    },
  ],
  relatedSlugs: ["feet-to-meters", "meters-to-feet", "miles-to-km"],
};

export default def;
