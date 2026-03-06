import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "days-until-christmas",
  title: "Days Until Christmas",
  description: "Calculate how many days are left until Christmas.",
  inputs: [],
  compute(_values: InputValues): ComputeResult {
    const today = new Date();
    const year = today.getFullYear();

    let christmas = new Date(year, 11, 25);

    if (today > christmas) {
      christmas = new Date(year + 1, 11, 25);
    }

    const diff = christmas.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return {
      outputs: [
        {
          key: "days",
          label: "Days Until Christmas",
          value: days,
          format: "number",
          highlight: true,
        },
      ],
    };
  },
};

export default def;
