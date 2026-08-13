import type { CSSProperties } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Invite } from "@/lib/types";
import { useLang } from "@/lib/i18n";
import { fmtDate, fmtTime } from "@/lib/format";
import { TCountdown, TGallery, TGift, TIntro, TMap, TMusic, TRsvp, TSection, TWishes } from "./blocks";
import "./themes.css";

const theme = {
  "--t-bg": "hsl(210 70% 96%)", "--t-surface": "hsl(210 55% 92%)", "--t-ink": "hsl(215 45% 30%)",
  "--t-muted": "hsl(215 25% 50%)", "--t-accent": "hsl(22 90% 60%)", "--t-line": "hsl(210 40% 82%)",
  "--t-serif": "'Baloo 2', system-ui, sans-serif", "--t-sans": "'Quicksand', system-ui, sans-serif",
} as CSSProperties;

const heroText: Record<string, string> = { uz: "Bayramga taklif etamiz!", ru: "Приглашаем на праздник!", en: "You're invited to the party!" };

function Cloud({ className, style }: { className?: string; style?: CSSProperties }) {
  return <div className={`pointer-events-none absolute rounded-full bg-white/80 blur-sm ${className ?? ""}`} style={style} />;
}

export default function CloudDream({ invite }: { invite: Invite }) {
  const { lang } = useLang();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 120]);
  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ ...theme, background: "var(--t-bg)", color: "var(--t-ink)", fontFamily: "var(--t-sans)" } as CSSProperties}>
      <TIntro name={invite.name} subtitle={heroText[lang]} />
      {invite.music_url && <TMusic src={invite.music_url} />}
      <motion.div style={{ y: y1 }} className="pointer-events-none fixed inset-0 z-0">
        <Cloud className="left-[8%] top-16 h-16 w-40" />
        <Cloud className="right-[12%] top-40 h-12 w-32" />
        <Cloud className="left-[30%] top-72 h-10 w-28" />
      </motion.div>

      <header className="relative px-6 pb-16 pt-24 text-center">
        <div className="mx-auto max-w-xl">
          <p className="t-eyebrow">🎈 {heroText[lang]}</p>
          <h1 className="mt-6 text-5xl font-bold leading-tight sm:text-6xl" style={{ fontFamily: "var(--t-serif)" }}>{invite.name}</h1>
          {invite.age ? <p className="mt-4 text-2xl" style={{ color: "var(--t-accent)", fontFamily: "var(--t-serif)" }}>{invite.age} 🎉</p> : null}
          <div className="t-divider mt-10"><span>☁</span></div>
          <p className="mt-6 text-sm font-semibold" style={{ color: "var(--t-muted)" }}>{fmtDate(invite.event_date, lang)} • {fmtTime(invite.event_date)}</p>
        </div>
      </header>

      {invite.message && <TSection><p className="text-center text-lg font-semibold leading-relaxed">{invite.message}</p></TSection>}
      <TSection eyebrow="☁"><TCountdown date={invite.event_date} /></TSection>
      <TSection eyebrow={invite.location_name ?? ""}><TMap name={invite.location_name} url={invite.location_url} /></TSection>
      {invite.gallery_urls?.length ? <TSection eyebrow="☁"><TGallery urls={invite.gallery_urls} /></TSection> : null}
      <TSection eyebrow="🎁"><TGift number={invite.card_number} owner={invite.card_owner} /></TSection>
      <TSection eyebrow="☁"><TRsvp inviteId={invite.id} /></TSection>
      <TSection eyebrow="☁"><TWishes inviteId={invite.id} /></TSection>
      <footer className="relative z-10 pb-10 text-center text-[11px] uppercase tracking-[0.25em]" style={{ color: "var(--t-muted)" }}>WebInvite 🎈</footer>
    </div>
  );
}
