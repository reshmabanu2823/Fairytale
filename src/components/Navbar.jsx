import React from 'react';
import { BookOpen, Moon, Sun, Volume2, VolumeX, Sparkles, Bookmark } from 'lucide-react';
import { toggleAmbientAudio } from '../utils/audioSynth';

export default function Navbar({ theme, setTheme, isAudioOn, setIsAudioOn, bookmarkCount, onOpenBookmarks }) {
  const handleAudioToggle = () => {
    const newState = toggleAmbientAudio((playing) => setIsAudioOn(playing));
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'daylight' ? 'night' : 'daylight';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme === 'night' ? 'night' : 'daylight');
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md border-b border-[var(--border-gold)] transition-colors duration-300 bg-[var(--bg-card)]/85 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo with Wax Seal */}
        <a href="#" className="flex items-center gap-3 group text-decoration-none">
          <div className="wax-seal text-xs font-bold font-serif shadow-md group-hover:scale-105 transition-transform">
            <span>AE</span>
          </div>
          <div className="flex flex-col">
            <span className="font-title text-xl sm:text-2xl font-bold tracking-wider text-[var(--text-main)] group-hover:text-[var(--accent-gold)] transition-colors">
              AETHERIA
            </span>
            <span className="font-script text-sm text-[var(--accent-gold)] -mt-1 tracking-widest">
              Tales of the Whispering Realm
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-subheading text-sm font-semibold">
          <a href="#about" className="text-[var(--text-main)] hover:text-[var(--accent-gold)] transition-colors">
            The Legend
          </a>
          <a href="#chapters" className="text-[var(--text-main)] hover:text-[var(--accent-gold)] transition-colors">
            Storybook Tales
          </a>
          <a href="#realm-map" className="text-[var(--text-main)] hover:text-[var(--accent-gold)] transition-colors">
            Realm Cartography
          </a>
          <a href="#archetype-quiz" className="text-[var(--text-main)] hover:text-[var(--accent-gold)] transition-colors">
            Calling Quiz
          </a>
          <a href="#wishcraft" className="text-[var(--text-main)] hover:text-[var(--accent-gold)] transition-colors">
            Wishcraft
          </a>
        </nav>

        {/* Interactive Action Controls */}
        <div className="flex items-center gap-3">
          
          {/* Ambient Music Soundscape Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`p-2.5 rounded-full border border-[var(--border-gold)] transition-all flex items-center gap-2 text-xs font-serif ${
              isAudioOn
                ? 'bg-[var(--accent-gold)] text-black shadow-[var(--shadow-glow)]'
                : 'bg-transparent text-[var(--text-muted)] hover:text-[var(--accent-gold)]'
            }`}
            title={isAudioOn ? 'Mute Fantasy Soundscape' : 'Play Ambient Fantasy Harmonies'}
          >
            {isAudioOn ? <Volume2 className="w-4 h-4 animate-bounce" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline font-subheading font-medium">
              {isAudioOn ? 'Chimes On' : 'Music'}
            </span>
          </button>

          {/* Bookmarks Toggle Button */}
          {bookmarkCount > 0 && (
            <button
              onClick={onOpenBookmarks}
              className="relative p-2.5 rounded-full border border-[var(--border-gold)] bg-[var(--accent-gold-light)] text-[var(--accent-purple)] hover:scale-105 transition-transform"
              title="View Bookmarked Tales"
            >
              <Bookmark className="w-4 h-4 fill-current" />
              <span className="absolute -top-1 -right-1 bg-[var(--accent-rose)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {bookmarkCount}
              </span>
            </button>
          )}

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-[var(--border-gold)] text-[var(--accent-gold)] hover:bg-[var(--accent-gold-light)] transition-all"
            title={theme === 'daylight' ? 'Switch to Starlight Night' : 'Switch to Daylight Parchment'}
          >
            {theme === 'daylight' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

        </div>

      </div>
    </header>
  );
}
