import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "cost-per-use-calculator",
  title: "Cost Per Use Calculator",
  shortTitle: "Cost Per Use",
  description: "Find out how much an item actually costs per use.",
  longDescription: "Knowing the cost per use helps you make smarter purchasing decisions. A $300 jacket worn 150 times costs $2 per use — far less than a $30 shirt worn once. Enter the item cost and how many times you'll use it.",
  category: "finance",
  keywords: ["cost per use", "price per use", "value calculator", "smart shopping"],
  inputs: [
    { type: "number", key: "itemCost", label: "Item Cost ($)", defaultValue: 200, min: 0, step: 1, placeholder: "200" },
    { type: "number", key: "uses", label: "Number of Uses", defaultValue: 100, min: 1, step: 1, placeholder: "100" },
  ],
  compute(values: InputValues): ComputeResult {
    const itemCost = Number(values.itemCost);
    const uses = Number(values.uses);
    if (isNaN(itemCost) || isNaN(uses) || uses <= 0) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const costPerUse = itemCost / uses;
    return {
      outputs: [
        { key: "costPerUse", label: "Cost Per Use ($)", value: Number(costPerUse.toFixed(4)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Divides the total item cost by the number of times you expect to use it.",
  examples: [
    {
      title: "Quality Jacket",
      description: "$300 jacket worn 200 times.",
      inputs: { itemCost: 300, uses: 200 },
      result: "$1.50 per use.",
    },
    {
      title: "Gym Equipment",
      description: "$500 treadmill used 500 times.",
      inputs: { itemCost: 500, uses: 500 },
      result: "$1.00 per use.",
    },
  ],
  faqs: [
    { question: "What is a good cost per use?", answer: "Under $1–$2 per use generally indicates good value for most purchases." },
    { question: "Can I compare two items?", answer: "Yes — calculate cost per use for each and compare. The lower number is typically the better value." },
    { question: "Should I include maintenance costs?", answer: "For greater accuracy, add estimated maintenance or consumable costs to the item cost before dividing." },
  ],
  relatedSlugs: ["unit-price-calculator", "discount-percentage-calculator"],
};

export default def;
