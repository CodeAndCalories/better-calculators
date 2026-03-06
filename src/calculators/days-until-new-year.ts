import { CalculatorDef } from "../types";

export const daysUntilNewYear: CalculatorDef = {
  slug: "days-until-new-year",
  title: "Days Until New Year",
  description: "Calculate how many days remain until the New Year.",
  inputs: [],
  compute: () => {
    const today = new Date();
    const year = today.getFullYear();

    let newYear = new Date(year + 1, 0, 1);

    const diff = newYear.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return { days };
  },
  outputs: [
    {
      key: "days",
      label: "Days Until New Year",
    },
  ],
};