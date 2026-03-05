// filename: work-hours-per-year-calculator.ts
import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "work-hours-per-year-calculator",
  title: "Work Hours Per Year Calculator",
  description: "Calculate your total working hours over a full year.",
  longDescription: "Whether you are calculating billable hours, estimating your total workload, or transitioning from hourly to salary, this tool finds out exactly how many hours you work over an entire year based on your weekly schedule.",
  category: "finance",
  keywords: ["work hours per year", "yearly hours calculator", "annual work hours", "hours to salary"],
  inputs:[
    { type: "number", key: "hoursPerWeek", label: "Hours Worked Per Week", defaultValue: 40, min: 1 },
    { type: "number", key: "weeksPerYear", label: "Weeks Worked Per Year", defaultValue: 52, min: 1, max: 52 }
  ],
  compute(values: InputValues): ComputeResult {
    const hoursPerWeek = Number(values.hoursPerWeek);
    const weeksPerYear = Number(values.weeksPerYear);

    if (isNaN(hoursPerWeek) || isNaN(weeksPerYear)) {
      return { outputs:[], error: "Please enter valid numeric values for hours and weeks." };
    }

    const totalHoursPerYear = hoursPerWeek * weeksPerYear;
    const avgHoursPerMonth = totalHoursPerYear / 12;

    return {
      outputs:[
        { key: "totalHoursPerYear", label: "Total Hours Per Year", value: Number(totalHoursPerYear.toFixed(2)), format: "number", highlight: true },
        { key: "avgHoursPerMonth", label: "Average Hours Per Month", value: Number(avgHoursPerMonth.toFixed(2)), format: "number" }
      ]
    };
  },
  howItWorks: "The calculator multiplies the number of hours you work in a single week by the number of weeks you plan to work in the year. It then divides that total by 12 to find your average monthly hours.",
  examples:[
    {
      title: "Standard Full-Time",
      description: "Working a standard 40-hour week for a full 52 weeks.",
      inputs: { hoursPerWeek: 40, weeksPerYear: 52 },
      result: "Calculates exactly 2,080 hours per year, averaging 173.33 hours a month."
    },
    {
      title: "Taking unpaid time off",
      description: "Working 40 hours a week, but taking 4 unpaid weeks off (48 weeks).",
      inputs: { hoursPerWeek: 40, weeksPerYear: 48 },
      result: "Calculates 1,920 hours per year, averaging 160 hours a month."
    },
    {
      title: "Part-Time Schedule",
      description: "Working 25 hours a week consistently for 52 weeks.",
      inputs: { hoursPerWeek: 25, weeksPerYear: 52 },
      result: "Calculates 1,300 hours per year, averaging 108.33 hours a month."
    }
  ],
  faqs:[
    { question: "How many hours is a standard full-time year?", answer: "In the United States, a standard full-time working year is generally considered to be 2,080 hours (40 hours a week * 52 weeks)." },
    { question: "Should I include PTO and holidays in 'Weeks Worked'?", answer: "If you receive Paid Time Off (PTO) and paid holidays, you should count those as weeks worked (e.g., use 52 weeks) because you are being compensated for those hours." },
    { question: "Why is the monthly average not just my weekly hours times 4?", answer: "Because months (except February) are longer than 28 days (4 weeks). On average, a month has 4.33 weeks, which makes the monthly hour count slightly higher." },
    { question: "How do I use this to find my annual salary?", answer: "Take the 'Total Hours Per Year' output and multiply it by your hourly wage to find your expected gross annual salary." }
  ],
  relatedSlugs: ["hours-worked-calculator", "salary-per-month-calculator"]
};

export default def;