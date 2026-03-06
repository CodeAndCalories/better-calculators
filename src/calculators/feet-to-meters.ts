import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "feet-to-meters",
  title: "Feet to Meters Calculator",
  shortTitle: "ft to m",
  description: "Convert feet to meters quickly and accurately.",
  longDescription:
    "The foot is the primary unit of length in the United States, while the meter is the international standard. Whether you're converting your height, measuring a room, or working on a construction project with international specifications, this calculator gives you an instant and precise result.",
  category: "life",
  keywords: ["feet to meters", "ft to m", "length converter", "distance conversion", "height converter"],
  inputs: [
    {
      type: "number",
      key: "feet",
      label: "Feet (ft)",
      defaultValue: 6,
      min: 0,
      step: 0.1,
      placeholder: "6",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const feet = Number(values.feet);

    if (isNaN(feet) || feet < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }

    const meters = feet * 0.3048;

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
    "The calculator multiplies the foot value by 0.3048, which is the exact defined length of one foot in meters. This is an exact conversion, not an approximation.",
  examples: [
    {
      title: "Average Height",
      description: "Converting 6 feet (average adult male height in the US) to meters.",
      inputs: { feet: 6 },
      result: "6 feet equals 1.8288 meters.",
    },
    {
      title: "Standard Ceiling Height",
      description: "A typical 8-foot ceiling converted to meters.",
      inputs: { feet: 8 },
      result: "8 feet equals 2.4384 meters.",
    },
    {
      title: "100-Foot Distance",
      description: "Converting 100 feet to meters.",
      inputs: { feet: 100 },
      result: "100 feet equals 30.48 meters.",
    },
  ],
  faqs: [
    {
      question: "How many meters are in a foot?",
      answer: "One foot is exactly 0.3048 meters. This is a defined conversion, not a rounded figure.",
    },
    {
      question: "How do I convert height in feet and inches?",
      answer: "Convert feet to inches (multiply by 12), add the remaining inches, then multiply the total inches by 0.0254 to get meters.",
    },
    {
      question: "Is this useful for construction and architecture?",
      answer: "Yes. Many international building codes and technical drawings use meters, so converting from feet is a common need for architects and engineers.",
    },
  ],
  relatedSlugs: ["meters-to-feet", "inches-to-cm", "miles-to-km"],
};

export default def;
