import { templates } from "@/templates/registry";
import TemplateCard from "@/components/TemplateCard";
import { useLang } from "@/lib/i18n";

export default function Templates() {
  const { t } = useLang();
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <p className="eyebrow text-center">{t("cat_title")}</p>
      <h1 className="font-display mt-3 text-center text-4xl">{t("cat_sub")}</h1>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((tp) => <TemplateCard key={tp.id} tp={tp} />)}
      </div>
    </main>
  );
}
