export function setSeo(opts: { title: string; description?: string; image?: string }) {
  document.title = opts.title;
  const ensure = (attr: "name" | "property", key: string) => {
    let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
    if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
    return el;
  };
  if (opts.description) {
    ensure("name", "description").content = opts.description;
    ensure("property", "og:description").content = opts.description;
  }
  ensure("property", "og:title").content = opts.title;
  ensure("property", "og:type").content = "website";
  if (opts.image) ensure("property", "og:image").content = opts.image;
}
