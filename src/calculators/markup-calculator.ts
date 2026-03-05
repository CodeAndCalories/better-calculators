import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "markup-calculator",
  title: "Markup Calculator",
  shortTitle: "Markup Calculator",
  description:
    "Calculate markup percentage based on cost and selling price.",
  longDescription:
    "The markup calculator determines how much you've marked up a product or service above its cost, expressed as a percentage of cost. Whether you're a retailer setting prices, a contractor quoting jobs, or a wholesaler managing margins, understanding your markup is essential for sustainable pricing.",
  category: "finance",
  keywords: [
    "markup calculator",
    "markup percentage calculator",
    "cost and selling price calculator",
    "how to calculate markup",
    "markup vs margin",
  ],
  inputs: [
    {
      type: "number",
      key: "cost",
      label: "Cost ($)",
      defaultValue: 60,
      min: 0,
      step: 0.01,
      placeholder: "60",
      helpText: "What you paid or spent to produce the item",
    },
    {
      type: "number",
      key: "sellingPrice",
      label: "Selling Price ($)",
      defaultValue: 100,
      min: 0,
      step: 0.01,
      placeholder: "100",
      helpText: "What you charge the customer",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const cost = Number(values.cost);
    const sellingPrice = Number(values.sellingPrice);

    if (isNaN(cost) || isNaN(sellingPrice)) {
      return { outputs: [], error: "Please enter valid numbers for cost and selling price." };
    }
    if (cost <= 0) {
      return { outputs: [], error: "Cost must be greater than zero." };
    }
    if (sellingPrice <= 0) {
      return { outputs: [], error: "Selling price must be greater than zero." };
    }

    const profit = sellingPrice - cost;
    const markupPercent = (profit / cost) * 100;
    const marginPercent = (profit / sellingPrice) * 100;

    return {
      outputs: [
        {
          key: "markupPercent",
          label: "Markup Percentage",
          value: Number(markupPercent.toFixed(2)),
          format: "number",
          suffix: "%",
          highlight: true,
        },
        {
          key: "profit",
          label: "Profit",
          value: Number(profit.toFixed(2)),
          format: "number",
          prefix: "$",
          helpText: "Selling Price − Cost",
        },
        {
          key: "marginPercent",
          label: "Profit Margin",
          value: Number(marginPercent.toFixed(2)),
          format: "number",
          suffix: "%",
          helpText: "Profit as a percentage of selling price",
        },
      ],
    };
  },

  howItWorks: `Markup percentage is calculated as: (Selling Price − Cost) / Cost × 100. The profit (selling price minus cost) is divided by the cost — not the selling price. This tells you how much you've added on top of your cost. For comparison, the calculator also shows profit margin, which divides the same profit by the selling price instead.`,

  examples: [
    {
      title: "Buy for $60, sell for $100",
      description: "A standard retail pricing scenario.",
      inputs: { cost: 60, sellingPrice: 100 },
      result: "66.67% markup, $40 profit, 40% margin.",
    },
    {
      title: "Contractor cost $200, invoice $350",
      description: "A service job quoted above cost of labor and materials.",
      inputs: { cost: 200, sellingPrice: 350 },
      result: "75% markup, $150 profit, 42.86% margin.",
    },
  ],

  faqs: [
    {
      question: "What is the difference between markup and margin?",
      answer:
        "Markup is profit as a percentage of cost. Margin is profit as a percentage of selling price. For the same numbers, markup will always be higher. Example: cost $60, sell $100 — markup is 66.7% but margin is 40%. Confusing the two is a common and costly pricing mistake.",
    },
    {
      question: "How do I find the selling price from a desired markup?",
      answer:
        "Multiply cost by (1 + markup as a decimal). For a 50% markup on a $60 cost: $60 × 1.50 = $90 selling price. This is different from working backward from a desired margin, which requires dividing by (1 − margin).",
    },
    {
      question: "What markup percentage is typical?",
      answer:
        "Markup varies widely by industry. Grocery retail often uses 10–25%. Clothing retail can be 100–300%. Restaurants typically mark up food costs by 300% or more. Software and digital products may have near-infinite markup since cost is near zero. The right markup depends on your overhead, competition, and desired profit margin.",
    },
  ],

  relatedSlugs: [
    "margin-calculator",
    "percentage-difference-calculator",
    "discount-calculator",
  ],
};

export default def;
