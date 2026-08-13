import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

type Row = { id: string; name: string; slug: string; views: number; views_limit: number; is_activated: boolean; is_active: boolean };

export default function Admin() {
  const { t } = useLang();
  const [pass, setPass] = useState("");
  const [authed, setAuthed] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);
  const [stats, setStats] = useState<{ total: number; views: number; act: number } | null>(null);
  const [err, setErr] = useState("");

  const call = async (body: Record<string, unknown>) => {
    const r = await fetch("/api/admin", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pass, ...body }) });
    if (r.status === 403) { setErr("Parol noto'g'ri"); setAuthed(false); return null; }
    return r.json();
  };

  const load = async () => {
    const [l, s] = await Promise.all([call({ action: "list" }), call({ action: "stats" })]);
    if (l) { setRows(l); setAuthed(true); }
    if (s) setStats(s);
  };

  useEffect(() => { /* faqat submit'da yuklaymiz */ }, []);

  const toggle = async (r: Row) => { await call({ action: "activate", id: r.id, value: !r.is_activated }); load(); };

  if (!authed) return (
    <main className="grid min-h-[70vh] place-items-center px-4">
      <form className="card w-full max-w-sm p-6 text-center" onSubmit={(e) => { e.preventDefault(); load(); }}>
        <p className="font-display text-2xl">Admin panel</p>
        <input type="password" className="input mt-4" placeholder="Admin parol" value={pass} onChange={(e) => setPass(e.target.value)} />
        {err && <p className="mt-2 text-xs" style={{ color: "hsl(0 70% 45%)" }}>{err}</p>}
        <button className="btn-gold mt-4 w-full">{t("nav_login")}</button>
      </form>
    </main>
  );

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-display text-4xl">Admin panel</h1>
      {stats && (
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="card p-5"><p className="font-display text-3xl" style={{ color: "var(--gold)" }}>{stats.total}</p><p className="text-xs" style={{ color: "var(--muted)" }}>taklifnoma</p></div>
          <div className="card p-5"><p className="font-display text-3xl" style={{ color: "var(--gold)" }}>{stats.views}</p><p className="text-xs" style={{ color: "var(--muted)" }}>ko'rishlar</p></div>
          <div className="card p-5"><p className="font-display text-3xl" style={{ color: "var(--gold)" }}>{stats.act}</p><p className="text-xs" style={{ color: "var(--muted)" }}>faollashtirilgan</p></div>
        </div>
      )}
      <div className="mt-8 space-y-3">
        {rows.map((r) => (
          <div key={r.id} className="card flex flex-wrap items-center gap-3 p-4">
            <div className="min-w-0 flex-1">
              <p className="font-display truncate text-lg">{r.name}</p>
              <p className="text-xs" style={{ color: "var(--muted)" }}>👁 {r.views}/{r.views_limit} • {r.is_activated ? "✅ faol" : "⏳ faollashtirilmagan"}</p>
            </div>
            <a className="btn-ghost !py-2 text-xs" href={`/i/${r.slug}`} target="_blank" rel="noreferrer">{t("my_open")}</a>
            <button className={r.is_activated ? "btn-ghost !py-2 text-xs" : "btn-gold !py-2 text-xs"} onClick={() => toggle(r)}>
              {r.is_activated ? "O'chirish" : "Faollashtirish"}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
