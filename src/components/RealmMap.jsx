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
    <section id="realm-map" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center mb-14">
        <span className="font-script text-3xl text-[var(--accent-gold)]">Cartography & Lore</span>
        <h2 className="text-4xl sm:text-6xl font-black font-display mt-1 text-[var(--text-main)]">
          The Map of Aetheria
        </h2>
        <p className="font-body text-base sm:text-lg text-[var(--text-muted)] max-w-xl mx-auto mt-2 italic">
          Explore the four enchanted provinces and their sovereign rulers.
        </p>
        <div className="flourish-divider max-w-xs mx-auto">
          <span>✦ 🧭 ✦</span>
        </div>
      </div>

      {/* Map Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Location Selector Cards */}
        <div className="space-y-4">
          {REALM_MAP_LOCATIONS.map((loc) => {
            const isSelected = activeLocation.id === loc.id;

            return (
              <button
                key={loc.id}
                onClick={() => setActiveLocation(loc)}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'border-[var(--accent-magenta)] bg-[var(--bg-card)] shadow-[var(--shadow-pill)] scale-102'
                    : 'border-[var(--border-pink)]/40 bg-[var(--bg-card)]/60 hover:border-[var(--accent-magenta)]/60'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-full border border-[var(--border-pink)] flex items-center justify-center ${
                    isSelected ? 'bg-[var(--accent-magenta)] text-white' : 'text-[var(--accent-magenta)] bg-[var(--bg-secondary)]'
                  }`}>
                    {getIcon(loc.icon)}
                  </div>
                  <div>
                    <h4 className="font-bold font-display text-lg text-[var(--text-main)] group-hover:text-[var(--accent-magenta)] transition-colors">
                      {loc.name}
                    </h4>
                    <span className="font-heading text-xs text-[var(--text-muted)] italic font-semibold">
                      {loc.type}
                    </span>
                  </div>
                </div>

                <Sparkles className={`w-4 h-4 transition-opacity ${isSelected ? 'opacity-100 text-[var(--accent-magenta)]' : 'opacity-0'}`} />
              </button>
            );
          })}
        </div>

        {/* Parchment Map Card */}
        <div className="lg:col-span-2 glass-card p-8 sm:p-12 border-2 border-[var(--border-pink)] shadow-2xl relative min-h-[420px] flex flex-col justify-between">
          
          <div className="flex items-center justify-between border-b border-[var(--border-pink)]/30 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <Compass className="w-8 h-8 text-[var(--accent-magenta)] animate-spin-slow" />
              <div>
                <span className="font-display text-xs uppercase tracking-widest text-[var(--text-muted)] font-bold">
                  Province Register
                </span>
                <h3 className="font-display text-2xl font-bold text-[var(--text-main)]">
                  {activeLocation.name}
                </h3>
              </div>
            </div>

            <span className="font-script text-xl text-[var(--accent-gold)] hidden sm:inline">
              Ruler: {activeLocation.ruler}
            </span>
          </div>

          <div className="my-4">
            <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-[#e02575] to-[#ec4899] text-white font-display text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              {activeLocation.type}
            </div>

            <p className="font-body text-lg text-[var(--text-main)] leading-relaxed mb-6">
              "{activeLocation.description}"
            </p>

            <div className="p-4 rounded-2xl bg-[var(--accent-lilac)]/30 border border-[var(--border-pink)]/40 flex items-center gap-3 text-sm font-body">
              <Shield className="w-5 h-5 text-[var(--accent-magenta)] flex-shrink-0" />
              <span>
                <strong>Sovereign Leadership:</strong> {activeLocation.ruler} commands this territory with honor under the Celestial Compact.
              </span>
            </div>
          </div>

          <div className="pt-6 border-t border-[var(--border-pink)]/30 flex items-center justify-between text-xs font-body text-[var(--text-muted)] font-medium">
            <span>Coordinates: 42° 18' N, 12° 04' E</span>
            <span className="font-script text-base text-[var(--accent-gold)]">Eldoria Imperial Cartography</span>
          </div>

        </div>

      </div>

    </section>
  );
}
