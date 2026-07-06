import { Lesson, QuizQuestion, CodingChallenge, ProjectMilestone, Flashcard, Cheatsheet, InterviewQuestion } from '../types';

export const lessons: Lesson[] = [
  {
    id: 'l-day1',
    title: 'HTML Document Structure, Headings, and Metadata',
    slug: 'html-basics',
    day: 1,
    duration: '30 mins',
    technology: 'HTML',
    learningGoals: [
      'Understand the HTML skeleton and DOCTYPE declaration',
      'Configure essential meta tags for viewport responsiveness and SEO',
      'Create semantic heading hierarchies and basic structural blocks'
    ],
    explanation: 'HTML (HyperText Markup Language) is the core structural scaffolding of any web application. A standard document requires a specific structure enclosing the head (metadata, stylesheets) and the body (renderable content). In a hackathon, quick prototyping depends on having a robust, responsive boilerplate template.',
    syntax: '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <!-- Metadata and references -->\n  </head>\n  <body>\n    <!-- Content visible to user -->\n  </body>\n</html>',
    codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hackathon Project Portal</title>
  </head>
  <body>
    <header>
      <h1>DevFast Platform</h1>
    </header>
    <main>
      <p>Welcome to our Hackathon Project Discovery space!</p>
    </main>
  </body>
</html>`,
    lineByLine: [
      { line: '<!DOCTYPE html>', explanation: 'Informs the browser that this document is an HTML5 document.' },
      { line: '<html lang="en">', explanation: 'Defines the language of the page content as English, which assists screen readers.' },
      { line: '<meta charset="UTF-8" />', explanation: 'Enables support for almost all written characters, including emojis and international text.' },
      { line: '<meta name="viewport" ... />', explanation: 'Crucial for responsive design; tells mobile browsers to scale the width to match the device screen size.' }
    ],
    bestPractices: [
      'Always include the viewport meta tag for mobile compatibility.',
      'Maintain logical heading order: only one H1 per page, followed sequentially by H2, H3, etc.',
      'Close all HTML tags properly to avoid broken browser layout parsing.'
    ],
    commonMistakes: [
      'Nesting elements incorrectly (e.g., closing an outer tag before an inner one).',
      'Omitting the viewport tag, causing desktop rendering scaling on mobile phones.',
      'Using multiple h1 elements for styling instead of choosing appropriate sizes with CSS.'
    ],
    hackathonTips: [
      'Keep a solid HTML boilerplate saved in your editor snippets. Every minute saved on initial configuration is a minute spent coding features!',
      'Use semantic elements (header, footer, main, section) early; it makes migrating code to React or styling with CSS 10x easier.'
    ]
  },
  {
    id: 'l-day2',
    title: 'HTML Forms, Input Types, and Semantic Fields',
    slug: 'html-forms',
    day: 2,
    duration: '40 mins',
    technology: 'HTML',
    learningGoals: [
      'Design structured forms with labels, input fields, and submit buttons',
      'Leverage specialized input types (email, password, number) for automatic validation',
      'Use semantic interactive controls to safely capture user data input'
    ],
    explanation: 'Forms are the primary method of gathering input from users in full-stack applications. Proper configuration of input tags, attributes (like required, name, placeholder), and form action handlers enables seamless integration with frontend frameworks like React or backend APIs built in FastAPI.',
    syntax: '<form>\n  <label for="username">Username</label>\n  <input type="text" id="username" name="username" required />\n  <button type="submit">Submit</button>\n</form>',
    codeExample: `<form id="project-form">
  <div>
    <label for="proj-title">Project Title</label>
    <input type="text" id="proj-title" name="title" placeholder="e.g. DevFast" required />
  </div>
  <div>
    <label for="proj-category">Category</label>
    <select id="proj-category" name="category">
      <option value="fintech">Fintech</option>
      <option value="health">Healthcare</option>
      <option value="edtech">Education</option>
    </select>
  </div>
  <button type="submit">Create Project</button>
</form>`,
    lineByLine: [
      { line: '<form id="project-form">', explanation: 'Creates a form block with a unique ID for targeting via JS scripts.' },
      { line: '<label for="proj-title">', explanation: 'Associates the label text with the input having id="proj-title" for accessibility and clicking ease.' },
      { line: 'required', explanation: 'HTML5 attribute that prevents form submission if the field is empty, providing instant native client validation.' },
      { line: '<select id="proj-category"...', explanation: 'Constructs a drop-down selection input, perfect for categories or enum configurations.' }
    ],
    bestPractices: [
      'Always associate a <label> with every <input> using matching "for" and "id" attributes.',
      'Specify the "type" attribute on buttons; use type="button" to prevent default form submits and type="submit" for actual submissions.',
      'Set explicit placeholder values to guide the user on expected formatting.'
    ],
    commonMistakes: [
      'Forgetting to add a "name" attribute on inputs, which prevents form data from being compiled correctly.',
      'Not using proper types (like text, email, number), which misses native keyboard optimizations on mobile.',
      'Leaving out form input validation attributes like min, max, or pattern.'
    ],
    hackathonTips: [
      'During hackathons, rely on native HTML5 validations (required, pattern) first to save time writing custom state validations in JS.',
      'Give forms intuitive IDs because you will frequently hook into their submit events to fetch backend servers.'
    ]
  },
  {
    id: 'l-day3',
    title: 'CSS Selectors, Box Model, and Core Typography',
    slug: 'css-box-model',
    day: 3,
    duration: '35 mins',
    technology: 'CSS',
    learningGoals: [
      'Master the CSS box model: margins, borders, padding, and content dimensions',
      'Use CSS selectors to apply custom styles to specific elements',
      'Manage modern responsive typography, font scales, and spacing standards'
    ],
    explanation: 'CSS (Cascading Style Sheets) structures visual appearance. The key conceptual layout block in CSS is the Box Model. Every element is modeled as a rectangular box, with padding pushing content inward, borders surrounding padding, and margins creating separation between adjacent components.',
    syntax: 'selector {\n  margin: 16px;\n  padding: 12px;\n  border: 1px solid #e2e8f0;\n  font-family: sans-serif;\n}',
    codeExample: `.project-card {
  box-sizing: border-box;
  width: 100%;
  max-width: 400px;
  padding: 24px;
  margin: 12px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}`,
    lineByLine: [
      { line: 'box-sizing: border-box;', explanation: 'Forces width and height calculations to include padding and border. Saves you from painful layout sizing bugs!' },
      { line: 'padding: 24px;', explanation: 'Generates 24px of clear workspace spacing inside the card, surrounding the text.' },
      { line: 'margin: 12px;', explanation: 'Creates 12px of external empty space around the card to push adjacent cards away.' },
      { line: 'box-shadow: 0 4px...', explanation: 'Applies a subtle, soft modern shadow to give the card depth and high quality visual tiering.' }
    ],
    bestPractices: [
      'Always configure box-sizing: border-box globally in your custom stylesheet layouts.',
      'Use relative font units (rem, em) instead of hardcoded pixels (px) to build natural responsive scaling.',
      'Keep your padding and margin values consistent. Utilize a spacing scale (e.g. 4px, 8px, 12px, 16px, 24px, 32px).'
    ],
    commonMistakes: [
      'Leaving box-sizing on default "content-box", making elements stretch wider than their defined widths due to added paddings.',
      'Using confusing absolute positioning where flexbox or margins would create more flexible layouts.',
      'Over-relying on IDs for CSS selectors, which hurts stylesheet reusability.'
    ],
    hackathonTips: [
      'Create a neat global color palette at the start. Stick to 1 primary color, 1 secondary neutral, and 1 highlight accent.',
      'Modern, stunning interfaces rely heavily on spacious negative space. Do not be afraid to add generous margins and paddings!'
    ]
  },
  {
    id: 'l-day4',
    title: 'CSS Flexbox, Grid, and Tailwind CSS Layouts',
    slug: 'css-layouts-tailwind',
    day: 4,
    duration: '45 mins',
    technology: 'CSS',
    learningGoals: [
      'Understand CSS Flexbox for 1-dimensional row/column component structures',
      'Utilize CSS Grid for complex, responsive 2-dimensional layouts',
      'Integrate Tailwind CSS helper utility classes to accelerate visual drafting'
    ],
    explanation: 'Responsive layouts adapt elegantly to varying browser frame sizes. Flexbox is perfect for distributing items along a single axis (like navigation bars or button rows), while CSS Grid handles structured layouts in rows and columns simultaneously. Tailwind CSS collapses these rules into ready-to-use CSS utility class designations.',
    syntax: '<div class="flex items-center justify-between gap-4">\n  <div>Item 1</div>\n  <div>Item 2</div>\n</div>',
    codeExample: `<div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-slate-50 rounded-xl">
  <div class="flex flex-col p-4 bg-white rounded-lg shadow-sm">
    <span class="text-sm font-mono text-indigo-600">Day 1</span>
    <h3 class="text-lg font-semibold mt-1">HTML Skeleton</h3>
  </div>
  <div class="flex flex-col p-4 bg-white rounded-lg shadow-sm">
    <span class="text-sm font-mono text-indigo-600">Day 2</span>
    <h3 class="text-lg font-semibold mt-1">Form Controls</h3>
  </div>
  <div class="flex flex-col p-4 bg-white rounded-lg shadow-sm">
    <span class="text-sm font-mono text-indigo-600">Day 3</span>
    <h3 class="text-lg font-semibold mt-1">CSS Box Model</h3>
  </div>
</div>`,
    lineByLine: [
      { line: 'grid grid-cols-1 md:grid-cols-3', explanation: 'Defines a responsive grid: 1 column on mobile screens, and auto-scales to 3 equal-width columns on medium/desktop screens.' },
      { line: 'gap-6 p-6', explanation: 'Creates exactly 24px of spacing between adjacent grid items and 24px of padding around the grid boundary.' },
      { line: 'flex flex-col', explanation: 'Establishes a flexbox layout stacking internal items vertically in a single column.' },
      { line: 'shadow-sm rounded-lg', explanation: 'Tailwind abstractions that apply clean, light borders and moderate rounded card corners (8px).' }
    ],
    bestPractices: [
      'Use flexbox for simple linear structures and grids for standard column grids.',
      'Always make designs mobile-first. Put mobile CSS rules as default, and stack screen-size prefix overrides (like md:, lg:) after them.',
      'Keep components structured with modern CSS Gap properties instead of manual margins.'
    ],
    commonMistakes: [
      'Overcomplicating layouts by mixing float properties with modern flexbox rules.',
      'Applying nested grids unnecessarily where a simple flex columns layout would be cleaner.',
      'Using hardcoded device dimensions (like width: 375px) which break completely on other phone sizes.'
    ],
    hackathonTips: [
      'Tailwind CSS is an absolute gamechanger for hackathons. Since you do not have to write separate stylesheets, you can design, adjust, and complete beautiful interfaces entirely in HTML/JSX!',
      'Make good use of layout templates. Create a clean container with `max-w-7xl mx-auto px-4` to frame your app on wide monitors.'
    ]
  },
  {
    id: 'l-day5',
    title: 'JavaScript Essentials, Data Types, and DOM Interactions',
    slug: 'js-essentials',
    day: 5,
    duration: '45 mins',
    technology: 'JavaScript',
    learningGoals: [
      'Understand variables, arrays, objects, and foundational operations',
      'Use event listeners to capture click, hover, and submission signals',
      'Manipulate HTML elements dynamically to rewrite page states programmatically'
    ],
    explanation: 'JavaScript breathes life into web pages. It is an interpreted, lightweight programming language that allows developers to run calculations, alter element properties, structure client-side data variables, and react dynamically when users click buttons or type into forms.',
    syntax: 'const btn = document.querySelector("#my-btn");\nbtn.addEventListener("click", () => {\n  console.log("Button clicked!");\n});',
    codeExample: `// Project Array data
const projects = [
  { id: 1, title: 'DevFast', category: 'FARM Stack' }
];

// Append to DOM
const container = document.getElementById('project-list');
projects.forEach(project => {
  const card = document.createElement('div');
  card.className = 'p-4 bg-slate-100 rounded mt-2';
  card.innerHTML = \`
    <h3 class="font-bold">\${project.title}</h3>
    <p class="text-xs text-gray-500">\${project.category}</p>
  \`;
  container.appendChild(card);
});`,
    lineByLine: [
      { line: 'const projects = [...]', explanation: 'Defines an array of objects representing structured local project data.' },
      { line: 'const container = ...', explanation: 'Queries the HTML DOM tree to fetch a reference to the wrapper element with id="project-list".' },
      { line: 'projects.forEach(project => {', explanation: 'Iterates through each element inside our array to perform identical DOM construction instructions.' },
      { line: 'card.innerHTML = ...', explanation: 'Uses ES6 Template Literals with dynamic string interpolation to securely inject formatted HTML content.' }
    ],
    bestPractices: [
      'Use const by default; only use let if you explicitly intend to reassign the variable value later.',
      'Prefer template strings (\`\${value}\`) over manual string concatenation (\' \' + value) for cleaner code.',
      'Avoid polluting the global window scope; wrap variables inside modules or scoping blocks.'
    ],
    commonMistakes: [
      'Confusing the assignment operator (=) with equality checks (== or ===). Always use === for strict type comparisons.',
      'Forgetting that DOM query results might return null, leading to fatal runtime crashes if unchecked.',
      'Appending HTML strings in loops directly to parent nodes, which degrades rendering speed (create components in memory first).'
    ],
    hackathonTips: [
      'Familiarize yourself with basic JS array methods: map(), filter(), find(), and reduce(). They are crucial for filtering search cards and compiling stats!',
      'Console.log is your best friend. Use it to trace the structure of your objects when things do not render as expected.'
    ]
  },
  {
    id: 'l-day6',
    title: 'Asynchronous JavaScript, Promises, and REST API Fetching',
    slug: 'js-async-fetch',
    day: 6,
    duration: '50 mins',
    technology: 'JavaScript',
    learningGoals: [
      'Understand the asynchronous JS event loop, callbacks, and promises',
      'Use async/await syntax to cleanly represent asynchronous pipelines',
      'Use fetch() to send GET/POST requests and process JSON responses'
    ],
    explanation: 'Modern web apps frequently communicate with external backend APIs. Because network requests take time, JavaScript uses asynchronous patterns to prevent freezing the entire browser interface while waiting for data. Async/await provides a synchronous-looking wrapper over standard Promise workflows.',
    syntax: 'async function getData() {\n  const res = await fetch("/api/endpoint");\n  const data = await res.json();\n  return data;\n}',
    codeExample: `async function fetchProjects() {
  try {
    const response = await fetch('https://api.example.com/projects');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    renderProjects(data);
  } catch (error) {
    console.error('Error fetching projects:', error);
    showErrorMessage('Could not load hackathon projects.');
  }
}`,
    lineByLine: [
      { line: 'async function fetchProjects() {', explanation: 'Declares an asynchronous function block, allowing the use of the "await" keyword inside.' },
      { line: 'await fetch(...)', explanation: 'Suspends function execution asynchronously until the network request resolves, without blocking the browser thread.' },
      { line: 'if (!response.ok) {', explanation: 'Checks the response status; returns true for successful HTTP statuses (200-299), which catches server errors (404, 500).' },
      { line: 'const data = await response.json()', explanation: 'Asynchronously parses the response body stream into a fully formatted, interactive JavaScript object.' }
    ],
    bestPractices: [
      'Always wrap asynchronous fetch calls inside try/catch blocks to gracefully handle network failures or offline errors.',
      'Verify HTTP status codes before attempting to parse response streams via response.json().',
      'Set explicit request headers (like Content-Type: application/json) when posting structural payloads to APIs.'
    ],
    commonMistakes: [
      'Forgetting to await a promise, which returns a pending [Promise] object instead of the actual data payload.',
      'Neglecting catch blocks, which leaves unhandled promise rejections crashing in user developer consoles.',
      'Assuming fetch rejects on HTTP error statuses like 404 or 500. Fetch only rejects on actual physical hardware disconnects or CORS issues.'
    ],
    hackathonTips: [
      'When your hackathon backend (FastAPI) is still under construction, mock your API responses using standard local JSON files. Your fetch URLs can target local files like `fetch("/src/mockData.json")` so you can build the UI without waiting!',
      'Make sure CORS is enabled in your server headers; otherwise, client fetches from different ports will fail instantly.'
    ]
  },
  {
    id: 'l-day7',
    title: 'React Fundamentals, Components, and Reactive State',
    slug: 'react-components-state',
    day: 7,
    duration: '50 mins',
    technology: 'React',
    learningGoals: [
      'Learn the React component model, JSX syntax, and prop passing patterns',
      'Manage local component memory using the useState reactive state hook',
      'Trigger state changes on user click, typing, and submission actions'
    ],
    explanation: 'React is a component-driven UI library that uses a virtual DOM to sync rendering with state changes. Rather than querying elements and manually changing text nodes, you define components that describe their appearance based on "props" (incoming parameters) and "state" (internal memories). When state updates, React automatically redraws affected parts of the screen.',
    syntax: 'import { useState } from "react";\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}',
    codeExample: `import { useState } from 'react';

export default function ProjectCard({ initialLikes = 0 }) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
      <h3 className="font-semibold text-slate-800">Hackathon Discovery</h3>
      <button 
        onClick={handleLike}
        className={\`mt-3 px-3 py-1 text-sm rounded-full transition \${
          isLiked ? 'bg-rose-50 text-rose-600 font-medium' : 'bg-slate-100 text-slate-600'
        }\`}
      >
        ❤️ {likes} Likes
      </button>
    </div>
  );
}`,
    lineByLine: [
      { line: 'import { useState } from \'react\';', explanation: 'Imports the core react hook that lets components track dynamic data across renders.' },
      { line: 'const [likes, setLikes] = useState(...)', explanation: 'Destructures state: "likes" holds the current read value, while "setLikes" is the modifier function.' },
      { line: 'onClick={handleLike}', explanation: 'Attaches a synthetic react event handler that fires our logic safely upon physical button clicks.' },
      { line: 'className={`...`}`', explanation: 'Uses Javascript evaluation inside string backticks to dynamically swap Tailwind classes based on conditional boolean states.' }
    ],
    bestPractices: [
      'Keep your state as simple as possible. Avoid redundant states that can be derived from existing state variables (like calculating item counts).',
      'Never mutate state variables directly (e.g. likes = likes + 1). Always use the returned setter function (setLikes).',
      'Create small, focused, single-purpose components for easier testing and cleaner code structures.'
    ],
    commonMistakes: [
      'Mutating complex states like arrays or objects directly instead of creating copies (using array spreads: [...oldArray, newItem]).',
      'Passing props of incorrect types without validating or setting fallback values.',
      'Updating state immediately inside a component body, which triggers infinite render loop crashes.'
    ],
    hackathonTips: [
      'React is perfect for hackathons because components are easily reusable. Create a general `<Button>` or `<Card>` component to reuse across your entire dashboard design.',
      'Use standard React local state to track tab switches, model dialog visibility, or simple sidebar state before integrating more complex global managers.'
    ]
  },
  {
    id: 'l-day8',
    title: 'React Side Effects, API Fetching, and Hook Dependencies',
    slug: 'react-effects-fetching',
    day: 8,
    duration: '55 mins',
    technology: 'React',
    learningGoals: [
      'Understand the useEffect hook and synchronize renders with outside services',
      'Manage fetch cycles cleanly with state variables for loading and errors',
      'Control render loops by configuring dependency arrays correctly'
    ],
    explanation: 'The useEffect hook enables React components to run secondary operations like subscribing to events, talking to browsers, or fetching database entries from a server. Because effects run after rendering, managing the hook dependence array is vital to avoid triggering infinite re-render loops.',
    syntax: 'useEffect(() => {\n  // Run operation\n  return () => { /* cleanup */ };\n}, [dependencies]);',
    codeExample: `import { useState, useEffect } from 'react';

export default function HackathonProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch('/api/projects');
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        setError('Failed to fetch projects.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []); // Empty dependency array means this effect runs exactly once when component mounts.

  if (loading) return <div className="text-center p-6 text-slate-500">Loading projects...</div>;
  if (error) return <div className="text-center p-6 text-rose-500">{error}</div>;

  return (
    <ul className="space-y-3">
      {projects.map(proj => (
        <li key={proj.id} className="p-4 bg-slate-50 rounded border">{proj.title}</li>
      ))}
    </ul>
  );
}`,
    lineByLine: [
      { line: 'const [projects, setProjects] = useState([])', explanation: 'Initializes state with an empty array to prevent map loops from crashing before the response arrives.' },
      { line: 'useEffect(() => { ... }, []);', explanation: 'Establishes the effect block. The empty array at the end guarantees it runs once on startup and never repeats.' },
      { line: 'catch (err) { setError(...) }', explanation: 'Captures any network or parsing exceptions and stores a friendly message in local state for conditional user views.' },
      { line: '{projects.map(proj => (...)', explanation: 'Iterates and maps list objects into JSX nodes, requiring a unique "key" prop on every outer element.' }
    ],
    bestPractices: [
      'Always add a unique "key" prop on items when rendering lists inside loops in React.',
      'Declare custom fetch functions inside the effect or memoize them to prevent stale closures and unnecessary re-fetches.',
      'Clean up any background intervals, event listeners, or websocket connections inside the returned effect cleanup function.'
    ],
    commonMistakes: [
      'Leaving out the dependency array entirely in useEffect, causing the fetch effect to trigger on every state write (infinite fetch loop!).',
      'Using object references directly in the dependency array without memoization, leading to constant effect triggers.',
      'Attempting to make the outer useEffect callback function directly asynchronous (e.g. useEffect(async () => {})). Always define the async function *inside*.'
    ],
    hackathonTips: [
      'Show clear visual loading states (like skeleton loaders or rotating spinners) while fetching data from API endpoints. It instantly elevates the perceived quality of your application!',
      'Define fallback values for list containers so that if an API fails, your layout does not collapse into an empty screen.'
    ]
  },
  {
    id: 'l-day9',
    title: 'FastAPI Basics, Routes, and Pydantic Schema Validation',
    slug: 'fastapi-basics',
    day: 9,
    duration: '45 mins',
    technology: 'FastAPI',
    learningGoals: [
      'Understand FastAPI application structures and route registration',
      'Use Pydantic to enforce data schemas and automatic JSON parsing',
      'Define GET and POST requests with path parameters and query filtering'
    ],
    explanation: 'FastAPI is a modern, fast, asynchronous web framework for building APIs with Python. It relies on standard Python type hints to generate interactive API documentation automatically (Swagger UI) and utilizes Pydantic under the hood to handle request body parsing, data serialization, and input validation.',
    syntax: 'from fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass Item(BaseModel):\n    name: str\n    price: float',
    codeExample: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional

app = FastAPI(title="DevFast API")

class Project(BaseModel):
    title: str = Field(..., min_length=3, max_length=50)
    category: str
    description: Optional[str] = None
    likes: int = 0

projects_db = []

@app.post("/projects", response_model=Project, status_code=201)
async def create_project(project: Project):
    # Pydantic validates input attributes automatically before route code execution
    projects_db.append(project)
    return project

@app.get("/projects", response_model=List[Project])
async def get_projects(category: Optional[str] = None):
    if category:
        return [p for p in projects_db if p.category.lower() == category.lower()]
    return projects_db`,
    lineByLine: [
      { line: 'class Project(BaseModel):', explanation: 'Creates a validation blueprint extending Pydantic BaseModel to enforce input shapes.' },
      { line: 'Field(..., min_length=3, max_length=50)', explanation: 'Attaches structural validators requiring the title string to be between 3 and 50 characters long.' },
      { line: '@app.post("/projects", ...)', explanation: 'Registers an asynchronous POST route endpoint on the "/projects" URL path.' },
      { line: 'response_model=List[Project]', explanation: 'Tells FastAPI to serialize outgoing data according to a list of our validated Pydantic models.' }
    ],
    bestPractices: [
      'Always use descriptive type hints on path parameters, query parameters, and request schemas.',
      'Return appropriate HTTP status codes (like 201 Created for inserts, 404 Not Found for missing resources, 400 for bad inputs).',
      'Leverage FastAPI async endpoints ("async def") to build highly parallelized, high-throughput server networks.'
    ],
    commonMistakes: [
      'Not specifying appropriate field validators inside models, letting bad or empty strings pass into backend stores.',
      'Returning mutable local mock arrays directly without declaring appropriate response models, leaking sensitive object data.',
      'Forgetting Python list indexing patterns when slicing database query filters.'
    ],
    hackathonTips: [
      'FastAPI provides an out-of-the-box UI dashboard for API testing. Once you boot your server, navigate to `http://localhost:3000/docs` to access the interactive Swagger playground!',
      'Make sure to create separate Pydantic models for creations (e.g. `ProjectCreate`) and read queries (e.g. `ProjectOut`) to hide private IDs or salt variables.'
    ]
  },
  {
    id: 'l-day10',
    title: 'FastAPI CORS Middlewares, Routers, and API Architectures',
    slug: 'fastapi-routers-cors',
    day: 10,
    duration: '40 mins',
    technology: 'FastAPI',
    learningGoals: [
      'Enable CORS headers to permit safe communication with React frontend ports',
      'Use APIRouter to divide endpoints into modular, scalable script files',
      'Raise HTTPExceptions programmatically to handle server and route errors'
    ],
    explanation: 'As applications expand, nesting all routes inside a single main script file becomes unmaintainable. FastAPI uses APIRouter to structure distinct modules (e.g., projects router, auth router). Furthermore, connecting a frontend SPA (running on port 3000) to a backend API requires configuring CORS (Cross-Origin Resource Sharing) middleware headers.',
    syntax: 'from fastapi.middleware.cors import CORSMiddleware\napp.add_middleware(\n    CORSMiddleware,\n    allow_origins=["*"],\n    allow_methods=["*"],\n)',
    codeExample: `from fastapi import FastAPI, APIRouter, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to your exact frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

projects_router = APIRouter(prefix="/api/projects", tags=["projects"])

@projects_router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(project_id: int):
    # Simulate DB lookup and raise HTTPException if missing
    if project_id > 100:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with ID {project_id} not found"
        )
    return None

app.include_router(projects_router)`,
    lineByLine: [
      { line: 'allow_origins=["*"]', explanation: 'Wildcard config that allows client browsers on any domain to communicate with this backend. Crucial for development!' },
      { line: 'projects_router = APIRouter(...)', explanation: 'Creates a sub-routing package container grouping related project routes together under a shared path prefix.' },
      { line: 'raise HTTPException(...)', explanation: 'Safely interrupts execution flow to return standard error messages and error codes back to the client.' },
      { line: 'app.include_router(...)', explanation: 'Registers the modular APIRouter package into the core application engine.' }
    ],
    bestPractices: [
      'Group related API routes into separate files using APIRouter from day one.',
      'Use status helper variables (e.g. `status.HTTP_200_OK`) instead of raw numbers for cleaner, more readable code.',
      'Limit allowed origins in CORS middleware as soon as you transition from development to live production servers.'
    ],
    commonMistakes: [
      'Omitting CORS configurations, which causes browsers to block all incoming fetches from the React application.',
      'Registering routes with duplicate paths across different routers, leading to path resolution conflicts.',
      'Failing to specify status_code variables on DELETE or UPDATE requests.'
    ],
    hackathonTips: [
      'For quick hackathon development, setting `allow_origins=["*"]` saves you from painful debugging, but remember to refine it before submitting final deployed solutions!',
      'Prefix all your backend API routes with `/api` so that routing rules in your reverse-proxies (like Nginx) are clean and separate from frontend paths.'
    ]
  },
  {
    id: 'l-day11',
    title: 'MongoDB Databases, NoSQL Basics, and Motor Integrations',
    slug: 'mongodb-motor',
    day: 11,
    duration: '45 mins',
    technology: 'MongoDB',
    learningGoals: [
      'Understand the NoSQL document-based structure of MongoDB',
      'Set up database client clients to create, read, update, and delete entries',
      'Use Motor, an asynchronous Python driver for MongoDB integration'
    ],
    explanation: 'MongoDB is a document-oriented NoSQL database that stores data in flexible, JSON-like structures (BSON documents). Unlike relational databases, it does not require fixed, rigid tables, allowing rapid schema prototyping. In the FARM stack, we use Motor to communicate with MongoDB asynchronously, matching FastAPI\'s async paradigm.',
    syntax: 'import motor.motor_asyncio\nclient = motor.motor_asyncio.AsyncIOMotorClient("mongodb://localhost:27017")\ndb = client.my_database',
    codeExample: `import motor.motor_asyncio
from bson import ObjectId
from fastapi import FastAPI, HTTPException

app = FastAPI()
MONGO_DETAILS = "mongodb+srv://user:pass@cluster.mongodb.net/test"
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)
database = client.hackathon_db
project_collection = database.get_collection("projects")

# Convert MongoDB bson to native Python dict
def project_helper(project) -> dict:
    return {
        "id": str(project["_id"]),
        "title": project["title"],
        "category": project["category"],
        "likes": project.get("likes", 0)
    }

@app.get("/api/db-projects")
async def fetch_db_projects():
    projects = []
    # Fetch asynchronously using async for loops with Motor cursor
    async for project in project_collection.find():
        projects.append(project_helper(project))
    return projects`,
    lineByLine: [
      { line: 'client = motor.motor_asyncio...', explanation: 'Establishes an asynchronous client connection to the MongoDB instance.' },
      { line: 'database.get_collection("projects")', explanation: 'Selects the specific collection container (analogous to SQL tables) holding our documents.' },
      { line: 'str(project["_id"])', explanation: 'Converts MongoDB\'s binary ObjectIDs into standard strings so they can be securely formatted as JSON.' },
      { line: 'async for project in...', explanation: 'Uses non-blocking loops to yield and stream records from the database one by one without slowing the execution thread.' }
    ],
    bestPractices: [
      'Always use helper functions to clean up and serialize raw MongoDB documents before returning them in API routes.',
      'Use Indexes on frequently queried fields (like emails or usernames) to optimize lookup performance.',
      'Secure MongoDB credentials by storing connection strings in environmental secrets instead of committing them to code.'
    ],
    commonMistakes: [
      'Using block drivers (like PyMongo) inside FastAPI async def endpoints, which stalls the entire server thread.',
      'Forgetting to convert MongoDB BSON ObjectIDs to strings, causing JSON serialization failures in FastAPI.',
      'Allowing database queries without setting request limit or offset parameters, which can overwhelm memory caches.'
    ],
    hackathonTips: [
      'MongoDB Atlas provides a free-tier hosting sandbox. In hackathons, using Atlas is the fastest way to get a cloud-hosted, collaborative database running in minutes!',
      'Use MongoDB Compass (the GUI editor) to visual-audit, edit, or seed database entries during active development runs.'
    ]
  },
  {
    id: 'l-day12',
    title: 'FARM Stack Full Integration, State Sync, and Deployments',
    slug: 'farm-integration',
    day: 12,
    duration: '60 mins',
    technology: 'Integration',
    learningGoals: [
      'Connect the React UI client with the FastAPI + MongoDB backend servers',
      'Sync frontend reactive states with actual database mutations',
      'Configure full-stack environments and deploy application packages'
    ],
    explanation: 'The FARM (FastAPI, React, MongoDB) stack represents the ultimate hackathon toolkit, combining an incredibly fast Python API engine with React\'s highly responsive frontend and MongoDB\'s flexible database. Full-stack integration links these layers together by coordinating API routes, mapping data objects, and configuring deployment profiles.',
    syntax: '// Fetch complete full-stack loop\nconst API_URL = import.meta.env.VITE_API_URL;\nfetch(`${API_URL}/api/projects`)\n  .then(res => res.json())\n  .then(data => setProjects(data));',
    codeExample: `// React full-stack submit card handler
const handleSubmit = async (e) => {
  e.preventDefault();
  const newProject = { title, category, likes: 0 };
  
  try {
    const res = await fetch('http://localhost:8000/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProject)
    });
    
    if (res.ok) {
      const savedProject = await res.json();
      // Sync local UI state with database returned document immediately
      setProjects([...projects, savedProject]);
      showNotification('Success', 'Project uploaded to MongoDB via FastAPI!');
    }
  } catch (error) {
    console.error('Integration Error:', error);
  }
};`,
    lineByLine: [
      { line: 'method: \'POST\',', explanation: 'Specifies the HTTP method used to register the project record into the FastAPI database endpoint.' },
      { line: 'body: JSON.stringify(...)', explanation: 'Converts the local React state data object into a standardized JSON string payload.' },
      { line: 'const savedProject = await...', explanation: 'Reads the validated and processed project object, complete with its unique database ID.' },
      { line: 'setProjects([...projects, ...])', explanation: 'Performs a functional reactive state update, rendering the new record on-screen instantly without requiring a page refresh.' }
    ],
    bestPractices: [
      'Consolidate API base URLs into a single configurable config or environment file.',
      'Synchronize states carefully; update local frontend stores with server response values to ensure ID alignment.',
      'Implement graceful error fallback visuals in case backend API servers go offline.'
    ],
    commonMistakes: [
      'Mismatching frontend data schemas with backend Pydantic models, causing the API to reject inputs with 422 errors.',
      'Hardcoding local endpoints (e.g. http://localhost:8000) inside production builds instead of using environment configurations.',
      'Forgetting to configure CORS headers, which triggers silent, frustrating browser blocking errors.'
    ],
    hackathonTips: [
      'Use Docker or unified package managers to spin up full-stack containers easily.',
      'Test your full CRUD flow (Create, Read, Update, Delete) early in the hackathon cycle. Making sure your frontend can talk to your database in the first few hours guarantees a stress-free finale!',
      'Draft a comprehensive architecture diagram. Knowing exactly how data moves from React components to FastAPI controllers and down to MongoDB keeps your team fully aligned!'
    ]
  }
];

export const quizzes: QuizQuestion[] = [
  {
    id: 'q-day1',
    day: 1,
    type: 'mcq',
    question: 'Which tag represents the root of an HTML document?',
    options: ['<!DOCTYPE html>', '<html>', '<body>', '<head>'],
    correctAnswer: '1',
    explanation: 'The <html> tag represents the absolute root of an HTML document. The <!DOCTYPE html> tag is an instruction that informs the browser of the document type.'
  },
  {
    id: 'q-day2',
    day: 2,
    type: 'tf',
    question: 'The "name" attribute on an input field is optional when submitting form data to a backend server.',
    correctAnswer: 'False',
    explanation: 'The "name" attribute is strictly required. Without it, the browser cannot pair form fields with values when submitting or serializing the form data.'
  },
  {
    id: 'q-day3',
    day: 3,
    type: 'mcq',
    question: 'If an element has width: 200px, padding: 20px, border: 5px, and box-sizing: border-box, what is its total rendered width?',
    options: ['200px', '250px', '225px', '245px'],
    correctAnswer: '0',
    explanation: 'Since box-sizing is set to border-box, the defined width of 200px already includes padding and borders. The total rendered width remains exactly 200px.'
  },
  {
    id: 'q-day4',
    day: 4,
    type: 'prediction',
    question: 'In Tailwind CSS, what width class sets an element to stretch to exactly 50% of its parent container width?',
    correctAnswer: 'w-1/2',
    explanation: 'The class "w-1/2" sets width: 50% in Tailwind, relying on fractional utility configurations.'
  },
  {
    id: 'q-day5',
    day: 5,
    type: 'mcq',
    question: 'Which comparison operator checks both the value and the datatype in JavaScript?',
    options: ['==', '=', '===', '!='],
    correctAnswer: '2',
    explanation: 'The strict equality operator (===) compares both the value and the datatype of two operands, preventing tricky automatic type coercion bugs.'
  },
  {
    id: 'q-day6',
    day: 6,
    type: 'fitb',
    question: 'The ______ keyword is placed inside an async function to pause code execution until a promise resolves.',
    correctAnswer: 'await',
    explanation: 'The "await" keyword is used to pause asynchronous execution until a Promise resolves or rejects, making async code read like standard synchronous blocks.'
  },
  {
    id: 'q-day7',
    day: 7,
    type: 'tf',
    question: 'React state updates are synchronous, meaning you can read the updated state value immediately on the line following the setter function call.',
    correctAnswer: 'False',
    explanation: 'React state updates are scheduled and asynchronous. Reading the state value immediately after calling the setter will yield the old, stale value.'
  },
  {
    id: 'q-day8',
    day: 8,
    type: 'mcq',
    question: 'What happens if you omit the dependency array in a useEffect hook entirely? (e.g., useEffect(() => { ... }))',
    options: [
      'It runs exactly once when the component mounts.',
      'It never runs.',
      'It runs on every single render cycle of the component.',
      'It only runs when state variables change.'
    ],
    correctAnswer: '2',
    explanation: 'Without any dependency array, React executes the useEffect callback function after every single render cycle, which can easily trigger infinite re-renders if you update state inside.'
  },
  {
    id: 'q-day9',
    day: 9,
    type: 'fitb',
    question: 'FastAPI utilizes the ________ library under the hood to perform robust data serialization and input schema validation.',
    correctAnswer: 'pydantic',
    explanation: 'Pydantic is the core validation engine that FastAPI uses to parse request bodies, enforce type constraints, and generate schema metadata.'
  },
  {
    id: 'q-day10',
    day: 10,
    type: 'tf',
    question: 'APIRouter permits grouping and modularizing FastAPI route operations into separate files to scale app architecture.',
    correctAnswer: 'True',
    explanation: 'APIRouter acts as a mini-FastAPI instance that allows developers to register route modules separately and include them in the main server application file.'
  },
  {
    id: 'q-day11',
    day: 11,
    type: 'mcq',
    question: 'Which Python driver is preferred for asynchronous MongoDB interactions inside the FARM stack?',
    options: ['PyMongo', 'Motor', 'SQLAlchemy', 'Psycopg2'],
    correctAnswer: '1',
    explanation: 'Motor is the official asynchronous driver for MongoDB in Python, aligning perfectly with FastAPI\'s non-blocking async architecture.'
  },
  {
    id: 'q-day12',
    day: 12,
    type: 'prediction',
    question: 'To resolve browser blocking due to fetching APIs on different host ports, what security header configuration must be enabled on the server?',
    correctAnswer: 'CORS',
    explanation: 'CORS (Cross-Origin Resource Sharing) middleware configurations enable servers to designate which client host origins are permitted to call endpoints safely.'
  }
];

export const challenges: CodingChallenge[] = [
  {
    id: 'c-day1',
    day: 1,
    title: 'HTML Skeleton Builder',
    technology: 'HTML',
    difficulty: 'Easy',
    description: 'Construct a pristine HTML5 skeleton. Include a viewport meta tag for responsive scalability, a page title of "My Hackathon", and an H1 header reading "Boilerplate Active".',
    hint: 'Ensure your tags are fully closed and the structure follows the standard DOCTYPE, html, head, title, body nestings.',
    starterCode: '<!-- Create your HTML template here -->\n',
    solutionCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Hackathon</title>
  </head>
  <body>
    <h1>Boilerplate Active</h1>
  </body>
</html>`
  },
  {
    id: 'c-day2',
    day: 2,
    title: 'Form validation',
    technology: 'HTML',
    difficulty: 'Easy',
    description: 'Build a form targeting project registration. It must include: an email input (must be a valid email and strictly required), and a project name input (must have minimum 3 characters and also be required). Include a submit button.',
    hint: 'Use input types like type="email" and attributes like required and minlength="3".',
    starterCode: '<form>\n  <!-- Capture details here -->\n</form>',
    solutionCode: `<form id="hacker-form">
  <div>
    <label for="email">Contact Email</label>
    <input type="email" id="email" name="email" required />
  </div>
  <div>
    <label for="pname">Project Name</label>
    <input type="text" id="pname" name="project_name" minlength="3" required />
  </div>
  <button type="submit">Submit Project</button>
</form>`
  },
  {
    id: 'c-day3',
    day: 3,
    title: 'CSS Styling Card',
    technology: 'CSS',
    difficulty: 'Easy',
    description: 'Apply modern CSS variables and styling properties to style a card component class `.card`. Set border box-sizing, border-radius to 12px, background to white (#ffffff), padding to 20px, and margin to 15px.',
    hint: 'Set properties: box-sizing, border-radius, background-color, padding, and margin.',
    starterCode: '.card {\n  /* Apply styles here */\n}',
    solutionCode: `.card {
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  margin: 15px;
  border: 1px solid #e2e8f0;
}`
  },
  {
    id: 'c-day4',
    day: 4,
    title: 'Responsive Grid Pattern',
    technology: 'CSS',
    difficulty: 'Medium',
    description: 'Using Tailwind CSS class tokens, design an HTML wrapper element that renders a grid with 1 column on mobile devices, 2 columns on tablet screens (sm prefix), and 4 columns on large monitors (lg prefix). Add a gap spacing of 16px.',
    hint: 'Combine grid class with responsiveness overrides like grid-cols-1, sm:grid-cols-2, lg:grid-cols-4 and gap-4.',
    starterCode: '<div class="/* add grid tokens */">\n  <div>1</div>\n  <div>2</div>\n  <div>3</div>\n  <div>4</div>\n</div>',
    solutionCode: `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <div class="p-4 border">Card 1</div>
  <div class="p-4 border">Card 2</div>
  <div class="p-4 border">Card 3</div>
  <div class="p-4 border">Card 4</div>
</div>`
  },
  {
    id: 'c-day5',
    day: 5,
    title: 'Array Filter Operation',
    technology: 'JavaScript',
    difficulty: 'Easy',
    description: 'Write a JavaScript function called `filterTechProjects(projects)` that receives an array of project objects and returns only the projects belonging to the category "React".',
    hint: 'Use the standard JavaScript array `.filter()` method, checking `project.category === "React"`.',
    sampleInput: `const projs = [
  { name: 'App A', category: 'React' },
  { name: 'App B', category: 'FastAPI' }
]`,
    sampleOutput: `[{ name: 'App A', category: 'React' }]`,
    starterCode: 'function filterTechProjects(projects) {\n  // Implement function\n}',
    solutionCode: `function filterTechProjects(projects) {
  return projects.filter(project => project.category === "React");
}`
  },
  {
    id: 'c-day6',
    day: 6,
    title: 'Async Fetch Controller',
    technology: 'JavaScript',
    difficulty: 'Medium',
    description: 'Implement an asynchronous function `loadTeamData(url)` that fetches JSON data from a provided URL, parses it, and handles errors with a try/catch block. Return null if an error occurs.',
    hint: 'Combine async/await syntax, a fetch() call, response.json(), and a try-catch architecture.',
    starterCode: 'async function loadTeamData(url) {\n  // Fetch and return here\n}',
    solutionCode: `async function loadTeamData(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('API Error');
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}`
  },
  {
    id: 'c-day7',
    day: 7,
    title: 'Reactive Counter State',
    technology: 'React',
    difficulty: 'Easy',
    description: 'Build a standard React component `ProjectLikeButton` that uses `useState` to track a numerical state initialized to 0. Every click of the button must increment the count value.',
    hint: 'Import useState, declare [likes, setLikes], and update onClick handler.',
    starterCode: 'import { useState } from "react";\n\nexport default function ProjectLikeButton() {\n  // Define component\n}',
    solutionCode: `import { useState } from 'react';

export default function ProjectLikeButton() {
  const [likes, setLikes] = useState(0);
  return (
    <button 
      onClick={() => setLikes(likes + 1)}
      className="px-4 py-2 bg-indigo-600 text-white rounded"
    >
      Likes: {likes}
    </button>
  );
}`
  },
  {
    id: 'c-day8',
    day: 8,
    title: 'Sync Document Title',
    technology: 'React',
    difficulty: 'Medium',
    description: 'Implement a React component `DocumentSync` that uses `useEffect` to synchronize the browser tab document title (`document.title`) with a local state string `title`. The effect must trigger only when `title` changes.',
    hint: 'Put document.title = title inside a useEffect callback, and add [title] inside the dependency list.',
    starterCode: 'import { useState, useEffect } from "react";\n\nexport default function DocumentSync() {\n  // Implement effect synchronization\n}',
    solutionCode: `import { useState, useEffect } from 'react';

export default function DocumentSync() {
  const [title, setTitle] = useState('Bootcamp Day 8');

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <input 
      type="text" 
      value={title} 
      onChange={(e) => setTitle(e.target.value)} 
      className="p-2 border"
    />
  );
}`
  },
  {
    id: 'c-day9',
    day: 9,
    title: 'FastAPI Validation model',
    technology: 'FastAPI',
    difficulty: 'Medium',
    description: 'Draft a Python Pydantic validation model class `ProjectCreate` containing three attributes: `title` (string, must be required), `hackathon_id` (integer, must be required), and `description` (optional string, defaults to None).',
    hint: 'Extend BaseModel, use type hints, and define Optional parameters from the typing library.',
    starterCode: 'from pydantic import BaseModel\nfrom typing import Optional\n\n# Create model\n',
    solutionCode: `from pydantic import BaseModel
from typing import Optional

class ProjectCreate(BaseModel):
    title: str
    hackathon_id: int
    description: Optional[str] = None`
  },
  {
    id: 'c-day10',
    day: 10,
    title: 'Modular FastAPI Route',
    technology: 'FastAPI',
    difficulty: 'Medium',
    description: 'Define a modular sub-router called `user_router` using FastAPI `APIRouter`. Include a single GET endpoint at path "/profile" that returns a JSON dictionary: `{"username": "hacker123"}`.',
    hint: 'Import APIRouter, instantiate router with `router = APIRouter()`, decorate endpoint with `@router.get("/profile")`.',
    starterCode: 'from fastapi import APIRouter\n\n# Implement modular route router\n',
    solutionCode: `from fastapi import APIRouter

user_router = APIRouter()

@user_router.get("/profile")
async def get_user_profile():
    return {"username": "hacker123"}`
  },
  {
    id: 'c-day11',
    day: 11,
    title: 'Motor Collection Insert',
    technology: 'MongoDB',
    difficulty: 'Hard',
    description: 'Implement an asynchronous Python function `insert_project_doc(collection, doc)` that inserts a dictionary document `doc` into a MongoDB collection using Motor asynchronously, returning the inserted document string ID.',
    hint: 'Await `collection.insert_one(doc)`, then fetch `.inserted_id` and convert it using `str()`.',
    starterCode: 'async def insert_project_doc(collection, doc):\n  # Insert and return string ID\n  pass',
    solutionCode: `async def insert_project_doc(collection, doc):
    result = await collection.insert_one(doc)
    return str(result.inserted_id)`
  },
  {
    id: 'c-day12',
    day: 12,
    title: 'Full FARM Connection Hook',
    technology: 'Integration',
    difficulty: 'Hard',
    description: 'Write an asynchronous JavaScript submit handler `sendFormPayload(endpoint, payload)` that posts a JSON body payload to a FastAPI backend endpoint, parses the returned object, and alerts user on network errors.',
    hint: 'Use fetch() with POST method, include headers "Content-Type: application/json", JSON.stringify the body payload, and use try-catch.',
    starterCode: 'async function sendFormPayload(endpoint, payload) {\n  // Implement network submit sync\n}',
    solutionCode: `async function sendFormPayload(endpoint, payload) {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Network payload dispatch rejected');
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}`
  }
];

export const projectMilestones: ProjectMilestone[] = [
  {
    day: 1,
    title: 'The Static Skeleton Portal',
    description: 'Lay out the initial web page outline for our team-discovery portal DevFast. Create document frames, semantic layouts, and placeholders.',
    features: [
      'An elegant top navigation bar',
      'Hero section introducing the "DevFast Hackathon Team Platform"',
      'Grid container placeholder for upcoming active hackathon projects'
    ],
    guideMarkdown: '### Step-by-Step Implementation Guide\n\n1. Use HTML5 Semantic elements (`<header>`, `<main>`, `<footer>`) to outline the document.\n2. In the `<head>`, include standard meta tags for viewport scaling.\n3. Draft standard card structures inside `<section id="projects">` using simple placeholder titles.\n\n*Hackathon Tip:* Early layout organization avoids messy code migration later!',
    mockFiles: [
      {
        name: 'index.html',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DevFast - Hackathon Team Finder</title>
</head>
<body>
  <header>
    <nav>
      <strong>DevFast 🚀</strong>
      <a href="#projects">Discover Projects</a>
    </nav>
  </header>
  <main>
    <section id="hero">
      <h1>Find Your Dream Team & Launch Projects</h1>
      <p>Connect with designers, developers, and writers in seconds.</p>
    </section>
    <section id="projects">
      <h2>Active Teams</h2>
      <!-- Day 1 placeholders -->
      <div class="project-card">
        <h3>FinTech Ledger</h3>
        <p>A fast decentralized ledger wrapper.</p>
      </div>
    </section>
  </main>
</body>
</html>`
      }
    ]
  },
  {
    day: 2,
    title: 'Project Forms & Category Input Fields',
    description: 'Construct a rich interactive dashboard form allowing hackers to register their projects, team tags, and member openings.',
    features: [
      'Interactive form labeled with input name, description, and technology tags',
      'Select drop-down listing available hackathon track categories',
      'Automatic HTML5 form input validations'
    ],
    guideMarkdown: '### Step-by-Step Implementation Guide\n\n1. In your `index.html` main block, embed a `<form id="project-form">`.\n2. Add labels and inputs for **Project Title**, **Description**, and **Category Select**.\n3. Enforce validation attributes: make title `required` and set a `minlength="3"` criteria.',
    mockFiles: [
      {
        name: 'index.html',
        language: 'html',
        code: `<form id="add-project-form">
  <h3>Register New Hackathon Project</h3>
  <div>
    <label for="title">Project Title (Required)</label>
    <input type="text" id="title" name="title" minlength="3" placeholder="e.g. HealthAI" required>
  </div>
  <div>
    <label for="track">Hackathon Track</label>
    <select id="track" name="track">
      <option value="AI">Artificial Intelligence</option>
      <option value="Fintech">Financial Technology</option>
      <option value="Health">Healthcare Systems</option>
    </select>
  </div>
  <button type="submit">Create Card</button>
</form>`
      }
    ]
  },
  {
    day: 3,
    title: 'CSS Card Aesthetics & Spacings',
    description: 'Transform raw HTML nodes into gorgeous, high-contrast mock-up card layouts using CSS properties.',
    features: [
      'Unified modern color schemes using CSS styling resets',
      'Soft shadow effects and hover animations',
      'Box model margins and paddings for readability'
    ],
    guideMarkdown: '### Step-by-Step Implementation Guide\n\n1. Set up a global stylesheet or stylesheet tag.\n2. Apply `box-sizing: border-box` to avoid component sizing glitches.\n3. Add smooth interactive hover parameters: `transition: transform 0.2s ease`.',
    mockFiles: [
      {
        name: 'style.css',
        language: 'css',
        code: `body {
  font-family: 'Inter', sans-serif;
  color: #1e293b;
  background-color: #f8fafc;
  margin: 0;
}
.project-card {
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
}`
      }
    ]
  },
  {
    day: 4,
    title: 'Modern Responsive Layout Columns',
    description: 'Structure a professional, fluid dashboard layout utilizing Flexbox alignments and grid properties.',
    features: [
      'Grid container displaying responsive cards',
      'Header layout with logo and navigation aligned via Flexbox',
      'Responsive media queries shifting layouts from mobile to desktop sizes'
    ],
    guideMarkdown: '### Step-by-Step Implementation Guide\n\n1. Enclose your project list container inside a CSS grid layout.\n2. Configure media queries to scale columns dynamically (`@media (min-width: 768px)`).\n3. Style header navigation links using flexbox row alignment.',
    mockFiles: [
      {
        name: 'layout.css',
        language: 'css',
        code: `header nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
}
.project-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  padding: 24px;
}
@media (min-width: 768px) {
  .project-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}`
      }
    ]
  },
  {
    day: 5,
    title: 'Dynamic DOM Renderings & Search filters',
    description: 'Write Javascript controller logic to render data objects dynamically and enable query filtering lists.',
    features: [
      'Storing project models as JSON objects inside a Javascript array',
      'Looping through the list to append cards into the DOM stream programmatically',
      'Keyword input listener that updates the list of projects as you type'
    ],
    guideMarkdown: '### Step-by-Step Implementation Guide\n\n1. Define your primary data array inside a script tag or file.\n2. Write a `renderProjects(list)` routine that wipes the list container innerHTML and loops to append items.\n3. Add an event listener to the search input, filtering projects whose names include the searched query.',
    mockFiles: [
      {
        name: 'app.js',
        language: 'javascript',
        code: `const sampleProjects = [
  { id: 1, title: 'LedgerAI', track: 'Fintech' },
  { id: 2, title: 'HealSync', track: 'Health' }
];

function render(list) {
  const grid = document.getElementById('project-grid');
  grid.innerHTML = '';
  list.forEach(p => {
    grid.innerHTML += \`
      <div class="project-card">
        <h3>\${p.title}</h3>
        <span>\${p.track}</span>
      </div>
    \`;
  });
}

document.getElementById('search-box').addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = sampleProjects.filter(p => p.title.toLowerCase().includes(query));
  render(filtered);
});

render(sampleProjects);`
      }
    ]
  },
  {
    day: 6,
    title: 'Simulating REST Fetch Workflows',
    description: 'Configure asynchronous promises to simulate fetching projects from API servers with realistic delays.',
    features: [
      'Creating asynchronous function controllers using async/await syntax',
      'Implementing simulated 1-second network loading cycles',
      'Whipping up mock project data responses'
    ],
    guideMarkdown: '### Step-by-Step Implementation Guide\n\n1. Draft a dummy local JSON file or use a Javascript Promise that resolves after a setTimeout.\n2. Display a spinning "Loading..." message in the HTML list element while waiting for data.\n3. Render the fetched data after the promise resolves.',
    mockFiles: [
      {
        name: 'api.js',
        language: 'javascript',
        code: `const mockApiFetch = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 101, title: 'Aura Chatbot', track: 'AI' },
        { id: 102, title: 'FitSync Tracker', track: 'Health' }
      ]);
    }, 1000);
  });
};

async function loadData() {
  const grid = document.getElementById('project-grid');
  grid.innerHTML = '<p class="loading">Loading remote projects...</p>';
  try {
    const data = await mockApiFetch();
    render(data);
  } catch (err) {
    grid.innerHTML = '<p class="error">Failed to fetch api.</p>';
  }
}`
      }
    ]
  },
  {
    day: 7,
    title: 'Migrating to React Components',
    description: 'Rebuild our entire discovery portal frontend into a responsive React component architecture with live local state.',
    features: [
      'Decomposing layouts into modular components: ProjectCard and TrackerFilters',
      'Leveraging useState hooks to manage like counters and item selections',
      'Creating clean JSX templates'
    ],
    guideMarkdown: '### Step-by-Step Implementation Guide\n\n1. Setup React modules inside the workspace.\n2. Translate your static HTML layouts into reactive JSX.\n3. Pass properties (props) dynamically from wrapper container lists down to ProjectCard components.',
    mockFiles: [
      {
        name: 'ProjectCard.tsx',
        language: 'typescript',
        code: `import React, { useState } from 'react';

interface CardProps {
  title: string;
  category: string;
}

export function ProjectCard({ title, category }: CardProps) {
  const [likes, setLikes] = useState(0);

  return (
    <div className="p-4 bg-white border rounded-xl shadow-sm">
      <h4 className="font-bold text-slate-800">{title}</h4>
      <p className="text-sm text-slate-500">{category}</p>
      <button 
        onClick={() => setLikes(likes + 1)}
        className="mt-3 text-xs bg-slate-100 px-3 py-1 rounded hover:bg-slate-200"
      >
        👍 {likes} Upvotes
      </button>
    </div>
  );
}`
      }
    ]
  },
  {
    day: 8,
    title: 'Syncing React with APIs & Forms',
    description: 'Equip the React components to fetch live database arrays and append new items through modal submission forms.',
    features: [
      'Executing automatic initial fetch calls inside the useEffect hook',
      'Configuring a responsive add-project modal form in React',
      'Displaying real-time validation error alerts'
    ],
    guideMarkdown: '### Step-by-Step Implementation Guide\n\n1. Inside the parent component, import `useEffect` and trigger API fetching on mount.\n2. Control form text input fields via React states (controlled inputs).\n3. Append newly registered projects to your state array upon form submissions.',
    mockFiles: [
      {
        name: 'App.tsx',
        language: 'typescript',
        code: `import React, { useState, useEffect } from 'react';
import { ProjectCard } from './ProjectCard';

export default function App() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    // Initial data fetch simulation
    setProjects([
      { id: 1, title: 'Decentralized Vote', category: 'Fintech' }
    ]);
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    const newItem = { id: Date.now(), title, category: 'General' };
    setProjects([...projects, newItem]);
    setTitle('');
  };

  return (
    <div className="p-6">
      <form onSubmit={handleAdd} className="mb-6">
        <input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="New Project" />
        <button type="submit">Add</button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map(p => <ProjectCard key={p.id} title={p.title} category={p.category} />)}
      </div>
    </div>
  );
}`
      }
    ]
  },
  {
    day: 9,
    title: 'Booting the FastAPI Backend',
    description: 'Transition from mock static client data files to building a robust, high-performance API server using FastAPI.',
    features: [
      'Creating a FastAPI server routing handler',
      'Declaring a Pydantic Model for project objects',
      'Creating GET and POST endpoints to fetch and upload projects'
    ],
    guideMarkdown: '### Step-by-Step Implementation Guide\n\n1. In your Python server space, install fastapi and uvicorn.\n2. Define a Pydantic class matching your Project model fields.\n3. Add path handlers for GET `/api/projects` and POST `/api/projects`.',
    mockFiles: [
      {
        name: 'main.py',
        language: 'python',
        code: `from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

class Project(BaseModel):
    id: int
    title: str
    category: str

projects_db = [
    {"id": 1, "title": "React Dashboard", "category": "React"}
]

@app.get("/api/projects", response_model=List[Project])
async def get_projects():
    return projects_db

@app.post("/api/projects", response_model=Project)
async def add_project(project: Project):
    projects_db.append(project.dict())
    return project`
      }
    ]
  },
  {
    day: 10,
    title: 'Configuring Routers, CORS & Middlewares',
    description: 'Divide endpoints into modular routers and enable full CORS policies to accept cross-origin requests from the React client.',
    features: [
      'APIRouter file divisions',
      'CORS middleware origin declarations',
      'Explicit HTTP validation exception controls'
    ],
    guideMarkdown: '### Step-by-Step Implementation Guide\n\n1. Create a `routers` folder and add `projects.py`.\n2. Instantiate an `APIRouter()` in the submodule and associate standard routes.\n3. In your central `main.py`, include CORS middleware specifying your React dev port.',
    mockFiles: [
      {
        name: 'server_cors.py',
        language: 'python',
        code: `from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Adapt for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# APIRouter imports...`
      }
    ]
  },
  {
    day: 11,
    title: 'MongoDB Schema Integration via Motor',
    description: 'Connect the FastAPI server directly to a local or cloud-hosted MongoDB collection, replacing temporary lists.',
    features: [
      'Async connection setups using Motor',
      'Mapping MongoDB objects to clean serializable Python dicts',
      'Asynchronous document insertions and searches'
    ],
    guideMarkdown: '### Step-by-Step Implementation Guide\n\n1. Configure a MongoDB Atlas instance.\n2. Initialize `AsyncIOMotorClient` inside the startup handler of your FastAPI server.\n3. In your project route controllers, use async collections methods (`find` and `insert_one`) to read and write database entries.',
    mockFiles: [
      {
        name: 'db.py',
        language: 'python',
        code: `import motor.motor_asyncio
from bson import ObjectId

client = motor.motor_asyncio.AsyncIOMotorClient("mongodb://localhost:27017")
database = client.hackathon_manager
collection = database.projects

def project_serializer(proj) -> dict:
    return {
        "id": str(proj["_id"]),
        "title": proj["title"],
        "category": proj["category"]
    }

async def fetch_projects_from_db():
    cursor = collection.find()
    return [project_serializer(p) for p in await cursor.to_list(length=100)]`
      }
    ]
  },
  {
    day: 12,
    title: 'Full FARM Stack Integration Loop',
    description: 'Connect the React UI to the FastAPI backend with database mutations in MongoDB, compiling the final hackathon project!',
    features: [
      'End-to-end full CRUD operations (Create, Read, Update, Delete)',
      'Global responsive state synchronization across layout elements',
      'Production deployment environment configuration checks'
    ],
    guideMarkdown: '### Step-by-Step Implementation Guide\n\n1. Update React components to use your FastAPI server address dynamically.\n2. Wire up the add project modal to trigger an API POST request.\n3. Ensure CORS and database configurations are correct, and test the complete application flow!',
    mockFiles: [
      {
        name: 'full_stack_sync.js',
        language: 'javascript',
        code: `// React client talking to python FastAPI + Mongo collection
const API_BASE = "http://localhost:8000/api";

export async function fetchAllProjects() {
  const res = await fetch(\`\${API_BASE}/projects\`);
  return await res.json();
}

export async function createProjectOnDB(projectData) {
  const res = await fetch(\`\${API_BASE}/projects\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projectData)
  });
  return await res.json();
}`
      }
    ]
  }
];

