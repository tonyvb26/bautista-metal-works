import { Link } from "react-router-dom";
import { Phone, Mail, MessageCircle } from "lucide-react";
import logo from "@/assets/logo-comercial-bautista.jpeg";

const spaRoutes = new Set(["/politica-de-privacidad", "/terminos-servicio"]);

const quickLinks: { href: string; label: string }[] = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#galeria", label: "Galería" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#especificaciones", label: "Especificaciones" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#contacto", label: "Contacto" },
  { href: "/politica-de-privacidad", label: "Política de privacidad" },
  { href: "/terminos-servicio", label: "Términos del servicio" },
];

const Footer = () => (
  <footer className="bg-primary py-12">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="COMERCIAL BAUTISTA" className="h-10 w-auto rounded" />
            <span className="font-heading font-bold text-primary-foreground text-lg">COMERCIAL BAUTISTA</span>
          </div>
          <p className="text-primary-foreground/70 text-sm leading-relaxed">
            Especialistas en carpintería metálica, manufactura en acero inoxidable y fabricación industrial personalizada.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-heading font-semibold text-accent mb-4">Enlaces Rápidos</h4>
          <nav className="space-y-2">
            {quickLinks.map((l) =>
              spaRoutes.has(l.href) ? (
                <Link
                  key={l.href}
                  to={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-primary-foreground/70 hover:text-accent text-sm transition-colors"
                >
                  {l.label}
                </Link>
              ) : (
                <a key={l.href} href={l.href} className="block text-primary-foreground/70 hover:text-accent text-sm transition-colors">
                  {l.label}
                </a>
              ),
            )}
          </nav>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading font-semibold text-accent mb-4">Contacto</h4>
          <div className="space-y-3 text-primary-foreground/70 text-sm">
            <a href="tel:+51932285043" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="h-4 w-4" /> 932 285 043
            </a>
            <a href="mailto:metaltec@comercialbautista.net" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail className="h-4 w-4" /> metaltec@comercialbautista.net
            </a>
            <a href="https://wa.me/51932285043" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 pt-6 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-primary-foreground/50 text-xs">
        <span>© {new Date().getFullYear()} COMERCIAL BAUTISTA. Todos los derechos reservados.</span>
        <span className="hidden sm:inline" aria-hidden>
          ·
        </span>
        <Link
          to="/politica-de-privacidad"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-foreground/60 underline underline-offset-2 hover:text-accent transition-colors"
        >
          Políticas de Privacidad
        </Link>
        <span className="hidden sm:inline" aria-hidden>
          ·
        </span>
        <Link
          to="/terminos-servicio"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-foreground/60 underline underline-offset-2 hover:text-accent transition-colors"
        >
          Términos del servicio
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
