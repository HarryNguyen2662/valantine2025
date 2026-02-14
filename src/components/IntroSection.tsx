"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { valentineConfig } from "@/data/memories";
import { gallery } from "@/data/gallery";

// Lấy vài ảnh từ gallery làm nền preview (mỗi category 1 ảnh)
const INTRO_BG_IMAGES = (() => {
  const out: string[] = [];
  for (const cat of gallery.categories) {
    if (cat.images[0]) out.push(cat.images[0]);
  }
  return out.slice(0, 6);
})();

export default function IntroSection() {
  const [step, setStep] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  const lines = valentineConfig.introLines ?? [];
  const totalSteps = lines.length + 1; // +1 cho màn "Chạm để bắt đầu"
  const isDone = step >= totalSteps;

  // Chuyển ảnh nền mỗi 4s
  useEffect(() => {
    if (INTRO_BG_IMAGES.length <= 1) return;
    const t = setInterval(() => {
      setBgIndex((i) => (i + 1) % INTRO_BG_IMAGES.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTap = () => {
    if (isDone) return;
    setStep((s) => s + 1);
  };

  return (
    <section
      id="intro"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-stone-900"
      onClick={handleTap}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleTap()}
      role="button"
      tabIndex={0}
      aria-label="Chạm để xem tiếp"
    >
      {/* Background: ảnh preview hai bạn, blur + overlay */}
      <div className="absolute inset-0">
        {INTRO_BG_IMAGES.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              opacity: mounted && i === bgIndex ? 1 : 0,
            }}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover scale-105"
              sizes="100vw"
              priority
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/85"
              aria-hidden
            />
          </div>
        ))}
      </div>

      {/* Nội dung tương tác */}
      <div className="relative z-10 text-center px-6 max-w-xl mx-auto">
        {step === 0 && (
          <p
            className="font-sans text-white/90 text-sm md:text-base tracking-widest uppercase animate-pulse"
            style={{ opacity: mounted ? 1 : 0 }}
          >
            Chạm để bắt đầu
          </p>
        )}

        {step >= 1 && step <= lines.length && (
          <div className="space-y-4">
            {lines.slice(0, step).map((line, i) => (
              <p
                key={i}
                className="font-serif text-white text-lg md:text-xl lg:text-2xl leading-relaxed"
                style={{
                  animation: "fadeIn 0.6s ease-out forwards",
                }}
              >
                {line}
              </p>
            ))}
          </div>
        )}

        {isDone && (
          <div className="animate-fade-in">
            <p className="font-serif text-valentine-blush/90 text-xl mb-8">
              {valentineConfig.coupleNames}
            </p>
            <a
              href="#gallery"
              className="inline-block px-8 py-3 rounded-full bg-white/15 border-2 border-white/50 text-white font-sans text-sm tracking-widest uppercase hover:bg-white/25 hover:border-white transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              Xem kỉ niệm
            </a>
          </div>
        )}
      </div>

      {/* Gợi ý chạm (trừ khi đã xong) */}
      {!isDone && step > 0 && (
        <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-wider">
          Chạm để xem tiếp
        </p>
      )}
    </section>
  );
}
