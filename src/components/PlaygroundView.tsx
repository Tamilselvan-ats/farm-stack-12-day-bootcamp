import React from 'react';
import { Play, RotateCcw, Eye, Code, FileCode, CheckCircle, HelpCircle } from 'lucide-react';

interface PlaygroundProps {
  selectedDay: number;
}

const templates: Record<number, { html: string; css: string; js: string }> = {
  1: {
    html: `<!-- Day 1: HTML Skeleton -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My First Hackathon Portal</title>
  </head>
  <body>
    <header>
      <h1>DevFast Team Finder</h1>
      <p>Connect with other developers instantly!</p>
    </header>
    <main>
      <section>
        <h2>Featured Projects</h2>
        <p>This is a skeletal structure for Day 1.</p>
      </section>
    </main>
  </body>
</html>`,
    css: `/* Day 1 CSS - Simple baseline rules */
body {
  font-family: sans-serif;
  color: #333;
  padding: 20px;
}
header {
  text-align: center;
  margin-bottom: 30px;
}`,
    js: `// Day 1 JS - Test greeting console log
console.log("HTML Skeleton Template loaded!");`
  },
  2: {
    html: `<!-- Day 2: HTML Forms and Validations -->
<form id="project-form">
  <h2>Create Hackathon Project Card</h2>
  
  <div class="form-group">
    <label for="title">Project Title</label>
    <input type="text" id="title" required minlength="3" placeholder="e.g. HealthAI" />
  </div>

  <div class="form-group">
    <label for="category">Category Track</label>
    <select id="category">
      <option value="fintech">Financial Tech</option>
      <option value="ai">AI / LLM tools</option>
      <option value="health">Healthcare</option>
    </select>
  </div>

  <button type="submit">Publish Card</button>
</form>

<div id="status-message"></div>`,
    css: `/* Day 2 CSS - Simple form layouts */
form {
  max-width: 400px;
  background: #f8fafc;
  padding: 20px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin: 0 auto;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 13px;
}
input, select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
}
button {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
}`,
    js: `// Day 2 JS - Form submit listener
const form = document.getElementById('project-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const category = document.getElementById('category').value;
  
  const status = document.getElementById('status-message');
  status.innerHTML = \`<p style="color: green; margin-top:15px; font-weight:bold;">
    ✓ Project "\${title}" successfully validated and created in "\${category}" track!
  </p>\`;
});`
  },
  3: {
    html: `<!-- Day 3: CSS Box Model & Sizing -->
<div class="box-model-demo">
  <div class="content-box">
    <h3>Standard Card Block</h3>
    <p>This is styled utilizing modern border, padding, and outer margin parameters.</p>
    <button class="cta-button">Interactive Action</button>
  </div>
</div>`,
    css: `/* Day 3 CSS - Deep dive Box Model */
.box-model-demo {
  background-color: #f1f5f9;
  padding: 40px;
  display: flex;
  justify-content: center;
}

.content-box {
  /* Box dimensions */
  box-sizing: border-box; /* Crucial! */
  width: 100%;
  max-width: 320px;
  
  /* Box Model Properties */
  padding: 24px;
  border: 2px solid #6366f1;
  border-radius: 12px;
  margin: 10px;
  
  /* Aesthetics */
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

h3 {
  margin: 0 0 10px 0;
  color: #1e293b;
}

p {
  font-size: 13px;
  color: #64748b;
  margin-bottom: 20px;
}

.cta-button {
  width: 100%;
  background: #6366f1;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.cta-button:hover {
  background: #4f46e5;
}`,
    js: `// Day 3 JS - Button click scale test
const btn = document.querySelector('.cta-button');
btn.addEventListener('click', () => {
  alert("Button clicked! Style transition holds cleanly.");
});`
  },
  4: {
    html: `<!-- Day 4: Responsive Grid with Flex Alignments -->
<div class="dashboard-wrapper">
  <header class="flex-header">
    <strong>DevFast Grid 📊</strong>
    <span class="user-pill">Hacker #42</span>
  </header>
  
  <main class="grid-container">
    <div class="card bg-1"><h4>HTML Structure</h4><p>Day 1-2 Focus</p></div>
    <div class="card bg-2"><h4>CSS Styling</h4><p>Day 3-4 Focus</p></div>
    <div class="card bg-3"><h4>JavaScript</h4><p>Day 5-6 Focus</p></div>
    <div class="card bg-4"><h4>React UI</h4><p>Day 7-8 Focus</p></div>
  </main>
</div>`,
    css: `/* Day 4 CSS - CSS Flexbox and Grid Demo */
body {
  margin: 0;
  font-family: system-ui, sans-serif;
  background: #f8fafc;
}
.dashboard-wrapper {
  padding: 20px;
}
.flex-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 15px 20px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-bottom: 20px;
}
.user-pill {
  background: #e0e7ff;
  color: #4338ca;
  font-size: 11px;
  font-weight: bold;
  padding: 4px 10px;
  border-radius: 12px;
}
.grid-container {
  display: grid;
  /* 1 column on small screens, 2 columns on larger */
  grid-template-columns: 1fr;
  gap: 15px;
}
@media(min-width: 500px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
.card {
  padding: 20px;
  border-radius: 8px;
  color: white;
}
.bg-1 { background: #4f46e5; }
.bg-2 { background: #0ea5e9; }
.bg-3 { background: #f59e0b; }
.bg-4 { background: #10b981; }

.card h4 { margin: 0 0 5px 0; }
.card p { margin: 0; font-size: 12px; opacity: 0.8; }`,
    js: `// Day 4 JS - Grid items click handler
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('click', () => {
    const techName = card.querySelector('h4').textContent;
    alert(\`You selected the \${techName} track!\`);
  });
});`
  }
};

