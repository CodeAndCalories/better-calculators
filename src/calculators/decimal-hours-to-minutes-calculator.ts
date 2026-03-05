// filename: decimal-hours-to-minutes-calculator.ts
import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "decimal-hours-to-minutes-calculator",
  title: "Decimal Hours to Minutes Calculator",
  description: "Convert a decimal hour format back into standard hours and total minutes.",
  longDescription: "If your timesheet says you worked 2.75 hours, you might wonder exactly how many minutes that is. This calculator easily reverses decimal time formats back into total minutes and standard hours/minutes.",
  category: "life",
  keywords: ["decimal to minutes", "hours to minutes", "decimal hours converter", "time converter"],
  inputs:[
    { type: "number", key: "decimalHours", label: "Decimal Hours", defaultValue: 2.75, min: 0 }
  ],
  compute(values: InputValues): ComputeResult {
    const decimalHours = Number(values.decimalHours);

    if (isNaN(decimalHours)) {
      return { outputs:[], error: "Please enter a valid decimal number for hours." };
    }
    if (decimalHours < 0) {
      return { outputs:[], error: "Hours cannot be negative." };
    }

    const totalMinutes = decimalHours * 60;
    
    const wholeHours = Math.floor(decimalHours);
    const remainingMinutes = Math.round((decimalHours % 1) * 60);
    const hoursAndMinutesText = `${wholeHours} hour(s) and ${remainingMinutes} minute(s)`;

    return {
      outputs:[
        { key: "totalMinutes", label: "Total Minutes", value: Number(totalMinutes.toFixed(2)), format: "number", highlight: true },
        { key: "hoursAndMinutes", label: "Standard Time Equivalent", value: hoursAndMinutesText, format: "text" }
      ]
    };
  },
  howItWorks: "The calculator multiplies the decimal hours by 60 to find the total minutes. To find the standard format, it separates the whole number (hours) from the decimal portion, and multiplies just the decimal portion by 60 to find the remaining minutes.",
  examples:[
    {
      title: "Common fractional hour",
      description: "Converting 2.75 hours.",
      inputs: { decimalHours: 2.75 },
      result: "2.75 hours equals 165 total minutes, or 2 hours and 45 minutes."
    },
    {
      title: "Small decimal",
      description: "Converting 0.1 hours to see the minute equivalent.",
      inputs: { decimalHours: 0.1 },
      result: "0.1 hours equals exactly 6 minutes."
    },
    {
      title: "Repeating decimal",
      description: "Converting a common third-of-an-hour decimal, 1.3333.",
      inputs: { decimalHours: 1.3333 },
      result: "1.3333 hours equals roughly 80 total minutes, or 1 hour and 20 minutes."
    }
  ],
  faqs:[
    { question: "How do I calculate decimal hours to minutes manually?", answer: "Take the decimal portion of the number and multiply it by 60. For instance, in 1.25 hours, you multiply 0.25 by 60 to get 15 minutes." },
    { question: "Why is 1.5 hours not 1 hour and 50 minutes?", answer: "Because time is based on 60 minutes, not 100. The '.5' means half of an hour, and half of 60 minutes is 30 minutes." },
    { question: "What is 0.5 hours in minutes?", answer: "0.5 multiplied by 60 equals 30 minutes." },
    { question: "What do I do if I get a fractional minute?", answer: "If you end up with fractional minutes (e.g., 45.5 minutes), that extra decimal represents seconds. 0.5 of a minute is 30 seconds." }
  ],
  relatedSlugs:["minutes-to-decimal-hours-calculator", "time-and-a-half-calculator"]
};

export default def;