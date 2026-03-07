import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "work-hours-calculator",
  title: "Work Hours Calculator",
  shortTitle: "Work Hours",
  description: "Calculate how many hours you worked in a day after accounting for breaks.",
  longDescription:
    "Enter your start time, end time (as separate hours and minutes), and any break duration in minutes. The calculator returns your net hours worked — useful for timesheets, freelance billing, or checking shift length. Overnight shifts are handled automatically.",
  category: "life",
  keywords: ["work hours calculator", "hours worked calculator", "timesheet calculator", "shift hours calculator", "break time calculator"],
  inputs: [
    {
      type: "number",
      key: "startHour",
      label: "Start Hour (0–23)",
      defaultValue: 9,
      min: 0,
      max: 23,
      step: 1,
      placeholder: "9",
      helpText: "24-hour format",
    },
    {
      type: "number",
      key: "startMinute",
      label: "Start Minute (0–59)",
      defaultValue: 0,
      min: 0,
      max: 59,
      step: 1,
      placeholder: "0",
    },
    {
      type: "number",
      key: "endHour",
      label: "End Hour (0–23)",
      defaultValue: 17,
      min: 0,
      max: 23,
      step: 1,
      placeholder: "17",
      helpText: "24-hour format",
    },
    {
      type: "number",
      key: "endMinute",
      label: "End Minute (0–59)",
      defaultValue: 30,
      min: 0,
      max: 59,
      step: 1,
      placeholder: "30",
    },
    {
      type: "number",
      key: "breakMinutes",
      label: "Break Duration (minutes)",
      defaultValue: 30,
      min: 0,
      max: 480,
      step: 5,
      placeholder: "30",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const startHour = Number(values.startHour);
    const startMinute = Number(values.startMinute);
    const endHour = Number(values.endHour);
    const endMinute = Number(values.endMinute);
    const breakMinutes = Number(values.breakMinutes);

    if (
      !Number.isFinite(startHour) || !Number.isFinite(startMinute) ||
      !Number.isFinite(endHour) || !Number.isFinite(endMinute) ||
      !Number.isFinite(breakMinutes) ||
      startHour < 0 || startHour > 23 || startMinute < 0 || startMinute > 59 ||
      endHour < 0 || endHour > 23 || endMinute < 0 || endMinute > 59 ||
      breakMinutes < 0
    ) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const startTotalMins = startHour * 60 + startMinute;
    const endTotalMins = endHour * 60 + endMinute;

    // Handle overnight shifts: if end <= start, add 24 hours to end
    let shiftMinutes = endTotalMins - startTotalMins;
    if (shiftMinutes <= 0) {
      shiftMinutes += 24 * 60;
    }

    const netMinutes = shiftMinutes - breakMinutes;

    if (netMinutes <= 0) {
      return {
        outputs: [],
        error: "Break duration exceeds or equals total shift time.",
      };
    }

    const hoursWorked = Math.round((netMinutes / 60) * 100) / 100;
    const hoursWhole = Math.floor(netMinutes / 60);
    const minsRemainder = netMinutes % 60;

    return {
      outputs: [
        { key: "hoursWorked", label: "Hours Worked (decimal)", value: hoursWorked, format: "number", highlight: true },
        { key: "hoursAndMins", label: "Hours Worked (H:MM)", value: `${hoursWhole}:${String(minsRemainder).padStart(2, "0")}`, format: "text" },
        { key: "shiftMinutes", label: "Gross Shift Minutes", value: shiftMinutes, format: "number" },
      ],
    };
  },

  howItWorks: `Start and end times are converted to total minutes from midnight. If end time is earlier than or equal to start time, 24 hours (1440 minutes) is added to handle overnight shifts. Net minutes = gross shift minutes minus break minutes. Hours worked = net minutes / 60.`,

  examples: [
    {
      title: "09:00 to 17:30 with 30 min break",
      description: "A standard office working day.",
      inputs: { startHour: 9, startMinute: 0, endHour: 17, endMinute: 30, breakMinutes: 30 },
      result: "8 hours worked.",
    },
    {
      title: "22:00 to 06:30 with 45 min break",
      description: "An overnight shift.",
      inputs: { startHour: 22, startMinute: 0, endHour: 6, endMinute: 30, breakMinutes: 45 },
      result: "7.75 hours worked.",
    },
  ],

  faqs: [
    {
      question: "Does this support overnight shifts?",
      answer: "Yes. If your end time is before your start time, the calculator automatically adds 24 hours to handle midnight crossings.",
    },
    {
      question: "How do I enter 9:30 AM?",
      answer: "Set Start Hour to 9 and Start Minute to 30. For 1:45 PM, set End Hour to 13 and End Minute to 45.",
    },
  ],

  relatedSlugs: ["time-duration-calculator", "hours-to-days-calculator"],
};

export default def;
