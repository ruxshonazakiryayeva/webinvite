import { createClient } from "@supabase/supabase-js";

const TG = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;
const SITE = process.env.SITE_URL || "https://webinvite-3trq.vercel.app";

const tgSend = (chat_id: number, text: string, buttons?: unknown) =>
  fetch(`${TG}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id, text, parse_mode: "HTML", reply_markup: buttons }),
  });

export default async function handler(req: any, res: any) {
  if (req.method === "GET" && req.query.setup) {
    const r = await fetch(`${TG}/setWebhook?url=${encodeURIComponent(`https://${req.headers.host}/api/telegram-webhook`)}`);
    return res.json(await r.json());
  }

  const msg = req.body?.message;
  if (msg?.text?.startsWith("/start")) {
    const code = msg.text.replace("/start", "").trim();
    if (code) {
      const sb = createClient(process.env.VITE_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
      const { error } = await sb.from("telegram_logins")
        .update({ status: "approved", tg_id: msg.from.id, tg_name: msg.from.first_name, tg_username: msg.from.username })
        .eq("code", code).eq("status", "pending");
      await tgSend(
        msg.chat.id,
        error
          ? "❌ Kod topilmadi yoki eskirgan. Saytda qaytadan urinib ko'ring."
          : "🎉 Tizimga muvaffaqiyatli kirdingiz!\n\n👋 Xush kelibsiz! Brauzeringiz avtomatik ravishda shaxsiy kabinetga o'tadi.",
        {
          inline_keyboard: [[
            { text: "🌐 Saytga o'tish", url: SITE },
            { text: "📢 Telegram kanal", url: "https://t.me/webinvite_uz" },
          ]],
        }
      );
    }
  }
  res.json({ ok: true });
}
