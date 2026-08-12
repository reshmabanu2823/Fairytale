import React, { useState } from 'react';
import { ARCHETYPE_QUIZ_QUESTIONS, ARCHETYPE_RESULTS } from '../data/chaptersData';
import confetti from 'canvas-confetti';

export default function ArchetypeQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleSelectOption = (trait) => {
    const newAnswers = { ...selectedAnswers, [currentQuestion]: trait };
    setSelectedAnswers(newAnswers);

    if (currentQuestion < ARCHETYPE_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const counts = {};
      Object.values(newAnswers).forEach((t) => {
        counts[t] = (counts[t] || 0) + 1;
      });

      let winner = Object.keys(counts)[0];
      let maxCount = 0;
      for (const [key, val] of Object.entries(counts)) {
        if (val > maxCount) {
          maxCount = val;
          winner = key;
        }
      }

      setResult(ARCHETYPE_RESULTS[winner] || ARCHETYPE_RESULTS["Starlight Scholar"]);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#795556', '#e5b8b8', '#526442', '#775a19'],
        });
      } catch (e) {}
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setResult(null);
  };

  const q = ARCHETYPE_QUIZ_QUESTIONS[currentQuestion];

  return (
    <section id="archetype-quiz" className="py-20 px-[5vw] max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="font-accent-italic text-accent-italic text-2xl text-[var(--color-tertiary)] block mb-1">
          Interactive Folklore Quest
        </span>
        <h2 className="font-display-lg text-3xl sm:text-5xl text-[var(--color-primary)] font-bold">
          Discover Your Archetype
        </h2>
        <p className="font-body-md text-sm sm:text-base text-[var(--text-on-surface-variant)] max-w-lg mx-auto mt-2 italic">
          Answer 3 fairytale prompts to reveal your soul's calling in Aetheria.
        </p>
      </div>

      {/* Quiz Card */}
      <div className="bg-[var(--bg-surface)] p-8 sm:p-12 shadow-lg torn-edge-all border border-[var(--border-outline-variant)]/40 relative">
        {!result ? (
          <div>
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-[var(--border-outline-variant)]/30">
              <span className="font-label-sm text-xs text-[var(--text-on-surface-variant)] uppercase font-bold">
                Question {currentQuestion + 1} of {ARCHETYPE_QUIZ_QUESTIONS.length}
              </span>

              <div className="flex gap-1.5">
                {ARCHETYPE_QUIZ_QUESTIONS.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-8 h-2 rounded-full transition-colors ${
                      idx <= currentQuestion
                        ? 'bg-[var(--color-primary)]'
                        : 'bg-[var(--bg-surface-low)]'
                    }`}
                  />
                ))}
              </div>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-on-surface)] mb-6 text-center">
              "{q.question}"
            </h3>

            <div className="space-y-3">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.trait)}
                  className="w-full text-left p-4 rounded border border-[var(--border-outline-variant)]/40 bg-[var(--bg-surface-low)] hover:bg-[var(--color-primary-container)]/40 transition-colors font-body-md text-sm text-[var(--text-on-surface)] flex items-center justify-between group"
                >
                  <span>{opt.text}</span>
                  <span className="material-symbols-outlined text-sm text-[var(--color-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity">
                    arrow_forward
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Result Badge Card */
          <div className="text-center py-4 animate-fadeIn">
            <div className="w-16 h-16 mx-auto rounded-full bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)] text-2xl flex items-center justify-center mb-4 shadow-md">
              {result.badge}
            </div>

            <span className="font-accent-italic text-xl text-[var(--color-tertiary)] block">
              Your Realm Archetype Revealed
            </span>

            <h3 className="text-2xl sm:text-4xl font-bold font-display text-[var(--text-on-surface)] my-2">
              {result.title}
            </h3>

            <p className="font-body-md text-sm text-[var(--text-on-surface-variant)] leading-relaxed max-w-lg mx-auto mb-6">
              "{result.description}"
            </p>

            <button
              onClick={handleReset}
              className="bg-[var(--color-primary)] text-white px-5 py-2.5 rounded-full font-label-sm text-xs hover:bg-[var(--color-primary)]/90 transition-colors shadow-xs"
            >
              Retake the Calling Quiz
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
