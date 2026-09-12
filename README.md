# webs-con-ia

Plataforma multitenante: un solo despliegue → N webs de clientes (subdominios o dominios
propios) con recepcionista de IA (Mistral/OpenAI) que responde y agenda por WhatsApp 24/7.

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind 4 · Prisma · PostgreSQL · Docker

## Estructura

- `src/lib/tenant.ts` — resuelve el site por hostname (`slug.BASE_DOMAIN` o dominio propio)
- `src/lib/ai.ts` — abstracción de proveedor IA + system prompt generado desde los datos del negocio
- `src/components/SectionRenderer.tsx` — renderiza secciones: hero, services, testimonials, faq, contact
- `src/components/ChatWidget.tsx` — chat flotante (solo si `aiEnabled`)
- `src/app/api/chat` — chat IA con cost cap (cuota mensual + max_tokens + timeout)
- `src/app/api/lead` — formulario → lead en DB + aviso por Telegram
- `src/app/admin` — panel: sitios (CRUD), leads, publicar/despublicar, activar IA

## Desarrollo local

```bash
cp .env.example .env            # rellena ADMIN_PASSWORD y AI_API_KEY
docker compose up -d db
npm install
npx prisma db push
npm run db:seed                 # crea demo.localhost
npm run dev
```

Abre `http://demo.localhost:3000` (los subdominios de localhost resuelven sin /etc/hosts)
y `http://localhost:3000/admin` (contraseña: ADMIN_PASSWORD).

## Producción (VPS)

1. DNS: `A` record `agencia.es` y `*.agencia.es` → IP del VPS.
2. SSL wildcard con DNS-01 (ej. Cloudflare):
   `certbot certonly --dns-cloudflare -d agencia.es -d "*.agencia.es"`
   Descomenta el bloque 443 en `nginx.conf` y monta los certs.
3. `.env` de producción: `BASE_DOMAIN=agencia.es`, secrets fuertes, `AI_PROVIDER=mistral`,
   `AI_MODEL=mistral-small-latest` (datos en la UE → argumento GDPR de venta).
4. `docker compose up -d --build`

## Flujo de alta de un cliente (72h)

1. Admin → "Nuevo sitio" → slug + WhatsApp + plan → se crea con secciones por defecto.
2. Editar contenido (JSON de secciones), colores, horarios, servicios/precios.
3. Activar "Publicado" y "Asistente IA".
4. Cliente ve su web en `slug.agencia.es`; cuando tenga dominio propio, se añade en
   "Dominio propio" y se apunta el DNS.

## Roadmap v2

- [ ] Reservas con slots (Google Calendar API) como upsell del plan Todo Incluido
- [ ] Recordatorios anti no-show (mensaje a las 24h y 2h antes)
- [ ] Roles: editor (cliente) vs admin — actualmente solo hay admin
- [ ] Facturación (Stripe) y reset mensual de `aiUsed` con cron
- [ ] Editor visual de secciones (reemplazar el textarea JSON)
