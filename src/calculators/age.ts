import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "age-calculator",
  title: "Age Calculator",
  shortTitle: "Age",
  description: "Calculate your exact age in years, months, weeks, and days from your date of birth.",
  longDescription: "Find your exact age down to the day, or calculate the time between any two dates. Our age calculator handles leap years correctly and breaks down the result into years, months, and days.",
  category: "life",
  keywords: ["age calculator", "how old am I", "birthday calculator", "days since birth calculator"],
  inputs: [
    { type: "number", key: "birthYear", label: "Birth Year", defaultValue: 1990, min: 1900, max: 2024, step: 1, placeholder: "1990" },
    { type: "select", key: "birthMonth", label: "Birth Month", defaultValue: "1", options: [
      { label: "January", value: "1" }, { label: "February", value: "2" }, { label: "March", value: "3" },
      { label: "April", value: "4" }, { label: "May", value: "5" }, { label: "June", value: "6" },
      { label: "July", value: "7" }, { label: "August", value: "8" }, { label: "September", value: "9" },
      { label: "October", value: "10" }, { label: "November", value: "11" }, { label: "December", value: "12" },
    ]},
    { type: "number", key: "birthDay", label: "Birth Day", defaultValue: 15, min: 1, max: 31, step: 1, placeholder: "15" },
  ],
  compute(values: InputValues): ComputeResult {
    const year = Number(values.birthYear);
    const month = Number(values.birthMonth) - 1;
    const day = Number(values.birthDay);

    const birthDate = new Date(year, month, day);
    const today = new Date();

    if (birthDate > today) {
      return { outputs: [], error: "Birth date cannot be in the future." };
    }
    if (isNaN(birthDate.getTime())) {
      return { outputs: [], error: "Please enter a valid birth date." };
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const diffMs = today.getTime() - birthDate.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    return {
      outputs: [
        { key: "years", label: "Age in Years", value: years, format: "number", highlight: true },
        { key: "breakdown", label: "Years, Months & Days", value: `${years}y ${months}m ${days}d`, format: "text" },
        { key: "totalMonths", label: "Total Months Lived", value: totalMonths, format: "number" },
        { key: "totalWeeks", label: "Total Weeks Lived", value: totalWeeks, format: "number" },
        { key: "totalDays", label: "Total Days Lived", value: totalDays, format: "number" },
      ],
    };
  },
  howItWorks: `We subtract the birth date from today's date, carefully accounting for varying month lengths and leap years. Years are counted first, then remaining months, then remaining days. Total days is the raw difference in milliseconds converted to days.`,
  examples: [
    {
      title: "Born January 15, 1990",
      description: "Calculating the current age for someone born in 1990.",
      inputs: { birthYear: 1990, birthMonth: "1", birthDay: 15 },
      result: "35 years old, with exact breakdown in months, weeks, and days.",
    },
    {
      title: "Born July 4, 2000",
      description: "A millennial born on Independence Day.",
      inputs: { birthYear: 2000, birthMonth: "7", birthDay: 4 },
      result: "24 years old with over 8,900 days lived.",
    },
  ],
  faqs: [
    { question: "How are leap years handled?", answer: "We use JavaScript's built-in Date object which correctly handles leap years. February 29th birthdays are accounted for — in non-leap years, the birthday falls on March 1st." },
    { question: "Can I calculate the age between two historical dates?", answer: "Our calculator uses today's date as the end date. For calculating the time between two specific dates, use the years, months, and days approach with your own end date." },
  ],
  relatedSlugs: ["bmi-calculator", "calorie-calculator", "tip-calculator"],
};

export default def;
