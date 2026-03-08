import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "price-per-square-foot-calculator",
  title: "Price Per Square Foot Calculator",
  shortTitle: "Price / Sq Ft",
  description: "Calculate the price per square foot for a property and compare two properties side by side.",
  category: "finance",
  keywords: ["price per square foot calculator", "cost per sqft", "home value per square foot", "real estate price calculator"],
  inputs: [
    { type: "number", key: "price1",  label: "Property 1 Price ($)",        defaultValue: 450000, min: 1,    step: 5000 },
    { type: "number", key: "sqft1",   label: "Property 1 Size (sq ft)",     defaultValue: 1800,   min: 1,    step: 10   },
    { type: "toggle", key: "compare", label: "Compare With Property 2",     defaultValue: false },
    { type: "number", key: "price2",  label: "Property 2 Price ($)",        defaultValue: 520000, min: 1,    step: 5000 },
    { type: "number", key: "sqft2",   label: "Property 2 Size (sq ft)",     defaultValue: 2100,   min: 1,    step: 10   },
  ],
  compute(values: InputValues): ComputeResult {
    const p1 = Number(values.price1);
    const s1 = Number(values.sqft1);
    if (!Number.isFinite(p1) || !Number.isFinite(s1) || p1 <= 0 || s1 <= 0) {
      return { outputs: [], error: "Please enter a valid number." };
    }
    const ppsf1 = p1 / s1;
    if (!values.compare) {
      return {
        outputs: [
          { key: "ppsf1",  label: "Price Per Sq Ft",    value: Math.round(ppsf1 * 100) / 100, format: "currency", highlight: true },
          { key: "price1", label: "Total Price",         value: Math.round(p1),                format: "currency" },
          { key: "sqft1",  label: "Size (sq ft)",        value: s1,                             format: "number"   },
        ],
      };
    }
    const p2 = Number(values.price2);
    const s2 = Number(values.sqft2);
    if (!Number.isFinite(p2) || !Number.isFinite(s2) || p2 <= 0 || s2 <= 0) {
      return { outputs: [], error: "Please enter valid values for both properties." };
    }
    const ppsf2     = p2 / s2;
    const cheaperPPSF = ppsf1 < ppsf2 ? "Property 1" : ppsf2 < ppsf1 ? "Property 2" : "Equal";
    const diffPct   = Math.abs((ppsf1 - ppsf2) / Math.max(ppsf1, ppsf2) * 100);
    return {
      outputs: [
        { key: "ppsf1",      label: "Property 1 — Price/Sq Ft",  value: Math.round(ppsf1 * 100) / 100, format: "currency", highlight: true },
        { key: "ppsf2",      label: "Property 2 — Price/Sq Ft",  value: Math.round(ppsf2 * 100) / 100, format: "currency" },
        { key: "betterValue",label: "Better Value Per Sq Ft",     value: cheaperPPSF,                    format: "text"     },
        { key: "diffPct",    label: "Price/Sq Ft Difference (%)", value: Math.round(diffPct * 10) / 10,  format: "number"   },
      ],
    };
  },
  howItWorks: "Price per square foot = total price / total square footage. When comparing two properties, the one with the lower $/sqft represents better value per unit of space.",
  relatedSlugs: ["down-payment-calculator", "closing-cost-calculator", "rent-vs-buy-calculator"],
};
export default def;
