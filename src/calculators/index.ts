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
import rentVsBuyDef from "./rent-vs-buy-calculator";
import compoundDailyDef from "./compound-daily-interest-calculator";
import caloriesWalkingDef from "./calories-burned-walking-calculator";
import pacePerKmDef from "./pace-per-km-calculator";
import rentAffordabilityDef from "./rent-affordability-calculator";
import closingCostDef from "./closing-cost-calculator";
import interestOnlyLoanDef from "./interest-only-loan-calculator";
import amortizationDef from "./amortization-calculator";
import mileTimeDef from "./mile-time-calculator";
import heartRateZoneDef from "./heart-rate-zone-calculator";
import caloriesCyclingDef from "./calories-burned-cycling-calculator";
import waterIntakeOzDef from "./water-intake-ounce-calculator";
import dateSubtractDef from "./date-subtract-calculator";
import hoursToDaysDef from "./hours-to-days-calculator";
import medianDef from "./median-calculator";
import modeDef from "./mode-calculator";
import rangeDef from "./range-calculator";
import stdDevDef from "./standard-deviation-calculator";
import monthsBetweenDef from "./months-between-dates-calculator";
import yearsBetweenDef from "./years-between-dates-calculator";
import dateAddDef from "./date-add-calculator";
import workingHoursDef from "./working-hours-calculator";
import sleepDef from "./sleep-calculator";
import countdownDef from "./countdown-calculator";
import mortgageExtraDef from "./mortgage-extra-payment-calculator";
import loanEarlyPayoffDef from "./loan-early-payoff-calculator";
import monthlySavingsDef from "./monthly-savings-calculator";
import futureValueDef from "./future-value-calculator";
import presentValueDef from "./present-value-calculator";
import gpaDef from "./gpa-calculator";
import gradeAverageDef from "./grade-average-calculator";
import fuelCostDef from "./fuel-cost-calculator";
import roadTripDef from "./road-trip-cost-calculator";
import pricePerSqftDef from "./price-per-square-foot-calculator";
import medianOfFiveCalculator from "./median-of-five-calculator";
import medianOfTenCalculator from "./median-of-ten-calculator";
import modeOfNumbersCalculator from "./mode-of-numbers-calculator";
import rangeOfNumbersCalculator from "./range-of-numbers-calculator";
import standardDeviationSimpleCalculator from "./standard-deviation-simple-calculator";
import randomNumberRangeCalculator from "./random-number-range-calculator";
import randomPasswordLengthCalculator from "./random-password-length-calculator";
import countdownDaysCalculator from "./countdown-days-calculator";
import countdownHoursCalculator from "./countdown-hours-calculator";
import sleepCycleCalculator from "./sleep-cycle-calculator";
import wakeUpTimeCalculator from "./wake-up-time-calculator";
import bedtimeCalculator from "./bedtime-calculator";
import studyHoursCalculator from "./study-hours-calculator";
import readingTimeCalculator from "./reading-time-calculator";
import dailyScreenTimeCalculator from "./daily-screen-time-calculator";
import mortgageInterestOnlyCalculator from "./mortgage-interest-only-calculator";
import mortgagePaymentExtraPrincipalCalculator from "./mortgage-payment-extra-principal-calculator";
import loanTotalInterestCalculator from "./loan-total-interest-calculator";
import loanBalanceRemainingCalculator from "./loan-balance-remaining-calculator";
import carLoanAffordabilityCalculator from "./car-loan-affordability-calculator";
import investmentDoublingTimeCalculator from "./investment-doubling-time-calculator";
import savingsInterestCalculator from "./savings-interest-calculator";
import monthlyBudgetCalculator from "./monthly-budget-calculator";
import netWorthCalculator from "./net-worth-calculator";
import debtToIncomeCalculator from "./debt-to-income-calculator";
import hydrationReminderCalculator from "./hydration-reminder-calculator";
import dailyWaterByWeightCalculator from "./daily-water-by-weight-calculator";
import caloriesBurnedRunningDistanceCalculator from "./calories-burned-running-distance-calculator";
import targetWeightLossCalculator from "./target-weight-loss-calculator";
import randomDiceCalculator from "./random-dice-calculator";
import metersToInchesCalculator from "./meters-to-inches-calculator";
import inchesToMetersCalculator from "./inches-to-meters-calculator";
import feetToInchesCalculator from "./feet-to-inches-calculator";
import inchesToFeetCalculator from "./inches-to-feet-calculator";
import yardsToFeetCalculator from "./yards-to-feet-calculator";
import feetToYardsCalculator from "./feet-to-yards-calculator";
import milesToFeetCalculator from "./miles-to-feet-calculator";
import feetToMilesCalculator from "./feet-to-miles-calculator";
import kgToGramsCalculator from "./kg-to-grams-calculator";
import gramsToKgCalculator from "./grams-to-kg-calculator";
import poundsToOuncesCalculator from "./pounds-to-ounces-calculator";
import ouncesToPoundsCalculator from "./ounces-to-pounds-calculator";
import mlToLitersCalculator from "./ml-to-liters-calculator";
import litersToMlCalculator from "./liters-to-ml-calculator";
import tablespoonsToTeaspoonsCalculator from "./tablespoons-to-teaspoons-calculator";
import teaspoonsToTablespoonsCalculator from "./teaspoons-to-tablespoons-calculator";
import cupsToMlCalculator from "./cups-to-ml-calculator";
import mlToCupsCalculator from "./ml-to-cups-calculator";
import daysToMinutesCalculator from "./days-to-minutes-calculator";
import weeksToDaysCalculator from "./weeks-to-days-calculator";
import monthsToDaysCalculator from "./months-to-days-calculator";
import daysToWeeksCalculator from "./days-to-weeks-calculator";
import daysToMonthsCalculator from "./days-to-months-calculator";
import secondsToHoursCalculator from "./seconds-to-hours-calculator";
import minutesToDaysCalculator from "./minutes-to-days-calculator";
import daysToSecondsCalculator from "./days-to-seconds-calculator";
import kilometersToMetersCalculator from "./kilometers-to-meters-calculator";
import metersToKilometersCalculator from "./meters-to-kilometers-calculator";
import millimetersToCentimetersCalculator from "./millimeters-to-centimeters-calculator";
import centimetersToMillimetersCalculator from "./centimeters-to-millimeters-calculator";
import squareMetersToSquareFeetCalculator from "./square-meters-to-square-feet-calculator";
import squareFeetToSquareMetersCalculator from "./square-feet-to-square-meters-calculator";
import acresToSquareFeetCalculator from "./acres-to-square-feet-calculator";
import squareFeetToAcresCalculator from "./square-feet-to-acres-calculator";
import barToPsiCalculator from "./bar-to-psi-calculator";
import psiToBarCalculator from "./psi-to-bar-calculator";
import kelvinToFahrenheitCalculator from "./kelvin-to-fahrenheit-calculator";
import fahrenheitToKelvinCalculator from "./fahrenheit-to-kelvin-calculator";
import metersToCentimetersCalculator from "./meters-to-centimeters-calculator";
import centimetersToMetersCalculator from "./centimeters-to-meters-calculator";
import metersToMillimetersCalculator from "./meters-to-millimeters-calculator";
import millimetersToMetersCalculator from "./millimeters-to-meters-calculator";
import kilometersToFeetCalculator from "./kilometers-to-feet-calculator";
import feetToKilometersCalculator from "./feet-to-kilometers-calculator";
import squareMetersToAcresCalculator from "./square-meters-to-acres-calculator";
import acresToSquareMetersCalculator from "./acres-to-square-meters-calculator";
import litersToCupsCalculator from "./liters-to-cups-calculator";
import cupsToLitersCalculator from "./cups-to-liters-calculator";
import poundsToKgCalculator from "./pounds-to-kg-calculator";
import kgToPoundsCalculator from "./kg-to-pounds-calculator";
import metersToFeet from "./meters-to-feet-calculator";
import feetToMeters from "./feet-to-meters-calculator";
import metersToYards from "./meters-to-yards-calculator";
import yardsToMeters from "./yards-to-meters-calculator";
import metersToMiles from "./meters-to-miles-calculator";
import milesToMeters from "./miles-to-meters-calculator";
import kilogramsToGrams from "./kilograms-to-grams-calculator";
import gramsToKilograms from "./grams-to-kilograms-calculator";
import kilogramsToPounds from "./kilograms-to-pounds-calculator";
import poundsToKilograms from "./pounds-to-kilograms-calculator";
import kilogramsToOunces from "./kilograms-to-ounces-calculator";
import ouncesToKilograms from "./ounces-to-kilograms-calculator";
import litersToMilliliters from "./liters-to-milliliters-calculator";
import millilitersToLiters from "./milliliters-to-liters-calculator";
import litersToTablespoons from "./liters-to-tablespoons-calculator";
import tablespoonsToLiters from "./tablespoons-to-liters-calculator";
import litersToTeaspoons from "./liters-to-teaspoons-calculator";
import teaspoonsToLiters from "./teaspoons-to-liters-calculator";
import squareMetersToHectares from "./square-meters-to-hectares-calculator";
import hectaresToSquareMeters from "./hectares-to-square-meters-calculator";

