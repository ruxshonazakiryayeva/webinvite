import type { CSSProperties } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Invite } from "@/lib/types";
import { useLang } from "@/lib/i18n";
import { fmtDate, fmtTime } from "@/lib/format";
import { TCountdown, TGallery, TGift, TIntro, TMap, TMusic, TParticles, TRsvp, TSection, TWishes } from "./blocks";
import "./themes.css";

const theme = {
  "--t-bg": "hsl(20 60% 97%)", "--t-surface": "hsl(20 45% 93%)", "--t-ink": "hsl(20 30% 25%)",
  "--t-muted": "hsl(20 15% 45%)", "--t-accent": "hsl(350 45% 55%)", "--t-line": "hsl(20 30% 84%)",
  "--t-serif": "'Playfair Display', Georgia, serif", "--t-sans": "'Nunito Sans', system-ui, sans-serif",
} as CSSProperties;

const heroText: Record<string, string> = { uz: "Siz bayramga taklif etilasiz", ru: "Вы приглашены на праздник", en: "You are invited to celebrate" };

export default function RomanticGarden({ invite }: { invite: Invite }) {
  const { lang } = useLang();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 90]);
  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ ...theme, background: "var(--t-bg)", color: "var(--t-ink)", fontFamily: "var(--t-sans)" } as CSSProperties}>
      <TIntro name={invite.name} subtitle={heroText[lang]} />
      {invite.music_url && <TMusic src={invite.music_url} />}
      <TParticles count={10} />
      <div className="pointer-events-none fixed left-4 top-6 z-0 text-7xl opacity-10" style={{ color: "var(--t-accent)" }}>❀</div>
      <div className="pointer-events-none fixed right-4 top-24 z-0 text-6xl opacity-10" style={{ color: "var(--t-accent)" }}>✿</div>
      <div className="pointer-events-none fixed bottom-10 left-8 z-0 text-6xl opacity-10" style={{ color: "var(--t-accent)" }}>✿</div>

      <header className="relative px-6 pb-16 pt-24 text-center">
        <motion.div style={{ y: y1 }} className="relative mx-auto max-w-xl">
          <p className="t-eyebrow">❀ {heroText[lang]} ❀</p>
          <h1 className="mt-6 text-5xl italic leading-tight sm:text-6xl" style={{ fontFamily: "var(--t-serif)" }}>{invite.name}</h1>
          <div className="t-divider mt-10"><span>❀</span></div>
          <p className="mt-6 text-sm" style={{ color: "var(--t-muted)" }}>{fmtDate(invite.event_date, lang)} • {fmtTime(invite.event_date)}</p>
        </motion.div>
      </header>

      {invite.message && <TSection><p className="text-center text-xl italic leading-relaxed" style={{ fontFamily: "var(--t-serif)" }}>"{invite.message}"</p></TSection>}
      <TSection eyebrow="❀"><TCountdown date={invite.event_date} /></TSection>
      <TSection eyebrow={invite.location_name ?? ""}><TMap name={invite.location_name} url={invite.location_url} /></TSection>
      {invite.gallery_urls?.length ? <TSection eyebrow="❀"><TGallery urls={invite.gallery_urls} /></TSection> : null}
      <TSection eyebrow="❀"><TGift number={invite.card_number} owner={invite.card_owner} /></TSection>
      <TSection eyebrow="❀"><TRsvp inviteId={invite.id} /></TSection>
      <TSection eyebrow="❀"><TWishes inviteId={invite.id} /></TSection>
      <footer className="relative z-10 pb-10 text-center text-[11px] uppercase tracking-[0.25em]" style={{ color: "var(--t-muted)" }}>WebInvite ❀</footer>
    </div>
  );
}
