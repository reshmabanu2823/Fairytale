import React, { useState } from 'react';
import { FAIRYTALE_CHAPTERS } from '../data/chaptersData';
import { BookOpen, Bookmark, Clock, User, Sparkles, Search, Compass, Feather } from 'lucide-react';

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
    <section id="chapters" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Title Header */}
      <div className="text-center mb-12">
        <span className="font-script text-3xl text-[var(--accent-gold)]">Volumes & Chronicles</span>
        <h2 className="text-4xl sm:text-6xl font-bold font-title mt-1 text-[var(--text-main)]">
          Storybook Chapters
        </h2>
        <p className="font-subheading text-lg text-[var(--text-muted)] max-w-xl mx-auto mt-2 italic">
          Select a chapter to unfold its illuminated parchment pages.
        </p>
        <div className="flourish-divider max-w-xs mx-auto">
          <span>✦ 📖 ✦</span>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
        
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-subheading tracking-wider uppercase transition-all ${
                selectedCategory === cat
                  ? 'bg-[var(--accent-gold)] text-black font-bold shadow-md'
                  : 'bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input Bar */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search fairytale lore..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-[var(--border-gold)] bg-[var(--bg-card)] text-[var(--text-main)] placeholder-[var(--text-muted)] font-serif text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)] shadow-sm"
          />
          <Search className="w-4 h-4 text-[var(--accent-gold)] absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredChapters.map((chapter) => {
          const isBookmarked = bookmarkedIds.includes(chapter.id);

          return (
            <article
              key={chapter.id}
              className="manuscript-frame group bg-[var(--bg-card)] flex flex-col justify-between p-6 border-2 border-[var(--manuscript-border)] hover:border-[var(--accent-gold)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[var(--shadow-glow)]"
            >
              {/* Corner flourishes */}
              <div className="corner-flourish corner-tl" />
              <div className="corner-flourish corner-tr" />
              <div className="corner-flourish corner-bl" />
              <div className="corner-flourish corner-br" />

              <div>
                {/* Chapter Card Header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--border-subtle)]">
                  <span className="font-title text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-[var(--accent-gold-light)] text-[var(--accent-purple)] font-bold">
                    {chapter.chapterNum}
                  </span>
                  
                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(chapter.id);
                    }}
                    className={`p-2 rounded-full transition-transform hover:scale-110 ${
                      isBookmarked
                        ? 'text-[var(--accent-rose)] fill-current'
                        : 'text-[var(--text-muted)] hover:text-[var(--accent-gold)]'
                    }`}
                    title={isBookmarked ? "Remove Bookmark" : "Bookmark Chapter"}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Chapter Icon Graphic */}
                <div className="w-full h-32 rounded-lg mb-6 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-card)] border border-[var(--border-gold)]/40 flex items-center justify-center p-4 relative overflow-hidden group-hover:scale-102 transition-transform">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Category-based vector emblem */}
                  <div className="flex flex-col items-center justify-center text-center">
                    <Sparkles className="w-10 h-10 text-[var(--accent-gold)] mb-1 animate-pulse" />
                    <span className="font-script text-lg text-[var(--accent-gold)]">
                      {chapter.category}
                    </span>
                  </div>
                </div>

                {/* Chapter Title & Subtitle */}
                <h3 className="text-xl font-bold font-heading text-[var(--text-main)] mb-1 group-hover:text-[var(--accent-gold)] transition-colors">
                  {chapter.title}
                </h3>
                <p className="font-subheading text-xs italic text-[var(--accent-purple)] mb-3">
                  {chapter.subtitle}
                </p>

                {/* Chapter Meta Info */}
                <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] font-serif mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                    {chapter.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                    {chapter.author}
                  </span>
                </div>

                {/* Excerpt */}
                <p className="font-serif text-sm text-[var(--text-main)]/85 line-clamp-3 leading-relaxed mb-6">
                  "{chapter.excerpt}"
                </p>
              </div>

              {/* Card Footer Button */}
              <button
                onClick={() => onSelectChapter(chapter)}
                className="w-full btn-fairytale-outline justify-center py-2.5 text-sm group-hover:bg-[var(--accent-gold)] group-hover:text-black transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>Read Full Chapter</span>
              </button>

            </article>
          );
        })}
      </div>

      {filteredChapters.length === 0 && (
        <div className="text-center py-16 manuscript-frame max-w-md mx-auto">
          <Feather className="w-12 h-12 text-[var(--accent-gold)] mx-auto mb-3" />
          <h3 className="font-heading text-xl text-[var(--text-main)]">No Fables Found</h3>
          <p className="font-serif text-sm text-[var(--text-muted)] mt-1">
            Try adjusting your category filter or search terms.
          </p>
        </div>
      )}

    </section>
  );
}
