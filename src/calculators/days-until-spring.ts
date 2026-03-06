import { CalculatorDef } from "../types";

export const daysUntilSpring: CalculatorDef = {
  slug: "days-until-spring",
  title: "Days Until Spring",
  description: "Calculate how many days remain until spring begins.",
  inputs: [],
  compute: () => {
    const today = new Date();
    const year = today.getFullYear();

    let spring = new Date(year, 2, 20);

    if (today > spring) {
      spring = new Date(year + 1, 2, 20);
    }

    const diff = spring.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return { days };
  },
  outputs: [{ key: "days", label: "Days Until Spring" }],
};