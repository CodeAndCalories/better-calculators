import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "dividend-yield-calculator",
  title: "Dividend Yield Calculator",
  shortTitle: "Dividend Yield",
  description: "Calculate the dividend yield of a stock.",
  longDescription: "Dividend yield tells you how much a company pays out in dividends relative to its stock price. Enter the annual dividend per share and the current stock price to calculate the yield percentage.",
  category: "finance",
  keywords: ["dividend yield", "stock dividend", "annual dividend", "dividend percentage"],
  inputs: [
    { type: "number", key: "annualDividend", label: "Annual Dividend per Share ($)", defaultValue: 2, min: 0, step: 0.01, placeholder: "2" },
    { type: "number", key: "stockPrice", label: "Current Stock Price ($)", defaultValue: 50, min: 0.01, step: 0.01, placeholder: "50" },
  ],
  compute(values: InputValues): ComputeResult {
    const annualDividend = Number(values.annualDividend);
    const stockPrice = Number(values.stockPrice);
    if (isNaN(annualDividend) || isNaN(stockPrice) || stockPrice <= 0) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const yield_ = (annualDividend / stockPrice) * 100;
    return {
      outputs: [
        { key: "dividendYield", label: "Dividend Yield (%)", value: Number(yield_.toFixed(2)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Divides the annual dividend per share by the current stock price, then multiplies by 100 to get a percentage.",
  examples: [
    {
      title: "Mid-Yield Stock",
      description: "$2 annual dividend, $50 stock price.",
      inputs: { annualDividend: 2, stockPrice: 50 },
      result: "Dividend yield: 4%.",
    },
    {
      title: "High-Yield Stock",
      description: "$5 annual dividend, $40 stock price.",
      inputs: { annualDividend: 5, stockPrice: 40 },
      result: "Dividend yield: 12.5%.",
    },
  ],
  faqs: [
    { question: "What is a good dividend yield?", answer: "Typically 2–5% is considered solid. Above 6–7% may signal risk; below 1% offers little income." },
    { question: "Is a higher yield always better?", answer: "Not necessarily. A very high yield can indicate a falling stock price or an unsustainable payout." },
    { question: "How do I find the annual dividend?", answer: "Check the company investor relations page or financial data sites. Multiply quarterly dividends by 4 for the annual figure." },
  ],
  relatedSlugs: ["roi-calculator", "savings-interest-calculator"],
};

export default def;
