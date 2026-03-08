import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "sleep-calculator",
  title: "Sleep Calculator",
  shortTitle: "Sleep",
  description: "Find the best bedtime or wake time based on 90-minute sleep cycles.",
  category: "health",
  keywords: ["sleep calculator", "bedtime calculator", "wake time", "sleep cycles"],
  inputs: [
    { type: "select",  key: "mode",          label: "Calculate",                    defaultValue: "bedtime", options: [
      { label: "Bedtime (given wake time)",  value: "bedtime" },
      { label: "Wake time (given bedtime)",  value: "wakeup"  },
    ]},
    { type: "number",  key: "anchorHour",    label: "Hour (0–23)",                  defaultValue: 7,  min: 0, max: 23, step: 1 },
    { type: "number",  key: "anchorMinute",  label: "Minute (0–59)",                defaultValue: 0,  min: 0, max: 59, step: 1 },
    { type: "number",  key: "cycles",        label: "Sleep Cycles (5–6 recommended)", defaultValue: 6, min: 1, max: 9, step: 1 },
    { type: "number",  key: "fallAsleepMins",label: "Minutes to Fall Asleep",       defaultValue: 14, min: 0, max: 60, step: 1 },
  ],
  compute(values: InputValues): ComputeResult {
    const mode   = values.mode as string;
    const ah     = Number(values.anchorHour);
    const am     = Number(values.anchorMinute);
    const cycles = Number(values.cycles);
    const fam    = Number(values.fallAsleepMins);
    if (!Number.isFinite(ah) || !Number.isFinite(am) || !Number.isFinite(cycles) || !Number.isFinite(fam)) {
      return { outputs: [], error: "Please enter a valid number." };
    }
    if (ah < 0 || ah > 23 || am < 0 || am > 59) {
      return { outputs: [], error: "Please enter a valid hour and minute." };
    }
    const totalSleepMins = cycles * 90;
    const anchorTotal    = ah * 60 + am;
    let targetMins: number;
    if (mode === "wakeup") {
      targetMins = anchorTotal + fam + totalSleepMins;
    } else {
      targetMins = anchorTotal - fam - totalSleepMins;
    }
    targetMins = ((targetMins % 1440) + 1440) % 1440;
    const rh  = Math.floor(targetMins / 60);
    const rm  = targetMins % 60;
    const h12 = rh % 12 === 0 ? 12 : rh % 12;
    const ampm = rh < 12 ? "AM" : "PM";
    const timeStr = `${h12}:${String(rm).padStart(2, "0")} ${ampm}`;
    return {
      outputs: [
        { key: "targetTime",  label: mode === "wakeup" ? "Wake Up At" : "Go to Bed At", value: timeStr,             format: "text",   highlight: true },
        { key: "sleepHours",  label: "Total Sleep (hrs)",   value: Math.round(totalSleepMins / 60 * 10) / 10, format: "number" },
        { key: "sleepMins",   label: "Total Sleep (min)",   value: totalSleepMins,                             format: "number" },
        { key: "cyclesCount", label: "Sleep Cycles",        value: cycles,                                     format: "number" },
      ],
    };
  },
  howItWorks: "Each sleep cycle ≈ 90 minutes. Optimal sleep = 5–6 complete cycles (7.5–9 hrs). The calculator adds or subtracts (cycles × 90 + fall-asleep time) from the anchor time.",
  relatedSlugs: ["working-hours-calculator", "countdown-calculator"],

  longDescription: "Your body cycles through approximately 90-minute sleep cycles. Waking mid-cycle leaves you groggy; waking at the end of a cycle feels natural. This calculator finds your optimal bedtime or wake time based on complete cycles plus your personal fall-asleep latency.",
  examples: [
    { title: "Wake at 7:00 AM, 6 cycles, 14 min to fall asleep", description: "Optimal bedtime for a full night.", inputs: { mode: "bedtime", anchorHour: 7, anchorMinute: 0, cycles: 6, fallAsleepMins: 14 }, result: "Go to bed at 10:46 PM." },
  ],
  faqs: [
    { question: "How many sleep cycles do I need?", answer: "Most adults need 5–6 cycles (7.5–9 hours). Athletes and those recovering from illness may need 6 or more." },
    { question: "What is sleep latency?", answer: "Sleep latency is the time it takes to fall asleep after getting into bed. The average is 10–20 minutes for healthy adults." },
  ],
};

export default def;
