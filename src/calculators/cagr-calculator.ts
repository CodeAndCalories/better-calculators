// cagr-calculator.ts
import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "cagr-calculator",
  title: "CAGR Calculator",
  description: "Calculate the Compound Annual Growth Rate (CAGR) of an investment over time.",
  longDescription: "The Compound Annual Growth Rate (CAGR) measures the smoothed annualized return of an investment. Unlike simple ROI, CAGR factors in time, showing you the exact steady rate at which your money would have had to grow each year to reach its final value.",
  category: "finance",
  keywords:["cagr calculator", "compound annual growth rate", "annualized return", "investment growth", "annual return calculator"],
  inputs:[
    { type: "number", key: "beginningValue", label: "Beginning Value ($)", defaultValue: 10000, min: 1 },
    { type: "number", key: "endingValue", label: "Ending Value ($)", defaultValue: 15000, min: 1 },
    { type: "number", key: "years", label: "Duration (Years)", defaultValue: 5, min: 0.1 }
  ],
  compute(values: InputValues): ComputeResult {
    const beginningValue = Number(values.beginningValue);
    const endingValue = Number(values.endingValue);
    const years = Number(values.years);

    if (isNaN(beginningValue) || isNaN(endingValue) || isNaN(years)) {
      return { outputs:[{ key: "error", label: "Result", value: "Invalid input", format: "text" }] };
    }
    if (beginningValue <= 0 || endingValue < 0 || years <= 0) {
      return { outputs:[{ key: "error", label: "Result", value: "Values must be greater than zero.", format: "text" }] };
    }

    const cagr = (Math.pow(endingValue / beginningValue, 1 / years) - 1) * 100;
    const totalGrowth = ((endingValue - beginningValue) / beginningValue) * 100;

    return {
      outputs:[
        { key: "cagr", label: "Compound Annual Growth Rate", value: Number(cagr.toFixed(2)), format: "percentage" },
        { key: "totalGrowth", label: "Total Overall Growth (ROI)", value: Number(totalGrowth.toFixed(2)), format: "percentage" },
        { key: "profit", label: "Total Profit", value: Number((endingValue - beginningValue).toFixed(2)), format: "currency" }
      ]
    };
  },
  howItWorks: "CAGR is calculated by dividing the Ending Value by the Beginning Value, raising that result to the power of 1 divided by the number of years, and subtracting 1. The result is then multiplied by 100 to convert it to a percentage.",
  examples:[
    {
      title: "5-Year Portfolio Growth",
      description: "A retirement account grows from $50,000 to $75,000 over 5 years.",
      inputs: { beginningValue: 50000, endingValue: 75000, years: 5 },
      result: "Shows a CAGR of 8.45% and an overall ROI of 50.00%."
    },
    {
      title: "Short Term Investment",
      description: "An investment of $2,000 turns into $2,500 in just 1.5 years.",
      inputs: { beginningValue: 2000, endingValue: 2500, years: 1.5 },
      result: "Calculates an impressive annualized CAGR of 16.04%."
    },
    {
      title: "Investment Loss",
      description: "A stock portfolio drops from $10,000 to $8,000 over 3 years.",
      inputs: { beginningValue: 10000, endingValue: 8000, years: 3 },
      result: "Reflects a negative CAGR of -7.17%."
    }
  ],
  faqs:[
    { question: "What is the difference between CAGR and ROI?", answer: "ROI calculates total growth from start to finish. CAGR calculates the average annualized growth, making it easy to compare investments held for different lengths of time." },
    { question: "Does CAGR assume reinvested profits?", answer: "Yes, the CAGR formula assumes that any profits or dividends generated each year are reinvested to achieve the compounding effect." },
    { question: "What is the limitation of CAGR?", answer: "CAGR artificially smooths out returns. It hides volatility; an investment could have wildly swung up and down during the timeframe, but CAGR makes it look like a straight, steady line." },
    { question: "Can I use months instead of years?", answer: "Yes, but you must convert months to a decimal year. For example, 18 months would be entered as 1.5 years." }
  ],
  relatedSlugs:["roi-calculator", "apr-calculator", "break-even-calculator"]
};

export default def;