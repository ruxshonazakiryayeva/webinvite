import { useLang } from "@/lib/i18n";
import TelegramLogin from "./TelegramLogin";

const L = {
  uz: "Davom etish uchun Telegram orqali kiring",
  ru: "Войдите через Telegram, чтобы продолжить",
  en: "Sign in with Telegram to continue",
};

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const { lang, t } = useLang();
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={onClose}>
      <div className="card w-full max-w-sm p-6 text-center" onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full"
          style={{ background: "hsl(42 70% 55% / .15)", color: "var(--gold)", fontSize: 22 }}>✉</div>
        <p className="font-display mt-4 text-2xl">{t("au_login_t")}</p>
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>{L[lang]}</p>
        <div className="mt-6">
          <TelegramLogin onDone={onClose} />
        </div>
      </div>
    </div>
  );
}
