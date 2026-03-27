import { useQuery } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { ExtractFnReturnType, QueryConfig } from "lib/react-query";

export async function getDekans() {
  const res = await axios.get("/dean");

  // return data;
  return res.data;
}

type QueryFnType = typeof getDekans;

type UseDekansOptions = {
  config?: QueryConfig<QueryFnType>;
};

export function useDekans({ config }: UseDekansOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["dekans"],
    queryFn: () => getDekans(),
  });
}
