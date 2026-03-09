import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "cat-age-calculator",
  title: "Cat Age Calculator",
  shortTitle: "Cat Age",
  description: "Convert your cat's age to the equivalent human age.",
  longDescription: "Cats age rapidly in their first two years, then more slowly. The first year equals about 15 human years, the second about 9 more, and each year after counts as roughly 4 human years.",
  category: "life",
  keywords: ["cat age calculator", "cat years to human years", "how old is my cat", "cat human age"],
  inputs: [
    { type: "number", key: "catYears", label: "Cat's Age (years)", defaultValue: 5, min: 0, max: 30, step: 0.5, placeholder: "5" },
  ],
  compute(values: InputValues): ComputeResult {
    const catYears = Number(values.catYears);
    if (isNaN(catYears) || catYears < 0) {
      return { outputs: [], error: "Please enter a valid age." };
    }
    let humanAge = 0;
    if (catYears <= 0) {
      humanAge = 0;
    } else if (catYears <= 1) {
      humanAge = catYears * 15;
    } else if (catYears <= 2) {
      humanAge = 15 + (catYears - 1) * 9;
    } else {
      humanAge = 24 + (catYears - 2) * 4;
    }
    return {
      outputs: [
        { key: "humanAge", label: "Equivalent Human Age (years)", value: Number(humanAge.toFixed(0)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Year 1 = 15 human years; Year 2 = 9 more (total 24); each subsequent year = 4 human years. Based on AAHA Feline Life Stage Guidelines.",
  examples: [
    {
      title: "Young Adult Cat",
      description: "A 3-year-old cat.",
      inputs: { catYears: 3 },
      result: "Equivalent to approximately 28 human years.",
    },
    {
      title: "Senior Cat",
      description: "A 12-year-old cat.",
      inputs: { catYears: 12 },
      result: "Equivalent to approximately 64 human years.",
    },
  ],
  faqs: [
    { question: "Why do cats age so fast in year 1?", answer: "Cats reach sexual maturity, full size, and adult cognition within their first year — equivalent to a human teenager." },
    { question: "What is a senior cat?", answer: "Cats are generally considered senior at 11 years, and geriatric at 15 years (equivalent to about 76 human years)." },
    { question: "Do indoor vs outdoor cats age differently?", answer: "Biologically the same, but outdoor cats have shorter average lifespans due to environmental hazards." },
  ],
  relatedSlugs: ["dog-age-calculator", "age"],
};

export default def;
