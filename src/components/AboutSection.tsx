import { Shield, Wrench, Award } from "lucide-react";

const features = [
  { icon: Shield, title: "Calidad Garantizada", desc: "Materiales de buena calidad." },
  { icon: Wrench, title: "Fabricación a Medida", desc: "Soluciones personalizadas para cada proyecto." },
  { icon: Award, title: "Experiencia Industrial", desc: "Años de trayectoria en el rubro metalmecánico." },
];

const AboutSection = () => (
  <section id="nosotros" className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <h2 className="font-heading font-bold text-3xl md:text-4xl text-center text-foreground mb-4">
        Sobre <span className="text-accent">Nosotros</span>
      </h2>
      <div className="w-16 h-1 bg-accent mx-auto mb-8 rounded-full" />

      <p className="max-w-3xl mx-auto text-center text-muted-foreground text-lg mb-12 font-body leading-relaxed">
        Somos una empresa especializada en carpintería metálica, manufactura en acero inoxidable y fabricación industrial personalizada.
        Diseñamos y fabricamos soluciones técnicas adaptadas a cada proyecto, con los más altos estándares de calidad.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f) => (
          <div key={f.title} className="text-center p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/15 text-accent mb-4">
              <f.icon className="h-8 w-8" />
            </div>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
