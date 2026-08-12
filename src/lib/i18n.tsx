import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "uz" | "ru" | "en";

const uz = {
  tagline: "Premium onlayn taklifnomalar",
  nav_templates: "Shablonlar", nav_how: "Qanday ishlaydi", nav_my: "Mening taklifnomalarim",
  nav_login: "Kirish", nav_logout: "Chiqish",
  hero_title: "Bayramingizga chiroyli taklifnoma — 5 daqiqada",
  hero_sub: "Shablonni tanlang, ma'lumotlaringizni kiriting va mehmonlarga tayyor havola yuboring.",
  hero_cta: "Shablonni tanlash", hero_cta2: "Qanday ishlaydi?",
  how_title: "Qanday ishlaydi?",
  how1: "Shablonni tanlang", how1d: "6 ta premium uslubdan o'zingizga mosini toping.",
  how2: "Ma'lumotlarni kiriting", how2d: "Ism, sana, manzil, rasmlar va musiqa — hammasi o'zingizda.",
  how3: "Havola yuboring", how3d: "Tayyor taklifnomani mehmonlarga ulashing.",
  cat_title: "Shablonlar", cat_sub: "Har bir uslub — o'ziga xos palitra, shrift va bezak.",
  btn_preview: "Ko'rish", btn_create: "Yaratish",
  open: "Ochish",
  days: "kun", hours: "soat", minutes: "daqiqa", seconds: "soniya",
  map_dir: "Yo'nalish olish",
  gift_title: "Sovg'a uchun", copy: "Nusxalash", copied: "Nusxalandi",
  rsvp_title: "Ishtirokni tasdiqlang", f_name: "Ismingiz",
  rsvp_yes: "Boraman", rsvp_no: "Bora olmayman",
  rsvp_adults: "Kattalar", rsvp_kids: "Bolalar", rsvp_note: "Allergiya / tilak (ixtiyoriy)",
  rsvp_submit: "Javobni yuborish", rsvp_done: "Rahmat! Javobingiz qabul qilindi.",
  wish_title: "Tilaklar", wish_text: "Tilagingiz...", wish_submit: "Tilak qoldirish", wish_done: "Tilagingiz qo'shildi",
  ed_title: "Taklifnoma yaratish", ed_name: "Bayram egasi / sarlavha", ed_age: "Yosh (ixtiyoriy)",
  ed_date: "Sana va vaqt", ed_loc: "Manzil nomi", ed_map: "Xarita havolasi", ed_msg: "Tabrik matni",
  ed_dress: "Dress-kod (ixtiyoriy)", ed_gallery: "Rasmlar (6 tagacha)", ed_music: "Fon musiqasi (ixtiyoriy)",
  ed_card_owner: "Karta egasi", ed_card_number: "Karta raqami",
  ed_save: "Saqlash", ed_need_auth: "Saqlash uchun tizimga kiring",
  au_login_t: "Kirish", au_signup_t: "Ro'yxatdan o'tish", au_email: "Email", au_pass: "Parol",
  au_switch: "Akkauntingiz yo'qmi? Ro'yxatdan o'ting", au_switch2: "Akkauntingiz bormi? Kiring", au_err: "Xatolik yuz berdi",
  my_title: "Mening taklifnomalarim", my_empty: "Hali taklifnoma yaratmagansiz",
  my_edit: "Tahrirlash", my_open: "Ochish", my_copy: "Havolani nusxalash", my_pub: "Yashirish", my_unpub: "E'lon qilish",
  loading: "Yuklanmoqda...", footer: "WebInvite — mehr bilan yaratildi",
};
type Key = keyof typeof uz;

