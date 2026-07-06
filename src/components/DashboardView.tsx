import React from 'react';
import { 
  CheckCircle, 
  BookOpen, 
  Lightbulb, 
  Code2, 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  Clock, 
  Plus, 
  Award,
  Sparkles,
  Zap,
  Terminal,
  Map
} from 'lucide-react';
import { UserProgress } from '../types';
import { lessons } from '../data/curriculum';

interface DashboardViewProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onViewChange: (view: string) => void;
  setSelectedDayForLesson: (day: number) => void;
}

const roadmapDays = [
  {
    day: 1,
    title: 'HTML Skeleton & Document Metadata',
    tech: 'HTML',
    time: '1.5 Hours',
    topics: ['DOCTYPE & HTML tags', 'head vs body elements', 'essential meta tags', 'responsive layout boilerplates'],
    goals: ['Draft a standard, clean, accessible HTML5 skeletal document frame from scratch.', 'Describe key responsive attributes.']
  },
  {
    day: 2,
    title: 'HTML Interactive Forms & Dynamic Fields',
    tech: 'HTML',
    time: '2.0 Hours',
    topics: ['Form architectures', 'labels and checkboxes', 'special input types', 'native HTML5 validations'],
    goals: ['Construct clean project forms capturing emails, select menus, and minlength assertions.']
  },
  {
    day: 3,
    title: 'CSS Custom Selectors & Box Model Layouts',
    tech: 'CSS',
    time: '2.0 Hours',
    topics: ['Margin, border, padding', 'box-sizing overrides', 'colors, fonts, relative sizing', 'shadow styles'],
    goals: ['Align custom content containers with perfect, spacious margins and eye-pleasing border shapes.']
  },
  {
    day: 4,
    title: 'Tailwind CSS, Flexbox & Grid Layouts',
    tech: 'CSS',
    time: '2.5 Hours',
    topics: ['1D row layouts with Flexbox', '2D grid alignments with Grid', 'Tailwind CSS spacing tokens', 'responsive mobile overrides'],
    goals: ['Construct highly fluid multi-column project grids that adjust from cell phone ports to wide screens.']
  },
  {
    day: 5,
    title: 'JavaScript Essentials & DOM Manipulations',
    tech: 'JavaScript',
    time: '2.5 Hours',
    topics: ['Primitive vs object schemas', 'arrays and callback logic', 'event listeners', 'dynamic card insertions'],
    goals: ['Attach click listeners to input forms to append styled project nodes dynamically inside UI layout sections.']
  },
  {
    day: 6,
    title: 'Asynchronous JS, Promises & API Fetches',
    tech: 'JavaScript',
    time: '3.0 Hours',
    topics: ['Asynchronous loops', 'JS Promises and async/await syntax', 'browser fetch methods', 'CORS error resolutions'],
    goals: ['Load Mock JSON database records using fetch promises with robust loading spinners and crash safety.']
  },
  {
    day: 7,
    title: 'React Components & useState Hook Memory',
    tech: 'React',
    time: '3.0 Hours',
    topics: ['Component reusability', 'passing props properties', 'conditional class styling', 'useState reactive states'],
    goals: ['Migrate raw HTML layouts into a nested React component architecture tracking dynamic counter parameters.']
  },
  {
    day: 8,
    title: 'React useEffect, API Sync & Modal Actions',
    tech: 'React',
    time: '3.5 Hours',
    topics: ['useEffect hook dependencies', 'controlled form inputs', 'mounting/unmounting routines', 'modal toggle dialogs'],
    goals: ['Trigger automatic REST server fetches on component mount and sync list arrays safely upon project additions.']
  },
  {
    day: 9,
    title: 'FastAPI Rest Servers & Pydantic Schemas',
    tech: 'FastAPI',
    time: '3.0 Hours',
    topics: ['FastAPI server initiation', 'Python Type hints', 'Pydantic BaseModel schemas', 'GET & POST controllers'],
    goals: ['Boot a Python backend REST api, validating user project creations before saving into server arrays.']
  },
  {
    day: 10,
    title: 'FastAPI Routers, CORS & Exception Controls',
    tech: 'FastAPI',
    time: '2.5 Hours',
    topics: ['Router divisions with APIRouter', 'cross-origin CORS middleware', 'HTTPException status codes', 'Swagger OpenAPI auto-docs'],
    goals: ['Enable secure communication requests from React ports and raising explicit error payloads on broken routes.']
  },
  {
    day: 11,
    title: 'MongoDB NoSQL & Asynchronous Motor Drivers',
    tech: 'MongoDB',
    time: '3.0 Hours',
    topics: ['NoSQL documents vs tabular SQL databases', 'MongoDB Atlas cloud clusters', 'asynchronous Motor clients', 'serialization helpers'],
    goals: ['Connect FastAPI servers to a MongoDB collection to query, store, and edit hacker entries asynchronously.']
  },
  {
    day: 12,
    title: 'Complete FARM Integration & Live Deployments',
    tech: 'Integration',
    time: '4.0 Hours',
    topics: ['End-to-end CRUD integrations', 'global frontend-to-backend states', 'environmental variable configs', 'production build bundles'],
    goals: ['Compile the completed DevFast platform, uniting React forms, FastAPI routers, and MongoDB Atlas databases.']
  }
];

