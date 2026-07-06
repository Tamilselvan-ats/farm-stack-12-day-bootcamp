import React from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  X, 
  Lightbulb, 
  Terminal, 
  Clock, 
  CheckCircle,
  Bookmark,
  FileCode,
  Sparkles
} from 'lucide-react';
import { Lesson, UserProgress } from '../types';
import { lessons } from '../data/curriculum';

interface LessonsViewProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  selectedDay: number;
  setSelectedDay: (day: number) => void;
  onViewChange: (view: string) => void;
}

export default function LessonsView({
  progress,
  onUpdateProgress,
  selectedDay,
  setSelectedDay,
  onViewChange
}: LessonsViewProps) {
  // Find current lesson
  const currentLesson = lessons.find(l => l.day === selectedDay) || lessons[0];

  const handleToggleComplete = () => {
    onUpdateProgress(prev => {
      const isCompleted = prev.completedLessons.includes(currentLesson.id);
      const updatedLessons = isCompleted
        ? prev.completedLessons.filter(id => id !== currentLesson.id)
        : [...prev.completedLessons, currentLesson.id];
      
      // Update checklist
      const dayTasks = prev.checklist[currentLesson.day] || [];
      const readTaskStr = 'Read Lesson and syntax examples';
      const updatedTasks = isCompleted
        ? dayTasks.filter(t => t !== readTaskStr)
        : dayTasks.includes(readTaskStr) ? dayTasks : [...dayTasks, readTaskStr];

      return {
        ...prev,
        completedLessons: updatedLessons,
        checklist: {
          ...prev.checklist,
          [currentLesson.day]: updatedTasks
        }
      };
    });
  };

  const handlePrevLesson = () => {
    if (selectedDay > 1) {
      setSelectedDay(selectedDay - 1);
    }
  };

  const handleNextLesson = () => {
    if (selectedDay < 12) {
      setSelectedDay(selectedDay + 1);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard! You can paste this directly into the Code Playground.');
  };

  const isLessonCompleted = progress.completedLessons.includes(currentLesson.id);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Upper Navigation Rail */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-[#0F0F0F] border border-slate-200 dark:border-[#262626] rounded-lg shadow-2xs font-mono">
        <div className="flex items-center gap-3">
          <button 
            onClick={handlePrevLesson}
            disabled={selectedDay === 1}
            className="p-2 bg-slate-50 dark:bg-[#1A1A1A] hover:bg-slate-100 dark:hover:bg-[#222] border border-slate-200 dark:border-[#262626] disabled:opacity-30 text-slate-600 dark:text-slate-300 rounded transition cursor-pointer disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <select 
            value={selectedDay}
            onChange={(e) => setSelectedDay(parseInt(e.target.value))}
            className="px-3 py-1.5 border border-slate-200 dark:border-[#262626] bg-white dark:bg-[#111] text-slate-800 dark:text-[#EDEDED] rounded text-xs font-bold focus:outline-none cursor-pointer uppercase tracking-wider"
          >
            {lessons.map(l => (
              <option key={l.day} value={l.day}>
                DAY_{String(l.day).padStart(2, '0')}: {l.technology}
              </option>
            ))}
          </select>

          <button 
            onClick={handleNextLesson}
            disabled={selectedDay === 12}
            className="p-2 bg-slate-50 dark:bg-[#1A1A1A] hover:bg-slate-100 dark:hover:bg-[#222] border border-slate-200 dark:border-[#262626] disabled:opacity-30 text-slate-600 dark:text-slate-300 rounded transition cursor-pointer disabled:cursor-not-allowed"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={handleToggleComplete}
          className={`
            px-4 py-2 rounded text-xs font-bold transition flex items-center gap-1.5 cursor-pointer uppercase tracking-widest
            ${isLessonCompleted 
              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40' 
              : 'bg-blue-600 text-white hover:bg-blue-500'}
          `}
        >
          <CheckCircle className={`w-3.5 h-3.5 ${isLessonCompleted ? 'fill-current' : ''}`} />
          {isLessonCompleted ? 'Completed ✓' : 'Gate as Complete'}
        </button>
      </div>

      {/* Main Core Document Container */}
      <article className="p-6 md:p-8 bg-white dark:bg-[#0F0F0F] border border-slate-200 dark:border-[#262626] rounded-lg shadow-2xs space-y-8 transition-colors duration-200">
        
        {/* Document Header */}
        <div className="border-b border-slate-200 dark:border-[#262626] pb-6">
          <div className="flex items-center gap-2 mb-3 font-mono">
            <span className="bg-blue-50 dark:bg-blue-950/15 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/30 text-[9px] font-bold px-2.5 py-0.5 rounded uppercase tracking-widest">
              {currentLesson.technology}
            </span>
            <span className="text-slate-400 text-[10px] font-bold flex items-center gap-1 uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 text-[#555]" /> {currentLesson.duration} study
            </span>
            <span className="bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-[#262626] text-slate-600 dark:text-[#888] text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-widest">
              INDEX_DAY_{String(currentLesson.day).padStart(2, '0')}
            </span>
          </div>

          <h1 className="font-mono font-bold text-xl md:text-2xl text-slate-950 dark:text-[#EDEDED] tracking-tight leading-tight uppercase">
            {currentLesson.title}
          </h1>
        </div>

        {/* Learning Goals */}
        <div className="p-5 bg-slate-50/50 dark:bg-[#111]/30 border border-slate-200 dark:border-[#262626] rounded-lg space-y-3 font-mono">
          <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block">
            What You Will Accomplish Today
          </span>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-slate-500 dark:text-slate-400">
            {currentLesson.learningGoals.map((g, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Short Concept Explanation */}
        <div className="space-y-3">
          <h3 className="font-mono font-bold text-sm text-slate-800 dark:text-[#EDEDED] uppercase tracking-wider">
            Concept Overview
          </h3>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            {currentLesson.explanation}
          </p>
        </div>

        {/* Syntax block */}
        <div className="space-y-3 font-mono">
          <span className="text-[10px] font-bold text-slate-400 dark:text-[#666666] uppercase tracking-wider block">
            Core Syntax Blueprint
          </span>
          <div className="bg-[#0A0A0A] text-slate-200 rounded p-4 text-xs overflow-x-auto border border-slate-200 dark:border-[#262626]">
            <pre>{currentLesson.syntax}</pre>
          </div>
        </div>

        {/* Code Example */}
        <div className="space-y-4 font-mono">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-slate-800 dark:text-[#EDEDED] flex items-center gap-2 uppercase tracking-wider">
              <FileCode className="w-4 h-4 text-blue-500" /> Fully Functional Code Example
            </h3>
            <div className="flex gap-2">
              <button 
                onClick={() => handleCopyCode(currentLesson.codeExample)}
                className="px-3 py-1 bg-slate-100 dark:bg-[#1A1A1A] hover:bg-slate-200 dark:hover:bg-[#222] text-slate-700 dark:text-slate-300 text-[10px] rounded font-bold border border-slate-200 dark:border-[#262626] transition cursor-pointer uppercase tracking-wider"
              >
                Copy
              </button>
              <button 
                onClick={() => onViewChange('playground')}
                className="px-3 py-1 bg-blue-50 dark:bg-blue-950/15 hover:bg-blue-100 dark:hover:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-[10px] rounded border border-blue-200/50 dark:border-blue-900/30 font-bold transition cursor-pointer flex items-center gap-1 uppercase tracking-wider"
              >
                <Terminal className="w-3 h-3" /> Paste to Sandbox
              </button>
            </div>
          </div>
          <div className="bg-[#0A0A0A] text-emerald-400 rounded p-5 text-xs overflow-x-auto border border-slate-200 dark:border-[#262626] leading-relaxed shadow-sm">
            <pre>{currentLesson.codeExample}</pre>
          </div>
        </div>

        {/* Line by line breakdown */}
        <div className="space-y-4 font-mono">
          <h4 className="font-bold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider">
            Line-by-Line Breakdown Analysis
          </h4>
          <div className="border border-slate-200 dark:border-[#262626] rounded overflow-hidden divide-y divide-slate-200 dark:divide-[#262626]">
            {currentLesson.lineByLine.map((lbl, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-3 text-xs">
                <div className="p-3 bg-slate-50 dark:bg-[#0A0A0A] text-slate-800 dark:text-slate-300 font-bold border-b md:border-b-0 md:border-r border-slate-200 dark:border-[#262626] shrink-0">
                  <code>{lbl.line}</code>
                </div>
                <div className="p-3 col-span-2 text-slate-500 dark:text-slate-400 bg-white dark:bg-[#0F0F0F] leading-relaxed">
                  {lbl.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Practices & Common Mistakes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono">
          <div className="p-4 border border-emerald-200 dark:border-emerald-950/40 bg-emerald-500/5 rounded space-y-3">
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
              Best Practices
            </span>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              {currentLesson.bestPractices.map((bp, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>{bp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 border border-rose-200 dark:border-rose-950/40 bg-rose-500/5 rounded space-y-3">
            <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest block">
              Common Mistakes
            </span>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              {currentLesson.commonMistakes.map((cm, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                  <span>{cm}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Hackathon pro tips */}
        <div className="p-4 bg-blue-500/5 border border-slate-200 dark:border-blue-900/30 rounded flex gap-4 font-mono">
          <div className="p-2 bg-blue-600 rounded text-white shrink-0 self-start">
            <Lightbulb className="w-4 h-4 fill-current" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">
              Hackathon-Pro Tip
            </span>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-500 dark:text-slate-400">
              {currentLesson.hackathonTips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Ask Mentor Spark */}
        <div className="p-4 bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-[#262626] rounded flex items-center justify-between font-mono">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
              Stuck on this concept? Ask your AI Mentor.
            </span>
          </div>
          <button 
            onClick={() => onViewChange('mentor')}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-[10px] font-bold transition shrink-0 cursor-pointer uppercase tracking-wider"
          >
            Ask Aria
          </button>
        </div>

      </article>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center pb-12 font-mono">
        <button
          onClick={handlePrevLesson}
          disabled={selectedDay === 1}
          className="px-4 py-2 bg-white dark:bg-[#0F0F0F] border border-slate-200 dark:border-[#262626] text-slate-700 dark:text-slate-300 text-xs font-bold rounded transition hover:bg-slate-50 dark:hover:bg-[#1A1A1A] flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> PREV
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => onViewChange('quizzes')}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-white text-[11px] font-bold rounded transition cursor-pointer uppercase tracking-wider"
          >
            Pass Quiz
          </button>
          <button
            onClick={() => onViewChange('challenges')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold rounded transition cursor-pointer uppercase tracking-wider"
          >
            Cracking challenge
          </button>
        </div>

        <button
          onClick={handleNextLesson}
          disabled={selectedDay === 12}
          className="px-4 py-2 bg-white dark:bg-[#0F0F0F] border border-slate-200 dark:border-[#262626] text-slate-700 dark:text-slate-300 text-xs font-bold rounded transition hover:bg-slate-50 dark:hover:bg-[#1A1A1A] flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer uppercase tracking-wider"
        >
          NEXT <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
