import type { CSSProperties } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Invite } from "@/lib/types";
import { useLang } from "@/lib/i18n";
import { fmtDate, fmtTime } from "@/lib/format";
import { TCountdown, TGallery, TGift, TIntro, TMap, TMusic, TRsvp, TSection, TWishes } from "./blocks";
import "./themes.css";

const theme = {
  "--t-bg": "hsl(40 20% 98%)", "--t-surface": "hsl(40 15% 95%)", "--t-ink": "hsl(20 10% 12%)",
  "--t-muted": "hsl(20 8% 45%)", "--t-accent": "hsl(16 55% 45%)", "--t-line": "hsl(40 12% 84%)",
  "--t-serif": "'Space Grotesk', system-ui, sans-serif", "--t-sans": "'Inter', system-ui, sans-serif",
} as CSSProperties;

const heroText: Record<string, string> = { uz: "Taklifnoma", ru: "Приглашение", en: "Invitation" };

export default function ModernMinimal({ invite }: { invite: Invite }) {
  const { lang } = useLang();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 60]);
  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ ...theme, background: "var(--t-bg)", color: "var(--t-ink)", fontFamily: "var(--t-sans)" } as CSSProperties}>
      <TIntro name={invite.name} subtitle={heroText[lang]} />
      {invite.music_url && <TMusic src={invite.music_url} />}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-px" style={{ background: "var(--t-ink)" }} />

      <header className="relative px-6 pb-16 pt-28 text-center">
        <motion.div style={{ y: y1 }} className="mx-auto max-w-xl">
          <p className="t-eyebrow">{heroText[lang]} — {fmtDate(invite.event_date, lang)}</p>
          <h1 className="mt-8 text-5xl font-bold uppercase tracking-tight sm:text-7xl" style={{ fontFamily: "var(--t-serif)" }}>{invite.name}</h1>
          <div className="mx-auto mt-10 h-px w-24" style={{ background: "var(--t-accent)" }} />
          <p className="mt-6 text-xs uppercase tracking-[0.3em]" style={{ color: "var(--t-muted)" }}>{fmtTime(invite.event_date)}</p>
        </motion.div>
      </header>

      {invite.message && <TSection><p className="text-center text-lg leading-relaxed" style={{ color: "var(--t-muted)" }}>{invite.message}</p></TSection>}
      <TSection eyebrow="—"><TCountdown date={invite.event_date} /></TSection>
      <TSection eyebrow="—"><TMap name={invite.location_name} url={invite.location_url} /></TSection>
      {invite.gallery_urls?.length ? <TSection eyebrow="—"><TGallery urls={invite.gallery_urls} /></TSection> : null}
      <TSection eyebrow="—"><TGift number={invite.card_number} owner={invite.card_owner} /></TSection>
      <TSection eyebrow="—"><TRsvp inviteId={invite.id} /></TSection>
      <TSection eyebrow="—"><TWishes inviteId={invite.id} /></TSection>
      <footer className="relative z-10 pb-10 text-center text-[10px] uppercase tracking-[0.3em]" style={{ color: "var(--t-muted)" }}>WebInvite</footer>
    </div>
  );
}
