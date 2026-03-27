import { useQuery } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { ExtractFnReturnType, QueryConfig } from "lib/react-query";

export async function getRoles() {
  const res = await axios.get("/roles");

  // return data;
  return res.data;
}

type QueryFnType = typeof getRoles;

type UseRolesOptions = {
  config?: QueryConfig<QueryFnType>;
};

export function useRoles({ config }: UseRolesOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["roles"],
    queryFn: () => getRoles(),
  });
}
