import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "random-dice-calculator",
  title: "Random Dice Calculator",
  shortTitle: "Dice Roll",
  description: "Calculate the minimum, maximum, and expected average total for any dice combination.",
  longDescription:
    "Enter the number of dice and how many sides each die has to instantly see the possible range of outcomes and the statistically expected average roll. Works for standard dice (d4, d6, d8, d10, d12, d20) or any custom die size.",
  category: "life",
  keywords: ["dice calculator", "dice roll", "expected dice value", "dice probability", "d20 calculator"],
  inputs: [
    {
      type: "number",
      key: "numberOfDice",
      label: "Number of Dice",
      defaultValue: 2,
      min: 1,
      max: 100,
      step: 1,
    },
    {
      type: "number",
      key: "sidesPerDie",
      label: "Sides Per Die",
      defaultValue: 6,
      min: 2,
      max: 1000,
      step: 1,
    },
  ],
  compute(values: InputValues): ComputeResult {
    const numberOfDice = Math.round(Number(values.numberOfDice));
    const sidesPerDie = Math.round(Number(values.sidesPerDie));

    if (isNaN(numberOfDice) || isNaN(sidesPerDie) || numberOfDice < 1 || sidesPerDie < 2) {
      return { outputs: [], error: "Please enter at least 1 die with at least 2 sides." };
    }

    const minRoll = numberOfDice * 1;
    const maxRoll = numberOfDice * sidesPerDie;
    const expectedAverage = numberOfDice * ((sidesPerDie + 1) / 2);
    const totalOutcomes = Math.pow(sidesPerDie, numberOfDice);
    const spread = maxRoll - minRoll;

    return {
      outputs: [
        {
          key: "expectedAverage",
          label: "Expected Average Total",
          value: Number(expectedAverage.toFixed(1)),
          format: "number",
          highlight: true,
          helpText: "The statistically expected result if rolled many times.",
        },
        {
          key: "minRoll",
          label: "Minimum Possible Roll",
          value: minRoll,
          format: "number",
        },
        {
          key: "maxRoll",
          label: "Maximum Possible Roll",
          value: maxRoll,
          format: "number",
        },
        {
          key: "spread",
          label: "Spread (Max − Min)",
          value: spread,
          format: "number",
        },
        {
          key: "totalOutcomes",
          label: "Total Possible Outcomes",
          value: totalOutcomes <= 1000000 ? totalOutcomes : Number(totalOutcomes.toExponential(2)),
          format: "number",
          helpText: "Total number of distinct outcome combinations.",
        },
      ],
    };
  },
  howItWorks:
    "The expected average per die is (sides + 1) / 2. Multiply by the number of dice for the total expected average. Minimum = number of dice × 1. Maximum = number of dice × sides. Total outcomes = sides ^ number of dice.",
  examples: [
    {
      title: "Two standard d6 dice",
      description: "Classic board game roll — 2 six-sided dice.",
      inputs: { numberOfDice: 2, sidesPerDie: 6 },
      result: "Min 2, Max 12, Expected average 7, 36 total outcomes.",
    },
    {
      title: "Single d20",
      description: "Standard tabletop RPG attack roll.",
      inputs: { numberOfDice: 1, sidesPerDie: 20 },
      result: "Min 1, Max 20, Expected average 10.5, 20 outcomes.",
    },
    {
      title: "Four d8 dice",
      description: "Damage roll for a heavy weapon.",
      inputs: { numberOfDice: 4, sidesPerDie: 8 },
      result: "Min 4, Max 32, Expected average 18, 4,096 outcomes.",
    },
  ],
  faqs: [
    {
      question: "Why is the expected average not a whole number?",
      answer:
        "For a fair die, the average of all faces is (sides + 1) / 2. For a d6 that is 3.5, so two d6 average 7. Over many rolls, your results will converge toward this value.",
    },
    {
      question: "Can I use this for non-standard dice?",
      answer:
        "Yes. Enter any number of sides — d4, d10, d100, or a custom value like d7 or d13. The math works for any fair die.",
    },
    {
      question: "What does total possible outcomes mean?",
      answer:
        "It is sides raised to the power of the number of dice. For 2d6 that is 6² = 36. Each outcome represents one specific combination of individual die results.",
    },
    {
      question: "How do I find the probability of a specific total?",
      answer:
        "Probability calculations for specific totals require counting valid combinations, which grows complex quickly. For detailed probabilities, a dedicated dice probability tool is recommended.",
    },
  ],
  relatedSlugs: ["random-number-range-calculator", "average-calculator", "range-of-numbers-calculator"],
};

export default def;