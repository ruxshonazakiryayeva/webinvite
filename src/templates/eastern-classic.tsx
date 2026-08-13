import type { CSSProperties } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Invite } from "@/lib/types";
import { useLang } from "@/lib/i18n";
import { fmtDate, fmtTime } from "@/lib/format";
import { TCountdown, TGallery, TGift, TIntro, TMap, TMusic, TParticles, TRsvp, TSection, TWishes } from "./blocks";
import "./themes.css";

const theme = {
  "--t-bg": "hsl(200 55% 12%)", "--t-surface": "hsl(200 50% 16%)", "--t-ink": "hsl(45 60% 88%)",
  "--t-muted": "hsl(200 25% 65%)", "--t-accent": "hsl(43 70% 55%)", "--t-line": "hsl(200 35% 30%)",
  "--t-serif": "'Prata', Georgia, serif", "--t-sans": "'Nunito Sans', system-ui, sans-serif",
} as CSSProperties;

const heroText: Record<string, string> = { uz: "Aziz mehmonlar, sizni kutamiz", ru: "Дорогие гости, ждём вас", en: "Dear guests, we await you" };

export default function EasternClassic({ invite }: { invite: Invite }) {
  const { lang } = useLang();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ ...theme, background: "var(--t-bg)", color: "var(--t-ink)", fontFamily: "var(--t-sans)" } as CSSProperties}>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-40"
        style={{ backgroundImage: "radial-gradient(hsl(174 60% 45% / .14) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
      <TIntro name={invite.name} subtitle={heroText[lang]} />
      {invite.music_url && <TMusic src={invite.music_url} />}
      <TParticles count={12} />

      <header className="relative px-6 pb-16 pt-24 text-center">
        <motion.div style={{ y: y1 }} className="mx-auto max-w-xl">
          <p className="t-eyebrow">✦ {heroText[lang]} ✦</p>
          <h1 className="mt-6 text-5xl leading-tight sm:text-6xl" style={{ fontFamily: "var(--t-serif)" }}>{invite.name}</h1>
          <div className="t-divider mt-10"><span style={{ color: "hsl(174 60% 55%)" }}>❖</span></div>
          <p className="mt-6 text-sm" style={{ color: "var(--t-muted)" }}>{fmtDate(invite.event_date, lang)} • {fmtTime(invite.event_date)}</p>
        </motion.div>
      </header>

      {invite.message && <TSection><p className="text-center text-xl leading-relaxed" style={{ fontFamily: "var(--t-serif)" }}>"{invite.message}"</p></TSection>}
      <TSection eyebrow="✦"><TCountdown date={invite.event_date} /></TSection>
      <TSection eyebrow={invite.location_name ?? ""}><TMap name={invite.location_name} url={invite.location_url} /></TSection>
      {invite.gallery_urls?.length ? <TSection eyebrow="✦"><TGallery urls={invite.gallery_urls} /></TSection> : null}
      <TSection eyebrow="✦"><TGift number={invite.card_number} owner={invite.card_owner} /></TSection>
      <TSection eyebrow="✦"><TRsvp inviteId={invite.id} /></TSection>
      <TSection eyebrow="✦"><TWishes inviteId={invite.id} /></TSection>
      <footer className="relative z-10 pb-10 text-center text-[11px] uppercase tracking-[0.25em]" style={{ color: "var(--t-muted)" }}>WebInvite ✦</footer>
    </div>
  );
}
