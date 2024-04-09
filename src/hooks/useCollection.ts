import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api_client";
import { UserCollectionQuery, Response, Collection } from "./types";

const useCollection = (userId: number, query: UserCollectionQuery) => {
  const client = new ApiClient();
  // const [subjects, setSubjects] = useState<FetchResponse>({} as FetchResponse);
  // const [isLoading, setLoading] = useState(true);

  // useEffect(() => {
  //   const controller = new AbortController();
  //   setLoading(true);
  //   axios
  //     .get<FetchResponse>(`https://api.bgm.tv/v0/users/${userId}/collections`, {
  //       params: { subject_type: types.subject, type: types.collection },
  //       signal: controller.signal,
  //     })
  //     .then((res) => {
  //       setSubjects(res.data);
  //       setLoading(false);
  //     })
  //     .catch((e) => console.log(e));

  //   return () => controller.abort();
  // }, [types]);
  // return { subjects, isLoading };

  return useQuery<Response<Collection>, Error>({
    queryKey: [userId, 'subjects', query],
    queryFn: () => client.getCollections(userId, query), 
    staleTime: 60 * 60 * 1000, // 1 hour
  })
};

export default useCollection;
