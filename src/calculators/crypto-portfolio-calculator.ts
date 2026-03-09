import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "crypto-portfolio-calculator",
  title: "Crypto Portfolio Value Calculator",
  shortTitle: "Crypto Portfolio",
  description: "Calculate the total value of a multi-coin crypto portfolio.",
  longDescription:
    "Tracking your crypto portfolio across multiple coins is easy with this calculator. Enter holdings for up to three coins with their current prices to get total portfolio value, individual allocations, and overall gain or loss.",
  category: "finance",
  keywords: ["crypto portfolio calculator", "bitcoin portfolio value", "multi coin portfolio", "crypto holdings calculator", "crypto net worth"],
  inputs: [
    { type: "number", key: "coin1Amount", label: "Coin 1 — Amount Held", defaultValue: 0.1, min: 0, step: 0.001, placeholder: "0.1" },
    { type: "number", key: "coin1Price", label: "Coin 1 — Current Price ($)", defaultValue: 65000, min: 0, step: 1, placeholder: "65000" },
    { type: "number", key: "coin2Amount", label: "Coin 2 — Amount Held", defaultValue: 2, min: 0, step: 0.01, placeholder: "2" },
    { type: "number", key: "coin2Price", label: "Coin 2 — Current Price ($)", defaultValue: 3500, min: 0, step: 1, placeholder: "3500" },
    { type: "number", key: "coin3Amount", label: "Coin 3 — Amount Held", defaultValue: 100, min: 0, step: 1, placeholder: "100" },
    { type: "number", key: "coin3Price", label: "Coin 3 — Current Price ($)", defaultValue: 150, min: 0, step: 0.01, placeholder: "150" },
  ],
  compute(values: InputValues): ComputeResult {
    const c1 = Number(values.coin1Amount) * Number(values.coin1Price);
    const c2 = Number(values.coin2Amount) * Number(values.coin2Price);
    const c3 = Number(values.coin3Amount) * Number(values.coin3Price);
    if ([c1, c2, c3].some(isNaN)) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const total = c1 + c2 + c3;
    return {
      outputs: [
        { key: "totalValue", label: "Total Portfolio Value ($)", value: Number(total.toFixed(2)), format: "number", highlight: true },
        { key: "coin1Value", label: "Coin 1 Value ($)", value: Number(c1.toFixed(2)), format: "number" },
        { key: "coin2Value", label: "Coin 2 Value ($)", value: Number(c2.toFixed(2)), format: "number" },
        { key: "coin3Value", label: "Coin 3 Value ($)", value: Number(c3.toFixed(2)), format: "number" },
      ],
    };
  },
  howItWorks:
    "Multiplies each coin's held amount by its current price, then sums all values for the total portfolio value.",
  examples: [
    {
      title: "BTC + ETH + SOL",
      description: "0.1 BTC, 2 ETH, 100 SOL.",
      inputs: { coin1Amount: 0.1, coin1Price: 65000, coin2Amount: 2, coin2Price: 3500, coin3Amount: 100, coin3Price: 150 },
      result: "Total: $6,500 + $7,000 + $15,000 = $28,500.",
    },
    {
      title: "Altcoin Heavy",
      description: "0.05 BTC, 1 ETH, 500 ADA at $0.45.",
      inputs: { coin1Amount: 0.05, coin1Price: 65000, coin2Amount: 1, coin2Price: 3500, coin3Amount: 500, coin3Price: 0.45 },
      result: "Total: $3,250 + $3,500 + $225 = $6,975.",
    },
  ],
  faqs: [
    { question: "Can I add more than 3 coins?", answer: "This calculator supports 3 coins. For full portfolio tracking, use dedicated apps like CoinStats, Delta, or CoinGecko portfolio." },
    { question: "Should I include staked crypto?", answer: "Yes — include the current value of staked coins plus any accrued rewards for a complete picture." },
    { question: "How do I find current prices?", answer: "Check CoinGecko, CoinMarketCap, or your exchange app for live prices." },
  ],
  relatedSlugs: ["crypto-profit-calculator", "crypto-converter", "net-worth-calculator"],
};

export default def;
