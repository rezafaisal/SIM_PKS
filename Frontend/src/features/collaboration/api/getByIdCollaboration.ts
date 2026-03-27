import { useQuery } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { ExtractFnReturnType, QueryConfig } from "lib/react-query";
import { CollaborationProps } from "../types";

export type GetByIdCollaborationsResponse = {
  ByIdcollaborations: CollaborationProps[];
};

type ShowCollabDTO = {
  id: any;
};

export async function getByIdCollaborations({ id }: ShowCollabDTO) {
  const res = await axios.get(`/cooperation/${id}`);

  // return data;
  return res.data;
}

type QueryFnType = typeof getByIdCollaborations;

type UseByIdCollaborationsOptions = {
  id?: number | string;
  config?: QueryConfig<QueryFnType>;
};

export function useByIdCollaborations({
  config,
  id,
}: UseByIdCollaborationsOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["ByIdcollaborations"],
    queryFn: () => getByIdCollaborations({ id }),
  });
}
