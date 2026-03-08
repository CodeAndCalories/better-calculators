import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "future-value-calculator",
  title: "Future Value Calculator",
  shortTitle: "Future Value",
  description: "Calculate the future value of an investment with optional regular contributions.",
  category: "finance",
  keywords: ["future value calculator", "investment growth calculator", "FV calculator", "compound growth"],
  inputs: [
    { type: "number", key: "principal",  label: "Initial Investment ($)",       defaultValue: 10000, min: 0,    step: 500  },
    { type: "number", key: "annualRate", label: "Annual Interest Rate (%)",     defaultValue: 7,     min: 0,    max: 50, step: 0.1 },
    { type: "number", key: "years",      label: "Investment Period (years)",    defaultValue: 20,    min: 1,    max: 100, step: 1  },
    { type: "number", key: "monthly",    label: "Monthly Contribution ($)",     defaultValue: 200,   min: 0,    step: 50   },
    { type: "select", key: "compound",   label: "Compounding Frequency",        defaultValue: "12",  options: [
      { label: "Monthly (12x/year)", value: "12" },
      { label: "Quarterly (4x/year)", value: "4" },
      { label: "Annually (1x/year)", value: "1" },
    ]},
  ],
  compute(values: InputValues): ComputeResult {
    const P   = Number(values.principal);
    const r   = Number(values.annualRate) / 100;
    const yrs = Number(values.years);
    const pmt = Number(values.monthly);
    const n   = Number(values.compound);
    if ([P, r, yrs, pmt, n].some((v) => !Number.isFinite(v)) || P < 0 || r < 0 || yrs <= 0 || pmt < 0) {
      return { outputs: [], error: "Please enter a valid number." };
    }
    const periods = n * yrs;
    const rPer    = r / n;
    // FV of principal
    const fvPrincipal = P * Math.pow(1 + rPer, periods);
    // FV of contributions (convert monthly pmt to per-period pmt)
    const pmtPerPeriod = pmt * 12 / n;
    const fvContribs   = rPer === 0
      ? pmtPerPeriod * periods
      : pmtPerPeriod * (Math.pow(1 + rPer, periods) - 1) / rPer;
    const futureValue  = fvPrincipal + fvContribs;
    const totalInvested = P + pmt * 12 * yrs;
    const totalInterest = futureValue - totalInvested;
    return {
      outputs: [
        { key: "futureValue",   label: "Future Value",           value: Math.round(futureValue),   format: "currency", highlight: true },
        { key: "totalInvested", label: "Total Invested",         value: Math.round(totalInvested), format: "currency" },
        { key: "totalInterest", label: "Total Growth",           value: Math.round(totalInterest), format: "currency" },
        { key: "fvPrincipal",   label: "Growth on Principal",    value: Math.round(fvPrincipal),   format: "currency" },
      ],
    };
  },
  howItWorks: "FV = P × (1 + r/n)^(n×t) + PMT × ((1 + r/n)^(n×t) − 1) / (r/n). Monthly contributions are converted to per-period amounts based on compounding frequency.",
  relatedSlugs: ["present-value-calculator", "compound-interest-calculator", "monthly-savings-calculator"],

  longDescription: "Future value shows what an investment is worth after a period of compound growth. This calculator handles both a lump-sum initial investment and regular monthly contributions, with your choice of compounding frequency.",
  examples: [
    { title: "USD 10,000 initial + USD 200/month at 7% for 20 years", description: "A long-term retirement-style investment.", inputs: { principal: 10000, annualRate: 7, years: 20, monthly: 200, compound: "12" }, result: "Future value ~USD 142,000." },
  ],
  faqs: [
    { question: "Does compounding frequency matter much?", answer: "At the same annual rate, more frequent compounding yields slightly more. Monthly compounding on a 7% rate gives an effective annual rate of ~7.23%." },
  ],
};

export default def;
