import React, { useState } from 'react';
import { WISHCRAFT_FORTUNES } from '../data/chaptersData';

export default function WishcraftGenerator() {
  const [fortune, setFortune] = useState(
    "A star falling tonight carries a secret gift meant solely for your hearth."
  );
  const [isCasting, setIsCasting] = useState(false);

  const handleCastWish = () => {
    setIsCasting(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * WISHCRAFT_FORTUNES.length);
      setFortune(WISHCRAFT_FORTUNES[randomIndex]);
      setIsCasting(false);
    }, 600);
  };

  return (
    <section id="wishcraft" className="py-20 px-[5vw] max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="font-accent-italic text-accent-italic text-2xl text-[var(--color-tertiary)] block mb-1">
          Daily Locket Enchantment
        </span>
        <h2 className="font-display-lg text-3xl sm:text-5xl text-[var(--color-primary)] font-bold">
          Wishcraft & Fortune Scroll
        </h2>
        <p className="font-body-md text-sm sm:text-base text-[var(--text-on-surface-variant)] max-w-md mx-auto mt-2 italic">
          Consult the starlight oracle for your daily fairytale wisdom.
        </p>
      </div>

      {/* Torn Edge Fortune Card */}
      <div className="bg-[var(--bg-surface)] p-8 sm:p-12 shadow-lg torn-edge-all border border-[var(--border-outline-variant)]/40 text-center relative">
        <span className="material-symbols-outlined text-4xl text-[var(--color-tertiary)] mb-2 animate-float">
          auto_awesome
        </span>

        <p className="font-label-sm text-xs text-[var(--text-on-surface-variant)] uppercase font-bold tracking-widest mb-4">
          Oracle Scroll of Eldoria
        </p>

        {/* Fortune Display */}
        <div className="my-6 min-h-[90px] flex items-center justify-center">
          <blockquote className={`font-accent-italic text-accent-italic text-2xl sm:text-3xl text-[var(--color-primary)] max-w-xl transition-all duration-500 ${
            isCasting ? 'opacity-20 scale-95 blur-sm' : 'opacity-100 scale-100'
          }`}>
            "{fortune}"
          </blockquote>
        </div>

        {/* Action Button */}
        <button
          onClick={handleCastWish}
          disabled={isCasting}
          className="bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)] px-6 py-2.5 rounded-full font-label-sm text-xs hover:bg-[var(--color-secondary-container)]/80 transition-colors flex items-center justify-center gap-2 mx-auto shadow-xs"
        >
          <span className={`material-symbols-outlined text-base ${isCasting ? 'animate-spin' : ''}`}>
            auto_fix_high
          </span>
          <span>{isCasting ? 'Consulting Oracle...' : 'Unroll New Fortune'}</span>
        </button>
      </div>
    </section>
  );
}
