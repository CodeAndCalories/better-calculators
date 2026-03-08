import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "road-trip-cost-calculator",
  title: "Road Trip Cost Calculator",
  shortTitle: "Road Trip Cost",
  description: "Estimate the total cost of a road trip including fuel, food, lodging, and activities.",
  category: "life",
  keywords: ["road trip cost calculator", "trip budget calculator", "road trip budget", "travel cost calculator"],
  inputs: [
    { type: "number", key: "distance",    label: "Total Distance (miles)",         defaultValue: 800,  min: 1,    step: 10   },
    { type: "number", key: "mpg",         label: "Fuel Efficiency (MPG)",          defaultValue: 28,   min: 1,    step: 0.5  },
    { type: "number", key: "fuelPrice",   label: "Fuel Price ($ per gallon)",      defaultValue: 3.50, min: 0.01, step: 0.01 },
    { type: "number", key: "days",        label: "Trip Duration (days)",           defaultValue: 3,    min: 1,    max: 90, step: 1 },
    { type: "number", key: "hotelPerNight",label: "Hotel Cost Per Night ($)",      defaultValue: 120,  min: 0,    step: 5    },
    { type: "number", key: "foodPerDay",  label: "Food Budget Per Day Per Person ($)", defaultValue: 50, min: 0, step: 5  },
    { type: "number", key: "actPerDay",   label: "Activities Per Day ($)",         defaultValue: 30,   min: 0,    step: 5    },
    { type: "select", key: "travelers",   label: "Number of Travelers",            defaultValue: "2",  options: [
      { label: "1 traveler",  value: "1" },
      { label: "2 travelers", value: "2" },
      { label: "3 travelers", value: "3" },
      { label: "4 travelers", value: "4" },
    ]},
  ],
  compute(values: InputValues): ComputeResult {
    const dist    = Number(values.distance);
    const mpg     = Number(values.mpg);
    const price   = Number(values.fuelPrice);
    const days    = Number(values.days);
    const hotel   = Number(values.hotelPerNight);
    const food    = Number(values.foodPerDay);
    const act     = Number(values.actPerDay);
    const pax     = Number(values.travelers);
    if ([dist, mpg, price, days, hotel, food, act, pax].some((v) => !Number.isFinite(v) || v < 0)) {
      return { outputs: [], error: "Please enter a valid number." };
    }
    const nights       = Math.max(0, days - 1);
    const fuelCost     = (dist / mpg) * price;
    const hotelTotal   = hotel * nights;
    const foodTotal    = food * pax * days;
    const actTotal     = act * days;
    const totalCost    = fuelCost + hotelTotal + foodTotal + actTotal;
    const perPerson    = totalCost / pax;
    return {
      outputs: [
        { key: "totalCost",   label: "Total Trip Cost",      value: Math.round(totalCost),   format: "currency", highlight: true },
        { key: "perPerson",   label: "Cost Per Person",      value: Math.round(perPerson),   format: "currency" },
        { key: "fuelCost",    label: "Fuel Cost",            value: Math.round(fuelCost),    format: "currency" },
        { key: "hotelTotal",  label: "Lodging Total",        value: Math.round(hotelTotal),  format: "currency" },
        { key: "foodTotal",   label: "Food Total",           value: Math.round(foodTotal),   format: "currency" },
        { key: "actTotal",    label: "Activities Total",     value: Math.round(actTotal),    format: "currency" },
      ],
    };
  },
  howItWorks: "Fuel = (distance / MPG) × price. Lodging = hotel/night × (days − 1). Food = per person/day × travelers × days. Activities = per day × days. Total = sum of all categories.",
  relatedSlugs: ["fuel-cost-calculator", "unit-price-calculator"],
};
export default def;
