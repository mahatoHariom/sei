import { apiKeys } from "@/constants/apiKeys";
import { UserDetail } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useUserCourses = () => {
  return useQuery<UserDetail>({
    queryKey: [apiKeys.getUserDetails],
    queryFn: () => getUserCourses(),
  });
};
