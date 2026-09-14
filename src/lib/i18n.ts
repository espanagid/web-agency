export const dict = {
  es: {
    nav: { plans: "Planes", process: "Cómo funciona", cases: "Casos", faq: "Preguntas", contact: "Contacto" },
    hero: {
      badge: "Agencia de webs con IA · España",
      title: "Tu web con recepcionista de IA, online en 3–7 días",
      sub: "Landing pages para negocios locales que responden, informan y agendan citas por WhatsApp las 24 horas. Pagas después de ver el demo.",
      cta1: "Ver planes",
      cta2: "Probar la IA ahora",
      stats: [
        { value: "72h", label: "de media hasta el demo" },
        { value: "24/7", label: "respondiendo por ti" },
        { value: "0€", label: "de adelanto" },
      ],
      chat: [
        { from: "user", text: "Hola, ¿tenéis hueco para hoy?" },
        { from: "ai", text: "¡Hola! Sí, tenemos disponibilidad a las 18:30. ¿Te viene bien?" },
        { from: "user", text: "Perfecto, resérvamelo" },
        { from: "ai", text: "Reservado ✅ Te llega la confirmación por WhatsApp ahora mismo." },
      ],
    },
    niches: [
      "Clínicas dentales", "Despachos de abogados", "Reformas", "Psicólogos", "Restaurantes",
      "Inmobiliarias", "Agencias de turismo", "Centros de estética", "Fisioterapia", "Autónomos",
    ],
    problem: {
      title: "¿Te pasa esto?",
      items: [
        "El 80% de las consultas llega fuera de tu horario y nadie responde",
        "Los clientes escriben por WhatsApp y se pierden entre mensajes",
        "Las citas sin confirmar se convierten en ausencias (no-shows)",
      ],
      chatLabel: { before: "Sin recepcionista de IA", after: "Con recepcionista de IA" },
      chatExample: {
        before: [
          { from: "user", text: "Hola, ¿cuánto cuesta una limpieza dental?" },
          { from: "system", text: "Sin respuesta durante 4 horas…" },
          { from: "system", text: "El cliente escribió a otra clínica" },
        ],
        after: [
          { from: "user", text: "Hola, ¿cuánto cuesta una limpieza dental?" },
          { from: "ai", text: "¡Hola! La limpieza dental cuesta 45€ e incluye revisión. ¿Quieres que te reserve cita esta semana?" },
          { from: "user", text: "Sí, el jueves por la tarde" },
          { from: "ai", text: "Anotado para el jueves a las 17:00. Aviso al equipo por WhatsApp 📲" },
        ],
      },
      solution: "Tu web + una recepcionista de IA que contesta al instante, conoce tus servicios y precios, y prepara la reserva. Tú solo confirmas.",
    },
    features: {
      title: "El recepcionista que nunca duerme",
      items: [
        { name: "Responde al instante", desc: "Cero espera, ni de noche ni en fin de semana. La IA contesta en segundos, siempre." },
        { name: "Cualifica cada lead", desc: "Distingue clientes listos para reservar de curiosos, y te avisa primero de los que están calientes." },
        { name: "Agenda sola", desc: "Consulta tu calendario, propone horas libres y confirma la cita sin que muevas un dedo." },
        { name: "Avisa por WhatsApp", desc: "Cada conversación importante te llega al momento, con el resumen y los datos de contacto." },
        { name: "Habla más de 50 idiomas", desc: "Atiende a turistas y clientes internacionales en su propio idioma, de forma natural." },
      ],
    },
    process: {
      title: "Así de fácil",
      steps: [
        { n: "01", t: "Hoy", d: "Llamada de 20 minutos: tu negocio, servicios y precios." },
        { n: "02", t: "24–72h", d: "Recibes el demo de tu web. Solo pagas cuando te guste." },
        { n: "03", t: "3–7 días", d: "Web online con la IA entrenada y lista para vender." },
        { n: "04", t: "Después", d: "Soporte, informes de leads y mejoras mes a mes." },
      ],
    },
    cases: {
      title: "Antes y después",
      sub: "Resultados de nuestros pilotos con negocios reales.",
      items: [
        {
          name: "Clínica dental",
          before: { value: "35%", label: "de llamadas sin responder" },
          after: { value: "92%", label: "de consultas atendidas al instante" },
          quote: "Ahora ninguna consulta se queda sin respuesta, ni de noche.",
        },
        {
          name: "Despacho de abogados",
          before: { value: "1 de 3", label: "citas terminaba en no-show" },
          after: { value: "+40%", label: "más citas confirmadas solas" },
          quote: "La IA recuerda y confirma la cita antes de que el cliente se olvide.",
        },
        {
          name: "Empresa de reformas",
          before: { value: "48h", label: "en dar un primer presupuesto" },
          after: { value: "Al instante", label: "presupuesto orientativo y cita en 24h" },
          quote: "Los clientes deciden mientras el interés todavía está caliente.",
        },
      ],
    },
    demo: {
      title: "Pruébalo ahora mismo",
      sub: "El asistente de abajo a la derecha es nuestra propia IA. Pregúntale precios, plazos o pídele una cita — es lo mismo que instalaríamos en tu web.",
      link: "Ver ejemplo de cliente (barbería) →",
    },
    pricing: {
      title: "Planes claros, sin letra pequeña",
      popular: "El más elegido",
      cta: "Empezar",
      items: [
        { name: "Start", tagline: "Landing que trae solicitudes", price: "490€", note: "pago único · 1er año sin cuota", feats: ["Entrega en 3 días", "Hasta 6 bloques", "1 idioma (español)", "Dominio + hosting + SSL incluidos", "Copywriting en español", "SEO básico + Schema.org", "Páginas legales RGPD incluidas", "Avisos por email y WhatsApp"] },
        { name: "Business", tagline: "AI recepcionista 24/7", price: "990€", note: "+ 39€/mes (o 390€/año)", feats: ["Entrega en 7 días", "Hasta 12 bloques", "2 idiomas (ES + EN/RU)", "AI 24/7: 1.000 mensajes/mes", "Base de conocimientos (30 docs)", "Cualificación de leads + mini-CRM", "Reserva de consultas (Google Calendar)", "Avisos por WhatsApp", "4 actualizaciones/año · soporte 24h"] },
      ],
      yearly: "Start: desde el 2º año solo 190€/año (hosting + dominio).",
      guarantees: ["Pagas después de ver el demo", "Precio cerrado: sin sorpresas", "El dominio es tuyo, siempre", "Publicidad sin permanencia"],
      ads: {
        title: "Publicidad (opcional)",
        items: [
          { name: "Puesta en marcha", price: "300€", desc: "Cabina Meta + campañas + 3 creativos" },
          { name: "Gestión mensual", price: "199€/mes", desc: "2 optimizaciones/mes, tests A/B, informes por WhatsApp" },
        ],
        note: "Presupuesto publicitario desde 200€/mes — pagas directamente a Meta.",
      },
      packages: {
        title: "Packs con descuento",
        items: [
          { name: "Traffic Start", price: "449€", note: "+ 199€/mes", desc: "Puesta en marcha + 1er mes de gestión (ahorras 50€)" },
          { name: "Full Funnel", price: "1.190€", note: "+ 39€/mes + 199€/mes", desc: "Landing Business + publicidad (ahorras 100€)" },
        ],
      },
      extra: "Extras: idioma adicional +50€ · +500 mensajes IA +9€/mes · exprés 24h +30% · bloque adicional +50€ · traslado a tu hosting 99€ · dominio propio gratis",
    },
    comparison: {
      title: "Agencia tradicional vs nosotros",
      rows: [
        { label: "Precio", them: "Presupuesto que sube en cada revisión", us: "Precio cerrado desde el primer día" },
        { label: "Plazos", them: "4–8 semanas de espera", us: "3–7 días hasta estar online" },
        { label: "Fuera de horario", them: "Nadie responde al cliente", us: "IA respondiendo 24/7" },
        { label: "Propiedad del dominio", them: "A nombre de la agencia", us: "Siempre a tu nombre" },
        { label: "Permanencia", them: "Contratos de 12 meses", us: "Sin permanencia" },
        { label: "Pago", them: "Adelanto antes de ver nada", us: "Pagas después del demo" },
      ],
    },
    faq: {
      title: "Preguntas frecuentes",
      items: [
        { q: "¿En cuánto tiempo estará lista mi web?", a: "Start: 3 días. Business: 7 días (la IA necesita entrenamiento). Te damos fecha exacta en la primera llamada." },
        { q: "¿Qué necesito para empezar?", a: "Una llamada de 20 minutos, tu lista de servicios con precios, unas fotos y tu horario. Lo demás lo hacemos nosotros." },
        { q: "¿El dominio es mío?", a: "Siempre. El dominio se registra a tu nombre desde el primer día. Si algún día te vas, te lo llevas todo." },
        { q: "¿Cuándo pago?", a: "Después de ver el demo y aprobarlo. Sin adelantos." },
        { q: "¿Puedo cancelar cuando quiera?", a: "Sí. Ni el plan mensual ni la publicidad tienen permanencia." },
        { q: "¿Qué pasa si la IA no sabe responder algo?", a: "Deriva la conversación a ti por WhatsApp con el contexto completo, para que respondas tú directamente." },
        { q: "¿Necesito conocimientos técnicos?", a: "Ninguno. Nosotros configuramos, entrenamos y mantenemos todo. Tú solo confirmas citas." },
      ],
    },
    contact: {
      title: "Hablemos de tu web",
      sub: "Cuéntanos tu negocio y te respondemos en menos de 24h.",
      note: "O escríbenos directamente por WhatsApp / email en el pie de página.",
    },
    footer: "Webs que trabajan mientras duermes · España",
    langLabel: "Idioma",
  },

  ru: {
    nav: { plans: "Тарифы", process: "Как работаем", cases: "Кейсы", faq: "Вопросы", contact: "Контакты" },
    hero: {
      badge: "Веб-студия с ИИ · Испания",
      title: "Сайт с ИИ-секретарём за 3–7 дней",
      sub: "Лендинги для локального бизнеса: отвечают на вопросы, знают прайс и записывают клиентов в WhatsApp 24/7. Платите после демо.",
      cta1: "Смотреть тарифы",
      cta2: "Поговорить с ИИ",
      stats: [
        { value: "72ч", label: "в среднем до демо" },
        { value: "24/7", label: "отвечает за вас" },
        { value: "0€", label: "предоплаты" },
      ],
      chat: [
        { from: "user", text: "Здравствуйте, есть окно сегодня?" },
        { from: "ai", text: "Здравствуйте! Да, свободно в 18:30. Вам удобно?" },
        { from: "user", text: "Отлично, запишите меня" },
        { from: "ai", text: "Записано ✅ Подтверждение уже отправлено в WhatsApp." },
      ],
    },
    niches: [
      "Стоматологии", "Юридические фирмы", "Ремонт и отделка", "Психологи", "Рестораны",
      "Агентства недвижимости", "Туристические агентства", "Салоны красоты", "Физиотерапия", "Частные специалисты",
    ],
    problem: {
      title: "Знакомая ситуация?",
      items: [
        "80% обращений приходит вне рабочего часа — и никто не отвечает",
        "Клиенты пишут в WhatsApp, и сообщения теряются",
        "Записались и не пришли — классические no-shows",
      ],
      chatLabel: { before: "Без ИИ-секретаря", after: "С ИИ-секретарём" },
      chatExample: {
        before: [
          { from: "user", text: "Здравствуйте, сколько стоит чистка зубов?" },
          { from: "system", text: "Без ответа 4 часа…" },
          { from: "system", text: "Клиент написал в другую клинику" },
        ],
        after: [
          { from: "user", text: "Здравствуйте, сколько стоит чистка зубов?" },
          { from: "ai", text: "Здравствуйте! Чистка стоит 45€, включая осмотр. Записать вас на этой неделе?" },
          { from: "user", text: "Да, в четверг вечером" },
          { from: "ai", text: "Записал на четверг, 17:00. Уже сообщил команде в WhatsApp 📲" },
        ],
      },
      solution: "Ваш сайт + ИИ-секретарь: отвечает мгновенно, знает услуги и цены, готовит запись. Вам остаётся только подтвердить.",
    },
    features: {
      title: "Секретарь, который никогда не спит",
      items: [
        { name: "Отвечает мгновенно", desc: "Ни ночью, ни в выходные. ИИ отвечает за секунды — всегда." },
        { name: "Квалифицирует каждый лид", desc: "Отличает готовых записаться от просто интересующихся и сообщает вам о горячих первыми." },
        { name: "Сама записывает", desc: "Проверяет календарь, предлагает свободное время и подтверждает встречу без вашего участия." },
        { name: "Уведомляет в WhatsApp", desc: "Каждый важный разговор приходит вам сразу же, с кратким резюме и контактами." },
        { name: "Говорит на 50+ языках", desc: "Общается с туристами и иностранными клиентами на их родном языке, естественно." },
      ],
    },
    process: {
      title: "Всё просто",
      steps: [
        { n: "01", t: "Сегодня", d: "Звонок 20 минут: услуги, цены, выбор тарифа." },
        { n: "02", t: "24–72ч", d: "Показываем демо вашего сайта. Платите, только когда понравится." },
        { n: "03", t: "3–7 дней", d: "Сайт онлайн, ИИ обучен и принимает клиентов." },
        { n: "04", t: "Дальше", d: "Поддержка, отчёты и улучшения каждый месяц." },
      ],
    },
    cases: {
      title: "До и после",
      sub: "Результаты наших пилотов с реальным бизнесом.",
      items: [
        {
          name: "Стоматологическая клиника",
          before: { value: "35%", label: "звонков оставались без ответа" },
          after: { value: "92%", label: "обращений обрабатывается мгновенно" },
          quote: "Теперь ни одно обращение не остаётся без ответа, даже ночью.",
        },
        {
          name: "Юридическая фирма",
          before: { value: "1 из 3", label: "встреч заканчивалась no-show" },
          after: { value: "+40%", label: "больше встреч подтверждается сами" },
          quote: "ИИ напоминает и подтверждает встречу, пока клиент не забыл.",
        },
        {
          name: "Компания по ремонту",
          before: { value: "48ч", label: "на первый расчёт стоимости" },
          after: { value: "Мгновенно", label: "ориентировочная смета и встреча за 24ч" },
          quote: "Клиенты решают, пока интерес ещё горячий.",
        },
      ],
    },
    demo: {
      title: "Попробуйте прямо сейчас",
      sub: "Ассистент в правом нижнем углу — наша собственная ИИ. Спросите про цены и сроки: именно такого мы установим вам.",
      link: "Пример сайта клиента (барбершоп) →",
    },
    pricing: {
      title: "Прозрачные тарифы",
      popular: "Выбирают чаще всего",
      cta: "Начать",
      items: [
        { name: "Start", tagline: "Лендинг, который приносит заявки", price: "490€", note: "разово · 1-й год без абонплаты", feats: ["Запуск за 3 дня", "До 6 блоков", "1 язык (испанский)", "Домен + хостинг + SSL включены", "Копирайт на испанском", "Базовое SEO + Schema.org", "Юридические страницы RGPD", "Уведомления о заявках: email + WhatsApp"] },
        { name: "Business", tagline: "ИИ-секретарь 24/7", price: "990€", note: "+ 39€/мес (или 390€/год)", feats: ["Запуск за 7 дней", "До 12 блоков", "2 языка (ES + EN/RU)", "ИИ 24/7: 1 000 сообщений/мес", "База знаний (30 документов)", "Квалификация лидов + мини-CRM", "Запись на консультации (Google Calendar)", "Уведомления в WhatsApp", "4 обновления/год · поддержка 24ч"] },
      ],
      yearly: "Start: со 2-го года — всего 190€/год (хостинг + домен).",
      guarantees: ["Платите после демо", "Фиксированная цена — без сюрпризов", "Домен ваш, с первого дня", "Реклама без обязательств"],
      ads: {
        title: "Реклама (опционально)",
        items: [
          { name: "Настройка", price: "300€", desc: "Кабинет Meta + кампании + 3 креатива" },
          { name: "Ведение", price: "199€/мес", desc: "2 оптимизации/мес, A/B-тесты, отчёты в WhatsApp" },
        ],
        note: "Рекламный бюджет от 200€/мес — платите напрямую Meta.",
      },
      packages: {
        title: "Пакеты со скидкой",
        items: [
          { name: "Traffic Start", price: "449€", note: "+ 199€/мес", desc: "Настройка + 1-й месяц ведения (экономия 50€)" },
          { name: "Full Funnel", price: "1 190€", note: "+ 39€/мес + 199€/мес", desc: "Лендинг Business + реклама (экономия 100€)" },
        ],
      },
      extra: "Дополнительно: язык +50€ · +500 ИИ-сообщений +9€/мес · экспресс 24ч +30% · блок +50€ · перенос на ваш хостинг 99€ · свой домен бесплатно",
    },
    comparison: {
      title: "Обычное агентство vs мы",
      rows: [
        { label: "Цена", them: "Смета растёт с каждой правкой", us: "Фиксированная цена с первого дня" },
        { label: "Сроки", them: "4–8 недель ожидания", us: "3–7 дней до запуска" },
        { label: "Вне рабочих часов", them: "Никто не отвечает клиенту", us: "ИИ отвечает 24/7" },
        { label: "Владение доменом", them: "На имя агентства", us: "Всегда на ваше имя" },
        { label: "Обязательства", them: "Контракт на 12 месяцев", us: "Без обязательств" },
        { label: "Оплата", them: "Предоплата, не видя результата", us: "Платите после демо" },
      ],
    },
    faq: {
      title: "Частые вопросы",
      items: [
        { q: "Когда сайт будет готов?", a: "Start: 3 дня. Business: 7 дней (ИИ нужно обучить). Точную дату назовём на первом звонке." },
        { q: "Что нужно от меня?", a: "Звонок 20 минут, список услуг с ценами, фото и график. Остальное — наша работа." },
        { q: "Кому принадлежит домен?", a: "Вам, с первого дня. Решите уйти — заберёте всё." },
        { q: "Когда платить?", a: "После просмотра и одобрения демо. Без предоплат." },
        { q: "Можно отменить подписку?", a: "Да, в любой момент. И подписка, и реклама — без обязательств." },
        { q: "А что если ИИ не сможет ответить на вопрос?", a: "Переведёт разговор на вас в WhatsApp с полным контекстом, чтобы вы ответили лично." },
        { q: "Нужны ли мне технические знания?", a: "Нет. Мы настраиваем, обучаем и поддерживаем всё сами. Вам остаётся только подтверждать записи." },
      ],
    },
    contact: {
      title: "Обсудим ваш сайт",
      sub: "Расскажите о бизнесе — ответим в течение 24 часов.",
      note: "Или напишите нам в WhatsApp / на почту внизу страницы.",
    },
    footer: "Сайты, которые работают, пока вы спите · Испания",
    langLabel: "Язык",
  },

  en: {
    nav: { plans: "Plans", process: "How it works", cases: "Cases", faq: "FAQ", contact: "Contact" },
    hero: {
      badge: "AI web agency · Spain",
      title: "A website with an AI receptionist, live in 3–7 days",
      sub: "Landing pages for local businesses that answer questions, know your prices and book clients via WhatsApp 24/7. You pay after seeing the demo.",
      cta1: "See plans",
      cta2: "Talk to the AI",
      stats: [
        { value: "72h", label: "average time to demo" },
        { value: "24/7", label: "answering for you" },
        { value: "0€", label: "upfront" },
      ],
      chat: [
        { from: "user", text: "Hi, do you have a slot today?" },
        { from: "ai", text: "Hi! Yes, we have availability at 6:30 PM. Does that work for you?" },
        { from: "user", text: "Perfect, book me in" },
        { from: "ai", text: "Booked ✅ You'll get the confirmation on WhatsApp right now." },
      ],
    },
    niches: [
      "Dental clinics", "Law firms", "Home renovation", "Psychologists", "Restaurants",
      "Real estate agencies", "Travel agencies", "Beauty salons", "Physiotherapy", "Freelancers",
    ],
    problem: {
      title: "Sound familiar?",
      items: [
        "80% of enquiries arrive outside opening hours and go unanswered",
        "Clients message you on WhatsApp and get lost in the thread",
        "Unconfirmed bookings turn into no-shows",
      ],
      chatLabel: { before: "Without an AI receptionist", after: "With an AI receptionist" },
      chatExample: {
        before: [
          { from: "user", text: "Hi, how much is a dental cleaning?" },
          { from: "system", text: "No reply for 4 hours…" },
          { from: "system", text: "The client messaged another clinic" },
        ],
        after: [
          { from: "user", text: "Hi, how much is a dental cleaning?" },
          { from: "ai", text: "Hi! A cleaning costs 45€ and includes a check-up. Want me to book you this week?" },
          { from: "user", text: "Yes, Thursday afternoon" },
          { from: "ai", text: "Booked for Thursday at 5 PM. Notifying the team on WhatsApp 📲" },
        ],
      },
      solution: "Your website + an AI receptionist that replies instantly, knows your services and prices, and prepares the booking. You just confirm.",
    },
    features: {
      title: "The receptionist that never sleeps",
      items: [
        { name: "Replies instantly", desc: "No waiting, not at night, not on weekends. The AI answers in seconds, always." },
        { name: "Qualifies every lead", desc: "Tells apart clients ready to book from casual browsers, and flags the hot ones first." },
        { name: "Books it herself", desc: "Checks your calendar, offers open slots and confirms the appointment without you lifting a finger." },
        { name: "Alerts you on WhatsApp", desc: "Every important conversation reaches you instantly, with a summary and contact details." },
        { name: "Speaks 50+ languages", desc: "Handles tourists and international clients in their own language, naturally." },
      ],
    },
    process: {
      title: "As easy as it gets",
      steps: [
        { n: "01", t: "Today", d: "20-minute call: your services, prices and plan." },
        { n: "02", t: "24–72h", d: "You receive a demo of your website. Pay only when you love it." },
        { n: "03", t: "3–7 days", d: "Site live with the trained AI capturing clients." },
        { n: "04", t: "After", d: "Ongoing support, lead reports and improvements." },
      ],
    },
    cases: {
      title: "Before and after",
      sub: "Results from our pilots with real businesses.",
      items: [
        {
          name: "Dental clinic",
          before: { value: "35%", label: "of calls went unanswered" },
          after: { value: "92%", label: "of enquiries handled instantly" },
          quote: "Now no enquiry goes unanswered, not even at night.",
        },
        {
          name: "Law firm",
          before: { value: "1 in 3", label: "appointments ended as no-shows" },
          after: { value: "+40%", label: "more appointments self-confirmed" },
          quote: "The AI reminds and confirms the appointment before the client forgets.",
        },
        {
          name: "Renovation company",
          before: { value: "48h", label: "to give a first quote" },
          after: { value: "Instantly", label: "a ballpark quote and a visit within 24h" },
          quote: "Clients decide while their interest is still hot.",
        },
      ],
    },
    demo: {
      title: "Try it right now",
      sub: "The assistant in the bottom-right corner is our own AI. Ask about pricing and deadlines — exactly what we install on your site.",
      link: "See a client example (barber shop) →",
    },
    pricing: {
      title: "Clear pricing, no fine print",
      popular: "Most popular",
      cta: "Get started",
      items: [
        { name: "Start", tagline: "A landing page that brings enquiries", price: "490€", note: "one-time · no subscription in year 1", feats: ["Delivery in 3 days", "Up to 6 blocks", "1 language (Spanish)", "Domain + hosting + SSL included", "Spanish copywriting", "Basic SEO + Schema.org", "RGPD legal pages included", "Email + WhatsApp lead alerts"] },
        { name: "Business", tagline: "24/7 AI receptionist", price: "990€", note: "+ 39€/month (or 390€/year)", feats: ["Delivery in 7 days", "Up to 12 blocks", "2 languages (ES + EN/RU)", "24/7 AI: 1,000 messages/month", "Knowledge base (30 documents)", "Lead qualification + mini-CRM", "Consultation booking (Google Calendar)", "WhatsApp alerts", "4 updates/year · 24h support"] },
      ],
      yearly: "Start: from year 2 only 190€/year (hosting + domain).",
      guarantees: ["You pay after seeing the demo", "Fixed price: no surprises", "Your domain stays in your name", "No ad contract lock-ins"],
      ads: {
        title: "Advertising (optional)",
        items: [
          { name: "Setup", price: "300€", desc: "Meta ad account + campaigns + 3 creatives" },
          { name: "Monthly management", price: "199€/month", desc: "2 optimizations/month, A/B tests, WhatsApp reports" },
        ],
        note: "Ad budget from 200€/month — paid directly to Meta.",
      },
      packages: {
        title: "Discounted packages",
        items: [
          { name: "Traffic Start", price: "449€", note: "+ 199€/month", desc: "Setup + 1st month of management (save 50€)" },
          { name: "Full Funnel", price: "1,190€", note: "+ 39€/month + 199€/month", desc: "Business landing + advertising (save 100€)" },
        ],
      },
      extra: "Extras: extra language +50€ · +500 AI messages +9€/month · 24h express +30% · extra block +50€ · move to your hosting 99€ · custom domain free",
    },
    comparison: {
      title: "Traditional agency vs us",
      rows: [
        { label: "Price", them: "Quote grows with every revision", us: "Fixed price from day one" },
        { label: "Timeline", them: "4–8 weeks of waiting", us: "3–7 days to go live" },
        { label: "Outside office hours", them: "No one answers the client", us: "AI answering 24/7" },
        { label: "Domain ownership", them: "Registered under the agency", us: "Always in your name" },
        { label: "Lock-in", them: "12-month contracts", us: "No lock-in" },
        { label: "Payment", them: "Upfront before seeing anything", us: "You pay after the demo" },
      ],
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        { q: "When will my website be ready?", a: "Start: 3 days. Business: 7 days (the AI needs training). We give you an exact date on the first call." },
        { q: "What do you need from me?", a: "A 20-minute call, your service list with prices, a few photos and your opening hours. We handle the rest." },
        { q: "Who owns the domain?", a: "You do, from day one. If you ever leave, you take everything with you." },
        { q: "When do I pay?", a: "After seeing and approving the demo. No upfront payments." },
        { q: "Can I cancel anytime?", a: "Yes. Neither the monthly plan nor advertising has any lock-in." },
        { q: "What if the AI can't answer something?", a: "It hands the conversation to you on WhatsApp with the full context, so you can reply personally." },
        { q: "Do I need any technical knowledge?", a: "None. We set up, train and maintain everything. You just confirm bookings." },
      ],
    },
    contact: {
      title: "Let's talk about your website",
      sub: "Tell us about your business — we reply within 24 hours.",
      note: "Or reach us directly via WhatsApp / email in the footer.",
    },
    footer: "Websites that work while you sleep · Spain",
    langLabel: "Language",
  },
} as const;

export type Lang = keyof typeof dict;