const quotes = [
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Simplify, then add lightness.", author: "Colin Chapman" },
  { text: "It's not that we have a short time to live, but that we waste much of it.", author: "Seneca" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "Continuous improvement is better than delayed perfection.", author: "Mark Twain" }
];

export default function DashboardView({
  progress,
  onUpdateProgress,
  onViewChange,
  setSelectedDayForLesson
}: DashboardViewProps) {
  const [expandedDay, setExpandedDay] = React.useState<number | null>(progress.activeDay);
  const [hoursToAdd, setHoursToAdd] = React.useState<string>('1');

  // Calculate stats
  const totalDaysCompleted = progress.completedProjectTasks.length;
  const currentQuoteIndex = progress.activeDay % quotes.length;
  const activeQuote = quotes[currentQuoteIndex];

  const handleLogHours = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(hoursToAdd);
    if (!isNaN(parsed) && parsed > 0) {
      onUpdateProgress(prev => ({
        ...prev,
        studyHours: Math.round((prev.studyHours + parsed) * 10) / 10
      }));
      setHoursToAdd('1');
    }
  };

  const toggleDayExpanded = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  const changeActiveDay = (day: number) => {
    onUpdateProgress(prev => ({
      ...prev,
      activeDay: day
    }));
    setExpandedDay(day);
  };

  const toggleChecklistItem = (day: number, task: string) => {
    onUpdateProgress(prev => {
      const dayTasks = prev.checklist[day] || [];
      const updatedTasks = dayTasks.includes(task)
        ? dayTasks.filter(t => t !== task)
        : [...dayTasks, task];
      return {
        ...prev,
        checklist: {
          ...prev.checklist,
          [day]: updatedTasks
        }
      };
    });
  };

  // Check if a day has all checkmarks complete
  const isDayFullyChecked = (dayNum: number) => {
    const dayTasks = progress.checklist[dayNum] || [];
    return dayTasks.length >= 4;
  };

  const handleGoToLesson = (dayNum: number) => {
    setSelectedDayForLesson(dayNum);
    onViewChange('lessons');
  };

  // Count completions
  const totalLessons = lessons.length;
  const completedLessonsCount = progress.completedLessons.length;
  const completedQuizzesCount = progress.completedQuizzes.length;
  const completedChallengesCount = progress.completedChallenges.length;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden p-6 md:p-8 bg-white dark:bg-[#0F0F0F] text-slate-800 dark:text-[#EDEDED] rounded-lg border border-slate-200 dark:border-[#262626] shadow-2xs">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 opacity-5 dark:opacity-10 pointer-events-none">
          <Sparkles className="w-64 h-64 text-blue-400" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-blue-200 dark:border-[#333] text-[9px] font-bold text-blue-600 dark:text-blue-400 font-mono uppercase tracking-widest mb-4">
            <Zap className="w-3.5 h-3.5 fill-current" /> FARM Stack 12-Day Bootcamp
          </span>
          <h2 className="font-mono font-bold text-xl md:text-2xl uppercase tracking-tight mb-2">
            Accelerate Your Hackathon Coding Journey
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mb-6 leading-relaxed">
            Welcome to your interactive curriculum. Complete each daily lesson, take the prediction quizzes, crack challenges in the playground, and piece together the continuous <strong>DevFast</strong> team portal.
          </p>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => handleGoToLesson(progress.activeDay)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
            >
              Continue Day {progress.activeDay} Lesson
            </button>
            <button 
              onClick={() => onViewChange('mentor')}
              className="px-4 py-2 bg-slate-100 dark:bg-[#1A1A1A] hover:bg-slate-200 dark:hover:bg-[#222] border border-slate-200 dark:border-[#262626] rounded text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
            >
              Ask AI Mentor
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="p-4 bg-white dark:bg-[#0F0F0F] border border-slate-200 dark:border-[#262626] rounded-lg shadow-2xs">
          <div className="flex items-center justify-between mb-3 text-slate-400 dark:text-[#666666]">
            <span className="text-[10px] font-bold uppercase tracking-tight">Lessons Progress</span>
            <BookOpen className="w-4 h-4 text-blue-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-slate-800 dark:text-[#EDEDED]">{completedLessonsCount}</span>
            <span className="text-[10px] text-slate-400">/ {totalLessons} READ</span>
          </div>
          <div className="w-full h-1 bg-slate-100 dark:bg-[#222] rounded-full mt-3 overflow-hidden">
            <div 
              className="h-full bg-blue-600" 
              style={{ width: `${(completedLessonsCount / totalLessons) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-[#0F0F0F] border border-slate-200 dark:border-[#262626] rounded-lg shadow-2xs">
          <div className="flex items-center justify-between mb-3 text-slate-400 dark:text-[#666666]">
            <span className="text-[10px] font-bold uppercase tracking-tight">Quizzes Cleared</span>
            <Lightbulb className="w-4 h-4 text-green-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-slate-800 dark:text-[#EDEDED]">{completedQuizzesCount}</span>
            <span className="text-[10px] text-slate-400">/ 12 PASSED</span>
          </div>
          <div className="w-full h-1 bg-slate-100 dark:bg-[#222] rounded-full mt-3 overflow-hidden">
            <div 
              className="h-full bg-green-500" 
              style={{ width: `${(completedQuizzesCount / 12) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-[#0F0F0F] border border-slate-200 dark:border-[#262626] rounded-lg shadow-2xs">
          <div className="flex items-center justify-between mb-3 text-slate-400 dark:text-[#666666]">
            <span className="text-[10px] font-bold uppercase tracking-tight">Challenges Solved</span>
            <Code2 className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-slate-800 dark:text-[#EDEDED]">{completedChallengesCount}</span>
            <span className="text-[10px] text-slate-400">/ 12 CRACKED</span>
          </div>
          <div className="w-full h-1 bg-slate-100 dark:bg-[#222] rounded-full mt-3 overflow-hidden">
            <div 
              className="h-full bg-cyan-500" 
              style={{ width: `${(completedChallengesCount / 12) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-[#0F0F0F] border border-slate-200 dark:border-[#262626] rounded-lg shadow-2xs">
          <div className="flex items-center justify-between mb-3 text-slate-400 dark:text-[#666666]">
            <span className="text-[10px] font-bold uppercase tracking-tight">Project Features</span>
            <Layers className="w-4 h-4 text-rose-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-slate-800 dark:text-[#EDEDED]">{totalDaysCompleted}</span>
            <span className="text-[10px] text-slate-400">/ 12 MILESTONES</span>
          </div>
          <div className="w-full h-1 bg-slate-100 dark:bg-[#222] rounded-full mt-3 overflow-hidden">
            <div 
              className="h-full bg-rose-500" 
              style={{ width: `${(totalDaysCompleted / 12) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Core Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2/3 Roadmap list */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h3 className="font-mono font-bold text-sm text-slate-800 dark:text-[#EDEDED] uppercase tracking-wider flex items-center gap-2">
              <Map className="w-4.5 h-4.5 text-blue-500" />
              12-Day Interactive Roadmap Grid
            </h3>
            <p className="text-xs text-slate-500 dark:text-[#666666] mt-1 uppercase font-semibold">
              Select module indexes to inspect learning tracks and launch active tasks.
            </p>
          </div>

          <div className="space-y-3">
            {roadmapDays.map((dayItem) => {
              const isExpanded = expandedDay === dayItem.day;
              const isActive = progress.activeDay === dayItem.day;
              const isFullyChecked = isDayFullyChecked(dayItem.day);

              return (
                <div 
                  key={dayItem.day} 
                  className={`
                    border rounded-lg transition duration-150 overflow-hidden bg-white dark:bg-[#0F0F0F]
                    ${isActive 
                      ? 'border-blue-500 dark:border-blue-500 bg-slate-50/20 dark:bg-[#0F0F0F]' 
                      : isFullyChecked
                        ? 'border-emerald-200 dark:border-emerald-950/40'
                        : 'border-slate-200 dark:border-[#262626] hover:border-slate-300 dark:hover:border-[#333]'}
                  `}
                >
                  {/* Header row */}
                  <div 
                    onClick={() => toggleDayExpanded(dayItem.day)}
                    className="p-4 flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className={`
                        w-10 h-10 rounded border font-mono font-bold flex flex-col items-center justify-center shrink-0
                        ${isActive 
                          ? 'bg-blue-600 border-blue-500 text-white' 
                          : isFullyChecked
                            ? 'bg-emerald-50/30 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-950/30 text-emerald-700 dark:text-emerald-400'
                            : 'bg-slate-50 dark:bg-[#111] border-slate-200 dark:border-[#262626] text-slate-700 dark:text-[#888]'}
                      `}>
                        <span className="text-[8px] leading-none uppercase">Day</span>
                        <span className="text-base leading-tight font-bold">{dayItem.day}</span>
                      </div>
                      
                      <div className="truncate pr-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                            dayItem.tech === 'HTML' ? 'bg-orange-50 dark:bg-orange-950/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-900/40' :
                            dayItem.tech === 'CSS' ? 'bg-cyan-50 dark:bg-cyan-950/10 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-900/40' :
                            dayItem.tech === 'JavaScript' ? 'bg-yellow-50 dark:bg-yellow-950/10 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900/40' :
                            dayItem.tech === 'React' ? 'bg-sky-50 dark:bg-sky-950/10 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-900/40' :
                            dayItem.tech === 'FastAPI' ? 'bg-emerald-50 dark:bg-emerald-950/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/40' :
                            dayItem.tech === 'MongoDB' ? 'bg-green-50 dark:bg-green-950/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900/40' :
                            'bg-blue-50 dark:bg-blue-950/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/40'
                          }`}>
                            {dayItem.tech}
                          </span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1 font-semibold font-mono uppercase tracking-wider">
                            <Clock className="w-3.5 h-3.5 text-[#555]" /> {dayItem.time}
                          </span>
                          {isFullyChecked && (
                            <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/10 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-900/30 uppercase">
                              Complete
                            </span>
                          )}
                        </div>
                        <h4 className="font-mono font-bold text-slate-800 dark:text-[#EDEDED] text-xs md:text-sm mt-1">
                          {dayItem.title}
                        </h4>
                      </div>
                    </div>
                    
                    <div className="text-slate-400 dark:text-[#444]">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>

                  {/* Accordion body content */}
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-slate-100 dark:border-[#262626] bg-slate-50/30 dark:bg-[#111]/10 space-y-4 text-slate-700 dark:text-slate-300">
                      
                      {/* Topics */}
                      <div className="pt-3">
                        <span className="block text-[10px] font-bold text-slate-400 dark:text-[#666666] font-mono uppercase tracking-wider mb-1.5">Core Topics Covered</span>
                        <div className="flex flex-wrap gap-1.5">
                          {dayItem.topics.map((t, idx) => (
                            <span key={idx} className="bg-white dark:bg-[#111] border border-slate-200 dark:border-[#262626] text-slate-700 dark:text-slate-300 text-xs px-2.5 py-0.5 rounded font-mono font-semibold">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Goals */}
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 dark:text-[#666666] font-mono uppercase tracking-wider mb-1.5">Learning Goals</span>
                        <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 font-medium">
                          {dayItem.goals.map((g, idx) => (
                            <li key={idx}>{g}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Day Action Checklist */}
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 dark:text-[#666666] font-mono uppercase tracking-wider mb-2">Checklist Activities</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-mono">
                          {[
                            'Read Lesson and syntax examples',
                            'Pass prediction output quiz',
                            'Cracking the coding challenge',
                            'Integrate the daily project feature'
                          ].map((task) => {
                            const completedTasks = progress.checklist[dayItem.day] || [];
                            const isChecked = completedTasks.includes(task);

                            return (
                              <button
                                key={task}
                                onClick={() => toggleChecklistItem(dayItem.day, task)}
                                className={`
                                  flex items-center gap-2.5 p-2 rounded text-left text-[11px] border transition cursor-pointer select-none
                                  ${isChecked 
                                    ? 'bg-blue-50/50 dark:bg-blue-950/15 border-blue-200 dark:border-blue-900/50 text-blue-600 dark:text-blue-400 font-bold' 
                                    : 'bg-white dark:bg-[#111] border-slate-200 dark:border-[#262626] text-slate-500 hover:border-slate-300 dark:hover:border-[#333]'}
                                `}
                              >
                                <span className={`w-3.5 h-3.5 rounded-sm border shrink-0 flex items-center justify-center transition ${
                                  isChecked 
                                    ? 'bg-blue-600 border-blue-500 text-white' 
                                    : 'border-slate-300 dark:border-[#262626] bg-white dark:bg-[#111]'
                                }`}>
                                  {isChecked && <CheckCircle className="w-2.5 h-2.5 fill-current" />}
                                </span>
                                <span className={isChecked ? 'line-through opacity-85' : ''}>{task}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Buttons Action footer */}
                      <div className="pt-3 border-t border-slate-100 dark:border-[#262626] flex flex-wrap gap-2 justify-between items-center">
                        <div>
                          {!isActive && (
                            <button
                              onClick={() => changeActiveDay(dayItem.day)}
                              className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer font-mono uppercase tracking-wider"
                            >
                              SET_ACTIVE_FOCUS_DAY
                            </button>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleGoToLesson(dayItem.day)}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded text-[11px] transition cursor-pointer uppercase tracking-wider flex items-center gap-1"
                          >
                            <BookOpen className="w-3.5 h-3.5" /> Start Lesson
                          </button>
                          <button
                            onClick={() => onViewChange('playground')}
                            className="px-3 py-1.5 bg-slate-100 dark:bg-[#1A1A1A] hover:bg-slate-200 dark:hover:bg-[#222] border border-slate-200 dark:border-[#262626] text-slate-700 dark:text-slate-300 font-bold rounded text-[11px] transition cursor-pointer flex items-center gap-1 uppercase tracking-wider"
                          >
                            <Terminal className="w-3.5 h-3.5" /> Sandbox
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1/3 sidebar columns */}
        <div className="space-y-6">
          
          {/* Active Day Focus Panel */}
          <div className="p-5 bg-white dark:bg-[#0F0F0F] border border-slate-200 dark:border-[#262626] rounded-lg shadow-2xs space-y-4 font-mono">
            <div>
              <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold text-[10px] uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" /> Today's Focus Matrix
              </div>
              <h3 className="font-bold text-sm text-slate-800 dark:text-[#EDEDED] mt-1 uppercase">
                Day {progress.activeDay} Milestones
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Complete daily gates to unlock further days.
              </p>
            </div>

            <div className="space-y-2">
              {[
                { id: 'lessons', label: 'Complete Daily Lesson', icon: BookOpen, check: progress.checklist[progress.activeDay]?.includes('Read Lesson and syntax examples') },
                { id: 'quizzes', label: 'Ace Interactive Quiz', icon: Lightbulb, check: progress.checklist[progress.activeDay]?.includes('Pass prediction output quiz') },
                { id: 'challenges', label: 'Crack Code Challenge', icon: Code2, check: progress.checklist[progress.activeDay]?.includes('Cracking the coding challenge') },
                { id: 'project', label: 'Build FARM Project Feature', icon: Layers, check: progress.checklist[progress.activeDay]?.includes('Integrate the daily project feature') },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => onViewChange(item.id)}
                  className={`
                    w-full flex items-center justify-between p-2.5 border text-xs font-semibold transition text-left cursor-pointer rounded
                    ${item.check 
                      ? 'bg-emerald-50/20 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-950 text-slate-700 dark:text-[#EDEDED]' 
                      : 'bg-slate-50 dark:bg-[#111] border-slate-200 dark:border-[#262626] text-slate-600 dark:text-[#888] hover:border-slate-300 dark:hover:border-[#333]'}
                  `}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded-sm ${item.check ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-200 dark:bg-[#1D1D1D] text-slate-500'}`}>
                      <item.icon className="w-3.5 h-3.5" />
                    </div>
                    <span>{item.label}</span>
                  </div>
                  <span className={`w-3.5 h-3.5 rounded-sm border shrink-0 flex items-center justify-center font-bold text-[8px] ${
                    item.check 
                      ? 'bg-emerald-600 border-emerald-500 text-white' 
                      : 'border-slate-300 dark:border-[#262626]'
                  }`}>
                    {item.check ? '✓' : ''}
                  </span>
                </button>
              ))}
            </div>

            <div className="pt-1">
              <button 
                onClick={() => {
                  const nextDay = progress.activeDay < 12 ? progress.activeDay + 1 : 12;
                  changeActiveDay(nextDay);
                }}
                disabled={progress.activeDay === 12}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 text-white rounded text-xs font-bold transition cursor-pointer disabled:cursor-not-allowed text-center uppercase tracking-wider"
              >
                Advance to Next Day
              </button>
            </div>
          </div>

          {/* Log Study Hours Card */}
          <div className="p-5 bg-white dark:bg-[#0F0F0F] border border-slate-200 dark:border-[#262626] rounded-lg shadow-2xs space-y-4 font-mono">
            <div>
              <h4 className="font-bold text-sm text-slate-800 dark:text-[#EDEDED] uppercase">
                LOG_STUDY_HOURS
              </h4>
              <p className="text-[10px] text-slate-400 mt-1 uppercase">
                Accumulate dedicated code training minutes.
              </p>
            </div>

            <form onSubmit={handleLogHours} className="flex gap-2">
              <input 
                type="number" 
                step="0.5"
                min="0.5"
                max="12"
                value={hoursToAdd}
                onChange={(e) => setHoursToAdd(e.target.value)}
                className="w-20 px-3 py-2 border border-slate-200 dark:border-[#262626] rounded text-xs bg-slate-50 dark:bg-[#111] text-slate-800 dark:text-[#EDEDED] text-center font-mono focus:ring-1 focus:ring-blue-500 focus:outline-none"
                placeholder="Hours"
              />
              <button 
                type="submit"
                className="flex-1 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-black text-[11px] font-bold py-2 px-3 rounded flex items-center justify-center gap-1.5 transition cursor-pointer uppercase tracking-wider"
              >
                <Plus className="w-3.5 h-3.5" /> Add Hours
              </button>
            </form>

            <div className="p-3 bg-blue-50/40 dark:bg-blue-950/10 rounded border border-blue-100 dark:border-blue-950/30 flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-500 shrink-0" />
              <div>
                <span className="block text-[8px] text-slate-400 uppercase font-mono tracking-widest font-semibold">TOTAL PRACTICE TIMED</span>
                <span className="font-bold text-slate-800 dark:text-blue-300 text-xs font-mono">{progress.studyHours} HOURS TOTAL</span>
              </div>
            </div>
          </div>

          {/* Motivation Quote panel */}
          <div className="p-4 bg-slate-50/50 dark:bg-[#111]/20 border border-slate-200 dark:border-[#262626] rounded-lg space-y-2.5 relative overflow-hidden font-mono">
            <span className="inline-block text-[8px] font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
              Proverb for the active day
            </span>
            <blockquote className="text-slate-500 dark:text-slate-400 font-semibold text-xs leading-relaxed italic">
              "{activeQuote.text}"
            </blockquote>
            <cite className="block text-[9px] text-slate-400 dark:text-slate-500 font-bold not-italic text-right uppercase">
              — {activeQuote.author}
            </cite>
          </div>

        </div>

      </div>
    </div>
  );
}
