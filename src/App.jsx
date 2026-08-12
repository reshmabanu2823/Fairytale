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
    <div className="min-h-screen relative transition-colors duration-500 selection:bg-[var(--accent-gold)] selection:text-[#2b1f17] font-body">
      
      {/* Sun-dappled Light Motes & Botanical Pollen Canvas */}
      <SparkleCanvas />

      {/* Floating Vintage Viewport Butterflies */}
      <FloatingButterflies />

      {/* Interactive Curious Cursor-Following Moth/Butterfly */}
      <CursorButterfly />

      {/* Understated Editorial Scrapbook Navbar */}
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
          <div className="torn-paper w-full max-w-lg p-6 sm:p-8 bg-[var(--bg-card)] border border-[var(--border-sepia)] shadow-2xl relative max-h-[80vh] flex flex-col justify-between">
            
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-sepia)] mb-4">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-[var(--accent-gold-dark)]" />
                <h3 className="font-display font-bold text-lg text-[var(--text-main)] uppercase">
                  Bookmarked Tales ({bookmarkedChapters.length})
                </h3>
              </div>

              <button
                onClick={() => setShowBookmarksModal(false)}
                className="btn-minimal-icon"
              >
                <X className="w-4 h-4" />
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
                  className="p-4 rounded border border-[var(--border-sepia)] bg-[var(--bg-secondary)] hover:border-[var(--text-main)] cursor-pointer flex items-center justify-between transition-colors group"
                >
                  <div>
                    <span className="font-display text-[10px] uppercase text-[var(--text-muted)] font-bold">
                      {c.chapterNum}
                    </span>
                    <h4 className="font-display font-bold text-base text-[var(--text-main)] group-hover:text-[var(--accent-gold-dark)] transition-colors">
                      {c.title}
                    </h4>
                  </div>
                  <BookOpen className="w-4 h-4 text-[var(--accent-gold-dark)]" />
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[var(--border-sepia)] text-center">
              <button
                onClick={() => setShowBookmarksModal(false)}
                className="btn-minimal text-xs py-2 px-6 uppercase tracking-wider"
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
