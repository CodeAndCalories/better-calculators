// break-even-calculator.ts
import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "break-even-calculator",
  title: "Break-Even Calculator",
  description: "Find out exactly how many units you need to sell to cover your business costs.",
  longDescription: "The Break-Even Point is the moment your business revenue exactly equals your total expenses—neither making a profit nor taking a loss. By analyzing fixed costs, variable costs, and your selling price, this calculator helps you set sales targets and price your products effectively.",
  category: "finance",
  keywords:["break even calculator", "break even point", "business profitability", "margin calculator", "sales target"],
  inputs:[
    { type: "number", key: "fixedCosts", label: "Total Fixed Costs ($)", defaultValue: 5000, min: 0 },
    { type: "number", key: "pricePerUnit", label: "Selling Price Per Unit ($)", defaultValue: 50, min: 0.01 },
    { type: "number", key: "variableCostPerUnit", label: "Variable Cost Per Unit ($)", defaultValue: 20, min: 0 }
  ],
  compute(values: InputValues): ComputeResult {
    const fixedCosts = Number(values.fixedCosts);
    const pricePerUnit = Number(values.pricePerUnit);
    const variableCostPerUnit = Number(values.variableCostPerUnit);

    if (isNaN(fixedCosts) || isNaN(pricePerUnit) || isNaN(variableCostPerUnit)) {
      return { outputs:[{ key: "error", label: "Result", value: "Invalid input", format: "text" }] };
    }
    if (pricePerUnit <= variableCostPerUnit) {
      return { outputs:[{ key: "error", label: "Result", value: "Price must be strictly greater than variable cost to break even.", format: "text" }] };
    }

    const contributionMarginPerUnit = pricePerUnit - variableCostPerUnit;
    const breakEvenUnits = Math.ceil(fixedCosts / contributionMarginPerUnit);
    const breakEvenRevenue = breakEvenUnits * pricePerUnit;
    const grossMargin = (contributionMarginPerUnit / pricePerUnit) * 100;

    return {
      outputs:[
        { key: "breakEvenUnits", label: "Units to Break Even", value: Number(breakEvenUnits), format: "number" },
        { key: "breakEvenRevenue", label: "Break-Even Revenue", value: Number(breakEvenRevenue.toFixed(2)), format: "currency" },
        { key: "contributionMargin", label: "Contribution Margin (Per Unit)", value: Number(contributionMarginPerUnit.toFixed(2)), format: "currency" },
        { key: "grossMargin", label: "Gross Margin Ratio", value: Number(grossMargin.toFixed(2)), format: "percentage" }
      ]
    };
  },
  howItWorks: "The tool subtracts the variable cost from the selling price to find your 'Contribution Margin'—the amount of money from each sale that goes toward paying off fixed costs. It then divides your total fixed costs by this margin to find the exact number of units you must sell to break even.",
  examples:[
    {
      title: "Selling T-Shirts",
      description: "Fixed costs of $1,000 (equipment), selling shirts for $20 each that cost $5 to make.",
      inputs: { fixedCosts: 1000, pricePerUnit: 20, variableCostPerUnit: 5 },
      result: "You need to sell 67 shirts to break even, generating $1,340 in revenue."
    },
    {
      title: "SaaS Software Subscription",
      description: "Monthly server costs of $5,000, selling a subscription for $99/mo with variable costs of $9/mo.",
      inputs: { fixedCosts: 5000, pricePerUnit: 99, variableCostPerUnit: 9 },
      result: "Requires 56 subscribers to break even, generating $5,544 in revenue."
    },
    {
      title: "Food Truck Item",
      description: "Permits and truck lease are $2,500. Selling burgers for $10 with food costs of $4 per burger.",
      inputs: { fixedCosts: 2500, pricePerUnit: 10, variableCostPerUnit: 4 },
      result: "Requires selling 417 burgers to break even."
    }
  ],
  faqs:[
    { question: "What are fixed costs?", answer: "Fixed costs are expenses that do not change based on how much you sell. Examples include rent, insurance, salaries, and software subscriptions." },
    { question: "What are variable costs?", answer: "Variable costs change directly with production volume. This includes raw materials, packaging, transaction fees, and shipping." },
    { question: "Why does the calculator say my price must be greater than my variable cost?", answer: "If it costs you $10 to make an item but you sell it for $8, you lose $2 on every sale. You will never break even or pay off your fixed costs; you will only lose more money." },
    { question: "Does this output partial units?", answer: "No, the calculator mathematically rounds up to the next whole number because you generally cannot sell a fraction of a unit." }
  ],
  relatedSlugs: ["net-income-calculator", "roi-calculator"]
};

export default def;