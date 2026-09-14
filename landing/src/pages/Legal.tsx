import { useEffect } from "react";
import { Link } from "react-router";
import { SITE } from "../lib/site";

/** Юридические страницы (LSSI / RGPD / cookies). Данные автономо — ниже. */
const OWNER = {
  name: "Vitalii Ponomarev",
  nif: "Y7280436F",
  address: "Calle Uranio, 29, 1-5, 46520 Puerto de Sagunto, Valencia, España",
};

type DocKey = "aviso" | "privacidad" | "cookies";

const META: Record<DocKey, { title: string; updated: string }> = {
  aviso: { title: "Aviso Legal", updated: "Última actualización: septiembre de 2026" },
  privacidad: { title: "Política de Privacidad", updated: "Última actualización: septiembre de 2026" },
  cookies: { title: "Política de Cookies", updated: "Última actualización: septiembre de 2026" },
};

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 font-display text-2xl text-cream">{children}</h2>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 leading-relaxed text-sage">{children}</p>;
}

function Aviso() {
  return (
    <>
      <H2>1. Titular del sitio web</H2>
      <P>
        En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la
        Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos del
        titular de este sitio web:
      </P>
      <P>
        Titular: {OWNER.name} (trabajador autónomo)
        <br />
        NIF: {OWNER.nif}
        <br />
        Domicilio: {OWNER.address}
        <br />
        Correo electrónico: {SITE.email}
        <br />
        Teléfono / WhatsApp: +34 603 081 081
        <br />
        Sitio web: {SITE.url}
      </P>
      <H2>2. Objeto</H2>
      <P>
        Este sitio web tiene por objeto la prestación de servicios de diseño y desarrollo de sitios
        web con asistentes de inteligencia artificial para pequeñas y medianas empresas, así como
        servicios de publicidad digital. La navegación por el sitio atribuye la condición de
        usuario e implica la aceptación plena de este Aviso Legal.
      </P>
      <H2>3. Condiciones de uso</H2>
      <P>
        El usuario se compromete a hacer un uso lícito, diligente y responsable de los contenidos y
        servicios. Queda prohibido utilizar el sitio para fines ilegales, introducir software
        dañino o intentar acceder a áreas restringidas. El titular se reserva el derecho de
        suspender el acceso a quien incumpla estas condiciones.
      </P>
      <H2>4. Propiedad intelectual</H2>
      <P>
        Todos los contenidos del sitio (textos, diseño, código, logotipos, elementos gráficos) son
        titularidad de {SITE.name} o de sus licenciantes y están protegidos por la normativa de
        propiedad intelectual. Queda prohibida su reproducción, distribución o transformación sin
        autorización expresa.
      </P>
      <H2>5. Responsabilidad</H2>
      <P>
        El titular no se responsabiliza de los daños derivados del uso indebido del sitio, de
        interrupciones técnicas ajenas a su control ni de los contenidos de sitios de terceros
        enlazados. Las demos gratuitas se entregan sin compromiso y no constituyen por sí mismas
        una relación contractual de prestación de servicios.
      </P>
      <H2>6. Legislación aplicable</H2>
      <P>
        Este Aviso Legal se rige por la legislación española. Para cualquier controversia serán
        competentes los juzgados del domicilio del consumidor o, en su defecto, los del domicilio
        del titular.
      </P>
    </>
  );
}