export const flashcards: Flashcard[] = [
  { id: 'fc-1', front: 'What is DOCTYPE declaration in HTML?', back: 'It is an instruction to the web browser about what version of HTML the page is written in, ensuring standard compliance rendering.', technology: 'HTML' },
  { id: 'fc-2', front: 'What does box-sizing: border-box do?', back: 'It includes an element\'s padding and border width calculations in its total width and height, preventing layout-stretch bugs.', technology: 'CSS' },
  { id: 'fc-3', front: 'How does flex-direction row vs column behave?', back: 'Row (default) aligns flex items horizontally across the main axis, while column stacks items vertically down the main axis.', technology: 'CSS' },
  { id: 'fc-4', front: 'Explain difference between let and const in JS.', back: 'let permits variable reassignment after definition, whereas const creates a read-only block-scoped reference that cannot be reassigned.', technology: 'JavaScript' },
  { id: 'fc-5', front: 'What is a Promise in JavaScript?', back: 'An object representing the eventual completion or failure of an asynchronous operation, holding states: Pending, Resolved, or Rejected.', technology: 'JavaScript' },
  { id: 'fc-6', front: 'Why does React require keys on list items?', back: 'Keys help React identify which items have changed, been added, or been removed, optimizing virtual DOM matching and rendering speed.', technology: 'React' },
  { id: 'fc-7', front: 'What is the purpose of the useEffect clean-up function?', back: 'It runs before the component unmounts or before the effect re-runs, clearing intervals, event listeners, or websockets to prevent memory leaks.', technology: 'React' },
  { id: 'fc-8', front: 'What is the role of Pydantic models in FastAPI?', back: 'They define the structured shape of requests and responses, performing automatic input validation, typing enforcement, and JSON serialization.', technology: 'FastAPI' },
  { id: 'fc-9', front: 'How do you enable cross-origin communication in FastAPI?', back: 'By attaching CORSMiddleware to your FastAPI application and configuring origins, credentials, methods, and headers.', technology: 'FastAPI' },
  { id: 'fc-10', front: 'What is an ObjectID in MongoDB?', back: 'A unique 12-byte identifier automatically generated as the primary key (`_id`) for every document in a collection.', technology: 'MongoDB' }
];

