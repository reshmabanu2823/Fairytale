import React, { useState } from 'react';
import { REALM_MAP_LOCATIONS } from '../data/chaptersData';

export default function RealmMap() {
  const [activeLocation, setActiveLocation] = useState(REALM_MAP_LOCATIONS[0]);

  return (
    <section id="realm-map" className="py-20 px-[5vw] max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="font-accent-italic text-accent-italic text-2xl text-[var(--color-tertiary)] block mb-1">
          Cartography & Imperial Maps
        </span>
        <h2 className="font-display-lg text-3xl sm:text-5xl text-[var(--color-primary)] font-bold">
          The Map of Aetheria
        </h2>
        <p className="font-body-md text-sm sm:text-base text-[var(--text-on-surface-variant)] max-w-xl mx-auto mt-2 italic">
          Explore the four enchanted provinces and their sovereign rulers.
        </p>
      </div>

      {/* Map Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Selector Cards */}
        <div className="space-y-3">
          {REALM_MAP_LOCATIONS.map((loc) => {
            const isSelected = activeLocation.id === loc.id;

            return (
              <button
                key={loc.id}
                onClick={() => setActiveLocation(loc)}
                className={`w-full text-left p-4 rounded-lg border transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'border-[var(--color-primary)] bg-[var(--bg-surface)] shadow-md scale-102'
                    : 'border-[var(--border-outline-variant)]/40 bg-[var(--bg-surface-low)] hover:border-[var(--color-primary)]/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined p-2 rounded-full text-lg ${
                    isSelected ? 'bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)]' : 'text-[var(--color-primary)]'
                  }`}>
                    explore
                  </span>
                  <div>
                    <h4 className="font-bold font-display text-base text-[var(--text-on-surface)] group-hover:text-[var(--color-primary)] transition-colors">
                      {loc.name}
                    </h4>
                    <span className="font-accent-italic text-xs text-[var(--color-tertiary)]">
                      {loc.type}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Parchment Lore Card */}
        <div className="lg:col-span-2 bg-[var(--bg-surface)] p-8 shadow-lg torn-edge-all border border-[var(--border-outline-variant)]/40 relative min-h-[380px] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[var(--border-outline-variant)]/30 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-2xl text-[var(--color-tertiary)]">map</span>
                <div>
                  <span className="font-label-sm text-[10px] text-[var(--text-on-surface-variant)] uppercase">
                    Province Register
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-on-surface)]">
                    {activeLocation.name}
                  </h3>
                </div>
              </div>

              <span className="font-accent-italic text-lg text-[var(--color-tertiary)] hidden sm:inline">
                Ruler: {activeLocation.ruler}
              </span>
            </div>

            <div className="my-4">
              <span className="inline-block px-3 py-1 rounded bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)] font-label-sm text-[10px] uppercase font-bold mb-4">
                {activeLocation.type}
              </span>

              <p className="font-body-md text-base text-[var(--text-on-surface-variant)] leading-relaxed mb-6">
                "{activeLocation.description}"
              </p>

              <div className="p-3 rounded bg-[var(--bg-surface-low)] border border-[var(--border-outline-variant)]/30 flex items-center gap-2 text-xs font-body-md">
                <span className="material-symbols-outlined text-base text-[var(--color-primary)]">shield</span>
                <span>
                  <strong>Sovereign Leadership:</strong> {activeLocation.ruler} commands this territory under the Celestial Compact.
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--border-outline-variant)]/30 flex items-center justify-between text-xs font-label-sm text-[var(--text-on-surface-variant)]">
            <span>Coordinates: 42° 18' N, 12° 04' E</span>
            <span className="font-accent-italic text-sm text-[var(--color-tertiary)]">Eldoria Cartography</span>
          </div>
        </div>
      </div>
    </section>
  );
}
