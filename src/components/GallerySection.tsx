"use client";

import Image from "next/image";
import { useState, useCallback, useRef, useEffect } from "react";
import { gallery } from "@/data/gallery";
import Lightbox from "./Lightbox";

function CategoryBlock({
  category,
  onOpenLightbox,
}: {
  category: (typeof gallery.categories)[0];
  onOpenLightbox: (images: string[], index: number) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setVisible(true);
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={`gallery-${category.id}`}
      className={`scroll-mt-24 w-full max-w-6xl mx-auto px-4 py-12 md:py-16 gallery-category-anim ${visible ? "is-visible" : ""}`}
    >
      <header className="text-center mb-8 md:mb-12">
        <h2 className="font-serif text-2xl md:text-3xl text-valentine-deep">
          {category.name}
        </h2>
        {category.description && (
          <p className="font-sans text-stone-600 mt-2">{category.description}</p>
        )}
        <p className="font-sans text-stone-500 text-sm mt-1">
          {category.images.length} ảnh
        </p>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {category.images.map((src, index) => (
          <button
            type="button"
            key={src}
            className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-valentine-rose rounded-lg gallery-card-anim"
            style={{ animationDelay: visible ? `${index * 0.04}s` : "0s" }}
            onClick={() => onOpenLightbox(category.images, index)}
          >
            <div className="relative bg-white p-2 pb-8 shadow-md hover:shadow-xl transition-all duration-300 rotate-0 group-hover:rotate-1 group-hover:scale-[1.02]">
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-200 rounded-sm">
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover polaroid-img"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                />
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default function GallerySection() {
  const [lightbox, setLightbox] = useState<{
    images: string[];
    index: number;
  } | null>(null);

  const openLightbox = useCallback((images: string[], index: number) => {
    setLightbox({ images, index });
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const goPrev = useCallback(() => {
    if (!lightbox) return;
    setLightbox((prev) =>
      prev
        ? {
            ...prev,
            index: prev.index > 0 ? prev.index - 1 : prev.images.length - 1,
          }
        : null
    );
  }, [lightbox]);

  const goNext = useCallback(() => {
    if (!lightbox) return;
    setLightbox((prev) =>
      prev
        ? {
            ...prev,
            index: prev.index < prev.images.length - 1 ? prev.index + 1 : 0,
          }
        : null
    );
  }, [lightbox]);

  const floatingSampleImages = gallery.categories
    .filter((c) => c.images.length > 0)
    .slice(0, 6)
    .map((c) => c.images[0]);

  const heartPositions: { top: string; left?: string; right?: string; size: string; delay: number; duration: number }[] = [
    { top: "12%", left: "8%", size: "text-2xl", delay: 0, duration: 6 },
    { top: "22%", right: "12%", size: "text-xl", delay: 1.2, duration: 8 },
    { top: "45%", left: "4%", size: "text-3xl", delay: 0.5, duration: 7 },
    { top: "55%", right: "6%", size: "text-lg", delay: 2, duration: 9 },
    { top: "75%", left: "15%", size: "text-xl", delay: 1, duration: 6.5 },
    { top: "85%", right: "10%", size: "text-2xl", delay: 0.8, duration: 7.5 },
    { top: "35%", left: "18%", size: "text-lg", delay: 1.5, duration: 8 },
    { top: "68%", right: "18%", size: "text-2xl", delay: 0.3, duration: 6 },
  ];

  const fallingHeartsLeft = Array.from({ length: 16 }, (_, i) => ({
    left: `${5 + (i % 9) * 10}%`,
    delay: i * 1.4,
    duration: 16 + (i % 5),
    sway: i % 3 === 0,
  }));
  const fallingHeartsRight = Array.from({ length: 16 }, (_, i) => ({
    right: `${5 + (i % 9) * 10}%`,
    left: undefined as string | undefined,
    delay: i * 1.3 + 0.8,
    duration: 17 + (i % 4),
    sway: i % 3 !== 0,
  }));
  const fallingImages = gallery.categories
    .filter((c) => c.images.length > 0)
    .flatMap((c) => c.images.slice(0, 2))
    .slice(0, 8);
  const fallingImgConfig = [
    { side: "left" as const, left: "2%", delay: 0, duration: 28 },
    { side: "left" as const, left: "6%", delay: 7, duration: 32 },
    { side: "left" as const, left: "4%", delay: 14, duration: 30 },
    { side: "right" as const, right: "2%", delay: 4, duration: 26 },
    { side: "right" as const, right: "5%", delay: 11, duration: 30 },
    { side: "right" as const, right: "3%", delay: 18, duration: 28 },
  ];

  return (
    <section id="gallery" className="relative min-h-screen w-full py-16 md:py-24 overflow-hidden">
      {/* Nền: gradient gốc + nhiều lớp orb */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #fff1f2 0%, #fce7f3 35%, #fdf2f4 70%, #fce7f3 100%)",
        }}
        aria-hidden
      />
      <div
        className="gallery-bg-orb absolute -top-1/4 -right-1/4 w-[80vmax] h-[80vmax] rounded-full opacity-[0.12]"
        style={{
          background: "radial-gradient(circle, rgb(159 18 57) 0%, transparent 70%)",
          animation: "galleryBgDrift1 25s ease-in-out infinite",
        }}
        aria-hidden
      />
      <div
        className="gallery-bg-orb absolute -bottom-1/4 -left-1/4 w-[70vmax] h-[70vmax] rounded-full opacity-[0.10]"
        style={{
          background: "radial-gradient(circle, rgb(225 29 72) 0%, transparent 65%)",
          animation: "galleryBgDrift2 30s ease-in-out infinite",
        }}
        aria-hidden
      />
      <div
        className="gallery-bg-orb absolute top-1/2 left-1/2 w-[60vmax] h-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgb(252 231 243) 0%, transparent 60%)",
          animation: "galleryBgDrift1 35s ease-in-out infinite reverse, galleryPulse 8s ease-in-out infinite",
        }}
        aria-hidden
      />
      <div
        className="gallery-bg-orb absolute top-1/3 -left-1/4 w-[50vmax] h-[50vmax] rounded-full opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, rgb(253 164 175) 0%, transparent 65%)",
          animation: "galleryBgDrift2 28s ease-in-out infinite",
        }}
        aria-hidden
      />
      <div
        className="gallery-bg-orb absolute bottom-1/3 -right-1/4 w-[55vmax] h-[55vmax] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, rgb(254 205 211) 0%, transparent 65%)",
          animation: "galleryBgDrift1 32s ease-in-out infinite reverse",
        }}
        aria-hidden
      />

      {/* Ảnh nền mờ trôi nhẹ — kỉ niệm */}
      {floatingSampleImages.map((src, i) => {
        const positions = [
          { top: "10%", left: "2%", w: "20vmin", h: "28vmin", rotate: -8, duration: 22, delay: 0 },
          { top: "18%", right: "5%", left: undefined, w: "24vmin", h: "32vmin", rotate: 6, duration: 26, delay: 2 },
          { top: "50%", left: "0%", w: "18vmin", h: "24vmin", rotate: -4, duration: 24, delay: 1 },
          { top: "52%", right: "2%", left: undefined, w: "22vmin", h: "30vmin", rotate: 5, duration: 28, delay: 3 },
          { top: "78%", left: "5%", w: "20vmin", h: "26vmin", rotate: 3, duration: 25, delay: 1.5 },
          { top: "82%", right: "8%", left: undefined, w: "16vmin", h: "22vmin", rotate: -6, duration: 23, delay: 2.5 },
        ];
        const p = positions[i] ?? positions[0];
        return (
          <div
            key={src}
            className="gallery-bg-float-img absolute rounded-2xl overflow-hidden opacity-[0.14]"
            style={{
              top: p.top,
              left: p.left,
              right: p.left === undefined ? p.right : undefined,
              width: p.w,
              height: p.h,
              transform: `rotate(${p.rotate}deg)`,
              animation: `galleryFloatImg ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
              filter: "blur(14px)",
            }}
            aria-hidden
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover scale-110"
              sizes="30vmin"
            />
          </div>
        );
      })}

      {/* Trái tim nhỏ bay nhẹ */}
      {heartPositions.map((pos, i) => (
        <span
          key={i}
          className="gallery-bg-heart absolute text-valentine-rose select-none"
          style={{
            top: pos.top,
            left: pos.left,
            right: pos.right,
            fontSize: "clamp(1rem, 2vmin, 1.5rem)",
            animation: `galleryFloatHeart ${pos.duration}s ease-in-out infinite`,
            animationDelay: `${pos.delay}s`,
            ...(pos.size === "text-2xl" && { fontSize: "clamp(1.1rem, 2.2vmin, 1.6rem)" }),
            ...(pos.size === "text-3xl" && { fontSize: "clamp(1.25rem, 2.5vmin, 1.75rem)" }),
            ...(pos.size === "text-lg" && { fontSize: "clamp(0.9rem, 1.8vmin, 1.25rem)" }),
          }}
          aria-hidden
        >
          ♡
        </span>
      ))}

      {/* Hai bên: trái tim rơi như mưa */}
      <div className="absolute inset-0 left-0 w-[14%] md:w-[12%] overflow-hidden" aria-hidden>
        {fallingHeartsLeft.map((h, i) => (
          <span
            key={`left-${i}`}
            className="gallery-fall-heart absolute top-0 text-valentine-rose select-none"
            style={{
              left: h.left,
              fontSize: "clamp(0.75rem, 1.8vmin, 1.2rem)",
              animation: h.sway ? "galleryFallDownSwayLeft 20s linear infinite" : "galleryFallDown 20s linear infinite",
              animationDuration: `${h.duration}s`,
              animationDelay: `${h.delay}s`,
            }}
          >
            ♡
          </span>
        ))}
      </div>
      <div className="absolute inset-0 right-0 w-[14%] md:w-[12%] overflow-hidden" aria-hidden>
        {fallingHeartsRight.map((h, i) => (
          <span
            key={`right-${i}`}
            className="gallery-fall-heart absolute top-0 text-valentine-rose select-none"
            style={{
              right: h.right,
              left: h.left,
              fontSize: "clamp(0.75rem, 1.8vmin, 1.2rem)",
              animation: h.sway ? "galleryFallDownSwayRight 20s linear infinite" : "galleryFallDown 20s linear infinite",
              animationDuration: `${h.duration}s`,
              animationDelay: `${h.delay}s`,
            }}
          >
            ♡
          </span>
        ))}
      </div>

      {/* Hai bên: ảnh mờ rơi nhẹ như mưa */}
      {fallingImgConfig.slice(0, fallingImages.length).map((cfg, i) => (
        <div
          key={`fall-img-${i}`}
          className="gallery-fall-img absolute top-0 w-[18vmin] h-[24vmin] rounded-xl overflow-hidden opacity-90"
          style={{
            left: cfg.side === "left" ? cfg.left : undefined,
            right: cfg.side === "right" ? cfg.right : undefined,
            animation: "galleryFallImg 28s linear infinite",
            animationDuration: `${cfg.duration}s`,
            animationDelay: `${cfg.delay}s`,
            filter: "blur(12px)",
          }}
          aria-hidden
        >
          <Image
            src={fallingImages[i]}
            alt=""
            fill
            className="object-cover scale-110"
            sizes="20vmin"
          />
        </div>
      ))}

      {/* Lớp texture nhẹ */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <div className="relative z-10">
      <div className="text-center mb-12 md:mb-16 px-4">
        <h2 className="font-serif text-3xl md:text-4xl text-valentine-deep mb-4">
          Gallery kỉ niệm
        </h2>
        <p className="font-sans text-stone-600 max-w-xl mx-auto">
          {gallery.categories.reduce((sum, c) => sum + c.images.length, 0)} khoảnh khắc — {gallery.categories.map((c) => c.name).join(", ")}
        </p>
      </div>

      <nav className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10 px-4">
        {gallery.categories.map((cat) => (
          <a
            key={cat.id}
            href={`#gallery-${cat.id}`}
            className="px-4 py-2 rounded-full bg-valentine-blush/50 text-valentine-deep font-sans text-sm hover:bg-valentine-blush transition-colors"
          >
            {cat.name}
          </a>
        ))}
      </nav>

      {gallery.categories.map((category) => (
        <CategoryBlock
          key={category.id}
          category={category}
          onOpenLightbox={openLightbox}
        />
      ))}

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          currentIndex={lightbox.index}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
      </div>
    </section>
  );
}
