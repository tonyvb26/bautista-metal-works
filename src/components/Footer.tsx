import { Phone, Mail, MessageCircle } from "lucide-react";
import logo from "@/assets/logo-comercial-bautista.jpeg";

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
            {["Inicio", "Nosotros", "Servicios", "Especificaciones", "Galería", "Contacto"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="block text-primary-foreground/70 hover:text-accent text-sm transition-colors">
                {l}
              </a>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading font-semibold text-accent mb-4">Contacto</h4>
          <div className="space-y-3 text-primary-foreground/70 text-sm">
            <a href="tel:+51971193243" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="h-4 w-4" /> 971 193 243
            </a>
            <a href="mailto:metaltec@comercialbautista.net" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail className="h-4 w-4" /> metaltec@comercialbautista.net
            </a>
            <a href="https://wa.me/51971193243" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 pt-6 text-center text-primary-foreground/50 text-xs">
        © {new Date().getFullYear()} COMERCIAL BAUTISTA. Todos los derechos reservados.
      </div>
    </div>
  </footer>
);

export default Footer;
