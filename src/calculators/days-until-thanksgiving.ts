import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

function getThanksgiving(year: number): Date {
  const date = new Date(year, 10, 1);
  const day = date.getDay();
  const offset = (4 - day + 7) % 7;
  date.setDate(1 + offset + 21);
  return date;
}

const def: CalculatorDef = {
  slug: "days-until-thanksgiving",
  title: "Days Until Thanksgiving",
  description: "Calculate how many days remain until Thanksgiving.",
  inputs: [],
  compute(_values: InputValues): ComputeResult {
    const today = new Date();
    let thanksgiving = getThanksgiving(today.getFullYear());

    if (today > thanksgiving) {
      thanksgiving = getThanksgiving(today.getFullYear() + 1);
    }

    const diff = thanksgiving.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return {
      outputs: [
        {
          key: "days",
          label: "Days Until Thanksgiving",
          value: days,
          format: "number",
          highlight: true,
        },
      ],
    };
  },
};

export default def;
