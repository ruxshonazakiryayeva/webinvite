import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchInvite } from "@/lib/invites";
import { templateComponents } from "@/templates";
import { setSeo } from "@/lib/seo";
import { supabase } from "@/lib/supabase";
import { useLang } from "@/lib/i18n";
import type { Invite } from "@/lib/types";
import Paywall from "@/components/Paywall";

export default function InvitePage() {
  const { slug } = useParams();
  const { t, lang } = useLang();
  const [inv, setInv] = useState<Invite | null>(null);
  const [state, setState] = useState<"loading" | "ok" | "bad">("loading");

  useEffect(() => {
    fetchInvite(slug!)
      .then((d) => {
        if (!d || !d.is_active) return setState("bad");
        setInv(d); setState("ok");
        setSeo({ title: `${d.name} — WebInvite`, description: d.message ?? `${d.name} • WebInvite`, image: d.cover_image_url ?? d.gallery_urls?.[0] });
        supabase.rpc("increment_views", { p_slug: slug }).then(() => {});
      })
      .catch(() => setState("bad"));
  }, [slug]);

  if (state === "loading") return <div className="grid min-h-screen place-items-center text-sm" style={{ color: "var(--muted)" }}>{t("loading")}</div>;
  if (state === "bad" || !inv) return <div className="grid min-h-screen place-items-center text-sm">404 — taklifnoma topilmadi</div>;

  const locked = !inv.is_activated && inv.views >= inv.views_limit;
  if (locked) return <Paywall inv={inv} lang={lang} />;

  const C = templateComponents[inv.template_id];
  if (!C) return <div className="grid min-h-screen place-items-center text-sm">Shablon topilmadi</div>;
  return <C invite={inv} />;
}
