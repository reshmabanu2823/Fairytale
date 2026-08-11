import React, { useState, useEffect } from 'react';
import SparkleCanvas from './components/SparkleCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ChaptersSection from './components/ChaptersSection';
import StoryReaderModal from './components/StoryReaderModal';
import RealmMap from './components/RealmMap';
import ArchetypeQuiz from './components/ArchetypeQuiz';
import WishcraftGenerator from './components/WishcraftGenerator';
import Footer from './components/Footer';
import { FAIRYTALE_CHAPTERS } from './data/chaptersData';
import { Bookmark, X, BookOpen } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState('daylight');
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('aetheria_bookmarks');
      return saved ? JSON.parse(saved) : ['chapter-1'];
    } catch (e) {
      return ['chapter-1'];
    }
  });
  const [showBookmarksModal, setShowBookmarksModal] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('aetheria_bookmarks', JSON.stringify(bookmarkedIds));
    } catch (e) {
      // Storage fallback
    }
  }, [bookmarkedIds]);

  const handleToggleBookmark = (id) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((bId) => bId !== id) : [...prev, id]
    );
  };

  const bookmarkedChapters = FAIRYTALE_CHAPTERS.filter((c) =>
    bookmarkedIds.includes(c.id)
  );

  return (
    <div className="min-h-screen relative transition-colors duration-500 selection:bg-[var(--accent-gold)] selection:text-black">
      
      {/* Interactive Background Canvas */}
      <SparkleCanvas />

      {/* Parchment Navbar */}
      <Navbar
        theme={theme}
        setTheme={setTheme}
        isAudioOn={isAudioOn}
        setIsAudioOn={setIsAudioOn}
        bookmarkCount={bookmarkedIds.length}
        onOpenBookmarks={() => setShowBookmarksModal(true)}
      />

      {/* Main Content Layout */}
      <main className="relative z-10">
        <Hero />
        <AboutSection />
        <ChaptersSection
          onSelectChapter={(chapter) => setSelectedChapter(chapter)}
          bookmarkedIds={bookmarkedIds}
          onToggleBookmark={handleToggleBookmark}
        />
        <RealmMap />
        <ArchetypeQuiz />
        <WishcraftGenerator />
      </main>

      {/* Closing Book Footer */}
      <Footer />

      {/* Interactive Storybook Reader Modal */}
      {selectedChapter && (
        <StoryReaderModal
          chapter={selectedChapter}
          onClose={() => setSelectedChapter(null)}
          isBookmarked={bookmarkedIds.includes(selectedChapter.id)}
          onToggleBookmark={handleToggleBookmark}
        />
      )}

      {/* Bookmarks Quick Drawer Modal */}
      {showBookmarksModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="manuscript-frame w-full max-w-lg bg-[var(--bg-card)] p-6 sm:p-8 border-2 border-[var(--manuscript-border)] shadow-2xl relative max-h-[80vh] flex flex-col justify-between">
            
            <div className="corner-flourish corner-tl" />
            <div className="corner-flourish corner-tr" />
            <div className="corner-flourish corner-bl" />
            <div className="corner-flourish corner-br" />

            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)] mb-4">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-[var(--accent-gold)]" />
                <h3 className="font-title text-lg text-[var(--text-main)]">
                  Bookmarked Tales ({bookmarkedChapters.length})
                </h3>
              </div>

              <button
                onClick={() => setShowBookmarksModal(false)}
                className="p-1 rounded-full hover:bg-[var(--accent-gold-light)] text-[var(--text-main)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-3 my-2 pr-1 custom-scrollbar">
              {bookmarkedChapters.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    setSelectedChapter(c);
                    setShowBookmarksModal(false);
                  }}
                  className="p-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 hover:border-[var(--accent-gold)] cursor-pointer flex items-center justify-between transition-colors group"
                >
                  <div>
                    <span className="font-title text-[10px] uppercase text-[var(--accent-gold)] font-bold">
                      {c.chapterNum}
                    </span>
                    <h4 className="font-heading font-bold text-base text-[var(--text-main)] group-hover:text-[var(--accent-gold)] transition-colors">
                      {c.title}
                    </h4>
                  </div>
                  <BookOpen className="w-4 h-4 text-[var(--accent-gold)]" />
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)] text-center">
              <button
                onClick={() => setShowBookmarksModal(false)}
                className="btn-fairytale-outline text-xs py-2 px-6"
              >
                Close Bookmarks
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
