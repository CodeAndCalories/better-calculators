import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "fuel-cost-calculator",
  title: "Fuel Cost Calculator",
  shortTitle: "Fuel Cost",
  description: "Calculate the fuel cost for a trip based on distance, fuel efficiency, and fuel price.",
  category: "life",
  keywords: ["fuel cost calculator", "gas cost calculator", "trip fuel calculator", "mpg cost calculator"],
  inputs: [
    { type: "number", key: "distance",    label: "Distance (miles)",         defaultValue: 250,  min: 1,    step: 1    },
    { type: "number", key: "mpg",         label: "Fuel Efficiency (MPG)",    defaultValue: 30,   min: 1,    max: 200, step: 0.1 },
    { type: "number", key: "fuelPrice",   label: "Fuel Price ($ per gallon)",defaultValue: 3.50, min: 0.01, step: 0.01 },
    { type: "select", key: "passengers",  label: "Passengers (for split)",   defaultValue: "1",  options: [
      { label: "1 (no split)", value: "1" },
      { label: "2 passengers", value: "2" },
      { label: "3 passengers", value: "3" },
      { label: "4 passengers", value: "4" },
    ]},
  ],
  compute(values: InputValues): ComputeResult {
    const dist    = Number(values.distance);
    const mpg     = Number(values.mpg);
    const price   = Number(values.fuelPrice);
    const pax     = Number(values.passengers);
    if ([dist, mpg, price, pax].some((v) => !Number.isFinite(v)) || dist <= 0 || mpg <= 0 || price <= 0) {
      return { outputs: [], error: "Please enter a valid number." };
    }
    const gallons    = dist / mpg;
    const totalCost  = gallons * price;
    const perPerson  = totalCost / pax;
    const costPerMile = totalCost / dist;
    return {
      outputs: [
        { key: "totalCost",    label: "Total Fuel Cost",      value: Math.round(totalCost  * 100) / 100, format: "currency", highlight: true },
        { key: "perPerson",    label: "Cost Per Person",      value: Math.round(perPerson  * 100) / 100, format: "currency" },
        { key: "gallons",      label: "Gallons Needed",       value: Math.round(gallons    * 100) / 100, format: "number"   },
        { key: "costPerMile",  label: "Cost Per Mile",        value: Math.round(costPerMile * 1000) / 1000, format: "currency" },
      ],
    };
  },
  howItWorks: "Gallons = distance / MPG. Total cost = gallons × price per gallon. Per-person cost = total cost / passengers.",
  relatedSlugs: ["road-trip-cost-calculator", "running-speed-calculator"],
};
export default def;