export const cheatsheets: Cheatsheet[] = [
  {
    id: 'cs-html',
    title: 'HTML Cheat Sheet',
    technology: 'HTML',
    content: [
      { title: 'Responsive Viewport', code: '<meta name="viewport" content="width=device-width, initial-scale=1.0">', desc: 'Placed in <head>, enables screen scaling layout responsiveness.' },
      { title: 'HTML5 Form Field', code: '<input type="email" id="email" required placeholder="name@domain.com">', desc: 'Captures input data with native type validations.' },
      { title: 'Dropdown Select', code: '<select name="track">\n  <option value="ai">AI Track</option>\n</select>', desc: 'Structured selection list form control.' }
    ]
  },
  {
    id: 'cs-css',
    title: 'CSS & Tailwind Cheat Sheet',
    technology: 'CSS',
    content: [
      { title: 'Flexbox Center Align', code: '/* CSS */\n.flex-center {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n<!-- Tailwind -->\n<div class="flex items-center justify-center">', desc: 'Centers child components horizontally and vertically.' },
      { title: 'Responsive Grid Template', code: '<!-- Tailwind Grid -->\n<div class="grid grid-cols-1 md:grid-cols-3 gap-4">', desc: 'Renders 1 column grid on mobile phones and 3 columns on desktops.' },
      { title: 'Smooth Animations', code: '<!-- Tailwind transitions -->\n<button class="transition duration-300 ease-in-out hover:scale-105 hover:bg-indigo-700">', desc: 'Attaches elegant transitions on mouse hovers.' }
    ]
  },
  {
    id: 'cs-js',
    title: 'Modern JS & Fetch Cheat Sheet',
    technology: 'JavaScript',
    content: [
      { title: 'Fetch API GET', code: 'async function getProjects() {\n  const res = await fetch("/api/projects");\n  const data = await res.json();\n  return data;\n}', desc: 'Dispatches non-blocking network GET operations to harvest JSON data.' },
      { title: 'Fetch API POST', code: 'await fetch("/api/projects", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify(payload)\n});', desc: 'Posts structured JSON parameters safely to backend servers.' },
      { title: 'Array Transformations', code: 'const activeTitles = projects\n  .filter(p => p.status === "active")\n  .map(p => p.title);', desc: 'Combines filters and mappings to transform local records arrays.' }
    ]
  },
  {
    id: 'cs-react',
    title: 'React Hooks Cheat Sheet',
    technology: 'React',
    content: [
      { title: 'useState Memory Hook', code: 'const [projects, setProjects] = useState([]);', desc: 'Allows React component blocks to store dynamic arrays across rendering cycles.' },
      { title: 'useEffect Synchronization', code: 'useEffect(() => {\n  loadRemoteData();\n}, []); // Executes once on mount', desc: 'Triggers API loads or background subscriptions after page elements load.' },
      { title: 'Conditional Classes', code: '<div className={`p-4 ${active ? "bg-blue-50" : "bg-white"}`}>', desc: 'Evaluates Javascript expressions to conditionally swap style properties.' }
    ]
  },
  {
    id: 'cs-fastapi',
    title: 'FastAPI Server Cheat Sheet',
    technology: 'FastAPI',
    content: [
      { title: 'Boot Server script', code: 'from fastapi import FastAPI\napp = FastAPI()\n\n@app.get("/")\ndef home():\n    return {"status": "running"}', desc: 'Launches a fast, standard async REST server.' },
      { title: 'Pydantic Validator Model', code: 'from pydantic import BaseModel\n\nclass Team(BaseModel):\n    name: str\n    members_count: int', desc: 'Defines input schema data validation rules.' },
      { title: 'Add CORS Middleware', code: 'from fastapi.middleware.cors import CORSMiddleware\n\napp.add_middleware(\n    CORSMiddleware,\n    allow_origins=["*"],\n    allow_methods=["*"],\n)', desc: 'Unlocks backend endpoint cross-origin fetching capabilities.' }
    ]
  }
];

