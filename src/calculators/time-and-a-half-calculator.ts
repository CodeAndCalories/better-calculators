// filename: time-and-a-half-calculator.ts
import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "time-and-a-half-calculator",
  title: "Time and a Half Calculator",
  description: "Calculate your overtime pay using the standard time and a half rate.",
  longDescription: "Time and a half is the standard premium rate paid to employees who work overtime. This calculator determines your elevated hourly rate and computes the total extra pay earned during those overtime hours.",
  category: "finance",
  keywords:["time and a half calculator", "overtime calculator", "time and a half pay", "overtime pay"],
  inputs:[
    { type: "number", key: "hourlyRate", label: "Regular Hourly Rate ($)", defaultValue: 20, min: 0 },
    { type: "number", key: "overtimeHours", label: "Overtime Hours Worked", defaultValue: 5, min: 0 }
  ],
  compute(values: InputValues): ComputeResult {
    const hourlyRate = Number(values.hourlyRate);
    const overtimeHours = Number(values.overtimeHours);

    if (isNaN(hourlyRate) || isNaN(overtimeHours)) {
      return { outputs:[], error: "Please enter valid numeric values for hourly rate and hours." };
    }
    if (hourlyRate < 0 || overtimeHours < 0) {
      return { outputs:[], error: "Hourly rate and overtime hours cannot be negative." };
    }

    const overtimeRate = hourlyRate * 1.5;
    const overtimePay = overtimeRate * overtimeHours;

    return {
      outputs:[
        { key: "overtimePay", label: "Total Overtime Pay Earned", value: Number(overtimePay.toFixed(2)), format: "currency", highlight: true },
        { key: "overtimeRate", label: "Time and a Half Hourly Rate", value: Number(overtimeRate.toFixed(2)), format: "currency" },
        { key: "totalPayAtOvertime", label: "Gross Pay (Overtime portion only)", value: Number(overtimePay.toFixed(2)), format: "currency" }
      ]
    };
  },
  howItWorks: "The calculator multiplies your regular hourly wage by 1.5 to establish your 'time and a half' overtime rate. It then multiplies this new rate by the number of overtime hours you worked to determine your overtime pay.",
  examples:[
    {
      title: "Standard wage overtime",
      description: "Earning $20/hr and working 8 overtime hours.",
      inputs: { hourlyRate: 20, overtimeHours: 8 },
      result: "Your overtime rate is $30.00/hr, earning you $240.00 in overtime pay."
    },
    {
      title: "Minimum wage overtime",
      description: "Earning $15/hr and working 10 overtime hours.",
      inputs: { hourlyRate: 15, overtimeHours: 10 },
      result: "Your overtime rate is $22.50/hr, earning you $225.00 in overtime pay."
    },
    {
      title: "Small overtime increment",
      description: "Earning $25/hr and working just 2.5 overtime hours.",
      inputs: { hourlyRate: 25, overtimeHours: 2.5 },
      result: "Your overtime rate is $37.50/hr, earning you $93.75 in overtime pay."
    }
  ],
  faqs:[
    { question: "What does 'time and a half' mean?", answer: "It means you are paid 1.5 times your normal hourly rate. It is the legally required overtime rate in the U.S. for hours worked beyond 40 in a workweek for non-exempt employees." },
    { question: "Does this calculator include my regular 40-hour pay?", answer: "No, this specific calculator only determines the earnings made during your extra overtime hours." },
    { question: "Is salaried pay eligible for time and a half?", answer: "It depends. Some salaried workers are 'exempt' from overtime laws, while 'non-exempt' salaried workers must still be paid overtime." },
    { question: "Can taxes affect my overtime pay?", answer: "Yes, overtime pay is considered regular income and is subject to standard tax withholdings, which may feel higher if the extra pay pushes you into a different withholding bracket for that paycheck." }
  ],
  relatedSlugs:["minutes-to-decimal-hours-calculator", "decimal-hours-to-minutes-calculator"]
};

export default def;