import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "bitcoin-to-usd-calculator",
  title: "Bitcoin to USD Calculator",
  shortTitle: "BTC to USD",
  description: "Convert Bitcoin to US dollars instantly.",
  longDescription:
    "Quickly convert any amount of Bitcoin to USD using the current price. Whether you hold a fraction of a Bitcoin or multiple whole coins, this calculator gives you the exact dollar value at your entered price.",
  category: "conversions",
  keywords: ["bitcoin to USD", "BTC to dollars", "bitcoin price calculator", "convert bitcoin", "BTC USD value"],
  inputs: [
    { type: "number", key: "btcAmount", label: "Bitcoin Amount (BTC)", defaultValue: 0.1, min: 0.00000001, step: 0.001, placeholder: "0.1" },
    { type: "number", key: "btcPrice", label: "Bitcoin Price ($)", defaultValue: 65000, min: 1, step: 100, placeholder: "65000" },
  ],
  compute(values: InputValues): ComputeResult {
    const btcAmount = Number(values.btcAmount);
    const btcPrice = Number(values.btcPrice);
    if ([btcAmount, btcPrice].some(isNaN) || btcAmount <= 0 || btcPrice <= 0) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const usd = btcAmount * btcPrice;
    const satoshis = Math.round(btcAmount * 100_000_000);
    return {
      outputs: [
        { key: "usd", label: "USD Value ($)", value: Number(usd.toFixed(2)), format: "number", highlight: true },
        { key: "satoshis", label: "Equivalent in Satoshis", value: satoshis, format: "number" },
      ],
    };
  },
  howItWorks:
    "Multiplies Bitcoin amount by the current price per BTC to get USD value. Also shows the satoshi equivalent (1 BTC = 100,000,000 satoshis).",
  examples: [
    {
      title: "Tenth of a Bitcoin",
      description: "0.1 BTC at $65,000.",
      inputs: { btcAmount: 0.1, btcPrice: 65000 },
      result: "$6,500.",
    },
    {
      title: "Whole Bitcoin",
      description: "1 BTC at $100,000.",
      inputs: { btcAmount: 1, btcPrice: 100000 },
      result: "$100,000.",
    },
  ],
  faqs: [
    { question: "Where do I get the live Bitcoin price?", answer: "Check CoinGecko, CoinMarketCap, Coinbase, or Binance for real-time prices. Prices vary slightly by exchange." },
    { question: "Can I convert USD to BTC?", answer: "Divide your USD amount by the BTC price to get your BTC equivalent. e.g. $1,000 ÷ $65,000 = 0.01538 BTC." },
    { question: "Is Bitcoin divisible below 1 satoshi?", answer: "On the base layer, no. Lightning Network enables sub-satoshi accounting in theory, but practically 1 satoshi is the minimum." },
  ],
  relatedSlugs: ["satoshi-to-bitcoin-calculator", "crypto-converter", "crypto-profit-calculator"],
};

export default def;
