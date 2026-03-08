import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "years-between-dates-calculator",
  title: "Years Between Dates Calculator",
  shortTitle: "Years Between",
  description: "Calculate the number of complete years and remaining months between two dates.",
  category: "life",
  keywords: ["years between dates", "year difference", "how many years between"],
  inputs: [
    { type: "number", key: "startYear",  label: "Start Year",  defaultValue: 2010, min: 1, max: 9999, step: 1 },
    { type: "number", key: "startMonth", label: "Start Month", defaultValue: 6,    min: 1, max: 12,   step: 1 },
    { type: "number", key: "startDay",   label: "Start Day",   defaultValue: 15,   min: 1, max: 31,   step: 1 },
    { type: "number", key: "endYear",    label: "End Year",    defaultValue: 2025, min: 1, max: 9999, step: 1 },
    { type: "number", key: "endMonth",   label: "End Month",   defaultValue: 3,    min: 1, max: 12,   step: 1 },
    { type: "number", key: "endDay",     label: "End Day",     defaultValue: 7,    min: 1, max: 31,   step: 1 },
  ],
  compute(values: InputValues): ComputeResult {
    const sy = Number(values.startYear);
    const sm = Number(values.startMonth);
    const sd = Number(values.startDay);
    const ey = Number(values.endYear);
    const em = Number(values.endMonth);
    const ed = Number(values.endDay);
    if ([sy, sm, sd, ey, em, ed].some((n) => !Number.isFinite(n))) {
      return { outputs: [], error: "Please enter a valid number." };
    }
    const totalDays = Math.round(
      Math.abs(Date.UTC(ey, em - 1, ed) - Date.UTC(sy, sm - 1, sd)) / 86400000
    );
    const totalMonths = Math.abs((ey * 12 + em) - (sy * 12 + sm));
    let fullYears = Math.abs(ey - sy);
    const hadAnniversary = em > sm || (em === sm && ed >= sd);
    if (!hadAnniversary && ey > sy) fullYears -= 1;
    if (fullYears < 0) fullYears = 0;
    const remainMonths = totalMonths % 12;
    return {
      outputs: [
        { key: "fullYears",    label: "Full Years",        value: fullYears,    format: "number", highlight: true },
        { key: "totalMonths",  label: "Total Months",      value: totalMonths,  format: "number" },
        { key: "remainMonths", label: "Remaining Months",  value: remainMonths, format: "number" },
        { key: "totalDays",    label: "Total Days",        value: totalDays,    format: "number" },
      ],
    };
  },
  howItWorks: "Full years = absolute year difference, reduced by 1 if the anniversary hasn't occurred yet in the end year. Total days use UTC timestamps to avoid DST errors.",
  relatedSlugs: ["months-between-dates-calculator", "time-duration-calculator", "date-add-calculator"],
};
export default def;
