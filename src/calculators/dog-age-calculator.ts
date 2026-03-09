import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "dog-age-calculator",
  title: "Dog Age Calculator",
  shortTitle: "Dog Age",
  description: "Convert your dog's age to the equivalent human age.",
  longDescription: "The old '1 dog year = 7 human years' rule is a simplification. A 2021 study suggests a more accurate formula based on DNA methylation patterns. This calculator uses a commonly accepted method that accounts for dogs aging faster when young.",
  category: "life",
  keywords: ["dog age calculator", "dog years to human years", "how old is my dog", "dog human age"],
  inputs: [
    { type: "number", key: "dogYears", label: "Dog's Age (years)", defaultValue: 5, min: 0, max: 25, step: 0.5, placeholder: "5" },
  ],
  compute(values: InputValues): ComputeResult {
    const dogYears = Number(values.dogYears);
    if (isNaN(dogYears) || dogYears < 0) {
      return { outputs: [], error: "Please enter a valid age." };
    }
    // Formula: 16 * ln(dogAge) + 31  (based on 2020 Cell Systems study)
    const humanAge = dogYears <= 0 ? 0 : Math.round(16 * Math.log(dogYears) + 31);
    return {
      outputs: [
        { key: "humanAge", label: "Equivalent Human Age (years)", value: humanAge, format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Uses the formula: Human Age = 16 × ln(dog age) + 31, based on a 2020 Cell Systems study of DNA methylation patterns across dog and human lifespans.",
  examples: [
    {
      title: "Young Adult Dog",
      description: "A 3-year-old dog.",
      inputs: { dogYears: 3 },
      result: "Equivalent to approximately 49 human years.",
    },
    {
      title: "Senior Dog",
      description: "A 10-year-old dog.",
      inputs: { dogYears: 10 },
      result: "Equivalent to approximately 68 human years.",
    },
  ],
  faqs: [
    { question: "Is the 7-year rule accurate?", answer: "No. Dogs mature much faster early in life and more slowly later. The logarithmic formula is more accurate." },
    { question: "Does dog size affect aging?", answer: "Yes — larger breeds age faster and have shorter lifespans. This calculator uses an average formula." },
    { question: "Why does a 1-year-old dog equal ~31 human years?", answer: "A 1-year-old dog is sexually mature and physically adult — more comparable to a young adult human than a child." },
  ],
  relatedSlugs: ["cat-age-calculator", "age"],
};

export default def;
