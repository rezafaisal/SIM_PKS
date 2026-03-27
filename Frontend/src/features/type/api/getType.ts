import { useQuery } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { ExtractFnReturnType, QueryConfig } from "lib/react-query";

export async function getTypes() {
  const res = await axios.get("/type");

  return res.data;
}

type QueryFnType = typeof getTypes;

type UseTypesOptions = {
  config?: QueryConfig<QueryFnType>;
};

export function useTypes({ config }: UseTypesOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["types"],
    queryFn: () => getTypes(),
  });
}
