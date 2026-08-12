import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { templateComponents } from "@/templates";
import type { Invite } from "@/lib/types";

export function demoInvite(id: string): Invite {
  return {
    id: "demo", user_id: null, slug: "demo", template_id: id, event_type: "birthday",
    name: "Muhammad & Xadicha", age: 25,
    event_date: new Date(Date.now() + 20 * 864e5).toISOString(),
    location_name: "Toshkent, Magic City", location_url: "https://maps.google.com/?q=Magic+City+Tashkent",
    dress_code: null, cover_image_url: null,
    gallery_urls: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800",
    ],
    music_url: null,
    message: "Hayotimizdagi eng qutlug' kunga sizni chin dildan taklif etamiz",
    phone: null, card_number: "8600123456789012", card_owner: "Muhammad Aliyev",
    data: {}, is_active: true, created_at: "", updated_at: "",
  };
}

export default function PreviewFrame() {
  const { id } = useParams();
  useEffect(() => { document.title = "Preview — WebInvite"; }, []);
  const C = templateComponents[id ?? ""];
  if (!C) return <div className="p-20 text-center text-sm">Shablon topilmadi</div>;
  return <C invite={demoInvite(id!)} />;
}
