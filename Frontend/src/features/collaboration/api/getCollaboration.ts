import { useQuery } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { ExtractFnReturnType, QueryConfig } from "lib/react-query";
import { CollaborationProps } from "../types";

export type GetCollaborationsResponse = {
  collaborations: CollaborationProps[];
};

export async function getCollaborations() {
  const res = await axios.get("/cooperation/all");

  // return data;
  return res.data;
}

type QueryFnType = typeof getCollaborations;

type UseCollaborationsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export function useCollaborations({ config }: UseCollaborationsOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["collaborations"],
    queryFn: () => getCollaborations(),
  });
}
