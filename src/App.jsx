import React, { useState, useEffect } from 'react';
import SparkleCanvas from './components/SparkleCanvas';
import FloatingButterflies from './components/FloatingButterflies';
import CursorButterfly from './components/CursorButterfly';
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
    } catch (e) {}
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
    <div className="min-h-screen relative transition-colors duration-500 selection:bg-[var(--color-primary-container)] selection:text-[var(--color-on-primary-container)] font-body-md">
      
      {/* Sun-dappled Light Motes & Botanical Pollen Canvas */}
      <SparkleCanvas />

      {/* Floating Viewport Butterflies */}
      <FloatingButterflies />

      {/* Interactive Curious Cursor-Following Moth */}
      <CursorButterfly />

      {/* Ethereal Ephemera Navbar */}
      <Navbar
        theme={theme}
        setTheme={setTheme}
        isAudioOn={isAudioOn}
        setIsAudioOn={setIsAudioOn}
        bookmarkCount={bookmarkedIds.length}
        onOpenBookmarks={() => setShowBookmarksModal(true)}
      />

      {/* Main Content Layout */}
      <main className="flex-grow pt-16 flex flex-col items-center">
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

      {/* Ethereal Ephemera Footer */}
      <Footer />

      {/* Storybook Reader Modal */}
      {selectedChapter && (
        <StoryReaderModal
          chapter={selectedChapter}
          onClose={() => setSelectedChapter(null)}
          isBookmarked={bookmarkedIds.includes(selectedChapter.id)}
          onToggleBookmark={handleToggleBookmark}
        />
      )}

      {/* Bookmarks Quick Modal */}
      {showBookmarksModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="w-full max-w-lg p-6 bg-[var(--bg-surface)] rounded-lg shadow-2xl torn-edge-all border border-[var(--border-outline-variant)]/50 relative max-h-[80vh] flex flex-col justify-between">
            
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-outline-variant)]/30 mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-lg text-[var(--color-primary)]">bookmark</span>
                <h3 className="font-display font-bold text-base text-[var(--text-on-surface)]">
                  Bookmarked Tales ({bookmarkedChapters.length})
                </h3>
              </div>

              <button
                onClick={() => setShowBookmarksModal(false)}
                className="p-1 text-[var(--text-on-surface-variant)] hover:text-[var(--color-primary)]"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="overflow-y-auto space-y-2 my-2 pr-1 custom-scrollbar">
              {bookmarkedChapters.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    setSelectedChapter(c);
                    setShowBookmarksModal(false);
                  }}
                  className="p-3 rounded bg-[var(--bg-surface-low)] border border-[var(--border-outline-variant)]/40 hover:border-[var(--color-primary)] cursor-pointer flex items-center justify-between transition-colors group"
                >
                  <div>
                    <span className="font-label-sm text-[10px] text-[var(--color-tertiary)] font-bold">
                      {c.chapterNum}
                    </span>
                    <h4 className="font-display font-bold text-sm text-[var(--text-on-surface)] group-hover:text-[var(--color-primary)] transition-colors">
                      {c.title}
                    </h4>
                  </div>
                  <span className="material-symbols-outlined text-base text-[var(--color-primary)]">menu_book</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[var(--border-outline-variant)]/30 text-center">
              <button
                onClick={() => setShowBookmarksModal(false)}
                className="px-4 py-1.5 rounded-full bg-[var(--bg-surface-low)] text-[var(--text-on-surface-variant)] font-label-sm text-xs hover:text-[var(--color-primary)] border border-[var(--border-outline-variant)]/40"
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
