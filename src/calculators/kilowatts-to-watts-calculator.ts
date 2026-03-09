import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "kilowatts-to-watts-calculator",
  title: "Kilowatts to Watts Calculator",
  shortTitle: "kW to W",
  description: "Convert kilowatts to watts instantly.",
  longDescription: "Need to convert a kilowatt rating back to watts? This calculator multiplies by 1000 using the exact metric relationship — useful for comparing appliance specs and understanding power consumption.",
  category: "conversions",
  keywords: ["kilowatts to watts", "kW to W", "power converter", "electricity units"],
  inputs: [
    { type: "number", key: "kilowatts", label: "Kilowatts (kW)", defaultValue: 1.5, min: 0, step: 0.1, placeholder: "1.5" },
  ],
  compute(values: InputValues): ComputeResult {
    const kilowatts = Number(values.kilowatts);
    if (isNaN(kilowatts) || kilowatts < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const watts = kilowatts * 1000;
    return {
      outputs: [
        { key: "watts", label: "Watts (W)", value: Number(watts.toFixed(4)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Multiplies kilowatts by 1000, since 1 kilowatt = 1000 watts.",
  examples: [
    {
      title: "Electric Kettle",
      description: "A 2.4 kW kettle in watts.",
      inputs: { kilowatts: 2.4 },
      result: "2400 W.",
    },
    {
      title: "Small Heater",
      description: "A 1.5 kW space heater in watts.",
      inputs: { kilowatts: 1.5 },
      result: "1500 W.",
    },
  ],
  faqs: [
    { question: "How many watts are in a kilowatt?", answer: "Exactly 1000 watts." },
    { question: "When would I convert kW to W?", answer: "When comparing appliance power ratings listed in different units, or calculating circuit load in watts." },
    { question: "Is this the same for AC and DC power?", answer: "Yes — the watt is a watt regardless of current type." },
  ],
  relatedSlugs: ["watts-to-kilowatts-calculator"],
};

export default def;
