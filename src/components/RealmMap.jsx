import React, { useState } from 'react';
import { REALM_MAP_LOCATIONS } from '../data/chaptersData';
import { Compass, Sparkles, MapPin, TreePine, Waves, Cog, Shield } from 'lucide-react';

export default function RealmMap() {
  const [activeLocation, setActiveLocation] = useState(REALM_MAP_LOCATIONS[0]);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'TreePine': return <TreePine className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Waves': return <Waves className="w-5 h-5" />;
      case 'Cog': return <Cog className="w-5 h-5" />;
      default: return <MapPin className="w-5 h-5" />;
    }
  };

  return (
    <section id="realm-map" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="font-script text-3xl text-[var(--accent-gold)]">Cartography & Lore</span>
        <h2 className="text-4xl sm:text-6xl font-bold font-title mt-1 text-[var(--text-main)]">
          The Map of Aetheria
        </h2>
        <p className="font-subheading text-lg text-[var(--text-muted)] max-w-xl mx-auto mt-2 italic">
          Explore the four enchanted provinces and their ancient rulers.
        </p>
        <div className="flourish-divider max-w-xs mx-auto">
          <span>✦ 🧭 ✦</span>
        </div>
      </div>

      {/* Map Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side Location Selector Cards */}
        <div className="space-y-4">
          {REALM_MAP_LOCATIONS.map((loc) => {
            const isSelected = activeLocation.id === loc.id;

            return (
              <button
                key={loc.id}
                onClick={() => setActiveLocation(loc)}
                className={`w-full text-left p-5 rounded-lg border-2 transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'border-[var(--accent-gold)] bg-[var(--bg-card)] shadow-[var(--shadow-glow)] scale-102'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-card)]/60 hover:border-[var(--accent-gold)]/60'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full border border-[var(--border-gold)] ${
                    isSelected ? 'bg-[var(--accent-gold)] text-black' : 'text-[var(--accent-gold)] bg-[var(--bg-secondary)]'
                  }`}>
                    {getIcon(loc.icon)}
                  </div>
                  <div>
                    <h4 className="font-bold font-heading text-lg text-[var(--text-main)] group-hover:text-[var(--accent-gold)] transition-colors">
                      {loc.name}
                    </h4>
                    <span className="font-subheading text-xs text-[var(--text-muted)] italic">
                      {loc.type}
                    </span>
                  </div>
                </div>

                <Sparkles className={`w-4 h-4 transition-opacity ${isSelected ? 'opacity-100 text-[var(--accent-gold)]' : 'opacity-0'}`} />
              </button>
            );
          })}
        </div>

        {/* Center & Right Parchment Map Display */}
        <div className="lg:col-span-2 manuscript-frame bg-[var(--bg-card)] p-8 sm:p-12 border-2 border-[var(--manuscript-border)] shadow-[var(--shadow-parchment)] relative min-h-[420px] flex flex-col justify-between">
          
          {/* Corner flourishes */}
          <div className="corner-flourish corner-tl" />
          <div className="corner-flourish corner-tr" />
          <div className="corner-flourish corner-bl" />
          <div className="corner-flourish corner-br" />

          {/* Compass Rose Header Graphic */}
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 mb-6">
            <div className="flex items-center gap-3">
              <Compass className="w-8 h-8 text-[var(--accent-gold)] animate-spin-slow" />
              <div>
                <span className="font-title text-xs uppercase tracking-widest text-[var(--text-muted)]">
                  Province Register
                </span>
                <h3 className="font-heading text-2xl font-bold text-[var(--text-main)]">
                  {activeLocation.name}
                </h3>
              </div>
            </div>

            <span className="font-script text-xl text-[var(--accent-gold)] hidden sm:inline">
              Ruler: {activeLocation.ruler}
            </span>
          </div>

          {/* Location Lore Body */}
          <div className="my-4">
            <div className="inline-block px-3 py-1 rounded-full bg-[var(--accent-gold-light)] text-[var(--accent-purple)] font-title text-xs font-bold uppercase tracking-wider mb-4">
              {activeLocation.type}
            </div>

            <p className="font-serif text-lg text-[var(--text-main)] leading-relaxed mb-6">
              "{activeLocation.description}"
            </p>

            <div className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-gold)]/40 flex items-center gap-3 text-sm font-serif">
              <Shield className="w-5 h-5 text-[var(--accent-gold)] flex-shrink-0" />
              <span>
                <strong>Sovereign Leadership:</strong> {activeLocation.ruler} commands this territory with honor under the Celestial Compact.
              </span>
            </div>
          </div>

          {/* Map Grid Illustration Footer */}
          <div className="pt-6 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-serif text-[var(--text-muted)]">
            <span>Coordinates: 42° 18' N, 12° 04' E</span>
            <span className="font-script text-base text-[var(--accent-gold)]">Eldoria Imperial Cartography</span>
          </div>

        </div>

      </div>

    </section>
  );
}
