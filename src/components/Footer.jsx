import React, { useState } from 'react';
import { Send, Sparkles, Heart, Feather, BookOpen, Bookmark } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-[var(--bg-card)] border-t-2 border-[var(--manuscript-border)] pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Footer Closing Book Page Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        
        {/* Calligraphy "Finis" Flourish */}
        <div className="wax-seal w-16 h-16 mx-auto mb-4 text-2xl">
          ★
        </div>

        <h2 className="font-title text-4xl sm:text-5xl font-bold tracking-wider text-[var(--text-main)] mb-2">
          Finis
        </h2>

        <p className="font-script text-2xl text-[var(--accent-gold)]">
          May Your Journey Be Guided By Starlight
        </p>

        <div className="flourish-divider max-w-sm mx-auto my-6">
          <span>✦ 📜 ✦</span>
        </div>

        <p className="font-serif text-sm text-[var(--text-muted)] italic max-w-md mx-auto">
          "The end of a story is merely the beginning of another dream."
        </p>

      </div>

      {/* Owl Post Newsletter Parchment Form */}
      <div className="max-w-xl mx-auto manuscript-frame p-8 mb-16 bg-[var(--bg-secondary)] text-center">
        
        <div className="corner-flourish corner-tl" />
        <div className="corner-flourish corner-tr" />
        <div className="corner-flourish corner-bl" />
        <div className="corner-flourish corner-br" />

        <Feather className="w-8 h-8 text-[var(--accent-gold)] mx-auto mb-3" />
        
        <h3 className="font-heading text-xl font-bold text-[var(--text-main)] mb-1">
          Subscribe to the Owl Post
        </h3>
        
        <p className="font-serif text-xs text-[var(--text-muted)] mb-6">
          Receive newly illuminated chapters directly delivered by royal owl.
        </p>

        {!isSubscribed ? (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              required
              placeholder="Enter your scroll address (email)..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full border border-[var(--border-gold)] bg-[var(--bg-card)] text-[var(--text-main)] placeholder-[var(--text-muted)] font-serif text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)]"
            />
            <button type="submit" className="btn-fairytale whitespace-nowrap py-2.5 px-6">
              <Send className="w-4 h-4" />
              <span>Send Post</span>
            </button>
          </form>
        ) : (
          <div className="p-3 rounded-lg bg-[var(--accent-gold-light)] text-[var(--accent-purple)] font-serif text-sm font-bold flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--accent-gold)]" />
            <span>Your scroll address has been recorded by the Royal Owls!</span>
          </div>
        )}

      </div>

      {/* Leather Ribbon Social Links & Copyright */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Quiet Social Links */}
        <div className="flex items-center gap-6 font-subheading text-xs text-[var(--text-muted)]">
          <a href="#" className="hover:text-[var(--accent-gold)] transition-colors flex items-center gap-1">
            <Bookmark className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            <span>The Scroll Codex</span>
          </a>
          <a href="#" className="hover:text-[var(--accent-gold)] transition-colors flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            <span>Guild Library</span>
          </a>
          <a href="#" className="hover:text-[var(--accent-gold)] transition-colors flex items-center gap-1">
            <Feather className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            <span>Scribe Registry</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="font-serif text-xs text-[var(--text-muted)] flex items-center gap-1">
          <span>© {new Date().getFullYear()} Aetheria • Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-[var(--accent-rose)] fill-current inline" />
          <span>for Dreamers</span>
        </div>

      </div>

    </footer>
  );
}
