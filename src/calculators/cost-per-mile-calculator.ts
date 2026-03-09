import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "cost-per-mile-calculator",
  title: "Cost Per Mile Calculator",
  shortTitle: "Cost Per Mile",
  description: "Calculate how much it costs to drive one mile.",
  longDescription: "Knowing your cost per mile helps with budgeting road trips, reimbursements, and comparing vehicle running costs. Enter your total driving costs and miles driven to get the cost per mile.",
  category: "finance",
  keywords: ["cost per mile", "driving cost", "vehicle cost calculator", "mileage cost"],
  inputs: [
    { type: "number", key: "totalCost", label: "Total Driving Cost ($)", defaultValue: 500, min: 0, step: 1, placeholder: "500" },
    { type: "number", key: "miles", label: "Miles Driven", defaultValue: 1000, min: 1, step: 1, placeholder: "1000" },
  ],
  compute(values: InputValues): ComputeResult {
    const totalCost = Number(values.totalCost);
    const miles = Number(values.miles);
    if (isNaN(totalCost) || isNaN(miles) || miles <= 0) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const costPerMile = totalCost / miles;
    return {
      outputs: [
        { key: "costPerMile", label: "Cost Per Mile ($)", value: Number(costPerMile.toFixed(4)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Divides total driving costs by the number of miles driven.",
  examples: [
    {
      title: "Monthly Car Cost",
      description: "$500 monthly costs, 1000 miles driven.",
      inputs: { totalCost: 500, miles: 1000 },
      result: "$0.50 per mile.",
    },
    {
      title: "IRS Rate Check",
      description: "$650 costs for 1500 miles.",
      inputs: { totalCost: 650, miles: 1500 },
      result: "Approximately $0.43 per mile.",
    },
  ],
  faqs: [
    { question: "What costs should I include?", answer: "Gas, insurance, maintenance, registration, and a portion of vehicle depreciation." },
    { question: "What is the IRS standard mileage rate?", answer: "The IRS updates this annually. In 2024 it was 67 cents per mile for business use." },
    { question: "Can I use this for reimbursements?", answer: "Yes — compare your actual cost per mile to your employer's reimbursement rate." },
  ],
  relatedSlugs: ["fuel-cost-calculator", "road-trip-cost-calculator"],
};

export default def;
