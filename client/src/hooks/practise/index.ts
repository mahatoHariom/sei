// src/hooks/use-practice.ts
import { apiKeys } from "@/constants/apiKeys";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  startPractice,
  submitAnswer,
  getPracticeHistory,
} from "@/services/practise";
import queryClient from "@/lib/query-client";

export const useStartPractice = () => {
  return useMutation({
    mutationFn: startPractice,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [apiKeys.practise.history],
      });
    },
  });
};

export const useSubmitAnswer = () => {
  return useMutation({
    mutationFn: submitAnswer,
  });
};

export const usePracticeHistory = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: [apiKeys.practise.history, page, limit],
    queryFn: () => getPracticeHistory(page, limit),
  });
};
