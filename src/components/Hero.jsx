import React from 'react';
import { BookOpen, Compass, Feather, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      
      {/* 1. Full-Bleed Magical Forest Photography Banner */}
      <div className="relative w-full min-h-[75vh] sm:min-h-[82vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(20, 15, 10, 0.45) 0%, rgba(35, 25, 18, 0.65) 100%), url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=80')`
        }}
      >
        {/* Sun-dappled Light Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-400/20 via-transparent to-transparent pointer-events-none" />

        {/* Vintage Botanical Crest Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-amber-200/40 bg-black/40 text-amber-200 text-xs font-serif tracking-widest uppercase mb-6 backdrop-blur-md">
          <Feather className="w-3.5 h-3.5" />
          <span>Vol. IV • Antique Journal & Moodboard</span>
          <Feather className="w-3.5 h-3.5" />
        </div>

        {/* Bold Editorial Serif Display Title (MEDITATION INSIGHT style) */}
        <h1 className="text-5xl sm:text-7xl md:text-9xl font-black font-display tracking-tight text-[#f7f2e7] max-w-6xl mb-4 uppercase drop-shadow-md">
          Tales of Aetheria
        </h1>

        {/* Handwritten Italic Caption */}
        <p className="caption-script text-2xl sm:text-4xl text-amber-200 italic mb-8 max-w-2xl text-shadow-sm">
          "My development in fairytale magic has changed my life"
        </p>

        {/* Minimal Understated Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 z-10">
          <a
            href="#chapters"
            className="btn-minimal bg-[#f7f2e7] text-[#36291e] hover:bg-[#36291e] hover:text-[#f7f2e7] font-medium"
          >
            <BookOpen className="w-4 h-4" />
            <span>Open Storybook</span>
          </a>
          
          <a
            href="#archetype-quiz"
            className="btn-minimal bg-transparent text-white border-white/60 hover:bg-white hover:text-[#36291e] font-medium"
          >
            <Compass className="w-4 h-4" />
            <span>Discover Archetype</span>
          </a>
        </div>
      </div>

      {/* 2. Soft Blush Pink Scrapbook Spread Content Section below Hero */}
      <div className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#e8c5c8] text-[#36291e] border-t border-b border-[#d8b0b4]">
        
        {/* SVG Looping Connector Thread Lines across Asymmetric Scrapbook Elements */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 150 180 C 350 80, 550 350, 750 180 C 950 40, 1100 450, 850 550"
            fill="none"
            stroke="#4a3a2c"
            strokeWidth="1.8"
            strokeDasharray="5 4"
          />
        </svg>

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Quote Header */}
          <div className="text-center mb-16">
            <span className="caption-script text-3xl sm:text-4xl text-[#7c2a38] block mb-2">
              "Whispers from the Sun-Dappled Glade"
            </span>
            <p className="font-heading text-lg sm:text-xl text-[#5c4738] max-w-2xl mx-auto italic font-medium">
              A curated collection of vintage lore, botanical cutouts, and ancient kingdom chronicles.
            </p>
          </div>

          {/* Asymmetric Scrapbook Moodboard Spread Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            
            {/* Collage Item 1: Torn Newspaper Snippet & Vintage Photo */}
            <div className="relative group self-start">
              <div className="torn-paper p-6 bg-[#f7f2e7] transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                <span className="caption-script text-xl text-[#7c2a38] block mb-1">
                  happiness
                </span>
                <p className="font-serif text-xs text-[#5c4738] leading-relaxed mb-4">
                  150 to 200 lbs. The flesh of elder oaks is resilient and sweet. In 5 years, values alter...
                </p>
                <div className="w-full h-44 rounded overflow-hidden border border-[#d8b0b4]">
                  <img
                    src="https://images.unsplash.com/photo-1511497584788-876761c11969?auto=format&fit=crop&w=800&q=80"
                    alt="Sunlit Forest Glade"
                    className="w-full h-full object-cover filter sepia-25"
                  />
                </div>
              </div>
              <span className="caption-script text-lg text-[#5c4738] block mt-2 ml-4">
                pacification
              </span>
            </div>

            {/* Collage Item 2: Vintage Gold Oval Locket / Mirror Frame Centerpiece */}
            <div className="flex flex-col items-center justify-center my-4 md:my-0">
              <div className="locket-frame shadow-2xl hover:scale-105 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
                  alt="Fairy Realm Portrait"
                />
              </div>

              {/* Wax Seal Badge Cutout */}
              <div className="wax-seal-badge -mt-6 z-20">
                <span>✦</span>
              </div>

              <span className="caption-script text-2xl text-[#7c2a38] mt-3">
                fairy garden
              </span>
            </div>

            {/* Collage Item 3: Botanical Cutout & Newspaper Snippet */}
            <div className="relative group self-end">
              <div className="torn-paper p-6 bg-[#f7f2e7] transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="w-full h-44 rounded overflow-hidden mb-3 border border-[#d8b0b4]">
                  <img
                    src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80"
                    alt="Wild Woodland Ferns"
                    className="w-full h-full object-cover filter sepia-25"
                  />
                </div>
                <p className="font-serif text-xs text-[#5c4738] leading-relaxed">
                  and length preserved. My imagination, unbidden, gifted me with a vividness far beyond warmth...
                </p>
                <span className="caption-script text-xl text-[#7c2a38] block mt-2 text-right">
                  freedom
                </span>
              </div>
            </div>

          </div>

          {/* Bottom Editorial Caption Statement */}
          <div className="mt-16 text-center pt-8 border-t border-[#d8b0b4]">
            <p className="font-heading text-lg sm:text-2xl text-[#36291e] max-w-3xl mx-auto italic">
              "This project is the last opportunity to get in touch with the materials of past streams that have changed the lives of many."
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}
