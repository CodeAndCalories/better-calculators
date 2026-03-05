import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "margin-calculator",
  title: "Margin Calculator",
  shortTitle: "Margin Calculator",
  description:
    "Calculate profit margin based on revenue and cost.",
  longDescription:
    "The margin calculator helps businesses and individuals quickly determine profit margin as a percentage of revenue. Enter your revenue and cost to instantly see gross profit margin, gross profit in dollars, and the cost-to-revenue ratio. Essential for pricing decisions, financial analysis, and evaluating business profitability.",
  category: "finance",
  keywords: [
    "margin calculator",
    "profit margin calculator",
    "gross margin formula",
    "calculate profit margin percentage",
    "revenue and cost calculator",
  ],
  inputs: [
    {
      type: "number",
      key: "revenue",
      label: "Revenue ($)",
      defaultValue: 1000,
      min: 0,
      step: 0.01,
      placeholder: "1000",
      helpText: "Total selling price or income",
    },
    {
      type: "number",
      key: "cost",
      label: "Cost ($)",
      defaultValue: 600,
      min: 0,
      step: 0.01,
      placeholder: "600",
      helpText: "Total cost of goods or services",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const revenue = Number(values.revenue);
    const cost = Number(values.cost);

    if (isNaN(revenue) || isNaN(cost)) {
      return { outputs: [], error: "Please enter valid numbers for revenue and cost." };
    }
    if (revenue <= 0) {
      return { outputs: [], error: "Revenue must be greater than zero." };
    }
    if (cost < 0) {
      return { outputs: [], error: "Cost cannot be negative." };
    }
    if (cost > revenue) {
      return { outputs: [], error: "Cost exceeds revenue — this results in a negative margin." };
    }

    const grossProfit = revenue - cost;
    const marginPercent = (grossProfit / revenue) * 100;
    const costRatio = (cost / revenue) * 100;

    return {
      outputs: [
        {
          key: "marginPercent",
          label: "Profit Margin",
          value: Number(marginPercent.toFixed(2)),
          format: "number",
          suffix: "%",
          highlight: true,
        },
        {
          key: "grossProfit",
          label: "Gross Profit",
          value: Number(grossProfit.toFixed(2)),
          format: "number",
          prefix: "$",
          helpText: "Revenue − Cost",
        },
        {
          key: "costRatio",
          label: "Cost Ratio",
          value: Number(costRatio.toFixed(2)),
          format: "number",
          suffix: "%",
          helpText: "Cost as a percentage of revenue",
        },
      ],
    };
  },

  howItWorks: `Profit margin is calculated as: (Revenue − Cost) / Revenue × 100. First, gross profit is found by subtracting cost from revenue. That profit is then expressed as a percentage of revenue — not cost. This is what distinguishes margin from markup. A 40% margin means 40 cents of every dollar earned is profit.`,

  examples: [
    {
      title: "Product selling for $1,000 with $600 cost",
      description: "A typical retail or wholesale scenario.",
      inputs: { revenue: 1000, cost: 600 },
      result: "40% profit margin, $400 gross profit.",
    },
    {
      title: "Service priced at $250 with $80 cost",
      description: "A service business with low direct costs.",
      inputs: { revenue: 250, cost: 80 },
      result: "68% profit margin, $170 gross profit.",
    },
  ],

  faqs: [
    {
      question: "What is a good profit margin?",
      answer:
        "It depends heavily on the industry. Retail businesses often operate at 5–20% net margins. Software and SaaS companies can see 60–80% gross margins. Service businesses typically fall between 30–60%. As a general rule, a gross margin above 50% is considered strong for most businesses.",
    },
    {
      question: "What is the difference between margin and markup?",
      answer:
        "Margin is profit expressed as a percentage of revenue. Markup is profit expressed as a percentage of cost. For the same transaction, markup will always be a higher percentage than margin. Example: buy for $60, sell for $100 — that's a 40% margin but a 66.7% markup.",
    },
    {
      question: "How do I use margin to set a selling price?",
      answer:
        "If you know your cost and target margin, use: Selling Price = Cost / (1 − Margin). For example, to achieve a 40% margin on a $60 cost: $60 / (1 − 0.40) = $100. This is different from applying a markup, which would give $60 × 1.40 = $84.",
    },
  ],

  relatedSlugs: [
    "markup-calculator",
    "percentage-difference-calculator",
    "percentage-change-calculator",
  ],
};

export default def;
