import type { CalculatorDef } from "@/lib/types";
import mortgage from "./mortgage";
import loanPayment from "./loan-payment";
import compoundInterest from "./compound-interest";
import simpleInterest from "./simple-interest";
import creditCardPayoff from "./credit-card-payoff";
import percentage from "./percentage";
import discount from "./discount";
import tip from "./tip";
import age from "./age";
import bmi from "./bmi";
import calorie from "./calorie";
import waterIntake from "./water-intake";
import inflationCalculator from "./inflation-calculator";
import salaryToHourlyCalculator from "./salary-to-hourly-calculator";
import loanAffordabilityCalculator from "./loan-affordability-calculator";
import savingsGoalCalculator from "./savings-goal-calculator";
import dateDifferenceCalculator from "./date-difference-calculator";
import timeInXMinutes from "./time-in-x-minutes";
import timeXMinutesAgo from "./time-x-minutes-ago";
import timeDurationCalculator from "./time-duration-calculator";
import minutesToHoursCalculator from "./minutes-to-hours-calculator";
import hoursToMinutesCalculator from "./hours-to-minutes-calculator";
import percentageIncreaseCalculator from "./percentage-increase-calculator";
import percentageDecreaseCalculator from "./percentage-decrease-calculator";
import hourlyToSalaryCalculator from "./hourly-to-salary-calculator";
import daysBetweenDatesCalculator from "./days-between-dates-calculator";
import ageDifferenceCalculator from "./age-difference-calculator";
import timeUntilDateCalculator from "./time-until-date-calculator";
import daysUntilCalculator from "./days-until-calculator";
import salaryAfterTaxCalculator from "./salary-after-tax-calculator";
import workHoursCalculator from "./work-hours-calculator";
import timeBetweenTimesCalculator from "./time-between-times-calculator";
import percentageChangeCalculator from "./percentage-change-calculator";
import percentageDifferenceCalculator from "./percentage-difference-calculator";
import marginCalculator from "./margin-calculator";
import markupCalculator from "./markup-calculator";
import hoursBetweenDatesCalculator from "./hours-between-dates-calculator";
import weeksBetweenDatesCalculator from "./weeks-between-dates-calculator";
import commissionCalculator from "./commission-calculator";
import overtimePayCalculator from "./overtime-pay-calculator";
import percentOffCalculator from "./percent-off-calculator";
import profitMarginCalculator from "./profit-margin-calculator";
import percentDifferenceCalculator from "./percent-difference-calculator";
import businessDaysBetweenDatesCalculator from "./business-days-between-dates-calculator";
import pregnancyDueDateCalculator from "./pregnancy-due-date-calculator";
import loanCalculator from "./loan-calculator";

// REGISTRY — add new calculators here
export const calculators: CalculatorDef[] = [
  mortgage,
  loanPayment,
  compoundInterest,
  simpleInterest,
  creditCardPayoff,
  percentage,
  discount,
  tip,
  age,
  bmi,
  calorie,
  waterIntake,

  inflationCalculator,
  salaryToHourlyCalculator,
  loanAffordabilityCalculator,
  savingsGoalCalculator,

  dateDifferenceCalculator,
  timeInXMinutes,
  timeXMinutesAgo,
  timeDurationCalculator,
  businessDaysBetweenDatesCalculator,
  pregnancyDueDateCalculator,
  loanCalculator,

  minutesToHoursCalculator,
  hoursToMinutesCalculator,
  percentageIncreaseCalculator,
  percentageDecreaseCalculator,
  hourlyToSalaryCalculator,
  daysBetweenDatesCalculator,
  ageDifferenceCalculator,
  timeUntilDateCalculator,
  daysUntilCalculator,
  salaryAfterTaxCalculator,
  workHoursCalculator,
  timeBetweenTimesCalculator,
  percentageChangeCalculator,

 hoursBetweenDatesCalculator,
 weeksBetweenDatesCalculator,
 percentageDifferenceCalculator,
 marginCalculator,
 markupCalculator,

commissionCalculator,
overtimePayCalculator,
percentOffCalculator,
profitMarginCalculator,
percentDifferenceCalculator,
];

export function getCalculatorBySlug(slug: string): CalculatorDef | undefined {
  return calculators.find((c) => c.slug === slug);
}

export function getCalculatorsByCategory(category: string): CalculatorDef[] {
  return calculators.filter((c) => c.category === category);
}

export function getRelatedCalculators(slugs: string[]): CalculatorDef[] {
  return slugs.flatMap((s) => {
    const c = getCalculatorBySlug(s);
    return c ? [c] : [];
  });
}
