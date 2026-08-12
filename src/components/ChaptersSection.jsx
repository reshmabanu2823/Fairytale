import React, { useState } from 'react';
import { FAIRYTALE_CHAPTERS } from '../data/chaptersData';
import { BookOpen, Bookmark, Clock, User, Sparkles, Search, Feather } from 'lucide-react';

export default function ChaptersSection({ onSelectChapter, bookmarkedIds, onToggleBookmark }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...new Set(FAIRYTALE_CHAPTERS.map((c) => c.category))];

  const filteredChapters = FAIRYTALE_CHAPTERS.filter((chapter) => {
    const matchesCategory = selectedCategory === 'All' || chapter.category === selectedCategory;
    const matchesSearch =
      chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chapter.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chapter.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="chapters" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center mb-14">
        <span className="caption-script text-3xl text-[var(--accent-gold-dark)] block">Volumes & Folios</span>
        <h2 className="text-4xl sm:text-6xl font-bold font-display uppercase mt-1 text-[var(--text-main)]">
          Storybook Chapters
        </h2>
        <p className="font-body text-base sm:text-lg text-[var(--text-muted)] max-w-xl mx-auto mt-2 italic">
          Select a chapter to unfold its illuminated parchment pages.
        </p>
        <div className="flourish-divider max-w-xs mx-auto">
          <span>✦ 📖 ✦</span>
        </div>
      </div>

      {/* Category Filters & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-14">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`btn-minimal-icon ${
                selectedCategory === cat ? 'bg-[var(--text-main)] text-[var(--bg-primary)] border-[var(--text-main)]' : ''
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search fairytale lore..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[var(--border-sepia)] bg-[var(--bg-card)] text-[var(--text-main)] placeholder-[var(--text-muted)] font-body text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent-gold-dark)] shadow-xs"
          />
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

      </div>

      {/* Scrapbook Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredChapters.map((chapter, idx) => {
          const isBookmarked = bookmarkedIds.includes(chapter.id);
          const rotationClass = idx % 3 === 0 ? '-rotate-1' : idx % 3 === 1 ? 'rotate-1' : 'rotate-0';

          return (
            <article
              key={chapter.id}
              className={`torn-paper p-7 bg-[var(--bg-card)] border border-[var(--border-sepia)] flex flex-col justify-between hover:rotate-0 transition-transform duration-300 ${rotationClass}`}
            >
              <div>
                {/* Chapter Card Header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--border-sepia)]">
                  <span className="font-display text-xs uppercase tracking-widest px-3 py-0.5 rounded border border-[var(--border-sepia)] bg-[var(--bg-secondary)] text-[var(--text-main)] font-bold">
                    {chapter.chapterNum}
                  </span>
                  
                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(chapter.id);
                    }}
                    className={`p-1.5 rounded transition-transform ${
                      isBookmarked ? 'text-[var(--accent-blush)] fill-current' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                    }`}
                    title={isBookmarked ? "Remove Bookmark" : "Bookmark Chapter"}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Chapter Header Graphic */}
                <div className="w-full h-36 rounded mb-5 bg-[var(--bg-secondary)] border border-[var(--border-sepia)] flex items-center justify-center p-4 relative overflow-hidden">
                  <div className="flex flex-col items-center justify-center text-center">
                    <Sparkles className="w-8 h-8 text-[var(--accent-gold-dark)] mb-1" />
                    <span className="caption-script text-xl text-[var(--text-script)]">
                      {chapter.category}
                    </span>
                  </div>
                </div>

                {/* Titles */}
                <h3 className="text-2xl font-bold font-display text-[var(--text-main)] mb-1 leading-snug">
                  {chapter.title}
                </h3>
                <p className="font-heading text-xs italic text-[var(--text-muted)] mb-3">
                  {chapter.subtitle}
                </p>

                {/* Meta details */}
                <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] font-body mb-4 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[var(--accent-gold-dark)]" />
                    {chapter.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[var(--accent-gold-dark)]" />
                    {chapter.author}
                  </span>
                </div>

                {/* Excerpt */}
                <p className="font-body text-sm text-[var(--text-main)] line-clamp-3 leading-relaxed mb-6">
                  "{chapter.excerpt}"
                </p>
              </div>

              {/* Minimal Understated Button */}
              <button
                onClick={() => onSelectChapter(chapter)}
                className="w-full btn-minimal justify-center py-2.5 text-xs font-semibold uppercase tracking-wider"
              >
                <BookOpen className="w-4 h-4" />
                <span>Read Full Chapter</span>
              </button>

            </article>
          );
        })}
      </div>

      {filteredChapters.length === 0 && (
        <div className="text-center py-16 torn-paper max-w-md mx-auto p-8">
          <Feather className="w-12 h-12 text-[var(--accent-gold-dark)] mx-auto mb-3" />
          <h3 className="font-display text-xl text-[var(--text-main)] font-bold">No Fables Found</h3>
          <p className="font-body text-sm text-[var(--text-muted)] mt-1">
            Try adjusting your category filter or search terms.
          </p>
        </div>
      )}

    </section>
  );
}
