import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import type { TemplateMeta } from "@/templates/registry";

const badgeStyle = {
  premium: { bg: "linear-gradient(135deg, hsl(42 70% 50%), hsl(38 80% 40%))", label: { uz: "Premium", ru: "Премиум", en: "Premium" } },
  new: { bg: "hsl(140 55% 40%)", label: { uz: "Yangi", ru: "Новый", en: "New" } },
  popular: { bg: "hsl(210 70% 45%)", label: { uz: "Ommabop", ru: "Популярный", en: "Popular" } },
};

export default function TemplateCard({ tp }: { tp: TemplateMeta }) {
  const { t, lang } = useLang();
  return (
    <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.6 }}
      className="card overflow-hidden">
      <div className="relative grid h-44 place-items-center"
        style={{ background: `linear-gradient(135deg, ${tp.palette[0]}, ${tp.palette[1]} 60%, ${tp.palette[2]})` }}>
        <span className="font-display text-6xl" style={{ color: tp.palette[2] }}>{tp.name.charAt(0)}</span>
        {tp.badge && (
          <span className="absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
            style={{ background: badgeStyle[tp.badge].bg }}>
            {badgeStyle[tp.badge].label[lang]}
          </span>
        )}
      </div>
      <div className="p-5">
        <p className="font-display text-xl">{tp.name}</p>
        <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>{tp.tagline[lang]}</p>
        <div className="mt-4 flex gap-2">
          <Link to={`/templates/${tp.id}/preview-frame`} className="btn-ghost flex-1 !py-2 text-xs">{t("btn_preview")}</Link>
          <Link to={`/create/${tp.id}`} className="btn-gold flex-1 !py-2 text-xs">{t("btn_create")}</Link>
        </div>
      </div>
    </motion.div>
  );
}
