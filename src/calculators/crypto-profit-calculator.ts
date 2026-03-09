import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "crypto-profit-calculator",
  title: "Crypto Profit Calculator",
  shortTitle: "Crypto Profit",
  description: "Calculate your profit or loss on any cryptocurrency investment.",
  longDescription:
    "Enter how much you invested, your buy price, and current price to instantly calculate your crypto profit or loss — including ROI percentage and total portfolio value. Works for Bitcoin, Ethereum, and any other cryptocurrency.",
  category: "finance",
  keywords: ["crypto profit calculator", "cryptocurrency profit", "bitcoin profit", "crypto gain loss", "crypto investment return"],
  inputs: [
    { type: "number", key: "investment", label: "Initial Investment ($)", defaultValue: 1000, min: 0, step: 10, placeholder: "1000" },
    { type: "number", key: "buyPrice", label: "Buy Price per Coin ($)", defaultValue: 30000, min: 0.000001, step: 0.01, placeholder: "30000" },
    { type: "number", key: "currentPrice", label: "Current Price per Coin ($)", defaultValue: 65000, min: 0.000001, step: 0.01, placeholder: "65000" },
    { type: "number", key: "fee", label: "Trading Fee (%)", defaultValue: 0.5, min: 0, max: 10, step: 0.1, placeholder: "0.5" },
  ],
  compute(values: InputValues): ComputeResult {
    const investment = Number(values.investment);
    const buyPrice = Number(values.buyPrice);
    const currentPrice = Number(values.currentPrice);
    const fee = Number(values.fee) / 100;
    if ([investment, buyPrice, currentPrice, fee].some(isNaN) || buyPrice <= 0 || currentPrice <= 0) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const coins = investment / buyPrice;
    const currentValue = coins * currentPrice;
    const feeAmount = investment * fee;
    const profit = currentValue - investment - feeAmount;
    const roi = (profit / investment) * 100;
    return {
      outputs: [
        { key: "currentValue", label: "Current Value ($)", value: Number(currentValue.toFixed(2)), format: "number", highlight: true },
        { key: "profit", label: "Profit / Loss ($)", value: Number(profit.toFixed(2)), format: "number" },
        { key: "roi", label: "ROI (%)", value: Number(roi.toFixed(2)), format: "number" },
        { key: "coins", label: "Coins Held", value: Number(coins.toFixed(8)), format: "number" },
      ],
    };
  },
  howItWorks:
    "Divides your investment by the buy price to get coins held, then multiplies by current price. Subtracts the initial investment and trading fee to calculate net profit. ROI = (Profit / Investment) × 100.",
  examples: [
    {
      title: "Bitcoin Bull Run",
      description: "$1,000 in BTC at $30,000, now at $65,000.",
      inputs: { investment: 1000, buyPrice: 30000, currentPrice: 65000, fee: 0.5 },
      result: "Current value: $2,166.67 — Profit: ~$1,162 — ROI: ~116%.",
    },
    {
      title: "Altcoin Loss",
      description: "$500 in an altcoin at $5, now at $2.",
      inputs: { investment: 500, buyPrice: 5, currentPrice: 2, fee: 1 },
      result: "Current value: $200 — Loss: ~-$305 — ROI: ~-61%.",
    },
  ],
  faqs: [
    { question: "Does this include taxes?", answer: "No. This calculates gross profit before capital gains tax. Use our crypto tax calculator for after-tax figures." },
    { question: "Can I use this for any coin?", answer: "Yes — enter the buy and current price for any cryptocurrency, token, or NFT floor price." },
    { question: "What trading fee should I enter?", answer: "Coinbase charges ~0.5–1.5%, Binance ~0.1%, Kraken ~0.26%. Check your exchange's fee schedule." },
  ],
  relatedSlugs: ["crypto-roi-calculator", "crypto-tax-calculator", "roi-calculator"],
};

export default def;
