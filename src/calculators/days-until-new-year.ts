import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "days-until-new-year",
  title: "Days Until New Year",
  description: "Calculate how many days remain until the New Year.",
  inputs: [],
  compute(_values: InputValues): ComputeResult {
    const today = new Date();
    const year = today.getFullYear();

    const newYear = new Date(year + 1, 0, 1);

    const diff = newYear.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return {
      outputs: [
        {
          key: "days",
          label: "Days Until New Year",
          value: days,
          format: "number",
          highlight: true,
        },
      ],
    };
  },
};

export default def;
