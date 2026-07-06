import React from 'react';
import { 
  Layers, 
  CheckCircle, 
  ArrowRight, 
  Folder, 
  File, 
  ChevronRight, 
  Play, 
  BookOpen,
  Award,
  Terminal,
  HelpCircle
} from 'lucide-react';
import { UserProgress, ProjectMilestone } from '../types';
import { projectMilestones } from '../data/curriculum';

interface ProjectBuilderProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  selectedDay: number;
  setSelectedDay: (day: number) => void;
  onViewChange: (view: string) => void;
}

export default function ProjectBuilderView({
  progress,
  onUpdateProgress,
  selectedDay,
  setSelectedDay,
  onViewChange
}: ProjectBuilderProps) {
  // Find current day's milestone
  const currentMilestone = projectMilestones.find(m => m.day === selectedDay) || projectMilestones[0];

  const [activeFileIdx, setActiveFileIdx] = React.useState<number>(0);
  const [completedFeatures, setCompletedFeatures] = React.useState<string[]>([]);

  // Sync state on day changes
  React.useEffect(() => {
    setActiveFileIdx(0);
    // Initialize completed features from overall checklist progress if available
    setCompletedFeatures([]);
  }, [selectedDay]);

  const toggleFeature = (feat: string) => {
    setCompletedFeatures(prev => {
      const updated = prev.includes(feat)
        ? prev.filter(f => f !== feat)
        : [...prev, feat];
      
      // Auto-toggle milestone complete if all features checked
      const allDone = updated.length === currentMilestone.features.length;
      if (allDone) {
        handleMarkMilestoneCompleted();
      }
      return updated;
    });
  };

  const handleMarkMilestoneCompleted = () => {
    onUpdateProgress(prev => {
      const isAlreadyDone = prev.completedProjectTasks.includes(currentMilestone.day);
      const updatedTasks = isAlreadyDone
        ? prev.completedProjectTasks
        : [...prev.completedProjectTasks, currentMilestone.day];

      // Update checklist
      const dayTasks = prev.checklist[currentMilestone.day] || [];
      const projectTaskStr = 'Integrate the daily project feature';
      const updatedChecklistTasks = dayTasks.includes(projectTaskStr) ? dayTasks : [...dayTasks, projectTaskStr];

      return {
        ...prev,
        completedProjectTasks: updatedTasks,
        checklist: {
          ...prev.checklist,
          [currentMilestone.day]: updatedChecklistTasks
        }
      };
    });
  };

  const isMilestoneCompleted = progress.completedProjectTasks.includes(currentMilestone.day);

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-mono">
      {/* Title block */}
      <div className="text-center space-y-2">
        <h2 className="font-sans font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-[#EDEDED] flex items-center justify-center gap-2 uppercase tracking-wide">
          <Layers className="w-7 h-7 text-blue-500" /> Continuous FARM Stack Project Builder
        </h2>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed">
          Over 12 days, you will grow a full-stack discovery application called <strong className="text-blue-500">DevFast</strong>. Watch it evolve from a static skeleton to a fully reactive API-driven platform.
        </p>
      </div>

      {/* Select Day dropdown */}
      <div className="flex items-center justify-center gap-3 bg-white dark:bg-[#0F0F0F] border border-slate-200 dark:border-[#262626] p-3 rounded-lg shadow-2xs">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Project Milestone:</span>
        <select 
          value={selectedDay}
          onChange={(e) => setSelectedDay(parseInt(e.target.value))}
          className="px-3 py-1.5 border border-slate-200 dark:border-[#262626] bg-white dark:bg-[#111] text-slate-800 dark:text-[#EDEDED] rounded text-xs font-bold focus:outline-none cursor-pointer uppercase tracking-wider"
        >
          {projectMilestones.map(m => (
            <option key={m.day} value={m.day}>
              DAY_{String(m.day).padStart(2, '0')}: {m.title.toUpperCase()}
            </option>
          ))}
        </select>
        {isMilestoneCompleted && (
          <span className="text-[9px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold px-2.5 py-0.5 rounded border border-emerald-200/55 dark:border-emerald-900/40 uppercase tracking-widest">
            Milestone Completed
          </span>
        )}
      </div>

      {/* Main split dashboard columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Overview, checklists, guides (Col Span 7) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Milestone Details */}
          <div className="p-5 bg-white dark:bg-[#0F0F0F] border border-slate-200 dark:border-[#262626] rounded-lg shadow-2xs space-y-4">
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Day {currentMilestone.day} Core Objective</span>
              <h3 className="font-bold text-[#EDEDED] text-sm uppercase tracking-wider mt-1">
                {currentMilestone.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-sans leading-relaxed">
                {currentMilestone.description}
              </p>
            </div>

            {/* Features Checklist */}
            <div className="space-y-3 pt-2">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Feature Requirements</span>
              <div className="space-y-2">
                {currentMilestone.features.map((feat) => {
                  const isChecked = completedFeatures.includes(feat) || isMilestoneCompleted;
                  return (
                    <button
                      key={feat}
                      onClick={() => toggleFeature(feat)}
                      disabled={isMilestoneCompleted}
                      className={`
                        w-full flex items-center gap-3 p-3 rounded border text-left text-xs font-bold transition cursor-pointer select-none disabled:cursor-not-allowed
                        ${isChecked
                          ? 'bg-emerald-500/10 border-emerald-900/40 text-[#EDEDED]'
                          : 'bg-[#0A0A0A] border-slate-200 dark:border-[#262626] text-slate-400 hover:border-slate-300 dark:hover:border-[#333]'}
                      `}
                    >
                      <span className={`w-3.5 h-3.5 rounded border shrink-0 flex items-center justify-center transition ${
                        isChecked 
                          ? 'bg-emerald-600 border-emerald-500 text-white' 
                          : 'border-slate-300 bg-white dark:bg-[#111] dark:border-[#262626]'
                      }`}>
                        {isChecked && '✓'}
                      </span>
                      <span className={isChecked ? 'line-through opacity-85 text-[#888888]' : ''}>{feat}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Complete milestone button manually */}
            {!isMilestoneCompleted && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleMarkMilestoneCompleted}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold transition cursor-pointer uppercase tracking-widest shadow-sm"
                >
                  Confirm Integration Complete
                </button>
              </div>
            )}
          </div>

          {/* Step by step implementation guide */}
          <div className="p-5 bg-white dark:bg-[#0F0F0F] border border-slate-200 dark:border-[#262626] rounded-lg shadow-2xs space-y-4">
            <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest block">Step-By-Step Implementation Blueprint</span>
            
            <div className="prose dark:prose-invert prose-slate max-w-none text-xs leading-relaxed text-[#EDEDED] space-y-4 font-sans">
              {/* Parse standard markdown-ish rules inside our guide */}
              {currentMilestone.guideMarkdown.split('\n\n').map((block, idx) => {
                if (block.startsWith('###')) {
                  return (
                    <h4 key={idx} className="font-mono font-bold text-slate-800 dark:text-[#EDEDED] text-xs uppercase tracking-wider border-b border-[#262626] pb-1 mt-4">
                      {block.replace('###', '').trim()}
                    </h4>
                  );
                }
                if (block.startsWith('*')) {
                  return (
                    <div key={idx} className="p-3 bg-amber-500/10 border border-dashed border-amber-900/50 text-amber-400 rounded-sm font-sans">
                      {block.replace('*', '').trim()}
                    </div>
                  );
                }
                return (
                  <p key={idx} className="leading-relaxed font-sans text-slate-500 dark:text-slate-400">
                    {block}
                  </p>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right column: Interactive Workbook File Explorer (Col Span 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex flex-col border border-slate-200 dark:border-[#262626] rounded-lg bg-white dark:bg-[#0F0F0F] overflow-hidden shadow-2xs transition-colors duration-200">
            <div className="flex items-center gap-1 bg-slate-50 dark:bg-[#111] px-4 py-3 border-b border-slate-200 dark:border-[#262626]">
              <Folder className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-bold text-[#EDEDED] uppercase tracking-wider">
                DevFast Workbook Explorer
              </span>
            </div>

            {/* Split row: tree navigator on left, file editor on right (consolidated for tablet/mobile spacing) */}
            <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-[#262626] h-[480px]">
              
              {/* Left Tree bar */}
              <div className="w-full md:w-44 bg-slate-50/50 dark:bg-[#0A0A0A]/40 p-3 space-y-2 overflow-y-auto">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">WORKSPACE_TREE</span>
                <div className="space-y-1">
                  {currentMilestone.mockFiles.map((file, idx) => {
                    const isActive = activeFileIdx === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveFileIdx(idx)}
                        className={`
                          w-full flex items-center gap-2 p-2 rounded text-left text-xs font-mono transition cursor-pointer
                          ${isActive 
                            ? 'bg-white dark:bg-[#1A1A1A] text-blue-600 dark:text-white border border-slate-200 dark:border-[#262626] shadow-2xs font-bold' 
                            : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-[#111]'}
                        `}
                      >
                        <File className="w-3.5 h-3.5 text-slate-400" />
                        <span className="truncate">{file.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right file content visualizer */}
              <div className="flex-1 flex flex-col overflow-hidden bg-[#0A0A0A]">
                <div className="bg-[#111] p-2.5 border-b border-[#262626] flex justify-between items-center shrink-0">
                  <span className="text-[10px] text-slate-400 font-bold">{currentMilestone.mockFiles[activeFileIdx]?.name}</span>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(currentMilestone.mockFiles[activeFileIdx]?.code || '');
                      alert('Workbook code successfully copied! Open the Sandbox tab to write, play, or verify behaviors.');
                    }}
                    className="px-2 py-1 bg-[#1A1A1A] hover:bg-[#222] border border-[#262626] text-[#EDEDED] text-[9px] rounded font-bold transition cursor-pointer uppercase tracking-wider"
                  >
                    Copy Code
                  </button>
                </div>
                
                <div className="flex-1 p-4 overflow-auto">
                  <pre className="text-[11px] text-emerald-400 leading-relaxed font-mono">
                    {currentMilestone.mockFiles[activeFileIdx]?.code}
                  </pre>
                </div>
              </div>

            </div>
          </div>

          {/* Sandbox tip */}
          <div className="p-4 border border-slate-200 dark:border-[#262626] bg-white dark:bg-[#0F0F0F] rounded-lg flex gap-3 text-xs text-slate-500 font-mono">
            <HelpCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed font-sans">
              <strong>Workbook Tip:</strong> The file tabs showcase actual, runnable script blocks for each day. Copy and paste codes into the <strong>Code Playground</strong> sandbox to test, visually verify layouts, and complete form submissions!
            </p>
          </div>
        </div>

      </div>

      {/* Footer Navigation */}
      {isMilestoneCompleted && (
        <div className="flex justify-between items-center bg-white dark:bg-[#0F0F0F] border border-slate-200 dark:border-[#262626] p-3 rounded-lg font-mono">
          <span className="text-[10px] font-bold text-slate-500 dark:text-[#666666] uppercase tracking-wider">
            🥇 Day {selectedDay} Project Milestone completed and cataloged! Let's advance.
          </span>
          <button
            onClick={() => {
              if (selectedDay < 12) {
                setSelectedDay(selectedDay + 1);
              } else {
                onViewChange('notes');
              }
            }}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold transition flex items-center gap-1 cursor-pointer uppercase tracking-wider"
          >
            {selectedDay < 12 ? 'NEXT_MILESTONE' : 'GO_NOTES'} <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
}
