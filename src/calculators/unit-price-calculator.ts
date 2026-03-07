import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "unit-price-calculator",
  title: "Unit Price Calculator",
  shortTitle: "Unit Price",
  description: "Compare the unit price of two products to find the better value.",
  longDescription:
    "Enter the price and quantity of two products to instantly calculate and compare their unit prices. Works for any unit — grams, ml, kg, litres, count, oz, or anything else. Quickly identify which pack size or product offers the best value per unit.",
  category: "life",
  keywords: ["unit price calculator", "price per unit calculator", "best value calculator", "compare product prices", "cost per unit"],
  inputs: [
    {
      type: "number",
      key: "priceA",
      label: "Product A — Price ($)",
      defaultValue: 3.99,
      min: 0.01,
      step: 0.01,
      placeholder: "3.99",
    },
    {
      type: "number",
      key: "quantityA",
      label: "Product A — Quantity",
      defaultValue: 500,
      min: 0.001,
      step: 1,
      placeholder: "500",
      helpText: "e.g. grams, ml, oz, count — use the same unit for both products",
    },
    {
      type: "number",
      key: "priceB",
      label: "Product B — Price ($)",
      defaultValue: 6.49,
      min: 0.01,
      step: 0.01,
      placeholder: "6.49",
    },
    {
      type: "number",
      key: "quantityB",
      label: "Product B — Quantity",
      defaultValue: 900,
      min: 0.001,
      step: 1,
      placeholder: "900",
      helpText: "Must use the same unit as Product A",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const priceA = Number(values.priceA);
    const quantityA = Number(values.quantityA);
    const priceB = Number(values.priceB);
    const quantityB = Number(values.quantityB);

    if (
      !Number.isFinite(priceA) || !Number.isFinite(quantityA) ||
      !Number.isFinite(priceB) || !Number.isFinite(quantityB) ||
      priceA <= 0 || quantityA <= 0 || priceB <= 0 || quantityB <= 0
    ) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const unitPriceA = priceA / quantityA;
    const unitPriceB = priceB / quantityB;

    let betterValue: string;
    let savingsPct: number;

    if (unitPriceA < unitPriceB) {
      betterValue = "Product A is better value";
      savingsPct = ((unitPriceB - unitPriceA) / unitPriceB) * 100;
    } else if (unitPriceB < unitPriceA) {
      betterValue = "Product B is better value";
      savingsPct = ((unitPriceA - unitPriceB) / unitPriceA) * 100;
    } else {
      betterValue = "Both products have the same unit price";
      savingsPct = 0;
    }

    return {
      outputs: [
        { key: "betterValue", label: "Best Value", value: betterValue, format: "text", highlight: true },
        { key: "unitPriceA", label: "Product A — Price per Unit", value: Math.round(unitPriceA * 10000) / 10000, format: "number" },
        { key: "unitPriceB", label: "Product B — Price per Unit", value: Math.round(unitPriceB * 10000) / 10000, format: "number" },
        { key: "savingsPct", label: "Savings vs. Worse Option (%)", value: Math.round(savingsPct * 10) / 10, format: "number" },
      ],
    };
  },

  howItWorks: `Unit price = total price ÷ quantity. Compare unit prices directly to identify better value. Savings percentage = (higher unit price − lower unit price) ÷ higher unit price × 100. Both products must use the same unit for a valid comparison.`,

  examples: [
    {
      title: "$3.99 for 500g vs $6.49 for 900g",
      description: "Comparing two pack sizes of the same product.",
      inputs: { priceA: 3.99, quantityA: 500, priceB: 6.49, quantityB: 900 },
      result: "Product B is better value — lower cost per gram.",
    },
    {
      title: "$1.20 for 12 items vs $1.89 for 20 items",
      description: "Comparing multipacks.",
      inputs: { priceA: 1.20, quantityA: 12, priceB: 1.89, quantityB: 20 },
      result: "Product B is better value — lower cost per item.",
    },
  ],

  faqs: [
    {
      question: "What units can I use?",
      answer: "Any unit — grams, ml, oz, litres, count, sheets, metres. The only requirement is that both products use the same unit so the comparison is valid.",
    },
    {
      question: "Why does the unit price show four decimal places?",
      answer: "For small quantities (like cost per gram or per ml), four decimal places are needed to show a meaningful difference between similar products.",
    },
  ],

  relatedSlugs: ["savings-rate-calculator", "compound-interest-calculator"],
};

export default def;
