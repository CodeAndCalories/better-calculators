// net-income-calculator.ts
import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "net-income-calculator",
  title: "Net Income Calculator",
  description: "Calculate your business's bottom-line net income and profit margin.",
  longDescription: "Net Income (or Net Profit) is the famous 'bottom line' of an income statement. It shows exactly how much money a business keeps after paying all expenses, costs of goods, operating expenses, interest, and taxes. This calculator provides a clean view of your business's true profitability.",
  category: "finance",
  keywords:["net income calculator", "net profit calculator", "bottom line calculator", "profit margin", "business income"],
  inputs:[
    { type: "number", key: "totalRevenue", label: "Total Revenue / Sales ($)", defaultValue: 100000, min: 0 },
    { type: "number", key: "costOfGoodsSold", label: "Cost of Goods Sold (COGS) ($)", defaultValue: 30000, min: 0 },
    { type: "number", key: "operatingExpenses", label: "Operating Expenses ($)", defaultValue: 20000, min: 0 },
    { type: "number", key: "interest", label: "Interest Expense ($)", defaultValue: 2000, min: 0 },
    { type: "number", key: "taxes", label: "Taxes ($)", defaultValue: 8000, min: 0 }
  ],
  compute(values: InputValues): ComputeResult {
    const totalRevenue = Number(values.totalRevenue);
    const costOfGoodsSold = Number(values.costOfGoodsSold) || 0;
    const operatingExpenses = Number(values.operatingExpenses) || 0;
    const interest = Number(values.interest) || 0;
    const taxes = Number(values.taxes) || 0;

    if (isNaN(totalRevenue) || isNaN(costOfGoodsSold) || isNaN(operatingExpenses) || isNaN(interest) || isNaN(taxes)) {
      return { outputs:[{ key: "error", label: "Result", value: "Invalid input", format: "text" }] };
    }

    const grossProfit = totalRevenue - costOfGoodsSold;
    const operatingIncome = grossProfit - operatingExpenses;
    const netIncome = operatingIncome - interest - taxes;
    
    let netProfitMargin = 0;
    if (totalRevenue > 0) {
      netProfitMargin = (netIncome / totalRevenue) * 100;
    }

    return {
      outputs:[
        { key: "netIncome", label: "Net Income (Bottom Line)", value: Number(netIncome.toFixed(2)), format: "currency" },
        { key: "netProfitMargin", label: "Net Profit Margin", value: Number(netProfitMargin.toFixed(2)), format: "percentage" },
        { key: "grossProfit", label: "Gross Profit", value: Number(grossProfit.toFixed(2)), format: "currency" },
        { key: "operatingIncome", label: "Operating Income", value: Number(operatingIncome.toFixed(2)), format: "currency" }
      ]
    };
  },
  howItWorks: "The calculator subtracts COGS from Revenue to get Gross Profit. It then deducts everyday Operating Expenses to find Operating Income. Finally, it subtracts Interest and Taxes to reveal your final Net Income, which is also expressed as a margin of your original Revenue.",
  examples:[
    {
      title: "Small Retail Store",
      description: "A store makes $200,000 in sales. COGS is $80k, rent/staff (Operating) is $50k, interest is $5k, and taxes are $15k.",
      inputs: { totalRevenue: 200000, costOfGoodsSold: 80000, operatingExpenses: 50000, interest: 5000, taxes: 15000 },
      result: "Yields a Net Income of $50,000 and a 25% profit margin."
    },
    {
      title: "Service Business",
      description: "A consultancy bills $100,000. No physical goods (COGS = 0). Expenses are $30,000, no interest, and $14,000 in taxes.",
      inputs: { totalRevenue: 100000, costOfGoodsSold: 0, operatingExpenses: 30000, interest: 0, taxes: 14000 },
      result: "Yields a Net Income of $56,000 and a 56% profit margin."
    },
    {
      title: "Business at a Loss",
      description: "A startup earns $50,000, COGS is $20,000, and massive operating expenses of $60,000 with $0 interest and taxes.",
      inputs: { totalRevenue: 50000, costOfGoodsSold: 20000, operatingExpenses: 60000, interest: 0, taxes: 0 },
      result: "Calculates a Net Loss of -$30,000 (-60% margin)."
    }
  ],
  faqs:[
    { question: "What is the difference between Gross Profit and Net Income?", answer: "Gross Profit only subtracts the direct cost of the goods you sold. Net Income subtracts ALL business expenses, including rent, software, interest, and taxes." },
    { question: "What are operating expenses?", answer: "Operating expenses (OPEX) are the day-to-day costs of running the business not tied to producing the product. This includes marketing, rent, legal fees, and administrative salaries." },
    { question: "Is Net Income the same as cash flow?", answer: "No. Net income includes non-cash items like depreciation, and it doesn't account for principal loan payments or inventory purchases that haven't sold yet. A company can have positive net income but negative cash flow." },
    { question: "What is a good Net Profit Margin?", answer: "It varies heavily by industry. A grocery store might operate on a 2% net margin, while a software company might run at a 20% to 30% margin. A 10% average is generally considered healthy across mixed industries." }
  ],
  relatedSlugs: ["break-even-calculator", "roi-calculator"]
};

export default def;