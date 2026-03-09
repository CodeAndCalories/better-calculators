import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "crypto-staking-rewards-calculator",
  title: "Crypto Staking Rewards Calculator",
  shortTitle: "Staking Rewards",
  description: "Calculate staking rewards for any proof-of-stake cryptocurrency.",
  longDescription:
    "Staking rewards are earned by locking up proof-of-stake cryptocurrencies to help validate the network. Enter your holdings, the staking APY, and a time period to project your rewards for ETH, SOL, ADA, DOT, or any PoS coin.",
  category: "finance",
  keywords: ["crypto staking calculator", "staking rewards", "staking APY calculator", "proof of stake rewards", "passive crypto income"],
  inputs: [
    { type: "number", key: "amount", label: "Amount Staked ($)", defaultValue: 5000, min: 1, step: 100, placeholder: "5000" },
    { type: "number", key: "apy", label: "Staking APY (%)", defaultValue: 8, min: 0.1, max: 100, step: 0.1, placeholder: "8" },
    { type: "number", key: "days", label: "Staking Period (days)", defaultValue: 365, min: 1, step: 30, placeholder: "365" },
  ],
  compute(values: InputValues): ComputeResult {
    const amount = Number(values.amount);
    const apy = Number(values.apy) / 100;
    const days = Number(values.days);
    if ([amount, apy, days].some(isNaN) || amount <= 0 || days < 1) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const dailyRate = Math.pow(1 + apy, 1 / 365) - 1;
    const total = amount * Math.pow(1 + dailyRate, days);
    const rewards = total - amount;
    const annualizedRewards = amount * apy;
    return {
      outputs: [
        { key: "rewards", label: "Staking Rewards ($)", value: Number(rewards.toFixed(2)), format: "number", highlight: true },
        { key: "total", label: "Total Value ($)", value: Number(total.toFixed(2)), format: "number" },
        { key: "dailyRewards", label: "Daily Rewards ($)", value: Number((rewards / days).toFixed(4)), format: "number" },
        { key: "annualizedRewards", label: "Projected Annual Rewards ($)", value: Number(annualizedRewards.toFixed(2)), format: "number" },
      ],
    };
  },
  howItWorks:
    "Converts APY to a daily compounding rate, then calculates compound growth over the staking period: Total = Amount × (1 + dailyRate)^days.",
  examples: [
    {
      title: "Solana Staking",
      description: "$5,000 staked at 8% APY for 1 year.",
      inputs: { amount: 5000, apy: 8, days: 365 },
      result: "~$400 in staking rewards.",
    },
    {
      title: "Short-Term Staking",
      description: "$10,000 staked at 12% APY for 90 days.",
      inputs: { amount: 10000, apy: 12, days: 90 },
      result: "~$284 in rewards over 90 days.",
    },
  ],
  faqs: [
    { question: "What is APY vs APR?", answer: "APY (Annual Percentage Yield) includes compound interest. APR does not. Most staking protocols quote APY." },
    { question: "Which coins have the highest staking rewards?", answer: "Newer or smaller PoS coins often offer higher APY (10–20%+), but this comes with higher price volatility risk." },
    { question: "Can staking rewards drop?", answer: "Yes — staking APY fluctuates based on total network staked amount, validator count, and protocol changes." },
  ],
  relatedSlugs: ["ethereum-staking-calculator", "crypto-compound-interest-calculator", "crypto-profit-calculator"],
};

export default def;
