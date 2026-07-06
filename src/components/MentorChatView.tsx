import React from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Trash2, 
  ArrowRight,
  Flame,
  Award,
  AlertCircle
} from 'lucide-react';
import { UserProgress } from '../types';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface MentorChatProps {
  progress: UserProgress;
}

const suggestedQuestions = [
  "How should I structure a React + FastAPI + MongoDB project structure?",
  "Explain the difference between React state and props with a real-world example.",
  "What is the fastest way to design clean, responsive forms using Tailwind?",
  "Can you write a boilerplate for FastAPI endpoints handling database writes?",
  "What are the best tips to prepare for our final Day 12 hackathon pitch?"
];

export default function MentorChatView({ progress }: MentorChatProps) {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      role: 'model',
      text: `👋 **Welcome back, Hacker!** I am **Aria**, your personal elite FARM Stack Hackathon Mentor.

I am here to critique your code structures, clear up complex async loop questions, write robust Pydantic schemas, or share tips on how to build a winning 3-minute product pitch.

*What is on your mind today? Choose one of the suggested prompts below, or describe your bug or concept questions!*`
    }
  ]);
  const [inputText, setInputText] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  React.useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    // Append user message
    const userMsg: Message = { role: 'user', text: textToSend };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputText('');
    setIsLoading(true);

    try {
      // Dispatches request directly to full-stack Express API proxy
      const response = await fetch('/api/mentor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: textToSend,
          day: progress.activeDay,
          chatHistory: updatedMessages.slice(-8) // Send recent turns for memory context
        })
      });

      if (!response.ok) {
        throw new Error('Server request failed');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'model', text: data.text }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev, 
        { 
          role: 'model', 
          text: "⚠️ **Connection Timeout / Network Error:** Failed to compile response. Please verify that your application has a valid **GEMINI_API_KEY** set in the Secrets manager or check internet connection." 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        role: 'model',
        text: "System cache reset. Feel free to ask another query!"
      }
    ]);
  };

  // Safe lightweight parser for bolding and raw code blocks from model markdown responses
  const parseMessageText = (text: string) => {
    if (!text) return null;

    const blocks = text.split('```');
    return blocks.map((block, idx) => {
      const isCodeBlock = idx % 2 === 1;
      
      if (isCodeBlock) {
        // Extract language and actual lines
        const lines = block.split('\n');
        const firstLine = lines[0].trim();
        const lang = ['javascript', 'js', 'html', 'css', 'python', 'py', 'json'].includes(firstLine) ? firstLine : '';
        const codeText = lang ? lines.slice(1).join('\n') : block;

        return (
          <div key={idx} className="my-4 rounded border border-[#262626] bg-[#0A0A0A] p-4 font-mono text-xs text-emerald-400 overflow-x-auto relative group">
            {lang && (
              <span className="absolute right-2 top-2 text-[9px] font-mono uppercase tracking-wider text-slate-500 font-bold bg-[#111] px-1.5 py-0.5 rounded border border-[#262626]">
                {lang}
              </span>
            )}
            <pre className="whitespace-pre-wrap">{codeText.trim()}</pre>
          </div>
        );
      }

      // Format markdown bold (**text**), bullet points (* item), and headings
      const lines = block.split('\n');
      return (
        <div key={idx} className="space-y-2 text-xs md:text-sm leading-relaxed">
          {lines.map((line, lIdx) => {
            let processed = line;
            
            // Render Headers
            if (processed.startsWith('###')) {
              return <h4 key={lIdx} className="font-mono font-bold text-slate-800 dark:text-[#EDEDED] text-xs uppercase tracking-wider mt-3 border-b border-[#262626] pb-0.5">{processed.replace('###', '').trim()}</h4>;
            }
            if (processed.startsWith('##')) {
              return <h3 key={lIdx} className="font-mono font-extrabold text-slate-900 dark:text-[#EDEDED] text-sm mt-4 uppercase tracking-wide border-b border-[#262626] pb-1">{processed.replace('##', '').trim()}</h3>;
            }

            // Bullet lists
            const isBullet = processed.startsWith('* ') || processed.startsWith('- ');
            if (isBullet) {
              processed = processed.substring(2);
            }

            // Parse bold double-asterisks (primitive regex split helper)
            const boldParts = processed.split('**');
            const inlineElements = boldParts.map((part, pIdx) => {
              const isBold = pIdx % 2 === 1;
              return isBold ? <strong key={pIdx} className="font-bold text-slate-900 dark:text-white">{part}</strong> : part;
            });

            if (isBullet) {
              return (
                <li key={lIdx} className="list-disc list-inside pl-2 text-slate-400 dark:text-slate-300">
                  <span>{inlineElements}</span>
                </li>
              );
            }

            return processed.trim() ? <p key={lIdx} className="text-slate-400 dark:text-slate-300 font-sans">{inlineElements}</p> : <div key={lIdx} className="h-2" />;
          })}
        </div>
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 h-[580px] items-stretch font-mono">
      
      {/* Left Column: Specialty Badges & Quick Tips (Col Span 4) */}
      <div className="lg:col-span-4 flex flex-col justify-between p-5 bg-white dark:bg-[#0F0F0F] border border-slate-200 dark:border-[#262626] rounded-lg shadow-2xs transition-colors duration-200">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 bg-blue-600 rounded flex items-center justify-center font-sans font-black text-white text-lg">
                A
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#0F0F0F] rounded-full"></span>
            </div>
            <div>
              <h3 className="font-sans font-extrabold text-slate-900 dark:text-[#EDEDED] text-sm uppercase tracking-wide">
                Aria
              </h3>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                ● Hackathon Mentor
              </span>
            </div>
          </div>

          {/* Specialties */}
          <div className="space-y-1.5 pt-2">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Mentor Specialties</span>
            <div className="flex flex-wrap gap-1">
              {['FastAPI Async', 'React State', 'MongoDB Aggs', 'FARM Routing', 'Pitch Deck Pitching'].map(spec => (
                <span key={spec} className="bg-[#111] border border-[#262626] text-[#EDEDED] text-[9px] px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider">
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Guidelines */}
          <div className="p-3 bg-blue-500/10 border border-dashed border-blue-900/50 text-[#EDEDED] rounded-sm space-y-1.5">
            <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest block">Pitch Deck Guide</span>
            <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
              Hackathon pitch panels judge on <strong>Aesthetics</strong>, <strong>Technical Complexity</strong>, and <strong>Business Viability</strong>. Ask me to draft a 3-minute pitch slide outline!
            </p>
          </div>
        </div>

        <button
          onClick={handleClearHistory}
          className="w-full py-2 bg-[#1A1A1A] hover:bg-[#222] border border-[#262626] text-[#EDEDED] rounded text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer uppercase tracking-wider"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear memory cache
        </button>
      </div>

      {/* Right Column: Chat workspace (Col Span 8) */}
      <div className="lg:col-span-8 flex flex-col border border-slate-200 dark:border-[#262626] bg-[#0F0F0F] rounded-lg overflow-hidden shadow-2xs transition-colors duration-200">
        
        {/* Chat message logs */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5 bg-[#0A0A0A]">
          {messages.map((msg, idx) => {
            const isModel = msg.role === 'model';
            return (
              <div 
                key={idx} 
                className={`flex gap-3 ${isModel ? 'justify-start' : 'justify-end'}`}
              >
                {isModel && (
                  <div className="w-8 h-8 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 self-start">
                    A
                  </div>
                )}
                
                <div className={`
                  p-4 rounded-lg max-w-[85%] text-xs md:text-sm space-y-1 shadow-2xs leading-relaxed
                  ${isModel 
                    ? 'bg-[#111] text-[#EDEDED] border border-[#262626] rounded-tl-none' 
                    : 'bg-blue-600 text-white rounded-br-none'}
                `}>
                  {isModel ? (
                    parseMessageText(msg.text)
                  ) : (
                    <p className="font-bold whitespace-pre-wrap font-sans">{msg.text}</p>
                  )}
                </div>

                {!isModel && (
                  <div className="w-8 h-8 rounded bg-[#1A1A1A] border border-[#262626] text-blue-500 flex items-center justify-center font-bold text-xs shrink-0 self-start">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 animate-spin">
                <Loader2 className="w-4 h-4" />
              </div>
              <div className="p-4 rounded bg-[#111] border border-[#262626] text-slate-400 text-xs flex items-center gap-1.5 font-mono font-bold uppercase tracking-wider">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500" /> Aria is compiling response...
              </div>
            </div>
          )}
          
          <div ref={scrollRef} />
        </div>

        {/* Suggested Questions List (Visible when starting or quiet) */}
        {messages.length < 3 && (
          <div className="p-3 border-t border-slate-200 dark:border-[#262626] bg-[#111] shrink-0 space-y-1.5">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block px-1">Suggested Inquiries</span>
            <div className="flex flex-col gap-1.5">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSendMessage(q)}
                  className="w-full text-left p-2 bg-[#0A0A0A] hover:bg-[#1A1A1A] border border-slate-200 dark:border-[#262626] rounded text-[10px] md:text-xs text-[#EDEDED] font-bold transition cursor-pointer flex items-center justify-between uppercase tracking-wider"
                >
                  <span className="truncate pr-3 font-sans">{q}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input bar */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputText);
          }}
          className="p-3.5 border-t border-slate-200 dark:border-[#262626] bg-slate-50 dark:bg-[#111] flex gap-2 shrink-0 items-center"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-3.5 py-2.5 border border-slate-200 dark:border-[#262626] rounded bg-[#0A0A0A] text-[#EDEDED] text-xs focus:outline-none focus:border-blue-500 disabled:opacity-65 font-mono"
            placeholder="Ask Aria about design, syntax, bugs, or slide deck pitches..."
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-2.5 bg-blue-600 text-white rounded hover:bg-blue-500 disabled:bg-[#1A1A1A] disabled:text-slate-600 transition shrink-0 cursor-pointer disabled:cursor-not-allowed"
          >
            <Send className="w-4.5 h-4.5" />
          </button>
        </form>

      </div>

    </div>
  );
}
