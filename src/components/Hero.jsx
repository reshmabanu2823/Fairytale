import React from 'react';
import { Sparkles, BookOpen, Scroll, ChevronDown, Compass } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-16 overflow-hidden">
      
      {/* Background Decorative Ethereal Glowing Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[var(--accent-gold)]/10 rounded-full blur-3xl pointer-events-none animate-glow" />
      
      {/* Illuminated Header Crest */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-gold)] bg-[var(--bg-card)]/80 text-[var(--accent-gold)] text-xs font-serif tracking-widest uppercase mb-6 shadow-sm">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Welcome to the Whispering Realm</span>
        <Sparkles className="w-3.5 h-3.5" />
      </div>

      {/* Main Ornate Fairytale Title */}
      <h1 className="text-5xl sm:text-7xl md:text-8xl font-black font-title tracking-tight max-w-5xl mb-6 text-[var(--text-main)] leading-none">
        Tales of <span className="gold-shimmer block sm:inline">Aetheria</span>
      </h1>

      {/* Storybook Subtitle / Tagline */}
      <p className="font-subheading text-lg sm:text-2xl text-[var(--text-muted)] max-w-2xl italic font-normal mb-8 leading-relaxed">
        "Where forgotten legends wake, and starlit whispers etch eternal lore."
      </p>

      {/* Interactive Storybook Book Illustration Centerpiece */}
      <div className="relative my-8 group cursor-pointer" onClick={() => document.getElementById('chapters')?.scrollIntoView({ behavior: 'smooth' })}>
        <div className="manuscript-frame w-72 sm:w-80 h-44 bg-[var(--bg-card)] flex flex-col items-center justify-center p-6 border-2 border-[var(--manuscript-border)] shadow-[var(--shadow-glow)] group-hover:scale-105 transition-transform duration-500">
          
          {/* Illuminated manuscript corner flourishes */}
          <div className="corner-flourish corner-tl" />
          <div className="corner-flourish corner-tr" />
          <div className="corner-flourish corner-bl" />
          <div className="corner-flourish corner-br" />

          <BookOpen className="w-12 h-12 text-[var(--accent-gold)] mb-3 animate-float" />
          
          <span className="font-title text-sm tracking-widest text-[var(--text-main)] uppercase">
            The Codex of Eldoria
          </span>
          <span className="font-script text-xs text-[var(--accent-gold)] mt-1">
            Volume I • Sixth Era
          </span>
        </div>
      </div>

      {/* Action CTA Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-6 z-10">
        <a href="#chapters" className="btn-fairytale">
          <BookOpen className="w-4 h-4" />
          <span>Open Storybook</span>
        </a>
        
        <a href="#archetype-quiz" className="btn-fairytale-outline">
          <Compass className="w-4 h-4 text-[var(--accent-gold)]" />
          <span>Discover Your Archetype</span>
        </a>
      </div>

      {/* Scroll Down Indicator */}
      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-colors animate-bounce flex flex-col items-center gap-1 text-xs font-serif">
        <span>Scroll to enter</span>
        <ChevronDown className="w-4 h-4" />
      </a>

    </section>
  );
}
