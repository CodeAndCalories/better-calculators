import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "crypto-tax-calculator",
  title: "Crypto Tax Calculator",
  shortTitle: "Crypto Tax",
  description: "Estimate capital gains tax owed on your cryptocurrency profits.",
  longDescription:
    "In most countries, selling cryptocurrency triggers a capital gains tax event. This calculator estimates your tax liability based on your profit, holding period (short vs long-term), and income tax rate. Always consult a tax professional for your specific situation.",
  category: "finance",
  keywords: ["crypto tax calculator", "bitcoin tax", "capital gains crypto", "cryptocurrency tax", "crypto CGT"],
  inputs: [
    { type: "number", key: "profit", label: "Taxable Crypto Profit ($)", defaultValue: 10000, min: 0, step: 100, placeholder: "10000" },
    { type: "number", key: "taxRate", label: "Your Tax Rate (%)", defaultValue: 20, min: 0, max: 60, step: 1, placeholder: "20" },
    { type: "toggle", key: "longTerm", label: "Held Longer than 1 Year (Long-Term)?", defaultValue: true },
  ],
  compute(values: InputValues): ComputeResult {
    const profit = Number(values.profit);
    const taxRate = Number(values.taxRate) / 100;
    const longTerm = Boolean(values.longTerm);
    if ([profit, taxRate].some(isNaN) || profit < 0) {
      return { outputs: [], error: "Please enter valid values." };
    }
    // US long-term rates cap at 20%, short-term = ordinary income rate
    const effectiveRate = longTerm ? Math.min(taxRate, 0.20) : taxRate;
    const taxOwed = profit * effectiveRate;
    const afterTaxProfit = profit - taxOwed;
    return {
      outputs: [
        { key: "taxOwed", label: "Estimated Tax Owed ($)", value: Number(taxOwed.toFixed(2)), format: "number", highlight: true },
        { key: "afterTaxProfit", label: "After-Tax Profit ($)", value: Number(afterTaxProfit.toFixed(2)), format: "number" },
        { key: "effectiveRate", label: "Effective Tax Rate (%)", value: Number((effectiveRate * 100).toFixed(1)), format: "number" },
      ],
    };
  },
  howItWorks:
    "Multiplies your taxable profit by your applicable tax rate. For US long-term gains, the rate is capped at 20%. Short-term gains are taxed as ordinary income.",
  examples: [
    {
      title: "Long-Term BTC Gain",
      description: "$10,000 profit after 18 months, 22% income tax rate.",
      inputs: { profit: 10000, taxRate: 22, longTerm: true },
      result: "Tax: $2,000 (capped at 20%) — After-tax profit: $8,000.",
    },
    {
      title: "Short-Term Altcoin Flip",
      description: "$5,000 profit after 6 months, 32% tax bracket.",
      inputs: { profit: 5000, taxRate: 32, longTerm: false },
      result: "Tax: $1,600 — After-tax profit: $3,400.",
    },
  ],
  faqs: [
    { question: "When do I owe crypto tax?", answer: "In the US, you owe tax when you sell, trade, or spend crypto for a profit. Holding is not taxable." },
    { question: "What is the long-term capital gains rate in the US?", answer: "0%, 15%, or 20% depending on your income. Assets held over 1 year qualify. Short-term = ordinary income rates." },
    { question: "Is this a substitute for professional tax advice?", answer: "No. Crypto tax is complex — use tools like Koinly, CoinTracker, or a CPA for accurate filing." },
  ],
  relatedSlugs: ["crypto-profit-calculator", "crypto-roi-calculator", "sales-tax-calculator"],
};

export default def;
