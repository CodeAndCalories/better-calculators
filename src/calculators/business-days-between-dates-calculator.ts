import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "business-days-between-dates-calculator",
  title: "Business Days Between Dates Calculator",
  shortTitle: "Business Days",
  description: "Calculate the number of business days between two dates.",
  longDescription:
    "Planning a project, calculating payroll, or estimating shipping times? The Business Days Between Dates Calculator determines exactly how many working days exist within a specific timeframe. By default, it excludes weekends (Saturdays and Sundays). You can optionally choose to include the end date in the count or even include weekends if your business operates 7 days a week.",
  category: "life",
  keywords:["business days calculator", "weekdays between dates", "work days calculator", "days between dates", "project planning"],
  inputs:[
    { type: "number", key: "startYear", label: "Start Year", defaultValue: 2026, min: 1900, max: 2100, step: 1, placeholder: "2026" },
    { type: "number", key: "startMonth", label: "Start Month (1-12)", defaultValue: 3, min: 1, max: 12, step: 1, placeholder: "3" },
    { type: "number", key: "startDay", label: "Start Day (1-31)", defaultValue: 5, min: 1, max: 31, step: 1, placeholder: "5" },
    { type: "number", key: "endYear", label: "End Year", defaultValue: 2026, min: 1900, max: 2100, step: 1, placeholder: "2026" },
    { type: "number", key: "endMonth", label: "End Month (1-12)", defaultValue: 4, min: 1, max: 12, step: 1, placeholder: "4" },
    { type: "number", key: "endDay", label: "End Day (1-31)", defaultValue: 5, min: 1, max: 31, step: 1, placeholder: "5" },
    { type: "toggle", key: "includeEndDate", label: "Include End Date in Count", defaultValue: true },
    { type: "toggle", key: "countWeekends", label: "Count Weekends as Business Days", defaultValue: false }
  ],

  compute(values: InputValues): ComputeResult {
    const startYear = Number(values.startYear);
    const startMonth = Number(values.startMonth);
    const startDay = Number(values.startDay);
    const endYear = Number(values.endYear);
    const endMonth = Number(values.endMonth);
    const endDay = Number(values.endDay);

    if (
      isNaN(startYear) || isNaN(startMonth) || isNaN(startDay) ||
      isNaN(endYear) || isNaN(endMonth) || isNaN(endDay)
    ) {
      return {
        outputs:[
          { key: "error", label: "Result", value: "Please enter valid numeric dates.", format: "text", highlight: true },
        ],
      };
    }

    const start = new Date(startYear, startMonth - 1, startDay);
    const end = new Date(endYear, endMonth - 1, endDay);

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    if (end.getTime() < start.getTime()) {
      return {
        outputs:[
          { key: "error", label: "Result", value: "End date cannot be earlier than start date.", format: "text", highlight: true },
        ],
      };
    }

    const includeEndDate = values.includeEndDate === true || values.includeEndDate === "true";
    const countWeekends = values.countWeekends === true || values.countWeekends === "true";

    let current = new Date(start.getTime());
    let totalDays = 0;
    let businessDays = 0;
    let weekendDays = 0;

    while (current.getTime() < end.getTime() || (includeEndDate && current.getTime() === end.getTime())) {
      const dayOfWeek = current.getDay();
      totalDays++;
      
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekendDays++;
        if (countWeekends) {
          businessDays++;
        }
      } else {
        businessDays++;
      }
      
      current.setDate(current.getDate() + 1);
    }

    return {
      outputs:[
        { key: "businessDays", label: countWeekends ? "Total Business Days (Weekends Included)" : "Total Business Days", value: businessDays, format: "number", highlight: true },
        { key: "totalDays", label: "Total Calendar Days", value: totalDays, format: "number" },
        { key: "weekendDays", label: "Weekend Days Encountered", value: weekendDays, format: "number" }
      ],
    };
  },

  howItWorks:
    "The calculator converts your inputs into standard calendar dates and checks if the end date falls after the start date. It then iterates day-by-day, checking the day of the week. Saturdays (Day 6) and Sundays (Day 0) are tallied as weekend days and excluded from the business day count unless the 'Count Weekends' toggle is active.",

  examples:[
    {
      title: "Standard Two-Week Sprint",
      description: "Calculating a project sprint starting on Monday the 1st and ending on Friday the 12th, inclusive.",
      inputs: { startYear: 2026, startMonth: 3, startDay: 1, endYear: 2026, endMonth: 3, endDay: 12, includeEndDate: true, countWeekends: false },
      result: "Shows 10 business days and 2 weekend days out of 12 total calendar days."
    },
    {
      title: "Shipping Estimate",
      description: "A 5-day shipping window not counting the day of shipment (exclusive) and skipping weekends.",
      inputs: { startYear: 2026, startMonth: 5, startDay: 10, endYear: 2026, endMonth: 5, endDay: 15, includeEndDate: false, countWeekends: false },
      result: "Calculates exactly 5 business days, bypassing any weekend overlap."
    },
    {
      title: "Retail 7-Day Operation",
      description: "A business open every day calculating total operational days in a month.",
      inputs: { startYear: 2026, startMonth: 1, startDay: 1, endYear: 2026, endMonth: 1, endDay: 31, includeEndDate: true, countWeekends: true },
      result: "Returns 31 business days, treating weekends as standard working days."
    }
  ],

  faqs:[
    { question: "Does this calculator account for public holidays?", answer: "No, this calculator strictly excludes Saturdays and Sundays. Since holidays vary wildly by country, state, and company, you should manually subtract your specific observed holidays from the final business day count." },
    { question: "What does 'Include End Date' mean?", answer: "If you start on the 1st and end on the 2nd, excluding the end date counts as 1 day (just the 1st). Including the end date counts as 2 days (the 1st and the 2nd)." },
    { question: "Why would I count weekends as business days?", answer: "Some industries, like hospitality, retail, and certain freelance contracts, operate on a 7-day schedule where every calendar day is considered a billable or operational business day." },
    { question: "Can I calculate backwards?", answer: "This specific calculator requires the start date to come before the end date to prevent negative output errors. If you need a past duration, simply swap your start and end dates." }
  ],

  relatedSlugs:[
    "days-between-dates-calculator",
    "weeks-between-dates-calculator",
    "age-difference-calculator"
  ]
};

export default def;