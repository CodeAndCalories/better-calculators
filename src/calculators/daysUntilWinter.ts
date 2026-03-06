import { CalculatorDef } from "../types";

export const daysUntilWinter: CalculatorDef = {
  slug: "days-until-winter",
  title: "Days Until Winter",
  description: "Calculate how many days remain until winter begins.",
  inputs: [],
  compute: () => {
    const today = new Date();
    const year = today.getFullYear();

    let winter = new Date(year, 11, 21);

    if (today > winter) {
      winter = new Date(year + 1, 11, 21);
    }

    const diff = winter.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return { days };
  },
  outputs: [{ key: "days", label: "Days Until Winter" }],
};