export const interviewQuestions: InterviewQuestion[] = [
  { id: 'iq-1', question: 'What are the three pillars of the FARM stack and why are they paired together?', answer: 'The FARM stack consists of FastAPI (for high-speed async server creation), React (for rich interactive client interfaces), and MongoDB (for agile, flexible schema NoSQL persistence). They are highly compatible because MongoDB documents map cleanly to Python dictionaries and React JSON payloads, enabling rapid, modern development cycles.', technology: 'Integration' },
  { id: 'iq-2', question: 'What is the virtual DOM in React and how does it optimize page updates?', answer: 'The virtual DOM is an in-memory representation of actual browser DOM nodes. When state changes, React builds a secondary virtual tree, computes the exact difference (diffing algorithm) between the old and new trees, and updates only the necessary parts of the real DOM. This avoids slow, global layout re-computations.', technology: 'React' },
  { id: 'iq-3', question: 'Explain the difference between synchronous and asynchronous operations in JavaScript.', answer: 'Synchronous operations block succeeding actions; code runs line-by-line, halting the browser until current actions finish. Asynchronous operations (like api fetch or timeout loops) register callbacks in the background and continue running other calculations, preventing the user interface from freezing during network requests.', technology: 'JavaScript' },
  { id: 'iq-4', question: 'How does FastAPI use Pydantic to validate parameters?', answer: 'When a request hits a path decorated with a Pydantic argument, FastAPI parses the incoming JSON body, maps values to the model properties, and validates types. If input constraints fail, FastAPI automatically interrupts and returns a structured 422 Unprocessable Entity error, preventing bad data from reaching application logic.', technology: 'FastAPI' },
  { id: 'iq-5', question: 'What are collections and documents in MongoDB NoSQL schemas?', answer: 'In MongoDB, a Collection is a structural container that groups documents (equivalent to a SQL table). A Document is an individual record structured as a JSON-like object (BSON) containing key-value fields (equivalent to a SQL row). Unlike relational databases, documents within the same collection can have different fields.', technology: 'MongoDB' }
];
