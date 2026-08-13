import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { addRsvp, addWish, fetchWishes } from "@/lib/invites";
import type { Wish } from "@/lib/types";
import "./blocks.css";

export function TReveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }} transition={{ duration: 0.7, delay, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}

export function TSection({ eyebrow, children }: { eyebrow?: string; children: ReactNode }) {
  return (
    <section className="relative z-10 mx-auto max-w-2xl px-6 py-12">
      <TReveal>
        {eyebrow && (<><p className="t-eyebrow text-center">{eyebrow}</p><div className="t-divider mt-4 mb-8"><span>✦</span></div></>)}
        {children}
      </TReveal>
    </section>
  );
}

export function TIntro({ name, subtitle }: { name: string; subtitle?: string }) {
  const { t } = useLang();
  const [phase, setPhase] = useState<"closed" | "opening" | "gone">("closed");
  const open = () => { if (phase === "closed") { setPhase("opening"); setTimeout(() => setPhase("gone"), 1100); } };
  if (phase === "gone") return null;
  return (
    <div className="fixed inset-0 z-50 overflow-hidden" style={{ background: "var(--t-bg)" }}>
      <motion.div className="absolute inset-y-0 left-0 w-1/2" style={{ background: "var(--t-surface)", borderRight: "1px solid var(--t-line)" }}
        animate={phase === "opening" ? { x: "-101%" } : { x: 0 }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} />
      <motion.div className="absolute inset-y-0 right-0 w-1/2" style={{ background: "var(--t-surface)", borderLeft: "1px solid var(--t-line)" }}
        animate={phase === "opening" ? { x: "101%" } : { x: 0 }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} />
      <motion.div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        animate={phase === "opening" ? { opacity: 0, scale: 1.05 } : { opacity: 1 }} transition={{ duration: 0.6 }}>
        {subtitle && <p className="t-eyebrow">{subtitle}</p>}
        <h1 className="mt-4 text-5xl sm:text-6xl" style={{ fontFamily: "var(--t-serif)", color: "var(--t-ink)" }}>{name}</h1>
        <button className="t-seal mt-10" onClick={open} aria-label={t("open")}>✦</button>
        <p className="mt-5 text-[11px] uppercase tracking-[0.3em]" style={{ color: "var(--t-muted)" }}>{t("open")}</p>
      </motion.div>
    </div>
  );
}

export function TMusic({ src }: { src: string }) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const a = new Audio(src); a.loop = true; ref.current = a;
    const tryPlay = () => a.play().then(() => setPlaying(true)).catch(() => {});
    window.addEventListener("pointerdown", tryPlay, { once: true });
    return () => { window.removeEventListener("pointerdown", tryPlay); a.pause(); };
  }, [src]);
  const toggle = () => {
    const a = ref.current; if (!a) return;
    if (playing) { a.pause(); setPlaying(false); } else { a.play().catch(() => {}); setPlaying(true); }
  };
  return <button className="t-music" onClick={toggle}><span className={playing ? "t-spin" : ""}>♫</span></button>;
}

