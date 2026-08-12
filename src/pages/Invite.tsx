import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchInvite } from "@/lib/invites";
import { templateComponents } from "@/templates";
import type { Invite } from "@/lib/types";
import { useLang } from "@/lib/i18n";

export default function InvitePage() {
  const { slug } = useParams();
  const { t } = useLang();
  const [inv, setInv] = useState<Invite | null>(null);
  const [state, setState] = useState<"loading" | "ok" | "bad">("loading");

  useEffect(() => {
    fetchInvite(slug!)
      .then((d) => {
        if (!d || !d.is_active) return setState("bad");
        setInv(d); document.title = `${d.name} — WebInvite`; setState("ok");
      })
      .catch(() => setState("bad"));
  }, [slug]);

  if (state === "loading") return <div className="grid min-h-screen place-items-center text-sm" style={{ color: "var(--muted)" }}>{t("loading")}</div>;
  if (state === "bad" || !inv) return <div className="grid min-h-screen place-items-center text-sm">404 — taklifnoma topilmadi</div>;
  const C = templateComponents[inv.template_id];
  if (!C) return <div className="grid min-h-screen place-items-center text-sm">Shablon topilmadi</div>;
  return <C invite={inv} />;
}
