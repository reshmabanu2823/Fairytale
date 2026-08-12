import React, { useState } from 'react';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('lore');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const tabContents = {
    lore: {
      title: "The Legend of Aetheria",
      text: "Beyond the mist of ordinary time lies Aetheria—a realm forged when celestial starlight rained upon primordial elder trees. For centuries, our kingdom thrived under the harmonious guard of four ancient guilds: the Sylvan Druids, the Starlight Astronomers, the Ocean Siren Weavers, and the Brass Artificers. Every breeze carries forgotten fables, and every stone remembers the song of its creation.",
      quote: "'Walk softly upon these pages, for here the boundary between ink and magic vanishes.'"
    },
    guild: {
      title: "The Guild of Storysmiths",
      text: "We are the Keepers of the Whispering Codex. Our scribes travel from the crystal spires of Mount Celestia to the bioluminescent trenches of the Sapphire Gulf, gathering tales before they fade into shadow. Bound in linen and illuminated with warm gold leaf, each chronicle is preserved for dreamers across eras.",
      quote: "'A story forgotten is a star extinguished; a story retold is a flame reborn.'"
    },
    fate: {
      title: "The Weavers of Destiny",
      text: "In Aetheria, destiny is not written in stone, but woven on star-looms with threads of stardust and shadow. Visitors to our folio are not mere readers—they are wanderers whose presence awakens the slumbering magic within these illuminated pages.",
      quote: "'Listen closely: the book is reading you, even as you read the book.'"
    }
  };

  const currentContent = tabContents[activeTab];

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      alert("Speech synthesis is not supported in this browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentContent.text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <section id="about" className="py-20 px-[5vw] max-w-5xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="font-accent-italic text-accent-italic text-2xl text-[var(--color-tertiary)] block mb-1">
          Prologue Grimoire
        </span>
        <h2 className="font-display-lg text-3xl sm:text-5xl text-[var(--color-primary)] font-bold">
          The Chronicles of Eldoria
        </h2>
      </div>

      {/* Main Torn Edge Card */}
      <div className="bg-[var(--bg-surface)] p-8 sm:p-12 shadow-lg torn-edge-all border border-[var(--border-outline-variant)]/40 relative">
        {/* Story Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8 pb-4 border-b border-[var(--border-outline-variant)]/30">
          <button
            onClick={() => { setActiveTab('lore'); setIsSpeaking(false); window.speechSynthesis?.cancel(); }}
            className={`px-4 py-2 rounded-full font-label-sm text-xs transition-colors ${
              activeTab === 'lore'
                ? 'bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)] font-bold'
                : 'text-[var(--text-on-surface-variant)] hover:text-[var(--color-primary)]'
            }`}
          >
            The Realm Lore
          </button>
          <button
            onClick={() => { setActiveTab('guild'); setIsSpeaking(false); window.speechSynthesis?.cancel(); }}
            className={`px-4 py-2 rounded-full font-label-sm text-xs transition-colors ${
              activeTab === 'guild'
                ? 'bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)] font-bold'
                : 'text-[var(--text-on-surface-variant)] hover:text-[var(--color-primary)]'
            }`}
          >
            Storysmith Guild
          </button>
          <button
            onClick={() => { setActiveTab('fate'); setIsSpeaking(false); window.speechSynthesis?.cancel(); }}
            className={`px-4 py-2 rounded-full font-label-sm text-xs transition-colors ${
              activeTab === 'fate'
                ? 'bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)] font-bold'
                : 'text-[var(--text-on-surface-variant)] hover:text-[var(--color-primary)]'
            }`}
          >
            Weavers of Fate
          </button>
        </div>

        {/* Narrative Text Content */}
        <div className="relative">
          {/* Audio Speech Narration Toggle Button */}
          <button
            onClick={handleSpeak}
            className={`absolute top-0 right-0 px-3 py-1.5 rounded-full border border-[var(--border-outline-variant)] text-xs font-label-sm flex items-center gap-1.5 transition-colors ${
              isSpeaking
                ? 'bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] font-bold'
                : 'bg-[var(--bg-surface-low)] text-[var(--text-on-surface-variant)] hover:text-[var(--color-primary)]'
            }`}
            title={isSpeaking ? "Stop Narration" : "Listen to Narrator"}
          >
            <span className="material-symbols-outlined text-base">
              {isSpeaking ? 'volume_off' : 'volume_up'}
            </span>
            <span className="hidden sm:inline">
              {isSpeaking ? "Stop Voice" : "Listen"}
            </span>
          </button>

          <h3 className="text-2xl sm:text-3xl font-bold font-display text-[var(--color-primary)] mb-4 pr-32">
            {currentContent.title}
          </h3>

          <p className="drop-cap font-body-md text-base sm:text-lg text-[var(--text-on-surface-variant)] leading-relaxed mb-6">
            {currentContent.text}
          </p>

          <blockquote className="border-l-4 border-[var(--color-tertiary)] pl-4 font-accent-italic text-accent-italic text-[var(--color-tertiary)] text-xl my-6 bg-[var(--bg-surface-low)] py-3 rounded-r-lg">
            {currentContent.quote}
          </blockquote>
        </div>

        {/* Closing Signature */}
        <div className="mt-8 pt-4 border-t border-[var(--border-outline-variant)]/30 flex items-center justify-between">
          <span className="font-accent-italic text-2xl text-[var(--color-primary)]">
            Chronicles Keeper Morwenna
          </span>
          <span className="font-label-sm text-xs text-[var(--color-tertiary)]">
            ARCHIVAL EMBLEM
          </span>
        </div>
      </div>
    </section>
  );
}