// REGISTRY — add new calculators here
export const calculators: CalculatorDef[] = [
  mortgage,
  randomDiceCalculator,
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
  rentVsBuyDef,
  compoundDailyDef,
  caloriesWalkingDef,
  pacePerKmDef,
  rentAffordabilityDef,
  closingCostDef,
  interestOnlyLoanDef,
  amortizationDef,
  mileTimeDef,
  heartRateZoneDef,
  caloriesCyclingDef,
  waterIntakeOzDef,
  dateSubtractDef,
  hoursToDaysDef,
  medianDef, 
  modeDef, 
  rangeDef, 
  stdDevDef,
  monthsBetweenDef, 
  yearsBetweenDef, 
  dateAddDef,
  workingHoursDef, 
  sleepDef, 
  countdownDef,
  mortgageExtraDef, 
  loanEarlyPayoffDef, 
  monthlySavingsDef,
  futureValueDef, 
  presentValueDef,
  gpaDef, 
  gradeAverageDef,
  fuelCostDef, 
  roadTripDef, 
  pricePerSqftDef,
  medianOfFiveCalculator,
 medianOfTenCalculator,
 modeOfNumbersCalculator,
 rangeOfNumbersCalculator,
 standardDeviationSimpleCalculator,
 randomNumberRangeCalculator,
 randomPasswordLengthCalculator,
 countdownDaysCalculator,
 countdownHoursCalculator,
 sleepCycleCalculator,
 wakeUpTimeCalculator,
 bedtimeCalculator,
 studyHoursCalculator,
 readingTimeCalculator,
 dailyScreenTimeCalculator,
 mortgageInterestOnlyCalculator,
 mortgagePaymentExtraPrincipalCalculator,
 loanTotalInterestCalculator,
 loanBalanceRemainingCalculator,
 carLoanAffordabilityCalculator,
 investmentDoublingTimeCalculator,
 savingsInterestCalculator,
 monthlyBudgetCalculator,
 netWorthCalculator,
 debtToIncomeCalculator,
 hydrationReminderCalculator,
 dailyWaterByWeightCalculator,
 caloriesBurnedRunningDistanceCalculator,
 targetWeightLossCalculator,

 metersToInchesCalculator,
inchesToMetersCalculator,
feetToInchesCalculator,
inchesToFeetCalculator,
yardsToFeetCalculator,
feetToYardsCalculator,
milesToFeetCalculator,
feetToMilesCalculator,
kgToGramsCalculator,
gramsToKgCalculator,
poundsToOuncesCalculator,
ouncesToPoundsCalculator,
mlToLitersCalculator,
litersToMlCalculator,
tablespoonsToTeaspoonsCalculator,
teaspoonsToTablespoonsCalculator,
cupsToMlCalculator,
mlToCupsCalculator,
daysToMinutesCalculator,
weeksToDaysCalculator,
monthsToDaysCalculator,
daysToWeeksCalculator,
daysToMonthsCalculator,
secondsToHoursCalculator,
minutesToDaysCalculator,
daysToSecondsCalculator,
kilometersToMetersCalculator,
metersToKilometersCalculator,
millimetersToCentimetersCalculator,
centimetersToMillimetersCalculator,
squareMetersToSquareFeetCalculator,
squareFeetToSquareMetersCalculator,
acresToSquareFeetCalculator,
squareFeetToAcresCalculator,
barToPsiCalculator,
psiToBarCalculator,
kelvinToFahrenheitCalculator,
fahrenheitToKelvinCalculator,
metersToCentimetersCalculator,
centimetersToMetersCalculator,
metersToMillimetersCalculator,
millimetersToMetersCalculator,
kilometersToFeetCalculator,
feetToKilometersCalculator,
squareMetersToAcresCalculator,
acresToSquareMetersCalculator,
litersToCupsCalculator,
cupsToLitersCalculator,
poundsToKgCalculator,
kgToPoundsCalculator,
metersToFeet,
feetToMeters,
metersToYards,
yardsToMeters,
metersToMiles,
milesToMeters,
kilogramsToGrams,
gramsToKilograms,
kilogramsToPounds,
poundsToKilograms,
kilogramsToOunces,
ouncesToKilograms,
litersToMilliliters,
millilitersToLiters,
litersToTablespoons,
tablespoonsToLiters,
litersToTeaspoons,
teaspoonsToLiters,
squareMetersToHectares,
hectaresToSquareMeters,
 
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
