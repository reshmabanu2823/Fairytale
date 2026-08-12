import React, { useState } from 'react';
import { Send, Feather, Heart, BookOpen, Bookmark } from 'lucide-react';

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
    <footer className="relative bg-[var(--bg-card)] border-t border-[var(--border-sepia)] pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Closing Book Page Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        
        {/* Wax Seal Badge */}
        <div className="wax-seal-badge w-16 h-16 mx-auto mb-4 text-2xl">
          ★
        </div>

        <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-wider text-[var(--text-main)] mb-2">
          Finis
        </h2>

        <p className="caption-script text-2xl sm:text-3xl text-[var(--accent-gold-dark)]">
          May Your Journey Be Guided By Starlight
        </p>

        <div className="flourish-divider max-w-sm mx-auto my-6">
          <span>✦ 📜 ✦</span>
        </div>

        <p className="font-body text-sm text-[var(--text-muted)] italic max-w-md mx-auto">
          "The end of a story is merely the beginning of another dream."
        </p>

      </div>

      {/* Owl Post Newsletter Newsprint Card */}
      <div className="max-w-xl mx-auto newsprint-card torn-paper p-8 mb-16 text-center border border-[var(--border-sepia)]">
        
        <Feather className="w-8 h-8 text-[var(--accent-gold-dark)] mx-auto mb-3" />
        
        <h3 className="font-display text-2xl font-bold text-[var(--text-main)] mb-1 uppercase">
          Subscribe to the Owl Post
        </h3>
        
        <p className="font-body text-xs text-[var(--text-muted)] mb-6 font-medium">
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
              className="w-full px-4 py-2.5 rounded border border-[var(--border-sepia)] bg-[var(--bg-card)] text-[var(--text-main)] placeholder-[var(--text-muted)] font-body text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent-gold-dark)]"
            />
            <button type="submit" className="btn-minimal-fill whitespace-nowrap py-2.5 px-6 font-medium uppercase text-xs tracking-wider">
              <Send className="w-4 h-4" />
              <span>Send Post</span>
            </button>
          </form>
        ) : (
          <div className="p-3.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-sepia)] text-[var(--text-main)] font-body text-xs font-bold flex items-center justify-center gap-2">
            <span>Your scroll address has been recorded by the Royal Owls!</span>
          </div>
        )}

      </div>

      {/* Social Links & Copyright */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-[var(--border-sepia)] flex flex-col sm:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-6 font-body text-xs font-medium text-[var(--text-muted)]">
          <a href="#" className="hover:text-[var(--text-main)] transition-colors flex items-center gap-1.5">
            <Bookmark className="w-4 h-4 text-[var(--accent-gold-dark)]" />
            <span>The Scroll Codex</span>
          </a>
          <a href="#" className="hover:text-[var(--text-main)] transition-colors flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-[var(--accent-gold-dark)]" />
            <span>Guild Library</span>
          </a>
          <a href="#" className="hover:text-[var(--text-main)] transition-colors flex items-center gap-1.5">
            <Feather className="w-4 h-4 text-[var(--accent-gold-dark)]" />
            <span>Scribe Registry</span>
          </a>
        </div>

        <div className="font-body text-xs text-[var(--text-muted)] font-medium flex items-center gap-1">
          <span>© {new Date().getFullYear()} Aetheria • Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-[var(--text-script)] fill-current inline" />
          <span>for Dreamers</span>
        </div>

      </div>

    </footer>
  );
}
