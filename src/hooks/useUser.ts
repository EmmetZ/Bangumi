import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api_client";
import { User } from "../types";

const useUser = (userId: number) => {
  const client = new ApiClient();

  return useQuery<User>({
    queryKey: ['user', userId, 'profile'],
    queryFn: () => client.getUser(userId),
    staleTime: 1000 * 60 * 60 * 24,  // 1 day
    refetchOnWindowFocus: false,
  })
};

export default useUser;