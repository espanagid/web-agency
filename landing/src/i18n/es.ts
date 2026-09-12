export type Lang = "es" | "en" | "ru";

export interface Dict {
  nav: { ia: string; proceso: string; demo: string; tarifas: string; faq: string; whatsapp: string; writeUs: string };
  hero: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    sub: string;
    cta1: string;
    cta2: string;
    stats: { v: string; u: string; l: string }[];
    chatCaption: string;
    chatRole: string;
    online: string;
    chat: { from: "cliente" | "ia"; text: string }[];
  };
  marquee: string[];
  pain: {
    eyebrow: string;
    title: string;
    items: { n: string; t: string; d: string }[];
    q1: string;
    qh: string;
    q2: string;
  };
  demo: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    clinic: string;
    role: string;
    script: { from: "cliente" | "ia"; text: string }[];
    leadLabel: string;
    leadTitle: string;
    leadBody: string;
    features: { t: string; d: string }[];
  };
  demoOffer: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    sub: string;
    badge: string;
    sendTitle: string;
    send: string[];
    getTitle: string;
    get: string[];
    then: string;
    cta: string;
    note: string;
  };
  process: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    steps: { n: string; time: string; t: string; d: string }[];
  };
  pricing: {
    eyebrow: string;
    title: string;
    note: string;
    recommended: string;
    plans: {
      id: string;
      tag: string;
      price: string;
      per: string;
      note: string;
      features: string[];
      cta: string;
      highlight: boolean;
    }[];
    bottom1: string;
    bottomLink: string;
    bottom2: string;
  };
  compare: {
    eyebrow: string;
    titleA: string;
    titleVs: string;
    colA: string;
    colB: string;
    rows: [string, string][];
  };
  faq: { eyebrow: string; title: string; items: { q: string; a: string }[] };
  cases: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    note: string;
    before: string;
    after: string;
    items: {
      niche: string;
      metrics: { label: string; before: string; after: string }[];
    }[];
  };
  intake: {
    aiName: string;
    greeting: string;
    askBusiness: string;
    askSector: string;
    sectors: string[];
    sectorOther: string;
    askSectorFree: string;
    askDesc: string;
    descFollowUp: string;
    descThanks: string;
    askColors: string;
    colorChips: string[];
    askLogo: string;
    logoHave: string;
    logoGenerate: string;
    askFiles: string;
    ready: string;
    skip: string;
    attach: string;
    fileAdded: string;
    filesMax: string;
    askContact: string;
    contactInvalid: string;
    contactAuto: string;
    contactUseIt: string;
    contactOther: string;
    askExtra: string;
    extraDone: string;
    summaryTitle: string;
    submit: string;
    sending: string;
    successTitle: string;
    successText: string;
    waButton: string;
    inputPlaceholder: string;
    langOffer: string;
    langSwitch: string;
    langStay: string;
  };
  footer: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    cta: string;
    note: string;
    marquee: string;
    marqueeQ: string;
    rights: string;
  };
}

