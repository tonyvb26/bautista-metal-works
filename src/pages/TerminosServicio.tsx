import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const TerminosServicio = () => {
  useEffect(() => {
    const prev = document.title;
    document.title = "Términos del servicio | COMERCIAL BAUTISTA";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-[70vh] bg-secondary py-16 md:py-20">
        <article className="container mx-auto max-w-3xl px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-6">Términos del servicio</h1>

          <div className="space-y-4 text-foreground/90 text-[15px] md:text-base leading-relaxed">
            <p>
              <strong className="text-primary">METALTEC - COMERCIAL BAUTISTA</strong> (“la empresa”) ofrece información comercial, cotizaciones y atención
              por canales digitales (sitio web, correo y WhatsApp Business). Al contactarnos, aceptas estos términos de forma razonable en el marco de la
              relación comercial.
            </p>

            <h2 className="font-heading text-xl font-semibold text-primary mt-10 mb-3">1. Uso del sitio y canales</h2>
            <p>
              Los contenidos del sitio{" "}
              <a href="https://comercialbautista.net/" className="text-accent font-medium underline underline-offset-2 hover:brightness-110">
                comercialbautista.net
              </a>{" "}
              son orientativos. Las cotizaciones y alcances de obra se confirman por escrito o por los medios que la empresa indique.
            </p>

            <h2 className="font-heading text-xl font-semibold text-primary mt-10 mb-3">2. Comunicaciones</h2>
            <p>
              Las conversaciones por WhatsApp u otros medios tienen fines comerciales y de atención. No garantizamos disponibilidad ininterrumpida de canales
              automatizados; puedes solicitar atención humana según lo indicado en nuestra{" "}
              <Link to="/politica-de-privacidad" className="text-accent font-medium underline underline-offset-2 hover:brightness-110">
                política de privacidad
              </Link>
              .
            </p>

            <h2 className="font-heading text-xl font-semibold text-primary mt-10 mb-3">3. Limitación de responsabilidad</h2>
            <p>
              En la medida permitida por la ley aplicable en Perú, la empresa no será responsable por daños indirectos o lucro cesante derivados del uso de la
              información publicada o de retrasos en la respuesta por canales digitales.
            </p>

            <h2 className="font-heading text-xl font-semibold text-primary mt-10 mb-3">4. Cambios</h2>
            <p>Podemos actualizar estos términos. La versión vigente estará publicada en esta página.</p>
          </div>

          <p className="mt-10 flex flex-wrap gap-x-2 gap-y-1 text-[15px]">
            <Link to="/" className="font-heading font-semibold text-accent underline underline-offset-2 hover:brightness-110">
              Volver al inicio
            </Link>
            <span className="text-foreground/50">·</span>
            <Link to="/politica-de-privacidad" className="font-heading font-semibold text-accent underline underline-offset-2 hover:brightness-110">
              Política de privacidad
            </Link>
          </p>
        </article>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
};

export default TerminosServicio;
