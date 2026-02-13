import { Building2, Cog, Armchair, ChevronRight } from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Carpintería Metálica",
    items: ["Puertas y ventanas", "Techos y enmallados", "Diseño de interiores", "Mueblería metálica"],
  },
  {
    icon: Cog,
    title: "Trabajo Operativo Técnico",
    items: [
      "Manufactura en acero inoxidable",
      "Máquina lavadora industrial (450 kg)",
      "Enrutado de tubería conduit",
      "Soldadura proceso GTAW",
    ],
  },
  {
    icon: Armchair,
    title: "Mueblería",
    items: ["Fabricación en melamina", "Estructura metálica", "Mobiliario a medida"],
  },
];

const ServicesSection = () => (
  <section id="servicios" className="py-20 bg-secondary">
    <div className="container mx-auto px-4">
      <h2 className="font-heading font-bold text-3xl md:text-4xl text-center text-foreground mb-4">
        Nuestros <span className="text-accent">Servicios</span>
      </h2>
      <div className="w-16 h-1 bg-accent mx-auto mb-12 rounded-full" />

      <div className="grid md:grid-cols-3 gap-8">
        {services.map((s) => (
          <div key={s.title} className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-xl transition-shadow group">
            <div className="bg-primary p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                <s.icon className="h-7 w-7 text-accent" />
              </div>
              <h3 className="font-heading font-bold text-xl text-primary-foreground">{s.title}</h3>
            </div>
            <ul className="p-6 space-y-3">
              {s.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-foreground">
                  <ChevronRight className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <div className="px-6 pb-6">
              <a
                href="#contacto"
                className="block text-center bg-accent text-accent-foreground py-2.5 rounded font-heading font-semibold text-sm hover:brightness-110 transition"
              >
                Solicitar Cotización
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
