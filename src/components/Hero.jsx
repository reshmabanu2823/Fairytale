import React from 'react';

export default function Hero() {
  return (
    <section className="w-full flex flex-col items-center">
      {/* 1. Hero Banner Section (Retrieved from Attached Zip) */}
      <div className="w-full relative h-[70vh] flex flex-col items-center justify-center overflow-hidden mb-16">
        <div className="absolute inset-0 z-0 bg-[var(--bg-surface-high)]">
          <img
            className="w-full h-full object-cover opacity-80 mix-blend-multiply"
            alt="Sun-dappled magical forest path with lush greenery and ancient trees"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCqT_udrMakSfV0wdR5_SLodKzL0vnWS1p7wO7LEWoNVfdQXVe4xuuavO2njRhbbFVqq1Cttqj1r98uE2VB17kYLq-vspEgdSnGTmsgzALqMn7fWq_NTYiF2phbtzyurkkDo4u1fGUli1TOg-WGWIRD_hKXvGt7ZC9w0Dtk84NoovEgxGalnjAOPV9Hrwn8-wgqojlfEVuFlDCoyin3yO7rpH9kcIO7ZoeMEDqvoGOndo_LHeuqFxLVFTU8R5by4MLvA"
          />
        </div>

        {/* Floating Paper Title Card */}
        <div className="relative z-10 text-center px-[5vw] flex flex-col items-center bg-[var(--bg-surface-container)]/60 backdrop-blur-sm p-8 rounded-lg border border-[var(--border-outline-variant)]/30 transform rotate-1 shadow-lg max-w-3xl">
          <h1 className="font-display-lg text-4xl sm:text-6xl md:text-7xl text-[var(--color-tertiary)] drop-shadow-md mb-4 font-bold tracking-tight">
            AETHERIA
          </h1>
          <p className="font-accent-italic text-accent-italic text-[var(--text-on-surface-variant)] text-lg sm:text-2xl max-w-2xl text-center mb-6">
            Ethereal ephemera and transformation meditations for those ready to find themselves and lay the foundation of their desired life.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#chapters"
              className="bg-[var(--bg-surface)] text-[var(--color-primary)] border border-[var(--color-primary)] px-6 py-2.5 font-label-sm text-xs hover:bg-[var(--color-primary-container)] transition-colors shadow-sm uppercase font-semibold"
            >
              Open Storybook
            </a>
            <a
              href="#archetype-quiz"
              className="text-[var(--text-on-surface-variant)] border-b border-[var(--border-outline)] px-4 py-2.5 font-label-sm text-xs hover:text-[var(--color-primary)] transition-colors uppercase font-semibold"
            >
              Discover Archetype
            </a>
          </div>
        </div>
      </div>

      {/* 2. Scrapbook Moodboard Content Area (Retrieved from Attached Zip) */}
      <div className="w-full bg-[var(--color-primary-container)]/30 px-[5vw] py-16 torn-edge-top torn-edge-bottom relative min-h-screen">
        
        {/* SVG Connector Lines Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none">
          <path className="scribble-line" d="M 200,150 Q 400,200 600,100 T 800,300" />
          <path className="scribble-line" d="M 300,500 C 500,600 200,800 600,900" />
        </svg>

        <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Quote Section */}
          <div className="col-span-1 md:col-span-12 text-center my-6 transform -rotate-2">
            <p className="font-accent-italic text-accent-italic text-[var(--color-primary)] text-2xl md:text-4xl max-w-3xl mx-auto">
              "My development in meditation and botanical observation has profoundly altered my perception of the realm."
            </p>
          </div>

          {/* Scrap 1: Text & Botanical Sketch */}
          <div className="col-span-1 md:col-span-5 flex flex-col gap-4 mt-8 transform rotate-1">
            <div className="bg-[var(--bg-surface)] p-6 shadow-md torn-edge-all relative">
              <p className="font-body-md text-body-md text-[var(--text-on-surface-variant)] leading-relaxed text-sm">
                The flora collected in these pages represents countless hours wandering the eastern glades. Note the delicate structure of the moonflower petals.
              </p>
            </div>

            <div className="relative w-full aspect-square -mt-6 ml-4 z-10 transform -rotate-3">
              <img
                className="w-full h-full object-cover shadow-lg torn-edge-all border-4 border-[var(--bg-surface)]"
                alt="Vintage botanical sketch of a rare flower on aged parchment paper"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXJGjUnSC-yahOVoiyhwqOzPh4-R_yH-st3gkmO2J4LH21BbElmrVAwNf7KolPSfUQAPvJ6-Mi7ARQ9Hkomg3dTdwyapM-B35sgDgs1TLOh8c7465xc5WI129SklilnpH6VmT8OacaBTcmW3kZUq0L33ukrF3C9Qrp0WsY-4epHnXGjC5SVGc5VjyEUlEIBWtNasm815HQ46MPjsdvkfA-40kyQ8I9s1K7u5UKtndSNg5NoxdacGKHkaOeqpnf8BLeoQ"
              />
              <span className="absolute -bottom-4 -right-4 font-accent-italic text-accent-italic text-[var(--color-tertiary)] bg-[var(--bg-surface)]/90 px-3 py-1 rounded transform rotate-6 shadow-xs">
                pacification
              </span>
            </div>
          </div>

          {/* Scrap 2: Vintage Locket Portrait */}
          <div className="col-span-1 md:col-span-4 md:col-start-8 flex flex-col items-center mt-4">
            <div className="relative transform rotate-3">
              <div className="w-48 h-64 rounded-[40%] overflow-hidden vintage-frame shadow-xl">
                <img
                  className="w-full h-full object-cover"
                  alt="A vintage faded photograph of a fairy maiden reading a book in a lush garden, sepia toned"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZHtKSomsLQyC6KMmoU38LaVD_JUkeX2sHP95xCOsJguNUmThEPPX57MVUkZgZh1QEI10lyEZ-kMCB4Qesxqmwy37lt9b-WNE55_V2lmV8Q2Sgasji75AZMDkY_OK6XKptgr_Op-c6t65OWGeTE4qcLz5y1ya7zp-NnwcUe-9JCxS5_MnL4BYBGVaWEiF5pmr51RqHGCFkLiNxP6sa7RezhbrN6a9Z8F3oypZAfG7o4foECDgSl3Df"
                />
              </div>
              <span className="absolute -top-6 -left-8 font-accent-italic text-accent-italic text-[var(--color-secondary)] text-2xl transform -rotate-12">
                happiness
              </span>
            </div>

            <div className="bg-[var(--bg-surface-low)] px-4 py-2 mt-8 transform -rotate-2 border border-[var(--border-outline-variant)] shadow-sm w-52 text-center">
              <p className="font-label-sm text-xs text-[var(--text-on-surface)] font-bold">
                FAIRY GARDEN
              </p>
              <p className="text-[10px] tracking-widest text-[var(--text-on-surface-variant)] uppercase mt-0.5">
                Please step carefully
              </p>
            </div>
          </div>

          {/* Scrap 3: Lower Pond & Swan Image with Text */}
          <div className="col-span-1 md:col-span-6 md:col-start-5 mt-16 flex flex-col md:flex-row items-end gap-4 transform -rotate-1">
            <div className="w-full md:w-1/2 aspect-[4/3] bg-[var(--bg-surface)] p-2 shadow-md rounded">
              <img
                className="w-full h-full object-cover rounded"
                alt="A serene pond with a white swan swimming amongst blooming water lilies, impressionist style"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFSz0VEyktmHwBQ1WA-4D8_ymSS3nOG2Hn5F02hcxCrviyQvDKxKKCDLC1wO5SexymRs90BAthIsBDnEBXghhsSK5tbrW1cyyMjt_svtzxPFo4N0BdIRgBAzAEv_eJNrJ12pBI-E2iBKvGy9V-iiSH_3qOA6y22wjE-9_sXBl82fNW8t1vQVnmEmyosLU1dKt1JPvAFz3oaF2W0p1aq_cO5XA1ymtC28Qieju6Miknmdr19I0CuY48"
              />
            </div>
            <div className="bg-[var(--bg-surface)] p-4 shadow-sm torn-edge-all max-w-xs transform rotate-2 relative">
              <p className="font-body-md text-body-md text-[var(--text-on-surface-variant)] text-xs leading-relaxed">
                Found along the riverbank. The silence here is thick enough to seal inside an envelope.
              </p>
              <span className="absolute -bottom-5 left-4 font-accent-italic text-accent-italic text-[var(--color-primary)] text-xl">
                freedom
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Statement */}
        <div className="mt-16 text-center transform rotate-1 pb-6">
          <p className="font-body-md text-body-md text-[var(--text-on-surface-variant)] max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
            This project is the last opportunity to get in touch with the materials of past streams that have changed the lives of many.
          </p>
        </div>

      </div>
    </section>
  );
}
