import React, { useState } from 'react';
import { Volume2, VolumeX, Feather } from 'lucide-react';

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
    <section id="about" className="py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative">
      
      {/* Section Header */}
      <div className="text-center mb-14">
        <span className="caption-script text-3xl text-[var(--accent-gold-dark)] block">Prologue</span>
        <h2 className="text-4xl sm:text-6xl font-bold font-display uppercase mt-1 text-[var(--text-main)]">
          The Chronicles of Eldoria
        </h2>
        <div className="flourish-divider max-w-xs mx-auto">
          <span>✦ 🌿 ✦</span>
        </div>
      </div>

      {/* Main Torn Paper Journal Container */}
      <div className="torn-paper p-8 sm:p-14 bg-[var(--bg-card)] border border-[var(--border-sepia)] relative">
        
        {/* Story Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 pb-6 border-b border-[var(--border-sepia)]">
          <button
            onClick={() => { setActiveTab('lore'); setIsSpeaking(false); window.speechSynthesis?.cancel(); }}
            className={`btn-minimal-icon ${activeTab === 'lore' ? 'bg-[var(--text-main)] text-[var(--bg-primary)]' : ''}`}
          >
            The Realm Lore
          </button>
          <button
            onClick={() => { setActiveTab('guild'); setIsSpeaking(false); window.speechSynthesis?.cancel(); }}
            className={`btn-minimal-icon ${activeTab === 'guild' ? 'bg-[var(--text-main)] text-[var(--bg-primary)]' : ''}`}
          >
            Storysmith Guild
          </button>
          <button
            onClick={() => { setActiveTab('fate'); setIsSpeaking(false); window.speechSynthesis?.cancel(); }}
            className={`btn-minimal-icon ${activeTab === 'fate' ? 'bg-[var(--text-main)] text-[var(--bg-primary)]' : ''}`}
          >
            Weavers of Fate
          </button>
        </div>

        {/* Narrative Text Content */}
        <div className="relative">
          
          {/* Audio Speech Narration Toggle Button */}
          <button
            onClick={handleSpeak}
            className={`btn-minimal-icon absolute top-0 right-0 ${
              isSpeaking ? 'bg-[var(--accent-sage-dark)] text-white' : ''
            }`}
            title={isSpeaking ? "Stop Narration" : "Listen to Narrator"}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[var(--accent-gold-dark)]" />}
            <span className="hidden sm:inline font-body text-xs">
              {isSpeaking ? "Stop Voice" : "Listen to Legend"}
            </span>
          </button>

          <h3 className="text-2xl sm:text-3xl font-bold font-display text-[var(--text-main)] mb-6 pr-36">
            {currentContent.title}
          </h3>

          <p className="drop-cap text-lg text-[var(--text-main)] leading-relaxed mb-6 font-body">
            {currentContent.text}
          </p>

          <blockquote className="border-l-4 border-[var(--accent-gold)] pl-5 italic font-heading text-[var(--text-muted)] text-lg my-8 bg-[var(--bg-secondary)]/50 py-4 rounded-r-lg">
            {currentContent.quote}
          </blockquote>

        </div>

        {/* Closing Signature & Wax Seal */}
        <div className="mt-10 pt-6 border-t border-[var(--border-sepia)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Feather className="w-5 h-5 text-[var(--accent-gold-dark)]" />
            <span className="caption-script text-2xl text-[var(--text-main)]">
              Chronicles Keeper Morwenna
            </span>
          </div>

          <div className="wax-seal-badge">
            <span>★</span>
          </div>
        </div>

      </div>

    </section>
  );
}
