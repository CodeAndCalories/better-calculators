import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "tip-calculator",
  title: "Tip Calculator",
  shortTitle: "Tip",
  description: "Calculate your tip amount, total bill, and split the check any number of ways.",
  longDescription: "Our tip calculator makes it easy to figure out how much to tip at restaurants, salons, and anywhere else. Split the bill evenly among your party and see what each person owes.",
  category: "life",
  keywords: ["tip calculator", "restaurant tip calculator", "bill split calculator", "gratuity calculator"],
  inputs: [
    { type: "number", key: "billAmount", label: "Bill Amount", prefix: "$", defaultValue: 65, min: 0.01, step: 0.5, placeholder: "65.00" },
    { type: "select", key: "tipPct", label: "Tip Percentage", defaultValue: "18", options: [
      { label: "10% — Below average", value: "10" },
      { label: "15% — Acceptable", value: "15" },
      { label: "18% — Good service", value: "18" },
      { label: "20% — Great service", value: "20" },
      { label: "25% — Excellent", value: "25" },
      { label: "30% — Exceptional", value: "30" },
    ]},
    { type: "number", key: "people", label: "Number of People", defaultValue: 2, min: 1, max: 100, step: 1, placeholder: "2" },
  ],
  compute(values: InputValues): ComputeResult {
    const bill = Number(values.billAmount);
    const tipPct = Number(values.tipPct);
    const people = Math.max(1, Math.round(Number(values.people)));

    const tipAmount = bill * (tipPct / 100);
    const total = bill + tipAmount;
    const perPerson = total / people;
    const tipPerPerson = tipAmount / people;

    return {
      outputs: [
        { key: "total", label: "Total Bill", value: total, format: "currency", highlight: true },
        { key: "tipAmount", label: "Tip Amount", value: tipAmount, format: "currency" },
        { key: "perPerson", label: "Per Person (Total)", value: perPerson, format: "currency" },
        { key: "tipPerPerson", label: "Tip Per Person", value: tipPerPerson, format: "currency" },
      ],
    };
  },
  howItWorks: `Tip Amount = Bill Amount × (Tip % / 100). Total = Bill + Tip. Per Person = Total ÷ Number of People. Simple and fast — no need to do mental math at the table.`,
  examples: [
    {
      title: "$65 dinner for 2, 20% tip",
      description: "A classic restaurant scenario for two people.",
      inputs: { billAmount: 65, tipPct: "20", people: 2 },
      result: "$13 tip, $78 total, $39 per person.",
    },
    {
      title: "$180 group dinner for 6, 18% tip",
      description: "Splitting a large group check evenly.",
      inputs: { billAmount: 180, tipPct: "18", people: 6 },
      result: "$32.40 tip, $212.40 total, $35.40 per person.",
    },
  ],
  faqs: [
    { question: "How much should you tip at a restaurant?", answer: "In the US, 15–20% is standard for sit-down restaurants. 10–15% for counter service or basic service, and 20–25%+ for exceptional service. Tipping culture varies by country." },
    { question: "Should you tip on the pre-tax or post-tax amount?", answer: "Traditionally, tips are calculated on the pre-tax subtotal. However, many people find it easier to tip on the total bill — the difference is usually minimal." },
    { question: "How do I split a bill unevenly?", answer: "Our calculator splits evenly, which is easiest. For uneven splits, calculate each person's share of the subtotal, then add their proportional tip on top." },
  ],
  relatedSlugs: ["discount-calculator", "percentage-calculator", "age-calculator"],
};

export default def;
