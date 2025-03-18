/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useStartPractice } from "@/hooks/practise";
import { toast } from "sonner";
import { handleError } from "@/helpers/handle-error";
import { Practice, Subject } from "@/types/practise";

interface PracticeSetupProps {
  subjects: Subject[];
  onPracticeStart: (practice: Practice) => void;
}

export const PracticeSetup: React.FC<PracticeSetupProps> = ({
  subjects,
  onPracticeStart,
}) => {
  //   const { toast } = useToast();
  const [subjectId, setSubjectId] = useState<string>("");
  const [difficulty, setDifficulty] = useState<"EASY" | "MEDIUM" | "HARD">();

  const startPracticeMutation = useStartPractice();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectId || !difficulty) return;

    try {
      const practice = await startPracticeMutation.mutateAsync({
        subjectId,
        difficulty,
      });
      onPracticeStart(practice);
      toast.success("Practice started!");
    } catch (error) {
      handleError(error as Error);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Start Practice</CardTitle>
        <CardDescription>
          Choose a subject and difficulty level to begin
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Subject</label>
            <Select onValueChange={setSubjectId} value={subjectId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Difficulty</label>
            <Select
              onValueChange={(value: "EASY" | "MEDIUM" | "HARD") =>
                setDifficulty(value)
              }
              value={difficulty}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EASY">Easy</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HARD">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={
              !subjectId || !difficulty || startPracticeMutation.isPending
            }
          >
            {startPracticeMutation.isPending ? "Starting..." : "Start Practice"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
