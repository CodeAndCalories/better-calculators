import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "ethereum-staking-calculator",
  title: "Ethereum Staking Calculator",
  shortTitle: "ETH Staking",
  description: "Calculate your Ethereum staking rewards over time.",
  longDescription:
    "Since the Ethereum Merge in 2022, ETH is secured by Proof of Stake — not mining. Validators earn staking rewards of approximately 3–5% APR. Enter your ETH holdings, staking APR, and ETH price to project your rewards.",
  category: "finance",
  keywords: ["ethereum staking calculator", "ETH staking rewards", "ETH staking APR", "ethereum validator rewards", "proof of stake calculator"],
  inputs: [
    { type: "number", key: "ethAmount", label: "ETH Staked", defaultValue: 32, min: 0.001, step: 0.1, placeholder: "32" },
    { type: "number", key: "ethPrice", label: "ETH Price ($)", defaultValue: 3500, min: 1, step: 10, placeholder: "3500" },
    { type: "number", key: "stakingApr", label: "Staking APR (%)", defaultValue: 4, min: 0.1, max: 20, step: 0.1, placeholder: "4" },
    { type: "number", key: "years", label: "Years", defaultValue: 1, min: 1, max: 30, step: 1, placeholder: "1" },
  ],
  compute(values: InputValues): ComputeResult {
    const ethAmount = Number(values.ethAmount);
    const ethPrice = Number(values.ethPrice);
    const stakingApr = Number(values.stakingApr) / 100;
    const years = Number(values.years);
    if ([ethAmount, ethPrice, stakingApr, years].some(isNaN) || ethAmount <= 0) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const totalEth = ethAmount * Math.pow(1 + stakingApr, years);
    const rewardsEth = totalEth - ethAmount;
    const rewardsUsd = rewardsEth * ethPrice;
    const totalValueUsd = totalEth * ethPrice;
    return {
      outputs: [
        { key: "rewardsEth", label: "ETH Rewards Earned", value: Number(rewardsEth.toFixed(6)), format: "number", highlight: true },
        { key: "rewardsUsd", label: "Rewards Value ($)", value: Number(rewardsUsd.toFixed(2)), format: "number" },
        { key: "totalEth", label: "Total ETH After Rewards", value: Number(totalEth.toFixed(6)), format: "number" },
        { key: "totalValueUsd", label: "Total Value ($)", value: Number(totalValueUsd.toFixed(2)), format: "number" },
      ],
    };
  },
  howItWorks:
    "Uses compound interest: Total ETH = Staked ETH × (1 + APR)^years. ETH rewards are reinvested annually. USD value is calculated at the entered ETH price.",
  examples: [
    {
      title: "Solo Validator",
      description: "32 ETH at 4% APR for 1 year, ETH at $3,500.",
      inputs: { ethAmount: 32, ethPrice: 3500, stakingApr: 4, years: 1 },
      result: "1.28 ETH earned (~$4,480) in year 1.",
    },
    {
      title: "Liquid Staking (10 ETH)",
      description: "10 ETH staked via liquid protocol at 4% for 3 years.",
      inputs: { ethAmount: 10, ethPrice: 3500, stakingApr: 4, years: 3 },
      result: "~1.249 ETH earned over 3 years.",
    },
  ],
  faqs: [
    { question: "Do I need 32 ETH to stake?", answer: "For solo validation yes, but liquid staking protocols like Lido or Rocket Pool allow staking any amount." },
    { question: "What APR should I expect?", answer: "Solo validators earn ~3–4% APR. Liquid staking protocols typically yield slightly less after fees (~3–4%)." },
    { question: "Are staking rewards taxable?", answer: "In most jurisdictions, staking rewards are taxed as ordinary income when received. Consult a tax professional." },
  ],
  relatedSlugs: ["crypto-staking-rewards-calculator", "crypto-compound-interest-calculator", "crypto-profit-calculator"],
};

export default def;
