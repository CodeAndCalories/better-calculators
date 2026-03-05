// sales-tax-calculator.ts
import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "sales-tax-calculator",
  title: "Sales Tax Calculator",
  description: "Quickly determine the tax amount and total price of a purchase.",
  longDescription: "Avoid surprises at the checkout counter. The Sales Tax Calculator lets you enter a pre-tax price and a local tax rate to instantly find the exact tax amount owed and the final price you'll pay out of pocket.",
  category: "finance",
  keywords:["sales tax calculator", "tax calculator", "total price calculator", "checkout tax", "tax amount"],
  inputs:[
    { type: "number", key: "priceBeforeTax", label: "Price Before Tax ($)", defaultValue: 100, min: 0 },
    { type: "number", key: "salesTaxRate", label: "Sales Tax Rate (%)", defaultValue: 7.25, min: 0 }
  ],
  compute(values: InputValues): ComputeResult {
    const priceBeforeTax = Number(values.priceBeforeTax);
    const salesTaxRate = Number(values.salesTaxRate);

    if (isNaN(priceBeforeTax) || isNaN(salesTaxRate)) {
      return { outputs:[{ key: "error", label: "Result", value: "Invalid input", format: "text" }] };
    }
    if (priceBeforeTax < 0 || salesTaxRate < 0) {
      return { outputs:[{ key: "error", label: "Result", value: "Price and tax rate must be positive numbers.", format: "text" }] };
    }

    const taxAmount = priceBeforeTax * (salesTaxRate / 100);
    const totalPrice = priceBeforeTax + taxAmount;

    return {
      outputs:[
        { key: "totalPrice", label: "Total Final Price", value: Number(totalPrice.toFixed(2)), format: "currency" },
        { key: "taxAmount", label: "Tax Amount Owed", value: Number(taxAmount.toFixed(2)), format: "currency" },
        { key: "priceBeforeTax", label: "Original Price", value: Number(priceBeforeTax.toFixed(2)), format: "currency" }
      ]
    };
  },
  howItWorks: "The calculator converts your sales tax percentage into a decimal by dividing it by 100. It multiplies this decimal by the pre-tax price to find the tax amount, and adds that amount back to the original price for the total.",
  examples:[
    {
      title: "Electronics Purchase",
      description: "Buying a $1,200 laptop in a state with an 8.5% sales tax rate.",
      inputs: { priceBeforeTax: 1200, salesTaxRate: 8.5 },
      result: "Shows a $102 tax charge for a total price of $1,302.00."
    },
    {
      title: "Restaurant Bill",
      description: "A $45 meal subject to a 6% local tax.",
      inputs: { priceBeforeTax: 45, salesTaxRate: 6 },
      result: "Shows $2.70 in tax, bringing the total to $47.70."
    },
    {
      title: "Vehicle Purchase",
      description: "A $25,000 car with a 4.25% state sales tax.",
      inputs: { priceBeforeTax: 25000, salesTaxRate: 4.25 },
      result: "Calculates a tax of $1,062.50 for a total price of $26,062.50."
    }
  ],
  faqs:[
    { question: "How is sales tax calculated?", answer: "Multiply the price of the item by the tax rate percentage (converted to a decimal)." },
    { question: "Do all states have sales tax?", answer: "No. In the US, states like Delaware, Montana, New Hampshire, and Oregon do not have a statewide sales tax." },
    { question: "Is sales tax applied before or after discounts?", answer: "Usually, sales tax is calculated on the price AFTER store discounts have been applied. However, manufacturer coupons are sometimes taxed on the original price." },
    { question: "How do I calculate price backwards from the total?", answer: "Divide the total price by 1 plus the tax rate decimal. E.g., for a $105 total with 5% tax: $105 / 1.05 = $100 original price." }
  ],
  relatedSlugs: ["net-income-calculator"]
};

export default def;