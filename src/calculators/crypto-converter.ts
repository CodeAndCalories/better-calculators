import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "crypto-converter",
  title: "Crypto to USD Converter",
  shortTitle: "Crypto Converter",
  description: "Convert any amount of cryptocurrency to its USD value.",
  longDescription:
    "Quickly convert any quantity of cryptocurrency to US dollars using the current price. Enter the number of coins and the current price per coin to get the total USD value — works for Bitcoin, Ethereum, Solana, or any other token.",
  category: "finance",
  keywords: ["crypto to USD converter", "bitcoin to dollars", "crypto value calculator", "coin to usd", "cryptocurrency converter"],
  inputs: [
    { type: "number", key: "coinAmount", label: "Amount of Coins", defaultValue: 0.5, min: 0.000000001, step: 0.001, placeholder: "0.5" },
    { type: "number", key: "pricePerCoin", label: "Price Per Coin ($)", defaultValue: 65000, min: 0.000000001, step: 0.01, placeholder: "65000" },
  ],
  compute(values: InputValues): ComputeResult {
    const coinAmount = Number(values.coinAmount);
    const pricePerCoin = Number(values.pricePerCoin);
    if ([coinAmount, pricePerCoin].some(isNaN) || coinAmount <= 0 || pricePerCoin <= 0) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const usdValue = coinAmount * pricePerCoin;
    const coinsPerDollar = 1 / pricePerCoin;
    return {
      outputs: [
        { key: "usdValue", label: "USD Value ($)", value: Number(usdValue.toFixed(2)), format: "number", highlight: true },
        { key: "coinsPerDollar", label: "Coins Per $1", value: Number(coinsPerDollar.toFixed(10)), format: "number" },
      ],
    };
  },
  howItWorks:
    "Multiplies the coin amount by the price per coin to get the total USD value.",
  examples: [
    {
      title: "Half a Bitcoin",
      description: "0.5 BTC at $65,000.",
      inputs: { coinAmount: 0.5, pricePerCoin: 65000 },
      result: "$32,500.",
    },
    {
      title: "Ethereum Holdings",
      description: "3.5 ETH at $3,500.",
      inputs: { coinAmount: 3.5, pricePerCoin: 3500 },
      result: "$12,250.",
    },
  ],
  faqs: [
    { question: "Where do I get the current price?", answer: "Check CoinGecko, CoinMarketCap, or your exchange for the real-time price. Update it manually for accurate results." },
    { question: "Can I convert fractions of a coin?", answer: "Yes — Bitcoin is divisible to 8 decimal places (Satoshis). Enter values like 0.00001 BTC." },
    { question: "Can I go USD to crypto?", answer: "Yes — enter 1 as the coin amount and the price as the coin price. The result is the USD value of 1 coin. For USD-to-coins, divide your USD by price." },
  ],
  relatedSlugs: ["bitcoin-to-usd-calculator", "satoshi-to-bitcoin-calculator", "crypto-profit-calculator"],
};

export default def;
