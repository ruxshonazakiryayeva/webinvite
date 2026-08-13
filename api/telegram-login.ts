import { createClient } from "@supabase/supabase-js";

const URL_ = process.env.VITE_SUPABASE_URL!;
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const ANON = process.env.VITE_SUPABASE_PUBLISHABLE_KEY!;

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const code = Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10);
    const sb = createClient(URL_, SERVICE);
    const { error } = await sb.from("telegram_logins").insert({ code, status: "pending" });
    if (error) return res.status(500).json({ error: error.message });
    return res.json({ code, bot: process.env.TELEGRAM_BOT_USERNAME });
  }

  if (req.method === "GET") {
    const code = String(req.query.code || "");
    const sb = createClient(URL_, SERVICE);
    const { data } = await sb.from("telegram_logins").select("*").eq("code", code).maybeSingle();
    if (!data) return res.status(404).json({ error: "not found" });
    if (data.status !== "approved") return res.json({ status: "pending" });

    const email = `tg_${data.tg_id}@webinvite.app`;
    const password = `TG_${data.tg_id}_${process.env.TG_LOGIN_SALT}`;
    const anon = createClient(URL_, ANON);
    let s = await anon.auth.signInWithPassword({ email, password });
    if (s.error) {
      await sb.auth.admin.createUser({ email, password, email_confirm: true });
      s = await anon.auth.signInWithPassword({ email, password });
    }
    if (s.error || !s.data.session) return res.status(500).json({ error: s.error?.message });
    return res.json({
      status: "approved",
      session: { access_token: s.data.session.access_token, refresh_token: s.data.session.refresh_token },
    });
  }
  res.status(405).json({ error: "method not allowed" });
}
