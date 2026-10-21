export const SECTIONS = {
  "labor-legislativa": {
    title: "Labor Legislativa",
    description:
      "Registro cronológico del trabajo de Fito Ráquel en el Congreso Nacional, período 2026-2030.",
  },
  "accion-social": {
    title: "Acción Social",
    description:
      "Trabajo en territorio y apoyo comunitario de Fito Ráquel.",
  },
} as const;

export type Section = keyof typeof SECTIONS;

export const CATEGORIES = {
  institucional: "Institucional",
  sesion: "Sesión del pleno",
  comision: "Actividad de comisión",
  mocion: "Moción",
  "proyecto-de-ley": "Proyecto de ley",
  iniciativa: "Iniciativa",
  "proyecto-aprobado": "Proyecto aprobado",
  comparecencia: "Comparecencia",
  "reunion-sectorial": "Reunión con sectores",
  socializacion: "Socialización",
  gestion: "Gestión",
  "entrega-de-ayuda": "Entrega de ayuda",
  territorio: "Visita en territorio",
  "apoyo-comunitario": "Apoyo comunitario",
} as const;

export type Category = keyof typeof CATEGORIES;

export const MONTHS = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
] as const;

export const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const yearOf = (date: Date) => date.getUTCFullYear();
export const monthOf = (date: Date) => MONTHS[date.getUTCMonth()];

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("es-HN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);

export const isoDate = (date: Date) => date.toISOString().slice(0, 10);

export const slugOf = (id: string) => id.replace(/^\d{4}-\d{2}-\d{2}-/, "");

export const sectionUrl = (section: Section) => `/${section}/`;
export const monthUrl = (section: Section, year: number, month: string) =>
  `/${section}/${year}/${month}/`;

export function imageUrl(src: string, width: number) {
  const transform = `f_auto,q_auto,c_limit,w_${width}`;
  if (/^https?:\/\/res\.cloudinary\.com\/.+\/image\/upload\//.test(src)) {
    return src.replace("/image/upload/", `/image/upload/${transform}/`);
  }
  if (src.startsWith("http") || src.startsWith("/")) return src;
  const cloud = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloud) {
    throw new Error(
      `La foto "${src}" es un ID de Cloudinary pero falta PUBLIC_CLOUDINARY_CLOUD_NAME.`
    );
  }
  return `https://res.cloudinary.com/${cloud}/image/upload/${transform}/${src}`;
}

export const imageSrcset = (src: string, widths: number[]) =>
  widths.map((width) => `${imageUrl(src, width)} ${width}w`).join(", ");

export type Video = {
  id: string;
  format: "vertical" | "horizontal";
};

export const videoThumbnail = (video: Video) =>
  `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;

export const playerUrl = (video: Video) =>
  `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&playsinline=1&rel=0`;

export function thumbnailOf(data: { photos: { src: string }[]; video?: Video }, width = 400) {
  const photo = data.photos[0];
  if (photo) return { src: imageUrl(photo.src, width), vertical: false };
  if (data.video) return { src: videoThumbnail(data.video), vertical: data.video.format === "vertical" };
}
