import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "carbon-footprint-driving-calculator",
  title: "Carbon Footprint Driving Calculator",
  shortTitle: "Driving Carbon Footprint",
  description: "Estimate the CO₂ emissions from your driving.",
  longDescription: "The average car emits about 0.404 kg of CO₂ per mile (EPA average). Enter your annual miles driven to see your driving carbon footprint in kilograms of CO₂.",
  category: "life",
  keywords: ["carbon footprint", "CO2 emissions driving", "car emissions calculator", "driving carbon"],
  inputs: [
    { type: "number", key: "miles", label: "Miles Driven", defaultValue: 12000, min: 0, step: 100, placeholder: "12000" },
    { type: "number", key: "mpg", label: "Vehicle Fuel Efficiency (MPG)", defaultValue: 28, min: 5, step: 1, placeholder: "28" },
  ],
  compute(values: InputValues): ComputeResult {
    const miles = Number(values.miles);
    const mpg = Number(values.mpg);
    if (isNaN(miles) || isNaN(mpg) || mpg <= 0) {
      return { outputs: [], error: "Please enter valid values." };
    }
    // 8.89 kg CO2 per gallon of gasoline (EPA)
    const gallonsUsed = miles / mpg;
    const kgCO2 = gallonsUsed * 8.89;
    return {
      outputs: [
        { key: "kgCO2", label: "CO₂ Emissions (kg)", value: Number(kgCO2.toFixed(1)), format: "number", highlight: true },
        { key: "gallonsUsed", label: "Gallons of Gas Used", value: Number(gallonsUsed.toFixed(1)), format: "number" },
      ],
    };
  },
  howItWorks: "Divides miles by MPG to get gallons used, then multiplies by 8.89 kg — the EPA figure for CO₂ per gallon of gasoline burned.",
  examples: [
    {
      title: "Average US Driver",
      description: "12,000 miles at 28 MPG.",
      inputs: { miles: 12000, mpg: 28 },
      result: "Approximately 3,810 kg CO₂.",
    },
    {
      title: "Long Commuter",
      description: "20,000 miles at 25 MPG.",
      inputs: { miles: 20000, mpg: 25 },
      result: "Approximately 7,112 kg CO₂.",
    },
  ],
  faqs: [
    { question: "How does this compare to the average?", answer: "The average American driver emits about 4,600 kg of CO₂ per year from driving." },
    { question: "What is 8.89 kg CO₂ per gallon from?", answer: "This is the EPA's figure for tailpipe CO₂ emissions per gallon of gasoline burned." },
    { question: "How can I reduce my driving footprint?", answer: "Drive less, maintain tire pressure, avoid idling, carpool, or switch to an EV or hybrid." },
  ],
  relatedSlugs: ["fuel-cost-calculator", "road-trip-cost-calculator", "gas-mileage-calculator"],
};

export default def;
