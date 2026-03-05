// filename: minutes-to-decimal-hours-calculator.ts
import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "minutes-to-decimal-hours-calculator",
  title: "Minutes to Decimal Hours Calculator",
  description: "Convert time measured in minutes into a decimal hour format for payroll and billing.",
  longDescription: "When tracking time for payroll or freelance billing, time is usually required in a decimal format (like 1.5 hours) rather than raw minutes (like 90 minutes). This calculator instantly converts total minutes into accurate decimal hours.",
  category: "life",
  keywords:["minutes to decimal", "minutes to hours", "time conversion", "decimal hours", "payroll hours converter"],
  inputs:[
    { type: "number", key: "minutes", label: "Total Minutes", defaultValue: 45, min: 0 }
  ],
  compute(values: InputValues): ComputeResult {
    const minutes = Number(values.minutes);

    if (isNaN(minutes)) {
      return { outputs:[], error: "Please enter a valid number of minutes." };
    }
    if (minutes < 0) {
      return { outputs:[], error: "Minutes cannot be negative." };
    }

    const decimalHours = minutes / 60;
    
    const wholeHours = Math.floor(minutes / 60);
    const remainingMinutes = Math.round(minutes % 60);
    const hoursAndMinutesText = `${wholeHours} hour(s) and ${remainingMinutes} minute(s)`;

    return {
      outputs:[
        { key: "decimalHours", label: "Decimal Hours", value: Number(decimalHours.toFixed(4)), format: "number", highlight: true },
        { key: "hoursAndMinutes", label: "Standard Time Equivalent", value: hoursAndMinutesText, format: "text" }
      ]
    };
  },
  howItWorks: "Because there are 60 minutes in an hour, the calculator divides the total number of minutes by 60 to give you the decimal equivalent. It also calculates the remaining minutes using modulo math to show the standard hours and minutes format.",
  examples:[
    {
      title: "Converting 45 minutes",
      description: "You worked for 45 minutes.",
      inputs: { minutes: 45 },
      result: "45 minutes is equal to 0.75 decimal hours."
    },
    {
      title: "Converting over an hour",
      description: "You logged 90 minutes on a project.",
      inputs: { minutes: 90 },
      result: "90 minutes is equal to 1.5 decimal hours (1 hour and 30 minutes)."
    },
    {
      title: "Odd minutes conversion",
      description: "Converting exactly 100 minutes.",
      inputs: { minutes: 100 },
      result: "100 minutes is equal to 1.6667 decimal hours (1 hour and 40 minutes)."
    }
  ],
  faqs:[
    { question: "Why do I need to convert minutes to decimal hours?", answer: "Accounting software and payroll systems typically multiply hourly wages by a decimal number. You cannot multiply a $20 hourly rate by 45 minutes without converting it to 0.75 hours first." },
    { question: "How do I convert minutes to decimal manually?", answer: "Divide the number of minutes by 60. For example, 30 minutes / 60 = 0.5 hours." },
    { question: "Is 1.5 hours the same as 1 hour and 50 minutes?", answer: "No! 1.5 hours is 1 hour and 30 minutes. This is a common payroll error. Decimal hours are out of 100, while minutes are out of 60." },
    { question: "What is 15 minutes as a decimal?", answer: "15 minutes divided by 60 equals 0.25 decimal hours." }
  ],
  relatedSlugs:["decimal-hours-to-minutes-calculator", "time-and-a-half-calculator"]
};

export default def;