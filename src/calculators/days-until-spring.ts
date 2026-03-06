import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "days-until-spring",
  title: "Days Until Spring",
  description: "Calculate how many days remain until spring begins.",
  inputs: [],
  compute(_values: InputValues): ComputeResult {
    const today = new Date();
    const year = today.getFullYear();

    let spring = new Date(year, 2, 20);

    if (today > spring) {
      spring = new Date(year + 1, 2, 20);
    }

    const diff = spring.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return {
      outputs: [
        {
          key: "days",
          label: "Days Until Spring",
          value: days,
          format: "number",
          highlight: true,
        },
      ],
    };
  },
};

export default def;
