import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "rent-vs-buy-calculator",
  title: "Rent vs Buy Calculator",
  shortTitle: "Rent vs Buy",
  description: "Compare the total 5-year cost of renting versus buying a home.",
  longDescription:
    "Deciding whether to rent or buy is one of the biggest financial decisions most people make. This calculator estimates your total out-of-pocket cost over 5 years for both options — accounting for mortgage payments, down payment opportunity cost, maintenance, equity built, and rent increases — so you can make a more informed comparison.",
  category: "finance",
  keywords: ["rent vs buy calculator", "should I rent or buy", "renting vs buying a home", "home buying cost calculator", "mortgage vs rent"],
  inputs: [
    {
      type: "number",
      key: "homePrice",
      label: "Home Purchase Price ($)",
      defaultValue: 400000,
      min: 10000,
      step: 5000,
      placeholder: "400000",
    },
    {
      type: "number",
      key: "downPaymentPct",
      label: "Down Payment (%)",
      defaultValue: 20,
      min: 3,
      max: 100,
      step: 0.5,
      placeholder: "20",
    },
    {
      type: "number",
      key: "mortgageRate",
      label: "Mortgage Interest Rate (%)",
      defaultValue: 7,
      min: 0.1,
      max: 20,
      step: 0.1,
      placeholder: "7",
    },
    {
      type: "number",
      key: "monthlyRent",
      label: "Current Monthly Rent ($)",
      defaultValue: 2000,
      min: 1,
      step: 50,
      placeholder: "2000",
    },
    {
      type: "number",
      key: "annualRentIncrease",
      label: "Annual Rent Increase (%)",
      defaultValue: 3,
      min: 0,
      max: 20,
      step: 0.5,
      placeholder: "3",
    },
    {
      type: "number",
      key: "homeAppreciation",
      label: "Annual Home Appreciation (%)",
      defaultValue: 4,
      min: 0,
      max: 20,
      step: 0.5,
      placeholder: "4",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const homePrice = Number(values.homePrice);
    const downPaymentPct = Number(values.downPaymentPct);
    const mortgageRate = Number(values.mortgageRate);
    const monthlyRent = Number(values.monthlyRent);
    const annualRentIncrease = Number(values.annualRentIncrease);
    const homeAppreciation = Number(values.homeAppreciation);

    if (
      !Number.isFinite(homePrice) || !Number.isFinite(downPaymentPct) ||
      !Number.isFinite(mortgageRate) || !Number.isFinite(monthlyRent) ||
      !Number.isFinite(annualRentIncrease) || !Number.isFinite(homeAppreciation) ||
      homePrice <= 0 || monthlyRent <= 0 || mortgageRate <= 0
    ) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const years = 5;
    const downPayment = homePrice * (downPaymentPct / 100);
    const loanAmount = homePrice - downPayment;
    const r = mortgageRate / 100 / 12;
    const n = 30 * 12; // 30-year mortgage

    // Monthly mortgage payment (P&I only)
    const monthlyMortgage = loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    // --- BUYING COSTS over 5 years ---
    // Upfront: down payment + closing costs (~3%)
    const closingCosts = homePrice * 0.03;
    const upfrontBuying = downPayment + closingCosts;

    // Mortgage payments over 5 years
    const totalMortgagePayments = monthlyMortgage * years * 12;

    // Principal paid after 5 years (equity from payments)
    let balance = loanAmount;
    let totalInterestPaid = 0;
    for (let i = 0; i < years * 12; i++) {
      const interestThisMonth = balance * r;
      totalInterestPaid += interestThisMonth;
      balance -= (monthlyMortgage - interestThisMonth);
    }
    const principalPaid = loanAmount - balance;

    // Annual maintenance ~1% of home value
    const maintenanceCost = homePrice * 0.01 * years;

    // Property tax ~1.2% per year
    const propertyTax = homePrice * 0.012 * years;

    // Home value after 5 years
    const homeValueAfter5 = homePrice * Math.pow(1 + homeAppreciation / 100, years);
    const appreciationGain = homeValueAfter5 - homePrice;

    // Net cost of buying = upfront + mortgage payments + maintenance + taxes - equity gained - appreciation
    const equityGained = principalPaid + appreciationGain;
    const netBuyingCost = upfrontBuying + totalMortgagePayments + maintenanceCost + propertyTax - equityGained;

    // --- RENTING COSTS over 5 years ---
    let totalRentPaid = 0;
    let currentRent = monthlyRent;
    for (let yr = 0; yr < years; yr++) {
      totalRentPaid += currentRent * 12;
      currentRent *= (1 + annualRentIncrease / 100);
    }

    // Opportunity cost of down payment (at 6% investment return)
    const opportunityReturn = 0.06;
    const downPaymentOpportunityCost = downPayment * (Math.pow(1 + opportunityReturn, years) - 1);

    const netRentingCost = totalRentPaid + downPaymentOpportunityCost;

    const difference = Math.abs(netBuyingCost - netRentingCost);
    const verdict = netBuyingCost < netRentingCost
      ? "Buying is cheaper over 5 years"
      : "Renting is cheaper over 5 years";

    return {
      outputs: [
        { key: "verdict", label: "5-Year Verdict", value: verdict, format: "text", highlight: true },
        { key: "netBuyingCost", label: "Net Cost of Buying (5 yr)", value: Math.round(netBuyingCost), format: "currency" },
        { key: "netRentingCost", label: "Net Cost of Renting (5 yr)", value: Math.round(netRentingCost), format: "currency" },
        { key: "difference", label: "Difference", value: Math.round(difference), format: "currency" },
        { key: "monthlyMortgage", label: "Monthly Mortgage Payment (P&I)", value: Math.round(monthlyMortgage * 100) / 100, format: "currency" },
        { key: "equityBuilt", label: "Equity Built After 5 Years", value: Math.round(equityGained), format: "currency" },
      ],
    };
  },

  howItWorks: `Buying net cost = down payment + closing costs (3%) + 5 years of mortgage payments + maintenance (1%/yr) + property tax (1.2%/yr) − equity gained (principal repaid + home appreciation). Renting net cost = 5 years of rent payments (growing at your annual increase rate) + opportunity cost of the down payment invested at 6%/yr. The comparison is a simplification — it does not include PMI, HOA fees, insurance, or selling costs.`,

  examples: [
    {
      title: "$400k home, 20% down, 7% mortgage, $2,000/month rent",
      description: "A common scenario in a mid-cost city.",
      inputs: { homePrice: 400000, downPaymentPct: 20, mortgageRate: 7, monthlyRent: 2000, annualRentIncrease: 3, homeAppreciation: 4 },
      result: "Results depend heavily on appreciation assumptions — try adjusting the rate.",
    },
  ],

  faqs: [
    {
      question: "Why is the 5-year timeframe used?",
      answer: "Five years is a common rule of thumb for the minimum holding period to recoup buying transaction costs. Shorter periods typically favour renting; longer periods often favour buying.",
    },
    {
      question: "What is opportunity cost of the down payment?",
      answer: "If you didn't buy, your down payment could be invested. This calculator assumes a 6% annual return on that capital as the renting opportunity cost.",
    },
    {
      question: "Does this include PMI?",
      answer: "No. If your down payment is below 20%, add ~0.5–1% of the loan amount per year to the buying costs for a more accurate picture.",
    },
  ],

  relatedSlugs: ["down-payment-calculator", "car-loan-calculator", "loan-interest-calculator", "savings-goal-calculator"],
};

export default def;
