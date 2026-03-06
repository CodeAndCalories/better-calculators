import { CalculatorDef } from "../types";

export const daysUntilFall: CalculatorDef = {
  slug: "days-until-fall",
  title: "Days Until Fall",
  description: "Calculate how many days remain until fall begins.",
  inputs: [],
  compute: () => {
    const today = new Date();
    const year = today.getFullYear();

    let fall = new Date(year, 8, 22);

    if (today > fall) {
      fall = new Date(year + 1, 8, 22);
    }

    const diff = fall.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return { days };
  },
  outputs: [{ key: "days", label: "Days Until Fall" }],
};