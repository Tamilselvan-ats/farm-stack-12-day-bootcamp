import React from 'react';
import { 
  Check, 
  X, 
  Award, 
  HelpCircle, 
  Sparkles, 
  RotateCcw,
  BookOpen,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { UserProgress, QuizQuestion } from '../types';
import { quizzes } from '../data/curriculum';

interface QuizzesProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  selectedDay: number;
  setSelectedDay: (day: number) => void;
  onViewChange: (view: string) => void;
}

export default function QuizzesView({
  progress,
  onUpdateProgress,
  selectedDay,
  setSelectedDay,
  onViewChange
}: QuizzesProps) {
  // Find current day's quiz question
  const currentQuestion = quizzes.find(q => q.day === selectedDay) || quizzes[0];

  const [selectedOption, setSelectedOption] = React.useState<string>('');
  const [typedAnswer, setTypedAnswer] = React.useState<string>('');
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
  const [isCorrect, setIsCorrect] = React.useState<boolean>(false);
  const [scoreLogged, setScoreLogged] = React.useState<boolean>(false);

  // Reset tab answers on question change
  React.useEffect(() => {
    setSelectedOption('');
    setTypedAnswer('');
    setIsSubmitted(false);
    setIsCorrect(false);
    setScoreLogged(false);
  }, [selectedDay]);

  const handleOptionSelect = (optionIdx: string) => {
    if (isSubmitted) return;
    setSelectedOption(optionIdx);
  };

  const handleAnswerSubmit = () => {
    if (isSubmitted) return;

    let correct = false;
    if (currentQuestion.type === 'mcq') {
      correct = selectedOption === currentQuestion.correctAnswer;
    } else if (currentQuestion.type === 'tf') {
      correct = selectedOption.toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
    } else { // fitb or prediction
      correct = typedAnswer.trim().toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
    }

    setIsCorrect(correct);
    setIsSubmitted(true);

    // Save progress score
    onUpdateProgress(prev => {
      const isAlreadyPassed = prev.completedQuizzes.includes(currentQuestion.id);
      const updatedQuizzes = isAlreadyPassed 
        ? prev.completedQuizzes 
        : [...prev.completedQuizzes, currentQuestion.id];

      // Update quiz scores object (100% score for correctness)
      const currentScore = correct ? 100 : 0;
      const bestScore = Math.max(prev.quizScores[currentQuestion.id] || 0, currentScore);

      // Update checklist
      const dayTasks = prev.checklist[currentQuestion.day] || [];
      const quizTaskStr = 'Pass prediction output quiz';
      const updatedTasks = (correct && !dayTasks.includes(quizTaskStr))
        ? [...dayTasks, quizTaskStr]
        : dayTasks;

      return {
        ...prev,
        completedQuizzes: updatedQuizzes,
        quizScores: {
          ...prev.quizScores,
          [currentQuestion.id]: bestScore
        },
        checklist: {
          ...prev.checklist,
          [currentQuestion.day]: updatedTasks
        }
      };
    });
  };

  const handleRetake = () => {
    setSelectedOption('');
    setTypedAnswer('');
    setIsSubmitted(false);
    setIsCorrect(false);
  };

  const quizScoreRecorded = progress.quizScores[currentQuestion.id];
  const hasPassedQuiz = progress.completedQuizzes.includes(currentQuestion.id);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-slate-100 flex items-center justify-center gap-2">
          <Award className="w-7 h-7 text-amber-500" /> Day {selectedDay} Prediction Assessment
        </h2>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
          Crack prediction output and core syntax models to lock in Day {selectedDay} completions.
        </p>
      </div>

      {/* Select Day dropdown */}
      <div className="flex items-center justify-center gap-3 bg-white dark:bg-[#0F0F0F] border border-slate-200 dark:border-[#262626] p-3 rounded-lg shadow-2xs font-mono">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Assessing Track:</span>
        <select 
          value={selectedDay}
          onChange={(e) => setSelectedDay(parseInt(e.target.value))}
          className="px-3 py-1.5 border border-slate-200 dark:border-[#262626] bg-white dark:bg-[#111] text-slate-800 dark:text-[#EDEDED] rounded text-xs font-bold focus:outline-none cursor-pointer uppercase tracking-wider"
        >
          {quizzes.map(q => (
            <option key={q.day} value={q.day}>
              DAY_{String(q.day).padStart(2, '0')}: {q.type.toUpperCase()} PREDICTION
            </option>
          ))}
        </select>
        {hasPassedQuiz && (
          <span className="text-[9px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold px-2.5 py-0.5 rounded border border-emerald-200/55 dark:border-emerald-900/40 uppercase tracking-widest">
            Complete
          </span>
        )}
      </div>

      {/* Core Question Card */}
      <div className="p-5 md:p-6 bg-white dark:bg-[#0F0F0F] border border-slate-200 dark:border-[#262626] rounded-lg shadow-2xs space-y-6 transition-colors duration-200 font-mono">
        
        {/* Question text */}
        <div className="flex gap-3">
          <div className="p-1.5 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded shrink-0 self-start">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-[#666666] uppercase tracking-widest">INDEX_QUESTION_{String(selectedDay).padStart(2, '0')}</span>
            <p className="font-bold text-slate-800 dark:text-[#EDEDED] text-sm md:text-base leading-snug">
              {currentQuestion.question}
            </p>
          </div>
        </div>

        {/* Code Snippet if applicable */}
        {currentQuestion.codeSnippet && (
          <div className="bg-[#0A0A0A] text-slate-200 rounded p-4 text-xs overflow-x-auto border border-slate-200 dark:border-[#262626]">
            <pre>{currentQuestion.codeSnippet}</pre>
          </div>
        )}

        {/* Interactive fields */}
        <div className="space-y-3 pt-1">
          {/* MCQ Option mapping */}
          {currentQuestion.type === 'mcq' && currentQuestion.options && (
            <div className="grid grid-cols-1 gap-2.5">
              {currentQuestion.options.map((opt, idx) => {
                const optStr = idx.toString();
                const isChosen = selectedOption === optStr;
                const isCorrectOpt = optStr === currentQuestion.correctAnswer;

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(optStr)}
                    className={`
                      w-full flex items-center justify-between p-3 border text-xs font-semibold text-left transition cursor-pointer select-none rounded
                      ${isSubmitted 
                        ? isCorrectOpt 
                          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-800 dark:text-emerald-400 font-bold' 
                          : isChosen 
                            ? 'bg-rose-500/10 border-rose-500 text-rose-800 dark:text-rose-400 font-bold' 
                            : 'bg-white dark:bg-[#0F0F0F] border-slate-200 dark:border-[#262626] text-slate-500'
                        : isChosen 
                          ? 'bg-blue-50 dark:bg-blue-950/15 border-blue-500 text-blue-600 dark:text-blue-400' 
                          : 'bg-slate-50/50 dark:bg-[#111] hover:bg-slate-50 dark:hover:bg-[#1A1A1A] border-slate-200 dark:border-[#262626] text-slate-700 dark:text-slate-300'}
                    `}
                  >
                    <span>{opt}</span>
                    <span className={`w-4 h-4 rounded border shrink-0 flex items-center justify-center font-bold text-[10px] ${
                      isSubmitted 
                        ? isCorrectOpt 
                          ? 'bg-emerald-600 text-white border-emerald-500' 
                          : isChosen 
                            ? 'bg-rose-500 text-white border-rose-500' 
                            : 'border-slate-200'
                        : isChosen 
                          ? 'bg-blue-600 text-white border-blue-500' 
                          : 'border-slate-300 dark:border-[#262626] bg-white dark:bg-[#111]'
                    }`}>
                      {isSubmitted ? isCorrectOpt ? '✓' : isChosen ? '✗' : '' : isChosen ? '✓' : ''}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* True / False Selection Mapping */}
          {currentQuestion.type === 'tf' && (
            <div className="grid grid-cols-2 gap-3">
              {['True', 'False'].map((tfVal) => {
                const isChosen = selectedOption === tfVal;
                const isCorrectOpt = tfVal.toLowerCase() === currentQuestion.correctAnswer.toLowerCase();

                return (
                  <button
                    key={tfVal}
                    onClick={() => handleOptionSelect(tfVal)}
                    className={`
                      p-3 rounded border text-center font-bold text-xs transition cursor-pointer select-none uppercase tracking-wider
                      ${isSubmitted 
                        ? isCorrectOpt 
                          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-400' 
                          : isChosen 
                            ? 'bg-rose-500/10 border-rose-500 text-rose-700 dark:text-rose-400' 
                            : 'bg-white dark:bg-[#0F0F0F] border-slate-200 dark:border-[#262626] text-slate-400'
                        : isChosen 
                          ? 'bg-blue-50 dark:bg-blue-950/15 border-blue-500 text-blue-600 dark:text-blue-400' 
                          : 'bg-slate-50/50 dark:bg-[#111] hover:bg-slate-50 dark:hover:bg-[#1A1A1A] border-slate-200 dark:border-[#262626] text-slate-700 dark:text-slate-300'}
                    `}
                  >
                    {tfVal}
                  </button>
                );
              })}
            </div>
          )}

          {/* Fill-in-the-blank or prediction input */}
          {(currentQuestion.type === 'fitb' || currentQuestion.type === 'prediction') && (
            <div className="space-y-2">
              <label className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest block">Write Your Predicted Answer</label>
              <input
                type="text"
                disabled={isSubmitted}
                value={typedAnswer}
                onChange={(e) => setTypedAnswer(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 dark:border-[#262626] rounded bg-[#111] text-[#EDEDED] text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono disabled:opacity-50"
                placeholder="Type answer here... Case insensitive."
              />
            </div>
          )}
        </div>

        {/* Action button submits */}
        <div className="pt-2 flex justify-end font-mono">
          {!isSubmitted ? (
            <button
              onClick={handleAnswerSubmit}
              disabled={currentQuestion.type === 'mcq' || currentQuestion.type === 'tf' ? !selectedOption : !typedAnswer.trim()}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-100 dark:disabled:bg-[#1A1A1A] disabled:text-slate-400 dark:disabled:text-slate-600 text-white rounded text-xs font-bold transition cursor-pointer disabled:cursor-not-allowed uppercase tracking-wider"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleRetake}
              className="px-4 py-2 bg-slate-100 dark:bg-[#1A1A1A] hover:bg-slate-200 dark:hover:bg-[#222] border border-slate-200 dark:border-[#262626] text-slate-700 dark:text-slate-200 rounded text-xs font-bold transition cursor-pointer flex items-center gap-1 uppercase tracking-wider"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retry
            </button>
          )}
        </div>

        {/* Evaluation banner */}
        {isSubmitted && (
          <div className={`
            p-4 border rounded space-y-3 transition duration-150 animate-fade-in-up
            ${isCorrect 
              ? 'bg-emerald-500/10 border-emerald-950/40 text-slate-800 dark:text-slate-200' 
              : 'bg-rose-500/10 border-rose-950/40 text-slate-800 dark:text-slate-200'}
          `}>
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <>
                  <div className="p-0.5 bg-emerald-500 rounded-sm text-white"><Check className="w-3 h-3" /></div>
                  <span className="font-mono font-bold text-xs text-emerald-800 dark:text-emerald-400 uppercase tracking-widest">Prediction Correct!</span>
                </>
              ) : (
                <>
                  <div className="p-0.5 bg-rose-500 rounded-sm text-white"><X className="w-3 h-3" /></div>
                  <span className="font-mono font-bold text-xs text-rose-800 dark:text-rose-400 uppercase tracking-widest">Incorrect Output</span>
                </>
              )}
            </div>

            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              <strong>Core Answer:</strong> <code className="bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-[#262626] px-1.5 py-0.5 rounded font-bold font-mono text-xs">{currentQuestion.correctAnswer}</code>
            </p>

            <div className="p-3 bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-[#262626] rounded">
              <span className="text-[9px] font-bold font-mono text-slate-400 uppercase tracking-widest block mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" /> Tutor Explanation
              </span>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                {currentQuestion.explanation}
              </p>
            </div>
          </div>
        )}

      </div>

      {/* Navigation footer */}
      {isSubmitted && (
        <div className="flex justify-between items-center bg-white dark:bg-[#0F0F0F] border border-slate-200 dark:border-[#262626] p-3 rounded-lg font-mono">
          <span className="text-[10px] font-bold text-slate-500 dark:text-[#666666] uppercase tracking-wider">
            {isCorrect ? 'Day milestone unlocked!' : 'Retake to score perfect!'}
          </span>
          <button
            onClick={() => {
              if (selectedDay < 12) {
                setSelectedDay(selectedDay + 1);
              } else {
                onViewChange('challenges');
              }
            }}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold transition flex items-center gap-1 cursor-pointer uppercase tracking-wider"
          >
            {selectedDay < 12 ? 'NEXT_QUIZ' : 'GO_CHALLENGES'} <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
}
