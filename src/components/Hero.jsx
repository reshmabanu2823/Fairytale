import React from 'react';
import { Sparkles, BookOpen, Compass, ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 py-20 overflow-hidden bg-gradient-to-b from-transparent via-[var(--accent-lilac)]/25 to-transparent">
      
      {/* Background Glowing Fairy Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[#ec4899]/20 via-[#c084fc]/20 to-[#fbbf24]/20 rounded-full blur-3xl pointer-events-none animate-glow" />

      {/* Illuminated Glam Crest Badge */}
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[var(--border-pink)] bg-[var(--bg-card)] text-[var(--accent-magenta)] text-xs font-bold tracking-widest uppercase mb-8 shadow-md backdrop-blur-md">
        <Sparkles className="w-4 h-4 text-[var(--accent-gold)]" />
        <span>Welcome to the Royal Fairy Court</span>
        <Sparkles className="w-4 h-4 text-[var(--accent-gold)]" />
      </div>

      {/* Main Glam Title */}
      <h1 className="text-6xl sm:text-7xl md:text-9xl font-black font-display tracking-tight max-w-6xl mb-6 leading-none">
        Tales of <span className="glam-title">Aetheria</span>
      </h1>

      {/* Storybook Subtitle */}
      <p className="font-heading text-xl sm:text-3xl text-[var(--text-muted)] max-w-3xl italic font-semibold mb-10 leading-relaxed">
        "Where forgotten legends wake, and starlit whispers etch eternal lore."
      </p>

      {/* 3D Glossy Storybook Centerpiece Card */}
      <div
        onClick={() => document.getElementById('chapters')?.scrollIntoView({ behavior: 'smooth' })}
        className="relative my-8 cursor-pointer group"
      >
        <div className="glass-card w-80 sm:w-96 h-48 p-6 flex flex-col items-center justify-center text-center border-2 border-[var(--border-pink)] group-hover:scale-105 transition-all duration-500 shadow-[var(--shadow-glow)]">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#e02575] to-[#fbbf24] p-0.5 mb-3 shadow-lg group-hover:rotate-6 transition-transform">
            <div className="w-full h-full bg-[var(--bg-card)] rounded-full flex items-center justify-center text-[var(--accent-magenta)]">
              <BookOpen className="w-7 h-7" />
            </div>
          </div>

          <span className="font-display font-black text-sm tracking-widest text-[var(--text-main)] uppercase">
            The Codex of Eldoria
          </span>
          <span className="font-script text-sm text-[var(--accent-gold)] mt-1">
            Volume I • Sixth Era
          </span>
        </div>
      </div>

      {/* Glossy Pill Action CTA Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-5 mt-8 z-10">
        <a href="#chapters" className="btn-pill-glam">
          <BookOpen className="w-5 h-5" />
          <span>Open Storybook</span>
        </a>
        
        <a href="#archetype-quiz" className="btn-pill-outline">
          <Compass className="w-5 h-5 text-[var(--accent-magenta)]" />
          <span>Discover Your Archetype</span>
        </a>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--text-muted)] hover:text-[var(--accent-magenta)] transition-colors animate-bounce flex flex-col items-center gap-1 text-xs font-bold uppercase tracking-wider"
      >
        <span>Enter the Realm</span>
        <ChevronDown className="w-4 h-4" />
      </a>

    </section>
  );
}
