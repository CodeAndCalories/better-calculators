import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "satoshi-to-bitcoin-calculator",
  title: "Satoshi to Bitcoin Calculator",
  shortTitle: "Satoshi to BTC",
  description: "Convert satoshis to Bitcoin (and USD) instantly.",
  longDescription:
    "A satoshi is the smallest unit of Bitcoin — one hundred millionth of a BTC (0.00000001 BTC). Named after Bitcoin's creator Satoshi Nakamoto. Enter any number of satoshis to see the Bitcoin and USD equivalent.",
  category: "conversions",
  keywords: ["satoshi to bitcoin", "satoshi to BTC", "sats to BTC", "bitcoin satoshi converter", "smallest bitcoin unit"],
  inputs: [
    { type: "number", key: "satoshis", label: "Satoshis (sats)", defaultValue: 100000, min: 1, step: 1000, placeholder: "100000" },
    { type: "number", key: "btcPrice", label: "Bitcoin Price ($)", defaultValue: 65000, min: 1, step: 100, placeholder: "65000" },
  ],
  compute(values: InputValues): ComputeResult {
    const satoshis = Number(values.satoshis);
    const btcPrice = Number(values.btcPrice);
    if ([satoshis, btcPrice].some(isNaN) || satoshis < 0 || btcPrice <= 0) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const btc = satoshis / 100_000_000;
    const usd = btc * btcPrice;
    return {
      outputs: [
        { key: "btc", label: "Bitcoin (BTC)", value: Number(btc.toFixed(8)), format: "number", highlight: true },
        { key: "usd", label: "USD Value ($)", value: Number(usd.toFixed(4)), format: "number" },
      ],
    };
  },
  howItWorks:
    "Divides satoshis by 100,000,000 (1 BTC = 10^8 satoshis) to get BTC. Multiplies BTC by the current price for USD value.",
  examples: [
    {
      title: "100,000 Sats",
      description: "Converting 100,000 satoshis at BTC = $65,000.",
      inputs: { satoshis: 100000, btcPrice: 65000 },
      result: "0.001 BTC = $65.",
    },
    {
      title: "1 Million Sats",
      description: "1,000,000 satoshis — one millionth of a Bitcoin.",
      inputs: { satoshis: 1000000, btcPrice: 65000 },
      result: "0.01 BTC = $650.",
    },
  ],
  faqs: [
    { question: "How many satoshis are in 1 Bitcoin?", answer: "Exactly 100,000,000 satoshis (10^8)." },
    { question: "What is a satoshi worth?", answer: "At $65,000 per BTC, one satoshi = $0.00065. As Bitcoin's price rises, each satoshi becomes more valuable." },
    { question: "What other sub-units does Bitcoin have?", answer: "Other informal units include bits (100 sats), millibitcoin (100,000 sats), and microbitcoin (100 sats)." },
  ],
  relatedSlugs: ["bitcoin-to-usd-calculator", "crypto-converter", "crypto-market-cap-calculator"],
};

export default def;
