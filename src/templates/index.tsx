import type { ComponentType } from "react";
import type { Invite } from "@/lib/types";
import LuxuryGold from "./luxury-gold";
import RomanticGarden from "./romantic-garden";
import ModernMinimal from "./modern-minimal";
import EasternClassic from "./eastern-classic";
import CloudDream from "./cloud-dream";
import NoirElegance from "./noir-elegance";

export const templateComponents: Record<string, ComponentType<{ invite: Invite }>> = {
  "luxury-gold": LuxuryGold,
  "romantic-garden": RomanticGarden,
  "modern-minimal": ModernMinimal,
  "eastern-classic": EasternClassic,
  "cloud-dream": CloudDream,
  "noir-elegance": NoirElegance,
};
