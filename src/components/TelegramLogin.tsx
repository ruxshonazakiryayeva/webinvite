import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useLang } from "@/lib/i18n";

const L = {
  uz: { btn: "Telegram orqali kirish", wait: "Telegram kutilmoqda..." },
  ru: { btn: "Войти через Telegram", wait: "Ожидание Telegram..." },
  en: { btn: "Sign in with Telegram", wait: "Waiting for Telegram..." },
};

export default function TelegramLogin({ onDone }: { onDone: () => void }) {
  const { lang } = useLang();
  const [busy, setBusy] = useState(false);
  const t = L[lang];

  const start = async () => {
    setBusy(true);
    try {
      const r = await fetch("/api/telegram-login", { method: "POST" });
      const { code, bot } = await r.json();
      window.open(`https://t.me/${bot}?start=${code}`, "_blank");
      const poll = setInterval(async () => {
        const q = await fetch(`/api/telegram-login?code=${code}`);
        const d = await q.json();
        if (d.status === "approved" && d.session) {
          clearInterval(poll);
          await supabase.auth.setSession({ access_token: d.session.access_token, refresh_token: d.session.refresh_token });
          setBusy(false);
          onDone();
        }
      }, 2500);
      setTimeout(() => clearInterval(poll), 120000);
    } catch { setBusy(false); }
  };

  return (
    <button onClick={start} disabled={busy} className="w-full rounded-full py-3 text-sm font-bold text-white transition hover:opacity-90"
      style={{ background: "#229ED9" }}>
      {busy ? t.wait : "✈ " + t.btn}
    </button>
  );
}
