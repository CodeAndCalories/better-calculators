import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "bitcoin-halving-profit-calculator",
  title: "Bitcoin Halving Profit Calculator",
  shortTitle: "BTC Halving Profit",
  description: "Project Bitcoin profit based on historical post-halving price patterns.",
  longDescription:
    "Bitcoin halvings reduce the block reward by 50% roughly every 4 years, historically preceding major bull runs. Enter your BTC holdings and a target price multiplier based on past halving cycles to project your potential profit.",
  category: "finance",
  keywords: ["bitcoin halving calculator", "halving profit", "BTC halving price prediction", "bitcoin cycle calculator", "halving ROI"],
  inputs: [
    { type: "number", key: "btcHeld", label: "Bitcoin Held (BTC)", defaultValue: 0.1, min: 0.00000001, step: 0.001, placeholder: "0.1" },
    { type: "number", key: "currentPrice", label: "Current BTC Price ($)", defaultValue: 65000, min: 1, step: 100, placeholder: "65000" },
    { type: "number", key: "targetMultiplier", label: "Price Target Multiplier (x)", defaultValue: 3, min: 0.1, step: 0.1, placeholder: "3" },
  ],
  compute(values: InputValues): ComputeResult {
    const btcHeld = Number(values.btcHeld);
    const currentPrice = Number(values.currentPrice);
    const targetMultiplier = Number(values.targetMultiplier);
    if ([btcHeld, currentPrice, targetMultiplier].some(isNaN) || btcHeld <= 0 || currentPrice <= 0) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const targetPrice = currentPrice * targetMultiplier;
    const currentValue = btcHeld * currentPrice;
    const targetValue = btcHeld * targetPrice;
    const profit = targetValue - currentValue;
    const roi = (profit / currentValue) * 100;
    return {
      outputs: [
        { key: "targetValue", label: "Portfolio Value at Target ($)", value: Number(targetValue.toFixed(2)), format: "number", highlight: true },
        { key: "profit", label: "Projected Profit ($)", value: Number(profit.toFixed(2)), format: "number" },
        { key: "targetPrice", label: "Target BTC Price ($)", value: Number(targetPrice.toFixed(0)), format: "number" },
        { key: "roi", label: "Projected ROI (%)", value: Number(roi.toFixed(2)), format: "number" },
      ],
    };
  },
  howItWorks:
    "Multiplies current price by your target multiplier to get target price. Multiplies BTC held by both prices to get current and target portfolio values.",
  examples: [
    {
      title: "3x Target",
      description: "0.1 BTC at $65,000, targeting 3x price.",
      inputs: { btcHeld: 0.1, currentPrice: 65000, targetMultiplier: 3 },
      result: "Target portfolio: $19,500 — Profit: $13,000 — ROI: 200%.",
    },
    {
      title: "5x Target",
      description: "0.5 BTC at $65,000, targeting 5x.",
      inputs: { btcHeld: 0.5, currentPrice: 65000, targetMultiplier: 5 },
      result: "Target portfolio: $162,500 — Profit: $130,000.",
    },
  ],
  faqs: [
    { question: "What is the Bitcoin halving?", answer: "Every ~210,000 blocks (~4 years), the BTC block reward halves. Past halvings in 2012, 2016, 2020, and 2024 have preceded major price increases." },
    { question: "What multipliers have past halvings produced?", answer: "Post-2012: ~100x. Post-2016: ~30x. Post-2020: ~10x. Each cycle the multiplier has decreased as market cap grew." },
    { question: "Is future price guaranteed to rise after halving?", answer: "No. Past performance does not guarantee future results. This is a projection tool, not financial advice." },
  ],
  relatedSlugs: ["crypto-profit-calculator", "bitcoin-mining-profitability-calculator", "rule-of-72-calculator"],
};

export default def;
