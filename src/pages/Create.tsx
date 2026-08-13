import { useEffect, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useLang } from "@/lib/i18n";
import { createInvite, slugify, updateInvite, uploadMedia } from "@/lib/invites";
import { supabase } from "@/lib/supabase";
import AuthModal from "@/components/AuthModal";

const empty = { name: "", age: "", event_date: "", location_name: "", location_url: "", message: "", dress_code: "", card_owner: "", card_number: "" };

export default function Create() {
  const { templateId } = useParams();
  const [params] = useSearchParams();
  const editId = params.get("edit");
  const { t } = useLang();
  const { session } = useAuth();

  const [f, setF] = useState(empty);
  const [gallery, setGallery] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [musicFile, setMusicFile] = useState<File | null>(null);
  const [musicUrl, setMusicUrl] = useState<string | null>(null);
  const [slug, setSlug] = useState("");
  const [busy, setBusy] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [doneUrl, setDoneUrl] = useState("");
  const pending = useRef(false);

  const set = (k: keyof typeof empty) => (e: { target: { value: string } }) => setF((p) => ({ ...p, [k]: e.target.value }));

  useEffect(() => {
    if (editId) {
      supabase.from("invites").select("*").eq("id", editId).maybeSingle().then(({ data }) => {
        if (!data) return;
        setF({ name: data.name ?? "", age: data.age ? String(data.age) : "", event_date: String(data.event_date ?? "").slice(0, 16), location_name: data.location_name ?? "", location_url: data.location_url ?? "", message: data.message ?? "", dress_code: data.dress_code ?? "", card_owner: data.card_owner ?? "", card_number: data.card_number ?? "" });
        setGallery(data.gallery_urls ?? []); setMusicUrl(data.music_url ?? null); setSlug(data.slug ?? "");
      });
    } else {
      const d = localStorage.getItem(`wi_draft_${templateId}`);
      if (d) { try { setF(JSON.parse(d)); } catch { /* ok */ } }
    }
  }, [editId, templateId]);

  useEffect(() => { if (!editId) localStorage.setItem(`wi_draft_${templateId}`, JSON.stringify(f)); }, [f, editId, templateId]);

  useEffect(() => { if (session && pending.current) { pending.current = false; doSave(); } }, [session]);

  const doSave = async () => {
    if (!session || busy) return;
    setBusy(true);
    try {
      const uid = session.user.id;
      const urls = [...gallery];
      for (const file of newFiles) urls.push(await uploadMedia(uid, file));
      let m = musicUrl;
      if (musicFile) m = await uploadMedia(uid, musicFile);
      const payload = {
        user_id: uid, template_id: templateId, name: f.name.trim(),
        age: f.age ? Number(f.age) : null,
        event_date: f.event_date ? new Date(f.event_date).toISOString() : new Date(Date.now() + 7 * 864e5).toISOString(),
        location_name: f.location_name || null, location_url: f.location_url || null,
        message: f.message || null, dress_code: f.dress_code || null,
        card_owner: f.card_owner || null, card_number: f.card_number || null,
        gallery_urls: urls, music_url: m, is_active: true,
      };
      if (editId) {
        await updateInvite(editId, payload);
        setDoneUrl(`${location.origin}/i/${slug}`);
      } else {
        const inv = await createInvite({ ...payload, slug: slugify(f.name) });
        localStorage.removeItem(`wi_draft_${templateId}`);
        setDoneUrl(`${location.origin}/i/${inv.slug}`);
      }
    } catch { alert(t("au_err")); }
    setBusy(false);
  };

  const onSave = () => {
    if (!f.name.trim()) { alert(t("ed_name")); return; }
    if (!session) { pending.current = true; setAuthOpen(true); return; }
    doSave();
  };

  if (doneUrl) return (
    <main className="grid min-h-[70vh] place-items-center px-4">
      <div className="card max-w-md p-8 text-center">
        <p className="text-3xl" style={{ color: "var(--gold)" }}>✓</p>
        <p className="font-display mt-3 text-3xl">{t("ed_title")} ✓</p>
        <p className="mt-3 break-all text-sm" style={{ color: "var(--muted)" }}>{doneUrl}</p>
        <div className="mt-6 flex justify-center gap-2">
          <button className="btn-gold" onClick={() => navigator.clipboard.writeText(doneUrl)}>{t("my_copy")}</button>
          <Link to="/my" className="btn-ghost">{t("nav_my")}</Link>
        </div>
      </div>
    </main>
  );

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="font-display text-4xl">{editId ? t("my_edit") : t("ed_title")}</h1>
      <div className="mt-8 space-y-4">
        <div><label className="label">{t("ed_name")}</label><input className="input" value={f.name} onChange={set("name")} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="label">{t("ed_age")}</label><input className="input" type="number" value={f.age} onChange={set("age")} /></div>
          <div><label className="label">{t("ed_date")}</label><input className="input" type="datetime-local" value={f.event_date} onChange={set("event_date")} /></div>
        </div>
        <div><label className="label">{t("ed_loc")}</label><input className="input" value={f.location_name} onChange={set("location_name")} /></div>
        <div><label className="label">{t("ed_map")}</label><input className="input" value={f.location_url} onChange={set("location_url")} /></div>
        <div><label className="label">{t("ed_msg")}</label><textarea className="input" rows={3} value={f.message} onChange={set("message")} /></div>
        <div><label className="label">{t("ed_dress")}</label><input className="input" value={f.dress_code} onChange={set("dress_code")} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="label">{t("ed_card_owner")}</label><input className="input" value={f.card_owner} onChange={set("card_owner")} /></div>
          <div><label className="label">{t("ed_card_number")}</label><input className="input" value={f.card_number} onChange={set("card_number")} /></div>
        </div>
        <div>
          <label className="label">{t("ed_gallery")} ({gallery.length + newFiles.length}/6)</label>
          <input type="file" accept="image/*" multiple className="input" onChange={(e) => {
            const fs = Array.from(e.target.files ?? []).slice(0, 6 - gallery.length - newFiles.length);
            setNewFiles((p) => [...p, ...fs]);
          }} />
          {(gallery.length > 0 || newFiles.length > 0) && (
            <div className="mt-3 flex flex-wrap gap-2">
              {gallery.map((u, i) => (
                <div key={u} className="relative">
                  <img src={u} alt="" className="h-16 w-16 rounded-lg object-cover" />
                  <button className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-black/70 text-[10px] text-white" onClick={() => setGallery((p) => p.filter((_, j) => j !== i))}>✕</button>
                </div>
              ))}
              {newFiles.map((file, i) => (
                <div key={file.name + i}
