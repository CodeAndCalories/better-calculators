import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "calories-burned-cycling-calculator",
  title: "Calories Burned Cycling Calculator",
  shortTitle: "Cycling Calories",
  description: "Estimate calories burned cycling based on your weight, distance, and speed.",
  longDescription:
    "Cycling is an efficient calorie-burning exercise. This calculator uses MET (Metabolic Equivalent of Task) values from the Compendium of Physical Activities to estimate calories burned based on your body weight, distance cycled, and average speed. Works for road cycling, leisure cycling, and stationary bikes.",
  category: "health",
  keywords: ["calories burned cycling calculator", "cycling calorie calculator", "bike ride calories", "how many calories cycling", "cycling exercise calories"],
  inputs: [
    {
      type: "number",
      key: "weightKg",
      label: "Body Weight (kg)",
      defaultValue: 75,
      min: 20,
      max: 300,
      step: 0.5,
      placeholder: "75",
    },
    {
      type: "number",
      key: "distanceKm",
      label: "Distance (km)",
      defaultValue: 20,
      min: 0.1,
      max: 500,
      step: 0.5,
      placeholder: "20",
    },
    {
      type: "select",
      key: "intensity",
      label: "Cycling Intensity",
      defaultValue: "moderate",
      options: [
        { label: "Leisurely (< 16 km/h)", value: "leisurely" },
        { label: "Moderate (16–19 km/h)", value: "moderate" },
        { label: "Vigorous (19–22 km/h)", value: "vigorous" },
        { label: "Racing (22–26 km/h)", value: "racing" },
        { label: "Very Fast (> 26 km/h)", value: "veryfast" },
      ],
    },
  ],

  compute(values: InputValues): ComputeResult {
    const weightKg = Number(values.weightKg);
    const distanceKm = Number(values.distanceKm);
    const intensity = values.intensity as string;

    if (
      !Number.isFinite(weightKg) || !Number.isFinite(distanceKm) ||
      weightKg <= 0 || distanceKm <= 0
    ) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    // MET values and average speeds from Compendium of Physical Activities
    type IntensityData = { met: number; speedKmh: number };
    const intensityMap: Record<string, IntensityData> = {
      leisurely: { met: 4.0,  speedKmh: 14 },
      moderate:  { met: 6.8,  speedKmh: 17.5 },
      vigorous:  { met: 8.0,  speedKmh: 20.5 },
      racing:    { met: 10.0, speedKmh: 24 },
      veryfast:  { met: 12.0, speedKmh: 28 },
    };

    const { met, speedKmh } = intensityMap[intensity] ?? intensityMap["moderate"];

    const timeHours = distanceKm / speedKmh;
    const timeMinutes = timeHours * 60;
    const caloriesBurned = met * weightKg * timeHours;

    return {
      outputs: [
        { key: "caloriesBurned", label: "Calories Burned", value: Math.round(caloriesBurned), format: "calories", highlight: true },
        { key: "timeMinutes", label: "Estimated Ride Time (min)", value: Math.round(timeMinutes), format: "number" },
        { key: "caloriesPerKm", label: "Calories per Kilometre", value: Math.round((caloriesBurned / distanceKm) * 10) / 10, format: "number" },
      ],
    };
  },

  howItWorks: `Calories = MET × weight (kg) × time (hours). MET values by intensity (Compendium of Physical Activities): Leisurely 4.0, Moderate 6.8, Vigorous 8.0, Racing 10.0, Very Fast 12.0. Ride time is estimated from distance ÷ typical speed for that intensity.`,

  examples: [
    {
      title: "75 kg cyclist, 20 km at moderate pace",
      description: "A typical commute or casual weekend ride.",
      inputs: { weightKg: 75, distanceKm: 20, intensity: "moderate" },
      result: "~466 calories in ~69 minutes.",
    },
    {
      title: "80 kg cyclist, 40 km at vigorous pace",
      description: "A faster training ride.",
      inputs: { weightKg: 80, distanceKm: 40, intensity: "vigorous" },
      result: "~1,254 calories in ~117 minutes.",
    },
  ],

  faqs: [
    {
      question: "Does cycling or running burn more calories?",
      answer: "Running burns more calories per hour at similar effort levels due to higher muscle recruitment. However, cycling is lower impact so riders often sustain longer sessions, which can result in similar total calorie burns.",
    },
    {
      question: "Does this apply to stationary bikes?",
      answer: "Yes — the MET values are similar for stationary cycling at equivalent effort levels. Use the intensity that matches your perceived exertion.",
    },
    {
      question: "Why does the result depend on weight?",
      answer: "Heavier individuals burn more calories for the same activity because more energy is required to move a larger mass.",
    },
  ],

  relatedSlugs: ["calories-burned-walking-calculator", "calorie-calculator", "heart-rate-zone-calculator", "target-heart-rate-calculator"],
};

export default def;
