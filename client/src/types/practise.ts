export interface Subject {
  id: string;
  name: string;
  description?: string;
}

export interface PracticeQuestion {
  id: string;
  question: string;
  options: QuestionOption[];
  explanation: string;
  isCorrect?: boolean;
}

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Practice {
  id: string;
  subject: Subject;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  questions: PracticeQuestion[];
  createdAt: string;
  score: number;
  totalQuestions: number;
}

export interface PracticeHistoryResponse {
  practices: Practice[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
