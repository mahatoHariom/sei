"use client";
import { useGetPracticeQuestions, useSubmitMCQAttempt } from "@/hooks/mcq";
import { useState } from "react";
import { Alert, AlertDescription } from "../ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

interface MCQPracticeProps {
  courseId: string;
  count?: number;
}

export const MCQPractice = ({ courseId, count }: MCQPracticeProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const { data: practiceData, isLoading } = useGetPracticeQuestions(
    courseId,
    count
  );
  const submitAttempt = useSubmitMCQAttempt();

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading questions...</div>;
  }

  if (!practiceData?.questions.length) {
    return (
      <Alert>
        <AlertDescription>
          No practice questions available for this course.
        </AlertDescription>
      </Alert>
    );
  }

  const currentQuestion = practiceData.questions[currentQuestionIndex];
  const progress =
    ((currentQuestionIndex + 1) / practiceData.questions.length) * 100;

  const handleSubmit = async () => {
    if (!selectedOption) return;

    await submitAttempt.mutateAsync({
      questionId: currentQuestion.id,
      optionId: selectedOption,
    });

    setShowExplanation(true);
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <Progress value={progress} className="w-full" />

      <Card>
        <CardHeader>
          <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg font-medium">{currentQuestion.question}</p>

          <RadioGroup
            value={selectedOption || ""}
            onValueChange={setSelectedOption}
            className="space-y-4"
          >
            {currentQuestion.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.id}
                  id={option.id}
                  disabled={showExplanation}
                />
                <Label htmlFor={option.id} className="text-base">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {showExplanation && (
            <Alert
              className={
                submitAttempt.data?.isCorrect ? "bg-green-50" : "bg-red-50"
              }
            >
              <AlertDescription className="space-y-2">
                <p className="font-medium">
                  {submitAttempt.data?.isCorrect ? "Correct!" : "Incorrect"}
                </p>
                <p>{currentQuestion.explanation}</p>
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-between pt-4">
            {!showExplanation ? (
              <Button
                onClick={handleSubmit}
                disabled={!selectedOption || submitAttempt.isPending}
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={
                  currentQuestionIndex >= practiceData.questions.length - 1
                }
              >
                Next Question
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
