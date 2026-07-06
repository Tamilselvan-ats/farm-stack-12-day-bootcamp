import React from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Bookmark, 
  Search, 
  Sparkles, 
  Save, 
  Edit,
  Tag,
  CheckCircle2
} from 'lucide-react';
import { UserProgress } from '../types';

interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
}

export default function NotesView() {
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = React.useState<string | null>(null);
  const [title, setTitle] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');
  const [tag, setTag] = React.useState<string>('General');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [toastMessage, setToastMessage] = React.useState<string>('');

  // Load from local storage on mount
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('farm_bootcamp_user_notes');
      if (saved) {
        const parsed = JSON.parse(saved);
        setNotes(parsed);
        if (parsed.length > 0) {
          setSelectedNoteId(parsed[0].id);
          setTitle(parsed[0].title);
          setContent(parsed[0].content);
          setTag(parsed[0].tag);
        }
      } else {
        // Seed default template note
        const defaultNotes: Note[] = [
          {
            id: 'seed-1',
            title: 'Welcome to Your Study Notes',
            content: `Use this persistent notepad workspace to write down syntax formulas, cheat codes, or brainstorm details for your final hackathon submission.

💡 Day 4 Grid Cheat Code:
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))

✨ FastAPI Router Setup:
router = APIRouter(prefix="/users", tags=["Users"])`,
            tag: 'General',
            createdAt: new Date().toLocaleDateString()
          }
        ];
        setNotes(defaultNotes);
        setSelectedNoteId(defaultNotes[0].id);
        setTitle(defaultNotes[0].title);
        setContent(defaultNotes[0].content);
        setTag(defaultNotes[0].tag);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  // Save to local storage
  const saveNotesToDisk = (updated: Note[]) => {
    localStorage.setItem('farm_bootcamp_user_notes', JSON.stringify(updated));
  };

  const handleSelectNote = (note: Note) => {
    setSelectedNoteId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setTag(note.tag);
  };

  const handleAddNewNote = () => {
    const newNote: Note = {
      id: 'note_' + Date.now(),
      title: 'New Study Note',
      content: '',
      tag: 'General',
      createdAt: new Date().toLocaleDateString()
    };

    const updated = [newNote, ...notes];
    setNotes(updated);
    saveNotesToDisk(updated);
    handleSelectNote(newNote);
    showToast('Created new blank note!');
  };

  const handleSaveNote = () => {
    if (!selectedNoteId) return;

    const updated = notes.map(n => {
      if (n.id === selectedNoteId) {
        return {
          ...n,
          title: title || 'Untitled Note',
          content: content,
          tag: tag
        };
      }
      return n;
    });

    setNotes(updated);
    saveNotesToDisk(updated);
    showToast('✓ Note successfully saved!');
  };

  const handleDeleteNote = (idToDelete: string) => {
    const updated = notes.filter(n => n.id !== idToDelete);
    setNotes(updated);
    saveNotesToDisk(updated);

    if (selectedNoteId === idToDelete) {
      if (updated.length > 0) {
        handleSelectNote(updated[0]);
      } else {
        setSelectedNoteId(null);
        setTitle('');
        setContent('');
        setTag('General');
      }
    }
    showToast('Note deleted.');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2500);
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Title */}
      <div>
        <h2 className="font-sans font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-[#EDEDED] flex items-center gap-2 uppercase tracking-wide">
          <FileText className="w-7 h-7 text-blue-500" /> Personal Notes Workspace
        </h2>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 font-sans leading-relaxed">
          Draft study journals, key shortcuts, or hackathon team structures. Notes persist in your browser automatically.
        </p>
      </div>

      {/* Main Core Editor Split */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch h-[540px]">
        
        {/* Left Side: Directory Sidebar (Col Span 4) */}
        <div className="md:col-span-4 flex flex-col border border-slate-200 dark:border-[#262626] bg-white dark:bg-[#0F0F0F] rounded-lg overflow-hidden shadow-2xs transition-colors duration-200 font-mono">
          
          {/* Header & Search */}
          <div className="p-4 border-b border-slate-200 dark:border-[#262626] space-y-3 shrink-0">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">My Journal List</span>
              <button
                onClick={handleAddNewNote}
                className="px-2 py-1 bg-[#1A1A1A] hover:bg-[#222] border border-[#262626] text-white rounded text-[10px] font-bold transition flex items-center gap-0.5 cursor-pointer uppercase tracking-wider"
              >
                <Plus className="w-3.5 h-3.5" /> Note
              </button>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-[#262626] rounded bg-[#111] text-slate-800 dark:text-[#EDEDED] text-xs focus:outline-none uppercase tracking-wider font-mono"
                placeholder="Search notes..."
              />
            </div>
          </div>

          {/* Scrolling Note Card Cards */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-[#262626] p-2 space-y-1 bg-[#0F0F0F]">
            {filteredNotes.length === 0 ? (
              <div className="p-6 text-center text-slate-500 text-xs font-sans">
                No matching notes found. Create a new journal entry to begin tracking!
              </div>
            ) : (
              filteredNotes.map((note) => {
                const isSelected = selectedNoteId === note.id;
                return (
                  <div
                    key={note.id}
                    onClick={() => handleSelectNote(note)}
                    className={`
                      p-3.5 rounded text-left transition cursor-pointer select-none group relative
                      ${isSelected 
                        ? 'bg-slate-100 dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#262626] text-slate-800 dark:text-[#EDEDED] shadow-2xs font-bold' 
                        : 'hover:bg-slate-50 dark:hover:bg-[#111] border border-transparent'}
                    `}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border ${
                        note.tag === 'HTML' ? 'bg-orange-500/15 text-orange-400 border-orange-950/40' :
                        note.tag === 'CSS' ? 'bg-cyan-500/15 text-cyan-400 border-cyan-950/40' :
                        note.tag === 'JavaScript' ? 'bg-yellow-500/15 text-yellow-400 border-yellow-950/40' :
                        note.tag === 'React' ? 'bg-sky-500/15 text-sky-400 border-sky-950/40' :
                        note.tag === 'FastAPI' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-950/40' :
                        note.tag === 'MongoDB' ? 'bg-green-500/15 text-green-400 border-green-950/40' :
                        'bg-slate-100 dark:bg-[#111] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-[#262626]'
                      }`}>
                        {note.tag}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{note.createdAt}</span>
                    </div>

                    <h4 className="font-sans font-bold text-slate-800 dark:text-[#EDEDED] text-xs truncate mt-2 uppercase tracking-wide">
                      {note.title || 'Untitled Note'}
                    </h4>
                    
                    <p className="text-[11px] text-slate-500 truncate mt-1 leading-relaxed font-sans">
                      {note.content || 'Write some concepts here...'}
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNote(note.id);
                      }}
                      className="absolute right-3 bottom-3 p-1 text-slate-300 dark:text-slate-600 hover:text-rose-500 rounded transition opacity-0 group-hover:opacity-100 cursor-pointer"
                      title="Delete entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Markdown Note Editor (Col Span 8) */}
        <div className="md:col-span-8 flex flex-col border border-slate-200 dark:border-[#262626] bg-white dark:bg-[#0F0F0F] rounded-lg overflow-hidden shadow-2xs transition-colors duration-200 font-mono">
          {selectedNoteId ? (
            <>
              {/* Toolbar metadata */}
              <div className="p-4 border-b border-slate-200 dark:border-[#262626] bg-slate-50 dark:bg-[#111] grid grid-cols-1 md:grid-cols-3 gap-3 items-center shrink-0">
                <div className="md:col-span-2">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-transparent border-none font-bold text-slate-800 dark:text-[#EDEDED] text-xs uppercase tracking-wider focus:outline-none"
                    placeholder="Enter Note Title..."
                  />
                </div>
                
                <div className="flex gap-2 items-center justify-end">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tag:</span>
                  <select
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="px-2 py-1.5 border border-slate-200 dark:border-[#262626] bg-white dark:bg-[#111] text-slate-700 dark:text-[#EDEDED] text-xs rounded font-bold focus:outline-none cursor-pointer uppercase tracking-wider font-mono"
                  >
                    {['General', 'HTML', 'CSS', 'JavaScript', 'React', 'FastAPI', 'MongoDB', 'Ideas'].map(t => (
                      <option key={t} value={t}>{t.toUpperCase()}</option>
                    ))}
                  </select>

                  <button
                    onClick={handleSaveNote}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold transition flex items-center gap-1 cursor-pointer uppercase tracking-wider"
                  >
                    <Save className="w-3.5 h-3.5" /> Save
                  </button>
                </div>
              </div>

              {/* Text Writing Area */}
              <div className="flex-1 p-5 relative bg-[#0A0A0A]">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-full p-2 bg-transparent text-[#EDEDED] font-mono text-xs md:text-sm resize-none focus:outline-none leading-relaxed"
                  placeholder="Draft your thoughts, copy code snippets, or notes... markdown is supported!"
                />
              </div>

              {/* Toast banner inside notes */}
              {toastMessage && (
                <div className="absolute bottom-4 right-4 bg-[#111] border border-[#262626] text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-1.5 shadow-md animate-fade-in-up uppercase tracking-wider font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{toastMessage}</span>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-slate-400 bg-[#0A0A0A]">
              <Bookmark className="w-12 h-12 text-[#262626] mb-3" />
              <p className="text-xs font-bold uppercase tracking-wider">No journal entries exist.</p>
              <button
                onClick={handleAddNewNote}
                className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded transition uppercase tracking-widest cursor-pointer"
              >
                Create Note
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
