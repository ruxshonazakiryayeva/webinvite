import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useLang } from "@/lib/i18n";
import { myInvites, updateInvite } from "@/lib/invites";
import { fmtDate } from "@/lib/format";
import { templates } from "@/templates/registry";
import type { Invite } from "@/lib/types";
import AuthModal from "@/components/AuthModal";

export default function My() {
  const { session, ready } = useAuth();
  const { t, lang } = useLang();
  const [items, setItems] = useState<Invite[]>([]);
  const [authOpen, setAuthOpen] = useState(false);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    if (session) myInvites(session.user.id).then(setItems).catch(() => {});
  }, [session]);

  if (!ready) return null;

  if (!session) return (
    <main className="grid min-h-[70vh] place-items-center px-4">
      <div className="card max-w-md p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full" style={{ background: "hsl(42 70% 55% / .15)", color: "var(--gold)", fontSize: 22 }}>🔒</div>
        <p className="font-display mt-4 text-3xl">{t("my_title")}</p>
        <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>{t("ed_need_auth")}</p>
        <button className="btn-gold mt-6" onClick={() => setAuthOpen(true)}>{t("nav_login")}</button>
        {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
      </div>
    </main>
  );

  const toggle = async (inv: Invite) => {
    await updateInvite(inv.id, { is_active: !inv.is_active });
    setItems((p) => p.map((x) => (x.id === inv.id ? { ...x, is_active: !inv.is_active } : x)));
  };

  const copy = async (inv: Invite) => {
    await navigator.clipboard.writeText(`${location.origin}/i/${inv.slug}`);
    setCopied(inv.id); setTimeout(() => setCopied(""), 1500);
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-4xl">{t("my_title")}</h1>
        <Link to="/templates" className="btn-gold">+ {t("btn_create")}</Link>
      </div>
      {items.length === 0 && <p className="mt-16 text-center text-sm" style={{ color: "var(--muted)" }}>{t("my_empty")}</p>}
      <div className="mt-8 space-y-4">
        {items.map((inv) => {
          const tp = templates.find((x) => x.id === inv.template_id);
          return (
            <div key={inv.id} className="card flex flex-wrap items-center gap-4 p-5">
              <div className="min-w-0 flex-1">
                <p className="font-display truncate text-xl">{inv.name}</p>
                <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
                  {tp?.name ?? inv.template_id} • {fmtDate(inv.event_date, lang)} • {inv.is_active ? "✅ e'londa" : "🚫 yashirilgan"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a className="btn-ghost !py-2 text-xs" href={`/i/${inv.slug}`} target="_blank" rel="noreferrer">{t("my_open")}</a>
                <Link className="btn-ghost !py-2 text-xs" to={`/create/${inv.template_id}?edit=${inv.id}`}>{t("my_edit")}</Link>
                <button className="btn-ghost !py-2 text-xs" onClick={() => copy(inv)}>{copied === inv.id ? t("copied") : t("my_copy")}</button>
                <button className="btn-ghost !py-2 text-xs" onClick={() => toggle(inv)}>{inv.is_active ? t("my_pub") : t("my_unpub")}</button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
