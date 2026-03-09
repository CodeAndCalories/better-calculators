import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "crypto-market-cap-calculator",
  title: "Crypto Market Cap Calculator",
  shortTitle: "Market Cap",
  description: "Calculate a cryptocurrency's market cap or target price from a given market cap.",
  longDescription:
    "Market capitalization = Price × Circulating Supply. It is the most widely used metric to rank and compare cryptocurrencies. Use this calculator to find a coin's market cap, or to work backwards from a target market cap to find what price that implies.",
  category: "finance",
  keywords: ["crypto market cap calculator", "market cap to price", "cryptocurrency market cap", "bitcoin market cap", "coin price from market cap"],
  inputs: [
    { type: "number", key: "price", label: "Coin Price ($)", defaultValue: 65000, min: 0.000000001, step: 0.01, placeholder: "65000" },
    { type: "number", key: "circulatingSupply", label: "Circulating Supply (coins)", defaultValue: 19700000, min: 1, step: 1000, placeholder: "19700000" },
  ],
  compute(values: InputValues): ComputeResult {
    const price = Number(values.price);
    const supply = Number(values.circulatingSupply);
    if ([price, supply].some(isNaN) || price <= 0 || supply <= 0) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const marketCap = price * supply;
    const priceFor1T = 1_000_000_000_000 / supply;
    const priceFor500B = 500_000_000_000 / supply;
    return {
      outputs: [
        { key: "marketCap", label: "Market Cap ($)", value: Number(marketCap.toFixed(0)), format: "number", highlight: true },
        { key: "priceFor1T", label: "Price at $1T Market Cap ($)", value: Number(priceFor1T.toFixed(4)), format: "number" },
        { key: "priceFor500B", label: "Price at $500B Market Cap ($)", value: Number(priceFor500B.toFixed(4)), format: "number" },
      ],
    };
  },
  howItWorks:
    "Market Cap = Price × Circulating Supply. Target price is calculated by dividing the target market cap by circulating supply.",
  examples: [
    {
      title: "Bitcoin",
      description: "BTC at $65,000 with 19.7M circulating supply.",
      inputs: { price: 65000, circulatingSupply: 19700000 },
      result: "Market cap: ~$1.28 trillion.",
    },
    {
      title: "Altcoin Moonshot",
      description: "A $0.10 coin with 10B supply — what price at $100B market cap?",
      inputs: { price: 0.1, circulatingSupply: 10000000000 },
      result: "Market cap: $1B. Price for $100B market cap: $10.",
    },
  ],
  faqs: [
    { question: "What is fully diluted market cap?", answer: "FDV = Price × Max Supply (including locked or unminted tokens). It shows potential dilution if all tokens enter circulation." },
    { question: "Why does market cap matter?", answer: "It ranks coins by size and is used to gauge whether a coin is small-cap (higher risk/reward) or large-cap (more stable)." },
    { question: "How is this different from volume?", answer: "Market cap is total value of all circulating coins. Volume is how much has been traded in the past 24 hours." },
  ],
  relatedSlugs: ["crypto-profit-calculator", "satoshi-to-bitcoin-calculator", "bitcoin-to-usd-calculator"],
};

export default def;
