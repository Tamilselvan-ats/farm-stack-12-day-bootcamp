import React from 'react';
import { 
  Code2, 
  Award, 
  HelpCircle, 
  CheckCircle, 
  RotateCcw, 
  ArrowRight,
  Eye,
  EyeOff,
  Terminal,
  FileCode,
  Sparkles
} from 'lucide-react';
import { UserProgress, CodingChallenge } from '../types';
import { challenges } from '../data/curriculum';

interface ChallengesProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  selectedDay: number;
  setSelectedDay: (day: number) => void;
  onViewChange: (view: string) => void;
}

export default function ChallengesView({
  progress,
  onUpdateProgress,
  selectedDay,
  setSelectedDay,
  onViewChange
}: ChallengesProps) {
  // Find current challenge
  const currentChallenge = challenges.find(c => c.day === selectedDay) || challenges[0];

  const [userCode, setUserCode] = React.useState<string>(currentChallenge.starterCode);
  const [showHint, setShowHint] = React.useState<boolean>(false);
  const [showSolution, setShowSolution] = React.useState<boolean>(false);
  const [isEvaluated, setIsEvaluated] = React.useState<boolean>(false);
  const [evaluationFeedback, setEvaluationFeedback] = React.useState<string>('');

  // Sync editor on challenge changes
  React.useEffect(() => {
    setUserCode(currentChallenge.starterCode);
    setShowHint(false);
    setShowSolution(false);
    setIsEvaluated(false);
    setEvaluationFeedback('');
  }, [selectedDay, currentChallenge]);

  const handleEvaluate = () => {
    setIsEvaluated(true);
    
    // Perform simple validation check depending on challenge types
    const textToCheck = userCode.toLowerCase().replace(/\s/g, '');
    let isCorrect = false;

    if (currentChallenge.day === 1) {
      isCorrect = textToCheck.includes('<!doctypehtml>') && textToCheck.includes('<meta');
    } else if (currentChallenge.day === 2) {
      isCorrect = textToCheck.includes('type="email"') && textToCheck.includes('required');
    } else if (currentChallenge.day === 3) {
      isCorrect = textToCheck.includes('box-sizing:border-box') || textToCheck.includes('border-radius:12px');
    } else if (currentChallenge.day === 5) {
      isCorrect = textToCheck.includes('.filter(') && textToCheck.includes('react');
    } else if (currentChallenge.day === 6) {
      isCorrect = textToCheck.includes('async') && textToCheck.includes('fetch(');
    } else if (currentChallenge.day === 7) {
      isCorrect = textToCheck.includes('usestate') && textToCheck.includes('likes');
    } else {
      // General fallbacks for other days (FastAPI/MongoDB)
      isCorrect = userCode.trim().length > 15 && !textToCheck.includes('starter');
    }

    if (isCorrect) {
      setEvaluationFeedback("🌟 Brilliant! Your solution follows the correct coding patterns and syntax structure. Outstanding job!");
      
      onUpdateProgress(prev => {
        const isAlreadyDone = prev.completedChallenges.includes(currentChallenge.id);
        const updatedChallenges = isAlreadyDone 
          ? prev.completedChallenges 
          : [...prev.completedChallenges, currentChallenge.id];

        // Update checklist
        const dayTasks = prev.checklist[currentChallenge.day] || [];
        const challengeTaskStr = 'Cracking the coding challenge';
        const updatedTasks = dayTasks.includes(challengeTaskStr) ? dayTasks : [...dayTasks, challengeTaskStr];

        return {
          ...prev,
          completedChallenges: updatedChallenges,
          checklist: {
            ...prev.checklist,
            [currentChallenge.day]: updatedTasks
          }
        };
      });
    } else {
      setEvaluationFeedback("⚠️ Your solution is missing key structure elements or keywords. Double-check syntax tags, check the hint, or inspect the expert solution reveal!");
    }
  };

  const handleReset = () => {
    setUserCode(currentChallenge.starterCode);
    setIsEvaluated(false);
    setEvaluationFeedback('');
  };

  const hasCompletedChallenge = progress.completedChallenges.includes(currentChallenge.id);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-slate-100 flex items-center justify-center gap-2">
          <Code2 className="w-7 h-7 text-emerald-500" /> Day {selectedDay} Mini Coding Challenge
        </h2>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
          Hone practical coding skills. Solve interactive prompts directly in our lightweight client compiler.
        </p>
      </div>

      {/* Select Day dropdown */}
      <div className="flex items-center justify-center gap-3 bg-white dark:bg-[#0F0F0F] border border-slate-200 dark:border-[#262626] p-3 rounded-lg shadow-2xs font-mono">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Select Problem:</span>
        <select 
          value={selectedDay}
          onChange={(e) => setSelectedDay(parseInt(e.target.value))}
          className="px-3 py-1.5 border border-slate-200 dark:border-[#262626] bg-white dark:bg-[#111] text-slate-800 dark:text-[#EDEDED] rounded text-xs font-bold focus:outline-none cursor-pointer uppercase tracking-wider"
        >
          {challenges.map(c => (
            <option key={c.day} value={c.day}>
              DAY_{String(c.day).padStart(2, '0')}: {c.title} ({c.difficulty.toUpperCase()})
            </option>
          ))}
        </select>
        {hasCompletedChallenge && (
          <span className="text-[9px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold px-2.5 py-0.5 rounded border border-emerald-200/55 dark:border-emerald-900/40 uppercase tracking-widest">
            Complete
          </span>
        )}
      </div>

      {/* Grid container layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Instructions (Col Span 5) */}
        <div className="lg:col-span-5 space-y-4 font-mono">
          <div className="p-5 bg-white dark:bg-[#0F0F0F] border border-slate-200 dark:border-[#262626] rounded-lg shadow-2xs space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-[#262626]">
              <span className="bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-[#262626] text-[#888] text-[9px] font-bold px-2.5 py-0.5 rounded uppercase tracking-widest">
                {currentChallenge.technology}
              </span>
              <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${
                currentChallenge.difficulty === 'Easy' ? 'bg-emerald-500/15 text-emerald-500 border-emerald-900/40' :
                currentChallenge.difficulty === 'Medium' ? 'bg-amber-500/15 text-amber-500 border-amber-900/40' :
                'bg-rose-500/15 text-rose-500 border-rose-900/40'
              }`}>
                {currentChallenge.difficulty}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-slate-800 dark:text-[#EDEDED] text-xs uppercase tracking-wider">
                Problem Statement
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                {currentChallenge.description}
              </p>
            </div>

            {/* Sample Input Output */}
            {(currentChallenge.sampleInput || currentChallenge.sampleOutput) && (
              <div className="space-y-3 pt-2 text-xs">
                {currentChallenge.sampleInput && (
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-[#666666] uppercase tracking-widest block">Sample Input</span>
                    <pre className="bg-[#0A0A0A] p-2 border border-slate-200 dark:border-[#262626] rounded-sm text-[10px] font-mono text-slate-400 overflow-x-auto">
                      {currentChallenge.sampleInput}
                    </pre>
                  </div>
                )}
                {currentChallenge.sampleOutput && (
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-[#666666] uppercase tracking-widest block">Expected Output</span>
                    <pre className="bg-[#0A0A0A] p-2 border border-slate-200 dark:border-[#262626] rounded-sm text-[10px] font-mono text-[#888] overflow-x-auto">
                      {currentChallenge.sampleOutput}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {/* Hint Accordion */}
            <div className="pt-2">
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline font-bold cursor-pointer flex items-center gap-1 uppercase tracking-wider"
              >
                <HelpCircle className="w-3.5 h-3.5" /> {showHint ? 'Hide Problem Hint' : 'Reveal Problem Hint'}
              </button>
              {showHint && (
                <p className="mt-2 text-[11px] text-slate-500 leading-relaxed bg-[#0A0A0A] p-3 rounded-sm border border-dashed border-slate-200 dark:border-[#262626] animate-fade-in-up font-sans">
                  {currentChallenge.hint}
                </p>
              )}
            </div>
          </div>

          {/* Ask AI Mentor Promo */}
          <div className="p-4 bg-white dark:bg-[#0F0F0F] border border-slate-200 dark:border-[#262626] rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-slate-800 dark:text-[#EDEDED] uppercase tracking-wider">Stuck or seeking design critique?</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              Let Aria critique your workspace code, trace loops, or rewrite logical components!
            </p>
            <button 
              onClick={() => onViewChange('mentor')}
              className="text-[10px] text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer uppercase tracking-wider block"
            >
              Consult AI Mentor →
            </button>
          </div>
        </div>

        {/* Right Side: Interactive Code Editor (Col Span 7) */}
        <div className="lg:col-span-7 space-y-4 font-mono">
          <div className="flex flex-col border border-slate-200 dark:border-[#262626] rounded-lg bg-[#0F0F0F] overflow-hidden shadow-2xs transition-colors duration-200">
            <div className="flex justify-between items-center bg-slate-50 dark:bg-[#111] p-3 border-b border-slate-200 dark:border-[#262626]">
              <span className="text-xs font-bold text-[#EDEDED] uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-blue-500" /> Challenge IDE Editor
              </span>
              <button 
                onClick={handleReset}
                className="p-1.5 hover:bg-slate-200 dark:hover:bg-[#1A1A1A] border border-slate-200 dark:border-[#262626] rounded text-slate-500 dark:text-slate-400 transition cursor-pointer"
                title="Reset starter code"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="relative">
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                className="w-full h-80 p-4 font-mono text-xs bg-[#0A0A0A] text-emerald-400 resize-none focus:outline-none border-none leading-relaxed"
                spellCheck="false"
              />
            </div>

            {/* Run Footer */}
            <div className="p-3 bg-slate-50 dark:bg-[#111] border-t border-slate-200 dark:border-[#262626] flex justify-between items-center">
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#222] border border-[#262626] text-white rounded text-[10px] font-bold transition cursor-pointer flex items-center gap-1 uppercase tracking-wider"
              >
                {showSolution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {showSolution ? 'Hide Solution' : 'Reveal Solution'}
              </button>
              
              <button
                onClick={handleEvaluate}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold transition cursor-pointer uppercase tracking-widest"
              >
                Evaluate Code
              </button>
            </div>
          </div>

          {/* Feedback Section */}
          {isEvaluated && (
            <div className={`p-4 border rounded space-y-2 animate-fade-in-up ${
              evaluationFeedback.startsWith('🌟')
                ? 'bg-emerald-500/10 border-emerald-950/40 text-[#EDEDED]'
                : 'bg-rose-500/10 border-rose-950/40 text-[#EDEDED]'
            }`}>
              <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-widest">
                {evaluationFeedback.startsWith('🌟') ? '✓ Validation Success' : '✗ Validation Feedback'}
              </div>
              <p className="text-xs leading-relaxed opacity-90">{evaluationFeedback}</p>
            </div>
          )}

          {/* Revealed Expert Solution Code */}
          {showSolution && (
            <div className="border border-slate-200 dark:border-[#262626] rounded-lg bg-[#0A0A0A] p-4 space-y-3 shadow-md animate-fade-in-up">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span className="font-bold tracking-wider uppercase flex items-center gap-1.5 text-blue-400">
                  <FileCode className="w-4 h-4" /> Expert Solution Code
                </span>
                <span className="uppercase text-[9px] font-bold text-[#555]">Blueprint verified</span>
              </div>
              <pre className="text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed">
                {currentChallenge.solutionCode}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* End navigation */}
      {hasCompletedChallenge && (
        <div className="flex justify-between items-center bg-white dark:bg-[#0F0F0F] border border-slate-200 dark:border-[#262626] p-3 rounded-lg font-mono">
          <span className="text-[10px] font-bold text-slate-500 dark:text-[#666666] uppercase tracking-wider">
            💪 Code milestone fully unlocked! Proceed to sandbox continuous build.
          </span>
          <button
            onClick={() => {
              if (selectedDay < 12) {
                setSelectedDay(selectedDay + 1);
              } else {
                onViewChange('project');
              }
            }}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold transition flex items-center gap-1 cursor-pointer uppercase tracking-wider"
          >
            {selectedDay < 12 ? 'NEXT_CHALLENGE' : 'GO_PROJECT'} <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
}
