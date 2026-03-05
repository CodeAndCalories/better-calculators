// filename: tip-split-calculator.ts
import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "tip-split-calculator",
  title: "Tip & Split Bill Calculator",
  description: "Calculate the tip amount and easily split the final restaurant bill among friends.",
  longDescription: "Figuring out the tip and splitting the check shouldn't ruin a good meal. This tool quickly calculates the exact tip amount based on your percentage, adds it to the bill, and divides the total evenly among everyone at the table.",
  category: "finance",
  keywords:["tip calculator", "split bill", "restaurant tip", "bill splitter", "gratuity calculator"],
  inputs:[
    { type: "number", key: "billAmount", label: "Total Bill Amount ($)", defaultValue: 85.50, min: 0.01 },
    { type: "number", key: "tipPercent", label: "Tip Percentage (%)", defaultValue: 20, min: 0 },
    { type: "number", key: "numberOfPeople", label: "Number of People", defaultValue: 3, min: 1 }
  ],
  compute(values: InputValues): ComputeResult {
    const billAmount = Number(values.billAmount);
    const tipPercent = Number(values.tipPercent);
    const numberOfPeople = Number(values.numberOfPeople);

    if (isNaN(billAmount) || isNaN(tipPercent) || isNaN(numberOfPeople)) {
      return { outputs:[], error: "Please enter valid numbers for the bill, tip, and party size." };
    }
    if (numberOfPeople < 1) {
      return { outputs:[], error: "Number of people must be at least 1." };
    }

    const tipAmount = billAmount * (tipPercent / 100);
    const totalBill = billAmount + tipAmount;
    const perPerson = totalBill / numberOfPeople;

    return {
      outputs:[
        { key: "perPerson", label: "Total Per Person", value: Number(perPerson.toFixed(2)), format: "currency", highlight: true },
        { key: "totalBill", label: "Total Bill (with Tip)", value: Number(totalBill.toFixed(2)), format: "currency" },
        { key: "tipAmount", label: "Total Tip Amount", value: Number(tipAmount.toFixed(2)), format: "currency" }
      ]
    };
  },
  howItWorks: "The calculator turns your tip percentage into a decimal and multiplies it by the bill to find the tip amount. It adds the tip to the original bill for the total cost, and then divides that total by the number of people to find the per-person cost.",
  examples:[
    {
      title: "Dinner for three",
      description: "An $85.50 bill split 3 ways with a 20% tip.",
      inputs: { billAmount: 85.50, tipPercent: 20, numberOfPeople: 3 },
      result: "The tip is $17.10, making the total $102.60. Each person owes $34.20."
    },
    {
      title: "Large party",
      description: "A $240 bill split 8 ways with an 18% tip.",
      inputs: { billAmount: 240, tipPercent: 18, numberOfPeople: 8 },
      result: "The tip is $43.20. Each person owes $35.40."
    },
    {
      title: "Solo diner",
      description: "A $25 meal just for yourself with a 15% tip.",
      inputs: { billAmount: 25, tipPercent: 15, numberOfPeople: 1 },
      result: "The tip is $3.75, making your total $28.75."
    }
  ],
  faqs:[
    { question: "What is a standard tip percentage?", answer: "In the United States, 15% to 20% is considered standard for sit-down restaurant service, depending on the quality of service." },
    { question: "Should I tip on the pre-tax or post-tax amount?", answer: "Etiquette experts generally agree you should tip on the pre-tax subtotal, though many people simply tip on the final post-tax total for convenience." },
    { question: "What if the bill includes an automatic gratuity?", answer: "If an automatic gratuity or service charge is already included in your bill (common for large parties), you do not need to add an additional tip unless you want to reward exceptional service." },
    { question: "How does the split work?", answer: "The calculator splits the bill totally evenly. It does not itemize the check based on who ordered what." }
  ],
  relatedSlugs: ["sales-tax-calculator", "percentage-of-number-calculator"]
};

export default def;