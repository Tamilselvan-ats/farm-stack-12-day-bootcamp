import React from 'react';
import { 
  LayoutGrid, 
  Map, 
  BookOpen, 
  Terminal, 
  Lightbulb, 
  Code2, 
  Layers, 
  FileText, 
  Sparkles, 
  Flame, 
  Moon, 
  Sun,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  activeDay: number;
  studyHours: number;
  overallProgressPercent: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Sidebar({
  currentView,
  onViewChange,
  activeDay,
  studyHours,
  overallProgressPercent,
  darkMode,
  onToggleDarkMode
}: SidebarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'lessons', label: 'Bootcamp Lessons', icon: BookOpen },
    { id: 'playground', label: 'Code Playground', icon: Terminal },
    { id: 'quizzes', label: 'Interactive Quizzes', icon: Lightbulb },
    { id: 'challenges', label: 'Coding Challenges', icon: Code2 },
    { id: 'project', label: 'FARM Project Builder', icon: Layers },
    { id: 'notes', label: 'Personal Notes', icon: FileText },
    { id: 'revision', label: 'Revision Mode', icon: Map },
    { id: 'mentor', label: 'AI Hackathon Mentor', icon: Sparkles },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-200 dark:border-[#262626] bg-white dark:bg-[#0F0F0F] sticky top-0 z-40 transition-colors duration-200">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded-sm flex items-center justify-center font-bold text-white text-xs">F</div>
          <span className="font-mono font-bold text-sm text-slate-900 dark:text-[#EDEDED] uppercase tracking-tight">FARM Bootcamp</span>
          <span className="bg-blue-50 dark:bg-[#1A1A1A] border border-blue-200 dark:border-[#262626] text-blue-600 dark:text-blue-400 text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold">
            Day {activeDay}/12
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleDarkMode}
            className="p-1.5 rounded border border-slate-200 dark:border-[#262626] bg-slate-50 dark:bg-[#111] text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1A1A1A] transition"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded border border-slate-200 dark:border-[#262626] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1A1A1A] transition"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Wrapper */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-[#FAFAFA] dark:bg-[#0F0F0F] border-r border-slate-200 dark:border-[#262626] 
        flex flex-col transform lg:transform-none transition-transform duration-250 ease-in-out lg:sticky lg:h-screen lg:top-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Sidebar Header */}
        <div className="p-6 flex items-center justify-between border-b border-slate-200 dark:border-[#262626]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-blue-600 rounded-sm flex items-center justify-center font-extrabold text-white text-sm">
              F
            </div>
            <div>
              <h1 className="font-mono font-bold text-sm text-slate-900 dark:text-[#EDEDED] uppercase tracking-tight leading-tight">FARM Bootcamp</h1>
              <span className="text-[9px] text-slate-400 dark:text-[#666666] font-mono tracking-widest uppercase font-semibold">12-Day Hackathon Prep</span>
            </div>
          </div>
        </div>

        {/* User Quick Progress Overview */}
        <div className="p-5 border-b border-slate-200 dark:border-[#262626] bg-slate-50/50 dark:bg-[#111]/30">
          <div className="flex items-center justify-between mb-1.5 font-mono">
            <span className="text-[10px] text-slate-500 dark:text-[#666666] font-bold uppercase tracking-wider">Bootcamp Progress</span>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-bold">{overallProgressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 dark:bg-[#222] rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-500" 
              style={{ width: `${overallProgressPercent}%` }}
            />
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 font-mono">
            <div className="p-2 bg-white dark:bg-[#111] border border-slate-200 dark:border-[#262626] rounded">
              <span className="block text-[9px] text-slate-400 dark:text-[#555] font-bold uppercase tracking-tighter">Current</span>
              <span className="font-bold text-slate-800 dark:text-[#EDEDED] text-xs">Day {activeDay}/12</span>
            </div>
            <div className="p-2 bg-white dark:bg-[#111] border border-slate-200 dark:border-[#262626] rounded text-center">
              <span className="block text-[9px] text-slate-400 dark:text-[#555] font-bold uppercase tracking-tighter">Studied</span>
              <span className="font-bold text-slate-800 dark:text-[#EDEDED] text-xs">{studyHours} Hrs</span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="text-[10px] px-6 pt-4 text-slate-400 dark:text-[#444] uppercase font-bold tracking-wider font-mono">Curriculum</div>
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = currentView === item.id;
            const itemNum = String(index + 1).padStart(2, '0');
            return (
              <button
                key={item.id}
                onClick={() => {
                  onViewChange(item.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 rounded text-xs transition duration-150 font-medium
                  ${isActive 
                    ? 'bg-slate-200/60 dark:bg-[#1A1A1A] text-blue-600 dark:text-white border border-slate-300/40 dark:border-[#262626]' 
                    : 'text-slate-600 dark:text-[#888888] hover:bg-slate-100 dark:hover:bg-[#1A1A1A] hover:text-slate-900 dark:hover:text-[#EDEDED]'}
                `}
              >
                <span className="text-[10px] font-mono opacity-50 font-bold">{itemNum}</span>
                <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-[#555]'}`} />
                <span className="truncate">{item.label}</span>
                {item.id === 'mentor' && (
                  <span className="ml-auto flex h-1.5 w-1.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-[#262626] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-slate-100 dark:bg-[#111] border border-slate-200 dark:border-[#262626] rounded flex items-center justify-center font-bold text-blue-600 dark:text-[#EDEDED] font-mono text-xs">
              H
            </div>
            <div className="truncate">
              <span className="block text-xs font-bold text-slate-800 dark:text-[#EDEDED] truncate">Hacker Active</span>
              <span className="block text-[9px] text-slate-400 dark:text-[#555] font-mono uppercase tracking-widest font-semibold">Ready to Pitch</span>
            </div>
          </div>
          <button 
            onClick={onToggleDarkMode}
            className="p-1.5 rounded border border-slate-200 dark:border-[#262626] bg-slate-50 dark:bg-[#111] text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1A1A1A] transition"
            title="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>
      </aside>

      {/* Overlay on Mobile */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/60 z-20 lg:hidden"
        />
      )}
    </>
  );
}
