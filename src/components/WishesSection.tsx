"use client";

import { valentineConfig } from "@/data/memories";
import TimeCounter from "./TimeCounter";

function FloatingHearts() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {[...Array(6)].map((_, i) => (
        <span
          key={i}
          className="absolute text-valentine-rose/30 text-2xl md:text-3xl"
          style={{
            left: `${15 + i * 16}%`,
            bottom: "-2rem",
            animation: `floatHeart ${12 + i * 2}s linear infinite`,
            animationDelay: `${i * 2.5}s`,
          }}
        >
          ♡
        </span>
      ))}
    </div>
  );
}

export default function WishesSection() {
  const { wishes, closing, togetherSince, signOff } = valentineConfig;

  return (
    <section id="wishes" className="section relative bg-gradient-to-b from-valentine-blush/30 to-valentine-cream overflow-hidden">
      <FloatingHearts />
      <div className="relative z-10 w-full max-w-2xl mx-auto text-center px-4">
        <h2 className="font-serif text-3xl md:text-4xl text-valentine-deep mb-8">
          Lời chúc Valentine
        </h2>

        <div className="space-y-6 mb-12">
          {wishes.map((paragraph, i) => (
            <p key={i} className="font-serif text-lg md:text-xl text-stone-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <p className="font-serif text-xl text-valentine-deep italic mb-6">
          {closing}
        </p>

        {signOff && (
          <p className="font-serif text-lg text-valentine-deep/90 mb-10">
            {signOff}
          </p>
        )}

        <div className="border-t border-valentine-rose/20 pt-8">
          <p className="font-sans text-stone-500 text-sm mb-4">Chúng ta đã bên nhau</p>
          <TimeCounter togetherSince={togetherSince} />
        </div>
      </div>
    </section>
  );
}
