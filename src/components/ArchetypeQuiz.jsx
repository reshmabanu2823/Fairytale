import React, { useState } from 'react';
import { ARCHETYPE_QUIZ_QUESTIONS, ARCHETYPE_RESULTS } from '../data/chaptersData';
import { Sparkles, Award, RotateCcw, Compass, CheckCircle2 } from 'lucide-react';
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
      // Calculate archetype result
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

      // Trigger Confetti Golden Burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#c69438', '#f5d77f', '#b85c72', '#4a227b'],
        });
      } catch (e) {
        // Confetti fallback
      }
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setResult(null);
  };

  const q = ARCHETYPE_QUIZ_QUESTIONS[currentQuestion];

  return (
    <section id="archetype-quiz" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Section Title Header */}
      <div className="text-center mb-12">
        <span className="font-script text-3xl text-[var(--accent-gold)]">Interactive Quest</span>
        <h2 className="text-4xl sm:text-6xl font-bold font-title mt-1 text-[var(--text-main)]">
          Discover Your Archetype
        </h2>
        <p className="font-subheading text-lg text-[var(--text-muted)] max-w-lg mx-auto mt-2 italic">
          Answer 3 fairytale prompts to reveal your soul's calling in Aetheria.
        </p>
        <div className="flourish-divider max-w-xs mx-auto">
          <span>✦ ✨ ✦</span>
        </div>
      </div>

      {/* Main Quiz Parchment Card */}
      <div className="manuscript-frame bg-[var(--bg-card)] p-8 sm:p-12 border-2 border-[var(--manuscript-border)] shadow-[var(--shadow-parchment)] relative">
        
        {/* Corner flourishes */}
        <div className="corner-flourish corner-tl" />
        <div className="corner-flourish corner-tr" />
        <div className="corner-flourish corner-bl" />
        <div className="corner-flourish corner-br" />

        {!result ? (
          <div>
            {/* Progress Step Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border-subtle)]">
              <span className="font-title text-xs uppercase tracking-widest text-[var(--accent-gold)] font-bold">
                Question {currentQuestion + 1} of {ARCHETYPE_QUIZ_QUESTIONS.length}
              </span>
              
              <div className="flex gap-1.5">
                {ARCHETYPE_QUIZ_QUESTIONS.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-8 h-2 rounded-full transition-colors ${
                      idx <= currentQuestion ? 'bg-[var(--accent-gold)]' : 'bg-[var(--bg-secondary)]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question Prompt */}
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--text-main)] mb-8 text-center">
              "{q.question}"
            </h3>

            {/* Answer Options */}
            <div className="space-y-4">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.trait)}
                  className="w-full text-left p-5 rounded-lg border-2 border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)] hover:bg-[var(--accent-gold-light)]/40 transition-all duration-300 font-serif text-base text-[var(--text-main)] flex items-center justify-between group"
                >
                  <span>{opt.text}</span>
                  <Sparkles className="w-4 h-4 text-[var(--accent-gold)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Result Parchment Badge Presentation */
          <div className="text-center py-6 animate-fadeIn">
            
            <div className="wax-seal w-20 h-20 mx-auto text-3xl mb-6 shadow-xl animate-float">
              {result.badge}
            </div>

            <span className="font-script text-2xl text-[var(--accent-gold)] block">
              Your Fairytale Archetype Revealed
            </span>

            <h3 className="text-3xl sm:text-4xl font-bold font-title text-[var(--text-main)] my-3">
              {result.title}
            </h3>

            <div className="flourish-divider max-w-xs mx-auto my-4">
              <span>✦ 🏆 ✦</span>
            </div>

            <p className="font-serif text-lg text-[var(--text-main)] leading-relaxed max-w-xl mx-auto mb-8">
              "{result.description}"
            </p>

            <button
              onClick={handleReset}
              className="btn-fairytale-outline mx-auto"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake the Calling Quiz</span>
            </button>

          </div>
        )}

      </div>

    </section>
  );
}
