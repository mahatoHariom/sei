"use client";
import { PracticeHistory } from "@/components/practise/practiseHistory";
import { PracticeSetup } from "@/components/practise/practiseSetup";
import { QuestionCard } from "@/components/practise/question-card";
import { useSubjects } from "@/hooks/subjects";
import { Practice } from "@/types/practise";
import { useState } from "react";

export default function PracticePage() {
  const [currentPractice, setCurrentPractice] = useState<Practice | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { data: subjects, isLoading } = useSubjects();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      {!currentPractice ? (
        <>
          <PracticeSetup
            subjects={subjects || []}
            onPracticeStart={setCurrentPractice}
          />
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Practice History</h2>
            <PracticeHistory />
          </div>
        </>
      ) : (
        <QuestionCard
          practiceId={currentPractice.id}
          question={currentPractice.questions[currentQuestionIndex]}
          isLastQuestion={
            currentQuestionIndex === currentPractice.questions.length - 1
          }
          onNext={() => {
            if (currentQuestionIndex < currentPractice.questions.length - 1) {
              setCurrentQuestionIndex((i) => i + 1);
            } else {
              setCurrentPractice(null);
              setCurrentQuestionIndex(0);
            }
          }}
        />
      )}
    </div>
  );
}
