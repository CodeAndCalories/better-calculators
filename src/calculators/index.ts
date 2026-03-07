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
import aprCalculator from "./apr-calculator";
import roiCalculator from "./roi-calculator";
import cagrCalculator from "./cagr-calculator";
import salesTaxCalculator from "./sales-tax-calculator";
import breakEvenCalculator from "./break-even-calculator";
import netIncomeCalculator from "./net-income-calculator";
import creditUtilizationCalculator from "./credit-utilization-calculator";
import averageCalculator from "./average-calculator";
import ratioCalculator from "./ratio-calculator";
import percentageOfNumberCalculator from "./percentage-of-number-calculator";
import decimalToPercentCalculator from "./decimal-to-percent-calculator";
import percentToDecimalCalculator from "./percent-to-decimal-calculator";
import timeAndAHalfCalculator from "./time-and-a-half-calculator";
import minutesToDecimalHoursCalculator from "./minutes-to-decimal-hours-calculator";
import decimalHoursToMinutesCalculator from "./decimal-hours-to-minutes-calculator";
import weightedAverageCalculator from "./weighted-average-calculator";
import fractionToDecimalCalculator from "./fraction-to-decimal-calculator";
import decimalToFractionCalculator from "./decimal-to-fraction-calculator";
import compoundGrowthCalculator from "./compound-growth-calculator";
import discountPercentageCalculator from "./discount-percentage-calculator";
import hoursWorkedCalculator from "./hours-worked-calculator";
import payPerHourCalculator from "./pay-per-hour-calculator";
import fractionCalculator from "./fraction-calculator";
import ratioToPercentageCalculator from "./ratio-to-percentage-calculator";
import percentageChangeBetweenNumbersCalculator from "./percentage-change-between-numbers-calculator";
import weightedGradeCalculator from "./weighted-grade-calculator";
import tipSplitCalculator from "./tip-split-calculator";
import salaryPerMonthCalculator from "./salary-per-month-calculator";
import workHoursPerYearCalculator from "./work-hours-per-year-calculator";
import kgToLbsCalculator from "./kg-to-lbs";
import lbsToKgCalculator from "./lbs-to-kg";
import milesToKmCalculator from "./miles-to-km";
import inchesToCmCalculator from "./inches-to-cm";
import hoursToSecondsCalculator from "./hours-to-seconds";
import daysUntilChristmasCalculator from "./days-until-christmas";
import daysUntilHalloweenCalculator from "./days-until-halloween";
import daysUntilNewYearCalculator from "./days-until-new-year";
import daysUntilThanksgivingCalculator from "./days-until-thanksgiving";
import daysUntilSummerCalculator from "./days-until-summer";
import daysUntilWinterCalculator from "./days-until-winter";
import daysUntilSpringCalculator from "./days-until-spring";
import daysUntilFallCalculator from "./days-until-fall";
import celsiusToFahrenheitCalculator from "./celsius-to-fahrenheit";
import fahrenheitToCelsiusCalculator from "./fahrenheit-to-celsius";
import celsiusToKelvinCalculator from "./celsius-to-kelvin";
import kelvinToCelsiusCalculator from "./kelvin-to-celsius";
import feetToMetersCalculator from "./feet-to-meters";
import metersToFeetCalculator from "./meters-to-feet";
import yardsToMetersCalculator from "./yards-to-meters";
import gramsToOuncesCalculator from "./grams-to-ounces";
import ouncesToGramsCalculator from "./ounces-to-grams";
import minutesToSecondsCalculator from "./minutes-to-seconds";
import secondsToMinutesCalculator from "./seconds-to-minutes";
import daysToHoursCalculator from "./days-to-hours";
import mphToKmhCalculator from "./mph-to-kmh";
import kmhToMphCalculator from "./kmh-to-mph";
import litersToGallonsCalculator from "./liters-to-gallons";
import gallonsToLitersCalculator from "./gallons-to-liters";
import cmToInchesCalculator from "./cm-to-inches";
import metersToYardsCalculator from "./meters-to-yards";
import salaryToWeeklyCalculator from "./salary-to-weekly";
import salaryToDailyCalculator from "./salary-to-daily";
import weeklyToSalaryCalculator from "./weekly-to-salary";
import dailyToSalaryCalculator from "./daily-to-salary";
import percentErrorCalculator from "./percent-error";
import percentGrowthCalculator from "./percent-growth";
import bmrCalculator from "./bmr-calculator";
import tdeeCalculator from "./tdee-calculator";
import proteinIntakeCalculator from "./protein-intake-calculator";
import waterIntakeByWeightCalculator from "./water-intake-by-weight";
import bodyFatCalculator from "./body-fat-calculator";
import idealWeightCalculator from "./ideal-weight-calculator";
import macroDef from "./macro-calculator";
import calorieDeficitDef from "./calorie-deficit-calculator";
import leanBodyMassDef from "./lean-body-mass-calculator";
import waistToHeightDef from "./waist-to-height-ratio-calculator";
import targetHeartRateDef from "./target-heart-rate-calculator";
import debtPayoffDef from "./debt-payoff-calculator";
import paceDef from "./pace-calculator";
import runningSpeedDef from "./running-speed-calculator";
import carLoanDef from "./car-loan-calculator";
import downPaymentDef from "./down-payment-calculator";
import loanInterestDef from "./loan-interest-calculator";
import savingsRateDef from "./savings-rate-calculator";
import oneRepMaxDef from "./one-rep-max-calculator";
import bodySurfaceAreaDef from "./body-surface-area-calculator";
import idealBodyFatDef from "./ideal-body-fat-calculator";
import runningCadenceDef from "./running-cadence-calculator";
import pacePerMileDef from "./pace-per-mile-calculator";
import unitPriceDef from "./unit-price-calculator";

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
  aprCalculator,
  roiCalculator,
  cagrCalculator,
  salesTaxCalculator,
  breakEvenCalculator,
  netIncomeCalculator,
  creditUtilizationCalculator,
  averageCalculator,
  ratioCalculator,
  percentageOfNumberCalculator,
  decimalToPercentCalculator,
  percentToDecimalCalculator,
  timeAndAHalfCalculator,
  minutesToDecimalHoursCalculator,
  decimalHoursToMinutesCalculator,
  weightedAverageCalculator,
  fractionToDecimalCalculator,
  decimalToFractionCalculator,
  compoundGrowthCalculator,
  discountPercentageCalculator,
  hoursWorkedCalculator,
  payPerHourCalculator,
  fractionCalculator,
  ratioToPercentageCalculator,
  percentageChangeBetweenNumbersCalculator,
  weightedGradeCalculator,
  tipSplitCalculator,
  salaryPerMonthCalculator,
  workHoursPerYearCalculator,
  kgToLbsCalculator,
  lbsToKgCalculator,
  milesToKmCalculator,
  inchesToCmCalculator,
  hoursToSecondsCalculator,
  daysUntilChristmasCalculator,
  daysUntilHalloweenCalculator,
  daysUntilNewYearCalculator,
  daysUntilThanksgivingCalculator,
  daysUntilSummerCalculator,
  daysUntilWinterCalculator,
  daysUntilSpringCalculator,
  daysUntilFallCalculator,
  celsiusToFahrenheitCalculator,
  fahrenheitToCelsiusCalculator,
  celsiusToKelvinCalculator,
  kelvinToCelsiusCalculator,
  feetToMetersCalculator,
  metersToFeetCalculator,
  yardsToMetersCalculator,
  gramsToOuncesCalculator,
  ouncesToGramsCalculator,
  minutesToSecondsCalculator,
  secondsToMinutesCalculator,
  daysToHoursCalculator,
  mphToKmhCalculator,
  kmhToMphCalculator,
  litersToGallonsCalculator,
  gallonsToLitersCalculator,
  cmToInchesCalculator,
  metersToYardsCalculator,
  salaryToWeeklyCalculator,
  salaryToDailyCalculator,
  weeklyToSalaryCalculator,
  dailyToSalaryCalculator,
  percentErrorCalculator,
  percentGrowthCalculator,
  bmrCalculator,
  tdeeCalculator,
  proteinIntakeCalculator,
  waterIntakeByWeightCalculator,
  bodyFatCalculator,
  idealWeightCalculator,
  macroDef,
  calorieDeficitDef,
  leanBodyMassDef,
  waistToHeightDef,
  targetHeartRateDef,
  debtPayoffDef,
  paceDef,
  runningSpeedDef,
  carLoanDef,
  downPaymentDef,
  loanInterestDef,
  savingsRateDef,
  oneRepMaxDef,
  bodySurfaceAreaDef,
  idealBodyFatDef,
  runningCadenceDef,
  pacePerMileDef,
  unitPriceDef,
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
