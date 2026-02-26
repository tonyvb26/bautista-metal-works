import { MessageCircle, FileText } from "lucide-react";
import heroBg from "@/assets/hero-metalwork.jpg";

const HeroSection = () => (
  <section
    id="inicio"
    className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
  >
    <img
      src={heroBg}
      alt="Taller metalmecánico"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-primary/75" />

    <div className="relative z-10 container mx-auto px-4 text-center">
      <h1 className="font-heading font-black text-4xl md:text-6xl lg:text-7xl text-primary-foreground mb-4 animate-fade-in-up">
        COMERCIAL BAUTISTA
      </h1>

      <p
        className="font-heading font-semibold text-lg md:text-2xl text-accent mb-8 animate-fade-in-up"
        style={{ animationDelay: "0.2s" }}
      >
        VARIEDAD EN FABRICACIÓN – DISEÑAMOS TUS PROYECTOS
      </p>

      {/* Botones principales */}
      <div
        className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up"
        style={{ animationDelay: "0.4s" }}
      >
        <a
          href="https://wa.me/51971193243?text=Hola,%20quisiera%20cotizar%20un%20proyecto%20de%20fabricación%20metálica.%20¿Podrían%20asesorarme?"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3 rounded font-heading font-bold hover:brightness-110 transition text-lg"
        >
          <MessageCircle className="h-5 w-5" /> Contactar por WhatsApp
        </a>

        <a
          href="#contacto"
          className="flex items-center gap-2 border-2 border-primary-foreground text-primary-foreground px-8 py-3 rounded font-heading font-bold hover:bg-primary-foreground/10 transition text-lg"
        >
          <FileText className="h-5 w-5" /> Solicitar Cotización
        </a>
      </div>

      {/* Brochure y Catálogo */}
      <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-12 max-w-4xl mx-auto">
        <a
          href="/brochure.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center bg-primary-foreground text-primary px-10 py-5 rounded-lg font-heading font-bold text-lg hover:scale-105 transition duration-300 shadow-lg"
        >
          📘 Ver Brochure
        </a>

        <a
          href="/catalogo.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center bg-primary-foreground text-primary px-10 py-5 rounded-lg font-heading font-bold text-lg hover:scale-105 transition duration-300 shadow-lg"
        >
          📗 Ver Catálogo
        </a>
      </div>
    </div>
  </section>
);

export default HeroSection;
