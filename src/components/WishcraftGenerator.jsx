import React, { useState } from 'react';
import { WISHCRAFT_FORTUNES } from '../data/chaptersData';
import { Wand2, Scroll } from 'lucide-react';

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
    <section id="wishcraft" className="py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center mb-14">
        <span className="font-script text-3xl text-[var(--accent-gold)]">Daily Enchantment</span>
        <h2 className="text-4xl sm:text-6xl font-black font-display mt-1 text-[var(--text-main)]">
          Wishcraft & Fortune Scroll
        </h2>
        <p className="font-body text-base sm:text-lg text-[var(--text-muted)] max-w-md mx-auto mt-2 italic">
          Consult the starlight oracle for your daily fairytale wisdom.
        </p>
        <div className="flourish-divider max-w-xs mx-auto">
          <span>✦ 🪄 ✦</span>
        </div>
      </div>

      {/* Glassmorphic Fortune Scroll Card */}
      <div className="glass-card p-8 sm:p-12 border-2 border-[var(--border-pink)] text-center shadow-2xl relative">
        
        <Scroll className="w-12 h-12 text-[var(--accent-magenta)] mx-auto mb-4 animate-float" />

        <span className="font-display text-xs uppercase tracking-widest text-[var(--accent-magenta)] font-bold">
          Oracle Scroll of Eldoria
        </span>

        {/* Fortune Display */}
        <div className="my-8 min-h-[110px] flex items-center justify-center">
          <blockquote className={`font-heading italic text-xl sm:text-2xl text-[var(--text-main)] max-w-xl transition-all duration-500 font-semibold ${
            isCasting ? 'opacity-20 scale-95 blur-sm' : 'opacity-100 scale-100'
          }`}>
            "{fortune}"
          </blockquote>
        </div>

        {/* Cast Button Pill */}
        <button
          onClick={handleCastWish}
          disabled={isCasting}
          className="btn-pill-glam mx-auto"
        >
          <Wand2 className={`w-4 h-4 ${isCasting ? 'animate-spin' : ''}`} />
          <span>{isCasting ? 'Consulting Stars...' : 'Unroll New Fortune'}</span>
        </button>

      </div>

    </section>
  );
}
