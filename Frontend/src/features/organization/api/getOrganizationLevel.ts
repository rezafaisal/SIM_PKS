import { useQuery } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { ExtractFnReturnType, QueryConfig } from "lib/react-query";

export async function getOrganizationLevels() {
  const res = await axios.get("/organization/level");

  return res.data;
}

type QueryFnType = typeof getOrganizationLevels;

type UseOrganizationLevelsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export function useOrganizationLevels({
  config,
}: UseOrganizationLevelsOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["organizationLevels"],
    queryFn: () => getOrganizationLevels(),
  });
}
