import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Feather, ScrollText, ShieldAlert } from 'lucide-react';

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
      text: "We are the Keepers of the Whispering Codex. Our scribes travel from the crystal spires of Mount Celestia to the bioluminescent trenches of the Sapphire Gulf, gathering tales before they fade into shadow. Bound in leather and illuminated with gold leaf, each chronicle is preserved for dreamers across eras.",
      quote: "'A story forgotten is a star extinguished; a story retold is a flame reborn.'"
    },
    fate: {
      title: "The Weavers of Destiny",
      text: "In Aetheria, destiny is not written in stone, but woven on star-looms with threads of stardust and shadow. Visitors to our folio are not mere readers—they are wanderers whose presence awakens the slumbering magic within these illuminated pages.",
      quote: "'Listen closely: the book is reading you, even as you read the book.'"
    }
  };

  const currentContent = tabContents[activeTab];

  // Web Speech API Narrator
  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech narration is not supported in this browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentContent.text);
      utterance.rate = 0.9; // Slightly slower, majestic tone
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="font-script text-3xl text-[var(--accent-gold)]">Prologue</span>
        <h2 className="text-3xl sm:text-5xl font-bold font-title mt-1 text-[var(--text-main)]">
          The Chronicles of Eldoria
        </h2>
        <div className="flourish-divider max-w-xs mx-auto">
          <span>✦ 📜 ✦</span>
        </div>
      </div>

      {/* Main Parchment Book Layout Container */}
      <div className="manuscript-frame relative bg-[var(--bg-card)] p-8 sm:p-12 border-2 border-[var(--manuscript-border)] shadow-[var(--shadow-parchment)]">
        
        {/* Illuminated Corner Flourishes */}
        <div className="corner-flourish corner-tl" />
        <div className="corner-flourish corner-tr" />
        <div className="corner-flourish corner-bl" />
        <div className="corner-flourish corner-br" />

        {/* Story Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8 border-b border-[var(--border-subtle)] pb-4">
          <button
            onClick={() => { setActiveTab('lore'); setIsSpeaking(false); window.speechSynthesis?.cancel(); }}
            className={`px-4 py-2 rounded-full font-subheading text-sm transition-all ${
              activeTab === 'lore'
                ? 'bg-[var(--accent-gold)] text-black font-bold shadow-md'
                : 'text-[var(--text-muted)] hover:text-[var(--accent-gold)]'
            }`}
          >
            The Realm Lore
          </button>
          <button
            onClick={() => { setActiveTab('guild'); setIsSpeaking(false); window.speechSynthesis?.cancel(); }}
            className={`px-4 py-2 rounded-full font-subheading text-sm transition-all ${
              activeTab === 'guild'
                ? 'bg-[var(--accent-gold)] text-black font-bold shadow-md'
                : 'text-[var(--text-muted)] hover:text-[var(--accent-gold)]'
            }`}
          >
            Storysmith Guild
          </button>
          <button
            onClick={() => { setActiveTab('fate'); setIsSpeaking(false); window.speechSynthesis?.cancel(); }}
            className={`px-4 py-2 rounded-full font-subheading text-sm transition-all ${
              activeTab === 'fate'
                ? 'bg-[var(--accent-gold)] text-black font-bold shadow-md'
                : 'text-[var(--text-muted)] hover:text-[var(--accent-gold)]'
            }`}
          >
            Weavers of Fate
          </button>
        </div>

        {/* Narrative Text Content */}
        <div className="relative">
          
          {/* Audio Speech Narration Toggle */}
          <button
            onClick={handleSpeak}
            className={`absolute top-0 right-0 p-2 rounded-full border border-[var(--border-gold)] transition-all flex items-center gap-2 text-xs font-serif ${
              isSpeaking
                ? 'bg-[var(--accent-rose)] text-white shadow-md animate-pulse'
                : 'bg-[var(--bg-secondary)] text-[var(--text-main)] hover:border-[var(--accent-gold)]'
            }`}
            title={isSpeaking ? "Stop Narration" : "Listen to Narrator"}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[var(--accent-gold)]" />}
            <span className="hidden sm:inline font-subheading">
              {isSpeaking ? "Stop Voice" : "Listen to Legend"}
            </span>
          </button>

          <h3 className="text-2xl font-bold font-heading text-[var(--accent-gold)] mb-4 pr-32">
            {currentContent.title}
          </h3>

          <p className="drop-cap text-lg text-[var(--text-main)] leading-relaxed mb-6 font-serif">
            {currentContent.text}
          </p>

          <blockquote className="border-l-4 border-[var(--accent-gold)] pl-4 italic font-subheading text-[var(--text-muted)] text-base my-6 bg-[var(--bg-secondary)]/50 py-3 rounded-r-lg">
            {currentContent.quote}
          </blockquote>

        </div>

        {/* Closing Signature & Wax Seal */}
        <div className="mt-10 pt-6 border-t border-[var(--border-subtle)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Feather className="w-5 h-5 text-[var(--accent-gold)]" />
            <span className="font-script text-2xl text-[var(--text-main)]">
              Chronicles Keeper Morwenna
            </span>
          </div>

          <div className="wax-seal" title="Authentic Eldoria Archival Seal">
            ★
          </div>
        </div>

      </div>

    </section>
  );
}
