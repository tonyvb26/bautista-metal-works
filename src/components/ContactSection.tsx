import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

const ContactSection = () => (
  <section id="contacto" className="py-20 bg-secondary">
    <div className="container mx-auto px-4">
      <h2 className="font-heading font-bold text-3xl md:text-4xl text-center text-foreground mb-4">
        Contáctenos
      </h2>
      <div className="w-16 h-1 bg-accent mx-auto mb-12 rounded-full" />

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Form */}
        <div className="bg-card rounded-lg border border-border p-8">
          <h3 className="font-heading font-semibold text-xl text-foreground mb-6">Solicitar Cotización</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Nombre</label>
              <input type="text" placeholder="Su nombre completo" className="w-full px-4 py-2.5 rounded border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Email</label>
              <input type="email" placeholder="correo@ejemplo.com" className="w-full px-4 py-2.5 rounded border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Teléfono</label>
              <input type="tel" placeholder="999 999 999" className="w-full px-4 py-2.5 rounded border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Mensaje</label>
              <textarea rows={4} placeholder="Describa su proyecto o requerimiento..." className="w-full px-4 py-2.5 rounded border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none" />
            </div>
            <button type="submit" className="w-full bg-accent text-accent-foreground py-3 rounded font-heading font-bold hover:brightness-110 transition">
              Enviar Mensaje
            </button>
          </form>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center gap-8">
          <div>
            <h3 className="font-heading font-semibold text-xl text-foreground mb-6">Información de Contacto</h3>
            <div className="space-y-5">
              <a href="tel:+51971193243" className="flex items-center gap-4 text-foreground hover:text-accent transition-colors">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Teléfono</p>
                  <p className="font-semibold">971 193 243</p>
                </div>
              </a>
              <a href="mailto:metaltec@comercialbautista.net" className="flex items-center gap-4 text-foreground hover:text-accent transition-colors">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Correo</p>
                  <p className="font-semibold">metaltec@comercialbautista.net</p>
                </div>
              </a>
              <div className="flex items-center gap-4 text-foreground">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ubicación</p>
                  <p className="font-semibold">Perú</p>
                </div>
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/51971193243?text=Hola%2C%20quiero%20solicitar%20una%20cotización"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-accent text-accent-foreground py-4 rounded-lg font-heading font-bold text-lg hover:brightness-110 transition"
          >
            <MessageCircle className="h-6 w-6" /> Escribir por WhatsApp
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
