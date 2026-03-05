import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "overtime-pay-calculator",
  title: "Overtime Pay Calculator",
  shortTitle: "Overtime Pay",
  description: "Calculate your total paycheck including standard wages and overtime pay.",
  longDescription:
    "Determine how much you'll earn when working extra hours. This calculator computes your regular pay, overtime pay, and gross total pay based on your hourly rate, regular hours worked, and your specific overtime multiplier (like time-and-a-half or double-time).",
  category: "finance",
  keywords:["overtime pay calculator", "time and a half", "double time", "wage calculator", "paycheck calculator"],
  inputs:[
    {
      type: "number",
      key: "hourlyRate",
      label: "Hourly Rate",
      defaultValue: 20,
      min: 0,
      step: 0.5,
      placeholder: "20.00"
    },
    {
      type: "number",
      key: "regularHours",
      label: "Regular Hours",
      defaultValue: 40,
      min: 0,
      step: 1,
      placeholder: "40"
    },
    {
      type: "number",
      key: "overtimeHours",
      label: "Overtime Hours",
      defaultValue: 5,
      min: 0,
      step: 1,
      placeholder: "5"
    },
    {
      type: "select",
      key: "overtimeMultiplier",
      label: "Overtime Rate Multiplier",
      defaultValue: "1.5",
      options:[
        { label: "Time and a Half (1.5x)", value: "1.5" },
        { label: "Double Time (2.0x)", value: "2.0" },
        { label: "Holiday/Triple Time (3.0x)", value: "3.0" }
      ]
    }
  ],

  compute(values: InputValues): ComputeResult {
    const hourlyRate = Number(values.hourlyRate);
    const regularHours = Number(values.regularHours);
    const overtimeHours = Number(values.overtimeHours);
    const overtimeMultiplier = Number(values.overtimeMultiplier);

    if (isNaN(hourlyRate) || isNaN(regularHours) || isNaN(overtimeHours) || isNaN(overtimeMultiplier)) {
      return {
        outputs:[
          { key: "error", label: "Result", value: "Please enter valid numeric inputs.", format: "text", highlight: true },
        ],
      };
    }

    if (hourlyRate < 0 || regularHours < 0 || overtimeHours < 0) {
      return {
        outputs:[
          { key: "error", label: "Result", value: "Hours and rates cannot be negative.", format: "text", highlight: true },
        ],
      };
    }

    const regularPay = hourlyRate * regularHours;
    const overtimePay = (hourlyRate * overtimeMultiplier) * overtimeHours;
    const totalPay = regularPay + overtimePay;

    return {
      outputs:[
        { key: "totalPay", label: "Gross Total Pay", value: totalPay.toFixed(2), format: "currency", highlight: true },
        { key: "regularPay", label: "Regular Pay", value: regularPay.toFixed(2), format: "currency" },
        { key: "overtimePay", label: "Overtime Pay", value: overtimePay.toFixed(2), format: "currency" },
        { key: "effectiveRate", label: "Overtime Hourly Rate", value: (hourlyRate * overtimeMultiplier).toFixed(2), format: "currency" }
      ],
    };
  },

  howItWorks:
    "First, we calculate standard pay by multiplying your regular hours by your hourly rate. Next, we determine the overtime rate by multiplying your base rate by the overtime multiplier. We then multiply this higher rate by your overtime hours and add both totals together for your gross pay.",

  examples:[
    {
      title: "Standard Time and a Half",
      description: "Working 40 regular hours and 10 overtime hours at $25/hr.",
      inputs: { hourlyRate: 25, regularHours: 40, overtimeHours: 10, overtimeMultiplier: "1.5" },
      result: "Yields $1,000 in regular pay and $375 in overtime pay for a total of $1,375."
    },
    {
      title: "Double Time Shift",
      description: "Working a 40-hour week plus an 8-hour Sunday shift at double time for $18/hr.",
      inputs: { hourlyRate: 18, regularHours: 40, overtimeHours: 8, overtimeMultiplier: "2.0" },
      result: "Yields $720 in regular pay and $288 in overtime pay for a total of $1,008."
    }
  ],

  faqs:[
    {
      question: "What is the standard overtime rate?",
      answer: "In the U.S., the Fair Labor Standards Act (FLSA) requires overtime pay to be at least 1.5 times the regular rate of pay (time-and-a-half) for hours worked over 40 in a workweek."
    },
    {
      question: "Is overtime pay taxed differently?",
      answer: "Overtime pay is subject to the same standard income tax rates as regular pay, though receiving a larger paycheck might temporarily bump those specific earnings into a higher withholding bracket."
    },
    {
      question: "When do you get paid double time?",
      answer: "Double time is not mandated by federal law. It is usually determined by an employer's policy, a union contract, or specific state laws (like in California for excessive hours worked)."
    }
  ],

  relatedSlugs:[
    "commission-calculator"
  ]
};

export default def;