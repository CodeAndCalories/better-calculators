import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "savings-goal-calculator",
  title: "Savings Goal Calculator",
  shortTitle: "Savings Goal",
  description:
    "Find out how much you need to save each month to reach any financial goal by a specific deadline, with or without interest.",
  longDescription:
    "Whether you're saving for a down payment, an emergency fund, a vacation, a car, or retirement, this calculator tells you exactly how much to set aside each month. Enter your goal amount, deadline, any head start you already have, and an expected interest or return rate — and get a precise monthly savings target plus a full picture of how your money will grow. Works with zero interest for simple goal tracking too.",
  category: "finance",
  keywords: [
    "savings goal calculator",
    "how much to save per month",
    "savings calculator",
    "monthly savings calculator",
    "save for a goal calculator",
    "down payment savings calculator",
  ],
  inputs: [
    {
      type: "number",
      key: "goalAmount",
      label: "Savings Goal",
      prefix: "$",
      defaultValue: 20000,
      min: 1,
      step: 500,
      placeholder: "20000",
      helpText: "Total amount you want to save",
    },
    {
      type: "number",
      key: "currentSavings",
      label: "Current Savings (Head Start)",
      prefix: "$",
      defaultValue: 2000,
      min: 0,
      step: 100,
      placeholder: "2000",
      helpText: "Amount already saved toward this goal — enter 0 if starting fresh",
    },
    {
      type: "number",
      key: "years",
      label: "Years to Reach Goal",
      suffix: "yrs",
      defaultValue: 3,
      min: 0,
      max: 50,
      step: 1,
      placeholder: "3",
    },
    {
      type: "number",
      key: "months",
      label: "Additional Months",
      suffix: "mo",
      defaultValue: 0,
      min: 0,
      max: 11,
      step: 1,
      placeholder: "0",
      helpText: "0–11 extra months on top of the years above",
    },
    {
      type: "number",
      key: "annualReturnRate",
      label: "Annual Interest / Return Rate",
      suffix: "%",
      defaultValue: 4.5,
      min: 0,
      max: 50,
      step: 0.1,
      placeholder: "4.5",
      helpText: "Use 0 for no interest (basic savings), ~4–5% for HYSA, ~7% for index funds",
    },
    {
      type: "select",
      key: "compoundFreq",
      label: "Compounding Frequency",
      defaultValue: "12",
      options: [
        { label: "Monthly (12×/year) — most savings accounts",  value: "12"  },
        { label: "Daily (365×/year) — most HYSAs",              value: "365" },
        { label: "Quarterly (4×/year)",                         value: "4"   },
        { label: "Annually (1×/year)",                          value: "1"   },
      ],
    },
  ],

  compute(values: InputValues): ComputeResult {
    const goal          = Number(values.goalAmount);
    const current       = Number(values.currentSavings) || 0;
    const yrs           = Number(values.years)  || 0;
    const mos           = Number(values.months) || 0;
    const annualRate    = Number(values.annualReturnRate);
    const n             = Number(values.compoundFreq); // compound periods per year

    const totalMonths   = yrs * 12 + mos;

    if (goal <= 0)        return { outputs: [], error: "Savings goal must be greater than zero." };
    if (totalMonths <= 0) return { outputs: [], error: "Time to goal must be at least 1 month." };
    if (current >= goal)  return { outputs: [], error: "You've already reached or exceeded your goal!" };

    const remaining = goal - current;

    let monthlyContribution: number;
    let futureValueOfCurrent: number;

    if (annualRate === 0) {
      // Simple division — no interest
      monthlyContribution   = remaining / totalMonths;
      futureValueOfCurrent  = current;
    } else {
      const monthlyRate = annualRate / 100 / 12;

      // Future value of current lump sum compounding monthly
      // (approximate for non-monthly compound: use effective monthly rate)
      const effectiveMonthlyRate =
        n === 12
          ? annualRate / 100 / 12
          : Math.pow(1 + annualRate / 100 / n, n / 12) - 1;

      futureValueOfCurrent = current * Math.pow(1 + effectiveMonthlyRate, totalMonths);
      const stillNeeded    = goal - futureValueOfCurrent;

      if (stillNeeded <= 0) {
        // Current savings alone will compound to the goal — no contributions needed
        const monthsNeeded = Math.ceil(
          Math.log(goal / current) / Math.log(1 + effectiveMonthlyRate)
        );
        return {
          outputs: [
            {
              key: "monthlyContribution",
              label: "Monthly Contribution Needed",
              value: 0,
              format: "currency",
              highlight: true,
              helpText: "Your existing savings will grow to your goal on their own!",
            },
            {
              key: "fvCurrent",
              label: `Your $${current.toLocaleString()} Grows To`,
              value: futureValueOfCurrent,
              format: "currency",
            },
            {
              key: "monthsNeeded",
              label: "Months Until Goal Reached (no new deposits)",
              value: monthsNeeded,
              format: "number",
            },
          ],
        };
      }

      // Future value of an ordinary annuity (end-of-period contributions)
      // FV = PMT × [(1+r)^n − 1] / r  →  PMT = FV × r / [(1+r)^n − 1]
      monthlyContribution =
        stillNeeded * effectiveMonthlyRate /
        (Math.pow(1 + effectiveMonthlyRate, totalMonths) - 1);
    }

    const totalContributions = current + monthlyContribution * totalMonths;
    const interestEarned     = goal - totalContributions;
    const weeklyContribution = monthlyContribution * 12 / 52;
    const dailyContribution  = monthlyContribution * 12 / 365;
    const progressPct        = (current / goal) * 100;

    return {
      outputs: [
        {
          key: "monthlyContribution",
          label: "Monthly Savings Needed",
          value: monthlyContribution,
          format: "currency",
          highlight: true,
          helpText: `Over ${totalMonths} month${totalMonths !== 1 ? "s" : ""} to reach $${goal.toLocaleString()}`,
        },
        {
          key: "weeklyContribution",
          label: "Equivalent Weekly Amount",
          value: weeklyContribution,
          format: "currency",
          helpText: "If you prefer weekly saving",
        },
        {
          key: "dailyContribution",
          label: "Equivalent Daily Amount",
          value: dailyContribution,
          format: "currency",
          helpText: "Useful for daily budgeting",
        },
        {
          key: "totalContributions",
          label: "Total Money You Put In",
          value: totalContributions,
          format: "currency",
        },
        {
          key: "interestEarned",
          label: "Interest / Growth Earned",
          value: interestEarned > 0 ? interestEarned : 0,
          format: "currency",
          helpText: annualRate > 0 ? `At ${annualRate}% annual return` : "No interest applied",
        },
        {
          key: "progressPct",
          label: "Already Saved",
          value: progressPct,
          format: "percentage",
          helpText: `$${current.toLocaleString()} of $${goal.toLocaleString()} goal`,
        },
      ],
    };
  },

  howItWorks: `First, the future value of your current savings is calculated: FV = Current × (1 + r)^n, where r is the effective monthly rate and n is the number of months. The gap between that future value and your goal is what contributions must cover. The required monthly contribution uses the future-value-of-annuity formula rearranged: PMT = FV_needed × r / [(1 + r)^n − 1]. With zero interest, it simplifies to: Monthly = (Goal − Current) ÷ Months. Weekly and daily equivalents are derived by multiplying monthly × 12 ÷ 52 and × 12 ÷ 365 respectively.`,

  examples: [
    {
      title: "$20,000 Down Payment in 3 Years — Starting with $2,000",
      description:
        "A common goal: saving for a home down payment with some existing savings and a high-yield savings account.",
      inputs: {
        goalAmount: 20000,
        currentSavings: 2000,
        years: 3,
        months: 0,
        annualReturnRate: 4.5,
        compoundFreq: "12",
      },
      result:
        "~$472/month needed. Over 36 months you'd contribute ~$19,000 total, with ~$950 in interest earned.",
    },
    {
      title: "$10,000 Emergency Fund in 18 Months — Starting from Zero",
      description:
        "Building a fully-funded 6-month emergency fund from scratch at a standard HYSA rate.",
      inputs: {
        goalAmount: 10000,
        currentSavings: 0,
        years: 1,
        months: 6,
        annualReturnRate: 4.8,
        compoundFreq: "365",
      },
      result:
        "~$527/month needed. Interest earned reduces the total you actually need to deposit by ~$370.",
    },
  ],

  faqs: [
    {
      question: "What interest rate should I use for my savings account?",
      answer:
        "Use 0% for a basic checking or zero-yield account. High-yield savings accounts (HYSAs) typically offer 4–5% APY as of 2024–2025. CDs might offer 4.5–5.5% for fixed terms. Index fund or brokerage accounts historically average 7–10% annually, though with much higher variance. Match the rate to where the money will actually live.",
    },
    {
      question: "What is compounding frequency and does it matter?",
      answer:
        "Compounding frequency is how often earned interest is added back to your balance and begins earning interest itself. Daily compounding (common in HYSAs) earns very slightly more than monthly, which earns more than annually. For typical savings rates (4–5%), the difference between daily and monthly compounding over 3 years is less than $50 on a $20,000 goal — meaningful but not dramatic.",
    },
    {
      question: "What if I can't afford the monthly amount shown?",
      answer:
        "Try extending the deadline (more months = smaller monthly target), increasing the expected return rate if you can invest more aggressively, or breaking the goal into a smaller first milestone. The daily equivalent shown can also help — sometimes '$17/day' feels more achievable than '$520/month' for budgeting purposes.",
    },
    {
      question: "Does this calculator account for taxes on interest?",
      answer:
        "No — the calculator shows pre-tax growth. Interest earned in a standard savings account is taxable as ordinary income. To approximate after-tax returns, reduce the rate by your marginal tax rate. For example, if you're in the 22% bracket and earn 5% APY, enter roughly 3.9% (5% × 0.78) as the effective after-tax rate.",
    },
  ],

  relatedSlugs: [
    "compound-interest-calculator",
    "inflation-calculator",
    "loan-affordability-calculator",
  ],
};

export default def;
