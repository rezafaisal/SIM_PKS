import { useQuery } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { ExtractFnReturnType, QueryConfig } from "lib/react-query";

export async function getAccessPages() {
  const res = await axios.get("/pages");

  // return data;
  return res.data;
}

type QueryFnType = typeof getAccessPages;

type UseAccessPagesOptions = {
  config?: QueryConfig<QueryFnType>;
};

export function useAccessPages({ config }: UseAccessPagesOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["accessPages"],
    queryFn: () => getAccessPages(),
  });
}
