import React from 'react';
import { UserProgress } from './types';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import LessonsView from './components/LessonsView';
import PlaygroundView from './components/PlaygroundView';
import QuizzesView from './components/QuizzesView';
import ChallengesView from './components/ChallengesView';
import ProjectBuilderView from './components/ProjectBuilderView';
import NotesView from './components/NotesView';
import RevisionView from './components/RevisionView';
import MentorChatView from './components/MentorChatView';
import { Flame, Sparkles } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = React.useState<string>('dashboard');
  const [selectedDay, setSelectedDay] = React.useState<number>(1);
  const [darkMode, setDarkMode] = React.useState<boolean>(false);

  // Initialize progress state
  const [progress, setProgress] = React.useState<UserProgress>({
    activeDay: 1,
    completedLessons: [],
    completedQuizzes: [],
    completedChallenges: [],
    completedProjectTasks: [],
    studyHours: 0,
    checklist: {}
  });

  // Load state on mount
  React.useEffect(() => {
    try {
      const savedProgress = localStorage.getItem('farm_bootcamp_user_progress');
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        setProgress(parsed);
        if (parsed.activeDay) {
          setSelectedDay(parsed.activeDay);
        }
      }

      const savedTheme = localStorage.getItem('farm_bootcamp_dark_mode');
      if (savedTheme === 'true') {
        setDarkMode(true);
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (err) {
      console.error("Failed to load local storage configurations:", err);
    }
  }, []);

  const handleUpdateProgress = (updater: (prev: UserProgress) => UserProgress) => {
    setProgress(prev => {
      const updated = updater(prev);
      localStorage.setItem('farm_bootcamp_user_progress', JSON.stringify(updated));
      return updated;
    });
  };

  const handleToggleDarkMode = () => {
    setDarkMode(prev => {
      const nextTheme = !prev;
      localStorage.setItem('farm_bootcamp_dark_mode', String(nextTheme));
      if (nextTheme) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return nextTheme;
    });
  };

  // Calculate dynamic overall progress
  // Let's count completion across four categories (12 elements each)
  const totalItems = 48; // 12 lessons, 12 quizzes, 12 challenges, 12 projects
  const completedCount = 
    progress.completedLessons.length + 
    progress.completedQuizzes.length + 
    progress.completedChallenges.length + 
    progress.completedProjectTasks.length;

  const overallProgressPercent = Math.min(Math.round((completedCount / totalItems) * 100), 100);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#F5F5F5] dark:bg-[#050505] text-[#1A1A1A] dark:text-[#EDEDED] transition-colors duration-200">
      
      {/* Persistent Sidebar panel */}
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        activeDay={progress.activeDay}
        studyHours={progress.studyHours}
        overallProgressPercent={overallProgressPercent}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* Primary Right Content frame */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Rail */}
        <header className="hidden lg:flex h-16 items-center justify-between px-8 border-b border-slate-200 dark:border-[#262626] bg-white/85 dark:bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-20 transition-colors duration-200">
          <div className="flex items-center gap-6">
            <div className="text-xs font-mono text-slate-500 dark:text-[#666666] uppercase tracking-wider">
              BOOTCAMP_WS / <span className="text-slate-800 dark:text-[#EDEDED]">DAY_{String(progress.activeDay).padStart(2, '0')}_FOCUS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded border border-blue-200 dark:border-[#333] text-[9px] font-bold text-blue-600 dark:text-blue-400">ACTIVE</span>
              <span className="px-2 py-0.5 rounded border border-slate-200 dark:border-[#333] text-[9px] font-bold text-slate-500 dark:text-[#666] uppercase tracking-wide">
                HACKATHON RUNTIME
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900 rounded text-[10px] font-mono font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-current animate-pulse" /> Speed Run
            </div>
            
            <div className="h-4 w-px bg-slate-200 dark:bg-[#262626]"></div>

            <button
              onClick={() => setCurrentView('mentor')}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black text-[11px] font-bold rounded uppercase tracking-widest transition-colors cursor-pointer"
            >
              Ask Aria
            </button>
          </div>
        </header>

        {/* Content canvas */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          {currentView === 'dashboard' && (
            <DashboardView
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
              onViewChange={setCurrentView}
              setSelectedDayForLesson={setSelectedDay}
            />
          )}

          {currentView === 'lessons' && (
            <LessonsView
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              onViewChange={setCurrentView}
            />
          )}

          {currentView === 'playground' && (
            <PlaygroundView
              selectedDay={selectedDay}
            />
          )}

          {currentView === 'quizzes' && (
            <QuizzesView
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              onViewChange={setCurrentView}
            />
          )}

          {currentView === 'challenges' && (
            <ChallengesView
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              onViewChange={setCurrentView}
            />
          )}

          {currentView === 'project' && (
            <ProjectBuilderView
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              onViewChange={setCurrentView}
            />
          )}

          {currentView === 'notes' && (
            <NotesView />
          )}

          {currentView === 'revision' && (
            <RevisionView />
          )}

          {currentView === 'mentor' && (
            <MentorChatView
              progress={progress}
            />
          )}
        </div>
      </main>

    </div>
  );
}
