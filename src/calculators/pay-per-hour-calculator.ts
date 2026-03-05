// filename: pay-per-hour-calculator.ts
import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "pay-per-hour-calculator",
  title: "Pay Per Hour Calculator",
  description: "Determine your exact hourly wage based on total earnings and hours worked.",
  longDescription: "If you received a flat payout for a project or want to figure out what your salary breaks down to hourly, this calculator will divide your gross pay by the total hours invested to reveal your true hourly and per-minute earning rate.",
  category: "finance",
  keywords:["pay per hour", "hourly wage calculator", "salary to hourly", "freelance hourly rate"],
  inputs:[
    { type: "number", key: "totalPay", label: "Total Pay / Earnings ($)", defaultValue: 500, min: 0 },
    { type: "number", key: "hoursWorked", label: "Total Hours Worked", defaultValue: 20, min: 0.1 }
  ],
  compute(values: InputValues): ComputeResult {
    const totalPay = Number(values.totalPay);
    const hoursWorked = Number(values.hoursWorked);

    if (isNaN(totalPay) || isNaN(hoursWorked)) {
      return { outputs:[], error: "Please enter valid numeric values for pay and hours." };
    }
    if (hoursWorked <= 0) {
      return { outputs:[], error: "Hours worked must be greater than zero." };
    }

    const hourlyRate = totalPay / hoursWorked;
    const perMinuteRate = hourlyRate / 60;

    return {
      outputs:[
        { key: "hourlyRate", label: "Hourly Rate", value: Number(hourlyRate.toFixed(2)), format: "currency", highlight: true },
        { key: "perMinuteRate", label: "Rate Per Minute", value: Number(perMinuteRate.toFixed(4)), format: "currency" }
      ]
    };
  },
  howItWorks: "The calculator divides your total gross earnings by the total number of hours you spent working. It then takes that hourly rate and divides it by 60 to give you a granular per-minute earning rate.",
  examples:[
    {
      title: "Freelance Project Check",
      description: "You charged a flat rate of $1,000 for a project that took you 35 hours to complete.",
      inputs: { totalPay: 1000, hoursWorked: 35 },
      result: "Your effective hourly rate was $28.57."
    },
    {
      title: "Salary Breakdown",
      description: "A weekly salary paycheck of $1,200 for a standard 40-hour work week.",
      inputs: { totalPay: 1200, hoursWorked: 40 },
      result: "Breaks down to an hourly rate of $30.00."
    },
    {
      title: "Underpaid Gig",
      description: "Getting paid $50 to help a friend move, but it took 8 hours.",
      inputs: { totalPay: 50, hoursWorked: 8 },
      result: "Your rate was a meager $6.25 per hour (or about $0.10 per minute)."
    }
  ],
  faqs:[
    { question: "Is this before or after taxes?", answer: "This depends entirely on what you input as 'Total Pay'. If you enter your gross pay (before taxes), the result is your gross hourly rate. If you enter your net take-home pay, the result is your net hourly rate." },
    { question: "How do I calculate an annual salary to an hourly rate?", answer: "Enter your total annual salary into 'Total Pay'. Then, find your total yearly hours. A standard full-time job (40 hrs/week * 52 weeks) is 2,080 hours." },
    { question: "Why do I need to know my per-minute rate?", answer: "Knowing your per-minute rate is an excellent psychological tool for assessing whether small tasks or distractions are worth the time you spend on them." },
    { question: "What if I worked partial hours?", answer: "You can enter fractions of an hour as decimals. For example, if you worked 15 hours and 30 minutes, enter 15.5." }
  ],
  relatedSlugs:["hours-worked-calculator", "time-and-a-half-calculator"]
};

export default def;