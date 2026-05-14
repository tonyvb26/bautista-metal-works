import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const LEGACY_ITEMS = [
  { src: "/gallery/public-gallery-img1.jpeg", alt: "Trabajo 1", caption: "Tubería contra incendios" },
  { src: "/gallery/public-gallery-img2.jpeg", alt: "Trabajo 2", caption: "Cocina Rocket" },
  { src: "/gallery/public-gallery-img3.jpeg", alt: "Trabajo 3", caption: "Portón en metal modelo acanalado" },
  { src: "/gallery/public-gallery-img4.png", alt: "Trabajo 4", caption: "Techo en metal" },
  { src: "/gallery/public-gallery-img5.jpeg", alt: "Trabajo 5", caption: "Instalación de sistema de bandejas portacables" },
  { src: "/gallery/public-gallery-img6.jpeg", alt: "Trabajo 6", caption: "Máquina lavadora industrial" },
];

const NUEVAS_ITEMS = [
  { src: "/gallery/claraboya-policarbonato.png", alt: "Claraboya metálica", caption: "Claraboya metálica con paneles de policarbonato" },
  { src: "/gallery/logos-empresariales.png", alt: "Logotipos empresariales", caption: "Restauración, diseño y pintado de logotipos empresariales" },
  {
    src: "/gallery/conduit-imc.png",
    alt: "Tuberías conduit IMC",
    caption: "Instalación montaje tuberías conduit IMC – Con accesorios – Visible / horizontal",
  },
  {
    src: "/gallery/maquina-vibratoria-ladrillos.png",
    alt: "Máquina vibratoria",
    caption:
      "Fabricación y acondicionamiento de máquina vibratoria para fabricación de ladrillos de concreto",
  },
  {
    src: "/gallery/bandejas-ranuradas.png",
    alt: "Bandejas ranuradas",
    caption: "Fabricación / instalación bandejas ranuradas en metal galvanizado con accesorios",
  },
  { src: "/gallery/techo-pared-metal-almacenaje.png", alt: "Techo y pared metálica", caption: "Elaboración de techo y paredes metálicos para almacenaje" },
  { src: "/gallery/publicidad-vinil.png", alt: "Publicidad vinilo", caption: "Elaboración de publicidad con vinilo" },
  { src: "/gallery/pluma-izaje.png", alt: "Pluma de izaje", caption: "Fabricación de pluma de izaje de carga" },
  { src: "/gallery/bases-metalicas-mesas.png", alt: "Bases metálicas para mesas", caption: "Fabricación de bases metálicas para mesas" },
  { src: "/gallery/base-metalica-tanque-agua.png", alt: "Base para tanque de agua", caption: "Fabricación de base metálica para tanque de agua" },
  { src: "/gallery/porton-corredizo-metalico.png", alt: "Portón corredizo", caption: "Fabricación de portón corredizo metálico" },
  {
    src: "/gallery/mesa-escritorio-recepcion.png",
    alt: "Mesa de escritorio recepción",
    caption: "Fabricación de mesa de escritorio para computadoras en recepción",
  },
];

const GALLERY_ITEMS = [...LEGACY_ITEMS, ...NUEVAS_ITEMS];

const LOOP_COPIES = 3;
const DRAG_THRESHOLD_PX = 8;
const AUTO_SCROLL_PX_PER_FRAME = 0.65;
const AUTO_RESUME_MS = 2800;
/** px/ms mínimo para arrancar inercia al soltar */
const MOMENTUM_MIN_SPEED = 0.35;
/** amortiguación exponencial (mayor = frena antes) */
const MOMENTUM_DECAY_PER_MS = 0.0022;

