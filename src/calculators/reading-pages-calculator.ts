import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "reading-pages-calculator",
  title: "Reading Pages Calculator",
  shortTitle: "Reading Pages",
  description: "Calculate how many days it will take to finish a book.",
  longDescription: "Set a daily reading goal and enter the total pages in your book to find out how long it will take to finish. Great for book clubs, reading challenges, or planning your reading schedule.",
  category: "life",
  keywords: ["reading calculator", "pages per day", "book reading time", "finish book calculator"],
  inputs: [
    { type: "number", key: "totalPages", label: "Total Pages in Book", defaultValue: 350, min: 1, step: 1, placeholder: "350" },
    { type: "number", key: "pagesPerDay", label: "Pages You Read Per Day", defaultValue: 25, min: 1, step: 1, placeholder: "25" },
  ],
  compute(values: InputValues): ComputeResult {
    const totalPages = Number(values.totalPages);
    const pagesPerDay = Number(values.pagesPerDay);
    if (isNaN(totalPages) || isNaN(pagesPerDay) || totalPages <= 0 || pagesPerDay <= 0) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const days = Math.ceil(totalPages / pagesPerDay);
    const weeks = days / 7;
    return {
      outputs: [
        { key: "days", label: "Days to Finish", value: days, format: "number", highlight: true },
        { key: "weeks", label: "Weeks to Finish", value: Number(weeks.toFixed(1)), format: "number" },
      ],
    };
  },
  howItWorks: "Divides the total page count by your daily reading rate, rounding up to the nearest whole day.",
  examples: [
    {
      title: "Novel at Steady Pace",
      description: "350-page book, reading 25 pages/day.",
      inputs: { totalPages: 350, pagesPerDay: 25 },
      result: "14 days to finish.",
    },
    {
      title: "Fast Reader",
      description: "500-page book, reading 50 pages/day.",
      inputs: { totalPages: 500, pagesPerDay: 50 },
      result: "10 days to finish.",
    },
  ],
  faqs: [
    { question: "What is an average reading speed?", answer: "Most adults read 20–50 pages per hour, depending on the material." },
    { question: "Can I use this for a reading challenge?", answer: "Yes — divide your total challenge pages by the days remaining to find your daily target." },
    { question: "How do I stay consistent?", answer: "Setting a specific time of day for reading and using a tracker or streak app helps build the habit." },
  ],
  relatedSlugs: ["reading-time-calculator", "study-hours-calculator"],
};

export default def;
