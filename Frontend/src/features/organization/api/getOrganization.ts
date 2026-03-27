import { useQuery } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { ExtractFnReturnType, QueryConfig } from "lib/react-query";

export async function getOrganizations() {
  const res = await axios.get("/organization");

  return res.data;
}

type QueryFnType = typeof getOrganizations;

type UseOrganizationsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export function useOrganizations({ config }: UseOrganizationsOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["organizations"],
    queryFn: () => getOrganizations(),
  });
}
