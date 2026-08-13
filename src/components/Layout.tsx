import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useLang, type Lang } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import AuthModal from "./AuthModal";

const LANGS: Lang[] = ["uz", "ru", "en"];

export default function Layout() {
  const { lang, setLang, t } = useLang();
  const { session } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--ink)" }}>
      <div className="border-b px-4 py-2 text-center text-xs font-semibold"
        style={{ background: "hsl(42 70% 55% / .12)", borderColor: "var(--line)" }}>
        ✨ {lang === "ru" ? "Новые эксклюзивные шаблоны! Следите за нами:" : lang === "en" ? "New exclusive templates! Follow us:" : "Yangi eksklyuziv shablonlar! Bizni kuzating:"}{" "}
        <a className="underline" style={{ color: "var(--gold)" }} href="https://t.me/webinvite_uz" target="_blank" rel="noreferrer">Telegram</a> •{" "}
        <a className="underline" style={{ color: "var(--gold)" }} href="https://instagram.com/webinvite.uz" target="_blank" rel="noreferrer">Instagram</a>
      </div>

      <header className="sticky top-0 z-40 border-b backdrop-blur"
        style={{ borderColor: "var(--line)", background: "color-mix(in oklab, var(--bg) 82%, transparent)" }}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src="/favicon.png" alt="WebInvite" className="h-7 w-7 rounded" />
            <span className="font-display text-2xl font-semibold">WebInvite</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-semibold md:flex" style={{ color: "var(--muted)" }}>
            <Link to="/templates" className="hover:opacity-70">{t("nav_templates")}</Link>
            <a href="#how" className="hover:opacity-70">{t("nav_how")}</a>
          </nav>
          <div className="flex items-center gap-2">
            <div className="flex rounded-full border p-0.5" style={{ borderColor: "var(--line)" }}>
              {LANGS.map((l) => (
                <button key={l} onClick={() => setLang(l)}
                  className="rounded-full px-2.5 py-1 text-[11px] font-bold uppercase"
                  style={lang === l ? { background: "var(--gold)", color: "#fff" } : { color: "var(--muted)" }}>
                  {l}
                </button>
              ))}
            </div>
            {session ? (
              <>
                <Link to="/my" className="btn-ghost !px-3 !py-2 text-xs">{t("nav_my")}</Link>
                <button className="btn-ghost !px-3 !py-2 text-xs" onClick={() => supabase.auth.signOut()}>{t("nav_logout")}</button>
              </>
            ) : (
              <button className="btn-gold !px-4 !py-2 text-xs" onClick={() => setAuthOpen(true)}>{t("nav_login")}</button>
            )}
          </div>
        </div>
      </header>

      <Outlet />

      <footer className="border-t py-10 text-center text-sm" style={{ borderColor: "var(--line)", color: "var(--muted)" }}>
        <p className="font-display text-xl" style={{ color: "var(--ink)" }}>WebInvite</p>
        <p className="mt-2">{t("footer")}</p>
      </footer>

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </div>
  );
}
