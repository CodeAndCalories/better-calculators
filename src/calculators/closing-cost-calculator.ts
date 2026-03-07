import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "closing-cost-calculator",
  title: "Closing Cost Calculator",
  shortTitle: "Closing Costs",
  description: "Estimate the closing costs when buying a home based on purchase price and loan amount.",
  longDescription:
    "Closing costs are the fees and charges paid at the end of a real estate transaction. They typically total 2–5% of the purchase price and catch many first-time buyers off guard. This calculator breaks down the major components — lender fees, title and escrow, prepaid items, and government charges — to give you a realistic cash-to-close estimate.",
  category: "finance",
  keywords: ["closing cost calculator", "home buying closing costs", "mortgage closing costs", "cash to close calculator", "real estate closing fees"],
  inputs: [
    {
      type: "number",
      key: "purchasePrice",
      label: "Purchase Price ($)",
      defaultValue: 350000,
      min: 10000,
      step: 5000,
      placeholder: "350000",
    },
    {
      type: "number",
      key: "downPaymentPct",
      label: "Down Payment (%)",
      defaultValue: 20,
      min: 0,
      max: 100,
      step: 0.5,
      placeholder: "20",
    },
    {
      type: "select",
      key: "state",
      label: "Transfer Tax Rate",
      defaultValue: "average",
      options: [
        { label: "None (no transfer tax state)", value: "0" },
        { label: "Low (~0.1%)", value: "0.001" },
        { label: "Average (~0.5%)", value: "0.005" },
        { label: "High (~1.5%)", value: "0.015" },
      ],
    },
  ],

  compute(values: InputValues): ComputeResult {
    const price = Number(values.purchasePrice);
    const downPct = Number(values.downPaymentPct);
    const transferTaxRate = Number(values.state);

    if (
      !Number.isFinite(price) || !Number.isFinite(downPct) || !Number.isFinite(transferTaxRate) ||
      price <= 0 || downPct < 0 || downPct >= 100
    ) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const loanAmount = price * (1 - downPct / 100);

    // Lender fees: origination (~1% of loan), appraisal, credit report
    const originationFee = loanAmount * 0.01;
    const appraisalFee = 500;
    const creditReportFee = 30;
    const lenderFees = originationFee + appraisalFee + creditReportFee;

    // Title & escrow
    const titleInsurance = price * 0.005;
    const escrowFee = price * 0.002;
    const titleAndEscrow = titleInsurance + escrowFee;

    // Prepaid items: 3 months property tax + 2 months homeowners insurance
    const prepaidPropertyTax = (price * 0.012) / 12 * 3;
    const prepaidInsurance = 150 * 2;
    const prepaids = prepaidPropertyTax + prepaidInsurance;

    // Government charges: recording + transfer tax
    const recordingFee = 150;
    const transferTax = price * transferTaxRate;
    const govCharges = recordingFee + transferTax;

    const totalClosingCosts = lenderFees + titleAndEscrow + prepaids + govCharges;
    const closingCostPct = (totalClosingCosts / price) * 100;

    return {
      outputs: [
        { key: "total", label: "Estimated Total Closing Costs", value: Math.round(totalClosingCosts), format: "currency", highlight: true },
        { key: "pct", label: "As % of Purchase Price", value: Math.round(closingCostPct * 10) / 10, format: "number" },
        { key: "lenderFees", label: "Lender Fees", value: Math.round(lenderFees), format: "currency" },
        { key: "titleEscrow", label: "Title & Escrow", value: Math.round(titleAndEscrow), format: "currency" },
        { key: "prepaids", label: "Prepaid Items", value: Math.round(prepaids), format: "currency" },
        { key: "govCharges", label: "Government Charges", value: Math.round(govCharges), format: "currency" },
      ],
    };
  },

  howItWorks: `Estimates closing costs across four categories: Lender fees (origination ~1% of loan + appraisal $500 + credit report $30). Title & escrow (~0.5% + 0.2% of price). Prepaids (3 months property tax at 1.2%/yr + 2 months insurance at $150/mo). Government charges ($150 recording fee + transfer tax). These are national averages — actual costs vary by lender, location, and transaction.`,

  examples: [
    {
      title: "$350,000 home, 20% down, average transfer tax",
      description: "A typical first home purchase.",
      inputs: { purchasePrice: 350000, downPaymentPct: 20, state: "0.005" },
      result: "Estimated closing costs ~$10,000–$14,000 (3–4% of price).",
    },
  ],

  faqs: [
    {
      question: "Can I roll closing costs into my mortgage?",
      answer: "Some lenders offer 'no-closing-cost' mortgages where costs are added to the loan balance or covered via a higher interest rate. This reduces upfront cash but increases long-term cost.",
    },
    {
      question: "Are closing costs negotiable?",
      answer: "Some fees are fixed (government recording, transfer tax), but lender fees, title, and escrow fees can often be negotiated or shopped. Always compare Loan Estimates from multiple lenders.",
    },
  ],

  relatedSlugs: ["down-payment-calculator", "rent-vs-buy-calculator", "loan-interest-calculator", "car-loan-calculator"],
};

export default def;
