import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "gas-mileage-calculator",
  title: "Gas Mileage Calculator",
  shortTitle: "Gas Mileage",
  description: "Calculate your car's fuel efficiency in miles per gallon.",
  longDescription: "Knowing your gas mileage helps you budget fuel costs and compare vehicles. Enter the miles driven and gallons of fuel used to get your miles per gallon (MPG).",
  category: "life",
  keywords: ["gas mileage", "MPG calculator", "fuel efficiency", "miles per gallon"],
  inputs: [
    { type: "number", key: "miles", label: "Miles Driven", defaultValue: 300, min: 0, step: 1, placeholder: "300" },
    { type: "number", key: "gallons", label: "Gallons Used", defaultValue: 12, min: 0.1, step: 0.1, placeholder: "12" },
  ],
  compute(values: InputValues): ComputeResult {
    const miles = Number(values.miles);
    const gallons = Number(values.gallons);
    if (isNaN(miles) || isNaN(gallons) || gallons <= 0) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const mpg = miles / gallons;
    return {
      outputs: [
        { key: "mpg", label: "Miles Per Gallon (MPG)", value: Number(mpg.toFixed(2)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Divides the number of miles driven by the gallons of fuel consumed.",
  examples: [
    {
      title: "Average Commuter",
      description: "300 miles on 12 gallons.",
      inputs: { miles: 300, gallons: 12 },
      result: "25 MPG.",
    },
    {
      title: "Road Trip",
      description: "500 miles on 18 gallons.",
      inputs: { miles: 500, gallons: 18 },
      result: "Approximately 27.78 MPG.",
    },
  ],
  faqs: [
    { question: "What is good gas mileage?", answer: "Above 30 MPG is considered efficient for a non-hybrid. Many modern cars average 25–35 MPG on highways." },
    { question: "How do I measure gallons used accurately?", answer: "Fill your tank full, drive a known distance, then fill up again and record exactly how many gallons it took." },
    { question: "Can I calculate L/100km with this?", answer: "Not directly, but you can convert: L/100km = 235.2 / MPG." },
  ],
  relatedSlugs: ["fuel-cost-calculator", "road-trip-cost-calculator"],
};

export default def;
