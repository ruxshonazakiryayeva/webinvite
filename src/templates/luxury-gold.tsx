import type { CSSProperties } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Invite } from "@/lib/types";
import { useLang } from "@/lib/i18n";
import { fmtDate, fmtTime } from "@/lib/format";
import { TCountdown, TGallery, TGift, TIntro, TMap, TMusic, TParticles, TRsvp, TSection, TWishes } from "./blocks";

const theme = {
  "--t-bg": "hsl(40 22% 6%)", "--t-surface": "hsl(40 18% 10%)", "--t-ink": "hsl(43 47% 90%)",
  "--t-muted": "hsl(40 14% 62%)", "--t-accent": "hsl(43 74% 55%)", "--t-line": "hsl(43 32% 24%)",
  "--t-serif": "'Cormorant Garamond', Georgia, serif", "--t-sans": "'Manrope', system-ui, sans-serif",
} as CSSProperties;

const heroText: Record<string, string> = { uz: "Siz bayramga taklif etilasiz", ru: "Вы приглашены на праздник", en: "You are invited to celebrate" };

export default function LuxuryGold({ invite }: { invite: Invite }) {
  const { lang } = useLang();
  const { scrollY } = useScroll();
  const yGlow = useTransform(scrollY, [0, 500], [0, 110]);
  const yName = useTransform(scrollY, [0, 500], [0, 40]);

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ ...theme, background: "var(--t-bg)", color: "var(--t-ink)", fontFamily: "var(--t-sans)" } as CSSProperties}>
      <TIntro name={invite.name} subtitle={heroText[lang]} />
      {invite.music_url && <TMusic src={invite.music_url} />}
      <TParticles />

      <header className="relative overflow-hidden px-6 pb-16 pt-24 text-center">
        <motion.div style={{ y: yGlow }} className="pointer-events-none absolute inset-x-0 top-0 h-64"
          // oltin nur
        >
          <div className="h-full w-full" style={{ background: "radial-gradient(55% 90% at 50% 0%, hsl(43 74% 55% / .22), transparent)" }} />
        </motion.div>
        <motion.div style={{ y: yName }} className="relative mx-auto max-w-xl">
          <p className="t-eyebrow">✦ {heroText[lang]} ✦</p>
          <h1 className="mt-6 text-6xl leading-[0.95] sm:text-7xl" style={{ fontFamily: "var(--t-serif)" }}>{invite.name}</h1>
          {invite.age ? <p className="mt-4 text-2xl italic" style={{ fontFamily: "var(--t-serif)", color: "var(--t-accent)" }}>{invite.age}+</p> : null}
          <div className="t-divider mt-10"><span>✦</span></div>
          <p className="mt-6 text-sm tracking-wide" style={{ color: "var(--t-muted)" }}>
            {fmtDate(invite.event_date, lang)} • {fmtTime(invite.event_date)}
          </p>
        </motion.div>
      </header>

      {invite.message && (
        <TSection>
          <p className="text-center text-2xl italic leading-relaxed" style={{ fontFamily: "var(--t-serif)" }}>"{invite.message}"</p>
        </TSection>
      )}

      <TSection eyebrow="⏳"><TCountdown date={invite.event_date} /></TSection>
      <TSection eyebrow={invite.location_name ?? ""}><TMap name={invite.location_name} url={invite.location_url} /></TSection>
      {invite.gallery_urls?.length ? <TSection eyebrow="✦"><TGallery urls={invite.gallery_urls} /></TSection> : null}
      <TSection eyebrow="🎁"><TGift number={invite.card_number} owner={invite.card_owner} /></TSection>
      <TSection eyebrow="✉"><TRsvp inviteId={invite.id} /></TSection>
      <TSection eyebrow="❦"><TWishes inviteId={invite.id} /></TSection>

      <footer className="relative z-10 pb-10 text-center text-[11px] uppercase tracking-[0.25em]" style={{ color: "var(--t-muted)" }}>
        WebInvite ✦
      </footer>
    </div>
  );
}