const ru: Record<Key, string> = {
  tagline: "Премиум онлайн-приглашения",
  nav_templates: "Шаблоны", nav_how: "Как это работает", nav_my: "Мои приглашения",
  nav_login: "Войти", nav_logout: "Выйти",
  hero_title: "Красивое приглашение за 5 минут",
  hero_sub: "Выберите шаблон, заполните данные и отправьте гостям готовую ссылку.",
  hero_cta: "Выбрать шаблон", hero_cta2: "Как это работает?",
  how_title: "Как это работает?",
  how1: "Выберите шаблон", how1d: "6 премиальных стилей — найдите свой.",
  how2: "Заполните данные", how2d: "Имя, дата, адрес, фото и музыка — всё ваше.",
  how3: "Отправьте ссылку", how3d: "Поделитесь готовым приглашением с гостями.",
  cat_title: "Шаблоны", cat_sub: "У каждого стиля — своя палитра, шрифты и декор.",
  btn_preview: "Смотреть", btn_create: "Создать",
  open: "Открыть",
  days: "дней", hours: "часов", minutes: "минут", seconds: "секунд",
  map_dir: "Маршрут",
  gift_title: "Для подарка", copy: "Копировать", copied: "Скопировано",
  rsvp_title: "Подтвердите участие", f_name: "Ваше имя",
  rsvp_yes: "Приду", rsvp_no: "Не смогу",
  rsvp_adults: "Взрослые", rsvp_kids: "Дети", rsvp_note: "Аллергия / пожелание (необязательно)",
  rsvp_submit: "Отправить ответ", rsvp_done: "Спасибо! Ваш ответ получен.",
  wish_title: "Пожелания", wish_text: "Ваше пожелание...", wish_submit: "Оставить пожелание", wish_done: "Ваше пожелание добавлено",
  ed_title: "Создать приглашение", ed_name: "Имя / заголовок", ed_age: "Возраст (необязательно)",
  ed_date: "Дата и время", ed_loc: "Название места", ed_map: "Ссылка на карту", ed_msg: "Текст поздравления",
  ed_dress: "Дресс-код (необязательно)", ed_gallery: "Фото (до 6)", ed_music: "Фоновая музыка (необязательно)",
  ed_card_owner: "Владелец карты", ed_card_number: "Номер карты",
  ed_save: "Сохранить", ed_need_auth: "Войдите, чтобы сохранить",
  au_login_t: "Вход", au_signup_t: "Регистрация", au_email: "Email", au_pass: "Пароль",
  au_switch: "Нет аккаунта? Зарегистрируйтесь", au_switch2: "Есть аккаунт? Войдите", au_err: "Произошла ошибка",
  my_title: "Мои приглашения", my_empty: "Вы ещё не создали приглашений",
  my_edit: "Редактировать", my_open: "Открыть", my_copy: "Скопировать ссылку", my_pub: "Скрыть", my_unpub: "Опубликовать",
  loading: "Загрузка...", footer: "WebInvite — создано с любовью",
};

const en: Record<Key, string> = {
  tagline: "Premium online invitations",
  nav_templates: "Templates", nav_how: "How it works", nav_my: "My invitations",
  nav_login: "Sign in", nav_logout: "Sign out",
  hero_title: "A beautiful invitation in 5 minutes",
  hero_sub: "Pick a template, fill in your details and send guests a ready link.",
  hero_cta: "Choose a template", hero_cta2: "How it works?",
  how_title: "How it works?",
  how1: "Pick a template", how1d: "6 premium styles — find yours.",
  how2: "Fill in details", how2d: "Name, date, venue, photos and music — all yours.",
  how3: "Send the link", how3d: "Share your finished invitation with guests.",
  cat_title: "Templates", cat_sub: "Each style has its own palette, fonts and decor.",
  btn_preview: "Preview", btn_create: "Create",
  open: "Open",
  days: "days", hours: "hours", minutes: "minutes", seconds: "seconds",
  map_dir: "Get directions",
  gift_title: "Gift card", copy: "Copy", copied: "Copied",
  rsvp_title: "Confirm attendance", f_name: "Your name",
  rsvp_yes: "I'll attend", rsvp_no: "Can't make it",
  rsvp_adults: "Adults", rsvp_kids: "Kids", rsvp_note: "Allergy / note (optional)",
  rsvp_submit: "Send response", rsvp_done: "Thank you! Your response is received.",
  wish_title: "Wishes", wish_text: "Your wish...", wish_submit: "Leave a wish", wish_done: "Your wish added",
  ed_title: "Create invitation", ed_name: "Name / title", ed_age: "Age (optional)",
  ed_date: "Date & time", ed_loc: "Venue name", ed_map: "Map link", ed_msg: "Greeting text",
  ed_dress: "Dress code (optional)", ed_gallery: "Photos (up to 6)", ed_music: "Background music (optional)",
  ed_card_owner: "Card owner", ed_card_number: "Card number",
  ed_save: "Save", ed_need_auth: "Sign in to save",
  au_login_t: "Sign in", au_signup_t: "Sign up", au_email: "Email", au_pass: "Password",
  au_switch: "No account? Sign up", au_switch2: "Have an account? Sign in", au_err: "Something went wrong",
  my_title: "My invitations", my_empty: "You haven't created any invitations yet",
  my_edit: "Edit", my_open: "Open", my_copy: "Copy link", my_pub: "Hide", my_unpub: "Publish",
  loading: "Loading...", footer: "WebInvite — made with love",
};

const dicts: Record<Lang, Record<Key, string>> = { uz, ru, en };

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: Key) => string }>({
  lang: "uz", setLang: () => {}, t: (k) => uz[k],
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("wi_lang") as Lang) || "uz");
  useEffect(() => { localStorage.setItem("wi_lang", lang); }, [lang]);
  const t = (k: Key) => dicts[lang][k] || uz[k];
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useLang() { return useContext(Ctx); }
