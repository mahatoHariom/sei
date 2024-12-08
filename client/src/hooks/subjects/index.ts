import { useMutation, useQuery } from "@tanstack/react-query";

import { apiKeys } from "@/constants/apiKeys";
import { enrollInSubject, getSubjects } from "@/services/subjects";

export function useSubjects() {
  return useQuery({
    queryKey: [apiKeys.getAllSubjects],
    queryFn: getSubjects,
  });
}

export const useEnrollInSubject = () => {
  return useMutation({
    mutationFn: enrollInSubject,
    mutationKey: [apiKeys.enrollInSubject],
  });
};
