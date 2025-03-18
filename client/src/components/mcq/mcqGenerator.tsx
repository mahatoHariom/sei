"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useGenerateMCQQuestions } from "@/hooks/mcq";

interface MCQGeneratorProps {
  courseId: string;
}

export const MCQGenerator = ({ courseId }: MCQGeneratorProps) => {
  const [count, setCount] = useState("10");

  const {
    refetch: generateQuestions,
    isLoading,
    data,
  } = useGenerateMCQQuestions(courseId);

  const handleGenerate = async () => {
    await generateQuestions();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate MCQ Questions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="count">Number of Questions</Label>
          <Input
            id="count"
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Generating..." : "Generate Questions"}
        </Button>

        {data?.questions && (
          <div className="mt-4 space-y-4">
            <h3 className="font-medium">Generated Questions:</h3>
            {data.questions.map((q, i) => (
              <Card key={q.id}>
                <CardContent className="pt-4">
                  <p className="font-medium">
                    Q{i + 1}: {q.question}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
