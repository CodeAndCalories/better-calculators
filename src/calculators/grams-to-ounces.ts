import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "grams-to-ounces",
  title: "Grams to Ounces Calculator",
  shortTitle: "g to oz",
  description: "Convert grams to ounces for cooking, nutrition, and shipping.",
  longDescription:
    "Grams are the standard unit of mass in the metric system, while ounces are commonly used in the United States for food portions, nutrition labels, and shipping weights. This calculator converts any gram value to its precise ounce equivalent.",
  category: "conversions",
  keywords: ["grams to ounces", "g to oz", "weight converter", "mass conversion", "cooking converter"],
  inputs: [
    {
      type: "number",
      key: "grams",
      label: "Grams (g)",
      defaultValue: 100,
      min: 0,
      step: 1,
      placeholder: "100",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const grams = Number(values.grams);

    if (isNaN(grams) || grams < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }

    const ounces = grams * 0.035274;

    return {
      outputs: [
        {
          key: "ounces",
          label: "Ounces (oz)",
          value: Number(ounces.toFixed(4)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator multiplies your gram value by 0.035274, which is the number of ounces in one gram. This factor is derived from the defined mass of one avoirdupois ounce (28.3495 grams).",
  examples: [
    {
      title: "Standard Serving Size",
      description: "A 100g serving of food converted to ounces.",
      inputs: { grams: 100 },
      result: "100 grams equals approximately 3.5274 ounces.",
    },
    {
      title: "Stick of Butter",
      description: "A standard US stick of butter is 113g.",
      inputs: { grams: 113 },
      result: "113 grams equals approximately 3.986 ounces.",
    },
    {
      title: "One Kilogram",
      description: "Converting 1,000 grams (1 kg) to ounces.",
      inputs: { grams: 1000 },
      result: "1,000 grams equals approximately 35.274 ounces.",
    },
  ],
  faqs: [
    {
      question: "How many ounces are in a gram?",
      answer: "One gram is equal to approximately 0.035274 ounces.",
    },
    {
      question: "Is this for dry ounces or fluid ounces?",
      answer: "This calculator converts to avoirdupois ounces (dry weight), not fluid ounces. Fluid ounces measure volume and require a different conversion.",
    },
    {
      question: "Why is this useful for cooking?",
      answer: "Many international recipes use grams, while US recipes often use ounces. This converter helps you follow any recipe accurately.",
    },
  ],
  relatedSlugs: ["ounces-to-grams", "kg-to-lbs", "lbs-to-kg"],
};

export default def;
