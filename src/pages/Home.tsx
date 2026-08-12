import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLang } from "@/lib/i18n";
import { templates } from "@/templates/registry";
import TemplateCard from "@/components/TemplateCard";

const fade = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6 },
};

const steps = [
  { t: "how1", d: "how1d" },
  { t: "how2", d: "how2d" },
  { t: "how3", d: "how3d" },
] as const;

export default function Home() {
  const { t } = useLang();
  return (
    <main>
      <section className="relative overflow-hidden px-4 pb-20 pt-24 text-center">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72"
          style={{ background: "radial-gradient(60% 100% at 50% 0%, hsl(42 70% 55% / .18), transparent)" }} />
        <motion.div {...fade} className="relative mx-auto max-w-3xl">
          <p className="eyebrow">{t("tagline")}</p>
          <h1 className="font-display mt-5 text-5xl leading-[1.05] sm:text-6xl">{t("hero_title")}</h1>
          <p className="mx-auto mt-5 max-w-xl text-[15px]" style={{ color: "var(--muted)" }}>{t("hero_sub")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/templates" className="btn-gold">{t("hero_cta")}</Link>
            <a href="#how" className="btn-ghost">{t("hero_cta2")}</a>
          </div>
        </motion.div>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-4 py-16">
        <motion.p {...fade} className="eyebrow text-center">{t("how_title")}</motion.p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div {...fade} key={s.t} className="card p-6 text-center">
              <span className="font-display mx-auto grid h-12 w-12 place-items-center rounded-full text-xl"
                style={{ background: "hsl(42 70% 55% / .15)", color: "var(--gold)" }}>{i + 1}</span>
              <p className="font-display mt-4 text-xl">{t(s.t)}</p>
              <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>{t(s.d)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <motion.p {...fade} className="eyebrow text-center">{t("cat_title")}</motion.p>
        <motion.h2 {...fade} className="font-display mx-auto mt-3 max-w-xl text-center text-4xl">{t("cat_sub")}</motion.h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((tp) => <TemplateCard key={tp.id} tp={tp} />)}
        </div>
      </section>
    </main>
  );
}
