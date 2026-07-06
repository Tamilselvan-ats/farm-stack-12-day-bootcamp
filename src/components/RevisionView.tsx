import React from 'react';
import { 
  Map, 
  BookOpen, 
  Layers, 
  HelpCircle, 
  Code2, 
  Sparkles, 
  Bookmark, 
  ArrowLeft, 
  ArrowRight, 
  CornerDownRight,
  FileCode,
  CheckCircle2
} from 'lucide-react';
import { flashcards, cheatsheets, interviewQuestions } from '../data/curriculum';

export default function RevisionView() {
  const [activeSubTab, setActiveSubTab] = React.useState<'flashcards' | 'cheatsheets' | 'interview'>('flashcards');
  
  // Flashcards States
  const [selectedTech, setSelectedTech] = React.useState<string>('All');
  const [currentCardIdx, setCurrentCardIdx] = React.useState<number>(0);
  const [isFlipped, setIsFlipped] = React.useState<boolean>(false);

  // Filter flashcards
  const filteredFlashcards = flashcards.filter(c => 
    selectedTech === 'All' || c.technology.toLowerCase() === selectedTech.toLowerCase()
  );

  // Reset indices on tag change
  React.useEffect(() => {
    setCurrentCardIdx(0);
    setIsFlipped(false);
  }, [selectedTech]);

  const handleNextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (currentCardIdx < filteredFlashcards.length - 1) {
        setCurrentCardIdx(currentCardIdx + 1);
      } else {
        setCurrentCardIdx(0); // Loop
      }
    }, 150);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (currentCardIdx > 0) {
        setCurrentCardIdx(currentCardIdx - 1);
      } else {
        setCurrentCardIdx(filteredFlashcards.length - 1); // Loop
      }
    }, 150);
  };

  const activeCard = filteredFlashcards[currentCardIdx];

  // Cheat sheets and interview questions accordion states
  const [expandedQuestionId, setExpandedQuestionId] = React.useState<string | null>(null);

  const toggleQuestion = (id: string) => {
    setExpandedQuestionId(expandedQuestionId === id ? null : id);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-sans font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-[#EDEDED] flex items-center gap-2 uppercase tracking-wide">
            <Map className="w-7 h-7 text-blue-500" /> Revision Mode Workspace
          </h2>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 font-sans leading-relaxed">
            Browse structured flashcards, rapid syntax cheatsheets, and common interview checks to lock in code habits.
          </p>
        </div>

        {/* Sub Navigation controls */}
        <div className="flex border border-slate-200 dark:border-[#262626] rounded bg-white dark:bg-[#0F0F0F] p-1 divide-x divide-slate-200 dark:divide-[#262626] shrink-0 font-mono">
          {[
            { id: 'flashcards', label: 'Flashcards', icon: BookOpen },
            { id: 'cheatsheets', label: 'Cheat Sheets', icon: FileCode },
            { id: 'interview', label: 'Interview Prep', icon: HelpCircle }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSubTab(item.id as 'flashcards' | 'cheatsheets' | 'interview')}
              className={`
                px-4 py-2 text-xs font-bold flex items-center gap-1.5 transition rounded-sm cursor-pointer uppercase tracking-wider
                ${activeSubTab === item.id 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#111]'}
              `}
            >
              <item.icon className="w-4 h-4 text-slate-400" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* CORE ACTIVE TABS */}

      {/* Flashcards View */}
      {activeSubTab === 'flashcards' && (
        <div className="space-y-6 animate-fade-in-up font-mono">
          
          {/* Tech selectors row */}
          <div className="flex flex-wrap gap-1.5 justify-center">
            {['All', 'HTML', 'CSS', 'JavaScript', 'React', 'FastAPI', 'MongoDB'].map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`
                  px-3.5 py-1.5 rounded text-xs font-bold transition border cursor-pointer uppercase tracking-wider
                  ${selectedTech === tech 
                    ? 'bg-blue-600/10 dark:bg-blue-600/25 border-blue-500 text-blue-600 dark:text-blue-400' 
                    : 'bg-white dark:bg-[#0F0F0F] border-slate-200 dark:border-[#262626] text-slate-500 hover:border-[#333]'}
                `}
              >
                {tech}
              </button>
            ))}
          </div>

          {filteredFlashcards.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-[#0F0F0F] border border-slate-200 dark:border-[#262626] rounded-lg text-slate-400 font-sans">
              No flashcards found for this technology.
            </div>
          ) : (
            <div className="max-w-xl mx-auto space-y-6">
              
              {/* Interactive Flashcard Card */}
              <div 
                onClick={() => setIsFlipped(!isFlipped)}
                className={`
                  h-64 rounded-lg border flex flex-col items-center justify-center p-8 text-center cursor-pointer select-none transition-all duration-300 transform shadow-2xs font-mono
                  ${isFlipped 
                    ? 'bg-[#1A1A1A] border-[#262626] text-[#EDEDED] rotate-y-180' 
                    : 'bg-white dark:bg-[#0F0F0F] border-slate-200 dark:border-[#262626] text-slate-800 dark:text-[#EDEDED]'}
                `}
              >
                <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500">
                  <Bookmark className="w-3.5 h-3.5" /> {activeCard.technology}
                </div>

                <div className="space-y-4">
                  <span className="inline-block text-[10px] font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
                    {isFlipped ? 'Answer Revealed' : 'Flashcard Query'}
                  </span>
                  
                  <p className="font-sans font-extrabold text-lg md:text-xl leading-relaxed text-[#EDEDED]">
                    {isFlipped ? activeCard.back : activeCard.front}
                  </p>
                  
                  <span className="block text-[10px] text-slate-500 dark:text-slate-600 font-bold uppercase tracking-wider">
                    (Click Card to {isFlipped ? 'Show Query' : 'Flip & Reveal answer'})
                  </span>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex justify-between items-center bg-white dark:bg-[#0F0F0F] border border-slate-200 dark:border-[#262626] p-4 rounded-lg">
                <button
                  onClick={handlePrevCard}
                  className="px-4 py-2 bg-slate-50 dark:bg-[#1A1A1A] hover:bg-slate-100 dark:hover:bg-[#222] border border-slate-200 dark:border-[#262626] text-slate-700 dark:text-slate-200 text-xs font-bold rounded transition flex items-center gap-1 cursor-pointer uppercase tracking-wider"
                >
                  <ArrowLeft className="w-4 h-4" /> Prev
                </button>

                <span className="text-xs text-slate-400 font-bold">
                  CARD_{String(currentCardIdx + 1).padStart(2, '0')} / {String(filteredFlashcards.length).padStart(2, '0')}
                </span>

                <button
                  onClick={handleNextCard}
                  className="px-4 py-2 bg-slate-50 dark:bg-[#1A1A1A] hover:bg-slate-100 dark:hover:bg-[#222] border border-slate-200 dark:border-[#262626] text-slate-700 dark:text-slate-200 text-xs font-bold rounded transition flex items-center gap-1 cursor-pointer uppercase tracking-wider"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>
      )}

      {/* Cheat Sheets View */}
      {activeSubTab === 'cheatsheets' && (
        <div className="grid grid-cols-1 gap-8 animate-fade-in-up font-mono">
          {cheatsheets.map((sheet) => (
            <div 
              key={sheet.id} 
              className="p-5 bg-white dark:bg-[#0F0F0F] border border-slate-200 dark:border-[#262626] rounded-lg shadow-2xs space-y-6 transition-colors duration-200"
            >
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#262626] pb-3">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-900/40 text-[9px] font-bold px-2.5 py-0.5 rounded uppercase tracking-widest">
                    {sheet.technology}
                  </span>
                  <h3 className="font-bold text-slate-800 dark:text-[#EDEDED] text-sm uppercase tracking-wider">
                    {sheet.title}
                  </h3>
                </div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Syntax Blueprint Sheet</span>
              </div>

              {/* Sheet content codes list */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {sheet.content.map((item, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 dark:bg-[#0A0A0A]/40 border border-slate-200 dark:border-[#262626] rounded-sm space-y-3 flex flex-col justify-between">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-800 dark:text-slate-200 text-xs flex items-center gap-1.5 uppercase tracking-wide">
                        <CornerDownRight className="w-3.5 h-3.5 text-blue-500" /> {item.title}
                      </span>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </div>

                    <div className="bg-[#0A0A0A] text-emerald-400 p-2.5 rounded-sm border border-[#262626] font-mono text-[10px] overflow-x-auto relative group">
                      <pre>{item.code}</pre>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(item.code);
                          alert('Syntax code copied to clipboard!');
                        }}
                        className="absolute right-1 top-1 bg-slate-800 text-slate-300 text-[8px] font-bold px-1 rounded hover:bg-slate-700 font-sans cursor-pointer transition opacity-0 group-hover:opacity-100"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Technical Interview Preparation View */}
      {activeSubTab === 'interview' && (
        <div className="space-y-4 animate-fade-in-up font-mono">
          <div className="p-4 border border-slate-200 dark:border-[#262626] bg-white dark:bg-[#0F0F0F] rounded-lg flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              <strong>Hackathon & Interview Readiness:</strong> Read typical questions, predict solutions, and unfold answers. Learn to articulate tech choices clearly to final pitch panels.
            </p>
          </div>

          <div className="space-y-3">
            {interviewQuestions.map((iq) => {
              const isExpanded = expandedQuestionId === iq.id;
              return (
                <div 
                  key={iq.id} 
                  className="border border-slate-200 dark:border-[#262626] rounded-lg overflow-hidden bg-white dark:bg-[#0F0F0F]"
                >
                  <div 
                    onClick={() => toggleQuestion(iq.id)}
                    className="p-4 md:p-5 flex justify-between items-center cursor-pointer select-none"
                  >
                    <div className="flex gap-3 pr-4">
                      <span className="bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-[#262626] text-[#888] text-[9px] font-bold px-2 py-1 rounded h-fit uppercase tracking-wider">
                        {iq.technology}
                      </span>
                      <h4 className="font-bold text-slate-800 dark:text-[#EDEDED] text-xs uppercase tracking-wide">
                        {iq.question}
                      </h4>
                    </div>
                    <span className="text-[10px] text-blue-500 font-bold shrink-0 uppercase tracking-wider">
                      {isExpanded ? 'Hide Answer' : 'Reveal Answer'}
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="p-5 border-t border-slate-200 dark:border-[#262626] bg-slate-50 dark:bg-[#111] text-xs text-[#EDEDED] leading-relaxed space-y-2 animate-fade-in-up">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Sample Interview Explanation answer
                      </span>
                      <p className="pl-4 border-l-2 border-emerald-500 font-medium font-sans text-slate-400 leading-relaxed">
                        {iq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
