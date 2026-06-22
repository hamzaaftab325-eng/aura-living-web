/* ============================================================================
   lib/format.ts — Locale-aware formatters (PKR currency, dates, phone)
   Source: Architecture Plan v1.1 §12.6 (Pakistani UX patterns)
   ============================================================================ */

const PKR_FORMATTER = new Intl.NumberFormat("ur-PK", {
  style: "currency",
  currency: "PKR",
  maximumFractionDigits: 0,
});

const PKR_FORMATTER_EN = new Intl.NumberFormat("en-PK", {
  style: "currency",
  currency: "PKR",
  maximumFractionDigits: 0,
});

/** Format a number as PKR currency: 12450 → "Rs 12,450" */
export function formatPKR(amount: number, locale: "en" | "ur" = "en"): string {
  if (Number.isNaN(amount) || amount == null) return "Rs 0";
  return locale === "ur"
    ? PKR_FORMATTER.format(amount)
    : PKR_FORMATTER_EN.format(amount);
}

/** Format a date in Pakistani style: "12 June 2026" */
export function formatDate(
  date: Date | string,
  locale: "en" | "ur" = "en"
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale === "ur" ? "ur-PK" : "en-PK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

/** Format an estimated delivery window: "3–5 days" or "by 15 June" */
export function formatDeliveryWindow(days: number): string {
  if (days <= 1) return "1 day";
  return `${days} days`;
}

/** Normalize a Pakistani phone number to +92 3XX XXXXXXX */
export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  // Strip leading 0 or 92
  const stripped = digits.replace(/^0+/, "").replace(/^92/, "");
  if (stripped.length !== 10) return raw;
  return `+92 ${stripped.slice(0, 3)} ${stripped.slice(3, 10)}`;
}

/** Validate Pakistani phone: +92 3XX XXXXXXX or 03XX XXXXXXX */
export function isValidPakistaniPhone(raw: string): boolean {
  const digits = raw.replace(/\D/g, "");
  const stripped = digits.replace(/^0+/, "").replace(/^92/, "");
  return stripped.length === 10 && stripped.startsWith("3");
}

/** Format a discount percentage */
export function formatDiscount(
  price: number,
  compareAtPrice?: number
): number | null {
  if (!compareAtPrice || compareAtPrice <= price) return null;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}

/** Slugify a string for URLs */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Truncate text to a max length, adding ellipsis */
export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + "…";
}
