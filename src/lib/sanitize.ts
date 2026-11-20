/** Field length limits shared by every form. */
export const LIMITS = { name: 60, email: 254, company: 80, message: 2000 } as const;

/** Removes anything that could be interpreted as markup: `<`, `>` and control characters. Used while typing. */
export const stripMarkup = (value: string) =>
  value.replace(/[<>]/g, "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");

/**
 * Final clean-up before a value leaves the browser: drops whole tags (with script/style contents),
 * and neutralises spreadsheet formulas (=, +, -, @ at the start) since submissions land in Google Sheets.
 */
export const sanitizeForSubmit = (value: string) => {
  const cleaned = stripMarkup(
    value
      .replace(/<\s*(script|style)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, "")
      .replace(/<[^>]*>?/g, ""),
  ).trim();
  return /^[=+\-@]/.test(cleaned) && !/^\+?[\d\s()-]+$/.test(cleaned) ? `'${cleaned}` : cleaned;
};
