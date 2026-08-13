const TG = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

export default async function handler(req: any, res: any) {
  if (req.method === "GET" && req.query.setup) {
    const target = `https://${req.headers.host}/api/telegram-webhook`;
    const r = await fetch(`${TG}/setWebhook?url=${encodeURIComponent(target)}`);
    return res.json(await r.json());
  }

  const msg = req.body?.message;
  if (msg?.text?.startsWith("/start")) {
    const code = msg.text.replace("/start", "").trim();
    if (code) {
      const { createClient } = await import("@supabase/supabase-js");
      const sb = createClient(process.env.VITE_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
      const { error } = await sb.from("telegram_logins")
        .update({ status: "approved", tg_id: msg.from.id, tg_name: msg.from.first_name, tg_username: msg.from.username })
        .eq("code", code).eq("status", "pending");
      await fetch(`${TG}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: msg.chat.id,
          text: error
            ? "❌ Kod topilmadi yoki eskirgan. Saytda qaytadan urinib ko'ring."
            : "🎉 Tizimga muvaffaqiyatli kirdingiz! Brauzeringiz avtomatik ravishda shaxsiy kabinetga o'tadi.",
        }),
      });
    }
  }
  res.json({ ok: true });
}
