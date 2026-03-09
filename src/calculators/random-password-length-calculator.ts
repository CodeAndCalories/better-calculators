import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "random-password-length-calculator",
  title: "Password Strength by Length Calculator",
  description: "Calculate the number of possible password combinations based on length and character set size.",
  longDescription: "Password strength depends on its length and the variety of characters used. This calculator shows the total number of possible combinations for a given password length and character set, helping you understand how much harder longer passwords are to crack.",
  category: "life",
  keywords: ["password length calculator", "password strength", "password combinations", "character set"],
  inputs: [
    { type: "number", key: "length", label: "Password Length (characters)", defaultValue: 12, min: 1, max: 128, step: 1 },
    {
      type: "select",
      key: "charset",
      label: "Character Set",
      defaultValue: 72,
      options: [
        { label: "Digits only (10)", value: 10 },
        { label: "Lowercase letters (26)", value: 26 },
        { label: "Lower + digits (36)", value: 36 },
        { label: "Lower + upper (52)", value: 52 },
        { label: "Lower + upper + digits (62)", value: 62 },
        { label: "Common special chars added (72)", value: 72 },
        { label: "Full printable ASCII (95)", value: 95 },
      ],
    },
  ],
  compute(values: InputValues): ComputeResult {
    const length = Math.round(Number(values.length));
    const charset = Number(values.charset);
    if (isNaN(length) || length < 1) return { outputs: [], error: "Please enter a valid password length of at least 1." };
    // Use logarithms to represent the enormous numbers involved
    const logCombinations = length * Math.log10(charset);
    const entropyBits = length * Math.log2(charset);
    let strengthLabel = "Very Weak";
    if (entropyBits >= 128) strengthLabel = "Extremely Strong";
    else if (entropyBits >= 80) strengthLabel = "Very Strong";
    else if (entropyBits >= 60) strengthLabel = "Strong";
    else if (entropyBits >= 40) strengthLabel = "Moderate";
    else if (entropyBits >= 28) strengthLabel = "Weak";

    return {
      outputs: [
        { key: "strength", label: "Strength Rating", value: strengthLabel, format: "text", highlight: true },
        { key: "entropy", label: "Entropy (bits)", value: Number(entropyBits.toFixed(1)), format: "number" },
        { key: "logcombos", label: "Combinations (10^ power)", value: Number(logCombinations.toFixed(2)), format: "number" },
        { key: "charset", label: "Character Set Size", value: charset, format: "number" },
      ],
    };
  },
  howItWorks: "The total combinations = charset^length. Because this number is astronomically large, we display it as a power of 10. Entropy in bits = length × log₂(charset), which is the standard security measure.",
  examples: [
    {
      title: "4-digit PIN",
      description: "Length 4, digits only (10 chars).",
      inputs: { length: 4, charset: 10 },
      result: "10,000 combinations (10^4), 13.3 bits — Very Weak.",
    },
    {
      title: "12-char mixed password",
      description: "Length 12, 72-character set.",
      inputs: { length: 12, charset: 72 },
      result: "Approximately 10^22 combinations, 75.5 bits — Strong.",
    },
  ],
  faqs: [
    { question: "What is entropy in bits?", answer: "Entropy measures unpredictability. Each extra bit of entropy doubles the number of guesses needed to crack a password. 80+ bits is considered very strong." },
    { question: "Why does length matter more than complexity?", answer: "Adding one character multiplies combinations by the charset size. Going from 8 to 12 characters raises strength far more than swapping letters for symbols." },
  ],
  relatedSlugs: ["random-number-range-calculator", "range-of-numbers-calculator"],
};

export default def;
