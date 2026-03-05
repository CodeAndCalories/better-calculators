export function formatCurrency(value: number, decimals = 2): string {
  if (!isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatNumber(value: number, decimals = 2): string {
  if (!isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatPercentage(value: number, decimals = 2): string {
  if (!isFinite(value)) return "—";
  return `${formatNumber(value, decimals)}%`;
}

export function formatOutput(
  value: number | string,
  format: string
): string {
  if (typeof value === "string") return value;
  if (!isFinite(value as number)) return "—";
  const v = value as number;
  switch (format) {
    case "currency":
      return formatCurrency(v);
    case "percentage":
      return formatPercentage(v);
    case "number":
      return formatNumber(v);
    case "years":
      return v === 1 ? "1 year" : `${formatNumber(v, 1)} years`;
    case "kg":
      return `${formatNumber(v, 1)} kg`;
    case "lbs":
      return `${formatNumber(v, 1)} lbs`;
    case "liters":
      return `${formatNumber(v, 1)} L`;
    case "oz":
      return `${formatNumber(v, 0)} fl oz`;
    case "bmi":
      return formatNumber(v, 1);
    case "calories":
      return `${formatNumber(v, 0)} cal`;
    default:
      return String(v);
  }
}