function Privacidad() {
  return (
    <>
      <H2>1. Responsable del tratamiento</H2>
      <P>
        {OWNER.name} — NIF {OWNER.nif} — {OWNER.address}
        <br />
        Correo electrónico: {SITE.email} — Teléfono: +34 603 081 081
      </P>
      <H2>2. Datos que recogemos y finalidad</H2>
      <P>
        A través del chat asistido por IA y de los formularios del sitio recogemos los datos que
        nos facilitas voluntariamente: nombre, nombre del negocio, sector, descripción de la
        actividad, preferencias de diseño, archivos adjuntos (logotipos, fotos, textos) y datos de
        contacto (WhatsApp y/o email).
      </P>
      <P>
        Estos datos se utilizan exclusivamente para: (a) preparar y entregarte la demo gratuita de
        tu sitio web; (b) contactarte en relación con tu solicitud; (c) elaborar un presupuesto si
        decides continuar. No utilizamos tus datos para fines publicitarios ajenos ni los cedemos a
        terceros.
      </P>
      <H2>3. Base jurídica</H2>
      <P>
        La base del tratamiento es tu consentimiento (art. 6.1.a RGPD), otorgado al enviar el
        formulario o el brief por el chat, y la ejecución de medidas precontractuales a tu petición
        (art. 6.1.b RGPD). Puedes retirar el consentimiento en cualquier momento escribiendo a{" "}
        {SITE.email}.
      </P>
      <H2>4. Conservación</H2>
      <P>
        Los datos de las solicitudes de demo se conservan un máximo de 12 meses si no se formaliza
        ningún encargo. Si contratas nuestros servicios, se conservarán durante la relación
        contractual y los plazos legales exigidos por la normativa fiscal.
      </P>
      <H2>5. Destinatarios y encargados</H2>
      <P>
        Los datos se almacenan en servidores ubicados en la Unión Europea. Los archivos adjuntos y
        mensajes pueden procesarse por proveedores tecnológicos que actúan como encargados del
        tratamiento con las garantías exigidas por el RGPD. Si nos escribes por WhatsApp, se
        aplican además las condiciones de WhatsApp Ireland Ltd.
      </P>
      <H2>6. Tus derechos</H2>
      <P>
        Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y
        portabilidad escribiendo a {SITE.email}, adjuntando un documento que acredite tu identidad.
        También tienes derecho a reclamar ante la Agencia Española de Protección de Datos
        (www.aepd.es) si consideras que el tratamiento no se ajusta a la normativa.
      </P>
      <H2>7. Menores</H2>
      <P>
        Nuestros servicios están dirigidos a empresarios y profesionales. No tratamos
        deliberadamente datos de menores de 14 años.
      </P>
    </>
  );
}

function Cookies() {
  return (
    <>
      <H2>1. ¿Qué son las cookies?</H2>
      <P>
        Las cookies son pequeños archivos que los sitios web guardan en tu dispositivo para
        funcionar correctamente o recopilar información de navegación.
      </P>
      <H2>2. Cookies que utiliza este sitio</H2>
      <P>
        Este sitio web <strong className="text-cream">no utiliza cookies de seguimiento, analítica
        ni publicidad</strong>. Únicamente se emplea almacenamiento técnico del navegador
        (localStorage) para recordar tus preferencias de interfaz, como el idioma seleccionado.
      </P>
      <P>
        Este almacenamiento es estrictamente necesario para el funcionamiento del servicio y, según
        el artículo 22.2 de la LSSI-CE y la Guía de la AEPD, está exento de la obligación de
        consentimiento. Por eso este sitio no muestra un banner de cookies.
      </P>
      <H2>3. Cookies de terceros</H2>
      <P>
        Si sigues un enlace a servicios externos (por ejemplo, WhatsApp), esos servicios pueden
        instalar sus propias cookies conforme a sus respectivas políticas, ajenas a {SITE.name}.
      </P>
      <H2>4. Cómo eliminar el almacenamiento local</H2>
      <P>
        Puedes borrar los datos almacenados desde la configuración de tu navegador (sección de
        privacidad o «datos de sitios web»). Eliminarlos solo afecta a tus preferencias guardadas;
        el sitio seguirá funcionando.
      </P>
      <H2>5. Cambios en esta política</H2>
      <P>
        Si en el futuro incorporamos cookies de analítica o publicidad, actualizaremos esta
        política y, cuando sea necesario, solicitaremos tu consentimiento previo mediante un
        banner.
      </P>
    </>
  );
}

export default function Legal({ doc }: { doc: DocKey }) {
  const meta = META[doc];

  useEffect(() => {
    document.title = `${meta.title} — Webalo`;
    window.scrollTo(0, 0);
    return () => {
      document.title = "Webalo — Webs con IA que venden mientras duermes";
    };
  }, [meta.title]);

  return (
    <div className="min-h-screen bg-ink px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/"
          className="u-link text-xs uppercase tracking-[0.25em] text-sage transition-colors hover:text-lime"
        >
          ← webalo.eu
        </Link>
        <h1 className="mt-6 font-display text-4xl text-cream sm:text-5xl">{meta.title}</h1>
        <p className="mt-3 text-xs uppercase tracking-widest text-sage/70">{meta.updated}</p>
        <div className="mt-4 text-sm">
          {doc === "aviso" && <Aviso />}
          {doc === "privacidad" && <Privacidad />}
          {doc === "cookies" && <Cookies />}
        </div>
        <div className="mt-16 flex flex-wrap gap-6 border-t border-cream/10 pt-8 text-xs text-sage">
          <Link to="/aviso-legal" className="u-link hover:text-cream">
            Aviso Legal
          </Link>
          <Link to="/privacidad" className="u-link hover:text-cream">
            Privacidad
          </Link>
          <Link to="/cookies" className="u-link hover:text-cream">
            Cookies
          </Link>
        </div>
      </div>
    </div>
  );
}
