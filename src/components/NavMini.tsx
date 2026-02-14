"use client";

export default function NavMini() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center gap-6 py-4 bg-stone-900/60 backdrop-blur-sm">
      <a
        href="#intro"
        className="font-sans text-xs uppercase tracking-widest text-valentine-blush/80 hover:text-white transition-colors"
      >
        Intro
      </a>
      <a
        href="#gallery"
        className="font-sans text-xs uppercase tracking-widest text-valentine-blush/80 hover:text-white transition-colors"
      >
        Gallery
      </a>
      <a
        href="#wishes"
        className="font-sans text-xs uppercase tracking-widest text-valentine-blush/80 hover:text-white transition-colors"
      >
        Lời chúc
      </a>
    </nav>
  );
}
