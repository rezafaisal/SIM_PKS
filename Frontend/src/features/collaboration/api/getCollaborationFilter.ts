import { useQuery } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { ExtractFnReturnType, QueryConfig } from "lib/react-query";

export async function getCollaborationFilters() {
  const res = await axios.get("/cooperation/filter");

  // return data;
  return res.data;
}

type QueryFnType = typeof getCollaborationFilters;

type UseCollaborationFiltersOptions = {
  config?: QueryConfig<QueryFnType>;
};

export function useCollaborationFilters({
  config,
}: UseCollaborationFiltersOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["collaborationFilters"],
    queryFn: () => getCollaborationFilters(),
  });
}
