import { CalculatorDef } from "../types";

export const daysUntilHalloween: CalculatorDef = {
  slug: "days-until-halloween",
  title: "Days Until Halloween",
  description: "Calculate how many days remain until Halloween.",
  inputs: [],
  compute: () => {
    const today = new Date();
    const year = today.getFullYear();

    let halloween = new Date(year, 9, 31);

    if (today > halloween) {
      halloween = new Date(year + 1, 9, 31);
    }

    const diff = halloween.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return { days };
  },
  outputs: [
    {
      key: "days",
      label: "Days Until Halloween",
    },
  ],
};