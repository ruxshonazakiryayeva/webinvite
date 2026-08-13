export type Invite = {
  category: string;
  id: string;
  user_id: string | null;
  slug: string;
  template_id: string;
  event_type: string;
  name: string;
  age: number | null;
  event_date: string;
  location_name: string | null;
  location_url: string | null;
  dress_code: string | null;
  cover_image_url: string | null;
  gallery_urls: string[];
  music_url: string | null;
  message: string | null;
  phone: string | null;
  card_number: string | null;
  card_owner: string | null;
  data: Record<string, unknown>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Wish = { id: string; guest_name: string; message: string; created_at: string };

export type Rsvp = {
  id: string;
  guest_name: string;
  will_attend: boolean;
  adults_count: number | null;
  kids_count: number | null;
  allergies: string | null;
  created_at: string;
};
