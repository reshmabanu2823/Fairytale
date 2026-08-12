import React from 'react';
import { Moon, Sun, Volume2, VolumeX, Bookmark, Feather } from 'lucide-react';
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
    <header className="sticky top-0 z-40 backdrop-blur-md border-b border-[var(--border-sepia)] bg-[var(--bg-overlay)] shadow-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        
        {/* Vintage Wax Seal Logo Emblem */}
        <a href="#" className="flex items-center gap-3 group text-decoration-none">
          <div className="wax-seal-badge group-hover:scale-105 transition-transform">
            <span>AE</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl sm:text-2xl font-black tracking-wider text-[var(--text-main)] group-hover:text-[var(--accent-gold-dark)] transition-colors">
              AETHERIA
            </span>
            <span className="caption-script text-sm text-[var(--accent-gold-dark)] -mt-1">
              botanical journal & lore
            </span>
          </div>
        </a>

        {/* Minimal Understated Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 font-body text-sm font-medium">
          <a
            href="#about"
            className="text-[var(--text-main)] hover:text-[var(--accent-gold-dark)] transition-colors relative py-1"
          >
            <span>The Legend</span>
          </a>
          <a
            href="#chapters"
            className="text-[var(--text-main)] hover:text-[var(--accent-gold-dark)] transition-colors relative py-1"
          >
            <span>Storybook Tales</span>
          </a>
          <a
            href="#realm-map"
            className="text-[var(--text-main)] hover:text-[var(--accent-gold-dark)] transition-colors relative py-1"
          >
            <span>Cartography</span>
          </a>
          <a
            href="#archetype-quiz"
            className="text-[var(--text-main)] hover:text-[var(--accent-gold-dark)] transition-colors relative py-1"
          >
            <span>Calling Quiz</span>
          </a>
          <a
            href="#wishcraft"
            className="text-[var(--text-main)] hover:text-[var(--accent-gold-dark)] transition-colors relative py-1"
          >
            <span>Wishcraft</span>
          </a>
        </nav>

        {/* Minimal Understated Action Buttons */}
        <div className="flex items-center gap-3">
          
          {/* Audio Chimes Button */}
          <button
            onClick={handleAudioToggle}
            className={`btn-minimal-icon ${
              isAudioOn ? 'bg-[var(--accent-sage)] text-white border-transparent' : ''
            }`}
            title={isAudioOn ? 'Mute Chimes' : 'Play Fairy Chimes'}
          >
            {isAudioOn ? <Volume2 className="w-4 h-4 animate-bounce" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline font-body text-xs">
              {isAudioOn ? 'Chimes On' : 'Chimes'}
            </span>
          </button>

          {/* Bookmarks Toggle Pill */}
          {bookmarkCount > 0 && (
            <button
              onClick={onOpenBookmarks}
              className="btn-minimal-icon relative"
              title="View Bookmarks"
            >
              <Bookmark className="w-4 h-4 fill-current text-[var(--accent-blush)]" />
              <span className="bg-[var(--accent-sepia)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {bookmarkCount}
              </span>
            </button>
          )}

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="btn-minimal-icon"
            title={theme === 'daylight' ? 'Switch to Midnight Sanctuary' : 'Switch to Botanical Parchment'}
          >
            {theme === 'daylight' ? <Moon className="w-4 h-4 text-[var(--accent-sepia)]" /> : <Sun className="w-4 h-4 text-[var(--accent-gold)]" />}
          </button>

        </div>

      </div>
    </header>
  );
}
