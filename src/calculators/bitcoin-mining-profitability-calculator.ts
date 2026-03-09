import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "bitcoin-mining-profitability-calculator",
  title: "Bitcoin Mining Profitability Calculator",
  shortTitle: "BTC Mining Profit",
  description: "Calculate whether Bitcoin mining is profitable for your setup.",
  longDescription:
    "Bitcoin mining profitability depends on your hash rate, power consumption, electricity cost, and the current Bitcoin price. This calculator estimates your daily, monthly, and annual mining revenue and profit after electricity costs.",
  category: "finance",
  keywords: ["bitcoin mining calculator", "BTC mining profitability", "mining profit calculator", "hash rate calculator", "crypto mining"],
  inputs: [
    { type: "number", key: "hashRate", label: "Hash Rate (TH/s)", defaultValue: 100, min: 0.001, step: 1, placeholder: "100" },
    { type: "number", key: "powerWatts", label: "Power Consumption (Watts)", defaultValue: 3000, min: 1, step: 50, placeholder: "3000" },
    { type: "number", key: "electricityCost", label: "Electricity Cost ($/kWh)", defaultValue: 0.1, min: 0, step: 0.01, placeholder: "0.10" },
    { type: "number", key: "btcPrice", label: "Bitcoin Price ($)", defaultValue: 65000, min: 1, step: 100, placeholder: "65000" },
  ],
  compute(values: InputValues): ComputeResult {
    const hashRate = Number(values.hashRate);
    const powerWatts = Number(values.powerWatts);
    const electricityCost = Number(values.electricityCost);
    const btcPrice = Number(values.btcPrice);
    if ([hashRate, powerWatts, electricityCost, btcPrice].some(isNaN) || hashRate <= 0 || btcPrice <= 0) {
      return { outputs: [], error: "Please enter valid values." };
    }
    // Network difficulty approximation: ~600 BTC blocks/day, 6.25 BTC reward (post-4th halving)
    // Daily BTC ≈ (hashRate * 86400 * 6.25) / (networkHashrate * 2^32 / 600)
    // Using simplified: daily BTC ≈ hashRate(TH/s) * 0.00000008 (approx at ~600 EH/s network)
    const networkHashEH = 600; // EH/s approximation
    const dailyBTC = (hashRate / (networkHashEH * 1e6)) * 6.25 * 144;
    const dailyRevenue = dailyBTC * btcPrice;
    const dailyElectricity = (powerWatts / 1000) * 24 * electricityCost;
    const dailyProfit = dailyRevenue - dailyElectricity;
    const monthlyProfit = dailyProfit * 30;
    const annualProfit = dailyProfit * 365;
    return {
      outputs: [
        { key: "dailyProfit", label: "Daily Profit ($)", value: Number(dailyProfit.toFixed(4)), format: "number", highlight: true },
        { key: "dailyBTC", label: "Daily BTC Mined", value: Number(dailyBTC.toFixed(8)), format: "number" },
        { key: "dailyElectricity", label: "Daily Electricity Cost ($)", value: Number(dailyElectricity.toFixed(2)), format: "number" },
        { key: "monthlyProfit", label: "Monthly Profit ($)", value: Number(monthlyProfit.toFixed(2)), format: "number" },
        { key: "annualProfit", label: "Annual Profit ($)", value: Number(annualProfit.toFixed(2)), format: "number" },
      ],
    };
  },
  howItWorks:
    "Estimates daily BTC mined based on your hash rate relative to the total network hash rate (~600 EH/s), with 6.25 BTC block reward and 144 blocks/day. Subtracts daily electricity cost to get net profit.",
  examples: [
    {
      title: "Antminer S19 Pro",
      description: "110 TH/s, 3250W, $0.10/kWh, BTC at $65,000.",
      inputs: { hashRate: 110, powerWatts: 3250, electricityCost: 0.1, btcPrice: 65000 },
      result: "Daily profit ~$3.50, monthly ~$105.",
    },
    {
      title: "High Electricity Cost",
      description: "100 TH/s, 3000W, $0.20/kWh — unprofitable scenario.",
      inputs: { hashRate: 100, powerWatts: 3000, electricityCost: 0.2, btcPrice: 65000 },
      result: "Daily profit near breakeven or negative.",
    },
  ],
  faqs: [
    { question: "What is hash rate?", answer: "Hash rate measures your miner's computational power in terahashes per second (TH/s). Higher = more BTC mined." },
    { question: "Why does electricity cost matter so much?", answer: "Electricity is the primary ongoing cost of mining. At $0.05/kWh mining is often profitable; at $0.20/kWh it rarely is." },
    { question: "Does the network difficulty change?", answer: "Yes — Bitcoin adjusts difficulty every 2016 blocks (~2 weeks) to maintain a 10-minute block time. Higher network hash rate = harder = less BTC per miner." },
  ],
  relatedSlugs: ["crypto-profit-calculator", "bitcoin-halving-profit-calculator", "rule-of-72-calculator"],
};

export default def;
