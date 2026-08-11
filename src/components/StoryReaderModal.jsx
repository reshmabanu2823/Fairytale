import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Bookmark, Volume2, VolumeX, Type, Sparkles, Feather } from 'lucide-react';

export default function StoryReaderModal({ chapter, onClose, isBookmarked, onToggleBookmark }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [fontSize, setFontSize] = useState('medium'); // small, medium, large
  const [isReading, setIsReading] = useState(false);

  // Split paragraphs into double-page chunks
  const paragraphs = chapter.content || [];
  const totalPages = Math.ceil(paragraphs.length / 2);

  useEffect(() => {
    // Reset page on story change
    setCurrentPage(0);
    setIsReading(false);
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, [chapter]);

  if (!chapter) return null;

  // Text-to-speech for the current page chunk
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
      
      {/* Storybook Modal Container */}
      <div className="relative w-full max-w-4xl bg-[var(--bg-card)] border-4 border-[var(--manuscript-border)] rounded-xl shadow-2xl p-6 sm:p-12 overflow-hidden max-h-[90vh] flex flex-col justify-between transition-all">
        
        {/* Illuminated corner flourishes */}
        <div className="corner-flourish corner-tl" />
        <div className="corner-flourish corner-tr" />
        <div className="corner-flourish corner-bl" />
        <div className="corner-flourish corner-br" />

        {/* Modal Controls Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)] mb-6">
          
          <div className="flex items-center gap-3">
            <span className="font-title text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-[var(--accent-gold-light)] text-[var(--accent-purple)] font-bold">
              {chapter.chapterNum}
            </span>
            <span className="font-script text-lg text-[var(--accent-gold)] hidden sm:inline">
              {chapter.category}
            </span>
          </div>

          {/* Controls: Audio Reader, Font Resizer, Bookmark, Close */}
          <div className="flex items-center gap-2">
            
            {/* Audio Reader */}
            <button
              onClick={handleToggleNarrative}
              className={`p-2 rounded-full border border-[var(--border-gold)] transition-colors flex items-center gap-1 text-xs font-serif ${
                isReading ? 'bg-[var(--accent-rose)] text-white animate-pulse' : 'hover:bg-[var(--accent-gold-light)] text-[var(--text-main)]'
              }`}
              title={isReading ? 'Stop Reading' : 'Listen to Narrator'}
            >
              {isReading ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[var(--accent-gold)]" />}
              <span className="hidden md:inline font-subheading">
                {isReading ? 'Stop Voice' : 'Narrate'}
              </span>
            </button>

            {/* Font Size Toggle */}
            <div className="flex items-center border border-[var(--border-gold)] rounded-full p-0.5 bg-[var(--bg-secondary)]">
              <button
                onClick={() => setFontSize('small')}
                className={`px-2 py-0.5 rounded-full text-xs font-serif ${fontSize === 'small' ? 'bg-[var(--accent-gold)] text-black font-bold' : 'text-[var(--text-muted)]'}`}
                title="Small Font"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('medium')}
                className={`px-2 py-0.5 rounded-full text-xs font-serif ${fontSize === 'medium' ? 'bg-[var(--accent-gold)] text-black font-bold' : 'text-[var(--text-muted)]'}`}
                title="Medium Font"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 rounded-full text-xs font-serif ${fontSize === 'large' ? 'bg-[var(--accent-gold)] text-black font-bold' : 'text-[var(--text-muted)]'}`}
                title="Large Font"
              >
                A+
              </button>
            </div>

            {/* Bookmark Toggle */}
            <button
              onClick={() => onToggleBookmark(chapter.id)}
              className={`p-2 rounded-full border border-[var(--border-gold)] transition-colors ${
                isBookmarked ? 'bg-[var(--accent-rose)] text-white' : 'hover:bg-[var(--accent-gold-light)] text-[var(--text-main)]'
              }`}
              title={isBookmarked ? 'Bookmarked' : 'Add Bookmark'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Close Modal */}
            <button
              onClick={() => {
                if (window.speechSynthesis) window.speechSynthesis.cancel();
                onClose();
              }}
              className="p-2 rounded-full hover:bg-[var(--accent-gold-light)] text-[var(--text-main)] transition-colors"
              title="Close Storybook"
            >
              <X className="w-5 h-5" />
            </button>

          </div>

        </div>

        {/* Story Body Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-2 sm:px-6 my-2 custom-scrollbar">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold font-title text-[var(--text-main)] mb-2">
              {chapter.title}
            </h2>
            <p className="font-subheading italic text-[var(--accent-gold)] text-base">
              {chapter.subtitle}
            </p>
            <div className="flex items-center justify-center gap-4 text-xs font-serif text-[var(--text-muted)] mt-2">
              <span>By {chapter.author}</span>
              <span>•</span>
              <span>{chapter.readTime}</span>
            </div>
          </div>

          {/* Illuminated Quote Block */}
          {currentPage === 0 && chapter.quote && (
            <div className="manuscript-frame my-6 p-4 bg-[var(--bg-secondary)] border-l-4 border-[var(--accent-gold)] italic text-center font-subheading text-[var(--accent-purple)] text-sm sm:text-base">
              "{chapter.quote}"
            </div>
          )}

          {/* Story Paragraphs with Drop Cap on Page 1 */}
          <div className={`font-serif text-[var(--text-main)] space-y-6 ${fontSizeClasses[fontSize]}`}>
            {currentParagraphs.map((para, idx) => (
              <p
                key={idx}
                className={currentPage === 0 && idx === 0 ? 'drop-cap' : ''}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Last Page Author Sign-off */}
          {currentPage === totalPages - 1 && (
            <div className="mt-12 text-center border-t border-[var(--border-subtle)] pt-6">
              <Feather className="w-6 h-6 text-[var(--accent-gold)] mx-auto mb-2" />
              <span className="font-script text-2xl text-[var(--text-main)] block">
                Finis - Thus ends {chapter.chapterNum}
              </span>
            </div>
          )}

        </div>

        {/* Modal Bottom Page Flip Navigation Bar */}
        <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between mt-4">
          
          <button
            disabled={currentPage === 0}
            onClick={() => {
              if (window.speechSynthesis) window.speechSynthesis.cancel();
              setIsReading(false);
              setCurrentPage((p) => Math.max(0, p - 1));
            }}
            className={`btn-fairytale-outline text-xs px-4 py-2 ${
              currentPage === 0 ? 'opacity-30 cursor-not-allowed' : ''
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Page</span>
          </button>

          <span className="font-title text-xs tracking-widest text-[var(--text-muted)] uppercase">
            Page {currentPage + 1} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages - 1}
            onClick={() => {
              if (window.speechSynthesis) window.speechSynthesis.cancel();
              setIsReading(false);
              setCurrentPage((p) => Math.min(totalPages - 1, p + 1));
            }}
            className={`btn-fairytale text-xs px-4 py-2 ${
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
