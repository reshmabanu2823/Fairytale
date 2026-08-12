import React, { useState } from 'react';
import { ARCHETYPE_QUIZ_QUESTIONS, ARCHETYPE_RESULTS } from '../data/chaptersData';
import { Sparkles, RotateCcw } from 'lucide-react';
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
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#c69d52', '#d8b0b4', '#8f9e8b', '#5c4738'],
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
    <section id="archetype-quiz" className="py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center mb-14">
        <span className="caption-script text-3xl text-[var(--accent-gold-dark)] block">Interactive Quest</span>
        <h2 className="text-4xl sm:text-6xl font-bold font-display uppercase mt-1 text-[var(--text-main)]">
          Discover Your Archetype
        </h2>
        <p className="font-body text-base sm:text-lg text-[var(--text-muted)] max-w-lg mx-auto mt-2 italic">
          Answer 3 fairytale prompts to reveal your soul's calling in Aetheria.
        </p>
        <div className="flourish-divider max-w-xs mx-auto">
          <span>✦ ✨ ✦</span>
        </div>
      </div>

      {/* Quiz Torn Paper Card */}
      <div className="torn-paper p-8 sm:p-12 bg-[var(--bg-card)] border border-[var(--border-sepia)] relative">
        
        {!result ? (
          <div>
            {/* Progress Step Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border-sepia)]">
              <span className="font-display text-xs uppercase tracking-widest text-[var(--text-muted)] font-bold">
                Question {currentQuestion + 1} of {ARCHETYPE_QUIZ_QUESTIONS.length}
              </span>
              
              <div className="flex gap-2">
                {ARCHETYPE_QUIZ_QUESTIONS.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-9 h-2.5 rounded transition-colors ${
                      idx <= currentQuestion
                        ? 'bg-[var(--text-main)]'
                        : 'bg-[var(--bg-secondary)]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question */}
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-main)] mb-8 text-center">
              "{q.question}"
            </h3>

            {/* Options */}
            <div className="space-y-4">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.trait)}
                  className="w-full text-left p-5 rounded border border-[var(--border-sepia)] bg-[var(--bg-card)] hover:bg-[var(--bg-secondary)] transition-all duration-200 font-body text-base text-[var(--text-main)] flex items-center justify-between group font-medium"
                >
                  <span>{opt.text}</span>
                  <Sparkles className="w-4 h-4 text-[var(--accent-gold-dark)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Result Badge Card */
          <div className="text-center py-6 animate-fadeIn">
            
            <div className="wax-seal-badge w-20 h-20 mx-auto text-3xl mb-6 animate-float">
              <span>{result.badge}</span>
            </div>

            <span className="caption-script text-2xl text-[var(--accent-gold-dark)] block">
              Your Fairytale Archetype Revealed
            </span>

            <h3 className="text-3xl sm:text-5xl font-black font-display uppercase text-[var(--text-main)] my-3">
              {result.title}
            </h3>

            <div className="flourish-divider max-w-xs mx-auto my-4">
              <span>✦ 🏆 ✦</span>
            </div>

            <p className="font-body text-lg text-[var(--text-main)] leading-relaxed max-w-xl mx-auto mb-8">
              "{result.description}"
            </p>

            <button
              onClick={handleReset}
              className="btn-minimal mx-auto font-medium uppercase text-xs tracking-wider"
            >
              <RotateCcw className="w-4 h-4 text-[var(--accent-gold-dark)]" />
              <span>Retake the Calling Quiz</span>
            </button>

          </div>
        )}

      </div>

    </section>
  );
}
