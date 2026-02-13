import { useState } from "react";
import { Phone, Mail, Menu, X, MessageCircle } from "lucide-react";
import logo from "@/assets/logo-comercial-bautista.jpeg";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "#especificaciones", label: "Especificaciones" },
  { href: "#galeria", label: "Galería" },
  { href: "#contacto", label: "Contacto" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-lg">
      {/* Top bar */}
      <div className="hidden md:block border-b border-primary-foreground/20">
        <div className="container mx-auto flex items-center justify-end gap-6 py-1.5 text-xs text-primary-foreground/80">
          <a href="tel:+51971193243" className="flex items-center gap-1 hover:text-accent transition-colors">
            <Phone className="h-3 w-3" /> 971 193 243
          </a>
          <a href="mailto:metaltec@comercialbautista.net" className="flex items-center gap-1 hover:text-accent transition-colors">
            <Mail className="h-3 w-3" /> metaltec@comercialbautista.net
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <a href="#inicio" className="flex items-center gap-3">
          <img src={logo} alt="COMERCIAL BAUTISTA logo" className="h-12 w-auto rounded" />
          <span className="hidden sm:block font-heading font-bold text-primary-foreground text-lg leading-tight">
            COMERCIAL<br />BAUTISTA
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-primary-foreground/90 hover:text-accent font-medium text-sm transition-colors">
              {l.label}
            </a>
          ))}
          <a
            href="https://wa.me/51971193243?text=Hola%2C%20quiero%20más%20información"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded font-heading font-semibold text-sm hover:brightness-110 transition"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </nav>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-primary-foreground">
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="lg:hidden bg-primary border-t border-primary-foreground/20 px-4 pb-4">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-primary-foreground/90 hover:text-accent font-medium transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 mt-3 text-sm text-primary-foreground/80">
            <a href="tel:+51971193243" className="flex items-center gap-2"><Phone className="h-4 w-4" /> 971 193 243</a>
            <a href="mailto:metaltec@comercialbautista.net" className="flex items-center gap-2"><Mail className="h-4 w-4" /> metaltec@comercialbautista.net</a>
          </div>
          <a
            href="https://wa.me/51971193243?text=Hola%2C%20quiero%20más%20información"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded font-heading font-semibold text-sm"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
