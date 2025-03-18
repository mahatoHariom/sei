// src/services/practice.ts
import api from "@/lib/axios-instance";

export interface PracticeResponse {
  id: string;
  subject: {
    id: string;
    name: string;
  };
  difficulty: "EASY" | "MEDIUM" | "HARD";
  questions: Array<{
    id: string;
    question: string;
    options: Array<{
      id: string;
      text: string;
      isCorrect: boolean;
    }>;
    explanation: string;
    isCorrect?: boolean;
  }>;
  createdAt: string;
  score: number;
  totalQuestions: number;
}

export interface StartPracticeDto {
  subjectId: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
}

interface SubmitAnswerDto {
  practiceId: string;
  questionId: string;
  answerId: string;
}

export const startPractice = async (
  data: StartPracticeDto
): Promise<PracticeResponse> => {
  const response = await api.post("/practice", data);
  return response.data;
};

export const submitAnswer = async (data: SubmitAnswerDto) => {
  const response = await api.post(
    `/practice/${data.practiceId}/questions/${data.questionId}`,
    { answerId: data.answerId }
  );
  return response.data;
};

export const getPracticeHistory = async (page = 1, limit = 10) => {
  const response = await api.get(
    `/practice/history?page=${page}&limit=${limit}`
  );
  return response.data;
};
