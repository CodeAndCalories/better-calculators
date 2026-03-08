import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "monthly-savings-calculator",
  title: "Monthly Savings Calculator",
  shortTitle: "Monthly Savings",
  description: "Calculate how much you need to save each month to reach a savings goal.",
  category: "finance",
  keywords: ["monthly savings calculator", "savings goal calculator", "how much to save per month", "savings plan"],
  inputs: [
    { type: "number", key: "goal",        label: "Savings Goal ($)",             defaultValue: 20000, min: 1,    step: 500  },
    { type: "number", key: "currentSaved",label: "Amount Already Saved ($)",     defaultValue: 2000,  min: 0,    step: 100  },
    { type: "number", key: "months",      label: "Months to Reach Goal",         defaultValue: 24,    min: 1,    max: 600, step: 1 },
    { type: "number", key: "annualRate",  label: "Annual Interest Rate (%)",     defaultValue: 4,     min: 0,    max: 20, step: 0.1 },
  ],
  compute(values: InputValues): ComputeResult {
    const goal    = Number(values.goal);
    const current = Number(values.currentSaved);
    const n       = Number(values.months);
    const r       = Number(values.annualRate) / 100 / 12;
    if ([goal, current, n, r].some((v) => !Number.isFinite(v)) || goal <= 0 || n <= 0 || current < 0) {
      return { outputs: [], error: "Please enter a valid number." };
    }
    if (current >= goal) {
      return { outputs: [], error: "You have already reached your goal." };
    }
    const remaining = goal - current;
    let monthlyPmt: number;
    if (r === 0) {
      monthlyPmt = remaining / n;
    } else {
      // FV annuity: FV = PMT × ((1+r)^n − 1) / r
      // Also account for current savings growing: FV_current = current × (1+r)^n
      const fvCurrent = current * Math.pow(1 + r, n);
      const fvNeeded  = goal - fvCurrent;
      if (fvNeeded <= 0) {
        return {
          outputs: [
            { key: "monthlyPmt", label: "Monthly Savings Needed", value: 0, format: "currency", highlight: true },
            { key: "note",       label: "Note", value: "Your current savings will grow to meet your goal.", format: "text" },
          ],
        };
      }
      monthlyPmt = fvNeeded * r / (Math.pow(1 + r, n) - 1);
    }
    const totalContributions = monthlyPmt * n + current;
    const totalInterest      = goal - totalContributions;
    return {
      outputs: [
        { key: "monthlyPmt",    label: "Monthly Savings Needed",  value: Math.round(monthlyPmt * 100) / 100, format: "currency", highlight: true },
        { key: "totalSaved",    label: "Total Contributed",       value: Math.round(monthlyPmt * n),          format: "currency" },
        { key: "interestEarned",label: "Interest Earned",         value: Math.round(totalInterest),           format: "currency" },
        { key: "monthsToGoal",  label: "Months to Goal",          value: n,                                   format: "number"   },
      ],
    };
  },
  howItWorks: "Required monthly payment = (goal − current × (1+r)^n) × r / ((1+r)^n − 1). When rate = 0, payment = remaining / months.",
  relatedSlugs: ["savings-goal-calculator", "future-value-calculator", "compound-interest-calculator"],

  longDescription: "Working backwards from a savings target, this calculator tells you exactly how much to set aside each month. It accounts for interest growth on both your existing savings and your new contributions, so you may need less than a simple division would suggest.",
  examples: [
    { title: "Save USD 20,000 in 24 months, USD 2,000 already saved, 4% annual interest", description: "Emergency fund or down payment planning.", inputs: { goal: 20000, currentSaved: 2000, months: 24, annualRate: 4 }, result: "~USD 735/month needed." },
  ],
  faqs: [
    { question: "What if my current savings will grow to cover the goal on their own?", answer: "The calculator detects this and returns USD 0 required — your existing savings plus interest will reach the target without additional contributions." },
  ],
};

export default def;
