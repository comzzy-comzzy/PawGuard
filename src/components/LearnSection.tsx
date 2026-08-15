import React, { useState } from 'react';
import { EDUCATIONAL_ARTICLES } from '../data/mockData';
import { BookOpen, ShieldCheck, HeartPulse, Eye, HelpCircle, CheckCircle2, XCircle, Award } from 'lucide-react';
import { playClickSound, playHeartPop } from '../utils/audio';
import confetti from 'canvas-confetti';

export const LearnSection: React.FC = () => {
  const [selectedArticleId, setSelectedArticleId] = useState(EDUCATIONAL_ARTICLES[0].id);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const activeArticle = EDUCATIONAL_ARTICLES.find(a => a.id === selectedArticleId) || EDUCATIONAL_ARTICLES[0];

  const quizQuestions = [
    {
      question: "If a dog turns its head away and shows the whites of its eyes ('whale eye'), what does this usually signify?",
      options: [
        "The dog is feeling playful and wants to wrestle",
        "The dog is feeling highly stressed, fearful, or defensive",
        "The dog is sleepy and bored",
        "The dog is asserting alpha dominance"
      ],
      correct: 1,
      explanation: "'Whale eye' is a classic canine fear signal indicating the dog feels trapped, anxious, or threatened."
    },
    {
      question: "What is the safest emergency first-aid treatment for a dog suffering from severe heatstroke?",
      options: [
        "Submerge the entire dog in an ice water bath",
        "Force 2 liters of ice cold water down the dog's throat",
        "Move to shade, offer small water sips, and apply cool (not ice) water to paw pads and neck",
        "Cover the dog in thick blankets to sweat out the heat"
      ],
      correct: 2,
      explanation: "Ice cold water causes peripheral vasoconstriction, trapping internal body heat and causing dangerous shock. Use cool water on extremities."
    },
    {
      question: "Under most modern animal cruelty laws, which of the following is considered illegal neglect?",
      options: [
        "Feeding kibble instead of expensive raw meat",
        "Continuous 24/7 tethering on a short chain without potable water or weather shelter",
        "Not dressing a dog in a winter sweater",
        "Not taking a dog to a professional grooming salon every month"
      ],
      correct: 1,
      explanation: "Denial of clean potable water, failure to provide protection from extreme elements, and continuous chaining are legally enforceable misdemeanor or felony cruelty acts."
    }
  ];

  const handleSelectQuiz = (qIdx: number, optIdx: number) => {
    playClickSound();
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleGradeQuiz = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) {
        score++;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
    playHeartPop();

    if (score === quizQuestions.length) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#3aa866', '#b87d55', '#3d97ca']
      });
    }
  };

  return (
    <section id="learn" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#faefe4] border-b border-[#eedccb]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-[#fbe9dd] text-[#8a5b3a] border border-[#e5cfbd] text-xs font-fredoka font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Humane Dog Education & Advocacy</span>
          </div>

          <h2 className="font-fredoka text-3xl sm:text-4xl md:text-5xl font-bold text-[#26160d]">
            Learn How to Protect & Advocate for Dogs
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#6b4c38]">
            Knowledge saves lives. Learn how to decode dog body language, spot silent symptoms of neglect, legally document cruelty, and provide emergency first-aid.
          </p>
        </div>

        {/* Article Tabs & Reader */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Article Nav List (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            {EDUCATIONAL_ARTICLES.map((article) => {
              const isSelected = selectedArticleId === article.id;
              return (
                <button
                  key={article.id}
                  onClick={() => {
                    playClickSound();
                    setSelectedArticleId(article.id);
                  }}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
                    isSelected
                      ? 'bg-white border-[#4a2e1b] shadow-md scale-[1.02]'
                      : 'bg-[#fbf6f0] border-[#ebd7c3] hover:bg-white text-[#6b442b]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-fredoka font-bold text-[#b87d55] bg-[#faefe4] px-2 py-0.5 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-[#8a6853] text-[11px]">{article.readTime}</span>
                  </div>

                  <h3 className="font-fredoka text-base font-bold text-[#352018] leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#7e5c46] line-clamp-2 mt-1.5">
                    {article.summary}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Article Full View (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#ebd7c3] shadow-md space-y-6">
            <div className="border-b border-[#f4ece1] pb-4 space-y-2">
              <span className="font-fredoka text-xs font-bold text-[#b87d55] uppercase tracking-wider bg-[#faefe4] px-3 py-1 rounded-full">
                {activeArticle.category} • {activeArticle.readTime}
              </span>
              <h3 className="font-fredoka text-2xl sm:text-3xl font-bold text-[#26160d]">
                {activeArticle.title}
              </h3>
              <p className="text-sm font-medium text-[#8a5b3a] italic">
                {activeArticle.summary}
              </p>
            </div>

            <div className="text-sm text-[#4a2e1b] leading-relaxed space-y-4 font-sans whitespace-pre-line">
              {activeArticle.content}
            </div>

            <div className="p-4 rounded-2xl bg-[#faefe4] border border-[#ebd7c3] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#6b442b]">
                <span>Share this guide to educate your community:</span>
              </div>
              <button
                onClick={() => {
                  playClickSound();
                  navigator.clipboard?.writeText(window.location.href);
                  alert('Guide link copied! Share with friends to prevent cruelty.');
                }}
                className="text-xs font-fredoka font-semibold bg-[#4a2e1b] text-white px-4 py-2 rounded-full shadow"
              >
                Copy Link
              </button>
            </div>
          </div>

        </div>

        {/* Interactive "Dog-Smart Hero" Quiz */}
        <div className="bg-white rounded-3xl border-2 border-[#4a2e1b] shadow-xl p-6 sm:p-10 space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-1.5 bg-[#fbe9dd] text-[#8a5b3a] text-xs font-fredoka font-bold px-3 py-1 rounded-full uppercase">
              <HelpCircle className="w-4 h-4" />
              <span>Cruelty Prevention Knowledge Check</span>
            </div>
            <h3 className="font-fredoka text-2xl sm:text-3xl font-bold text-[#26160d]">
              Test Your Canine Welfare Knowledge
            </h3>
            <p className="text-xs sm:text-sm text-[#6e513e]">
              See if you can spot the critical signs of dog suffering and choose the correct life-saving responses!
            </p>
          </div>

          <div className="space-y-6 max-w-3xl mx-auto">
            {quizQuestions.map((q, qIdx) => (
              <div key={qIdx} className="p-5 rounded-2xl bg-[#fbf6f0] border border-[#ebd7c3] space-y-3">
                <h4 className="font-fredoka text-sm sm:text-base font-bold text-[#352018]">
                  {qIdx + 1}. {q.question}
                </h4>

                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = quizAnswers[qIdx] === optIdx;
                    const isCorrect = q.correct === optIdx;
                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectQuiz(qIdx, optIdx)}
                        className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#faefe4] border-[#4a2e1b] font-semibold text-[#352018]'
                            : 'bg-white border-[#ebd7c3] text-[#5e4537] hover:bg-[#faefe4]'
                        } ${
                          quizSubmitted && isCorrect ? 'border-[#3aa866] bg-[#dcfce7] text-[#166534]' : ''
                        } ${
                          quizSubmitted && isSelected && !isCorrect ? 'border-[#d94141] bg-[#fee2e2] text-[#991b1b]' : ''
                        }`}
                      >
                        <span>{opt}</span>
                        {quizSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-[#3aa866]" />}
                        {quizSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-[#d94141]" />}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <p className="text-xs text-[#6e513e] bg-white p-3 rounded-xl border border-[#ebd7c3] italic">
                    💡 <strong>Explanation:</strong> {q.explanation}
                  </p>
                )}
              </div>
            ))}

            {quizSubmitted ? (
              <div className="bg-[#faefe4] p-6 rounded-2xl border border-[#ebd7c3] text-center space-y-3 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-[#3aa866]/20 text-[#3aa866] flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8" />
                </div>
                <h4 className="font-fredoka text-xl font-bold text-[#26160d]">
                  Your Score: {quizScore} / {quizQuestions.length}
                </h4>
                <p className="text-xs text-[#5e4537]">
                  {quizScore === 3
                    ? '🌟 Perfect score! You are a certified PawGuard Humane Guardian.'
                    : 'Great effort! Review the explanations above to sharpen your animal rescue skills.'}
                </p>
                <button
                  onClick={() => {
                    setQuizSubmitted(false);
                    setQuizAnswers({});
                    setQuizScore(null);
                  }}
                  className="bg-[#4a2e1b] text-white font-fredoka text-xs px-5 py-2.5 rounded-full"
                >
                  Retake Quiz
                </button>
              </div>
            ) : (
              <button
                onClick={handleGradeQuiz}
                disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                className="w-full bg-[#4a2e1b] hover:bg-[#352018] disabled:opacity-50 text-white font-fredoka font-semibold text-base py-3.5 rounded-full shadow hover:shadow-lg transition-all"
              >
                Submit Answers & Check Score
              </button>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
