import { CalculatorDef } from "../types";

export const daysUntilChristmas: CalculatorDef = {
  slug: "days-until-christmas",
  title: "Days Until Christmas",
  description: "Calculate how many days are left until Christmas.",
  inputs: [],
  compute: () => {
    const today = new Date();
    const year = today.getFullYear();

    let christmas = new Date(year, 11, 25);

    if (today > christmas) {
      christmas = new Date(year + 1, 11, 25);
    }

    const diff = christmas.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return { days };
  },
  outputs: [
    {
      key: "days",
      label: "Days Until Christmas",
    },
  ],
};