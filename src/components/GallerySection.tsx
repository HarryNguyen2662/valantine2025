"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { gallery } from "@/data/gallery";
import Lightbox from "./Lightbox";

function CategoryBlock({
  category,
  onOpenLightbox,
}: {
  category: (typeof gallery.categories)[0];
  onOpenLightbox: (images: string[], index: number) => void;
}) {
  return (
    <section
      id={`gallery-${category.id}`}
      className="scroll-mt-24 w-full max-w-6xl mx-auto px-4 py-12 md:py-16"
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
            className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-valentine-rose rounded-lg"
            onClick={() => onOpenLightbox(category.images, index)}
          >
            <div className="relative bg-white p-2 pb-8 shadow-md hover:shadow-xl transition-all duration-300 rotate-0 group-hover:rotate-1">
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

  return (
    <section id="gallery" className="min-h-screen w-full py-16 md:py-24 bg-valentine-cream">
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
    </section>
  );
}
