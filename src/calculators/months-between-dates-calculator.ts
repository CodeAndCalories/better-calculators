import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "months-between-dates-calculator",
  title: "Months Between Dates Calculator",
  shortTitle: "Months Between",
  description: "Calculate the number of months between two dates using year and month inputs.",
  category: "life",
  keywords: ["months between dates", "month difference", "how many months between"],
  inputs: [
    { type: "number", key: "startYear",  label: "Start Year",  defaultValue: 2023, min: 1, max: 9999, step: 1 },
    { type: "number", key: "startMonth", label: "Start Month", defaultValue: 1,    min: 1, max: 12,   step: 1 },
    { type: "number", key: "endYear",    label: "End Year",    defaultValue: 2025, min: 1, max: 9999, step: 1 },
    { type: "number", key: "endMonth",   label: "End Month",   defaultValue: 3,    min: 1, max: 12,   step: 1 },
  ],
  compute(values: InputValues): ComputeResult {
    const sy = Number(values.startYear);
    const sm = Number(values.startMonth);
    const ey = Number(values.endYear);
    const em = Number(values.endMonth);
    if ([sy, sm, ey, em].some((n) => !Number.isFinite(n)) || sm < 1 || sm > 12 || em < 1 || em > 12) {
      return { outputs: [], error: "Please enter a valid number." };
    }
    const total = Math.abs((ey * 12 + em) - (sy * 12 + sm));
    const years = Math.floor(total / 12);
    const rem   = total % 12;
    return {
      outputs: [
        { key: "totalMonths",    label: "Total Months",       value: total,                   format: "number", highlight: true },
        { key: "fullYears",      label: "Full Years",         value: years,                   format: "number" },
        { key: "remainMonths",   label: "Remaining Months",   value: rem,                     format: "number" },
        { key: "approxWeeks",    label: "Approximate Weeks",  value: Math.round(total * 4.345), format: "number" },
      ],
    };
  },
  howItWorks: "Total months = |(endYear × 12 + endMonth) − (startYear × 12 + startMonth)|.",
  relatedSlugs: ["years-between-dates-calculator", "time-duration-calculator", "date-add-calculator"],

  longDescription: "Calculate the exact number of months between any two year/month combinations. Useful for calculating contract lengths, subscription durations, age in months, or any period measured in calendar months.",
  examples: [
    { title: "January 2023 to March 2025", description: "A 26-month span.", inputs: { startYear: 2023, startMonth: 1, endYear: 2025, endMonth: 3 }, result: "26 months — 2 years 2 months." },
  ],
  faqs: [
    { question: "Does the order of the dates matter?", answer: "No — the calculator always returns a positive result regardless of which date comes first." },
  ],
};

export default def;
