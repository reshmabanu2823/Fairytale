import React from 'react';
import { toggleAmbientAudio } from '../utils/audioSynth';

export default function Navbar({ theme, setTheme, isAudioOn, setIsAudioOn, bookmarkCount, onOpenBookmarks }) {
  const handleAudioToggle = () => {
    toggleAmbientAudio((playing) => setIsAudioOn(playing));
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'daylight' ? 'night' : 'daylight';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme === 'night' ? 'night' : 'daylight');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[var(--bg-surface-container)]/80 backdrop-blur-md border-b border-[var(--border-outline-variant)]/30 shadow-sm flex justify-between items-center px-[5vw] py-4">
      {/* Brand Title */}
      <a href="#" className="flex items-center gap-2 group">
        <span className="font-display-lg text-3xl md:text-4xl text-[var(--color-primary)] drop-shadow-sm group-hover:text-[var(--color-tertiary)] transition-colors">
          Aetheria
        </span>
        <span className="font-accent-italic text-sm text-[var(--color-tertiary)] hidden sm:inline">
          Ephemera Folio
        </span>
      </a>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-6">
        <a href="#about" className="text-[var(--text-on-surface-variant)] font-label-sm text-xs hover:text-[var(--color-tertiary)] transition-colors duration-300">
          Grimoire
        </a>
        <a href="#chapters" className="text-[var(--color-primary)] font-bold border-b-2 border-[var(--color-primary)] pb-0.5 font-label-sm text-xs hover:text-[var(--color-tertiary)] transition-colors duration-300">
          Flora & Tales
        </a>
        <a href="#realm-map" className="text-[var(--text-on-surface-variant)] font-label-sm text-xs hover:text-[var(--color-tertiary)] transition-colors duration-300">
          Cartography
        </a>
        <a href="#archetype-quiz" className="text-[var(--text-on-surface-variant)] font-label-sm text-xs hover:text-[var(--color-tertiary)] transition-colors duration-300">
          Folklore Quiz
        </a>
        <a href="#wishcraft" className="text-[var(--text-on-surface-variant)] font-label-sm text-xs hover:text-[var(--color-tertiary)] transition-colors duration-300">
          Locket Oracle
        </a>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-3">
        
        {/* Ambient Soundscape Toggle */}
        <button
          onClick={handleAudioToggle}
          className={`px-3 py-1.5 rounded-full font-label-sm text-[11px] border border-[var(--border-outline-variant)] transition-all flex items-center gap-1.5 ${
            isAudioOn
              ? 'bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)] font-bold'
              : 'text-[var(--text-on-surface-variant)] hover:text-[var(--color-primary)]'
          }`}
          title={isAudioOn ? 'Mute Chimes' : 'Play Fairy Chimes'}
        >
          <span className="material-symbols-outlined text-sm">
            {isAudioOn ? 'volume_up' : 'volume_off'}
          </span>
          <span className="hidden sm:inline">
            {isAudioOn ? 'Chimes On' : 'Chimes'}
          </span>
        </button>

        {/* Bookmarks Toggle */}
        {bookmarkCount > 0 && (
          <button
            onClick={onOpenBookmarks}
            className="relative px-3 py-1.5 rounded-full bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] font-label-sm text-[11px] flex items-center gap-1 hover:opacity-90"
            title="View Bookmarked Tales"
          >
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
              bookmark
            </span>
            <span>{bookmarkCount}</span>
          </button>
        )}

        {/* Open Journal Button */}
        <a
          href="#chapters"
          className="bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)] px-4 py-2 rounded-full font-label-sm text-xs hover:bg-[var(--color-secondary-container)]/80 transition-colors hidden md:flex items-center gap-2 shadow-xs"
        >
          <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
            book_2
          </span>
          <span>Open Journal</span>
        </a>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-[var(--color-primary)] hover:text-[var(--color-tertiary)] transition-colors"
          title={theme === 'daylight' ? 'Switch to Midnight Sanctuary' : 'Switch to Botanical Folio'}
        >
          <span className="material-symbols-outlined text-xl">
            {theme === 'daylight' ? 'dark_mode' : 'light_mode'}
          </span>
        </button>

      </div>
    </nav>
  );
}
