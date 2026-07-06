export interface Lesson {
  id: string;
  title: string;
  slug: string;
  day: number;
  duration: string; // e.g. "45 mins"
  technology: 'HTML' | 'CSS' | 'JavaScript' | 'React' | 'FastAPI' | 'MongoDB' | 'Integration';
  learningGoals: string[];
  explanation: string;
  syntax: string;
  codeExample: string;
  lineByLine: { line: string; explanation: string }[];
  bestPractices: string[];
  commonMistakes: string[];
  hackathonTips: string[];
}

export type QuizType = 'mcq' | 'tf' | 'fitb' | 'prediction';

export interface QuizQuestion {
  id: string;
  day: number;
  type: QuizType;
  question: string;
  codeSnippet?: string;
  options?: string[]; // for mcq
  correctAnswer: string; // value or index for mcq
  explanation: string;
}

export interface CodingChallenge {
  id: string;
  day: number;
  title: string;
  technology: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  hint: string;
  sampleInput?: string;
  sampleOutput?: string;
  starterCode: string;
  solutionCode: string;
}

export interface ProjectMilestone {
  day: number;
  title: string;
  description: string;
  features: string[];
  guideMarkdown: string;
  mockFiles: { name: string; language: string; code: string }[];
}

export interface Note {
  id: string;
  title: string;
  content: string;
  day: number;
  bookmarked: boolean;
  createdAt: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  technology: string;
}

export interface Cheatsheet {
  id: string;
  title: string;
  technology: string;
  content: { title: string; code: string; desc: string }[];
}

export interface InterviewQuestion {
  id: string;
  question: string;
  answer: string;
  technology: string;
}

export interface UserProgress {
  activeDay: number;
  completedLessons: string[]; // lessonIds
  completedQuizzes: string[]; // quizIds
  quizScores: Record<string, number>; // quizId -> score (percentage)
  completedChallenges: string[]; // challengeIds
  completedProjectTasks: number[]; // days completed
  studyHours: number;
  checklist: Record<number, string[]>; // day -> list of completed tasks
  notes: Note[];
}