const GallerySection = () => {
  const stripRef = useRef<HTMLDivElement>(null);
  const setWidthRef = useRef(0);
  const adjustingRef = useRef(false);
  const centeredOnceRef = useRef(false);
  const autoPausedRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lightboxRef = useRef<number | null>(null);
  const prevLightboxRef = useRef<number | null>(null);

  const dragRef = useRef({
    active: false,
    pointerId: 0,
    startX: 0,
    scrollStart: 0,
    dragged: false,
  });
  const moveSampleRef = useRef({ t: 0, scroll: 0, ready: false });
  const scrollVelRef = useRef(0);
  const suppressClickRef = useRef(false);
  const momentumRafRef = useRef(0);
  const momentumActiveRef = useRef(false);
  const globalUpCleanupRef = useRef<(() => void) | null>(null);

  const clearGlobalUp = useCallback(() => {
    globalUpCleanupRef.current?.();
    globalUpCleanupRef.current = null;
  }, []);

  const cancelMomentum = useCallback(() => {
    if (momentumRafRef.current) {
      cancelAnimationFrame(momentumRafRef.current);
      momentumRafRef.current = 0;
    }
    momentumActiveRef.current = false;
  }, []);

  const loopItems = useMemo(() => {
    const out: { item: (typeof GALLERY_ITEMS)[number]; loopIndex: number; realIndex: number }[] = [];
    for (let copy = 0; copy < LOOP_COPIES; copy++) {
      GALLERY_ITEMS.forEach((item, realIndex) => {
        out.push({ item, loopIndex: copy * GALLERY_ITEMS.length + realIndex, realIndex });
      });
    }
    return out;
  }, []);

  const [lightbox, setLightbox] = useState<number | null>(null);
  useEffect(() => {
    lightboxRef.current = lightbox;
  }, [lightbox]);
  const len = GALLERY_ITEMS.length;

  const bumpUserInteraction = useCallback(() => {
    autoPausedRef.current = true;
    if (resumeTimerRef.current !== null) {
      clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = setTimeout(() => {
      autoPausedRef.current = false;
      resumeTimerRef.current = null;
    }, AUTO_RESUME_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current !== null) clearTimeout(resumeTimerRef.current);
      clearGlobalUp();
      cancelMomentum();
    };
  }, [clearGlobalUp, cancelMomentum]);

  useEffect(() => {
    if (lightbox !== null) {
      autoPausedRef.current = true;
      if (resumeTimerRef.current !== null) {
        clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = null;
      }
    } else if (prevLightboxRef.current !== null) {
      bumpUserInteraction();
    }
    prevLightboxRef.current = lightbox;
  }, [lightbox, bumpUserInteraction]);

  useEffect(() => {
    let id = 0;
    const tick = () => {
      const el = stripRef.current;
      if (el && !autoPausedRef.current && lightboxRef.current === null && !momentumActiveRef.current) {
        el.scrollLeft += AUTO_SCROLL_PX_PER_FRAME;
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  const measureAndCenter = useCallback(() => {
    const el = stripRef.current;
    if (!el || len === 0) return;
    const oneSet = el.scrollWidth / LOOP_COPIES;
    if (oneSet <= 0) return;
    setWidthRef.current = oneSet;
    if (!centeredOnceRef.current) {
      adjustingRef.current = true;
      el.scrollLeft = oneSet;
      adjustingRef.current = false;
      centeredOnceRef.current = true;
    }
  }, [len]);

  useLayoutEffect(() => {
    measureAndCenter();
  }, [measureAndCenter]);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => measureAndCenter());
    ro.observe(el);
    return () => ro.disconnect();
  }, [measureAndCenter]);

  const normalizeScroll = useCallback(() => {
    const el = stripRef.current;
    const w = setWidthRef.current;
    if (!el || !w || adjustingRef.current) return;
    if (el.scrollLeft < w - 2) {
      adjustingRef.current = true;
      el.scrollLeft += w;
      adjustingRef.current = false;
    } else if (el.scrollLeft >= 2 * w - 2) {
      adjustingRef.current = true;
      el.scrollLeft -= w;
      adjustingRef.current = false;
    }
  }, []);

  const onScrollStrip = useCallback(() => {
    normalizeScroll();
  }, [normalizeScroll]);

  const startMomentum = useCallback(
    (velocityPxPerMs: number) => {
      const el = stripRef.current;
      if (!el || Math.abs(velocityPxPerMs) < MOMENTUM_MIN_SPEED) {
        bumpUserInteraction();
        return;
      }

      cancelMomentum();
      autoPausedRef.current = true;
      momentumActiveRef.current = true;

      let v = velocityPxPerMs * 1000;
      let lastTs = 0;

      const step = (ts: number) => {
        const strip = stripRef.current;
        if (!strip) {
          momentumRafRef.current = 0;
          momentumActiveRef.current = false;
          bumpUserInteraction();
          return;
        }

        if (lastTs === 0) {
          lastTs = ts;
          momentumRafRef.current = requestAnimationFrame(step);
          return;
        }

        const dt = Math.min(ts - lastTs, 32);
        lastTs = ts;

        strip.scrollLeft += v * (dt / 1000);
        normalizeScroll();

        v *= Math.exp(-MOMENTUM_DECAY_PER_MS * dt);

        if (Math.abs(v) < 8) {
          momentumRafRef.current = 0;
          momentumActiveRef.current = false;
          bumpUserInteraction();
          return;
        }

        momentumRafRef.current = requestAnimationFrame(step);
      };

      momentumRafRef.current = requestAnimationFrame(step);
    },
    [bumpUserInteraction, cancelMomentum, normalizeScroll],
  );

  const endDragPointer = useCallback(
    (e: ReactPointerEvent<HTMLDivElement> | PointerEvent) => {
      const d = dragRef.current;
      if (!d.active || e.pointerId !== d.pointerId) return;

      d.active = false;
      clearGlobalUp();

      if (d.dragged) {
        suppressClickRef.current = true;
        startMomentum(scrollVelRef.current);
      } else {
        scrollVelRef.current = 0;
      }

      moveSampleRef.current = { t: 0, scroll: 0, ready: false };
    },
    [clearGlobalUp, startMomentum],
  );

  const onPointerDownStrip = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const el = stripRef.current;
      if (!el) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;

      bumpUserInteraction();
      cancelMomentum();
      suppressClickRef.current = false;

      dragRef.current = {
        active: true,
        pointerId: e.pointerId,
        startX: e.clientX,
        scrollStart: el.scrollLeft,
        dragged: false,
      };
      scrollVelRef.current = 0;
      moveSampleRef.current = { t: performance.now(), scroll: el.scrollLeft, ready: false };

      clearGlobalUp();
      const finish = (ev: PointerEvent) => {
        if (ev.pointerId !== dragRef.current.pointerId) return;
        endDragPointer(ev);
      };
      globalUpCleanupRef.current = () => {
        window.removeEventListener("pointerup", finish);
        window.removeEventListener("pointercancel", finish);
      };
      window.addEventListener("pointerup", finish);
      window.addEventListener("pointercancel", finish);
    },
    [bumpUserInteraction, cancelMomentum, clearGlobalUp, endDragPointer],
  );

  const onPointerMoveStrip = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const el = stripRef.current;
      const d = dragRef.current;
      if (!el || !d.active || e.pointerId !== d.pointerId) return;

      const dx = e.clientX - d.startX;
      if (!d.dragged && Math.abs(dx) >= DRAG_THRESHOLD_PX) {
        d.dragged = true;
      }
      if (d.dragged) {
        el.scrollLeft = d.scrollStart - dx;

        const now = performance.now();
        const prev = moveSampleRef.current;
        if (prev.ready && now > prev.t) {
          const ds = el.scrollLeft - prev.scroll;
          const dt = now - prev.t;
          if (dt > 0) {
            scrollVelRef.current = ds / dt;
          }
        }
        moveSampleRef.current = { t: now, scroll: el.scrollLeft, ready: true };
      }
    },
    [],
  );

  const onPointerUpStrip = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      endDragPointer(e);
      bumpUserInteraction();
    },
    [endDragPointer, bumpUserInteraction],
  );

  const onPointerCancelStrip = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      endDragPointer(e);
      bumpUserInteraction();
    },
    [endDragPointer, bumpUserInteraction],
  );

  const tryOpenThumb = useCallback((realIndex: number) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    setLightbox(realIndex);
  }, []);

  const lbPrev = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i - 1 + len) % len));
  }, [len]);
  const lbNext = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i + 1) % len));
  }, [len]);

  return (
    <section id="galeria" className="py-20 bg-background overflow-x-hidden">
      <div className="container mx-auto px-4">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-center text-foreground mb-4">
          Nuestra <span className="text-accent">Galería</span>
        </h2>
        <div className="w-16 h-1 bg-accent mx-auto mb-12 rounded-full" />
      </div>

      <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">
        <div
          ref={stripRef}
          role="region"
          aria-label="Galería de proyectos, desplazamiento horizontal arrastrando"
          onScroll={onScrollStrip}
          onPointerDown={onPointerDownStrip}
          onPointerMove={onPointerMoveStrip}
          onPointerUp={onPointerUpStrip}
          onPointerCancel={onPointerCancelStrip}
          className="
            flex w-full gap-8 sm:gap-10 overflow-x-auto pb-2
            [-ms-overflow-style:none] [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            cursor-grab active:cursor-grabbing touch-pan-x select-none
          "
        >
          {loopItems.map(({ item: img, loopIndex, realIndex }) => (
            <button
              key={`loop-${loopIndex}`}
              type="button"
              onClick={() => tryOpenThumb(realIndex)}
              className="
                relative flex-shrink-0 w-[min(94vw,640px)] sm:w-[600px] md:w-[640px]
                overflow-hidden rounded-lg aspect-[4/3] group text-left outline-none cursor-pointer
                ring-offset-background focus-visible:ring-2 focus-visible:ring-ring border border-border shadow-md bg-card
                first:ml-4 last:mr-4 sm:first:ml-6 sm:last:mr-6
              "
            >
              <img
                src={img.src}
                alt={img.alt}
                draggable={false}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 pointer-events-none"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/60 transition-colors flex items-center justify-center p-2">
                <span className="text-primary-foreground font-heading font-semibold text-sm sm:text-base text-center leading-snug opacity-0 group-hover:opacity-100 transition-opacity line-clamp-4">
                  {img.caption}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-primary/95 flex flex-col items-center justify-center p-4 sm:p-6"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Vista ampliada de la galería"
        >
          <button type="button" className="absolute top-4 right-4 text-primary-foreground hover:text-accent z-10" onClick={() => setLightbox(null)}>
            <X className="h-8 w-8" />
          </button>

          <button
            type="button"
            aria-label="Imagen anterior"
            onClick={(e) => {
              e.stopPropagation();
              lbPrev();
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          <button
            type="button"
            aria-label="Imagen siguiente"
            onClick={(e) => {
              e.stopPropagation();
              lbNext();
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
          >
            <ChevronRight className="h-7 w-7" />
          </button>

          <div className="w-full max-w-4xl flex flex-col items-center gap-5 px-12 sm:px-16 pt-8" onClick={(e) => e.stopPropagation()}>
            <img
              src={GALLERY_ITEMS[lightbox].src}
              alt={GALLERY_ITEMS[lightbox].alt}
              className="max-w-full max-h-[min(70vh,720px)] w-auto rounded-lg object-contain shadow-xl"
            />
            <div className="w-full rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-4 sm:px-6 sm:py-5">
              <p className="text-primary-foreground text-center font-heading text-base sm:text-lg md:text-xl leading-relaxed">
                {GALLERY_ITEMS[lightbox].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
