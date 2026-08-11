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
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#e02575', '#ec4899', '#fbbf24', '#c084fc'],
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
        <span className="font-script text-3xl text-[var(--accent-gold)]">Interactive Quest</span>
        <h2 className="text-4xl sm:text-6xl font-black font-display mt-1 text-[var(--text-main)]">
          Discover Your Archetype
        </h2>
        <p className="font-body text-base sm:text-lg text-[var(--text-muted)] max-w-lg mx-auto mt-2 italic">
          Answer 3 fairytale prompts to reveal your soul's calling in Aetheria.
        </p>
        <div className="flourish-divider max-w-xs mx-auto">
          <span>✦ ✨ ✦</span>
        </div>
      </div>

      {/* Quiz Glassmorphic Card */}
      <div className="glass-card p-8 sm:p-12 border-2 border-[var(--border-pink)] shadow-2xl relative">
        
        {!result ? (
          <div>
            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border-pink)]/30">
              <span className="font-display text-xs uppercase tracking-widest text-[var(--accent-magenta)] font-bold">
                Question {currentQuestion + 1} of {ARCHETYPE_QUIZ_QUESTIONS.length}
              </span>
              
              <div className="flex gap-2">
                {ARCHETYPE_QUIZ_QUESTIONS.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-9 h-2.5 rounded-full transition-colors ${
                      idx <= currentQuestion
                        ? 'bg-gradient-to-r from-[#e02575] to-[#ec4899]'
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
                  className="w-full text-left p-5 rounded-2xl border-2 border-[var(--border-pink)]/40 bg-[var(--bg-card)] hover:border-[var(--accent-magenta)] hover:bg-[var(--accent-lilac)]/30 transition-all duration-300 font-body text-base text-[var(--text-main)] flex items-center justify-between group font-medium shadow-sm"
                >
                  <span>{opt.text}</span>
                  <Sparkles className="w-4 h-4 text-[var(--accent-magenta)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Result Badge Card */
          <div className="text-center py-6 animate-fadeIn">
            
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#e02575] via-[#ec4899] to-[#fbbf24] p-0.5 shadow-xl mb-6 flex items-center justify-center text-3xl animate-float">
              <div className="w-full h-full bg-[var(--bg-card)] rounded-full flex items-center justify-center">
                {result.badge}
              </div>
            </div>

            <span className="font-script text-2xl text-[var(--accent-gold)] block">
              Your Fairytale Archetype Revealed
            </span>

            <h3 className="text-3xl sm:text-5xl font-black font-display text-[var(--text-main)] my-3">
              {result.title}
            </h3>

            <div className="flourish-divider max-w-xs mx-auto my-4">
              <span>✦ 🏆 ✦</span>
            </div>

            <p className="font-body text-lg text-[var(--text-main)] leading-relaxed max-w-xl mx-auto mb-8 font-normal">
              "{result.description}"
            </p>

            <button
              onClick={handleReset}
              className="btn-pill-outline mx-auto font-bold"
            >
              <RotateCcw className="w-4 h-4 text-[var(--accent-magenta)]" />
              <span>Retake the Calling Quiz</span>
            </button>

          </div>
        )}

      </div>

    </section>
  );
}
