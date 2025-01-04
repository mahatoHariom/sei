import { useMutation, useQuery } from "@tanstack/react-query";

import { apiKeys } from "@/constants/apiKeys";
import {
  enrollInSubject,
  getSubjects,
  unenrollFromSubject,
} from "@/services/subjects";
import queryClient from "@/lib/query-client";

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

export const useUnenrollFromSubject = (options?: {
  onSuccess?: () => void;
}) => {
  return useMutation({
    mutationFn: unenrollFromSubject,
    mutationKey: [apiKeys.unenrollFromSubject],
    onSuccess: () => {
      if (options?.onSuccess) {
        options.onSuccess();
      }
      queryClient.invalidateQueries({
        queryKey: [apiKeys.userCourses],
      });
    },
  });
};
