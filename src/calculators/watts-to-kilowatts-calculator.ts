import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "watts-to-kilowatts-calculator",
  title: "Watts to Kilowatts Calculator",
  shortTitle: "W to kW",
  description: "Convert watts to kilowatts instantly.",
  longDescription: "Kilowatts are the standard unit for measuring home appliance power and electricity billing. This calculator divides your watt value by 1000 to give the kilowatt equivalent.",
  category: "conversions",
  keywords: ["watts to kilowatts", "W to kW", "power converter", "electricity units"],
  inputs: [
    { type: "number", key: "watts", label: "Watts (W)", defaultValue: 1000, min: 0, step: 1, placeholder: "1000" },
  ],
  compute(values: InputValues): ComputeResult {
    const watts = Number(values.watts);
    if (isNaN(watts) || watts < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const kilowatts = watts / 1000;
    return {
      outputs: [
        { key: "kilowatts", label: "Kilowatts (kW)", value: Number(kilowatts.toFixed(6)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Divides watts by 1000, since the prefix 'kilo-' means one thousand.",
  examples: [
    {
      title: "Microwave Oven",
      description: "A 1200W microwave in kilowatts.",
      inputs: { watts: 1200 },
      result: "1.2 kW.",
    },
    {
      title: "LED Bulb",
      description: "A 10W LED bulb in kilowatts.",
      inputs: { watts: 10 },
      result: "0.01 kW.",
    },
  ],
  faqs: [
    { question: "How many watts are in a kilowatt?", answer: "Exactly 1000 watts." },
    { question: "Why is kW used for billing?", answer: "Electricity bills use kilowatt-hours (kWh). A 1 kW appliance running for 1 hour uses 1 kWh." },
    { question: "Is this conversion exact?", answer: "Yes. Both are SI units with an exact relationship." },
  ],
  relatedSlugs: ["kilowatts-to-watts-calculator"],
};

export default def;
