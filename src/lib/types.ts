export type InputType = "number" | "select" | "toggle";
export type Category = "finance" | "health" | "life" | "conversions";

export interface NumberInputSchema {
  type: "number";
  key: string;
  label: string;
  placeholder?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  helpText?: string;
}

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectInputSchema {
  type: "select";
  key: string;
  label: string;
  defaultValue?: string | number;
  options: SelectOption[];
  helpText?: string;
}

export interface ToggleInputSchema {
  type: "toggle";
  key: string;
  label: string;
  defaultValue?: boolean;
  helpText?: string;
}

export type InputSchema = NumberInputSchema | SelectInputSchema | ToggleInputSchema;

export type InputValues = Record<string, string | number | boolean>;

export interface OutputField {
  key: string;
  label: string;
  value: number | string;
  format: "currency" | "percentage" | "number" | "text" | "years" | "kg" | "lbs" | "liters" | "oz" | "bmi" | "calories";
  highlight?: boolean;
  helpText?: string;
}

export interface ComputeResult {
  outputs: OutputField[];
  error?: string;
}

export interface CalculatorExample {
  title: string;
  description: string;
  inputs: InputValues;
  result: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CalculatorDef {
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  longDescription: string;
  category: Category;
  inputs: InputSchema[];
  compute: (values: InputValues) => ComputeResult;
  howItWorks: string;
  examples: CalculatorExample[];
  faqs: FAQ[];
  relatedSlugs: string[];
  keywords?: string[];
}
