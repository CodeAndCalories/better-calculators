// filename: discount-percentage-calculator.ts
import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "discount-percentage-calculator",
  title: "Discount Percentage Calculator",
  description: "Find out exactly what percentage discount you received based on the original and sale prices.",
  longDescription: "When shopping, you might see a 'sale price' but no advertised percentage discount. This calculator instantly reveals the true discount percentage you are getting and tells you exactly how much cash you are saving.",
  category: "life",
  keywords:["discount percentage", "sale calculator", "percent off calculator", "price drop"],
  inputs:[
    { type: "number", key: "originalPrice", label: "Original Price ($)", defaultValue: 100, min: 0.01 },
    { type: "number", key: "salePrice", label: "Sale / Final Price ($)", defaultValue: 75, min: 0 }
  ],
  compute(values: InputValues): ComputeResult {
    const originalPrice = Number(values.originalPrice);
    const salePrice = Number(values.salePrice);

    if (isNaN(originalPrice) || isNaN(salePrice)) {
      return { outputs:[], error: "Please enter valid numeric values for both prices." };
    }
    if (originalPrice <= 0) {
      return { outputs:[], error: "Original price must be greater than zero." };
    }

    const amountSaved = originalPrice - salePrice;
    const discountPercent = (amountSaved / originalPrice) * 100;

    return {
      outputs:[
        { key: "discountPercent", label: "Effective Discount", value: Number(discountPercent.toFixed(2)), format: "percentage", highlight: true },
        { key: "amountSaved", label: "Amount Saved", value: Number(amountSaved.toFixed(2)), format: "currency" }
      ]
    };
  },
  howItWorks: "The tool calculates your savings by subtracting the sale price from the original price. It then divides that savings amount by the original price and multiplies by 100 to reveal the final discount percentage.",
  examples:[
    {
      title: "Clothing Sale",
      description: "A jacket originally priced at $120 is marked down to $90.",
      inputs: { originalPrice: 120, salePrice: 90 },
      result: "You save $30.00, which is exactly a 25% discount."
    },
    {
      title: "Car Negotiation",
      description: "A car has an MSRP of $25,000, but you negotiate the price down to $23,500.",
      inputs: { originalPrice: 25000, salePrice: 23500 },
      result: "You save $1,500.00, representing a 6% discount."
    },
    {
      title: "Markup Instead of Discount",
      description: "Buying concert tickets originally priced at $50 for a scalper's price of $80.",
      inputs: { originalPrice: 50, salePrice: 80 },
      result: "The savings is -$30.00, meaning you paid a -60% discount (which is a 60% markup)."
    }
  ],
  faqs:[
    { question: "How do I calculate the discount percentage manually?", answer: "Subtract the sale price from the original price to find the savings. Then, divide the savings by the original price and multiply by 100." },
    { question: "What happens if the sale price is higher than the original price?", answer: "The calculator will output a negative discount percentage and a negative amount saved, effectively indicating a markup or premium paid." },
    { question: "Is this the same as calculating profit margin?", answer: "No. Discount percentages are based on the original retail price, whereas profit margin is based on the cost of acquiring the goods." },
    { question: "Does this include sales tax?", answer: "No, this strictly calculates the discount off the sticker price before local taxes are applied." }
  ],
  relatedSlugs:["percent-off-calculator", "percentage-of-number-calculator"]
};

export default def;