import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "percent-off-calculator",
  title: "Percent Off Calculator",
  shortTitle: "Percent Off",
  description: "Find out exactly how much you'll pay and save after applying a percentage discount.",
  longDescription:
    "Whether you're shopping a major holiday sale, calculating wholesale vendor discounts, or just trying to figure out a coupon's value, the Percent Off Calculator helps you instantly find the final price and your total savings.",
  category: "finance",
  keywords:["percent off calculator", "discount calculator", "sale price", "coupon calculator", "price reduction"],
  inputs:[
    {
      type: "number",
      key: "originalPrice",
      label: "Original Price",
      defaultValue: 100,
      min: 0,
      step: 1,
      placeholder: "100"
    },
    {
      type: "number",
      key: "discountPercent",
      label: "Discount Percentage (%)",
      defaultValue: 20,
      min: 0,
      max: 100,
      step: 1,
      placeholder: "20"
    }
  ],

  compute(values: InputValues): ComputeResult {
    const originalPrice = Number(values.originalPrice);
    const discountPercent = Number(values.discountPercent);

    if (isNaN(originalPrice) || isNaN(discountPercent)) {
      return {
        outputs:[
          { key: "error", label: "Result", value: "Please enter valid numeric inputs.", format: "text", highlight: true },
        ],
      };
    }

    if (originalPrice < 0 || discountPercent < 0) {
      return {
        outputs:[
          { key: "error", label: "Result", value: "Values cannot be negative.", format: "text", highlight: true },
        ],
      };
    }

    const amountSaved = originalPrice * (discountPercent / 100);
    const finalPrice = originalPrice - amountSaved;

    return {
      outputs:[
        { key: "finalPrice", label: "Final Sale Price", value: finalPrice.toFixed(2), format: "currency", highlight: true },
        { key: "amountSaved", label: "Amount Saved", value: amountSaved.toFixed(2), format: "currency" }
      ],
    };
  },

  howItWorks:
    "The tool divides the discount percentage by 100 to get a decimal, then multiplies that by the original price to find the exact dollar amount of your savings. Finally, it subtracts the savings from the original price to reveal the final cost.",

  examples:[
    {
      title: "Black Friday TV Sale",
      description: "A television originally priced at $800 is marked 25% off.",
      inputs: { originalPrice: 800, discountPercent: 25 },
      result: "Shows a final price of $600 with $200 in total savings."
    },
    {
      title: "Clothing Clearance",
      description: "A jacket priced at $120 has a 40% discount coupon.",
      inputs: { originalPrice: 120, discountPercent: 40 },
      result: "Calculates a final sale price of $72 and saves you $48."
    }
  ],

  faqs:[
    {
      question: "How do I calculate a percent off manually?",
      answer: "Divide the percent by 100, multiply it by the original price, and subtract that amount from the original price."
    },
    {
      question: "Does this include sales tax?",
      answer: "No, this calculator only finds the discounted price. Sales tax is typically applied to the final sale price after discounts are deducted."
    },
    {
      question: "What if there's an 'extra 10% off' the sale price?",
      answer: "Calculate the first discount to get the new sale price. Then, run that new price through the calculator again using the extra discount percentage. You cannot simply add the two percentages together."
    }
  ],

  relatedSlugs: [
    "markup-calculator",
    "profit-margin-calculator"
  ]
};

export default def;