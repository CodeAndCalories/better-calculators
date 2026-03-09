import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "net-worth-calculator",
  title: "Net Worth Calculator",
  description: "Calculate your net worth by subtracting your total liabilities from your total assets.",
  longDescription: "Net worth is one of the most important measures of financial health. Enter your assets (what you own) and liabilities (what you owe) to see your current net worth and asset-to-debt ratio.",
  category: "finance",
  keywords: ["net worth calculator", "assets vs liabilities", "personal net worth", "financial health"],
  inputs: [
    { type: "number", key: "cash", label: "Cash & Savings ($)", defaultValue: 10000, min: 0, step: 500, prefix: "$" },
    { type: "number", key: "investments", label: "Investments & Retirement ($)", defaultValue: 30000, min: 0, step: 1000, prefix: "$" },
    { type: "number", key: "homeValue", label: "Home / Real Estate Value ($)", defaultValue: 250000, min: 0, step: 1000, prefix: "$" },
    { type: "number", key: "otherAssets", label: "Other Assets (car, etc.) ($)", defaultValue: 15000, min: 0, step: 500, prefix: "$" },
    { type: "number", key: "mortgage", label: "Mortgage Balance ($)", defaultValue: 200000, min: 0, step: 1000, prefix: "$" },
    { type: "number", key: "otherDebt", label: "Other Debt (loans, cards) ($)", defaultValue: 8000, min: 0, step: 500, prefix: "$" },
  ],
  compute(values: InputValues): ComputeResult {
    const cash = Number(values.cash);
    const investments = Number(values.investments);
    const homeValue = Number(values.homeValue);
    const otherAssets = Number(values.otherAssets);
    const mortgage = Number(values.mortgage);
    const otherDebt = Number(values.otherDebt);
    if ([cash, investments, homeValue, otherAssets, mortgage, otherDebt].some(isNaN)) {
      return { outputs: [], error: "Please enter valid numbers for all fields." };
    }
    const totalAssets = cash + investments + homeValue + otherAssets;
    const totalLiabilities = mortgage + otherDebt;
    const netWorth = totalAssets - totalLiabilities;
    const debtRatio = totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0;
    return {
      outputs: [
        { key: "netWorth", label: "Net Worth", value: Number(netWorth.toFixed(2)), format: "currency", highlight: true },
        { key: "totalAssets", label: "Total Assets", value: Number(totalAssets.toFixed(2)), format: "currency" },
        { key: "totalLiabilities", label: "Total Liabilities", value: Number(totalLiabilities.toFixed(2)), format: "currency" },
        { key: "debtRatio", label: "Debt-to-Asset Ratio", value: Number(debtRatio.toFixed(1)), format: "percentage" },
      ],
    };
  },
  howItWorks: "Net Worth = Total Assets − Total Liabilities. Debt-to-asset ratio = (liabilities ÷ assets) × 100. A ratio below 50% is generally considered healthy.",
  examples: [
    {
      title: "Typical homeowner",
      description: "$305k in assets, $208k in debt.",
      inputs: { cash: 10000, investments: 30000, homeValue: 250000, otherAssets: 15000, mortgage: 200000, otherDebt: 8000 },
      result: "Net worth $97,000. Debt-to-asset ratio 68%.",
    },
  ],
  faqs: [
    { question: "Is a negative net worth bad?", answer: "A negative net worth (more debt than assets) is common early in adulthood. The trend matters most — is it improving each year?" },
    { question: "Should I include my car as an asset?", answer: "Yes, at its current market value (not purchase price). Cars depreciate, so use a realistic resale estimate." },
  ],
  relatedSlugs: ["monthly-budget-calculator", "debt-to-income-calculator", "savings-interest-calculator"],
};

export default def;
