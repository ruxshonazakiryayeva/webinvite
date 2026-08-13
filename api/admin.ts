import { createClient } from "@supabase/supabase-js";

export default async function handler(req: any, res: any) {
  const { pass, action, id, value } = req.body ?? {};
  if (pass !== process.env.ADMIN_PASS) return res.status(403).json({ error: "parol noto'g'ri" });
  const sb = createClient(process.env.VITE_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  if (action === "list") {
    const { data } = await sb.from("invites")
      .select("id,name,slug,views,views_limit,is_activated,is_active,created_at")
      .order("created_at", { ascending: false });
    return res.json(data ?? []);
  }
  if (action === "stats") {
    const { data } = await sb.from("invites").select("id,views,is_activated");
    return res.json({
      total: data?.length ?? 0,
      views: data?.reduce((a: number, x: any) => a + (x.views ?? 0), 0) ?? 0,
      act: data?.filter((x: any) => x.is_activated).length ?? 0,
    });
  }
  if (action === "activate" && id) {
    await sb.from("invites").update({ is_activated: !!value }).eq("id", id);
    return res.json({ ok: true });
  }
  res.status(400).json({ error: "noma'lum action" });
}
