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
        <span className="font-script text-3xl text-[var(--accent-gold)]">Volumes & Chronicles</span>
        <h2 className="text-4xl sm:text-6xl font-black font-display mt-1 text-[var(--text-main)]">
          Storybook Chapters
        </h2>
        <p className="font-body text-base sm:text-lg text-[var(--text-muted)] max-w-xl mx-auto mt-2 italic">
          Select a chapter to unfold its illuminated fairytale pages.
        </p>
        <div className="flourish-divider max-w-xs mx-auto">
          <span>✦ 📖 ✦</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-14">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={selectedCategory === cat ? 'btn-pill-glam text-xs py-2 px-5' : 'btn-pill-outline text-xs py-2 px-5'}
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
            className="w-full pl-11 pr-4 py-3 rounded-full border-2 border-[var(--border-pink)] bg-[var(--bg-card)] text-[var(--text-main)] placeholder-[var(--text-muted)] font-body text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-magenta)] shadow-md transition-all"
          />
          <Search className="w-4 h-4 text-[var(--accent-magenta)] absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredChapters.map((chapter) => {
          const isBookmarked = bookmarkedIds.includes(chapter.id);

          return (
            <article
              key={chapter.id}
              className="glass-card flex flex-col justify-between p-7 border-2 border-[var(--border-pink)] hover:border-[var(--accent-magenta)] transition-all duration-300 group"
            >
              <div>
                {/* Chapter Card Header */}
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-[var(--border-pink)]/30">
                  <span className="font-display text-xs uppercase tracking-widest px-3.5 py-1 rounded-full bg-gradient-to-r from-[#e02575] to-[#ec4899] text-white font-bold shadow-sm">
                    {chapter.chapterNum}
                  </span>
                  
                  {/* Bookmark Button Pill */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(chapter.id);
                    }}
                    className={`btn-icon-pill w-9 h-9 ${
                      isBookmarked ? 'bg-[var(--accent-magenta)] text-white' : ''
                    }`}
                    title={isBookmarked ? "Remove Bookmark" : "Bookmark Chapter"}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Chapter Graphic Emblem */}
                <div className="w-full h-36 rounded-2xl mb-6 bg-gradient-to-tr from-[var(--accent-lilac)] to-[var(--bg-secondary)] border border-[var(--border-pink)]/40 flex items-center justify-center p-4 relative overflow-hidden group-hover:scale-102 transition-transform shadow-inner">
                  <div className="flex flex-col items-center justify-center text-center">
                    <Sparkles className="w-10 h-10 text-[var(--accent-magenta)] mb-2 animate-pulse" />
                    <span className="font-script text-xl text-[var(--accent-gold)]">
                      {chapter.category}
                    </span>
                  </div>
                </div>

                {/* Chapter Titles */}
                <h3 className="text-2xl font-bold font-display text-[var(--text-main)] mb-1 group-hover:text-[var(--accent-magenta)] transition-colors leading-snug">
                  {chapter.title}
                </h3>
                <p className="font-heading text-xs italic text-[var(--accent-magenta)] mb-4 font-semibold">
                  {chapter.subtitle}
                </p>

                {/* Meta details */}
                <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] font-body mb-4 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[var(--accent-magenta)]" />
                    {chapter.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[var(--accent-magenta)]" />
                    {chapter.author}
                  </span>
                </div>

                {/* Excerpt */}
                <p className="font-body text-sm text-[var(--text-main)]/90 line-clamp-3 leading-relaxed mb-6 font-normal">
                  "{chapter.excerpt}"
                </p>
              </div>

              {/* Action Button Pill */}
              <button
                onClick={() => onSelectChapter(chapter)}
                className="w-full btn-pill-outline justify-center py-3 text-sm group-hover:bg-[var(--accent-magenta)] group-hover:text-white transition-all font-bold"
              >
                <BookOpen className="w-4 h-4" />
                <span>Read Full Chapter</span>
              </button>

            </article>
          );
        })}
      </div>

      {filteredChapters.length === 0 && (
        <div className="text-center py-16 glass-card max-w-md mx-auto p-8">
          <Feather className="w-12 h-12 text-[var(--accent-magenta)] mx-auto mb-3" />
          <h3 className="font-display text-xl text-[var(--text-main)] font-bold">No Fables Found</h3>
          <p className="font-body text-sm text-[var(--text-muted)] mt-1">
            Try adjusting your category filter or search terms.
          </p>
        </div>
      )}

    </section>
  );
}
