import { useState } from "react";
import { X } from "lucide-react";

const placeholders = [
  { src: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80", alt: "Soldadura industrial", cat: "Procesos" },
  { src: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80", alt: "Estructura metálica", cat: "Trabajos" },
  { src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80", alt: "Taller metalmecánico", cat: "Maquinaria" },
  { src: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80", alt: "Corte de acero", cat: "Procesos" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80", alt: "Fabricación metálica", cat: "Trabajos" },
  { src: "https://images.unsplash.com/photo-1590846083693-f23fdede3a7e?w=600&q=80", alt: "Maquinaria pesada", cat: "Maquinaria" },
];

const GallerySection = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="galeria" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-center text-foreground mb-4">
          Nuestra <span className="text-accent">Galería</span>
        </h2>
        <div className="w-16 h-1 bg-accent mx-auto mb-12 rounded-full" />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {placeholders.map((img, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className="relative overflow-hidden rounded-lg aspect-[4/3] group"
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/60 transition-colors flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  {img.cat}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-primary/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-primary-foreground hover:text-accent" onClick={() => setLightbox(null)}>
            <X className="h-8 w-8" />
          </button>
          <img
            src={placeholders[lightbox].src.replace("w=600", "w=1200")}
            alt={placeholders[lightbox].alt}
            className="max-w-full max-h-[85vh] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default GallerySection;
