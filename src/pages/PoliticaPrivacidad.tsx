import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const PoliticaPrivacidad = () => {
  const location = useLocation();

  useEffect(() => {
    const prev = document.title;
    document.title = "Política de privacidad | COMERCIAL BAUTISTA";
    return () => {
      document.title = prev;
    };
  }, []);

  useEffect(() => {
    if (location.hash !== "#eliminacion-datos") return;
    const id = window.setTimeout(() => {
      document.getElementById("eliminacion-datos")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
    return () => window.clearTimeout(id);
  }, [location.hash, location.pathname]);

  return (
    <>
      <Header />
      <main className="min-h-[70vh] bg-secondary py-16 md:py-20">
        <article className="container mx-auto max-w-3xl px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-6">Política de privacidad</h1>

          <div className="space-y-4 text-foreground/90 text-[15px] md:text-base leading-relaxed">
            <p>
              <strong className="text-primary">METALTEC - COMERCIAL BAUTISTA</strong> (en adelante, “la empresa”), con sitio web{" "}
              <a href="https://comercialbautista.net/" className="text-accent font-medium underline underline-offset-2 hover:brightness-110">
                comercialbautista.net
              </a>
              , informa cómo tratamos los datos personales cuando nos contactas por WhatsApp u otros medios relacionados con nuestros servicios de
              carpintería metálica y fabricación industrial.
            </p>

            <div
              id="eliminacion-datos"
              className="rounded-lg border border-border bg-muted/60 p-4 md:p-5 mt-8 scroll-mt-24"
            >
              <h2 className="font-heading text-xl font-semibold text-primary mb-3">Eliminación de datos personales</h2>
              <p>
                Si deseas solicitar la eliminación de tus datos personales asociados a consultas o conversaciones con nosotros (incluido el canal de
                WhatsApp), escríbenos al correo{" "}
                <a href="mailto:metaltec@comercialbautista.net" className="text-accent font-medium underline underline-offset-2 hover:brightness-110">
                  metaltec@comercialbautista.net
                </a>{" "}
                indicando tu número de teléfono o canal de contacto y el tipo de solicitud. Responderemos en un plazo razonable y podremos pedirte información
                mínima para verificar tu identidad.
              </p>
              <p className="mt-3">
                Los plazos y alcances pueden depender de obligaciones legales en Perú y de la conservación necesaria para atender reclamos o requerimientos
                válidos.
              </p>
            </div>

            <p className="text-sm text-foreground/70 mt-4">
              También puedes leer los{" "}
              <Link
                to="/terminos-servicio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent font-medium underline underline-offset-2 hover:brightness-110"
              >
                términos del servicio
              </Link>
              .
            </p>

            <h2 className="font-heading text-xl font-semibold text-primary mt-10 mb-3">1. Responsable del tratamiento</h2>
            <p>La empresa es responsable del tratamiento de los datos que nos facilitas en el marco de consultas comerciales, cotizaciones y atención al cliente.</p>
            <p>
              <strong className="text-primary">Contacto (privacidad y consultas):</strong>{" "}
              <a href="mailto:metaltec@comercialbautista.net" className="text-accent font-medium underline underline-offset-2 hover:brightness-110">
                metaltec@comercialbautista.net
              </a>
            </p>

            <h2 className="font-heading text-xl font-semibold text-primary mt-10 mb-3">2. Datos que podemos recibir</h2>
            <ul className="list-disc pl-6 space-y-2 marker:text-accent">
              <li>Número de teléfono y perfil asociado a WhatsApp (según la plataforma).</li>
              <li>Contenido de mensajes: texto, imágenes, documentos o audios que envíes de forma espontánea.</li>
              <li>
                Datos que nos indiques para cotizar u operar (por ejemplo tipo de trabajo, medidas aproximadas, ubicación o datos de empresa como RUC,
                cuando los compartes).
              </li>
              <li>Datos técnicos mínimos asociados al canal (por ejemplo metadatos de entrega proporcionados por Meta / WhatsApp según corresponda).</li>
            </ul>

            <h2 className="font-heading text-xl font-semibold text-primary mt-10 mb-3">3. Finalidades</h2>
            <p>Usamos estos datos únicamente para:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-accent">
              <li>Atender solicitudes comerciales, orientación y cotizaciones.</li>
              <li>Coordinar visitas o entrega de información relacionada al servicio solicitado.</li>
              <li>Gestionar el historial de la conversación mientras mantengamos el contacto contigo.</li>
            </ul>
            <p>
              Puedes interactuar con un asistente automatizado (“Gladis”) para agilizar la recopilación de información comercial previa a una cotización. En
              cualquier momento puedes pedir atención humana mediante el mismo canal o el correo de contacto.
            </p>

            <h2 className="font-heading text-xl font-semibold text-primary mt-10 mb-3">4. WhatsApp y Meta</h2>
            <p>
              Las comunicaciones pueden realizarse mediante <strong className="text-primary">WhatsApp Business Platform</strong> (Meta). El tratamiento de
              datos en esa infraestructura también se rige por las políticas y condiciones de Meta / WhatsApp. Te recomendamos revisar la información de
              privacidad que Meta pone a disposición de los usuarios de WhatsApp.
            </p>

            <h2 className="font-heading text-xl font-semibold text-primary mt-10 mb-3">5. Base legal (marco general)</h2>
            <p>
              El tratamiento se basa en la relación precontractual o contractual (respuesta a consultas y cotización), en tu consentimiento cuando corresponda
              (por ejemplo, al escribirnos y continuar la conversación), y en el interés legítimo de la empresa en atender consultas y administrar el canal,
              siempre respetando tus derechos.
            </p>

            <h2 className="font-heading text-xl font-semibold text-primary mt-10 mb-3">6. Conservación</h2>
            <p>
              Conservamos la información durante el tiempo necesario para responder tu consulta, gestionar una cotización u obligaciones legales aplicables en
              Perú, y luego la eliminamos o anonimizamos cuando ya no sea necesaria, salvo que la ley exija un plazo mayor.
            </p>

            <h2 className="font-heading text-xl font-semibold text-primary mt-10 mb-3">7. Cesiones y encargados</h2>
            <p>
              No vendemos tus datos personales. Podemos utilizar proveedores que nos ayudan a operar el canal de mensajería o la infraestructura tecnológica
              (hosting, API de WhatsApp / Meta, herramientas de respuesta automatizada cuando corresponda), bajo obligaciones de confidencialidad y
              tratamiento conforme a la finalidad indicada.
            </p>

            <h2 className="font-heading text-xl font-semibold text-primary mt-10 mb-3">8. Seguridad</h2>
            <p>
              Adoptamos medidas razonables de seguridad técnica y organizativa para proteger los datos frente a accesos no autorizados, pérdida o alteración,
              acorde al tipo de información que manejamos.
            </p>

            <h2 className="font-heading text-xl font-semibold text-primary mt-10 mb-3">9. Tus derechos</h2>
            <p>
              Si aplican en tu caso según normativa vigente (por ejemplo Ley N.º 29733 y normas complementarias en Perú), puedes ejercer derechos de acceso,
              rectificación, cancelación, oposición y otros reconocidos, escribiendo a{" "}
              <a href="mailto:metaltec@comercialbautista.net" className="text-accent font-medium underline underline-offset-2 hover:brightness-110">
                metaltec@comercialbautista.net
              </a>
              . Podremos pedirte información razonable para verificar tu identidad.
            </p>

            <h2 className="font-heading text-xl font-semibold text-primary mt-10 mb-3">10. Menores</h2>
            <p>
              Nuestros servicios comerciales no están dirigidos a menores. Si crees que tratamos datos de un menor sin fundamento adecuado, escríbenos a{" "}
              <a href="mailto:metaltec@comercialbautista.net" className="text-accent font-medium underline underline-offset-2 hover:brightness-110">
                metaltec@comercialbautista.net
              </a>
              .
            </p>

            <h2 className="font-heading text-xl font-semibold text-primary mt-10 mb-3">11. Cambios</h2>
            <p>
              Podemos actualizar esta política. La versión vigente se publicará en esta misma página. Los cambios sustanciales los comunicaremos cuando sea
              procedente.
            </p>
          </div>

          <p className="mt-10">
            <Link to="/" className="font-heading font-semibold text-accent underline underline-offset-2 hover:brightness-110">
              Volver al inicio
            </Link>
          </p>
        </article>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
};

export default PoliticaPrivacidad;
