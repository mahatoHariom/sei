"use client";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllSubjects } from "@/hooks/admin";
import { MCQPractice } from "./mcqComponent";
import { MCQGenerator } from "./mcqGenerator";

export default function MCQPracticePage() {
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const { data: subjectsData } = useGetAllSubjects();

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>MCQ Practice</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              {subjectsData?.map((subject) => (
                <SelectItem key={subject.id} value={subject.id}>
                  {subject.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedSubject && (
        <Tabs defaultValue="practice">
          <TabsList>
            <TabsTrigger value="practice">Practice Questions</TabsTrigger>
            <TabsTrigger value="generate">Generate Questions</TabsTrigger>
          </TabsList>

          <TabsContent value="practice">
            <MCQPractice courseId={selectedSubject} count={10} />
          </TabsContent>

          <TabsContent value="generate">
            <MCQGenerator courseId={selectedSubject} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
