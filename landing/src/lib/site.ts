export const SITE = {
  name: "Webalo",
  domain: "webalo.eu",
  url: "https://webalo.eu",
  whatsapp: "34603081081",
  email: "hola@webalo.eu",
};

export const WA_LINK = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
  "Hola, quiero una web que venda. ¿Me contáis cómo funciona?"
)}`;

export const WA_LINK_PLAN = (plan: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    `Hola, me interesa la tarifa ${plan}. ¿Hablamos?`
  )}`;

export const WA_LINK_DEMO = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
  "Hola, quiero mi demo web gratis (sin compromiso). Mi negocio: "
)}`;
