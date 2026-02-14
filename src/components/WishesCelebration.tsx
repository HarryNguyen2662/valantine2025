"use client";

import { useEffect, useState } from "react";

export default function WishesCelebration() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = document.getElementById("wishes");
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setShow(true);
        }
      },
      { threshold: 0.2 }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  if (!show) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
      aria-hidden
    >
      {[...Array(24)].map((_, i) => (
        <span
          key={i}
          className="absolute text-valentine-rose text-2xl opacity-80 animate-celebrate-heart"
          style={{
            left: `${(i * 4) % 100}%`,
            top: "-2rem",
            animationDelay: `${i * 0.08}s`,
            animationDuration: "2.5s",
          }}
        >
          ♡
        </span>
      ))}
    </div>
  );
}
