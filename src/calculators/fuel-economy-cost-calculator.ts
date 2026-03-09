import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "fuel-economy-cost-calculator",
  title: "Fuel Economy Cost Calculator",
  shortTitle: "Fuel Economy Cost",
  description: "Calculate how much fuel costs you per mile or per month.",
  longDescription: "Understanding your true fuel cost per mile helps you budget accurately and compare vehicles. Enter your MPG, gas price, and monthly mileage to see your per-mile cost and monthly fuel bill.",
  category: "finance",
  keywords: ["fuel economy cost", "gas cost per mile", "monthly fuel cost", "fuel budget calculator"],
  inputs: [
    { type: "number", key: "mpg", label: "Fuel Efficiency (MPG)", defaultValue: 28, min: 1, step: 1, placeholder: "28" },
    { type: "number", key: "gasPrice", label: "Gas Price ($/gallon)", defaultValue: 3.5, min: 0.01, step: 0.01, placeholder: "3.50" },
    { type: "number", key: "monthlyMiles", label: "Monthly Miles Driven", defaultValue: 1000, min: 0, step: 50, placeholder: "1000" },
  ],
  compute(values: InputValues): ComputeResult {
    const mpg = Number(values.mpg);
    const gasPrice = Number(values.gasPrice);
    const monthlyMiles = Number(values.monthlyMiles);
    if ([mpg, gasPrice, monthlyMiles].some(isNaN) || mpg <= 0) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const costPerMile = gasPrice / mpg;
    const monthlyCost = costPerMile * monthlyMiles;
    const annualCost = monthlyCost * 12;
    return {
      outputs: [
        { key: "costPerMile", label: "Cost Per Mile ($)", value: Number(costPerMile.toFixed(4)), format: "number", highlight: true },
        { key: "monthlyCost", label: "Monthly Fuel Cost ($)", value: Number(monthlyCost.toFixed(2)), format: "number" },
        { key: "annualCost", label: "Annual Fuel Cost ($)", value: Number(annualCost.toFixed(2)), format: "number" },
      ],
    };
  },
  howItWorks: "Divides the gas price by MPG to get cost per mile, then multiplies by monthly mileage for your monthly and annual fuel cost.",
  examples: [
    {
      title: "Average Commuter",
      description: "28 MPG, $3.50/gallon, 1000 miles/month.",
      inputs: { mpg: 28, gasPrice: 3.5, monthlyMiles: 1000 },
      result: "$0.125/mile, $125/month, $1,500/year.",
    },
    {
      title: "Fuel-Efficient Hybrid",
      description: "50 MPG, $3.50/gallon, 1200 miles/month.",
      inputs: { mpg: 50, gasPrice: 3.5, monthlyMiles: 1200 },
      result: "$0.07/mile, $84/month, $1,008/year.",
    },
  ],
  faqs: [
    { question: "What is the average American's monthly fuel cost?", answer: "Around $150–$250 per month depending on vehicle efficiency, local gas prices, and mileage driven." },
    { question: "How do I lower my fuel cost?", answer: "Improve MPG by maintaining tire pressure, reducing highway speeds, and avoiding hard acceleration. Drive fewer miles or switch to a more efficient vehicle." },
    { question: "Can I use this to compare two cars?", answer: "Yes — run the calculator with each vehicle's MPG to see the annual fuel cost difference." },
  ],
  relatedSlugs: ["fuel-cost-calculator", "road-trip-cost-calculator", "gas-mileage-calculator"],
};

export default def;
