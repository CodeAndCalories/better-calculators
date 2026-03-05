import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "commission-calculator",
  title: "Commission Calculator",
  shortTitle: "Commission",
  description: "Calculate your sales commission and total compensation based on a percentage of sales.",
  longDescription:
    "Whether you work in real estate, automotive sales, or software, understanding your commission earnings is crucial. This calculator takes your total sales amount, your commission percentage, and any base salary you receive to determine your exact earnings.",
  category: "finance",
  keywords:["commission calculator", "sales commission", "earnings calculator", "gross pay", "sales earnings"],
  inputs:[
    {
      type: "number",
      key: "salesAmount",
      label: "Total Sales Amount",
      defaultValue: 50000,
      min: 0,
      step: 100,
      placeholder: "50000"
    },
    {
      type: "number",
      key: "commissionRate",
      label: "Commission Rate (%)",
      defaultValue: 5,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: "5"
    },
    {
      type: "number",
      key: "baseSalary",
      label: "Base Salary (Optional)",
      defaultValue: 0,
      min: 0,
      step: 100,
      placeholder: "0"
    }
  ],

  compute(values: InputValues): ComputeResult {
    const salesAmount = Number(values.salesAmount);
    const commissionRate = Number(values.commissionRate);
    const baseSalary = Number(values.baseSalary) || 0;

    if (isNaN(salesAmount) || isNaN(commissionRate) || salesAmount < 0 || commissionRate < 0) {
      return {
        outputs:[
          { key: "error", label: "Result", value: "Please enter valid positive numbers.", format: "text", highlight: true },
        ],
      };
    }

    const commissionEarned = salesAmount * (commissionRate / 100);
    const totalCompensation = baseSalary + commissionEarned;

    return {
      outputs:[
        { key: "totalCompensation", label: "Total Compensation", value: totalCompensation.toFixed(2), format: "currency", highlight: true },
        { key: "commissionEarned", label: "Commission Earned", value: commissionEarned.toFixed(2), format: "currency" },
        { key: "baseSalary", label: "Base Salary", value: baseSalary.toFixed(2), format: "currency" }
      ],
    };
  },

  howItWorks:
    "The calculator converts your commission percentage into a decimal and multiplies it by your total sales amount to find the commission earned. If you provide a base salary, it adds that to the commission to calculate your gross total compensation.",

  examples:[
    {
      title: "Real Estate Sale",
      description: "Selling a $400,000 house with a 3% agent commission.",
      inputs: { salesAmount: 400000, commissionRate: 3, baseSalary: 0 },
      result: "Calculates exactly $12,000 in commission earned."
    },
    {
      title: "Retail with Base Pay",
      description: "A base salary of $2,000 plus a 5% commission on $10,000 of merchandise sold.",
      inputs: { salesAmount: 10000, commissionRate: 5, baseSalary: 2000 },
      result: "Shows $500 in commission for a total monthly compensation of $2,500."
    }
  ],

  faqs:[
    {
      question: "Are commission earnings taxed?",
      answer: "Yes, in the United States, commission earnings are considered supplemental income and are subject to federal and state income taxes."
    },
    {
      question: "Can I use this for tiered commissions?",
      answer: "This calculator uses a single, flat percentage rate. For tiered structures, you must calculate each bracket separately and add them together."
    },
    {
      question: "What is base plus commission?",
      answer: "A compensation model where an employee receives a guaranteed fixed salary (base) in addition to a percentage of the sales they generate (commission)."
    }
  ],

  relatedSlugs:[
    "overtime-pay-calculator",
    "profit-margin-calculator",
    "markup-calculator"
  ]
};

export default def;