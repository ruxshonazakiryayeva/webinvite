export type TemplateCategory = "toy" | "qiz_bazmi" | "el_oshi" | "tugilgan_kun" | "yubiley" | "aqiqa" | "sunnat";

export const CATEGORIES: { id: TemplateCategory; label: { uz: string; ru: string; en: string } }[] = [
  { id: "toy", label: { uz: "To'y", ru: "Свадьба", en: "Wedding" } },
  { id: "qiz_bazmi", label: { uz: "Qiz bazmi", ru: "Девичник", en: "Girls' party" } },
  { id: "el_oshi", label: { uz: "El oshi", ru: "Эл оши", en: "Feast" } },
  { id: "tugilgan_kun", label: { uz: "Tug'ilgan kun", ru: "День рождения", en: "Birthday" } },
  { id: "yubiley", label: { uz: "Yubiley", ru: "Юбилей", en: "Anniversary" } },
  { id: "aqiqa", label: { uz: "Aqiqa", ru: "Акика", en: "Aqiqa" } },
  { id: "sunnat", label: { uz: "Sunnat to'y", ru: "Суннат", en: "Sunnat" } },
];

export type TemplateMeta = {
  id: string;
  name: string;
  palette: [string, string, string];
  tagline: { uz: string; ru: string; en: string };
  categories: TemplateCategory[];
  badge?: "premium" | "new" | "popular";
};

export const templates: TemplateMeta[] = [
  { id: "luxury-gold", name: "Luxury Gold", palette: ["#171310", "#C7A253", "#F5EFE0"], categories: ["toy", "yubiley"], badge: "premium",
    tagline: { uz: "Oltin nafislik — to'y va yubiley uchun", ru: "Золотая элегантность — свадьба и юбилей", en: "Golden elegance for weddings and anniversaries" } },
  { id: "romantic-garden", name: "Romantic Garden", palette: ["#F7EDEA", "#E5B7B0", "#7C9A6D"], categories: ["toy", "qiz_bazmi"], badge: "new",
    tagline: { uz: "Gulli va mayin — bahoriy ruh", ru: "Цветы и нежность — весеннее настроение", en: "Florals and softness — a spring spirit" } },
  { id: "modern-minimal", name: "Modern Minimal", palette: ["#FAFAF8", "#2B2B2B", "#C96F4A"], categories: ["el_oshi", "tugilgan_kun"],
    tagline: { uz: "Toza, zamonaviy, minimalist", ru: "Чистый, современный, минималистичный", en: "Clean, modern, minimalist" } },
  { id: "eastern-classic", name: "Sharq Klassik", palette: ["#12303E", "#2E8C96", "#D9A441"], categories: ["toy", "aqiqa", "sunnat", "el_oshi"], badge: "new",
    tagline: { uz: "Milliy naqsh va firuza jilosi", ru: "Национальный орнамент и бирюза", en: "National ornament and turquoise glow" } },
  { id: "cloud-dream", name: "Cloud Dream", palette: ["#EAF4FD", "#BBD8F2", "#F4A259"], categories: ["tugilgan_kun", "aqiqa", "sunnat"], badge: "popular",
    tagline: { uz: "Bola bayrami uchun bulutli orzu", ru: "Облачная мечта для детского праздника", en: "A cloudy dream for kids' parties" } },
  { id: "noir-elegance", name: "Noir Elegance", palette: ["#101014", "#C9C9CF", "#D8B26E"], categories: ["yubiley", "el_oshi"], badge: "premium",
    tagline: { uz: "Art-deko hashamati", ru: "Роскошь ар-деко", en: "Art-deco luxury" } },
];
