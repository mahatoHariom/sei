import { apiKeys } from "@/constants/apiKeys";
import { getProfile } from "@/services/users";
import { useQuery } from "@tanstack/react-query";

// Typing the return value of the useQuery hook
export const useGetProfile = (id: string) => {
  return useQuery({
    queryKey: [apiKeys.getProfile],
    queryFn: getProfile, // Ensure it's passed as a function reference
    enabled: !!id,
  });
};
