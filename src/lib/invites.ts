import { supabase } from "./supabase";
import type { Invite, Wish } from "./types";

export async function fetchInvite(slug: string): Promise<Invite | null> {
  const { data, error } = await supabase.from("invites").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return (data as Invite) ?? null;
}

export async function myInvites(userId: string): Promise<Invite[]> {
  const { data, error } = await supabase
    .from("invites").select("*").eq("user_id", userId)
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data as Invite[]) ?? [];
}

export async function createInvite(payload: Record<string, unknown>) {
  const { data, error } = await supabase.from("invites").insert(payload).select().single();
  if (error) throw error;
  return data as Invite;
}

export async function updateInvite(id: string, patch: Record<string, unknown>) {
  const { error } = await supabase.from("invites").update(patch).eq("id", id);
  if (error) throw error;
}

export async function fetchWishes(inviteId: string): Promise<Wish[]> {
  const { data, error } = await supabase.from("wishes")
    .select("id, guest_name, message, created_at").eq("invite_id", inviteId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as Wish[]) ?? [];
}

export async function addWish(inviteId: string, guest_name: string, message: string) {
  const { error } = await supabase.from("wishes").insert({ invite_id: inviteId, guest_name, message });
  if (error) throw error;
}

export async function addRsvp(payload: Record<string, unknown>) {
  const { error } = await supabase.from("rsvp_responses").insert(payload);
  if (error) throw error;
}

const TR: Record<string, string> = { a: "a", b: "b", c: "s", d: "d", e: "e", f: "f", g: "g", h: "h", i: "i", j: "j", k: "k", l: "l", m: "m", n: "n", o: "o", p: "p", q: "q", r: "r", s: "s", t: "t", u: "u", v: "v", w: "v", x: "x", y: "y", z: "z", " ": "-", "'": "", "‘": "", "ʼ": "" };

export function slugify(input: string): string {
  const base = input.toLowerCase().split("").map((ch) => TR[ch] ?? (/[a-z0-9-]/.test(ch) ? ch : "")).join("").replace(/-+/g, "-").replace(/^-|-$/g, "") || "taklifnoma";
  return `${base}-${Math.random().toString(36).slice(2, 6)}`;
}

export async function uploadMedia(userId: string, file: File): Promise<string> {
  const ext = file.name.split(".").pop() || "bin";
  const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from("invitation-media").upload(path, file);
  if (error) throw error;
  return supabase.storage.from("invitation-media").getPublicUrl(path).data.publicUrl;
}