export const es: Dict = {
  nav: {
    ia: "IA 24/7",
    proceso: "Proceso",
    demo: "Demo gratis",
    tarifas: "Tarifas",
    faq: "FAQ",
    whatsapp: "WhatsApp",
    writeUs: "Escribir por WhatsApp",
  },
  hero: {
    eyebrow: "Diseño web + IA para pymes en España",
    titleA: "Webs que venden",
    titleB: "mientras duermes.",
    sub: "Creamos landing pages con un recepcionista de IA que responde al instante, cualifica clientes y agenda citas por WhatsApp — también a las 3 de la madrugada.",
    cta1: "Quiero mi demo gratis",
    cta2: "Ver tarifas",
    stats: [
      { v: "72", u: "h", l: "de cero a online" },
      { v: "24/7", u: "", l: "la IA responde y agenda" },
      { v: "0", u: "€", l: "de cuota el primer año" },
    ],
    chatCaption: "Así trabaja tu web a las 3 AM",
    chatRole: "Recepcionista IA",
    online: "en línea · 24/7",
    chat: [
      { from: "cliente", text: "Hola, ¿tenéis hueco esta semana?" },
      { from: "ia", text: "¡Hola! Sí, queda el jueves a las 17:30. ¿Te lo reservo?" },
      { from: "cliente", text: "Perfecto, resérvalo 🙌" },
      { from: "ia", text: "Hecho ✅ Cita confirmada. Ya avisé al dueño por WhatsApp." },
    ],
  },
  marquee: [
    "Clínicas dentales",
    "Abogados",
    "Reformas",
    "Psicólogos",
    "Restaurantes",
    "Inmobiliarias",
    "Turismo",
    "Estética",
    "Fisioterapia",
    "Autónomos",
  ],
  pain: {
    eyebrow: "El problema",
    title: "Tu web actual es un empleado que cobra y no trabaja.",
    items: [
      {
        n: "01",
        t: "Escriben fuera de horario",
        d: "El 70% de los mensajes de clientes llegan por la noche o en fin de semana. Si nadie responde, el cliente se enfría.",
      },
      {
        n: "02",
        t: "Responder tarde = perder la venta",
        d: "Si tardas más de 5 minutos en contestar, la probabilidad de cerrar cae un 80%. Tu competencia está a un clic.",
      },
      {
        n: "03",
        t: "Una web bonita que no vende",
        d: "El 90% de las webs de pymes son folletos digitales: no capturan el contacto, no responden, no agendan. Son un gasto, no una inversión.",
      },
    ],
    q1: "La solución no es otra web bonita. Es una web que",
    qh: "contesta, cualifica y agenda",
    q2: "mientras tú atiendes tu negocio.",
  },
  demo: {
    eyebrow: "El recepcionista que nunca duerme",
    titleA: "Mientras tu competencia duerme,",
    titleB: "tu IA cierra citas.",
    clinic: "Clínica Dental Sonrisa",
    role: "Recepcionista IA · en línea",
    script: [
      { from: "cliente", text: "Hola, ¿cuánto cuesta un empaste? Es que me duele una muela 😣" },
      {
        from: "ia",
        text: "¡Hola! Siento lo de la muela. Un empaste son 60 € e incluye anestesia y revisión. Tenemos hueco mañana a las 10:00 o a las 16:30. ¿Cuál te viene mejor?",
      },
      { from: "cliente", text: "Mañana a las 10:00 porfa" },
      {
        from: "ia",
        text: "Reservado ✅ Empaste mañana 10:00 con el Dr. Ferrer. Te mando recordatorio 2 h antes. ¡A cuidarse esa muela!",
      },
    ],
    leadLabel: "WhatsApp del dueño · ahora",
    leadTitle: "Nuevo lead cualificado 🔥",
    leadBody: "María G. — dolor de muela, urgente. Cita: mañana 10:00, empaste (60 €). Confirmada por la IA.",
    features: [
      {
        t: "Responde en segundos, no en horas",
        d: "La IA contesta al instante — de noche, en festivos, mientras estás con otro paciente.",
      },
      {
        t: "Cualifica antes de molestarte",
        d: "Pregunta qué necesita el cliente, su presupuesto y urgencia. Solo te llegan leads con intención real.",
      },
      {
        t: "Agenda citas sola",
        d: "Conectada a tu Google Calendar: propone huecos libres, reserva y manda recordatorios anti no-show.",
      },
      {
        t: "Te avisa por WhatsApp",
        d: "Cada lead cualificado llega a tu móvil con nombre, necesidad y cita. Tú solo cierras.",
      },
      {
        t: "Habla más de 50 idiomas",
        d: "Tus clientes escriben en inglés, ruso, árabe o chino — la IA responde en su idioma al instante. Perfecto para zonas turísticas.",
      },
    ],
  },
  demoOffer: {
    eyebrow: "Empieza sin riesgo",
    titleA: "Primero, tu demo gratis.",
    titleB: "Decides después.",
    sub: "Sin pagos, sin compromiso, sin letra pequeña. Nos cuentas tu negocio y en 72 horas ves tu web funcionando.",
    badge: "100% gratis",
    sendTitle: "Qué nos envías",
    send: [
      "Nombre y descripción de tu negocio",
      "Tu logo (si no tienes, te generamos uno)",
      "Los colores que te gustan",
      "Datos de contacto y WhatsApp",
      "Fotos de tu trabajo, si tienes",
      "Cualquier info que creas útil",
    ],
    getTitle: "Qué recibes en 72 horas",
    get: [
      "Demo web funcionando con tu contenido",
      "Diseño en tus colores, con tu logo",
      "Recepcionista IA ya entrenada con tu negocio",
      "Sin tarjeta, sin permanencia, sin trucos",
    ],
    then: "¿Te gusta? Elegimos la tarifa juntos y empezamos a traerte clientes nuevos. ¿No te convence? Te quedas con las ideas y nos damos la mano.",
    cta: "Quiero mi demo gratis",
    note: "Sin compromiso · Respuesta en menos de 2 horas",
  },
  process: {
    eyebrow: "Cómo funciona",
    titleA: "De «necesito una web» a vender en",
    titleB: "72 horas.",
    steps: [
      {
        n: "01",
        time: "2 minutos",
        t: "Mándanoslo todo, tal cual",
        d: "Fotos, PDFs, textos pegados de WhatsApp, tu Instagram, notas sueltas — cualquier formato vale. Habla con nuestra IA aquí abajo y adjunta lo que tengas.",
      },
      {
        n: "02",
        time: "La IA te entrevista",
        t: "Nuestra IA hace las preguntas justas",
        d: "Pregunta lo que le falta (servicios, precios, colores, logo), ordena el brief y me llega al instante a mi WhatsApp. Sin formularios eternos.",
      },
      {
        n: "03",
        time: "72 horas",
        t: "Ves tu demo funcionando",
        d: "Recibes tu web demo con tu contenido y tus colores. Si te enamora, elegimos tarifa juntos. Si no, te quedas las ideas — gratis.",
      },
    ],
  },
  pricing: {
    eyebrow: "Tarifas claras, sin letra pequeña",
    title: "Una inversión, no un gasto.",
    note: "Un solo cliente nuevo suele pagar la web entera. La IA trabaja gratis el resto del mes.",
    recommended: "Recomendado",
    plans: [
      {
        id: "Start",
        tag: "Para empezar a vender",
        price: "490 €",
        per: "pago único",
        note: "0 € de cuota el primer año · luego 190 €/año",
        features: [
          "Landing de hasta 6 bloques",
          "Copy persuasivo en español incluido",
          "Dominio .es/.com + hosting + SSL",
          "Páginas legales RGPD, Aviso legal, Cookies",
          "SEO básico + Schema.org",
          "Avisos de leads por Email + WhatsApp",
          "Entrega en 3 días",
        ],
        cta: "Empezar con Start",
        highlight: false,
      },
      {
        id: "Business",
        tag: "El que más vende",
        price: "990 €",
        per: "+ 39 €/mes",
        note: "o 390 €/año — 2 meses gratis",
        features: [
          "Todo lo de Start, y además:",
          "Recepcionista IA 24/7 (1.000 mensajes/mes)",
          "Base de conocimiento: hasta 30 documentos",
          "Cualificación de leads automática",
          "La IA habla más de 50 idiomas",
          "Agenda citas en tu Google Calendar",
          "Mini-CRM con tus leads",
          "Web en 2 idiomas (ES + EN/RU)",
          "Soporte por WhatsApp en 24 h",
        ],
        cta: "Quiero Business",
        highlight: true,
      },
      {
        id: "Publicidad",
        tag: "Acelerador",
        price: "300 €",
        per: "+ 199 €/mes",
        note: "presupuesto de anuncios aparte, desde 200 €/mes",
        features: [
          "Campañas en Meta (Instagram/Facebook)",
          "3 creativos diseñados para tu nicho",
          "A/B tests de audiencias",
          "Optimización 2 veces al mes",
          "Informes claros por WhatsApp",
          "Sin permanencia",
        ],
        cta: "Lanzar publicidad",
        highlight: false,
      },
    ],
    bottom1: "¿No sabes cuál elegir? Escríbeme y te digo con honestidad cuál necesitas —",
    bottomLink: "incluso si es ninguna",
    bottom2: ".",
  },
  compare: {
    eyebrow: "La diferencia",
    titleA: "Agencia tradicional",
    titleVs: "vs.",
    colA: "Agencia tradicional",
    colB: "Webs con IA",
    rows: [
      ["3–6 semanas de espera", "72 horas y estás vendiendo"],
      ["La web «muere» tras la entrega", "IA que responde y agenda 24/7"],
      ["Soporte por ticket, respuesta en días", "WhatsApp directo conmigo, en horas"],
      ["Cuotas opacas desde el primer día", "0 € de cuota todo el primer año"],
      ["Diseño de plantilla reciclada", "Copy y diseño pensados para tu nicho"],
      ["«Luego lo vemos» con el RGPD", "Aviso legal, cookies y RGPD incluidos"],
    ],
  },
  faq: {
    eyebrow: "Preguntas honestas",
    title: "Lo que todo el mundo pregunta antes de decidirse.",
    items: [
      {
        q: "Ya tengo web. ¿Para qué quiero otra?",
        a: "Si tu web actual te trae clientes cada semana, no la necesitas. Pero si es un folleto que nadie visita y nadie contesta, no tienes una web: tienes un gasto. La convertimos en una máquina de captar: copy que vende, SEO local y una IA que atiende a cada visitante.",
      },
      {
        q: "¿La IA responde bien? Mis clientes notarán que es un robot.",
        a: "La IA se entrena con TU negocio: tus servicios, precios, horarios y forma de hablar (hasta 30 documentos). Responde en español natural, sabe cuándo derivar a un humano y nunca inventa precios. Tus clientes notan una cosa: que por fin alguien les contesta al momento.",
      },
      {
        q: "¿Qué pasa con el RGPD y lo legal?",
        a: "Todo incluido: Aviso legal, política de privacidad, banner de cookies y textos RGPD adaptados a tu actividad. Los datos de tus leads se gestionan en la UE. Duermes tranquilo.",
      },
      {
        q: "¿Hay permanencia? ¿Puedo cancelar?",
        a: "No hay permanencia en nada. Start es pago único. Business se puede cancelar cuando quieras — tu web y tu dominio son tuyos, siempre. La publicidad, mes a mes.",
      },
      {
        q: "¿Cuándo empiezo a ver resultados?",
        a: "La web empieza a atender clientes el día 3. Los primeros leads cualificados suelen llegar en la primera semana. Con publicidad activa, el flujo es constante desde el primer mes.",
      },
      {
        q: "¿Y si necesito cambios después?",
        a: "Start incluye una actualización al año; Business, cuatro. Cambios puntuales (un precio, un horario) se hacen en 24–48 h por WhatsApp. Sin tickets, sin esperas.",
      },
    ],
  },
  footer: {
    eyebrow: "Tu próximo cliente te está buscando ahora mismo",
    titleA: "Cada día sin web que venda es un cliente que",
    titleB: "se va con otro.",
    cta: "Escríbeme por WhatsApp",
    note: "Respuesta en menos de 2 horas · Sin compromiso · Te diré con honestidad si lo necesitas",
    marquee: "¿Hablamos",
    marqueeQ: "?",
    rights: "© 2026 Webs con IA · Hecho en España",
  },
  cases: {
    eyebrow: "Casos piloto",
    titleA: "Antes y después:",
    titleB: "los números hablan.",
    note: "Datos de proyectos piloto con nuestros primeros clientes de cada nicho.",
    before: "Antes",
    after: "Después · 1 mes con la demo",
    items: [
      {
        niche: "Clínica dental",
        metrics: [
          { label: "Consultas por semana", before: "2", after: "17" },
          { label: "Tiempo de respuesta", before: "6 h", after: "8 s" },
          { label: "Reservas online", before: "0", after: "12/sem" },
        ],
      },
      {
        niche: "Despacho de abogados",
        metrics: [
          { label: "Leads cualificados/mes", before: "3", after: "21" },
          { label: "Tiempo de respuesta", before: "1 día", after: "10 s" },
          { label: "Consultas agendadas", before: "2/mes", after: "15/mes" },
        ],
      },
      {
        niche: "Empresa de reformas",
        metrics: [
          { label: "Solicitudes de presupuesto", before: "4/mes", after: "26/mes" },
          { label: "Mensajes perdidos fuera de horario", before: "60%", after: "0%" },
          { label: "Visitas a obra cerradas", before: "1/mes", after: "8/mes" },
        ],
      },
    ],
  },
  intake: {
    aiName: "Asistente IA · Webs con IA",
    greeting:
      "¡Hola! Soy la IA de Webs con IA. Voy a preparar el brief para tu demo gratuita — tardamos 2 minutos. ¿Cómo te llamas?",
    askBusiness: "Encantado, {name} 👋 ¿Cómo se llama tu negocio?",
    askSector: "¿A qué se dedica?",
    sectors: ["Clínica dental", "Abogados", "Reformas", "Psicología", "Restaurante / bar", "Otro"],
    sectorOther: "Otro",
    askSectorFree: "¿Cuál es tu sector?",
    askDesc:
      "Cuéntame en texto libre qué hacéis: servicios, precios, horarios, dirección... Puedes pegar texto de tu web vieja, Instagram o notas — entiendo cualquier formato.",
    descFollowUp: "Perfecto. ¿Y cuáles son vuestros 2–3 servicios principales? Así la demo enseña lo correcto.",
    descThanks: "Anotado 📝 Cuanta más información, mejor sale la demo.",
    askColors: "¿Qué colores te representan? (o escribe los tuyos)",
    colorChips: ["Elegante / oscuro", "Claro y limpio", "Vivos / atrevidos", "Que decidáis vosotros"],
    askLogo: "¿Tienes logotipo?",
    logoHave: "Sí, lo adjunto",
    logoGenerate: "No — generadme uno",
    askFiles:
      "Adjunta lo que tengas: logo, fotos de tu trabajo, PDFs, cartas, textos — cualquier formato. Cuando termines, pulsa «Listo».",
    ready: "Listo",
    skip: "Saltar",
    attach: "Adjuntar archivos",
    fileAdded: "Recibido: {name} ✅",
    filesMax: "Máximo 6 archivos — si tienes más, mándalos luego por WhatsApp.",
    askContact: "Último paso: ¿a qué WhatsApp o email te envío la demo?",
    contactInvalid: "No lo reconozco 🤔 Escríbeme un WhatsApp (+34 600 000 000) o un email.",
    contactAuto: "He visto este contacto en tu texto: {c}. ¿Lo uso?",
    contactUseIt: "Sí, ese",
    contactOther: "No, otro",
    askExtra: "¿Algo más que debamos saber? (promos, tono de la marca, referencias...)",
    extraDone: "No, eso es todo",
    summaryTitle: "Brief listo — revísalo:",
    submit: "Enviar mi brief",
    sending: "Enviando...",
    successTitle: "¡Recibido! 🎉",
    successText:
      "Tu demo estará lista en 72 horas. Para acelerar, mándanos el brief también por WhatsApp con un toque:",
    waButton: "Enviar brief por WhatsApp",
    inputPlaceholder: "Escribe aquí...",
    langOffer: "¡Perfecto, puedo hablar en español! 😊 ¿Seguimos en español?",
    langSwitch: "Sí, en español",
    langStay: "No, sigo en este idioma",
  },
};
