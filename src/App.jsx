import React, { useState, useEffect } from 'react';
import SparkleCanvas from './components/SparkleCanvas';
import FloatingButterflies from './components/FloatingButterflies';
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
    <div className="min-h-screen relative transition-colors duration-500 selection:bg-[var(--accent-magenta)] selection:text-white font-body">
      
      {/* Background Glowing Sparkle & Bokeh Canvas */}
      <SparkleCanvas />

      {/* Floating Animated Fairytale Butterflies */}
      <FloatingButterflies />

      {/* Glassmorphic Navbar */}
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
          <div className="glass-card w-full max-w-lg p-6 sm:p-8 border-2 border-[var(--border-pink)] shadow-2xl relative max-h-[80vh] flex flex-col justify-between">
            
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-pink)]/30 mb-4">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-[var(--accent-magenta)]" />
                <h3 className="font-display font-bold text-lg text-[var(--text-main)]">
                  Bookmarked Tales ({bookmarkedChapters.length})
                </h3>
              </div>

              <button
                onClick={() => setShowBookmarksModal(false)}
                className="btn-icon-pill w-8 h-8"
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
                  className="p-4 rounded-2xl border border-[var(--border-pink)]/40 bg-[var(--bg-card)] hover:border-[var(--accent-magenta)] cursor-pointer flex items-center justify-between transition-colors group"
                >
                  <div>
                    <span className="font-display text-[10px] uppercase text-[var(--accent-magenta)] font-bold">
                      {c.chapterNum}
                    </span>
                    <h4 className="font-display font-bold text-base text-[var(--text-main)] group-hover:text-[var(--accent-magenta)] transition-colors">
                      {c.title}
                    </h4>
                  </div>
                  <BookOpen className="w-4 h-4 text-[var(--accent-magenta)]" />
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[var(--border-pink)]/30 text-center">
              <button
                onClick={() => setShowBookmarksModal(false)}
                className="btn-pill-outline text-xs py-2 px-6"
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
