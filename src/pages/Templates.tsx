import { useState } from "react";
import { templates, type TemplateCategory } from "@/templates/registry";
import TemplateCard from "@/components/TemplateCard";
import { useLang } from "@/lib/i18n";

const cats: { id: TemplateCategory | "hammasi"; label: { uz: string; ru: string; en: string } }[] = [
  { id: "hammasi", label: { uz: "Hammasi", ru: "Все", en: "All" } },
  { id: "toy", label: { uz: "To'y", ru: "Свадьба", en: "Wedding" } },
  { id: "yubiley", label: { uz: "Yubiley", ru: "Юбилей", en: "Anniversary" } },
  { id: "bola", label: { uz: "Bola", ru: "Детский", en: "Kids" } },
  { id: "universal", label: { uz: "Universal", ru: "Универсал", en: "Universal" } },
];

export default function Templates() {
  const { t, lang } = useLang();
  const [cat, setCat] = useState<TemplateCategory | "hammasi">("hammasi");
  const list = cat === "hammasi" ? templates : templates.filter((x) => x.category === cat);
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <p className="eyebrow text-center">{t("cat_title")}</p>
      <h1 className="font-display mt-3 text-center text-4xl">{t("cat_sub")}</h1>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {cats.map((c) => (
          <button key={c.id} onClick={() => setCat(c.id)}
            className="rounded-full border px-4 py-2 text-xs font-bold transition"
            style={cat === c.id
              ? { background: "var(--gold)", borderColor: "var(--gold)", color: "#fff" }
              : { borderColor: "var(--line)", color: "var(--muted)" }}>
            {c.label[lang]}
          </button>
        ))}
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((tp) => <TemplateCard key={tp.id} tp={tp} />)}
      </div>
    </main>
  );
}
