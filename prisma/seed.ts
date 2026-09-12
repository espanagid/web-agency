import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const site = await prisma.site.upsert({
    where: { slug: "demo" },
    update: {},
    create: {
      slug: "demo",
      name: "Barbería El Corte",
      tagline: "Peluquería y barbería en Madrid Centro",
      sector: "barberia",
      whatsapp: "34600123456",
      email: "hola@elcorte.es",
      address: "Calle Gran Vía 1, Madrid",
      hours: "Lun–Sáb 9:30–20:00",
      published: true,
      aiEnabled: true,
      plan: "recepcion",
      sections: {
        create: [
          {
            type: "hero",
            order: 0,
            content: {
              title: "Barbería El Corte",
              subtitle: "Cortes clásicos y modernos, arreglo de barba y afeitado tradicional",
              cta: "Reservar cita por WhatsApp",
            },
          },
          {
            type: "services",
            order: 1,
            content: {
              title: "Servicios y precios",
              items: [
                { name: "Corte de pelo", price: "15€", desc: "Incluye lavado y peinado" },
                { name: "Corte + barba", price: "22€", desc: "Pack completo con toalla caliente" },
                { name: "Arreglo de barba", price: "10€", desc: "Perfilado navaja y aceites" },
                { name: "Afeitado tradicional", price: "14€", desc: "Espuma caliente y vaporizador" },
              ],
            },
          },
          {
            type: "testimonials",
            order: 2,
            content: {
              title: "Opiniones de clientes",
              items: [
                { text: "El mejor corte que he tenido en años. Trato inmejorable.", author: "Carlos M." },
                { text: "Reservé por WhatsApp y en 10 minutos tenía cita. Repetiré.", author: "Andrea R." },
              ],
            },
          },
          { type: "contact", order: 3, content: { title: "Reserva tu cita", note: "Respuesta en menos de 1 hora en horario de apertura." } },
        ],
      },
    },
  });
  console.log("Seed OK:", site.slug);
}

main().finally(() => prisma.$disconnect());
