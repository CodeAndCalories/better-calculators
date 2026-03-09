import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "crypto-liquidation-calculator",
  title: "Crypto Liquidation Price Calculator",
  shortTitle: "Liquidation Price",
  description: "Calculate the liquidation price for a leveraged crypto position.",
  longDescription:
    "When trading crypto with leverage, your position gets automatically closed (liquidated) if the price moves against you past a certain point. This calculator estimates your liquidation price for both long and short positions based on your entry price, leverage, and position type.",
  category: "finance",
  keywords: ["crypto liquidation calculator", "liquidation price crypto", "leverage trading calculator", "bitcoin liquidation", "futures liquidation price"],
  inputs: [
    { type: "number", key: "entryPrice", label: "Entry Price ($)", defaultValue: 65000, min: 0.000001, step: 1, placeholder: "65000" },
    { type: "number", key: "leverage", label: "Leverage (x)", defaultValue: 10, min: 1, max: 125, step: 1, placeholder: "10" },
    { type: "select", key: "positionType", label: "Position Type", defaultValue: "long", options: [{ label: "Long (Buying)", value: "long" }, { label: "Short (Selling)", value: "short" }] },
    { type: "number", key: "maintenanceMargin", label: "Maintenance Margin (%)", defaultValue: 0.5, min: 0.1, max: 5, step: 0.1, placeholder: "0.5" },
  ],
  compute(values: InputValues): ComputeResult {
    const entryPrice = Number(values.entryPrice);
    const leverage = Number(values.leverage);
    const positionType = String(values.positionType);
    const maintenanceMargin = Number(values.maintenanceMargin) / 100;
    if ([entryPrice, leverage, maintenanceMargin].some(isNaN) || entryPrice <= 0 || leverage < 1) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const initialMarginRate = 1 / leverage;
    let liquidationPrice: number;
    if (positionType === "long") {
      liquidationPrice = entryPrice * (1 - initialMarginRate + maintenanceMargin);
    } else {
      liquidationPrice = entryPrice * (1 + initialMarginRate - maintenanceMargin);
    }
    const distanceToLiq = Math.abs(((liquidationPrice - entryPrice) / entryPrice) * 100);
    return {
      outputs: [
        { key: "liquidationPrice", label: "Liquidation Price ($)", value: Number(liquidationPrice.toFixed(2)), format: "number", highlight: true },
        { key: "distanceToLiq", label: "Distance to Liquidation (%)", value: Number(distanceToLiq.toFixed(2)), format: "number" },
      ],
    };
  },
  howItWorks:
    "For longs: Liquidation = Entry × (1 − 1/Leverage + Maintenance Margin Rate). For shorts: Entry × (1 + 1/Leverage − Maintenance Margin Rate). This is an approximation — exact prices vary by exchange.",
  examples: [
    {
      title: "10x Long BTC",
      description: "Long BTC at $65,000 with 10x leverage.",
      inputs: { entryPrice: 65000, leverage: 10, positionType: "long", maintenanceMargin: 0.5 },
      result: "Liquidation at ~$59,150 — 9% below entry.",
    },
    {
      title: "5x Short ETH",
      description: "Short ETH at $3,500 with 5x leverage.",
      inputs: { entryPrice: 3500, leverage: 5, positionType: "short", maintenanceMargin: 0.5 },
      result: "Liquidation at ~$3,815 — 9% above entry.",
    },
  ],
  faqs: [
    { question: "What is liquidation in crypto?", answer: "When your margin balance drops below the maintenance requirement, the exchange force-closes your position to prevent negative balance." },
    { question: "How can I avoid liquidation?", answer: "Use lower leverage, set stop-losses before the liquidation price, or add more margin to your position." },
    { question: "Is this accurate for all exchanges?", answer: "No — Binance, Bybit, OKX, and other exchanges use slightly different formulas and maintenance margin rates. Always check your exchange." },
  ],
  relatedSlugs: ["crypto-profit-calculator", "crypto-roi-calculator", "crypto-dca-calculator"],
};

export default def;
