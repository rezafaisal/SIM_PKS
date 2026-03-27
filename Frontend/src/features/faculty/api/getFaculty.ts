import { useQuery } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { ExtractFnReturnType, QueryConfig } from "lib/react-query";

export async function getFacultys() {
  const res = await axios.get("/faculty");

  // return data;
  return res.data;
}

type QueryFnType = typeof getFacultys;

type UseFacultysOptions = {
  config?: QueryConfig<QueryFnType>;
};

export function useFacultys({ config }: UseFacultysOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["facultys"],
    queryFn: () => getFacultys(),
  });
}
