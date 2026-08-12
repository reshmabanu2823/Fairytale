import React, { useState, useEffect } from 'react';

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
    small: 'text-sm leading-relaxed',
    medium: 'text-base leading-loose',
    large: 'text-lg leading-loose',
  };

  const currentParagraphs = paragraphs.slice(currentPage * 2, currentPage * 2 + 2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto">
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-[var(--bg-surface)] p-6 sm:p-10 shadow-2xl torn-edge-all border border-[var(--border-outline-variant)]/50 max-h-[90vh] flex flex-col justify-between">
        
        {/* Top Controls Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-outline-variant)]/30 mb-4">
          <div className="flex items-center gap-3">
            <span className="font-label-sm text-xs text-[var(--color-tertiary)] font-bold">
              {chapter.chapterNum}
            </span>
            <span className="font-accent-italic text-lg text-[var(--color-secondary)] hidden sm:inline">
              {chapter.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Reader */}
            <button
              onClick={handleToggleNarrative}
              className={`px-3 py-1 rounded-full text-xs font-label-sm flex items-center gap-1 transition-colors ${
                isReading ? 'bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] font-bold' : 'bg-[var(--bg-surface-low)] text-[var(--text-on-surface-variant)] hover:text-[var(--color-primary)]'
              }`}
              title={isReading ? 'Stop Reading' : 'Listen to Narrator'}
            >
              <span className="material-symbols-outlined text-sm">
                {isReading ? 'volume_off' : 'volume_up'}
              </span>
              <span className="hidden md:inline">{isReading ? 'Stop Voice' : 'Narrate'}</span>
            </button>

            {/* Font Size Toggle */}
            <div className="flex items-center border border-[var(--border-outline-variant)]/40 rounded-full p-0.5 bg-[var(--bg-surface-low)]">
              <button
                onClick={() => setFontSize('small')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${fontSize === 'small' ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--text-on-surface-variant)]'}`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('medium')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${fontSize === 'medium' ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--text-on-surface-variant)]'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${fontSize === 'large' ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--text-on-surface-variant)]'}`}
              >
                A+
              </button>
            </div>

            {/* Bookmark */}
            <button
              onClick={() => onToggleBookmark(chapter.id)}
              className="p-1 text-[var(--color-primary)] hover:opacity-80"
              title={isBookmarked ? 'Bookmarked' : 'Add Bookmark'}
            >
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}>
                bookmark
              </span>
            </button>

            {/* Close Modal */}
            <button
              onClick={() => {
                if (window.speechSynthesis) window.speechSynthesis.cancel();
                onClose();
              }}
              className="p-1 text-[var(--text-on-surface-variant)] hover:text-[var(--color-primary)]"
              title="Close Reader"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>

        {/* Scrollable Story Content */}
        <div className="flex-1 overflow-y-auto px-2 sm:px-4 my-2 custom-scrollbar">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-4xl font-bold font-display text-[var(--text-on-surface)] mb-1">
              {chapter.title}
            </h2>
            <p className="font-accent-italic text-base text-[var(--color-tertiary)]">
              {chapter.subtitle}
            </p>
          </div>

          {currentPage === 0 && chapter.quote && (
            <div className="p-4 rounded bg-[var(--bg-surface-low)] border-l-4 border-[var(--color-tertiary)] font-accent-italic text-lg text-[var(--color-tertiary)] my-4">
              "{chapter.quote}"
            </div>
          )}

          <div className={`font-body-md text-[var(--text-on-surface-variant)] space-y-4 ${fontSizeClasses[fontSize]}`}>
            {currentParagraphs.map((para, idx) => (
              <p key={idx} className={currentPage === 0 && idx === 0 ? 'drop-cap' : ''}>
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="pt-3 border-t border-[var(--border-outline-variant)]/30 flex items-center justify-between mt-3">
          <button
            disabled={currentPage === 0}
            onClick={() => {
              if (window.speechSynthesis) window.speechSynthesis.cancel();
              setIsReading(false);
              setCurrentPage((p) => Math.max(0, p - 1));
            }}
            className={`px-3 py-1.5 rounded-full font-label-sm text-xs border border-[var(--border-outline-variant)] ${
              currentPage === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[var(--color-primary-container)]'
            }`}
          >
            ← Previous
          </button>

          <span className="font-label-sm text-[11px] text-[var(--text-on-surface-variant)]">
            Page {currentPage + 1} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages - 1}
            onClick={() => {
              if (window.speechSynthesis) window.speechSynthesis.cancel();
              setIsReading(false);
              setCurrentPage((p) => Math.min(totalPages - 1, p + 1));
            }}
            className={`px-3 py-1.5 rounded-full font-label-sm text-xs bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)] ${
              currentPage === totalPages - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-90'
            }`}
          >
            Next →
          </button>
        </div>

      </div>
    </div>
  );
}
