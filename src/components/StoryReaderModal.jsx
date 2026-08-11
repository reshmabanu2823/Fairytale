import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Bookmark, Volume2, VolumeX, Feather } from 'lucide-react';

export default function StoryReaderModal({ chapter, onClose, isBookmarked, onToggleBookmark }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [fontSize, setFontSize] = useState('medium');
  const [isReading, setIsReading] = useState(false);

  const paragraphs = chapter.content || [];
  const totalPages = Math.ceil(paragraphs.length / 2);

  useEffect(() => {
    setCurrentPage(0);
    setIsReading(false);
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, [chapter]);

  if (!chapter) return null;

  const handleToggleNarrative = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    } else {
      window.speechSynthesis.cancel();
      const currentParagraphs = paragraphs.slice(currentPage * 2, currentPage * 2 + 2).join(' ');
      const utterance = new SpeechSynthesisUtterance(currentParagraphs);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsReading(false);
      utterance.onerror = () => setIsReading(false);
      window.speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };

  const fontSizeClasses = {
    small: 'text-base leading-relaxed',
    medium: 'text-lg leading-loose',
    large: 'text-xl leading-loose',
  };

  const currentParagraphs = paragraphs.slice(currentPage * 2, currentPage * 2 + 2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl glass-card border-4 border-[var(--border-pink)] rounded-3xl shadow-2xl p-6 sm:p-12 overflow-hidden max-h-[90vh] flex flex-col justify-between">
        
        {/* Top Controls Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-pink)]/30 mb-6">
          
          <div className="flex items-center gap-3">
            <span className="font-display text-xs uppercase tracking-widest px-3.5 py-1 rounded-full bg-gradient-to-r from-[#e02575] to-[#ec4899] text-white font-bold">
              {chapter.chapterNum}
            </span>
            <span className="font-script text-xl text-[var(--accent-gold)] hidden sm:inline">
              {chapter.category}
            </span>
          </div>

          <div className="flex items-center gap-3">
            
            {/* Audio Reader Pill */}
            <button
              onClick={handleToggleNarrative}
              className={`btn-pill-outline text-xs py-1.5 px-3.5 gap-1.5 ${
                isReading ? 'bg-[var(--accent-magenta)] text-white border-transparent animate-pulse' : ''
              }`}
              title={isReading ? 'Stop Reading' : 'Listen to Narrator'}
            >
              {isReading ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[var(--accent-magenta)]" />}
              <span className="hidden md:inline font-bold">
                {isReading ? 'Stop Voice' : 'Narrate'}
              </span>
            </button>

            {/* Font Resizer Pill */}
            <div className="flex items-center border border-[var(--border-pink)] rounded-full p-0.5 bg-[var(--bg-secondary)]">
              <button
                onClick={() => setFontSize('small')}
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${fontSize === 'small' ? 'bg-[var(--accent-magenta)] text-white' : 'text-[var(--text-muted)]'}`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('medium')}
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${fontSize === 'medium' ? 'bg-[var(--accent-magenta)] text-white' : 'text-[var(--text-muted)]'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${fontSize === 'large' ? 'bg-[var(--accent-magenta)] text-white' : 'text-[var(--text-muted)]'}`}
              >
                A+
              </button>
            </div>

            {/* Bookmark Pill */}
            <button
              onClick={() => onToggleBookmark(chapter.id)}
              className={`btn-icon-pill w-9 h-9 ${
                isBookmarked ? 'bg-[var(--accent-magenta)] text-white' : ''
              }`}
              title={isBookmarked ? 'Bookmarked' : 'Add Bookmark'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                if (window.speechSynthesis) window.speechSynthesis.cancel();
                onClose();
              }}
              className="btn-icon-pill w-9 h-9"
              title="Close Storybook"
            >
              <X className="w-5 h-5" />
            </button>

          </div>

        </div>

        {/* Scrollable Story Content */}
        <div className="flex-1 overflow-y-auto px-2 sm:px-6 my-2 custom-scrollbar">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-5xl font-black font-display text-[var(--text-main)] mb-2">
              {chapter.title}
            </h2>
            <p className="font-heading italic text-[var(--accent-magenta)] text-base font-semibold">
              {chapter.subtitle}
            </p>
            <div className="flex items-center justify-center gap-4 text-xs font-body text-[var(--text-muted)] mt-3">
              <span>By {chapter.author}</span>
              <span>•</span>
              <span>{chapter.readTime}</span>
            </div>
          </div>

          {currentPage === 0 && chapter.quote && (
            <div className="p-5 rounded-2xl bg-[var(--accent-lilac)]/30 border-l-4 border-[var(--accent-magenta)] italic text-center font-heading text-[var(--accent-magenta)] text-base my-6 shadow-sm">
              "{chapter.quote}"
            </div>
          )}

          <div className={`font-body text-[var(--text-main)] space-y-6 ${fontSizeClasses[fontSize]}`}>
            {currentParagraphs.map((para, idx) => (
              <p
                key={idx}
                className={currentPage === 0 && idx === 0 ? 'drop-cap' : ''}
              >
                {para}
              </p>
            ))}
          </div>

          {currentPage === totalPages - 1 && (
            <div className="mt-12 text-center border-t border-[var(--border-pink)]/30 pt-6">
              <Feather className="w-6 h-6 text-[var(--accent-magenta)] mx-auto mb-2" />
              <span className="font-script text-2xl text-[var(--text-main)] block">
                Finis - Thus ends {chapter.chapterNum}
              </span>
            </div>
          )}

        </div>

        {/* Bottom Page Navigation Bar */}
        <div className="pt-4 border-t border-[var(--border-pink)]/30 flex items-center justify-between mt-4">
          
          <button
            disabled={currentPage === 0}
            onClick={() => {
              if (window.speechSynthesis) window.speechSynthesis.cancel();
              setIsReading(false);
              setCurrentPage((p) => Math.max(0, p - 1));
            }}
            className={`btn-pill-outline text-xs px-5 py-2 ${
              currentPage === 0 ? 'opacity-30 cursor-not-allowed' : ''
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Page</span>
          </button>

          <span className="font-display text-xs tracking-widest text-[var(--text-muted)] uppercase font-bold">
            Page {currentPage + 1} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages - 1}
            onClick={() => {
              if (window.speechSynthesis) window.speechSynthesis.cancel();
              setIsReading(false);
              setCurrentPage((p) => Math.min(totalPages - 1, p + 1));
            }}
            className={`btn-pill-glam text-xs px-5 py-2 ${
              currentPage === totalPages - 1 ? 'opacity-30 cursor-not-allowed' : ''
            }`}
          >
            <span>Next Page</span>
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>

      </div>

    </div>
  );
}
