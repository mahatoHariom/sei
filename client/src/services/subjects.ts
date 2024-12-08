import api from "@/lib/axios-instance";
import { SubjectResponse } from "@/types/subjects";

export async function getSubjects(): Promise<SubjectResponse[]> {
  const response = await api.get<SubjectResponse[]>("/subjects");
  return response.data;
}

export const enrollInSubject = async ({
  subjectId,
  userId,
}: {
  subjectId: string;
  userId: string;
}) => {
  const response = await api.post("/subject/enroll", { subjectId, userId });
  return response.data;
};
