import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const def: CalculatorDef = {
  slug: "date-add-calculator",
  title: "Date Add Calculator",
  shortTitle: "Date Add",
  description: "Add years, months, and days to a starting date to find the resulting date.",
  category: "life",
  keywords: ["date add calculator", "add days to date", "future date calculator", "add months to date"],
  inputs: [
    { type: "number", key: "startYear",  label: "Start Year",   defaultValue: 2025, min: 1, max: 9999, step: 1 },
    { type: "number", key: "startMonth", label: "Start Month",  defaultValue: 3,    min: 1, max: 12,   step: 1 },
    { type: "number", key: "startDay",   label: "Start Day",    defaultValue: 7,    min: 1, max: 31,   step: 1 },
    { type: "number", key: "addYears",   label: "Add Years",    defaultValue: 0,    min: 0, step: 1 },
    { type: "number", key: "addMonths",  label: "Add Months",   defaultValue: 3,    min: 0, step: 1 },
    { type: "number", key: "addDays",    label: "Add Days",     defaultValue: 14,   min: 0, step: 1 },
  ],
  compute(values: InputValues): ComputeResult {
    const sy = Number(values.startYear);
    const sm = Number(values.startMonth);
    const sd = Number(values.startDay);
    const ay = Number(values.addYears);
    const am = Number(values.addMonths);
    const ad = Number(values.addDays);
    if ([sy, sm, sd, ay, am, ad].some((n) => !Number.isFinite(n) || n < 0)) {
      return { outputs: [], error: "Please enter a valid number." };
    }
    if (sm < 1 || sm > 12 || sd < 1 || sd > 31) {
      return { outputs: [], error: "Please enter a valid date." };
    }
    const d = new Date(Date.UTC(sy, sm - 1, sd));
    d.setUTCFullYear(d.getUTCFullYear() + ay);
    d.setUTCMonth(d.getUTCMonth() + am);
    d.setUTCDate(d.getUTCDate() + ad);
    const ry  = d.getUTCFullYear();
    const rmi = d.getUTCMonth();
    const rd  = d.getUTCDate();
    const iso = `${ry}-${String(rmi + 1).padStart(2, "0")}-${String(rd).padStart(2, "0")}`;
    const human = `${MONTHS[rmi]} ${rd}, ${ry}`;
    const totalDaysAdded = Math.round((d.getTime() - Date.UTC(sy, sm - 1, sd)) / 86400000);
    return {
      outputs: [
        { key: "resultDate",  label: "Result Date",       value: human,          format: "text",   highlight: true },
        { key: "isoDate",     label: "ISO Date",          value: iso,            format: "text"    },
        { key: "totalDays",   label: "Total Days Added",  value: totalDaysAdded, format: "number"  },
      ],
    };
  },
  howItWorks: "Years and months are added to the date components first (the Date constructor handles month overflow automatically), then days are added. All operations use UTC to avoid DST issues.",
  relatedSlugs: ["date-subtract-calculator", "months-between-dates-calculator", "countdown-calculator"],
};
export default def;
