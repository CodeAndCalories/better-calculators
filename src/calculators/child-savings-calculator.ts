import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "child-savings-calculator",
  title: "Child Savings Calculator",
  shortTitle: "Child Savings",
  description: "Estimate how much you'll save for your child by a target age.",
  longDescription: "Planning ahead for college or your child's future? Enter a monthly contribution amount, annual interest rate, and number of years to see how your savings will grow with compound interest.",
  category: "finance",
  keywords: ["child savings", "college savings", "kids savings calculator", "education fund"],
  inputs: [
    { type: "number", key: "monthly", label: "Monthly Contribution ($)", defaultValue: 200, min: 0, step: 10, placeholder: "200" },
    { type: "number", key: "rate", label: "Annual Interest Rate (%)", defaultValue: 5, min: 0, step: 0.1, placeholder: "5" },
    { type: "number", key: "years", label: "Number of Years", defaultValue: 18, min: 1, max: 50, step: 1, placeholder: "18" },
  ],
  compute(values: InputValues): ComputeResult {
    const monthly = Number(values.monthly);
    const rate = Number(values.rate);
    const years = Number(values.years);
    if ([monthly, rate, years].some(isNaN) || years < 1) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const r = rate / 100 / 12;
    const n = years * 12;
    const total = r === 0 ? monthly * n : monthly * ((Math.pow(1 + r, n) - 1) / r);
    const contributed = monthly * n;
    const interest = total - contributed;
    return {
      outputs: [
        { key: "total", label: "Total Savings ($)", value: Number(total.toFixed(2)), format: "number", highlight: true },
        { key: "contributed", label: "Total Contributed ($)", value: Number(contributed.toFixed(2)), format: "number" },
        { key: "interest", label: "Interest Earned ($)", value: Number(interest.toFixed(2)), format: "number" },
      ],
    };
  },
  howItWorks: "Uses the future value of an annuity formula with monthly compounding: FV = PMT × ((1 + r)^n − 1) / r.",
  examples: [
    {
      title: "College Fund",
      description: "$200/month at 5% for 18 years.",
      inputs: { monthly: 200, rate: 5, years: 18 },
      result: "Approximately $68,676 saved.",
    },
    {
      title: "Head Start Fund",
      description: "$100/month at 6% for 10 years.",
      inputs: { monthly: 100, rate: 6, years: 10 },
      result: "Approximately $16,388 saved.",
    },
  ],
  faqs: [
    { question: "What account should I use?", answer: "A 529 college savings plan offers tax advantages for education expenses in the US." },
    { question: "What rate should I assume?", answer: "Index funds have historically returned 6–8% annually, but nothing is guaranteed." },
    { question: "Does this account for inflation?", answer: "No. Use a real (inflation-adjusted) rate of return to account for purchasing power." },
  ],
  relatedSlugs: ["compound-interest", "savings-goal-calculator"],
};

export default def;
