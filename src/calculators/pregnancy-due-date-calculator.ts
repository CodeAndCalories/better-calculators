import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "pregnancy-due-date-calculator",
  title: "Pregnancy Due Date Calculator",
  shortTitle: "Due Date",
  description: "Estimate your pregnancy due date based on your last period and cycle length.",
  longDescription:
    "Wondering when you'll meet your baby? This Pregnancy Due Date Calculator estimates your Estimated Date of Delivery (EDD) based on the first day of your Last Menstrual Period (LMP). By factoring in your specific cycle length and luteal phase, it provides a more tailored estimate than standard 28-day models. Please note: This tool provides an estimate for informational purposes only and is not medical advice. Your healthcare provider will confirm your due date, often via ultrasound.",
  category: "health",
  keywords:["pregnancy calculator", "due date calculator", "EDD calculator", "gestational age", "when is my baby due"],
  inputs:[
    { type: "number", key: "lmpYear", label: "LMP Year", defaultValue: 2026, min: 2020, max: 2050, step: 1, placeholder: "2026" },
    { type: "number", key: "lmpMonth", label: "LMP Month (1-12)", defaultValue: 1, min: 1, max: 12, step: 1, placeholder: "1" },
    { type: "number", key: "lmpDay", label: "LMP Day (1-31)", defaultValue: 15, min: 1, max: 31, step: 1, placeholder: "15" },
    { type: "number", key: "cycleLengthDays", label: "Average Cycle Length (Days)", defaultValue: 28, min: 20, max: 45, step: 1, placeholder: "28" },
    { type: "number", key: "lutealPhaseDays", label: "Luteal Phase Length (Days)", defaultValue: 14, min: 10, max: 18, step: 1, placeholder: "14" }
  ],

  compute(values: InputValues): ComputeResult {
    const lmpYear = Number(values.lmpYear);
    const lmpMonth = Number(values.lmpMonth);
    const lmpDay = Number(values.lmpDay);
    const cycleLengthDays = Number(values.cycleLengthDays);
    const lutealPhaseDays = Number(values.lutealPhaseDays);

    if (
      isNaN(lmpYear) || isNaN(lmpMonth) || isNaN(lmpDay) || 
      isNaN(cycleLengthDays) || isNaN(lutealPhaseDays)
    ) {
      return {
        outputs:[
          { key: "error", label: "Result", value: "Please enter valid numeric values.", format: "text", highlight: true },
        ],
      };
    }

    // Create LMP Date
    const lmpDate = new Date(lmpYear, lmpMonth - 1, lmpDay);
    if (isNaN(lmpDate.getTime())) {
      return {
        outputs:[
          { key: "error", label: "Result", value: "Invalid LMP date provided.", format: "text", highlight: true },
        ],
      };
    }

    // Calculate Ovulation Date: LMP + (Cycle Length - Luteal Phase)
    const follicularPhase = cycleLengthDays - lutealPhaseDays;
    const ovulationDate = new Date(lmpDate.getTime());
    ovulationDate.setDate(ovulationDate.getDate() + follicularPhase);

    // Standard gestation from ovulation is 266 days (38 weeks)
    const dueDate = new Date(ovulationDate.getTime());
    dueDate.setDate(dueDate.getDate() + 266);

    // Determine Gestational Age (based on today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Adjusted LMP aligns gestational age tracking mathematically with the calculated ovulation
    const adjustedLmp = new Date(ovulationDate.getTime());
    adjustedLmp.setDate(adjustedLmp.getDate() - 14); // Standard medical anchor is exactly 14 days before ovulation
    
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysPregnant = Math.floor((today.getTime() - adjustedLmp.getTime()) / msPerDay);
    
    let gestationalAgeStr = "Not pregnant yet or date is in the future";
    let trimesterStr = "N/A";

    if (daysPregnant >= 0 && daysPregnant <= 300) {
      const weeks = Math.floor(daysPregnant / 7);
      const days = daysPregnant % 7;
      gestationalAgeStr = `${weeks} weeks, ${days} days`;

      if (weeks < 14) trimesterStr = "First Trimester";
      else if (weeks < 28) trimesterStr = "Second Trimester";
      else trimesterStr = "Third Trimester";
    } else if (daysPregnant > 300) {
      gestationalAgeStr = "Past 42 weeks (Post-term)";
      trimesterStr = "Third Trimester / Post-term";
    }

    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

    return {
      outputs:[
        { key: "estimatedDueDate", label: "Estimated Due Date", value: dueDate.toLocaleDateString(undefined, options), format: "text", highlight: true },
        { key: "gestationalAge", label: "Current Gestational Age", value: gestationalAgeStr, format: "text" },
        { key: "trimester", label: "Current Trimester", value: trimesterStr, format: "text" }
      ],
    };
  },

  howItWorks:
    "Medical professionals typically establish a due date by adding 280 days to the first day of your Last Menstrual Period (LMP), assuming a 28-day cycle with ovulation on day 14. This calculator goes a step further by using your exact cycle length and luteal phase to pinpoint your approximate ovulation date, adding 266 days directly to that date for a customized Estimate Date of Delivery (EDD).",

  examples:[
    {
      title: "Standard 28-Day Cycle",
      description: "A woman with a textbook 28-day cycle and 14-day luteal phase.",
      inputs: { lmpYear: 2026, lmpMonth: 1, lmpDay: 1, cycleLengthDays: 28, lutealPhaseDays: 14 },
      result: "Calculates an estimated due date exactly 280 days from the LMP (October 8, 2026)."
    },
    {
      title: "Longer 35-Day Cycle",
      description: "A woman with a longer 35-day cycle where ovulation happens later.",
      inputs: { lmpYear: 2026, lmpMonth: 1, lmpDay: 1, cycleLengthDays: 35, lutealPhaseDays: 14 },
      result: "Adjusts the due date forward to account for the later ovulation (October 15, 2026)."
    },
    {
      title: "Short Luteal Phase",
      description: "A 28-day cycle but with a shorter 10-day luteal phase.",
      inputs: { lmpYear: 2026, lmpMonth: 1, lmpDay: 1, cycleLengthDays: 28, lutealPhaseDays: 10 },
      result: "Adjusts the ovulation date later into the cycle, moving the due date to October 12, 2026."
    }
  ],

  faqs:[
    { question: "How accurate is a due date calculator?", answer: "Calculators provide an excellent baseline, but only about 4-5% of babies are born exactly on their estimated due date. Most babies arrive anywhere between 37 and 41 weeks of pregnancy." },
    { question: "What is LMP?", answer: "LMP stands for Last Menstrual Period. When calculating pregnancy, doctors ask for the FIRST day of your most recent period to use as a baseline starting point." },
    { question: "What if I have irregular cycles?", answer: "If your cycles fluctuate wildly, an LMP-based calculation might not be highly accurate. In cases of irregular periods, a first-trimester ultrasound is considered the most accurate way to date a pregnancy." },
    { question: "Why does gestational age include the weeks before I was pregnant?", answer: "By medical convention, pregnancy tracking begins on the first day of your last period, roughly two weeks before conception actually occurs. This is because LMP is a measurable date, whereas exact ovulation is harder to confirm without tracking." }
  ],

  relatedSlugs:[
    "age-calculator",
    "days-between-dates-calculator"
  ]
};

export default def;