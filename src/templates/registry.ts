export type TemplateMeta = {
  id: string;
  name: string;
  palette: [string, string, string];
  tagline: { uz: string; ru: string; en: string };
};

export const templates: TemplateMeta[] = [
  { id: "luxury-gold", name: "Luxury Gold", palette: ["#171310", "#C7A253", "#F5EFE0"],
    tagline: { uz: "Oltin nafislik — yubiley va to'y uchun", ru: "Золотая элегантность — юбилей и свадьба", en: "Golden elegance for anniversaries and weddings" } },
  { id: "romantic-garden", name: "Romantic Garden", palette: ["#F7EDEA", "#E5B7B0", "#7C9A6D"],
    tagline: { uz: "Gulli va mayin — bahoriy ruh", ru: "Цветы и нежность — весеннее настроение", en: "Florals and softness — a spring spirit" } },
  { id: "modern-minimal", name: "Modern Minimal", palette: ["#FAFAF8", "#2B2B2B", "#C96F4A"],
    tagline: { uz: "Toza, zamonaviy, minimalist", ru: "Чистый, современный, минималистичный", en: "Clean, modern, minimalist" } },
  { id: "eastern-classic", name: "Sharq Klassik", palette: ["#12303E", "#2E8C96", "#D9A441"],
    tagline: { uz: "Milliy naqsh va firuza jilosi", ru: "Национальный орнамент и бирюза", en: "National ornament and turquoise glow" } },
  { id: "cloud-dream", name: "Cloud Dream", palette: ["#EAF4FD", "#BBD8F2", "#F4A259"],
    tagline: { uz: "Bola bayrami uchun bulutli orzu", ru: "Облачная мечта для детского праздника", en: "A cloudy dream for kids' parties" } },
  { id: "noir-elegance", name: "Noir Elegance", palette: ["#101014", "#C9C9CF", "#D8B26E"],
    tagline: { uz: "Art-deko hashamati", ru: "Роскошь ар-деко", en: "Art-deco luxury" } },
];
