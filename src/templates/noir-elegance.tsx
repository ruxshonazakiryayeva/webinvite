import type { CSSProperties } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Invite } from "@/lib/types";
import { useLang } from "@/lib/i18n";
import { fmtDate, fmtTime } from "@/lib/format";
import { TCountdown, TGallery, TGift, TIntro, TMap, TMusic, TParticles, TRsvp, TSection, TWishes } from "./blocks";
import "./themes.css";

const theme = {
  "--t-bg": "hsl(240 6% 7%)", "--t-surface": "hsl(240 5% 11%)", "--t-ink": "hsl(40 30% 88%)",
  "--t-muted": "hsl(240 5% 60%)", "--t-accent": "hsl(43 55% 62%)", "--t-line": "hsl(240 5% 25%)",
  "--t-serif": "'Cinzel', Georgia, serif", "--t-sans": "'Montserrat', system-ui, sans-serif",
} as CSSProperties;

const heroText: Record<string, string> = { uz: "Hashamatli taklifnoma", ru: "Роскошное приглашение", en: "An elegant invitation" };

export default function NoirElegance({ invite }: { invite: Invite }) {
  const { lang } = useLang();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 80]);
  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ ...theme, background: "var(--t-bg)", color: "var(--t-ink)", fontFamily: "var(--t-sans)" } as CSSProperties}>
      <div className="pointer-events-none fixed inset-3 z-0 border" style={{ borderColor: "var(--t-line)" }} />
      <div className="pointer-events-none fixed inset-5 z-0 border" style={{ borderColor: "hsl(43 55% 62% / .35)" }} />
      <TIntro name={invite.name} subtitle={heroText[lang]} />
      {invite.music_url && <TMusic src={invite.music_url} />}
      <TParticles count={14} />

      <header className="relative px-6 pb-16 pt-28 text-center">
        <motion.div style={{ y: y1 }} className="mx-auto max-w-xl">
          <p className="t-eyebrow">◆ {heroText[lang]} ◆</p>
          <h1 className="mt-8 text-5xl uppercase leading-tight tracking-wide sm:text-6xl" style={{ fontFamily: "var(--t-serif)" }}>{invite.name}</h1>
          <div className="t-divider mt-10"><span>◆</span></div>
          <p className="mt-6 text-xs uppercase tracking-[0.35em]" style={{ color: "var(--t-muted)" }}>{fmtDate(invite.event_date, lang)} • {fmtTime(invite.event_date)}</p>
        </motion.div>
      </header>

      {invite.message && <TSection><p className="text-center text-xl italic leading-relaxed" style={{ fontFamily: "var(--t-serif)" }}>"{invite.message}"</p></TSection>}
      <TSection eyebrow="◆"><TCountdown date={invite.event_date} /></TSection>
      <TSection eyebrow={invite.location_name ?? ""}><TMap name={invite.location_name} url={invite.location_url} /></TSection>
      {invite.gallery_urls?.length ? <TSection eyebrow="◆"><TGallery urls={invite.gallery_urls} /></TSection> : null}
      <TSection eyebrow="◆"><TGift number={invite.card_number} owner={invite.card_owner} /></TSection>
      <TSection eyebrow="◆"><TRsvp inviteId={invite.id} /></TSection>
      <TSection eyebrow="◆"><TWishes inviteId={invite.id} /></TSection>
      <footer className="relative z-10 pb-12 text-center text-[10px] uppercase tracking-[0.35em]" style={{ color: "var(--t-muted)" }}>WebInvite ◆</footer>
    </div>
  );
}
