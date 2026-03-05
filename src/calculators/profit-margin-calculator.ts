import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "profit-margin-calculator",
  title: "Profit Margin Calculator",
  shortTitle: "Profit Margin",
  description: "Calculate your gross profit margin and markup based on cost and revenue.",
  longDescription:
    "Evaluate the profitability of your products or services. By inputting your cost of goods sold and total sales revenue, the Profit Margin Calculator reveals your gross profit amount, your gross profit margin percentage, and the effective markup percentage applied.",
  category: "finance",
  keywords:["profit margin calculator", "gross margin", "profit calculator", "business margin", "gross profit"],
  inputs:[
    {
      type: "number",
      key: "cost",
      label: "Cost of Goods ($)",
      defaultValue: 60,
      min: 0,
      step: 1,
      placeholder: "60"
    },
    {
      type: "number",
      key: "revenue",
      label: "Sales Revenue / Selling Price ($)",
      defaultValue: 100,
      min: 0,
      step: 1,
      placeholder: "100"
    }
  ],

  compute(values: InputValues): ComputeResult {
    const cost = Number(values.cost);
    const revenue = Number(values.revenue);

    if (isNaN(cost) || isNaN(revenue) || cost < 0 || revenue < 0) {
      return {
        outputs:[
          { key: "error", label: "Result", value: "Please enter valid positive numbers.", format: "text", highlight: true },
        ],
      };
    }

    if (revenue === 0) {
      return {
        outputs:[
          { key: "error", label: "Result", value: "Revenue must be greater than zero.", format: "text", highlight: true },
        ],
      };
    }

    const grossProfit = revenue - cost;
    const profitMargin = (grossProfit / revenue) * 100;
    
    // Prevent division by zero if cost is absolutely free
    const markup = cost > 0 ? (grossProfit / cost) * 100 : 0;

    return {
      outputs:[
        { key: "profitMargin", label: "Gross Profit Margin", value: profitMargin.toFixed(2), format: "percentage", highlight: true },
        { key: "grossProfit", label: "Gross Profit", value: grossProfit.toFixed(2), format: "currency" },
        { key: "markup", label: "Effective Markup", value: cost > 0 ? markup.toFixed(2) : "Infinite", format: "percentage" }
      ],
    };
  },

  howItWorks:
    "We calculate your Gross Profit by subtracting the cost from your revenue. We then divide that Gross Profit by the total revenue and multiply by 100 to find your Gross Profit Margin. To find your Markup, we divide the Gross Profit by the item's cost instead.",

  examples:[
    {
      title: "Healthy Retail Item",
      description: "An item costs $60 to manufacture and sells for $100.",
      inputs: { cost: 60, revenue: 100 },
      result: "Generates a gross profit of $40, representing a 40% profit margin and a 66.67% markup."
    },
    {
      title: "High Margin Software",
      description: "A digital product costs $10 per unit in hosting/licensing but sells for $99.",
      inputs: { cost: 10, revenue: 99 },
      result: "Generates an $89 gross profit, showing an 89.90% margin and an 890% markup."
    }
  ],

  faqs:[
    {
      question: "What is a good profit margin?",
      answer: "A 'good' margin depends heavily on the industry. A grocery store might operate on thin 2-3% net margins, while a software company might have gross margins of 80% or higher. Generally, a 10% net profit margin is considered average across many industries."
    },
    {
      question: "Is gross profit margin the same as net profit margin?",
      answer: "No. Gross profit margin only considers the direct costs of goods sold (COGS). Net profit margin accounts for all other business expenses like rent, marketing, payroll, and taxes."
    },
    {
      question: "Why is margin always lower than markup?",
      answer: "Markup relates profit to a smaller number (the cost). Margin relates that exact same profit to a larger number (the total revenue). Therefore, the margin percentage will mathematically always be lower than the markup percentage."
    }
  ],

  relatedSlugs:[
    "markup-calculator",
    "percent-off-calculator",
    "commission-calculator"
  ]
};

export default def;