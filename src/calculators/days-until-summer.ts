import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "days-until-summer",
  title: "Days Until Summer",
  description: "Calculate how many days remain until summer begins.",
  inputs: [],
  compute(_values: InputValues): ComputeResult {
    const today = new Date();
    const year = today.getFullYear();

    let summer = new Date(year, 5, 21);

    if (today > summer) {
      summer = new Date(year + 1, 5, 21);
    }

    const diff = summer.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return {
      outputs: [
        {
          key: "days",
          label: "Days Until Summer",
          value: days,
          format: "number",
          highlight: true,
        },
      ],
    };
  },
};

export default def;
