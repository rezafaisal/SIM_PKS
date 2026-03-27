import { useQuery } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { ExtractFnReturnType, QueryConfig } from "lib/react-query";

export async function getImplementations() {
  const res = await axios.get("/implementation");

  // return data;
  return res.data;
}

type QueryFnType = typeof getImplementations;

type UseImplementationsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export function useImplementations({ config }: UseImplementationsOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["ByIdcollaborations"],
    queryFn: () => getImplementations(),
  });
}