export function TParticles({ count = 16 }: { count?: number }) {
  const parts = useMemo(() => Array.from({ length: count }, (_, i) => ({
    left: (i * 53) % 100, delay: (i * 0.7) % 6, dur: 9 + (i % 5) * 2, size: 3 + (i % 3) * 2,
  })), [count]);
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {parts.map((p, i) => (
        <span key={i} className="t-particle" style={{ left: `${p.left}%`, width: p.size, height: p.size, animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s` }} />
      ))}
    </div>
  );
}

export function TCountdown({ date }: { date: string }) {
  const { t } = useLang();
  const target = useMemo(() => new Date(date).getTime(), [date]);
  const [left, setLeft] = useState(() => Math.max(0, target - Date.now()));
  useEffect(() => {
    const x = setInterval(() => setLeft(Math.max(0, target - Date.now())), 1000);
    return () => clearInterval(x);
  }, [target]);
  const s = Math.floor(left / 1000);
  const cells = [
    { v: Math.floor(s / 86400), l: t("days") }, { v: Math.floor((s % 86400) / 3600), l: t("hours") },
    { v: Math.floor((s % 3600) / 60), l: t("minutes") }, { v: s % 60, l: t("seconds") },
  ];
  return (
    <div className="flex justify-center gap-3 sm:gap-4">
      {cells.map((c) => <div key={c.l} className="t-tile"><b>{String(c.v).padStart(2, "0")}</b><span>{c.l}</span></div>)}
    </div>
  );
}

export function TGallery({ urls }: { urls: string[] }) {
  const [idx, setIdx] = useState<number | null>(null);
  if (!urls?.length) return null;
  const step = (d: number) => setIdx((p) => (p === null ? p : (p + d + urls.length) % urls.length));
  return (
    <>
      <div className="t-gallery grid grid-cols-2 gap-3 sm:grid-cols-3">
        {urls.map((u, i) => (
          <motion.button key={i} whileHover={{ scale: 1.03 }} onClick={() => setIdx(i)}>
            <img src={u} alt="" loading="lazy" />
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {idx !== null && (
          <motion.div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIdx(null)}>
            <motion.img key={idx} src={urls[idx]} initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="max-h-[85vh] max-w-full rounded-lg object-contain" onClick={(e) => e.stopPropagation()} />
            <button className="absolute left-3 top-1/2 -translate-y-1/2 px-3 text-3xl text-white" onClick={(e) => { e.stopPropagation(); step(-1); }}>‹</button>
            <button className="absolute right-3 top-1/2 -translate-y-1/2 px-3 text-3xl text-white" onClick={(e) => { e.stopPropagation(); step(1); }}>›</button>
            <button className="absolute right-4 top-4 text-2xl text-white" onClick={() => setIdx(null)}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function TMap({ name, url }: { name: string | null; url: string | null }) {
  const { t } = useLang();
  if (!name && !url) return null;
  const q = encodeURIComponent(name || "Tashkent");
  return (
    <div className="t-card overflow-hidden">
      <iframe title="Map" src={`https://www.google.com/maps?q=${q}&output=embed`} className="h-64 w-full border-0" loading="lazy" />
      <div className="p-4 text-center">
        <a className="text-sm underline" style={{ color: "var(--t-accent)" }}
          href={url || `https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noreferrer">{t("map_dir")} →</a>
      </div>
    </div>
  );
}

export function TGift({ number, owner }: { number: string | null; owner: string | null }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  if (!number) return null;
  const pretty = number.replace(/\s+/g, "").replace(/(.{4})/g, "$1 ").trim();
  const copy = async () => {
    try { await navigator.clipboard.writeText(number.replace(/\s+/g, "")); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* ok */ }
  };
  return (
    <div className="t-card p-6 text-center">
      <p className="t-eyebrow">{t("gift_title")}</p>
      {owner && <p className="mt-3 text-xl" style={{ fontFamily: "var(--t-serif)", color: "var(--t-ink)" }}>{owner}</p>}
      <p className="mt-2 text-2xl tracking-wider" style={{ fontFamily: "var(--t-serif)", color: "var(--t-accent)" }}>{pretty}</p>
      <button className="t-btn mt-5" onClick={copy}>{copied ? t("copied") + " ✓" : t("copy")}</button>
    </div>
  );
}

export function TWishes({ inviteId }: { inviteId: string }) {
  const { t } = useLang();
  const [items, setItems] = useState<Wish[]>([]);
  const [name, setName] = useState(""); const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);
  useEffect(() => { fetchWishes(inviteId).then(setItems).catch(() => {}); }, [inviteId]);
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) return;
    await addWish(inviteId, name.trim(), msg.trim());
    // 👇 Egaga bot orqali bildirishnoma
    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "wish", invite_id: inviteId, guest_name: name.trim(), message: msg.trim() }),
    });
    setItems((p) => [{ id: crypto.randomUUID(), guest_name: name.trim(), message: msg.trim(), created_at: new Date().toISOString() }, ...p]);
    setName(""); setMsg(""); setSent(true); setTimeout(() => setSent(false), 2500);
  };
  return (
    <div>
      <form onSubmit={submit} className="t-card space-y-3 p-5">
        <input className="t-input" placeholder={t("f_name")} value={name} onChange={(e) => setName(e.target.value)} />
        <textarea className="t-input" rows={3} placeholder={t("wish_text")} value={msg} onChange={(e) => setMsg(e.target.value)} />
        <button className="t-btn w-full">{sent ? t("wish_done") + " ✓" : t("wish_submit")}</button>
      </form>
      <div className="mt-6 space-y-4">
        {items.map((w) => (
          <div key={w.id} className="t-card p-4">
            <p style={{ fontFamily: "var(--t-serif)", fontSize: 18, color: "var(--t-accent)" }}>{w.guest_name}</p>
            <p className="mt-1 text-sm" style={{ color: "var(--t-ink)" }}>{w.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TRsvp({ inviteId }: { inviteId: string }) {
  const { t } = useLang();
  const [name, setName] = useState("");
  const [attend, setAttend] = useState<boolean | null>(null);
  const [adults, setAdults] = useState(1); const [kids, setKids] = useState(0);
  const [note, setNote] = useState("");
  const [done, setDone] = useState(false); const [err, setErr] = useState("");
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || attend === null) { setErr(t("f_name") + " + " + t("rsvp_title")); return; }
    try {
      await addRsvp({ invite_id: inviteId, guest_name: name.trim(), will_attend: attend, adults_count: adults, kids_count: kids, allergies: note.trim() || null });
      setDone(true);
    } catch { setErr(t("au_err")); }
  };
  if (done) return (
    <div className="t-card p-8 text-center">
      <p className="text-3xl" style={{ color: "var(--t-accent)" }}>✓</p>
      <p className="mt-3 text-2xl" style={{ fontFamily: "var(--t-serif)", color: "var(--t-ink)" }}>{t("rsvp_done")}</p>
    </div>
  );
  return (
    <form onSubmit={submit} className="t-card space-y-4 p-5">
      <input className="t-input" placeholder={t("f_name")} value={name} onChange={(e) => setName(e.target.value)} />
      <div className="grid grid-cols-2 gap-3">
        <button type="button" className="t-btn" style={attend === true ? {} : { opacity: 0.45 }} onClick={() => setAttend(true)}>{t("rsvp_yes")}</button>
        <button type="button" className="t-btn" style={attend === false ? {} : { opacity: 0.45 }} onClick={() => setAttend(false)}>{t("rsvp_no")}</button>
      </div>
      {attend === true && (
        <>
          <div className="flex items-center justify-between text-sm" style={{ color: "var(--t-ink)" }}>
            <span>{t("rsvp_adults")}</span>
            <span className="flex items-center gap-3">
              <button type="button" className="t-step" onClick={() => setAdults(Math.max(1, adults - 1))}>−</button>{adults}
              <button type="button" className="t-step" onClick={() => setAdults(Math.min(20, adults + 1))}>+</button>
            </span>
          </div>
          <div className="flex items-center justify-between text-sm" style={{ color: "var(--t-ink)" }}>
            <span>{t("rsvp_kids")}</span>
            <span className="flex items-center gap-3">
              <button type="button" className="t-step" onClick={() => setKids(Math.max(0, kids - 1))}>−</button>{kids}
              <button type="button" className="t-step" onClick={() => setKids(Math.min(20, kids + 1))}>+</button>
            </span>
          </div>
          <input className="t-input" placeholder={t("rsvp_note")} value={note} onChange={(e) => setNote(e.target.value)} />
        </>
      )}
      {err && <p className="text-xs" style={{ color: "hsl(0 70% 60%)" }}>{err}</p>}
      <button className="t-btn w-full">{t("rsvp_submit")}</button>
    </form>
  );
}
