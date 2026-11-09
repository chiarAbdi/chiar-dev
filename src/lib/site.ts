import { t } from "./academy";

export const site = {
  name: "Chiar Abdi",
  email: "chiar.abdi@powercoders.org",
  github: "https://github.com/chiarAbdi",
  qrStudio: "https://qr-chiarabdi.vercel.app/",
};

export const navigation = [
  { href: "/", label: t("Home", "Startseite") },
  { href: "/about", label: t("About", "Über mich") },
  { href: "/projects", label: t("Projects", "Projekte") },
  { href: "/blog", label: t("LearnBlog", "LearnBlog") },
  { href: "/contact", label: t("Contact", "Kontakt") },
];