export default function PlaygroundView({ selectedDay }: PlaygroundProps) {
  const defaultDay = templates[selectedDay] ? selectedDay : 1;
  const [activeTab, setActiveTab] = React.useState<'html' | 'css' | 'js'>('html');
  const [html, setHtml] = React.useState<string>(templates[defaultDay].html);
  const [css, setCss] = React.useState<string>(templates[defaultDay].css);
  const [js, setJs] = React.useState<string>(templates[defaultDay].js);
  const [iframeSrc, setIframeSrc] = React.useState<string>('');

  const runCode = React.useCallback(() => {
    const combinedSource = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            ${css}
          </style>
        </head>
        <body>
          ${html}
          <script>
            // Intercept console.log to write feedback
            const origLog = console.log;
            console.log = function(...args) {
              origLog(...args);
              const consoleDiv = document.getElementById('console-log-out');
              if (consoleDiv) {
                consoleDiv.innerHTML += '<div> > ' + args.join(' ') + '</div>';
              }
            };
          </script>
          <div id="console-log-out" style="margin-top: 30px; font-family: monospace; font-size: 12px; color: #1e293b; border-top: 1px dashed #cbd5e1; padding-top: 15px; display: none;"></div>
          <script>
            try {
              ${js}
            } catch(err) {
              const errDiv = document.createElement('div');
              errDiv.style.cssText = 'color: red; font-family: monospace; padding: 12px; background: #fff5f5; border: 1px solid #feb2b2; border-radius: 6px; margin-top: 15px; font-size: 12px;';
              errDiv.innerHTML = '<strong>⚠️ JavaScript Runtime Error:</strong><br/>' + err.message;
              document.body.appendChild(errDiv);
            }
          </script>
        </body>
      </html>
    `;
    setIframeSrc(combinedSource);
  }, [html, css, js]);

  // Load template on day change
  React.useEffect(() => {
    const d = templates[selectedDay] ? selectedDay : 1;
    setHtml(templates[d].html);
    setCss(templates[d].css);
    setJs(templates[d].js);
  }, [selectedDay]);

  // Run on first load
  React.useEffect(() => {
    runCode();
  }, [runCode]);

  const loadTemplate = (dayNum: number) => {
    if (templates[dayNum]) {
      setHtml(templates[dayNum].html);
      setCss(templates[dayNum].css);
      setJs(templates[dayNum].js);
    }
  };

  const resetCode = () => {
    const d = templates[selectedDay] ? selectedDay : 1;
    setHtml(templates[d].html);
    setCss(templates[d].css);
    setJs(templates[d].js);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-white dark:bg-[#0F0F0F] border border-slate-200 dark:border-[#262626] rounded-lg shadow-2xs transition-colors duration-200 font-mono">
        <div>
          <h3 className="font-bold text-[#EDEDED] text-sm uppercase tracking-wider flex items-center gap-2">
            <FileCode className="w-4 h-4 text-blue-500" /> Web Code Playground Sandbox
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-sans">
            Write static HTML/CSS/JS and view immediate visual outputs. Note: React, FastAPI, and MongoDB layers are mocked here.
          </p>
        </div>

        <div className="flex gap-2 flex-wrap items-center">
          <span className="text-[10px] text-[#666666] font-bold uppercase tracking-wider">Template:</span>
          <select 
            onChange={(e) => loadTemplate(parseInt(e.target.value))}
            className="px-2.5 py-1.5 border border-slate-200 dark:border-[#262626] bg-white dark:bg-[#111] text-slate-800 dark:text-[#EDEDED] text-xs rounded font-bold focus:outline-none cursor-pointer uppercase tracking-wider font-mono"
          >
            <option value="1">DAY_01: HTML Skeleton</option>
            <option value="2">DAY_02: Forms & Val</option>
            <option value="3">DAY_03: Box Model Card</option>
            <option value="4">DAY_04: Flex & Grid</option>
          </select>
          
          <button 
            onClick={resetCode}
            className="p-1.5 bg-slate-50 dark:bg-[#1A1A1A] hover:bg-slate-100 dark:hover:bg-[#222] border border-slate-200 dark:border-[#262626] text-slate-600 dark:text-slate-300 rounded text-xs font-bold transition flex items-center gap-1 cursor-pointer uppercase tracking-wider"
            title="Reset to Template"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>

          <button 
            onClick={runCode}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold transition flex items-center gap-1.5 cursor-pointer uppercase tracking-widest"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> Run Code
          </button>
        </div>
      </div>

      {/* Editor & IFrame Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[550px]">
        
        {/* Editor Half */}
        <div className="flex flex-col border border-slate-200 dark:border-[#262626] rounded-lg bg-white dark:bg-[#0F0F0F] overflow-hidden shadow-2xs transition-colors duration-200 font-mono">
          <div className="flex border-b border-slate-200 dark:border-[#262626] bg-slate-50 dark:bg-[#111] p-2 justify-between items-center">
            <div className="flex gap-1">
              {[
                { id: 'html', label: 'index.html' },
                { id: 'css', label: 'style.css' },
                { id: 'js', label: 'app.js' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'html' | 'css' | 'js')}
                  className={`
                    px-3 py-1.5 rounded text-xs font-bold font-mono transition cursor-pointer uppercase tracking-wider
                    ${activeTab === tab.id 
                      ? 'bg-white dark:bg-[#1A1A1A] text-blue-600 dark:text-white border border-slate-200 dark:border-[#262626]' 
                      : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-[#111]'}
                  `}
                >
                  <span className={`inline-block w-1.5 h-1.5 rounded mr-1.5 ${
                    tab.id === 'html' ? 'bg-orange-500' : tab.id === 'css' ? 'bg-cyan-500' : 'bg-yellow-500'
                  }`}></span>
                  {tab.label}
                </button>
              ))}
            </div>
            <span className="text-[9px] text-slate-400 dark:text-[#666666] font-mono font-bold tracking-widest uppercase pr-2">
              Source Editor
            </span>
          </div>

          <div className="flex-1 relative">
            {activeTab === 'html' && (
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                className="w-full h-full p-4 font-mono text-xs bg-[#0A0A0A] text-[#EDEDED] resize-none focus:outline-none border-none leading-relaxed"
                spellCheck="false"
              />
            )}
            {activeTab === 'css' && (
              <textarea
                value={css}
                onChange={(e) => setCss(e.target.value)}
                className="w-full h-full p-4 font-mono text-xs bg-[#0A0A0A] text-[#EDEDED] resize-none focus:outline-none border-none leading-relaxed"
                spellCheck="false"
              />
            )}
            {activeTab === 'js' && (
              <textarea
                value={js}
                onChange={(e) => setJs(e.target.value)}
                className="w-full h-full p-4 font-mono text-xs bg-[#0A0A0A] text-[#EDEDED] resize-none focus:outline-none border-none leading-relaxed"
                spellCheck="false"
              />
            )}
          </div>
        </div>

        {/* Live Preview IFrame Half */}
        <div className="flex flex-col border border-slate-200 dark:border-[#262626] rounded-lg bg-slate-50 dark:bg-[#0A0A0A] overflow-hidden shadow-2xs transition-colors duration-200">
          <div className="flex border-b border-slate-200 dark:border-[#262626] bg-slate-50 dark:bg-[#111] p-3 justify-between items-center">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-blue-500" /> Live Interactive Output Preview
            </span>
            <div className="flex gap-1">
              <span className="w-2.5 h-2.5 rounded bg-rose-500/80"></span>
              <span className="w-2.5 h-2.5 rounded bg-amber-500/80"></span>
              <span className="w-2.5 h-2.5 rounded bg-emerald-500/80"></span>
            </div>
          </div>
          
          <div className="flex-1 bg-white relative">
            <iframe
              srcDoc={iframeSrc}
              title="Code Preview Sandbox"
              sandbox="allow-scripts"
              className="w-full h-full bg-white border-none"
            />
          </div>
        </div>

      </div>

      {/* Guide Card info */}
      <div className="p-4 border border-slate-200 dark:border-[#262626] bg-white dark:bg-[#0F0F0F] rounded-lg flex gap-3 text-xs text-slate-500 font-mono">
        <HelpCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed font-sans">
          <strong>Playground Guidelines:</strong> Toggle tabs to write structure (HTML), styling rules (CSS), and behaviors (JavaScript). Changes don't automatically update in the preview tab to protect loop inputs; click <strong>Run Code</strong> or press reset templates at any point. You can paste snippets from the curriculum directly.
        </p>
      </div>

    </div>
  );
}
