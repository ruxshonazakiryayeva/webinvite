import { useState } from "react";
import type { Invite } from "@/lib/types";

// ⚠️ O'Z MA'LUMOTLARINGIZNI SHU YERDA O'ZGARTIRING:
const CARD_NUMBER = "4916 9912 0274 3204";
const CARD_OWNER = "RUXSHONA ZAKIRYAYEVA";
const TG_CHEK = "https://t.me/erkaqizgina1317";
const PRICE = 49000;
const PROMOS: Record<string, number> = { WEBINVITE50: 50, START25: 25 };

const L = {
  uz: { title: "Bepul ko'rishlar tugadi", sub: "Bu taklifnoma bepul limitdan o'tdi. Mehmonlar davom etishi uchun faollashtirish kerak.", views: "Bepul ko'rishlar", price: "Faollashtirish narxi", promo: "Promo-kod", apply: "Qo'llash", pay: "To'lov qilish", guide: "To'lov yo'riqnomasi", note: "To'lovdan so'ng chekni Telegramga yuboring — taklifnoma faollashtiriladi.", sent: "Chekni yubordim", wrong: "Promo-kod noto'g'ri" },
  ru: { title: "Бесплатные просмотры закончились", sub: "Это приглашение превысило бесплатный лимит. Для продолжения нужна активация.", views: "Бесплатные просмотры", price: "Цена активации", promo: "Промо-код", apply: "Применить", pay: "Оплатить", guide: "Инструкция оплаты", note: "После оплаты отправьте чек в Telegram — приглашение будет активировано.", sent: "Я отправил чек", wrong: "Неверный промо-код" },
  en: { title: "Free views are over", sub: "This invitation exceeded the free limit. Activation is required to continue.", views: "Free views", price: "Activation price", promo: "Promo code", apply: "Apply", pay: "Pay", guide: "Payment guide", note: "After payment, send the receipt via Telegram — the invitation will be activated.", sent: "I sent the receipt", wrong: "Invalid promo code" },
};

export default function Paywall({ inv, lang }: { inv: Invite; lang: "uz" | "ru" | "en" }) {
  const t = L[lang];
  const [promo, setPromo] = useState("");
  const [disc, setDisc] = useState(0);
  const [err, setErr] = useState("");
  const [guide, setGuide] = useState(false);
  const total = Math.round(PRICE * (1 - disc / 100));

  const apply = () => {
    const d = PROMOS[promo.trim().toUpperCase()];
    if (!d) { setErr(t.wrong); return; }
    setDisc(d); setErr("");
  };

  return (
    <div className="grid min-h-screen place-items-center p-4" style={{ background: "var(--bg)" }}>
      <div className="card w-full max-w-md p-6">
        <p className="text-2xl">⚠️</p>
        <p className="font-display mt-2 text-2xl">{t.title}</p>
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>{t.sub}</p>

        <div className="mt-5 rounded-xl border p-4" style={{ borderColor: "var(--line)" }}>
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
            <span>{t.views}</span>
            <span style={{ color: "var(--gold)" }}>{Math.min(inv.views, inv.views_limit)}/{inv.views_limit}</span>
          </div>
          <div className="mt-2 h-1.5 rounded-full" style={{ background: "var(--surface)" }}>
            <div className="h-full rounded-full" style={{ width: `${Math.min(100, (inv.views / inv.views_limit) * 100)}%`, background: "var(--gold)" }} />
          </div>
        </div>

        <div className="mt-4 rounded-xl border p-4" style={{ borderColor: "var(--line)" }}>
          <div className="flex justify-between text-sm"><span>{t.price}</span><b style={{ color: "var(--gold)" }}>{total.toLocaleString()} so'm</b></div>
          {disc > 0 && <div className="mt-1 flex justify-between text-xs" style={{ color: "hsl(140 55% 40%)" }}><span>{promo.toUpperCase()}</span><span>−{disc}%</span></div>}
        </div>

        {!guide ? (
          <>
            <div className="mt-4 flex gap-2">
              <input className="input" placeholder={t.promo} value={promo} onChange={(e) => setPromo(e.target.value)} />
              <button className="btn-ghost shrink-0 !py-2 text-xs" onClick={apply}>{t.apply}</button>
            </div>
            {err && <p className="mt-2 text-xs" style={{ color: "hsl(0 70% 45%)" }}>{err}</p>}
            <button className="btn-gold mt-4 w-full" onClick={() => setGuide(true)}>{t.pay} — {total.toLocaleString()} so'm</button>
          </>
        ) : (
          <div className="mt-4 rounded-xl border p-4 text-sm" style={{ borderColor: "var(--line)" }}>
            <p className="font-bold">{t.guide}</p>
            <p className="mt-2 font-mono text-lg" style={{ color: "var(--gold)" }}>{CARD_NUMBER}</p>
            <p className="text-xs" style={{ color: "var(--muted)" }}>{CARD_OWNER}</p>
            <p className="mt-3 text-xs" style={{ color: "var(--muted)" }}>{t.note}</p>
            <a className="btn-gold mt-4 block w-full text-center" href={TG_CHEK} target="_blank" rel="noreferrer">✈ {t.sent}</a>
            <button className="btn-ghost mt-2 w-full !py-2 text-xs" onClick={() => setGuide(false)}>←</button>
          </div>
        )}
      </div>
    </div>
  );
}
