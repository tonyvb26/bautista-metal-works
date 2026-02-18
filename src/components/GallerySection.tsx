import { useState } from "react";
import { X } from "lucide-react";

const placeholders = [
  { src: "/gallery/public-gallery-img1.jpeg", alt: "Trabajo 1", cat: "Procesos" },
  { src: "/gallery/public-gallery-img2.jpeg", alt: "Trabajo 2", cat: "Trabajos" },
  { src: "/gallery/public-gallery-img3.jpeg", alt: "Trabajo 3", cat: "Maquinaria" },
  { src: "/gallery/public-gallery-img4.png",  alt: "Trabajo 4", cat: "Procesos" },
  { src: "/gallery/public-gallery-img5.jpeg", alt: "Trabajo 5", cat: "Trabajos" },
  { src: "/gallery/public-gallery-img6.jpeg", alt: "Trabajo 6", cat: "Maquinaria" },
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
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
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
        <div
          className="fixed inset-0 z-50 bg-primary/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-primary-foreground hover:text-accent"
            onClick={() => setLightbox(null)}
          >
            <X className="h-8 w-8" />
          </button>

          <img
            src={placeholders[lightbox].src}
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

