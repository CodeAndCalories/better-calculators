import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "present-value-calculator",
  title: "Present Value Calculator",
  shortTitle: "Present Value",
  description: "Calculate what a future sum of money is worth in today's dollars.",
  category: "finance",
  keywords: ["present value calculator", "PV calculator", "discounted cash flow", "time value of money"],
  inputs: [
    { type: "number", key: "futureValue", label: "Future Value ($)",           defaultValue: 50000, min: 1,    step: 1000 },
    { type: "number", key: "annualRate",  label: "Discount Rate (% per year)", defaultValue: 6,     min: 0.01, max: 50, step: 0.1 },
    { type: "number", key: "years",       label: "Years in the Future",        defaultValue: 10,    min: 1,    max: 100, step: 1 },
    { type: "select", key: "compound",    label: "Compounding Frequency",      defaultValue: "12",  options: [
      { label: "Monthly (12x/year)", value: "12" },
      { label: "Quarterly (4x/year)", value: "4" },
      { label: "Annually (1x/year)", value: "1" },
    ]},
  ],
  compute(values: InputValues): ComputeResult {
    const FV  = Number(values.futureValue);
    const r   = Number(values.annualRate) / 100;
    const t   = Number(values.years);
    const n   = Number(values.compound);
    if ([FV, r, t, n].some((v) => !Number.isFinite(v)) || FV <= 0 || r <= 0 || t <= 0) {
      return { outputs: [], error: "Please enter a valid number." };
    }
    const PV        = FV / Math.pow(1 + r / n, n * t);
    const discount  = FV - PV;
    const effectiveAnnualRate = (Math.pow(1 + r / n, n) - 1) * 100;
    return {
      outputs: [
        { key: "presentValue",  label: "Present Value (Today's $)", value: Math.round(PV * 100) / 100,    format: "currency", highlight: true },
        { key: "discount",      label: "Total Discount ($)",        value: Math.round(discount),           format: "currency" },
        { key: "effectiveRate", label: "Effective Annual Rate (%)", value: Math.round(effectiveAnnualRate * 100) / 100, format: "number" },
        { key: "futureValue",   label: "Future Value",              value: Math.round(FV),                 format: "currency" },
      ],
    };
  },
  howItWorks: "PV = FV / (1 + r/n)^(n×t). The effective annual rate accounts for within-year compounding: EAR = (1 + r/n)^n − 1.",
  relatedSlugs: ["future-value-calculator", "compound-interest-calculator", "savings-goal-calculator"],

  longDescription: "Present value tells you what a future sum of money is worth in today s dollars. A dollar today is worth more than a dollar in the future because of its earning potential. This concept — the time value of money — underpins all investment and loan analysis.",
  examples: [
    { title: "USD 50,000 in 10 years at 6% discount rate", description: "What is that future amount worth today?", inputs: { futureValue: 50000, annualRate: 6, years: 10, compound: "12" }, result: "Present value ~USD 27,400." },
  ],
  faqs: [
    { question: "What discount rate should I use?", answer: "Use the rate of return you could earn on an alternative investment of similar risk — often your expected investment return, cost of capital, or current interest rate." },
  ],
};

export default def;
