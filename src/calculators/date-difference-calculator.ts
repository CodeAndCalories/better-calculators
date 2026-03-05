import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "date-difference-calculator",
  title: "Date Difference Calculator",
  shortTitle: "Date Difference",
  description:
    "Find the exact number of days, weeks, months, and years between any two dates — including business days.",
  longDescription:
    "Whether you're counting down to an event, calculating a contract duration, tracking a project deadline, or figuring out someone's age to the day, our date difference calculator gives you the complete breakdown. Enter any two dates and instantly see the gap expressed in years, months, weeks, days, hours, and minutes — plus a separate business-days count that excludes weekends.",
  category: "life",
  keywords: [
    "date difference calculator",
    "days between dates",
    "how many days between two dates",
    "date calculator",
    "business days calculator",
    "days until calculator",
  ],
  inputs: [
    {
      type: "number",
      key: "startYear",
      label: "Start Year",
      defaultValue: 2020,
      min: 1900,
      max: 2100,
      step: 1,
      placeholder: "2020",
    },
    {
      type: "select",
      key: "startMonth",
      label: "Start Month",
      defaultValue: "1",
      options: [
        { label: "January", value: "1" },
        { label: "February", value: "2" },
        { label: "March", value: "3" },
        { label: "April", value: "4" },
        { label: "May", value: "5" },
        { label: "June", value: "6" },
        { label: "July", value: "7" },
        { label: "August", value: "8" },
        { label: "September", value: "9" },
        { label: "October", value: "10" },
        { label: "November", value: "11" },
        { label: "December", value: "12" },
      ],
    },
    {
      type: "number",
      key: "startDay",
      label: "Start Day",
      defaultValue: 1,
      min: 1,
      max: 31,
      step: 1,
      placeholder: "1",
    },
    {
      type: "number",
      key: "endYear",
      label: "End Year",
      defaultValue: 2025,
      min: 1900,
      max: 2100,
      step: 1,
      placeholder: "2025",
    },
    {
      type: "select",
      key: "endMonth",
      label: "End Month",
      defaultValue: "1",
      options: [
        { label: "January", value: "1" },
        { label: "February", value: "2" },
        { label: "March", value: "3" },
        { label: "April", value: "4" },
        { label: "May", value: "5" },
        { label: "June", value: "6" },
        { label: "July", value: "7" },
        { label: "August", value: "8" },
        { label: "September", value: "9" },
        { label: "October", value: "10" },
        { label: "November", value: "11" },
        { label: "December", value: "12" },
      ],
    },
    {
      type: "number",
      key: "endDay",
      label: "End Day",
      defaultValue: 1,
      min: 1,
      max: 31,
      step: 1,
      placeholder: "1",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const startYear = Number(values.startYear);
    const startMonth = Number(values.startMonth) - 1; // 0-indexed
    const startDay = Number(values.startDay);
    const endYear = Number(values.endYear);
    const endMonth = Number(values.endMonth) - 1;
    const endDay = Number(values.endDay);

    const start = new Date(startYear, startMonth, startDay);
    const end = new Date(endYear, endMonth, endDay);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return { outputs: [], error: "Please enter valid dates." };
    }

    // Ensure chronological order — swap silently
    const [earlier, later] =
      start <= end ? [start, end] : [end, start];

    const msPerDay = 1000 * 60 * 60 * 24;
    const totalDays = Math.round(
      (later.getTime() - earlier.getTime()) / msPerDay
    );

    if (totalDays === 0) {
      return { outputs: [], error: "The two dates are the same. Please enter different dates." };
    }

    // Calendar breakdown: years, months, remaining days
    let years = later.getFullYear() - earlier.getFullYear();
    let months = later.getMonth() - earlier.getMonth();
    let days = later.getDate() - earlier.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(later.getFullYear(), later.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const totalWeeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    // Business days (exclude Sat=6, Sun=0)
    let businessDays = 0;
    const cursor = new Date(earlier);
    while (cursor < later) {
      const dow = cursor.getDay();
      if (dow !== 0 && dow !== 6) businessDays++;
      cursor.setDate(cursor.getDate() + 1);
    }

    const weekendDays = totalDays - businessDays;

    // Human-readable breakdown string
    const parts: string[] = [];
    if (years > 0) parts.push(`${years} year${years !== 1 ? "s" : ""}`);
    if (months > 0) parts.push(`${months} month${months !== 1 ? "s" : ""}`);
    if (days > 0) parts.push(`${days} day${days !== 1 ? "s" : ""}`);
    const breakdown = parts.length > 0 ? parts.join(", ") : `${totalDays} days`;

    // Weeks + days string
    const weeksStr =
      remainingDays > 0
        ? `${totalWeeks} weeks, ${remainingDays} days`
        : `${totalWeeks} weeks`;

    return {
      outputs: [
        {
          key: "totalDays",
          label: "Total Days",
          value: totalDays,
          format: "number",
          highlight: true,
        },
        {
          key: "breakdown",
          label: "Years, Months & Days",
          value: breakdown,
          format: "text",
        },
        {
          key: "weeksAndDays",
          label: "Weeks & Days",
          value: weeksStr,
          format: "text",
        },
        {
          key: "businessDays",
          label: "Business Days (Mon–Fri)",
          value: businessDays,
          format: "number",
          helpText: "Excludes Saturdays and Sundays",
        },
        {
          key: "weekendDays",
          label: "Weekend Days",
          value: weekendDays,
          format: "number",
        },
        {
          key: "totalHours",
          label: "Total Hours",
          value: totalHours,
          format: "number",
        },
      ],
    };
  },

  howItWorks: `We subtract the earlier timestamp from the later one in milliseconds, then divide by 86,400,000 (ms per day) to get total days. For the calendar breakdown (years, months, days), we walk forward from the start date month by month, handling variable month lengths and leap years correctly. Weeks are total days ÷ 7; business days are counted by iterating each day and skipping Saturday (day 6) and Sunday (day 0). The result is the same regardless of which date you enter first.`,

  examples: [
    {
      title: "January 1, 2020 → January 1, 2025",
      description:
        "A clean 5-year span — useful for checking contract terms or anniversary counts.",
      inputs: {
        startYear: 2020, startMonth: "1", startDay: 1,
        endYear: 2025, endMonth: "1", endDay: 1,
      },
      result:
        "Exactly 1,826 total days (5 years, 1 leap year adds the extra day), 1,305 business days, 261 weekend days.",
    },
    {
      title: "March 15, 2023 → November 30, 2023",
      description:
        "Calculating the duration of a project or lease agreement within a single year.",
      inputs: {
        startYear: 2023, startMonth: "3", startDay: 15,
        endYear: 2023, endMonth: "11", endDay: 30,
      },
      result:
        "260 total days, 8 months 15 days, 37 weeks 1 day, 186 business days.",
    },
  ],

  faqs: [
    {
      question: "Does this calculator include or exclude the start and end dates?",
      answer:
        "The count is exclusive of the start date and inclusive of the end date — the standard convention for duration calculations. For example, from Jan 1 to Jan 3 is 2 days (Jan 2 and Jan 3). If you need to include the start date, simply add 1 to the total days result.",
    },
    {
      question: "How are business days calculated?",
      answer:
        "Business days count Monday through Friday only, excluding Saturdays and Sundays. We do not subtract public holidays, since holidays vary by country, state, and employer. For precise deadline calculations that require holiday exclusions, manually subtract the known holidays from your result.",
    },
    {
      question: "What happens if I enter the end date before the start date?",
      answer:
        "The calculator automatically handles reversed dates — it always computes the positive difference between the two dates regardless of the order you enter them. You'll see the same result either way.",
    },
    {
      question: "How does the calculator handle leap years?",
      answer:
        "JavaScript's Date object handles leap years natively. February 29th is counted as a normal day when it exists in the range. A 4-year span that includes a leap year will have 1,461 days instead of 1,460.",
    },
  ],

  relatedSlugs: [
    "age-calculator",
    "hours-to-minutes-calculator",
    "time-duration-calculator",
  ],
};

export default def;
