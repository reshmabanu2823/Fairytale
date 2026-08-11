import React from 'react';
import { Moon, Sun, Volume2, VolumeX, Bookmark, Sparkles } from 'lucide-react';
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
    <header className="sticky top-0 z-40 backdrop-blur-xl border-b border-[var(--border-pink)] bg-[var(--bg-glass)] shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        
        {/* Logo emblem */}
        <a href="#" className="flex items-center gap-3 group text-decoration-none">
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#e02575] via-[#ec4899] to-[#fbbf24] p-0.5 shadow-md group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[var(--bg-card)] rounded-full flex items-center justify-center font-display font-black text-sm text-[var(--accent-magenta)]">
              AE
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl sm:text-2xl font-black tracking-wide glam-title">
              AETHERIA
            </span>
            <span className="font-script text-xs text-[var(--accent-gold)] -mt-1 tracking-widest">
              Glam Fairycore Chronicles
            </span>
          </div>
        </a>

        {/* Spaced Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 font-body text-sm font-semibold">
          <a
            href="#about"
            className="px-4 py-2 rounded-full text-[var(--text-main)] hover:text-[var(--accent-magenta)] hover:bg-[var(--accent-lilac)]/60 transition-all"
          >
            The Legend
          </a>
          <a
            href="#chapters"
            className="px-4 py-2 rounded-full text-[var(--text-main)] hover:text-[var(--accent-magenta)] hover:bg-[var(--accent-lilac)]/60 transition-all"
          >
            Storybook Tales
          </a>
          <a
            href="#realm-map"
            className="px-4 py-2 rounded-full text-[var(--text-main)] hover:text-[var(--accent-magenta)] hover:bg-[var(--accent-lilac)]/60 transition-all"
          >
            Realm Cartography
          </a>
          <a
            href="#archetype-quiz"
            className="px-4 py-2 rounded-full text-[var(--text-main)] hover:text-[var(--accent-magenta)] hover:bg-[var(--accent-lilac)]/60 transition-all"
          >
            Calling Quiz
          </a>
          <a
            href="#wishcraft"
            className="px-4 py-2 rounded-full text-[var(--text-main)] hover:text-[var(--accent-magenta)] hover:bg-[var(--accent-lilac)]/60 transition-all"
          >
            Wishcraft
          </a>
        </nav>

        {/* Glossy Pill Action Buttons */}
        <div className="flex items-center gap-3">
          
          {/* Audio Chimes Button */}
          <button
            onClick={handleAudioToggle}
            className={`btn-pill-outline text-xs px-4 py-2 gap-2 font-bold ${
              isAudioOn
                ? 'bg-gradient-to-r from-[#e02575] to-[#ec4899] text-white border-transparent shadow-[var(--shadow-pill)]'
                : ''
            }`}
            title={isAudioOn ? 'Mute Chimes' : 'Play Fairy Chimes'}
          >
            {isAudioOn ? <Volume2 className="w-4 h-4 animate-bounce" /> : <VolumeX className="w-4 h-4 text-[var(--accent-magenta)]" />}
            <span className="hidden sm:inline">
              {isAudioOn ? 'Chimes On' : 'Fairy Music'}
            </span>
          </button>

          {/* Bookmarks Toggle Pill */}
          {bookmarkCount > 0 && (
            <button
              onClick={onOpenBookmarks}
              className="btn-icon-pill relative"
              title="View Bookmarks"
            >
              <Bookmark className="w-4 h-4 fill-current" />
              <span className="absolute -top-1 -right-1 bg-[#e02575] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-md border-2 border-[var(--bg-primary)]">
                {bookmarkCount}
              </span>
            </button>
          )}

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="btn-icon-pill"
            title={theme === 'daylight' ? 'Switch to Midnight Court' : 'Switch to Daylight Glam'}
          >
            {theme === 'daylight' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

        </div>

      </div>
    </header>
  );
}
