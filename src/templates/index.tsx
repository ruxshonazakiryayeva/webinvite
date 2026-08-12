import type { ComponentType } from "react";
import type { Invite } from "@/lib/types";
import LuxuryGold from "./luxury-gold";

export const templateComponents: Record<string, ComponentType<{ invite: Invite }>> = {
  "luxury-gold": LuxuryGold,
};
