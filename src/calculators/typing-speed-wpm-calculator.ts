import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "typing-speed-wpm-calculator",
  title: "Typing Speed Calculator",
  shortTitle: "Typing Speed",
  description: "Calculate your typing speed in words per minute.",
  longDescription: "Typing speed is measured in words per minute (WPM), where one 'word' is defined as 5 characters. Enter the number of characters typed and the time taken to see your WPM.",
  category: "life",
  keywords: ["typing speed", "WPM calculator", "words per minute", "typing test"],
  inputs: [
    { type: "number", key: "characters", label: "Characters Typed", defaultValue: 500, min: 1, step: 1, placeholder: "500" },
    { type: "number", key: "minutes", label: "Time Taken (minutes)", defaultValue: 2, min: 0.1, step: 0.1, placeholder: "2" },
  ],
  compute(values: InputValues): ComputeResult {
    const characters = Number(values.characters);
    const minutes = Number(values.minutes);
    if (isNaN(characters) || isNaN(minutes) || minutes <= 0) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const wpm = (characters / 5) / minutes;
    return {
      outputs: [
        { key: "wpm", label: "Typing Speed (WPM)", value: Number(wpm.toFixed(1)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Divides the character count by 5 (standard word length) to get word count, then divides by minutes.",
  examples: [
    {
      title: "Average Typist",
      description: "500 characters typed in 2 minutes.",
      inputs: { characters: 500, minutes: 2 },
      result: "50 WPM.",
    },
    {
      title: "Fast Typist",
      description: "1,200 characters typed in 2 minutes.",
      inputs: { characters: 1200, minutes: 2 },
      result: "120 WPM.",
    },
  ],
  faqs: [
    { question: "What is average typing speed?", answer: "The average adult types 40–60 WPM. Professional typists often achieve 70–100+ WPM." },
    { question: "Why is a word defined as 5 characters?", answer: "The 5-character 'standard word' is the industry convention used by typing tests to normalize results." },
    { question: "How do I improve my typing speed?", answer: "Practice touch typing with tools like Keybr, 10FastFingers, or TypeRacer for 15–20 minutes daily." },
  ],
  relatedSlugs: ["reading-time-calculator", "work-hours-calculator"],
};

export default def;
