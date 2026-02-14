"use client";

import { useEffect, useState } from "react";

interface Count {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function computeDiff(togetherSince: string): Count {
  const start = new Date(togetherSince).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - start);

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function TimeCounter({ togetherSince }: { togetherSince: string }) {
  // Khởi tạo bằng 0 để server và client render giống nhau, tránh hydration error
  const [count, setCount] = useState<Count>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setCount(computeDiff(togetherSince));
    const t = setInterval(() => setCount(computeDiff(togetherSince)), 1000);
    return () => clearInterval(t);
  }, [togetherSince]);

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      {[
        { value: count.days, label: "Ngày" },
        { value: count.hours, label: "Giờ" },
        { value: count.minutes, label: "Phút" },
        { value: count.seconds, label: "Giây" },
      ].map(({ value, label }) => (
        <div key={label} className="text-center">
          <div className="font-serif text-2xl md:text-3xl text-valentine-deep tabular-nums">
            {pad(value)}
          </div>
          <div className="font-sans text-xs md:text-sm text-stone-500 uppercase tracking-wider">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
