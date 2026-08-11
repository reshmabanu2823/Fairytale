import React, { useState } from 'react';
import { WISHCRAFT_FORTUNES } from '../data/chaptersData';
import { Wand2, Sparkles, Scroll, RefreshCw } from 'lucide-react';

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
    <section id="wishcraft" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="font-script text-3xl text-[var(--accent-gold)]">Daily Enchantment</span>
        <h2 className="text-4xl sm:text-6xl font-bold font-title mt-1 text-[var(--text-main)]">
          Wishcraft & Fortune Scroll
        </h2>
        <p className="font-subheading text-lg text-[var(--text-muted)] max-w-md mx-auto mt-2 italic">
          Consult the starlight oracle for your daily fairytale wisdom.
        </p>
        <div className="flourish-divider max-w-xs mx-auto">
          <span>✦ 🪄 ✦</span>
        </div>
      </div>

      {/* Wishcraft Scroll Card */}
      <div className="manuscript-frame bg-[var(--bg-card)] p-8 sm:p-12 border-2 border-[var(--manuscript-border)] text-center shadow-[var(--shadow-glow)] relative">
        
        {/* Corner flourishes */}
        <div className="corner-flourish corner-tl" />
        <div className="corner-flourish corner-tr" />
        <div className="corner-flourish corner-bl" />
        <div className="corner-flourish corner-br" />

        <Scroll className="w-12 h-12 text-[var(--accent-gold)] mx-auto mb-4 animate-float" />

        <span className="font-title text-xs uppercase tracking-widest text-[var(--accent-purple)] font-bold">
          Oracle Scroll of Eldoria
        </span>

        {/* Fortune Display */}
        <div className="my-8 min-h-[100px] flex items-center justify-center">
          <blockquote className={`font-subheading italic text-xl sm:text-2xl text-[var(--text-main)] max-w-xl transition-all duration-500 ${
            isCasting ? 'opacity-20 scale-95 blur-sm' : 'opacity-100 scale-100'
          }`}>
            "{fortune}"
          </blockquote>
        </div>

        {/* Cast Button */}
        <button
          onClick={handleCastWish}
          disabled={isCasting}
          className="btn-fairytale mx-auto"
        >
          <Wand2 className={`w-4 h-4 ${isCasting ? 'animate-spin' : ''}`} />
          <span>{isCasting ? 'Consulting Stars...' : 'Unroll New Fortune'}</span>
        </button>

      </div>

    </section>
  );
}
