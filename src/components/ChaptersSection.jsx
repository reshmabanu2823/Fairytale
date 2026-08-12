import React, { useState } from 'react';
import { FAIRYTALE_CHAPTERS } from '../data/chaptersData';

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
    <section id="chapters" className="py-20 px-[5vw] max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="font-accent-italic text-accent-italic text-2xl text-[var(--color-tertiary)] block mb-1">
          Flora & Folklore Folios
        </span>
        <h2 className="font-display-lg text-3xl sm:text-5xl text-[var(--color-primary)] font-bold">
          Storybook Chapters
        </h2>
        <p className="font-body-md text-sm sm:text-base text-[var(--text-on-surface-variant)] max-w-xl mx-auto mt-2 italic">
          Select a chapter to unfold its illuminated parchment pages.
        </p>
      </div>

      {/* Category Filters & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full font-label-sm text-xs transition-colors ${
                selectedCategory === cat
                  ? 'bg-[var(--color-primary)] text-white font-bold'
                  : 'bg-[var(--bg-surface-low)] text-[var(--text-on-surface-variant)] border border-[var(--border-outline-variant)]/40 hover:text-[var(--color-primary)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search lore..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-[var(--border-outline-variant)] bg-[var(--bg-surface)] text-[var(--text-on-surface)] placeholder-[var(--text-on-surface-variant)] font-body-md text-xs focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
          />
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[var(--text-on-surface-variant)]">
            search
          </span>
        </div>
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredChapters.map((chapter, idx) => {
          const isBookmarked = bookmarkedIds.includes(chapter.id);
          const rotationClass = idx % 3 === 0 ? '-rotate-1' : idx % 3 === 1 ? 'rotate-1' : 'rotate-0';

          return (
            <article
              key={chapter.id}
              className={`bg-[var(--bg-surface)] p-6 shadow-md torn-edge-all relative flex flex-col justify-between transform hover:rotate-0 transition-transform duration-300 ${rotationClass}`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-[var(--border-outline-variant)]/30">
                  <span className="font-label-sm text-[11px] text-[var(--color-tertiary)] font-bold">
                    {chapter.chapterNum}
                  </span>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(chapter.id);
                    }}
                    className={`p-1 text-[var(--color-primary)] transition-transform ${
                      isBookmarked ? 'opacity-100' : 'opacity-40 hover:opacity-100'
                    }`}
                    title={isBookmarked ? "Remove Bookmark" : "Bookmark Chapter"}
                  >
                    <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}>
                      bookmark
                    </span>
                  </button>
                </div>

                {/* Subtitle Accent */}
                <span className="font-accent-italic text-accent-italic text-sm text-[var(--color-secondary)] block mb-1">
                  {chapter.category}
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold font-display text-[var(--text-on-surface)] mb-1 leading-snug">
                  {chapter.title}
                </h3>
                <p className="font-body-md text-xs italic text-[var(--text-on-surface-variant)] mb-3">
                  {chapter.subtitle}
                </p>

                {/* Excerpt */}
                <p className="font-body-md text-xs text-[var(--text-on-surface-variant)] line-clamp-3 leading-relaxed mb-6">
                  "{chapter.excerpt}"
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectChapter(chapter)}
                className="w-full bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)] py-2 px-4 rounded-full font-label-sm text-xs hover:bg-[var(--color-secondary-container)]/80 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span className="material-symbols-outlined text-sm">menu_book</span>
                <span>Read Chapter</span>
              </button>
            </article>
          );
        })}
      </div>

      {filteredChapters.length === 0 && (
        <div className="text-center py-12 bg-[var(--bg-surface)] p-6 shadow-sm torn-edge-all max-w-md mx-auto">
          <span className="material-symbols-outlined text-3xl text-[var(--color-primary)] mb-2">auto_stories</span>
          <h3 className="font-display text-lg text-[var(--text-on-surface)] font-bold">No Folios Found</h3>
          <p className="font-body-md text-xs text-[var(--text-on-surface-variant)] mt-1">
            Try adjusting your search terms or filters.
          </p>
        </div>
      )}
    </section>
  );
}
