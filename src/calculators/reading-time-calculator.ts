import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "reading-time-calculator",
  title: "Reading Time Calculator",
  description: "Estimate how long it will take to read a book or article based on page count and reading speed.",
  longDescription: "Enter the number of pages and your reading speed to instantly find out how many hours and minutes your reading will take. You can also see how many days it will take if you read for a set time each day.",
  category: "life",
  keywords: ["reading time calculator", "how long to read a book", "pages per hour", "reading speed"],
  inputs: [
    { type: "number", key: "pages", label: "Number of Pages", defaultValue: 300, min: 1, step: 1 },
    {
      type: "select",
      key: "speed",
      label: "Reading Speed",
      defaultValue: 2,
      options: [
        { label: "Slow (1 page/min)", value: 1 },
        { label: "Average (2 pages/min)", value: 2 },
        { label: "Fast (3 pages/min)", value: 3 },
        { label: "Speed reading (5 pages/min)", value: 5 },
      ],
    },
    { type: "number", key: "dailyMins", label: "Minutes You Read Per Day", defaultValue: 30, min: 1, step: 5 },
  ],
  compute(values: InputValues): ComputeResult {
    const pages = Number(values.pages);
    const speed = Number(values.speed);
    const dailyMins = Number(values.dailyMins);
    if (isNaN(pages) || isNaN(speed) || isNaN(dailyMins) || pages <= 0 || dailyMins <= 0) {
      return { outputs: [], error: "Please enter valid positive values." };
    }
    const totalMins = pages / speed;
    const hours = Math.floor(totalMins / 60);
    const mins = Math.round(totalMins % 60);
    const daysToFinish = Math.ceil(totalMins / dailyMins);
    return {
      outputs: [
        { key: "totalMins", label: "Total Reading Time (minutes)", value: Math.round(totalMins), format: "number", highlight: true },
        { key: "hours", label: "Hours", value: hours, format: "number" },
        { key: "minutes", label: "Minutes (remaining)", value: mins, format: "number" },
        { key: "days", label: "Days to Finish (at your daily pace)", value: daysToFinish, format: "number" },
      ],
    };
  },
  howItWorks: "Total reading time = pages ÷ pages per minute. Days to finish = total minutes ÷ daily reading minutes, rounded up.",
  examples: [
    {
      title: "Average novel",
      description: "300 pages at average speed, 30 minutes per day.",
      inputs: { pages: 300, speed: 2, dailyMins: 30 },
      result: "150 minutes (2.5 hours) total. Finish in 5 days.",
    },
    {
      title: "Textbook",
      description: "500 pages at slow speed, 45 minutes per day.",
      inputs: { pages: 500, speed: 1, dailyMins: 45 },
      result: "500 minutes (8h 20m). Finish in ~12 days.",
    },
  ],
  faqs: [
    { question: "What is the average reading speed?", answer: "Most adults read about 200–250 words per minute, which equates to roughly 1–2 pages per minute depending on page density." },
    { question: "Does the type of content affect reading time?", answer: "Yes. Dense technical text takes longer per page than light fiction. Adjust your speed accordingly." },
  ],
  relatedSlugs: ["study-hours-calculator", "daily-screen-time-calculator", "countdown-days-calculator"],
};

export default def;
