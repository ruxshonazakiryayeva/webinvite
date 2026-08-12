import { useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import { useLang } from "@/lib/i18n";

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const { t } = useLang();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr("");
    const { error } = mode === "login"
      ? await supabase.auth.signInWithPassword({ email, password: pass })
      : await supabase.auth.signUp({ email, password: pass });
    setBusy(false);
    if (error) { setErr(error.message); return; }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={onClose}>
      <div className="card w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
        <p className="font-display text-2xl">{mode === "login" ? t("au_login_t") : t("au_signup_t")}</p>
        <form onSubmit={submit} className="mt-4 space-y-3">
          <div>
            <label className="label">{t("au_email")}</label>
            <input className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="label">{t("au_pass")}</label>
            <input className="input" type="password" required minLength={6} value={pass} onChange={(e) => setPass(e.target.value)} />
          </div>
          {err && <p className="text-xs" style={{ color: "hsl(0 70% 45%)" }}>{err}</p>}
          <button className="btn-gold w-full" disabled={busy}>
            {mode === "login" ? t("au_login_t") : t("au_signup_t")}
          </button>
        </form>
        <button className="mt-4 text-xs underline" style={{ color: "var(--muted)" }}
          onClick={() => setMode(mode === "login" ? "signup" : "login")}>
          {mode === "login" ? t("au_switch") : t("au_switch2")}
        </button>
      </div>
    </div>
  );
}
