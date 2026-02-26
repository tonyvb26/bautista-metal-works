import { CheckCircle } from "lucide-react";

const specs = [
  { label: "Materiales", value: "Acero al carbono, acero inoxidable, aluminio, hierro galvanizado" },
  { label: "Tipo de Acero", value: "ASTM A36, AISI 308, AISI 316" },
  { label: "Proceso de Soldadura", value: "GTAW (TIG), SMAW, MIG/MAG" },
  { label: "Fabricación de Maquinaria", value: "Lavadoras industriales, bases para motores" },
  { label: "Acabados", value: "Pintura epóxica y buen acabado" },
  { label: "Personalización", value: "Diseño 100% a medida según requerimiento del cliente" },
];

const TechSpecsSection = () => (
  <section id="especificaciones" className="py-20 bg-primary">
    <div className="container mx-auto px-4">
      <h2 className="font-heading font-bold text-3xl md:text-4xl text-center text-primary-foreground mb-4">
        Características <span className="text-accent">Técnicas</span>
      </h2>
      <div className="w-16 h-1 bg-accent mx-auto mb-12 rounded-full" />

      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-4">
        {specs.map((s) => (
          <div key={s.label} className="flex items-start gap-3 bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg p-5">
            <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <div>
              <h4 className="font-heading font-semibold text-accent text-sm mb-1">{s.label}</h4>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">{s.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TechSpecsSection;
