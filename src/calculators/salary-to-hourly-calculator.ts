import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "salary-to-hourly-calculator",
  title: "Salary to Hourly Calculator",
  shortTitle: "Salary to Hourly",
  description:
    "Convert any annual, monthly, biweekly, or weekly salary into an equivalent hourly wage — and vice versa.",
  longDescription:
    "Whether you're comparing a job offer, negotiating a raise, or figuring out what your time is actually worth, our salary to hourly calculator instantly converts between pay periods. Enter your salary and how many hours per week you work, and see your equivalent hourly rate, daily earnings, weekly take-home, and more — all at once.",
  category: "finance",
  keywords: [
    "salary to hourly calculator",
    "annual salary to hourly",
    "hourly wage calculator",
    "convert salary to hourly rate",
    "how much is my salary per hour",
  ],
  inputs: [
    {
      type: "number",
      key: "salary",
      label: "Salary Amount",
      prefix: "$",
      defaultValue: 75000,
      min: 0,
      step: 1000,
      placeholder: "75000",
    },
    {
      type: "select",
      key: "payPeriod",
      label: "Pay Period",
      defaultValue: "annual",
      options: [
        { label: "Per Year (Annual)", value: "annual" },
        { label: "Per Month", value: "monthly" },
        { label: "Per Biweek (Every 2 Weeks)", value: "biweekly" },
        { label: "Per Week", value: "weekly" },
        { label: "Per Day", value: "daily" },
        { label: "Per Hour", value: "hourly" },
      ],
    },
    {
      type: "number",
      key: "hoursPerWeek",
      label: "Hours Worked Per Week",
      suffix: "hrs",
      defaultValue: 40,
      min: 1,
      max: 168,
      step: 0.5,
      placeholder: "40",
      helpText: "Standard full-time is 40 hours",
    },
    {
      type: "number",
      key: "weeksPerYear",
      label: "Weeks Worked Per Year",
      suffix: "wks",
      defaultValue: 52,
      min: 1,
      max: 52,
      step: 1,
      placeholder: "52",
      helpText: "Use 50 if you take 2 weeks unpaid vacation",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const salary = Number(values.salary);
    const payPeriod = values.payPeriod as string;
    const hoursPerWeek = Number(values.hoursPerWeek);
    const weeksPerYear = Number(values.weeksPerYear);

    if (salary < 0) return { outputs: [], error: "Salary cannot be negative." };
    if (hoursPerWeek <= 0) return { outputs: [], error: "Hours per week must be greater than 0." };
    if (weeksPerYear <= 0 || weeksPerYear > 52)
      return { outputs: [], error: "Weeks per year must be between 1 and 52." };

    const totalHoursPerYear = hoursPerWeek * weeksPerYear;
    const workingDaysPerYear = weeksPerYear * 5;

    // Normalize everything to annual first
    let annualSalary: number;
    switch (payPeriod) {
      case "annual":
        annualSalary = salary;
        break;
      case "monthly":
        annualSalary = salary * 12;
        break;
      case "biweekly":
        annualSalary = salary * 26;
        break;
      case "weekly":
        annualSalary = salary * weeksPerYear;
        break;
      case "daily":
        annualSalary = salary * workingDaysPerYear;
        break;
      case "hourly":
        annualSalary = salary * totalHoursPerYear;
        break;
      default:
        annualSalary = salary;
    }

    const hourlyRate = annualSalary / totalHoursPerYear;
    const dailyRate = annualSalary / workingDaysPerYear;
    const weeklyRate = annualSalary / weeksPerYear;
    const biweeklyRate = annualSalary / (weeksPerYear / 2);
    const monthlyRate = annualSalary / 12;

    return {
      outputs: [
        {
          key: "hourly",
          label: "Hourly Rate",
          value: hourlyRate,
          format: "currency",
          highlight: true,
          helpText: `Based on ${hoursPerWeek} hrs/week × ${weeksPerYear} weeks`,
        },
        {
          key: "daily",
          label: "Daily Rate",
          value: dailyRate,
          format: "currency",
          helpText: "Per 8-hour workday equivalent",
        },
        {
          key: "weekly",
          label: "Weekly Pay",
          value: weeklyRate,
          format: "currency",
        },
        {
          key: "biweekly",
          label: "Biweekly Pay (Every 2 Weeks)",
          value: biweeklyRate,
          format: "currency",
        },
        {
          key: "monthly",
          label: "Monthly Pay",
          value: monthlyRate,
          format: "currency",
        },
        {
          key: "annual",
          label: "Annual Salary",
          value: annualSalary,
          format: "currency",
        },
      ],
    };
  },

  howItWorks: `All conversions are anchored to the annual salary. First, we calculate total working hours per year: Hours Per Week × Weeks Per Year. Then: Hourly = Annual ÷ Total Hours. Daily = Annual ÷ (Weeks × 5 working days). Weekly = Annual ÷ Weeks Per Year. Biweekly = Annual ÷ (Weeks ÷ 2). Monthly = Annual ÷ 12. If you enter a non-annual figure (e.g. monthly), we multiply it up to annual first, then derive all other rates from that.`,

  examples: [
    {
      title: "$75,000 Annual Salary — Standard 40hr Week",
      description:
        "A typical full-time salaried employee working 40 hours a week, 52 weeks a year.",
      inputs: { salary: 75000, payPeriod: "annual", hoursPerWeek: 40, weeksPerYear: 52 },
      result:
        "$36.06/hr, $576.92/day, $1,442.31/week, $2,884.62 biweekly, $6,250/month.",
    },
    {
      title: "$25/hr Part-Time — 25 Hours a Week",
      description:
        "Converting a part-time hourly wage to see the equivalent annual and monthly earnings.",
      inputs: { salary: 25, payPeriod: "hourly", hoursPerWeek: 25, weeksPerYear: 50 },
      result:
        "$31,250/year, $2,604.17/month, $1,250/week, working 1,250 hours annually.",
    },
  ],

  faqs: [
    {
      question: "How do I convert an annual salary to an hourly rate?",
      answer:
        "Divide your annual salary by the total number of hours you work per year. For a standard 40-hour week over 52 weeks (2,080 hours), the formula is: Hourly Rate = Annual Salary ÷ 2,080. For example, $60,000 ÷ 2,080 = $28.85/hr.",
    },
    {
      question: "Should I use 52 weeks or 50 weeks in the calculation?",
      answer:
        "It depends on your situation. If you receive a true annual salary regardless of vacation, use 52 weeks. If you only get paid for weeks you actually work (common for contractors or hourly workers), subtract your unpaid vacation weeks. Most salaried employees use 52.",
    },
    {
      question: "What is the standard number of working hours per year?",
      answer:
        "The U.S. standard is 2,080 hours per year (40 hours/week × 52 weeks). Accounting for 10 federal holidays reduces it to roughly 1,960–2,000 paid hours. Contractors often calculate on 2,000 hours for a clean estimate.",
    },
    {
      question: "How do biweekly and semimonthly pay differ?",
      answer:
        "Biweekly pay means you're paid every two weeks — 26 paychecks per year. Semimonthly means twice a month — 24 paychecks per year. Biweekly is more common in the U.S. Two months per year you'll receive three biweekly paychecks instead of two.",
    },
  ],

  relatedSlugs: [
    "loan-payment-calculator",
    "compound-interest-calculator",
    "tip-calculator",
  ],
};

export default def;
