import { useQuery } from "@tanstack/react-query";
import { getUserCourses } from "@/services/users";
import { GetUserCoursesResponse } from "@/types/subjects";
// import api from "@/lib/axios-instance";
import { apiKeys } from "@/constants/apiKeys";

export const useUserCourses = (
  userId: string,
  page: number,
  limit: number,
  search?: string
) => {
  return useQuery<GetUserCoursesResponse>({
    queryKey: [apiKeys.userCourses, userId, page, limit, search],
    queryFn: () =>
      getUserCourses({ userId, page, limit, search }).then((res) => ({
        ...res,
        hasPreviousPage: res.page > 1,
        hasNextPage: res.page < res.totalPages,
      })),
  });
};
