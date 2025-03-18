import { useSubmitAnswer } from "@/hooks/practise";
import { PracticeQuestion } from "@/types/practise";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";

interface QuestionCardProps {
  practiceId: string;
  question: PracticeQuestion;
  onNext: () => void;
  isLastQuestion: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  practiceId,
  question,
  onNext,
  isLastQuestion,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [result, setResult] = useState<{
    isCorrect: boolean;
    explanation: string;
  } | null>(null);

  const submitAnswerMutation = useSubmitAnswer();

  const handleSubmit = async () => {
    if (!selectedAnswer) return;

    try {
      const result = await submitAnswerMutation.mutateAsync({
        practiceId,
        questionId: question.id,
        answerId: selectedAnswer,
      });
      setResult(result);
    } catch (error) {
      console.error("Failed to submit answer:", error);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-medium">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          onValueChange={setSelectedAnswer}
          value={selectedAnswer}
          disabled={!!result}
        >
          {question.options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <RadioGroupItem value={option.id} id={option.id} />
              <Label htmlFor={option.id}>{option.text}</Label>
            </div>
          ))}
        </RadioGroup>

        {result && (
          <Alert variant={result.isCorrect ? "default" : "destructive"}>
            <AlertTitle>
              {result.isCorrect ? "Correct!" : "Incorrect"}
            </AlertTitle>
            <AlertDescription>{result.explanation}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleSubmit} disabled={!selectedAnswer || !!result}>
          Submit Answer
        </Button>
        {result && (
          <Button onClick={onNext} variant="outline">
            {isLastQuestion ? "Finish Practice" : "Next Question"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
