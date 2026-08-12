export function fmtDate(iso: string, lang: string) {
  const locales: Record<string, string> = { uz: "uz-UZ", ru: "ru-RU", en: "en-GB" };
  return new Intl.DateTimeFormat(locales[lang] ?? "uz-UZ", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
}

export function fmtTime(iso: string) {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}
