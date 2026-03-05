import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "discount-calculator",
  title: "Discount Calculator",
  shortTitle: "Discount",
  description: "Calculate the final price after a percentage discount, the amount saved, and the discount percentage.",
  longDescription: "Quickly find out how much you save and what you'll actually pay after a discount. Works for sales, coupons, and bulk pricing.",
  category: "life",
  keywords: ["discount calculator", "sale price calculator", "percent off calculator", "how much do I save"],
  inputs: [
    { type: "number", key: "originalPrice", label: "Original Price", prefix: "$", defaultValue: 120, min: 0.01, step: 1, placeholder: "120" },
    { type: "number", key: "discountPct", label: "Discount Percentage", suffix: "%", defaultValue: 25, min: 0, max: 100, step: 0.5, placeholder: "25" },
    { type: "number", key: "taxRate", label: "Sales Tax Rate", suffix: "%", defaultValue: 0, min: 0, max: 30, step: 0.1, placeholder: "0", helpText: "Optional — enter 0 to exclude" },
  ],
  compute(values: InputValues): ComputeResult {
    const original = Number(values.originalPrice);
    const discount = Number(values.discountPct);
    const tax = Number(values.taxRate) || 0;

    if (discount > 100) return { outputs: [], error: "Discount cannot exceed 100%." };

    const savings = original * (discount / 100);
    const salePrice = original - savings;
    const taxAmount = salePrice * (tax / 100);
    const finalPrice = salePrice + taxAmount;

    return {
      outputs: [
        { key: "finalPrice", label: "Final Price (after tax)", value: finalPrice, format: "currency", highlight: true },
        { key: "salePrice", label: "Sale Price (before tax)", value: salePrice, format: "currency" },
        { key: "savings", label: "You Save", value: savings, format: "currency" },
        { key: "savingsPct", label: "Discount Amount", value: discount, format: "percentage" },
      ],
    };
  },
  howItWorks: `Sale Price = Original Price × (1 - Discount% / 100). Savings = Original Price - Sale Price. If a tax rate is included: Final Price = Sale Price × (1 + Tax Rate / 100).`,
  examples: [
    {
      title: "$120 item at 25% off",
      description: "A common retail sale scenario.",
      inputs: { originalPrice: 120, discountPct: 25, taxRate: 0 },
      result: "Sale price of $90, saving $30.",
    },
    {
      title: "$299 electronics with 20% off and 8% sales tax",
      description: "Combining a discount with local sales tax.",
      inputs: { originalPrice: 299, discountPct: 20, taxRate: 8 },
      result: "Final price of $258.34 after discount and tax.",
    },
  ],
  faqs: [
    { question: "How do I calculate 30% off?", answer: "Multiply the original price by 0.30 to find the discount amount, then subtract from the original price. Or multiply by 0.70 to get the sale price directly." },
    { question: "Is a bigger discount always better?", answer: "Always compare the final price to alternatives. A 50% off inflated item may cost more than a non-discounted competitor at a lower regular price." },
  ],
  relatedSlugs: ["percentage-calculator", "tip-calculator", "simple-interest-calculator"],
};

export default def;
