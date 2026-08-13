import { createClient } from "@supabase/supabase-js";

const TG = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;
const SITE = process.env.SITE_URL || "https://webinvite-3trq.vercel.app";

export default async function handler(req: any, res: any) {
  const { action, invite_id, guest_name, message } = req.body ?? {};
  const sb = createClient(process.env.VITE_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  const { data: inv } = await sb.from("invites").select("user_id,name,slug").eq("id", invite_id).maybeSingle();
  if (!inv?.user_id) return res.json({ ok: false });
  const { data: link } = await sb.from("user_links").select("tg_id").eq("user_id", inv.user_id).maybeSingle();
  if (!link?.tg_id) return res.json({ ok: false });

  let text = "";
  let buttons: unknown = null;

  if (action === "invite_created") {
    text = `✨ <b>Yangi taklifnoma yaratildi!</b>\n\n📌 Sarlavha: ${inv.name}\n\nTaklifnomangiz muvaffaqiyatli saqlandi. Uni shaxsiy kabingizdan tahrirlashingiz va ulashishingiz mumkin.`;
    buttons = { inline_keyboard: [[{ text: "✏️ Kabinetda boshqarish", url: `${SITE}/my` }]] };
  }
  if (action === "wish") {
    text = `💌 <b>Yangi tilak bildirildi!</b>\n\n📌 Taklifnoma: ${inv.name}\n👤 Mehmon: ${guest_name ?? ""}\n💬 Tilak: "${message ?? ""}"`;
    buttons = { inline_keyboard: [[{ text: "👁 Tilaklarni ko'rish", url: `${SITE}/i/${inv.slug}` }]] };
  }
  if (action === "payment") {
    text = `💳 <b>To'lov cheki yuborildi!</b>\n\n📌 Taklifnoma: ${inv.name}\n\nChekni Telegram'da tekshiring va to'lov tasdiqlangach faollashtiring.`;
    buttons = { inline_keyboard: [[{ text: "⚡ Faollashtirish (/admin)", url: `${SITE}/admin` }]] };
  }

  if (text) {
    await fetch(`${TG}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: link.tg_id, text, parse_mode: "HTML", reply_markup: buttons }),
    });
  }
  res.json({ ok: true });
}
